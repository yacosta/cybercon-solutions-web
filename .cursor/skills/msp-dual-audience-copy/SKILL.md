---
name: msp-dual-audience-copy
description: >-
  Audit and rewrite MSP website copy so it converts BOTH non-technical business
  owners (CEOs, founders) AND technical IT managers (IT directors, sysadmins) on
  the same page, bridging technical execution and business outcomes. Use this
  skill whenever the user asks to check, review, audit, rewrite, improve, or
  "punch up" website copy, landing pages, service pages, hero sections,
  headlines, CTAs, or marketing messaging for Cybercon Solutions or any MSP /
  IT services / cybersecurity provider — even if they only paste raw page text
  or a URL and say "make this better," "does this copy work," or "who is this
  page speaking to." Also trigger for writing NEW MSP page copy from scratch.
paths:
  - "src/**/*.{astro,ts,md}"
  - "src/i18n/**"
  - "src/data/**"
  - "src/content/**"
  - ".cursor/skills/msp-dual-audience-copy/**"
---

# MSP Dual-Audience Copy Doctor

Audit and rewrite managed-services website copy so a single page converts two very different readers at once: the business owner who signs the check, and the IT manager who has to live with the vendor. These two segments speak different languages, evaluate risk differently, and respond to different psychological triggers. Copy that averages between them ("we deliver best-in-class IT solutions") persuades neither. Copy that serves both — outcome language where the owner scans, capability proof where the IT reader digs — wins the deal twice on the same page.

## Default client context: Cybercon Solutions

Unless the user names a different company, assume the copy belongs to **Cybercon Solutions** (cybercon-solutions.com), an MSP serving small businesses and nonprofits in Cooper City, Davie, and surrounding South Florida. Apply this context to every rewrite:

- **Brand archetype:** Sage — calm, competent, plain-spoken authority. Never hype, never fear-mongering. The voice of the advisor who has seen it all and isn't rattled.
- **Tagline:** "Technology, handled." Rewrites should feel like that sentence sounds: short, confident, load-off-your-shoulders.
- **Credibility levers:** founder-led by a CISO with 25+ years of enterprise technology leadership; enterprise-grade discipline (zero-trust, compliance: HIPAA, FERPA, PCI) brought to small-business budgets.
- **Lead magnet:** a free instant domain security snapshot (SPF/DKIM/DMARC, SSL, DNS hygiene, breach exposure). Prefer this as a low-friction CTA over generic "Contact us."
- **Market:** local SMBs and nonprofits — copy may name the community; local specificity is a trust signal chains can't fake.

If the user supplies a different brand, collect the equivalent facts (archetype/voice, tagline, credibility levers, lead magnet, market) before rewriting, and use those instead.

## The two readers

This matrix is the core of the skill. Every headline, section, and CTA must be traceable to at least one column — and the page as a whole must cover both.

| Copy metric | Business owners (CEOs, founders) | IT management (IT directors, sysadmins) |
|---|---|---|
| **Primary frustration** | Technology spend without a roadmap; surprise break/fix invoices eating capital | Internal staff overwhelmed by routine patching, server updates, and basic printer/helpdesk noise |
| **Core desire** | Calm, predictable operational costs and uninterrupted uptime | 24/7/365 live endpoint monitoring, advanced tooling (EDR/XDR), reliable escalation backup |
| **The "barstool" pivot** | "We handle the background tech noise so you can focus strictly on growing your business margins." | "We take over the routine, repetitive engineering tasks so your internal team can execute on real strategy." |
| **CTA trigger** | Clear economic tradeoffs: which tools to retire, which operational risks are now funded | Actionable engineering blueprints, fast SLA response times, direct access to an active SOC tier |

Notes on reading the matrix well:

- **Frustration before features.** Both readers decide emotionally first. Name the pain in their own words before describing any service. An owner has never said "endpoint"; a sysadmin has never said "peace of mind" out loud.
- **The barstool pivot** is the one-sentence answer to "so what do you actually do?" that you'd give on the next barstool over — no deck, no jargon. Every page needs one, tuned to whichever reader that page (or section) primarily serves. It always follows the shape: *we absorb X (the annoying thing) so you can do Y (the thing you actually care about).*
- **Threat framing differs.** For the owner, the villain is unpredictability (surprise invoices, downtime, spend with no roadmap). For the IT reader, the villain is toil (patching, tickets, being the only escalation path at 2 a.m.). Never make the IT reader the villain — an MSP that sounds like it's replacing the internal team loses the deal at the technical-evaluation stage. Position as backup and force multiplier, always.
- **Jargon is audience-relative.** EDR/XDR, SOC, SLA, MFA, zero-trust are *proof* to the IT reader and *noise* to the owner. Corporate filler — "best-in-class," "leverage," "synergy," "cutting-edge," "robust solutions," "world-class," "seamless," "end-to-end," "empower," "innovative" — is noise to *both* and is banned outright. Rule: technical specificity is allowed (in IT-facing lines); vague superlatives never are.

## Workflow

### Step 0 — Get the copy

If given a URL, fetch the page (or ask the user to paste the text if fetching isn't available). If given pasted copy, use it as-is. Break the page into sections: hero (headline + subhead), problem/pain, services, proof/credibility, pricing/engagement, CTA(s), footer. Note anything missing entirely — a missing section is a finding, not a gap to silently skip.

### Step 1 — Audit (always do this before rewriting)

Score each section 0–2 on each dimension below, once per audience (Owner / IT). 0 = absent or counterproductive, 1 = present but weak or generic, 2 = specific and matrix-aligned.

1. **Audience clarity** — can you tell who this section is talking to?
2. **Frustration named** — does it name that reader's actual pain (from the matrix), in their language?
3. **Desire addressed** — does it promise that reader's core desire concretely?
4. **Pivot present** — is there a barstool-pivot sentence (absorb X → so you can Y)?
5. **CTA trigger** — does the call to action use that reader's trigger (economic tradeoffs vs. blueprints/SLAs/SOC access)?
6. **Jargon discipline** — free of corporate filler; technical terms only in IT-facing lines? (Score once, applies to both audiences.)
7. **Proof** — specific, checkable claims (response times, tooling names, credentials, local presence) instead of adjectives?

Then diagnose the page's **balance**: is it owner-heavy, IT-heavy, or mushy-middle (speaking to no one)? Most MSP sites fail as mushy-middle. Identify the 3–5 changes with the biggest conversion impact.

### Step 2 — Rewrite

Rewrite section by section, before/after. Structural rules that make dual-audience work on one page:

- **Headline = owner, subhead/proof = IT.** The owner scans; the IT reader digs. Lead every section with outcome language, then substantiate with capability detail. Don't build two separate pages unless the user asks.
- **Tag every rewritten line** with who it serves: `[Owner]`, `[IT]`, or `[Both]`. This makes the dual-audience logic auditable at a glance.
- **Two CTAs are fine; two mushy CTAs are not.** A page can carry one owner-trigger CTA (e.g., "See what your current stack really costs — free 20-minute cost-and-risk review") and one IT-trigger CTA (e.g., "Run the free domain security snapshot — SPF, DKIM, DMARC, breach exposure in 60 seconds"). Never "Learn more" or "Contact us today" as the primary CTA.
- **Sentences short. Verbs active. Claims checkable.** Sage voice: state it plainly and let specificity do the persuading. If a sentence would survive on any competitor's site unchanged, it's not done yet.
- **Preserve true facts.** Never invent certifications, client counts, response times, or guarantees. If proof is missing, insert a clearly marked placeholder like `[VERIFY: actual SLA response time]` and list all placeholders at the end.

### Step 3 — Deliver

Use this exact output structure:

```
# Copy Audit & Rewrite: [Page name]
## Verdict
One paragraph: who the current page speaks to, the biggest gap, expected impact of the rewrite.
## Scorecard
| Section | Dimension | Owner | IT |
(rows for each section × dimension, with a one-line note on anything scoring 0–1)
**Balance diagnosis:** owner-heavy / IT-heavy / mushy-middle, and why.
## Top fixes
The 3–5 highest-impact changes, ranked.
## Rewrite
### [Section name]
**Before:** (original text)
**After:** (rewritten text, each line tagged [Owner] / [IT] / [Both])
**Why:** one or two sentences tying the change to the matrix.
(repeat per section)
## Placeholders to verify
Bulleted list of every [VERIFY: …] inserted, or "None."
```

## Worked micro-examples

**Hero, before (mushy-middle):**

> "Empowering businesses with best-in-class managed IT solutions."

**After:**

> [Owner] **Technology, handled.**
> [Owner] Predictable monthly IT costs. No surprise break/fix invoices. No 2 a.m. outages eating your margin.
> [IT] Behind it: 24/7/365 live endpoint monitoring, managed EDR/XDR, and a real escalation path when your team needs backup — not a ticket queue.
> [Both] CTA: "Run the free domain security snapshot →" / "See what your IT actually costs →"

**Services intro, before (IT-team-as-villain — a common self-inflicted wound):**

> "Stop relying on your overwhelmed internal IT staff."

**After:**

> [IT] Your team shouldn't burn senior hours on patching, server updates, and printer tickets. We take the routine engineering off their plate so they can execute on real strategy — and we're the escalation tier behind them when things get loud.

**Why the second beats the first:** it names the same reality (overwhelmed staff) but casts the internal team as the hero being unblocked, not the problem being replaced. The IT director is usually the one reading.

## Quality bar before returning results

- Every section rewrite traces to a matrix cell — if you can't say which frustration/desire/trigger a line serves, cut it.
- Zero banned filler words in the "After" copy.
- At least one owner-trigger CTA and one IT-trigger CTA exist somewhere on the page.
- Both barstool pivots (owner and IT versions) appear on the page, adapted to the client's actual services.
- All invented-fact risk is flagged in "Placeholders to verify."
