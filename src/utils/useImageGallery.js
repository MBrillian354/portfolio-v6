// Shared state for the fullscreen image gallery.
//
// Holds the image list, the active index, the box of the thumbnail that was
// clicked (so ImageLightbox can grow out of it) and the trigger element (so
// focus can return to it on close). Keeping it in one object means a section
// can render a single ImageLightbox for an arbitrary number of thumbnails.
//
// The content is intentionally kept after `close()` so the lightbox still has
// an image to paint while its fade-out animation plays.

import { useCallback, useMemo, useState } from "react";
import { normalizeImages } from "./imageUtils";

const toOriginRect = (element) => {
	if (!element || typeof element.getBoundingClientRect !== "function") {
		return null;
	}

	const { width, height, left, top } = element.getBoundingClientRect();
	if (!width || !height) return null;

	return { width, height, left, top };
};

export const useImageGallery = () => {
	const [state, setState] = useState({ content: null, isOpen: false });

	const open = useCallback(
		({ images, index = 0, altPrefix = "Image", trigger = null }) => {
			const list = normalizeImages(images);
			if (list.length === 0) return;

			const safeIndex = Math.min(Math.max(index, 0), list.length - 1);

			setState({
				content: {
					images: list,
					index: safeIndex,
					altPrefix,
					trigger,
					originRect: toOriginRect(trigger)
				},
				isOpen: true
			});
		},
		[]
	);

	const close = useCallback(() => {
		setState((current) =>
			current.content ? { ...current, isOpen: false } : current
		);
	}, []);

	const step = useCallback((delta) => {
		setState((current) => {
			if (!current.content) return current;

			const { images, index } = current.content;
			const nextIndex = index + delta;
			if (nextIndex < 0 || nextIndex >= images.length) return current;

			return { ...current, content: { ...current.content, index: nextIndex } };
		});
	}, []);

	const prev = useCallback(() => step(-1), [step]);
	const next = useCallback(() => step(1), [step]);

	const content = state.content;
	const count = content?.images.length ?? 0;
	const index = content?.index ?? 0;
	const altPrefix = content?.altPrefix ?? "";

	return useMemo(() => {
		const activeImage = content?.images[index] ?? null;

		return {
			isOpen: state.isOpen,
			src: activeImage?.src ?? null,
			caption: activeImage?.caption ?? "",
			alt: count > 1 ? `${altPrefix} ${index + 1} of ${count}` : altPrefix,
			index,
			count,
			hasPrev: index > 0,
			hasNext: index < count - 1,
			originRect: content?.originRect ?? null,
			trigger: content?.trigger ?? null,
			open,
			close,
			prev,
			next
		};
	}, [state.isOpen, content, index, count, altPrefix, open, close, prev, next]);
};

export default useImageGallery;
