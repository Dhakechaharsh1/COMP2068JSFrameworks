/* ============================================================================
   "Five Sleepy Fireflies" — the sung line, and the single source of truth for
   both the on-screen captions and the vocal synthesis.

   Loaded two ways:
     browser  <script src="A-poem-lyrics.js">   -> window.POEM_LYRICS
     node     require('.../A-poem-lyrics.js')   -> module.exports

   One BAR per line. The piece is 60 BPM 4/4, so a bar is 4.0s and one beat is
   1.0s — that is why every line's word durations must add up to 4.

   Each line is  { bar, text, sing }  where `sing` is a compact score:

       "word:beats:note word:beats:note ..."

   `word` is fed to espeak-ng verbatim (minus punctuation), so keep it a real
   word — the singer pronounces whole words, not syllables, which is what keeps
   it intelligible. A two-syllable word simply gets two beats.
   ========================================================================== */

(function (root) {

  const LINES = [
    // --- intro -------------------------------------------------------------
    { bar:  2, text: 'Hush, hush, Puddleberry.',      sing: 'Hush:1:E4 hush:1:E4 Puddleberry:2:A4' },
    { bar:  3, text: 'The lanterns are low.',         sing: 'The:0.5:E4 lanterns:1.5:E4 are:1:C4 low:1:A4' },

    // --- verse 1: five -----------------------------------------------------
    { bar:  6, text: 'Five sleepy fireflies,',        sing: 'Five:1:G4 sleepy:1:G4 fireflies:2:A4' },
    { bar:  7, text: 'Blinking in the blue.',         sing: 'Blinking:1:G4 in:0.5:F4 the:0.5:F4 blue:2:E4' },
    { bar:  8, text: 'One found a daisy cup',         sing: 'One:1:E4 found:0.5:E4 a:0.5:E4 daisy:1:G4 cup:1:E4' },
    { bar:  9, text: 'And curled up in the dew.',     sing: 'And:0.5:D4 curled:0.5:D4 up:0.5:E4 in:0.5:E4 the:0.5:D4 dew:1.5:C4' },

    // --- chorus ------------------------------------------------------------
    { bar: 10, text: 'Blink, blink, little light,',   sing: 'Blink:1:C5 blink:1:C5 little:1:A4 light:1:A4' },
    { bar: 11, text: 'Blink, blink, goodnight.',      sing: 'Blink:1:C5 blink:1:C5 goodnight:2:G4' },
    { bar: 12, text: 'Blink, blink, little light,',   sing: 'Blink:1:C5 blink:1:C5 little:1:A4 light:1:F4' },
    { bar: 13, text: 'Sleep till morning bright.',    sing: 'Sleep:1:A4 till:0.5:G4 morning:1.5:F4 bright:1:E4' },

    // --- verse 2: four -----------------------------------------------------
    { bar: 14, text: 'Four sleepy fireflies,',        sing: 'Four:1:G4 sleepy:1:G4 fireflies:2:A4' },
    { bar: 15, text: 'Drifting past the stream.',     sing: 'Drifting:1:G4 past:0.5:F4 the:0.5:F4 stream:2:E4' },
    { bar: 16, text: 'One rode a lily pad',           sing: 'One:1:E4 rode:0.5:E4 a:0.5:E4 lily:1:G4 pad:1:E4' },
    { bar: 17, text: 'And floated into dream.',       sing: 'And:0.5:D4 floated:1:D4 into:1:E4 dream:1.5:C4' },

    { bar: 18, text: 'Blink, blink, little light,',   sing: 'Blink:1:C5 blink:1:C5 little:1:A4 light:1:A4' },
    { bar: 19, text: 'Blink, blink, goodnight.',      sing: 'Blink:1:C5 blink:1:C5 goodnight:2:G4' },
    { bar: 20, text: 'Blink, blink, little light,',   sing: 'Blink:1:C5 blink:1:C5 little:1:A4 light:1:F4' },
    { bar: 21, text: 'Sleep till morning bright.',    sing: 'Sleep:1:A4 till:0.5:G4 morning:1.5:F4 bright:1:E4' },

    // --- verse 3: three ----------------------------------------------------
    { bar: 22, text: 'Three sleepy fireflies,',       sing: 'Three:1:G4 sleepy:1:G4 fireflies:2:A4' },
    { bar: 23, text: 'Wobbling round the tree.',      sing: 'Wobbling:1:G4 round:0.5:F4 the:0.5:F4 tree:2:E4' },
    { bar: 24, text: 'One hid beneath a leaf,',       sing: 'One:1:E4 hid:0.5:E4 beneath:1:G4 a:0.5:G4 leaf:1:E4' },
    { bar: 25, text: 'As quiet as can be.',           sing: 'As:0.5:D4 quiet:1:D4 as:0.5:E4 can:0.5:D4 be:1.5:C4' },

    // --- verse 4: two ------------------------------------------------------
    { bar: 26, text: 'Two sleepy fireflies,',         sing: 'Two:1:G4 sleepy:1:G4 fireflies:2:A4' },
    { bar: 27, text: 'Yawning in the air.',           sing: 'Yawning:1:G4 in:0.5:F4 the:0.5:F4 air:2:E4' },
    { bar: 28, text: "One landed on Momo's ear",      sing: "One:0.5:E4 landed:1:E4 on:0.5:E4 Momo's:1:G4 ear:1:E4" },
    { bar: 29, text: 'And fell asleep right there.',  sing: 'And:0.5:D4 fell:0.5:D4 asleep:1:E4 right:0.5:D4 there:1.5:C4' },

    { bar: 30, text: 'Blink, blink, little light,',   sing: 'Blink:1:C5 blink:1:C5 little:1:A4 light:1:A4' },
    { bar: 31, text: 'Blink, blink, goodnight.',      sing: 'Blink:1:C5 blink:1:C5 goodnight:2:G4' },

    // --- verse 5: one ------------------------------------------------------
    { bar: 32, text: 'One sleepy firefly,',           sing: 'One:1:G4 sleepy:1:G4 firefly:2:A4' },
    { bar: 33, text: 'The very last to glow.',        sing: 'The:0.5:G4 very:1:G4 last:0.5:F4 to:0.5:F4 glow:1.5:E4' },
    { bar: 34, text: 'She looked up at the moon',     sing: 'She:0.5:E4 looked:0.5:E4 up:0.5:G4 at:0.5:G4 the:0.5:A4 moon:1.5:G4' },
    { bar: 35, text: 'And whispered, soft and low...', sing: 'And:0.5:E4 whispered:1:E4 soft:0.5:D4 and:0.5:D4 low:1.5:C4' },

    // --- outro -------------------------------------------------------------
    { bar: 36, text: 'Goodnight, goodnight.',         sing: 'Goodnight:2:E4 goodnight:2:C4' },
  ];

  const BAR = 4.0;          // seconds — 60 BPM, 4/4
  const BEAT = 1.0;

  /** parse "word:beats:note ..." into [{word, beats, note}] */
  function parseScore(s) {
    return s.trim().split(/\s+/).map(tok => {
      const i = tok.lastIndexOf(':');
      const j = tok.lastIndexOf(':', i - 1);
      return { word: tok.slice(0, j), beats: Number(tok.slice(j + 1, i)), note: tok.slice(i + 1) };
    });
  }

  /** captions, as [timeSeconds, text] — includes the blanks between verses */
  function cues() {
    const out = [];
    let prevEnd = 0;
    for (const l of LINES) {
      const t = l.bar * BAR;
      if (t > prevEnd + 0.01) out.push([prevEnd, '']);   // clear the caption
      out.push([t, l.text]);
      prevEnd = t + BAR;
    }
    out.push([prevEnd, '']);
    return out;
  }

  const API = { LINES, BAR, BEAT, parseScore, cues };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.POEM_LYRICS = API;

})(typeof globalThis !== 'undefined' ? globalThis : this);
