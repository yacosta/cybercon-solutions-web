---
name: website-deep-assessment
description: >-
  Run a full deep website assessment in Cursor only (not a public agent skill)
  and produce a Cybercon Solutions–branded PDF for the customer. Covers SEO,
  speed/Core Web Vitals, privacy policy, cookie consent, accessibility
  (WCAG / ADA / Section 508), security, GDPR, and CCPA. Use after the lite
  site-check teaser, for free-assessment follow-up, or before remediation.
  Prefer evidence over guesses; mark N when the surface does not support a claim.
paths:
  - ".cursor/skills/website-deep-assessment/**"
  - "scripts/website-assessment/**"
---

# Website deep assessment (Cursor → branded PDF)

**Run this skill only inside Cursor.** Do not publish it under
`public/.well-known/agent-skills/`. The customer deliverable is a
**Cybercon Solutions–branded PDF**, not a markdown dump in chat.

This is the **full** website review — not the lite `#site-check` teaser.

| | Lite site check | Deep assessment (this skill) |
|---|---|---|
| Where | `/services/web-design-development/#site-check` | Cursor only |
| Depth | ~60s surface peek, one finding | Multi-area review with prioritized fixes |
| Output | Curiosity + CTA | **Branded PDF** for the customer |

Tone: sage, specific, zero fear-mongering. Tagline: “Technology, handled.”
Brand coral for accents/text that must pass AA: `#c0392b` (never restore `#f26b5e` for those uses).

---

## Workflow (required)

1. **Scope** — primary hostname, locales (EN/ES), key templates (home, contact, privacy, service pages). Confirm client display name for the cover.
2. **Collect evidence** — live HTML/headers, Lighthouse/PageSpeed (mobile + desktop), sitemap/robots, privacy/cookie UX, form flows. Do not invent CDN/WAF/analytics from missing markup alone.
3. **Score each area** — letter grades A–F only with evidence; otherwise **N** plus what a deeper pass needs.
4. **Prioritize** — top 3–7 fixes by business risk (trust, legal exposure, conversions, security).
5. **Write findings JSON** — follow `scripts/website-assessment/findings.schema.json`. Start from `scripts/website-assessment/example-findings.json`. Save under `tmp/` (gitignored) or another non-committed path, e.g. `tmp/assessment-<domain>-findings.json`.
6. **Render the branded PDF**:

```bash
pip install fpdf2   # once per environment
npm run assessment:pdf -- \
  --findings tmp/assessment-<domain>-findings.json \
  --out tmp/Cybercon-Website-Assessment-<Domain>.pdf
```

7. **Share with the customer** — attach/send the PDF. Keep findings JSON internal unless they ask for raw data.
8. **Do not invent** — never invent compliance certification or courtroom outcomes.

Optional: also keep a short chat summary for the internal engineer; the PDF is the external artifact.

---

## Areas to assess

### 1. SEO

- Unique `<title>` and meta description per important URL (locale-aware).
- One logical `h1`; sensible heading order; canonical + `hreflang` when multi-locale.
- XML sitemap + `robots.txt`; descriptive link text (no bare “Learn more” / “Saber más”).
- Meaningful `alt`; structured data only when valid and relevant.
- Soft 404s / thin / duplicate titles.

### 2. Speed (Core Web Vitals)

- LCP image prioritized (`fetchpriority="high"`, not lazy); preload matches `<picture>` format.
- Avoid competing `video[poster]` over the LCP image.
- Render-blocking CSS/JS; image weight/`srcset`/modern formats; font loading; cache; third-party cost after consent.
- Lab or field LCP, INP, CLS (mobile + desktop).

### 3. Privacy policy

- Linked, findable, current contact for privacy requests.
- Describes collection, processors, retention, cookies/ads, rights requests.
- Forms point to the notice; marketing claims match practice.

### 4. Cookie consent

- Non-essential tags (analytics/ads) wait for consent; reject as easy as accept.
- Banner readable and keyboard-accessible; preference storage behaves correctly.
- Essential vs non-essential categories explained in plain language.

### 5. Accessibility (WCAG 2.2 AA mindset)

- Skip link → `#main-content`; landmarks; focus visible; name matches visible text (WCAG 2.5.3).
- `target="_blank"` → `rel="noopener noreferrer"` + new-window hint in the accessible name.
- Contrast (brand coral `#c0392b` on cream/white for text/eyebrows); forms labeled; errors clear.
- No keyboard traps; captions/alternatives for media where relevant.

### 6. Security (public site + data collection)

- HTTPS everywhere; HSTS when appropriate; mixed content absent.
- Sensible security headers where feasible (CSP staged carefully).
- Forms: CSRF/bot protection as applicable; no secrets in client HTML; least data collected.
- Admin/login surfaces not casually exposed; dependency/XSS red flags on marketing pages.

### 7. GDPR (when EU residents are in scope)

- Lawful basis / purpose clarity; processors and transfers described.
- Consent quality for non-essential processing; easy withdrawal.
- If not in scope, score **N** and say what would be needed — do not fake compliance.

### 8. CCPA / California privacy

- Notice at collection; Do Not Sell/Share or equivalent when required by their ad stack.
- Consumer request method; service-provider vs sharing language matches tags in use.
- If no CA personal information / no sale-share, document that evidence — do not overclaim.

### 9. ADA / Section 508

- Map WCAG barriers to ADA risk language for public accommodations **without** courtroom claims.
- Government / public-sector: align remediation language with Section 508 / WCAG-based standards.
- Prioritize task-blocking issues (forms, nav, captions, document alternatives).

---

## Findings JSON (minimum)

```json
{
  "meta": {
    "domain": "client.com",
    "clientName": "Client Name",
    "url": "https://client.com",
    "assessmentDate": "2026-07-27",
    "assessor": "Cybercon Solutions",
    "locales": ["en"],
    "confidential": true
  },
  "executiveSummary": "…",
  "scores": [{ "area": "SEO", "grade": "B", "note": "…" }],
  "priorityFixes": [{ "title": "…", "severity": "high", "detail": "…" }],
  "sections": [{
    "id": "seo",
    "title": "SEO",
    "grade": "B",
    "summary": "…",
    "findings": [{
      "severity": "medium",
      "title": "…",
      "evidence": "…",
      "recommendation": "…"
    }]
  }],
  "nextStep": "…"
}
```

Expected score rows: SEO, Speed, Privacy policy, Cookie consent, Accessibility (WCAG), Security, GDPR, CCPA, ADA / Section 508.

---

## PDF branding (do not freestyle)

Generator: `scripts/website-assessment/generate-assessment-pdf.py` (fpdf2), same family as the sample QBR PDF.

- Cover: navy band `#0f2c4c`, coral rule `#c0392b`, “CYBERCON SOLUTIONS” + “Website Deep Assessment”
- Body: navy headings, muted meta, cream-striped scorecard, severity tags on fixes
- Footer: page numbers + cybercon-solutions.com + “Technology, handled.”
- Disclaimer: not a legal opinion or certification

After rendering, spot-check the first page reads as Cybercon (brand test), not a generic audit template.

---

## Related surfaces

- Lite teaser: `/services/web-design-development/#site-check` → `POST /api/site-check`
- Free assessment booking: `/assessment/` → `POST /api/assessment`
- This repo’s web quality rules: `.cursor/skills/web-quality-standards/SKILL.md`
- Public well-known skills stay limited to services + assessment booking — **not** this deep review
