# Style Guide — three distinct 3D looks

You asked for three animations that feel genuinely different. Different *subject matter*
is not enough — a viewer scrolling your channel page should be able to tell the poem
from the story from the Short at a glance, with the thumbnails blurred.

So each slot gets its own **render style, lens, palette and motion language**. Same
characters, same world, three different cameras and three different materials.

Paste the STYLE BLOCK verbatim into every Nano Banana prompt for that slot. Consistency
inside a video matters more than variety inside a video.

---

## Style A — "Plush Hollow" (Slot A, poems & rhymes)

The world is made of **fabric**. Everything looks like a hand-made needle-felted toy
photographed on a miniature set. This is the softest possible look, and softness is the
whole point for a 1–4 year old at bedtime.

**STYLE BLOCK:**

```
3D render in a needle-felted plush miniature style. Every surface is soft textile:
visible wool fibre fuzz, felt seams, tiny visible stitches, subtle fabric lint catching
the light. Miniature diorama photographed with a macro lens, shallow depth of field with
a creamy out-of-focus background. Warm low-angle golden-hour light with soft wraparound
shadows, gentle subsurface scattering through the wool. Muted pastel palette: butter
yellow, sage green, dusty rose, cream, pale sky blue. Cosy, tactile, handmade, slightly
imperfect. No hard specular highlights, no plastic, no metal, no harsh contrast.
```

- **Lens / framing:** 85mm macro equivalent. Eye level with the *character*, which means
  a low camera. Lots of empty soft space above the character's head.
- **Palette:** desaturated pastels, max ~55% saturation. If it's vivid, it's wrong.
- **Motion language:** slow float. Nothing snaps. Recommended motion prompts for the
  image-to-video step: `slow gentle sway`, `soft breathing motion`, `slow drift upward`,
  `camera pushes in very slowly`.
- **Cut rhythm:** one shot per 4 bars, roughly 6–8 seconds. Long holds are correct here.
- **Negative prompt:** `plastic, glossy, shiny, chrome, neon, harsh shadow, high
  contrast, sharp edges, photorealistic skin, text, watermark`

---

## Style B — "Storybook Cinema" (Slot B, storytelling)

A **feature film**. This is the slot where you're competing on craft, so it gets the
cinematic treatment: real lighting design, real lens language, real depth. Ages 4–8 have
the attention span for it and parents judge your whole channel on this video.

**STYLE BLOCK:**

```
Cinematic stylized 3D animation, feature-film quality. Painterly hand-crafted surface
textures with visible brushwork in the diffuse, soft rim lighting separating characters
from the background, volumetric god-rays through atmosphere, gentle film grain and a
warm filmic colour grade with lifted shadows. Rich layered depth: foreground silhouette
elements, mid-ground subject, atmospheric hazy background. Dramatic but soft key light
with large bounced fill. Anamorphic-style wide framing. Emotionally warm, wondrous,
storybook.
```

- **Lens / framing:** 35mm for wides, 50mm for mids, 85mm for the emotional close-ups.
  Use the close-up **only** at the story's turn — save it and it lands.
- **Palette:** each story picks ONE hero colour and denies it until the payoff. Day 001
  is the amber lantern glow: the first two acts are cool blue-grey, and the amber only
  arrives when the lantern lights.
- **Motion language:** deliberate. Push-ins on realisation, slow pull-outs on loneliness,
  handheld only in the frustration beat. Motion prompts: `slow dolly in`,
  `gentle crane up`, `subtle handheld sway`, `parallax camera move to the right`.
- **Cut rhythm:** 5–10 seconds. Slower in act 1, faster in the frustration montage.
- **Negative prompt:** `flat lighting, toy plastic, oversaturated, cartoon outline,
  low detail, text, watermark, extra limbs`

---

## Style C — "Pop Vinyl" (Slot C, Shorts)

**Toys.** Chunky glossy collectible-figure 3D on a seamless coloured backdrop. This look
exists for one reason: it has to read on a 5-inch phone screen at arm's length while
someone's thumb hovers over the swipe. That means maximum contrast, zero depth of field,
and colours that hit hard.

**STYLE BLOCK:**

```
3D render in a glossy vinyl designer-toy style. Chunky simplified shapes with thick
rounded forms, smooth injection-moulded plastic surfaces with a clean glossy specular
highlight, no surface texture detail. Hyper-saturated candy colour palette. Flat seamless
studio backdrop in a single bold colour, soft even studio lighting with one crisp
contact shadow. Everything in sharp focus edge to edge, no depth of field. Bold, punchy,
high contrast, playful. Vertical 9:16 composition with the subject centred and large in
frame.
```

- **Lens / framing:** 24mm wide, close. Slight lens distortion is good — it exaggerates.
  Subject fills 60–70% of the frame height.
- **Palette:** pick one clashing backdrop colour per Short and commit. Hot pink on
  orange, lime on teal. Rotate backdrop colour every Short so the channel grid looks
  alive.
- **Motion language:** snap. Squash and stretch, hard anticipation, overshoot, hold.
  Motion prompts: `fast bouncy squash and stretch`, `character launches upward fast`,
  `quick snappy head turn`, `whip pan`.
- **Cut rhythm:** 0.8–2 seconds. Never hold longer than 2s in a Short.
- **Negative prompt:** `muted colours, depth of field, blurry background, realistic
  texture, fabric, moody lighting, letterbox bars, text, watermark`

---

## The one-glance test

Before you produce anything, generate one frame in each style and put the three
thumbnails side by side, scaled to 120px wide. If you can't instantly tell which is
which, the styles aren't separated enough — push A softer, B moodier, C louder.

---

## Aspect ratio & delivery

| Slot | Generate at | Deliver | fps |
|---|---|---|---|
| A | 1920×1080 (16:9) | 1080p | 24 |
| B | 1920×1080 (16:9) | 1080p, 2K master if the model allows | 24 |
| C | 1080×1920 (9:16) | 1080×1920 | 30 |

Generate stills at the **final aspect ratio**. Cropping a 16:9 still to 9:16 wastes the
composition and crops your character's head off — Nano Banana composes for the frame you
ask for.
