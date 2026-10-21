import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

const ENTER_DURATION = 320;
const EXIT_DURATION = 200;
const SWAP_FADE_DURATION = 160;
const FLIP_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Measured rects are rounded to sub-pixels, so aspect ratios are compared with a
// tolerance to avoid a spurious mismatch on images that do actually match.
const ASPECT_TOLERANCE = 0.01;

const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleChange = (event) => setPrefersReducedMotion(event.matches);

		query.addEventListener("change", handleChange);
		return () => query.removeEventListener("change", handleChange);
	}, []);

	return prefersReducedMotion;
};

/**
 * ImageLightbox - Fullscreen viewer for a single image.
 *
 * Opening fades the backdrop in while scaling the image up from the position of
 * the element that was clicked (a FLIP transition), so it reads as the thumbnail
 * growing into place. Closing is a plain fade-out in place.
 *
 * Rendered through a portal on document.body for two reasons: it escapes the
 * `overflow-hidden` thumbnail box that would otherwise clip it, and it sits on
 * the html/body scroll chain instead of the desktop nav column, which is a
 * separate scroller that a nested overlay would let the wheel fall through to.
 *
 * @param {string} src - Image source. May be the same source the thumbnail uses.
 * @param {string} alt - Alt text, also used for the dialog's accessible name.
 * @param {boolean} isOpen - Whether the viewer is open.
 * @param {Function} onClose - Called on backdrop click, close button, or Escape.
 * @param {{width: number, height: number, left: number, top: number}} [originRect]
 *   Bounding rect of the clicked trigger, captured at click time. Without it the
 *   image simply fades in instead of scaling up.
 * @param {Function} [onPrev] - Show the previous image. Enables gallery controls.
 * @param {Function} [onNext] - Show the next image. Enables gallery controls.
 * @param {number} [index] - Zero-based position of the current image in the set.
 * @param {number} [count] - Total number of images. Gallery controls need > 1.
 * @param {HTMLElement} [returnFocusTo] - Focus target when the element that had
 *   focus when the dialog opened is no longer focusable (Safari does not focus a
 *   button on click), so focus still lands back on the thumbnail.
 */
const ImageLightbox = ({
	src,
	alt,
	isOpen,
	onClose,
	originRect,
	onPrev,
	onNext,
	index = 0,
	count = 0,
	returnFocusTo = null
}) => {
	// Trails `isOpen` on close so the fade-out can finish before the unmount.
	const [isRendered, setIsRendered] = useState(isOpen);

	const overlayRef = useRef(null);
	const imageRef = useRef(null);
	const closeButtonRef = useRef(null);
	const previouslyFocusedRef = useRef(null);
	const hasAnimatedInRef = useRef(false);
	// The src that was last painted, so a load can tell "opening" from "switched".
	const loadedSrcRef = useRef(src);
	const returnFocusToRef = useRef(returnFocusTo);
	returnFocusToRef.current = returnFocusTo;

	const showGalleryNav = count > 1;
	const canGoPrev = showGalleryNav && index > 0;
	const canGoNext = showGalleryNav && index < count - 1;

	const prefersReducedMotion = usePrefersReducedMotion();
	const enterDuration = prefersReducedMotion ? 0 : ENTER_DURATION;
	const exitDuration = prefersReducedMotion ? 0 : EXIT_DURATION;

	// Mount on open; on close keep the portal alive until the fade-out finishes.
	// A layout effect so the portal is in the DOM within the same commit as the
	// click, giving the FLIP effect below something to measure before first paint.
	useLayoutEffect(() => {
		if (!isOpen) return undefined;

		hasAnimatedInRef.current = false;
		setIsRendered(true);
		return undefined;
	}, [isOpen]);

	useEffect(() => {
		if (isOpen || !isRendered) return undefined;

		const overlay = overlayRef.current;

		if (!overlay || exitDuration === 0) {
			const timer = setTimeout(() => setIsRendered(false), 0);
			return () => clearTimeout(timer);
		}

		const animation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: exitDuration,
			easing: "ease-in",
			fill: "forwards"
		});

		const handleFinish = () => setIsRendered(false);
		animation.addEventListener("finish", handleFinish);

		return () => {
			animation.removeEventListener("finish", handleFinish);
			animation.cancel();
		};
	}, [isOpen, isRendered, exitDuration]);

	const startFlipAnimation = useCallback(() => {
		if (hasAnimatedInRef.current) return;

		const image = imageRef.current;
		// The image has no measurable box until its intrinsic size is known, so
		// leave the flag unset and let onLoad retry once the source is decoded.
		if (!image || !image.complete || image.naturalWidth === 0) return;

		hasAnimatedInRef.current = true;

		if (enterDuration === 0) return;

		const target = image.getBoundingClientRect();
		if (!target.width || !target.height) return;
		if (!originRect || !originRect.width || !originRect.height) return;

		// The thumbnail crops (object-cover) while the viewer fits the whole image
		// (object-contain), so a FLIP would visibly jump whenever the aspect ratios
		// differ. Fade only in that case.
		const originAspect = originRect.width / originRect.height;
		const targetAspect = target.width / target.height;
		if (Math.abs(originAspect - targetAspect) > ASPECT_TOLERANCE) return;

		// Depends on the image having `transform-origin: top left`, so the measured
		// top-left corner stays anchored while it scales.
		const scale = originRect.width / target.width;

		image.animate(
			[
				{
					transform: `translate(${originRect.left - target.left}px, ${
						originRect.top - target.top
					}px) scale(${scale})`
				},
				{ transform: "none" }
			],
			{ duration: enterDuration, easing: FLIP_EASING, fill: "backwards" }
		);
	}, [enterDuration, originRect]);

	// A load counts as a swap when the dialog is already on screen with another
	// image. The opening FLIP must not replay for it, so crossfade the new image
	// in instead; `onLoad` (rather than an effect on `src`) keeps the fade
	// starting only once the replacement has been decoded.
	const handleImageLoad = useCallback(() => {
		const isSwap = hasAnimatedInRef.current && loadedSrcRef.current !== src;
		loadedSrcRef.current = src;

		startFlipAnimation();

		if (!isSwap) return;

		const image = imageRef.current;
		if (!image || enterDuration === 0) return;

		image.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: SWAP_FADE_DURATION,
			easing: "ease-out"
		});
	}, [enterDuration, src, startFlipAnimation]);

	// Freeze the page behind the overlay, including during the fade-out.
	//
	// Runs as a layout effect and is declared before the enter animation, because
	// hiding the scrollbar widens the viewport and so re-centers the image. The
	// FLIP has to measure the post-lock layout, otherwise the image would jump by
	// half the scrollbar width as the animation hands back to the static position.
	useLayoutEffect(() => {
		if (!isRendered) return undefined;

		lockScroll();
		return () => unlockScroll();
	}, [isRendered]);

	// Move focus into the dialog on open and give it back to the trigger on close.
	useLayoutEffect(() => {
		if (!isRendered) return undefined;

		previouslyFocusedRef.current = document.activeElement;
		closeButtonRef.current?.focus({ preventScroll: true });

		return () => {
			const previouslyFocused = previouslyFocusedRef.current;
			previouslyFocusedRef.current = null;

			// A click on a button focuses it in Chrome/Firefox but not always in
			// Safari, in which case activeElement was <body>. Fall back to the
			// trigger passed in by the gallery.
			const target =
				previouslyFocused instanceof HTMLElement &&
				previouslyFocused !== document.body &&
				document.contains(previouslyFocused)
					? previouslyFocused
					: returnFocusToRef.current;

			if (target instanceof HTMLElement && document.contains(target)) {
				target.focus({ preventScroll: true });
			}
		};
	}, [isRendered]);

	// Enter animation. Runs as a layout effect so the image is measured before the
	// first paint, which is what keeps the thumbnail from flashing at full size.
	useLayoutEffect(() => {
		if (!isRendered || !isOpen) return undefined;

		const overlay = overlayRef.current;
		if (!overlay) return undefined;

		const animations = [];

		if (enterDuration > 0) {
			animations.push(
				overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: enterDuration,
					easing: "ease-out",
					fill: "backwards"
				})
			);
		}

		startFlipAnimation();

		return () => animations.forEach((animation) => animation.cancel());
	}, [isRendered, isOpen, enterDuration, startFlipAnimation]);

	// Escape to close, Tab kept inside the dialog. Only bound while actually open,
	// so focus is released as soon as the close is requested.
	useEffect(() => {
		if (!isRendered || !isOpen) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose?.();
				return;
			}

			if (event.key === "ArrowLeft" && canGoPrev) {
				event.preventDefault();
				onPrev?.();
				return;
			}

			if (event.key === "ArrowRight" && canGoNext) {
				event.preventDefault();
				onNext?.();
				return;
			}

			if (event.key !== "Tab") return;

			const overlay = overlayRef.current;
			if (!overlay) return;

			const focusables = Array.from(
				overlay.querySelectorAll(FOCUSABLE_SELECTOR)
			);
			if (focusables.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;
			const isInside = overlay.contains(active);

			if (event.shiftKey && (active === first || !isInside)) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && (active === last || !isInside)) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isRendered, isOpen, onClose, onPrev, onNext, canGoPrev, canGoNext]);

	// Only clicks on the backdrop itself close; the image and close button are
	// children, so re-renders and image drags never dismiss the viewer.
	const handleBackdropClick = (event) => {
		if (event.target !== event.currentTarget) return;
		onClose?.();
	};

	if (!isRendered || typeof document === "undefined") return null;

	return createPortal(
		<div
			ref={overlayRef}
			role="dialog"
			aria-modal="true"
			aria-label={alt ? `Full-size view: ${alt}` : "Full-size image"}
			className="lightbox-overlay"
			onClick={handleBackdropClick}
		>
			<img
				ref={imageRef}
				src={src}
				alt={alt}
				className="lightbox-image"
				onLoad={handleImageLoad}
				draggable={false}
			/>
			{showGalleryNav && (
				<>
					<button
						type="button"
						onClick={onPrev}
						disabled={!canGoPrev}
						className="lightbox-nav left-2 sm:left-4"
						aria-label="Previous image"
					>
						<Icon
							icon="material-symbols:chevron-left-rounded"
							width="28"
							height="28"
						/>
					</button>
					<button
						type="button"
						onClick={onNext}
						disabled={!canGoNext}
						className="lightbox-nav right-2 sm:right-4"
						aria-label="Next image"
					>
						<Icon
							icon="material-symbols:chevron-right-rounded"
							width="28"
							height="28"
						/>
					</button>
					<div
						className="lightbox-counter"
						aria-live="polite"
						aria-atomic="true"
					>
						{index + 1} / {count}
					</div>
				</>
			)}
			<button
				ref={closeButtonRef}
				type="button"
				onClick={onClose}
				className="lightbox-close"
				aria-label="Close full-size image"
			>
				<Icon icon="material-symbols:close-rounded" width="26" height="26" />
			</button>
		</div>,
		document.body
	);
};

export default ImageLightbox;
