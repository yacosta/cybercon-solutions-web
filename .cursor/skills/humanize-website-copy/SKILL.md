---
name: humanize-website-copy
description: Review and rewrite website marketing copy so it sounds natural and human without changing meaning or claims. Use when asked to humanize copy, soften marketing voice, or when invoked with /humanize-website-copy on pages, components, or i18n strings.
disable-model-invocation: true
---

# Humanize website copy

Rewrite marketing copy to sound like a clear, credible person — not a brochure, not AI filler. **Meaning and claims stay identical.**

## When to use

- User invokes `/humanize-website-copy`
- User `@`s pages/components/i18n files and asks to humanize, naturalize, or de-AI the copy

## Scope in this repo

Prefer editing string sources, not hardcoding new copy into markup:

| Locale / surface | Primary files |
| --- | --- |
| Shared UI strings (EN) | `src/i18n/en.ts` |
| Shared UI strings (ES) | `src/i18n/es.ts` |
| Service titles/summaries/items | `src/data/services.ts` |
| Privacy copy | `src/data/privacy.ts` |
| SEO / structured description | `src/lib/seo.ts`, page `title`/`description` props |
| Agent/markdown surfaces | `src/lib/markdown-pages.ts` |

Only touch files the user `@`d or clearly implied. If both EN and ES exist for the same string, humanize both and keep them aligned in meaning (not word-for-word).

## Non-negotiables

1. **Do not change meaning** — same offer, same promise, same audience.
2. **Do not add or drop claims** — no new guarantees, stats, compliance badges, SLAs, geographies, product names, or timelines.
3. **Do not invent proof** — no fake customers, awards, case studies, or “trusted by…”.
4. **Keep factual anchors** — place names, hours, standards (HIPAA, SOC 2, etc.), CTAs, and legal/footer text stay accurate.
5. **Preserve structure** — same keys, slots (`{query}`), HTML/markdown shape, and approximate length (±20% unless a line is clearly bloated).
6. **Match locale** — rewrite EN as natural English; rewrite ES as natural Spanish (not translated-from-English stiff).

## What “human” means here

**Prefer**
- Short sentences a sales engineer might say out loud
- Concrete verbs over abstract nouns
- One idea per sentence
- Contractions where the site already uses them (`we'll`, `isn't`)
- Specificity already present in the source (keep “one business day”, “per-user”, etc.)

**Cut or rewrite**
- Stacked adjectives and buzzword chains (“seamless end-to-end holistic solutions”)
- Empty intensifiers (“best-in-class”, “cutting-edge”, “leverage”, “unlock”, “empower”, “revolutionize”)
- Fake urgency or hype the source never stated
- Parallel slogan spam that says the same thing three ways
- Robotic symmetry (“We don’t just X. We Y.”) unless it already earns its keep

**Leave alone**
- Brand name, product names, legal copy, form labels that are already plain
- Strings that are already natural — skip them; don’t rewrite for sport

## Workflow

Copy this checklist and track it:

```
Humanize progress:
- [ ] 1. Inventory strings in the @’d files
- [ ] 2. Flag AI/marketing tells (no claim changes)
- [ ] 3. Rewrite only the weak lines
- [ ] 4. Diff-check meaning/claims
- [ ] 5. Apply edits + keep EN/ES aligned
```

### 1. Inventory

List every user-facing string in scope (hero, ledes, CTAs, service blurbs, meta descriptions). Ignore pure UI chrome unless it’s clearly marketing voice.

### 2. Flag

For each weak line, note the tell in one short phrase (e.g. “buzzword stack”, “slogan echo”, “stiff ES”).

### 3. Rewrite

Produce a drop-in replacement that a human would say. Keep the claim set identical.

**Before → after test:** If you removed the brand name, would a competitor’s page still be able to use this sentence unchanged for a *different* claim set? If yes, you drifted — restore the original specifics.

### 4. Claim check

Before editing files, verify:

- Same services / outcomes mentioned
- Same qualifiers (free, no obligation, within one business day, South Florida, etc.)
- No stronger or weaker promise than the original

### 5. Apply

Edit the source files. Keep TypeScript `as const` / types intact. Don’t drive-by refactor.

## Output format

When reporting back:

1. **Summary** — one or two sentences on the voice shift.
2. **Changes** — bullet list: `key or location`: `old` → `new` (group tiny tweaks).
3. **Unchanged on purpose** — briefly list strong lines you left alone (optional, short).
4. **Claim confirmation** — one line: no claims added, removed, or strengthened.

## Examples

**Inflated → human (same claim)**

- Before: `We deliver best-in-class, end-to-end cybersecurity solutions that empower your workforce.`
- After: `We handle cybersecurity for your team — protection, monitoring, and response without the enterprise theater.`
- Only valid if the source already claimed protection/monitoring/response; otherwise keep closer to the original nouns.

**Keep the concrete promise**

- Before: `A real engineer replies within one business day.`
- After: leave as-is (already human and specific).

**Spanish: natural, not calque**

- Stiff: `Somos proactivos por diseño y seguros por defecto para su negocio en crecimiento.`
- Better: keep the site’s existing cadence; prefer how a local MSP would explain it, without adding claims.
