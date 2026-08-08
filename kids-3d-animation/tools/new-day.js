#!/usr/bin/env node
/**
 * new-day.js — scaffold a new production day.
 *
 *   node kids-3d-animation/tools/new-day.js 002
 *   node kids-3d-animation/tools/new-day.js 002 --titles "Ten Little Toadstools" "Bibi's Impossible Bridge" "Momo vs the Sticky Leaf"
 *
 * Creates 02-episodes/day-<NNN>/{A-poem,B-story,C-short} with the templates copied in,
 * asset folders made, and stub suno.md / images.md / metadata.md / thumbnail.md files
 * pointing at the right system docs.
 */

const fs = require('fs');
const path = require('path');

const SLOTS = [
  { dir: 'A-poem',  template: 'poem-template.md',  label: 'Poem',  aspect: '16:9',  style: 'Plush Hollow' },
  { dir: 'B-story', template: 'story-template.md', label: 'Story', aspect: '16:9',  style: 'Storybook Cinema' },
  { dir: 'C-short', template: 'short-template.md', label: 'Short', aspect: '9:16',  style: 'Pop Vinyl' },
];

function stubSuno(slot, day) {
  return `# Suno — Day ${day} ${slot.label}

Formulas and per-slot style presets: [\`00-system/suno-playbook.md\`](../../../00-system/suno-playbook.md)

## Style box

\`\`\`

\`\`\`

## Lyrics box

\`\`\`

\`\`\`

## Receipt

\`\`\`
Suno track ID:
Take used:            /
Commercial rights confirmed:  [ ]
\`\`\`
`;
}

function stubImages(slot, day) {
  return `# Nano Banana prompts — Day ${day} ${slot.label}

Generate at the final aspect ratio (**${slot.aspect}**). Attach character reference sheets
to every generation.

- Prompt structure & consistency method: [\`00-system/nanobanana-playbook.md\`](../../../00-system/nanobanana-playbook.md)
- Character lock blocks: [\`00-system/character-bible.md\`](../../../00-system/character-bible.md)
- Style block for **${slot.style}**: [\`00-system/style-guide.md\`](../../../00-system/style-guide.md)

## Reusable blocks

**\`{STYLE}\`** — paste the ${slot.style} STYLE BLOCK here
**\`{NEG}\`** — universal negative + the ${slot.style} negatives

## Lighting continuity

| Shots | Stage | Phrase to include in every prompt |
|---|---|---|
|  |  |  |

## The shots

### 01 —
\`\`\`

\`\`\`

## Motion prompts

| Shot | Motion prompt |
|---|---|
| 01 |  |
`;
}

function stubMetadata(slot, day) {
  const times = { 'A-poem': '17:00', 'B-story': '19:00', 'C-short': '07:00' };
  return `# Metadata — Day ${day} ${slot.label}

Formulas: [\`00-system/seo-metadata-system.md\`](../../../00-system/seo-metadata-system.md)

## Title

\`\`\`

\`\`\`

## Description

\`\`\`

\`\`\`

## Tags

\`\`\`

\`\`\`

## Upload settings

| | |
|---|---|
| Made for Kids | **Yes** |
| Publish | ${times[slot.dir]} local |
| Playlist |  |
| Altered content disclosure | **Yes** — AI-assisted |
`;
}

function stubThumbnail(slot, day) {
  const layouts = {
    'A-poem':  'Layout A — "soft centre" · 1280 × 720',
    'B-story': 'Layout B — "cinematic left-third" · 1280 × 720 · no text',
    'C-short': 'Layout C — "pop punch" · 1080 × 1920 · cover frame from the video',
  };
  const only = slot.dir[0];
  return `# Thumbnail — Day ${day} ${slot.label}

**${layouts[slot.dir]}**

Specs, safe zones and the prompt formula: [\`00-system/thumbnail-system.md\`](../../../00-system/thumbnail-system.md)

## Nano Banana prompt

\`\`\`

\`\`\`

## Overlay

\`\`\`bash
node kids-3d-animation/tools/render-thumbnails.js --only ${only}
\`\`\`

## Checks

- [ ] Bottom-right 200×80 px empty (duration stamp)
- [ ] Blur test at 120 px
- [ ] Distinct from the other two videos today
- [ ] Exported JPG q90, under 2 MB
`;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    console.error('Usage: node new-day.js <day-number> [--titles "A" "B" "C"]');
    process.exit(1);
  }

  const day = String(argv[0]).padStart(3, '0');
  const titleIdx = argv.indexOf('--titles');
  const titles = titleIdx === -1 ? [] : argv.slice(titleIdx + 1, titleIdx + 4);

  const root = path.resolve(__dirname, '..');
  const dayDir = path.join(root, '02-episodes', `day-${day}`);

  if (fs.existsSync(dayDir)) {
    console.error(`day-${day} already exists at ${dayDir} — refusing to overwrite.`);
    process.exit(1);
  }

  SLOTS.forEach((slot, i) => {
    const slotDir = path.join(dayDir, slot.dir);
    ['stills', 'audio', 'video', 'thumb'].forEach(sub =>
      fs.mkdirSync(path.join(slotDir, sub), { recursive: true })
    );

    const title = titles[i] || `Day ${day} ${slot.label}`;
    const template = fs.readFileSync(path.join(root, '01-templates', slot.template), 'utf8');
    fs.writeFileSync(path.join(slotDir, 'episode.md'), template.replace(/\{\{TITLE\}\}/g, title));

    fs.writeFileSync(path.join(slotDir, 'suno.md'), stubSuno(slot, day));
    fs.writeFileSync(path.join(slotDir, 'images.md'), stubImages(slot, day));
    fs.writeFileSync(path.join(slotDir, 'metadata.md'), stubMetadata(slot, day));
    fs.writeFileSync(path.join(slotDir, 'thumbnail.md'), stubThumbnail(slot, day));

    console.log(`  ${slot.dir.padEnd(8)} ${title}`);
  });

  const checklist = fs.readFileSync(path.join(root, '01-templates', 'production-checklist.md'), 'utf8');
  fs.writeFileSync(path.join(dayDir, 'checklist.md'), checklist.replace(/\{\{DAY\}\}/g, day));

  console.log(`\nday-${day} scaffolded at 02-episodes/day-${day}/`);
  console.log('Start with the checklist: 02-episodes/day-' + day + '/checklist.md');
}

main();
