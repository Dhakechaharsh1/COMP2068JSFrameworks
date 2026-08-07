#!/usr/bin/env node
/**
 * render-video.js — render a deterministic scene to a video file.
 *
 *   node kids-3d-animation/tools/render-video.js C-short
 *   node kids-3d-animation/tools/render-video.js A-poem --fps 24
 *   node kids-3d-animation/tools/render-video.js C-short --scale 0.5   (fast preview)
 *
 * A scene is an HTML file in 04-video/scenes/ that exposes two globals:
 *
 *   window.DURATION      length in seconds
 *   window.setTime(t)    paint the scene at time t — a PURE function of t
 *
 * Because nothing is driven by CSS animation or requestAnimationFrame, the
 * output is byte-identical across runs and frame timing cannot drift.
 *
 * Pipeline: Playwright screenshots each frame as JPEG and pipes it straight
 * into ffmpeg (image2pipe/mjpeg in, VP8/WebM out). Nothing hits the disk in
 * between. The ffmpeg bundled with Playwright is a stripped build — VP8/WebM
 * only, and it can decode MJPEG but not PNG — which is why frames are JPEG
 * and the output is .webm rather than .mp4.
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { createRequire } = require('module');

const FFMPEG_CANDIDATES = [
  '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux',
  '/usr/bin/ffmpeg',
  '/usr/local/bin/ffmpeg',
];

const SCENES = {
  // Bitrates are tuned per scene: the Short is full of hard cuts and fast
  // motion, the poem is slow gradients that VP8 compresses very efficiently.
  'C-short': { width: 1080, height: 1920, fps: 24, bitrate: '2500k' },
  'A-poem':  { width: 1920, height: 1080, fps: 24, bitrate: '1400k' },
};

function loadPlaywright() {
  const tries = [
    () => require('playwright'),
    () => createRequire('/opt/node22/lib/node_modules/')('playwright'),
  ];
  for (const t of tries) { try { return t(); } catch { /* next */ } }
  console.error('Could not load playwright. Install with: npm i -D playwright');
  process.exit(1);
}

function findFfmpeg() {
  for (const p of FFMPEG_CANDIDATES) if (fs.existsSync(p)) return p;
  console.error('No ffmpeg found. Looked in:\n  ' + FFMPEG_CANDIDATES.join('\n  '));
  process.exit(1);
}

function parseArgs(argv) {
  const a = { scene: null, fps: null, scale: 1, quality: 92 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--fps') a.fps = Number(argv[++i]);
    else if (argv[i] === '--scale') a.scale = Number(argv[++i]);
    else if (argv[i] === '--quality') a.quality = Number(argv[++i]);
    else if (!argv[i].startsWith('--')) a.scene = argv[i];
  }
  return a;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.scene || !SCENES[args.scene]) {
    console.error(`Usage: node render-video.js <scene> [--fps N] [--scale N]\nScenes: ${Object.keys(SCENES).join(', ')}`);
    process.exit(1);
  }

  const cfg = SCENES[args.scene];
  const fps = args.fps || cfg.fps;
  const width = Math.round(cfg.width * args.scale);
  const height = Math.round(cfg.height * args.scale);

  const root = path.resolve(__dirname, '..');
  const sceneFile = path.join(root, '04-video', 'scenes', `${args.scene}.html`);
  if (!fs.existsSync(sceneFile)) {
    console.error(`Scene not found: ${sceneFile}`);
    process.exit(1);
  }
  const outDir = path.join(root, '04-video', 'rendered');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${args.scene}.webm`);

  const { chromium } = loadPlaywright();
  const ffmpeg = findFfmpeg();

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: cfg.width, height: cfg.height },
    deviceScaleFactor: args.scale,
  });
  await page.goto('file://' + sceneFile, { waitUntil: 'networkidle' });

  const duration = await page.evaluate(() => window.DURATION);
  if (typeof duration !== 'number') {
    console.error('Scene does not expose window.DURATION');
    process.exit(1);
  }
  const total = Math.round(duration * fps);

  console.log(`${args.scene}  ${width}x${height}  ${fps}fps  ${duration}s  ${total} frames`);

  const ff = spawn(ffmpeg, [
    '-y',
    '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', String(fps), '-i', 'pipe:0',
    '-c:v', 'libvpx', '-b:v', cfg.bitrate, '-crf', '10',
    '-deadline', 'good', '-cpu-used', '2',
    '-pix_fmt', 'yuv420p', '-r', String(fps),
    outFile,
  ], { stdio: ['pipe', 'ignore', 'pipe'] });

  let ffErr = '';
  ff.stderr.on('data', d => { ffErr += d.toString(); });
  ff.on('error', e => { console.error('ffmpeg failed to start:', e.message); process.exit(1); });

  const started = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.setTime(t), f / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: args.quality });
    if (!ff.stdin.write(buf)) {
      await new Promise(r => ff.stdin.once('drain', r));
    }
    if (f % Math.max(1, Math.round(total / 20)) === 0) {
      const pct = Math.round((f / total) * 100);
      process.stdout.write(`\r  ${String(pct).padStart(3)}%  frame ${f}/${total}`);
    }
  }
  ff.stdin.end();

  const code = await new Promise(r => ff.on('close', r));
  await browser.close();

  if (code !== 0) {
    console.error('\nffmpeg exited ' + code + '\n' + ffErr.split('\n').slice(-15).join('\n'));
    process.exit(1);
  }

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  const size = (fs.statSync(outFile).size / 1048576).toFixed(2);
  process.stdout.write(`\r  100%  ${total}/${total} frames            \n`);
  console.log(`\n${outFile}\n${size} MB · rendered in ${secs}s`);
}

main().catch(e => { console.error(e); process.exit(1); });
