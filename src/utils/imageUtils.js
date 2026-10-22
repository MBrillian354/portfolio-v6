// Project image entries support two shapes: the legacy public-root URL string
// and the richer `{ src, caption }` object. Everything downstream works with
// objects so components never have to branch on the shape.

export const getImageSrc = (image) => {
	if (typeof image === "string") return image.trim();
	if (image && typeof image.src === "string") return image.src.trim();
	return "";
};

export const normalizeImages = (images) => {
	if (!Array.isArray(images)) return [];

	return images
		.map((image) => {
			const src = getImageSrc(image);
			if (!src) return null;

			const caption =
				typeof image === "string"
					? ""
					: typeof image?.caption === "string"
						? image.caption.trim()
						: "";

			return { src, caption };
		})
		.filter(Boolean);
};
