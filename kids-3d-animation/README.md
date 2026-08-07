# Puddleberry Hollow — 3D Kids Animation Production System

A complete, repeatable pipeline for shipping **3 videos per day** to a made-for-kids
YouTube channel, built around Suno (music/voice) and Nano Banana (stills).

| Slot | Format | Length | Style | Audience |
|---|---|---|---|---|
| **A — Poem / Rhyme** | 16:9 | 2:00–3:00 | Plush Hollow (felted, soft) | 1–4 yrs |
| **B — Storytelling** | 16:9 | 4:00–6:00 | Storybook Cinema (feature-film 3D) | 4–8 yrs |
| **C — Short** | 9:16 | 0:25–0:45 | Pop Vinyl (glossy toy 3D) | 3–8 yrs + parents |

---

## Read this first: the honest gap in the plan

Suno makes **audio**. Nano Banana makes **still images**. Neither makes video.
Between them you need an **image-to-video** step, or you will end up with a slideshow —
and slideshow kids content is exactly what YouTube's quality policy demotes and
demonetizes.

The pipeline in this repo assumes three tools, not two:

```
 Suno  ──────────────►  song / narration audio
                                  │
 Nano Banana  ──────►  keyframe stills  ──►  Kling 3.0 / Veo 3.1  ──►  animated shots
                                  │                                          │
                          thumbnail still                                    ▼
                                                                   edit + mix + caption
```

**Recommended image-to-video model per slot** (2026):

- **A — Poem:** Kling 3.0 Turbo. Cheapest per second, handles slow gentle motion, and
  poems are mostly 4–8 second held shots. Motion prompt: keep it under ~6 words.
- **B — Story:** Veo 3.1. Best character preservation from a source image and the
  cleanest multi-shot continuity, which matters most on the 5-minute piece.
- **C — Short:** Veo 3.1 for vertical (native 9:16, native audio), or Hailuo 2.3 if the
  gag depends on facial micro-expressions.

Budget reality check: a 5-minute story at ~45 shots × 8s is roughly 6 minutes of
generated video. At 2026 pricing that is the single largest cost in the day. If you
need to cut, cut **B to 3 days a week** and repeat A and C daily — see
[00-system/compliance-checklist.md](00-system/compliance-checklist.md) for why volume
without quality is the one thing that actually gets a kids channel killed.

---

## The daily pipeline (about 3–4 hrs once the system is warm)

| # | Step | Tool | Time |
|---|---|---|---|
| 1 | Pick the day's three concepts from the idea bank | — | 10 m |
| 2 | Write lyrics / script from the templates in `01-templates/` | — | 30 m |
| 3 | Generate song + narration | Suno | 20 m |
| 4 | Generate keyframes from the shot list | Nano Banana | 45 m |
| 5 | Animate keyframes | Kling / Veo | 60 m (mostly waiting) |
| 6 | Edit, mix, caption | CapCut / Resolve | 45 m |
| 7 | Thumbnail composite | Nano Banana + `03-thumbnails/` | 15 m |
| 8 | Upload, metadata, schedule | YouTube Studio | 15 m |

Run step 5 for all three videos **in parallel** — it is the only step where waiting
dominates. Start it before lunch, edit after.

**Scaffold a new day:**

```bash
node kids-3d-animation/tools/new-day.js 002
```

This copies the templates into `02-episodes/day-002/` with the numbering, checklists
and prompt scaffolds already filled in.

---

## What's in here

```
00-system/     The stuff you write once and reuse every single day
  character-bible.md      Locked character descriptions — paste verbatim into Nano Banana
  style-guide.md          The three render styles, as copy-paste prompt blocks
  suno-playbook.md        Prompt formulas, lyric tags, common failure fixes
  nanobanana-playbook.md  Consistency method, shot prompt formula, negative prompts
  thumbnail-system.md     Specs, safe zones, the 3 layouts, CTR rules
  seo-metadata-system.md  Title/description/tag formulas + the 30-day idea bank
  compliance-checklist.md YouTube made-for-kids + COPPA rules. Read before uploading.

01-templates/  Blank fill-in-the-gaps forms for each format + the daily checklist
02-episodes/   Day-by-day finished packets. day-001 is written and ready to produce.
03-thumbnails/ templates/  three HTML thumbnail layouts (16:9 ×2, 9:16 ×1)
               rendered/   output PNGs — guide, overlay and 120px blur test
tools/         new-day.js scaffolder, render-thumbnails.js
```

**Rendering the thumbnail templates** (Chromium is already installed):

```bash
cd kids-3d-animation && npm run thumbs
```

Each layout renders three files: a `-guide.png` with safe zones and composition marks to
work against, a transparent `-overlay.png` to composite over your render, and a
`-blurtest.png` at 120 px — if the subject isn't readable there, the thumbnail doesn't
work. Install **Baloo 2** or **Fredoka** before your final export; the templates fall back
to a generic heavy sans if neither is present.

---

## Day 001 is ready to produce

Everything below is written, not outlined — lyrics, shot lists with timecodes,
numbered image prompts, Suno prompts, titles, descriptions, tags, thumbnail prompts.

| | Title | Folder |
|---|---|---|
| A | *Five Sleepy Fireflies* | [`02-episodes/day-001/A-poem/`](02-episodes/day-001/A-poem/) |
| B | *The Lantern That Wouldn't Light* | [`02-episodes/day-001/B-story/`](02-episodes/day-001/B-story/) |
| C | *Zip Gets the Hiccups* | [`02-episodes/day-001/C-short/`](02-episodes/day-001/C-short/) |

Each folder has the same five files: `episode.md`, `suno.md`, `images.md`,
`metadata.md`, `thumbnail.md`. The day's tick-list is
[`02-episodes/day-001/checklist.md`](02-episodes/day-001/checklist.md).

---

## Why one world instead of random videos

Every video shares a cast and a place: **Puddleberry Hollow**. This is not a branding
nicety, it is the thing that makes 3 videos a day physically possible:

1. **Nano Banana consistency is free.** The character bible is written once. Every
   prompt starts from the same locked description, so you are never re-designing.
2. **Reference sheets amortize.** Build the 12-angle sheets once (see
   `nanobanana-playbook.md`), reuse them for a year.
3. **Retention compounds.** A returning 4-year-old already knows Momo. Familiar
   characters are the single strongest retention lever in preschool content, and
   YouTube's kids quality principles explicitly reward it.
4. **Shorts feed the long-form.** Slot C uses the same cast, so a Short that pops
   sends viewers to the story, not to a stranger's channel.

Cast, world and the three visual styles: [`00-system/character-bible.md`](00-system/character-bible.md)
and [`00-system/style-guide.md`](00-system/style-guide.md).

---

## Sources

Built from current guidance as of August 2026:

- [Suno Prompt Guide 2026 — style tags & lyric formatting](https://hookgenius.app/learn/suno-prompt-guide-2026/)
- [Suno AI Prompt Guide — 10 tips + templates](https://suno.bi/en/blog/suno-prompt-tips-guide)
- [Nano Banana Pro character consistency guide](https://prompting.systems/blog/nano-banana-pro-character-consistency-guide)
- [Nano Banana Pro consistent character sheets](https://selfielabstudio.com/blog/nano-banana-pro-consistent-character-sheets-guide-20260216)
- [Best AI video models 2026 — Seedance 2 vs Veo 3.1 vs Kling 3](https://www.teamday.ai/blog/best-ai-video-models-2026)
- [YouTube — Best practices for kids & family content](https://support.google.com/youtube/answer/10774223?hl=en)
- [YouTube channel monetization policies](https://support.google.com/youtube/answer/1311392?hl=en)
- [YouTube thumbnail size & safe zones 2026](https://pixelbatch.io/blog/youtube-thumbnail-size-guide)
- [YouTube Shorts best practices 2026](https://joinbrands.com/blog/youtube-shorts-best-practices/)
- [YouTube audience retention benchmarks 2026](https://socialrails.com/blog/youtube-audience-retention-complete-guide)
