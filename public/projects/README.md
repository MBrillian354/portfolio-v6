# Project Images

Screenshots shown beneath the tech stack on each project card and in the
`Images` column of the Projects Archive.

## Layout

One directory per project, named with the project's kebab-case slug:

```
public/projects/
  academic-system-ppg/
    01.jpg
    02.jpg
    03.jpg
  portfolio-website-v6/
    01.jpg
```

Images are referenced by public-root URL in `src/data/portfolio.json`:

```json
"images": [
  {
    "src": "/projects/academic-system-ppg/01.jpg",
    "caption": "Teacher attendance dashboard"
  }
]
```

Each entry has a required `src` and an optional `caption`. Captions are shown
below the image in the fullscreen lightbox; an image without one renders without
a caption. Plain string entries are still accepted for backwards compatibility,
but new entries should use the object form.

Array order is display order; the first image is the cover shown in the archive.
A project with no `images` (or an empty array) simply renders no image area.

## Image Requirements

- Format: JPG, PNG, or WebP
- Recommended width: 1400–1600px (they are displayed ~208px wide, cropped to 16:10)
- File size: keep under ~250KB each for a fast first paint
- Content: UI screenshots or photos; the full frame is shown uncropped in the
  lightbox, while thumbnails crop to 16:10 with `object-cover`

## Placeholders

The files currently committed under `academic-system-ppg/` and
`portfolio-website-v6/` are downscaled certificate images copied in as
placeholders for development. Their captions are temporary sample copy prefixed
with `Placeholder —`. Replace both the images and captions with real project
screenshots; keep the file names or update `src/data/portfolio.json` to match.
