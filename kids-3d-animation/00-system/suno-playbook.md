# Suno Playbook

Everything you need to get usable kids' audio out of Suno on the first or second
generation instead of the twelfth.

---

## The prompt formula

Suno reads style tags as **weighted inputs**, not a checklist. Five parts, 8–15 tags
total. Fewer than 4 gives generic mush; more than ~15 and the tags start fighting.

```
1. genre + subgenre     children's nursery rhyme, kindergarten singalong
2. mood + energy         gentle, sleepy, warm, low energy
3. vocal character       soft female vocal, close-mic, breathy, no vibrato
4. instruments + prod    ukulele, glockenspiel, brushed snare, warm analogue, lo-fi
5. tempo                 78 BPM
```

**Negative tags work.** Prefix with a minus. For kids audio these three are almost
always worth including:

```
-autotune  -distortion  -heavy drums
```

Add `-adult vocals`, `-rap`, `-electric guitar` if the model keeps drifting off-brief.

---

## Per-slot style presets

Copy these into the Style box. They're tuned for the three formats.

### A — Poem / lullaby / counting rhyme

```
children's nursery rhyme, gentle lullaby, warm and sleepy, soft female vocal,
close-mic breathy, simple singalong melody, ukulele, glockenspiel, soft marimba,
warm upright bass, brushed percussion, cosy analogue warmth, 76 BPM
-autotune -distortion -heavy drums -adult contemporary
```

### A-alt — upbeat learning rhyme (counting, colours, ABC)

```
children's singalong, playful kindergarten pop, bright and bouncy, cheerful mixed
children's chorus, call-and-response, marimba, hand claps, tuba bass, kazoo, bright
acoustic, 108 BPM
-autotune -distortion -moody -minor key
```

### B — Storytelling underscore (instrumental)

```
cinematic children's storybook score, orchestral miniature, wondrous and warm,
INSTRUMENTAL, celesta, pizzicato strings, solo clarinet, harp, soft timpani, light
choir pad, dynamic build, 82 BPM
-vocals -lyrics -drums -electronic
```

Generate the score **instrumental** and record/AI-voice the narration separately, then
mix. Suno singing your story text is the single most amateurish thing you can do in this
slot — narration needs to breathe against music, not be locked to a melody.

### C — Short (hook loop)

```
kids comedy cartoon funk, punchy and silly, bouncy, chunky electric bass, clavinet
stabs, tight funk drums, slide whistle, boing SFX percussion, tuba honks, big stop-hits,
124 BPM
-vocals -ambient -sad -slow
```

Shorts want a **loop**. Generate 40–50 seconds, find the 8-bar section that loops
cleanest, and cut the video to that.

---

## Lyric formatting

Suno respects bracketed structure tags. Use them — they're how you control where the
energy goes.

```
[Intro]
[Verse 1]
[Pre-Chorus]
[Chorus]
[Verse 2]
[Bridge]
[Outro]
```

Performance tags inside the lyric body also work and are underused:

```
[soft whisper]      [spoken]        [giggle]
[building]          [quiet]         [big finish]
[instrumental break]                [fade out]
```

**Kids-lyric craft rules:**

1. **One idea per line.** A 3-year-old parses one clause at a time.
2. **Repeat the hook 4+ times.** Repetition is not lazy in preschool music, it's the
   product. It's why kids replay — and replays are your retention.
3. **Under 8 syllables per line.** Count them. Long lines get rushed and become mush.
4. **Rhyme on concrete nouns**, never abstractions. `moon / spoon`, not `care / aware`.
5. **Actions kids can copy.** Clap, stomp, tiptoe, blink. Physical participation is what
   makes a rhyme sticky.
6. **Countdowns and question-answer** structures are the two highest-performing forms in
   the whole category. Use them constantly.

---

## The extension trap

Suno treats every **Extend** as a fresh instruction and does **not** remember your
original style prompt. If you extend without re-pasting your full style tag string, the
track drifts — usually louder, faster and with different instrumentation.

**Always re-paste the complete style string on every extend.** Keep it in your clipboard
manager for the session.

---

## Common failures and the fix

| Problem | Fix |
|---|---|
| Vocal sounds adult / breathy-sultry | Add `children's chorus`, `youthful`, `innocent`; add `-adult vocals -sultry -r&b` |
| Too busy, drums swamp the vocal | Cut to 6 tags. Add `sparse arrangement`, `-heavy drums -layered production` |
| Melody won't stick | Your lyric lines are too long. Cut to 6 syllables and repeat the hook more. |
| Tempo creeps up over the track | Put the BPM in the style box, not the lyrics, and re-paste on extend |
| Weird artefacts on held notes | Add `-autotune -vocoder`; regenerate rather than trying to fix in the mix |
| Ends abruptly | Add `[Outro]` and `[fade out]` as the last two tags in the lyric body |

---

## Workflow

1. Generate **4 takes** of the same prompt. Cost is trivial, and take 3 is often the one.
2. Pick on **hook memorability only** — mix quality is fixable, a boring hook isn't.
3. Download WAV, not MP3. You're re-encoding at upload; don't stack lossy passes.
4. **Loudness:** master the final video mix to about **-14 LUFS integrated**, true peak
   -1 dBTP. YouTube normalizes to roughly that, and kids content mastered louder just
   gets turned down and sounds squashed.
5. **Ducking:** in Slot B, duck the score by 8–10 dB under narration. Kids' comprehension
   collapses when music competes with speech far faster than adults'.

---

## Rights note

Check Suno's current terms for your plan before monetizing — commercial use rights are
tied to paid tiers, and this matters the moment you join the Partner Program. Keep the
generation receipts/IDs for every track you publish; if a copyright claim ever lands,
that's what resolves it. Never prompt Suno with the name of a real artist or an existing
children's song title.
