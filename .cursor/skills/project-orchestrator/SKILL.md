---
name: project-orchestrator
description: >-
  User-global multi-agent orchestration for any project. Assess task/project
  complexity, decompose into parallel workstreams, assign worker agents via the
  Task tool, verify each result, and integrate into a coherent whole. Use when
  the user asks to orchestrate, parallelize, break down a large feature/project,
  plan multi-agent work, estimate complexity (not calendar time), or when a
  request clearly spans several independent subsystems that can be built or
  researched concurrently.
---

# Project orchestrator

Act as the **orchestrator**. You own scoping, decomposition, worker assignment,
verification, and final integration. Workers execute bounded tasks; you do not
hand the whole job to a single subagent and walk away.

**Complexity language:** Characterize difficulty with technical factors (files,
subsystems, coupling, unknowns, validation gates). Do **not** estimate calendar
time (days/weeks) — that is a poor fit for autonomous agents.

## When to use this skill

| Signal | Action |
|--------|--------|
| Request touches 2+ independent surfaces (API + UI, EN + ES, docs + code) | Orchestrate with parallel workers |
| Large feature / multi-file refactor / greenfield module | Assess → decompose → assign |
| User says “orchestrate”, “parallelize”, “break this down”, “multi-agent” | Follow this skill end-to-end |
| Single-file fix, typo, one API tweak | **Skip** — do it yourself; do not spawn workers |

## Workflow overview

```text
1. Assess   → complexity band + risks + done criteria
2. Plan     → workstreams, dependencies, ownership map
3. Assign   → parallel Task workers with strict contracts
4. Verify   → accept / revise / reassign each worker result
5. Integrate→ merge, resolve seams, run validation, ship
```

Keep a live checklist with `TodoWrite` (or equivalent) so progress stays visible.

---

## Phase 1 — Assess complexity

Scan just enough of the repo to classify the work. Prefer fast tools (`Glob`,
`Grep`, `Read` of manifests) over deep exploration. Use an `explore` subagent
only when the layout is unknown or the blast radius is unclear.

### Rubric (score each 1–5, then band)

| Factor | 1 (low) | 3 (medium) | 5 (high) |
|--------|---------|------------|----------|
| **Blast radius** | 1–3 files, one package | One feature area, ~5–15 files | Cross-cutting / many packages |
| **Subsystems** | Single layer | 2 layers (e.g. UI + API) | 3+ (UI, API, data, i18n, CI…) |
| **Coupling** | Isolated change | Shared types/utils touched | Core abstractions / public API |
| **Unknowns** | Clear existing pattern | Some discovery needed | Spec gaps, new tech, unclear ownership |
| **Validation** | Visual/manual glance | Build or unit tests | Build + e2e/a11y/deploy dry-run |
| **Parallelism** | Must be serial | Partial parallel | Clear independent workstreams |

**Bands** (sum of six factors, range 6–30):

| Band | Score | Orchestrator behavior |
|------|-------|------------------------|
| **S** — Solo | 6–10 | Do it yourself. No workers. |
| **M** — Light orchestration | 11–16 | 2 workers max, or 1 explore + you implement |
| **L** — Full orchestration | 17–22 | 2–4 parallel workers, explicit integration phase |
| **XL** — Phased orchestration | 23–30 | Wave-based plan; never launch >4 workers at once; reassess after each wave |

### Assessment output (always produce before assigning)

```markdown
## Orchestration assessment

- **Goal**: …
- **Band**: S | M | L | XL (score N/30)
- **Factors**: blast=… subsystems=… coupling=… unknowns=… validation=… parallelism=…
- **Done when**: [testable acceptance criteria]
- **Risks / seams**: [shared files, merge conflicts, ordering constraints]
- **Decision**: solo | light | full | phased
```

If band is **S**, stop here and implement. Do not theater-orchestrate trivial work.

---

## Phase 2 — Decompose

Split the goal into **workstreams** that are:

1. **Independently mergeable** when possible (different files/dirs).
2. **Contract-bounded** — inputs, outputs, and non-goals are explicit.
3. **Sized for one worker** — one concern, one validation step, not a mini-project.
4. **Ordered by dependency** — mark blockers vs parallelizable peers.

### Decomposition rules

- Prefer **vertical slices** only when a slice is truly self-contained; otherwise prefer **horizontal slices** by ownership (e.g. “API route”, “UI component”, “i18n strings”, “tests”).
- Extract **shared contracts first** (types, API shapes, file paths, naming) into an orchestrator-owned **integration contract**. Workers must not invent conflicting interfaces.
- Never give two workers write ownership of the same file in the same wave.
- Cap a wave at **4** concurrent workers. Queue the rest.
- For **XL**, ship Wave 1 (foundation + contracts), verify, then Wave 2 (features), then Wave 3 (polish/validation).

### Plan output

```markdown
## Work plan

### Integration contract (orchestrator-owned)
- Shared types / paths / naming: …
- Forbidden overlaps: …

### Wave 1 (parallel)
| ID | Workstream | Owner | Writes | Depends on | Acceptance |
|----|------------|-------|--------|------------|------------|
| W1 | … | worker | `path/…` | — | … |

### Wave 2 (after Wave 1 verified)
| … |

### Orchestrator-only (do not delegate)
- Final integration, conflict resolution, release validation, user-facing summary
```

---

## Phase 3 — Assign workers

Launch workers with the **Task** tool. Send **multiple Task calls in one message** for true parallelism.

### Choose `subagent_type`

| Workstream kind | Prefer |
|-----------------|--------|
| Codebase discovery / “what exists where” | `explore` |
| Implement a bounded code change | `generalPurpose` |
| Isolated experiment / competing approaches | `best-of-n-runner` |
| Auth/payments/secrets/threat surface review | `security-review` (only when review is requested or clearly required) |
| Cursor product “how do I…” | `cursor-guide` |
| Agents SDK verify (TS/PY) | `agent-sdk-verifier-ts` / `agent-sdk-verifier-py` |

Default model: `inherit` unless the user named a listed model.

### Worker prompt contract (required sections)

Every worker prompt must include:

1. **Role** — “You are a worker agent. Do only the scoped task.”
2. **Context** — goal of the overall project in 2–3 sentences (workers have no parent chat history).
3. **Exact scope** — files/dirs to read; files they may create/edit.
4. **Integration contract** — shared names, types, endpoints, copy keys they must obey.
5. **Non-goals** — explicitly out of scope (do not refactor X, do not touch Y).
6. **Acceptance checks** — commands or conditions that define done.
7. **Return format** — structured handoff the orchestrator will parse.

Example return format to demand:

```markdown
## Worker handoff
- Status: done | blocked | partial
- Files changed: …
- Contract compliance: [how shared interfaces were followed]
- Validation run: [command + result]
- Risks / follow-ups: …
- Blockers: …
```

### Parallel launch checklist

- [ ] No two workers share write paths in this wave
- [ ] Shared contract already written (by you) or frozen in the prompts
- [ ] Each prompt is self-contained
- [ ] Todo list updated: worker tasks `in_progress`
- [ ] You remain free to do orchestrator-only work (seams, docs pointers, final QA)

---

## Phase 4 — Verify each worker

Do **not** trust handoffs blindly. For each worker result:

1. **Diff review** — read the changed files; confirm scope was respected.
2. **Contract check** — names, types, routes, and copy keys match the integration contract.
3. **Acceptance** — re-run or spot-check the stated validation when practical.
4. **Verdict** — `accept` | `revise` (resume same worker with concrete fixes) | `reassign` | `take over` (you fix a small seam yourself).

Resume a worker with `Task` + `resume` when the fix needs their context. For tiny seam fixes, edit yourself — cheaper than another round trip.

Track verdicts in the todo list.

---

## Phase 5 — Integrate and complete

Only the orchestrator closes the project:

1. Merge worker outputs into one coherent change (resolve import paths, shared exports, nav/routes, i18n keys).
2. Run the repo’s real validation gate (this repo: `npm run build`; elsewhere: project’s build/test script).
3. Fix integration bugs yourself unless a failure clearly belongs to one workstream — then resume that worker once with the failure log.
4. Update todos to `completed`.
5. Summarize for the user: what shipped, band used, how work was split, what was verified.

### Integration anti-patterns

- Declaring victory when workers “said done” but build/tests were not run
- Leaving duplicate types/utilities from parallel workers
- Shipping overlapping partial features that disagree on API shape
- Spawning more workers to fix integration — integration is your job

---

## Decision cheatsheet

```text
Is the task band S?
  YES → implement yourself
  NO  → write assessment + integration contract

Can workstreams write disjoint paths?
  YES → parallel Task workers this wave
  NO  → serialize, or you own the shared file and workers consume it

>4 ready workstreams?
  YES → waves of ≤4
  NO  → single wave

Worker returned partial/blocked?
  → revise once with specifics, else take over
```

## Complexity without calendar estimates

Say things like:

- “Band L (19/30): three subsystems, shared types, build validation required.”
- “Two parallel workers for API and UI after the orchestrator freezes the request/response type.”
- “Wave 2 blocked on Wave 1 export surface.”

Do **not** say “about two days” or “a one-week project.”

## Scope

This is a **user-global** skill (not tied to one repo). Install / keep it at:

- `~/.cursor/skills/project-orchestrator/` (Cursor, all projects)
- `~/.agents/skills/project-orchestrator/` (Agent Skills-compatible tools)

Optional: vendor the same folder into a repo’s `.cursor/skills/` so cloud agents
and teammates without the user skill still load it. Templates live in
`references/REFERENCE.md` (and `references.md`).
