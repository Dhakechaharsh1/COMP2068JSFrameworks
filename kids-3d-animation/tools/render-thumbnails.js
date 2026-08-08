#!/usr/bin/env node
/**
 * render-thumbnails.js — render the thumbnail templates to exact-spec PNGs.
 *
 *   node kids-3d-animation/tools/render-thumbnails.js
 *   node kids-3d-animation/tools/render-thumbnails.js --only A
 *   node kids-3d-animation/tools/render-thumbnails.js --only B --text
 *   node kids-3d-animation/tools/render-thumbnails.js --bg ./stills/A_thumb_v3.png
 *
 * For each template it writes three files into 03-thumbnails/rendered/:
 *
 *   <id>-guide.png      safe zones, dead zones and composition marks. Open this
 *                       next to your art while you compose.
 *   <id>-overlay.png    typography only, transparent background. Drop this over
 *                       your Nano Banana render in any editor.
 *   <id>-blurtest.png   the guide at 120px wide. If the subject isn't instantly
 *                       readable here, the thumbnail doesn't work.
 *
 * Fonts: uses Baloo 2 / Fredoka if installed, otherwise falls back to whatever
 * heavy sans is on the system. Install the real font before final export —
 * see 00-system/thumbnail-system.md.
 */

const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');

// playwright is installed globally in this environment, not in the project
function loadPlaywright() {
  const candidates = [
    () => require('playwright'),
    () => createRequire('/opt/node22/lib/node_modules/')('playwright'),
    () => createRequire(path.join(process.env.HOME || '/root', '.npm-global/lib/node_modules/'))('playwright'),
  ];
  for (const load of candidates) {
    try { return load(); } catch { /* try the next one */ }
  }
  console.error(
    'Could not load playwright.\n' +
    'Install it with:  npm i -D playwright\n' +
    '(Chromium itself is already present at PLAYWRIGHT_BROWSERS_PATH.)'
  );
  process.exit(1);
}

const TEMPLATES = [
  { id: 'A-poem',  file: 'A-poem.html',  width: 1280, height: 720,  label: 'Poem — soft centre' },
  { id: 'B-story', file: 'B-story.html', width: 1280, height: 720,  label: 'Story — cinematic left-third' },
  { id: 'C-short', file: 'C-short.html', width: 1080, height: 1920, label: 'Short — pop punch' },
];

function parseArgs(argv) {
  const args = { only: null, bg: null, text: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--only') args.only = argv[++i];
    else if (argv[i] === '--bg') args.bg = argv[++i];
    else if (argv[i] === '--text') args.text = true;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { chromium } = loadPlaywright();

  const root = path.resolve(__dirname, '..');
  const templateDir = path.join(root, '03-thumbnails', 'templates');
  const outDir = path.join(root, '03-thumbnails', 'rendered');
  fs.mkdirSync(outDir, { recursive: true });

  const targets = args.only
    ? TEMPLATES.filter(t => t.id.toLowerCase().startsWith(args.only.toLowerCase()))
    : TEMPLATES;

  if (targets.length === 0) {
    console.error(`No template matches --only "${args.only}". Known: ${TEMPLATES.map(t => t.id).join(', ')}`);
    process.exit(1);
  }

  const bgUrl = args.bg ? 'file://' + path.resolve(process.cwd(), args.bg) : null;
  if (args.bg && !fs.existsSync(path.resolve(process.cwd(), args.bg))) {
    console.error(`--bg file not found: ${args.bg}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  let count = 0;

  for (const t of targets) {
    const base = 'file://' + path.join(templateDir, t.file);
    const extra = (args.text ? '&text=1' : '') + (bgUrl ? `&bg=${encodeURIComponent(bgUrl)}` : '');

    // --- guide -----------------------------------------------------------
    const guide = await browser.newPage({ viewport: { width: t.width, height: t.height } });
    await guide.goto(`${base}?mode=guide${extra}`, { waitUntil: 'networkidle' });
    await guide.screenshot({ path: path.join(outDir, `${t.id}-guide.png`) });
    await guide.close();

    // --- overlay (transparent) -------------------------------------------
    const overlay = await browser.newPage({ viewport: { width: t.width, height: t.height } });
    await overlay.goto(`${base}?mode=overlay${extra}`, { waitUntil: 'networkidle' });
    await overlay.screenshot({ path: path.join(outDir, `${t.id}-overlay.png`), omitBackground: true });
    await overlay.close();

    // --- 120px blur test --------------------------------------------------
    const scale = 120 / t.width;
    const test = await browser.newPage({
      viewport: { width: 120, height: Math.round(t.height * scale) },
    });
    await test.goto(`${base}?mode=guide${extra}`, { waitUntil: 'networkidle' });
    await test.addStyleTag({ content: `html { zoom: ${scale}; }` });
    await test.screenshot({ path: path.join(outDir, `${t.id}-blurtest.png`) });
    await test.close();

    console.log(`  ${t.id.padEnd(8)} ${String(t.width).padStart(4)}x${t.height}  ${t.label}`);
    count++;
  }

  await browser.close();
  console.log(`\n${count * 3} files written to 03-thumbnails/rendered/`);
  console.log('Composite the -overlay.png over your render, then export JPG at quality 90.');
}

main().catch(err => { console.error(err); process.exit(1); });
