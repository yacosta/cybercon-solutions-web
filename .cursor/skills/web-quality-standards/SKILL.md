---
name: web-quality-standards
description: >-
  Enforce Cybercon Solutions web quality standards for Core Web Vitals (especially
  LCP), SEO link text, color contrast, cache lifetimes (Zaraz), and accessibility
  when editing pages, layouts, components, tokens, or marketing UI. Use for
  Lighthouse, PageSpeed, SEO audits, a11y reviews, hero media, and brand color
  changes. After fixing a new audit finding, update this skill so the rule sticks.
paths:
  - "src/**/*.{astro,css,ts,tsx}"
  - "public/**/*"
  - ".cursor/skills/web-quality-standards/**"
  - ".cursor/rules/web-quality-standards.mdc"
---

# Cybercon web quality standards

Read this skill before shipping UI, SEO, performance, or brand-token changes.
These rules come from production audit fixes — follow them on every related change.

## Maintaining this skill (required)

When you fix a **new** Lighthouse, PageSpeed, SEO, a11y, or brand-quality finding:

1. **Codify it here** in the matching section (or add a section) with the concrete rule, the wrong pattern to avoid, and the file paths involved.
2. **Update the checklist** below with a one-line verification item.
3. **Update Related files** if new scripts/configs are involved.
4. **Mirror non-negotiables** in `.cursor/rules/web-quality-standards.mdc` (keep that file short).
5. If the fix needs dashboard/CI setup (not app code), document the durable procedure in `README.md` and link it from this skill — same pattern as Zaraz cache.

Do this in the **same PR** as the fix whenever practical. Do not leave tribal knowledge only in the PR description.

## Color contrast (brand coral)

- Brand coral token is `--coral: #c0392b` in `src/styles/tokens.css` (~4.96:1 on cream, ~5.44:1 on white).
- Do **not** revert to `#f26b5e` / `rgba(242, 107, 94, …)` for text or UI accents that sit on cream (`--cream`) or white.
- If changing coral (or any text-on-cream/white accent), verify WCAG AA (≥4.5:1) for normal text including `.eyebrow`.
- Safer deeper options if more margin is needed: `#B23A2E`. Do not use `#D6402F` for eyebrow/body accents (fails on beige).
- Keep logo/favicon SVG fills and hardcoded `rgba(...)` accents in sync with `--coral`.
- Focus rings that use coral should update their RGB to match (`--shadow-focus`).

## Descriptive link text (SEO + a11y)

- Never ship bare “Learn more” / “Saber más” / “Click here” / “Read more” as the sole link text when multiple links share that label.
- Use topic-specific copy via i18n templates, e.g. `learnMoreAbout: 'Learn more about {name}'` / `'Saber más sobre {name}'`.
- Homepage services + industries cards: see `ServicesGrid.astro`, `IndustriesSection.astro`, `src/i18n/en.ts`, `src/i18n/es.ts`.
- Visible anchor text must include the destination topic (crawlers use text content; do not rely on `aria-label` alone for SEO).

## LCP / hero media (Core Web Vitals)

Homepage hero (`src/components/Hero.astro`) is the LCP surface:

1. **LCP element must be the prioritized `<img>`** inside `<picture>`, with:
   - `fetchpriority="high"`
   - `loading="eager"`
   - Prefer `decoding="sync"` on the LCP image
   - Never `loading="lazy"` on the LCP image
2. **Do not set `video[poster]`** when a full-bleed poster `<img>` already covers the hero. A video poster paints above the image and becomes an unprioritized LCP request (fails “fetchpriority=high should be applied”).
3. Keep the video transparent until playback starts (e.g. `.hero-video { opacity: 0 }` → `.is-playing`), then fade in after `play()` resolves.
4. **Preload must match the format `<picture>` actually selects.** If AVIF is first `<source>`, preload AVIF with `imagesrcset` + `imagesizes="100vw"` + `fetchpriority="high"` (see `src/pages/index.astro` and `src/pages/es/index.astro`). Do not preload WebP while Chrome picks AVIF.
5. Skip heavy hero video on narrow viewports / Save-Data / `prefers-reduced-motion` (existing behavior — keep it).
6. On other pages where a banner/feature image is LCP (`ServicePage`, `BlogPostPage`), keep `fetchpriority="high"` on that image and avoid lazy-loading it. Prefer a matching `<link rel="preload" as="image">` when the LCP URL is known early.

## Accessibility baselines

- Decorative images: empty `alt=""`; informative images: concise meaningful `alt`.
- Preserve heading order; one logical `h1` per page.
- Interactive controls need visible `:focus-visible` styles (site uses coral focus rings).
- Prefer real text over text-in-images for headlines and CTAs.

## SEO baselines

- Unique, descriptive titles and meta descriptions per locale.
- Internal links: descriptive anchors (see above); avoid duplicate identical CTAs to different URLs.
- Keep `hreflang` / canonical patterns used by `BaseLayout` intact when adding routes.

## Cache lifetimes (Zaraz + Insights)

- Worker/static assets: use `public/_headers` (e.g. `/videos/*` is already long-lived).
- **Zaraz** (`/cdn-cgi/zaraz/s.js`) is Cloudflare-injected, not a Worker asset — `_headers` cannot set its TTL.
- Zone ID `41a145bf2688a227f9e321a31055fe19` (`cybercon-solutions.com`) is wired into deploy + `scripts/ensure-zaraz-cache-header.mjs`.
- Keep a Response Header Transform so browsers get `Cache-Control: public, max-age=604800` on Zaraz `s.js` (dashboard or `npm run cf:zaraz-cache`; token needs Transform Rules Edit).
- **Cloudflare Web Analytics** `static.cloudflareinsights.com/beacon.min.js` is also edge-injected; its ~1d TTL is controlled by Cloudflare, not this repo. Don’t chase it in app code — disable Web Analytics in the CF dashboard if the remaining ~5–11 KiB audit noise matters more than the beacon.
- Do not vendor/proxy Zaraz or Insights scripts in the Astro app.

## Forced reflow (cookie banner)

- Do **not** call `.focus()` synchronously after revealing UI during the critical path (invalidates layout → Lighthouse “Forced reflow”).
- Cookie banner (`CookieBanner.astro`): wait for `window` `load` (or idle) before first reveal; use double-`requestAnimationFrame` before `focus({ preventScroll: true })`.
- User-initiated opens (`cybercon:cookie-settings`) may focus immediately after reveal.

## Checklist before finishing UI/perf/SEO work

- [ ] No generic repeated link labels (“Learn more”) without topic names
- [ ] Coral/text accents still meet AA on cream and white
- [ ] LCP image has `fetchpriority="high"` and is not lazy-loaded
- [ ] No `video[poster]` competing with a hero LCP `<img>`
- [ ] Hero preload `type` / `imagesrcset` matches the winning `<picture>` source
- [ ] EN and ES copy/templates updated together when user-facing strings change
- [ ] Zaraz `s.js` still has a browser Cache-Control (dashboard rule or `cf:zaraz-cache`)
- [ ] Cookie banner does not focus during critical-path load (defer + double-rAF)
- [ ] `npm run build` passes (primary validation gate)

## Related files

| Concern | Where |
|--------|--------|
| Coral token | `src/styles/tokens.css` |
| Hero LCP | `src/components/Hero.astro` |
| Hero preload | `src/pages/index.astro`, `src/pages/es/index.astro` |
| Services/industries links | `ServicesGrid.astro`, `IndustriesSection.astro`, `src/i18n/{en,es}.ts` |
| Global focus / eyebrow | `src/styles/global.css` |
| Zaraz browser cache | `scripts/ensure-zaraz-cache-header.mjs`, deploy.yml |
| Cookie banner / forced reflow | `src/components/CookieBanner.astro` |
