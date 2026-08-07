# Nano Banana prompts — "The Lantern That Wouldn't Light"

42 keyframes at **1920×1080**. Attach Momo's and Bibi's turnaround sheets to every
generation.

---

## Reusable blocks

**`{MOMO}`** / **`{BIBI}`** / **`{GOGO}`** — paste the LOCK BLOCKs from
[`00-system/character-bible.md`](../../../00-system/character-bible.md) verbatim.

**`{STYLE}`**
> Cinematic stylized 3D animation, feature-film quality. Painterly hand-crafted surface
> textures with visible brushwork, soft rim lighting separating characters from the
> background, volumetric god-rays through atmosphere, gentle film grain, warm filmic
> colour grade with lifted shadows. Rich layered depth: foreground silhouette elements,
> mid-ground subject, atmospheric hazy background. Soft key light with large bounced
> fill. Anamorphic-style wide framing.

**`{NEG}`**
> no text, no letters, no watermark, no logo, no extra limbs, no deformed paws, no
> duplicated characters, no human characters, no realistic human faces, no scary or
> menacing expressions, no flat lighting, no toy plastic look, no oversaturation, no
> cartoon outlines.

---

## The colour rule — read before generating anything

**Amber does not exist until shot 41.**

| Shots | Grade | Phrase to paste into every prompt |
|---|---|---|
| 01–04 | cold, no warm light at all | `cool desaturated blue-grey dusk, no warm colours anywhere in frame` |
| 05–10 | cold world, warm light **on other people only** | `cool blue-grey dusk; warm amber lantern glow only on other characters, never on Momo` |
| 11–30 | coldest | `cold blue moonlight interior, pale and desaturated, no warm light sources` |
| 31–38 | one warm source, distant | `cold blue night; a single distant warm lantern beside Gogo, not illuminating Momo` |
| 39–40 | still cold | `cold blue night, warm procession lights far in the background` |
| **41–42** | **amber floods** | `warm amber light blooming from the lantern and flooding both faces, the first and only warm light on Momo in the film` |

If shot 41 doesn't feel like relief, go back and make shots 11–30 colder. The payoff is
manufactured entirely in the setup.

---

## Act 1 — hero shots

### 01 — ECU, paws on the lantern
```
{MOMO}
Extreme close-up of Momo's two small yellow paws wrapped tightly around a small white
paper lantern, squeezing hard enough to crease the paper. The lantern is completely
unlit — plain white paper, no glow. Only the paws and the lantern in frame; his face is
out of frame above.
Macro, 85mm, very shallow depth of field, dark blurred background.
Cool desaturated blue-grey dusk, no warm colours anywhere in frame.
{STYLE}  |  Keep Momo's fur colour and paw shape exactly as in the reference.  |  {NEG}
```

### 02 — MCU, Momo staring at it
```
{MOMO}
Momo looking down at the unlit lantern in his paws, jaw set, brow furrowed with
determination rather than sadness, ears tense and slightly back. Not crying.
Medium close-up, 85mm, camera slightly above his eye line looking down, shallow depth of
field.
Cool desaturated blue-grey dusk, no warm colours anywhere in frame.
{STYLE}  |  {NEG}
```

### 03 — WS, Momo alone
```
{MOMO}
Momo standing alone and very small in the lower right of a wide empty frame, holding the
unlit lantern at his side, dwarfed by rolling dough-soft hills and a huge dusk sky.
Wide shot, 35mm, low horizon, enormous negative space above and to the left of him.
Cool desaturated blue-grey dusk, no warm colours anywhere in frame.
{STYLE}  |  {NEG}
```
> Title card goes over this. Leave the upper-left third clean.

### 05 — EWS, the Hollow on Lantern Night
```
Puddleberry Hollow at dusk on a festival night: a rounded green valley of dough-soft
hills and hollowed toadstool houses, seen from above and far away. A winding path through
the valley is dotted with dozens of small warm amber lantern lights, tiny figures walking
in a slow procession. Volumetric haze catching the lantern light.
Extreme wide shot, 35mm, high crane angle.
Cool blue-grey dusk; the only warm light is the distant procession.
{STYLE}  |  {NEG}
```

### 07 — CU, a lantern blooming
```
Close-up of a small white paper lantern held in unseen paws at the edge of frame,
blooming to life with warm amber light from within, the paper glowing translucent, tiny
motes of dust catching the light. Beautiful, quiet, magical.
Macro, 85mm, extremely shallow depth of field.
Cool blue-grey dusk background; the lantern is the only warm light source.
{STYLE}  |  {NEG}
```

### 08 — MS, Bibi's lantern works
```
{BIBI}
Bibi holding her glowing lantern up above her head with both paws, face tilted up, mouth
open in an enormous delighted grin, glasses catching the warm light, scarf trailing.
Medium shot, 50mm, slight low angle, warm lantern light on her face.
Cool blue-grey dusk; warm amber glow only on Bibi.
{STYLE}  |  {NEG}
```

### 09 — MS, Momo hides his
```
{MOMO}
Momo standing facing camera with both paws behind his back concealing something, wearing
a stiff forced smile that doesn't reach his eyes, ears slightly back. Warm light from
off-screen falls on everything around him but he stands in a cool pocket of shadow.
Medium shot, 50mm, eye level.
Cool blue-grey dusk; warm amber lantern glow on the background but not on Momo.
{STYLE}  |  {NEG}
```
> `not on Momo` is doing the storytelling here. Insist on it — re-roll if he's lit warm.

### 10 — MCU, Bibi notices
```
{BIBI}
Bibi's face, the big grin just starting to fade, eyebrows drawing together slightly,
eyes flicking down and to the side toward something off-screen. She has noticed and is
deciding whether to say anything.
Medium close-up, 85mm, shallow depth of field.
Cool blue-grey dusk, warm light from her own lantern below frame.
{STYLE}  |  {NEG}
```

---

## Act 2 — the montage (shots 11–21)

**Chain these.** Generate shot 11 as the master, then feed it back in and edit for each
subsequent attempt. Same room, same camera, same light — the comedy of the montage
depends on the setup being *identical* and only Momo changing.

**Master — 11:**
```
{MOMO}
Interior of a small round toadstool house: curved wooden walls, a circular window, a
small round stove, a low table. Momo standing at the table with the unlit white paper
lantern in front of him, sleeves of determination. Cosy but cold-lit.
Wide shot, 35mm, camera locked off at table height, the round window on the right.
Cold blue moonlight through the window, pale and desaturated, no warm light sources.
{STYLE}  |  {NEG}
```

Then edit that image for each beat:

| # | Edit prompt (feed shot 11 back in) |
|---|---|
| 12 | `Same room, same camera. Momo holds the lantern perfectly still in both paws, arms locked, eyes wide, holding his breath. Lantern still unlit.` |
| 13 | `Same room, same camera. Momo rubbing his paws together vigorously, motion blur on the paws, tongue out in concentration. Lantern on the table, unlit.` |
| 14 | `Same room, same camera. Momo crouched at the small round stove holding both paws close to it, paws flushed pink, face lit faintly by stove-light, eyes squeezed shut.` |
| 15 | `Same room, same camera. Momo mid-lunge toward the table, snatching the lantern with both pink paws, motion blur, urgent. Lantern unlit.` |
| 16 | `Close-up, same room. Momo's paws squeezing the paper lantern so hard the paper visibly dents and buckles inward. Unlit.` |
| 17 | `Close-up, same room. One paw carefully smoothing the dented paper flat again, gentle and slightly ashamed. Unlit.` |
| 18 | `Medium close-up, same room. Momo holding the lantern with his eyes squeezed tightly shut, face scrunched with effort, ears rigid.` |
| 19 | `Medium close-up, same room. One eye cracked open, peeking down at the lantern, hopeful. The lantern is still white and unlit.` |
| 20 | `Wide, same room. The lantern sits alone on the round windowsill in cold moonlight. Momo lies on the floor below it, chin resting on his paws, watching it, ears flat.` |
| 21 | `Extreme close-up of the white paper lantern on the sill, cold, plain, moonlit, absolutely no glow. Nothing else in frame.` |

### 22 — MCU, "Why not me?"
```
{MOMO}
Momo's face lit only by cold blue moonlight, looking up at something above him. Not
crying, but eyes shining and wet at the lower lid. Ears completely flat backward. Mouth
a small line. Quiet and defeated.
Medium close-up, 85mm, camera low looking up slightly, very shallow depth of field.
Cold blue moonlight, pale and desaturated, no warm light.
{STYLE}  |  {NEG}
```
> Ears flat backward is the character-bible tell for "about to cry." Enforce it.

---

## Act 3 — hiding

### 26 — WS, under the table
```
{MOMO}
Momo curled up under a low round wooden table in a dark room, knees to his chest, the
unlit lantern beside him, both oversized ears pulled down and folded flat over his eyes
with his paws. Small and hidden. Framed by the table legs.
Wide shot, 35mm, low camera on the floor, foreground table legs in silhouette.
Cold blue moonlight from a window off-frame right, deep shadow.
{STYLE}  |  {NEG}
```

### 27 — MCU, Bibi's shadow
```
Interior, dark. A round window with cold blue moonlight coming through it, and the sharp
round-shelled silhouette of Bibi cast on the wall and floor beside it, one paw raised as
if about to knock. Bibi herself is not visible — only her shadow.
Medium shot, 50mm, the shadow the clear subject.
Cold blue moonlight only.
{STYLE}  |  {NEG}
```

### 30 — EWS, one dark window
```
Exterior night. The valley of Puddleberry Hollow seen wide, every toadstool house glowing
warm from within and the path lined with amber lanterns — except one single house in the
foreground, completely dark, one black round window.
Extreme wide shot, 35mm, the dark house prominent in the lower third.
Cold blue night with a valley of warm lights that do not reach the dark house.
{STYLE}  |  {NEG}
```
> The one shot in the film that states the theme without a word. Get it right.

---

## Act 4 — Gogo

### 32 — WS, Gogo mid-sit
```
{GOGO}
Grandpa Gogo, enormous, on a stone path, caught halfway through the act of sitting down —
weight shifting, moss on his back, moustache reaching the ground. His own warm lantern
rests on the stones beside him. He fills most of the frame.
Wide shot, 35mm, low camera, Momo's tiny silhouette watching from a doorway in the far
left of frame.
Cold blue night; a single warm lantern beside Gogo that does not reach Momo.
{STYLE}  |  {NEG}
```

### 33 — MS, scale
```
{GOGO} and {MOMO}
Gogo seated, vast, and Momo sitting beside him — Momo's whole body roughly the size of
Gogo's head. Both facing forward, looking out at the valley. Comfortable silence between
them.
Medium wide, 35mm, side-on, both in profile, the valley soft behind.
Cold blue night; Gogo's warm lantern glowing between them at ground level.
{STYLE}  |  {NEG}
```

### 38 — CU, "Is it?"
```
{GOGO}
Extreme close-up of Grandpa Gogo's face: enormous droopy eyelids raised very slightly,
one eye visible, a genuinely curious and gentle expression — not a knowing smile, not a
wink. He is still thinking about the question himself. Moustache and moss texture in
sharp detail.
Close-up, 85mm, shallow depth of field.
Cold blue night with warm lantern light rising from below, lighting his face from
underneath.
{STYLE}  |  {NEG}
```
> The pivot of the film. Re-roll until it is *curious*, not wise. A twinkly knowing
> expression turns the story into a lecture.

---

## Act 5 — the payoff

### 39 — WS, Momo runs
```
{MOMO}
Momo running flat-out from left to right, all four limbs extended, ears streaming
backward, the unlit lantern clutched in one paw, motion blur on the background. The first
genuinely fast movement in the film.
Wide tracking shot, 35mm, side-on, low camera, strong horizontal motion blur.
Cold blue night, warm procession lights far in the background.
{STYLE}  |  {NEG}
```

### 40 — MS, Bibi alone
```
{BIBI}
Bibi at the back of the lantern procession, alone, holding her glowing lantern down low
at her side rather than up high, looking back over her shell toward camera. A little
subdued.
Medium shot, 50mm, warm procession lights receding behind her.
Cold blue night, warm glow only from her own low lantern.
{STYLE}  |  {NEG}
```

### 41 — CU, four paws and the bloom  ★
```
{MOMO} and {BIBI}
Extreme close-up: Momo's two yellow paws holding a white paper lantern, and Bibi's two
smaller blue paws wrapped around the outside of his. Four paws around white paper. The
lantern is blooming to life with warm amber light from within, the paper glowing
translucent, light spilling out between their fingers and flooding upward onto both their
faces at the top edge of frame.
Macro, 85mm, extremely shallow depth of field.
Warm amber light blooming from the lantern and flooding both faces — the first and only
warm light on Momo in the entire film. Dramatic and beautiful.
{STYLE}  |  {NEG}
```
> **Generate two versions: unlit and lit**, same composition. Use first/last-frame
> conditioning so the bloom happens *in* the shot. Do not cut to the glow — the whole
> film is built for this one continuous moment.

### 42 — EWS, crane to the valley
```
{MOMO} and {BIBI}
Momo and Bibi running together along the path toward the procession, one bright amber
lantern held between them, both small in frame. Camera cranes up and back to reveal the
whole valley of Puddleberry Hollow filled with moving warm lights, and high above, Nana
Moon — a large pale-gold crescent moon with a gentle sleeping face — watching over it.
Extreme wide shot, 35mm, high crane, volumetric haze catching every lantern.
Warm and full: amber lights throughout the valley, cool moonlight above. Golden and
resolved.
{STYLE}  |  {NEG}
```

---

## Motion prompts (Veo 3.1)

| Shots | Prompt |
|---|---|
| 01 | `paws squeeze tighter, paper crinkles` |
| 02–03 | `slow dolly in` / `slow dolly out` |
| 05 | `slow crane down over the valley, lanterns flicker` |
| 07 | `lantern glow blooms outward from within` |
| 08 | `she lifts the lantern higher, bouncing slightly` |
| 09 | `small nervous shift, forced smile holds` |
| 12–19 | `quick snappy action, locked-off camera` |
| 20 | `very slow dolly in toward the windowsill` |
| 22 | `slow blink, one tear does not fall` |
| 26 | `slow dolly in, small breathing motion` |
| 27 | `the shadow shifts, then withdraws` |
| 30 | `very slow pull out over the valley` |
| 32 | `extremely slow sitting motion` |
| 38 | `almost still, eyelid raises slightly` |
| 39 | `fast running motion, strong motion blur, camera tracks` |
| 41 | `amber glow blooms outward, light spreads across both faces` |
| 42 | `slow crane up and back revealing the valley` |

Shots 41 and 42 are worth 3–4 generations each. They're 25 seconds of a 5-minute film and
they carry all of it.
