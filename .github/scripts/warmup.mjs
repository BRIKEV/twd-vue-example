// Warm up the Vite dev server with a real page load BEFORE the cross-browser
// run. A cold dev server compiles the module graph on-demand and runs
// optimizeDeps on first load (forcing a reload), which races service-worker
// registration. Chromium tolerates that; Firefox/WebKit don't and time out
// claiming the SW. In a sequential run Chromium accidentally warms the shared
// server for the slower engines — this script does that explicitly so each
// parallel job starts against a fully warm server.
//
// playwright is available transitively via twd-runner. We use Chromium (fast,
// tolerant) just to drive the server warm; the warmth is server-side and
// benefits whichever engine the matrix job actually tests.
import { chromium } from 'playwright';

const url = process.env.WARMUP_URL || 'http://localhost:5173';
const timeout = Number(process.env.WARMUP_TIMEOUT || 120000);

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url);
  // Same readiness gates the runner uses: sidebar attached + SW controlling.
  // Hitting these once forces full module compilation and SW activation, so the
  // real test browser loads instantly and claims the SW well within its timeout.
  await page.waitForSelector('#twd-sidebar-root', { state: 'attached', timeout });
  await page.waitForFunction(
    () => Boolean(navigator.serviceWorker && navigator.serviceWorker.controller),
    undefined,
    { timeout }
  );
  console.log('Warm-up complete: module graph compiled, sidebar attached, SW controlling.');
} finally {
  await browser.close();
}
