# Playable video — what this is, and what it isn't

`rendered/` holds actual playable video files, rendered here from code.

| File | | |
|---|---|---|
| `C-short.webm` | 1080×1920 · 24fps · 0:35 | *Zip Gets the Hiccups* — the full Short, animated |
| `A-poem.webm` | 1920×1080 · 24fps · 2:35 | *Five Sleepy Fireflies* — the full poem, with on-screen lyrics |

**Be clear about what these are.** They are real, finished, uploadable animation —
but they are **vector/2.5D animation written in SVG and JavaScript**, not the
Nano-Banana-plus-Veo 3D renders that `00-system/style-guide.md` specifies. I can run a
browser and an encoder here; I cannot run Suno, Nano Banana, Kling or Veo, so the
3D version has to be produced by you with those tools, using the prompt packets in
`02-episodes/`.

They are also **silent**. Suno provides the audio — see each episode's `suno.md`.

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

## How they're built

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
node tools/render-video.js C-short              # full quality
node tools/render-video.js A-poem
node tools/render-video.js C-short --scale 0.35 --fps 12   # ~15s preview
```

**Why WebM and not MP4:** the ffmpeg bundled with Playwright is a stripped build — it
encodes VP8/WebM only, and decodes MJPEG but not PNG. Hence JPEG frames in, WebM out.
YouTube accepts WebM directly. If you want MP4, re-encode with a full ffmpeg:

```bash
ffmpeg -i C-short.webm -c:v libx264 -crf 18 -pix_fmt yuv420p C-short.mp4
```

## Adding sound

The videos are cut to the timings in the episode packets, so the audio drops straight on:

- **C-short** — generate the funk loop from `02-episodes/day-001/C-short/suno.md`, then
  place the hiccup SFX stack on the beats at 0:01, 0:11, 0:16, 0:23 and 0:31. Every
  hiccup in the animation is already on those frames.
- **A-poem** — generate the lullaby from `02-episodes/day-001/A-poem/suno.md`. The
  on-screen lyric cues are timed to the written verse structure, so if Suno's phrasing
  differs, nudge the `CUES` array in `scenes/A-poem.html` and re-render.

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
