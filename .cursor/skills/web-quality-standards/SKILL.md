---
name: web-quality-standards
description: >-
  Enforce Cybercon Solutions web quality standards for Core Web Vitals (especially
  LCP), SEO link text, color contrast, cache lifetimes (Zaraz), accessibility, and
  marketing copy voice when editing pages, layouts, components, tokens, i18n,
  service/industry data, or blog content. Use for Lighthouse, PageSpeed, SEO
  audits, a11y reviews, hero media, brand color changes, and new service or
  marketing pages. After fixing a new audit/quality finding, update this skill
  so the rule sticks.
paths:
  - "src/**/*.{astro,css,ts,tsx,md}"
  - "public/**/*"
  - ".cursor/skills/web-quality-standards/**"
  - ".cursor/rules/web-quality-standards.mdc"
---

# Cybercon web quality standards

Read this skill before shipping UI, SEO, performance, brand-token, or marketing-copy changes.
These rules come from production audit fixes — follow them on every related change.

## Maintaining this skill (required)

When you fix a **new** Lighthouse, PageSpeed, SEO, a11y, brand-quality, or marketing-copy finding:

1. **Codify it here** in the matching section (or add a section) with the concrete rule, the wrong pattern to avoid, and the file paths involved.
2. **Update the checklist** below with a one-line verification item.
3. **Update Related files** if new scripts/configs are involved.
4. **Mirror non-negotiables** in `.cursor/rules/web-quality-standards.mdc` (keep that file short).
5. If the fix needs dashboard/CI setup (not app code), document the durable procedure in `README.md` and link it from this skill — same pattern as Zaraz cache.

Do this in the **same PR** as the fix whenever practical. Do not leave tribal knowledge only in the PR description.

## Marketing copy voice (anti-AI tells)

When writing or editing homepage, service, industry, assessment/contact, chat, or blog copy (`src/i18n/{en,es}.ts`, `src/data/service-details.ts`, `src/data/services.ts`, `src/data/industries.ts`, `src/data/ai-security-page.ts`, `src/data/web-design-page.ts`, `src/content/blog/`, `src/lib/markdown-pages.ts`, chat knowledge):

1. **Industry pages are the voice model.** Prefer concrete scenes (shared clinic passwords, billable afternoon lost to a frozen laptop, backups never restored) over abstract MSP slogans. Match new service/marketing copy to that specificity.
2. **No third-paragraph SEO echoes on service overviews.** Aim for ~two short paragraphs (~60–100 EN words). Do not restate Cooper City/Davie + the offer + a CTA in a third block that only exists for keywords.
3. **Do not reintroduce the anti-hype denial stack** as a brand tic — avoid reflexive “theater / teatro,” “not a slide deck of buzzwords,” “not another demo,” “enterprise theater,” “ticket theater,” “No theater. No moonshots.” Prefer one concrete proof (SLA, sample QBR, named local scenario) instead.
4. **Trust mantra once per surface.** “A real engineer replies within one business day” / ES “Un ingeniero de nuestro equipo responde en un día hábil” belongs on form microcopy or the page reply note — not also in overview, process, FAQ, chat welcome, and CTA body on the same page. Elsewhere prefer “we reply” / “respondemos.”
5. **Avoid LLM cadence tells:** stacked “clear picture / clear next steps / clear owner,” “Plain English. No obligation.” triads, “Full stop.”, “Here’s our bias, stated plainly,” “execute strategy,” “when things get loud,” “boring work that prevents outages.”
6. **Spanish is Colombian Spanish** for user-facing ES. Prefer professional **culto** American Spanish for Colombia — not Spain defaults and not slang on B2B pages.
   - **Authorities:** [Colombian Spanish learner’s dictionary](https://colombianspanish.co/blog/colombian-spanish-learners-dictionary) for everyday Co usage; ASALE *Diccionario de americanismos* (DA, 2010) for whether a form is American and which countries mark it (**Co** = Colombia). The DA is **descriptive** (geographic/sociolinguistic marks), not a “Spain is normal / America is special” style guide — treat American culto forms as full Spanish. Prefer Co-marked or pan-American culto terms when they differ from peninsular; skip rural/pop/vulgar DA marks on marketing pages. See Bravo García (2015) overview of the DA’s criteria (indigenous loans, American creations, Spanish lexemes with American senses, archaisms alive in America, other-language loans such as *carro*).
   - Lexicon: `en sitio` (not `in situ`); `fallas` for break/fix (not `averías`); `concientización` (not `concienciación`); `computador` / `computador portátil` (not `ordenador`); `celular` (not `móvil`); `correo` (not bare `email`); prefer `agendar` / `ingresa` / `cita`; `costo`; `colaborar` as everyday “help out”; `listo` for OK/done; `sin rodeos` / ir al grano for plain-talk CTAs; tú form as already used.
   - Avoid B2B slang (`chévere`, `bacano`, `parce`, `¡de una!`, `dar papaya`) — fine in chat tone experiments, not in service/hero copy.
   - `playbook` → **libro de tácticas**; tech `stack` → **stack tecnológico**; relationship `partner` → **proveedor** (not `aliado`/`socio`); `engagement` → **proyecto** (or **acompañamiento**); `handoff(s)` → **traspaso(s)**; fragile `demos` → **demostraciones**; `agentic MDR` → **MDR agéntico**.
   - `roadmap` → **plan estratégico** (not `hoja de ruta` / calqued *roadmap*).
   - `scorecard` → **cuadro de mando** (default corporate metrics); **tablero de control** when stressing visual monitoring; **matriz de indicadores** when it is strictly a KPI/metrics list.
   - `guardrails` → **pautas de control** (operational boundaries); **lineamientos de cumplimiento** (governance / ethics / legal); **parámetros de seguridad** (risk management or AI safety limits). Not *barandillas*.
   - Security: active threat → **incidente de seguridad**; gaps → **vacío(s)** (never `brecha` for gaps); HIBP/data leak → **filtración**.
   - `backup` (data files / IT): **copia de seguridad** (standard professional); **respaldo** as corporate shorthand (e.g. *hacer un respaldo*, *trabajos de respaldo*). Never leave English *backup* in ES.
   - `backup` (business / ops): contingency plan → **plan de contingencia**; secondary vendor → **proveedor de respaldo**; standby hardware/generators → **sistema de reserva** / **sistema alterno**. Do not use data-backup wording for staffing (“needs backup” → **refuerzo**) or “SOC-backed” (**con soporte del SOC**, not *con respaldo SOC*).
   - `headcount` → **planta de personal** / **número de colaboradores**; budget contexts → **aprobación de planta** / **cupos de contratación**.
   - `prompting` → **diseño de prompts** / **formulación de instrucciones (*prompts*)**; formal docs → **redacción de instrucciones para modelos de IA**. Italicize or quote *prompt* on first use.
   - `defaults` → **valores predeterminados** / **configuración por defecto**.
   - `deck` → **presentación** (de diapositivas); not calqued *deck*.
   - `checkbox` (UI) → **casilla de verificación**; figurative “checkbox exercise” → **ejercicio de mero cumplimiento** / **cumplir por cumplir**.
   - `P&L` → **estado de resultados** or Colombian corporate **P&G** (pérdidas y ganancias); “own the P&L” → **tener la responsabilidad del P&G**.
   - `shadow AI` → **IA en la sombra**; in risk reports prefer the explanatory form: **uso no autorizado de herramientas de IA por fuera del control de TI**.
   - `moonshot` → **apuesta ambiciosa** / **iniciativa de alto riesgo y alto impacto**.
   - `legacy` (tech) → **sistemas heredados** (also *infraestructura legada*); reputation → **legado**.
   - `keynote` → **conferencia magistral** / **ponencia principal**.
   - `retainer` → **anticipo de honorarios** / **contrato de honorarios mensuales por disponibilidad**; ongoing advisory → **contrato de asesoría permanente**.
   - `busywork` → **trabajo de relleno** / **tareas operativas sin valor agregado**.
   - `one-pager` → **resumen ejecutivo de una página** / **documento de una página**.
   - `warehouse` → **bodega** (prefer over *almacén* in Co); data warehouse → **bodega de datos**.
   - `journey` / customer journey → **recorrido** / **recorrido del cliente** (prefer over *viaje del cliente*).
   - `counsel` → **asesor jurídico** / **abogado asesor**; General Counsel → **director jurídico** / **vicepresidente jurídico**.
   - `tabletop` / *tabletopeado* → **ejercicio de simulación de mesa** / **simulacro de escritorio** (never the Spanglish verb).
   - Keep EN + ES in sync when strings change.

## Color contrast (brand coral)

- Brand coral token is `--coral: #c0392b` in `src/styles/tokens.css` (~4.96:1 on cream, ~5.44:1 on white).
- Do **not** revert to `#f26b5e` / `rgba(242, 107, 94, …)` for text or UI accents that sit on cream (`--cream`) or white.
- If changing coral (or any text-on-cream/white accent), verify WCAG AA (≥4.5:1) for normal text including `.eyebrow`.
- Safer deeper options if more margin is needed: `#B23A2E`. Do not use `#D6402F` for eyebrow/body accents (fails on beige).
- Keep logo/favicon SVG fills and hardcoded `rgba(...)` accents in sync with `--coral`.
- Focus rings that use coral should update their RGB to match (`--shadow-focus`).

## Descriptive link text (SEO + a11y)

- Never ship bare “Learn more” / “Saber más” / “Click here” / “Read more” as the sole link text when multiple links share that label.
- Use topic-specific copy via i18n templates, e.g. services `learnMoreAbout: '{name}: what’s included'` / industries `'IT built for {name}'` (ES equivalents in `es.ts`). Never bare “Learn more” / “Saber más”.
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

- Unique, descriptive titles and meta descriptions per locale. Prefer **≤60 characters** for titles and **≤155–160** for meta descriptions (SERP soft caps); when humanizing ES copy, re-trim metas — glossary expansions (`copia de seguridad`, `libro de tácticas`, longer industry phrasing) often push ES past EN. Blog post `<title>` tags append ` | Cybercon` in `BlogPostPage.astro` — keep frontmatter titles short enough that the full string stays ≤60.
- After EN/ES wording changes, re-check service/industry/blog metas for length, glossary leftovers in title tags/FAQ JSON-LD, and title↔H1 keyword alignment (e.g. keep *cumplimiento* / *recuperación ante desastres* in ES ranking copy when the H1 includes them).
- **Blog index titles must differ by locale.** EN may use `Blog | Cybercon Solutions`; ES must be localized (e.g. `Blog de TI e IA | Cybercon Solutions`) in `src/i18n/es.ts` and the `markdown-pages.ts` ES blog index frontmatter — do not ship identical EN/ES index titles.
- Internal links: descriptive anchors (see above); avoid duplicate identical CTAs to different URLs.
- Keep `hreflang` / canonical patterns used by `BaseLayout` intact when adding routes.
- **Trailing slashes are canonical.** `trailingSlash: 'always'` + Workers `html_handling: 'force-trailing-slash'`. For high-value URLs, add explicit `301` rules in `public/_redirects` so non-slash and `.html` variants are permanent (assets html_handling alone issues **307**, which can fail GSC “Validate fix” / split indexing). Cover at least: privacy, accessibility, terms, **contact, assessment, blog (+ posts), all `/services/*` and `/industries/*` (EN + ES)**.
- **Legacy `.html` URLs must 301, not 307.** `force-trailing-slash` maps `/page.html` → `/page/` with a temporary 307. Keep static **301** rules near the top of `public/_redirects` (legal pages + the high-value marketing block). Do **not** add a top-of-file `/*.html` splat — Cloudflare requires static rules before dynamic ones; a leading splat makes later static rows count toward the **100 dynamic redirect** limit and breaks `wrangler deploy`. GSC “Page with redirect” for `.html` / `www` / `http` variants is **expected exclusion** once redirects are permanent — do not try to make those URLs return 200.
- **Sitemap hreflang must include `x-default`** (pointing at the EN URL). `@astrojs/sitemap` i18n omits it — keep the `serialize` hook in `astro.config.mjs` that appends `x-default` from the `en-US` alternate.
- **Privacy pages** (`/privacy/`, `/es/privacy/`): ship `PrivacyPolicy` JSON-LD via `privacyPolicyJsonLd` in `PrivacyPage.astro`, keep EN/ES bodies aligned in `src/data/privacy.ts`, and keep both URLs in the sitemap (never `noindex` them).
- **Accessibility Statement** (`/accessibility/`, `/es/accessibility/`): keep EN/ES bodies aligned in `src/data/accessibility.ts` (Figment-style structure: approach, practices, non-conformance honesty, third parties, feedback/contact). Do not claim full WCAG conformance without a formal audit. Ship trailing-slash **301**s in `public/_redirects` (and ES `/accesibilidad/` aliases). Keep both URLs in the sitemap and footer; never `noindex` them.
- **Terms and Conditions** (`/terms/`, `/es/terms/`): keep EN/ES bodies aligned in `src/data/terms.ts` (Figment-style: use of site, IP, third-party links, no professional advice, warranties, liability, indemnification, changes, Florida governing law, contact). Link Privacy from the intro. Ship trailing-slash **301**s plus `/terms-and-conditions/` and ES `/terminos/` aliases; point legacy `/terms-of-service-*` rules at `/terms/` (not `/privacy/`). Keep both URLs in the sitemap and footer; never `noindex` them.
- **Blog posts are fully bilingual.** English lives in `src/content/blog/<slug>.md`; Spanish in `src/content/blog/es/<slug>.md` (same slug, full translated body — not title-only). Wire both in `src/lib/markdown-pages.ts`. Do not ship `/es/blog/...` with an English body or an “artículo en inglés” note.
- **Web design pricing Offers:** `/services/web-design-development/` ships `OfferCatalog` JSON-LD (`webDesignOfferCatalogJsonLd` in `src/lib/seo.ts`) from `src/data/web-design-page.ts` tiers (`priceMinUsd` / `priceMaxUsd` when priced; quote-only Enterprise omits numeric price). Keep it in sync when packages change.

## Cache lifetimes (Zaraz)

- Worker/static assets: use `public/_headers` (e.g. `/videos/*` is already long-lived).
- **Zaraz** (`/cdn-cgi/zaraz/s.js`) is Cloudflare-injected, not a Worker asset — `_headers` cannot set its TTL.
- Zone ID `41a145bf2688a227f9e321a31055fe19` (`cybercon-solutions.com`) is wired into deploy + `scripts/ensure-zaraz-cache-header.mjs`.
- Deploy upserts a Response Header Transform so browsers get `Cache-Control: public, max-age=604800` on that path. API token needs **Transform Rules → Edit**; otherwise create the same rule in the dashboard (README → “Zaraz s.js browser cache”).
- Do not try to “fix” Zaraz caching by vendoring or proxying `s.js` in the Astro app.
- As of the initial fix, the zone had **zero** Response Header Transform rules — the deploy step / dashboard rule is what creates the first one.

## Cookie consent / ePrivacy (prior consent)

Non-essential cookies and trackers must not run until the visitor opts in (ePrivacy / GDPR).

- Banner: `src/components/CookieBanner.astro` — visible on first visit; **Accept analytics** / **Reject non-essential**; footer **Cookie settings** reopens it.
- Preference: first-party cookie `cybercon_consent` + `localStorage` `cybercon-consent-v1` (`accept` \| `decline`). Keys in `src/lib/consent.ts`.
- Google Consent Mode v2 defaults to denied in `BaseLayout` `<head>` before any tags; `Analytics.astro` loads gtag.js only after `accept`.
- Apollo.io website tracker (`ApolloTracker.astro`) loads the same way — only after `cybercon:consent` with `value: 'accept'`. Do not paste Apollo’s install snippet raw into `<head>`; it must stay consent-gated.
- Do not add marketing/analytics scripts that fire before `cybercon:consent` with `value: 'accept'`.
- If using Cloudflare Zaraz tools: enable Zaraz Consent Management in the dashboard, assign tools to an Analytics purpose, and keep the site banner as UI (it syncs via `zaraz.consent.setAll`). Unassigned Zaraz tools skip consent — always assign them.
- Policy copy: `src/data/privacy.ts` must stay aligned with the banner behavior (include Apollo when the tracker ships).
- When fixing a new Cookiebot / GDPR / ePrivacy audit finding, update this section in the same PR.

## Checklist before finishing UI/perf/SEO work

- [ ] No generic repeated link labels (“Learn more”) without topic names
- [ ] Coral/text accents still meet AA on cream and white
- [ ] LCP image has `fetchpriority="high"` and is not lazy-loaded
- [ ] No `video[poster]` competing with a hero LCP `<img>`
- [ ] Hero preload `type` / `imagesrcset` matches the winning `<picture>` source
- [ ] EN and ES copy/templates updated together when user-facing strings change
- [ ] Titles ≤~60 chars and meta descriptions ≤~155–160 after copy edits (especially ES glossary expansions)
- [ ] New/edited marketing copy matches industry-page specificity (no SEO-echo third paragraphs; no theater/deck/demo denial stack; engineer-reply trust line once per surface)
- [ ] ES user-facing strings use Colombian Spanish per skill glossary (`computador`/`celular`/`correo`, `proveedor`, `sin rodeos`, `libro de tácticas`, `stack tecnológico`; security: `incidente de seguridad` / `vacío(s)` / `filtración`; no Spainisms or B2B slang)
- [ ] New blog posts have matching `src/content/blog/es/<slug>.md` bodies (not English-only under `/es/`)
- [ ] Sitemap entries that have `en-US`/`es-US` also include `x-default` (see `astro.config.mjs` serialize)
- [ ] `/privacy` and `/es/privacy` (no slash) 301 to the slashed canonicals in `_redirects`
- [ ] `/accessibility` and `/es/accessibility` (no slash) 301 to the slashed canonicals; ES `/accesibilidad/` aliases point at `/es/accessibility/`
- [ ] `/terms` and `/es/terms` (no slash) 301 to the slashed canonicals; `/terms-and-conditions/` and ES `/terminos/` aliases point at `/terms/` / `/es/terms/`
- [ ] High-value marketing URLs (contact, assessment, blog + posts, services, industries — EN/ES) have non-slash and `.html` **301**s in `_redirects`
- [ ] Legacy `.html` URLs (`/index.html`, `/privacy.html`, `/es/…`, marketing block) 301 (not 307) to trailing-slash canonicals; no leading `/*.html` splat in `_redirects`
- [ ] ES blog index title is localized (not identical to EN `Blog | Cybercon Solutions`)
- [ ] Web design pricing page keeps `OfferCatalog` JSON-LD aligned with visible tiers
- [ ] Zaraz `s.js` still has a browser Cache-Control (dashboard rule or `cf:zaraz-cache`)
- [ ] Non-essential analytics/trackers still gated behind prior consent (banner + Consent Mode defaults denied)
- [ ] `npm run build` passes (primary validation gate)

## Related files

| Concern | Where |
|--------|--------|
| Coral token | `src/styles/tokens.css` |
| Hero LCP | `src/components/Hero.astro` |
| Hero preload | `src/pages/index.astro`, `src/pages/es/index.astro` |
| Services/industries links | `ServicesGrid.astro`, `IndustriesSection.astro`, `src/i18n/{en,es}.ts` |
| Marketing copy / voice | `src/i18n/{en,es}.ts`, `src/data/service-details.ts`, `src/data/industries.ts`, `src/data/services.ts`, `src/lib/markdown-pages.ts` |
| Blog EN/ES bodies | `src/content/blog/`, `src/content/blog/es/`, `src/lib/blog.ts` |
| Global focus / eyebrow | `src/styles/global.css` |
| Zaraz browser cache | `scripts/ensure-zaraz-cache-header.mjs`, deploy.yml |
| Cookie consent / ePrivacy | `CookieBanner.astro`, `Analytics.astro`, `ApolloTracker.astro`, `BaseLayout.astro`, `src/lib/consent.ts`, `src/data/privacy.ts` |
| Privacy SEO / sitemap | `PrivacyPage.astro`, `privacyPolicyJsonLd` in `src/lib/seo.ts`, `astro.config.mjs` sitemap serialize, `public/_redirects`, `wrangler.jsonc` `html_handling` |
