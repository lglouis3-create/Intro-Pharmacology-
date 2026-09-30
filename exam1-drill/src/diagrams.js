/* Figures drawn as inline SVG, keyed by name. Colors come from the page's CSS
   variables so they follow light and dark mode. A question or a glossary term
   names a figure with `fg:'key'`; FIG(key) returns the markup. */
const FIG = (() => {
  const W = 360, H = 230, L = 60, R = 14, T = 20, B = 40;   // plot box
  const px = x => L + (x + 3) / 6 * (W - L - R);            // log-dose −3..3
  const py = y => T + (1 - y / 100) * (H - T - B);          // 0..100 %
  const sig = (ec, emax, n = 1, base = 0) => {
    const pts = [];
    for (let x = -3; x <= 3.001; x += 0.1) {
      const y = base + (emax - base) * Math.pow(10, n * x) / (Math.pow(10, n * x) + Math.pow(10, n * ec));
      pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  const axes = (xl, yl) => `<line class="ax" x1="${L}" y1="${py(0)}" x2="${W - R}" y2="${py(0)}"/><line class="ax" x1="${L}" y1="${py(0)}" x2="${L}" y2="${T}"/>
    <text class="lbl" x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle">${xl}</text>
    <text class="lbl" transform="translate(11 ${(T + py(0)) / 2}) rotate(-90)" text-anchor="middle">${yl}</text>`;
  const curve = (pts, cls, label, at, below) => `<polyline class="cv ${cls}" points="${pts}"/>` +
    (label ? `<text class="cl ${cls}" x="${px(at[0])}" y="${py(at[1]) + (below ? 14 : -5)}" text-anchor="${at[0] > 1.5 ? 'end' : 'start'}">${label}</text>` : '');
  const dash = (x1, y1, x2, y2) => `<line class="dash" x1="${px(x1)}" y1="${py(y1)}" x2="${px(x2)}" y2="${py(y2)}"/>`;
  const tick = (x, t) => `<text class="lbl" x="${px(x)}" y="${py(0) + 14}" text-anchor="middle">${t}</text>`;
  const ytick = (y, t) => `<text class="lbl sm2" x="${L - 4}" y="${py(y) + 4}" text-anchor="end">${t}</text>`;
  const wrap = (inner, cap, h = H) => `<figure class="fig"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${cap}"><defs><marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>${inner}</svg><figcaption>${cap}</figcaption></figure>`;
  const F = {};

  F['drc-basic'] = () => wrap(axes('log dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax') + dash(0, 0, 0, 50) + dash(-3, 50, 0, 50) + ytick(50, '50%') + tick(0, 'EC50') +
    curve(sig(0, 100), 'a', 'agonist', [3, 100]),
    'A graded dose–response curve. Emax is the plateau (the y-axis limit); EC50 is the dose giving half of Emax (read on the x-axis).');

  F['potency'] = () => wrap(axes('log dose', '% of maximal response') +
    dash(-3, 50, 1, 50) + dash(-1, 0, -1, 50) + dash(1, 0, 1, 50) + tick(-1, 'EC50 A') + tick(1, 'EC50 B') + ytick(50, '50%') +
    curve(sig(-1, 100), 'a', 'A (more potent)', [-0.9, 100]) + curve(sig(1, 100), 'b', 'B', [3, 100]),
    'Same Emax, different EC50: A reaches half-maximal response at a lower dose, so A is more potent. Potency is read on the x-axis.');

  F['efficacy'] = () => wrap(axes('log dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax A') + dash(-3, 60, 3, 60) + ytick(60, 'Emax B') +
    curve(sig(0, 100), 'a', 'A', [3, 100]) + curve(sig(0, 60), 'b', 'B', [3, 60], true),
    'Same EC50, different Emax: A produces a larger maximal response, so A has the greater efficacy. Efficacy is read on the y-axis.');

  F['partial'] = () => wrap(axes('log dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, '100%') + dash(-3, 50, 3, 50) + ytick(50, '50%') +
    curve(sig(0, 100), 'a', 'full agonist', [3, 100]) + curve(sig(0, 50), 'b', 'partial agonist', [3, 50], true),
    'A partial agonist plateaus below the full agonist even with every receptor occupied; more dose does not raise it further.');

  F['inverse'] = () => wrap(axes('log dose', 'receptor activity') +
    dash(-3, 30, 3, 30) + ytick(30, 'basal') +
    curve(sig(0, 100, 1, 30), 'a', 'agonist', [3, 100]) +
    `<polyline class="cv c" points="${px(-3)},${py(30)} ${px(3)},${py(30)}"/><text class="cl c" x="${px(3)}" y="${py(30) - 5}" text-anchor="end">antagonist</text>` +
    curve(sig(0, 5, 1, 30), 'b', 'inverse agonist', [3, 5], true),
    'Against a receptor with basal (constitutive) activity: an agonist raises activity, a neutral antagonist leaves it at basal, an inverse agonist lowers it below basal.');

  F['competitive'] = () => wrap(axes('log agonist dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax') + dash(-1, 0, -1, 50) + dash(1, 0, 1, 50) + dash(-3, 50, 1, 50) +
    curve(sig(-1, 100), 'a', 'agonist alone', [-2.9, 80]) + curve(sig(1, 100), 'b', '+ competitive antagonist', [3, 22], true) +
    `<path class="arrow" d="M${px(-0.8)} ${py(55)} L${px(0.8)} ${py(55)}"/>`,
    'A competitive (reversible) antagonist shifts the agonist curve to the right in parallel; enough agonist still reaches the same Emax, so the block is surmountable.');

  F['irreversible'] = () => wrap(axes('log agonist dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax') + dash(-3, 45, 3, 45) + ytick(45, 'Emax′') +
    curve(sig(0, 100), 'a', 'agonist alone', [3, 100]) + curve(sig(0, 45), 'b', '+ irreversible antagonist', [3, 45], true),
    'An irreversible (non-competitive) antagonist removes receptors from use, so the maximal response falls; no agonist dose restores it.');

  F['binding-kd'] = () => wrap(axes('log [drug]', '% of receptors bound') +
    dash(-3, 100, 3, 100) + ytick(100, '100%') + dash(0, 0, 0, 50) + dash(-3, 50, 0, 50) + ytick(50, '50%') + tick(0, 'Kd') +
    curve(sig(0, 100), 'a', 'binding', [3, 100]),
    'A binding curve. Kd is the drug concentration at which half of the receptors are occupied; the smaller the Kd, the higher the affinity.');

  F['spare'] = () => wrap(axes('log dose', '% of maximum') +
    dash(-3, 100, 3, 100) + dash(-1, 0, -1, 50) + dash(0, 0, 0, 50) + tick(-1, 'EC50') + tick(0, 'Kd') +
    curve(sig(-1, 100), 'a', 'response', [-2.9, 80]) + curve(sig(0, 100), 'b', 'occupancy', [3, 40], true),
    'Spare receptors: the response is half-maximal (EC50) at a dose that occupies fewer than half the receptors (Kd), so the response curve lies left of the binding curve.');

  F['sites'] = () => wrap(`
    <path class="shape" d="M70 150 C60 90 120 60 180 70 C240 60 300 90 290 150 C295 200 240 215 180 210 C120 215 65 200 70 150 Z"/>
    <path class="pocket" d="M150 110 C150 90 210 90 210 110 L205 140 C200 160 160 160 155 140 Z"/>
    <circle class="lig a" cx="180" cy="122" r="14"/><text class="lbl" x="180" y="126" text-anchor="middle">A</text>
    <text class="lbl" x="255" y="190" text-anchor="middle">receptor</text>
    <text class="cl a" x="180" y="60" text-anchor="middle">orthosteric site: where the endogenous agonist binds</text>
    <path class="pocket" d="M78 130 C78 118 106 118 106 130 L104 146 C102 156 82 156 80 146 Z"/>
    <circle class="lig b" cx="92" cy="136" r="10"/>
    <text class="cl b" x="60" y="182" text-anchor="start">allosteric site</text>
    <text class="lbl" x="60" y="196" text-anchor="start">a separate site; a modulator here</text>
    <text class="lbl" x="60" y="210" text-anchor="start">changes the response to A</text>`,
    'Orthosteric drugs compete for the agonist pocket (one or the other). An allosteric drug binds elsewhere and changes what the orthosteric drug does (one and the other).');

  F['two-state'] = () => wrap(`
    <rect class="box" x="40" y="70" width="110" height="60" rx="8"/><text class="lbl big" x="95" y="96" text-anchor="middle">R</text><text class="lbl" x="95" y="116" text-anchor="middle">inactive</text>
    <rect class="box" x="210" y="70" width="110" height="60" rx="8"/><text class="lbl big" x="265" y="96" text-anchor="middle">R*</text><text class="lbl" x="265" y="116" text-anchor="middle">active</text>
    <path class="arrow" d="M155 92 L205 92"/><path class="arrow" d="M205 108 L155 108"/>
    <text class="lbl" x="180" y="60" text-anchor="middle">equilibrium (L)</text>
    <text class="cl a" x="265" y="160" text-anchor="middle">full agonist: pulls to R*</text>
    <text class="cl b" x="95" y="160" text-anchor="middle">inverse agonist: pulls to R</text>
    <text class="cl c" x="180" y="190" text-anchor="middle">antagonist: binds both, leaves the equilibrium where it is</text>
    <text class="lbl" x="180" y="212" text-anchor="middle">partial agonist: shifts toward R* less than a full agonist</text>`,
    'The two-state model. Receptors sit in equilibrium between an inactive (R) and an active (R*) state; each drug class is defined by which state it favours.');

  F['gpcr'] = () => {
    const steps = [['Drug', '', 'ligand'], ['Receptor', '', '7-TM'], ['G', 'protein', 'transducer'], ['Effector', '', 'e.g. AC'], ['Second', 'messenger', 'e.g. cAMP'], ['Response', '', 'in the cell']];
    const w = 54, gap = 6, x0 = 3;
    let s = '';
    steps.forEach(([a, b], i) => {
      const x = x0 + i * (w + gap);
      const [a1, a2, b2] = [a, b, steps[i][2]];
      s += `<rect class="box" x="${x}" y="16" width="${w}" height="64" rx="6"/><text class="lbl sm" x="${x + w / 2}" y="${a2 ? 36 : 42}" text-anchor="middle">${a1}</text>${a2 ? `<text class="lbl sm" x="${x + w / 2}" y="48" text-anchor="middle">${a2}</text>` : ''}<text class="lbl xs" x="${x + w / 2}" y="68" text-anchor="middle">${b2}</text>`;
      if (i < steps.length - 1) s += `<path class="arrow" d="M${x + w} 48 L${x + w + gap} 48"/>`;
    });
    s += `<text class="lbl" x="180" y="106" text-anchor="middle">Each step can amplify the one before it.</text>`;
    return wrap(s, 'Signal transduction through a G protein–coupled receptor: the G protein is the transducer, the enzyme it turns on is the effector, and the effector makes the second messenger.', 120);
  };


  /* Six drug classes side by side: what sits in the pocket, and the response
     bar (basal level marked) that results. */
  F['classes'] = () => {
    const panels = [
      ['Full agonist', 'binds, activates', 100, 'pocket', 'a', ''],
      ['Partial agonist', 'binds, activates less', 55, 'pocket', 'a', ''],
      ['Reversible antagonist', 'binds, no activation; comes off, more agonist overcomes it', 20, 'block', 'c', ''],
      ['Irreversible antagonist', 'binds for good (covalent); agonist cannot overcome it', 20, 'block', 'b', 'lock'],
      ['Inverse agonist', 'binds, turns activity below basal', 4, 'pocket', 'b', ''],
      ['Allosteric modulator', 'binds a second site; changes what the agonist does', 100, 'both', 'a', 'plus']
    ];
    const pw = 120, ph = 120, cols = 3;
    let out = '';
    panels.forEach(([name, what, level, mode, cls, extra], i) => {
      const x0 = (i % cols) * pw, y0 = Math.floor(i / cols) * ph;
      const cx = x0 + 40, cy = y0 + 58;
      out += `<g transform="translate(${x0} ${y0})">
        <text class="lbl sm" x="${pw / 2}" y="14" text-anchor="middle">${name}</text>
        <path class="shape" d="M14 44 C10 30 30 24 40 26 C50 24 70 30 66 44 C68 70 60 84 40 84 C20 84 12 70 14 44 Z"/>
        <path class="pocket" d="M30 40 C30 32 50 32 50 40 L48 52 C46 60 34 60 32 52 Z"/>`;
      if (mode === 'pocket' || mode === 'both') out += `<circle class="lig ${cls}" cx="40" cy="45" r="7"/>`;
      if (mode === 'block') out += `<rect class="lig ${cls}" x="33" y="38" width="14" height="14" rx="2"/>`;
      if (extra === 'lock') out += `<line class="ax" x1="40" y1="52" x2="40" y2="60"/><line class="ax" x1="36" y1="60" x2="44" y2="60"/><text class="lbl xs" x="40" y="70" text-anchor="middle">covalent</text>`;
      if (extra === 'plus') out += `<path class="pocket" d="M14 54 C14 48 26 48 26 54 L25 62 C24 66 16 66 15 62 Z"/><circle class="lig b" cx="20" cy="57" r="5"/>`;
      // response bar (the caption names it; the dashed line is basal activity)
      const bx = 88, bh = 44, by = 26;
      out += `<rect class="pocket" x="${bx}" y="${by}" width="14" height="${bh}" rx="2"/>
        <line class="dash" x1="${bx - 4}" y1="${by + bh * 0.8}" x2="${bx + 18}" y2="${by + bh * 0.8}"/>
        <rect class="lig ${cls}" x="${bx + 2}" y="${by + bh - bh * level / 100}" width="10" height="${bh * level / 100}"/>
        <text class="lbl xs" x="${bx + 7}" y="${by + bh + 10}" text-anchor="middle">response</text>`;
      // caption inside panel
      const words = what.split(' '); const lines = []; let cur = '';
      words.forEach(w => { if ((cur + ' ' + w).trim().length > 27) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }); lines.push(cur.trim());
      lines.slice(0, 3).forEach((l, k) => { out += `<text class="lbl xs" x="${pw / 2}" y="${94 + k * 9}" text-anchor="middle">${l}</text>`; });
      out += '</g>';
    });
    return wrap(out, 'Drug classes at one receptor. Circle = drug in the agonist pocket; square = drug blocking the pocket; small circle at the side = a drug at a second (allosteric) site. The bar is the response; the dashed line is the receptor’s basal activity with nothing bound.', 240);
  };


  /* Quantal (population) dose–response: two cumulative curves, the effect and
     the toxic/lethal one, with ED50 and LD50 marked. The drawn values follow
     his poll figure (ED50 100 µg/kg, LD50 400 µg/kg → TI = 400/100 = 4). */
  F['quantal'] = () => {
    const xs = x => L + (Math.log10(x) - Math.log10(25)) / (Math.log10(1600) - Math.log10(25)) * (W - L - R);
    const cum = (ed, n) => { const pts = []; for (let x = 25; x <= 1600; x *= 1.06) { const y = 100 * Math.pow(x, n) / (Math.pow(x, n) + Math.pow(ed, n)); pts.push(`${xs(x).toFixed(1)},${py(y).toFixed(1)}`); } return pts.join(' '); };
    const vline = (x, y, cls) => `<line class="dash" x1="${xs(x)}" y1="${py(0)}" x2="${xs(x)}" y2="${py(y)}"/>`;
    let inner = `<line class="ax" x1="${L}" y1="${py(0)}" x2="${W - R}" y2="${py(0)}"/><line class="ax" x1="${L}" y1="${py(0)}" x2="${L}" y2="${T}"/>
      <text class="lbl" x="${(L + W - R) / 2}" y="${H - 1}" text-anchor="middle">dose (µg/kg, log scale)</text>
      <text class="lbl" transform="translate(11 ${(T + py(0)) / 2}) rotate(-90)" text-anchor="middle">% of individuals responding</text>`;
    [50, 100, 200, 400, 800].forEach(v => { inner += `<text class="lbl sm2" x="${xs(v)}" y="${py(0) + 14}" text-anchor="middle">${v}</text>`; });
    inner += dash(-3, 50, 3, 50) + ytick(50, '50%') + ytick(100, '100%');
    inner += vline(100, 50) + vline(400, 50) + vline(200, 99) + vline(175, 1);
    inner += `<polyline class="cv a" points="${cum(100, 4)}"/><polyline class="cv b" points="${cum(400, 4)}"/>`;
    inner += `<text class="cl a" x="${xs(30)}" y="${py(92)}">effect (hypnosis)</text><text class="cl b" x="${xs(1500)}" y="${py(40)}" text-anchor="end">toxic (death)</text>`;
    inner += `<text class="cl a" x="${xs(100)}" y="${py(0) + 26}" text-anchor="middle">ED50</text><text class="cl b" x="${xs(400)}" y="${py(0) + 26}" text-anchor="middle">LD50</text>
      <text class="cl a" x="${xs(215)}" y="${py(99) - 4}" text-anchor="start">ED99</text><text class="cl b" x="${xs(168)}" y="${py(1) - 8}" text-anchor="end">LD1</text>`;
    return wrap(inner, 'Quantal dose–response curves: each point is the percentage of the population that shows the all-or-none response at that dose. ED50 is the dose effective in half the population, LD50 the dose lethal to half. Therapeutic index = LD50 / ED50; here 400 / 100 = 4. When the ED99 sits to the right of the LD1 the two curves overlap: some patients reach the toxic dose before the last patients respond.');
  };

  /* Drug–drug at one receptor. Top: five receptors in the membrane at one
     agonist dose, first with the agonist alone (the start, dashed curve) and
     then with the second drug added (the shift, solid curve). A receptor is
     drawn active (filled body, signal arrow into the cell) or inactive (empty
     body). The bar under each row is the response at that dose. Bottom: what
     the agonist's dose–response curve does. Rules from the Day 3–4 slides and
     the 9/28 lecture (notes/L04.md). */
  const SHIFT = (() => {
    const HT = 300;                                  // panel height
    const X0 = 52, PW = 296, Y0 = 138, PH = 106;     // plot box (bottom band)
    const lpx = x => X0 + (x + 3) / 6 * PW, lpy = y => Y0 + (1 - y / 100) * PH;
    const lsig = (ec, emax, base, n = 1) => { const pts = []; for (let x = -3; x <= 3.001; x += 0.1) { const y = base + (emax - base) * Math.pow(10, n * x) / (Math.pow(10, n * x) + Math.pow(10, n * ec)); pts.push(`${lpx(x).toFixed(1)},${lpy(y).toFixed(1)}`); } return pts.join(' '); };
    const curve = (ec, emax, base, cls, dashed) => `<polyline class="cv ${cls}${dashed ? ' dashed' : ''}" points="${lsig(ec, emax, base)}"/>`;
    const axes = () => `<line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0 + PW}" y2="${lpy(0)}"/><line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0}" y2="${Y0}"/>
      <text class="lbl xs" x="${X0 + PW / 2}" y="${lpy(0) + 12}" text-anchor="middle">log dose of the full agonist</text>
      <text class="lbl xs" x="${X0 - 4}" y="${lpy(100) + 3}" text-anchor="end">100%</text><text class="lbl xs" x="${X0 - 4}" y="${lpy(0) + 3}" text-anchor="end">0</text>
      <text class="lbl xs" x="${X0}" y="${lpy(0) + 26}" text-anchor="start">dashed = agonist alone</text><text class="lbl xs" x="${X0}" y="${lpy(0) + 36}" text-anchor="start">solid = with the second drug</text>`;
    const arrowH = (x1, x2, y) => `<path class="arrow" d="M${lpx(x1)} ${lpy(y)} L${lpx(x2)} ${lpy(y)}"/>`;
    const arrowV = (x, y1, y2) => `<path class="arrow" d="M${lpx(x)} ${lpy(y1)} L${lpx(x)} ${lpy(y2)}"/>`;
    const legend = lines => lines.map((t, i) => `<text class="lbl xs" x="${X0 + PW}" y="${lpy(0) + 26 + i * 10}" text-anchor="end">${t}</text>`).join('');

    // one receptor in the membrane. r = {lig, side, act (0, 0.5, 1), dead}
    const LIG = { ag: 'a', ag2: 'c', pa: 'c', inv: 'b', ant: 'c', irr: 'b' };
    const cell = (x, y, r) => {
      const cx = x + 13;
      const body = r.act >= 1 ? `fill="var(--accent)" fill-opacity="0.28" stroke="var(--accent)"` :
                   r.act > 0 ? `fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-dasharray="3 2"` :
                   `fill="var(--chip)" stroke="${r.dead ? 'var(--bad)' : 'var(--muted)'}"`;
      let g = `<rect x="${x + 3}" y="${y + 6}" width="20" height="28" rx="5" ${body} stroke-width="1.3"/>`;
      g += `<path class="pocket" d="M${cx - 5} ${y + 6} a5 5 0 0 0 10 0 Z"/>`;      // agonist pocket, opening up
      if (r.side) g += `<circle class="pocket" cx="${x + 23}" cy="${y + 22}" r="3.6"/><circle class="lig ${r.side === 'pam' ? 'c' : 'b'}" cx="${x + 23}" cy="${y + 22}" r="3"/>`;
      const k = r.lig;
      if (k === 'ag' || k === 'ag2' || k === 'inv') g += `<circle class="lig ${LIG[k]}" cx="${cx}" cy="${y + 7}" r="4.6"/>`;
      if (k === 'pa') g += `<circle class="lig c" cx="${cx}" cy="${y + 7}" r="4.6" opacity="0.45"/><circle cx="${cx}" cy="${y + 7}" r="4.6" fill="none" stroke="var(--ok)" stroke-width="1"/>`;
      if (k === 'ant') g += `<rect class="lig c" x="${cx - 4.5}" y="${y + 2.5}" width="9" height="9" rx="1.5"/>`;
      if (k === 'irr') g += `<rect class="lig b" x="${cx - 4.5}" y="${y + 2.5}" width="9" height="9" rx="1.5"/><path d="M${cx - 3} ${y + 12} h6 v5 h-6 z M${cx - 1.6} ${y + 12} v-2 a1.6 1.6 0 0 1 3.2 0 v2" fill="none" stroke="var(--bad)" stroke-width="1"/>`;
      // signal into the cell: full arrow when active, short dashed arrow when partly active
      if (r.act >= 1) g += `<path class="arrow" d="M${cx} ${y + 36} L${cx} ${y + 48}"/>`;
      else if (r.act > 0) g += `<path class="arrow" d="M${cx} ${y + 36} L${cx} ${y + 44}" stroke-dasharray="2 2"/>`;
      if (r.dead) g += `<line x1="${x + 5}" y1="${y + 38}" x2="${x + 21}" y2="${y + 38}" stroke="var(--bad)" stroke-width="1.6"/>`;
      return g;
    };
    // a card: title, membrane band, five receptors, response bar, two note lines
    const card = (x, title, cls, rs, level, notes) => {
      const y = 0, w = 172;
      let g = `<text class="cl ${cls}" x="${x + w / 2}" y="${y + 11}" text-anchor="middle">${title}</text>`;
      g += `<rect x="${x}" y="${y + 24}" width="${w}" height="14" fill="var(--chip)" opacity="0.7"/>`;       // membrane band
      g += `<text class="lbl xs" x="${x + 2}" y="${y + 22}" text-anchor="start">outside</text><text class="lbl xs" x="${x + 2}" y="${y + 68}" text-anchor="start">cell</text>`;
      rs.forEach((r, i) => { g += cell(x + 34 + i * 27, y + 14, r); });
      const bx = x + 46, bw = 110, by = y + 76;
      g += `<text class="lbl xs" x="${bx - 4}" y="${by + 6}" text-anchor="end">response</text>`;
      g += `<rect x="${bx}" y="${by}" width="${bw}" height="6" rx="3" fill="var(--chip)" stroke="var(--line)" stroke-width="0.8"/>`;
      if (level > 0) g += `<rect x="${bx}" y="${by}" width="${(bw * level).toFixed(1)}" height="6" rx="3" fill="var(--accent)"/>`;
      g += `<text class="lbl xs" x="${x + w / 2}" y="${by + 22}" text-anchor="middle">${notes[0] || ''}</text><text class="lbl xs" x="${x + w / 2}" y="${by + 32}" text-anchor="middle">${notes[1] || ''}</text>`;
      return g;
    };
    const R = (lig, act, extra) => Object.assign({ lig, act: act == null ? (lig === 'ag' || lig === 'ag2' ? 1 : 0) : act }, extra || {});
    const top = (startRs, startLvl, startNotes, title2, cls2, shiftRs, shiftLvl, shiftNotes) =>
      card(2, 'START: full agonist alone', 'a', startRs, startLvl, startNotes) +
      `<path class="arrow" d="M176 44 L184 44"/>` +
      card(186, title2, cls2, shiftRs, shiftLvl, shiftNotes) +
      `<line class="dash" x1="2" y1="${Y0 - 12}" x2="358" y2="${Y0 - 12}"/>`;
    const panel = (inner, cap) => wrap(inner, cap, HT);
    // the start row for most cases: at this agonist dose three of five receptors are bound and active
    const START = [R('ag'), R(null), R('ag'), R(null), R('ag')];
    const F2 = {};

    F2['shift-fafa'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + second full agonist', 'c', [R('ag'), R('ag2'), R('ag'), R('ag2'), R('ag')], 1, ['second agonist fills the empty pockets', 'and activates them just as well']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(-1, 100, 30, 'c') + arrowH(0, -1, 50) + arrowV(-2.6, 2, 28) +
      legend(['shift LEFT · baseline UP · Emax same']),
      'Full agonist + a second full agonist (norepinephrine + epinephrine at β1). Start: at this dose three of five receptors hold the agonist and signal. Shift: the second agonist occupies the empty pockets and activates them the same way, so the same agonist dose gives more response (curve moves left), there is response before any agonist is given (baseline up), and the maximum is unchanged.');

    F2['shift-fapa'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + partial agonist', 'c', [R('pa', 0.5), R('pa', 0.5), R('ag'), R('pa', 0.5), R('pa', 0.5)], 0.5, ['partial agonist takes pockets (mass action)', 'and activates each only part way']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0, 60, 40, 'c') + arrowV(-2.6, 2, 38) + arrowV(2.6, 98, 62) +
      legend(['response ENDS AT the partial agonist’s own Emax', 'low baseline: up · full response: pulled down']),
      'Full agonist + partial agonist (dopamine + aripiprazole). Start: three of five receptors hold the full agonist and signal fully. Shift: by mass action the partial agonist takes over pockets and activates each one only part way, so the response is pulled toward the partial agonist’s own maximum: up from a low baseline, down from a full response. Only the full agonist alone reaches 100%.');

    F2['shift-inverse'] = () => panel(
      top([R('ag'), R(null, 1), R('ag'), R(null, 1), R(null)], 0.8, ['two empty receptors active on their own', '= constitutive activity, the baseline'],
          'SHIFT: + inverse agonist', 'b', [R('ag'), R('inv'), R('ag'), R('inv'), R('inv')], 0.4, ['holds the empty receptors inactive;', 'comes off, so more agonist still wins']) +
      axes() + curve(0, 100, 30, 'a', true) + curve(1, 100, 0, 'b') + arrowH(0, 1, 50) + arrowV(-2.6, 28, 2) +
      legend(['shift RIGHT · baseline DOWN to 0 · Emax same']),
      'Full agonist + inverse agonist (histamine + loratadine at a constitutively active receptor). Start: some receptors are active with an empty pocket, which is the baseline above zero. Shift: the inverse agonist binds those receptors and holds them inactive, so the baseline falls to zero and the agonist needs more dose (curve moves right); the inverse agonist is reversible, so enough agonist still reaches the same maximum.');

    F2['shift-competitive'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + reversible antagonist', 'c', [R('ag'), R('ant'), R('ant'), R('ant'), R('ag')], 0.4, ['fills pockets without signalling;', 'comes off: more agonist takes them back']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(1, 100, 0, 'c') + curve(2, 100, 0, 'c') + arrowH(0, 1, 50) +
      legend(['shift RIGHT · baseline same · Emax same', 'symmetrical steps, no limit']),
      'Full agonist + reversible (competitive) antagonist (norepinephrine + metoprolol). Start: three of five receptors hold the agonist and signal. Shift: the antagonist occupies pockets but produces no signal, and because it comes off, a higher agonist dose wins the pockets back: parallel shifts to the right, equal steps for equal antagonist doses, the same maximum, and the baseline untouched (no efficacy).');

    F2['shift-irreversible'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + irreversible antagonist', 'b', [R('irr', 0, { dead: true }), R('ag'), R('irr', 0, { dead: true }), R('irr', 0, { dead: true }), R('ag')], 0.4, ['bound for good: those receptors leave', 'the pool; no agonist dose frees them']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0.7, 100, 0, 'b') + curve(1.2, 60, 0, 'b') + curve(1.6, 25, 0, 'b') + arrowH(0, 0.7, 50) + arrowV(2.6, 98, 27) +
      legend(['shift RIGHT, then Emax DOWN toward 0', 'spare receptors delay the drop']),
      'Full agonist + irreversible antagonist (norepinephrine + phenoxybenzamine). Start: three of five receptors hold the agonist and signal. Shift: the antagonist binds covalently and never comes off, so those receptors leave the pool for good. While spare receptors remain the curve only shifts right; once too few receptors are left the maximum falls, and enough antagonist abolishes the response.');

    F2['shift-allo-agonist'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + allosteric agonist', 'c', [R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R(null, 0, { side: 'pam' }), R('ag', 1, { side: 'pam' })], 0.8, ['second site; agonist stays in its pocket', 'binds better (affinity): more are active']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(-0.6, 100, 0, 'c') + curve(-0.95, 100, 0, 'c') + curve(-1.1, 100, 0, 'c') + arrowH(0, -1.1, 50) +
      legend(['affinity: shift LEFT, shrinking steps, then stop', 'efficacy: rises only if the agonist is partial']),
      'Full agonist + allosteric agonist (positive allosteric modulator, e.g. diazepam at the GABA receptor). Start: three of five receptors hold the agonist and signal. Shift: the modulator binds a second site while the agonist stays in its pocket; the agonist now binds better, so more receptors are active at the same dose. Affinity effect: leftward shifts that get smaller and stop once every allosteric site is filled (asymmetrical, saturable). Efficacy effect: a partial agonist’s curve rises; a full agonist is already at 100%.');

    F2['shift-allo-antagonist'] = () => panel(
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + allosteric antagonist', 'b', [R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' })], 0.3, ['second site; the agonist still binds', 'but each bound receptor signals less']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0.6, 100, 0, 'b') + curve(0.95, 75, 0, 'b') + curve(1.1, 60, 0, 'b') + arrowH(0, 0.6, 50) + arrowV(2.6, 98, 62) +
      legend(['affinity: shift RIGHT (asymmetrical, saturable)', 'efficacy: Emax DOWN, but never to 0']),
      'Full agonist + allosteric antagonist (negative allosteric modulator). Start: three of five receptors hold the agonist and signal. Shift: the modulator binds a second site and is reversible; the agonist still binds, but affinity falls (right shift, same maximum) or each bound receptor signals less (maximum falls). Its sites fill up, so the shifts are unequal and stop, and it cannot abolish the response the way an irreversible antagonist can.');
    return F2;
  })();
  Object.assign(F, SHIFT);

  /* A question's own graph: dose–response curves labelled by letter, drawn
     from a spec so the stem can show the figure the way a poll slide does.
     spec = {curves:[{label:'A', ec:-1, emax:100, base:0, dashed:true, cls:'a'}],
             base:0, x:'log dose', y:'% response', marks:[{x:-1,label:'EC50'}], caption:''}
     ec is log10 of the EC50 on a −3…3 axis; emax and base are percent. */
  const GRAPH = spec => {
    if (!spec || !spec.curves) return '';
    const cls = ['a', 'b', 'c', 'd', 'e'];
    let inner = axes(spec.x || 'log dose', spec.y || '% of maximal response');
    const b = spec.base || 0;
    if (b) inner += dash(-3, b, 3, b) + ytick(b, 'basal');
    (spec.marks || []).forEach(m => { inner += dash(m.x, 0, m.x, m.y == null ? 50 : m.y) + tick(m.x, m.label); });
    spec.curves.forEach((c, i) => {
      const pts = sig(c.ec, c.emax, c.n || 1, c.base == null ? b : c.base);
      const k = c.cls || cls[i % cls.length];
      inner += `<polyline class="cv ${k}${c.dashed ? ' dashed' : ''}" points="${pts}"/>`;
      // label at the curve's own midpoint, on the left of it, where curves separate
      const cb = c.base == null ? b : c.base, mid = cb + (c.emax - cb) / 2;
      inner += `<text class="cl ${k}" x="${px(c.ec) - 6}" y="${py(mid) + 4}" text-anchor="end">${c.label}</text>`;
    });
    return wrap(inner, spec.caption || '');
  };

  const api = key => (F[key] ? F[key]() : '');
  api.graph = GRAPH;
  return api;
})();
