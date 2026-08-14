---
name: commercial-web-readiness
description: >-
  Prevent silent lead loss, overclaimed proof, diluted positioning, and weak
  conversion funnels on Astro + Cloudflare marketing / MSP / service-business
  sites (Cybercon, and similar Acosta feature web projects). Use when building
  or editing assessment/contact forms, CRM delivery, homepage heroes, nav IA,
  case studies, About/leadership, CTAs, local SEO/LocalBusiness schema, health
  endpoints, client portals, analytics funnel events, or commercial audits.
  Prefer this skill for revenue/credibility work; use web-quality-standards for
  LCP, contrast, a11y link text, Zaraz, and Colombian Spanish copy voice.
paths:
  - "src/pages/api/**"
  - "src/lib/lead-delivery.ts"
  - "src/lib/attio.ts"
  - "src/lib/turnstile*.ts"
  - "src/lib/form-rate-limit.ts"
  - "src/lib/analytics-events.ts"
  - "src/lib/seo.ts"
  - "src/lib/site.ts"
  - "src/components/*Form*"
  - "src/components/Hero*"
  - "src/components/Header*"
  - "src/components/*Assessment*"
  - "src/components/*Contact*"
  - "src/components/About*"
  - "src/components/Trust*"
  - "src/components/Pillars*"
  - "src/components/Evidence*"
  - "src/components/Local*"
  - "src/content/blog/**/*case-study*"
  - "src/data/customer-stories.ts"
  - "src/data/local-pages.ts"
  - "src/i18n/**"
  - ".cursor/skills/commercial-web-readiness/**"
  - ".cursor/rules/commercial-web-readiness.mdc"
---

# Commercial web readiness

Use this skill on **feature marketing / lead-gen web projects** (Astro + Cloudflare Workers Assets, bilingual EN/ES when applicable). It encodes the commercial-readiness audit that raised Cybercon from “strong tech, weak conversion” to fail-closed lead capture + defensible proof + clear MSP positioning.

**Companion:** `.cursor/skills/web-quality-standards/SKILL.md` for LCP, contrast, SEO link text, Zaraz, consent, and Colombian Spanish voice. Do not duplicate those rules here.

**Reference implementation (Cybercon):** `src/lib/lead-delivery.ts`, `src/pages/api/{assessment,contact,health}.ts`, homepage sections under `src/components/{TrustStrip,ProblemsSection,PillarsSection,EvidenceSection,FitCoverageSection,AboutPage,AssessmentForm}.astro`.

## Maintaining this skill (required)

When you fix a **new** commercial / conversion / credibility finding:

1. Codify the rule here (wrong pattern → required pattern → where it lives).
2. Add a checklist line under **Ship checklist**.
3. Mirror one-line non-negotiables in `.cursor/rules/commercial-web-readiness.mdc`.
4. If Cybercon-specific paths change, update **Related files**.
5. Do this in the **same PR** as the fix.

---

## Priority order (do not invent a different one)

When an audit or feature request spans many items, execute in this order:

1. **Protect revenue** — lead delivery, Turnstile, rate limits, no silent success.
2. **Protect credibility** — case-study attribution, operational claims, address/GBP consistency.
3. **Clarify positioning** — primary offer above the fold; secondary offers nested.
4. **Put proof in the conversion path** — trust strip + founder/About under the hero.
5. **Align the funnel** — CTA copy matches what the form delivers; schedule + attribution + events.
6. **Expand qualified traffic** — local pages, author schema, bottom-of-funnel content, CI checks.

Do **not** prioritize more AI agent discovery files, chat toys, decorative animation, or generic blog posts while lead capture or attribution is still wrong.

---

## 1. Lead delivery (highest priority)

### Wrong
- Form returns `{ ok: true }` when the lead only hit `console.log`.
- Attio failure returns `502` immediately without trying the email/alert fallback.
- Turnstile skipped entirely when the secret is missing in production.
- No rate limiting on assessment/contact.

### Required
```ts
// Conceptual contract — Cybercon: src/lib/lead-delivery.ts
if (!attioConfigured() && !web3formsConfigured()) {
  if (import.meta.env.DEV) { /* console ok in local only */ }
  else return 503; // "Lead delivery is temporarily unavailable"
}
// 1) Attempt Attio
// 2) If Attio fails (or unset), attempt Web3Forms
// 3) Success only if at least one durable sink accepted the lead
// 4) Else 502 "Delivery failed"
```

- Production: **require Turnstile** when forms are public (`src/lib/turnstile-gate.ts`). Missing secret → fail closed (`503`), do not silently disable.
- Soft daily IP/global caps on assessment/contact (`src/lib/form-rate-limit.ts`).
- Prefer one shared delivery helper used by every lead path (assessment, contact, and later chat/site-check leads).
- Optional later: durable outbox (Queue/D1), dead-letter alerts, synthetic form → Attio monitor.

### Dev vs prod
| Environment | No sinks configured | Behavior |
|-------------|---------------------|----------|
| `astro dev` | Allowed | Log payload; may return `{ ok: true, via: 'dev-console' }` |
| Deployed Worker | Forbidden | `503` — never fake success |

---

## 2. Proof attribution (trust / legal)

### Wrong
- Founder CIO/CISO career wins labeled **Our Customers** or “Cybercon partnered / delivered.”
- Closing disclaimers that say “work delivered by {Company}” for pre-founding employment results.

### Required
Split content into:

| Category | Language | Nav |
|----------|----------|-----|
| Contracted customer results | “{Company} delivered…” only with documentation | Customers / Case studies |
| Founder leadership experience | “Before founding {Company}, {Name} led…” | **Results** (or Leadership experience) |

- Cybercon frontmatter: `storyAttribution: founder-leadership` + keep industry grouping if needed.
- Never put founder-career stories under a label that implies they were company customers.

---

## 3. Positioning (homepage + nav)

### Wrong
- Ten equal service cards (MSP + four AI products + web design) competing in the first scroll.
- Hero secondary CTA that diverts to a low-value tool (e.g. free site check) on an MSP homepage.

### Required
State the primary offer in one sentence, e.g.:

> **{Company} is a managed IT and cybersecurity partner with CIO-level strategic capability.**

Homepage structure (adapt names, keep jobs):

1. **Hero** — brand/tagline, one H1, one lede, primary CTA (assessment/review), secondary CTA to core offer page — not a distraction tool.
2. **Trust strip** — only defensible facts (years, coverage, languages, monitoring, regulated industries).
3. **Problems you solve** — one job per bullet.
4. **Three pillars** (e.g. Run / Protect / Plan) — not a flat catalog.
5. **Evidence** — founder proof and/or defensible outcomes + link to sample reporting if you have it.
6. **Fit + local coverage** — who you serve; mailing vs onsite honesty.
7. **Assessment / schedule** — repeat the honest offer.

Nav model (example):

- Core: Managed IT · Cybersecurity · Cloud/Backup/Strategy  
- Secondary submenu: Projects & Innovation (AI, web, one-off builds)  
- Industries · Results · Resources (Blog, About) · **Book an Assessment**

---

## 4. CTA / funnel honesty

### Wrong
- CTA: “See what your IT actually costs” → form that only collects name/company/email and promises a callback.
- Thank-you dead-ends with no scheduling path.
- One universal CTA on every service page (e.g. IT cost review on an AI consulting page).

### Required
- Prefer **Option A**: rename CTA to match reality (“Get a free IT cost & risk review” / “Book my free review”).
- Only use calculator/instant-number CTAs if the calculator ships.
- After submit: acknowledge receipt + **open scheduler** when `PUBLIC_CALENDAR_URL` (or equivalent) is set.
- Keep a short required step; optional second step (employees, locations, challenge, service interest, current IT model, start date, phone).
- Capture hidden attribution: first/last landing, referrer, UTMs, locale, CTA, service page, tool completions.
- Consent-gated analytics events at minimum:

```text
assessment_started
assessment_submitted
assessment_delivery_success
assessment_delivery_failed
meeting_scheduler_opened
meeting_booked
phone_clicked
email_clicked
site_check_started
site_check_completed
breach_check_completed
chat_lead_captured
```

Cybercon: `AttributionTracker.astro` + `src/lib/analytics-events.ts`.

---

## 5. Founder / About / author proof

### Wrong
- Proof buried only under a nav accordion; no About/leadership page.
- Blog posts with Organization-only author and no human byline.

### Required
- Dedicated **About / Leadership** page with name, role, credentials, defensible facts, Person JSON-LD.
- Place a founder/trust block in the homepage conversion path (not only footer).
- Blog: visible byline (“Written by {Name}, {Role}”) linking to About; `BlogPosting.author` as `Person`.

---

## 6. Local SEO & address honesty

### Wrong
- Virtual / PMB mailing address presented as a staffed office in copy, GBP, or LocalBusiness schema.
- Dozens of thin city pages that only swap the city name.

### Required
- Label mailing-only addresses: **“Mailing address—no customer visits.”**
- Service-area businesses: emphasize `areaServed`; do not invent a visit-able HQ.
- Align website ↔ GBP ↔ legal docs.
- Prefer a **few substantial** local pages (original coverage, industries, FAQ, call path) over thin doorways.
- Cybercon examples: `/services/managed-it/{cooper-city,davie,broward-county}/` (+ ES).

---

## 7. Security & reliability surfaces

### Wrong
- Public `/api/health` exposing every integration boolean (Attio, Auth0 var presence, AI keys present, etc.).
- `/client` (or any protected area) continues when auth is unconfigured.
- No CSP/framing baseline; no CI check for lead-delivery fail-closed.

### Required
- Public health: `{ ok: true, time }` only. Detail route behind a shared secret / Access.
- Protected routes **fail closed** (404/503) when auth is unset — before any real client data exists.
- Ship CSP-Report-Only first (account for Turnstile, GA, chat, Calendly, AI APIs), then enforce; add `frame-ancestors`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`.
- CI smoke: no “coming soon” homepage copy; middleware security headers present; lead-delivery 503 string present (`scripts/ci-smoke-checks.mjs` pattern).

---

## 8. Content strategy (after the above)

Publish bottom-of-funnel articles tied to buyer questions (pricing, inclusions, MSP replacement, compliance checklists, onboarding, QBR metrics) — not more generic tech commentary.

Every article/service page gets a **service-specific** CTA.

---

## Ship checklist (commercial)

- [ ] Assessment/contact never return `{ ok: true }` in production without a configured sink
- [ ] Attio failure falls back to Web3Forms (or secondary sink) before failing the user
- [ ] Turnstile required in production; missing secret fails closed
- [ ] Form rate limits present on public lead endpoints
- [ ] Case studies / results use correct attribution (customer vs founder leadership)
- [ ] Homepage primary offer is unambiguous within the first viewport
- [ ] Secondary offers (AI, web, projects) are nested — not equal hero weight
- [ ] Trust/founder proof appears in the homepage conversion path
- [ ] About/leadership page exists with Person schema when a founder is the proof
- [ ] CTA copy matches what the form/page actually delivers
- [ ] Optional enrichment + attribution fields on lead forms
- [ ] Funnel events wired (consent-aware)
- [ ] Mailing vs service-area language consistent in footer, contact, JSON-LD
- [ ] Local pages (if any) are substantial, not city-name swaps
- [ ] Public health is minimal; detail is authenticated
- [ ] Client/portal routes fail closed without auth config
- [ ] CI smoke covers lead-delivery fail-closed + no stale coming-soon homepage
- [ ] EN + ES strings updated together (see web-quality-standards for Co Spanish)

---

## Anti-patterns (refuse these “improvements”)

- “We’ll log leads in production until CRM is ready” as a shipping state
- Restoring a flat ten-service homepage grid as the first impression
- Putting site-check / breach-check as the MSP hero secondary CTA
- Claiming customer logos/results without contracts
- Instant quote / cost calculator CTAs without a calculator
- Adding thin `/city/` doorway pages for SEO volume
- Expanding public `/api/health` “for monitoring convenience”
- Soft-opening `/client` without Auth0 “just for now”

---

## Related files (Cybercon)

| Concern | Where |
|--------|--------|
| Lead delivery | `src/lib/lead-delivery.ts`, `src/pages/api/assessment.ts`, `src/pages/api/contact.ts` |
| Turnstile gate | `src/lib/turnstile-gate.ts` |
| Form rate limits | `src/lib/form-rate-limit.ts` |
| Attribution + events | `src/components/AttributionTracker.astro`, `src/lib/analytics-events.ts` |
| Assessment UX | `src/components/AssessmentForm.astro` |
| Homepage commercial IA | `src/pages/index.astro`, `TrustStrip`, `ProblemsSection`, `PillarsSection`, `EvidenceSection`, `FitCoverageSection` |
| Nav IA | `src/components/Header.astro` |
| About / Person | `src/components/AboutPage.astro`, `founderPersonJsonLd` in `src/lib/seo.ts` |
| Results attribution | `src/content/blog/*case-study*`, `src/data/customer-stories.ts`, `content.config.ts` |
| Address / schema | `src/lib/site.ts`, `organizationJsonLd` in `src/lib/seo.ts` |
| Local pages | `src/data/local-pages.ts`, `LocalManagedItPage.astro` |
| Health | `src/pages/api/health.ts`, `src/pages/api/health/detail.ts` |
| Client fail-closed | `src/middleware.ts` |
| CI smoke | `scripts/ci-smoke-checks.mjs` |
| Env docs | `.env.example`, `AGENTS.md` |
