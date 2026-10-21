// Scroll locking for fullscreen overlays (lightbox, modal).
//
// The page scrolls on <html> (the document scroller), while the desktop nav
// column is a second, independent scroller. Freezing <html> stops the document;
// nested scrollers are handled by keeping overlays outside of them, which is why
// ImageLightbox portals to document.body instead of rendering inline.
//
// The desktop nav column is also `position: sticky`, so the lock must freeze
// scrolling without creating a scroll container on any ancestor of it -- see the
// body rule at the end of lockScroll.
//
// A module-level counter makes overlapping locks safe: only the first lock
// touches the DOM and only the last unlock restores it. This also keeps the
// save/restore pair balanced when React StrictMode double-invokes effects.

let lockCount = 0;
let savedStyles = null;

const getScrollbarWidth = () =>
	window.innerWidth - document.documentElement.clientWidth;

export const lockScroll = () => {
	if (typeof document === "undefined") return;

	lockCount += 1;
	if (lockCount > 1) return;

	const { body, documentElement } = document;

	savedStyles = {
		htmlOverflow: documentElement.style.overflow,
		htmlPaddingRight: documentElement.style.paddingRight,
		bodyOverflow: body.style.overflow,
		bodyPaddingRight: body.style.paddingRight
	};

	// Reclaim the scrollbar gutter as padding so hiding the scrollbar does not
	// shift the centered layout sideways.
	const scrollbarWidth = getScrollbarWidth();
	if (scrollbarWidth > 0) {
		documentElement.style.paddingRight = `${scrollbarWidth}px`;
	}

	// `clip` rather than `hidden` on the body: `hidden` would turn the body into a
	// scroll container, so the sticky nav column would resolve against it
	// (scrollTop 0) instead of the viewport and get painted a page height above
	// it -- the rail disappeared whenever the page was scrolled. `clip` never
	// creates a scroll container, so sticky keeps tracking the viewport while the
	// document stays frozen. <html> keeps `hidden` as the primary lock; the body
	// rule is the belt-and-braces for browsers that ignore the root lock.
	documentElement.style.overflow = "hidden";
	body.style.overflow = "clip";
};

export const unlockScroll = () => {
	if (typeof document === "undefined") return;

	// Guard against unbalanced calls so the counter can never go negative.
	if (lockCount === 0) return;

	lockCount -= 1;
	if (lockCount > 0) return;

	if (!savedStyles) return;

	const { body, documentElement } = document;

	documentElement.style.overflow = savedStyles.htmlOverflow;
	documentElement.style.paddingRight = savedStyles.htmlPaddingRight;
	body.style.overflow = savedStyles.bodyOverflow;
	body.style.paddingRight = savedStyles.bodyPaddingRight;

	savedStyles = null;
};
