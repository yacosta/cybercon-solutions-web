# Orchestrator references

Supporting templates for `.cursor/skills/project-orchestrator/SKILL.md`.

## Worker prompt template

Copy and fill before each `Task` launch:

```markdown
You are a **worker agent** for a multi-agent delivery. Do only the scoped task below.
You do not have the parent orchestrator’s chat history — rely on this prompt alone.

## Overall goal
[2–3 sentences]

## Your workstream ID
[W1 / W2 / …]

## Exact scope
- Read: [paths]
- You may create/edit: [paths only]
- Do not touch: [paths]

## Integration contract (mandatory)
- Shared types / names / routes / keys:
  [paste contract]
- File ownership this wave: you own [paths]; other workers own [paths]

## Non-goals
- [explicit exclusions]

## Acceptance checks
- [ ] [command or condition]
- [ ] [command or condition]

## Return exactly this handoff
## Worker handoff
- Status: done | blocked | partial
- Files changed: …
- Contract compliance: …
- Validation run: …
- Risks / follow-ups: …
- Blockers: …
```

## Explore-then-plan prompt (band M/L when layout unknown)

```markdown
You are an explore worker. Map the blast radius for: [goal]

Return:
1. Relevant directories and key files
2. Existing patterns to reuse
3. Likely shared seams (types, routes, i18n, config)
4. Suggested parallel workstreams with disjoint write paths
5. Validation command(s) for this repo

Do not edit files.
```

## Revise prompt (resume)

```markdown
Resume workstream [ID]. Orchestrator review failed for these reasons:
1. [concrete issue + file path]
2. …

Keep the same integration contract. Re-run acceptance checks. Return an updated Worker handoff.
```

## Scoring worksheet (quick)

Blast radius __ + Subsystems __ + Coupling __ + Unknowns __ + Validation __ + Parallelism __ = __ / 30

- 6–10 S solo
- 11–16 M light (≤2 workers)
- 17–22 L full (2–4 workers)
- 23–30 XL phased (waves of ≤4)
