# The agent brain — what lives where

Covers both skills: `/refine` and `/develop`. When either gets something wrong, the fix is
**a rule, not the generated code** — this file says which rule file owns which kind of mistake.

Nothing here is loaded during a run. It is for the humans maintaining the brain.

## Two labels, two brains

`refinement` turns a vague issue into a short test-shaped spec, posted as a
`<!-- twd-spec:v1 -->` comment for a human to approve. `agent` then builds it, reading the
latest such comment as the requirement. Refinement is the thinking half and gets the
stronger model; develop is mostly execution once the criteria are test-shaped.

## The surfaces

| File | Owns | Changes | Edited by |
|---|---|---|---|
| `.claude/skills/refine/SKILL.md` | **How a vague issue becomes a spec.** Brevity budgets, the test-shaped criteria format, when to refuse, what counts as `how` | Rarely | Humans |
| `.claude/skills/develop/SKILL.md` | **The method.** Phases, hard rules, the 3-attempt loop limit, the run-report contract, the unattended contract | Rarely | Humans |
| `.claude/skills/develop/LEARNINGS.md` | **This application, and this team's judgement.** What a requirement usually means here, what not to touch, which layer owns what | Often — after most disappointing runs | Humans |
| `.claude/twd-patterns.md` | **This project's TWD wiring.** Imports, `beforeEach`, visit paths, mock urls, `componentHost()`, Teleport handling | When the testing setup changes | `/twd:setup`, then humans |
| the `twd-ai` plugin (`~/.claude/plugins/.../twd-ai/skills/twd/`) | **TWD itself.** The assertion style, `mockRequest` signature, `rule.request`, component mocking — everything true of TWD in *any* project | On a plugin release | Upstream, then re-installed here |

`.github/workflows/agent.yml` is **not** a brain surface. It owns I/O: when a run fires,
credentials, the dev server, what gets published. A quality problem is never fixed there.

## Routing a failure

Two questions, in order:

1. **Would this go wrong in another project too?**
   - No → it is project-specific. Go to question 2.
   - Yes → is it about *TWD's API* or about *how we develop*?
     - TWD's API → the **plugin**, upstream.
     - How we develop → **`SKILL.md`**.
2. **Is it about the testing wiring, or about the application?**
   - Testing wiring → **`twd-patterns.md`**.
   - The application, or a judgement call → **`LEARNINGS.md`**.

Worked examples:

| What the agent did | Goes in |
|---|---|
| Wrote `.toBe()` instead of `.to.equal()` | plugin (its hard constraints already say this — if it recurs, strengthen there) |
| Read `rule.request.body` and crashed | plugin |
| Rendered a component test without `componentHost()` | `twd-patterns.md` |
| Mocked `http://localhost:3001/api/todos` instead of `/api/todos` | `twd-patterns.md` |
| Split one user flow into five `it()` blocks | `SKILL.md` (the one-journey rule) |
| Stopped and asked a question | `SKILL.md` (the unattended contract) |
| Reported success while the suite was red | `SKILL.md` (the report contract) |
| Edited a `vitest` test to express new behaviour | `LEARNINGS.md` |
| Loosened the OpenAPI contract to make a mock pass | `LEARNINGS.md` |
| Touched an unrelated view while fixing the todos list | `LEARNINGS.md` (add a don't-touch rule) |
| Could not tell which view "the todo list" meant | `LEARNINGS.md` |
| Ran out of time at 30 minutes | `agent.yml` — a harness knob |
| Spec named a component or a file path | `refine/SKILL.md` (it owns *what*, never *how*) |
| Spec was three screens of prose nobody read | `refine/SKILL.md` (the word budget) |
| Spec came back with five questions instead of decisions | `refine/SKILL.md` (decide and disclose) |
| Criteria were not observable, so the tests asserted nothing | `refine/SKILL.md` (the criteria format) |
| Spec read like a UI ticket but rewrote the API contract | `refine/SKILL.md` (the `Touches` line) |
| Died because the dev server never came up | `agent.yml` |

## The promotion workflow

1. A run writes `.twd-agent/run-report.md`, which becomes the PR body.
2. Read its **Friction** section. That is the agent telling you what it had to guess.
3. Route each item through the two questions above.
4. Commit the rule change on its own, referencing the PR that produced it. One rule per commit
   keeps the brain's history readable and makes a bad rule easy to revert.
5. The next run reads it. Nobody re-explains anything twice.

The agent never edits `SKILL.md`, `LEARNINGS.md` or `twd-patterns.md`. It reports; a human
curates. A brain that rewrites itself has no review gate.

## Not every failure is a brain failure

Sometimes the rules were adequate and the task was just hard. The honest response is the
`it.skip` + TODO the loop limit already produces, and a human doing that ticket — **not** a new
rule. A rule that encodes one hard ticket makes the brain longer without making the next run
better, and a long brain is a worse brain.

So the number worth tracking is the **ratio**: of runs that disappointed, how many were fixed by
a rule versus by a human writing the code? A high ratio means the knowledge was missing and this
loop works. A low one means the tickets are beyond the current setup, and no amount of markdown
changes that.

## Editing rules

- **A rule, not a story.** One imperative line the agent can act on, plus one line of why.
- **Delete rules that stop being true.** A stale rule costs more than a missing one.
- **Never duplicate across surfaces.** If two files could hold a rule, the more specific one
  wins, and the other must not repeat it — two sources of truth drift silently.
- **Upstream changes are not free.** A plugin fix needs a release and a re-install here, so a
  genuinely project-specific workaround belongs in `twd-patterns.md` even when the root cause
  is upstream. Note it in the report either way.
