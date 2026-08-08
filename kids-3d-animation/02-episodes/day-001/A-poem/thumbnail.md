# Thumbnail — "Five Sleepy Fireflies"

**Layout A — "soft centre".** 1280 × 720. Softest thumbnail on the channel grid, which is
exactly how a parent scanning at bedtime finds it.

---

## Composition

```
┌────────────────────────────────────────────┐
│  5                    ✦    ✦               │   "5" hand-lettered, top-left
│                  ✦              ✦          │   fireflies in a countable arc
│                        ✦                   │
│            ╭──────────────╮                │
│            │   MOMO       │                │   face ~40% of frame height
│            │   looking up │                │   centred, slightly low
│            ╰──────────────╯                │
│      FIVE SLEEPY FIREFLIES                 │   text baseline ~y=610
│                                    [ 2:35 ]│   ← keep this corner EMPTY
└────────────────────────────────────────────┘
```

- Momo centred, **medium close-up**, chin tilted up, delighted-sleepy expression — eyes
  open and wide here, not closed. A closed-eye thumbnail reads as "nothing happening."
- **Five fireflies, clearly countable**, arcing over his head. The count is the concept;
  if a parent can count them at 120px, the thumbnail has done its job.
- Background: soft indigo-to-dusty-rose gradient. Deeper and more saturated than the
  film's own palette — thumbnails need more contrast than footage.
- Strong warm rim light on Momo's ears and shoulders from behind. This is what stops him
  dissolving into the background at small sizes.

---

## Nano Banana prompt

```
Momo, a small round fox-like creature, sunshine-yellow fur, oversized rounded ears with
pale cream inner fur, a single white five-point star tuft on his chest, huge amber eyes
with large highlights, a tiny dark-brown nose, teal denim overalls with the LEFT shoulder
strap unbuckled.

Momo looking upward with a delighted sleepy expression, eyes wide and shining, a soft
open smile, ears relaxed. Exactly five small glowing amber fireflies drifting in a clear
arc above his head, evenly spaced and individually countable.

YouTube thumbnail composition, 16:9 landscape. Momo centred, medium close-up, his face
occupying roughly 40 percent of the frame height, positioned slightly below centre.
Strong warm rim light behind him separating him cleanly from the background. Simple
uncluttered background: a smooth deep indigo to dusty rose gradient with a few soft
distant stars. Deliberate empty space along the bottom of the frame for a text overlay.
Extremely high contrast and clarity, readable when scaled down to 120 pixels wide.

3D render in a needle-felted plush miniature style, soft textile surfaces with visible
wool fibre and felt seams, subsurface scattering through the wool, handmade and tactile.
Richer and more saturated than a still frame, but still soft.

Keep Momo's face, fur colour, ear shape, chest star and overalls exactly as in the
attached reference sheet.

no text, no letters, no numbers, no watermark, no logo, no busy background, no clutter,
no scary expression, no realistic human faces, no closed eyes, no extra limbs.
```

> Note the `no closed eyes` and `no text` negatives — both are failure modes this
> specific image invites, since the song is about sleeping and the concept is a number.

---

## Text overlay

| | |
|---|---|
| Text | `FIVE SLEEPY FIREFLIES` |
| Numeral | `5`, hand-lettered look, top-left, 124 px, rotated −7° |
| Font | Baloo 2 ExtraBold (or Fredoka SemiBold) |
| Size | 66 px, tracking +2, **single line** |
| Fill | `#FFF6E0` warm cream |
| Outline | `#2B2350` deep indigo, 8 px |
| Shadow | 0 6px 12px rgba(0,0,0,0.45) |
| Top edge | y = 502, centred, inside the 1100×620 safe box and clear of the bottom 15% |

> 66 px rather than the 90 px channel minimum, because this title is 21 characters. If a
> rhyme's title is short enough to set at 90 px, do — bump it in the template. The
> constraint that actually matters is one line inside the safe box.

Render the overlay layer with:

```bash
node kids-3d-animation/tools/render-thumbnails.js --only A
```

Then composite `03-thumbnails/rendered/A-poem-overlay.png` over your Nano Banana render and
export **JPG at quality 90** (lands around 250–350 KB, well under the 2 MB cap).

---

## Checks before upload

- [ ] Exactly five fireflies, countable at 120 px
- [ ] Momo's chest star visible and 5-pointed
- [ ] Left overall strap unbuckled
- [ ] Eyes **open**
- [ ] Bottom-right 200×80 px completely empty (duration stamp)
- [ ] No text in the bottom 15% (progress bar / mobile title overlay)
- [ ] Blur test at 120 px — Momo still instantly identifiable
- [ ] Sits distinctly apart from the day's Story and Short thumbnails
- [ ] Exported JPG, under 2 MB
