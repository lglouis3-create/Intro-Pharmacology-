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
  const capText = cap => Array.isArray(cap) ? cap.join(' ') : cap;
  const capHTML = cap => Array.isArray(cap) ? `<ul>${cap.map(t => `<li>${t}</li>`).join('')}</ul>` : cap;
  const wrap = (inner, cap, h = H) => `<figure class="fig"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${capText(cap).replace(/"/g, '&quot;')}"><defs><marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>${inner}</svg><figcaption>${capHTML(cap)}</figcaption></figure>`;
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
      ['Reversible antagonist', 'alone: stays at basal; with an agonist: shifts it right, same Emax', 20, 'block', 'c', ''],
      ['Irreversible antagonist', 'alone: stays at basal; with an agonist: Emax falls toward 0', 20, 'block', 'b', 'lock'],
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
    return wrap(out, 'Drug classes at one receptor, each drug given ALONE. Circle = drug in the agonist pocket; square = drug blocking the pocket; small circle at the side = a drug at a second (allosteric) site. The bar is the response; the dashed line is the receptor’s basal activity with nothing bound. Neither antagonist moves the response off basal on its own (no efficacy); only the inverse agonist takes it below basal. What an antagonist does to an agonist’s curve is shown in the shift panels on Tell apart.', 240);
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

  /* One receptor in the membrane, 26 wide × 48 tall from (x, y). r = {lig, side, act (0, 0.5, 1), dead}.
     Ligands: ag/ag2 agonist (circle, A/C), pa partial (translucent circle), inv inverse agonist (circle, B),
     ant reversible antagonist (square, C), irr irreversible antagonist (square + lock, B). */
  // one receptor in the membrane. r = {lig, side, act (0, 0.5, 1), dead}
  const LIG = { ag: 'a', ag2: 'c', pa: 'c', inv: 'b', ant: 'c', irr: 'b' };
  const cell = (x, y, r) => {
    const cx = x + 13;
    const body = r.act >= 1 ? `fill="var(--figA)" fill-opacity="0.28" stroke="var(--figA)"` :
                 r.act > 0 ? `fill="var(--figA)" fill-opacity="0.12" stroke="var(--figA)" stroke-dasharray="3 2"` :
                 `fill="var(--chip)" stroke="${r.dead ? 'var(--figB)' : 'var(--muted)'}"`;
    let g = `<rect x="${x + 3}" y="${y + 6}" width="20" height="28" rx="5" ${body} stroke-width="1.3"/>`;
    g += `<path class="pocket" d="M${cx - 5} ${y + 6} a5 5 0 0 0 10 0 Z"/>`;      // agonist pocket, opening up
    if (r.side) g += `<circle class="pocket" cx="${x + 23}" cy="${y + 22}" r="3.6"/><circle class="lig ${r.side === 'pam' ? 'c' : 'b'}" cx="${x + 23}" cy="${y + 22}" r="3"/>`;
    const k = r.lig;
    if (k === 'ag' || k === 'ag2' || k === 'inv') g += `<circle class="lig ${LIG[k]}" cx="${cx}" cy="${y + 7}" r="4.6"/>`;
    if (k === 'pa') g += `<circle class="lig c" cx="${cx}" cy="${y + 7}" r="4.6" opacity="0.45"/><circle cx="${cx}" cy="${y + 7}" r="4.6" fill="none" stroke="var(--figC)" stroke-width="1"/>`;
    if (k === 'ant') g += `<rect class="lig c" x="${cx - 4.5}" y="${y + 2.5}" width="9" height="9" rx="1.5"/>`;
    if (k === 'irr') g += `<rect class="lig b" x="${cx - 4.5}" y="${y + 2.5}" width="9" height="9" rx="1.5"/><path d="M${cx - 3} ${y + 12} h6 v5 h-6 z M${cx - 1.6} ${y + 12} v-2 a1.6 1.6 0 0 1 3.2 0 v2" fill="none" stroke="var(--figB)" stroke-width="1"/>`;
    // signal into the cell: full arrow when active, short dashed arrow when partly active
    if (r.act >= 1) g += `<path class="arrow" d="M${cx} ${y + 36} L${cx} ${y + 48}"/>`;
    else if (r.act > 0) g += `<path class="arrow" d="M${cx} ${y + 36} L${cx} ${y + 44}" stroke-dasharray="2 2"/>`;
    if (r.dead) g += `<line x1="${x + 5}" y1="${y + 38}" x2="${x + 21}" y2="${y + 38}" stroke="var(--figB)" stroke-width="1.6"/>`;
    return g;
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
      if (level > 0) g += `<rect x="${bx}" y="${by}" width="${(bw * level).toFixed(1)}" height="6" rx="3" fill="var(--figA)"/>`;
      g += `<text class="lbl xs" x="${x + w / 2}" y="${by + 22}" text-anchor="middle">${notes[0] || ''}</text><text class="lbl xs" x="${x + w / 2}" y="${by + 32}" text-anchor="middle">${notes[1] || ''}</text>`;
      return g;
    };
    const R = (lig, act, extra) => Object.assign({ lig, act: act == null ? (lig === 'ag' || lig === 'ag2' ? 1 : 0) : act }, extra || {});
    const top = (startRs, startLvl, startNotes, title2, cls2, shiftRs, shiftLvl, shiftNotes) =>
      card(2, 'START: full agonist alone', 'a', startRs, startLvl, startNotes) +
      `<path class="arrow" d="M176 44 L184 44"/>` +
      card(186, title2, cls2, shiftRs, shiftLvl, shiftNotes) +
      `<line class="dash" x1="2" y1="${Y0 - 12}" x2="358" y2="${Y0 - 12}"/>`;
    // title line on top; everything else moves down to make room
    const panel = (title, inner, cap) => wrap(`<text class="title" x="180" y="11" text-anchor="middle">${title}</text><g transform="translate(0 16)">${inner}</g>`, cap, HT + 16);
    // the start row for most cases: at this agonist dose three of five receptors are bound and active
    const START = [R('ag'), R(null), R('ag'), R(null), R('ag')];
    const F2 = {};

    F2['shift-fafa'] = () => panel('Full agonist + full agonist · NE + epinephrine at β1',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + second full agonist', 'c', [R('ag'), R('ag2'), R('ag'), R('ag2'), R('ag')], 1, ['second agonist fills the empty pockets', 'and activates them just as well']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(-1, 100, 30, 'c') + arrowH(0, -1, 50) + arrowV(-2.6, 2, 28) +
      legend(['shift LEFT · baseline UP · Emax same']),
      ['<b>Start:</b> at this dose three of five receptors hold norepinephrine and signal.',
       '<b>Shift:</b> epinephrine occupies the empty pockets and activates them the same way, so the same norepinephrine dose gives more response.',
       '<b>Curve:</b> moves left; there is response before any norepinephrine is given (baseline up); the maximum is unchanged.',
       '<b>Rule:</b> two full agonists at one receptor add up; either one alone reaches 100%.']);

    F2['shift-fapa'] = () => panel('Full agonist + partial agonist · dopamine + aripiprazole',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + partial agonist', 'c', [R('pa', 0.5), R('pa', 0.5), R('ag'), R('pa', 0.5), R('pa', 0.5)], 0.5, ['partial agonist takes pockets (mass action)', 'and activates each only part way']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0, 60, 40, 'c') + arrowV(-2.6, 2, 38) + arrowV(2.6, 98, 62) +
      legend(['response ENDS AT the partial agonist’s own Emax', 'low baseline: up · full response: pulled down']),
      ['<b>Start:</b> three of five receptors hold the full agonist and signal fully.',
       '<b>Shift:</b> by mass action the partial agonist takes over pockets and activates each one only part way.',
       '<b>Curve:</b> the response is pulled toward the partial agonist’s own maximum: up from a low baseline, down from a full response.',
       '<b>Rule:</b> only the full agonist alone reaches 100%.']);

    F2['shift-inverse'] = () => panel('Full agonist + inverse agonist · histamine + loratadine at H1',
      top([R('ag'), R(null, 1), R('ag'), R(null, 1), R(null)], 0.8, ['two empty receptors active on their own', '= constitutive activity, the baseline'],
          'SHIFT: + inverse agonist', 'b', [R('ag'), R('inv'), R('ag'), R('inv'), R('inv')], 0.4, ['holds the empty receptors inactive;', 'comes off, so more agonist still wins']) +
      axes() + curve(0, 100, 30, 'a', true) + curve(1, 100, 0, 'b') + arrowH(0, 1, 50) + arrowV(-2.6, 28, 2) +
      legend(['shift RIGHT · baseline DOWN to 0 · Emax same']),
      ['<b>Start:</b> some receptors are active with an empty pocket (constitutive activity), which is why the baseline sits above zero.',
       '<b>Shift:</b> the inverse agonist binds those receptors and holds them inactive.',
       '<b>Curve:</b> baseline falls to zero and the agonist needs more dose (moves right).',
       '<b>Rule:</b> the inverse agonist is reversible, so enough agonist still reaches the same maximum.']);

    F2['shift-competitive'] = () => panel('Full agonist + reversible antagonist · NE + metoprolol at β1',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + reversible antagonist', 'c', [R('ag'), R('ant'), R('ant'), R('ant'), R('ag')], 0.4, ['fills pockets without signalling;', 'comes off: more agonist takes them back']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(1, 100, 0, 'c') + curve(2, 100, 0, 'c') + arrowH(0, 1, 50) +
      legend(['shift RIGHT · baseline same · Emax same', 'symmetrical steps, no limit']),
      ['<b>Start:</b> three of five receptors hold norepinephrine and signal.',
       '<b>Shift:</b> metoprolol occupies pockets but produces no signal; because it comes off, a higher norepinephrine dose wins the pockets back.',
       '<b>Curve:</b> parallel shifts to the right, equal steps for equal antagonist doses, no limit.',
       '<b>Rule:</b> same maximum, baseline untouched (no efficacy).']);

    F2['shift-irreversible'] = () => panel('Full agonist + irreversible antagonist · NE + phenoxybenzamine at α1',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + irreversible antagonist', 'b', [R('irr', 0, { dead: true }), R('ag'), R('irr', 0, { dead: true }), R('irr', 0, { dead: true }), R('ag')], 0.4, ['bound for good: those receptors leave', 'the pool; no agonist dose frees them']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0.7, 100, 0, 'b') + curve(1.2, 60, 0, 'b') + curve(1.6, 25, 0, 'b') + arrowH(0, 0.7, 50) + arrowV(2.6, 98, 27) +
      legend(['shift RIGHT, then Emax DOWN toward 0', 'spare receptors delay the drop']),
      ['<b>Start:</b> three of five receptors hold norepinephrine and signal.',
       '<b>Shift:</b> phenoxybenzamine binds covalently and never comes off, so those receptors leave the pool for good.',
       '<b>Curve:</b> while spare receptors remain the curve only shifts right; once too few receptors are left the maximum falls.',
       '<b>Rule:</b> enough antagonist abolishes the response.']);

    F2['shift-allo-agonist'] = () => panel('Full agonist + allosteric agonist (PAM) · GABA + diazepam',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + allosteric agonist', 'c', [R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R(null, 0, { side: 'pam' }), R('ag', 1, { side: 'pam' })], 0.8, ['second site; agonist stays in its pocket', 'binds better (affinity): more are active']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(-0.6, 100, 0, 'c') + curve(-0.95, 100, 0, 'c') + curve(-1.1, 100, 0, 'c') + arrowH(0, -1.1, 50) +
      legend(['affinity: shift LEFT, shrinking steps, then stop', 'efficacy: rises only if the agonist is partial']),
      ['<b>Start:</b> three of five receptors hold GABA and signal.',
       '<b>Shift:</b> diazepam binds a second site while GABA stays in its pocket; GABA now binds better, so more receptors are active at the same dose.',
       '<b>Curve (affinity):</b> leftward shifts that get smaller and stop once every allosteric site is filled (asymmetrical, saturable).',
       '<b>Curve (efficacy):</b> a partial agonist’s curve rises; a full agonist is already at 100%.']);

    F2['shift-allo-antagonist'] = () => panel('Full agonist + allosteric antagonist (NAM) · agonist + modulator',
      top(START, 0.6, ['3 of 5 receptors active', 'at this agonist dose'],
          'SHIFT: + allosteric antagonist', 'b', [R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' })], 0.3, ['second site; the agonist still binds', 'but each bound receptor signals less']) +
      axes() + curve(0, 100, 0, 'a', true) + curve(0.6, 100, 0, 'b') + curve(0.95, 75, 0, 'b') + curve(1.1, 60, 0, 'b') + arrowH(0, 0.6, 50) + arrowV(2.6, 98, 62) +
      legend(['affinity: shift RIGHT (asymmetrical, saturable)', 'efficacy: Emax DOWN, but never to 0']),
      ['<b>Start:</b> three of five receptors hold the agonist and signal.',
       '<b>Shift:</b> the modulator binds a second site and is reversible; the agonist still binds.',
       '<b>Curve (affinity):</b> right shift with the same maximum; the sites fill up, so the shifts are unequal and stop.',
       '<b>Curve (efficacy):</b> each bound receptor signals less, so the maximum falls, but never to zero the way an irreversible antagonist can take it.']);
    return F2;
  })();
  Object.assign(F, SHIFT);

  /* Day 1–2 and Day 5 process figures: the GPCR steps, the indirect antagonists
     (upstream of the receptor: transporter or enzyme; downstream: PDE, RAS), and
     receptor regulation (rapid desensitization, long-term down-regulation,
     up- versus down-regulation). Sources: Day 1 slides ~51–~54 and the 9/23
     transcript; Part 2 pages 4–13, 17–28 and the 9/29 transcript. */
  const EXTRA = (() => {
    const F3 = {};
    const title = t => `<text class="title" x="180" y="11" text-anchor="middle">${t}</text>`;
    const xs = (x, y, t, anchor = 'start', cls = '') => `<text class="lbl xs ${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
    const sm = (x, y, t, anchor = 'middle') => `<text class="lbl sm" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
    const box = (x, y, w, h, t, t2) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` + sm(x + w / 2, y + (t2 ? h / 2 - 1 : h / 2 + 4), t) + (t2 ? xs(x + w / 2, y + h / 2 + 9, t2, 'middle') : '');
    const arr = (x1, y1, x2, y2, dashed) => `<path class="arrow" d="M${x1} ${y1} L${x2} ${y2}"${dashed ? ' stroke-dasharray="3 2"' : ''}/>`;
    const band = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" fill="var(--chip)" opacity="0.7"/>`;
    const dot = (x, y, cls = 'a', r = 3.5) => `<circle class="lig ${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    // the blocking drug: a vermilion square with a cross, plus its name
    const block = (x, y, name) => `<rect class="lig b" x="${x - 6}" y="${y - 6}" width="12" height="12" rx="2"/><path d="M${x - 3.5} ${y - 3.5} L${x + 3.5} ${y + 3.5} M${x + 3.5} ${y - 3.5} L${x - 3.5} ${y + 3.5}" stroke="#fff" stroke-width="1.6"/>` + (name ? `<text class="cl b" x="${x + 9}" y="${y + 4}" text-anchor="start">${name}</text>` : '');
    const num = (x, y, n, cls = 'a') => `<circle cx="${x}" cy="${y}" r="6.5" fill="var(--fig${cls === 'b' ? 'B' : 'A'})"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff">${n}</text>`;
    // a small dose–response plot at the bottom of a panel
    const plot = (Y0, PH, X0 = 52, PW = 296) => {
      const lpx = x => X0 + (x + 3) / 6 * PW, lpy = y => Y0 + (1 - y / 100) * PH;
      const lsig = (ec, emax, base) => { const pts = []; for (let x = -3; x <= 3.001; x += 0.1) { const y = base + (emax - base) * Math.pow(10, x) / (Math.pow(10, x) + Math.pow(10, ec)); pts.push(`${lpx(x).toFixed(1)},${lpy(y).toFixed(1)}`); } return pts.join(' '); };
      return {
        lpx, lpy,
        curve: (ec, emax, base, cls, dashed) => `<polyline class="cv ${cls}${dashed ? ' dashed' : ''}" points="${lsig(ec, emax, base)}"/>`,
        flat: (y, cls) => `<line class="cv ${cls}" x1="${lpx(-3)}" y1="${lpy(y)}" x2="${lpx(3)}" y2="${lpy(y)}"/>`,
        axes: (xl, key) => `<line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0 + PW}" y2="${lpy(0)}"/><line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0}" y2="${Y0}"/>` +
          xs(X0 + PW / 2, lpy(0) + 12, xl, 'middle') + xs(X0 - 4, lpy(100) + 3, '100%', 'end') + xs(X0 - 4, lpy(0) + 3, '0', 'end') +
          xs(X0, lpy(0) + 26, key[0]) + xs(X0, lpy(0) + 36, key[1]),
        arrowH: (x1, x2, y) => `<path class="arrow" d="M${lpx(x1)} ${lpy(y)} L${lpx(x2)} ${lpy(y)}"/>`,
        arrowV: (x, y1, y2) => `<path class="arrow" d="M${lpx(x)} ${lpy(y1)} L${lpx(x)} ${lpy(y2)}"/>`,
        legend: lines => lines.map((t, i) => xs(X0 + PW, lpy(0) + 26 + i * 10, t, 'end')).join('')
      };
    };
    const notes = (x, y, lines) => lines.map((t, i) => xs(x, y + i * 10, t)).join('');

    /* ---------- GPCR steps ---------- */
    F3['gpcr-steps'] = () => {
      let g = title('GPCR signalling: NE at β1 in the heart, forward and back');
      g += xs(6, 34, 'outside') + band(6, 40, 348) + xs(6, 68, 'inside the cell');
      g += cell(60, 20, { lig: 'ag', act: 1 }) + num(50, 24, '1') + num(94, 38, 'R3', 'b');
      g += `<circle cx="66" cy="92" r="8" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.2"/>` + xs(66, 95, 'αs', 'middle') +
           `<circle cx="84" cy="82" r="6" class="box"/><circle cx="92" cy="96" r="5" class="box"/>` + xs(84, 85, 'β', 'middle') + xs(92, 99, 'γ', 'middle') +
           xs(66, 112, 'GDP off · GTP on', 'middle') + num(44, 86, '2') + num(112, 110, 'R1', 'b');
      g += arr(76, 88, 150, 56) + box(152, 36, 44, 24, 'AC') + num(206, 40, '3');
      g += arr(174, 60, 174, 72) + xs(174, 84, 'ATP → cAMP', 'middle') + num(216, 82, '4') + num(140, 82, 'R2', 'b');
      g += arr(174, 88, 174, 98) + box(156, 100, 36, 16, 'PKA') + num(206, 108, '5');
      g += arr(174, 116, 174, 126) + xs(174, 138, 'Ca++ in → ↑ heart rate', 'middle') + num(238, 136, '6');
      g += notes(250, 34, ['signal = NE', 'receptor = β1', 'transducer = Gs (αs, β, γ)', 'effector = AC', 'second messengers =', '  cAMP, PKA, Ca++', 'response = ↑ heart rate']);
      g += `<line class="dash" x1="6" y1="148" x2="354" y2="148"/>`;
      g += notes(6, 162, ['1  NE (signal) binds β1 (receptor)', '2  receptor changes shape: GDP falls off, a new', '    GTP binds (exchange); αs (transducer) leaves β/γ', '3  αs turns on adenylate cyclase (effector)', '4  AC makes cAMP from ATP (2nd messenger);', '    one AC makes many cAMP: amplification', '5  cAMP activates protein kinase A (PKA)', '6  Ca++ enters: faster, stronger heartbeat']);
      g += `<text class="cl b" x="200" y="162" text-anchor="start">What ends it (R = reverse step)</text>`;
      g += notes(200, 174, ['R1 one phosphate is cut off GTP (GTPase,', '    sped up by RGS): GDP; α rejoins β/γ', 'R2 PDE breaks down cAMP', 'R3 NE comes off the receptor']);
      return wrap(g, ['<b>Forward (1–6)</b><ol><li>NE, the signal, binds β1, the receptor.</li><li>The receptor changes shape; GDP falls off the α subunit and a new GTP binds in its place (an exchange, not a phosphate added); αs separates from β/γ.</li><li>αs turns on adenylate cyclase, the effector.</li><li>AC makes cAMP from ATP: the second messenger; one AC makes many cAMP (amplification).</li><li>cAMP activates protein kinase A.</li><li>Ca++ enters: faster, stronger heartbeat.</li></ol>',
        '<b>Back (R1–R3, the reverse steps that end the signal)</b><ol><li>One phosphate is cut off the GTP (GTPase; RGS speeds it): it is GDP again and α rejoins β/γ.</li><li>PDE breaks down cAMP.</li><li>NE comes off the receptor.</li></ol>',
        '<b>Vocabulary he tests</b><ul><li>signal: NE</li><li>receptor: β1</li><li>transducer: the G protein (αs, αi or αq)</li><li>effector: adenylate cyclase or phospholipase C</li><li>second messenger: cAMP, PKA, PKC, IP3, Ca++</li><li>Gαi uses the same AC in the opposite direction (less cAMP); Gαq uses PLC → IP3 and Ca++</li></ul>',
        '<b>Step through it:</b> the figure below walks the same cascade one step at a time.'], 246);
    };

    /* ---------- indirect antagonists ---------- */
    // a synapse: nerve terminal releases transmitter; receptors on the far side; the target sits in the cleft
    const synapse = (nt, target) => {
      let g = `<rect class="box" x="10" y="22" width="96" height="48" rx="4"/>` + xs(58, 64, 'nerve terminal', 'middle') + dot(30, 36, 'a') + dot(44, 44, 'a') + dot(58, 34, 'a') + dot(80, 42, 'a');
      g += arr(50, 70, 50, 80) + xs(56, 79, `${nt} released`);
      g += dot(40, 92, 'a') + dot(56, 98, 'a') + dot(72, 90, 'a') + dot(88, 97, 'a') + dot(104, 93, 'a');
      g += band(6, 118, 184) + xs(188, 146, 'target cell', 'end');
      g += cell(34, 104, { lig: 'ag', act: 1 }) + cell(68, 104, { lig: null, act: 0 }) + cell(102, 104, { lig: 'ag', act: 1 });
      if (target.kind === 'transporter') {
        g += box(132, 46, 34, 20, target.name) + arr(118, 92, 138, 68) + xs(146, 92, 'reuptake') + block(146, 78, '') + `<text class="cl b" x="132" y="38" text-anchor="start">${target.drug}</text>`;
      } else {
        g += `<path class="box" d="M160 76 L176 88 L160 100 L144 88 Z"/>` + xs(160, 91, target.name, 'middle') + arr(110, 93, 142, 89) + xs(160, 110, 'breaks it down', 'middle') + block(160, 60, '') + `<text class="cl b" x="160" y="50" text-anchor="middle">${target.drug}</text>`;
      }
      return g;
    };
    const indirectPanel = (ttl, scene, side, curveFn, cap) => {
      const P = plot(176, 84);
      return wrap(title(ttl) + scene + notes(200, 30, side) + P.axes('log dose of the agonist', ['dashed = agonist alone', 'solid = with the indirect antagonist']) + curveFn(P), cap, 300);
    };
    const leftShift = (P, cls = 'c') => P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, cls) + P.arrowH(0, -1, 50) + P.legend(['shift LEFT · Emax same']);

    F3['ind-ssri'] = () => indirectPanel('Indirect antagonist, upstream · fluoxetine (SSRI) blocks SERT',
      synapse('5HT', { kind: 'transporter', name: 'SERT', drug: 'fluoxetine' }),
      ['UPSTREAM of the receptor:', 'the transporter that returns serotonin', 'to the nerve is blocked, so serotonin', 'stays in the cleft longer.', '', 'The receptor is untouched:', 'serotonin is the agonist, and there is', 'more of it → more potent (LEFT),', 'same Emax.'],
      leftShift,
      ['<b>Where it acts:</b> the serotonin reuptake transporter (SERT) on the nerve terminal, upstream of the receptor; the drug never binds the serotonin receptor.',
       '<b>Receptor:</b> unchanged; only the amount of serotonin in the cleft changes.',
       '<b>Curve:</b> serotonin shifts left (more potent) with the same Emax. Duloxetine (SNRI) does the same at the serotonin and norepinephrine transporters; cocaine at the norepinephrine transporter.',
       '<b>Poll:</b> "DRC B is NE alone. Which DRC best represents NE in the presence of duloxetine?" → the curve to the left of B.']);

    F3['ind-snri'] = () => indirectPanel('Indirect antagonist, upstream · duloxetine (SNRI) blocks NET',
      synapse('NE', { kind: 'transporter', name: 'NET', drug: 'duloxetine' }),
      ['UPSTREAM of the receptor:', 'the norepinephrine transporter (NET)', 'is blocked, so norepinephrine stays in', 'the synapse longer.', '', 'Classified as indirect, not', 'competitive or allosteric:', '"it’s affecting the transporter",', 'not the receptor.'],
      leftShift,
      ['<b>Where it acts:</b> the norepinephrine reuptake transporter, upstream of the receptor.',
       '<b>Receptor:</b> unchanged; norepinephrine is still the agonist, there is just more of it for longer.',
       '<b>Curve:</b> norepinephrine shifts left (more potent), same Emax.',
       '<b>Class:</b> indirect antagonist, "because it’s not affecting the receptor directly, it’s affecting the transporter".']);

    F3['ind-ache'] = () => indirectPanel('Indirect antagonist, upstream · physostigmine blocks AChE',
      synapse('ACh', { kind: 'enzyme', name: 'AChE', drug: 'physostigmine' }),
      ['UPSTREAM of the receptor:', 'the enzyme that breaks down', 'acetylcholine is blocked, so more', 'acetylcholine reaches the nicotinic', 'receptors.', '', 'Any "-stigmine" works this way.', 'Used in myasthenia gravis (antibodies', 'against the nicotinic receptor).'],
      leftShift,
      ['<b>Where it acts:</b> acetylcholinesterase, the enzyme in the cleft, upstream of the receptor.',
       '<b>Receptor:</b> unchanged; acetylcholine is still the agonist, and more of it survives to bind.',
       '<b>Curve:</b> acetylcholine shifts left (more potent), same Emax.',
       '<b>Same principle as the reuptake blockers:</b> a transporter or an enzyme, either way the drug raises the transmitter concentration instead of touching the receptor.']);

    F3['ind-carbidopa'] = () => {
      const P = plot(176, 84);
      let g = title('Potentiation, upstream · carbidopa protects L-dopa');
      g += box(10, 40, 60, 30, 'L-dopa', 'given by mouth') + arr(70, 55, 90, 55);
      g += `<path class="box" d="M112 40 L134 55 L112 70 L90 55 Z"/>` + xs(112, 58, 'enzyme', 'middle') + xs(118, 84, 'in the gut') + arr(112, 70, 112, 90) + xs(112, 100, 'dopa broken down', 'middle');
      g += block(112, 28, '') + `<text class="cl b" x="122" y="28" text-anchor="start">carbidopa</text>`;
      g += arr(134, 55, 150, 55) + box(150, 40, 40, 30, 'brain', 'dopamine') + band(6, 118, 184) + xs(188, 146, 'brain neurons', 'end');
      g += cell(34, 104, { lig: 'ag', act: 1 }) + cell(68, 104, { lig: 'ag', act: 1 }) + cell(102, 104, { lig: null, act: 0 });
      const side = ['UPSTREAM, in the gut:', 'carbidopa blocks the enzyme that', 'breaks down dopa, so more dopa', 'reaches the brain.', '', 'Carbidopa has no effect on its own', '(flat line) but increases the effect', 'of L-dopa: potentiation, and an', 'indirect antagonist.'];
      g += notes(200, 30, side) + P.axes('log dose of L-dopa', ['dashed = L-dopa alone', 'solid = with carbidopa']) + P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, 'c') + P.flat(3, 'b') + P.arrowH(0, -1, 50) + P.legend(['L-dopa: shift LEFT · carbidopa alone: no effect']);
      return wrap(g, ['<b>Where it acts:</b> the enzyme in the gut that breaks down dopa, upstream of the dopamine receptors.',
        '<b>Receptor:</b> untouched; more dopa arrives to be turned into dopamine.',
        '<b>Curve:</b> L-dopa shifts left; carbidopa alone gives no response.',
        '<b>Name for it:</b> potentiation (one drug lacks an effect on its own but increases the effect of another), which the slide also marks as an indirect antagonist. Addition = the sum; synergism = more than the sum.'], 300);
    };

    // downstream: the receptor is bound and signalling; the drug acts on the cascade beneath it
    F3['ind-pde'] = () => {
      const P = plot(176, 84);
      let g = title('Indirect antagonist, downstream · milrinone / caffeine block PDE');
      g += band(6, 34, 184) + cell(20, 14, { lig: 'ag', act: 1 }) + xs(50, 30, 'agonist bound,') + xs(50, 40, 'receptor signalling as before');
      const bx = [6, 44, 82, 120, 158];
      ['Gs', 'AC', 'cAMP', 'PKA', 'response'].forEach((t, i) => { g += `<rect class="box" x="${bx[i]}" y="70" width="34" height="16" rx="4"/>` + xs(bx[i] + 17, 81, t, 'middle'); if (i < 4) g += arr(bx[i] + 34, 78, bx[i + 1], 78); });
      g += arr(99, 86, 99, 98) + `<path class="box" d="M99 98 L115 110 L99 122 L83 110 Z"/>` + xs(99, 113, 'PDE', 'middle') + arr(115, 110, 130, 110) + xs(132, 108, 'cAMP') + xs(132, 118, 'broken down');
      g += block(70, 110, '') + `<text class="lbl xs" style="fill:var(--figB)" x="6" y="136">blocked: cAMP is not broken down,</text><text class="lbl xs" style="fill:var(--figB)" x="6" y="146">so it builds up behind the same signal</text>`;
      const side = ['DOWNSTREAM of the receptor:', 'phosphodiesterase (PDE) is the enzyme', 'that breaks down cAMP. Block it and', 'cAMP builds up behind the same', 'receptor signal.', '', 'The agonist looks more potent (LEFT);', 'a partial agonist can now reach the', 'full response ("behaving like a full', 'agonist").'];
      g += notes(200, 30, side) + P.axes('log dose of the agonist', ['dashed = agonist alone', 'solid = with the PDE inhibitor']) + P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, 'c') + P.curve(0.3, 55, 0, 'a', true) + P.curve(-0.7, 100, 0, 'c') + P.arrowH(0, -1, 50) + xs(P.lpx(3) - 2, P.lpy(55) + 10, 'partial alone', 'end') + xs(P.lpx(3) - 2, P.lpy(100) + 10, 'full alone', 'end') + P.legend(['full agonist: LEFT · partial agonist: LEFT and UP']);
      return wrap(g, ['<b>Where it acts:</b> phosphodiesterase, downstream of the receptor, in the cascade the receptor started.',
        '<b>Receptor:</b> untouched; the second messenger it makes is broken down more slowly, so more of it accumulates.',
        '<b>Curve:</b> the agonist shifts left ("increasing the potency of an agonist"); a partial agonist’s curve can rise to the full response.',
        '<b>Slide examples:</b> milrinone, caffeine; the cAMP → PKA cascade of Day 1.'], 300);
    };

    F3['ind-ras'] = () => {
      const P = plot(176, 84);
      let g = title('Indirect antagonist, downstream · cancer drug X blocks RAS');
      g += band(6, 34, 184) + cell(20, 14, { lig: 'ag', act: 1 }) + cell(46, 14, { lig: 'ag', act: 1 }) + xs(76, 30, 'growth factor bound;') + xs(76, 40, 'two 1-TM receptors pair up') + xs(76, 50, '(receptor tyrosine kinase)');
      const bx = [6, 38, 70, 102, 134, 166];
      ['GEF', 'RAS', 'RAF', 'MEK', 'ERK', 'growth'].forEach((t, i) => { g += `<rect class="box" x="${bx[i]}" y="70" width="24" height="16" rx="4"/>` + xs(bx[i] + 12, 81, t, 'middle'); if (i < 5) g += arr(bx[i] + 24, 78, bx[i + 1], 78); });
      g += block(50, 100, '') + `<text class="lbl xs" style="fill:var(--figB)" x="60" y="98">drug X blocks RAS:</text><text class="lbl xs" style="fill:var(--figB)" x="60" y="108">no RAF, MEK or ERK</text>`;
      g += xs(6, 120, 'the receptor still binds and signals, but the') + xs(6, 130, 'message stops at RAS, so the cell does not grow');
      const side = ['DOWNSTREAM of the receptor:', 'the receptor tyrosine kinase is', 'activated as before, but the cascade', 'GEF → RAS → RAF → MEK → ERK', 'is cut at RAS.', '', 'Less signal gets through: the agonist', 'is less potent (RIGHT) and less', 'efficacious (DOWN): "I used to be a', 'full agonist, and I’m a partial".'];
      g += notes(200, 30, side) + P.axes('log dose of the growth factor', ['dashed = agonist alone', 'solid = with drug X']) + P.curve(0, 100, 0, 'a', true) + P.curve(1, 55, 0, 'b') + P.arrowH(0, 1, 50) + P.arrowV(2.6, 98, 57) + P.legend(['shift RIGHT and Emax DOWN']);
      return wrap(g, ['<b>Where it acts:</b> RAS, a component of the cascade downstream of the receptor tyrosine kinase.',
        '<b>Receptor:</b> untouched; it binds and signals, but the message is cut before RAF, MEK and ERK.',
        '<b>Curve:</b> the agonist shifts right and its maximum falls ("decreasing the potency of an agonist").',
        '<b>Contrast with the PDE inhibitor:</b> both are indirect and downstream, but one raises the signal and the other cuts it.'], 300);
    };

    /* ---------- receptor regulation ---------- */
    F3['desens-rapid'] = () => {
      let g = title('Rapid desensitization of a GPCR: GRK and β-arrestin');
      // cAMP trace against time
      const X0 = 40, X1 = 340, Yb = 100, Yt = 30;
      g += `<line class="ax" x1="${X0}" y1="${Yb}" x2="${X1}" y2="${Yb}"/><line class="ax" x1="${X0}" y1="${Yb}" x2="${X0}" y2="${Yt}"/>` + xs(X0 - 4, Yt + 4, 'cAMP', 'end') + xs(X1, Yb + 11, 'time', 'end');
      g += `<polyline class="cv a" points="${X0},${Yb - 2} 70,${Yb - 2} 82,40 96,34 112,50 130,72 150,84 200,86 240,86 252,${Yb - 2} ${X1},${Yb - 2}"/>`;
      g += `<line class="dash" x1="70" y1="${Yb}" x2="70" y2="${Yt}"/>` + xs(68, Yb - 8, 'agonist added', 'end') + `<line class="dash" x1="150" y1="${Yb}" x2="150" y2="${Yt}"/>` + xs(152, Yt + 6, 'β-arrestin bound:') + xs(152, Yt + 16, 'no cAMP while the') + xs(152, Yt + 26, 'agonist stays on') + `<line class="dash" x1="240" y1="${Yb}" x2="240" y2="${Yt}"/>` + xs(242, Yt + 6, 'agonist off:') + xs(242, Yt + 16, 'receptor resets');
      // three receptor states
      const state = (x, r, k) => {
        let h = band(x, 132, 110) + cell(x + 42, 118, r);
        const cx = x + 55;
        if (k === 1) h += `<circle cx="${cx - 12}" cy="160" r="7" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.2"/>` + xs(cx - 12, 163, 'αs', 'middle') + xs(cx + 4, 176, 'cAMP made', 'start');
        if (k === 2) h += `<line class="ax" x1="${cx + 8}" y1="152" x2="${cx + 20}" y2="168"/>` + dot(cx + 14, 158, 'b', 2.6) + dot(cx + 18, 163, 'b', 2.6) + dot(cx + 22, 168, 'b', 2.6) + xs(cx + 26, 160, 'P P P by GRK') +
          `<ellipse cx="${cx - 8}" cy="168" rx="16" ry="8" fill="var(--figB)" fill-opacity="0.3" stroke="var(--figB)" stroke-width="1.2"/>` + xs(cx - 8, 171, 'β-arrestin', 'middle') + xs(cx + 26, 172, 'no cAMP');
        if (k === 3) h += `<circle cx="${cx - 12}" cy="160" r="7" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.2"/>` + xs(cx - 12, 163, 'αs', 'middle') + xs(cx + 4, 176, 'ready again', 'start');
        return h;
      };
      g += state(6, { lig: 'ag', act: 1 }, 1) + state(126, { lig: 'ag', act: 0 }, 2) + state(246, { lig: null, act: 0 }, 3);
      g += xs(61, 192, '1 · agonist on: αs signals', 'middle') + xs(181, 192, '2 · GRK phosphorylates the tail;', 'middle') + xs(181, 202, 'β-arrestin binds, blocks αs', 'middle') + xs(301, 192, '3 · agonist off: tail cleaned,', 'middle') + xs(301, 202, 'αs back, reset', 'middle');
      return wrap(g, ['<b>What happens:</b> the agonist-bound receptor is a substrate for a GPCR kinase (GRK); GRK phosphorylates the receptor tail, which lets β-arrestin bind and stop the signal, so cAMP production goes flat while the agonist is still on.',
        '<b>Time course:</b> milliseconds; reversible. Once the agonist comes off the phosphates are removed, αs reassociates and the receptor can respond again ("like a band-aid").',
        '<b>Trap:</b> short-term regulation does not move the receptor into the cell; that is long-term down-regulation.'], 212);
    };

    F3['desens-long'] = () => {
      let g = title('Long-term down-regulation: endocytosis, recycling or degradation');
      g += xs(6, 30, 'outside') + `<path d="M6 36 L80 36 C92 36 92 58 104 58 C116 58 116 36 128 36 L354 36" fill="none" stroke="var(--muted)" stroke-width="1.2"/>` + `<path d="M6 50 L74 50 C88 50 86 72 104 72 C122 72 120 50 134 50 L354 50" fill="none" stroke="var(--muted)" stroke-width="1.2"/>` + xs(6, 64, 'inside the cell');
      g += cell(44, 16, { lig: 'ag', act: 1 }) + xs(40, 82, 'too much agonist,', 'middle') + xs(40, 92, 'too long', 'middle');
      g += arr(72, 44, 84, 44) + cell(91, 36, { lig: 'ag', act: 0 }) + `<ellipse cx="104" cy="82" rx="14" ry="6" fill="var(--figB)" fill-opacity="0.3" stroke="var(--figB)" stroke-width="1.2"/>` + xs(104, 85, 'β-arr', 'middle') + xs(104, 100, 'coated pit', 'middle');
      g += arr(122, 60, 150, 96) + `<circle cx="180" cy="118" r="22" class="box"/>` + cell(167, 96, { lig: null, act: 0 }) + xs(180, 152, 'endocytosis: receptor', 'middle') + xs(180, 162, 'now inside a vesicle', 'middle');
      g += arr(200, 108, 236, 60) + `<text class="cl c" x="238" y="70" text-anchor="start">recycle back</text>` + `<text class="cl c" x="238" y="80" text-anchor="start">to the surface</text>` + cell(280, 16, { lig: null, act: 0 });
      g += arr(202, 122, 236, 122) + `<rect x="238" y="106" width="60" height="32" rx="4" fill="var(--figB)" fill-opacity="0.15" stroke="var(--figB)"/>` + `<text class="cl b" x="268" y="120" text-anchor="middle">lysosome</text>` + `<text class="cl b" x="268" y="131" text-anchor="middle">degrade</text>`;
      g += xs(180, 180, 'fewer receptors at the surface: the agonist is less potent (shift RIGHT) and its Emax can fall', 'middle');
      return wrap(g, ['<b>What happens:</b> with continued over-stimulation β-arrestin facilitates uptake into coated pits; endocytosis takes the receptor inside; it is then recycled back to the surface or degraded in a lysosome.',
        '<b>Time course:</b> hours to days ("that takes time"); the receptor pool at the surface shrinks, which is analogous to an irreversible antagonist.',
        '<b>Result:</b> tolerance (opioids, Afrin-type nasal decongestants); a receptor that is not in the membrane cannot bind anything.'], 188);
    };

    F3['regulation'] = () => {
      const P = plot(150, 100);
      let g = title('Up-regulation vs down-regulation: how many receptors are left');
      const card = (x, ttl, cls, n, act, lines) => {
        let h = `<text class="cl ${cls}" x="${x + 86}" y="30" text-anchor="middle">${ttl}</text>` + band(x, 44, 172);
        const w = 26, gap = n > 5 ? 0 : 6, start = x + 86 - (n * w + (n - 1) * gap) / 2;
        for (let i = 0; i < n; i++) h += cell(start + i * (w + gap), 34, { lig: i < act ? 'ag' : null, act: i < act ? 1 : 0 });
        return h + xs(x + 86, 98, lines[0], 'middle') + xs(x + 86, 108, lines[1], 'middle') + xs(x + 86, 118, lines[2], 'middle');
      };
      g += card(2, 'UP: after a chronic antagonist', 'c', 6, 5, ['more receptors (more spare receptors):', 'the same agonist dose finds more to bind', 'agonist MORE potent · partial can reach full']);
      g += card(186, 'DOWN: after a chronic agonist', 'b', 3, 2, ['fewer receptors (spare receptors used up):', 'the same dose finds fewer to bind', 'agonist LESS potent · Emax can fall']);
      g += `<line class="dash" x1="2" y1="${150 - 12}" x2="358" y2="${150 - 12}"/>`;
      g += P.axes('log dose of the agonist', ['dashed = before regulation', 'solid = after']) + P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, 'c') + P.curve(1, 55, 0, 'b') + P.arrowH(0, -1, 50) + P.arrowH(0.2, 1.1, 40) + P.arrowV(2.6, 98, 57) + xs(P.lpx(-1.4), P.lpy(70), 'up', 'end') + xs(P.lpx(1.6), P.lpy(35), 'down') + P.legend(['up: LEFT · down: RIGHT, then DOWN']);
      return wrap(g, ['<b>Up-regulation</b> follows chronic reduction of receptor stimulation (an antagonist or inverse agonist); the body adds receptors. The full agonist shifts left; a partial agonist gains potency and can reach the full response.',
        '<b>Down-regulation</b> follows chronic exposure to an agonist; the body removes receptors, which is analogous to an irreversible antagonist. The agonist shifts right and, when receptors run short, its maximum falls.',
        '<b>Clinical:</b> stopping a β-blocker cold turkey leaves up-regulated receptors unblocked (hypertensive crisis; taper stepwise); tolerance to opioids and Afrin is down-regulation.',
        '<b>Rule:</b> "an antagonist will up regulate, an agonist is going to down regulate because our body is going to do the opposite".'], 296);
    };
    return F3;
  })();
  Object.assign(F, EXTRA);

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


  /* Step-through of the Gs cascade (NE at β1), forward and back. Each step is
     an SVG group with data-step; the engine shows one at a time through the
     buttons under the figure (data-anim). Steps from Day 1 slides ~51–54 and
     the 9/23 and 9/30 transcripts (notes/L06.md, J9). */
  F['gpcr-anim'] = () => {
    const xs = (x, y, t, anchor = 'start', extra = '') => `<text class="lbl xs" x="${x}" y="${y}" text-anchor="${anchor}" ${extra}>${t}</text>`;
    const box = (x, y, w, h, t) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><text class="lbl sm" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${t}</text>`;
    const arr = (x1, y1, x2, y2) => `<path class="arrow" d="M${x1} ${y1} L${x2} ${y2}"/>`;
    const alpha = (x, y, nt) => `<circle cx="${x}" cy="${y}" r="9" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.3"/>` + xs(x, y + 3, 'αs', 'middle') + xs(x, y + 16, nt, 'middle');
    const bg = (x, y) => `<circle cx="${x}" cy="${y}" r="6" class="box"/><circle cx="${x + 9}" cy="${y + 12}" r="5" class="box"/>` + xs(x, y + 3, 'β', 'middle') + xs(x + 9, y + 15, 'γ', 'middle');
    const base = `<rect x="6" y="46" width="348" height="14" fill="var(--chip)" opacity="0.7"/>` + xs(6, 40, 'outside') + xs(6, 74, 'inside the cell') + box(152, 40, 44, 26, 'AC');
    const rec = (active, lig) => `<rect x="43" y="26" width="20" height="28" rx="5" ${active ? 'fill="var(--figA)" fill-opacity="0.28" stroke="var(--figA)"' : 'fill="var(--chip)" stroke="var(--muted)"'} stroke-width="1.3"/><path class="pocket" d="M48 26 a5 5 0 0 0 10 0 Z"/>` + (lig ? `<circle class="lig a" cx="53" cy="27" r="4.6"/>` : '') + xs(68, 30, lig ? 'NE on β1' : 'β1 empty', 'start');
    const role = (t) => `<text class="cl a" x="354" y="30" text-anchor="end">${t}</text>`;
    const steps = [
      ['NE (the signal) binds the β1 receptor', rec(false, true) + alpha(72, 88, 'GDP') + bg(92, 80) + role('signal → receptor')],
      ['The receptor changes shape; that lets the diphosphate (GDP) fall OFF the α subunit', rec(true, true) + alpha(72, 88, 'GDP leaves') + bg(92, 80) + `<text class="cl b" x="72" y="118" text-anchor="middle">GDP ↓</text>` + role('receptor activated')],
      ['A fresh triphosphate (GTP) from the cell binds in the empty spot: an EXCHANGE, not a phosphate added to GDP', rec(true, true) + alpha(72, 88, 'GTP binds') + bg(92, 80) + `<text class="cl c" x="72" y="118" text-anchor="middle">GTP ↑</text>` + role('GDP → GTP exchange')],
      ['With GTP on board, αs separates from β/γ (the transducer carries the message)', rec(true, true) + alpha(116, 92, 'GTP') + bg(70, 76) + arr(90, 92, 104, 92) + role('transducer: Gs')],
      ['αs turns on adenylate cyclase (AC), the effector', rec(true, true) + alpha(130, 80, 'GTP') + bg(76, 78) + arr(140, 72, 160, 66) + `<rect x="152" y="40" width="44" height="26" rx="4" fill="var(--figA)" fill-opacity="0.2" stroke="var(--figA)"/>` + role('effector: AC')],
      ['AC makes cAMP from ATP: the second messenger; one AC makes many cAMP (amplification)', rec(true, true) + alpha(130, 80, 'GTP') + bg(76, 78) + arr(174, 66, 174, 80) + xs(174, 92, 'ATP → cAMP', 'middle') + [216, 228, 240, 252].map((x, i) => `<circle cx="${x}" cy="${86 + (i % 2) * 8}" r="3" fill="var(--figC)"/>`).join('') + xs(260, 92, 'cAMP ×n (amplified)') + role('second messenger: cAMP')],
      ['cAMP activates protein kinase A (PKA)', rec(true, true) + alpha(130, 80, 'GTP') + bg(76, 78) + xs(174, 92, 'ATP → cAMP', 'middle') + arr(174, 96, 174, 108) + box(156, 110, 36, 16, 'PKA') + role('cell signalling')],
      ['Ca++ enters: faster, stronger heartbeat (the physiological response)', rec(true, true) + alpha(130, 80, 'GTP') + bg(76, 78) + xs(174, 92, 'ATP → cAMP', 'middle') + box(156, 110, 36, 16, 'PKA') + arr(192, 118, 220, 118) + xs(224, 121, 'Ca++ in → ↑ heart rate') + role('response')],
      ['BACK 1: the third phosphate is CUT OFF the GTP (hydrolysis by GTPase; RGS speeds it): GTP → GDP, and αs rejoins β/γ', rec(true, true) + alpha(72, 88, 'GTP → GDP') + bg(92, 80) + `<text class="cl b" x="130" y="92" text-anchor="start">GTPase · RGS: − one phosphate</text>` + role('reset the transducer')],
      ['BACK 2: phosphodiesterase (PDE) breaks down cAMP', rec(true, true) + alpha(72, 88, 'GDP') + bg(92, 80) + xs(174, 92, 'cAMP', 'middle') + arr(174, 96, 174, 108) + `<text class="cl b" x="174" y="120" text-anchor="middle">PDE</text>` + xs(174, 132, 'cAMP broken down', 'middle') + role('reset the second messenger')],
      ['BACK 3: NE comes off; the receptor is reset and can start again', rec(false, false) + alpha(72, 88, 'GDP') + bg(92, 80) + role('reset the receptor')]
    ];
    let g = `<text class="title" x="180" y="11" text-anchor="middle">The Gs cascade step by step: NE at β1, forward and back</text>`;
    steps.forEach((st, i) => {
      g += `<g class="st${i === 0 ? ' on' : ''}" data-step="${i + 1}">${base}${st[1]}<text class="lbl sm" x="6" y="148" text-anchor="start">Step ${i + 1} of ${steps.length}${i >= 8 ? ' (reverse)' : ''}</text><text class="lbl xs" x="6" y="160" text-anchor="start">${st[0].length > 78 ? st[0].slice(0, st[0].lastIndexOf(' ', 78)) : st[0]}</text><text class="lbl xs" x="6" y="170" text-anchor="start">${st[0].length > 78 ? st[0].slice(st[0].lastIndexOf(' ', 78) + 1) : ''}</text></g>`;
    });
    const controls = `<div class="row anim" data-anim="gpcr" style="margin:6px 0 2px"><button class="btn ghost" data-go="-1">◀ Back</button><button class="btn ghost" data-go="1">Next ▶</button><button class="btn ghost" data-go="play">Play</button><span class="meta" style="margin:0">Forward 1–8, back 9–11. Signal → receptor → transducer → effector → second messenger → response.</span></div>`;
    return wrap(g, ['<b>Forward</b><ol><li>NE binds β1.</li><li>The receptor changes shape; GDP falls off the α subunit.</li><li>A new GTP binds in its place (an exchange: GDP out, GTP in).</li><li>αs, now carrying GTP, separates from β/γ.</li><li>αs turns on adenylate cyclase.</li><li>AC makes cAMP from ATP (one AC makes many cAMP).</li><li>cAMP activates PKA.</li><li>Ca++ enters: faster, stronger heartbeat.</li></ol>',
      '<b>Back</b><ol><li>The third phosphate is cut off GTP (GTPase, sped up by RGS): GTP becomes GDP and αs rejoins β/γ.</li><li>PDE breaks down cAMP.</li><li>NE comes off; the receptor resets.</li></ol>',
      '<b>GDP and GTP:</b> going forward the whole GDP leaves and a separate GTP binds (an exchange); going back one phosphate is cut off the bound GTP, which turns it into GDP (hydrolysis).',
      '<b>Roles he asks</b><ul><li>signal = NE</li><li>receptor = β1</li><li>transducer = Gs (αs, β, γ)</li><li>effector = AC (PLC for Gq)</li><li>second messengers = cAMP, IP3, Ca++, PKA</li></ul>'], 176).replace('</svg><figcaption>', '</svg>' + controls + '<figcaption>');
  };


  /* Cross-talk in one heart cell: two receptors, two G proteins, one effector.
     Day 2 slide ~30; transcript 9/23 and 9/30 (M2 is Gαi, β1 is Gαs). */
  F['crosstalk'] = () => {
    const xs = (x, y, t, anchor = 'start') => `<text class="lbl xs" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
    const box = (x, y, w, h, t) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><text class="lbl sm" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${t}</text>`;
    const arr = (x1, y1, x2, y2) => `<path class="arrow" d="M${x1} ${y1} L${x2} ${y2}"/>`;
    let g = `<text class="title" x="180" y="11" text-anchor="middle">Cross-talk: one heart cell, two receptors, one effector</text>`;
    g += xs(6, 32, 'outside') + `<rect x="6" y="36" width="348" height="14" fill="var(--chip)" opacity="0.7"/>` + xs(6, 64, 'inside the cell');
    g += cell(60, 20, { lig: 'ag', act: 1 }) + xs(90, 26, 'NE on β1') + xs(90, 35, '(sympathetic)') + cell(260, 20, { lig: 'ag2', act: 1 }) + xs(256, 26, 'ACh on M2', 'end') + xs(256, 35, '(parasympathetic)', 'end');
    g += `<circle cx="100" cy="78" r="9" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.2"/>` + xs(100, 81, 'αs', 'middle') + arr(73, 56, 92, 70);
    g += `<circle cx="233" cy="78" r="9" fill="var(--figB)" fill-opacity="0.25" stroke="var(--figB)" stroke-width="1.2"/>` + xs(233, 81, 'αi', 'middle') + arr(273, 56, 241, 70);
    g += box(142, 66, 50, 24, 'AC') + arr(109, 78, 142, 78) + arr(224, 78, 192, 78);
    g += `<text class="cl a" x="124" y="100" text-anchor="middle">+ more cAMP</text><text class="cl b" x="212" y="100" text-anchor="middle">− less cAMP</text>`;
    g += arr(167, 90, 167, 108) + xs(167, 120, 'cAMP = the net of the two', 'middle') + arr(167, 124, 167, 136) + xs(167, 148, 'heart rate: up with sympathetic NE, down with parasympathetic ACh', 'middle');
    return wrap(g, ['<b>What it is:</b> two signal transduction pathways in the same cell act on one effector, adenylate cyclase; the response is the net of both.',
      '<b>In the heart:</b> β1 (Gαs) raises cAMP and the heart rate, M2 (Gαi) lowers cAMP and the heart rate; the heart rate that results is the balance.',
      '<b>Why it matters for drugs:</b> a β-blocker and a muscarinic antagonist act on the same cAMP from opposite sides.'], 156);
  };

  const api = key => (F[key] ? F[key]() : '');
  api.graph = GRAPH;
  return api;
})();
