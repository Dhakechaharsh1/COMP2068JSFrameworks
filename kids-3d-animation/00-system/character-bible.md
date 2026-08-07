# Character Bible — Puddleberry Hollow

**Rule: never paraphrase this file.** Copy the LOCK BLOCK verbatim into every Nano
Banana prompt. Rewording a character's description in your own words is the #1 cause of
character drift between shots. The model keys off exact repeated token sequences.

---

## The world

**Puddleberry Hollow** — a soft green valley where the hills are round like risen dough
and the houses are hollowed-out toadstools with round windows. A slow silver stream
called **the Trickle** runs through it. Paper lanterns hang from every branch. There are
no sharp edges anywhere in the Hollow — not on the rocks, not on the fences, not on the
leaves. Time of day is almost always golden hour or deep blue dusk.

**WORLD LOCK BLOCK** (paste when the shot needs the environment):

> Puddleberry Hollow: a rounded green valley of dough-soft hills, hollowed toadstool
> houses with circular windows and mossy roofs, a slow silver stream, warm paper
> lanterns strung between branches, oversized clover and dandelions, no sharp edges on
> any object, gentle rolling horizon.

---

## Cast

### 1. MOMO — the lead (in every video)

**LOCK BLOCK:**

> Momo, a small round fox-like creature, sunshine-yellow fur, oversized rounded ears
> with pale cream inner fur, a single white five-point star tuft on his chest, huge amber
> eyes with large highlights, a tiny dark-brown nose, teal denim overalls with the LEFT
> shoulder strap unbuckled and hanging, bare paws, roughly the proportions of a
> 4-year-old child with a head one-third of his total height.

- **Age read:** 4. **Voice:** bright, breathy, slightly lispy.
- **Wants:** to be the one who fixes it.
- **Flaw:** tries harder instead of asking. This is the engine of most Slot B stories.
- **Signature move:** ears flatten backward when he's about to cry; they spring straight
  up when he gets an idea.
- **Never:** genuinely mean, sarcastic, or scared of the dark (that's Bibi).

### 2. BIBI — the best friend (in ~80% of videos)

**LOCK BLOCK:**

> Bibi, a small round tortoise-like creature, dusty sky-blue skin, a soft domed shell
> patterned with white rain-cloud shapes, round red wire glasses slightly too big for her
> face, dark navy eyes, a small gap between her front teeth, wearing a mustard-yellow
> knitted scarf, short stubby limbs, half of Momo's height.

- **Age read:** 5. **Voice:** careful, precise, a beat slower than Momo.
- **Wants:** everything counted, sorted and safe.
- **Flaw:** says "we can't" before she's tried.
- **Signature move:** counts on her fingers out loud; pushes her glasses up with one claw.
- **Function:** she is the one Momo eventually asks for help. Keep her competence real —
  when she acts, it works.

### 3. GRANDPA GOGO — the elder (Slot B mostly)

**LOCK BLOCK:**

> Grandpa Gogo, a very large slow creature shaped like a walking hill, deep lavender
> fur, a back covered in real green moss and three tiny white mushrooms, enormous droopy
> eyelids, a long white moustache that reaches the ground, no visible feet, wearing a
> single round brass spectacle on a chain.

- **Voice:** deep, unhurried, long pauses.
- **Function:** delivers the story's turn — but **never states the moral**. He asks one
  question or says one image-based line, and Momo works it out himself. If Gogo ever
  says "and that's why you should…", rewrite it.
- **Signature move:** sits down so slowly that a whole shot can be him sitting down.

### 4. ZIP — comic relief (Slot C mostly)

**LOCK BLOCK:**

> Zip, a tiny hyperactive bird, hot-orange feathers, an oversized round head, a tail of
> three long feathers that spin like a propeller, stubby wings that beat too fast to see,
> googly wide eyes with pinprick pupils, a stubby lime-green beak, always shown mid-air.

- **Voice:** no words. Chirps, squeaks, raspberries.
- **Function:** physical comedy. Zip is the Shorts engine — he can carry a 30-second gag
  with zero dialogue, which means the Short works muted **and** travels internationally.
- **Signature move:** overshoots and slams into things off-screen.

### 5. NANA MOON — lullaby / poem closer

**LOCK BLOCK:**

> Nana Moon, a large pale-gold crescent moon with a gentle sleeping face, closed curved
> eyes, soft rosy cheeks, a faint smile, surrounded by a warm halo and small drifting
> stars, always high in a deep indigo sky.

- **Function:** appears in the final 15 seconds of every bedtime poem. Never speaks;
  she hums. This makes her the channel's "the video is ending, sleep now" signal, which
  parents learn fast and love.

---

## Casting rules per slot

| Slot | Required | Optional | Never |
|---|---|---|---|
| A — Poem | Momo | Bibi, Nana Moon | Gogo (too slow for rhyme rhythm) |
| B — Story | Momo + one other | any | more than 3 speaking characters |
| C — Short | Zip **or** Momo | one other | Nana Moon (kills the energy) |

---

## Continuity facts (keep a running list — contradicting these is what kills a world)

1. Momo's left overall strap is **always** unbuckled. Never fix it, not even at the end.
2. Bibi's glasses fog when she's nervous.
3. Lanterns in the Hollow are lit by touch, not fire — a warm hand makes them glow.
4. Nobody in the Hollow wears shoes.
5. The Trickle always flows left-to-right on screen. Reversing it disorients viewers.
6. Gogo has never been seen standing up.

---

## Reference sheets — build these once, before day 001

For each of the five characters, generate one **12-angle turnaround sheet** and one
**expression sheet**. This is a half-day of work that saves you an hour every single day
afterward, because from then on every shot prompt is "reference sheet + this pose"
instead of a fresh description gamble.

**Turnaround prompt:**

```
Character reference turnaround sheet, 12 views of the SAME character arranged in a
clean 4x3 grid on a flat neutral grey background: front, 3/4 front-left, profile left,
3/4 back-left, back, 3/4 back-right, profile right, 3/4 front-right, high angle, low
angle, full body, close-up head.

CHARACTER: <paste LOCK BLOCK verbatim>

STYLE: <paste the style block from style-guide.md>

Identical proportions, identical colours and identical costume in every view. Neutral
relaxed pose and neutral expression in all views. Even flat studio lighting, no dramatic
shadows, no background elements, no text or labels.
```

**Expression sheet prompt:** same preamble, but a 3x3 grid of head close-ups —
`neutral, delighted, curious, surprised, about-to-cry, frustrated, sleepy, giggling,
determined`.

Save these as `refs/<name>-turnaround.png` and `refs/<name>-expressions.png` and attach
them as reference images on **every** subsequent generation. With reference images
attached you can shorten the lock block to the character's name plus 3 traits; without
them, always paste the full block.
