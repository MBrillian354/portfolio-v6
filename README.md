# My Personal Portfolio Website

The sixth version of my portfolio.

Made with the latest React 19, Vite 7, and TailwindCSS v4.

## Assets

### Favicons

Every favicon in `public/` is generated from the master logo at
`assets/logo-source.png`. After replacing that file, regenerate the whole set
(`favicon.ico`, the 16/32/48px PNGs, `apple-touch-icon.png` and the Android
Chrome icons) with:

```sh
pnpm favicons
```

`public/site.webmanifest` is hand-authored and is not regenerated.
