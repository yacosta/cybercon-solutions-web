# Hero video assets

## Current files

| File | Source | Purpose |
|------|--------|---------|
| `hero-server-racks.webm` | cybercon-solutions.com `/uploads/Video_Generation_for_Website.webm` | Full-bleed hero background |
| `hero-poster.jpg` | cybercon-solutions.com `/hero-poster.jpg` | LCP poster + reduced-motion fallback |

## Behavior

- Poster is preloaded and paints first (LCP).
- Video loads after `window.load` so it does not compete with critical rendering.
- On viewports ≤768px (and Save-Data), the video is not fetched — poster only.
- Served with a long `Cache-Control` TTL via `public/_headers`.
- `muted` + `playsinline` + `loop` + `autoplay` (via script).
- `aria-hidden="true"` on decorative media; screen-reader description in `.sr-only`.
- `prefers-reduced-motion: reduce` hides the video and keeps the poster.

## Replacing the asset

Drop a new WebM/MP4 here and update paths in `src/components/Hero.astro`. Keep a matching poster JPG for LCP.
