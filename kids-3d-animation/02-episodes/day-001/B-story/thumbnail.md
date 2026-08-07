# Thumbnail — "The Lantern That Wouldn't Light"

**Layout B — "cinematic left-third".** 1280 × 720. **No text.**

---

## Why no text

Every other kids thumbnail on the grid is shouting. The story slot whispers, and it works
for three reasons: it signals "this is the crafted one," it reads better at 120 px than
any 3-word label would, and the image itself already poses the question — a small
character in the dark, reaching toward a light he doesn't have.

The title text sits directly under the thumbnail in every YouTube surface anyway. You
don't need to say it twice.

---

## Composition

```
┌────────────────────────────────────────────┐
│                                            │
│                                            │
│      ╭────────╮                            │
│      │  MOMO  │              ✦             │  Momo left third, 3/4, looking right
│      │  ↗     │           (lantern)        │  lantern glowing in the right third
│      ╰────────╯                            │  the gap between them IS the story
│  ▓▓ dark foreground silhouette ▓▓          │
│                                    [ 5:20 ]│  ← keep empty
└────────────────────────────────────────────┘
```

- Momo in the **left third**, three-quarter view, looking **right** across the frame into
  the empty space. Expression: hopeful and uncertain — not sad, not delighted.
- A single glowing lantern in the **right third**, warm amber, blooming.
- Momo is **not lit by it.** He's in cool blue. The unbridged gap between the boy and the
  light is the entire thumbnail.
- Dark out-of-focus foreground grass along the bottom edge for depth.
- Deep blue-teal background, heavy vignette.

**One deliberate lie of omission:** the lantern in the thumbnail is lit, and in the story
Momo's lantern isn't lit until the end. That's fine — the lantern in frame is *the*
lantern, glowing, which is a moment that genuinely occurs at 4:50. It's a promise the
video keeps. Do not, by contrast, put a shocked or crying face on it; that would be
promising drama the film doesn't deliver.

---

## Nano Banana prompt

```
Momo, a small round fox-like creature, sunshine-yellow fur, oversized rounded ears with
pale cream inner fur, a single white five-point star tuft on his chest, huge amber eyes
with large highlights, a tiny dark-brown nose, teal denim overalls with the LEFT shoulder
strap unbuckled.

Momo in three-quarter view turned toward the right side of the frame, looking across at
something out of reach, one paw half-raised. Expression hopeful and uncertain — eyes wide
and shining, mouth slightly open, ears up and alert. He is lit only in cool blue.

In the right third of the frame, a single small white paper lantern floats and glows with
warm amber light, blooming, casting visible light rays into the misty air around it.

YouTube thumbnail composition, 16:9 landscape. Momo occupies the left third, his head and
shoulders large and clearly readable. The glowing lantern occupies the right third. Empty
dark space between them. Dark out-of-focus grass silhouettes along the bottom edge.
Strong cool rim light along Momo's back and ears separating him from the deep blue-teal
background. Heavy vignette. Extremely high contrast, readable when scaled to 120 pixels
wide.

Cinematic stylized 3D animation, feature-film quality, painterly textures, volumetric
god-rays, warm filmic grade with lifted shadows, dramatic soft key light, film grain.

Keep Momo's face, fur colour, ear shape, chest star and overalls exactly as in the
attached reference sheet.

no text, no letters, no watermark, no logo, no busy background, no clutter, no scary
expression, no crying, no realistic human faces, no warm light falling on Momo.
```

> `no warm light falling on Momo` is load-bearing. The model will want to light him with
> the lantern because that's physically correct. It's dramatically wrong.

---

## Optional micro-text variant

If after 72 hours CTR is under 3.5%, test one variant with two words only:

| | |
|---|---|
| Text | `WON'T LIGHT` |
| Placement | bottom-left, under Momo, baseline y ≈ 600 |
| Font | Baloo 2 ExtraBold, 78 px |
| Fill | `#FFE9B8` warm cream |
| Outline | `#0E1B2A` near-black navy, 8 px |

Render with:
```bash
node kids-3d-animation/tools/render-thumbnails.js --only B
```

Change **one** variable at a time so you learn something. Text-vs-no-text is the cleanest
first test on this channel.

---

## Checks before upload

- [ ] Momo in the left third, looking right
- [ ] Lantern glowing in the right third
- [ ] **Momo not lit warm** — he stays cool blue
- [ ] Chest star visible, left strap unbuckled
- [ ] Expression hopeful, not sad and not scared
- [ ] Bottom-right 200×80 px empty
- [ ] Blur test at 120 px — the boy/light relationship still reads
- [ ] Visibly different from the day's Poem and Short thumbnails
- [ ] Exported JPG q90, under 2 MB
