# Thumbnail System

On a made-for-kids video you lose end screens, cards, comments and pinned links. The
thumbnail is very close to your only marketing surface. Treat it as the deliverable it is.

---

## Specs

| | 16:9 (Slots A & B) | 9:16 (Slot C) |
|---|---|---|
| Canvas | **1280 × 720** | **1080 × 1920** |
| Safe zone | centre **1100 × 620** | centre 60% vertically |
| Format | JPG, quality 85–90 | JPG |
| Max size | **2 MB** | 2 MB |
| Min width | 640 px | — |

**Two dead zones you must keep clear:**

1. **Bottom-right** — the video duration stamp overlays it on every single surface.
   Nothing important goes there. Ever.
2. **Bottom strip (~15%)** — the progress bar on replays and the title overlay on mobile
   home feed.

A 1280×720 PNG usually blows past 2 MB. Export JPG at 90% and you'll land at 200–400 KB.

---

## Design rules for a preschool audience

The audience literally cannot read. This inverts most thumbnail advice.

1. **Graphics over text.** Kids scan for characters and colour, not words. Any text you
   add is aimed at the *parent* who is holding the phone.
2. **Max 3 words.** "FIVE FIREFLIES". Not a sentence. If you need more, you've picked the
   wrong image.
3. **One character, huge.** Face occupying 40–50% of the frame. Group shots die at
   thumbnail size.
4. **Peak emotion.** Delighted, astonished, curious. A neutral face gets no clicks.
   A *scared* face violates kids policy — stay on the positive side of high-arousal.
5. **Bright saturated colour**, especially blue, orange and pink. Complementary
   background to the character so the silhouette pops.
6. **Add a rim light** behind the character in the composite. Instant separation.
7. **Never a real child's face.** Illustrated characters only.
8. **Blur test:** shrink to 120 px wide and squint. If the subject isn't instantly
   identifiable, redo it.

---

## The three layouts

Each slot gets a fixed layout so your channel grid is instantly parseable, but the
character and colour change every day so it never looks like the same video twice.

### Layout A — Poem ("soft centre")

- Character centred, medium-close, on a soft gradient dusk background.
- Countable objects arranged in an arc (5 fireflies, 3 stars) — signals the rhyme's
  concept without words.
- Small hand-lettered numeral in the top-left if it's a counting rhyme.
- Muted pastel palette, matching the Plush Hollow style. Softest thumbnail on the grid.

### Layout B — Story ("cinematic left-third")

- Character in the **left third**, three-quarter view, looking right into empty space.
- The story's hero object glowing in the right third.
- Deep cinematic background with visible depth.
- Title text is **not** on the thumbnail — the drama carries it. This is the only slot
  where you go text-free on purpose, and it's what makes the story slot look premium.

### Layout C — Short ("pop punch")

- Vertical. Character huge, off-centre, mid-action, extreme expression.
- Flat single-colour clashing backdrop.
- One 2–3 word label in a chunky rounded font, top third.
- **Shorts pull a frame from the video by default** — so build the punchy moment *into*
  the video around 00:02 and select it as the cover, rather than uploading a mismatched
  custom image.

---

## Nano Banana thumbnail prompt formula

Generate the thumbnail as a **purpose-built still**, never a frame grab. Frame grabs are
composed for motion; thumbnails are composed for a 120px square.

```
[IDENTITY]  <paste character LOCK BLOCK>

[ACTION]    <character> with a <peak emotion> expression, <simple readable pose>

[COMPOSITION]
YouTube thumbnail composition, 16:9 landscape.  ← or "vertical 9:16" for Shorts
Subject occupies the <left third / centre> of the frame, face large and clearly
readable. Strong rim light separating the subject from the background. Simple
uncluttered background in <colour> that contrasts with the subject. Deliberate empty
negative space in the <right third / top> for a text overlay. Extremely high contrast
and clarity, readable when scaled down to 120 pixels wide.

[STYLE]     <paste STYLE BLOCK for the slot>

[LOCK]      Keep the character exactly as in the reference sheet.

[NEGATIVE]  no text, no letters, no watermark, no logo, no busy background, no clutter,
            no small details, no scary expression, no realistic human faces
```

Generate **without text**, then composite the overlay. Image models still mangle
typography, and you want the text crisp and consistent across the channel anyway.

---

## Compositing with the templates in this repo

`03-thumbnails/templates/` holds three HTML templates that render to exact-spec PNGs
using the Chromium already installed on this machine:

```bash
node kids-3d-animation/tools/render-thumbnails.js
```

Output lands in `03-thumbnails/rendered/`. Each template writes three files:

- `*-guide.png` — safe zones, dead zones and composition marks over a placeholder
  background. Open this next to your art while you compose.
- `*-overlay.png` — the typography layer on a transparent background, ready to drop over
  your Nano Banana render in any editor.
- `*-blurtest.png` — the guide rendered at 120 px wide. If the subject isn't instantly
  readable here, the thumbnail doesn't work at the size most people will see it.

To use your own render as the background instead, pass a path:

```bash
node kids-3d-animation/tools/render-thumbnails.js --bg ./stills/A_thumb_v3.png
```

---

## Typography

One font family for the whole channel. Chunky, rounded, high x-height, heavy weight.
Good free options: **Baloo 2**, **Fredoka**, **Nunito ExtraBold**.

- Size: minimum 90 px on a 1280×720 canvas. If it doesn't look absurdly large in the
  editor, it's too small.
- Always a **dark outline (8–10 px) plus a soft drop shadow**. Kids thumbnails have busy
  backgrounds and unoutlined text vanishes.
- Two colours max. White with a navy outline works on everything.
- Never place text over a face.

---

## A/B habit

You can swap a thumbnail at any time. Build the habit: if a video's CTR is under 4% at
48 hours, change the thumbnail, don't write off the video. Change **one** variable —
expression, or colour, or crop — so you learn something.

---

## Sources

- [YouTube thumbnail size, ratio & safe zones 2026](https://pixelbatch.io/blog/youtube-thumbnail-size-guide)
- [YouTube thumbnail safe zone guide](https://www.thumix.com/blog/youtube-thumbnail-safe-zone)
- [Kids YouTube channel thumbnail design guide](https://thumbifyx.com/blog/youtube-thumbnail-for-kids-channels)
- [YouTube thumbnail best practices](https://snappa.com/blog/youtube-thumbnail-best-practices/)
