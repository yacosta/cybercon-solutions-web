# Hero video assets

## Current files

| File | Purpose |
|------|---------|
| `hero-server-racks.webm` | Full-bleed hero background (desktop only) |
| `hero-poster.{avif,webp,jpg}` | LCP poster @ 1280×800 |
| `hero-poster-960.{avif,webp,jpg}` | Poster @ 960w |
| `hero-poster-768.{avif,webp,jpg}` | Poster @ 768w (typical mobile DPR) |

The JPG basename is kept for compatibility; the on-disk JPEG is a real mozjpeg file (the previous asset was a PNG with a `.jpg` extension).

## Behavior

- Poster is preloaded (WebP `imagesrcset`) and paints first (LCP) via `<picture>`.
- Video loads after `window.load` so it does not compete with critical rendering.
- On viewports ≤768px (and Save-Data), the video is not fetched — poster only.
- Served with a long `Cache-Control` TTL via `public/_headers`.
- `muted` + `playsinline` + `loop` + `autoplay` (via script).
- `prefers-reduced-motion: reduce` hides the video and keeps the poster.

## Replacing the asset

1. Drop a photographic still (1280×800 or larger) as the source.
2. Regenerate AVIF/WebP/JPEG + 768/960 width variants (Sharp/`cwebp`/`avifenc`).
3. Keep filenames stable so cache-busting is intentional when you change content.
