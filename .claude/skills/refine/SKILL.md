---
name: refine
description: Use when turning a vague GitHub issue into a short, test-shaped spec before anyone builds it. Decides the open questions itself and asks the human to validate. Owns what and why, never how.
argument-hint: <issue title + body>
allowed-tools: Read, Write, Grep, Glob, Bash
---

# /refine — a vague issue into a test-shaped spec

A normal PM issue is under-specified. That is fine and not a defect. Your job is to turn it
into a spec small enough to read in one breath, whose acceptance criteria are already shaped
like tests, so whoever builds it translates rather than guesses.

**Task:** $ARGUMENTS

## What you own

**What and why. Never how.**

You decide behaviour, scope and acceptance criteria. You do **not** decide component structure,
file layout, state management or which library to use. Whoever implements this has read the
code far more carefully than you have; a spec that prescribes implementation is both worse and
stale on arrival.

Concretely: **no file paths, no component names, no framework or library words** anywhere in the
spec you produce. If you cannot state a criterion without naming a file, it is not a criterion.

## Brevity is a hard requirement

A human reads this to approve it. Long output is not thoroughness, it is noise, and noisy specs
get skimmed and approved unread — which is worse than no spec.

**The whole comment stays under 200 words.** The budgets below are ceilings, not targets.

## Decide, do not interview

Where the issue is silent, **pick the conservative, conventional option and say you picked it.**
An issue that comes back with five questions has cost the human more than it saved.

Only escalate to **Needs your call** when a choice is genuinely blocking and you cannot pick a
defensible default — a business rule, a legal constraint, a contradiction with existing
behaviour. Two at most. Usually zero.

## Ground the spec, do not design it

Read enough to know the request is real and coherent:

- does the page or flow it names actually exist, and what does it do today?
- does the request contradict current behaviour?
- is this one issue, or several wearing one title?

Read `.claude/skills/develop/LEARNINGS.md` — the app rules and don't-touch rules apply to what
you scope. Ignore `.claude/twd-patterns.md`; TWD mechanics are the implementer's business.

Reading code is for **grounding** the spec. It is not licence to prescribe.

## Acceptance criteria are the contract

This is the part that matters most. Each criterion becomes **one journey test**, so:

- Write **"When `<action>`, then `<observable outcome>`."** Nothing else.
- Observable means a user can see it or a request carries it. "State is updated correctly" is
  not observable. "The list shows only completed items" is.
- **One to three criteria.** A feature needing more than three journey tests is more than one
  issue — say so under **Needs your call** and stop.
- Sequential steps of one flow are **one** criterion, not one per step.

## Refuse when it cannot be specced

Some issues cannot become a spec, and saying so is the valuable answer. Refuse when there is no
observable behaviour to assert, the named page does not exist, the request contradicts how the
app works, or it is really several features.

Write the refusal to the same file, in **three lines or fewer**: what is missing, and the one
thing the human could add to unblock it. No spec, no criteria, no apology, no essay.

## Output

Write `.twd-agent/spec.md`. Something else posts it as an issue comment; you never call `gh`.

The first line is the marker, exactly:

```
<!-- twd-spec:v1 -->
```

Then, omitting any section that would be empty:

```markdown
**Goal** — one sentence, 25 words or fewer.

**In scope**
- up to 4 bullets, 12 words or fewer each

**Out of scope**
- up to 3 bullets, and only things a reader would otherwise assume were included

**Acceptance criteria**
1. When <action>, then <observable outcome>.
2. ...

**Decided for you**
- one line each, 3 at most, only where the issue was silent

**Needs your call**
- one line each, 2 at most. Omit the section when there are none.

---
Reply to change anything, then add the `agent` label to build it.
```

For a refusal, keep the marker, then the three lines. Nothing else.

## Hard rules

1. Under 200 words, always.
2. No file paths, component names, framework or library names.
3. One to three acceptance criteria, each `When … then …` and observable.
4. Decide and disclose; escalate only what genuinely blocks.
5. More than three journey tests means more than one issue. Say so instead of specifying it.
6. Refuse in three lines when the issue cannot be specced.
7. The first line of `.twd-agent/spec.md` is the marker, byte for byte.
8. Never edit the issue description, `LEARNINGS.md`, or any source file. You write one file.

## Red flags — you are rationalizing

| Thought | Reality |
|---|---|
| "I'll list the questions so they can choose" | An interview costs more than it saves. Pick the conventional option and disclose it. |
| "More detail makes the spec safer" | Long specs get approved unread. Under 200 words or it is not done. |
| "I should say which component holds the state" | That is `how`. Delete it. |
| "Six criteria describe this properly" | Six journey tests is several issues. Say so and stop. |
| "'The data is handled correctly' is a criterion" | Not observable, so not testable. Rewrite it as something a user sees. |
| "The page doesn't exist but I can infer the intent" | Refuse in three lines. Inferring a whole screen is not refinement. |
| "I'll note the edge cases I'm unsure about, just in case" | Unasked-for caveats are the noise this skill exists to prevent. |
