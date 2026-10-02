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
  const capHTML = cap => {
    if (!Array.isArray(cap)) return cap;
    let out = '', open = false;   // a numbered or bulleted list given as an item stands on its own; prose items become bullets
    cap.forEach(t => { if (/^<(ol|ul)\b/.test(t)) { if (open) { out += '</ul>'; open = false; } out += t; } else { if (!open) { out += '<ul>'; open = true; } out += `<li>${t}</li>`; } });
    return out + (open ? '</ul>' : '');
  };
  const wrap = (inner, cap, h = H) => `<figure class="fig"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${capText(cap).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/"/g, '&quot;')}"><defs><marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>${inner}</svg><figcaption>${capHTML(cap)}</figcaption></figure>`;
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
    curve(sig(0, 0, 1, 30), 'b', 'inverse agonist', [3, 0], true),
    'Against a receptor with basal (constitutive) activity: an agonist raises activity, a neutral antagonist leaves it at basal, an inverse agonist lowers it below basal.');

  F['competitive'] = () => wrap(axes('log agonist dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax') + dash(-1, 0, -1, 50) + dash(1, 0, 1, 50) + dash(-3, 50, 1, 50) +
    curve(sig(-1, 100), 'a', 'agonist alone', [-2.9, 80]) + curve(sig(1, 100), 'b', '+ competitive antagonist', [3, 22], true) +
    `<path class="arrow" d="M${px(-0.8)} ${py(55)} L${px(0.8)} ${py(55)}"/>`,
    'A competitive (reversible) antagonist shifts the agonist curve to the right in parallel; enough agonist still reaches the same Emax, so the block is surmountable.');

  F['irreversible'] = () => wrap(axes('log agonist dose', '% of maximal response') +
    dash(-3, 100, 3, 100) + ytick(100, 'Emax') + dash(-3, 45, 3, 45) + ytick(45, 'Emax′') +
    curve(sig(0, 100), 'a', 'agonist alone', [-2.9, 80]) + curve(sig(0.8, 45), 'b', '+ irreversible antagonist', [3, 45], true) + `<path class="arrow" d="M${px(-0.2)} ${py(55)} L${px(0.6)} ${py(55)}"/>`,
    'An irreversible (non-competitive) antagonist binds covalently and takes receptors out of the pool: the curve shifts right and the maximal response falls; no agonist dose restores it (spare receptors delay the drop).');

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
    const w = 51, gap = 10, x0 = 2;
    let s = '';
    steps.forEach(([a, b], i) => {
      const x = x0 + i * (w + gap);
      const [a1, a2, b2] = [a, b, steps[i][2]];
      s += `<rect class="box" x="${x}" y="16" width="${w}" height="64" rx="6"/><text class="lbl xs" style="font-weight:700" x="${x + w / 2}" y="${a2 ? 38 : 44}" text-anchor="middle">${a1}</text>${a2 ? `<text class="lbl xs" style="font-weight:700" x="${x + w / 2}" y="48" text-anchor="middle">${a2}</text>` : ''}<text class="lbl xs" x="${x + w / 2}" y="68" text-anchor="middle">${b2}</text>`;
      if (i < steps.length - 1) s += `<path class="arrow" d="M${x + w + 1} 48 L${x + w + gap - 2} 48"/>`;
    });
    s += `<text class="lbl" x="180" y="106" text-anchor="middle">Each step can amplify the one before it.</text>`;
    return wrap(s, 'Signal transduction through a G protein–coupled receptor: the G protein is the transducer, the enzyme it turns on is the effector, and the effector makes the second messenger.', 120);
  };


  /* RTK activation, Day 2 slides ~7–~9: the five steps in his order */
  F['rtk-steps'] = () => {
    const steps = [['1 Monomer', '', 'inactive'], ['2 Dimer', '', 'ligand binds'], ['3 Kinases', 'phosphorylate', 'each other'], ['4 Docking', 'sites', 'signal complexes'], ['5 Tyrosine', 'phosphatase', 'ends the signal']];
    const w = 64, gap = 8, x0 = 4;
    let s = '';
    steps.forEach(([a1, a2, b2], i) => {
      const x = x0 + i * (w + gap);
      s += `<rect class="box" x="${x}" y="16" width="${w}" height="64" rx="6"/><text class="lbl xs" style="font-weight:700" x="${x + w / 2}" y="${a2 ? 38 : 44}" text-anchor="middle">${a1}</text>${a2 ? `<text class="lbl xs" style="font-weight:700${a2.length > 12 ? ';font-size:7.5px' : ''}" x="${x + w / 2}" y="48" text-anchor="middle">${a2}</text>` : ''}<text class="lbl xs" style="${b2.length > 14 ? 'font-size:7.5px' : ''}" x="${x + w / 2}" y="68" text-anchor="middle">${b2}</text>`;
      if (i < steps.length - 1) s += `<path class="arrow" d="M${x + w + 1} 48 L${x + w + gap - 2} 48"/>`;
    });
    s += `<text class="lbl" x="180" y="100" text-anchor="middle">No G protein: the receptor is the enzyme.</text>`;
    return wrap(s, ['<b>Receptor tyrosine kinase (RTK) activation</b>, his five steps (Day 2 slides ~7–~9):', '<ol><li>The inactive receptor is a monomer (one receptor on its own).</li><li>The ligand binds and two receptors join (dimerization): this pair is the active form.</li><li>The two kinase domains inside the cell phosphorylate each other (cross-phosphorylation).</li><li>The phosphorylated sites form docking sites, where signaling complexes attach and pass the signal on.</li><li>A tyrosine phosphatase removes the phosphates and ends the signal.</li></ol>', 'An RTK crosses the membrane once (1-TM): binding pocket outside, enzyme (kinase) inside. It has no α subunit, no GDP/GTP exchange and no cAMP; those belong to GPCRs.'], 116);
  };

  /* RTK activation as a step-through (Day 2 slides ~7–~9). Every shape carries a
     data-k, so between steps the receptors slide together and apart, and the
     ligand, phosphates and boxes fade in and out (stepTo in app.js). */
  F['rtk-anim'] = () => {
    const t = (k, x, y, txt, cls = 'lbl xs', a = 'middle') => `<text data-k="${k}" class="${cls}" x="${x}" y="${y}" text-anchor="${a}">${txt}</text>`;
    const rec = (s, x, st) => {
      let g = '';
      if (st.lig) g += `<circle data-k="${s}-lig" cx="${x}" cy="22" r="9" fill="var(--figC)" fill-opacity="0.3" stroke="var(--figC)"/>` + t(`${s}-ligt`, x, 25, 'L', 'cl c');
      g += `<rect data-k="${s}-bind" x="${x - 18}" y="34" width="36" height="38" rx="5" fill="var(--figA)" fill-opacity="0.15" stroke="var(--figA)"/>` + t(`${s}-b1`, x, 51, 'binding') + t(`${s}-b2`, x, 61, 'domain');
      g += `<rect data-k="${s}-stem" x="${x - 3}" y="72" width="6" height="18" fill="var(--figA)" fill-opacity="0.6"/>`;
      g += `<rect data-k="${s}-tail" x="${x - 18}" y="90" width="36" height="38" rx="5" fill="var(--figB)" fill-opacity="${st.on ? 0.3 : 0.1}" stroke="var(--figB)"/>` + t(`${s}-k1`, x, 107, 'kinase') + t(`${s}-k2`, x, 117, 'domain');
      if (st.p) { const px = s === 'L' ? x - 27 : x + 27; [100, 120].forEach((y, i) => { g += `<circle data-k="${s}-p${i}" cx="${px}" cy="${y}" r="7" fill="var(--figD)" fill-opacity="0.3" stroke="var(--figD)"/>` + t(`${s}-pt${i}`, px, y + 3, 'P', 'cl d'); }); }
      return g;
    };
    const base = `<rect data-k="mem" x="0" y="72" width="360" height="18" fill="var(--chip)"/>` + t('o', 4, 40, 'outside', 'lbl xs', 'start') + t('m', 4, 84, 'membrane', 'lbl xs', 'start') + t('i', 4, 112, 'inside the cell', 'lbl xs', 'start');
    const frame = st => {
      const [xl, xr] = st.dimer ? [158, 202] : [110, 250];
      let g = base + rec('L', xl, st) + rec('R', xr, st);
      if (st.dock) g += `<path data-k="dock-arr" class="arrow" d="M180 130 L180 144"/><rect data-k="dock" x="40" y="146" width="280" height="22" rx="5" class="box"/>` + t('dock-t', 180, 160, 'signaling complex: Grb2 → GEF → RAS → RAF → MEK → ERK');
      if (st.tp) g += `<rect data-k="tp" x="95" y="146" width="170" height="22" rx="5" fill="var(--figE)" fill-opacity="0.2" stroke="var(--figE)"/>` + t('tp-t', 180, 161, 'tyrosine phosphatase (TP)', 'cl e');
      return g;
    };
    const steps = [
      ['Each RTK crosses the membrane once (1-TM) and sits alone. No ligand is bound and the kinase domain is off.', frame({}), 'Inactive receptor is monomeric state'],
      ['The ligand (L), such as insulin or a growth factor, binds the extracellular domain, and two receptors pair up: the dimer is the active form.', frame({lig: 1, dimer: 1}), 'Ligand binding induces Dimerization (active)'],
      ['With the two receptors side by side, each kinase domain adds phosphates (P) to the tyrosines of the other one.', frame({lig: 1, dimer: 1, on: 1, p: 1}), 'Cross-phosphorylation of the kinase domain'],
      ['Signaling proteins bind the phosphorylated tyrosines (the docking sites) and pass the signal on down the RAS pathway.', frame({lig: 1, dimer: 1, on: 1, p: 1, dock: 1}), 'Phosphorylation forms docking sites & signaling complexes'],
      ['Tyrosine phosphatase removes the phosphates: the docking sites are gone, signaling stops and the receptors return to the inactive monomer state.', frame({tp: 1}), 'Tyrosine Phosphatase (TP)']
    ];
    return stepper('rtk', 'RTK activation step by step', steps, 214,
      ['Step titles are the wording on his "RTKs Activation" slide (Pharmacodynamics Day 2, slides ~7–~9; transcript 9/23).', 'No G protein, no GDP/GTP exchange and no cAMP: those are GPCR steps. The enzyme that ends RTK signaling is the tyrosine phosphatase.']);
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
      ['Allosteric modulator', 'alone: nothing; with an agonist: changes what it does', 20, 'side', 'a', 'plus']
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
      <text class="lbl" x="${(L + W - R) / 2}" y="${H + 8}" text-anchor="middle">dose (µg/kg, log scale)</text>
      <text class="lbl" transform="translate(11 ${(T + py(0)) / 2}) rotate(-90)" text-anchor="middle">% of individuals responding</text>`;
    [50, 100, 200, 400, 800].forEach(v => { inner += `<text class="lbl sm2" x="${xs(v)}" y="${py(0) + 14}" text-anchor="middle">${v}</text>`; });
    inner += dash(-3, 50, 3, 50) + ytick(50, '50%') + ytick(100, '100%');
    const ED99 = 100 * Math.pow(99, 1 / 4), LD1 = 400 / Math.pow(99, 1 / 4);
    inner += vline(100, 50) + vline(400, 50) + vline(ED99, 99) + vline(LD1, 1);
    inner += `<polyline class="cv a" points="${cum(100, 4)}"/><polyline class="cv b" points="${cum(400, 4)}"/>`;
    inner += `<text class="cl a" x="${xs(30)}" y="${py(92)}">effect (hypnosis)</text><text class="cl b" x="${xs(1500)}" y="${py(40)}" text-anchor="end">toxic (death)</text>`;
    inner += `<text class="cl a" x="${xs(100)}" y="${py(0) + 26}" text-anchor="middle">ED50</text><text class="cl b" x="${xs(400)}" y="${py(0) + 26}" text-anchor="middle">LD50</text>
      <text class="cl a" x="${xs(ED99) + 3}" y="${py(99) - 4}" text-anchor="start">ED99</text><text class="cl b" x="${xs(LD1) - 3}" y="${py(1) - 8}" text-anchor="end">LD1</text>`;
    return wrap(inner, 'Quantal dose–response curves: each point is the percentage of the population that shows the all-or-none response at that dose. ED50 is the dose effective in half the population, LD50 the dose lethal to half. Therapeutic index = LD50 / ED50; here 400 / 100 = 4. When the ED99 sits to the right of the LD1 the two curves overlap: some patients reach the toxic dose before the last patients respond.', H + 14);
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

  /* Step-through figures: one SVG group per step (data-step); the engine shows
     one at a time through the Back / Next / Play buttons (data-anim). steps =
     [[caption, inner, tag?], ...]; h = panel height; the caption of the active
     step is drawn in the band at the bottom of the panel. */
  const wrapLines = (t, n = 76) => { const out = []; let cur = ''; t.split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > n) { out.push(cur.trim()); cur = w; } else cur += ' ' + w; }); out.push(cur.trim()); if (out.length > 3) { out.length = 3; out[2] = out[2].replace(/.{2}$/, '…'); } return out; };
  const stepper = (key, title, steps, h, cap, footer) => {
    let g = `<text class="title" x="180" y="11" text-anchor="middle">${title}</text>`;
    steps.forEach((st, i) => {
      const lines = wrapLines(st[0]);
      g += `<g class="st${i === 0 ? ' on' : ''}" data-step="${i + 1}">${st[1]}<text class="lbl sm capt" x="6" y="${h - 12 - lines.length * 10}" text-anchor="start">Step ${i + 1} of ${steps.length}${st[2] ? ' · ' + st[2] : ''}</text>${lines.map((l, k) => `<text class="lbl xs capt" x="6" y="${h - 2 - (lines.length - 1 - k) * 10}" text-anchor="start">${l}</text>`).join('')}</g>`;
    });
    // Controls (same pattern for every step-through figure): Back and Next wrap around, Replay
    // replays the move into the current step, Play all runs from step 1 and stops at the last,
    // and a dot per step jumps to it. The motion itself is done in app.js (stepTo).
    const dots = steps.map((st, i) => `<button class="sdot${i === 0 ? ' on' : ''}" data-go="dot" data-i="${i}" aria-label="Go to step ${i + 1}"></button>`).join('');
    const controls = `<div class="row anim" data-anim="${key}" style="margin:6px 0 2px"><button class="btn ghost" data-go="-1">◀ Back</button><button class="btn ghost" data-go="1">Next ▶</button><button class="btn ghost" data-go="replay">↻ Replay step</button><button class="btn ghost" data-go="play">▶ Play all</button><span class="sdots">${dots}</span><span class="meta" style="margin:0">${footer || ''}</span></div>`;
    return wrap(g, cap, h).replace('</svg><figcaption>', '</svg>' + controls + '<figcaption>');
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
    const axes = (xl = 'log dose of the full agonist', k0 = 'dashed = agonist alone', k1 = 'solid = with the second drug') => `<line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0 + PW}" y2="${lpy(0)}"/><line class="ax" x1="${X0}" y1="${lpy(0)}" x2="${X0}" y2="${Y0}"/>
      <text class="lbl xs" x="${X0 + PW / 2}" y="${lpy(0) + 12}" text-anchor="middle">${xl}</text>
      <text class="lbl xs" x="${X0 - 4}" y="${lpy(100) + 3}" text-anchor="end">100%</text><text class="lbl xs" x="${X0 - 4}" y="${lpy(0) + 3}" text-anchor="end">0</text>
      <text class="lbl xs" x="${X0}" y="${lpy(0) + 26}" text-anchor="start">${k0}</text><text class="lbl xs" x="${X0}" y="${lpy(0) + 36}" text-anchor="start">${k1}</text>`;
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
    const top = (startRs, startLvl, startNotes, title2, cls2, shiftRs, shiftLvl, shiftNotes, startTitle = 'START: full agonist alone') =>
      card(2, startTitle, 'a', startRs, startLvl, startNotes) +
      `<path class="arrow" d="M176 44 L184 44"/>` +
      card(186, title2, cls2, shiftRs, shiftLvl, shiftNotes) +
      `<line class="dash" x1="2" y1="${Y0 - 12}" x2="358" y2="${Y0 - 12}"/>`;
    // title line on top; everything else moves down to make room
    const panel = (title, inner, cap) => wrap(`<text class="title" x="180" y="11" text-anchor="middle">${title}</text><g transform="translate(0 16)">${inner}</g>`, cap, HT + 16);
    // the start row for most cases: at this agonist dose three of five receptors are bound and active
    const START = [R('ag'), R(null), R('ag'), R(null), R('ag')];
    const F2 = {};

    // one definition per pair; the static panel and the step-through are built from the same data
    const DEFS = {
      'shift-fafa': { title: 'Full agonist + full agonist · NE + epinephrine at β1',
        start: [START, 0.6, ['3 of 5 receptors active', 'at this agonist dose']],
        shift: ['SHIFT: + second full agonist', 'c', [R('ag'), R('ag2'), R('ag'), R('ag2'), R('ag')], 1, ['second agonist fills the empty pockets', 'and activates them just as well']],
        base: 0, curves: curve(-1, 100, 30, 'c'), arrows: arrowH(0, -1, 50) + arrowV(-2.6, 2, 28),
        legend: ['shift LEFT · baseline UP · Emax same'],
        cap: ['<b>Start:</b> at this dose three of five receptors hold norepinephrine and signal.',
          '<b>Shift:</b> epinephrine occupies the empty pockets and activates them the same way, so the same norepinephrine dose gives more response.',
          '<b>Curve:</b> moves left; there is response before any norepinephrine is given (baseline up); the maximum is unchanged.',
          '<b>Rule:</b> two full agonists at one receptor add up; either one alone reaches 100%.',
          '<b>Symmetry:</b> both drugs sit in the same pocket, so equal doses give equal steps. Unequal steps that stop would mean a second site (allosteric).'] },
      'shift-fapa': { title: 'Partial agonist from a low baseline · aripiprazole, no dopamine',
        startTitle: 'START: no agonist', xl: 'log dose of the partial agonist', keys: ['dashed = no drug: nothing active', 'solid = partial agonist added'],
        start: [[R(null), R(null), R(null), R(null), R(null)], 0, ['no dopamine: nothing active', 'baseline 0']],
        shift: ['SHIFT: + partial agonist', 'c', [R('pa', 0.5), R('pa', 0.5), R('pa', 0.5), R('pa', 0.5), R('pa', 0.5)], 0.6, ['partial agonist fills the pockets', 'and activates each only part way'], 'c'],
        base: 0, flatBase: 0, curves: curve(0, 60, 0, 'c'), arrows: arrowV(2.6, 2, 58),
        legend: ['UP to the partial agonist’s own Emax (60%)', 'it behaves as an agonist'],
        cap: ['<b>Scenario 1, baseline 0:</b> no full agonist is present; the partial agonist alone fills the pockets.',
          '<b>Curve:</b> rises from 0 to the partial agonist’s own maximum, about 60% for aripiprazole, never to 100%.',
          '<b>His words:</b> "they can behave like an agonist if my baseline is zero, so I can go up."',
          '<b>Symmetry:</b> not the question here; a single curve of one drug has no shifts to compare.'] },
      'shift-fapa-down': { title: 'Partial agonist against a full response · manic patient + aripiprazole',
        startTitle: 'START: dopamine high', xl: 'log dose of the partial agonist', keys: ['dashed = dopamine alone', 'solid = partial agonist added'],
        start: [[R('ag'), R('ag'), R('ag'), R('ag'), R('ag')], 1, ['dopamine fills every pocket', 'full response, 100%'], ],
        shift: ['SHIFT: + partial agonist', 'c', [R('pa', 0.5), R('pa', 0.5), R('ag'), R('pa', 0.5), R('pa', 0.5)], 0.6, ['partial agonist takes pockets (mass action)', 'and activates each only part way']],
        base: 100, flatBase: 100, curves: curve(0, 60, 100, 'c'), arrows: arrowV(2.6, 98, 62),
        legend: ['DOWN to the partial agonist’s own Emax (60%)', 'it behaves as an antagonist'],
        cap: ['<b>Scenario 2, full response already:</b> dopamine is high (the manic patient); increasing doses of the partial agonist are added.',
          '<b>Shift:</b> by mass action the partial agonist takes over pockets and activates each one only part way, so the response falls.',
          '<b>Curve:</b> comes down from 100% to about 60%, the partial agonist’s own maximum, and no further: "I can outcompete dopamine and bring that baseline to about 60%. So that my patient is not manic anymore."',
          '<b>Rule:</b> the response always ends at the partial agonist’s own Emax: up from 0, down from 100. Only the full agonist alone reaches 100%. Both scenarios are the same drug at the same pocket; what differs is where the response starts.'] },
      'shift-inverse': { title: 'Full agonist + inverse agonist · histamine + loratadine at H1',
        start: [[R('ag'), R(null, 1), R('ag'), R(null, 1), R(null)], 0.8, ['two empty receptors active on their own', '= constitutive activity, the baseline']],
        shift: ['SHIFT: + inverse agonist', 'b', [R('ag'), R('inv'), R('ag'), R('inv'), R('inv')], 0.4, ['holds the empty receptors inactive;', 'comes off, so more agonist still wins']],
        base: 30, curves: curve(1, 100, 0, 'b'), arrows: arrowH(0, 1, 50) + arrowV(-2.6, 28, 2),
        legend: ['shift RIGHT · baseline DOWN to 0 · Emax same'],
        cap: ['<b>Start:</b> some receptors are active with an empty pocket (constitutive activity), which is why the baseline sits above zero.',
          '<b>Shift:</b> the inverse agonist binds those receptors and holds them inactive.',
          '<b>Curve:</b> baseline falls to zero and the agonist needs more dose (moves right).',
          '<b>Rule:</b> the inverse agonist is reversible, so enough agonist still reaches the same maximum.',
          '<b>Symmetry:</b> same pocket, so the right shifts come in equal steps; the falling baseline, not the symmetry, is what names the inverse agonist.'] },
      'shift-competitive': { title: 'Full agonist + reversible antagonist · NE + metoprolol at β1',
        start: [START, 0.6, ['3 of 5 receptors active', 'at this agonist dose']],
        shift: ['SHIFT: + reversible antagonist', 'c', [R('ag'), R('ant'), R('ant'), R('ant'), R('ag')], 0.4, ['fills pockets without signalling;', 'comes off: more agonist takes them back']],
        base: 0, curves: curve(1, 100, 0, 'c') + curve(2, 100, 0, 'c'), arrows: arrowH(0, 1, 50),
        legend: ['shift RIGHT · baseline same · Emax same', 'symmetrical steps, no limit'],
        cap: ['<b>Start:</b> three of five receptors hold norepinephrine and signal.',
          '<b>Shift:</b> metoprolol occupies pockets but produces no signal; because it comes off, a higher norepinephrine dose wins the pockets back.',
          '<b>Curve:</b> parallel shifts to the right, equal steps for equal antagonist doses, no limit.',
          '<b>Rule:</b> same maximum, baseline untouched (no efficacy): an antagonist can neither raise nor lower the response on its own.',
          '<b>Symmetry:</b> yes, "very symmetrical shifts with no change to the baseline, no change to the Emax, just shifting to the right"; the steps never stop because the pocket never fills for good.'] },
      'shift-irreversible': { title: 'Full agonist + irreversible antagonist · NE + phenoxybenzamine at α1',
        start: [START, 0.6, ['3 of 5 receptors active', 'at this agonist dose']],
        shift: ['SHIFT: + irreversible antagonist', 'b', [R('irr', 0, { dead: true }), R('ag'), R('irr', 0, { dead: true }), R('irr', 0, { dead: true }), R('ag')], 0.4, ['bound for good: those receptors leave', 'the pool; no agonist dose frees them']],
        base: 0, curves: curve(0.7, 100, 0, 'b') + curve(1.2, 60, 0, 'b') + curve(1.6, 25, 0, 'b'), arrows: arrowH(0, 0.7, 50) + arrowV(2.6, 98, 27),
        legend: ['shift RIGHT, then Emax DOWN toward 0', 'spare receptors delay the drop'],
        cap: ['<b>Start:</b> three of five receptors hold norepinephrine and signal.',
          '<b>Shift:</b> phenoxybenzamine binds covalently and never comes off, so those receptors leave the pool for good.',
          '<b>Curve:</b> while spare receptors remain the curve only shifts right; once too few receptors are left the maximum falls.',
          '<b>Rule:</b> enough antagonist abolishes the response.',
          '<b>Baseline:</b> stays where it was (here 0). An antagonist has no efficacy, so it cannot move the baseline; only an agonist raises it and only an inverse agonist lowers it. The tell for the irreversible antagonist is the Emax, not the baseline.',
          '<b>Symmetry:</b> not the question for this drug: ask about the Emax instead, which falls once the spare receptors are used up.'] },
      'shift-allo-agonist': { title: 'Allosteric agonist (PAM) · GABA + diazepam',
        start: [START, 0.6, ['3 of 5 receptors active', 'at this agonist dose']],
        shift: ['SHIFT: + allosteric agonist', 'c', [R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R('ag', 1, { side: 'pam' }), R(null, 0, { side: 'pam' }), R('ag', 1, { side: 'pam' })], 0.8, ['second site; agonist stays in its pocket', 'binds better (affinity): more are active']],
        base: 0, curves: curve(-0.6, 100, 0, 'c') + curve(-0.95, 100, 0, 'c') + curve(-1.1, 100, 0, 'c'), arrows: arrowH(0, -1.1, 50),
        legend: ['affinity: shift LEFT, shrinking steps, then stop', 'efficacy: rises only if the agonist is partial'],
        cap: ['<b>Start:</b> three of five receptors hold GABA and signal. (PAM = positive allosteric modulator, a drug at a second site that helps the agonist.)',
          '<b>Shift:</b> diazepam binds a second site while GABA stays in its pocket; GABA now binds better, so more receptors are active at the same dose.',
          '<b>Curve (affinity):</b> leftward shifts that get smaller and stop once every allosteric site is filled (asymmetrical, saturable).',
          '<b>Curve (efficacy):</b> a partial agonist’s curve rises; a full agonist is already at 100%.',
          '<b>Symmetry:</b> no. The second site fills up, so each step is smaller than the last and then stops: "if you see a figure in your exam that the shifts are not symmetric, you already know it\'s allosteric."'] },
      'shift-allo-antagonist': { title: 'Allosteric antagonist (NAM) · agonist + modulator',
        start: [START, 0.6, ['3 of 5 receptors active', 'at this agonist dose']],
        shift: ['SHIFT: + allosteric antagonist', 'b', [R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' }), R(null, 0, { side: 'nam' }), R('ag', 0.5, { side: 'nam' })], 0.3, ['second site; the agonist still binds', 'but each bound receptor signals less']],
        base: 0, curves: curve(0.6, 100, 0, 'b') + curve(0.95, 75, 0, 'b') + curve(1.1, 60, 0, 'b'), arrows: arrowH(0, 0.6, 50) + arrowV(2.6, 98, 62),
        legend: ['drawn: RIGHT and DOWN, unequal steps', '(affinity and efficacy both cut)'],
        cap: ['<b>Start:</b> three of five receptors hold the agonist and signal. (NAM = negative allosteric modulator, a drug at a second site that hinders the agonist.)',
          '<b>Shift:</b> the modulator binds a second site and is reversible; the agonist still binds.',
          '<b>Curve (affinity):</b> right shift with the same maximum; the sites fill up, so the shifts are unequal and stop.',
          '<b>Curve (efficacy):</b> each bound receptor signals less, so the maximum falls, but never to zero the way an irreversible antagonist can take it.',
          '<b>Drawn here:</b> a modulator that affects both, so the curves move right and down together.',
          '<b>Symmetry:</b> no, the same saturable second site: unequal steps that stop. Symmetry depends on where the drug binds, not on the scenario.'] }
    };
    const plain = t => t.replace(/<[^>]+>/g, '');
    Object.keys(DEFS).forEach(key => {
      const d = DEFS[key];
      const dashed = d.flatBase != null ? `<polyline class="cv a dashed" points="${lpx(-3)},${lpy(d.flatBase)} ${lpx(3)},${lpy(d.flatBase)}"/>` : curve(0, 100, d.base, 'a', true);
      const ax = () => axes(d.xl, d.keys ? d.keys[0] : undefined, d.keys ? d.keys[1] : undefined);
      F2[key] = () => panel(d.title, top(d.start[0], d.start[1], d.start[2], d.shift[0], d.shift[1], d.shift[2], d.shift[3], d.shift[4], d.startTitle) + ax() + dashed + d.curves + d.arrows + legend(d.legend), d.cap);
      // the same pair one step at a time: alone, the second drug binds, the curve moves, the reading
      const startCard = card(2, d.startTitle || 'START: full agonist alone', 'a', d.start[0], d.start[1], d.start[2]);
      const shiftCard = `<path class="arrow" d="M176 44 L184 44"/>` + card(186, d.shift[0], d.shift[1], d.shift[2], d.shift[3], d.shift[4]);
      const rule = `<line class="dash" x1="2" y1="${Y0 - 12}" x2="358" y2="${Y0 - 12}"/>`;
      const G = inner => `<g transform="translate(0 16)">${inner}</g>`;
      F2[key + '-anim'] = () => stepper(key, d.title.split(' · ')[0] + ' · step by step', [
        [(d.flatBase != null ? '' : 'Agonist alone: ') + plain(d.cap[0]).replace(/^Start: /, '') + (d.flatBase != null ? ' The dashed line is the response before the partial agonist is added.' : ' The dashed curve is this agonist alone.'), G(startCard + rule + ax() + dashed)],
        [plain(d.cap[1]), G(startCard + shiftCard + rule + ax() + dashed)],
        [plain(d.cap[2]), G(startCard + shiftCard + rule + ax() + dashed + d.curves + d.arrows)],
        ['Shift? Baseline? Emax? Symmetrical? ' + d.legend.join('; ') + '.', G(startCard + shiftCard + rule + ax() + dashed + d.curves + d.arrows + legend(d.legend))]
      ], HT + 56, ['<ol><li>Agonist alone (dashed curve).</li><li>The second drug binds.</li><li>The curve moves (solid).</li><li>Read it: shift, baseline, Emax, symmetry.</li></ol>', d.cap[3]], 'Four steps.');
    });
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
    /* ---------- the three α subunits: Gs, Gi, Gq (Day 1 slides ~51–55, Day 2 slide ~30, 9/30 review, J15) ---------- */
    const GA = [
      { cx: 62, rec: 'β1', lig: 'NE', a: 'αs', cls: 'A', eff: 'AC', sign: '+', msg: '↑ cAMP', out: 'heart rate UP', word: 'S for stimulation' },
      { cx: 180, rec: 'M2', lig: 'ACh', a: 'αi', cls: 'B', eff: 'AC', sign: '−', msg: '↓ cAMP', out: 'heart rate DOWN', word: 'I for inhibition' },
      { cx: 298, rec: 'α1', lig: 'NE', a: 'αq', cls: 'C', eff: 'PLC', sign: '+', msg: '↑ IP3 → Ca++', out: 'smooth muscle contracts', word: 'Q: stimulation too (calcium)' }
    ];
    const gaCol = (c, stage) => {   // stage: 0 receptor bound, 1 α on the effector, 2 second messenger, 3 effect
      const k = c.cls.toLowerCase();
      let g = cell(c.cx - 10, 36, { lig: stage >= 0 ? 'ag' : null, act: stage >= 0 ? 1 : 0 }) + `<text class="cl ${k}" x="${c.cx}" y="30" text-anchor="middle">${c.rec} + ${c.lig}</text>`;
      g += `<circle cx="${c.cx + (stage >= 1 ? 0 : -14)}" cy="${stage >= 1 ? 108 : 84}" r="8" fill="var(--fig${c.cls})" fill-opacity="0.3" stroke="var(--fig${c.cls})" stroke-width="1.2"/>` + xs(c.cx + (stage >= 1 ? 0 : -14), stage >= 1 ? 111 : 87, c.a, 'middle');
      if (stage < 1) g += `<circle cx="${c.cx + 2}" cy="${86}" r="5" class="box"/><circle cx="${c.cx + 9}" cy="${94}" r="4" class="box"/>`;
      g += `<rect class="box" x="${c.cx - 24}" y="122" width="48" height="18" rx="4"/>` + sm(c.cx, 134, c.eff) + (stage >= 1 ? `<text class="cl ${k}" x="${c.cx + 30}" y="135" text-anchor="start">${c.sign}</text>` : '');
      if (stage >= 2) g += arr(c.cx, 140, c.cx, 152) + `<text class="cl ${k}" x="${c.cx}" y="163" text-anchor="middle">${c.msg}</text>`;
      if (stage >= 3) g += xs(c.cx, 175, c.out, 'middle');
      return g;
    };
    const gaBase = band(6, 44, 348) + xs(6, 40, 'outside') + xs(354, 70, 'inside', 'end');
    F3['galpha'] = () => wrap(title('One receptor family, three α subunits: Gs, Gi, Gq') + gaBase + GA.map(c => gaCol(c, 3)).join('') +
      xs(62, 188, 'S for stimulation', 'middle') + xs(180, 188, 'I for inhibition', 'middle') + xs(298, 188, 'Q: stimulation too, via calcium', 'middle'),
      ['<b>Defined by the α subunit:</b> "a G protein, remember they\'re gonna be defined by the alpha subunit. It\'s alpha S, alpha I, alpha Q" (his Jeopardy key, J15). β and γ stay together; "the alpha subunit is gonna be the dictator of the function of that receptor".',
       '<b>Gs (β1, β2):</b> αs stimulates adenylate cyclase (AC): ATP → cAMP goes up; in the heart, rate up. "It\'s alpha S for stimulation."',
       '<b>Gi (M2):</b> αi inhibits the same adenylate cyclase: cAMP goes down; in the heart, rate down. "Alpha I for inhibition." Cross-talk: β1 and M2 pull on one AC from opposite sides.',
       '<b>Gq (α1):</b> αq stimulates phospholipase C (PLC): PIP2 → IP3 → Ca++ released from the ER; smooth muscle contracts. "Alpha Q for stimulation as well because it increased calcium."',
       '<b>What he asks:</b> which is the signal, the receptor, the transducer (αs, αi or αq), the effector (AC or PLC: "there\'s 2") and the second messenger (cAMP, IP3, Ca++).'], 196);
    /* the same six-box chain as F['gpcr'], one row per α subunit */
    F3['galpha-chain'] = () => {
      const cols = [['Drug'], ['Receptor'], ['G protein'], ['Effector'], ['Second', 'messenger'], ['Response']];
      const rows = [
        { cls: 'A', head: 'Gs: S for stimulation', cells: [['NE'], ['β1'], ['αs'], ['AC', 'stimulated'], ['↑ cAMP'], ['heart rate', 'UP']] },
        { cls: 'B', head: 'Gi: I for inhibition', cells: [['ACh'], ['M2'], ['αi'], ['AC', 'inhibited'], ['↓ cAMP'], ['heart rate', 'DOWN']] },
        { cls: 'C', head: 'Gq: stimulation too, through calcium', cells: [['NE'], ['α1'], ['αq'], ['PLC', 'stimulated'], ['↑ IP3', '→ ↑ Ca++'], ['smooth', 'muscle', 'contracts']] }
      ];
      const w = 50, gap = 10, x0 = 5, bh = 38;
      const cx = i => x0 + i * (w + gap) + w / 2;
      let g = title('The chain for each α subunit: Gs, Gi, Gq');
      cols.forEach((c, i) => c.forEach((t, j) => { g += xs(cx(i), 26 + j * 9, t, 'middle'); }));
      rows.forEach((r, ri) => {
        const y = 52 + ri * 52, k = r.cls.toLowerCase();
        g += `<text class="cl ${k}" x="${x0}" y="${y - 3}" text-anchor="start">${r.head}</text>`;
        r.cells.forEach((lines, i) => {
          const x = x0 + i * (w + gap);
          g += `<rect x="${x}" y="${y}" width="${w}" height="${bh}" rx="5" fill="var(--fig${r.cls})" fill-opacity="${i === 2 ? 0.25 : 0.08}" stroke="var(--fig${r.cls})" stroke-width="1"/>`;
          const top = y + bh / 2 + 3 - (lines.length - 1) * 4.5;
          lines.forEach((t, j) => { g += (i === 2 || j === 0 && lines.length < 3 && i !== 5) ? sm(cx(i), top + j * 9, t) : xs(cx(i), top + j * 9, t, 'middle'); });
          if (i < 5) g += `<path class="arrow" d="M${x + w + 1} ${y + bh / 2} L${x + w + gap - 2} ${y + bh / 2}"/>`;
        });
      });
      g += xs(180, 210, 'Same G-protein steps in every row (GDP off, GTP on, α leaves β/γ);', 'middle') + xs(180, 220, 'the α subunit decides the effector and the direction.', 'middle');
      return wrap(g, ['<b>Read across each row:</b> drug → receptor → α subunit (the transducer) → effector → second messenger → response.',
        '<b>Gs and Gi share one effector:</b> both act on adenylate cyclase (AC); αs turns it on (cAMP up) and αi turns it off (cAMP down). This is why β1 (Gs) and M2 (Gi) push the heart rate in opposite directions.',
        '<b>Gq uses a different effector:</b> phospholipase C (PLC) makes IP3, and IP3 releases Ca++ from the ER. It is still stimulation, through calcium instead of cAMP.',
        '<b>What he asks:</b> name the signal, the receptor, the transducer (αs, αi or αq), the effector (AC or PLC) and the second messenger (cAMP, IP3, Ca++). Sources: Day 1 slides ~51–55; Day 2 slide ~30; 9/30 review and Jeopardy J15.'], 228);
    };
    F3['galpha-anim'] = () => stepper('galpha', 'Gs, Gi, Gq step by step', [
      ['Gs: norepinephrine binds β1; the G protein underneath swaps GDP for GTP and αs leaves β/γ.', gaBase + gaCol(GA[0], 0)],
      ['αs stimulates adenylate cyclase (AC): ATP → cAMP goes up; heart rate up.', gaBase + gaCol(GA[0], 3)],
      ['Gi: acetylcholine binds M2; the same swap, but the subunit is αi.', gaBase + gaCol(GA[0], 3) + gaCol(GA[1], 0)],
      ['αi inhibits the same adenylate cyclase: cAMP goes down; heart rate down. One effector, two directions.', gaBase + gaCol(GA[0], 3) + gaCol(GA[1], 3)],
      ['Gq: norepinephrine binds α1; the subunit is αq and the effector is a different enzyme.', gaBase + gaCol(GA[0], 3) + gaCol(GA[1], 3) + gaCol(GA[2], 0)],
      ['αq stimulates phospholipase C (PLC): IP3, then Ca++ from the ER; smooth muscle contracts. Stimulation, through calcium instead of cAMP.', gaBase + gaCol(GA[0], 3) + gaCol(GA[1], 3) + gaCol(GA[2], 3)]
    ], 222, ['<ol><li>Gs: β1 + NE → αs → AC stimulated → ↑ cAMP → heart rate up.</li><li>Gi: M2 + ACh → αi → AC inhibited → ↓ cAMP → heart rate down.</li><li>Gq: α1 + NE → αq → PLC → ↑ IP3 → Ca++ → smooth muscle contracts.</li></ol>', '<b>Same steps every time</b> (GDP off, GTP on, α leaves β/γ); what differs is which α subunit, which effector, and which direction.'], 'Six steps: three subunits, two effectors.');

    F3['gpcr-steps'] = () => {
      let g = title('GPCR signalling: NE at β1 in the heart, forward and back');
      g += xs(6, 34, 'outside') + band(6, 40, 348) + xs(6, 68, 'inside the cell');
      g += cell(60, 20, { lig: 'ag', act: 1 }) + num(50, 24, '1') + num(94, 38, 'R3', 'b');
      g += `<circle cx="66" cy="92" r="8" fill="var(--figA)" fill-opacity="0.25" stroke="var(--figA)" stroke-width="1.2"/>` + xs(66, 95, 'αs', 'middle') +
           `<circle cx="84" cy="82" r="6" class="box"/><circle cx="92" cy="96" r="5" class="box"/>` + xs(84, 85, 'β', 'middle') + xs(92, 99, 'γ', 'middle') +
           xs(66, 112, 'GDP off · GTP on', 'middle') + num(44, 86, '2') + num(112, 110, 'R2', 'b');
      g += arr(76, 88, 150, 56) + box(152, 36, 44, 24, 'AC') + num(206, 40, '3');
      g += arr(174, 60, 174, 72) + xs(174, 84, 'ATP → cAMP', 'middle') + num(216, 82, '4') + num(140, 82, 'R1', 'b');
      g += arr(174, 88, 174, 98) + box(156, 100, 36, 16, 'PKA') + num(206, 108, '5');
      g += arr(174, 116, 174, 126) + xs(174, 138, 'Ca++ in → ↑ heart rate', 'middle') + num(238, 136, '6');
      g += notes(250, 34, ['signal = NE', 'receptor = β1', 'transducer = Gs (αs, β, γ)', 'effector = AC', 'second messengers =', '  cAMP, PKA, Ca++', 'response = ↑ heart rate']);
      g += `<line class="dash" x1="6" y1="148" x2="354" y2="148"/>`;
      g += notes(6, 162, ['1  NE (signal) binds β1 (receptor)', '2  receptor changes shape: GDP falls off, a new', '    GTP binds (exchange); αs (transducer) leaves β/γ', '3  αs turns on adenylate cyclase (effector)', '4  AC makes cAMP from ATP (2nd messenger);', '    one AC makes many cAMP: amplification', '5  cAMP activates protein kinase A (PKA)', '6  Ca++ enters: faster, stronger heartbeat']);
      g += `<text class="cl b" x="214" y="162" text-anchor="start">What ends it (R steps)</text>`;
      g += notes(214, 174, ['R1 PDE breaks down cAMP', 'R2 GTP → GDP (a phosphate', '    is cut off); α rejoins β/γ', 'R3 the receptor resets']);
      return wrap(g, ['<b>Forward (1–6)</b><ol><li>NE, the signal, binds β1, the receptor.</li><li>The receptor changes shape; GDP falls off the α subunit and a new GTP binds in its place (an exchange, not a phosphate added); αs separates from β/γ.</li><li>αs turns on adenylate cyclase, the effector.</li><li>AC makes cAMP from ATP: the second messenger; one AC makes many cAMP (amplification).</li><li>cAMP activates protein kinase A.</li><li>Ca++ enters: faster, stronger heartbeat.</li></ol>',
        '<b>Back (R1–R3, the reverse steps that end the signal)</b><ol><li>PDE breaks down cAMP.</li><li>One phosphate is cut off the GTP (GTPase; RGS speeds it): it is GDP again and α rejoins β/γ.</li><li>The receptor resets (NE comes off).</li></ol>',
        '<b>Vocabulary he tests</b><ul><li>signal: NE</li><li>receptor: β1</li><li>transducer: the G protein (αs, αi or αq)</li><li>effector: adenylate cyclase or phospholipase C</li><li>second messenger: cAMP, PKA, PKC, IP3, Ca++</li><li>Gαi uses the same AC in the opposite direction (less cAMP); Gαq uses PLC → IP3 and Ca++</li></ul>'], 246);
    };

    /* ---------- indirect antagonists ---------- */
    // a synapse: nerve terminal releases transmitter; receptors on the far side; the target sits in the cleft
    const synapse = (nt, target) => {
      let g = `<rect class="box" x="10" y="22" width="96" height="48" rx="4"/>` + xs(58, 64, 'nerve terminal', 'middle') + dot(30, 36, 'a') + dot(44, 44, 'a') + dot(58, 34, 'a') + dot(80, 42, 'a') + (nt === '5-HT' ? xs(58, 55, '5-HT = serotonin', 'middle') : '');
      g += arr(50, 70, 50, 80) + xs(56, 79, `${nt} released`);
      g += dot(40, 92, 'a') + dot(56, 98, 'a') + dot(72, 90, 'a') + dot(88, 97, 'a') + dot(104, 93, 'a');
      g += band(6, 118, 184) + xs(188, 146, 'target cell', 'end');
      g += cell(34, 104, { lig: 'ag', act: 1 }) + cell(68, 104, { lig: null, act: 0 }) + cell(102, 104, { lig: 'ag', act: 1 });
      if (target.kind === 'transporter') {
        g += box(132, 46, 34, 20, target.name) + xs(149, 42, 'transporter', 'middle') + arr(118, 92, 138, 68) + xs(146, 92, 'reuptake:') + xs(146, 101, 'taken back') + (target.drug ? block(146, 78, '') + block(118, 26, '') + `<text class="cl b" x="126" y="30" text-anchor="start">${target.drug}</text>` + xs(146, 110, 'blocked', 'start', 'b') : dot(126, 78, 'a') + dot(134, 72, 'a'));
      } else {
        g += `<path class="box" d="M160 76 L176 88 L160 100 L144 88 Z"/>` + xs(160, 91, target.name, 'middle') + xs(160, 70, 'enzyme', 'middle') + arr(110, 93, 142, 89) + (target.drug ? block(160, 56, '') + `<text class="cl b" x="160" y="46" text-anchor="middle">${target.drug}</text>` + xs(160, 110, 'blocked', 'middle', 'b') : xs(160, 110, 'breaks it down', 'middle') + dot(128, 84, 'a'));
      }
      return g;
    };
    const indirectPanel = (ttl, scene, side, curveFn, cap) => {
      const P = plot(176, 84);
      return wrap(title(ttl) + scene + notes(200, 30, side) + P.axes('log dose of the agonist', ['dashed = agonist alone', 'solid = with the indirect antagonist']) + curveFn(P), cap, 300);
    };
    const leftShift = (P, cls = 'c') => P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, cls) + P.arrowH(0, -1, 50) + P.legend(['shift LEFT · Emax same']);

    F3['ind-ssri'] = () => indirectPanel('Indirect antagonist, upstream · fluoxetine (SSRI) blocks SERT',
      synapse('5-HT', { kind: 'transporter', name: 'SERT', drug: 'fluoxetine' }),
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
      g += notes(200, 30, side) + P.axes('log dose of the agonist', ['dashed = agonist alone', 'solid = with the PDE inhibitor']) + P.curve(0, 100, 0, 'a', true) + P.curve(-1, 100, 0, 'c') + P.curve(0.3, 55, 0, 'd', true) + P.curve(-0.7, 100, 0, 'd') + P.arrowH(0, -1, 50) + xs(P.lpx(3) - 2, P.lpy(55) + 10, 'partial agonist alone (dashed)', 'end') + xs(P.lpx(3) - 2, P.lpy(100) + 22, 'full agonist alone (dashed)', 'end') + `<text class="cl c" x="${P.lpx(-2.9)}" y="${P.lpy(96)}" style="font-size:8.5px">solid green: full + inhibitor</text><text class="cl d" x="${P.lpx(-2.9)}" y="${P.lpy(86)}" style="font-size:8.5px">solid yellow: partial + inhibitor</text>` + P.legend(['full agonist: LEFT · partial agonist: LEFT and UP']);
      return wrap(g, ['<b>Where it acts:</b> phosphodiesterase, downstream of the receptor, in the cascade the receptor started.',
        '<b>Receptor:</b> untouched; the cAMP its cascade makes (through adenylate cyclase) is broken down more slowly, so more of it accumulates.',
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
      return wrap(g, ['<b>What happens:</b> with the agonist still bound, a GPCR kinase (GRK) "phosphorylate[s] that tail end of the seven-transmembrane receptor", which "allows another protein called the beta arrestin" to bind; αs cannot reassociate, so "I\'m not gonna make any more cAMP": the flat line in the trace.',
        '<b>Time and reversal:</b> "within milliseconds"; "like a band-aid. You put it on and you can take it off right away": once the agonist comes off, the phosphates are removed, αs reassociates and the cycle restarts.',
        '<b>Why the body does it:</b> "regulatory proteins within our cells that can stop our receptors from resetting and keep firing"; the cell is protected from too much stimulation.',
        '<b>What he tests:</b> rapid versus long-term ("my goal for you is that you can ... differentiate between a rapid effect and a long-term effect"); short-term regulation does NOT relocate the receptor into the cell (his poll); cAMP is the second messenger ("test question right there"). Not the full mechanism: "not for you to reproduce this for me in the exams".'], 212);
    };

    F3['desens-long'] = () => {
      let g = title('Long-term down-regulation: endocytosis, recycling or degradation');
      g += xs(6, 30, 'outside') + `<path d="M6 36 L80 36 C92 36 92 58 104 58 C116 58 116 36 128 36 L354 36" fill="none" stroke="var(--muted)" stroke-width="1.2"/>` + `<path d="M6 50 L74 50 C88 50 86 72 104 72 C122 72 120 50 134 50 L354 50" fill="none" stroke="var(--muted)" stroke-width="1.2"/>` + xs(6, 64, 'inside the cell');
      g += cell(44, 16, { lig: 'ag', act: 1 }) + xs(40, 82, 'too much agonist,', 'middle') + xs(40, 92, 'too long', 'middle');
      g += arr(72, 44, 84, 44) + cell(91, 36, { lig: 'ag', act: 0 }) + `<ellipse cx="104" cy="82" rx="14" ry="6" fill="var(--figB)" fill-opacity="0.3" stroke="var(--figB)" stroke-width="1.2"/>` + xs(104, 85, 'β-arr', 'middle') + xs(104, 100, 'coated pit', 'middle');
      g += arr(122, 60, 150, 96) + `<circle cx="180" cy="118" r="22" class="box"/>` + cell(167, 96, { lig: null, act: 0 }) + xs(180, 152, 'endocytosis: receptor', 'middle') + xs(180, 162, 'now inside a vesicle', 'middle');
      g += arr(200, 108, 236, 60) + `<text class="cl c" x="238" y="70" text-anchor="start">recycle back</text>` + `<text class="cl c" x="238" y="82" text-anchor="start">to the surface</text>` + cell(280, 16, { lig: null, act: 0 });
      g += arr(202, 122, 236, 122) + `<rect x="238" y="106" width="60" height="32" rx="4" fill="var(--figB)" fill-opacity="0.15" stroke="var(--figB)"/>` + `<text class="cl b" x="268" y="120" text-anchor="middle">lysosome</text>` + `<text class="cl b" x="268" y="131" text-anchor="middle">degrade</text>`;
      g += xs(180, 180, 'fewer receptors at the surface: the agonist is less potent (shift RIGHT) and its Emax can fall', 'middle');
      return wrap(g, ['<b>What happens:</b> "If it\'s not coming off, now we\'re going to go into the long process": β-arrestin takes the receptor into coated pits, endocytosis brings it inside, and the cell either recycles it to the surface or breaks it down in a lysosome. "That takes time" (the slide: seconds, minutes, hours or days).',
        '<b>Why the body does it:</b> "if I keep stimulating and stimulating and stimulating ... we\'re just gonna have to get rid of the receptors and keep them low"; a receptor that is not in the membrane "can\'t bind to anything".',
        '<b>Curve:</b> fewer receptors at the surface, so "I have to increase the concentration" to get the old response: the curve moves RIGHT (potency down). The Emax holds while spare receptors cover the loss and falls when receptors run short, "just like I would with any irreversible antagonist".',
        '<b>Why it matters:</b> tolerance (opioids, cocaine, Afrin after "2 to 3 days": the same dose does less); stop a norepinephrine drip suddenly and "they\'re gonna tank it out because there\'s just not enough receptors to do the job".'], 188);
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
      return wrap(g, ['<b>Rule:</b> "an antagonist will up regulate, an agonist is going to down regulate because our body is going to do the opposite to maintain that homeostasis. So just think about it, what the drug function is ... and how your body would oppose that."',
        '<b>Up-regulation</b> (chronic antagonist or inverse agonist): more receptors, "we just have more spare receptors now to go around". The full agonist shifts LEFT ("the more spare receptors I have, the more potent my agonist"); a partial agonist can reach the full response; the antagonist is weaker ("more chairs to cover").',
        '<b>Down-regulation</b> (chronic agonist): fewer receptors, "analogous to the effects of irreversible acting antagonists". The agonist shifts RIGHT and, when receptors run short, its Emax falls.',
        '<b>Why it matters:</b> β-blocker: "Do not go cold turkey ... hypertensive crisis ... wean themselves off"; tolerance to opioids and Afrin is down-regulation.'], 296);
    };
    /* ---------- step-throughs ---------- */
    const alphaS = (x, y, on) => `<circle cx="${x}" cy="${y}" r="7" fill="var(--figA)" fill-opacity="${on ? 0.25 : 0.08}" stroke="var(--figA)" stroke-width="1.2"${on ? '' : ' stroke-dasharray="2 2"'}/>` + xs(x, y + 3, 'αs', 'middle');
    const barrestin = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="23" ry="8" fill="var(--figB)" fill-opacity="0.3" stroke="var(--figB)" stroke-width="1.2"/>` + xs(x, y + 3, 'β-arrestin', 'middle');
    const tail = (cx, y0, p) => `<line class="ax" x1="${cx + 8}" y1="${y0}" x2="${cx + 20}" y2="${y0 + 16}"/>` + (p ? dot(cx + 14, y0 + 6, 'b', 2.6) + dot(cx + 18, y0 + 11, 'b', 2.6) + dot(cx + 22, y0 + 16, 'b', 2.6) + xs(cx + 26, y0 + 10, 'P P P') : '');
    const trace = (upto) => {
      const X0 = 200, X1 = 350, Yb = 118, Yt = 50;
      const pts = [[X0, Yb - 2], [220, Yb - 2], [230, 58], [244, 54], [260, 68], [278, 90], [296, 100], [330, 102], [338, Yb - 2], [X1, Yb - 2]];
      return `<line class="ax" x1="${X0}" y1="${Yb}" x2="${X1}" y2="${Yb}"/><line class="ax" x1="${X0}" y1="${Yb}" x2="${X0}" y2="${Yt}"/>` + xs(X0 - 3, Yt + 4, 'cAMP', 'end') + xs(X1, Yb + 10, 'time', 'end') + `<polyline class="cv a" points="${pts.slice(0, upto + 1).map(p => p.join(',')).join(' ')}"/>`;
    };
    const membrane = () => band(6, 40, 184) + xs(6, 34, 'outside') + xs(6, 70, 'inside the cell');
    const scene = (rec, inner) => membrane() + cell(70, 20, rec) + inner;

    F3['desens-rapid-anim'] = () => stepper('desens-rapid', 'Rapid desensitization step by step (GRK and β-arrestin)', [
      ['The agonist binds; αs couples to the receptor and signals; cAMP rises.', scene({ lig: 'ag', act: 1 }, alphaS(70, 76, true) + xs(84, 80, 'cAMP made') + tail(83, 54, false)) + trace(3)],
      ['Too much stimulation: the agonist-bound receptor becomes a substrate for a GPCR kinase (GRK), which puts phosphates on the receptor tail.', scene({ lig: 'ag', act: 1 }, alphaS(70, 76, true) + tail(83, 54, true) + `<text class="cl b" x="120" y="88" text-anchor="start">GRK</text>`) + trace(5)],
      ['The phosphorylated tail lets β-arrestin bind; αs can no longer couple, so cAMP production stops while the agonist is still on.', scene({ lig: 'ag', act: 0 }, alphaS(50, 80, false) + tail(83, 54, true) + barrestin(100, 92) + xs(84, 108, 'no cAMP')) + trace(7)],
      ['The agonist comes off: the phosphates are removed, β-arrestin leaves and αs couples again. Milliseconds, reversible.', scene({ lig: null, act: 0 }, alphaS(70, 76, true) + tail(83, 54, false) + xs(84, 80, 'ready again')) + trace(9)]
    ], 176, ['<ol><li>Agonist on: αs signals, cAMP rises.</li><li>GRK phosphorylates the receptor tail.</li><li>β-arrestin binds the tail and blocks αs: no cAMP while the agonist is still bound.</li><li>Agonist off: phosphates removed, β-arrestin leaves, reset.</li></ol>',
      '<b>Time course:</b> "within milliseconds"; reversible, "like a band-aid". <b>Trap:</b> the receptor does not leave the membrane here; that is long-term down-regulation.'], 'Four steps, all at the cell surface.');

    F3['desens-long-anim'] = () => {
      const P = plot(60, 56, 215, 135);
      return stepper('desens-long', 'Long-term down-regulation step by step (endocytosis)', [
        ['The stimulation continues: the agonist stays on and β-arrestin stays on the phosphorylated tail.', scene({ lig: 'ag', act: 0 }, tail(83, 54, true) + barrestin(100, 92) + xs(84, 108, 'stimulation continues'))],
        ['β-arrestin pulls the receptor into a coated pit in the membrane.', membrane() + `<path d="M60 40 C72 40 72 62 84 62 C96 62 96 40 108 40" fill="none" stroke="var(--muted)" stroke-width="1.2"/>` + cell(71, 32, { lig: 'ag', act: 0 }) + barrestin(84, 88) + xs(84, 104, 'coated pit', 'middle')],
        ['Endocytosis: the receptor is taken inside the cell in a vesicle. A receptor that is not in the membrane cannot bind anything.', membrane() + `<circle cx="84" cy="100" r="20" class="box"/>` + cell(71, 80, { lig: null, act: 0 }) + xs(84, 130, 'inside a vesicle', 'middle')],
        ['Fate 1: the receptor is recycled back to the surface.', membrane() + `<circle cx="84" cy="100" r="20" class="box"/>` + cell(71, 80, { lig: null, act: 0 }) + arr(96, 84, 134, 56) + `<text class="cl c" x="112" y="86" text-anchor="start">recycle</text>` + cell(140, 20, { lig: null, act: 0 })],
        ['Fate 2: the receptor is degraded in a lysosome and is gone.', membrane() + `<circle cx="84" cy="100" r="20" class="box"/>` + cell(71, 80, { lig: null, act: 0 }) + arr(104, 104, 130, 104) + `<rect x="132" y="94" width="52" height="22" rx="4" fill="var(--figB)" fill-opacity="0.15" stroke="var(--figB)"/><text class="cl b" x="158" y="108" text-anchor="middle">lysosome</text>`],
        ['Fewer receptors at the surface: the agonist needs more dose (curve right) and, when receptors run short, cannot reach its old maximum. Hours to days.', band(6, 40, 184) + xs(6, 34, 'outside') + cell(40, 20, { lig: 'ag', act: 1 }) + cell(110, 20, { lig: null, act: 0 }) + xs(96, 80, 'two receptors left of five', 'middle') + P.axes('log dose', ['dashed = before', 'solid = after down-regulation']) + P.curve(0, 100, 0, 'a', true) + P.curve(1, 55, 0, 'b') + P.arrowH(0, 1, 50)]
      ], 176, ['<ol><li>Stimulation continues; β-arrestin stays on the tail.</li><li>β-arrestin pulls the receptor into a coated pit.</li><li>Endocytosis: the receptor is inside a vesicle.</li><li>Recycled back to the surface, or</li><li>degraded in a lysosome.</li><li>Fewer surface receptors: agonist less potent, Emax can fall.</li></ol>',
        '<b>Time course:</b> "that takes time" (seconds to days on the slide). <b>Result:</b> tolerance (opioids, Afrin-type decongestants); "analogous to the effects of irreversible acting antagonists": curve RIGHT, then Emax down.'], 'Six steps; the receptor leaves the membrane.');
    };

    // regulation: static halves and one step-through each
    const regRow = (n, fill, y = 34) => { const w = 26, gap = n > 5 ? 2 : 8, start = 100 - (n * w + (n - 1) * gap) / 2; let h = band(6, y + 10, 190); for (let i = 0; i < n; i++) h += cell(start + i * (w + gap), y, fill(i)); return h; };
    const regBar = (level, label) => `<text class="lbl xs" x="206" y="52" text-anchor="start">response to one agonist dose</text><rect x="206" y="58" width="140" height="8" rx="4" fill="var(--chip)" stroke="var(--line)" stroke-width="0.8"/>` + (level ? `<rect x="206" y="58" width="${(140 * level).toFixed(0)}" height="8" rx="4" fill="var(--figA)"/>` : '') + xs(206, 80, label);
    const everyOther = i => ({ lig: i % 2 === 0 ? 'ag' : null, act: i % 2 === 0 ? 1 : 0 });
    const regStatic = (key, ttl, cls, n, act, lines, ec, emax, cap) => {
      const P = plot(150, 100);
      let g = title(ttl) + band(6, 44, 348);
      const w = 26, gap = 8, start = 100 - (n * w + (n - 1) * gap) / 2;
      for (let i = 0; i < n; i++) g += cell(start + i * (w + gap), 34, { lig: i < act ? 'ag' : null, act: i < act ? 1 : 0 });
      g += notes(206, 44, lines) + `<line class="dash" x1="2" y1="138" x2="358" y2="138"/>`;
      g += P.axes('log dose of the agonist', ['dashed = before regulation', 'solid = after']) + P.curve(0, 100, 0, 'a', true) + P.curve(ec, emax, 0, cls) + P.arrowH(0, ec > 0 ? 1 : -1, 50) + (emax < 100 ? P.arrowV(2.6, 98, emax + 2) : '');
      return wrap(g, cap, 296);
    };
    F3['upreg'] = () => regStatic('upreg', 'Up-regulation: after a chronic antagonist, more receptors', 'c', 6, 5,
      ['more receptors (more spare receptors)', 'the same dose finds more to bind', 'agonist MORE potent (curve LEFT)', 'a partial can reach the full response'], -1, 100,
      ['<b>Cause:</b> "chronic exposure to an antagonist or an inverse agonist"; the body does the opposite and adds receptors ("a compensatory mechanism").', '<b>Curve:</b> "with the up regulation, I can make a full agonist more potent by shifting it to the left"; "a drug who behaves like a partial agonist [can] become a full agonist because now I have enough receptors"; the antagonist is less potent.', '<b>Why it matters:</b> stop a β-blocker suddenly and "you have lots of receptors that are being up regulated and no antagonists to block it ... hypertensive crisis"; "they have to wean themselves off, decrease the dose gradually".']);
    F3['downreg'] = () => regStatic('downreg', 'Down-regulation: after a chronic agonist, fewer receptors', 'b', 3, 2,
      ['fewer receptors (spare used up)', 'the same dose finds fewer to bind', 'agonist LESS potent (curve RIGHT)', 'the maximum can fall'], 1, 55,
      ['<b>Cause:</b> "too much stimulation": the body does the opposite and removes receptors (desensitization, internalization, degradation), "analogous to the effects of irreversible acting antagonists".', '<b>Curve, link by link:</b> fewer receptors → "I have to increase the concentration" to get the same effect → curve RIGHT, potency down → when receptors run short, "I don\'t have enough receptors available" for the maximum: Emax falls.', '<b>Clinical:</b> tolerance (opioids, Afrin-type decongestants); stop a Levophed drip and the pressure drops.']);
    F3['upreg-anim'] = () => stepper('upreg', 'Up-regulation step by step', [
      ['Start: a tissue with five receptors. One agonist dose binds some of them and gives this response.', regRow(5, everyOther) + regBar(0.6, 'the point of reference')],
      ['A chronic antagonist (a β-blocker for weeks) sits in the pockets. The receptors are stimulated less than normal.', regRow(5, i => ({ lig: 'ant', act: 0 })) + regBar(0.1, 'blocked: little stimulation') + `<text class="cl c" x="206" y="98" text-anchor="start">chronic antagonist</text>`],
      ['The body does the opposite of the drug: it adds receptors (more spare receptors).', regRow(7, i => ({ lig: 'ant', act: 0 })) + regBar(0.15, 'more receptors, still blocked') + `<text class="cl c" x="206" y="98" text-anchor="start">up-regulated: 7 receptors</text>`],
      ['Stop the antagonist suddenly: the same agonist dose now finds many more receptors. The response is exaggerated (hypertensive crisis), so a β-blocker is tapered.', regRow(7, i => ({ lig: i % 3 !== 2 ? 'ag' : null, act: i % 3 !== 2 ? 1 : 0 })) + regBar(0.95, 'same dose, much bigger response') + `<text class="cl c" x="206" y="98" text-anchor="start">agonist MORE potent</text>`]
    ], 150, ['<ol><li>Five receptors; one dose gives the reference response.</li><li>Chronic antagonist: receptors stimulated less than normal.</li><li>The body adds receptors (up-regulation).</li><li>Antagonist stopped suddenly: the same dose gives an exaggerated response.</li></ol>',
      '<b>Rule:</b> "an antagonist will up regulate ... because our body is going to do the opposite to maintain that homeostasis."'], 'Four steps.');
    F3['downreg-anim'] = () => stepper('downreg', 'Down-regulation step by step', [
      ['Start: a tissue with five receptors. One agonist dose binds some of them and gives this response.', regRow(5, everyOther) + regBar(0.6, 'the point of reference')],
      ['A chronic agonist (an Afrin-type decongestant every day, a Levophed drip) keeps every receptor stimulated.', regRow(5, i => ({ lig: 'ag', act: 1 })) + regBar(1, 'too much stimulation') + `<text class="cl b" x="206" y="98" text-anchor="start">chronic agonist</text>`],
      ['The body does the opposite of the drug: it removes receptors (desensitization, internalization, degradation).', regRow(3, i => ({ lig: 'ag', act: 1 })) + regBar(0.6, 'fewer receptors') + `<text class="cl b" x="206" y="98" text-anchor="start">down-regulated: 3 receptors</text>`],
      ['The same dose now finds fewer receptors: a smaller response (tolerance). More drug is needed, and the maximum can fall.', regRow(3, everyOther) + regBar(0.3, 'same dose, smaller response') + `<text class="cl b" x="206" y="98" text-anchor="start">LESS potent · Emax can fall</text>`]
    ], 150, ['<ol><li>Five receptors; one dose gives the reference response.</li><li>Chronic agonist: every receptor stimulated.</li><li>The body removes receptors (down-regulation).</li><li>The same dose finds fewer receptors: smaller response (tolerance), "I have to increase the concentration" (curve RIGHT); when receptors run short the Emax falls.</li></ol>',
      '<b>Rule:</b> "an agonist is going to down regulate because our body is going to do the opposite." Analogous to an irreversible antagonist.'], 'Four steps.');

    // indirect antagonists: one step-through per drug
    const synMore = (nt, target) => {   // after the block: more transmitter in the cleft, every receptor active
      let g = synapse(nt, target);
      g += dot(48, 86, 'a') + dot(64, 104, 'a') + dot(80, 84, 'a') + dot(96, 104, 'a') + dot(112, 86, 'a') + dot(120, 100, 'a');
      g += cell(68, 104, { lig: 'ag', act: 1 });
      return g;
    };
    const indAnim = (key, ttl, nt, target, drug, where, curveCls, ec, emax, extraCurve, lines, cap) => () => {
      const P = plot(60, 56, 215, 135);
      const mini = (withDrug) => P.axes('log dose', ['dashed = ' + nt + ' alone', 'solid = with ' + drug]) + P.curve(0, 100, 0, 'a', true) + (withDrug ? P.curve(ec, emax, 0, curveCls) + (extraCurve ? extraCurve(P) : '') : '');
      const t0 = Object.assign({}, target, { drug: '' }), t1 = Object.assign({}, target, { drug });
      return stepper(key, ttl, [
        [`${nt} alone: the nerve releases it, it binds the receptor, and ${target.kind === 'transporter' ? 'the ' + target.name + ' transporter takes it back into the nerve (reuptake)' : 'the enzyme ' + target.name + ' breaks it down in the cleft'}.`, synapse(nt, t0) + mini(false)],
        [`${drug} sits on ${target.name} and blocks it, ${where}. The receptor itself is not touched.`, synapse(nt, t1) + mini(false)],
        [`More ${nt} stays at the receptor, so the same release activates more receptors.`, synMore(nt, t1) + mini(false)],
        [lines, synMore(nt, t1) + mini(true)]
      ], 206, cap, 'Four steps: alone, the block, the extra transmitter, the curve.');
    };
    F3['ind-ssri-anim'] = indAnim('ind-ssri', 'Fluoxetine step by step', '5-HT', { kind: 'transporter', name: 'SERT' }, 'fluoxetine', 'the serotonin reuptake transporter, upstream of the receptor', 'c', -1, 100, null,
      'Serotonin looks more potent: the curve moves LEFT with the same Emax (it is still serotonin; the receptors did not change).',
      ['<ol><li>Serotonin alone: released, binds, taken back up by SERT.</li><li>Fluoxetine blocks SERT (upstream of the receptor).</li><li>More serotonin stays in the cleft and activates more receptors.</li><li>Curve LEFT, same Emax.</li></ol>', '<b>Class:</b> indirect antagonist, "because it’s not affecting the receptor directly, it’s affecting the transporter".']);
    F3['ind-snri-anim'] = indAnim('ind-snri', 'Duloxetine step by step', 'NE', { kind: 'transporter', name: 'NET' }, 'duloxetine', 'the norepinephrine reuptake transporter, upstream of the receptor', 'c', -1, 100, null,
      'Norepinephrine looks more potent: the curve moves LEFT with the same Emax. Cocaine blocks NET the same way.',
      ['<ol><li>Norepinephrine alone: released, binds, taken back up by NET.</li><li>Duloxetine blocks NET (upstream).</li><li>More norepinephrine stays in the synapse and activates more receptors.</li><li>Curve LEFT, same Emax.</li></ol>', '<b>Poll:</b> "DRC B is NE alone. Which DRC best represents NE in the presence of duloxetine?" → the curve to the left of B.']);
    F3['ind-ache-anim'] = indAnim('ind-ache', 'Physostigmine step by step', 'ACh', { kind: 'enzyme', name: 'AChE' }, 'physostigmine', 'the enzyme that breaks down acetylcholine, upstream of the receptor', 'c', -1, 100, null,
      'Acetylcholine looks more potent: the curve moves LEFT with the same Emax. Any "-stigmine" works this way.',
      ['<ol><li>Acetylcholine alone: released, binds, broken down by acetylcholinesterase.</li><li>Physostigmine blocks the enzyme (upstream).</li><li>More acetylcholine survives to bind.</li><li>Curve LEFT, same Emax.</li></ol>', '<b>Use he named:</b> myasthenia gravis (antibodies against the nicotinic receptor).']);
    F3['ind-carbidopa-anim'] = () => {
      const P = plot(60, 56, 215, 135);
      const gutScene = (blocked, more) => box(10, 40, 56, 26, 'L-dopa') + xs(38, 76, 'by mouth', 'middle') + arr(66, 53, 84, 53) + `<path class="box" d="M106 40 L128 53 L106 66 L84 53 Z"/>` + xs(106, 56, 'enzyme', 'middle') + (blocked ? xs(106, 80, 'in the gut', 'middle') : xs(132, 70, 'in the gut')) + (blocked ? block(106, 28, '') + `<text class="cl b" x="118" y="30" text-anchor="start">carbidopa</text>` : arr(106, 66, 106, 84) + xs(106, 94, 'dopa broken down', 'middle')) + arr(128, 53, 146, 53) + box(146, 40, 44, 26, 'brain') + band(6, 118, 184) + xs(188, 146, 'brain neurons', 'end') + cell(34, 104, { lig: 'ag', act: 1 }) + cell(68, 104, { lig: more ? 'ag' : null, act: more ? 1 : 0 }) + cell(102, 104, { lig: more ? 'ag' : null, act: more ? 1 : 0 });
      const mini = (withDrug) => P.axes('log dose of L-dopa', ['dashed = L-dopa alone', 'solid = with carbidopa']) + P.curve(0, 100, 0, 'a', true) + (withDrug ? P.curve(-1, 100, 0, 'c') + P.flat(3, 'b') : '');
      return stepper('ind-carbidopa', 'Carbidopa step by step', [
        ['L-dopa alone: given by mouth, much of it is broken down by an enzyme in the gut before it reaches the brain.', gutScene(false, false) + mini(false)],
        ['Carbidopa blocks that gut enzyme. It does nothing at the dopamine receptors itself.', gutScene(true, false) + mini(false)],
        ['More dopa reaches the brain and more dopamine receptors are activated.', gutScene(true, true) + mini(false)],
        ['L-dopa looks more potent (curve LEFT); carbidopa alone gives no response (flat line): potentiation.', gutScene(true, true) + mini(true)]
      ], 206, ['<ol><li>L-dopa alone: broken down in the gut.</li><li>Carbidopa blocks the gut enzyme (upstream).</li><li>More dopa reaches the brain.</li><li>L-dopa curve LEFT; carbidopa alone does nothing.</li></ol>', '<b>Name for it:</b> potentiation (one drug has no effect alone but increases the other); the slide also marks it as an indirect antagonist.'], 'Four steps.');
    };
    /* ---------- Day 1–3 concepts he expects: receptor superfamilies, bonds, selectivity, MOA vs SOA ---------- */
    F3['superfamilies'] = () => {
      let g = title('The four receptor classes (Day 1 slides 35–36)') + band(6, 60, 348) + xs(354, 56, 'outside', 'end') + xs(354, 86, 'inside', 'end');
      const col = (cx, name, lines) => `<text class="cl a" x="${cx}" y="110" text-anchor="middle">${name}</text>` + lines.map((t, i) => `<text class="lbl xs" style="font-size:7.6px" x="${cx}" y="${121 + i * 10}" text-anchor="middle">${t}</text>`).join('');
      // 1 ion channel: two halves with a pore
      g += `<rect class="box" x="30" y="48" width="12" height="38" rx="3"/><rect class="box" x="52" y="48" width="12" height="38" rx="3"/>` + dot(47, 42, 'a') + arr(47, 50, 47, 94);
      g += col(47, 'ion channel', ['pore opens: ions flow', 'GABA, nicotinic, Ca++', 'diazepam, varenicline']);
      // 2 7-TM GPCR
      g += cell(127, 46, { lig: 'ag', act: 1 }) + `<circle cx="135" cy="94" r="6" fill="var(--figA)" opacity="0.8"/><circle cx="147" cy="96" r="5" fill="var(--figE)"/><circle cx="156" cy="92" r="4" fill="var(--figE)"/>` + xs(135, 97, 'α', 'middle');
      g += col(137, '7-TM (GPCR)', ['crosses 7×, G protein αβγ', 'α1 β1 β2 H1 M2 5-HT', 'most Exam 1 drugs']);
      // 3 1-TM pair with kinase tails
      g += `<rect class="box" x="214" y="40" width="9" height="56" rx="3"/><rect class="box" x="231" y="40" width="9" height="56" rx="3"/>` + dot(227, 36, 'a') + `<rect x="212" y="84" width="13" height="10" rx="2" fill="var(--figC)"/><rect x="229" y="84" width="13" height="10" rx="2" fill="var(--figC)"/>`;
      g += col(227, '1-TM', ['pocket out, enzyme in', 'tyrosine kinases', 'two chains pair up']);
      // 4 intracellular
      g += `<path class="arrow" d="M312 40 L312 70" stroke-dasharray="3 2"/>` + dot(312, 36, 'a') + `<rect class="box" x="298" y="72" width="28" height="18" rx="4"/>` + xs(312, 84, 'receptor', 'middle');
      g += col(312, 'intracellular', ['crosses the membrane', 'steroid hormones', 'acts on the nucleus']);
      return wrap(g, ['<b>Ion channels:</b> transmembrane proteins whose pore passes ions; passive (always open), voltage-gated (open at a membrane potential), ligand-gated (closed until a ligand binds in the channel), or a pump (moves ions against the gradient). Diazepam at GABA and varenicline at nicotinic act on ligand-gated channels.',
        '<b>7-transmembrane (7-TM, GPCR):</b> crosses the membrane seven times and works through a heterotrimeric G protein (α, β, γ): α and β adrenergic, serotonin (5-HT) and histamine receptors. Most of the Exam 1 drug list acts here.',
        '<b>1-transmembrane (1-TM):</b> binding pocket outside, enzymatic activity inside (tyrosine kinases); two chains pair up when the ligand binds.',
        '<b>Intracellular receptors and transcriptional regulators:</b> cytosolic or nuclear; steroid hormones cross the membrane to reach them.',
        '<b>His cue:</b> "those are gonna be your basic 4 types of receptors that we\'re gonna be talking about during this module"; the trap is putting an adrenergic or histamine receptor under 1-TM or ion channel.'], 150);
    };

    F3['bonds'] = () => {
      let g = title('Bonds and affinity: stronger bond, longer bound');
      const names = [['van der Waals', 'weakest'], ['hydrogen', ''], ['ionic', ''], ['covalent', 'strongest']];
      names.forEach((n, i) => {
        const x = 30 + i * 86, h = 18 + i * 16;
        g += `<rect x="${x}" y="${100 - h}" width="56" height="${h}" rx="3" fill="var(--fig${i === 3 ? 'B' : 'A'})" opacity="${0.45 + i * 0.18}"/>` + `<text class="cl ${i === 3 ? 'b' : 'a'}" x="${x + 28}" y="114" text-anchor="middle">${n[0]}</text>` + (n[1] ? xs(x + 28, 124, n[1], 'middle') : '');
      });
      g += arr(30, 134, 330, 134) + xs(180, 146, 'affinity increases; the drug stays bound longer', 'middle');
      g += xs(58, 160, 'reversible: comes off', 'middle') + xs(302, 160, 'irreversible: never comes off', 'middle') + xs(302, 170, '(phenoxybenzamine)', 'middle');
      g += xs(144, 170, 'weaker bonds must fit "like a hand in a glove"', 'middle');
      return wrap(g, ['<b>Affinity</b> is "how good a drug can attach to the receptor ... depending on what kind of bonds they form, covalent bonds, hydrogen bonds, ion bonds, van der Waal bonds, they may have stronger or weaker binding".',
        '<b>Covalent = irreversible:</b> "a drug that forms covalent bond at body temperature is gonna be irreversible ... you won\'t be able to break that bond"; "which drug has the greatest affinity? The one that forms covalent bond all day long, which are irreversible drugs" (phenoxybenzamine).',
        '<b>Weaker bonds need a better fit:</b> drugs that form weaker bonds "have to be more specific than drugs that form covalent bonds ... it has to be like a hand in a glove".',
        '<b>Poll (Day 1 slide 37):</b> "Affinity of a drug for the receptor is dependent on the type of chemical bonds it makes" → True.'], 176);
    };

    F3['selectivity'] = () => {
      let g = title('Selectivity: how many receptor types a drug fits (Day 1 slide 29)');
      const recs = ['H1', 'H2', 'M'];
      const row = (y, drug, fits, cls) => {
        let r = `<text class="cl ${cls}" x="6" y="${y + 14}" text-anchor="start">${drug}</text>`;
        recs.forEach((n, i) => { const x = 190 + i * 56; r += cell(x, y, { lig: fits.includes(n) ? 'ag' : null, act: fits.includes(n) ? 1 : 0 }) + xs(x + 10, y + 56, n + (n === 'M' ? ' (muscarinic)' : ''), 'middle'); });
        return r;
      };
      g += band(180, 32, 174) + row(22, 'loratadine (Claritin)', ['H1'], 'c') + xs(6, 46, 'selective: H1 only', 'start');
      g += band(180, 102, 174) + row(92, 'diphenhydramine (Benadryl)', ['H1', 'H2', 'M'], 'b') + xs(6, 116, 'non-selective: H1, H2, M', 'start') + xs(6, 126, '"more effects ... more side effects"', 'start');
      g += arr(30, 166, 330, 166) + xs(30, 178, 'low dose: selective', 'start') + xs(330, 178, 'high dose: "the less selective drugs become"', 'end');
      return wrap(g, ['<b>Selective:</b> loratadine "is Claritin, which is a selective H1 inverse agonist".',
        '<b>Non-selective:</b> "Benadryl not only binds to the H1, it binds to the H2. It binds to muscarinic receptors. It\'s very non-selective", and "the less selective drug is, the more effects it\'s going to produce. That\'s the more side effects".',
        '<b>Dose:</b> "the larger the dose is, the less selective drugs become": at high dose a drug reaches receptors it fits less well.',
        '<b>Must know:</b> "Is a beta 1 selective or a beta 1 beta 2 non-selective or alpha 1? Those are things that you must know" (metoprolol β1-selective; albuterol β2; prazosin α1).'], 186);
    };

    /* ---------- before and after: the eight things a second drug can do to a curve (Review pages 5–11; Day 4 slides) ---------- */
    F3['outcomes'] = () => {
      // one mini plot: x0,y0 top-left, w×h; curves as (ec, emax, base)
      const mp = (x0, y0, w, h) => {
        const X = x => x0 + (x + 3) / 6 * w, Y = y => y0 + h - y / 100 * h;
        const pts = (ec, emax, base) => { const o = []; for (let x = -3; x <= 3.001; x += 0.15) { const y = base + (emax - base) * Math.pow(10, x) / (Math.pow(10, x) + Math.pow(10, ec)); o.push(`${X(x).toFixed(1)},${Y(y).toFixed(1)}`); } return o.join(' '); };
        return {
          ax: `<line class="ax" x1="${x0}" y1="${y0 + h}" x2="${x0 + w}" y2="${y0 + h}"/><line class="ax" x1="${x0}" y1="${y0 + h}" x2="${x0}" y2="${y0}"/>`,
          cv: (ec, emax, base, cls, dashed) => `<polyline class="cv ${cls}${dashed ? ' dashed' : ''}" points="${pts(ec, emax, base)}" style="stroke-width:1.6"/>`
        };
      };
      const cols = [6, 94, 182, 270], W = 82, H = 46;
      const panels = [
        // [row, col, title, lines, draw]
        [0, 0, 'LEFT, same top', ['allosteric agonist', '(affinity), or more', 'transmitter (SSRI)'], P => P.cv(0, 100, 0, 'a', true) + P.cv(-1, 100, 0, 'c')],
        [0, 1, 'LEFT, baseline UP', ['second full agonist', '(responds on its own)'], P => P.cv(0, 100, 0, 'a', true) + P.cv(-1, 100, 30, 'c')],
        [0, 2, 'RIGHT, same top', ['competitive antagonist', '(or inverse agonist', 'when baseline is 0)'], P => P.cv(0, 100, 0, 'a', true) + P.cv(1, 100, 0, 'c')],
        [0, 3, 'RIGHT, baseline DOWN', ['inverse agonist', '(takes it to 0)'], P => P.cv(0, 100, 30, 'a', true) + P.cv(1, 100, 0, 'b')],
        [1, 0, 'RIGHT, top DOWN', ['irreversible antagonist', '(or allosteric', 'antagonist, efficacy)'], P => P.cv(0, 100, 0, 'a', true) + P.cv(0.7, 100, 0, 'b') + P.cv(1.2, 55, 0, 'b')],
        [1, 1, 'RIGHT, unequal', ['allosteric antagonist', '(affinity): steps', 'shrink and stop'], P => P.cv(0, 100, 0, 'a', true) + P.cv(0.7, 100, 0, 'b') + P.cv(1.0, 100, 0, 'b') + P.cv(1.1, 100, 0, 'b')],
        [1, 2, 'LEFT, unequal', ['allosteric agonist', '(affinity): steps', 'shrink and stop'], P => P.cv(0, 100, 0, 'a', true) + P.cv(-0.7, 100, 0, 'c') + P.cv(-1.0, 100, 0, 'c') + P.cv(-1.1, 100, 0, 'c')],
        [1, 3, 'TOP UP, no shift', ['partial becomes full:', 'allosteric (efficacy),', 'PDE inhibitor'], P => P.cv(0, 55, 0, 'a', true) + P.cv(0, 100, 0, 'c')]
      ];
      let g = title('Before and after: what one added drug can do to the curve');
      panels.forEach(([r, c, t, lines, draw]) => {
        const x0 = cols[c], y0 = 24 + r * 108;
        const P = mp(x0, y0 + 10, W, H);
        g += `<text class="cl ${/DOWN|RIGHT/.test(t) && !/same top/.test(t) ? 'b' : 'c'}" style="font-size:8.5px" x="${x0 + W / 2}" y="${y0 + 6}" text-anchor="middle">${t}</text>` + P.ax + draw(P);
        g += lines.map((l, i) => `<text class="lbl xs" x="${x0 + W / 2}" y="${y0 + H + 22 + i * 9.5}" text-anchor="middle">${l}</text>`).join('');
      });
      g += xs(6, 244, 'dashed = before (the agonist alone, the point of reference) · solid = after the second drug', 'start');
      return wrap(g, ['<b>Read every pair the same way.</b> Dashed is the agonist alone. Solid is what the added drug did. Ask in order: did it move left (helping) or right (making life more difficult)? did the baseline move? did the top move? if several solid curves, are the steps equal?',
        '<b>Left:</b> only something that helps the agonist: a second agonist (baseline up too), an allosteric agonist, more transmitter (an indirect antagonist upstream), more receptors.',
        '<b>Right, same top:</b> a reversible drug in the pocket: competitive antagonist; an inverse agonist looks the same when the baseline is already 0, and lowers the baseline when it is not.',
        '<b>Right, top down:</b> receptors taken out of the pool: irreversible antagonist (or an allosteric antagonist that affects efficacy).',
        '<b>Unequal steps that stop:</b> a second site that fills up: allosteric, agonist if left, antagonist if right.',
        '<b>Top up without a shift:</b> the agonist was partial and something downstream or at a second site made the response bigger.'], 252);
    };

    /* ---------- graded (one individual) vs quantal (a population): Part 2 pages 32–34; transcript 9/29 ---------- */
    F3['graded-quantal'] = () => {
      // left panel: one sample, how much
      const L1 = { x0: 30, y0: 40, w: 140, h: 80 };
      const lx = x => L1.x0 + (x + 3) / 6 * L1.w, ly = y => L1.y0 + L1.h - y / 100 * L1.h;
      const sigpts = () => { const o = []; for (let x = -3; x <= 3.001; x += 0.15) { const y = 100 * Math.pow(10, x) / (Math.pow(10, x) + 1); o.push(`${lx(x).toFixed(1)},${ly(y).toFixed(1)}`); } return o.join(' '); };
      let g = title('Graded vs quantal responses');
      g += `<text class="cl a" x="${L1.x0 + L1.w / 2}" y="30" text-anchor="middle">GRADED: one sample</text>`;
      g += `<line class="ax" x1="${L1.x0}" y1="${ly(0)}" x2="${L1.x0 + L1.w}" y2="${ly(0)}"/><line class="ax" x1="${L1.x0}" y1="${ly(0)}" x2="${L1.x0}" y2="${L1.y0}"/>`;
      g += `<polyline class="cv a" points="${sigpts()}"/>` + `<line class="dash" x1="${L1.x0}" y1="${ly(100)}" x2="${L1.x0 + L1.w}" y2="${ly(100)}"/>` + xs(L1.x0 + L1.w, ly(100) + 9, 'Emax', 'end') + `<line class="dash" x1="${lx(0)}" y1="${ly(0)}" x2="${lx(0)}" y2="${ly(50)}"/>` + xs(lx(0), ly(0) + 10, 'EC50', 'middle') + xs(L1.x0 - 3, ly(50) + 3, '50%', 'end') + xs(L1.x0 - 3, ly(0) + 3, '0', 'end');
      g += xs(L1.x0 + L1.w / 2, ly(0) + 20, 'log dose', 'middle') + `<text class="lbl xs" transform="translate(8 ${L1.y0 + L1.h / 2 + 22}) rotate(-90)" text-anchor="middle">% of max</text>`;
      g += xs(L1.x0 + L1.w / 2, 152, 'one muscle strip, one dog: how MUCH', 'middle') + xs(L1.x0 + L1.w / 2, 162, 'contraction, how much paralysis', 'middle') + xs(L1.x0 + L1.w / 2, 172, 'read: Emax (efficacy), EC50 (potency)', 'middle');
      // right panel: a population; bars = dogs responding at each dose, line = cumulative %
      const R1 = { x0: 212, y0: 40, w: 140, h: 80 };
      const doses = [7.7, 10, 13, 17, 22, 29, 38, 49, 64, 83, 108];
      const rx = x => R1.x0 + (Math.log10(x) - Math.log10(7.7)) / (Math.log10(108) - Math.log10(7.7)) * R1.w, ry = y => R1.y0 + R1.h - y / 100 * R1.h;
      g += `<text class="cl c" x="${R1.x0 + R1.w / 2}" y="30" text-anchor="middle">QUANTAL: a population</text>`;
      g += `<line class="ax" x1="${R1.x0}" y1="${ry(0)}" x2="${R1.x0 + R1.w}" y2="${ry(0)}"/><line class="ax" x1="${R1.x0}" y1="${ry(0)}" x2="${R1.x0}" y2="${R1.y0}"/>`;
      // bell of "dogs responding first at this dose" (heights are a drawing, not counts), then the cumulative curve
      const bell = [4, 10, 20, 34, 48, 56, 48, 34, 20, 10, 4];
      doses.forEach((d, i) => { const bw = 7, bh = bell[i] * R1.h / 100 * 0.55; g += `<rect x="${rx(d) - bw / 2}" y="${ry(0) - bh}" width="${bw}" height="${bh}" fill="var(--figC)" opacity="0.35"/>`; });
      let cumv = 0; const total = bell.reduce((a, b) => a + b, 0); const cpts = doses.map((d, i) => { cumv += bell[i]; return `${rx(d).toFixed(1)},${ry(100 * cumv / total).toFixed(1)}`; });
      g += `<polyline class="cv c" points="${cpts.join(' ')}"/>`;
      g += `<line class="dash" x1="${R1.x0}" y1="${ry(50)}" x2="${rx(29)}" y2="${ry(50)}"/><line class="dash" x1="${rx(29)}" y1="${ry(0)}" x2="${rx(29)}" y2="${ry(50)}"/>` + xs(rx(29), ry(0) + 10, 'ED50 ≈ 29', 'middle') + xs(R1.x0 - 3, ry(50) + 3, '50', 'end') + xs(R1.x0 - 3, ry(100) + 3, '100', 'end') + xs(R1.x0 - 3, ry(0) - 1, '0', 'end');
      g += xs(rx(7.7), ry(0) + 10, '7.7', 'middle') + xs(rx(108), ry(0) + 10, '108', 'middle') + xs(R1.x0 + R1.w / 2, ry(0) + 20, 'epinephrine, ng/kg/min (log)', 'middle') + `<text class="lbl xs" transform="translate(192 ${R1.y0 + R1.h / 2}) rotate(-90)" text-anchor="middle">% of dogs</text>`;
      g += xs(R1.x0 + R1.w / 2, 152, 'many dogs, each one yes or no:', 'middle') + xs(R1.x0 + R1.w / 2, 162, 'bars = who responds first at each dose', 'middle') + xs(R1.x0 + R1.w / 2, 172, 'line = cumulative %; read ED50, LD50, TI', 'middle');
      return wrap(g, ['<b>Graded</b> (left): one individual, and the question is how much. The y-axis is the size of the response in that one sample (degree of contraction with nicotine, degree of paralysis with curare), from no effect to maximum. From it you read Emax (efficacy) and EC50 (potency).',
        '<b>Quantal</b> (right): a population, and the question is yes or no for each individual: "Either you have an effect or you don\'t. Either you\'re dead or alive. You can\'t be in between." The response is defined first (blood pressure up by a set amount, hypnosis, death), then each dose is given and the individuals who respond are counted.',
        '<b>Two pictures of the same dogs:</b> the bars are how many dogs respond for the first time at each dose, sensitive ones at 7.7 ng/kg/min, resistant ones at 108, most in the middle ("this bell curve effect"). A dog that responds at 7.7 also responds at every higher dose, so adding the bars up gives the cumulative curve, "an old sigmoid curve that we did before".',
        '<b>What the cumulative curve gives:</b> the smallest dose that does anything, the dose that covers 100%, and the dose that treats 50% of the population, the ED50 ("about 29 nanograms per kilogram"). The same curve drawn for a toxic effect gives the TD50 or LD50, and LD50 ÷ ED50 is the therapeutic index.',
        '<b>The tell on the exam:</b> y-axis "% of maximal response" with one curve per drug = graded; y-axis "% of individuals responding" or "number responding" = quantal. On a quantal curve 50% means half the people responded, not half an effect, and Emax is not read from it.'], 184);
    };

    /* ---------- the chain from regulation to the curve (Part 2 pages 17–28; transcript 9/29) ---------- */
    const chainRow = (y, cls, head, boxes, curveFn) => {
      let g = `<text class="cl ${cls}" x="6" y="${y - 6}" text-anchor="start">${head}</text>`;
      const bw = 62, gap = 6, x0 = 6;
      boxes.forEach((lines, i) => {
        const x = x0 + i * (bw + gap);
        g += `<rect class="box" x="${x}" y="${y}" width="${bw}" height="50" rx="4"/>` + lines.map((t, k) => xs(x + bw / 2, y + 11 + k * 9.5, t, 'middle')).join('');
        if (i < boxes.length - 1) g += arr(x + bw, y + 25, x + bw + gap, y + 25);
      });
      return g;
    };
    F3['reg-chain'] = () => {
      let g = title('Regulation to the curve, link by link');
      g += chainRow(32, 'b', 'DOWN-regulation: chronic agonist (opioids, Afrin, NE drip)',
        [['chronic', 'AGONIST', 'too much', 'stimulation'], ['body does the', 'opposite:', 'removes', 'receptors'], ['same dose', 'finds fewer', 'receptors:', 'smaller response'], ['needs more', 'dose: curve', 'RIGHT', 'potency DOWN'], ['receptors', 'run short:', 'Emax DOWN', 'like irreversible']]);
      g += chainRow(106, 'c', 'UP-regulation: chronic antagonist (a β-blocker)',
        [['chronic', 'ANTAGONIST', 'too little', 'stimulation'], ['body does the', 'opposite:', 'adds', 'receptors'], ['same dose', 'finds more', 'receptors', '(more spare)'], ['agonist', 'curve LEFT', 'partial can', 'reach full'], ['stop suddenly:', 'unblocked', 'receptors →', 'hypertensive', 'crisis']]);
      g += `<text class="lbl sm" x="6" y="172" text-anchor="start">Rule: the body opposes the drug. Agonist → down, antagonist → up.</text>`;
      g += `<text class="lbl xs" x="6" y="184" text-anchor="start">Consequences: tolerance (down); "Do not go cold turkey", wean off a β-blocker (up).</text>`;
      return wrap(g, ['<b>Down-regulation:</b> fewer receptors → "I have to increase the concentration" → curve RIGHT (potency down). The Emax holds while spare receptors cover the loss; when "I don\'t have enough receptors available" it falls, "just like I would with any irreversible antagonist".',
        '<b>Up-regulation:</b> more receptors → "the more spare receptors I have, the more potent my agonist" → curve LEFT; a partial agonist "become[s] a full agonist because now I have enough receptors"; the antagonist is weaker ("more chairs to cover").',
        '<b>Why it matters:</b> tolerance (opioids, cocaine, Afrin: the same dose does less); stop a norepinephrine drip and "they\'re gonna tank it out"; stop a β-blocker suddenly and "that patient is going to be very likely to go into ... hypertensive crisis", so "wean themselves off".'], 192);
    };

    /* ---------- addition, synergism, potentiation (Part 2 pages 30–31; transcript 9/29) ---------- */
    // three bar groups: drug A alone, drug B alone, A + B; heights are the percentages he spoke, where he gave them
    const enhGroup = (x, name, bars, names, rule, cls, hi) => {
      const base = 118, maxH = 70, bw = 22;
      let g = `<text class="cl ${cls}" x="${x + 55}" y="26" text-anchor="middle">${name}</text>` + `<line class="ax" x1="${x + 4}" y1="${base}" x2="${x + 106}" y2="${base}"/>`;
      bars.forEach((b, i) => {
        const bx = x + 10 + i * 34, h = Math.round(maxH * b.v / 100);
        if (h > 0) g += `<rect x="${bx}" y="${base - h}" width="${bw}" height="${h}" rx="2" fill="var(--fig${b.c})" opacity="${hi === i ? 1 : 0.85}"/>`;
        else g += `<line x1="${bx}" y1="${base - 1}" x2="${bx + bw}" y2="${base - 1}" stroke="var(--fig${b.c})" stroke-width="2"/>`;
        g += xs(bx + bw / 2, base - h - 4, b.top, 'middle') + xs(bx + bw / 2, base + 10, b.lab, 'middle');
      });
      return g + xs(x + 55, 141, names[0], 'middle') + xs(x + 55, 151, names[1], 'middle') + xs(x + 55, 166, rule[0], 'middle') + (rule[1] ? xs(x + 55, 176, rule[1], 'middle') : '');
    };
    const ENH = {
      add: (hi) => enhGroup(6, 'Addition', [{ v: 50, c: 'A', top: '50%', lab: 'A' }, { v: 50, c: 'C', top: '50%', lab: 'B' }, { v: 100, c: 'D', top: '100%', lab: 'A + B' }], ['A trimethoprim', 'B sulfamethoxazole'], ['= the sum', '50 + 50 = 100'], 'a', hi),
      syn: (hi) => enhGroup(124, 'Synergism', [{ v: 30, c: 'A', top: '30%', lab: 'A' }, { v: 50, c: 'C', top: '50%', lab: 'B' }, { v: 100, c: 'D', top: '100%', lab: 'A + B' }], ['A penicillin', 'B gentamicin'], ['> the sum: 30 + 50 → 100', '"1 plus 1 and you get 5"'], 'c', hi),
      pot: (hi) => enhGroup(242, 'Potentiation', [{ v: 0, c: 'B', top: 'none', lab: 'A' }, { v: 40, c: 'A', top: 'some', lab: 'B' }, { v: 90, c: 'D', top: 'more', lab: 'A + B' }], ['A carbidopa', 'B L-dopa'], ['A has no effect alone', 'but makes B better'], 'b', hi)
    };
    const enhCap = ['<b>Addition:</b> two drugs with the same effect; the result equals the sum. Each antibiotic kills 50% of the colony; together 100% (trimethoprim + sulfamethoxazole).',
      '<b>Synergism:</b> both drugs have an effect alone; together the result is greater than the sum. Penicillin 30%, gentamicin 50%, together 100%: "1 plus 1 and you get 5".',
      '<b>Potentiation:</b> one drug has no effect alone but increases the effect of the other. Carbidopa does nothing for a Parkinson’s patient by itself; it protects dopa in the gut so more reaches the brain (an indirect antagonist of that enzyme).',
      '<b>The tell:</b> does each drug have an effect on its own? Both yes and the total is the sum → addition; both yes and more than the sum → synergism; one no → potentiation. The drug names are "just FYI"; the three definitions are not.'];
    F3['enhance'] = () => wrap(title('Addition, synergism, potentiation: does each drug work alone?') + ENH.add() + ENH.syn() + ENH.pot(), enhCap, 186);
    F3['enhance-anim'] = () => stepper('enhance', 'Addition, synergism, potentiation step by step', [
      ['Addition: each antibiotic kills 50% of the colony alone; together they kill 100%, exactly the sum.', ENH.add(2)],
      ['Synergism: penicillin alone kills 30%, gentamicin alone 50%; together 100%, more than the sum ("1 plus 1 and you get 5").', ENH.add() + ENH.syn(2)],
      ['Potentiation: carbidopa alone has no effect; with L-dopa the effect is larger, because carbidopa blocks the gut enzyme that breaks dopa down.', ENH.add() + ENH.syn() + ENH.pot(2)],
      ['Ask of each drug: does it work alone? Both yes → addition (sum) or synergism (more than the sum). One no → potentiation.', ENH.add() + ENH.syn() + ENH.pot()]
    ], 234, ['<ol><li>Addition: 50% + 50% = 100%, the sum.</li><li>Synergism: 30% + 50% → 100%, more than the sum.</li><li>Potentiation: carbidopa 0 alone; L-dopa does more with it.</li><li>The tell: does each drug have an effect on its own?</li></ol>'], 'Four steps.');

    F3['ind-pde-anim'] = () => {
      const P = plot(60, 56, 226, 126);
      const casc = (blocked, built) => {
        let g = band(6, 24, 184) + cell(20, 4, { lig: 'ag', act: 1 }) + xs(50, 30, 'agonist bound, receptor signalling');
        const bx = [6, 44, 82, 120, 158];
        ['Gs', 'AC', 'cAMP', 'PKA', 'response'].forEach((t, i) => { g += `<rect class="box" x="${bx[i]}" y="60" width="34" height="16" rx="4"/>` + xs(bx[i] + 17, 71, t, 'middle'); if (i < 4) g += arr(bx[i] + 34, 68, bx[i + 1], 68); });
        g += arr(99, 76, 99, 88) + `<path class="box" d="M99 88 L115 100 L99 112 L83 100 Z"/>` + xs(99, 103, 'PDE', 'middle') + (blocked ? block(70, 100, '') : arr(115, 100, 130, 100) + xs(132, 103, 'cAMP broken down'));
        if (built) g += [92, 104, 116].map(x => `<circle cx="${x}" cy="50" r="3" fill="var(--figC)"/>`).join('') + `<text class="lbl xs" style="fill:var(--figC)" x="122" y="53">cAMP builds up</text>`;
        return g;
      };
      const mini = (withDrug) => P.axes('log dose of the agonist', ['dashed alone · solid + inhibitor', 'blue/green full · yellow partial']) + P.curve(0, 100, 0, 'a', true) + P.curve(0.3, 55, 0, 'd', true) + xs(P.lpx(3) - 2, P.lpy(100) + 18, 'full alone', 'end') + xs(P.lpx(3) - 2, P.lpy(55) + 9, 'partial alone', 'end') + (withDrug ? P.curve(-1, 100, 0, 'c') + P.curve(-0.7, 100, 0, 'd') : '');
      return stepper('ind-pde', 'Milrinone / caffeine step by step', [
        ['Agonist alone: the receptor signals through Gs and adenylate cyclase; cAMP is made, and phosphodiesterase (PDE) breaks it down.', casc(false, false) + mini(false)],
        ['Milrinone or caffeine blocks PDE, downstream of the receptor. The receptor is not touched.', casc(true, false) + mini(false)],
        ['cAMP is no longer broken down, so it builds up behind the same receptor signal.', casc(true, true) + mini(false)],
        ['Full agonist: curve LEFT (more potent), same Emax. Partial agonist: LEFT and UP, now reaching the full response ("behaving like a full agonist").', casc(true, true) + mini(true)]
      ], 206, ['<ol><li>Agonist alone: cAMP made by adenylate cyclase (AC), broken down by phosphodiesterase (PDE).</li><li>The PDE inhibitor (milrinone, caffeine) blocks PDE, downstream of the receptor.</li><li>cAMP builds up behind the same receptor signal.</li><li>Full agonist: curve LEFT, same Emax. Partial agonist: LEFT and UP to the full response.</li></ol>', '<b>Why it is indirect:</b> it binds an enzyme after the receptor, not the receptor.'], 'Four steps.');
    };
    /* The RTK → RAS pathway, one scenario per step (transcript 9/23; Day 2 slides ~7–~11;
       Day 4–5 deck Part 2 pages ~7–~8). Every shape has a data-k so the steps animate. */
    F3['rtk-scenarios-anim'] = () => {
      const P = plot(122, 48);
      const K = ['Grb2', 'GEF', 'RAS', 'RAF', 'MEK', 'ERK'], bx = i => 6 + i * 42;
      const scene = st => {
        let g = band(6, 30, 348) + `<text data-k="sc-out" class="lbl xs" x="354" y="27" text-anchor="end">outside</text><text data-k="sc-in" class="lbl xs" x="354" y="54" text-anchor="end">inside the cell</text>`;
        const pos = st.dimer ? [40, 56] : [24, 72];
        pos.forEach((x, j) => {
          const s = j ? 'R' : 'L';
          if (st.lig) g += `<circle data-k="sc-lig${s}" cx="${x}" cy="12" r="5" fill="var(--figC)" fill-opacity="0.35" stroke="var(--figC)"/>`;
          g += `<rect data-k="sc-b${s}" x="${x - 7}" y="18" width="14" height="12" rx="3" fill="var(--figA)" fill-opacity="0.2" stroke="var(--figA)"/><rect data-k="sc-s${s}" x="${x - 2}" y="30" width="4" height="14" fill="var(--figA)" fill-opacity="0.6"/><rect data-k="sc-t${s}" x="${x - 7}" y="44" width="14" height="12" rx="3" fill="var(--figB)" fill-opacity="0.15" stroke="var(--figB)"/>`;
          if (st.p) g += `<circle data-k="sc-p${s}" cx="${j ? x + 11 : x - 11}" cy="50" r="4" fill="var(--figD)" fill-opacity="0.4" stroke="var(--figD)"/>`;
        });
        g += `<text data-k="sc-rl" class="lbl xs" x="96" y="20" text-anchor="start">${st.rl}</text>`;
        g += `<path data-k="sc-a0" class="arrow" d="M48 58 L${bx(0) + 17} 68" opacity="${st.flow ? 1 : 0.25}"/>`;
        K.forEach((k, i) => {
          const on = st.flow && !(st.cut && i > 2), hot = st.hot && i >= 2;
          g += `<rect data-k="sc-k${i}" x="${bx(i)}" y="70" width="34" height="16" rx="4" fill="${hot ? 'var(--figB)' : 'var(--figA)'}" fill-opacity="${on ? (hot ? 0.35 : 0.2) : 0.04}" stroke="${hot ? 'var(--figB)' : 'var(--figA)'}" stroke-opacity="${on ? 1 : 0.35}"/><text data-k="sc-kt${i}" class="lbl xs" x="${bx(i) + 17}" y="81" text-anchor="middle" opacity="${on ? 1 : 0.4}">${k}</text>`;
          if (i < 5) g += `<path data-k="sc-ka${i}" class="arrow" d="M${bx(i) + 34} 78 L${bx(i + 1)} 78" opacity="${on && !(st.cut && i >= 2) ? 1 : 0.25}"/>`;
        });
        g += `<path data-k="sc-ka5" class="arrow" d="M${bx(5) + 34} 78 L262 78" opacity="${st.flow && !st.cut ? 1 : 0.25}"/><rect data-k="sc-o" x="262" y="66" width="92" height="24" rx="4" class="box"/><text data-k="sc-ot" class="lbl xs" x="308" y="76" text-anchor="middle">${st.o1}</text><text data-k="sc-ot2" class="lbl xs" x="308" y="86" text-anchor="middle">${st.o2}</text>`;
        if (st.cut) g += `<g data-k="sc-x">${block(bx(2) + 17, 100, '')}</g><text data-k="sc-xt" class="cl b" x="${bx(2) + 26}" y="104" text-anchor="start">drug X binds RAS: nothing after it</text>`;
        if (st.hot) g += `<text data-k="sc-ht" class="cl b" x="${bx(2)}" y="104" text-anchor="start">20–25% of cancers contain a RAS mutation</text>`;
        if (st.tp) g += `<rect data-k="sc-tp" x="96" y="96" width="140" height="16" rx="4" fill="var(--figE)" fill-opacity="0.2" stroke="var(--figE)"/><text data-k="sc-tpt" class="cl e" x="166" y="108" text-anchor="middle">tyrosine phosphatase</text>`;
        if (st.curve) g += P.axes('log dose of the growth factor', ['dashed = growth factor alone', 'solid = with drug X']) + P.curve(0, 100, 0, 'a', true) + P.curve(1, 55, 0, 'b') + P.arrowH(0, 1, 50) + P.legend(['shift RIGHT and Emax DOWN']);
        return `<g transform="translate(0 16)">${g}</g>`;
      };
      const steps = [
        ['The growth factor (an agonist) binds, the two receptors dimerize, and their tails are phosphorylated. The signal runs Grb2 → GEF → RAS → RAF → MEK → ERK, and the cell grows and divides.', scene({lig: 1, dimer: 1, p: 1, flow: 1, rl: 'growth factor bound: dimer, phosphorylated', o1: 'cell grows', o2: 'and divides'}), 'Normal growth-factor signal'],
        ['"A lot of cancers has a higher stimulation of those receptors. They are growing and dividing really, really fast" (9/23). His slide: 20–25% of cancers contain a RAS mutation.', scene({lig: 1, dimer: 1, p: 1, flow: 1, hot: 1, rl: 'higher stimulation of the pathway', o1: 'grows and divides', o2: 'really fast'}), 'Cancer: the pathway is over-stimulated'],
        ['Drug X binds RAS and stops it from functioning. His answer: no RAF, no MEK, no ERK, so the cells do not grow and do not divide.', scene({lig: 1, dimer: 1, p: 1, flow: 1, cut: 1, rl: 'receptor still binds, dimerizes, phosphorylates', o1: 'cells do not grow', o2: 'or divide'}), 'Drug X blocks RAS'],
        ['Drug X never touches the receptor, so it is an indirect antagonist acting downstream. On the growth factor\'s curve it shifts RIGHT and the Emax falls ("decreasing the potency of an agonist").', scene({lig: 1, dimer: 1, p: 1, flow: 1, cut: 1, curve: 1, rl: 'indirect antagonist: downstream of the receptor', o1: 'less signal', o2: 'gets through'}), 'Drug X on the dose–response curve'],
        ['Reset: "a tyrosine phosphatase ... cuts that extra phosphate out, and as it does that, you stop the process, they separate from each other, and now you can start the whole process again" (9/23).', scene({tp: 1, rl: 'phosphates removed: receptors separate', o1: 'signal stops;', o2: 'ready to start again'}), 'Reset: tyrosine phosphatase']
      ];
      return stepper('rtk-scenarios', 'The RTK → RAS pathway: each scenario he covered', steps, 290,
        ['<b>Sources:</b> transcript 9/23 (activation, reset, pancreatic cancer, drug X); Pharmacodynamics Day 2 slides ~7–~11 (RTK activation; Grb2/GEF/RAS/RAF/MEK/ERK; 20–25% of cancers contain a RAS mutation; RAS blocked); Day 4–5 deck Part 2, pages ~7–~8 (drug X as an indirect antagonist: curve right and down).',
         '<b>What he tests:</b> the activation steps in order, what tyrosine phosphatase does, and what blocking RAS does downstream (no RAF, MEK or ERK; no growth) and to the curve.']);
    };

    F3['ind-ras-anim'] = () => {
      const P = plot(60, 56, 215, 135);
      const ras = (blocked, cut) => {
        let g = band(6, 24, 184) + cell(20, 4, { lig: 'ag', act: 1 }) + cell(46, 4, { lig: 'ag', act: 1 }) + xs(76, 24, 'growth factor; two receptors pair') + xs(76, 34, '(receptor tyrosine kinase)');
        const bx = [6, 38, 70, 102, 134, 166];
        ['GEF', 'RAS', 'RAF', 'MEK', 'ERK', 'growth'].forEach((t, i) => { g += `<rect class="box" x="${bx[i]}" y="60" width="24" height="16" rx="4"${cut && i > 1 ? ' opacity="0.35"' : ''}/>` + xs(bx[i] + 12, 71, t, 'middle'); if (i < 5) g += arr(bx[i] + 24, 68, bx[i + 1], 68); });
        if (blocked) g += block(50, 92, '') + `<text class="lbl xs" style="fill:var(--figB)" x="60" y="95">drug X blocks RAS</text>`;
        if (cut) g += `<text class="lbl xs" style="fill:var(--figB)" x="60" y="108">signal cut: the cell does not grow</text>`;
        return g;
      };
      const mini = (withDrug) => P.axes('log dose of the growth factor', ['dashed = agonist alone', 'solid = with drug X']) + P.curve(0, 100, 0, 'a', true) + (withDrug ? P.curve(1, 55, 0, 'b') : '');
      return stepper('ind-ras', 'Cancer drug X step by step', [
        ['Agonist alone: the growth factor pairs two receptor tyrosine kinases; the signal runs GEF → RAS → RAF → MEK → ERK → growth.', ras(false, false) + mini(false)],
        ['Drug X blocks RAS, downstream of the receptor. The receptor still binds and signals.', ras(true, false) + mini(false)],
        ['The message is cut at RAS: no RAF, MEK or ERK, so the cell does not grow.', ras(true, true) + mini(false)],
        ['Less signal gets through: the agonist is less potent (curve RIGHT) and less efficacious (Emax DOWN).', ras(true, true) + mini(true)]
      ], 206, ['<ol><li>Agonist alone: the cascade runs to growth.</li><li>Drug X blocks RAS (downstream).</li><li>The message is cut after RAS.</li><li>Curve RIGHT and Emax DOWN.</li></ol>', '<b>Contrast:</b> the PDE inhibitor raises the signal; drug X cuts it. Both are indirect: neither touches the receptor.'], 'Four steps.');
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
    (spec.marks || []).forEach(m => { inner += dash(m.x, 0, m.x, m.y == null ? 50 : m.y) + tick(m.x, m.label); });
    spec.curves.forEach((c, i) => {
      const pts = sig(c.ec, c.emax, c.n || 1, c.base == null ? b : c.base);
      const k = c.cls || cls[i % cls.length];
      inner += `<polyline class="cv ${k}${c.dashed ? ' dashed' : ''}" points="${pts}"/>`;
      // label at the curve's own midpoint, on the left of it, where curves separate
      const cb = c.base == null ? b : c.base, mid = cb + (c.emax - cb) / 2;
      inner += `<text class="cl ${k}" x="${px(c.ec) - 6}" y="${py(mid) + 4}" text-anchor="end">${c.label}</text>`;
    });
    if (b) inner += dash(-3, b, 3, b) + ytick(b, 'basal');   // drawn last so it shows over a curve that stays flat at the baseline
    return wrap(inner, spec.caption || '');
  };


  /* Step-through of the Gs cascade (NE at β1), forward and back. Each step is
     an SVG group with data-step; the engine shows one at a time through the
     buttons under the figure (data-anim). Steps from Day 1 slides ~51–54 and
     the 9/23 and 9/30 transcripts (notes/L06.md, J9). */
  F['gpcr-anim'] = () => {
    const xs = (x, y, t, anchor = 'start') => `<text class="lbl xs" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
    const box = (x, y, w, h, t) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><text class="lbl sm" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${t}</text>`;
    const arr = (x1, y1, x2, y2) => `<path class="arrow" d="M${x1} ${y1} L${x2} ${y2}"/>`;
    const alpha = (x, y, nt, cls = 'a') => `<circle cx="${x}" cy="${y}" r="9" fill="var(--fig${cls === 'a' ? 'A' : 'B'})" fill-opacity="0.25" stroke="var(--fig${cls === 'a' ? 'A' : 'B'})" stroke-width="1.3"/>` + xs(x, y + 3, 'αs', 'middle') + xs(x, y + 17, nt, 'middle');
    const bg = (x, y) => `<circle cx="${x}" cy="${y}" r="6" class="box"/><circle cx="${x + 7}" cy="${y + 11}" r="5" class="box"/>` + xs(x, y + 3, 'β', 'middle') + xs(x + 7, y + 14, 'γ', 'middle');
    const base = `<rect x="6" y="46" width="348" height="14" fill="var(--chip)" opacity="0.7"/>` + xs(6, 40, 'outside') + xs(354, 74, 'inside the cell', 'end') + box(152, 40, 44, 26, 'AC');
    const rec = (active, lig) => `<rect x="43" y="26" width="20" height="28" rx="5" ${active ? 'fill="var(--figA)" fill-opacity="0.28" stroke="var(--figA)"' : 'fill="var(--chip)" stroke="var(--muted)"'} stroke-width="1.3"/><path class="pocket" d="M48 26 a5 5 0 0 0 10 0 Z"/>` + (lig ? `<circle class="lig a" cx="53" cy="27" r="4.6"/>` : '') + xs(68, 30, lig ? 'NE on β1' : 'β1 empty', 'start');
    const role = (t) => `<text class="cl a" x="354" y="30" text-anchor="end">${t}</text>`;
    // the trimer sits directly under the receptor: αs touches the receptor, β/γ hang on αs
    const trimer = (nt) => alpha(53, 70, nt) + bg(70, 64);
    const freeBG = bg(70, 64);
    const camp = xs(174, 92, 'ATP → cAMP', 'middle');
    const steps = [
      ['NE (the signal) binds the β1 receptor. Under the receptor sits the G protein: αs holding GDP, with β and γ attached.', rec(false, true) + trimer('GDP') + role('signal → receptor')],
      ['The receptor changes shape; that lets the diphosphate (GDP) fall OFF the α subunit.', rec(true, true) + trimer('') + `<text class="cl b" x="53" y="102" text-anchor="middle">GDP ↓ leaves</text>` + role('receptor activated')],
      ['A fresh triphosphate (GTP) from the cell binds in the empty spot: an EXCHANGE, not a phosphate added to GDP.', rec(true, true) + trimer('GTP') + `<text class="cl c" x="53" y="102" text-anchor="middle">GTP ↑ binds</text>` + role('GDP → GTP exchange')],
      ['With GTP on board, αs lets go of the receptor and of β/γ and moves off (the transducer carries the message).', rec(true, true) + freeBG + alpha(104, 90, 'GTP') + arr(64, 76, 92, 86) + role('transducer: Gs')],
      ['αs reaches adenylate cyclase (AC) in the membrane and turns it on: AC is the effector.', rec(true, true) + freeBG + alpha(134, 78, 'GTP') + arr(144, 70, 158, 64) + `<rect x="152" y="40" width="44" height="26" rx="4" fill="var(--figA)" fill-opacity="0.2" stroke="var(--figA)"/>` + role('effector: AC')],
      ['AC makes cAMP from ATP: the second messenger; one AC makes many cAMP (amplification).', rec(true, true) + freeBG + alpha(134, 78, 'GTP') + arr(174, 66, 174, 80) + camp + [216, 228, 240, 252].map((x, i) => `<circle cx="${x}" cy="${86 + (i % 2) * 8}" r="3" fill="var(--figC)"/>`).join('') + xs(260, 92, 'cAMP ×n (amplified)') + role('second messenger: cAMP')],
      ['cAMP activates protein kinase A (PKA).', rec(true, true) + freeBG + alpha(134, 78, 'GTP') + camp + arr(174, 96, 174, 108) + box(156, 110, 36, 16, 'PKA') + role('cell signalling')],
      ['Ca++ enters: faster, stronger heartbeat (the physiological response).', rec(true, true) + freeBG + alpha(134, 78, 'GTP') + camp + box(156, 110, 36, 16, 'PKA') + arr(192, 118, 220, 118) + xs(224, 121, 'Ca++ in → ↑ heart rate') + role('response')],
      ['BACK 1: phosphodiesterase (PDE) breaks down cAMP.', rec(true, true) + freeBG + alpha(134, 78, 'GTP') + xs(174, 92, 'cAMP', 'middle') + arr(174, 96, 174, 108) + `<text class="cl b" x="174" y="120" text-anchor="middle">PDE</text>` + xs(174, 132, 'cAMP broken down', 'middle') + role('reset the second messenger'), 'reverse'],
      ['BACK 2: one phosphate is CUT OFF the GTP (hydrolysis by GTPase; RGS speeds it): GTP becomes GDP.', rec(true, true) + freeBG + alpha(134, 78, 'GTP → GDP', 'b') + `<text class="cl b" x="134" y="112" text-anchor="middle">GTPase · RGS: − one phosphate</text>` + role('reset the transducer'), 'reverse'],
      ['BACK 2 continued: αs, now holding GDP, returns and rejoins β/γ under the receptor.', rec(true, true) + trimer('GDP') + arr(124, 96, 66, 84) + role('trimer reformed'), 'reverse'],
      ['BACK 3: NE comes off; the receptor is reset and can start again.', rec(false, false) + trimer('GDP') + role('reset the receptor'), 'reverse']
    ].map(st => [st[0], base + st[1], st[2]]);
    return stepper('gpcr', 'The Gs cascade step by step: NE at β1, forward and back', steps, 186,
      ['<b>Forward</b><ol><li>NE binds β1; the G protein (αs with GDP, plus β/γ) sits directly under the receptor.</li><li>The receptor changes shape; GDP falls off the α subunit.</li><li>A new GTP binds in its place (an exchange: GDP out, GTP in).</li><li>αs, now carrying GTP, lets go of the receptor and of β/γ.</li><li>αs turns on adenylate cyclase.</li><li>AC makes cAMP from ATP (one AC makes many cAMP).</li><li>cAMP activates PKA.</li><li>Ca++ enters: faster, stronger heartbeat.</li></ol>',
       '<b>Back</b> (the order he gave in the 9/30 review)<ol><li>PDE breaks down cAMP.</li><li>One phosphate is cut off GTP (GTPase, sped up by RGS): GTP becomes GDP, and αs returns to β/γ under the receptor.</li><li>NE comes off; the receptor resets.</li></ol>',
       '<b>GDP and GTP:</b> going forward the whole GDP leaves and a separate GTP binds (an exchange); going back one phosphate is cut off the bound GTP, which turns it into GDP (hydrolysis).',
       '<b>Roles he asks</b><ul><li>signal = NE</li><li>receptor = β1</li><li>transducer = Gs (αs, β, γ)</li><li>effector = AC (PLC for Gq)</li><li>second messengers = cAMP, IP3, Ca++, PKA</li></ul>'],
      'Forward 1–8, back 9–12. Signal → receptor → transducer → effector → second messenger → response.');
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
  api.keys = () => Object.keys(F);
  return api;
})();
