/* Scenes: fifteen animated explainers of the Exam 2 mechanisms, each with a canvas stage, drug chips,
   a step list that highlights with time, an exam-angle tip and a cite line. Every lede, step and tip
   states only what his slides and transcripts say (checked against notes/L07.md … L12.md, guide2.js,
   reference2.js, tell2.js and the F4 figure captions in diagrams.js).

   Narration: each mode has a `script`, one spoken paragraph that states only what its lede and steps
   state. With narration on (NAR.mode 'tap'), Play or a mode pick plays the recorded clip
   exam1-drill/audio/sc-<scene>-<mode>.mp3 through this page's own Audio element (not NARR_AUDIO) and
   the animation clock follows the clip; if the clip cannot be loaded, the device's voice reads the
   script and the animation runs once at normal speed. The clips do not exist yet. Expected files:
     sc-ans-{pns,sns,adrenal,saliva,somatic}.mp3
     sc-gp-{gq,gs,gi}.mp3
     sc-baro-{stand,vaso,spike,ach,atro}.mp3
     sc-gi-{rest,fight,clon,phenoxy,atro,neo}.mp3
     sc-dumb-{ag,ache,an,op}.mp3
     sc-site-{atro,scop,benz,tropic,ipra,tio,oxy,soli,tros}.mp3
     sc-no-{base,m3,nitr,sild,combo}.mp3
     sc-nmj-{normal,botox,sux,roc,rocneo,neo}.mp3
     sc-var-{nic,wd,var,both}.mp3
     sc-op-{normal,op,early,late,atro}.mp3
     sc-adr-{none,coc,amph,maoi,clon,mirt,praz,phen}.mp3
     sc-epi-{epi_high,epi_low,praz_epi,phe,praz_phe,prop_epi}.mp3
     sc-bb-{none,meto,prop,carv,pind,albu}.mp3
     sc-reg-{clon,bb,ag,phe}.mp3
     sc-raas-{none,lis,los,ali,met,spi}.mp3 */
const SC = (() => {
let ctx = null;   // the canvas being drawn; the engine sets it before each frame
// colours come from the page's variables, read once and again after a theme change
let VARS = {};
const readVars = () => { const s = getComputedStyle(document.documentElement); VARS = {}; ['bg', 'panel', 'ink', 'muted', 'line', 'chip', 'accent', 'figA', 'figB', 'figC', 'figD', 'figE'].forEach(k => { VARS[k] = s.getPropertyValue('--' + k).trim(); }); };
const hex2 = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const mix = (a, b, k) => { try { const A = hex2(a), B = hex2(b); return '#' + A.map((v, i) => Math.round(v * k + B[i] * (1 - k)).toString(16).padStart(2, '0')).join(''); } catch (e) { return b; } };
const C = k => {
  if (!VARS.ink) readVars();
  switch (k) {
    case 'ag': return VARS.figC; case 'an': return VARS.figB; case 'in': return VARS.figA; case 'no': return VARS.figE; case 'na': case 'rec': return VARS.figD;
    case 'nerve': return mix(VARS.figD, VARS.panel, .22); case 'muscle': return mix(VARS.figB, VARS.panel, .16); case 'vessel': return mix(VARS.figB, VARS.panel, .1);
    default: return VARS[k] || VARS.ink;
  }
};
const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
const seg = (t, a, b) => ease((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
const bump = (x, a, p, b) => x <= a || x >= b ? 0 : x < p ? ease((x - a) / (p - a)) : 1 - ease((x - p) / (b - p));
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function txt(s, x, y, o = {}) { ctx.font = `${o.w || 400} ${o.size || 13}px ${FONT}`; ctx.fillStyle = o.c || C('ink'); ctx.textAlign = o.a || 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = o.alpha ?? 1; ctx.fillText(s, x, y); ctx.globalAlpha = 1; }
function dot(x, y, r, fill, stroke) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); } }
function cross(x, y, s, col) { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); }
function hex(x, y, r, fill) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + Math.PI / 6; ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); } ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
function arrow(x1, y1, x2, y2, col, w = 1.6) { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 8 * Math.cos(a - .45), y2 - 8 * Math.sin(a - .45)); ctx.lineTo(x2 - 8 * Math.cos(a + .45), y2 - 8 * Math.sin(a + .45)); ctx.closePath(); ctx.fill(); }
function polyLen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function polyAt(pts, u) { const L = polyLen(pts) * clamp(u); let acc = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc + d >= L) { const k = d ? (L - acc) / d : 0; return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; } acc += d; } return pts[pts.length - 1]; }
function poly(pts, col, w = 2, dash) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.setLineDash(dash || []); ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.setLineDash([]); }
function box(x, y, w, h, label, o = {}) { rr(x, y, w, h, o.r || 9); ctx.fillStyle = o.fill || C('panel'); ctx.fill(); ctx.strokeStyle = o.stroke || C('ink'); ctx.lineWidth = o.lw || 1.3; ctx.stroke(); if (label) txt(label, x + w / 2, y + h / 2 + (o.dy || 0), {size: o.size || 12, w: 700, c: o.tc || C('ink')}); }
function glow(x, y, r, col, a) { ctx.globalAlpha = clamp(a); dot(x, y, r, col); ctx.globalAlpha = 1; }
function bg(W, H) { ctx.fillStyle = C('panel'); ctx.fillRect(0, 0, W, H); }
function pulseOn(pts, u, col) { if (u <= 0 || u >= 1) return; const [x, y] = polyAt(pts, u); glow(x, y, 11, col, .25); dot(x, y, 5, col); }
function meter(x, y, w, h, v, col, label) { rr(x, y, w, h, h / 2); ctx.fillStyle = C('chip'); ctx.fill(); rr(x, y, Math.max(h, w * clamp(v)), h, h / 2); ctx.fillStyle = col; ctx.fill(); if (label) txt(label, x - 8, y + h / 2, {a: 'right', size: 12, w: 700}); }
function vmeter(x, y, w, h, v, col, label) { rr(x, y, w, h, 8); ctx.fillStyle = C('chip'); ctx.fill(); const hh = h * clamp(v); rr(x, y + h - hh, w, Math.max(8, hh), 8); ctx.fillStyle = col; ctx.fill(); if (label) txt(label, x + w / 2, y + h + 16, {size: 12, w: 700}); }
function chip(x, y, label, state) {
  const col = state === 'on' ? C('ag') : state === 'blocked' ? C('an') : state === 'partial' ? C('na') : C('muted');
  ctx.font = `700 12px ${FONT}`; const w = ctx.measureText(label).width + 20;
  rr(x - w / 2, y - 11, w, 22, 11); ctx.fillStyle = state === 'idle' ? C('chip') : col; ctx.fill();
  txt(label, x, y, {size: 12, w: 700, c: state === 'idle' ? C('muted') : '#fff'});
  if (state === 'blocked') cross(x + w / 2 - 2, y - 11, 5, C('an'));
}
const rnd = (i, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------------- Neuromuscular junction ---------------- */
const RX = [270, 390];
const SITES = [[261, 206], [279, 206], [381, 206], [399, 206]];
const ACHE = [532, 178];
function nmjBase(o, c, opts = {}) {
  const W = 640;
  ctx.fillStyle = C('panel'); ctx.fillRect(0, 0, W, 380);
  rr(170, 14, 300, 112, 40); ctx.fillStyle = C('nerve'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.5; ctx.stroke();
  txt('Nerve terminal', 320, 34, {w: 700, size: 13});
  rr(60, 238, 520, 128, 14); ctx.fillStyle = C('muscle'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.stroke();
  const jit = opts.jitter || 0;
  for (let i = 0; i < 5; i++) {
    const y = 282 + i * 12; const x0 = 100 + c * 46 + jit * Math.sin(i * 7.3), x1 = 540 - c * 46 - jit * Math.cos(i * 5.1);
    ctx.strokeStyle = C('an'); ctx.globalAlpha = .45; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.globalAlpha = 1;
    for (let k = 0; k <= 8; k++) { const xx = lerp(x0, x1, k / 8); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xx, y - 4); ctx.lineTo(xx, y + 4); ctx.stroke(); }
  }
  txt(c > .35 ? 'Skeletal muscle: contracting' : opts.paralyzed ? 'Skeletal muscle: paralyzed' : 'Skeletal muscle: relaxed', 320, 352, {w: 700, size: 13, c: c > .35 ? C('ag') : opts.paralyzed ? C('an') : C('ink')});
  RX.forEach((rx) => {
    const g = 2 + o * 5;
    [[-1], [1]].forEach(([s]) => { rr(s < 0 ? rx - g - 12 : rx + g, 214, 12, 36, 3); ctx.fillStyle = o > .5 ? C('ag') : C('rec'); ctx.globalAlpha = o > .5 ? .85 : 1; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.2; ctx.stroke(); });
    txt('Nm', rx, 262, {size: 11, c: C('muted'), w: 700});
    if (o > .3 && !opts.blocked) {
      for (let k = 0; k < 2; k++) { const yy = 200 + ((opts.t * 70 + k * 28) % 56); txt('Na+', rx, yy, {size: 10, w: 700, c: C('na'), alpha: o}); }
    }
    if (opts.blocked) { rr(rx - 6, 222, 12, 20, 2); ctx.fillStyle = C('ink'); ctx.fill(); }
  });
  ctx.beginPath(); ctx.ellipse(ACHE[0], ACHE[1], 32, 15, 0, 0, Math.PI * 2); ctx.fillStyle = C('in'); ctx.globalAlpha = .2; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = C('in'); ctx.lineWidth = 2; ctx.stroke();
  txt('AChE', ACHE[0], ACHE[1], {w: 700, size: 12, c: C('in')});
  if (opts.acheBlocked) cross(ACHE[0], ACHE[1], 16, C('an'));
}
function vesicle(x, y, full = true, alpha = 1) {
  ctx.globalAlpha = alpha; dot(x, y, 17, C('panel'), C('ink'));
  if (full) [[-6, -4], [5, -5], [0, 6]].forEach(([dx, dy]) => dot(x + dx, y + dy, 3.5, C('ag')));
  ctx.globalAlpha = 1;
}
const ACH_START = [[306, 132], [316, 134], [326, 132], [336, 134]];
function achPath(i, t, a, b, c1, c2, toAche) {
  const [sx, sy] = ACH_START[i];
  const [tx, ty] = SITES[i];
  if (t < a) return null;
  if (t < b) { const k = seg(t, a, b); return [lerp(sx, tx, k), lerp(sy, ty, k) - Math.sin(k * Math.PI) * 10]; }
  if (t < c1) return [tx, ty];
  if (t < c2) { const k = seg(t, c1, c2); const ex = toAche ? ACHE[0] - 14 + i * 9 : tx + (i - 1.5) * 20; const ey = toAche ? ACHE[1] : 168 - (i % 2) * 14; return [lerp(tx, ex, k), lerp(ty, ey, k) - Math.sin(k * Math.PI) * 18]; }
  return toAche ? null : [tx + (i - 1.5) * 20, 168 - (i % 2) * 14];
}
const NMJ = {
  key: 'nmj', title: 'Neuromuscular junction', short: 'NMJ drugs', W: 640, H: 380,
  label: 'Animated neuromuscular junction: nerve terminal releasing ACh onto Nm receptors on skeletal muscle',
  cite: 'PCOL-NMJ_PCOL_2026s_pptx.pdf slides 13–19, 22–28, 33–39, 46–50; transcripts 10/1, 10/5; polls PE2-019, PE2-022, PE2-023',
  modes: {
    normal: {name: 'No drug', c: 'ink', L: 5,
      lede: 'ACh opens Nm channels, Na+ enters and the muscle contracts. AChE then splits ACh so the end plate can reset.',
      steps: [[0, 'A vesicle full of ACh moves to the membrane.'], [0.9, 'ACh is released and binds the Nm receptors (two ACh per channel).'], [1.8, 'Channels open: Na+ flows in, the end plate depolarizes, the muscle contracts.'], [3.0, 'ACh comes off and AChE splits it into choline and acetate.'], [3.9, 'Channels close and the muscle relaxes, ready for the next signal.']],
      tip: 'He does not ask the physiology steps. Know: agonist at Nm gives contraction, antagonist gives paralysis. The two drug targets are the receptor (direct) and AChE (indirect).',
      script: 'At rest the nerve terminal holds acetylcholine in vesicles. A vesicle moves to the membrane and releases acetylcholine, which binds the N m receptors, two molecules per channel. The channel opens, sodium flows in, the end plate depolarizes and the skeletal muscle contracts. Then acetylcholinesterase splits acetylcholine into choline and acetate, the channels close and the muscle relaxes.',
      draw(t) {
        const o = seg(t, 1.6, 1.9) * (1 - seg(t, 3.0, 3.3)); const c = seg(t, 1.9, 2.4) * (1 - seg(t, 3.4, 4.2));
        nmjBase(o, c, {t});
        vesicle(320, 70 + 38 * seg(t, 0, .8), t < .95, t < .95 ? 1 : 0);
        for (let i = 0; i < 4; i++) { const p = achPath(i, t, .9, 1.7, 3.0, 3.8, true); if (p) dot(p[0], p[1], 5, C('ag'), C('ink')); }
        if (t > 3.8 && t < 4.4) { const k = seg(t, 3.8, 4.4); for (let i = 0; i < 4; i++) { dot(ACHE[0] - 20 + i * 12, ACHE[1] + 24 + k * 14, 3, C('muted')); } txt('choline + acetate', ACHE[0], ACHE[1] + 52, {size: 11, c: C('muted'), alpha: 1 - k * .3}); }
      }},
    botox: {name: 'Botox', c: 'an', L: 4,
      lede: 'Botulinum toxin is an endopeptidase that cleaves the SNARE proteins, so the vesicle cannot release ACh.',
      steps: [[0, 'The vesicle moves toward the membrane as usual.'], [0.8, 'Botox has cleaved the SNARE proteins, so the vesicle cannot dock or fuse.'], [1.4, 'No ACh is released: the receptors stay closed and the muscle relaxes.']],
      tip: 'On his poll, Botox is the only drug that decreases ACh release. Uses on the slide: facial wrinkles and excessive drooling; on 10/5 he added excessive sweating and migraine. Uses are not tested.',
      script: 'Botulinum toxin acts before the receptor. The vesicle moves toward the membrane as usual, but Botox is an endopeptidase that has cleaved the SNARE proteins, so the vesicle cannot dock or fuse. No acetylcholine is released, the N m receptors stay closed and the skeletal muscle relaxes. It is the only drug on his poll that decreases acetylcholine release.',
      draw(t) {
        nmjBase(0, 0, {t});
        const down = seg(t, 0, .8) * (1 - seg(t, 1.3, 2.2));
        vesicle(320, 70 + 30 * down);
        [292, 348].forEach((x) => { ctx.strokeStyle = C('rec'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 126); ctx.lineTo(x, 116); ctx.stroke(); dot(x, 113, 4, C('rec')); cross(x, 118, 7, C('an')); });
        dot(250, 96, 11, C('an')); txt('Botox', 250, 76, {size: 11, w: 700, c: C('an')});
        if (t > .8) txt('SNARE cleaved: no release', 320, 154, {size: 12, w: 700, c: C('an'), alpha: seg(t, .8, 1.1)});
      }},
    sux: {name: 'Succinylcholine', c: 'ag', L: 6.5,
      lede: 'Succinylcholine is an Nm agonist (two ACh joined at the alkyl ends) that is not metabolized effectively at the synapse, so the end plate stays depolarized and cannot reset.',
      steps: [[0, 'Given IV, succinylcholine binds the Nm receptors.'], [1.2, 'Channels open all at once: unsynchronized contractions.'], [2.6, 'Phase I: the end plate stays depolarized and cannot reprime, so the muscle is paralyzed.'], [4.2, 'Phase II: the molecule lodges inside the channel pore and blocks it.']],
      tip: 'An agonist that causes paralysis. ADRs: hyperkalemia, hypertension and arrhythmias, myalgia, hyperthermia. With halothane: malignant hyperthermia, treated with dantrolene. A longer infusion or higher dose reaches Nn in the ganglia.',
      script: 'Succinylcholine is two acetylcholine molecules joined at the alkyl ends. Given I V, it binds the N m receptors and opens the channels all at once, which gives unsynchronized contractions. Phase one: it is not metabolized effectively, so the end plate stays depolarized, cannot reprime, and the muscle is paralyzed. Phase two: with a longer infusion the molecule lodges inside the channel pore and blocks it.',
      draw(t) {
        const o = seg(t, 1.0, 1.3); const jit = 10 * Math.sin(t * 45) * seg(t, 1.2, 1.4) * (1 - seg(t, 2.3, 2.7)); const c = Math.abs(jit) / 14;
        nmjBase(o, c, {t, jitter: jit, paralyzed: t > 2.7, blocked: t > 4.2});
        vesicle(320, 70);
        [[0, 1], [2, 3]].forEach(([a, b], j) => {
          const k = seg(t, .2 + j * .15, 1.1 + j * .15);
          const x1 = lerp(80, SITES[a][0], k), y1 = lerp(150, SITES[a][1], k), x2 = lerp(96, SITES[b][0], k), y2 = lerp(150, SITES[b][1], k);
          ctx.strokeStyle = C('ink'); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          dot(x1, y1, 5.5, C('ag'), C('ink')); dot(x2, y2, 5.5, C('ag'), C('ink'));
        });
        txt('IV', 70, 132, {size: 11, w: 700, c: C('muted')});
        txt('not broken down effectively', ACHE[0], ACHE[1] - 26, {size: 11, c: C('muted')});
        if (t > 2.6) txt('Phase I: stays depolarized', 320, 156, {size: 12, w: 700, c: C('an'), alpha: seg(t, 2.6, 2.9)});
        if (t > 4.2) txt('Phase II: channel blocked', 320, 174, {size: 12, w: 700, c: C('an'), alpha: seg(t, 4.2, 4.5)});
      }},
    roc: {name: 'Rocuronium (-cur-)', c: 'an', L: 5,
      lede: 'Curare-like drugs are competitive, reversible Nm antagonists. They occupy the ACh site with no efficacy, so ACh cannot open the channel.',
      steps: [[0, 'Rocuronium already occupies both ACh sites on each Nm receptor.'], [0.9, 'The nerve still releases ACh, but it cannot bind.'], [1.9, 'Unbound ACh drifts away and AChE splits it.'], [3.0, 'No channel opens: paralysis. No CNS effect, since the drug does not cross the blood–brain barrier.']],
      tip: 'Asked every year, and about 30% of the class misses it: reverse a curare-like drug with neostigmine. Succinylcholine or more rocuronium would deepen the paralysis.',
      script: 'Any drug with c u r in its name is a competitive, reversible N m antagonist. Rocuronium already occupies both acetylcholine sites on each N m receptor. The nerve still releases acetylcholine, but it cannot bind, so it drifts away and acetylcholinesterase splits it. No channel opens and the muscle is paralyzed. There is no central effect, because the drug does not cross the blood brain barrier.',
      draw(t) {
        nmjBase(0, 0, {t, paralyzed: t > 2});
        vesicle(320, 70 + 38 * seg(t, 0, .8), t < .95, t < .95 ? 1 : 0);
        SITES.forEach(([x, y]) => hex(x, y + 2, 8, C('an')));
        for (let i = 0; i < 4; i++) {
          const [sx, sy] = ACH_START[i]; let p = null;
          if (t > .9 && t < 1.7) { const k = seg(t, .9, 1.7); p = [lerp(sx, SITES[i][0], k), lerp(sy, SITES[i][1] - 22, k)]; }
          else if (t >= 1.7 && t < 2.8) { const k = seg(t, 1.9, 2.8); p = [lerp(SITES[i][0], ACHE[0] - 14 + i * 9, k), lerp(SITES[i][1] - 22, ACHE[1], k)]; }
          if (p) dot(p[0], p[1], 5, C('ag'), C('ink'));
        }
        txt('Rocuronium', 330, 190, {size: 11, w: 700, c: C('an')});
      }},
    rocneo: {name: 'Rocuronium + neostigmine', c: 'in', L: 7.5,
      lede: 'Neostigmine blocks AChE, so ACh builds up until it outcompetes rocuronium and the muscle can contract again.',
      steps: [[0, 'Rocuronium blocks the receptors; neostigmine blocks AChE.'], [0.4, 'Each nerve signal adds ACh that is no longer broken down.'], [3.6, 'Enough ACh accumulates to outcompete rocuronium at the receptors.'], [4.6, 'ACh binds, channels open, the muscle contracts again.']],
      tip: 'Neostigmine and pyridostigmine do not cross the blood–brain barrier, so there is no CNS effect. That is why they are the picks for curare reversal and myasthenia gravis.',
      script: 'To reverse a curare-like drug, block the enzyme. Rocuronium blocks the receptors and neostigmine blocks acetylcholinesterase. Each nerve signal adds acetylcholine that is no longer broken down, so it builds up in the cleft. Because rocuronium is competitive, enough acetylcholine outcompetes it at the receptors. Acetylcholine binds, the channels open and the muscle contracts again.',
      draw(t) {
        const o = seg(t, 4.7, 5.0) * (1 - seg(t, 6.6, 7.0)); const c = seg(t, 5.0, 5.4) * (1 - seg(t, 6.6, 7.2));
        nmjBase(o, c, {t, acheBlocked: true, paralyzed: t < 4.5});
        const vy = 70 + 30 * (Math.max(0, Math.sin(Math.min(t, 3.2) * Math.PI / 1.2)));
        vesicle(320, vy);
        const off = seg(t, 3.6, 4.4);
        SITES.forEach(([x, y], i) => { ctx.globalAlpha = 1 - off; hex(x + off * (i - 1.5) * 30, y + 2 - off * 60, 8, C('an')); ctx.globalAlpha = 1; });
        for (let i = 0; i < 12; i++) {
          if (t < .4 + Math.floor(i / 4) * 1.2) continue;
          const bx = 220 + ((i * 53) % 200), by = 150 + ((i * 29) % 40) + 4 * Math.sin(t * 2 + i);
          if (i < 4 && t > 4.4) { const k = seg(t, 4.4, 4.9); dot(lerp(bx, SITES[i][0], k), lerp(by, SITES[i][1], k), 5, C('ag'), C('ink')); }
          else dot(bx, by, 5, C('ag'), C('ink'));
        }
        txt('ACh building up', 140, 170, {size: 11, w: 700, c: C('ag'), alpha: seg(t, .6, 1)});
        txt('neostigmine', ACHE[0], ACHE[1] + 26, {size: 11, w: 700, c: C('in')});
      }},
    neo: {name: 'Neostigmine alone', c: 'in', L: 5.5,
      lede: 'An AChE inhibitor (indirect) makes ACh more potent wherever it is released: a longer contraction here, DUMBBELSS at the organs.',
      steps: [[0, 'Neostigmine blocks AChE.'], [0.9, 'ACh is released and binds as usual.'], [3.0, 'ACh comes off but is not broken down, so it binds again.'], [3.9, 'Contraction lasts longer. At the organs the same build-up causes DUMBBELSS.']],
      tip: 'Physostigmine crosses the blood–brain barrier (antidote for atropine overdose). Neostigmine and pyridostigmine do not (myasthenia gravis, curare reversal). Donepezil and rivastigmine reach the brain (Alzheimer disease).',
      script: 'Neostigmine alone blocks acetylcholinesterase, which makes acetylcholine more potent wherever it is released. Acetylcholine is released and binds the N m receptors as usual. When it comes off it is not broken down, so it binds again and the contraction lasts longer. At the organs the same build-up of acetylcholine causes dumbbells.',
      draw(t) {
        const o = seg(t, 1.6, 1.9) * (1 - seg(t, 4.6, 4.9)); const c = seg(t, 1.9, 2.3) * (1 - seg(t, 4.7, 5.3));
        nmjBase(o, c, {t, acheBlocked: true});
        vesicle(320, 70 + 38 * seg(t, 0, .8), t < .95, t < .95 ? 1 : 0);
        for (let i = 0; i < 4; i++) {
          let p = achPath(i, t, .9, 1.7, 3.0, 3.5, false);
          if (t > 3.6 && t < 4.6) { const k = seg(t, 3.6, 4.0); const h = [SITES[i][0] + (i - 1.5) * 20, 168 - (i % 2) * 14]; p = [lerp(h[0], SITES[i][0], k), lerp(h[1], SITES[i][1], k)]; }
          if (t >= 4.6) { const h = [SITES[i][0] + (i - 1.5) * 20, 160 - (i % 2) * 14]; const k = seg(t, 4.6, 5.0); p = [lerp(SITES[i][0], h[0], k), lerp(SITES[i][1], h[1], k)]; }
          if (p) dot(p[0], p[1], 5, C('ag'), C('ink'));
        }
        txt('neostigmine', ACHE[0], ACHE[1] + 26, {size: 11, w: 700, c: C('in')});
      }},
  },
};
Object.values(NMJ.modes).forEach((m) => { m.stepT = (t) => t; });

/* ---------------- Epinephrine reversal ---------------- */
function traceFrame(W, H) { ctx.fillStyle = C('panel'); ctx.fillRect(0, 0, W, H); }
const EPI = {
  key: 'epi', title: 'Epinephrine reversal', short: 'Epi reversal', W: 640, H: 360,
  label: 'Animated blood pressure tracing after epinephrine with and without receptor blockers',
  cite: 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 47–52; transcripts 10/7, 10/8; polls PE2-040, PE2-049, PE2-067',
  modes: {
    epi_high: {name: 'Epi, high dose', c: 'ag', A: 34, a1: 'on', b2: 'on', pre: null, drug: 'Epinephrine (high)',
      lede: 'At high doses epinephrine reaches α1 and β2 in the vessel. α1 (Gq, constriction) overrides β2, so BP rises.',
      steps: [[0, 'Baseline blood pressure.'], [.22, 'Epinephrine, high dose, given IV.'], [.32, 'α1 and β2 both activate; α1 overrides β2: vasoconstriction, BP rises.'], [.7, 'Epinephrine is cleared and BP returns to baseline.']],
      tip: 'Epinephrine affinity order: β1 and β2 first (low dose), then α1, then α2. In the vessel wall, α1 overrides β2 at a high dose.',
      script: 'Start at baseline blood pressure. A high dose of epinephrine is given I V. At a high dose epinephrine reaches both alpha 1 and beta 2 in the vessel wall. Alpha 1 is G q and constricts; it overrides the beta 2 relaxation, so the vessel constricts and blood pressure rises. Then epinephrine is cleared and the pressure returns to baseline.'},
    epi_low: {name: 'Epi, low dose', c: 'ag', A: -12, a1: 'off', b2: 'on', pre: null, drug: 'Epinephrine (low)',
      lede: 'At low doses epinephrine binds β1 and β2 first. β2 relaxes vascular smooth muscle, so BP falls a little.',
      steps: [[0, 'Baseline blood pressure.'], [.22, 'A small dose of epinephrine.'], [.32, 'Only β2 is reached in the vessel: vasodilation, BP falls a little.'], [.7, 'BP returns to baseline.']],
      tip: 'His bonus poll: in a blood vessel, receptor B (dilates at a low concentration) is β2; receptor A (constricts at a higher concentration) is α1.',
      script: 'Start at baseline blood pressure. A small dose of epinephrine is given. At a low dose epinephrine binds beta 1 and beta 2 first, so in the vessel wall only beta 2 is reached. Beta 2 is G s and relaxes vascular smooth muscle, so the vessel dilates and blood pressure falls a little. Then the pressure returns to baseline.'},
    praz_epi: {name: 'Prazosin, then epi', c: 'an', A: -22, a1: 'blocked', b2: 'on', pre: 'Prazosin', drug: 'Epinephrine (high)',
      lede: 'With α1 blocked by prazosin, epinephrine can act only on β2, so BP falls instead of rising. That change of direction is epinephrine reversal.',
      steps: [[0, 'Prazosin pretreatment blocks α1 in the vessel.'], [.22, 'The same high dose of epinephrine.'], [.32, 'Only β2 responds: vasodilation, BP falls. The response is reversed.'], [.7, 'BP returns to baseline.']],
      tip: 'Epinephrine overdose with a high heart rate and high BP: give prazosin first (vasodilation), then metoprolol. A β blocker first would slow the heart against the high afterload.',
      script: 'Prazosin is given first and blocks alpha 1 in the vessel wall. Then the same high dose of epinephrine is given. With alpha 1 blocked, epinephrine can act only on beta 2, so the vessel dilates and blood pressure falls instead of rising. That change of direction is epinephrine reversal. Then the pressure returns to baseline.'},
    phe: {name: 'Phenylephrine', c: 'ag', A: 46, a1: 'on', b2: 'off', pre: null, drug: 'Phenylephrine',
      lede: 'Phenylephrine is a selective α1 agonist. With no β2 action opposing it, the rise in BP is larger than with epinephrine.',
      steps: [[0, 'Baseline blood pressure.'], [.22, 'Phenylephrine given.'], [.32, 'α1 only: vasoconstriction, a larger rise than epinephrine.'], [.7, 'BP returns to baseline.']],
      tip: 'Careful with phenylephrine in hypertension. Its uses (decongestant, mydriasis) follow from α1 at the nose, the eye and the blood vessels.',
      script: 'Start at baseline blood pressure. Phenylephrine is given. It is a selective alpha 1 agonist, so it constricts the vessel with no beta 2 action opposing it. The rise in blood pressure is larger than the rise epinephrine gives at a high dose. Then the pressure returns to baseline.'},
    praz_phe: {name: 'Prazosin, then phenylephrine', c: 'an', A: 0, a1: 'blocked', b2: 'off', pre: 'Prazosin', drug: 'Phenylephrine',
      lede: 'Prazosin occupies α1 and phenylephrine has no other receptor to act on, so the pressor response is abolished, not reversed.',
      steps: [[0, 'Prazosin blocks α1.'], [.22, 'Phenylephrine given.'], [.32, 'No receptor available: no response.'], [.7, 'The tracing stays at baseline.']],
      tip: 'Prazosin ADRs: first-dose orthostatic hypotension and syncope, reflex tachycardia, headache (a common ADR of vasodilators).',
      script: 'Prazosin is given first and blocks alpha 1. Then phenylephrine is given. Phenylephrine acts only at alpha 1 and that receptor is occupied, so there is no receptor left for it to act on and no response at all. The tracing stays at baseline. The pressor response is abolished, not reversed, because phenylephrine has no beta 2 action to unmask.'},
    prop_epi: {name: 'Propranolol, then epi', c: 'an', A: 52, a1: 'on', b2: 'blocked', pre: 'Propranolol', drug: 'Epinephrine (high)',
      lede: 'Propranolol blocks β2, the receptor that was opposing α1. Epinephrine now constricts more.',
      steps: [[0, 'Propranolol blocks β1 and β2.'], [.22, 'Epinephrine given.'], [.32, 'α1 acts with no β2 opposition: a larger rise.'], [.7, 'BP returns to baseline.']],
      tip: 'His Jeopardy question: epinephrine after compound 1 gives a larger rise in BP. Compound 1 is propranolol.',
      script: 'Propranolol is given first and blocks beta 1 and beta 2. Then a high dose of epinephrine is given. Beta 2 was the receptor opposing alpha 1 in the vessel wall, and it is now blocked, so alpha 1 acts with no opposition and the rise in blood pressure is larger than with epinephrine alone. Then the pressure returns to baseline.'},
  },
};
EPI.drawMode = function (m, t) {
  const W = 640, H = 360; const p = clamp(t / 6);
  traceFrame(W, H);
  const x0 = 70, x1 = 610, yTop = 40, yBot = 230;
  const y = (v) => lerp(yBot, yTop, (v + 40) / 100);
  ctx.strokeStyle = C('line'); ctx.lineWidth = 1;
  [-30, 0, 30].forEach((v) => { ctx.beginPath(); ctx.moveTo(x0, y(v)); ctx.lineTo(x1, y(v)); ctx.stroke(); });
  ctx.setLineDash([4, 4]); ctx.strokeStyle = C('muted'); ctx.beginPath(); ctx.moveTo(x0, y(0)); ctx.lineTo(x1, y(0)); ctx.stroke(); ctx.setLineDash([]);
  txt('Blood pressure', 14, 30, {a: 'left', size: 12, w: 700, c: C('muted')});
  txt('baseline', x0 - 6, y(0), {a: 'right', size: 11, c: C('muted')});
  txt('higher', x0 - 6, y(30), {a: 'right', size: 11, c: C('muted')});
  txt('lower', x0 - 6, y(-30), {a: 'right', size: 11, c: C('muted')});
  const resp = (u) => bump(u, .24, .45, .82);
  const val = (u, A) => A * resp(u) + 3 * Math.sin(u * Math.PI * 2 * 26);
  if (m !== EPI.modes.epi_high) {
    ctx.setLineDash([3, 4]); ctx.strokeStyle = C('muted'); ctx.globalAlpha = .7; ctx.lineWidth = 1.4; ctx.beginPath();
    for (let i = 0; i <= 300; i++) { const u = i / 300; const yy = y(34 * resp(u)); i ? ctx.lineTo(lerp(x0, x1, u), yy) : ctx.moveTo(lerp(x0, x1, u), yy); }
    ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('epi alone (high dose)', lerp(x0, x1, .45), y(34) - 12, {size: 11, c: C('muted')});
  }
  if (m.pre) { arrow(lerp(x0, x1, .05), 250, lerp(x0, x1, .05), y(0) + 22, C('an')); txt(m.pre, lerp(x0, x1, .05), 262, {size: 12, w: 700, c: C('an'), a: 'left'}); }
  if (p > .2) { arrow(lerp(x0, x1, .22), 250, lerp(x0, x1, .22), y(0) + 22, C('ag')); txt(m.drug, lerp(x0, x1, .22) + 6, 262, {size: 12, w: 700, c: C('ag'), a: 'left'}); }
  ctx.strokeStyle = C('ink'); ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.beginPath();
  const N = Math.floor(400 * p);
  for (let i = 0; i <= N; i++) { const u = i / 400; const yy = y(val(u, m.A)); i ? ctx.lineTo(lerp(x0, x1, u), yy) : ctx.moveTo(lerp(x0, x1, u), yy); }
  ctx.stroke();
  const ue = N / 400; dot(lerp(x0, x1, ue), y(val(ue, m.A)), 4.5, C('ink'));
  rr(70, 282, 540, 70, 12); ctx.fillStyle = C('vessel'); ctx.fill(); ctx.strokeStyle = C('line'); ctx.lineWidth = 1; ctx.stroke();
  txt('In the vessel wall:', 86, 300, {a: 'left', size: 12, w: 700});
  const act = p > .3 && p < .8;
  [['α1 (Gq) → constrict', m.a1, 162], ['β2 (Gs) → relax', m.b2, 402]].forEach(([lab, st, x]) => {
    const on = st === 'on' && act;
    dot(x - 62, 330, 9, st === 'blocked' ? C('an') : on ? C('ag') : C('chip'), C('ink'));
    if (st === 'blocked') cross(x - 62, 330, 6, '#fff');
    txt(lab + (st === 'blocked' ? ' (blocked)' : on ? ' (active)' : ''), x - 46, 330, {a: 'left', size: 12, c: on ? C('ag') : st === 'blocked' ? C('an') : C('muted'), w: on || st === 'blocked' ? 700 : 400});
  });
};
Object.values(EPI.modes).forEach((m) => { m.L = 7.5; m.draw = (t) => EPI.drawMode(m, t); m.stepT = (t) => clamp(t / 6); });

/* ---------------- Baroreflex ---------------- */
const BARO = {
  key: 'baro', title: 'Blood pressure and the baroreflex', short: 'Baroreflex', W: 640, H: 390,
  label: 'Animated baroreflex: blood pressure, baroreceptor firing, autonomic balance and heart rate over time',
  cite: 'Autonomic Nervous System.pdf slides 48–53; PCOL-Adrenergic slides 30, 77–83; transcripts 10/1, 10/6, 10/7; polls PE2-013, PE2-028',
  modes: {
    stand: {name: 'Standing up', c: 'ink', bp: (u) => -18 * bump(u, .25, .38, .72), hr: (u) => 14 * bump(u, .28, .44, .8),
      lede: 'Standing pools blood in the legs. Venous return and stroke volume fall, BP falls, the baroreceptors fire less, and the SNS takes over.',
      steps: [[0, 'Lying down: baseline.'], [.25, 'Stand up: blood pools in the legs, BP falls.'], [.33, 'Baroreceptors fire less: PNS down, SNS up.'], [.45, 'The SNS constricts veins and speeds the heart; BP recovers.']],
      tip: 'Blocking α1 in the veins removes this recovery: prazosin gives first-dose orthostatic hypotension and syncope.',
      script: 'Lying down is the baseline. On standing, blood pools in the legs, so venous return and stroke volume fall and blood pressure falls. The baroreceptors in the carotid sinus and aortic arch stretch less and fire less. Less firing turns the parasympathetic down and the sympathetic up. The sympathetic constricts the veins and speeds the heart, and blood pressure recovers.'},
    vaso: {name: 'Vasodilator (prazosin)', c: 'an', bp: (u) => -24 * seg(u, .25, .38) + 8 * seg(u, .45, .8), hr: (u) => 18 * seg(u, .28, .45) - 4 * seg(u, .55, .85),
      lede: 'Block α1 and the vessels relax. BP falls, the baroreceptors fire less, and the SNS speeds the heart: reflex tachycardia.',
      steps: [[0, 'Baseline.'], [.25, 'Prazosin blocks α1: vasodilation, BP falls.'], [.32, 'Baroreceptors fire less: SNS rises.'], [.42, 'β1 speeds the heart: reflex tachycardia.']],
      tip: 'The rule for every tracing: BP down gives HR up, BP up gives HR down. Prazosin alone is a poor monotherapy; a β blocker is added for the tachycardia.',
      script: 'Start at baseline. Prazosin blocks alpha 1 in the arteries and veins, so the vessels relax and blood pressure falls. The baroreceptors sense the fall and fire less, which raises sympathetic output. The sympathetic acts on beta 1 in the heart and the heart rate rises: reflex tachycardia, the palpitations on the prazosin slide.'},
    spike: {name: 'BP rises', c: 'ink', bp: (u) => 26 * bump(u, .25, .4, .8), hr: (u) => -12 * bump(u, .28, .45, .84),
      lede: 'When BP rises, the baroreceptors fire more. That raises the PNS and lowers the SNS, so the heart slows.',
      steps: [[0, 'Baseline.'], [.25, 'BP rises.'], [.3, 'Baroreceptors fire more: PNS up, SNS down.'], [.42, 'Heart rate falls (through M2) and BP comes back down.']],
      tip: 'His poll on the baroreceptors: more firing means less sympathetic activity; all of the statements were correct.',
      script: 'Start at baseline. Blood pressure rises. The baroreceptors stretch more and fire more. More firing raises the parasympathetic and lowers the sympathetic. The parasympathetic acts on M 2 in the heart, which is G i, so the heart rate falls and blood pressure comes back down toward baseline.'},
    ach: {name: 'ACh bolus', c: 'ag', bp: (u) => -26 * bump(u, .25, .36, .74), hr: (u) => 16 * bump(u, .27, .42, .8),
      lede: 'IV ACh reaches M3 on the endothelium: NO is made, the vessels dilate, BP falls. The reflex then speeds the heart, overriding M2.',
      steps: [[0, 'Baseline.'], [.25, 'ACh bolus: endothelial M3, NO, BP falls.'], [.3, 'Baroreceptors fire less: SNS up.'], [.4, 'Heart rate goes up (reflex β1), not down.']],
      tip: 'His lab question: why tachycardia after ACh? The β1 reflex from the fall in BP overrides the M2 effect of ACh.',
      script: 'Start at baseline. An I V bolus of acetylcholine reaches M 3 on the vascular endothelium. M 3 is G q, calcium rises, nitric oxide is made and the vessels dilate, so blood pressure falls. The baroreceptors fire less and sympathetic output rises. The heart rate goes up through beta 1, not down through M 2: the reflex overrides the direct effect.'},
    atro: {name: 'ACh after atropine', c: 'an', bp: () => 0, hr: (u) => 12,
      lede: 'Atropine blocks M2 (resting heart rate is already higher) and M3 (no NO is released). ACh now does nothing: no fall in BP, no reflex.',
      steps: [[0, 'Atropine on board: M2 blocked, so the resting HR is higher.'], [.25, 'The same ACh bolus.'], [.3, 'M3 blocked: no NO, no fall in BP.'], [.42, 'No reflex. A 100-fold ACh dose outcompetes atropine and the fall returns.']],
      tip: 'Atropine for severe bradycardia works the same way: block M2 and the sympathetic is unopposed.',
      script: 'Atropine is on board. It blocks M 2 in the heart, so the resting heart rate is already higher, and it blocks M 3 on the endothelium. The same bolus of acetylcholine is given, but no nitric oxide is released and blood pressure does not fall, so there is no reflex. Atropine is competitive: a dose of acetylcholine one hundred times larger outcompetes it and the fall in pressure returns.'},
  },
};
BARO.drawMode = function (m, t) {
  const W = 640, H = 390; const p = clamp(t / 6);
  ctx.fillStyle = C('panel'); ctx.fillRect(0, 0, W, H);
  const x0 = 120, x1 = 620;
  const lane = (yc, h, label, sub) => { txt(label, 12, yc - 8, {a: 'left', size: 13, w: 700}); if (sub) txt(sub, 12, yc + 10, {a: 'left', size: 11, c: C('muted')}); ctx.strokeStyle = C('line'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, yc + h / 2); ctx.lineTo(x1, yc + h / 2); ctx.stroke(); };
  const N = Math.floor(400 * p);
  const plot = (fn, yc, scale, col) => {
    ctx.setLineDash([4, 4]); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, yc); ctx.lineTo(x1, yc); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const u = i / 400; const yy = yc - fn(u) * scale; i ? ctx.lineTo(lerp(x0, x1, u), yy) : ctx.moveTo(lerp(x0, x1, u), yy); }
    ctx.stroke(); const ue = N / 400; dot(lerp(x0, x1, ue), yc - fn(ue) * scale, 4, col);
  };
  lane(70, 80, 'Blood pressure', null); plot(m.bp, 70, 1.4, C('ink'));
  lane(160, 40, 'Baroreceptor', 'nerve firing');
  ctx.strokeStyle = C('in'); ctx.lineWidth = 1.6; let ph = 0;
  for (let i = 0; i <= N; i++) { const u = i / 400; const rate = Math.max(0, 0.11 * (1 + m.bp(u) / 22)); ph += rate; if (ph >= 1) { ph -= 1; const x = lerp(x0, x1, u); ctx.beginPath(); ctx.moveTo(x, 172); ctx.lineTo(x, 148); ctx.stroke(); } }
  const cur = m.bp(N / 400);
  const pns = m === BARO.modes.atro ? .5 : clamp(.5 + cur / 50, .05, .95), sns = clamp(.5 - cur / 50, .05, .95);
  txt('Autonomic', 12, 222, {a: 'left', size: 13, w: 700}); txt('balance now', 12, 240, {a: 'left', size: 11, c: C('muted')});
  [['PNS (M2)', pns, C('ag'), 216], ['SNS (β1, α1)', sns, C('an'), 240]].forEach(([lab, v, col, yy]) => {
    rr(x0 + 100, yy - 7, 300, 14, 7); ctx.fillStyle = C('chip'); ctx.fill();
    rr(x0 + 100, yy - 7, 300 * v, 14, 7); ctx.fillStyle = col; ctx.fill();
    txt(lab, x0 + 92, yy, {a: 'right', size: 12, w: 700, c: col});
  });
  if (m === BARO.modes.atro) txt('M2 blocked by atropine', x0 + 410, 216, {a: 'left', size: 11, c: C('an'), w: 700});
  lane(320, 80, 'Heart rate', null); plot(m.hr, 320, 1.4, C('an'));
  if (p > .24) { const xa = lerp(x0, x1, .25); ctx.setLineDash([2, 4]); ctx.strokeStyle = C('muted'); ctx.beginPath(); ctx.moveTo(xa, 24); ctx.lineTo(xa, 372); ctx.stroke(); ctx.setLineDash([]); txt(m.name, xa + 6, 22, {a: 'left', size: 11, w: 700, c: C('muted')}); }
};
Object.values(BARO.modes).forEach((m) => { m.L = 7.5; m.draw = (t) => BARO.drawMode(m, t); m.stepT = (t) => clamp(t / 6); });

/* ---------------- RAAS ---------------- */
const NODES = {agt: [80, 120, 'Angiotensinogen'], a1: [240, 120, 'Ang I'], a2: [400, 120, 'Ang II'], at1: [560, 120, 'AT1 (Gq)'], at2: [400, 250, 'AT2 (Gi)'], bk: [240, 250, 'Bradykinin'], aldo: [560, 250, 'Aldosterone']};
const U = .86, D = .16, F = .5;
const RAAS = {
  key: 'raas', title: 'RAAS: where each drug acts', short: 'RAAS cascade', W: 680, H: 360,
  label: 'Animated RAAS cascade with flow stopping at each drug\'s block point',
  cite: 'PCOL-RAAS_26s.pdf slides 3–9, 12–13, 18–29; transcript 10/8; polls PE2-054, PE2-055, PE2-056',
  modes: {
    none: {name: 'No drug', c: 'ink', cut: null, lv: {agt: F, a1: F, a2: F, at1: F, at2: F, bk: F, aldo: F}, flow: {renin: 1, ace: 1, at1: 1, at2: .35, aldo: 1},
      lede: 'Renin (the rate-limiting enzyme) cleaves angiotensinogen to Ang I. ACE converts Ang I to Ang II, which binds mostly AT1: vasoconstriction, Na+ retention, aldosterone.',
      steps: [[0, 'The liver makes angiotensinogen; renin from the kidney cleaves it to Ang I.'], [1, 'ACE converts Ang I to Ang II (and breaks down bradykinin).'], [2, 'Ang II binds AT1 (thick arrow, about 9 of 10): vasoconstriction, Na+ retention, aldosterone.'], [3, 'AT2 is the physiological antagonist: it opposes AT1.']],
      tip: 'Renin release rises with low Na+ at the macula densa, low pressure in the renal artery, and β1 stimulation of the juxtaglomerular cells.',
      script: 'The liver makes angiotensinogen. Renin from the kidney, the rate limiting enzyme, cleaves it to angiotensin one. A C E converts angiotensin one to angiotensin two, and also breaks down bradykinin. Angiotensin two binds mostly A T 1, which is G q: vasoconstriction, sodium retention and aldosterone release. A T 2 is G i, the physiological antagonist that opposes A T 1.'},
    lis: {name: 'Lisinopril (-pril)', c: 'an', cut: 'ace', lv: {agt: U, a1: U, a2: D, at1: D, at2: D, bk: U, aldo: D}, flow: {renin: 1.5, ace: 0, at1: .25, at2: .1, aldo: .25},
      lede: 'ACE inhibitors stop Ang I from becoming Ang II. Everything below the block falls; Ang I and angiotensinogen rise; bradykinin builds up because ACE no longer breaks it down.',
      steps: [[0, 'Block at ACE.'], [1, 'Below the block: Ang II, AT1 activation, AT2 activation and aldosterone fall.'], [2, 'Above the block: Ang I and angiotensinogen rise; the body makes more renin to compensate.'], [3, 'Bradykinin rises: dry cough and angioedema.']],
      tip: 'His poll: lisinopril does not lower renin or Ang I (they are upstream). It lowers Ang II, aldosterone and AT1 activation.',
      script: 'Lisinopril, any pril, blocks A C E. Below the block, angiotensin two falls, so A T 1 activation, A T 2 activation and aldosterone all fall. Above the block, angiotensin one and angiotensinogen rise, and the body makes more renin to compensate. Bradykinin rises because A C E no longer breaks it down, which gives the dry cough and the angioedema.'},
    los: {name: 'Losartan (-sartan)', c: 'an', cut: 'at1', lv: {agt: U, a1: U, a2: U, at1: D, at2: U, bk: F, aldo: D}, flow: {renin: 1.5, ace: 1.3, at1: 0, at2: 1, aldo: .2},
      lede: 'ARBs block AT1 itself. Ang II rises and activates more AT2, the physiological antagonist, which lowers BP further.',
      steps: [[0, 'Block at the AT1 receptor.'], [1, 'AT1 activation and aldosterone fall.'], [2, 'Ang II, Ang I and angiotensinogen rise (compensation).'], [3, 'AT2 activation rises. Less cough than with an ACE inhibitor.']],
      tip: 'His poll: valsartan does not lower Ang II and does not lower AT2 activation; it lowers AT1 activation.',
      script: 'Losartan, any sartan, blocks the A T 1 receptor itself. A T 1 activation falls and aldosterone falls. Angiotensin two, angiotensin one and angiotensinogen rise as the body compensates. The extra angiotensin two activates more A T 2, the physiological antagonist, which lowers blood pressure further. Cough is less common than with an A C E inhibitor.'},
    ali: {name: 'Aliskiren', c: 'an', cut: 'renin', lv: {agt: U, a1: D, a2: D, at1: D, at2: D, bk: F, aldo: D}, flow: {renin: 0, ace: .2, at1: .2, at2: .1, aldo: .2},
      lede: 'Aliskiren blocks renin, the rate-limiting first step, so everything downstream falls. Only angiotensinogen rises.',
      steps: [[0, 'Block at renin, the first step.'], [1, 'Ang I, Ang II, AT1 activation, AT2 activation and aldosterone all fall.'], [2, 'Angiotensinogen rises (nothing is cleaving it).'], [3, 'Reversible, binds plasma renin with high affinity.']],
      tip: 'Hyperkalemia, first-dose hypotension and fetal harm apply to aliskiren, ACE inhibitors and ARBs alike (his hyperkalemia poll: all of the above).',
      script: 'Aliskiren blocks renin, the rate limiting first step of the cascade. Everything downstream falls: angiotensin one, angiotensin two, A T 1 activation, A T 2 activation and aldosterone. Only angiotensinogen rises, because nothing is cleaving it. Aliskiren is reversible and binds plasma renin with high affinity.'},
    met: {name: 'Metoprolol', c: 'an', cut: 'beta', lv: {agt: U, a1: D, a2: D, at1: D, at2: D, bk: F, aldo: D}, flow: {renin: .25, ace: .3, at1: .3, at2: .1, aldo: .3},
      lede: 'β blockers block β1 on the juxtaglomerular cells, so less renin is released. The whole cascade is suppressed, not abolished.',
      steps: [[0, 'Block at β1 on the juxtaglomerular cells: less renin released.'], [1, 'Ang I, Ang II, AT1 activation, AT2 activation and aldosterone fall.'], [2, 'Angiotensinogen rises.'], [3, 'The Na+ and pressure signals still release some renin.']],
      tip: 'Every β blocker does this. CLAMS: captopril, losartan, aliskiren, metoprolol, spironolactone.',
      script: 'Metoprolol blocks beta 1 on the juxtaglomerular cells, so less renin is released. Angiotensin one, angiotensin two, A T 1 activation, A T 2 activation and aldosterone all fall, and angiotensinogen rises. The cascade is suppressed, not abolished, because the sodium signal at the macula densa and the pressure signal still release some renin.'},
    spi: {name: 'Spironolactone', c: 'an', cut: 'mr', lv: {agt: F, a1: F, a2: F, at1: F, at2: F, bk: F, aldo: F}, flow: {renin: 1, ace: 1, at1: 1, at2: .35, aldo: 1},
      lede: 'Spironolactone blocks the mineralocorticoid receptor (MR) at the end of the cascade, in the late distal tubule and collecting duct.',
      steps: [[0, 'Block at the MR receptor in the collecting duct.'], [1, 'Na+ is not retained and K+ is spared: hyperkalemia.'], [2, 'His 10/8 answers give rise-and-fall directions for lisinopril, losartan, aliskiren and metoprolol; for spironolactone they give only the receptor block, Na+ loss and K+ sparing.'], [3, 'Gynecomastia and impotence with spironolactone, not with eplerenone.']],
      tip: 'Slide 29 is a blank table to fill for all five CLAMS drugs; he said to expect 1 to 2 questions on what rises and what falls.',
      script: 'Spironolactone blocks the mineralocorticoid receptor at the end of the cascade, in the late distal tubule and collecting duct. Sodium is not retained and potassium is spared, so hyperkalemia is the side effect. His spoken answers on October eighth give directions for the other four drugs; for spironolactone only the receptor block, sodium loss and potassium sparing. Gynecomastia and impotence occur with spironolactone, not with eplerenone.'},
  },
};
const lvNow = {agt: F, a1: F, a2: F, at1: F, at2: F, bk: F, aldo: F};
RAAS.drawMode = function (m, t) {
  const W = 680, H = 360;
  ctx.fillStyle = C('panel'); ctx.fillRect(0, 0, W, H);
  Object.keys(lvNow).forEach((k) => { lvNow[k] += (m.lv[k] - lvNow[k]) * .06; });
  const edgePts = {renin: [NODES.agt, NODES.a1], ace: [NODES.a1, NODES.a2], at1: [NODES.a2, NODES.at1], at2: [NODES.a2, NODES.at2], aldo: [NODES.at1, NODES.aldo]};
  const ends = ([ax, ay], [bx, by]) => { const dx = bx - ax, dy = by - ay; const len = Math.hypot(dx, dy); const ux = dx / len, uy = dy / len; const pad = Math.abs(ux) > .5 ? 62 : 26; return [ax + ux * pad, ay + uy * pad, bx - ux * pad, by - uy * pad]; };
  Object.entries(edgePts).forEach(([k, [a, b]]) => {
    const [sx, sy, ex, ey] = ends(a, b); arrow(sx, sy, ex, ey, C('muted'), k === 'at1' ? 3 : 1.4);
    const f = m.flow[k]; const n = Math.round(6 * Math.min(f, 1.5));
    for (let i = 0; i < n; i++) { const u = ((t * .35 * Math.max(f, .3) + i / n) % 1); dot(lerp(sx, ex, u), lerp(sy, ey, u), 3.5, C('ag')); }
  });
  rr(600, 315, 70, 32, 8); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1; ctx.stroke(); txt('MR', 635, 331, {size: 12, w: 700});
  arrow(560, 272, 600, 326, C('muted'), 1.4);
  if (m.flow.aldo > 0 && m.cut !== 'mr') for (let i = 0; i < 3; i++) { const u = ((t * .35 + i / 3) % 1); dot(lerp(566, 598, u), lerp(280, 322, u), 3.5, C('ag')); }
  ctx.setLineDash([4, 4]); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(320, 128); ctx.lineTo(320, 250); ctx.lineTo(306, 250); ctx.stroke(); ctx.setLineDash([]);
  txt('ACE also breaks down', 326, 190, {a: 'left', size: 11, c: C('muted')});
  txt('renin', 160, 104, {size: 12, w: 700, c: C('muted')}); txt('ACE', 320, 104, {size: 12, w: 700, c: C('muted')});
  rr(110, 24, 100, 30, 8); ctx.fillStyle = C('chip'); ctx.fill(); txt('β1 on JG cells', 160, 39, {size: 11, w: 700});
  arrow(160, 56, 160, 96, C('muted'), 1.4);
  Object.entries(NODES).forEach(([k, [x, y, lab]]) => {
    rr(x - 60, y - 22, 120, 44, 10); ctx.fillStyle = C('panel'); ctx.fill(); ctx.strokeStyle = k === 'a2' ? C('in') : C('ink'); ctx.lineWidth = k === 'a2' ? 2.2 : 1.3; ctx.stroke();
    txt(lab, x, y - 5, {size: 13, w: 700});
    rr(x - 48, y + 9, 96, 6, 3); ctx.fillStyle = C('chip'); ctx.fill();
    const v = lvNow[k]; rr(x - 48, y + 9, Math.max(6, 96 * v), 6, 3); ctx.fillStyle = v > .62 ? C('ag') : v < .38 ? C('an') : C('muted'); ctx.fill();
    if (m.cut && m.lv[k] !== F) { const s = m.lv[k] > .6 ? '↑' : '↓'; txt(s, x + 72, y, {size: 20, w: 700, c: s === '↑' ? C('ag') : C('an')}); }
  });
  const cutAt = {renin: [160, 120], ace: [320, 120], at1: [480, 120], beta: [160, 76], mr: [582, 300]}[m.cut];
  if (cutAt) { const pulse = 1 + .12 * Math.sin(t * 4); dot(cutAt[0], cutAt[1], 13 * pulse, C('panel'), C('an')); cross(cutAt[0], cutAt[1], 7, C('an')); if (m.cut === 'mr') txt(m.name, cutAt[0] - 18, cutAt[1], {size: 12, w: 700, c: C('an'), a: 'right'}); else txt(m.name, cutAt[0], cutAt[1] + (m.cut === 'beta' ? -36 : -30), {size: 12, w: 700, c: C('an')}); }
  if (m.cut === 'mr') txt('directions above the receptor: not given on 10/8', 340, 330, {size: 11, c: C('muted')});
};
Object.values(RAAS.modes).forEach((m) => { m.L = 8; m.draw = (t) => RAAS.drawMode(m, t); m.stepT = (t) => clamp(t / 6.5) * 4; });

/* ---------------- DUMBBELSS (organ tiles, no canvas) ---------------- */
const ORG = [
  ['D', 'Gut', 'M3', ['Diarrhea', 'up'], ['Constipation', 'down']],
  ['U', 'Bladder', 'M3', ['Urination', 'up'], ['Decreased urination', 'down']],
  ['M', 'Pupil', 'M3', ['Miosis', 'up'], ['Mydriasis', 'down']],
  ['B', 'Heart', 'M2', ['Bradycardia', 'up'], ['Tachycardia', 'down']],
  ['B', 'Airway', 'M3', ['Bronchial constriction', 'up'], ['Bronchial dilation', 'down']],
  ['E', 'Brain', 'M1', ['Emesis', 'up'], ['Less vomiting', 'down']],
  ['L', 'Tear glands', 'M3', ['Lacrimation', 'up'], ['Dry eyes', 'down']],
  ['S', 'Salivary glands', 'M3', ['Salivation', 'up'], ['Dry mouth', 'down']],
  ['S', 'Brain', 'M1', ['CNS stimulation', 'up'], ['Sedation; hallucinations at high dose', 'down']],
];
const EXTRA = [['+', 'SNS ganglia (Nn)', 'Nn', 'Tachycardia, hypertension'], ['+', 'NMJ (Nm)', 'Nm', 'Cramps, weakness, respiratory paralysis'], ['+', 'Brain', 'CNS', 'Agitation, confusion, seizures']];
const DUMB = {
  key: 'dumb', title: 'DUMBBELSS and anti-DUMBBELSS', short: 'DUMBBELSS', dom: true,
  cite: 'Autonomic Nervous System.pdf slides 24, 26–27; PCOL-Cholinergic-26s.pdf slides 13–15, 19–20, 32; PCOL-NMJ slides 41–44; transcripts 10/1, 10/5; polls PE2-024, PE2-063',
  modes: {
    ag: {name: 'Agonist (carbachol)', c: 'ag', which: 3, L: 4,
      lede: 'A muscarinic agonist activates M1, M2 and M3 everywhere: the full DUMBBELSS list. It does not bind Nn or Nm.',
      steps: [[0, 'M3 (Gq, more Ca++): gut, bladder, pupil, airway and glands all activate.'], [1, 'M2 (Gi) in the heart: bradycardia.'], [2, 'M1 (Gq) in the brain: emesis, stimulation.'], [3, 'Contraindicated in asthma (more bronchial constriction).']],
      tip: 'His most-missed point: the muscarinic agonists bind only muscarinic receptors. Only acetylcholine itself also binds nicotinic receptors.',
      script: 'Carbachol is a non selective muscarinic agonist: it activates M 1, M 2 and M 3 everywhere, which gives the full dumbbells list. M 3 is G q and raises calcium, so the gut, bladder, pupil, airway and glands all activate. M 2 in the heart is G i: bradycardia. M 1 in the brain is G q: emesis and stimulation. It does not bind N n or N m, and it is contraindicated in asthma.'},
    ache: {name: 'AChE inhibitor (rivastigmine)', c: 'in', which: 3, L: 4,
      lede: 'An indirect drug: blocking AChE raises ACh wherever it is released, so the side effects are the same DUMBBELSS.',
      steps: [[0, 'More ACh at every muscarinic receptor: DUMBBELSS.'], [1, 'Rivastigmine and donepezil cross the blood–brain barrier: the central effect they are used for.'], [2, 'ADRs on the slide: GI effects and CNS effects (insomnia, agitation, dizziness, falls), each above 10%.'], [3, 'His Jeopardy question: a rivastigmine patient complains of all of the above.']],
      tip: 'The edrophonium test gives the same DUMBBELSS; atropine blocks those effects (his Jeopardy question).',
      script: 'Rivastigmine is an indirect drug. It blocks acetylcholinesterase, so acetylcholine rises wherever it is released, and the side effects are the same dumbbells. Rivastigmine and donepezil cross the blood brain barrier, which is the central effect they are used for. The slide lists G I effects and central effects, insomnia, agitation, dizziness and falls, each above ten percent.'},
    an: {name: 'Antagonist (atropine)', c: 'an', which: 4, L: 4,
      lede: 'Block M1, M2 and M3 and every organ shows the opposite effect: anti-DUMBBELSS.',
      steps: [[0, 'M3 blocked: constipation, decreased urination, mydriasis, bronchial dilation, dry eyes and dry mouth.'], [1, 'M2 blocked: the sympathetic is unopposed, tachycardia.'], [2, 'M1 blocked: sedation; hallucinations, restlessness and coma at high doses.'], [3, 'Uses: muscarinic agonist overdose (bradycardia, AV block), organophosphate poisoning.']],
      tip: 'Oxybutynin, trospium and solifenacin (bladder), ipratropium and tiotropium (lungs) and tropicamide (eye) are the same block aimed at one site.',
      script: 'Atropine is a competitive, reversible, non selective antagonist at M 1, M 2 and M 3, so every organ shows the opposite effect: anti dumbbells. M 3 blocked gives constipation, decreased urination, mydriasis, bronchial dilation, dry eyes and dry mouth. M 2 blocked leaves the sympathetic unopposed: tachycardia. M 1 blocked gives sedation, and at high doses hallucinations, restlessness and coma.'},
    op: {name: 'Organophosphate', c: 'an', which: 3, extra: true, L: 4,
      lede: 'Irreversible AChE block: massive DUMBBELSS, plus effects at the sympathetic ganglia, the NMJ and the brain.',
      steps: [[0, 'A covalent, irreversible bond to AChE: ACh rises everywhere.'], [1, 'Sympathetic ganglia: tachycardia, hypertension.'], [2, 'NMJ: cramps and weakness, then respiratory paralysis. Brain: agitation, confusion, seizures.'], [3, 'Treatment: pralidoxime (2-PAM) within about an hour, then atropine.']],
      tip: 'Atropine manages the DUMBBELSS but does not free the enzyme. Echothiophate is the same class, used as an eye drop for glaucoma.',
      script: 'An organophosphate forms a covalent, irreversible bond with acetylcholinesterase, so acetylcholine rises everywhere: massive dumbbells. It also stimulates the sympathetic ganglia, tachycardia and hypertension; the neuromuscular junction, cramps and weakness, then respiratory paralysis; and the brain, agitation, confusion and seizures. Treatment is pralidoxime within about an hour, then atropine.'},
  },
};
function buildDumb(box) {
  box.innerHTML = '';
  const g = document.createElement('div'); g.className = 'sc-organs'; box.appendChild(g);
  const tile = (L, o, r, ef, extra) => { const d = document.createElement('div'); d.className = 'sc-org' + (extra ? ' sc-extra' : ''); d.innerHTML = '<span class="sc-L"></span><span class="sc-rc"></span><span class="sc-ef"></span><span class="sc-ar"></span><div class="sc-meter"><i></i></div>'; d.querySelector('.sc-L').textContent = L; d.querySelector('.sc-rc').textContent = r; d.querySelector('.sc-ef').textContent = ef || ''; d.querySelector('.sc-ar').textContent = o; if (extra) d.hidden = true; g.appendChild(d); };
  ORG.forEach(([L, o, r]) => tile(L, o, r));
  EXTRA.forEach(([L, o, r, ef]) => tile(L, o, r, ef, true));
}
function setDumb(box, m) {
  const tiles = box.querySelectorAll('.sc-org');
  ORG.forEach((row, i) => { const [eff, dir] = row[m.which]; const el = tiles[i]; el.querySelector('.sc-ef').textContent = eff; el.classList.toggle('up', dir === 'up' && m.which === 3); el.classList.toggle('down', m.which === 4); el.querySelector('.sc-L').style.color = m.which === 3 ? 'var(--figC)' : 'var(--figB)'; });
  EXTRA.forEach((_, j) => { const el = tiles[ORG.length + j]; el.hidden = !m.extra; el.classList.toggle('up', !!m.extra); });
}

/* ---------------- ANS wiring ---------------- */
function cord() { rr(36, 30, 24, 320, 10); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.2; ctx.stroke(); txt('CNS', 48, 18, {size: 11, w: 700, c: C('muted')}); }
function ganglion(x, y, on, label = 'Nn') { glow(x, y, 26, C('in'), on * .35); dot(x, y, 17, C('panel'), C('in')); txt(label, x, y, {size: 11, w: 700, c: C('in')}); }
function organ(x, y, w, h, label, on, col) { if (on > 0) { rr(x - 6, y - 6, w + 12, h + 12, 13); ctx.fillStyle = col || C('ag'); ctx.globalAlpha = clamp(on) * .35; ctx.fill(); ctx.globalAlpha = 1; } box(x, y, w, h, label, {size: 12}); }
const ANS = {
  key: 'ans', title: 'ANS wiring', short: 'ANS wiring', W: 640, H: 380,
  label: 'Animated autonomic wiring: parasympathetic, sympathetic, adrenal, salivary gland and somatic pathways',
  cite: 'Autonomic Nervous System.pdf slides 11–13, 21–23, 28–30, 34–35, 43–44; transcripts 9/30, 10/1; polls PE2-001, PE2-007, PE2-066',
  modes: {
    pns: {name: 'PNS (1 : 1)', c: 'ag', L: 4,
      lede: 'Parasympathetic: a long myelinated preganglionic fiber runs to a ganglion at or near the organ, then a short postganglionic fiber. One preganglionic neuron contacts about one postganglionic neuron.',
      steps: [[0, 'The signal leaves the brainstem or sacral cord (craniosacral).'], [.2, 'The long preganglionic fiber releases ACh onto Nn at a ganglion near the organ.'], [2, 'The short postganglionic fiber releases ACh onto muscarinic receptors.'], [2.6, 'One target responds (rest and digest).']],
      tip: 'His slide: PNS is 1 presynaptic to 1 postsynaptic. The lungs are PNS only (M3 constricts the airway).',
      script: 'The parasympathetic signal leaves the brainstem or the sacral cord. A long myelinated preganglionic fiber runs to a ganglion at or near the organ and releases acetylcholine onto N n. A short postganglionic fiber then releases acetylcholine onto muscarinic receptors, here M 2 in the heart. One preganglionic neuron contacts about one postganglionic neuron, so one target responds: rest and digest.',
      draw(t) {
        bg(640, 380); cord();
        const pre = [[60, 150], [418, 150]], post = [[458, 150], [530, 150]];
        poly(pre, C('ink'), 2.2); poly(post, C('ink'), 2.2);
        for (let x = 80; x < 410; x += 34) { rr(x, 145, 24, 10, 5); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1; ctx.stroke(); }
        pulseOn(pre, seg(t, .2, 1.8), C('ag')); pulseOn(post, seg(t, 2.0, 2.6), C('ag'));
        ganglion(438, 150, bump(t, 1.7, 1.9, 2.3));
        organ(530, 120, 96, 60, 'Heart: M2', bump(t, 2.5, 2.9, 3.8));
        txt('ACh → Nn', 438, 118, {size: 12, w: 700, c: C('ag')}); txt('ACh → M', 494, 182, {size: 12, w: 700, c: C('ag')});
        txt('long preganglionic (myelinated)', 240, 172, {size: 11, c: C('muted')});
        txt('1 : 1', 320, 270, {size: 40, w: 700, c: C('ag')}); txt('one fiber, one target', 320, 306, {size: 13, c: C('muted')});
      }},
    sns: {name: 'SNS (1 : 20)', c: 'an', L: 4,
      lede: 'Sympathetic: a short preganglionic fiber to a ganglion near the spinal cord, then long postganglionic fibers to many organs at once. That is why fight or flight is whole-body.',
      steps: [[0, 'The signal leaves the thoracolumbar cord.'], [.2, 'Short preganglionic fiber: ACh onto Nn at the ganglion.'], [1, 'One neuron contacts about 20: long postganglionic fibers release NE.'], [2, 'Every organ responds together: fight or flight.']],
      tip: 'Blood vessels and kidneys are SNS only. The lungs get no SNS fibers: their β2 relaxation comes from circulating epinephrine.',
      script: 'The sympathetic signal leaves the thoracolumbar cord. A short preganglionic fiber releases acetylcholine onto N n at a ganglion near the spinal cord. One preganglionic neuron contacts about twenty postganglionic neurons, and their long fibers release norepinephrine onto alpha and beta receptors. Every organ responds together: fight or flight. His words: you can control more at once.',
      draw(t) {
        bg(640, 380); cord();
        const pre = [[60, 190], [158, 190]]; poly(pre, C('ink'), 2.2);
        const targets = [['Eye: α1 dilates', 40], ['Heart: β1 faster', 98], ['Vessels: α1 constrict', 156], ['Kidney: β1 renin', 214], ['Gut: α2 slows', 272], ['Bladder: β3 relaxes', 330]];
        targets.forEach(([lab, y]) => { const pts = [[196, 190], [300, 190], [470, y + 20]]; poly(pts, C('ink'), 1.6); pulseOn(pts, seg(t, 1.0, 2.0), C('an')); organ(470, y, 156, 40, lab, bump(t, 1.9, 2.3, 3.4), C('an')); });
        pulseOn(pre, seg(t, .2, .8), C('ag')); ganglion(178, 190, bump(t, .75, .9, 1.3));
        txt('ACh', 110, 176, {size: 12, w: 700, c: C('ag')}); txt('NE', 262, 176, {size: 12, w: 700, c: C('an')});
        txt('1 : 20', 120, 300, {size: 34, w: 700, c: C('an')}); txt('all at once', 120, 330, {size: 13, c: C('muted')});
      }},
    adrenal: {name: 'Adrenal medulla', c: 'ag', L: 4.6,
      lede: 'SNS exception 1: the preganglionic fiber runs straight to the adrenal medulla (Nn), which releases epinephrine and NE into the blood, about 80 to 20.',
      steps: [[0, 'The SNS preganglionic fiber reaches the adrenal medulla.'], [.2, 'ACh binds Nn on the medulla cells.'], [1.3, 'Epinephrine (about 80%) and NE (about 20%) enter the blood.'], [2.8, 'Circulating epinephrine reaches lung β2 (bronchial dilation) and heart β1.']],
      tip: 'His Jeopardy question: a patient whose adrenal glands were removed loses bronchial dilation, because the lung β2 receptors are reached only by circulating epinephrine.',
      script: 'The first sympathetic exception. The preganglionic fiber runs straight to the adrenal medulla and releases acetylcholine onto N n on the medulla cells. The medulla releases epinephrine and norepinephrine into the blood, at about an eighty to twenty ratio. Circulating epinephrine reaches the beta 2 receptors in the lungs, which have no nerve, giving bronchial dilation, and beta 1 in the heart.',
      draw(t) {
        bg(640, 380); cord();
        const pre = [[60, 200], [270, 200]]; poly(pre, C('ink'), 2.2); pulseOn(pre, seg(t, .2, 1.2), C('ag'));
        organ(270, 172, 120, 56, 'Adrenal (Nn)', bump(t, 1.1, 1.4, 2.2), C('in'));
        rr(60, 290, 560, 40, 20); ctx.fillStyle = C('vessel'); ctx.fill(); txt('bloodstream', 110, 310, {size: 11, c: C('muted')});
        organ(470, 40, 150, 46, 'Lungs: β2 dilate', bump(t, 3.0, 3.4, 4.4)); organ(470, 108, 150, 46, 'Heart: β1 faster', bump(t, 3.0, 3.4, 4.4));
        for (let i = 0; i < 10; i++) {
          const k = seg(t, 1.3 + i * .08, 3.0 + i * .08); if (k <= 0 || k >= 1) continue;
          const toLung = i % 2 === 0; const path = [[330, 228], [330 + (i % 5) * 6, 304], [446, 304], [446, toLung ? 63 : 131], [470, toLung ? 63 : 131]];
          const [x, y] = polyAt(path, k); dot(x, y, 5, i < 8 ? C('ag') : C('na'), C('ink'));
        }
        dot(84, 356, 5, C('ag'), C('ink')); txt('epinephrine ~80%', 94, 356, {a: 'left', size: 11, c: C('muted')});
        dot(224, 356, 5, C('na'), C('ink')); txt('NE ~20%', 234, 356, {a: 'left', size: 11, c: C('muted')});
      }},
    saliva: {name: 'Salivary glands', c: 'ag', L: 4,
      lede: 'SNS exception 2: the sympathetic fiber to the salivary glands releases ACh onto M3, not NE. So both divisions cause salivation.',
      steps: [[0, 'Short SNS preganglionic fiber, ACh onto Nn as usual.'], [1, 'The postganglionic fiber releases ACh (not NE).'], [1.8, 'ACh binds M3 on the gland: salivation.']],
      tip: 'The salivary glands and the male sex organ are where the two divisions act together instead of in opposition (his poll: SNS activation evokes salivation).',
      script: 'The second sympathetic exception. The short preganglionic fiber releases acetylcholine onto N n as usual, but the postganglionic fiber to the salivary gland releases acetylcholine, not norepinephrine, onto M 3. So both divisions cause salivation, and on his poll sympathetic activation evokes salivation. The salivary glands and the male sex organ are the two sites where the divisions act together.',
      draw(t) {
        bg(640, 380); cord();
        const y = 200; const pre = [[60, y], [158, y]], post = [[196, y], [470, y]];
        poly(pre, C('ink'), 2.2); poly(post, C('ink'), 1.8); pulseOn(pre, seg(t, .2, .8), C('ag')); pulseOn(post, seg(t, 1.0, 1.8), C('ag'));
        ganglion(178, y, bump(t, .75, .9, 1.3)); organ(470, y - 26, 156, 52, 'Salivary gland: M3', bump(t, 1.8, 2.2, 3.4));
        txt('ACh (not NE)', 330, y - 14, {size: 12, w: 700, c: C('ag')});
        txt('a sympathetic fiber with a cholinergic ending', 330, 300, {size: 13, w: 700, c: C('muted')});
      }},
    somatic: {name: 'Somatic', c: 'ag', L: 3.5,
      lede: 'Somatic (voluntary): one myelinated fiber from the cord straight to skeletal muscle, no ganglion. ACh binds Nm and the muscle contracts.',
      steps: [[0, 'The motor neuron fires.'], [.2, 'One long myelinated fiber, no ganglion.'], [1.0, 'ACh binds Nm at the NMJ: contraction.']],
      tip: 'N for neuron, M for muscle: Nn sits in the brain, the ganglia and the adrenal medulla; Nm sits only at the NMJ.',
      script: 'The somatic system is voluntary. One myelinated motor fiber runs from the spinal cord straight to skeletal muscle, with no ganglion on the way. At the neuromuscular junction it releases acetylcholine onto N m, the nicotinic muscle receptor, and the muscle contracts. N for neuron, M for muscle: N n sits in the brain, the ganglia and the adrenal medulla; N m sits only at the neuromuscular junction.',
      draw(t) {
        bg(640, 380); cord();
        const f = [[60, 190], [470, 190]]; poly(f, C('ink'), 2.4);
        for (let x = 74; x < 460; x += 30) { rr(x, 184, 22, 12, 6); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1; ctx.stroke(); }
        pulseOn(f, seg(t, .2, 1.0), C('ag'));
        const c = bump(t, 1.0, 1.3, 2.4); const w = 150 - 30 * c;
        glow(470 + w / 2, 190, 70, C('ag'), c * .25); rr(470, 160 + c * 6, w, 60 - c * 12, 16); ctx.fillStyle = C('muscle'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.3; ctx.stroke();
        txt(c > .3 ? 'Contracting' : 'Skeletal muscle', 470 + w / 2, 190, {size: 12, w: 700});
        txt('ACh → Nm', 440, 160, {size: 12, w: 700, c: C('ag')}); txt('no ganglion · myelinated', 260, 216, {size: 11, c: C('muted')});
      }},
  },
};

/* ---------------- G-protein signaling ---------------- */
function membrane(y0 = 120, h = 30) { ctx.fillStyle = C('chip'); ctx.fillRect(0, y0, 640, h); ctx.strokeStyle = C('line'); ctx.lineWidth = 1; ctx.strokeRect(-1, y0, 642, h); txt('outside the cell', 20, y0 - 14, {a: 'left', size: 11, c: C('muted')}); txt('inside', 20, y0 + h + 16, {a: 'left', size: 11, c: C('muted')}); }
function receptor7(x, y0, on) { glow(x, y0 + 15, 32, C('ag'), on * .3); for (let i = 0; i < 7; i++) { rr(x - 30 + i * 9, y0 - 6, 6, 42, 3); ctx.fillStyle = on > .5 ? C('ag') : C('muted'); ctx.globalAlpha = .85; ctx.fill(); ctx.globalAlpha = 1; } }
function gpBase(t, label, effLabel, effCol, effectorDim) {
  bg(640, 380); membrane();
  const lig = seg(t, .2, .8); dot(130, lerp(40, 108, lig), 8, C('ag'), C('ink')); if (lig < .2) txt('agonist', 150, 44, {a: 'left', size: 11, c: C('muted')});
  receptor7(130, 120, seg(t, .75, .9));
  const k = seg(t, 1.0, 1.8); const gx = lerp(178, 296, k);
  dot(gx, 172, 15, C('in'), C('ink')); txt(label, gx, 172, {size: 10, w: 700, c: '#fff'});
  txt(t < .95 ? 'GDP' : 'GTP', gx, 196, {size: 10, w: 700, c: C('muted')});
  dot(gx - 22, 186, 6, C('muted')); dot(gx - 12, 192, 6, C('muted'));
  ctx.globalAlpha = effectorDim ? .45 : 1; box(286, 112, 72, 46, effLabel, {fill: C('panel'), stroke: effCol, lw: 2}); ctx.globalAlpha = 1;
}
const GP = {
  key: 'gp', title: 'G-protein signaling', short: 'G-proteins', W: 640, H: 380,
  label: 'Animated Gq, Gs and Gi signaling cascades',
  cite: 'Autonomic Nervous System.pdf slides 3–4, 6, 24, 34; PCOL-Cholinergic-26s.pdf slides 6–9; PCOL-Adrenergic slide 3; PCOL-RAAS slides 3, 18; transcripts 9/30, 10/5, 10/7',
  modes: {
    gq: {name: 'Gq: M1, M3, α1, AT1', c: 'ag', L: 5,
      lede: 'Gq activates phospholipase C. PIP2 is split to IP3, IP3 opens the calcium store of the ER, and the rise in Ca++ excites or contracts the cell.',
      steps: [[0, 'The agonist binds the receptor.'], [1, 'Gαq swaps GDP for GTP and moves to PLC.'], [1.9, 'PLC splits PIP2 to IP3, which travels to the ER.'], [2.8, 'Ca++ leaves the ER: contraction, secretion, excitation.']],
      tip: 'Gq receptors: M1 (brain), M3 (smooth muscle, glands, eye), α1 (vessels, eye), AT1. On the vascular endothelium the M3 calcium makes NO, so that one dilates.',
      script: 'The G q pathway. The agonist binds a receptor such as M 1, M 3, alpha 1 or A T 1. G alpha q swaps G D P for G T P and moves to phospholipase C. Phospholipase C splits P I P 2 to I P 3, and I P 3 travels to the endoplasmic reticulum and opens its calcium store. Calcium leaves the store, and the rise in calcium gives contraction, secretion or excitation.',
      draw(t) {
        gpBase(t, 'Gαq', 'PLC', C('ag'));
        if (t > 1.8) { const k = seg(t, 1.9, 2.8); dot(lerp(322, 440, k), lerp(170, 262, k), 6, C('na'), C('ink')); txt('IP3', lerp(336, 454, k), lerp(160, 252, k), {size: 11, w: 700, c: C('na'), a: 'left'}); }
        ctx.beginPath(); ctx.ellipse(470, 292, 78, 34, 0, 0, Math.PI * 2); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.2; ctx.stroke(); txt('ER (Ca++ store)', 470, 292, {size: 12, w: 700});
        const b = seg(t, 2.8, 3.8); if (b > 0) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; dot(470 + Math.cos(a) * (60 + 70 * b), 292 + Math.sin(a) * (26 + 50 * b) * .7, 4, C('an')); }
        if (t > 3.4) txt('↑ Ca++ → contract · secrete · excite', 470, 200, {size: 13, w: 700, c: C('an'), alpha: seg(t, 3.4, 3.7)});
      }},
    gs: {name: 'Gs: β1, β2, β3', c: 'in', L: 5,
      lede: 'Gs activates adenylate cyclase, the signal amplifier: one receptor makes many cAMP molecules, which activate PKA.',
      steps: [[0, 'The agonist binds a β receptor.'], [1, 'Gαs moves to adenylate cyclase (AC).'], [1.9, 'AC turns ATP into many cAMP molecules: amplification.'], [3, 'PKA: the heart beats faster and harder (β1); smooth muscle relaxes (β2, β3).']],
      tip: 'All β receptors are Gs. In smooth muscle (lungs, vessels, bladder) the cAMP relaxes it; he called the mechanism behind that FYI.',
      script: 'The G s pathway. The agonist binds a beta receptor: beta 1, beta 2 or beta 3. G alpha s moves to adenylate cyclase, the signal amplifier, which turns A T P into many molecules of cyclic A M P, so one receptor gives a large signal. Cyclic A M P activates P K A. In the heart, beta 1, the heart beats faster and harder; in smooth muscle, beta 2 and beta 3, the muscle relaxes.',
      draw(t) {
        gpBase(t, 'Gαs', 'AC', C('in'));
        const n = Math.floor(18 * seg(t, 1.9, 3.3));
        for (let i = 0; i < n; i++) { const r = 30 + rnd(i) * 120, a = Math.PI * (.15 + rnd(i, 2) * .7); dot(322 + Math.cos(a) * r, 170 + Math.sin(a) * r * .9, 4, C('in')); }
        if (n) txt(`cAMP ×${n}`, 430, 200, {size: 12, w: 700, c: C('in'), a: 'left'});
        box(430, 270, 90, 40, 'PKA', {stroke: C('in'), lw: 2});
        if (t > 3.1) { txt('β1 heart: ↑ HR, contractility, renin', 330, 340, {size: 12, w: 700, alpha: seg(t, 3.1, 3.4)}); txt('β2/β3 smooth muscle: relax', 330, 360, {size: 12, w: 700, alpha: seg(t, 3.1, 3.4)}); }
      }},
    gi: {name: 'Gi: M2, α2, AT2', c: 'an', L: 5,
      lede: 'Gi inhibits adenylate cyclase, so cAMP falls. In the heart (M2) the βγ part also opens K+ channels, which hyperpolarizes the cell.',
      steps: [[0, 'The agonist binds the receptor.'], [1, 'Gαi reaches adenylate cyclase and inhibits it.'], [1.9, 'cAMP falls.'], [2.5, 'In the heart, βγ opens K+ channels: K+ leaves, the cell hyperpolarizes, bradycardia.']],
      tip: 'Gi receptors: M2 (heart), α2 (presynaptic nerve ending, brain, GI), AT2 (opposes AT1). An α2 agonist lowers NE release.',
      script: 'The G i pathway. The agonist binds a receptor such as M 2, alpha 2 or A T 2. G alpha i reaches adenylate cyclase and inhibits it, so cyclic A M P falls. In the heart, the beta gamma part of the G protein also opens potassium channels; potassium leaves the cell, the membrane hyperpolarizes, and the heart rate falls. At alpha 2 on a nerve ending the same pathway means less norepinephrine release.',
      draw(t) {
        gpBase(t, 'Gαi', 'AC', C('an'), t > 1.8);
        if (t > 1.8) cross(322, 135, 12, C('an'));
        const n = Math.round(lerp(12, 2, seg(t, 1.9, 2.8)));
        for (let i = 0; i < n; i++) { const r = 40 + rnd(i) * 80, a = Math.PI * (.2 + rnd(i, 3) * .6); dot(322 + Math.cos(a) * r, 175 + Math.sin(a) * r * .8, 4, C('in')); }
        txt('cAMP ↓', 330, 300, {size: 12, w: 700, c: C('in')});
        rr(504, 116, 32, 38, 6); ctx.fillStyle = seg(t, 2.4, 2.6) > .5 ? C('ag') : C('muted'); ctx.fill(); txt('K+', 520, 104, {size: 11, w: 700, c: C('muted')});
        const kk = seg(t, 1.6, 2.4); dot(lerp(250, 520, kk), lerp(196, 166, kk), 5, C('muted')); dot(lerp(262, 532, kk), lerp(200, 170, kk), 5, C('muted')); if (kk > 0) txt('βγ', lerp(250, 520, kk), lerp(214, 186, kk), {size: 10, w: 700, c: C('muted')});
        if (t > 2.5) for (let i = 0; i < 4; i++) { const yy = 150 - ((t - 2.5) * 60 + i * 22) % 90; txt('K+', 520 + (i % 2) * 18, yy, {size: 11, w: 700, c: C('na')}); }
        if (t > 3) txt('hyperpolarized → M2: bradycardia · α2: less NE release', 330, 350, {size: 12, w: 700, alpha: seg(t, 3, 3.3)});
      }},
  },
};

/* ---------------- GI dual innervation ---------------- */
function gut(t, motility) {
  const y0 = 300, amp = 4 + 22 * motility;
  for (const side of [-1, 1]) { ctx.beginPath(); for (let x = 40; x <= 600; x += 6) { const y = y0 + side * 32 + Math.sin((x - t * 140 * (.4 + motility)) / 34) * amp * (side < 0 ? 1 : -1) * .5; x === 40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = C('an'); ctx.lineWidth = 3; ctx.globalAlpha = .6; ctx.stroke(); ctx.globalAlpha = 1; }
  txt(motility > .75 ? 'Gut: cramping, diarrhea' : motility < .25 ? 'Gut: slowed, constipation' : 'Gut: normal motility', 320, 300, {size: 13, w: 700, c: motility > .75 ? C('ag') : motility < .25 ? C('an') : C('ink')});
}
const GI = {
  key: 'gi', title: 'GI dual innervation', short: 'GI caveat', W: 640, H: 380,
  label: 'Animated gut control: PNS ACh on M3, SNS NE on presynaptic α2',
  cite: 'Autonomic Nervous System.pdf slides 45–47; PCOL-Adrenergic slides 23, 26, 36–38; PCOL-Cholinergic slides 19, 30; transcripts 10/1, 10/6, 10/7',
  modes: {
    rest: {name: 'Rest (PNS)', c: 'ag', n: 6, ne: false, mot: .6,
      lede: 'The PNS nerve releases ACh onto M3 on gut smooth muscle (Gq, more Ca++): motility and secretion go up.',
      steps: [[0, 'The PNS terminal fires.'], [.4, 'ACh crosses to M3 on gut smooth muscle.'], [1.2, 'M3 (Gq): more Ca++, peristalsis.']],
      tip: 'Agonists here cause the D in DUMBBELSS (diarrhea).',
      script: 'At rest the parasympathetic runs the gut. The parasympathetic terminal fires and acetylcholine crosses to M 3 on the gut smooth muscle. M 3 is G q, so calcium rises inside the muscle and peristalsis increases: more motility and more secretion. A muscarinic agonist does the same, which is the D in dumbbells, diarrhea.'},
    fight: {name: 'Fight or flight (SNS)', c: 'an', n: 2, ne: true, mot: .15,
      lede: 'NE does not act on the gut muscle. It binds α2 (Gi) on the PNS nerve ending and inhibits ACh release, so motility drops.',
      steps: [[0, 'The SNS releases NE.'], [.3, 'NE binds α2 on the PNS terminal, not on the gut.'], [.6, 'Gi: much less ACh is released.'], [1.4, 'Less M3 activation: constipation.']],
      tip: 'Must-know caveat: in the GI the α2 sits on the parasympathetic nerve ending, not on the smooth muscle.',
      script: 'In fight or flight the sympathetic releases norepinephrine, but norepinephrine does not act on the gut muscle. It binds alpha 2 on the parasympathetic nerve ending. Alpha 2 is G i, so much less acetylcholine is released, there is less M 3 activation, and motility drops: constipation. The must know caveat is that in the G I the alpha 2 sits on the parasympathetic nerve, not on the smooth muscle.'},
    clon: {name: 'Clonidine', c: 'ag', n: 2, ne: false, drugA2: 'on', mot: .15,
      lede: 'Clonidine is an α2 agonist: it activates the same inhibitory receptor, so ACh release falls and patients get constipation (and dry mouth).',
      steps: [[0, 'Clonidine occupies α2 on the PNS terminal.'], [.4, 'Less ACh is released.'], [1.4, 'Motility drops: constipation.']],
      tip: 'Clonidine ADRs follow from less sympathetic tone and this α2 inhibition: sedation, dry mouth, hypotension, bradycardia, constipation.',
      script: 'Clonidine is an alpha 2 agonist. It occupies alpha 2 on the parasympathetic nerve ending, the same inhibitory receptor norepinephrine uses, so less acetylcholine is released and motility drops. Patients get constipation, and dry mouth is one of their main complaints. The other clonidine side effects follow from less sympathetic tone: sedation, hypotension and bradycardia.'},
    phenoxy: {name: 'Phenoxybenzamine', c: 'an', n: 10, ne: true, drugA2: 'blocked', mot: 1,
      lede: 'Phenoxybenzamine blocks α2 irreversibly. NE can no longer inhibit the PNS nerve ending, so ACh is released without inhibition: GI stimulation.',
      steps: [[0, 'α2 on the PNS terminal is blocked.'], [.3, 'SNS NE arrives but cannot act on α2.'], [.6, 'ACh release is no longer inhibited.'], [1.4, 'Strong M3 activation: cramping, diarrhea.']],
      tip: 'Phenoxybenzamine ADRs: orthostatic hypotension, reflex tachycardia, GI stimulation, miosis.',
      script: 'Phenoxybenzamine is an irreversible alpha 1 and alpha 2 antagonist. With alpha 2 on the parasympathetic nerve ending blocked, sympathetic norepinephrine arrives but cannot act, so acetylcholine release is no longer inhibited. That gives strong M 3 activation: cramping and diarrhea, the G I stimulation on his side effect slide, next to orthostatic hypotension, reflex tachycardia and miosis.'},
    atro: {name: 'Atropine', c: 'an', n: 6, ne: false, m3: 'blocked', mot: .08,
      lede: 'Atropine blocks M3 on the gut. ACh is released but cannot act: constipation (anti-DUMBBELSS).',
      steps: [[0, 'The PNS releases ACh as usual.'], [.4, 'M3 is occupied by atropine.'], [1.4, 'No contraction signal: constipation.']],
      tip: 'Every muscarinic antagonist can cause constipation through this block; mirtazapine and the bladder drugs list it too.',
      script: 'Atropine blocks M 3 on the gut smooth muscle. The parasympathetic releases acetylcholine as usual, but the receptor is occupied by atropine, so there is no contraction signal and motility falls: constipation, the anti dumbbells effect. Every muscarinic antagonist can do this, and the bladder drugs and mirtazapine list constipation as well.'},
    neo: {name: 'Neostigmine', c: 'in', n: 11, ne: false, mot: 1,
      lede: 'An AChE inhibitor leaves ACh in the synapse longer, so M3 stays active: diarrhea and cramping.',
      steps: [[0, 'AChE is blocked.'], [.4, 'ACh builds up at M3.'], [1.4, 'More motility: diarrhea, cramping (DUMBBELSS).']],
      tip: 'The GI effects of the cholinesterase inhibitors (rivastigmine, donepezil) are on the ADR slide at more than 10%.',
      script: 'Neostigmine blocks acetylcholinesterase. The parasympathetic releases acetylcholine as usual, but it is not broken down, so it builds up at M 3 and the receptor stays active. Motility rises: diarrhea and cramping, the dumbbells again. For the cholinesterase inhibitors, G I effects are on the side effect slide at more than ten percent.'},
  },
};
GI.drawMode = function (m, t) {
  bg(640, 380);
  poly([[40, 30], [200, 30], [200, 92]], C('ink'), 2); txt('PNS nerve', 44, 18, {a: 'left', size: 12, w: 700, c: C('ag')});
  rr(150, 92, 120, 60, 22); ctx.fillStyle = C('nerve'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.3; ctx.stroke(); txt('PNS terminal', 210, 118, {size: 11, w: 700});
  poly([[600, 30], [430, 30], [430, 60]], C('ink'), 2); txt('SNS nerve', 596, 18, {a: 'right', size: 12, w: 700, c: C('an')});
  rr(390, 60, 90, 44, 18); ctx.fillStyle = C('nerve'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.stroke(); txt('SNS terminal', 435, 82, {size: 11, w: 700});
  const a2x = 276, a2y = 108; rr(a2x - 4, a2y - 12, 14, 24, 4); ctx.fillStyle = C('in'); ctx.fill(); txt('α2', a2x + 3, a2y - 22, {size: 11, w: 700, c: C('in')});
  if (m.drugA2 === 'on') dot(a2x + 18, a2y, 7, C('ag'), C('ink'));
  if (m.drugA2 === 'blocked') { hex(a2x + 18, a2y, 8, C('an')); poly([[a2x + 10, a2y], [a2x + 14, a2y]], C('ink'), 3); }
  if (m.ne || m.drugA2 === 'blocked') for (let i = 0; i < 3; i++) { const k = seg(t, .1 + i * .05, .8 + i * .05); const tx = m.drugA2 === 'blocked' ? a2x + 34 : a2x + 12; dot(lerp(400, tx, k), lerp(104, a2y + (i - 1) * 9, k), 4.5, C('an'), C('ink')); }
  if ((m.ne && m.drugA2 !== 'blocked') || m.drugA2 === 'on') txt('α2 active: less ACh released', 210, 168, {size: 12, w: 700, c: C('an')});
  if (m.drugA2 === 'blocked') txt('α2 blocked: ACh released without inhibition', 210, 168, {size: 12, w: 700, c: C('ag')});
  const M3X = [140, 210, 280]; M3X.forEach((x) => { rr(x - 8, 252, 16, 20, 4); ctx.fillStyle = C('rec'); ctx.fill(); txt('M3', x, 244, {size: 10, w: 700, c: C('muted')}); if (m.m3 === 'blocked') hex(x, 248, 8, C('an')); });
  for (let i = 0; i < m.n; i++) {
    const k = seg(t, .4 + i * .03, 1.2 + i * .03); if (t < .4) continue;
    const tx = M3X[i % 3] + ((i / 3 | 0) % 3 - 1) * 9, ty = m.m3 === 'blocked' ? 228 : 246;
    const fade = m === GI.modes.neo ? 1 : 1 - seg(t, 2.6, 3.2);
    ctx.globalAlpha = fade; dot(lerp(200 + (i % 4) * 8, tx, k), lerp(156, ty, k), 4.5, C('ag'), C('ink')); ctx.globalAlpha = 1;
  }
  const act = m.mot * (seg(t, 1.2, 1.6) * (m === GI.modes.neo ? 1 : 1 - .5 * seg(t, 2.8, 3.6)) * .7 + .3);
  gut(t, act);
};
Object.values(GI.modes).forEach((m) => { m.L = 4; m.draw = (t) => GI.drawMode(m, t); });

/* ---------------- Antimuscarinics by site ---------------- */
const SITES2 = {brain: [320, 58, 'Brain M1', 'sedation, confusion', 'L'], eye: [342, 80, 'Eye M3', 'mydriasis, blurred vision', 'R'], saliva: [304, 106, 'Salivary M3', 'dry mouth', 'L'], heart: [334, 186, 'Heart M2', 'tachycardia', 'R'], lungs: [290, 168, 'Airway M3', 'bronchial dilation', 'L'], gut: [320, 240, 'Gut M3', 'constipation', 'R'], bladder: [320, 296, 'Bladder M3', 'less urgency, frequency, leakage', 'L']};
const SITE_ORDER = ['brain', 'eye', 'saliva', 'lungs', 'heart', 'gut', 'bladder'];
const SITE = {
  key: 'site', title: 'Antimuscarinics by site', short: 'Antimuscarinic sites', W: 640, H: 380,
  label: 'Animated body map showing where each muscarinic antagonist acts',
  cite: 'PCOL-Cholinergic-26s.pdf slides 17–20, 24–30, 32; transcripts 10/5, 10/6; polls PE2-026, PE2-027, PE2-028',
  modes: {
    atro: {name: 'Atropine', c: 'an', hit: {brain: 1, eye: 1, saliva: 1, lungs: 1, heart: 1, gut: 1, bladder: 1}, lede: 'Non-selective, reversible block of M1, M2 and M3 everywhere: the full anti-DUMBBELSS list.', tip: 'Uses: muscarinic agonist overdose (bradycardia, AV block), organophosphate poisoning; his poll for severe bradycardia keys atropine.',
      script: 'Atropine is a natural alkaloid and a non selective, reversible antagonist at M 1, M 2 and M 3. Given systemically it reaches every site: the brain, sedation and confusion; the eye, mydriasis; the salivary glands, dry mouth; the airway, bronchial dilation; the heart, tachycardia; the gut, constipation; the bladder, less urination. That is the full anti dumbbells list.'},
    scop: {name: 'Scopolamine', c: 'an', hit: {brain: 1, eye: .5, saliva: .9, lungs: .4, heart: .4, gut: .6, bladder: .4}, lede: 'Penetrates the CNS more rapidly than atropine; also blocks histamine and serotonin receptors. Used for motion sickness.', tip: 'ADRs on the slide: drowsiness, euphoria, amnesia, plus the anti-DUMBBELSS effects.',
      script: 'Scopolamine is the second natural alkaloid. Like atropine it is a non selective, reversible muscarinic antagonist, and it also blocks histamine and serotonin receptors. It penetrates the central nervous system more rapidly, which is why it is used for motion sickness. Its side effects are drowsiness, euphoria and amnesia, with the anti dumbbells effects at the other sites.'},
    benz: {name: 'Benztropine', c: 'an', hit: {brain: 1, eye: .3, saliva: .3, lungs: .2, heart: .2, gut: .3, bladder: .2}, lede: 'An atropine analog more selective for brain M1: an adjunct to L-dopa for tremor and rigidity in Parkinson disease.', tip: 'The "trop" in the name marks it as an atropine-like antagonist.',
      script: 'Benztropine is an atropine analog. It is a muscarinic antagonist more selective for M 1 in the brain, so it is used as an adjunct to L dopa for the tremor and rigidity of Parkinson disease, with fewer anti dumbbells effects elsewhere. The trop in its name marks it as an atropine like antagonist, like tropicamide, ipratropium, tiotropium and trospium.'},
    tropic: {name: 'Tropicamide', c: 'an', hit: {eye: 1}, lede: 'Eye drops that block M3 on the circular muscle of the iris, so the sympathetic α1 dilator is unopposed: mydriasis for an eye examination.', tip: 'The SNS (α1) dilates the pupil; the PNS (M3) constricts it. Block M3 and the pupil dilates.',
      script: 'Tropicamide is given as eye drops. It blocks M 3 on the circular muscle of the iris. M 3 is G q and constricts the pupil, so with it blocked the sympathetic alpha 1 dilator muscle is unopposed and the pupil dilates: mydriasis for an eye examination. The sympathetic dilates the pupil, the parasympathetic constricts it.'},
    ipra: {name: 'Ipratropium', c: 'an', hit: {lungs: 1, heart: .25, saliva: .3}, lede: 'Inhaled, with very low bioavailability, so it stays in the lungs: blocks airway M3, bronchial dilation. Short-acting (SAMA), 3 to 4 times a day.', tip: 'The lungs are PNS only, with M3 on the bronchial smooth muscle, so blocking M3 opens the airway.',
      script: 'Ipratropium is inhaled and has very low bioavailability, so it stays in the lungs. The lungs are parasympathetic only, with M 3 on the bronchial smooth muscle. M 3 is G q and constricts, so blocking it gives bronchial dilation. It is short acting, three to four times a day. On the slide it blocks M 1, M 2 and M 3, but it rarely gets systemic.'},
    tio: {name: 'Tiotropium', c: 'an', hit: {lungs: 1, saliva: .2}, lede: 'Long-acting (LAMA), once a day; the slide lists M1 and M3. Very low bioavailability keeps it in the lungs, so heart M2 is rarely reached.', tip: 'Aclidinium and umeclidinium are also inhaled, with high M3 affinity and slow dissociation.',
      script: 'Tiotropium is the long acting inhaled antimuscarinic, once a day. The slide lists M 1 and M 3. Like ipratropium it has very low bioavailability, so it stays in the lungs and blocks the airway M 3: bronchial dilation. The heart M 2 is rarely reached because the drug does not get systemic. Aclidinium and umeclidinium are also inhaled, with high M 3 affinity and slow dissociation.'},
    oxy: {name: 'Oxybutynin', c: 'an', hit: {bladder: 1, brain: .6, saliva: .7, gut: .5, eye: .3}, lede: 'The oldest, cheapest and least selective bladder drug (M1 and M3): it relaxes the bladder and also reaches brain M1, giving drowsiness and confusion.', tip: 'Only oxybutynin, trospium and solifenacin from this group are on the exam.',
      script: 'Oxybutynin is the oldest, cheapest and least selective of the bladder drugs. It blocks M 3 in the bladder, which relaxes the bladder and lowers urgency, frequency and leakage, but it also blocks M 1 in the brain, so it causes drowsiness, dizziness and confusion, along with dry mouth and constipation. He ranks it at the top for anti dumbbells side effects.'},
    soli: {name: 'Solifenacin', c: 'an', hit: {bladder: 1, saliva: .3, gut: .3}, lede: 'The most M3-selective of the exam bladder drugs: less urgency with the fewest anti-DUMBBELSS effects at therapeutic doses.', tip: 'Mirabegron (a β3 agonist) relaxes the bladder with no anti-DUMBBELSS effects at all.',
      script: 'Solifenacin is the newer, more expensive bladder drug and the most selective for M 3. It relaxes the bladder and lowers urgency with the fewest anti dumbbells effects at therapeutic doses. He put it at the bottom of his ranking, but all of these drugs are dose dependent: a large enough dose of solifenacin gives all of the anti dumbbells effects.'},
    tros: {name: 'Trospium', c: 'an', hit: {bladder: 1, saliva: .4, gut: .4}, lede: 'An atropine-like antagonist ("trop") used for overactive bladder: it relaxes the bladder, so urination decreases.', tip: 'His poll: trospium is most likely to decrease urination.',
      script: 'Trospium has trop in its name, so it is an atropine like muscarinic antagonist. It is used for overactive bladder: it blocks M 3 in the bladder, relaxes the bladder and lowers urgency, frequency and leakage. On his poll, trospium is most likely to decrease urination. Like every muscarinic antagonist it can cause dry mouth and constipation.'},
  },
};
Object.values(SITE.modes).forEach((m) => {
  m.L = 4.5;
  m.steps = [[0, 'The drug is given.'], [.5, 'It reaches the sites it can get to.'], [1.8, 'Each blocked site shows its anti-DUMBBELSS effect.']];
  m.draw = (t) => {
    bg(640, 380);
    dot(320, 70, 44, C('chip'), C('line')); rr(250, 122, 140, 200, 46); ctx.fillStyle = C('chip'); ctx.fill(); ctx.strokeStyle = C('line'); ctx.lineWidth = 1; ctx.stroke();
    let li = 0, ri = 0;
    SITE_ORDER.forEach((k, idx) => {
      const [x, y, lab, eff, side] = SITES2[k]; const h = (m.hit[k] || 0) * seg(t, 1.2 + idx * .08, 1.8 + idx * .08);
      glow(x, y, 20, C('an'), h * .55); dot(x, y, 6, h > .3 ? C('an') : C('muted'));
      const ly = side === 'L' ? 60 + (li++) * 72 : 80 + (ri++) * 90; const lx = side === 'L' ? 196 : 444;
      poly([[x, y], [lx + (side === 'L' ? 6 : -6), ly]], C('line'), 1);
      txt(lab, lx, ly - 8, {a: side === 'L' ? 'right' : 'left', size: 12, w: 700, c: h > .3 ? C('ink') : C('muted')});
      txt(h > .3 ? eff : 'little effect', lx, ly + 9, {a: side === 'L' ? 'right' : 'left', size: 11, c: h > .3 ? C('an') : C('muted')});
    });
    for (let i = 0; i < 10; i++) { const k = seg(t, .3 + i * .06, 1.4 + i * .06); if (k <= 0 || k >= 1) continue; const keys = SITE_ORDER.filter((s) => (m.hit[s] || 0) > .3); const tg = SITES2[keys[i % keys.length]]; dot(lerp(320, tg[0], k), lerp(360, tg[1], k), 4, C('an')); }
    txt(m.name, 320, 372, {size: 12, w: 700, c: C('an')});
  };
});

/* ---------------- Nitric oxide / PDE ---------------- */
const NO = {
  key: 'no', title: 'Nitric oxide and PDE', short: 'NO / PDE', W: 640, H: 380,
  label: 'Animated nitric oxide pathway from endothelium to smooth muscle, with nitrates and PDE inhibitors',
  cite: 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 62–74; Autonomic Nervous System.pdf slide 4; PCOL-Cholinergic slide 15; transcript 10/7; poll PE2-043',
  modes: {
    base: {name: 'Baseline', c: 'ink', lv: .2, lede: 'The endothelium makes a little NO; PDE keeps cGMP low. Vessel tone is set mostly by α1, the predominant tone.', steps: [[0, 'A little NO from the endothelium.'], [1, 'sGC makes some cGMP in the smooth muscle.'], [2, 'PDE breaks cGMP down.']], tip: 'The M3 receptors here sit on the endothelium and are not innervated: they matter only when a drug or ACh reaches them.',
      script: 'At baseline the endothelium makes a little nitric oxide. It diffuses into the vascular smooth muscle, where soluble guanylate cyclase makes some cyclic G M P, and P D E breaks the cyclic G M P down, so the level stays low. The vessel tone is set mostly by alpha 1, the predominant sympathetic tone. The M 3 receptors on the endothelium are not innervated.'},
    m3: {name: 'M3 agonist on endothelium', c: 'ag', lv: .62, m3: true, lede: 'An M3 agonist (or IV ACh) activates endothelial M3: Gq, more Ca++, NOS makes NO, NO diffuses into the smooth muscle, sGC makes cGMP, vasodilation.', steps: [[0, 'The agonist binds endothelial M3 (Gq).'], [.6, 'Ca++ activates NOS: L-arginine to NO.'], [1.2, 'NO diffuses into the smooth muscle.'], [1.8, 'sGC makes cGMP: vasodilation, BP falls.']], tip: 'This is why muscarinic agonists can cause hypotension, and why IV ACh lowers BP (then reflex tachycardia).',
      script: 'A muscarinic agonist, or I V acetylcholine, binds M 3 on the endothelium. M 3 is G q, so calcium rises in the endothelial cell and activates nitric oxide synthase, which makes nitric oxide from L arginine. Nitric oxide diffuses into the smooth muscle, soluble guanylate cyclase makes cyclic G M P, and the vessel dilates: blood pressure falls. That is the hypotension of the muscarinic agonists.'},
    nitr: {name: 'Nitroglycerin', c: 'no', lv: .66, nitrate: true, lede: 'Nitrates are NO donors: they release NO straight into the smooth muscle, without the endothelium or NOS.', steps: [[0, 'The nitrate reaches the vessel.'], [.6, 'It gives off NO directly.'], [1.4, 'cGMP rises: vasodilation.']], tip: 'Nitroglycerin, nitroprusside and isosorbide dinitrate are the NO donors on his slide. Headache is a common ADR of vasodilators.',
      script: 'Nitroglycerin is a nitric oxide donor. It reaches the vessel and gives off nitric oxide directly into the smooth muscle, without the endothelium, M 3 or nitric oxide synthase. Soluble guanylate cyclase makes cyclic G M P, cyclic G M P rises and the vessel dilates. Nitroprusside and isosorbide dinitrate work the same way; headache is a common side effect of vasodilators.'},
    sild: {name: 'Sildenafil', c: 'in', lv: .44, pde: true, lede: 'PDE inhibitors stop the breakdown of cGMP, so the cGMP that is made lasts longer and the vessel relaxes more: NO becomes more potent.', steps: [[0, 'PDE is blocked.'], [.8, 'cGMP builds up from the normal NO.'], [1.8, 'More vasodilation.']], tip: 'His question: a drug that blocks PDE increases the potency of NO. Tadalafil works the same way.',
      script: 'Sildenafil blocks P D E, the enzyme that breaks down cyclic G M P. The endothelium still makes its normal nitric oxide, but the cyclic G M P that is made now lasts longer, so it builds up and the vessel relaxes more. His words: a drug that blocks P D E increases the potency of nitric oxide. Tadalafil works the same way.'},
    combo: {name: 'Nitrate + sildenafil', c: 'an', lv: 1, nitrate: true, pde: true, lede: 'Must-know drug interaction: the nitrate adds NO while nothing breaks cGMP down. cGMP keeps rising and there is marked hypotension.', steps: [[0, 'The nitrate releases NO.'], [.6, 'PDE is blocked, so cGMP is not cleared.'], [1.4, 'cGMP keeps climbing.'], [2.2, 'Marked hypotension: never combine them.']], tip: 'He wants the reason on the exam: more cGMP is made and none is broken down.',
      script: 'The must know drug interaction. The nitrate releases nitric oxide into the smooth muscle, so more cyclic G M P is made. Sildenafil blocks P D E, so none of that cyclic G M P is broken down. Cyclic G M P keeps climbing, the vessels dilate too far and there is marked hypotension. His poll: the drug that causes marked hypotension with nitroglycerin is sildenafil. Never combine them.'},
  },
};
Object.values(NO.modes).forEach((m) => {
  m.L = 5;
  m.draw = (t) => {
    bg(640, 380);
    const lv = lerp(.2, m.lv, seg(t, .5, 2.6));
    rr(20, 24, 450, 44, 10); ctx.fillStyle = C('vessel'); ctx.fill(); txt('blood (lumen)', 34, 46, {a: 'left', size: 11, c: C('muted')});
    for (let x = 20; x < 470; x += 75) { rr(x + 2, 74, 71, 34, 8); ctx.fillStyle = C('nerve'); ctx.fill(); ctx.strokeStyle = C('line'); ctx.lineWidth = 1; ctx.stroke(); }
    txt('endothelium', 34, 91, {a: 'left', size: 11, w: 700, c: C('muted')});
    rr(20, 116, 450, 200, 12); ctx.fillStyle = C('muscle'); ctx.fill(); txt('vascular smooth muscle', 34, 134, {a: 'left', size: 11, w: 700, c: C('muted')});
    rr(214, 66, 18, 16, 4); ctx.fillStyle = C('rec'); ctx.fill(); txt('M3', 223, 58, {size: 10, w: 700, c: C('muted')});
    if (m.m3) { const k = seg(t, 0, .6); dot(223, lerp(30, 58, k), 6, C('ag'), C('ink')); if (t > .6) txt('Ca++ → NOS: L-arginine → NO', 300, 91, {size: 11, w: 700, c: C('ag'), alpha: seg(t, .6, .9)}); }
    const noRate = m.m3 ? 10 : m.nitrate ? 0 : 3;
    for (let i = 0; i < noRate; i++) { const u = ((t * .5 + i / noRate) % 1); const x = 60 + rnd(i, 4) * 380; dot(x, lerp(96, 200, u), 3.5, C('in')); }
    if (m.nitrate) for (let i = 0; i < 12; i++) { const u = ((t * .45 + i / 12) % 1); const x = 50 + rnd(i, 7) * 400; dot(x, lerp(40, 210, u), 4, C('no')); }
    txt(m.nitrate ? 'NO from the nitrate' : 'NO', 450, 104, {a: 'right', size: 11, w: 700, c: m.nitrate ? C('no') : C('in')});
    const n = Math.round(lv * 30);
    for (let i = 0; i < n; i++) { dot(50 + rnd(i, 9) * 380 + Math.sin(t * 2 + i) * 3, 170 + rnd(i, 11) * 120, 4, C('ag')); }
    txt('cGMP', 450, 300, {a: 'right', size: 12, w: 700, c: C('ag')});
    [[130, 270], [340, 250]].forEach(([x, y]) => { dot(x, y, 14, C('panel'), C('muted')); txt('PDE', x, y, {size: 10, w: 700, c: C('muted')}); if (m.pde) cross(x, y, 10, C('an')); });
    const r = 26 + 34 * lv; dot(560, 150, r + 12, C('muscle'), C('ink')); dot(560, 150, r, C('vessel'), C('ink')); txt('vessel', 560, 150, {size: 11, w: 700});
    txt(lv > .8 ? 'very dilated' : lv > .5 ? 'dilated' : 'normal tone', 560, 150 + r + 26, {size: 12, w: 700, c: lv > .5 ? C('ag') : C('ink')});
    meter(500, 330, 120, 12, 1 - lv * .75, lv > .85 ? C('an') : C('ink'), 'BP');
    if (m === NO.modes.combo && t > 2.2) txt('marked hypotension', 560, 356, {size: 13, w: 700, c: C('an'), alpha: .6 + .4 * Math.sin(t * 8)});
  };
});

/* ---------------- Varenicline partial agonist ---------------- */
const VAR = {
  key: 'var', title: 'Varenicline: a partial agonist', short: 'Varenicline', W: 640, H: 380,
  label: 'Animated α4β2 nicotinic receptor with nicotine, withdrawal and varenicline',
  cite: 'PCOL-NMJ_PCOL_2026s_pptx.pdf slides 6–9; transcripts 10/1, 10/5, 10/6; poll PE2-016',
  modes: {
    nic: {name: 'Nicotine (smoking)', c: 'na', lede: 'Nicotine is a full agonist at the brain α4β2 Nn receptor: the channel opens fully and Na+ enters.', target: 1, lig: 'nic',
      script: 'Nicotine is a full agonist at the alpha 4 beta 2 nicotinic neuronal receptor in the brain. It approaches the pentamer, binds the two sites, and the channel opens fully, so sodium enters and the receptor gives its full activation. That is the receptor varenicline competes with nicotine for.'},
    wd: {name: 'Withdrawal', c: 'an', lede: 'No nicotine: the receptor sits idle, and craving and withdrawal set in.', target: .08, lig: null,
      script: 'In withdrawal there is no nicotine. The alpha 4 beta 2 receptor sits idle, the channel stays shut and there is little activation. Craving and the withdrawal syndrome set in. On his slide, varenicline is the drug that decreases craving and withdrawal.'},
    var: {name: 'Varenicline alone', c: 'ag', lede: 'Varenicline is a high-affinity partial agonist at α4β2: it opens the channel partway, enough to decrease craving and withdrawal.', target: .45, lig: 'var',
      script: 'Varenicline is a high affinity partial agonist at the alpha 4 beta 2 nicotinic neuronal receptor. It binds the two sites and opens the channel partway, so the receptor gives a partial activation, enough to decrease craving and withdrawal. His must know: partial agonist, alpha 4 beta 2, N n, in the brain.'},
    both: {name: 'Varenicline + smoking', c: 'ag', lede: 'Varenicline already holds the sites with high affinity. Nicotine cannot get on, so smoking gives only the partial effect: the nicotine effect is blunted.', target: .45, lig: 'var', smoke: true,
      script: 'With varenicline on board, its high affinity keeps both binding sites occupied. Nicotine arrives from a cigarette but cannot displace varenicline, so it competes and loses. Smoking gives only the partial activation varenicline already provides: the nicotine effect is blunted. On his poll every statement about varenicline was correct.'},
  },
};
Object.values(VAR.modes).forEach((m) => {
  m.L = 5;
  m.steps = m.smoke ? [[0, 'Varenicline occupies both binding sites.'], [1.2, 'Nicotine arrives from a cigarette.'], [2.0, 'It cannot displace varenicline.'], [2.6, 'Activation stays at the partial level.']] : [[0, m.lig ? 'The ligand approaches the α4/β2 receptor.' : 'No ligand.'], [.9, m.lig ? 'It binds the two sites.' : 'The channel stays shut.'], [1.4, m.target > .9 ? 'Full opening: full activation.' : m.target > .3 ? 'Partial opening: partial activation.' : 'Little activation: craving.']];
  m.tip = 'Must know: varenicline is a partial agonist at α4/β2 Nn in the brain. ADRs: nausea, headache, insomnia (take it in the morning), depression, flatulence. Its use is not asked directly.';
  m.draw = (t) => {
    bg(640, 380);
    const cx = 220, cy = 190; const act = m.target * seg(t, .9, 1.6);
    const level = m.smoke ? m.target : act;
    glow(cx, cy, 52, C('ag'), level * .35);
    const subs = ['α4', 'β2', 'α4', 'β2', 'β2'];
    subs.forEach((s, i) => { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; dot(cx + Math.cos(a) * 54, cy + Math.sin(a) * 54, 28, C('chip'), C('ink')); txt(s, cx + Math.cos(a) * 54, cy + Math.sin(a) * 54, {size: 12, w: 700}); });
    dot(cx, cy, 10 + 12 * level, C('panel'), C('ink'));
    const sites = [[cx - 46, cy - 44], [cx + 46, cy + 12]];
    sites.forEach(([x, y]) => {
      if (m.lig === 'nic') { const k = seg(t, .3, 1.0); dot(lerp(x - 120, x, k), lerp(y - 90, y, k), 8, C('na'), C('ink')); }
      if (m.lig === 'var') { const k = m.smoke ? 1 : seg(t, .3, 1.0); rr(lerp(x - 120, x, k) - 8, lerp(y - 90, y, k) - 8, 16, 16, 4); ctx.fillStyle = C('ag'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1; ctx.stroke(); }
      if (m.smoke) { const k = seg(t, 1.2, 2.0), back = seg(t, 2.0, 2.8); const px = lerp(x - 130, x - 16, k) - back * 60, py = lerp(y - 100, y - 14, k) - back * 50; dot(px, py, 8, C('na'), C('ink')); }
    });
    for (let i = 0; i < Math.round(level * 8); i++) { const yy = cy - 70 + ((t * 70 + i * 18) % 140); txt('Na+', cx + (i % 2 ? 8 : -8), yy, {size: 10, w: 700, c: C('na'), alpha: .9}); }
    vmeter(470, 70, 60, 220, level, level > .8 ? C('na') : level > .3 ? C('ag') : C('an'), 'Receptor activation');
    txt(level > .8 ? 'full activation' : level > .3 ? 'partial: craving decreased' : 'craving', 500, 330, {size: 12, w: 700, c: C('muted')});
    dot(60, 352, 7, C('na'), C('ink')); txt('nicotine (full agonist)', 72, 352, {a: 'left', size: 11, c: C('muted')});
    rr(220, 345, 14, 14, 3); ctx.fillStyle = C('ag'); ctx.fill(); txt('varenicline (partial agonist)', 240, 352, {a: 'left', size: 11, c: C('muted')});
  };
});

/* ---------------- Organophosphate + 2-PAM ---------------- */
const OP = {
  key: 'op', title: 'Organophosphates and 2-PAM', short: 'Organophosphates', W: 640, H: 380,
  label: 'Animated acetylcholinesterase with organophosphate binding, pralidoxime and atropine',
  cite: 'PCOL-NMJ_PCOL_2026s_pptx.pdf slides 33–36, 42–45; PCOL-Cholinergic-26s.pdf slides 20–23; transcript 10/5',
  modes: {
    normal: {name: 'Normal AChE', c: 'in', lede: 'AChE takes ACh into its active site and splits it into choline and acetate, keeping ACh levels low.', steps: [[0, 'ACh enters the active site.'], [.6, 'AChE splits it.'], [1, 'Choline and acetate leave; the enzyme repeats this quickly.']], tip: 'AChE inhibitors are indirect: they raise ACh wherever it is released.',
      script: 'Normal acetylcholinesterase. Acetylcholine enters the active site of the enzyme, the enzyme splits it into choline and acetate, and the products leave. The enzyme repeats this quickly, so acetylcholine acts only briefly and its level in the synapse stays low. The drugs that inhibit this enzyme are indirect: they raise acetylcholine wherever it is released.'},
    op: {name: 'Organophosphate', c: 'an', lede: 'Organophosphates (insecticides such as malathion and parathion; nerve gases such as sarin) form a covalent bond with AChE. The block is irreversible and ACh rises everywhere: massive DUMBBELSS plus ganglia, NMJ and CNS effects.', steps: [[0, 'The organophosphate reaches AChE.'], [.8, 'A covalent bond: the enzyme is blocked irreversibly.'], [1.4, 'ACh rises in every synapse.'], [2.5, 'The bond is very stable; pralidoxime can still break it within about an hour of exposure.']], tip: 'Toxicity: DUMBBELSS, SNS ganglia (tachycardia, hypertension), NMJ (cramps, weakness, respiratory paralysis), CNS (agitation, confusion, seizures).',
      script: 'An organophosphate, an insecticide such as malathion or parathion or a nerve gas such as sarin, reaches acetylcholinesterase and forms a covalent bond with the active site. The bond is very stable and slow, so the block is irreversible and acetylcholine rises in every synapse: massive dumbbells, plus effects at the sympathetic ganglia, the neuromuscular junction and the brain. Pralidoxime can still break the bond within about an hour.'},
    early: {name: '2-PAM early', c: 'in', lede: 'Pralidoxime (2-PAM) given within about an hour dephosphorylates AChE: it removes the organophosphate and the enzyme works again.', steps: [[0, 'The organophosphate is bound.'], [1, '2-PAM reaches the bond.'], [2, 'It breaks the bond; both leave.'], [3, 'AChE clears ACh again.']], tip: 'The order he gave: 2-PAM first, within about an hour, then atropine to manage the DUMBBELSS.',
      script: 'Pralidoxime, two P A M, is the cholinesterase reactivator. Given within about an hour of exposure, it reaches the bond between the organophosphate and the enzyme and dephosphorylates the enzyme: the organophosphate comes off and acetylcholinesterase works again, so acetylcholine falls. His order: pralidoxime first, within about an hour, then atropine to manage the dumbbells.'},
    late: {name: '2-PAM too late', c: 'an', lede: 'After the window of about an hour, 2-PAM no longer frees the enzyme. Atropine is then used to manage the DUMBBELSS.', steps: [[0, 'The bond has been in place for more than an hour.'], [1, '2-PAM arrives.'], [1.8, 'It no longer breaks the bond.'], [2.6, 'ACh stays high.']], tip: 'The covalent bond is what makes the organophosphate irreversible; only within the window can 2-PAM reverse it.',
      script: 'Pralidoxime given too late. The organophosphate has been bound to the enzyme for more than about an hour. Pralidoxime arrives at the bond but no longer breaks it, so the enzyme stays blocked and acetylcholine stays high. The covalent bond is what makes the organophosphate irreversible; outside the window, atropine is used to manage the dumbbells.'},
    atro: {name: '+ Atropine', c: 'an', lede: 'Atropine blocks the muscarinic receptors downstream, so the DUMBBELSS eases. It does not free the enzyme and does not help the NMJ.', steps: [[0, 'AChE still blocked, ACh high.'], [1, 'Atropine occupies M1, M2 and M3.'], [2, 'DUMBBELSS falls; the enzyme is still blocked.']], tip: 'Echothiophate is an organophosphate too, used as an eye drop for glaucoma (miosis, blurred vision as ADRs).',
      script: 'Atropine added. The enzyme is still blocked and acetylcholine is still high, but atropine occupies M 1, M 2 and M 3 downstream, so the muscarinic effects, the dumbbells, ease. Atropine does not free the enzyme and does not help the nicotinic effects at the neuromuscular junction. Echothiophate is an organophosphate too, used as an eye drop for glaucoma.'},
  },
};
Object.values(OP.modes).forEach((m) => {
  m.L = 5;
  m.draw = (t) => {
    bg(640, 380);
    const ex = 210, ey = 220;
    ctx.beginPath(); ctx.ellipse(ex, ey, 130, 82, 0, 0, Math.PI * 2); ctx.fillStyle = C('in'); ctx.globalAlpha = .16; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = C('in'); ctx.lineWidth = 2; ctx.stroke();
    dot(ex, ey - 74, 18, C('panel'), C('in')); txt('AChE', ex, ey + 10, {size: 15, w: 700, c: C('in')}); txt('active site', ex + 26, ey - 96, {a: 'left', size: 11, c: C('muted')});
    const opOn = m !== OP.modes.normal; let opFree = false;
    let aging = m === OP.modes.normal ? 0 : m === OP.modes.late ? 1 : m === OP.modes.early ? .15 + .1 * seg(t, 0, 1) : seg(t, 1, 4.8);
    if (m === OP.modes.normal) {
      for (let i = 0; i < 3; i++) { const ph = ((t * .9 + i / 3) % 1); if (ph < .5) { const k = seg(ph, 0, .5); dot(lerp(40, ex, k), lerp(70, ey - 74, k), 6, C('ag'), C('ink')); } else { const k = seg(ph, .5, 1); dot(lerp(ex, 380, k), lerp(ey - 74, 80, k), 3.5, C('muted')); dot(lerp(ex, 370, k), lerp(ey - 74, 110, k), 3.5, C('muted')); } }
    }
    if (opOn) {
      let ox = ex, oy = ey - 74;
      if (m === OP.modes.op) { const k = seg(t, .2, .8); ox = lerp(40, ex, k); oy = lerp(40, ey - 74, k); }
      if (m === OP.modes.early) { const k = seg(t, 2.0, 2.8); ox = lerp(ex, ex - 110, k); oy = lerp(ey - 74, 46, k); opFree = k > .1; }
      ctx.beginPath(); ctx.moveTo(ox, oy - 11); ctx.lineTo(ox + 11, oy + 8); ctx.lineTo(ox - 11, oy + 8); ctx.closePath(); ctx.fillStyle = C('an'); ctx.fill();
      if (!opFree && (m !== OP.modes.op || t > .8)) poly([[ox, oy + 8], [ex, ey - 56]], C('an'), 4);
      txt('organophosphate', ox, oy - 22, {size: 11, w: 700, c: C('an')});
      if (m === OP.modes.early || m === OP.modes.late) {
        const k = seg(t, 1.0, 1.8); let px = lerp(420, ex + 26, k), py = lerp(60, ey - 80, k);
        if (m === OP.modes.early && t > 2) { const k2 = seg(t, 2.0, 2.8); px = lerp(ex + 26, ex - 84, k2); py = lerp(ey - 80, 56, k2); }
        if (m === OP.modes.late && t > 1.8) { const k2 = seg(t, 1.8, 2.6); px = lerp(ex + 26, 470, k2); py = lerp(ey - 80, 40, k2); }
        dot(px, py, 9, C('in'), C('ink')); txt('2-PAM', px + 14, py, {a: 'left', size: 11, w: 700, c: C('in')});
        if (m === OP.modes.late && t > 1.8 && t < 3) txt('past the window: the bond stays', ex + 60, ey - 120, {size: 12, w: 700, c: C('an')});
      }
    }
    meter(40, 342, 300, 12, aging, aging > .9 ? C('an') : C('na'), ''); txt(opOn ? (aging > .95 ? 'More than an hour since exposure' : 'Time since exposure (2-PAM window about 1 h)') : 'No inhibitor', 40, 328, {a: 'left', size: 12, w: 700, c: C('muted')});
    const working = m === OP.modes.normal || (m === OP.modes.early && t > 2.8);
    const ach = working ? (m === OP.modes.early ? lerp(.95, .2, seg(t, 2.8, 4)) : .2) : (m === OP.modes.op ? lerp(.2, 1, seg(t, .9, 2.4)) : 1);
    vmeter(420, 110, 46, 170, ach, ach > .6 ? C('an') : C('ag'), 'ACh level');
    const atro = m === OP.modes.atro && t > 1;
    txt('Muscarinic receptors', 560, 112, {size: 12, w: 700});
    [150, 190, 230].forEach((y, i) => { rr(530, y - 12, 18, 24, 4); ctx.fillStyle = C('rec'); ctx.fill(); txt(['M1', 'M2', 'M3'][i], 520, y, {a: 'right', size: 11, w: 700, c: C('muted')}); if (atro) hex(560, y, 9, C('an')); else if (ach > .6) glow(560, y, 12, C('ag'), .6); });
    const dumb = atro ? .2 : ach;
    meter(520, 290, 100, 12, dumb, dumb > .6 ? C('an') : C('ag'), ''); txt('DUMBBELSS', 570, 276, {size: 11, w: 700, c: C('muted')});
  };
});

/* ---------------- Adrenergic synapse ---------------- */
const ADR = {
  key: 'adr', title: 'The adrenergic synapse', short: 'NE synapse', W: 640, H: 380,
  label: 'Animated norepinephrine synapse with release, receptors, reuptake by NET and breakdown by MAO',
  cite: 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 8–15, 17, 21–36; transcripts 10/6, 10/7; polls PE2-035, PE2-037, PE2-038, PE2-039',
  modes: {
    none: {name: 'No drug', c: 'ink', n: 6, a1: .5, b1: .5, lede: 'NE is released, binds α1 and β1 on the effector and α2 on the terminal (inhibitory), then NET pumps it back and MAO breaks some down.', steps: [[0, 'The vesicle moves to the membrane.'], [.6, 'NE is released into the synapse.'], [1.4, 'NE binds α1 and β1 (response) and α2 (less release).'], [2.6, 'NET pumps NE back in; MAO breaks some down.']], tip: 'Each step is a drug target: release, the receptors, reuptake (NET), breakdown (MAO, COMT).',
      script: 'The sympathetic nerve terminal makes norepinephrine from tyrosine and stores it in vesicles. A vesicle moves to the membrane and norepinephrine is released into the synapse. It binds alpha 1 and beta 1 on the effector cell, the response, and alpha 2 on the terminal, which is G i and lowers further release. Then the N E T transporter pumps it back in and M A O breaks some of it down.'},
    coc: {name: 'Cocaine', c: 'in', n: 6, a1: .85, b1: .85, net: 'blocked', lede: 'Cocaine blocks NET, so NE stays in the synapse and keeps acting on the receptors: more HR, more BP, vasoconstriction.', steps: [[0, 'NET is blocked.'], [.6, 'Normal NE release.'], [1.4, 'NE binds as usual.'], [2.6, 'No reuptake: NE stays and keeps acting.']], tip: 'His poll: the drug that increases the potency of NE by blocking NET is cocaine. Nosebleeds come from the same vasoconstriction.',
      script: 'Cocaine is an indirect drug: it blocks the N E T transporter completely. Norepinephrine is released as usual and binds alpha 1 and beta 1 as usual, but there is no reuptake, so it stays in the synapse and keeps acting. The potency of norepinephrine rises: more heart rate, more blood pressure and vasoconstriction, the vasoconstriction behind the nosebleeds.'},
    amph: {name: 'Amphetamine', c: 'in', n: 10, a1: .9, b1: .9, net: 'slow', lede: 'Amphetamines push NE (and dopamine and serotonin) out of the terminal directly; their reuptake and MAO block is weaker, a secondary action.', steps: [[0, 'Amphetamine enters the terminal.'], [.4, 'It releases extra NE.'], [1.4, 'More receptors are activated.'], [2.6, 'Reuptake is slowed too (secondary).']], tip: 'Drug interaction from lecture: caffeine adds to the stimulation.',
      script: 'Amphetamine is a releasing agent. It enters the terminal and pushes extra norepinephrine, and also dopamine and serotonin, out into the synapse, so more alpha 1 and beta 1 receptors are activated. Its block of reuptake and of M A O is weaker, a secondary action. On his poll, cocaine, not amphetamine, is the drug that blocks N E T; caffeine adds to the stimulation of amphetamine.'},
    maoi: {name: 'Phenelzine (MAOI)', c: 'in', n: 9, a1: .8, b1: .8, mao: 'blocked', lede: 'MAO is blocked irreversibly, so recycled NE is not broken down. The vesicles hold more and each signal releases more NE.', steps: [[0, 'MAO-A and MAO-B blocked (irreversibly).'], [.6, 'Fuller vesicles release more NE.'], [1.4, 'A stronger response.'], [2.6, 'Recycled NE is not broken down.']], tip: 'Tyramine in aged cheese and wine with phenelzine: hypertensive crisis. Selegiline (MAO-B selective at low doses) has no cheese effect.',
      script: 'Phenelzine blocks M A O A and M A O B irreversibly. Norepinephrine that N E T pumps back in is no longer broken down, so the vesicles hold more and each signal releases more norepinephrine, which gives a stronger response at alpha 1 and beta 1. With tyramine from aged cheese or wine the result is a hypertensive crisis. Selegiline, selective for M A O B at low doses, has no cheese effect.'},
    clon: {name: 'Clonidine', c: 'ag', n: 2, a1: .15, b1: .15, a2drug: 'on', lede: 'Clonidine activates the inhibitory α2 receptor on the terminal (Gi), so very little NE is released: less sympathetic tone everywhere.', steps: [[0, 'Clonidine occupies presynaptic α2.'], [.6, 'Gi: little NE is released.'], [1.4, 'A weak response: lower HR, lower BP.'], [2.6, 'Never stop it suddenly (up-regulation gives a hypertensive crisis).']], tip: 'An agonist at an inhibitory receptor, so the overall effect is less sympathetic activity. ADRs: sedation, dry mouth, bradycardia, constipation.',
      script: 'Clonidine is an alpha 2 agonist. It occupies the presynaptic alpha 2 receptor on the terminal, which is G i, so very little norepinephrine is released and the response at alpha 1 and beta 1 is weak: lower heart rate and lower blood pressure, less sympathetic tone everywhere. Never stop it suddenly: the receptors up regulate, and stopping gives a hypertensive crisis.'},
    mirt: {name: 'Mirtazapine', c: 'an', n: 9, a1: .8, b1: .8, a2drug: 'blocked', lede: 'Mirtazapine blocks the presynaptic α2 autoreceptor, so more NE (and serotonin) is released: less depression. Its H1 and muscarinic block adds sedation.', steps: [[0, 'The α2 autoreceptor is blocked.'], [.6, 'More NE is released.'], [1.4, 'Stronger signaling: less depression.'], [2.6, 'H1 and muscarinic block elsewhere: drowsiness.']], tip: 'Used for major depression with insomnia. ADRs: weight gain, dry mouth, constipation, peripheral edema; agranulocytosis is FYI.',
      script: 'Mirtazapine is an alpha 2 antagonist. It blocks the presynaptic alpha 2 autoreceptor, so the inhibition of release is gone and more norepinephrine, and serotonin, is released: stronger signaling and less depression. It also blocks H 1 and muscarinic receptors, which gives the drowsiness that makes it useful in depression with insomnia, plus dry mouth and constipation.'},
    praz: {name: 'Prazosin', c: 'an', n: 6, a1: 0, b1: .5, a1drug: 'blocked', lede: 'Prazosin blocks α1 on the effector. NE is released normally but cannot constrict the vessels: vasodilation, lower BP.', steps: [[0, 'α1 is occupied by prazosin.'], [.6, 'Normal NE release.'], [1.4, 'β1 still responds; α1 does not.'], [2.6, 'Vasodilation: orthostatic hypotension, reflex tachycardia.']], tip: 'Any -osin is a selective, reversible α1 antagonist; its sites are the nose, the eye, the blood vessels and the urethra.',
      script: 'Prazosin is a selective, reversible alpha 1 antagonist. It occupies alpha 1 on the effector cell. Norepinephrine is released normally and beta 1 still responds, but alpha 1 does not, so the arteries and veins cannot constrict: vasodilation and lower blood pressure. The side effects follow: first dose orthostatic hypotension, reflex tachycardia and headache. Any drug ending in o s i n works the same way.'},
    phen: {name: 'Phenoxybenzamine', c: 'an', n: 9, a1: 0, b1: .85, a1drug: 'cov', a2drug: 'cov', lede: 'Irreversible α1 and α2 block. Extra NE is released (no α2 inhibition) but cannot outcompete the covalent α1 block: a larger fall in BP than prazosin.', steps: [[0, 'α1 and α2 are blocked covalently.'], [.6, 'No α2 inhibition: more NE is released.'], [1.4, 'α1 stays silent; β1 is overstimulated (reflex tachycardia).'], [2.6, 'The extra NE cannot outcompete a covalent bond.']], tip: 'His poll: phenoxybenzamine gives the greater drop in BP. Uses: pheochromocytoma, hypertensive crisis from MAO inhibitors.',
      script: 'Phenoxybenzamine blocks alpha 1 and alpha 2 irreversibly, with covalent bonds. With alpha 2 blocked there is no inhibition of release, so more norepinephrine comes out, but it cannot outcompete the covalent block at alpha 1, so the vessels dilate and beta 1 in the heart is overstimulated: reflex tachycardia. On his poll it gives a greater drop in blood pressure than prazosin.'},
  },
};
Object.values(ADR.modes).forEach((m) => {
  m.L = 5;
  m.draw = (t) => {
    bg(640, 380);
    rr(140, 10, 360, 132, 44); ctx.fillStyle = C('nerve'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.4; ctx.stroke(); txt('SNS nerve terminal', 320, 28, {size: 12, w: 700});
    ctx.beginPath(); ctx.ellipse(220, 80, 30, 15, 0, 0, Math.PI * 2); ctx.fillStyle = C('panel'); ctx.fill(); ctx.strokeStyle = C('in'); ctx.lineWidth = 1.6; ctx.stroke(); txt('MAO', 220, 80, {size: 11, w: 700, c: C('in')}); if (m.mao) cross(220, 80, 11, C('an'));
    rr(446, 126, 26, 26, 5); ctx.fillStyle = C('in'); ctx.fill(); txt('NET', 459, 162, {size: 11, w: 700, c: C('in')}); if (m.net === 'blocked') cross(459, 139, 11, C('an'));
    rr(184, 128, 16, 24, 4); ctx.fillStyle = C('in'); ctx.globalAlpha = .7; ctx.fill(); ctx.globalAlpha = 1; txt('α2', 192, 164, {size: 11, w: 700, c: C('in')});
    if (m.a2drug === 'on') dot(192, 170 + 8, 7, C('ag'), C('ink'));
    if (m.a2drug === 'blocked' || m.a2drug === 'cov') hex(192, 176, 8, C('an'));
    const vy = m === ADR.modes.amph ? 84 : 70 + 40 * seg(t, 0, .6) * (1 - seg(t, 1, 1.6));
    vesicleNE(320, vy, m.mao ? 5 : 3);
    rr(60, 252, 520, 116, 14); ctx.fillStyle = C('muscle'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.3; ctx.stroke(); txt('Effector cell (heart, vessel)', 320, 356, {size: 12, w: 700});
    const RA = [[250, 252, 'α1'], [390, 252, 'β1']];
    RA.forEach(([x, y, l]) => { rr(x - 9, y - 14, 18, 24, 4); ctx.fillStyle = C('rec'); ctx.fill(); txt(l, x, y + 22, {size: 11, w: 700, c: C('muted')}); });
    if (m.a1drug) { hex(250, 230, 8, C('an')); if (m.a1drug === 'cov') poly([[250, 236], [250, 240]], C('ink'), 3); }
    const targets = [[250, 232], [390, 232], [192, 176], [300, 200], [340, 196], [270, 205]];
    for (let i = 0; i < m.n; i++) {
      const rel = m === ADR.modes.amph ? .3 : .6; if (t < rel) continue;
      const tg = targets[i % targets.length]; let tx = tg[0] + ((i / 6 | 0)) * 10, ty = tg[1];
      if ((i % 6 === 0 && m.a1drug) || (i % 6 === 2 && m.a2drug)) ty -= 22;
      if (i % 6 === 2 && m.a2drug === 'on') { tx += 20; }
      const sx = 300 + (i % 5) * 10, sy = 146;
      let x, y; const k = seg(t, rel + i * .03, 1.4 + i * .03);
      if (t < 2.6) { x = lerp(sx, tx, k); y = lerp(sy, ty, k) + Math.sin(k * Math.PI) * 8; }
      else if (m.net === 'blocked') { x = tx + Math.sin(t * 2 + i) * 14; y = ty - 20 + Math.cos(t * 1.7 + i) * 10; }
      else { const slow = m.net === 'slow' ? 1.6 : 1; const k2 = seg(t, 2.6, 2.6 + .8 * slow); x = lerp(tx, 459, k2); y = lerp(ty, 139, k2); if (t > 2.6 + .8 * slow) { const k3 = seg(t, 2.6 + .8 * slow, 3.2 + .8 * slow); const toMao = !m.mao && i % 2 === 0; x = lerp(459, toMao ? 220 : 320, k3); y = lerp(139, toMao ? 80 : 70, k3); if (k3 >= 1) continue; } }
      dot(x, y, 4.5, C('an'), C('ink'));
    }
    const env = seg(t, 1.3, 1.7) * (m.net === 'blocked' ? 1 : 1 - seg(t, 3.0, 3.6));
    meter(140, 296, 140, 12, m.a1 * env, C('an'), 'α1'); meter(390, 296, 140, 12, m.b1 * env, C('an'), 'β1');
    txt('response', 210, 284, {size: 11, c: C('muted')}); txt('response', 460, 284, {size: 11, c: C('muted')});
  };
});
function vesicleNE(x, y, n) { dot(x, y, 18, C('panel'), C('ink')); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; dot(x + Math.cos(a) * 8, y + Math.sin(a) * 8, 3.5, C('an')); } }

/* ---------------- Beta-blocker selectivity ---------------- */
const BB = {
  key: 'bb', title: 'β-blocker selectivity', short: 'β-blockers', W: 640, H: 380,
  label: 'Animated heart, airway and blood vessel showing which receptors each β drug blocks',
  cite: 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 40–45, 54–60; transcript 10/7; poll PE2-042',
  modes: {
    none: {name: 'No drug', c: 'ink', hr: 1, air: .62, ves: .5, ch: ['idle', 'idle', 'idle'], hypo: [1, 1, 1], lede: 'β1 sets heart rate and force, β2 relaxes the airway, α1 constricts the vessels.', tip: 'Must know: which receptors each β blocker blocks. Generations and brand names are not needed.',
      script: 'Three sites. In the heart, beta 1 is G s and sets the rate and the force of contraction. In the airway, beta 2 is G s and relaxes the bronchial smooth muscle. In the blood vessel, alpha 1 is G q and constricts. The must know for every beta blocker is which of these receptors it blocks; generations and brand names are not needed.'},
    meto: {name: 'Metoprolol (MAN)', c: 'an', hr: .6, air: .62, ves: .5, ch: ['blocked', 'idle', 'idle'], hypo: [0, 1, 1], lede: 'β1-selective (metoprolol, atenolol, nebivolol): slows the heart and lowers renin, and leaves the airway alone.', tip: 'The pick for a patient with asthma or insulin-dependent diabetes. His twins poll: the metoprolol twin finishes the run first.',
      script: 'Metoprolol, atenolol and nebivolol, M A N, are beta 1 selective. They block beta 1 in the heart, so the rate and force fall, and beta 1 in the kidney, so renin falls. They leave the airway beta 2 alone, so the airway stays open. That is why a beta 1 selective blocker is the pick for a patient with asthma, and for an insulin dependent diabetic.'},
    prop: {name: 'Propranolol', c: 'an', hr: .6, air: .3, ves: .45, ch: ['blocked', 'blocked', 'idle'], hypo: [0, 0, 1], lede: 'Non-selective, β1 and β2: slows the heart and also narrows the airway. Masks hypoglycemia: no tachycardia, no tremor or nervousness.', tip: 'Lipophilic, enters the brain: used for anxiety. Avoid in asthma.',
      script: 'Propranolol is the prototype non selective beta blocker: it blocks beta 1 and beta 2. Beta 1 blocked slows the heart; beta 2 blocked narrows the airway, so it is avoided in asthma. It also masks hypoglycemia: the tachycardia is gone, and the tremor and nervousness are gone too, leaving only the sweating. It is lipophilic and enters the brain, which is why it is used for anxiety.'},
    carv: {name: 'Carvedilol / labetalol', c: 'an', hr: .6, air: .3, ves: .82, ch: ['blocked', 'blocked', 'blocked'], hypo: [0, 0, 1], lede: 'β1, β2 and α1: slows the heart and also dilates the vessels (lower total peripheral resistance).', tip: 'The same asthma and hypoglycemia cautions as a non-selective blocker, plus the α1 block.',
      script: 'Carvedilol and labetalol block beta 1, beta 2 and alpha 1. Beta 1 blocked slows the heart and lowers its output; beta 2 blocked narrows the airway; alpha 1 blocked dilates the vessels, so total peripheral resistance falls as well. His words: carvedilol can do it all. The asthma and hypoglycemia cautions are the same as for a non selective blocker.'},
    pind: {name: 'Pindolol (partial)', c: 'na', hr: .82, air: .45, ves: .5, ch: ['partial', 'partial', 'idle'], hypo: [0, 0, 1], lede: 'A partial agonist: it blocks NE when sympathetic tone is high but keeps some β activity, so the resting heart rate falls less.', tip: 'He said partial agonists were covered for Exam 1 and would not be a focus for Exam 2.',
      script: 'Pindolol is a non selective beta blocker with partial agonist activity. When sympathetic tone is high it blocks norepinephrine at beta 1 and beta 2, but it keeps some beta activity of its own, so the resting heart rate and cardiac output fall less than with a full blocker. He said partial agonists were covered for exam one and would not be a focus for exam two.'},
    albu: {name: 'Albuterol (β2 agonist)', c: 'ag', hr: 1.25, air: 1, ves: .58, ch: ['idle', 'on', 'idle'], hypo: [1, 1, 1], lede: 'A β2 agonist: it opens the airway. If it reaches the circulation it can raise the heart rate and blood pressure and cause agitation.', tip: 'Any -terol is a β2 agonist; short-acting versus long-acting is not needed.',
      script: 'Albuterol is a beta 2 agonist. Beta 2 is G s, so cyclic A M P rises in the bronchial smooth muscle and the airway opens. If the drug reaches the circulation it can raise the heart rate and the blood pressure and cause agitation, the side effects he walked through on the review slide. Any drug ending in t e r o l is a beta 2 agonist; short acting versus long acting is not needed.'},
  },
};
Object.values(BB.modes).forEach((m) => {
  m.L = 4;
  m.steps = [[0, 'Heart: β1 sets rate and force.'], [1.3, 'Airway: β2 relaxes bronchial smooth muscle.'], [2.6, 'Vessel: α1 constricts; blocking it dilates.']];
  m.draw = (t) => {
    bg(640, 380);
    const rate = 1.15 * m.hr; const beat = Math.pow(Math.max(0, Math.sin(t * Math.PI * 2 * rate)), 10); const s = 1 + .1 * beat;
    ctx.save(); ctx.translate(110, 150); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 46); ctx.bezierCurveTo(-70, 0, -46, -54, 0, -22); ctx.bezierCurveTo(46, -54, 70, 0, 0, 46); ctx.fillStyle = C('an'); ctx.globalAlpha = .8; ctx.fill(); ctx.globalAlpha = 1; ctx.restore();
    txt('Heart', 110, 40, {size: 14, w: 700}); chip(110, 236, 'β1', m.ch[0]);
    txt(m.hr > 1.1 ? 'faster' : m.hr < .7 ? 'slower, weaker' : m.hr < .9 ? 'a little slower' : 'normal rate', 110, 266, {size: 12, w: 700, c: C('muted')});
    const gap = 10 + 40 * m.air; const ax = 320;
    for (const sgn of [-1, 1]) { rr(ax + sgn * gap - (sgn < 0 ? 14 : 0), 70, 14, 150, 7); ctx.fillStyle = C('muscle'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1.2; ctx.stroke(); }
    for (let i = 0; i < Math.round(3 + 6 * m.air); i++) { const yy = 220 - ((t * 90 + i * 24) % 150); dot(ax + (rnd(i, 5) - .5) * gap, yy, 3.5, C('in')); }
    txt('Airway', ax, 40, {size: 14, w: 700}); chip(ax, 236, 'β2', m.ch[1]);
    txt(m.air > .9 ? 'wide open' : m.air < .4 ? 'narrowed (asthma risk)' : 'normal', ax, 266, {size: 12, w: 700, c: m.air < .4 ? C('an') : C('muted')});
    const vh = 20 + 46 * m.ves; const vx = 470;
    rr(vx, 145 - vh / 2 - 10, 140, 10, 5); ctx.fillStyle = C('an'); ctx.globalAlpha = .55; ctx.fill(); rr(vx, 145 + vh / 2, 140, 10, 5); ctx.fill(); ctx.globalAlpha = 1;
    for (let i = 0; i < 7; i++) { const xx = vx + ((t * 70 + i * 22) % 140); dot(xx, 145 + (rnd(i, 8) - .5) * vh * .8, 4, C('an')); }
    txt('Blood vessel', vx + 70, 40, {size: 14, w: 700}); chip(vx + 70, 236, 'α1', m.ch[2]);
    txt(m.ves > .75 ? 'dilated: BP ↓' : 'normal tone', vx + 70, 266, {size: 12, w: 700, c: m.ves > .75 ? C('ag') : C('muted')});
    rr(20, 300, 600, 66, 12); ctx.fillStyle = C('chip'); ctx.fill();
    txt('Hypoglycemia warning signs the patient can feel:', 36, 318, {a: 'left', size: 12, w: 700});
    [['tachycardia', 0, 50], ['tremor, nervousness', 1, 250], ['sweating', 2, 460]].forEach(([l, i, x]) => { const on = m.hypo[i]; dot(x, 344, 7, on ? C('ag') : C('an')); if (!on) cross(x, 344, 5, '#fff'); txt(on ? l : l + ' (masked)', x + 14, 344, {a: 'left', size: 12, w: on ? 400 : 700, c: on ? C('ink') : C('an')}); });
  };
});

/* ---------------- Receptor regulation ---------------- */
const REG = {
  key: 'reg', title: 'Receptor up- and down-regulation', short: 'Up/down-regulation', W: 640, H: 380,
  label: 'Animated receptor counts over weeks of drug use and abrupt stopping',
  cite: 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 18, 26, 41, 52, 59; transcripts 10/6, 10/7',
  modes: {
    clon: {name: 'Clonidine, stopped suddenly', c: 'ag', r0: 6, r1: 11, on: .62, eff: (u, on) => (u < on ? -14 * seg(u, .05, .15) : -14 + 50 * seg(u, on, on + .05) - 36 * seg(u, on + .08, .98)), taper: true,
      lede: 'Weeks of less NE signaling make the body add receptors. Stop clonidine abruptly and normal NE reaches all those extra receptors: hypertensive crisis.',
      steps: [[0, 'Clonidine lowers sympathetic outflow and BP.'], [.25, 'Over weeks, the body up-regulates the receptors.'], [.62, 'The drug is stopped abruptly.'], [.66, 'NE reaches the extra receptors: hypertensive crisis. Wean off instead.']], tip: 'His major counseling point: never stop clonidine suddenly; wean off.',
      script: 'Clonidine lowers sympathetic outflow, so less norepinephrine reaches the receptors and blood pressure falls. Over weeks the body compensates and makes more receptors: up regulation. If the drug is stopped abruptly, normal norepinephrine now reaches all those extra receptors and the result is a hypertensive crisis. His major counseling point: never stop clonidine suddenly, wean off.'},
    bb: {name: 'β-blocker, stopped suddenly', c: 'an', r0: 6, r1: 11, on: .62, eff: (u, on) => (u < on ? -12 * seg(u, .05, .15) : -12 + 44 * seg(u, on, on + .05) - 32 * seg(u, on + .08, .98)), taper: true,
      lede: 'Blocking β receptors for weeks up-regulates them. A sudden stop leaves many unblocked receptors: rebound hypertension.',
      steps: [[0, 'The β blocker lowers HR and BP.'], [.25, 'The receptors up-regulate behind the block.'], [.62, 'The drug is stopped suddenly.'], [.66, 'Rebound hypertension. Wean off instead.']], tip: 'The same rule for every antagonist used long term: the receptors up-regulate.',
      script: 'A beta blocker lowers the heart rate and the blood pressure. Over weeks the blocked receptors up regulate behind the block, so there are more of them. If the drug is stopped suddenly, all of those receptors are open to norepinephrine at once and the result is rebound hypertension, the sudden discontinuation warning on his side effect slide. Wean off instead.'},
    ag: {name: 'Agonist infusion (epi, dobutamine)', c: 'ag', r0: 11, r1: 5, on: .7, eff: (u, on) => (u < on ? 34 * seg(u, .03, .1) - 20 * seg(u, .12, .6) : 14 - 36 * seg(u, on, on + .05) + 22 * seg(u, on + .1, .98)),
      lede: 'Constant agonist exposure makes the body remove receptors (down-regulation): the same dose works less (tolerance), and stopping abruptly can cause collapse.',
      steps: [[0, 'The agonist raises HR and BP.'], [.15, 'The receptors down-regulate: the effect fades (tolerance).'], [.7, 'The infusion is stopped abruptly.'], [.74, 'Too few receptors are left: collapse. Wean off.']], tip: 'Dobutamine tolerance limits long-term use. Epinephrine must be weaned off, not cut off.',
      script: 'An agonist infusion, epinephrine or dobutamine, raises the heart rate and the blood pressure. With constant exposure the body removes receptors: down regulation, so the same dose works less and less, which is tolerance. If the infusion is stopped abruptly, too few receptors are left for the body’s own norepinephrine and the patient can collapse. Epinephrine must be weaned off.'},
    phe: {name: 'Phenylephrine nasal spray', c: 'ag', r0: 10, r1: 5, on: .66, eff: (u, on) => (u < on ? 30 * seg(u, .03, .1) - 22 * seg(u, .14, .6) : 8 - 34 * seg(u, on, on + .05) + 20 * seg(u, on + .12, .98)),
      lede: 'Daily α1 agonist spray down-regulates the nasal α1 receptors: it works less and less, and stopping brings rebound congestion.',
      steps: [[0, 'The spray constricts the nasal vessels: decongested.'], [.15, 'The α1 receptors down-regulate: less effect.'], [.66, 'The spray is stopped.'], [.7, 'Rebound congestion. The limit is 3 days.']], tip: 'Careful with phenylephrine in hypertension.',
      script: 'Phenylephrine nasal spray is an alpha 1 agonist: it constricts the nasal vessels and the nose is decongested. With daily use the alpha 1 receptors down regulate, so the spray works less and less. When it is stopped, the few receptors left cannot keep the vessels constricted and there is rebound congestion. The limit on the box is three days, and the drug needs care in hypertension.'},
  },
};
Object.values(REG.modes).forEach((m) => {
  m.L = 8; m.stepT = (t) => clamp(t / 6.5);
  m.draw = (t) => {
    bg(640, 380); const p = clamp(t / 6.5);
    const cur = (u) => (u < m.on ? lerp(m.r0, m.r1, seg(u, .1, m.on - .05)) : lerp(m.r1, (m.r0 + m.r1) / 2, seg(u, m.on + .1, 1)));
    const n = Math.round(cur(p));
    rr(40, 40, 560, 22, 8); ctx.fillStyle = C('muscle'); ctx.fill(); txt('cell membrane with receptors', 40, 80, {a: 'left', size: 11, c: C('muted')});
    for (let i = 0; i < n; i++) { const x = 70 + i * (500 / 11); rr(x - 7, 26, 14, 32, 4); ctx.fillStyle = C('rec'); ctx.fill(); ctx.strokeStyle = C('ink'); ctx.lineWidth = 1; ctx.stroke(); }
    txt(`${n} receptors`, 600, 86, {a: 'right', size: 13, w: 700, c: n > m.r0 + 1 ? C('an') : n < m.r0 - 1 ? C('in') : C('ink')});
    const x0 = 70, x1 = 610, yc = 240; const X = (u) => lerp(x0, x1, u);
    rr(X(0), 110, X(m.on) - X(0), 250, 6); ctx.fillStyle = C('chip'); ctx.fill(); txt('drug on (weeks)', X(m.on / 2), 124, {size: 11, w: 700, c: C('muted')});
    ctx.setLineDash([4, 4]); ctx.strokeStyle = C('muted'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, yc); ctx.lineTo(x1, yc); ctx.stroke(); ctx.setLineDash([]);
    txt('baseline', x0 - 6, yc, {a: 'right', size: 11, c: C('muted')}); txt(m === REG.modes.phe ? 'congestion relief' : 'HR / BP effect', 16, 104, {a: 'left', size: 12, w: 700, c: C('muted')});
    if (p > m.on) { ctx.strokeStyle = C('an'); ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(X(m.on), 130); ctx.lineTo(X(m.on), 360); ctx.stroke(); ctx.setLineDash([]); txt('stopped abruptly', X(m.on) + 6, 140, {a: 'left', size: 11, w: 700, c: C('an')}); }
    if (m.taper && p > m.on) { ctx.setLineDash([6, 4]); ctx.strokeStyle = C('ag'); ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const u = m.on + (1 - m.on) * i / 100; const yy = yc - (-14 * (1 - seg(u, m.on, .98))) * 2.2; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); } ctx.stroke(); ctx.setLineDash([]); txt('weaned off instead', X(.9), yc + 26, {size: 11, w: 700, c: C('ag')}); }
    ctx.strokeStyle = C('ink'); ctx.lineWidth = 2.4; ctx.beginPath(); const N = Math.floor(300 * p);
    for (let i = 0; i <= N; i++) { const u = i / 300; const yy = yc - m.eff(u, m.on) * 2.2; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); } ctx.stroke();
    dot(X(N / 300), yc - m.eff(N / 300, m.on) * 2.2, 4.5, C('ink'));
  };
});

const SCENES = [ANS, GP, BARO, GI, DUMB, SITE, NO, NMJ, VAR, OP, ADR, EPI, BB, REG, RAAS];
SCENES.forEach(s => Object.values(s.modes).forEach(m => { if (!m.stepT) m.stepT = t => t; }));
return {SCENES, use: c => { ctx = c; }, refresh: readVars, C, reduce, buildDumb, setDumb};
})();

/* ---------------- Scenes page engine ----------------
   All fifteen scenes are rendered stacked; only one runs its animation loop at a time: the scene whose
   stage is on screen (IntersectionObserver) or was last touched. Each scene keeps its own state (mode,
   clock, speed). The narration here uses its own Audio element so it never fights the figures' engine;
   narrStop() is called before a reading starts and scenesStop() (from leaveView) ends everything. */
const SC_ST = new Map();
let SC_ACTIVE = null, SC_RAF = 0, SC_IO = null, SC_LAST = 0, SC_AUDIO = null, SC_THEME = null;
const SC_COL = {ag: 'var(--figC)', an: 'var(--figB)', in: 'var(--figA)', no: 'var(--figE)', na: 'var(--figD)', ink: 'var(--ink)'};
const scAudio = () => SC_AUDIO || (SC_AUDIO = new Audio());
const scRestT = (st, m) => st.s.key === 'nmj' ? (m.steps[2] ? m.steps[2][0] : 1) + .3 : m.L * .62;
const scClip = (st, k) => NAR_BASE() + 'sc-' + st.s.key + '-' + k + '.mp3';

function vScenes() {
  scenesStop();
  const e2 = COURSE.exams.find(e => e.id === 2);
  const toc = `<div class="card sc-toc"><b>Scenes</b><div class="row" style="margin-top:6px">${SC.SCENES.map(s => `<a class="chip" href="#sc-${s.key}" data-scgo="${s.key}">${esc(s.short)}</a>`).join('')}</div></div>`;
  const nrow = `<div class="row sc-nrow">${NAR_MODES.map(([k, l]) => `<button type="button" class="chip ${NAR.mode === k ? 'on' : ''}" aria-pressed="${NAR.mode === k}" data-nmode="${k}">${l}</button>`).join('')}${rateSel()}<button type="button" class="chip nmute" aria-pressed="${NAR.muted}">${NAR.muted ? '🔇 Muted' : '🔊 Sound on'}</button></div>`;
  const body = SC.SCENES.map(s => `<section class="sc-scene" id="sc-${s.key}" data-sc="${s.key}"><h3>${esc(s.title)}</h3><div class="sc-grid"><div class="sc-stage">
    <div class="sc-drugs" role="group" aria-label="Drug or mode">${Object.entries(s.modes).map(([k, m]) => `<button type="button" class="sc-drug" data-mode="${k}" style="--c:${SC_COL[m.c] || SC_COL.ink}">${esc(m.name)}</button>`).join('')}</div>
    ${s.dom ? '<div class="sc-dom"></div>' : `<canvas class="sc-cv" role="img" aria-label="${esc(s.label || s.title)}"></canvas>`}
    <div class="sc-ctl"><button type="button" class="btn sm sc-play">Play</button><button type="button" class="btn sm ghost sc-replay">Replay</button><div class="sc-bar" aria-hidden="true"><i></i></div><label class="meta" style="margin:0">Animation <select class="sc-speed msel" aria-label="Animation speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option></select></label></div>
    <div class="sc-cite">${esc(s.cite)}</div>${nrow}</div>
    <div class="sc-side"><h4 class="sc-title"></h4><p class="sc-lede"></p><ol class="sc-steps"></ol><div class="sc-tip"><b>Exam angle</b><span></span></div></div></div></section>`).join('');
  $('#view').innerHTML = `<h2>Scenes</h2><p class="sub">Fifteen animated explainers of the Exam 2 mechanisms. Pick a scene, then a drug or mode: the stage animates, the steps beside it light up in time, and the exam angle says how he asks it. Shapes and timings show direction and order, not measurements.</p>` + exGroup(e2, toc + body, true);
  SC.refresh();
  const root = $('#view');
  root.querySelectorAll('.sc-scene').forEach(el => {
    const s = SC.SCENES.find(x => x.key === el.dataset.sc);
    const st = {s, el, dom: !!s.dom, cv: el.querySelector('.sc-cv'), mk: Object.keys(s.modes)[0], t: 0, playing: !SC.reduce() && !s.dom, speed: 1, once: false, nar: null, vis: 0, touch: 0};
    if (st.cv) st.ctx = st.cv.getContext('2d');
    if (st.dom) SC.buildDumb(el.querySelector('.sc-dom'));
    SC_ST.set(s.key, st);
    el.querySelectorAll('.sc-drug').forEach(b => b.addEventListener('click', () => { scTouch(st); scPickMode(st, b.dataset.mode, true); }));
    el.querySelector('.sc-play').addEventListener('click', () => { scTouch(st); scPlayToggle(st); });
    el.querySelector('.sc-replay').addEventListener('click', () => { scTouch(st); scReplay(st); });
    el.querySelector('.sc-speed').addEventListener('change', e => { st.speed = Number(e.target.value) || 1; });
    scPickMode(st, st.mk, false);
  });
  root.querySelectorAll('[data-scgo]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const el = document.getElementById('sc-' + a.dataset.scgo); if (!el) return; scTouch(SC_ST.get(a.dataset.scgo)); scrollToEl(el); }));
  // the global handlers set the narration mode, speed and mute; this page then stops or shows its own reading
  root.addEventListener('click', e => { if (e.target.closest('[data-nmode], .nmute')) setTimeout(scNarrChanged, 0); });
  root.addEventListener('change', e => { if (e.target.classList.contains('nrate') && SC_AUDIO) SC_AUDIO.playbackRate = +e.target.value || 1; });
  if ('IntersectionObserver' in window) {
    SC_IO = new IntersectionObserver(entries => {
      entries.forEach(en => { const st = SC_ST.get(en.target.closest('.sc-scene').dataset.sc); if (st) st.vis = en.isIntersecting ? en.intersectionRatio : 0; });
      scChooseActive();
    }, {threshold: [0, .25, .5, .75, 1]});
    SC_ST.forEach(st => SC_IO.observe(st.el.querySelector('.sc-stage')));
  } else { SC_ST.forEach(st => { st.vis = 1; }); scChooseActive(); }
  if (!SC_THEME) { SC_THEME = new MutationObserver(() => SC.refresh()); SC_THEME.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']}); if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => SC.refresh()); }
  window.addEventListener('resize', scResize);
  requestAnimationFrame(() => { SC_ST.forEach(st => { scSize(st); scFrame(st); }); SC_LAST = performance.now(); SC_RAF = requestAnimationFrame(scLoop); });
}
function scResize() { SC_ST.forEach(st => { scSize(st); scFrame(st); }); }
function scSize(st) {
  if (st.dom || !st.cv) return;
  const w = st.cv.clientWidth || 600, dpr = Math.min(2, window.devicePixelRatio || 1), k = w / st.s.W;
  st.cv.style.aspectRatio = `${st.s.W} / ${st.s.H}`;
  st.cv.width = Math.round(w * dpr); st.cv.height = Math.round(st.s.H * k * dpr);
  st.ctx.setTransform(k * dpr, 0, 0, k * dpr, 0, 0);
}
function scTouch(st) { if (!st) return; st.touch = ++SC_LAST; SC_ACTIVE = st; }
function scChooseActive() {
  if (SC_ACTIVE && SC_ACTIVE.vis > 0) return;
  let best = null; SC_ST.forEach(st => { if (st.vis > 0 && (!best || st.vis > best.vis || (st.vis === best.vis && st.touch > best.touch))) best = st; });
  if (best) SC_ACTIVE = best;
}
/* a mode pick: new text beside the stage, the clock back to the start; `byUser` starts a reading when narration is on */
function scPickMode(st, k, byUser) {
  const m = st.s.modes[k]; if (!m) return;
  st.mk = k; st.t = 0; st.once = false;
  st.el.querySelectorAll('.sc-drug').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === k)));
  st.el.querySelector('.sc-title').textContent = `${st.s.title}: ${m.name}`;
  st.el.querySelector('.sc-lede').textContent = m.lede;
  st.el.querySelector('.sc-tip span').textContent = m.tip;
  const ol = st.el.querySelector('.sc-steps'); ol.innerHTML = ''; ol.style.setProperty('--c', SC_COL[m.c] || SC_COL.ink);
  m.steps.forEach(([, s]) => { const li = document.createElement('li'); li.textContent = s; ol.appendChild(li); });
  if (st.dom) SC.setDumb(st.el.querySelector('.sc-dom'), m);
  scNarrStop(st);
  if (byUser && narrOn()) scNarrStart(st);
  else { st.playing = byUser ? !st.dom : st.playing; if (!st.playing && !st.dom) st.t = scRestT(st, m); scNsaid(st); }
  scPlayBtn(st); scFrame(st);
}
const scPlayBtn = st => { st.el.querySelector('.sc-play').textContent = st.playing ? 'Pause' : 'Play'; };
function scPlayToggle(st) {
  if (st.playing) {
    st.playing = false;
    if (st.nar && st.nar.clip && SC_AUDIO) SC_AUDIO.pause();
    if (st.nar && st.nar.synth && narrCan()) speechSynthesis.pause();
  } else {
    if (st.nar && st.nar.clip && SC_AUDIO) { st.playing = true; SC_AUDIO.play().catch(() => {}); }
    else if (st.nar && st.nar.synth && narrCan()) { st.playing = true; speechSynthesis.resume(); }
    else if (narrOn()) { if (st.t >= st.s.modes[st.mk].L) st.t = 0; scNarrStart(st); }
    else { if (st.t >= st.s.modes[st.mk].L) st.t = 0; st.playing = true; }
  }
  scPlayBtn(st);
}
function scReplay(st) { scNarrStop(st); st.t = 0; st.once = false; if (narrOn()) scNarrStart(st); else st.playing = true; scPlayBtn(st); scFrame(st); }
/* the words being read, under the stage: while a reading plays, and always in Captions only */
function scNsaid(st) {
  let d = st.el.querySelector('.nsaid');
  const m = st.s.modes[st.mk], show = NAR.mode === 'cap' || (NAR.mode === 'tap' && st.nar);
  if (!show || !m.script) { if (d) d.remove(); return; }
  if (!d) { d = document.createElement('div'); d.className = 'nsaid'; st.el.querySelector('.sc-ctl').insertAdjacentElement('beforebegin', d); }
  d.textContent = m.script;
}
/* Narration: the clip drives the clock (t = time / duration × L); without the clip, the device's voice reads
   the script and the clock runs once at normal speed. Either way the last frame is held when the reading ends. */
function scNarrStart(st) {
  narrStop(); scNarrStop(null);
  const m = st.s.modes[st.mk]; if (!m.script || !narrOn()) { st.playing = !st.dom; return; }
  const nar = st.nar = {clip: true, t: null, finish: null};
  st.t = 0; st.once = true; st.playing = true; st.el.classList.add('speaking'); scNsaid(st); scPlayBtn(st);
  const finish = () => { if (st.nar !== nar) return; clearTimeout(nar.t); st.nar = null; st.t = m.L; st.playing = false; st.el.classList.remove('speaking'); st.el.querySelectorAll('.sc-steps li').forEach(li => li.classList.add('done')); scPlayBtn(st); scFrame(st); };
  nar.finish = finish;
  const guard = ms => { clearTimeout(nar.t); nar.t = setTimeout(finish, ms); };
  const synth = () => {
    if (st.nar !== nar) return;
    nar.clip = false; nar.synth = true; st.t = 0;
    if (!narrCan()) { nar.synth = false; return; }   // no voice: the animation runs once, silently
    const v = narrVoice(); let last = null;
    (speakable(m.script).match(/[^.;:!?]+[.;:!?]*/g) || [m.script]).forEach(part => { if (!part.trim()) return; const u = new SpeechSynthesisUtterance(part.trim()); u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; last = u; speechSynthesis.speak(u); });
    if (last) { last.onend = last.onerror = () => { if (st.nar !== nar) return; nar.synth = false; if (st.t >= m.L) finish(); }; }   // else the clock finishes the run when it reaches L
    guard((4000 + m.script.split(/\s+/).length * 450) / NAR.rate);
  };
  const a = scAudio(); a.onended = a.onerror = null; a.pause();
  a.preload = 'auto'; a.src = scClip(st, st.mk); a.playbackRate = NAR.rate;
  const fallback = () => { if (st.nar !== nar || nar.fell) return; nar.fell = true; a.onended = a.onerror = null; synth(); };
  a.onended = finish; a.onerror = fallback;
  a.onloadedmetadata = () => { if (st.nar === nar && isFinite(a.duration)) guard(a.duration * 1000 / NAR.rate + 4000); };
  guard((4000 + m.script.split(/\s+/).length * 450) / NAR.rate);
  a.play().catch(fallback);
}
function scNarrStop(st) {
  SC_ST.forEach(x => { if (x.nar) { clearTimeout(x.nar.t); x.nar = null; x.el.classList.remove('speaking'); if (x !== st) scNsaid(x); } });
  if (SC_AUDIO) { SC_AUDIO.onended = SC_AUDIO.onerror = SC_AUDIO.onloadedmetadata = null; SC_AUDIO.pause(); }
  if (narrCan()) speechSynthesis.cancel();
}
function scNarrChanged() {
  if (!narrOn()) { const was = []; SC_ST.forEach(st => { if (st.nar) was.push(st); }); scNarrStop(null); was.forEach(st => { st.once = false; st.playing = !st.dom; scPlayBtn(st); }); }
  SC_ST.forEach(scNsaid);
}
function scFrame(st) {
  const m = st.s.modes[st.mk], L = m.L;
  if (!st.dom && st.ctx) { SC.use(st.ctx); m.draw(st.t); }
  st.el.querySelector('.sc-bar i').style.width = `${100 * Math.min(1, st.t / L)}%`;
  const lis = st.el.querySelectorAll('.sc-steps li'); const sv = m.stepT(st.t);
  let on = 0; m.steps.forEach(([at], i) => { if (sv >= at) on = i; });
  const all = st.t >= L && (st.once || st.dom);
  lis.forEach((li, i) => { li.classList.toggle('on', i === on); if (all) li.classList.add('done'); });
}
function scLoop(now) {
  const dt = Math.min(.05, (now - SC_LAST) / 1000); SC_LAST = now;
  const st = SC_ACTIVE;
  if (st && document.body.contains(st.el)) {
    const m = st.s.modes[st.mk];
    if (st.nar && st.nar.clip && SC_AUDIO && isFinite(SC_AUDIO.duration) && SC_AUDIO.duration > 0) st.t = Math.min(m.L, SC_AUDIO.currentTime / SC_AUDIO.duration * m.L);
    else if (st.playing) {
      st.t += dt * (st.nar ? 1 : st.speed);
      if (st.t >= m.L) {
        if (st.once || st.dom) { st.t = m.L; st.playing = false; if (st.nar && !st.nar.synth && st.nar.finish) st.nar.finish(); else scPlayBtn(st); }
        else st.t = 0;
      }
    }
    scFrame(st);
  }
  SC_RAF = requestAnimationFrame(scLoop);
}
/* leaving the page (leaveView): the loop, the observers and any reading stop */
function scenesStop() {
  if (SC_RAF) cancelAnimationFrame(SC_RAF); SC_RAF = 0;
  if (SC_IO) { SC_IO.disconnect(); SC_IO = null; }
  window.removeEventListener('resize', scResize);
  scNarrStop(null); SC_ST.clear(); SC_ACTIVE = null;
}
