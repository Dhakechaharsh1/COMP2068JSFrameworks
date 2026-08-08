# Suno — "Five Sleepy Fireflies"

Two boxes to fill. Copy each block exactly.

---

## Style box

```
children's lullaby, gentle nursery rhyme, sleepy and warm, soft female vocal,
close-mic breathy, tender, simple singalong melody, ukulele, glockenspiel, soft
marimba, warm upright bass, brushed percussion, music box, cosy analogue warmth,
76 BPM
-autotune -distortion -heavy drums -adult contemporary -belting -electric guitar
```

## Title box

```
Five Sleepy Fireflies
```

## Lyrics box

```
[Intro - spoken, very soft, almost whispered]
Hush, hush, Puddleberry.
The lanterns are low.

[Verse 1 - quiet]
Five sleepy fireflies,
Blinking in the blue.
One found a daisy cup
And curled up in the dew.

[Chorus]
Blink, blink, little light,
Blink, blink, goodnight.
Blink, blink, little light,
Sleep till morning bright.

[Verse 2]
Four sleepy fireflies,
Drifting past the stream.
One rode a lily pad
And floated into dream.

[Chorus]
Blink, blink, little light,
Blink, blink, goodnight.
Blink, blink, little light,
Sleep till morning bright.

[Verse 3]
Three sleepy fireflies,
Wobbling round the tree.
One hid beneath a leaf,
As quiet as can be.

[Verse 4]
Two sleepy fireflies,
Yawning in the air.
One landed on Momo's ear
And fell asleep right there.

[Chorus - quieter]
Blink, blink, little light,
Blink, blink, goodnight.
Blink, blink, little light,
Sleep till morning bright.

[Verse 5 - very soft]
One sleepy firefly,
The very last to glow.
She looked up at the moon
And whispered, soft and low...

[Bridge - humming only, warm and low]
Mmm... mmm... goodnight, goodnight.
Mmm... mmm... sleep tight, sleep tight.

[Outro - spoken over the humming, fading]
No more fireflies.
The hollow's gone to sleep.
Close your eyes now, little one,
And count them in your dreams.

Five... four... three... two... one.

[fade out]
```

---

## Generation notes

- **Run 4 takes.** Pick on hook memorability — can you hum the chorus an hour later?
- **The intro must not be sung.** If Suno sings the `[Intro]` lines, regenerate rather
  than accept it; a spoken open is what signals "this is a bedtime video" in the first
  three seconds.
- **Check the descent.** The correct take gets quieter and slower toward the end on its
  own. If your take *builds* into the outro, it's the wrong take — that's an
  energy shape for a pop song, not a lullaby.
- **If it extends past 2:35**, that's fine — trim in the edit and cross-fade the tail.
  Don't fight the model on length.
- **If you Extend at all, re-paste the entire style box.** Suno does not remember it, and
  a drifted extend on a lullaby is instantly audible.

## Mix targets

| | |
|---|---|
| Integrated loudness | −16 LUFS (quieter than the −14 house standard — it's a lullaby) |
| True peak | −1.5 dBTP |
| Dynamic range | leave it. No limiting past −16. |
| HF | roll off above 12 kHz; sibilance is what wakes a sleeping child |

## Receipt

```
Suno track ID:
Generation date:
Take used:            /4
Plan / commercial rights confirmed:  [ ]
```
