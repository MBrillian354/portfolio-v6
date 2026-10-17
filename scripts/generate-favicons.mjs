/**
 * Regenerates every favicon in `public/` from the master logo in `assets/`.
 *
 * Run with `pnpm favicons` after changing `assets/logo-source.png`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const rootDir = path.resolve(
	fileURLToPath(new URL(".", import.meta.url)),
	".."
);
const sourcePath = path.join(rootDir, "assets", "logo-source.png");
const outputDir = path.join(rootDir, "public");

/** Standalone PNG icons served from `public/`. */
const PNG_ICONS = [
	["favicon-16x16.png", 16],
	["favicon-32x32.png", 32],
	["favicon-48x48.png", 48],
	["apple-touch-icon.png", 180],
	["android-chrome-192x192.png", 192],
	["android-chrome-512x512.png", 512]
];

/** Sizes packed into the multi-resolution `favicon.ico`. */
const ICO_SIZES = [16, 32, 48];

/**
 * Packs PNG buffers into an ICO container. Each entry stores the PNG verbatim,
 * which Windows Vista and later support natively.
 *
 * @param {{ size: number, data: Buffer }[]} images
 * @returns {Buffer}
 */
function buildIco(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // resource type: icon
	header.writeUInt16LE(images.length, 4);

	let offset = header.length + images.length * 16;
	const entries = [];
	const blobs = [];

	for (const { size, data } of images) {
		// A stored width/height of 0 means 256px.
		const dimension = size >= 256 ? 0 : size;

		const entry = Buffer.alloc(16);
		entry.writeUInt8(dimension, 0); // width
		entry.writeUInt8(dimension, 1); // height
		entry.writeUInt8(0, 2); // palette size (0 for true colour)
		entry.writeUInt8(0, 3); // reserved
		entry.writeUInt16LE(1, 4); // colour planes
		entry.writeUInt16LE(32, 6); // bits per pixel
		entry.writeUInt32LE(data.length, 8); // size of the image data
		entry.writeUInt32LE(offset, 12); // offset of the image data

		entries.push(entry);
		blobs.push(data);
		offset += data.length;
	}

	return Buffer.concat([header, ...entries, ...blobs]);
}

const cache = new Map();

/** Resizes the master logo to a square PNG of `size` pixels. */
async function render(size) {
	if (!cache.has(size)) {
		const data = await sharp(sourcePath)
			.resize(size, size)
			.png({ compressionLevel: 9 })
			.toBuffer();
		cache.set(size, data);
	}
	return cache.get(size);
}

await mkdir(outputDir, { recursive: true });

for (const [file, size] of PNG_ICONS) {
	await writeFile(path.join(outputDir, file), await render(size));
}

const icoImages = await Promise.all(
	ICO_SIZES.map(async (size) => ({ size, data: await render(size) }))
);
await writeFile(path.join(outputDir, "favicon.ico"), buildIco(icoImages));

console.log(
	`Generated ${PNG_ICONS.length} PNG icons and favicon.ico (${ICO_SIZES.join(", ")}px) in public/`
);
