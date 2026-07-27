---
name: website-deep-assessment
description: >-
  Run a full deep website assessment for Cybercon Solutions (or a prospect site):
  SEO, speed/Core Web Vitals, privacy policy, cookie consent, accessibility
  (WCAG / ADA / Section 508), security (TLS and safe data collection), GDPR, and
  CCPA. Use after the lite site-check teaser, when preparing a free assessment
  follow-up, or when reviewing web design & development work. Prefer evidence
  over guesses; mark N/unknown when the surface does not support a claim.
paths:
  - "src/**/*.{astro,css,ts,tsx,md}"
  - "public/**/*"
  - ".cursor/skills/website-deep-assessment/**"
  - "public/.well-known/agent-skills/cybercon-website-assessment/**"
---

# Website deep assessment

This is Cybercon’s **full** website review — not the lite `#site-check` teaser.
Use it to produce a calm, evidence-based pass that a business owner can act on,
and that an engineer can turn into a remediation plan.

**Lite vs deep**

| | Lite site check | Deep assessment |
|---|---|---|
| Where | `/services/web-design-development/#site-check` | Free assessment call + engineer follow-up |
| Depth | ~60s surface peek, one finding | Multi-area review with prioritized fixes |
| Output | Curiosity + CTA | Written findings, grades/notes, next steps |

Entry points for humans: https://cybercon-solutions.com/assessment/ · https://cybercon-solutions.com/services/web-design-development/

## How to run this skill

1. **Scope the site** — primary hostname, locales (EN/ES), key templates (home, contact, privacy, service pages).
2. **Collect evidence** — live HTML/headers, Lighthouse/PageSpeed (mobile + desktop), sitemap/robots, privacy/cookie UX, form flows.
3. **Score each area below** — use letter grades only when evidence supports them; otherwise **N** (not assessable yet) with what a deeper pass needs.
4. **Prioritize** — top 3–7 fixes by business risk (trust, legal exposure, conversions, security), not vanity metrics.
5. **Deliver** — plain-language summary + evidence bullets + recommended next steps (Cybercon can implement via Web Design & Development / assessment).
6. **Do not invent** — never claim absence of CDN/WAF/analytics from missing page markup alone; check headers/DNS. Never invent compliance certification.

Tone: sage, specific, zero fear-mongering. Tagline context: “Technology, handled.”

---

## 1. SEO

**Goal:** The site can be found for the right queries and answers buyer questions.

Check:

- Unique `<title>` and meta description per important URL (locale-aware EN/ES).
- One logical `h1`; sensible heading order.
- Canonical + `hreflang` when multiple locales exist.
- XML sitemap and `robots.txt` allow indexing of marketing pages; block only what should be private (`/client/`, APIs, etc.).
- Descriptive internal link text (no bare “Learn more” / “Saber más” clusters).
- Meaningful image `alt` where informative; empty `alt=""` only when decorative.
- Structured data where relevant (Organization, Service, FAQ, BreadcrumbList) — valid, not spammy.
- Soft 404s / thin pages / duplicate titles.

Evidence sources: live HTML, `llms.txt` / sitemap, Search Console if available, crawler pass.

---

## 2. Speed (performance / Core Web Vitals)

**Goal:** Fast, stable loads on real mobile networks — especially LCP, INP, CLS.

Check:

- **LCP** — prioritized hero/main image (`fetchpriority="high"`, not lazy); preload matches the format `<picture>` selects; avoid competing `video[poster]` over the LCP image.
- Render-blocking CSS/JS; defer non-critical scripts.
- Image weight and responsive `srcset` / modern formats (AVIF/WebP where appropriate).
- Font loading strategy (no large layout shifts; reasonable subsets).
- Cache lifetimes for static assets; third-party script cost (analytics only after consent).
- Field or lab CWV: LCP, INP, CLS on mobile + desktop.

Evidence sources: Lighthouse / PageSpeed Insights, DevTools Performance/Network, Cybercon web-quality-standards skill for this codebase.

---

## 3. Privacy Policy

**Goal:** Visitors can see what data is collected and how it is used.

Check:

- Discoverable privacy page (footer + form flows).
- Explains categories of data (forms, analytics, cookies, CRM), purposes, retention, and contact for privacy requests.
- Matches **actual** tools in use (Turnstile, Attio, Web3Forms, GA, Zaraz, etc.) — no stale vendor lists.
- Locale coverage when the site is bilingual (EN + ES policies or clear language handling).
- Last-updated clarity where practical.

Evidence sources: `/privacy/` (and `/es/privacy/`), form disclosures, cookie banner copy.

---

## 4. Cookie consent

**Goal:** Clear prior choice to allow or block non-essential tracking.

Check:

- Banner or equivalent on first visit; Accept / Reject (or equivalent) for non-essential cookies.
- Non-essential scripts (e.g. Google Analytics) **do not load** until accept.
- Preference persisted (cookie / localStorage) and reopenable (e.g. footer “Cookie settings”).
- Aligns with Consent Mode / Zaraz consent if those tools are present.
- Reject path still allows essential site use (forms with Turnstile, session for client area, consent storage).

Evidence sources: first-load network log before consent, banner UX, privacy policy cross-check.

---

## 5. Accessibility (WCAG)

**Goal:** People with disabilities can perceive, operate, and understand the site (WCAG 2.2 AA as the working bar).

Check:

- Keyboard access to all interactive controls; visible `:focus-visible`.
- Skip link to main content; `<main id="main-content">` landmark.
- Color contrast ≥ 4.5:1 for normal text (including eyebrows/accents on cream/white).
- Form labels, errors (`role="alert"` / `aria-live` where needed), and name/role/value for controls.
- Target size and spacing for primary actions where practical.
- Motion: respect `prefers-reduced-motion` for decorative video/animation.
- `target="_blank"` links disclose new window/tab in the accessible name.

Evidence sources: keyboard pass, axe/Lighthouse a11y, manual screen-reader spot checks on critical flows.

---

## 6. Security

**Goal:** Transport is encrypted; data collection is intentional and protected.

Check:

- HTTPS everywhere; HSTS when appropriate; no mixed content.
- TLS configuration not obviously broken (expired cert, wrong host).
- Forms POST to trusted endpoints; CSRF/bot protection where applicable (e.g. Turnstile).
- Security headers as observed (CSP, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`, etc.) — grade presence honestly; do not invent CDN/WAF absence from HTML alone.
- No secrets in client HTML/JS; admin or debug surfaces not public.
- Dependency/hosting hygiene notes for remediation plans (patching, least privilege) when in scope.

Evidence sources: response headers, certificate view, form network calls, public repo/config review when assessing Cybercon’s own site.

---

## 7. GDPR (EU data protection)

**Goal:** Lawful, transparent processing for people in the EU/EEA when the site reaches them.

Check (proportionate to whether the business targets or monitors EU users):

- Lawful basis story for analytics/marketing cookies (consent) vs necessary processing.
- Privacy notice covers international transfers / processors if relevant.
- Path for access/deletion requests (email or form) is real and monitored.
- No pre-ticked marketing consent; cookie consent is granular enough for non-essential tools.
- Data minimization on forms (only fields you need).

Note: This skill does **not** certify GDPR compliance. Flag gaps and recommend counsel for legal determinations.

---

## 8. CCPA / CPRA (California)

**Goal:** California consumers can understand collection and exercise privacy rights.

Check (when the business is in scope or sells/shares personal information in relevant ways):

- Privacy policy discloses categories collected and purposes in plain language.
- “Do Not Sell or Share” / opt-out mechanism if selling/sharing applies — or a clear statement that the business does not sell.
- Request methods for know/delete/correct are usable.
- Analytics/ads configuration matches the public claims.

Note: Not a legal opinion. Document observed UX and policy text; escalate legal calls.

---

## 9. ADA / Section 508

**Goal:** Digital experiences meet accessibility expectations for public-facing and government-related contexts.

Check:

- Map WCAG findings to ADA Title II/III risk language for public accommodations **without** claiming courtroom outcomes.
- For government / public-sector prospects: align remediation language with **Section 508** / WCAG-based standards (see https://www.section508.gov/).
- Prioritize barriers that block tasks (forms, navigation, media captions, document alternatives).

Evidence sources: same as Accessibility, plus client’s regulatory context from the discovery call.

---

## Deliverable template

```markdown
# Website deep assessment — {domain}
Date: {ISO date}
Assessor: {name}

## Executive summary
{3–6 sentences: overall posture, biggest risks, recommended next step}

## Scores
| Area | Grade (A–F or N) | One-line note |
|------|------------------|---------------|
| SEO | | |
| Speed | | |
| Privacy policy | | |
| Cookie consent | | |
| Accessibility (WCAG) | | |
| Security | | |
| GDPR | | |
| CCPA | | |
| ADA / Section 508 | | |

## Priority fixes
1. …
2. …
3. …

## Evidence & details
### SEO
…
### Speed
…
(etc.)

## Recommended next step
Book / continue Cybercon free assessment · Web Design & Development remediation plan
```

## Related Cybercon surfaces

- Lite teaser: `/services/web-design-development/#site-check` → `POST /api/site-check`
- Free assessment booking: `/assessment/` → `POST /api/assessment`
- Public agent skill (short): `/.well-known/agent-skills/cybercon-website-assessment/SKILL.md`
- Internal web quality rules for *this* repo: `.cursor/skills/web-quality-standards/SKILL.md`
