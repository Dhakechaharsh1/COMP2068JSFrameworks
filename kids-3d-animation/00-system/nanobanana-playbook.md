# Nano Banana Playbook

How to get 40+ stills that look like they came from the same film.

---

## The four-part prompt structure

Every shot prompt has these four parts, **in this order**. Order matters — the model
weights early tokens more heavily, so identity goes first and never last.

```
1. IDENTITY ANCHOR   — who, pointing at the reference image
2. SUBJECT + ACTION  — what they're doing, expression, pose
3. COMPOSITION       — shot size, camera angle, lens, staging, background
4. CONSISTENCY LOCK  — the explicit "do not change" clause
```

Full worked example:

```
[IDENTITY] Using the attached reference sheet: Momo, a small round fox-like creature,
sunshine-yellow fur, oversized rounded ears with pale cream inner fur, a single white
five-point star tuft on his chest, huge amber eyes, teal denim overalls with the LEFT
shoulder strap unbuckled.

[ACTION] Momo kneels in tall clover holding a small unlit paper lantern in both paws,
looking down at it with his ears flattened backward, mouth a small worried line.

[COMPOSITION] Medium shot, low camera at Momo's eye level, 50mm lens, subject slightly
left of centre, soft out-of-focus toadstool houses in the background, blue-grey dusk.

[STYLE] <paste STYLE BLOCK from style-guide.md>

[LOCK] Keep Momo's face, fur colour, ear shape, chest star and overalls exactly as in
the reference. Do not change his proportions, do not add clothing, do not buckle the
left strap.

[NEGATIVE] no text, no watermark, no extra limbs, no human characters, no sharp edges,
not photorealistic.
```

Yes, it's long. Long is correct — you're paying tokens to avoid re-rolls.

---

## Consistency: the actual method

Ranked by how much they matter. The first two do 80% of the work.

1. **Attach reference sheets.** Build the 12-angle turnarounds once (see
   `character-bible.md`), attach them to every generation. This is the whole ballgame.
2. **Use names, always the same names.** The model tracks named characters across a
   series. "Momo" is a stronger anchor than "the yellow fox".
3. **Repeat the lock block verbatim.** Do not paraphrase. Identical token sequences →
   identical output. Rewording is drift.
4. **3–5 distinctive traits minimum.** Momo's chest star and unbuckled strap exist
   specifically as consistency anchors — they're weird enough that the model latches on.
5. **Chain your edits.** For a two-shot sequence in the same location, don't generate
   shot 2 from scratch — feed shot 1 back in and ask for the camera change. Continuity
   comes free.
6. **Cap it at 5 characters** in one scene. Beyond that fidelity degrades fast. Our
   casting rules already keep you under this.

---

## Shot-size vocabulary

Be explicit. "Nice shot of Momo" gets you a random crop every time.

| Term to use | What you get |
|---|---|
| `extreme wide shot` | character tiny, environment is the subject |
| `wide shot` | full body, feet to head, room around them |
| `medium shot` | knees up |
| `medium close-up` | chest up — the default for dialogue |
| `close-up` | head and shoulders — save for emotional beats |
| `extreme close-up` | eyes only, or the object |
| `over-the-shoulder` | two-character conversation |
| `low angle looking up` | makes the subject powerful/big |
| `high angle looking down` | makes the subject small/vulnerable |
| `dutch angle` | wrongness — use once per story, max |

---

## Generating for the video step

You are making **keyframes**, not finished pictures. That changes what a good still is.

- **Leave headroom and lead room.** If the camera will push in, generate wider than the
  final framing so the move has somewhere to go.
- **Start frames should be low-energy.** Image-to-video models animate *away* from the
  still. Give them a pose with somewhere to go — mid-action stills produce stiff,
  looping results.
- **One clear subject per still.** Busy frames confuse the motion model and produce
  warping in the background.
- **Match the lighting across a scene** or the cut will strobe. Same time of day, same
  key direction, same colour temperature. Say it explicitly in every prompt in that
  scene.
- **Two stills per shot for hard motion.** If a shot needs a big change (Momo stands up),
  generate a start frame and an end frame and use first-frame/last-frame conditioning.
  Every major 2026 model supports it.

---

## Universal negative prompt

Keep this on the clipboard. Append the style-specific negatives from `style-guide.md`.

```
no text, no letters, no watermark, no signature, no logo, no UI elements, no extra
limbs, no deformed hands, no duplicated characters, no human characters, no realistic
human faces, no scary or menacing expressions, no weapons, no dark horror atmosphere,
no blurry low quality artefacts
```

`no scary or menacing expressions` is not optional. Models drift creepy on stylized
faces surprisingly often, and a single uncanny frame in a preschool video is the kind of
thing that generates comment-section screenshots.

---

## Quality gate — check every still before it goes to the video step

Fixing a bad still costs one re-roll. Fixing it after animating costs the whole shot.

- [ ] Chest star present and 5-pointed (Momo)
- [ ] Left overall strap unbuckled (Momo)
- [ ] Glasses round and red, scarf mustard (Bibi)
- [ ] Eye size and pupil highlights match the reference
- [ ] No text anywhere in frame, including background signage
- [ ] Paw/claw count correct
- [ ] Expression reads correctly at 200px wide (squint at it)
- [ ] Lighting direction matches the other stills in this scene
- [ ] Nothing accidentally uncanny

---

## Filing convention

```
02-episodes/day-001/B-story/stills/
  B_s01_wide_hollow-dusk_v1.png
  B_s02_mcu_momo-lantern_v2.png
```

`<slot>_s<shot##>_<size>_<slug>_v<n>.png`. When shot 14 needs a re-roll at 11pm you will
be grateful for this.
