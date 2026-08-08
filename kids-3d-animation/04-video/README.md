# Playable video — what this is, and what it isn't

`rendered/` holds actual playable video files, rendered here from code.

| File | | |
|---|---|---|
| `C-short.mp4` | 1080×1920 · 24fps · 0:35 · H.264 + AAC | *Zip Gets the Hiccups* — the full Short |
| `A-poem.mp4` | 1920×1080 · 24fps · 2:35 · H.264 + AAC | *Five Sleepy Fireflies* — the full poem, with on-screen lyrics |

**Both have sound.** It is synthesised in code by `tools/make-audio.js` — see below.

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
- **A-poem** — a 60 BPM instrumental lullaby: music-box melody over a soft pad, plucked
  bass, and a glockenspiel sparkle each time a firefly settles (0:41, 1:05, 1:29, 1:45).
  One bar per on-screen lyric line, so the music is locked to the captions. Chord cycle
  is C–C–Am–Am–F–F–G–G. The whole piece descends continuously from about 1:45 to the
  end, so the last thirty seconds are measurably quieter than the first thirty.

The WAVs are gitignored — they regenerate in about 16 seconds, and the MP4s already
carry the audio.

**Replacing it with Suno:** generate from the episode's `suno.md`, drop the file in as
`audio/<scene>.wav`, and re-render. Nothing else changes.

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
