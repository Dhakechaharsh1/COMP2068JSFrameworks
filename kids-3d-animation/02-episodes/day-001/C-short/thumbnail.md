# Thumbnail / cover — "Zip Gets the Hiccups"

**Layout C — "pop punch".** 1080 × 1920 vertical.

---

## Use a frame from the video

Shorts pull their cover from the video itself, and a cover that doesn't appear in the
first seconds creates a jarring mismatch when the video starts. So the correct move is
**not** to make a separate thumbnail — it's to build the best possible thumbnail moment
*into* the video and select it.

**Cover frame: 0:11 — shot 07, the water spray.**

It has everything a Shorts cover needs: peak facial expression, a big readable shape (the
water arc), maximum colour contrast (orange bird, lime backdrop, clear water), and a
second character reacting. It reads instantly at 120 px.

In the upload flow: **Edit → Cover → drag to 0:11.**

---

## If you want a custom cover anyway

Some Shorts do get uploaded with a custom vertical image. Only do this if the frame grab
disappoints — and if it does, the real fix is to regenerate shot 07, not to paper over it.

```
Zip, a tiny hyperactive bird, hot-orange feathers, an oversized round head, a tail of
three long feathers that spin like a propeller, stubby wings, googly wide eyes with
pinprick pupils, a stubby lime-green beak.

Zip mid-hiccup: body violently stretched vertically and inflated, eyes bulging enormous
with tiny pinprick pupils, beak wide open, wings flung straight out to the sides. He is
firing a huge wide arc of water out of his beak in a glossy stylized spray with droplets
frozen as clean rounded shapes.

Vertical 9:16 YouTube Shorts cover composition. Zip large and off-centre to the left,
filling roughly 65 percent of the frame height, positioned in the upper-middle of the
frame. The water arc sweeps across to the right. Deliberate empty space in the top fifth
for a text overlay. Extreme contrast and clarity, readable when scaled to 120 pixels wide.

3D render in a glossy vinyl designer-toy style, chunky simplified shapes, smooth glossy
plastic surfaces, hyper-saturated candy colours, flat seamless lime green #8BE23A
backdrop, even studio lighting, everything in sharp focus, no depth of field, 24mm
wide-angle.

no text, no letters, no watermark, no logo, no depth of field, no blurry background, no
muted colours, no realistic texture, no scary expression, no human characters.
```

---

## Text overlay

| | |
|---|---|
| Text | `HIC!` |
| Placement | top fifth, centred, above Zip |
| Font | Fredoka SemiBold or Baloo 2 ExtraBold |
| Size | 180 px on a 1080-wide canvas |
| Fill | `#FFFFFF` |
| Outline | `#12233A` near-black navy, 14 px |
| Shadow | 0 8px 16px rgba(0,0,0,0.5) |
| Rotation | −6° — slight tilt reads as energy |

Render with:
```bash
node kids-3d-animation/tools/render-thumbnails.js --only C
```

**Keep the bottom 25% clear.** On a vertical Short, the title, channel name, description
snippet and the whole action rail all live in the lower portion of the screen. Anything
you put down there is covered.

---

## Vertical safe zones

```
┌──────────────┐  0%
│   TEXT OK    │
│              │  15%  ← top: notification / status bar area
├──────────────┤
│              │
│              │
│   SUBJECT    │  centre 60% — everything important lives here
│              │
│              │
├──────────────┤  75%
│  ▓▓ TITLE ▓▓ │
│  ▓▓ RAIL  ▓▓ │  ← covered by UI. Nothing here.
└──────────────┘  100%
```

---

## Checks before upload

- [ ] Cover frame set to 0:11, not the default auto-pick
- [ ] Zip's expression at maximum bulge
- [ ] The water arc reads as a clear shape at 120 px
- [ ] Backdrop colour clashes hard with Zip's orange
- [ ] Bottom 25% free of anything important
- [ ] Blur test at 120 px — still obviously funny
- [ ] Distinct from the day's Poem and Story thumbnails at a glance
