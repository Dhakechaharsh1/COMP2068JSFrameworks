# Nano Banana prompts — "Five Sleepy Fireflies"

20 keyframes. Generate at **1920×1080**.

---

## Reusable blocks

Define these once in your prompt tool (or clipboard manager) and substitute wherever the
shot prompts say `{MOMO}`, `{STYLE}`, `{WORLD}`, `{NEG}`.

**`{MOMO}`**
> Momo, a small round fox-like creature, sunshine-yellow fur, oversized rounded ears with
> pale cream inner fur, a single white five-point star tuft on his chest, huge amber eyes
> with large highlights, a tiny dark-brown nose, teal denim overalls with the LEFT
> shoulder strap unbuckled and hanging, bare paws, proportions of a 4-year-old with a
> head one-third of his total height.

**`{MOON}`**
> Nana Moon, a large pale-gold crescent moon with a gentle sleeping face, closed curved
> eyes, soft rosy cheeks, a faint smile, surrounded by a warm halo and small drifting
> stars, high in a deep indigo sky.

**`{STYLE}`**
> 3D render in a needle-felted plush miniature style. Every surface is soft textile:
> visible wool fibre fuzz, felt seams, tiny visible stitches. Miniature diorama shot on a
> macro lens, shallow depth of field with a creamy out-of-focus background, soft
> subsurface scattering through the wool. Muted pastel palette: butter yellow, sage
> green, dusty rose, cream, pale sky blue. Cosy, tactile, handmade, slightly imperfect.
> No hard specular highlights, no plastic, no metal, no harsh contrast.

**`{WORLD}`**
> Puddleberry Hollow: a rounded green valley of dough-soft hills, hollowed toadstool
> houses with circular windows and mossy roofs, a slow silver stream, warm paper lanterns
> strung between branches, oversized clover and dandelions, no sharp edges on any object.

**`{NEG}`**
> no text, no letters, no watermark, no logo, no extra limbs, no duplicated characters,
> no human characters, no scary or menacing expressions, no plastic, no glossy surfaces,
> no harsh shadows, no high contrast, no sharp edges, not photorealistic.

**Attach Momo's turnaround sheet to every generation.** Then add the lock line:

**`{LOCK}`**
> Keep Momo's face, fur colour, ear shape, chest star and overalls exactly as in the
> attached reference. Do not change his proportions, do not add clothing, do not buckle
> the left strap.

---

## Lighting continuity

The film is one continuous sunset. State the stage explicitly in every prompt:

| Shots | Stage | Phrase to include |
|---|---|---|
| 01–07 | golden dusk | `warm low golden-hour light from the left, long soft shadows` |
| 08–14 | blue hour | `cool blue-grey twilight, fireflies are the only warm light source` |
| 15–20 | night | `deep indigo night, lit almost entirely by firefly glow and moonlight` |

**The fireflies must always be the most saturated thing in frame.** Add to every shot
that contains one: `the firefly glow is the brightest and most saturated element in the
image, warm amber, gently blooming.`

---

## The shots

### 01 — EWS, the Hollow at dusk
```
{WORLD} Extreme wide establishing shot of the whole valley at dusk, seen from a low hill.
Dozens of tiny warm paper lanterns glowing among the toadstool houses. A few tiny amber
fireflies drifting in the middle distance. No characters visible.
Warm low golden-hour light from the left, long soft shadows.
{STYLE}  |  {NEG}
```

### 02 — WS, Momo on the doorstep
```
{MOMO}
Momo sits on the round stone doorstep of a toadstool house, knees pulled up, paws resting
on his knees, head tilted back looking up at the sky. Calm and sleepy.
Wide shot, low camera at his eye level, 35mm, Momo in the left third, the round doorway
behind him, valley softly out of focus beyond.
Warm low golden-hour light from the left, long soft shadows.
{STYLE}  |  {LOCK}  |  {NEG}
```

### 03 — MCU, Momo looks up
```
{MOMO}
Momo looking upward, ears relaxed and slightly back, eyes wide and soft, a small sleepy
smile, mouth closed.
Medium close-up, camera slightly below his eye line, 85mm macro, very shallow depth of
field, background dissolved into warm bokeh.
Warm low golden-hour light from the left.
{STYLE}  |  {LOCK}  |  {NEG}
```

### 04 — CU, five fireflies
```
Five small round felted fireflies drifting in the air at dusk, each with a soft glowing
amber abdomen, tiny transparent wings, spaced clearly apart across the frame so all five
are individually countable, arranged in a loose arc from left to right.
Close-up, 85mm macro, extremely shallow depth of field, the background a wash of soft
sage green and dusty rose bokeh. No characters.
Warm dusk fading to blue-grey. The firefly glow is the brightest and most saturated
element in the image, warm amber, gently blooming.
{STYLE}  |  {NEG}
```
> **Countability is the whole job of this shot.** If the five overlap, re-roll. A toddler
> will point at each one.

### 05 — MS, firefly settles into a daisy
```
A single glowing felted firefly descending gently toward an oversized open daisy whose
white petals are wool felt and whose centre holds a shallow pool of dew. Soft grass
blades framing the bottom of the frame.
Medium shot, 50mm, subject centred, shallow depth of field.
Warm dusk light. The firefly glow is the brightest and most saturated element.
{STYLE}  |  {NEG}
```

### 06 — CU, the daisy closes
```
Extreme close-up of the felted daisy with its petals curled softly inward, a warm amber
glow shining through the wool from inside, illuminating the fibres from within. A single
drop of dew on an outer petal catching the light.
Macro lens, very shallow depth of field.
Warm dusk. Glow through fabric, soft subsurface scattering.
{STYLE}  |  {NEG}
```

### 07 — WS, chorus, four lights
```
{MOMO}
Momo standing small at the bottom of the frame in a field of oversized clover, looking up.
Four glowing fireflies spread across the upper two-thirds of the sky, clearly countable.
Wide shot, low camera, 35mm, lots of sky.
Dusk turning to blue-grey. The four glows are the brightest elements.
{STYLE}  |  {LOCK}  |  {NEG}
```

### 08 — MS, the Trickle
```
{WORLD} A slow silver stream flowing from left to right through soft mossy banks, a single
round lily pad drifting on it. Warm lanterns reflected as wobbling light on the water.
Medium shot, 50mm, camera low and close to the water surface.
Cool blue-grey twilight, fireflies are the only warm light source.
{STYLE}  |  {NEG}
```

### 09 — CU, firefly on the lily pad
```
A glowing felted firefly curled asleep on a round lily pad drifting on dark silver water.
Its warm amber glow reflected perfectly in the water beneath, doubling the light.
Close-up, 85mm macro, very shallow depth of field, water surface bokeh.
Cool blue-grey twilight. The firefly and its reflection are the only warm light.
{STYLE}  |  {NEG}
```

### 10 — WS, Momo walks the bank
```
{MOMO}
Momo walking slowly left to right along the mossy stream bank, paws down, head slightly
lowered, sleepy. Three glowing fireflies drifting above and ahead of him.
Wide tracking shot, side-on profile, 35mm, Momo small in the lower left third.
Cool blue-grey twilight, fireflies the only warm light source.
{STYLE}  |  {LOCK}  |  {NEG}
```

### 11 — MS, three fireflies at the trunk
```
Three glowing felted fireflies wobbling in a loose orbit around the mossy trunk of a
large round tree, clearly countable and separated. Oversized soft felt leaves above.
Medium shot, 50mm, the trunk filling the right half of frame.
Cool blue-grey twilight.
{STYLE}  |  {NEG}
```

### 12 — CU, firefly under the leaf
```
Extreme close-up of a large soft felted leaf with a warm amber glow shining through it
from underneath, the leaf's wool fibres and vein texture backlit and translucent. The
firefly is hidden — only the glow is visible.
Macro lens, very shallow depth of field.
Cool blue-grey twilight. Glow through fabric, strong subsurface scattering.
{STYLE}  |  {NEG}
```

### 13 — MS, two fireflies yawning
```
Two glowing felted fireflies hovering side by side in mid-air, each with a tiny open
mouth mid-yawn and sleepy half-closed eyes. Endearing and comic, not creepy. Clearly two,
clearly separated.
Medium shot, 85mm, centred, soft dark bokeh behind.
Deep blue twilight. The two glows are the only warm light.
{STYLE}  |  {NEG}
```

### 14 — CU, firefly lands on Momo's ear
```
{MOMO}
Extreme close-up of the top of Momo's head and one oversized rounded ear, seen from the
side. A single glowing felted firefly has landed on the tip of his ear and is curled
asleep. Momo's eye is visible at the bottom edge of frame, half-closed and content.
Macro lens, very shallow depth of field, the ear's wool fibres backlit by the glow.
Deep blue twilight lit by the firefly.
{STYLE}  |  {LOCK}  |  {NEG}
```

### 15 — MCU, Momo nearly asleep
```
{MOMO}
Momo three-quarter view, eyes half-closed and heavy, ears drooping softly, a peaceful
almost-asleep expression. One glowing firefly still resting on his ear casting warm light
across the side of his face.
Medium close-up, 85mm, camera at his eye level, very shallow depth of field.
Deep indigo night, lit almost entirely by the firefly glow.
{STYLE}  |  {LOCK}  |  {NEG}
```
> The emotional peak of the film. Re-roll this one until the eyes are right.

### 16 — MS, the last firefly rises
```
A single glowing felted firefly rising alone through the dark, small in a large empty
indigo sky, a faint trail of soft light behind it. Nothing else in frame.
Medium shot looking upward, 50mm, the firefly in the lower third with vast empty space
above it.
Deep indigo night, the firefly the only light source.
{STYLE}  |  {NEG}
```

### 17 — WS, Nana Moon revealed
```
{MOON}
Wide shot craning upward to reveal Nana Moon huge in the upper right of the frame, her
gentle sleeping face turned slightly down toward a single tiny glowing firefly hovering
small in the lower left. Enormous scale difference between them.
35mm, deep indigo sky, a few soft felted stars.
Moonlight cool and pale, firefly warm and small.
{STYLE}  |  {NEG}
```

### 18 — CU, Nana Moon's face
```
{MOON}
Close-up of Nana Moon's face, closed curved eyes, soft rosy cheeks, a faint contented
smile, mouth slightly open as if humming. Warm halo blooming around the crescent's edge.
Close-up, 85mm, centred, extremely soft.
Pale gold self-illumination against deep indigo.
{STYLE}  |  {NEG}
```

### 19 — WS, Momo and Bibi asleep
```
{MOMO}
Momo curled asleep on the round stone doorstep, paws tucked under his chin, ears folded
down. Beside him, also asleep and leaning against him: Bibi, a small round tortoise-like
creature, dusty sky-blue skin, a soft domed shell patterned with white rain-cloud shapes,
round red wire glasses pushed up on her forehead, a mustard-yellow knitted scarf.
Wide shot, low camera, 35mm, both small and centred, the warm round doorway glowing
faintly behind them.
Deep indigo night, one warm lantern above them.
{STYLE}  |  {LOCK}  |  {NEG}
```
> Bibi's glasses are **pushed up on her forehead** here — she took them off to sleep.
> Small continuity details like this are what make a world feel authored.

### 20 — EWS, the Hollow asleep
```
{WORLD} Extreme wide shot of the whole valley at night, almost entirely dark and still,
the hills soft silhouettes against a deep indigo sky. One single paper lantern still
faintly warm in the middle distance. No characters. Utterly peaceful and empty.
35mm, the same camera position as shot 01.
Deep indigo night, moonlight only.
{STYLE}  |  {NEG}
```
> **Same camera position as shot 01.** Bookending the film in one frame is worth the
> extra care — feed shot 01 back in as a reference and ask for night.

---

## Motion prompts for the video step

Kling 3.0 Turbo. Keep motion prompts short — long ones cause warping.

| Shot | Motion prompt |
|---|---|
| 01 | `very slow push in, lanterns flicker gently` |
| 02 | `slow drift upward, gentle breathing` |
| 03 | `soft breathing, one slow blink` |
| 04 | `fireflies drift slowly, glow pulses gently` |
| 05 | `firefly descends slowly into the flower` |
| 06 | `petals close slowly, glow pulses` |
| 07 | `slow sway, fireflies drift` |
| 08 | `lily pad drifts slowly right, water ripples` |
| 09 | `gentle float, reflection ripples` |
| 10 | `slow walk left to right` |
| 11 | `fireflies orbit slowly` |
| 12 | `glow pulses gently through the leaf` |
| 13 | `both fireflies yawn slowly, bob in the air` |
| 14 | `ear twitches once then stills` |
| 15 | `very slow push in, eyes close slowly` |
| 16 | `firefly rises slowly upward` |
| 17 | `slow crane upward` |
| 18 | `almost still, faint glow pulse` |
| 19 | `slow pull out, gentle breathing` |
| 20 | `hold still, lantern flickers once` |

**Shot 15 needs two keyframes** — generate an eyes-half-open start frame and an
eyes-closed end frame and use first/last-frame conditioning. Eyes closing is the one
motion the models reliably get wrong from a single still.
