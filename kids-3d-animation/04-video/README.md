# Playable video — what this is, and what it isn't

`rendered/` holds actual playable video files, rendered here from code.

| File | | |
|---|---|---|
| `C-short.mp4` | 1080×1920 · 24fps · 0:35 · H.264 + AAC | *Zip Gets the Hiccups* — the full Short |
| `A-poem.mp4` | 1920×1080 · 24fps · 2:35 · H.264 + AAC | *Five Sleepy Fireflies* — the full poem, with on-screen lyrics |

**Both have sound, and the poem is sung** — the lyrics are actually sung, not just
captioned. All of it is synthesised in code; see below.

**Be clear about what these are.** They are real, finished, uploadable animation —
but they are **vector/2.5D animation written in SVG and JavaScript**, not the
Nano-Banana-plus-Veo 3D renders that `00-system/style-guide.md` specifies. I can run a
browser, a synthesiser and an encoder here; I cannot run Suno, Nano Banana, Kling or
Veo, so the 3D version has to be produced by you with those tools, using the prompt
packets in `02-episodes/`.

## So what are they good for?

More than you'd think, and it's worth being concrete:

1. **They are shippable as-is.** A clean, well-timed 2D cartoon is a legitimate kids
   video. The Short in particular does not look like a compromise — flat vinyl-toy
   styling was chosen partly *because* it survives the translation to vector.
2. **They are the animatic.** This is the standard step before you spend money on
   generative video. Every beat, every hold, every backdrop cut is already timed. When
   you generate the 3D shots, you are matching a timing that has already been proven,
   instead of discovering in the edit that the empty frame needed to be two seconds.
3. **They cost nothing to re-render.** Change a number, re-run, get a new cut in about a
   minute. Try that with a Veo bill.
4. **They pin the pacing.** The single hardest thing to get right in kids content is
   rhythm, and it is the one thing generative video gives you no control over.

## The audio

`tools/make-audio.js` is a small additive/subtractive synthesiser written from scratch —
no dependencies, no samples, about 400 lines. It writes 44.1 kHz stereo WAVs into
`audio/`, which the renderer muxes in.

```bash
npm run audio                    # both
node tools/make-audio.js C-short # one
```

**Prerequisites for the singing:** `espeak-ng` **and** `mbrola` with a voice —
`apt-get install espeak-ng mbrola mbrola-us1`. Without them the lullaby still renders,
just instrumental, and `make-audio.js` says so rather than failing.

**This is a temp track, not Suno.** It exists so the videos are not silent and so the
comedy timing can actually be *heard*. Every hit sits on the same timeline the animation
uses, which means when you drop the real Suno tracks in, the sync points are already
known.

What it actually does:

- **C-short** — a 124 BPM comedy funk bed: kick/snare/hats, a plucked bass line in E
  minor, clav stabs on the offbeats. Each hiccup is the documented three-part stack —
  intake gasp just before the beat, *boing* exactly on the downbeat, then the result
  (whoosh, splash, rocket, bonk, ping). Every hiccup lands on a downbeat. The windows at
  0:02.6–0:05 and 0:16.3–0:18.6 are **silent on purpose**; that silence under Bibi's
  deadpan and under the empty frame is doing more work than any of the boings.
- **A-poem** — a 60 BPM lullaby with a **sung vocal**. Music-box melody, soft pad,
  plucked bass, and a glockenspiel sparkle each time a firefly settles (0:41, 1:08,
  1:38, 1:54). One bar per lyric line. Chord cycle C–C–Am–Am–F–F–G–G. The music box
  drops out under the voice so the two never fight for the same melodic space. The
  whole piece descends continuously from about 1:45, so the last thirty seconds are
  measurably quieter than the first thirty.

### The singing

`tools/singer.js` synthesises the vocal. The method matters, because the first
version of this sounded like a robot and a lullaby cannot.

**espeak-ng writes a phoneme script; MBROLA sings it.** espeak emits each word as a
list of phonemes with durations and pitch targets. We rewrite those durations and
pitches ourselves and hand the script to MBROLA, which renders it from **diphones
recorded from a real speaker**. Because we author the pitch, each note is synthesised
*at* pitch — MBROLA's PSOLA holds the formants steady while the pitch moves, which was
verified directly: a sustained /I/ keeps F2 at ~1800 Hz whether it is asked for 150 Hz
or 500 Hz.

The first version instead spoke the word and *resampled* it onto the note, which drags
the formants along with the pitch. That is what "mechanical" sounds like, and filtering
does not fix it.

**A child voice, built rather than found.** MBROLA ships no child voice — the English
set is one adult female (us1) and two adult males. A child's voice is not just higher
pitch, it is higher *formants*, because the vocal tract is shorter. So one is
constructed: MBROLA is asked to sing at `freq / k` for `duration * k`, and the render is
then resampled by `k`. Resampling multiplies pitch, formants and rate all by `k`, so
pitch lands back on the note and duration comes back to length, leaving only the
formants shifted. `k = 1.25` puts us1 into a child's range without tipping into squeak.

One subtlety this introduces: the `.pho` script lives in the pre-resample time base,
which is `k` times slower, so vibrato rate and onset are pre-divided by `k` — otherwise
the wobble comes out 25% too fast.

Extra time is given only to the **voiced** phonemes, so vowels carry the sustain while
consonants keep their natural length. That is what stops a stretched word turning to
mush.

**Softening**, because the audience is a baby:

| | |
|---|---|
| vibrato | ~4.8 Hz, ±18 cents, faded in only *after* the note settles |
| scoop | a small pitch rise into the start of each note |
| harshness dip | −45% across 2–4.5 kHz |
| top end | kept to 7.5 kHz — **not** low-passed away |
| breath | noise riding the amplitude envelope, so it lives inside the tone |
| warmth | a quiet, slightly late, slightly detuned second voice |
| envelope | 60 ms attack, 170 ms release — nothing clicks |

**Soft is not the same as dull.** An earlier pass low-passed the voice at 3.2 kHz, which
measured softer but killed the consonants — sibilants and stops live at 4–8 kHz and they
are what make words *clear*. The harshness that needed removing sits at 2–4.5 kHz, so
that band is dipped and the top is left alone.

Measured on the finished MP4: high-frequency energy in the chorus is **0.046**, against
**0.086** for the original resampled vocal (and 0.035 for the over-filtered pass that
lost its consonants). All 133 sung words are audible, and pitch sits at a median
**16 cents** — much of which is the vibrato doing its job.

The vocal stays in the written octave (C4–C5) rather than being transposed down. It sits
clear above the pad and bass (C2–G3), so the words stay legible instead of muddying into
the harmony — the warmth comes from the softening chain, not from going low.

It is still a temp vocal: a synthetic voice, recognisably so. It exists so the tune, the
words and the timing are audible before you pay for a real take.

**The lyrics are the single source of truth.** `04-video/scenes/A-poem-lyrics.js` holds
the line list, the note assignment and the rhythm, and it is loaded by both the browser
scene (for the captions) and the synthesiser (for the singing), so the two cannot drift
apart. Each line is scored as `word:beats:note`, and every line must add up to 4 beats.

The WAVs are gitignored — they regenerate in about 16 seconds, and the MP4s already
carry the audio.

**Replacing it with Suno:** generate from the episode's `suno.md`, drop the file in as
`audio/<scene>.wav`, and re-render. Nothing else changes. If Suno's phrasing differs from
the written rhythm, edit `A-poem-lyrics.js` and re-render — the captions follow
automatically.

## How the picture is built

Each scene is one HTML file in `scenes/` that exposes two globals:

```js
window.DURATION      // length in seconds
window.setTime(t)    // paint the scene at time t
```

`setTime` is a **pure function of t** — no CSS animation, no `requestAnimationFrame`, no
`Math.random`. Every scatter is a deterministic hash of its index. That means the render
cannot drift, and two runs produce identical output, which is what makes it safe to
re-render after a tweak.

`tools/render-video.js` drives it: Playwright screenshots each frame as JPEG and pipes it
straight into ffmpeg. Nothing touches the disk in between.

```bash
cd kids-3d-animation
npm run video:short             # audio + full render, ~85s
npm run video:poem              # ~17min
npm run video:preview           # ~16s low-res check
node tools/render-video.js C-short --no-audio
```

**Encoder:** output is H.264/AAC `.mp4` whenever an ffmpeg with `libx264` is on the
system — the `ffmpeg-static` devDependency provides one. If only the stripped ffmpeg
bundled inside Playwright is available it falls back to VP8/WebM, because that build has
no H.264 encoder at all. The script detects this and tells you which path it took.

**A Playwright gotcha worth knowing:** a project-local and a global Playwright can both
be visible at once, each pinned to a different Chromium build. `loadPlaywright()` picks
the first one whose browser binary actually exists on disk — otherwise you get a launch
error that reads like a missing dependency but is really a version mismatch.

## What's not here

**B-story** (*The Lantern That Wouldn't Light*) has no scene file. A 5:20 cinematic story
with volumetric lighting, painterly texture and real performance is not something vector
shapes can carry, and a bad version would be worse than none. That one is genuinely a
Nano-Banana-plus-Veo job — the full 42-shot prompt packet is in
`02-episodes/day-001/B-story/`.

## Scene notes

**C-short** — 19 beats on the timeline in `B`. Hiccups use a shared four-beat
squash/stretch figure (`hicAmount`): anticipation, snap, overshoot, settle. Backdrop cuts
hard on the beat: pink → lime → tangerine → teal. The two-second empty frame at 0:16 is
deliberate; it is the best joke in the video and it is an orange rectangle.

**A-poem** — one continuous dusk-to-night scene rather than 20 hard cuts, because on a
bedtime video every cut is a small adrenaline hit. The sky, hills and stream are graded
along a single sunset curve. The firefly count falls 5 → 1 on the verse beats, and no
firefly ever goes out — they dim and are hidden, because a two-year-old reads
"extinguished" as loss. Momo's eyes close for good at 2:00 and the last lantern in the
valley fades at 2:20.
