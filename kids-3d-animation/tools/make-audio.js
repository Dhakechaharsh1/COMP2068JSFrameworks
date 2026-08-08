#!/usr/bin/env node
/**
 * make-audio.js — synthesise the scratch soundtracks, in code, with no deps.
 *
 *   node kids-3d-animation/tools/make-audio.js            # both
 *   node kids-3d-animation/tools/make-audio.js C-short
 *
 * Writes 44.1kHz 16-bit stereo WAVs into 04-video/audio/.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS IS NOT
 *
 * This is not Suno. It is a small additive/subtractive synthesiser written from
 * scratch so the videos are not silent and so the comedy timing can actually be
 * heard. Every hit is placed on the same timeline the animation uses, so when
 * you replace these with real Suno tracks the sync points are already known.
 *
 * Treat it as a temp track — which is exactly what a temp track is for.
 * ---------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');
const { makeSinger } = require('./singer');
const POEM = require('../04-video/scenes/A-poem-lyrics.js');

const SR = 44100;

/* ========================================================================== *
 *  buffer + file plumbing
 * ========================================================================== */

const makeBuf = secs => ({
  n: Math.ceil(secs * SR),
  L: new Float32Array(Math.ceil(secs * SR)),
  R: new Float32Array(Math.ceil(secs * SR)),
});

function writeWav(file, buf, peak = 0.89) {
  // normalise to a known peak rather than trusting the arithmetic
  let max = 0;
  for (let i = 0; i < buf.n; i++) {
    const a = Math.abs(buf.L[i]), b = Math.abs(buf.R[i]);
    if (a > max) max = a;
    if (b > max) max = b;
  }
  const g = max > 0 ? peak / max : 1;

  const bytes = buf.n * 4;                 // 2ch * 16bit
  const out = Buffer.alloc(44 + bytes);
  out.write('RIFF', 0);
  out.writeUInt32LE(36 + bytes, 4);
  out.write('WAVE', 8);
  out.write('fmt ', 12);
  out.writeUInt32LE(16, 16);
  out.writeUInt16LE(1, 20);                // PCM
  out.writeUInt16LE(2, 22);                // stereo
  out.writeUInt32LE(SR, 24);
  out.writeUInt32LE(SR * 4, 28);
  out.writeUInt16LE(4, 32);
  out.writeUInt16LE(16, 34);
  out.write('data', 36);
  out.writeUInt32LE(bytes, 40);

  const clip = v => Math.max(-1, Math.min(1, v));
  // a touch of soft saturation keeps transients from sounding brittle
  const sat = v => Math.tanh(v * 1.15) / Math.tanh(1.15);
  for (let i = 0; i < buf.n; i++) {
    out.writeInt16LE(Math.round(clip(sat(buf.L[i] * g)) * 32700), 44 + i * 4);
    out.writeInt16LE(Math.round(clip(sat(buf.R[i] * g)) * 32700), 44 + i * 4 + 2);
  }
  fs.writeFileSync(file, out);
  return out.length;
}

/* ========================================================================== *
 *  voices
 * ========================================================================== */

/** deterministic noise — no Math.random, so renders are reproducible */
let _seed = 12345;
function rnd() {
  _seed = (_seed * 1664525 + 1013904223) >>> 0;
  return _seed / 4294967296 * 2 - 1;
}

function add(buf, i, l, r) {
  if (i < 0 || i >= buf.n) return;
  buf.L[i] += l;
  buf.R[i] += r;
}

/** pan: -1 hard left .. +1 hard right */
const panGains = p => [Math.cos((p + 1) * Math.PI / 4), Math.sin((p + 1) * Math.PI / 4)];

const TIMBRES = {
  // music box / celesta: bright inharmonic partials, fast decay
  bell:  { parts: [[1, 1], [2.01, 0.42], [3.04, 0.16], [5.1, 0.07]], atk: 0.004, tau: 0.32 },
  // soft sustained pad
  pad:   { parts: [[1, 1], [2, 0.28], [3, 0.10]],                    atk: 0.9,   tau: 6.0, sustain: true },
  // plucked bass
  bass:  { parts: [[1, 1], [2, 0.45], [3, 0.25], [4, 0.14], [5, 0.08]], atk: 0.006, tau: 0.30 },
  // clav-ish stab
  clav:  { parts: [[1, 1], [3, 0.55], [5, 0.30], [7, 0.16]],          atk: 0.002, tau: 0.09 },
  // pure-ish hum
  hum:   { parts: [[1, 1], [2, 0.14]],                                atk: 0.25,  tau: 2.2 },
};

function note(buf, start, dur, freq, gain, timbreName, pan = 0) {
  const T = TIMBRES[timbreName];
  const [gl, gr] = panGains(pan);
  const i0 = Math.floor(start * SR);
  const n = Math.ceil(dur * SR);
  const atkN = Math.max(1, Math.floor(T.atk * SR));
  for (let k = 0; k < n; k++) {
    const t = k / SR;
    let e;
    if (T.sustain) {
      const rel = Math.min(1, (n - k) / (0.6 * SR));
      e = Math.min(1, k / atkN) * rel;
    } else {
      e = Math.min(1, k / atkN) * Math.exp(-t / T.tau);
    }
    // only bail out once the attack has passed — the envelope is legitimately
    // 0 at k=0, and breaking there silences the note entirely
    if (k > atkN && e < 0.0002) break;
    let s = 0;
    for (const [mult, amp] of T.parts) {
      // slight per-partial detune keeps it from sounding like a test tone
      s += amp * Math.sin(2 * Math.PI * freq * mult * t + mult * 0.7);
    }
    s *= e * gain / T.parts.length;
    add(buf, i0 + k, s * gl, s * gr);
  }
}

/** filtered noise burst — hats, snares, splashes */
function noise(buf, start, dur, gain, { hp = 0, lp = 20000, tau = 0.05, pan = 0 } = {}) {
  const [gl, gr] = panGains(pan);
  const i0 = Math.floor(start * SR);
  const n = Math.ceil(dur * SR);
  const aLP = Math.exp(-2 * Math.PI * lp / SR);
  const aHP = Math.exp(-2 * Math.PI * Math.max(hp, 1) / SR);
  let lpS = 0, hpS = 0, prev = 0;
  for (let k = 0; k < n; k++) {
    const t = k / SR;
    const e = Math.exp(-t / tau);
    if (e < 0.0005) break;
    let v = rnd();
    lpS = v * (1 - aLP) + lpS * aLP;          // one-pole low pass
    v = lpS;
    hpS = aHP * (hpS + v - prev); prev = v;   // one-pole high pass
    v = hp > 0 ? hpS : v;
    const s = v * e * gain;
    add(buf, i0 + k, s * gl, s * gr);
  }
}

/** pitch sweep — boings, slide whistles, rockets */
function sweep(buf, start, dur, f0, f1, gain, { tau = null, pan = 0, curve = 1, wave = 'sine' } = {}) {
  const [gl, gr] = panGains(pan);
  const i0 = Math.floor(start * SR);
  const n = Math.ceil(dur * SR);
  const T = tau === null ? dur / 2.5 : tau;
  let ph = 0;
  for (let k = 0; k < n; k++) {
    const u = k / n;
    const t = k / SR;
    const f = f0 + (f1 - f0) * Math.pow(u, curve);
    ph += 2 * Math.PI * f / SR;
    let v = Math.sin(ph);
    if (wave === 'square') v = Math.sign(v) * 0.7;
    const e = Math.min(1, k / (0.003 * SR)) * Math.exp(-t / T);
    const s = v * e * gain;
    add(buf, i0 + k, s * gl, s * gr);
  }
}

function kick(buf, t, gain = 1) {
  sweep(buf, t, 0.34, 115, 42, gain * 0.95, { tau: 0.10, curve: 0.35 });
  noise(buf, t, 0.03, gain * 0.18, { lp: 3500, tau: 0.008 });
}
function snare(buf, t, gain = 1) {
  noise(buf, t, 0.22, gain * 0.55, { hp: 900, lp: 9000, tau: 0.075 });
  sweep(buf, t, 0.10, 330, 170, gain * 0.3, { tau: 0.035 });
}
function hat(buf, t, gain = 1, open = false) {
  noise(buf, t, open ? 0.20 : 0.05, gain * 0.24,
        { hp: 7000, lp: 16000, tau: open ? 0.09 : 0.014, pan: 0.35 });
}

/** the three-part hiccup stack: intake gasp -> BOING on the beat -> result */
function hiccup(buf, t, { size = 1, result = null, pan = 0 } = {}) {
  // 1. intake — a short reversed-sounding gasp just before the beat
  noise(buf, t - 0.11, 0.11, 0.20 * size, { hp: 1800, lp: 9000, tau: 0.12, pan });
  // 2. the boing, exactly on the downbeat
  sweep(buf, t, 0.30, 300, 1500, 0.55 * size, { tau: 0.085, curve: 0.45, pan });
  sweep(buf, t, 0.22, 150, 720,  0.30 * size, { tau: 0.06,  curve: 0.45, pan });
  // 3. whatever the physics did
  if (result === 'whoosh')  noise(buf, t + 0.05, 0.5,  0.34, { hp: 500, lp: 6000, tau: 0.19, pan: 0.5 });
  if (result === 'splash')  noise(buf, t + 0.05, 0.75, 0.42, { hp: 900, lp: 12000, tau: 0.26, pan: -0.4 });
  if (result === 'rocket')  sweep(buf, t + 0.04, 1.0,  700, 3200, 0.30, { tau: 0.34, curve: 1.7 });
  if (result === 'bonk') {
    sweep(buf, t + 0.07, 0.24, 220, 120, 0.55, { tau: 0.07, wave: 'square' });
    noise(buf, t + 0.07, 0.10, 0.20, { hp: 1500, tau: 0.03 });
  }
  if (result === 'ping') {
    note(buf, t + 0.06, 0.9, 1760, 0.30, 'bell', 0.45);
    note(buf, t + 0.06, 0.9, 2640, 0.18, 'bell', 0.45);
  }
}

/** cheap stereo feedback delay — gives the lullaby some air */
function reverb(buf, { mix = 0.22, fb = 0.34, tapL = 0.181, tapR = 0.237 } = {}) {
  const dL = Math.floor(tapL * SR), dR = Math.floor(tapR * SR);
  for (let i = 0; i < buf.n; i++) {
    if (i >= dL) buf.L[i] += buf.L[i - dL] * fb * mix;
    if (i >= dR) buf.R[i] += buf.R[i - dR] * fb * mix;
  }
}

/* ========================================================================== *
 *  A — "Five Sleepy Fireflies"  (instrumental lullaby, 2:35)
 * ========================================================================== */

const N = { C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
            C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
            C5:523.25, D5:587.33, E5:659.25, G5:783.99, A5:880.00, C6:1046.50,
            C2:65.41,  E2:82.41,  F2:87.31,  G2:98.00,  A2:110.00 };

function buildPoem() {
  const DUR = 155;
  const BAR = POEM.BAR;            // 4.0s — 60 BPM, 4/4, one bar per lyric line
  const buf = makeBuf(DUR + 3);

  // C  C  Am Am F  F  G  G   (8 bars = 32s)
  const PROG = [
    { pad: [N.C3, N.E3, N.G3], bass: N.C2 },
    { pad: [N.C3, N.E3, N.G3], bass: N.C2 },
    { pad: [N.A2, N.C3, N.E3], bass: N.A2 },
    { pad: [N.A2, N.C3, N.E3], bass: N.A2 },
    { pad: [N.F2, N.A2, N.C3], bass: N.F2 },
    { pad: [N.F2, N.A2, N.C3], bass: N.F2 },
    { pad: [N.G2, N.D3, N.G3], bass: N.G2 },
    { pad: [N.G2, N.D3, N.G3], bass: N.G2 },
  ];

  // 8-bar music-box phrase — played only where the voice is NOT singing, so
  // the two never fight for the same melodic space
  const MEL = [
    [[0, N.G4], [1, N.G4], [2, N.A4], [3, N.G4]],
    [[0, N.E4], [2, N.D4]],
    [[0, N.F4], [1, N.F4], [2, N.G4], [3, N.F4]],
    [[0, N.D4], [2, N.C4]],
    [[0, N.C5], [1, N.C5], [2, N.A4], [3, N.G4]],
    [[0, N.E4], [2, N.G4]],
    [[0, N.F4], [1, N.E4], [2, N.D4], [3, N.E4]],
    [[0, N.C4]],
  ];

  const sungBars = new Set(POEM.LINES.map(l => l.bar));

  /** the piece fades up, then descends continuously to the end */
  const volAt = t => {
    const fadeIn = Math.min(1, t / 7);
    const fadeOut = t < 105 ? 1 : Math.max(0.10, 1 - (t - 105) / 58);
    return fadeIn * fadeOut;
  };

  const nBars = Math.ceil(DUR / BAR);
  for (let b = 0; b < nBars; b++) {
    const t0 = b * BAR;
    if (t0 > DUR) break;
    const ch = PROG[b % 8];
    const vol = volAt(t0);
    if (vol <= 0.001) continue;

    // pad and bass carry the harmony under everything
    ch.pad.forEach((f, i) => note(buf, t0, BAR + 0.8, f, 0.15 * vol, 'pad', (i - 1) * 0.45));
    note(buf, t0, 2.6, ch.bass, 0.26 * vol, 'bass', 0);

    if (sungBars.has(b)) {
      // under the voice: just a soft chime on beat 1, no competing tune
      note(buf, t0, 2.0, ch.pad[2] * 2, 0.09 * vol, 'bell', -0.35);
    } else {
      for (const [beat, f] of MEL[b % 8]) {
        note(buf, t0 + beat, 2.2, f, 0.30 * vol, 'bell', (beat - 1.5) * 0.16);
        note(buf, t0 + beat, 1.6, f * 2, 0.06 * vol, 'bell', -(beat - 1.5) * 0.16);
      }
    }
  }

  // ---- the vocal -----------------------------------------------------------
  const singer = makeSinger();
  if (singer) {
    for (const line of POEM.LINES) {
      const t0 = line.bar * BAR;
      const vol = volAt(t0);
      let beat = 0;
      for (const w of POEM.parseScore(line.sing)) {
        singer.sing(buf, w.word, t0 + beat * POEM.BEAT, w.beats * POEM.BEAT,
                    w.note, 0.80 * vol, 0);
        beat += w.beats;
      }
    }
  } else {
    console.warn('  (espeak-ng not found — rendering the lullaby instrumental)');
  }

  // a glockenspiel sparkle each time a firefly settles, matched to the picture
  [41, 68, 98, 114].forEach((t, i) => {
    note(buf, t, 2.4, N.C6, 0.20, 'bell', i % 2 ? 0.5 : -0.5);
    note(buf, t + 0.18, 2.0, N.G5, 0.13, 'bell', i % 2 ? -0.4 : 0.4);
  });

  // Nana Moon rises: a slow arpeggio under the last verse
  [[118, N.C4], [121, N.E4], [124, N.G4], [127, N.C5], [130, N.E5]].forEach(([t, f]) =>
    note(buf, t, 3.4, f, 0.14, 'bell', 0));

  reverb(buf, { mix: 0.26, fb: 0.36 });
  return { buf, name: 'A-poem' };
}

/* ========================================================================== *
 *  C — "Zip Gets the Hiccups"  (comedy funk, 0:35)
 * ========================================================================== */

function buildShort() {
  const DUR = 35;
  const BPM = 124;
  const BEAT = 60 / BPM;           // 0.4839s
  const buf = makeBuf(DUR + 2);

  // Comedy is contrast: these windows stay empty on purpose. The silence under
  // Bibi's deadpan stare and under the two-second empty frame is doing more
  // work than any of the boings.
  const SILENT = [[2.6, 5.0], [16.3, 18.6], [33.2, 35]];
  const quiet = t => SILENT.some(([a, b]) => t >= a && t < b);

  // E minor funk: root pattern per bar
  const BASSLINE = [
    [0, N.E2], [1.5, N.E2], [2, N.G2], [3, N.A2],
  ];

  const nBeats = Math.ceil(DUR / BEAT);
  for (let i = 0; i < nBeats; i++) {
    const t = i * BEAT;
    if (t > DUR) break;
    const beatInBar = i % 4;
    const barStart = t - beatInBar * BEAT;
    if (quiet(t)) continue;

    // the groove only really arrives once Zip is back on screen
    const vol = t < 5 ? 0.45 : t < 20 ? 0.85 : 1.0;

    // drums
    if (beatInBar === 0 || beatInBar === 2) kick(buf, t, 0.85 * vol);
    if (beatInBar === 2) kick(buf, t + BEAT * 0.5, 0.5 * vol);
    if (beatInBar === 1 || beatInBar === 3) snare(buf, t, 0.75 * vol);
    for (let h = 0; h < 2; h++) {
      const ht = t + h * BEAT * 0.5;
      if (!quiet(ht)) hat(buf, ht, (h === 0 ? 0.9 : 0.6) * vol, beatInBar === 3 && h === 1);
    }

    // bass
    for (const [b, f] of BASSLINE) {
      if (Math.abs(beatInBar - b) < 0.01) note(buf, t, BEAT * 0.9, f, 0.42 * vol, 'bass', 0);
      if (b % 1 === 0.5 && Math.abs(beatInBar + 0.5 - b) < 0.01)
        note(buf, t + BEAT * 0.5, BEAT * 0.4, f, 0.30 * vol, 'bass', 0);
    }

    // clav stabs on the offbeats of 2 and 4
    if (beatInBar === 1 || beatInBar === 3) {
      [N.E4, N.G4, N.B4].forEach((f, k) =>
        note(buf, t + BEAT * 0.5, 0.24, f, 0.16 * vol, 'clav', (k - 1) * 0.5));
    }
    void barStart;
  }

  /* ---- the beats, all on the timeline the animation uses ---- */

  hiccup(buf, 1.2,  { size: 1.15, result: 'whoosh' });          // launches off right
  noise(buf, 2.15, 0.30, 0.20, { lp: 1200, tau: 0.09, pan: 0.8 });  // distant thunk

  // 5.0 — wobbles back in, propeller sputtering
  for (let k = 0; k < 14; k++)
    sweep(buf, 5.1 + k * 0.11, 0.10, 260 + Math.sin(k) * 90, 200 + Math.cos(k) * 70, 0.10,
          { tau: 0.05, pan: 0.6 - k * 0.07 });

  // 8.0 — three big comedy gulps
  [8.3, 9.1, 9.9].forEach((t, k) => {
    sweep(buf, t, 0.20, 150 - k * 18, 90 - k * 12, 0.30, { tau: 0.07, wave: 'square', pan: -0.3 });
    noise(buf, t + 0.04, 0.10, 0.10, { lp: 900, tau: 0.04, pan: -0.3 });
  });

  hiccup(buf, 11.0, { size: 1.25, result: 'splash', pan: -0.2 });   // the spray
  // dripping, alone in the quiet after
  [13.2, 13.6, 14.0].forEach(t => note(buf, t, 0.5, 1200, 0.13, 'bell', -0.5));

  // 14.0 — two tiny pats
  [14.4, 14.8].forEach(t => noise(buf, t, 0.06, 0.14, { lp: 2200, tau: 0.02, pan: -0.3 }));

  hiccup(buf, 16.0, { size: 1.3, result: 'rocket' });               // rockets up
  // the empty frame: one faint, very high, almost-inaudible whistle
  sweep(buf, 17.1, 0.9, 3400, 3900, 0.045, { tau: 0.6 });

  // 18.5 — falling whistle, then the landing
  sweep(buf, 18.55, 0.68, 2200, 300, 0.26, { tau: 0.42, curve: 1.5 });
  kick(buf, 19.2, 1.0);
  noise(buf, 19.2, 0.35, 0.34, { lp: 5000, tau: 0.11 });

  // 20.0 — Momo tiptoes in: pizzicato, one note per step
  [20.3, 20.75, 21.2, 21.65, 22.1, 22.55].forEach((t, k) =>
    note(buf, t, 0.30, [N.E3, N.G3, N.A3, N.G3, N.B3, N.C4][k], 0.24, 'bass', 0.45));

  hiccup(buf, 23.0, { size: 1.3, result: 'bonk' });                 // the headbutt
  // impact sparkle
  [23.12, 23.2, 23.3].forEach((t, k) => note(buf, t, 0.7, [N.C6, N.G5, N.E5][k], 0.14, 'bell', 0.4));
  // 25.0 — Momo slides down, floppy
  sweep(buf, 25.1, 0.85, 520, 130, 0.24, { tau: 0.42, curve: 1.4, pan: 0.3 });

  // 26.0-29.0 — both bouncing in sync; a boing on each landing
  [26.3125, 26.9375, 27.5625, 28.1875, 28.8125].forEach((t, k) =>
    hiccup(buf, t, { size: 0.62 + k * 0.07, pan: k % 2 ? 0.35 : -0.35 }));

  // 29.0 — Bibi despairs: one long tuba slide down
  sweep(buf, 29.4, 1.5, 165, 62, 0.34, { tau: 0.85, curve: 1.2, wave: 'square', pan: -0.4 });

  hiccup(buf, 31.0, { size: 1.2, result: 'ping', pan: -0.35 });     // her glasses fly

  // 33.0 — full-band stop hit, then nothing
  kick(buf, 33.0, 1.0);
  snare(buf, 33.0, 1.0);
  [N.E3, N.B3, N.E4].forEach((f, k) => note(buf, 33.0, 0.5, f, 0.30, 'clav', (k - 1) * 0.5));
  noise(buf, 33.0, 0.5, 0.30, { hp: 400, lp: 12000, tau: 0.16 });

  reverb(buf, { mix: 0.12, fb: 0.22, tapL: 0.09, tapR: 0.13 });
  return { buf, name: 'C-short' };
}

/* ========================================================================== */

function main() {
  const want = process.argv[2];
  const outDir = path.resolve(__dirname, '..', '04-video', 'audio');
  fs.mkdirSync(outDir, { recursive: true });

  const builders = { 'A-poem': buildPoem, 'C-short': buildShort };
  const names = want ? [want] : Object.keys(builders);

  for (const name of names) {
    if (!builders[name]) {
      console.error(`Unknown scene "${name}". Known: ${Object.keys(builders).join(', ')}`);
      process.exit(1);
    }
    const started = Date.now();
    const { buf } = builders[name]();
    const file = path.join(outDir, `${name}.wav`);
    const size = writeWav(file, buf);
    console.log(`  ${name.padEnd(8)} ${(buf.n / SR).toFixed(1)}s  ${(size / 1048576).toFixed(1)} MB  ` +
                `${((Date.now() - started) / 1000).toFixed(1)}s`);
  }
  console.log(`\nWritten to 04-video/audio/`);
}

main();
