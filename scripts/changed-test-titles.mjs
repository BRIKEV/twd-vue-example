#!/usr/bin/env node
// Prints the `it()` titles this branch ADDED under src/twd-tests, one per line.
//
// Which tests changed is a FACT, so it is computed rather than asked of a model:
// a git diff cannot hallucinate a title, and a wrong title makes `twd-cli run
// --test` exit 1 with "No tests matched filter(s)" instead of silently
// recording something else.
//
// Added lines, not changed files, on purpose. The three tests an agent wrote are
// what a reviewer wants to watch; the four that already lived in the same file
// are noise, and at `pace: 400` each one costs real wall-clock. Falls back to
// every title in the changed files when the diff added no `it()` at all — a body
// can change without its title line moving.
//
// Usage: node scripts/changed-test-titles.mjs <baseSha>
// Prints nothing when nothing changed, so the caller can skip recording.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const base = process.argv[2];
if (!base) {
  console.error('usage: changed-test-titles.mjs <baseSha>');
  process.exit(2);
}

const git = (args) => execFileSync('git', args, { encoding: 'utf8' });

// The merge base, not the base tip: a PR branch is not necessarily a descendant
// of wherever the base branch has moved to since it was cut.
let from = base;
try {
  from = git(['merge-base', base, 'HEAD']).trim() || base;
} catch {
  // Shallow clone or unrelated history — use the sha we were handed.
}

// `it(` and `it.only(`, never `it.skip(` or `xit(`: a skipped test does not run,
// so asking to record it is an exit-1 "no tests matched".
const IT = /(?<![.\w])it(?:\.only)?\s*\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/g;

const clean = (raw) => raw.replace(/\\(['"`\\])/g, '$1').trim();

const titles = new Set();

// Pass 1 — titles on lines the diff ADDED.
try {
  const diff = git(['diff', '-U0', from, 'HEAD', '--', 'src/twd-tests']);
  for (const line of diff.split('\n')) {
    if (!line.startsWith('+') || line.startsWith('+++')) continue;
    for (const match of line.slice(1).matchAll(IT)) {
      const title = clean(match[2]);
      if (title) titles.add(title);
    }
  }
} catch {
  process.exit(0);
}

// Pass 2 — fallback: every title in a changed file, when no `it()` was added.
if (titles.size === 0) {
  let changed = [];
  try {
    changed = git(['diff', '--name-only', from, 'HEAD', '--', 'src/twd-tests'])
      .split('\n')
      .filter(Boolean);
  } catch {
    process.exit(0);
  }
  // A deleted file still shows in the diff and has no titles to record.
  const files = changed.filter(
    (f) => /\.twd\.test\.(ts|js)$/.test(f) && fs.existsSync(f),
  );
  for (const file of files) {
    for (const match of fs.readFileSync(file, 'utf8').matchAll(IT)) {
      const title = clean(match[2]);
      if (title) titles.add(title);
    }
  }
}

for (const title of titles) console.log(title);
