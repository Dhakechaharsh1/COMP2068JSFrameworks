# Nano Banana prompts — "Zip Gets the Hiccups"

19 keyframes at **1080×1920 (vertical 9:16)**. Generate at the final aspect ratio — do
not crop from 16:9.

---

## Reusable blocks

**`{ZIP}`**
> Zip, a tiny hyperactive bird, hot-orange feathers, an oversized round head, a tail of
> three long feathers that spin like a propeller, stubby wings that beat too fast to see,
> googly wide eyes with pinprick pupils, a stubby lime-green beak, shown mid-air.

**`{BIBI}`** / **`{MOMO}`** — paste from
[`00-system/character-bible.md`](../../../00-system/character-bible.md).

**`{STYLE}`**
> 3D render in a glossy vinyl designer-toy style. Chunky simplified shapes with thick
> rounded forms, smooth injection-moulded plastic surfaces with a clean glossy specular
> highlight, no surface texture detail. Hyper-saturated candy colour palette. Flat
> seamless studio backdrop, soft even studio lighting with one crisp contact shadow.
> Everything in sharp focus edge to edge, no depth of field. Bold, punchy, high contrast,
> playful. Vertical 9:16 composition, subject centred and large in frame, 24mm wide-angle
> lens with slight exaggerating distortion.

**`{NEG}`**
> no text, no letters, no watermark, no logo, no depth of field, no blurry background, no
> realistic texture, no fabric, no moody lighting, no muted colours, no letterbox bars,
> no extra limbs, no scary expressions, no human characters.

---

## Backdrop schedule

The backdrop is a flat seamless colour and it **changes with each gag**. State it in every
prompt.

| Shots | Backdrop | Hex |
|---|---|---|
| 01–05 | hot pink | `#FF3D8B` |
| 06–08 | lime green | `#8BE23A` |
| 09–12 | tangerine | `#FF8A1E` |
| 13–19 | electric teal | `#12C9C0` |

Zip is hot orange, so **never put him on the tangerine backdrop alone without a rim
light.** Shots 09–12 need `a crisp white rim light along Zip's silhouette separating him
from the orange backdrop`.

---

## The hiccup pose — reuse this description

Every hiccup uses the same exaggerated shape. Paste this into shots 02, 07, 10, 14, 18:

**`{HICPOSE}`**
> mid-hiccup: the body violently stretched vertically and inflated, eyes bulging enormous
> with tiny pinprick pupils, beak wide open, wings flung straight out to the sides, every
> feather splayed. Extreme cartoon squash-and-stretch exaggeration, comically over the top.

---

## The shots

### 01 — MCU, Zip calm
```
{ZIP}
Zip hovering calmly in the centre of frame, wings a blur, googly eyes relaxed and looking
straight ahead, beak closed. Completely neutral, unaware. A tiny anticipatory compression
in his body.
Medium close-up, 24mm, Zip centred and filling about 60 percent of the frame height.
Flat seamless hot pink #FF3D8B backdrop, one crisp contact shadow.
{STYLE}  |  {NEG}
```

### 02 — MCU, THE HICCUP
```
{ZIP}
Zip {HICPOSE}, blasting backward toward the right edge of the frame with strong horizontal
motion blur streaks behind him.
Medium close-up, 24mm, Zip off-centre toward the right.
Flat seamless hot pink #FF3D8B backdrop.
{STYLE}  |  {NEG}
```

### 03 — WS, empty frame
```
An entirely empty flat seamless hot pink #FF3D8B backdrop, vertical 9:16, with a single
small crisp contact shadow on the floor where a character was standing a moment ago.
Absolutely nothing else in frame. Clean, flat, bold.
{STYLE}  |  {NEG}
```

### 04 — MS, Bibi unimpressed
```
{BIBI}
Bibi looking directly into camera with a completely flat, deeply unimpressed deadpan
expression, eyelids lowered, mouth a straight line, one eyebrow marginally higher than the
other. Utterly still.
Medium shot, 24mm, Bibi centred, filling 55 percent of frame height.
Flat seamless hot pink #FF3D8B backdrop, one crisp contact shadow.
{STYLE}  |  {NEG}
```
> Deadpan is hard for image models — they default to "cute smile." Re-roll until it is
> genuinely flat. Bibi's non-reaction is the straight man that makes Zip funny.

### 05 — MS, Zip returns dizzy
```
{ZIP}
Zip wobbling unsteadily back into frame from the right, tilted at an angle, eyes rolling
in opposite directions, small spiral swirls above his head, tail propeller sputtering with
little puff clouds.
Medium shot, 24mm, Zip right of centre and slightly tilted.
Flat seamless hot pink #FF3D8B backdrop.
{STYLE}  |  {NEG}
```

### 06 — MS, the water
```
{ZIP} and {BIBI}
Bibi holding out an oversized clear glass of water, comically too big for Zip. Zip grips
it in both stubby wings and tips it up to drink, cheeks bulging, eyes closed with effort.
Medium shot, 24mm, both characters in frame, Bibi left, Zip right.
Flat seamless lime green #8BE23A backdrop, crisp contact shadows.
{STYLE}  |  {NEG}
```

### 07 — MCU, THE SPRAY  ★ cover frame
```
{ZIP} and {BIBI}
Zip {HICPOSE}, firing a huge wide arc of water out of his beak in a glossy stylized spray,
droplets frozen in the air as clean rounded shapes. Bibi at the edge of frame taking the
full spray directly in the face, glasses knocked askew.
Medium close-up, 24mm, Zip centred and large, the water arc sweeping across the frame.
Flat seamless lime green #8BE23A backdrop.
{STYLE}  |  {NEG}
```
> **This is the Shorts cover frame.** Highest energy, clearest read, funniest single
> image. Give it four generations and pick the one that reads best at 120 px.

### 08 — MCU, soaked Bibi
```
{BIBI}
Bibi completely soaked, water dripping from her chin and scarf, red glasses knocked
crooked and streaming, blinking once with an expression of total resignation. Glossy wet
highlights on her shell.
Medium close-up, 24mm, Bibi centred.
Flat seamless lime green #8BE23A backdrop.
{STYLE}  |  {NEG}
```

### 09 — MS, the gentle pat
```
{ZIP} and {BIBI}
Bibi reaching up with one small blue paw to pat Zip very gently on the back. Zip hovering,
looking hopeful. Both calm. The gentlest possible moment.
Medium shot, 24mm, Bibi left, Zip right and slightly higher.
Flat seamless tangerine #FF8A1E backdrop, a crisp white rim light along Zip's silhouette
separating him from the orange backdrop.
{STYLE}  |  {NEG}
```

### 10 — MS, launch
```
{ZIP}
Zip {HICPOSE}, rocketing straight upward and already half out of the top of the frame,
only his lower body and tail visible, with strong vertical motion blur streaks and a small
puff of smoke at the point of launch.
Medium shot, 24mm, the action at the very top of the vertical frame.
Flat seamless tangerine #FF8A1E backdrop, crisp white rim light.
{STYLE}  |  {NEG}
```

### 11 — WS, EMPTY FRAME  ★
```
{BIBI}
A tall empty vertical frame of flat seamless tangerine #FF8A1E backdrop. Bibi stands small
at the very bottom edge, tiny in the composition, head tilted all the way back looking
straight up at an enormous expanse of nothing above her. Vast empty orange space fills the
top 85 percent of the frame.
Wide shot, 24mm, extreme negative space.
Flat seamless tangerine #FF8A1E backdrop, one crisp contact shadow.
{STYLE}  |  {NEG}
```
> The best joke in the video is an empty orange rectangle. Hold it two full seconds.

### 12 — WS, the landing
```
{ZIP}
Zip crashed upside down on the floor, head down and legs up in the air, tail propeller
still spinning uselessly, eyes as two spirals, a small dust puff around the impact point.
Wide shot, 24mm, Zip centred low in frame.
Flat seamless tangerine #FF8A1E backdrop.
{STYLE}  |  {NEG}
```

### 13 — MS, Momo tiptoes
```
{MOMO} and {ZIP}
Momo tiptoeing in from the left behind Zip, up on the tips of his paws, both paws raised
beside his head with fingers spread, mouth open wide about to shout, an enormous mischievous
grin. Zip in the foreground hovering, oblivious, facing away.
Medium shot, 24mm, Momo left and behind, Zip right and in front.
Flat seamless electric teal #12C9C0 backdrop, crisp contact shadows.
{STYLE}  |  {NEG}
```

### 14 — MCU, the headbutt
```
{ZIP} and {MOMO}
Zip {HICPOSE}, snapping violently backward so the back of his oversized round head slams
into Momo's chin. Impact starburst shape at the point of contact, small cartoon stars
radiating. Momo's eyes crossed, ears flying straight up.
Medium close-up, 24mm, the collision point centred.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

### 15 — MS, Momo down
```
{MOMO}
Momo flat on his back on the floor, limbs splayed, ears splayed flat out to the sides,
eyes as two swirling spirals, tongue slightly out. Dazed and comic, not hurt.
Medium shot, 24mm, high angle looking down at him, Momo centred.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

### 16 — WS, synchronised hiccups
```
{ZIP} and {MOMO}
Zip and Momo side by side, both mid-hiccup in perfect synchronisation — both bodies
stretched vertically, both sets of eyes bulging, both mouths open, both bounced a little
off the floor with small dust puffs beneath them. Identical poses, comically matched.
Wide shot, 24mm, both centred with space around them.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

### 17 — MCU, Bibi despairs
```
{BIBI}
Bibi dragging one small blue paw slowly down her face, pulling her features downward,
glasses pushed askew by her own paw, eyes closed. Complete exasperation.
Medium close-up, 24mm, Bibi centred.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

### 18 — MCU, Bibi hiccups
```
{BIBI}
Bibi mid-hiccup: body stretched and inflated, eyes bulging enormous, mouth wide open, and
her round red glasses launching straight up off her face with motion streaks. Extreme
cartoon squash-and-stretch. Total surprise.
Medium close-up, 24mm, Bibi centred, the glasses in the upper frame.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

### 19 — WS, the freeze
```
{ZIP}, {MOMO} and {BIBI}
All three characters frozen mid-air at the peak of a hiccup, arranged across the frame at
different heights, all three stretched and bulge-eyed, Bibi's red glasses suspended in
mid-air above her. Chaotic, joyful, perfectly composed.
Wide shot, 24mm, all three visible with clear separation between them.
Flat seamless electric teal #12C9C0 backdrop.
{STYLE}  |  {NEG}
```

---

## Motion prompts (Veo 3.1 vertical, or Hailuo 2.3)

Shorts motion is **snap, not float.** Keep prompts violent and short.

| Shot | Motion prompt |
|---|---|
| 01 | `tiny anticipation squash, hovering` |
| 02 | `explosive fast launch backward, extreme motion blur` |
| 03 | `completely still, no motion` |
| 04 | `absolutely still, one slow blink` |
| 05 | `wobbling unsteady drift, spinning eyes` |
| 06 | `gulping motion, throat bobs` |
| 07 | `fast water spray erupts outward` |
| 08 | `one slow blink, water drips` |
| 09 | `two small gentle pats` |
| 10 | `explosive fast launch straight up, vertical motion blur` |
| 11 | `completely still, she looks up slowly` |
| 12 | `hard drop, bounce once, propeller spins` |
| 13 | `slow sneaking tiptoe from the left` |
| 14 | `violent fast snap backward, hard impact` |
| 15 | `dazed, spirals rotate slowly` |
| 16 | `both bounce up and down in sync, fast and rhythmic` |
| 17 | `paw drags slowly down the face` |
| 18 | `fast hiccup snap, glasses fly upward` |
| 19 | `freeze, no motion at all` |

**Where the model won't snap hard enough** — and it often won't, since video models
smooth motion by default — generate a **start and end keyframe** for shots 02, 10, 14 and
18 and use first/last-frame conditioning. Two stills and a 12-frame interpolation beats
any motion prompt for impact comedy.
