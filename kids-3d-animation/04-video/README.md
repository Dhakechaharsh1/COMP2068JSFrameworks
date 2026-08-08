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

**Prerequisite for the singing:** `espeak-ng` must be on `PATH`
(`apt-get install espeak-ng`, `brew install espeak-ng`). Without it the lullaby still
renders — just instrumental — and `make-audio.js` says so rather than failing.

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

`tools/singer.js` turns words into sung notes. There is no neural model and no
singing-synthesis engine — the method is old and simple:

1. **espeak-ng speaks the word on a monotone.** This is the part that matters. espeak's
   normal intonation falls about 240 cents across a word, so a two-syllable word sung as
   one note sags badly on its second syllable. `tools/espeak/flatsing` is an `f5` variant
   with `pitch 190 190` — equal base and range, i.e. no contour — which cuts that spread
   to about 10 cents. The variant ships in this repo and `singer.js` installs it into
   espeak's data directory on first run, so the result is reproducible rather than
   depending on a hand-edited system file.
2. **Measure the word's F0** by normalised autocorrelation, with two corrections that
   turn out to be essential: a parabolic fit of the correlation peak (integer lags
   quantise to ~30 cents up at 350 Hz) and a shortest-qualifying-peak rule (a periodic
   signal correlates just as well at 2T and 3T, so the raw argmax reports sub-octaves —
   392 Hz came back as 98).
3. **Resample so that F0 lands on the melody note.** Formants come along for the ride,
   which is why espeak is driven at ~356 Hz: near the middle of this melody, so the shift
   stays small and the voice reads as a child rather than a chipmunk.
4. **Splice extra pitch-periods into the middle of the word** until it fills the note.
   That sustains the vowel while leaving the opening and closing consonants intact, which
   is what keeps the words intelligible.

Whole words, not syllables — espeak pronounces "fireflies" correctly and "fi", "re",
"flies" incorrectly. A two-syllable word simply gets two beats.

Measured over all 88 sung notes in the finished mix, the mean pitch error is **24 cents**.

It is robotic, and it is meant to be: it is a temp vocal so the tune and the words are
audible before you commit to a real Suno take.

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
