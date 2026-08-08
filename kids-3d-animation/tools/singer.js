/**
 * singer.js — turn words into sung notes using espeak-ng as the voice source.
 *
 * There is no singing-synthesis engine here and no neural model. The trick is
 * old and simple:
 *
 *   1. espeak-ng speaks the word on a MONOTONE. This matters: espeak's normal
 *      intonation falls ~240 cents across a word, so a two-syllable word sung
 *      as one note sags badly on its second syllable. tools/espeak/flatsing is
 *      an f5 variant with `pitch 190 190` — equal base and range, i.e. no
 *      contour — which brings that spread down to about 10 cents.
 *   2. Measure its actual F0 by autocorrelation.
 *   3. Resample so that F0 lands exactly on the melody note. Resampling drags
 *      the formants along with it, which is why we drive espeak at ~350 Hz —
 *      close to the middle of this melody, so the shift stays small and the
 *      voice reads as a child rather than a chipmunk.
 *   4. The word is now the wrong *length*, so splice extra pitch-periods into
 *      the middle of it until it fills the note. That sustains the vowel while
 *      leaving the opening and closing consonants intact, which is what keeps
 *      the words intelligible.
 *
 * Whole words, not syllables: espeak pronounces "fireflies" correctly and
 * "fi", "re", "flies" incorrectly. A two-syllable word just gets two beats.
 *
 * It is robotic. It is meant to be — it is a temp vocal so the tune and the
 * words are audible before you commit to a real Suno take.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SR_OUT = 44100;

/* Empirical: the flatsing variant at -p 99 sits near 356 Hz, comfortably inside
   this melody's range so the resample never shifts formants far. f5 is the
   fallback when the variant cannot be installed — it sounds fine but its
   intonation contour makes multi-syllable words sag. */
const FLAT_VOICE = 'en-us+flatsing';
const FALLBACK_VOICE = 'en-us+f5';

/**
 * The monotone variant lives in this repo so the result is reproducible rather
 * than depending on a hand-edited system file. Copy it into espeak's data
 * directory if it is not already there.
 */
function installFlatVoice() {
  try {
    const ver = execFileSync('espeak-ng', ['--version'], { encoding: 'utf8' });
    const mDir = ver.match(/Data at:\s*(\S+)/);
    if (!mDir) return false;
    const dest = path.join(mDir[1], 'voices', '!v', 'flatsing');
    if (fs.existsSync(dest)) return true;
    const src = path.join(__dirname, 'espeak', 'flatsing');
    if (!fs.existsSync(src)) return false;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return true;
  } catch { return false; }
}

const NOTE_HZ = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880.00,
};

function hasEspeak() {
  try { execFileSync('espeak-ng', ['--version'], { stdio: 'ignore' }); return true; }
  catch { return false; }
}

/* ---------- wav in ---------- */

function readWav(file) {
  const b = fs.readFileSync(file);
  let pos = 12, sr = 0, off = 0, len = 0;
  while (pos < b.length - 8) {
    const id = b.toString('ascii', pos, pos + 4);
    const sz = b.readUInt32LE(pos + 4);
    if (id === 'fmt ') sr = b.readUInt32LE(pos + 12);
    if (id === 'data') { off = pos + 8; len = sz; break; }
    pos += 8 + sz + (sz % 2);
  }
  const n = len / 2;
  const x = new Float32Array(n);
  for (let i = 0; i < n; i++) x[i] = b.readInt16LE(off + i * 2) / 32768;
  return { x, sr };
}

/* ---------- analysis ---------- */

/** trim leading/trailing near-silence */
function trim(x, th = 0.008) {
  let a = 0, b = x.length - 1;
  while (a < x.length && Math.abs(x[a]) < th) a++;
  while (b > a && Math.abs(x[b]) < th) b--;
  return x.subarray(Math.max(0, a - 240), Math.min(x.length, b + 240));
}

/**
 * F0 of the highest-energy window, by normalised autocorrelation.
 *
 * Accurate to ~0.1 cents against synthetic tones, but only because of the two
 * corrections below — without them it reported 392 Hz as 98 Hz.
 */
function detectF0(x, sr) {
  const W = Math.min(2048, x.length - 1);
  let bi = 0, best = -1;
  for (let w = 0; w + W * 2 < x.length; w += 256) {
    let e = 0;
    for (let i = 0; i < W; i++) e += x[w + i] * x[w + i];
    if (e > best) { best = e; bi = w; }
  }
  const lo = Math.floor(sr / 600), hi = Math.floor(sr / 70);
  const corr = new Float64Array(hi + 2);
  let top = lo, bv = -1, last = lo;
  for (let lag = lo; lag < hi; lag++) {
    if (bi + W + lag >= x.length) break;
    let s = 0, n1 = 0, n2 = 0;
    for (let i = 0; i < W; i++) {
      s += x[bi + i] * x[bi + i + lag];
      n1 += x[bi + i] ** 2; n2 += x[bi + i + lag] ** 2;
    }
    corr[lag] = s / Math.sqrt(n1 * n2 + 1e-9);
    last = lag;
    if (corr[lag] > bv) { bv = corr[lag]; top = lag; }
  }

  // A periodic signal correlates just as well at 2T, 3T, ... as at T, so the
  // raw argmax lands on an arbitrary multiple and reports a sub-octave (392 Hz
  // came back as 98). Take the SHORTEST lag that is both a local peak and
  // nearly as good as the best — that is the true fundamental.
  let bl = top;
  const thresh = bv * 0.90;
  for (let lag = lo + 1; lag < last; lag++) {
    if (corr[lag] >= thresh && corr[lag] > corr[lag - 1] && corr[lag] >= corr[lag + 1]) {
      bl = lag;
      break;
    }
  }

  // Integer lags quantise badly up here: at 350 Hz one lag step is ~2.8 Hz,
  // which is nearly 30 cents. Interpolate the correlation peak parabolically.
  let lag = bl;
  const a = corr[bl - 1], b = corr[bl], c = corr[bl + 1];
  const den = a - 2 * b + c;
  if (bl > lo && bl < hi - 1 && Math.abs(den) > 1e-12) {
    const d = 0.5 * (a - c) / den;
    if (Math.abs(d) < 1) lag = bl + d;
  }
  return { f0: sr / lag, corr: bv };
}

/** index of the peak-energy point, in samples */
function peakIndex(x, win) {
  let best = -1, bi = Math.floor(x.length / 3);
  for (let w = 0; w + win < x.length; w += 64) {
    let e = 0;
    for (let i = 0; i < win; i++) e += x[w + i] * x[w + i];
    if (e > best) { best = e; bi = w; }
  }
  return bi;
}

/* ---------- resample + sustain ---------- */

/** out[m] = x[m*step], linear interpolation */
function resample(x, step) {
  const n = Math.floor((x.length - 1) / step);
  const y = new Float32Array(n);
  for (let m = 0; m < n; m++) {
    const p = m * step, i = Math.floor(p), f = p - i;
    y[m] = x[i] * (1 - f) + x[i + 1] * f;
  }
  return y;
}

/** concatenate segments with equal-power crossfades */
function spliceSegments(segs, xf) {
  let total = segs.reduce((a, s) => a + s.length, 0) - xf * (segs.length - 1);
  const out = new Float32Array(Math.max(0, total));
  let w = 0;
  for (let s = 0; s < segs.length; s++) {
    const seg = segs[s];
    const start = s === 0 ? 0 : xf;
    if (s > 0) {
      for (let i = 0; i < xf && w - xf + i < out.length; i++) {
        const u = i / xf;
        const a = Math.cos(u * Math.PI / 2), b = Math.sin(u * Math.PI / 2);
        const j = w - xf + i;
        out[j] = out[j] * a + seg[i] * b;
      }
    }
    for (let i = start; i < seg.length; i++) {
      if (w < out.length) out[w++] = seg[i];
    }
  }
  return out;
}

/**
 * Stretch a resampled word to `targetN` samples by repeating whole
 * pitch-periods from its loudest region — the vowel — leaving the consonants
 * at each end untouched.
 */
function sustainTo(y, targetN, freq, spliceAt = null) {
  if (y.length >= targetN) {
    const out = y.slice(0, targetN);
    const fade = Math.min(Math.floor(0.05 * SR_OUT), Math.floor(out.length / 4));
    for (let i = 0; i < fade; i++) out[out.length - 1 - i] *= i / fade;
    return out;
  }
  const period = SR_OUT / freq;
  const loopLen = Math.max(2, Math.round(6 * period));
  const xf = Math.max(1, Math.round(period));

  let pk = spliceAt !== null ? Math.round(spliceAt)
                             : peakIndex(y, Math.min(loopLen, y.length - 1));
  pk = Math.max(0, Math.min(pk, y.length - loopLen - 1));
  if (pk <= 0 || pk + loopLen >= y.length) {
    // too short to splice — just pad with a fade
    const out = new Float32Array(targetN);
    out.set(y.subarray(0, Math.min(y.length, targetN)));
    return out;
  }

  const head = y.subarray(0, pk + loopLen);
  const loop = y.subarray(pk, pk + loopLen);
  const tail = y.subarray(pk, y.length);

  const need = targetN - (head.length + tail.length - xf);
  const k = Math.max(0, Math.ceil(need / (loopLen - xf)));

  const segs = [head];
  for (let i = 0; i < k; i++) segs.push(loop);
  segs.push(tail);
  const out = spliceSegments(segs, xf);
  return out.length > targetN ? out.slice(0, targetN) : out;
}

/* ---------- the singer ---------- */

function makeSinger() {
  if (!hasEspeak()) return null;
  const VOICE = installFlatVoice() ? FLAT_VOICE : FALLBACK_VOICE;
  const ESPEAK_ARGS = ['-v', VOICE, '-p', '99', '-s', '80', '-a', '190', '-g', '0'];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sing-'));
  const cache = new Map();

  function word(w) {
    const key = w.toLowerCase();
    if (cache.has(key)) return cache.get(key);
    const clean = w.replace(/[^A-Za-z0-9']/g, '');
    const file = path.join(dir, `${Buffer.from(key).toString('hex')}.wav`);
    execFileSync('espeak-ng', [...ESPEAK_ARGS, '-w', file, clean], { stdio: 'ignore' });
    const { x, sr } = readWav(file);
    const t = trim(x);
    // rough pass to size the window, then find the segment we will loop and
    // measure the pitch of that segment specifically
    const { f0, corr } = detectF0(t, sr);
    const rec = { x: t, sr, f0: f0 > 0 ? f0 : 350, corr };
    cache.set(key, rec);
    return rec;
  }

  /**
   * Render one sung word into a stereo buffer.
   *   buf   {n, L, R} target
   *   at    start time, seconds
   *   dur   note length, seconds
   *   note  "G4" or a frequency in Hz
   */
  function sing(buf, text, at, dur, note, gain = 1, pan = 0) {
    const freq = typeof note === 'number' ? note : NOTE_HZ[note];
    if (!freq) throw new Error(`unknown note: ${note}`);

    const rec = word(text);
    // step such that the resampled F0 lands on `freq` (see header comment)
    const step = freq / (2 * rec.f0);
    const y = resample(rec.x, step);

    // leave a small breath at the end of the note so words do not run together
    const targetN = Math.max(1, Math.floor(dur * 0.93 * SR_OUT));
    const s = sustainTo(y, targetN, freq);

    const i0 = Math.floor(at * SR_OUT);
    const atkN = Math.floor(0.012 * SR_OUT);          // short: preserve consonant attack
    const relN = Math.floor(0.10 * SR_OUT);
    const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);

    for (let i = 0; i < s.length; i++) {
      let e = 1;
      if (i < atkN) e *= i / atkN;
      if (i > s.length - relN) e *= (s.length - i) / relN;
      // a little tremolo stops the spliced sustain sounding frozen
      e *= 1 + 0.05 * Math.sin(2 * Math.PI * 4.6 * (i / SR_OUT));
      const v = s[i] * e * gain;
      const j = i0 + i;
      if (j >= 0 && j < buf.n) { buf.L[j] += v * gl; buf.R[j] += v * gr; }
    }
  }

  return { sing, word, NOTE_HZ, voice: VOICE };
}

module.exports = { makeSinger, NOTE_HZ, hasEspeak };
