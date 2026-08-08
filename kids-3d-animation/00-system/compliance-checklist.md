# Compliance Checklist — read before your first upload

Three videos a day is a volume strategy, and volume is precisely the pattern YouTube's
kids-quality enforcement is built to catch. This page is the difference between a channel
that compounds and one that gets removed from the Partner Program in month four.

---

## The rule that matters most

Channels with **a strong focus on low-quality made-for-kids content may be suspended
from the Partner Program entirely** — not just demonetized video by video. Individual
videos that breach the quality principles get limited or zero ad revenue.

The flip side is the opportunity: high-quality made-for-kids content is **actively raised
up in recommendations**. YouTube is grading on a curve in a category full of slop. A
genuinely well-made 3D preschool video is competing against a lot of asset-flip garbage.

**What this means for a 3-a-day schedule:** every video must be defensible on its own.
The moment you're shipping filler to hit the number, stop and ship two. The system in
this repo is designed so that quality is the *cheap* part (reused world, reused cast,
reused prompts) and only the writing is new each day.

---

## Explicitly avoid

These are the documented low-quality signals:

- **Repetitive content** — same video with a colour swapped, same rhyme with a new
  number, endlessly. Our idea bank rotates *form*, not just *topic*, to avoid this.
- **Sensationalized or misleading titles and thumbnails.** No fake peril, no shocked
  faces over a video with no shock, no clickbait framing of a calm story.
- **Encouraging negative behaviours** — tantrums rewarded, dangerous imitable stunts,
  characters being cruel without consequence.
- **Adult themes shoehorned into kid-facing packaging** — the "familiar characters in
  inappropriate situations" pattern. Not a risk here, but never let a Short's gag drift.
- **Mass-produced feel** — no discernible authorship, no narrative, keyword-stuffed
  titles.

Also avoid, on the generation side:

- Prompting any AI tool with the name of an existing children's character, show, or song.
- Any output that resembles a recognizable existing IP. Puddleberry Hollow exists so you
  never need to go near this line.

---

## Per-upload checklist

**Settings**

- [ ] **"Made for Kids"** set correctly at the video level. If it's for kids, mark it.
      Mislabeling is a legal issue (COPPA), not a policy nicety.
- [ ] Comments will auto-disable on made-for-kids videos — expected, don't fight it.
- [ ] Personalized ads, Super Chat, memberships, end screens and cards are all
      unavailable on made-for-kids. Plan your CTAs accordingly: your only real call to
      action is the **next video in the same style**, so nail your thumbnails.
- [ ] Playlist assignment set (playlists still work and drive session time).

**Content**

- [ ] No scary imagery, no jump scares, no menacing faces, no darkness without a lantern.
- [ ] No imitable danger: no climbing high, no water alone, no fire, no small objects
      in mouths, no cooking with heat.
- [ ] Conflict resolves. Nobody ends the video sad, excluded, or punished.
- [ ] No character is cruel without it being addressed within the video.
- [ ] Flashing: nothing strobing faster than ~3 Hz (photosensitivity).
- [ ] Audio: no sudden loud spikes; peak-to-average kept tight for sleeping toddlers.
- [ ] Speech is intelligible and correctly ducked under music.
- [ ] Nothing in frame reads as an ad or a purchase prompt.

**Metadata**

- [ ] Title describes what's actually in the video. No unfulfilled promise.
- [ ] Thumbnail shows a moment that genuinely occurs in the video.
- [ ] Description is written for a parent, not stuffed for a crawler.
- [ ] No "for kids" keyword spam chains in the title.
- [ ] Age-appropriate age range stated in the description so parents can self-select.

**Provenance**

- [ ] AI disclosure set where required by YouTube's altered-content rules for your region.
- [ ] Suno generation IDs and Nano Banana prompts archived in the episode folder.
- [ ] Your Suno / image / video tool plans all permit commercial use at your tier.

---

## Music and rights

- Keep every generation receipt. The episode folders in this repo have a place for it.
- Never use an existing melody, even "traditional" — public-domain melodies still get
  Content ID matched against someone else's recorded arrangement.
- Original melodies from Suno sidestep this entirely, which is a real reason to prefer
  generated songs over covers of nursery rhymes even though covers search better.

---

## Sanity checks worth running monthly

1. **Watch three of your own videos end to end as a parent would.** Not scrubbed. If you
   get bored, a parent turned it off at 40 seconds.
2. **Check average view duration on the story slot.** For a sub-5-minute kids video,
   50–70% average percentage viewed is healthy. Under 35% means your opening 15 seconds
   are failing, not your ending.
3. **Look at your last 20 thumbnails as a grid.** If they blur together, your click-through
   is being eaten by your own back catalogue.

---

## Sources

- [YouTube — Best practices for kids & family content](https://support.google.com/youtube/answer/10774223?hl=en)
- [YouTube channel monetization policies](https://support.google.com/youtube/answer/1311392?hl=en)
- [Made-for-kids monetization rules explained](https://subscribr.ai/p/youtube-made-for-kids-monetization-rules)
- [YouTube audience retention benchmarks 2026](https://socialrails.com/blog/youtube-audience-retention-complete-guide)
