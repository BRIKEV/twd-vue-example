#!/bin/sh
# Diagnostic wrapper around ffmpeg. TEMPORARY — remove once the CI recording
# failure is understood.
#
# twd-cli's `record.ffmpegPath` points here (twd.config.json). Puppeteer's
# page.screencast() spawns ffmpeg itself and swallows both the command line it
# builds and ffmpeg's stderr, so when ffmpeg exits the only symptom is twd-cli
# repeating "ffmpeg failed to write: Cannot call write after a stream was
# destroyed" forever. That message says the stream died, never why.
#
# Observed on ubuntu-latest 2026-09-07: ffmpeg exits ~630ms after the first
# frame, so it is rejecting its input or its arguments rather than crashing
# mid-encode. CI has ffmpeg 6.1 (libavcodec60) with libx264-164 present; the
# machine where this works has 8.1.2. This wrapper is here to say which it is.
#
# `exec` on purpose: Puppeteer writes frames to this process's stdin, so the
# data path must not pass through a shell that stays resident. Only stderr is
# redirected.
LOG="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)/.twd-agent/ffmpeg.log"
mkdir -p "$(dirname "$LOG")"

{
  echo "=== ffmpeg invoked $(date -u +%FT%TZ) ==="
  echo "wrapper cwd: $(pwd)"
  echo "resolved:    $(command -v ffmpeg)"
  ffmpeg -version 2>&1 | head -1
  echo "argv:        $*"
  echo "--- stderr follows ---"
} >> "$LOG"

exec ffmpeg "$@" 2>> "$LOG"
