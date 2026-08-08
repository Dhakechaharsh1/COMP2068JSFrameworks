#!/usr/bin/env node
/**
 * render-video.js — render a deterministic scene to a video file.
 *
 *   node kids-3d-animation/tools/render-video.js C-short
 *   node kids-3d-animation/tools/render-video.js A-poem --fps 24
 *   node kids-3d-animation/tools/render-video.js C-short --scale 0.5   (fast preview)
 *   node kids-3d-animation/tools/render-video.js C-short --no-audio
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
 * into ffmpeg. Nothing hits the disk in between.
 *
 * Output is H.264/AAC .mp4 when an ffmpeg with libx264 is available (the
 * ffmpeg-static devDependency provides one). It falls back to VP8/WebM with
 * the stripped ffmpeg bundled inside Playwright, which has no H.264 encoder.
 *
 * If 04-video/audio/<scene>.wav exists it is muxed in as the soundtrack —
 * run `node tools/make-audio.js` first.
 */

const path = require('path');
const fs = require('fs');
const { spawn, execFileSync } = require('child_process');
const { createRequire } = require('module');

/** Prefer a full build; the Playwright one is the last resort (VP8 only). */
function findFfmpeg() {
  const candidates = [];
  if (process.env.FFMPEG_PATH) candidates.push(process.env.FFMPEG_PATH);
  try { candidates.push(require('ffmpeg-static')); } catch { /* not installed */ }
  candidates.push('/usr/local/bin/ffmpeg', '/usr/bin/ffmpeg',
                  '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux');

  for (const bin of candidates) {
    if (!bin || !fs.existsSync(bin)) continue;
    let h264 = false;
    try {
      h264 = execFileSync(bin, ['-hide_banner', '-encoders'], { encoding: 'utf8', stdio: ['ignore','pipe','ignore'] })
        .includes('libx264');
    } catch { /* treat as no h264 */ }
    return { bin, h264 };
  }
  console.error('No ffmpeg found. Install one with:  npm i -D ffmpeg-static');
  process.exit(1);
}

const SCENES = {
  // Tuned per scene: the Short is hard cuts and fast motion, the poem is slow
  // gradients that compress very efficiently. crf is used by libx264, bitrate
  // by the libvpx fallback.
  'C-short': { width: 1080, height: 1920, fps: 24, crf: 20, bitrate: '2500k' },
  'A-poem':  { width: 1920, height: 1080, fps: 24, crf: 26, bitrate: '1400k' },
};

/**
 * Several playwright installs can be visible at once (project-local and
 * global), each pinned to a different Chromium build. Pick the first one whose
 * browser binary is actually on disk, otherwise you get a launch failure that
 * reads like a missing dependency but is really a version mismatch.
 */
function loadPlaywright() {
  const tries = [
    () => require('playwright'),
    () => createRequire('/opt/node22/lib/node_modules/')('playwright'),
  ];
  let fallback = null;
  for (const t of tries) {
    try {
      const pw = t();
      fallback = fallback || pw;
      if (fs.existsSync(pw.chromium.executablePath())) return pw;
    } catch { /* try the next one */ }
  }
  if (fallback) return fallback;
  console.error('Could not load playwright. Install with: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

function parseArgs(argv) {
  const a = { scene: null, fps: null, scale: 1, quality: 92, audio: true };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--fps') a.fps = Number(argv[++i]);
    else if (argv[i] === '--scale') a.scale = Number(argv[++i]);
    else if (argv[i] === '--quality') a.quality = Number(argv[++i]);
    else if (argv[i] === '--no-audio') a.audio = false;
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

  const { chromium } = loadPlaywright();
  const { bin: ffmpeg, h264 } = findFfmpeg();

  const outFile = path.join(outDir, `${args.scene}.${h264 ? 'mp4' : 'webm'}`);
  const audioFile = path.join(root, '04-video', 'audio', `${args.scene}.wav`);
  const withAudio = args.audio && fs.existsSync(audioFile);
  if (args.audio && !withAudio) {
    console.warn(`  (no ${path.relative(root, audioFile)} — rendering silent; run tools/make-audio.js first)`);
  }

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

  console.log(`${args.scene}  ${width}x${height}  ${fps}fps  ${duration}s  ${total} frames  ` +
              `${h264 ? 'H.264/mp4' : 'VP8/webm'}${withAudio ? ' + AAC audio' : ' (silent)'}`);

  const ffArgs = ['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', String(fps), '-i', 'pipe:0'];
  if (withAudio) ffArgs.push('-i', audioFile);

  if (h264) {
    ffArgs.push('-c:v', 'libx264', '-preset', 'medium', '-crf', String(cfg.crf ?? 20),
                '-profile:v', 'high', '-pix_fmt', 'yuv420p',
                '-movflags', '+faststart');
  } else {
    ffArgs.push('-c:v', 'libvpx', '-b:v', cfg.bitrate, '-crf', '10',
                '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p');
  }
  if (withAudio) {
    // the WAV is deliberately a little longer than the picture; -shortest trims
    // it back to the video so the file ends on the last frame
    ffArgs.push('-c:a', 'aac', '-b:a', '192k', '-ac', '2', '-ar', '44100', '-shortest');
  }
  ffArgs.push('-r', String(fps), outFile);

  const ff = spawn(ffmpeg, ffArgs, { stdio: ['pipe', 'ignore', 'pipe'] });

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
