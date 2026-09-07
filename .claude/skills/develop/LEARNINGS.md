# Agent learnings — twd-vue-example

Project knowledge for `/develop`. The skill is the **method** and rarely changes; this file is
**what the agent must know about this application**, and it grows every time a run disappoints.

## How to use this file

When `/develop` produces something wrong, do not patch the generated code and move on. Open the
**Friction** section of the run report (`.twd-agent/run-report.md`, which becomes the PR body),
find the piece of knowledge that was missing, and add it here as a rule. The next run reads it.

**Not sure this is the right file?** [`README.md`](./README.md) routes a failure to the surface
that owns it: the method (`SKILL.md`), this app (here), the TWD wiring (`twd-patterns.md`), or
TWD itself (the plugin, upstream).

- **Only humans edit this file.** The agent reports friction; you decide what becomes a rule.
- **Write a rule, not a story.** One imperative line the agent can act on, plus one line of why.
- **TWD mechanics belong in `.claude/twd-patterns.md`** — imports, `beforeEach`, visit paths,
  mock conventions. This file is about *this application* and *this team's judgement*: what to
  build, what not to touch, what a requirement usually means here.
- **Delete rules that stop being true.** A stale rule costs more than a missing one.

### Entry format

```
### <short rule, imperative>
**Why:** what went wrong without it. (<date>, #<issue or PR>)
```

## Rules

<!-- Newest first. Add above this line. -->

### When the spec asks for data the contract lacks, update the contract
**Why:** features cannot ship otherwise. Change `contracts/todos-3.0.json` and the seed data in
`data/data.json`, keep it additive where you can, and fix **every existing mock and fixture the
change invalidates** — a newly `required` field breaks every mock that omits it, across all test
files. Say in the run report that the contract changed. (2026-09-07, #2)

### Never relax a contract to make a rejected mock pass
**Why:** if the spec asked for nothing new, a rejection means the **mock** is wrong — fix the
mock. Do not touch `mode`, `strict`, a `required` list or a field's type to get past it. That
turns a caught bug into a silent one. (2026-09-07, #2)

### Run the suite with `npx twd-cli run` — there is no `test:ci` script
**Why:** CI runs the tests through the `BRIKEV/twd-cli` composite action, so no npm script
exists for them. A run that reaches for `npm run test:ci` dies on a missing script.
(2026-09-07, seeded at setup)

### TWD is the behaviour contract; `vitest` is not
**Why:** `src/views/__tests__/` holds vitest unit tests beside the TWD suite in
`src/twd-tests/`. A requirement about user-visible behaviour is expressed as a TWD test. Do not
add or edit vitest tests unless the requirement is explicitly about them.
(2026-09-07, seeded at setup)

### Contract validation runs in `error` mode against `contracts/todos-3.0.json`
**Why:** `twd.config.json` sets `mode: "error"` and `strict: true` for the `/api` base url, so a
mock whose shape drifts from the OpenAPI contract fails the run instead of warning. What to do
about a rejection depends on whether the spec asked for something new — see the two rules above.
(2026-09-07, seeded at setup; amended the same day, #2)
