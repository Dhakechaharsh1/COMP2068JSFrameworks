/**
 * singer.js — sung words, synthesised in code.
 *
 * MBROLA backend. espeak-ng emits a phoneme script — phoneme, duration, and
 * pitch targets — which MBROLA renders from recorded diphones of a real
 * speaker. Because we author the durations and the pitch ourselves, each note
 * is synthesised AT pitch: there is no resampling, so no formant shift and no
 * chipmunk. MBROLA's internal PSOLA keeps the timbre steady across the range.
 *
 * That is the whole reason this file exists in its current form. The earlier
 * version spoke words with espeak's formant synthesiser and resampled them onto
 * the melody, which shifted the formants with the pitch and sounded mechanical.
 *
 * CHILD VOICE. MBROLA ships no child voice, so one is built from the adult
 * female us1 by shifting the formants up without moving the pitch: MBROLA is
 * asked to sing at freq/k for duration*k, then the render is resampled by k.
 * Resampling multiplies pitch, formants and rate all by k, so the pitch lands
 * back on the note, the duration comes back to length, and only the formants
 * are left shifted — which is exactly what a shorter vocal tract does.
 *
 * Softening, because a lullaby has to be gentle and a baby is the audience:
 *   - vibrato, ~5.2 Hz and ±22 cents, faded in only after the note has settled
 *   - a small upward scoop into the start of each note
 *   - a dip in the 2-4.5 kHz harshness band, rather than a blanket low-pass —
 *     chopping the top off makes it dull, not soft, and murders the consonants
 *   - breath noise shaped by the amplitude envelope
 *   - a quiet, slightly late, slightly detuned second voice for warmth
 *   - slow attack and release, so nothing clicks
 *
 * It is still a TEMP VOCAL — good enough to hear the tune and the words, not a
 * substitute for a real take.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SR_OUT = 44100;

const NOTE_HZ = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880.00,
};

/* ---------- environment probing ---------- */

function hasEspeak() {
  try { execFileSync('espeak-ng', ['--version'], { stdio: 'ignore' }); return true; }
  catch { return false; }
}

/** the MBROLA binary plus at least one installed voice */
function findMbrola(prefer = ['us1', 'us2', 'en1']) {
  for (const bin of ['/usr/bin/mbrola', '/usr/local/bin/mbrola']) {
    if (!fs.existsSync(bin)) continue;
    for (const root of ['/usr/share/mbrola', '/usr/local/share/mbrola']) {
      for (const v of prefer) {
        const db = path.join(root, v, v);
        if (fs.existsSync(db)) return { bin, voice: v, db };
      }
    }
  }
  return null;
}

/* ---------- wav ---------- */

function readWav(file) {
  const b = fs.readFileSync(file);
  let pos = 12, sr = 0, off = 0, len = 0, bits = 16;
  while (pos < b.length - 8) {
    const id = b.toString('ascii', pos, pos + 4);
    const sz = b.readUInt32LE(pos + 4);
    if (id === 'fmt ') { sr = b.readUInt32LE(pos + 12); bits = b.readUInt16LE(pos + 22); }
    if (id === 'data') { off = pos + 8; len = sz; break; }
    pos += 8 + sz + (sz % 2);
  }
  const step = Math.max(1, bits / 8);
  const n = Math.floor(len / step);
  const x = new Float32Array(n);
  for (let i = 0; i < n; i++) x[i] = b.readInt16LE(off + i * step) / 32768;
  return { x, sr };
}

/** sample-rate conversion only — this does NOT change pitch */
function toOutRate(x, srIn) {
  if (!srIn || srIn === SR_OUT) return x;
  const ratio = srIn / SR_OUT;
  const n = Math.floor((x.length - 1) / ratio);
  const y = new Float32Array(n);
  for (let m = 0; m < n; m++) {
    const p = m * ratio, i = Math.floor(p), f = p - i;
    y[m] = x[i] * (1 - f) + x[i + 1] * f;
  }
  return y;
}

/* ---------- shaping ---------- */

let _seed = 987654321;
function rnd() {
  _seed = (_seed * 1664525 + 1013904223) >>> 0;
  return _seed / 4294967296 * 2 - 1;
}

function lowpass(x, hz) {
  const a = Math.exp(-2 * Math.PI * hz / SR_OUT);
  const y = new Float32Array(x.length);
  let s = 0;
  for (let i = 0; i < x.length; i++) { s = x[i] * (1 - a) + s * a; y[i] = s; }
  return y;
}

/** amplitude envelope follower — used to shape the breath layer */
function envelope(x, tau = 0.02) {
  const a = Math.exp(-1 / (tau * SR_OUT));
  const e = new Float32Array(x.length);
  let s = 0;
  for (let i = 0; i < x.length; i++) {
    const v = Math.abs(x[i]);
    s = v > s ? v : v * (1 - a) + s * a;
    e[i] = s;
  }
  return e;
}

/** resample by k: pitch, formants and rate all scale by k, duration by 1/k */
function resampleBy(x, k) {
  if (Math.abs(k - 1) < 1e-6) return x;
  const n = Math.floor((x.length - 1) / k);
  const y = new Float32Array(n);
  for (let m = 0; m < n; m++) {
    const p = m * k, i = Math.floor(p), f = p - i;
    y[m] = x[i] * (1 - f) + x[i + 1] * f;
  }
  return y;
}

function soften(x, { lp = 7000, deharsh = 0.45, breath = 0.045, atk = 0.05,
                     rel = 0.14, warmth = 0.16 } = {}) {
  // Keep the top end — sibilants and stops live at 4-8 kHz and they are what
  // make words CLEAR. Soften by removing the 2-4.5 kHz harshness band instead.
  let y = lowpass(x, lp);
  if (deharsh > 0) {
    const a = lowpass(y, 4500), b = lowpass(y, 2000);
    for (let i = 0; i < y.length; i++) y[i] -= deharsh * (a[i] - b[i]);
  }

  // breath: noise riding the amplitude envelope, so it only appears in the tone
  if (breath > 0) {
    const env = envelope(y);
    let hp = 0, prev = 0;
    const a = Math.exp(-2 * Math.PI * 1400 / SR_OUT);
    for (let i = 0; i < y.length; i++) {
      const nz = rnd();
      hp = a * (hp + nz - prev); prev = nz;
      y[i] += hp * env[i] * breath;
    }
  }

  // warmth: a quiet, slightly late, slightly detuned copy of the voice
  if (warmth > 0) {
    const delay = Math.floor(0.014 * SR_OUT);
    const detune = 1.004;
    const z = new Float32Array(y.length);
    for (let i = 0; i < y.length; i++) {
      const p = i * detune, j = Math.floor(p), f = p - j;
      if (j + 1 < y.length) z[i] = y[j] * (1 - f) + y[j + 1] * f;
    }
    for (let i = delay; i < y.length; i++) y[i] += z[i - delay] * warmth;
  }

  // slow, click-free ends
  const aN = Math.max(1, Math.floor(atk * SR_OUT));
  const rN = Math.max(1, Math.floor(rel * SR_OUT));
  for (let i = 0; i < y.length; i++) {
    let g = 1;
    if (i < aN) g *= Math.sin((i / aN) * Math.PI / 2) ** 2;
    const k = y.length - 1 - i;
    if (k < rN) g *= Math.sin((k / rN) * Math.PI / 2) ** 2;
    y[i] *= g;
  }
  return y;
}

/* ---------- phonemes -> a sung note ---------- */

/** espeak's phoneme script for one word: [{ph, ms, voiced}] */
function phonemeScript(word, mbVoice) {
  const clean = word.replace(/[^A-Za-z0-9']/g, '');
  const out = execFileSync('espeak-ng',
    ['-v', `mb-${mbVoice}`, '-q', '--pho', '-s', '150', clean],
    { encoding: 'utf8' });
  const rows = [];
  for (const line of out.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    const parts = t.split(/\s+/);
    const ph = parts[0];
    const ms = Number(parts[1]);
    if (!ph || !Number.isFinite(ms)) continue;
    if (ph === '_') continue;                     // drop espeak's own silences
    rows.push({ ph, ms, voiced: parts.length > 2 });
  }
  return rows;
}

/**
 * A .pho script for one sung note: our durations, our pitch.
 *
 * Extra time is given to the voiced phonemes only — the vowels carry the
 * sustain while the consonants keep their natural length, which is what keeps
 * a stretched word intelligible instead of smeared.
 */
function buildPho(rows, freq, durSec, opt = {}) {
  const { vibRate = 5.2, vibCents = 22, vibDelay = 0.28, scoopCents = 45, fill = 0.94 } = opt;
  const targetMs = durSec * 1000 * fill;
  const natural = rows.reduce((a, r) => a + r.ms, 0) || 1;

  const vTotal = rows.reduce((a, r) => a + (r.voiced ? r.ms : 0), 0);
  const dur = rows.map(r => r.ms);

  if (targetMs > natural && vTotal > 0) {
    const extra = targetMs - natural;
    rows.forEach((r, i) => { if (r.voiced) dur[i] += extra * (r.ms / vTotal); });
  } else {
    const k = targetMs / natural;
    rows.forEach((r, i) => { dur[i] = Math.max(25, r.ms * k); });
  }

  const lines = [];
  let tMs = 0;
  for (let i = 0; i < rows.length; i++) {
    const d = Math.max(10, Math.round(dur[i]));
    const steps = Math.max(2, Math.min(24, Math.round(d / 20)));   // a point every ~20ms
    const pts = [];
    for (let s = 0; s <= steps; s++) {
      const pct = Math.round((s / steps) * 100);
      const tSec = (tMs + d * s / steps) / 1000;
      let cents = 0;
      if (tSec < 0.07) cents -= scoopCents * (1 - tSec / 0.07);    // scoop into the note
      const vg = Math.max(0, Math.min(1, (tSec - vibDelay) / 0.35));
      cents += vibCents * vg * Math.sin(2 * Math.PI * vibRate * tSec);
      pts.push(`${pct} ${Math.round(freq * Math.pow(2, cents / 1200))}`);
    }
    lines.push(`${rows[i].ph} ${d} ${pts.join(' ')}`);
    tMs += d;
  }
  lines.push('_ 60');
  return lines.join('\n') + '\n';
}

/* ---------- the singer ---------- */

/**
 * opts.transpose     semitones applied to every note (negative = warmer/lower)
 * opts.formantShift  >1 raises the formants without moving the pitch; ~1.3
 *                    turns the adult female us1 into a child
 * opts.voice      preferred MBROLA voice order, e.g. ['us1']
 * opts.soften     overrides for the softening chain
 */
function makeSinger(opts = {}) {
  if (!hasEspeak()) return null;
  const mb = findMbrola(opts.voice);
  if (!mb) return null;

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sing-'));
  const cache = new Map();
  const scripts = new Map();
  const transpose = opts.transpose || 0;
  const fShift = opts.formantShift || 1;      // >1 = smaller/younger vocal tract

  function script(word) {
    const key = word.toLowerCase();
    if (!scripts.has(key)) scripts.set(key, phonemeScript(word, mb.voice));
    return scripts.get(key);
  }

  function render(word, freq, durSec) {
    const key = `${word.toLowerCase()}|${freq.toFixed(2)}|${durSec.toFixed(3)}`;
    if (cache.has(key)) return cache.get(key);

    const rows = script(word);
    let y = new Float32Array(0);
    if (rows.length) {
      const phoFile = path.join(dir, 'n.pho');
      const wavFile = path.join(dir, 'n.wav');
      // Sing low and long, then resample up: pitch and duration come back to
      // target, formants stay shifted -> child-sized vocal tract.
      // The .pho lives in the pre-resample time base, which is fShift times
      // slower, so vibrato rate and onset have to be pre-compensated or the
      // wobble comes out fShift times too fast.
      const pho = Object.assign({}, opts.pho);
      pho.vibRate = (pho.vibRate ?? 5.2) / fShift;
      pho.vibDelay = (pho.vibDelay ?? 0.28) * fShift;
      pho.scoopCents = pho.scoopCents ?? 45;
      fs.writeFileSync(phoFile, buildPho(rows, freq / fShift, durSec * fShift, pho));
      try {
        execFileSync(mb.bin, ['-e', mb.db, phoFile, wavFile], { stdio: 'ignore' });
        const { x, sr } = readWav(wavFile);
        y = soften(resampleBy(toOutRate(x, sr), fShift), opts.soften);
      } catch { /* leave silent; the caller reports it */ }
    }
    cache.set(key, y);
    return y;
  }

  /** mix one sung word into a stereo buffer */
  function sing(buf, text, at, dur, note, gain = 1, pan = 0) {
    let freq = typeof note === 'number' ? note : NOTE_HZ[note];
    if (!freq) throw new Error(`unknown note: ${note}`);
    freq *= Math.pow(2, transpose / 12);

    const s = render(text, freq, dur);
    const i0 = Math.floor(at * SR_OUT);
    const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
    for (let i = 0; i < s.length; i++) {
      const j = i0 + i;
      if (j >= 0 && j < buf.n) { buf.L[j] += s[i] * gain * gl; buf.R[j] += s[i] * gain * gr; }
    }
  }

  return { sing, render, script, NOTE_HZ,
           backend: `mbrola:${mb.voice}`, transpose, formantShift: fShift };
}

module.exports = { makeSinger, NOTE_HZ, hasEspeak, findMbrola };
