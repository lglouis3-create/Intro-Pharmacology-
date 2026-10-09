/* Graph registry: one entry per figure of his the student can pick in the Graphs view.
   key/alts are keys in images.json; every question with an img: field maps to exactly one entry.
   read: the figure read in his method (shift from the point of reference? baseline? Emax? symmetry?
   helping or making life more difficult?); method: the order of questions to ask; asks: the forms he used. */
const GRAPHS = [
{key:'pollev-five-drc', alts:['pollev-five-drc-bact', 'pollev-five-drc-least', 'pollev-five-drc-correct'],
 title:'Five dose–response curves A–E with the dotted line Y (PollEV 9/24 and 9/29)', group:'Potency and efficacy', source:'PollEV_s.pdf pages 2 and 4',
 read:[
  'Affinity and potency are read left to right: A is the farthest left (smallest ED50, highest affinity, most potent); E is the farthest right (least potent, lowest affinity).',
  'Efficacy is read up and down: B is the only curve that reaches the top, so B is the only full agonist; A, C and E plateau at the same middle height; D plateaus lowest.',
  'Lowest efficacy is D; least potent is E. Least potent is not least effective.',
  'The dotted line Y is only a level at which to compare doses; crossing it says nothing about efficacy.',
  'The trap: A is the most potent but not the most efficacious; B is more efficacious than A but less potent; A is more potent than C due to its affinity (equal efficacy).'],
 method:'Find the ED50 of each curve on the x-axis for potency and affinity, then read the plateau on the y-axis for efficacy, and answer potency and efficacy as two separate questions.',
 asks:['Which drug has the highest affinity / the highest potency / the lowest affinity?', 'Which drug has the highest or lowest efficacy, which is the full agonist, which are partial agonists (select all)?', 'Which statement is CORRECT / INCORRECT? (Drug A is more potent than Drug C due to its affinity)', 'Which drug is most likely to kill 100% of a bacterial colony?']},

{key:'pollev-four-drc-potency', alts:[],
 title:'Four coloured curves A–D: potency against efficacy (PollEV 9/29)', group:'Potency and efficacy', source:'PollEV_s.pdf page 4',
 read:[
  'A (black) is the farthest left: the smallest ED50, the most potent.',
  'C (blue) rises highest but sits the farthest right: the most efficacious and the least potent.',
  'D (green) plateaus lowest: the least efficacious, though it is more potent than B and C.',
  'B (red) sits between: less potent than A and D, less efficacious than A and C.',
  'The stem said five drugs; the figure shows four. Read what is drawn.'],
 method:'Potency is all about the ED50: find it on the x-axis for each curve; then judge efficacy separately from the height of the plateau.',
 asks:['Which drug has the highest potency / the lowest potency?', 'Which drug is the most efficacious / the least efficacious?', 'Which statement is CORRECT?']},

{key:'pollev-abcde-similar', alts:['pollev-abcde-ne-epi', 'pollev-abcde-allo-ag', 'pollev-abcde-allo-ant', 'pollev-abcde-duloxetine'],
 title:'Five curves A–E, response percent of control: B (or D, or E) is the agonist alone', group:'Shifts: which curve is which drug', source:'PollEV_s.pdf pages 2, 3 and 5; Pharmacodynamics reviews.pdf page 3',
 read:[
  'Order left to right A, B, C, D, E. A, B and D reach 100%; C and E plateau at about 75%.',
  'From B: A is the only curve to the left (helping: a full agonist, an allosteric agonist on affinity, duloxetine); C, D and E are to the right (making life more difficult).',
  'From B: D keeps the Emax (competitive antagonist; also an inverse agonist, with the baseline at 0); C and E lose the Emax (irreversible antagonist, or an allosteric antagonist on affinity and efficacy).',
  'From D: A and B are left at full height (a second full agonist); E is right and lower (irreversible, or allosteric antagonist on affinity and efficacy); no curve is right of D at 100%.',
  'From E, a partial agonist: C is left at the same plateau (allosteric agonist on affinity only); A, B and D are left and full (allosteric agonist on affinity and efficacy).',
  'The trap: C is left of D but lower; no drug in the world raises affinity and lowers efficacy.'],
 method:'Find the point of reference, ask whether the second drug is helping (left) or making life more difficult (right), then shift? baseline? Emax? and eliminate.',
 asks:['DRC B is NE alone: which DRC is NE in the presence of epinephrine / metoprolol / phenoxybenzamine / duloxetine / an allosteric agonist that affects only affinity?', 'DRC D is the agonist alone: which curve is D with an allosteric antagonist that affects affinity and efficacy?', 'Which DRCs could represent the agonist with an irreversible antagonist? Select all that apply.', 'Which drug has the highest potency / the lowest efficacy / the highest affinity?']},

{key:'pollev-figure1', alts:[],
 title:'Figure 1: five drugs given alone from a 50% baseline (R = R*)', group:'Shifts: which curve is which drug', source:'PollEV_s.pdf page 3; Pharmacodynamics reviews.pdf page 4',
 read:[
  'The baseline is 50%: half the receptors are active on their own, so a drug can move the response up or down.',
  'A goes up to 100%: a full agonist (NE, epinephrine, histamine, phenylephrine). B goes up and stops at about 80%: a partial agonist (albuterol, aripiprazole).',
  'C stays flat at 50%: no change to the balance of active and inactive receptors, so on this figure alone it is the competitive antagonist (metoprolol, prazosin, diphenhydramine).',
  'D goes down to about 25%: a partial agonist with 25% efficacy, behaving as an antagonist against the system. E goes down to 0: the inverse agonist (loratadine).',
  'The trap: E is not an irreversible antagonist, antagonists never change the baseline; and C could be a partial agonist with 50% efficacy, which only a second figure in an inactive system can show.'],
 method:'Read the starting point first, then for each curve ask: up (agonist), flat (antagonist) or down (inverse agonist, or a partial agonist below the baseline), and how far it goes.',
 asks:['Which of these DRC would best represent the DRC of an antagonist?', 'Drug A / B / C / E is most likely: (drug-list names)', 'Which of these drugs are partial agonists? Select all that apply.', 'Which statement is CORRECT about Figure 1?']},

{key:'pollev-dotted-x', alts:['pollev-dotted-ne'],
 title:'Dotted line: agonist alone; solid lines: agonist with increasing doses of drug X, to the right, same top (PollEV 9/28)', group:'Dotted-line figures', source:'PollEV_s.pdf page 3',
 read:[
  'The dashed curve is the point of reference; the three solid curves move to the right: X is making life more difficult.',
  'Baseline: every curve starts at 0, so the baseline cannot separate a competitive antagonist from an inverse agonist here.',
  'Emax: every curve reaches 100%, so irreversible antagonists and allosteric antagonists on efficacy are out.',
  'The three shifts are symmetrical, so it is not allosteric. One best answer: competitive antagonist; with norepinephrine, metoprolol.',
  'The trap: a partial agonist would change the baseline, and a full agonist would move the curve to the left.'],
 method:'Point of reference, helping or making life more difficult, then shift, baseline, Emax, symmetry; eliminate the helpers first, then whoever changes the baseline, then whoever lowers the Emax.',
 asks:['Drug X is most likely: (class names)', 'The dotted line is norepinephrine alone. Drug X is most likely: (drug-list names)', 'Which features identify X as a competitive antagonist? Select all that apply.', 'If X were phenoxybenzamine instead, which statement is CORRECT?']},

{key:'pollev-dotted-inverse', alts:[],
 title:'Dotted agonist from a baseline near 40%; solid curves shift right and their baselines fall to 0 (PollEV 9/29)', group:'Dotted-line figures', source:'PollEV_s.pdf page 5',
 read:[
  'The agonist alone starts near 40% (some receptors active on their own) and reaches its top near 90% of control; nothing about the agonist\'s own class is asked.',
  'Each dose of X shifts the agonist to the right: X competes with it.',
  'The Emax does not change: X is reversible.',
  'The baselines fall with each dose, down to 0: X has negative efficacy, an inverse agonist, loratadine.',
  'The trap: metoprolol also shifts the agonist right with the same Emax; the falling baseline is what rules it out.'],
 method:'Shift? to the right. Emax? unchanged. Baseline? falling to 0; the only class that lowers the baseline is the inverse agonist; then match the drug list.',
 asks:['Drug X is most likely: Metoprolol / Epinephrine / Tropicamide / Loratadine / Histamine', 'How would you classify drug X?', 'Which feature of the figure rules out metoprolol as drug X?', 'Based on the dotted line alone, how would you classify the agonist?']},

{key:'pollev-kd-table', alts:['pollev-kd-table-b1'],
 title:'Kd table: Drug A and Drug B at β1, β2 and M1 (PollEV 9/24)', group:'Affinity and Kd', source:'PollEV_s.pdf pages 1–2',
 read:[
  'The smaller the Kd, the greater the affinity; read the units before the numbers: milli 10^-3, micro 10^-6, nano 10^-9.',
  'β1: Drug A 30 µM against Drug B 100 nM, B binds better. β2: A 1 mM against B 20 µM, B binds better. M1: both 250 nM, equal.',
  'Down the Drug B column, 100 nM at β1 is its smallest Kd (greatest affinity); down the Drug A column, 250 nM at M1 is its smallest.',
  'The β1 poll had its own options (A 1 mM, B 20 µM, C 100 nM, D 1000 M): C, 100 nM = 1 × 10^-7 M, is the smallest; the smallest Kd is also the most likely irreversible antagonist.',
  'The trap: comparing 1 with 20 or 30 with 100 without the units; about 10% miss it every year.'],
 method:'Convert every Kd to the same unit, then pick the smallest for the greatest affinity (and for the most likely irreversible drug).',
 asks:['Which of the two drugs is more likely to successfully interact with β2 / β1 receptors?', 'Which of these drugs has the greatest affinity for the β1 receptor? (four Kd values as options)', 'Which of these drugs is most likely an irreversible antagonist?', 'For which receptor does Drug A / Drug B have the greatest affinity?']},

{key:'pollev-two-hearts', alts:[],
 title:'Two dishes: 10 receptors against 100 receptors, same 1000 nM dose (PollEV 9/24)', group:'Potency and efficacy', source:'PollEV_s.pdf page 2',
 read:[
  'Same drug, same dose: the only difference is the number of receptors, 10 against 100.',
  'By the law of mass action, more receptors mean a greater chance of binding, so less NE is needed for the same effect: the potency goes up and the curve shifts to the left.',
  'Kd, affinity and efficacy belong to the drug and do not change; the tissue changed.',
  'Fewer receptors (down-regulation) do the opposite: potency goes down, the curve shifts to the right.'],
 method:'Ask what changed, the drug or the tissue; if only the receptor number changed, potency changes (more receptors, more potent) and affinity and efficacy do not.',
 asks:['What would happen to the potency of NE if one increased the number of receptors? increase / decrease / no change', 'Compared with the 10-receptor heart, the curve in the 100-receptor heart would be: shifted left / right / unchanged', 'Which of these stay the same between the two hearts? Select all that apply.']},

{key:'pollev-gs-cascade', alts:[],
 title:'NE at the β1 receptor: Gs, AC, cAMP, PKA, Ca++ (PollEV 9/23)', group:'Signal transduction', source:'PollEV_s.pdf page 1',
 read:[
  'Signal: NE. Receptor: β1. Transducer: Gs (the α subunit). Effector: AC. Second messenger: cAMP, then PKA and Ca++.',
  'Forward order: binding of drug and receptor, αs dissociates (GDP off, GTP on), AC activation, cAMP rises, PKA, Ca++, increased contractile force.',
  'Reverse: RGS-mediated hydrolysis chops the extra phosphate off GTP (GTP to GDP) and α, β and γ come back together; PDE breaks down cAMP.',
  'The trap: cAMP is the second messenger, not the effector; AC and PLC are effectors; the G protein is defined by its α subunit.'],
 method:'Name each part (signal, receptor, transducer, effector, second messenger), then put the steps in order forward and backward.',
 asks:['Rank the sequence of events from 1st to last.', 'Which component is the second messenger / the transducer / the effector?', 'Which event reverses the signal?']},

{key:'pollev-quantal-ti', alts:['pollev-quantal-safe'],
 title:'Quantal curves: hypnosis and death, ED50 100 and LD50 400 µg/kg (PollEV 9/29)', group:'Quantal and therapeutic index', source:'PollEV_s.pdf page 5',
 read:[
  'The y-axis is the percentage of individuals responding, not the size of a response; the left curve is the desired effect (hypnosis), the right curve is death.',
  'Draw a line at 50%: the hypnosis curve crosses at 100 µg/kg (ED50), the death curve at 400 µg/kg (LD50).',
  'TI = LD50 / ED50 = 400 / 100 = 4; the larger the TI, the safer the drug. Inverting the numbers gives .25, which is wrong.',
  'Safety looks at the tails: the LD1 (about 200) sits at the ED99 (200), so people are dying before everyone is treated: not a safe drug.',
  'On the exam the points will not be labelled; find them on the curves and divide whole numbers.'],
 method:'Find the ED50 and the LD50 at the 50% line, divide lethal by effective, then look at whether the tails (ED99 and LD1) overlap.',
 asks:['What is the TI of this drug? .25 / 1 / 4 / 100 / 400', 'Is this drug safe? Yes / No', 'From the curves, what are the ED50 and the LD50?', 'Five drugs with their TI values: which is the safest, which is the most toxic?']},

{key:'jeop-a-plus-b', alts:[],
 title:'Jeopardy: dashed A alone; A + [B], 10x, 100x and 1000x shift right in equal steps', group:'Dotted-line figures', source:'Jeopardy 9/30 (IMG_3014)',
 read:[
  'The dashed red curve A is the point of reference; four solid curves move to the right with each tenfold dose of B: making life more difficult.',
  'The baseline stays at 0 and the top stays the same across four doses: no change in efficacy, nothing removed.',
  'The steps are equal: ten times the antagonist needs ten times the agonist, the law of mass action for a competitive antagonist.',
  'Four shifts with no drop in the Emax rule out an irreversible antagonist; equal steps rule out allosteric.',
  'With A as norepinephrine at β1, B is metoprolol; if B were phenoxybenzamine the top would fall with each dose.'],
 method:'Reference, direction, then baseline, Emax and symmetry across all four shifts before naming the class.',
 asks:['B is: Competitive antagonist / Irreversible antagonist / Full agonist / Allosteric agonist / Partial agonist', 'A is norepinephrine: B is most likely (drug-list names)', 'Which feature of the figure rules out phenoxybenzamine as B?', 'Which statement is CORRECT about B?']},

{key:'jeop-abcde-effect', alts:[],
 title:'Jeopardy: five curves A–E, Effect against Log [Agonist]; B and E reach 100%', group:'Potency and efficacy', source:'Jeopardy 9/30 (IMG_3015, IMG_9316, IMG_9320)',
 read:[
  'Order left to right A, B, C, D, E: A has the smallest ED50 (most potent, highest affinity); E the largest (least potent, lowest affinity).',
  'B and E reach 100% (the full agonists); C plateaus at about 85%, D at about 70%, A at about 65% (the lowest efficacy).',
  'A is the most potent even though it is the least efficacious; potency and efficacy are two separate readings.',
  'With B as NE alone: D is right and lower, so the drug added is an irreversible antagonist (phenoxybenzamine); E also fits an irreversible antagonist with fewer spare receptors.',
  'From B, E is right at the same top: a competitive antagonist (metoprolol); D is right and lower: the irreversible antagonist (phenoxybenzamine).'],
 method:'Left to right for affinity and potency, up and down for efficacy; then take B as the reference and ask helping or hurting, shift, baseline, Emax.',
 asks:['Which drug has the lowest affinity? / Which drug is the most potent?', 'If DRC B is NE alone and DRC D is NE with phenoxybenzamine, drug X is most likely: (class names)', 'Which drugs are full agonists? Select all that apply.', 'Which drug is the least efficacious?']},

{key:'p3-therapeutic-efficacy', alts:[],
 title:'Therapeutic efficacy: morphine, meperidine, ibuprofen (Part 3)', group:'Potency and efficacy', source:'Pharmacodynamics-Day_4_&_5_2026s_Part 3.pdf page 2',
 read:[
  'Up and down is therapeutic efficacy: morphine and meperidine reach the same high plateau; ibuprofen plateaus much lower.',
  'Left and right is potency: morphine is left of meperidine, so morphine is more potent with the same efficacy; ibuprofen is the farthest right and the least potent.',
  'Equal efficacy, different potency: morphine against meperidine. Lower efficacy: ibuprofen, enough for a small hurt, not for a broken leg.',
  'The trap: the farthest-left curve is the most potent, not necessarily the most efficacious; here morphine happens to be both.'],
 method:'Read the plateau for efficacy first, then the left–right position for potency, and keep the two answers separate.',
 asks:['Which drug has the lowest / the highest therapeutic efficacy?', 'Which drugs have the same therapeutic efficacy? Select all that apply.', 'Which of these three analgesics is the most potent?']},

{key:'rev-rt-figure', alts:[],
 title:'Review page 5: drug A alone (Rt = 1) and A with increasing drug C (x10^-1, x10^-2, x10^-3)', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 5',
 read:[
  'The leftmost curve, Rt = 1, is drug A alone and reaches 1.0; the curves to its right are A with more and more C.',
  'Shift? Yes, to the right: higher and higher doses are needed, lower potency, higher ED50; full agonists and allosteric agonists on efficacy are out.',
  'Baseline? No change, and it is at 0, so it cannot help.',
  'Emax? Yes, it falls with each dose: inverse agonists and reversible antagonists are competitive and never affect the Emax, so C is an irreversible antagonist (phenoxybenzamine).',
  'The dashed line through the half-maximal points bends down toward KA: the receptors are being removed, not outcompeted.'],
 method:'Shift, baseline, Emax in that order: a falling Emax across several doses is the irreversible antagonist (an allosteric antagonist on efficacy would give unequal shifts).',
 asks:['The curve on the left is drug A alone; the curves on the right are A with increasing concentrations of C. C is:', 'Which of the three questions identifies C?', 'Which classes can be ruled out? Select all that apply.', 'A is norepinephrine: C is most likely (drug-list names)']},

{key:'rev-shifts-base0', alts:[],
 title:'Review page 6: A dashed from 0; A + B, A + 10X B, A + 100X B in equal steps, same top', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 6',
 read:[
  'Shift? Yes, to the right: the two agonists (full, allosteric) are out.',
  'Baseline? No change, but it is 0, so it cannot separate the inverse agonist (wants to keep it at 0) from the competitive antagonist (does not care).',
  'Emax? No change across three doses: the irreversible antagonist and the allosteric antagonist on efficacy are out.',
  'Symmetrical? Yes, equal steps: not allosteric. Best answer: competitive antagonist (metoprolol with norepinephrine).',
  'The trap: on a baseline-0 figure the inverse agonist cannot be ruled out by the figure; he keys competitive as the one best answer.'],
 method:'Shift, baseline, Emax, then symmetry; when the baseline is 0 the inverse agonist and the competitive antagonist look the same, and competitive is the best single answer.',
 asks:['Drug B is most likely: (class names)', 'A is norepinephrine: B is most likely (drug-list names)', 'Why can the baseline question not separate a competitive antagonist from an inverse agonist here?', 'Which statement is CORRECT about B?']},

{key:'rev-shifts-base50', alts:[],
 title:'Review page 7: A dashed from a 50% baseline; A + B curves shift right and start lower and lower, down to 0', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 7',
 read:[
  'The dashed curve starts at about 0.5: half the receptors are active on their own.',
  'Shift? Yes, to the right: B competes with A.',
  'Emax? No change: B is reversible, so the irreversible antagonist and anything on efficacy is out.',
  'Baseline? Yes, it falls with each dose of B, down to 0: B is shutting off receptors that were active on their own, an inverse agonist (loratadine).',
  'The trap: a competitive antagonist (metoprolol) gives the same right shifts but leaves the baseline at 50%.'],
 method:'Shift, Emax, baseline: a baseline that falls to 0 while the Emax holds is the inverse agonist.',
 asks:['Drug B is most likely: (class names)', 'Drug B is most likely: (drug-list names)', 'Which feature of the figure rules out a competitive antagonist?', 'What does the 50% starting point tell you?']},

{key:'rev-dotted-left', alts:[],
 title:'Review page 8: solid agonist alone; dashed X+Y to the LEFT, same top', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 8',
 read:[
  'The solid curve is the agonist alone; the dashed curve X+Y has moved to the left: the second drug is helping.',
  'A left shift rules out every drug that makes life more difficult: competitive, inverse, irreversible, allosteric antagonist.',
  'Baseline unchanged (0); Emax unchanged (already at the top), so efficacy cannot be judged here.',
  'Two answers stay open: a full agonist (epinephrine with norepinephrine) or an allosteric agonist that affects affinity (diazepam with GABA); an indirect drug that raises the signal (duloxetine with NE) also moves it left.',
  'The trap: with the curve already at 100% you cannot tell whether efficacy was also affected.'],
 method:'Direction first: left means helping, which clears half the list; then baseline and Emax decide between the helpers.',
 asks:['Drug X is most likely: (class names; two right answers on a select-all)', 'The agonist is norepinephrine / GABA: drug X is most likely (drug-list names)', 'Which classes can be ruled out? Select all that apply.']},

{key:'rev-dotted-right', alts:[],
 title:'Review page 9: dashed agonist alone; ONE solid curve to the RIGHT, same top', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 9',
 read:[
  'One shift to the right: the drug is making life more difficult; full, partial and allosteric agonists are out.',
  'The baseline is already 0, so it cannot tell a competitive antagonist from an inverse agonist.',
  'The Emax has not changed, but with only one shift an irreversible antagonist in a tissue with spare receptors is still possible, and an allosteric antagonist on affinity cannot be tested for symmetry.',
  'One best answer: competitive antagonist; as a select-all, competitive, inverse, irreversible (with spare receptors) and allosteric antagonist on affinity all stay open.',
  'The trap: one shift is not enough information; more shifts are needed to prove or disprove irreversible and allosteric.'],
 method:'Shift, baseline, Emax, then ask whether one shift is enough; it is not, so choose competitive for one best answer and open the list for a select-all.',
 asks:['Drug X is most likely: (one best answer)', 'Which could drug X be? Select all that apply.', 'Which of these can be ruled OUT as drug X?', 'Why can an irreversible antagonist not be ruled out?']},

{key:'rev-allo-ant', alts:[],
 title:'Review page 10: dashed agonist alone; three solid curves to the right with UNEQUAL spacing, same top', group:'Dotted-line figures', source:'Pharmacodynamics reviews.pdf page 10',
 read:[
  'Emax? No change across three doses: the irreversible antagonist and the allosteric antagonist on efficacy are out.',
  'Shift? Yes, to the right: the full agonist and the allosteric agonist are out.',
  'Baseline? No change (0).',
  'Symmetrical? No: the spacing between the solid curves is not equal, and unequal, saturating shifts mean allosteric; an antagonist (right), on affinity (top unchanged).',
  'The trap: a competitive antagonist or an inverse agonist gives symmetrical shifts; if the shifts are not symmetric you already know it is allosteric.'],
 method:'Emax, shift, baseline, then symmetry: unequal shifts say allosteric; the direction says antagonist; the unchanged top says affinity only.',
 asks:['Drug X is most likely: Competitive antagonist / Irreversible antagonist / Allosteric antagonist (affinity) / Allosteric antagonist (affinity and efficacy) / Inverse agonist', 'Which observation makes drug X allosteric?', 'Why affinity, and not affinity and efficacy?', 'What happens with more and more drug X?']},

{key:'rev-pindolol', alts:[],
 title:'Review page 11: one drug in two systems, from 100% down to about 50% and from 0 up to about 50%', group:'Other', source:'Pharmacodynamics reviews.pdf page 11',
 read:[
  'Two dashed curves of one drug: the upper starts at 100% (the system is fully active) and falls to about 50%; the lower starts at 0 and rises to about 50%.',
  'Does it have efficacy? Yes, it brings the low system up: neutral antagonists (metoprolol) are out.',
  'Did it go to 0? No: the inverse agonist (loratadine) is out.',
  'Did it reach 100%? No, it wants the system at about 50%: a partial agonist, pindolol, which brings a low heart rate up and a high heart rate down.',
  'The trap: a curve that goes down is not automatically an inverse agonist; look at where it stops.'],
 method:'Ask: does it have efficacy, did it go to 0, did it go to 100%; the answers yes, no, no are a partial agonist.',
 asks:['This drug is: Full agonist / Partial agonist / Inverse agonist / Competitive antagonist / Irreversible antagonist', 'This drug is most likely: (drug-list names)', 'Which feature rules out an inverse agonist / a neutral antagonist?', 'Why might pindolol be chosen for a hypertensive patient with a low heart rate?']},

{key:'pe2-gi-tracing', alts:[], exam:2,
 title:'GI smooth muscle tone: pilocarpine before and after drug X (PollEV, Exam 2)', group:'Other', source:'PollEV’s Exam 2.pdf (poll screenshot)',
 read:[
  'This is a tracing, not a dose–response curve: the y-axis is GI smooth muscle tone over time; the dotted lines mark the two pilocarpine doses and the arrow marks drug X.',
  'First pilocarpine: tone rises and comes back down. Pilocarpine is a muscarinic agonist; on GI M3 (Gq, ↑Ca++) it increases motility and tone.',
  'Drug X: tone falls a little below the starting line; the resting parasympathetic (PNS) tone of the gut has been blocked.',
  'Second pilocarpine: no rise at all. The receptor pilocarpine acts on is blocked, so X is a muscarinic (M3) antagonist: atropine.',
  'The trap: a drug that stops acetylcholine release (Botox) or blocks Nm (rocuronium) would not stop a direct muscarinic agonist on smooth muscle; a cholinesterase inhibitor or another agonist would raise tone.'],
 method:'Name the agonist and its receptor, read what it does before X, then ask whether X helped (bigger response) or made life more difficult (smaller or none), and pick the drug that blocks that receptor.',
 asks:['Drug X is most likely to be: Carbachol / Neostigmine / Rocuronium / Atropine / Varenicline', 'What does pilocarpine do to GI tone, and through which receptor?', 'Why does the second pilocarpine dose produce no rise?', 'Which other drug could be drug X?']},

{key:'pe2-ne-drug-b', alts:[], exam:2,
 title:'Constriction tracing: norepinephrine (drug A), then drug B (PollEV 10/7, Exam 2)', group:'Other', source:'PollEV’s Exam 2.pdf page 2 (poll screenshot)',
 read:[
  'This is a tracing over time (1-minute scale bar), not a dose–response curve; the y-axis is constriction, which he read as blood pressure.',
  'At arrow A, norepinephrine: the tracing rises. In the blood vessels norepinephrine acts on α1 (Gq, ↑Ca++), so the vessels constrict and blood pressure goes up.',
  'At arrow B, the tracing falls steeply and stays low: drug B took away norepinephrine\'s effect, so it makes life more difficult for norepinephrine.',
  'Eliminate the helpers (phenylephrine, another α1 agonist; cocaine, which blocks the NET), the drug acting elsewhere (metoprolol, β1 in the heart) and the drug whose target is quiet (atropine; vascular M3 is not innervated). Prazosin, the α1 antagonist, is left.',
  'The trap: atropine also blocks a receptor in the blood vessels, but with no muscarinic agonist on board those M3 receptors are not active.'],
 method:'List the receptors in the blood vessels (α1, β2, uninnervated M3) and the receptors norepinephrine binds (α1, α2, β1); then for each option ask whether it helps norepinephrine or makes life more difficult, and where it acts.',
 asks:['The tracing show the effects of drug A (NE) on BP. Which drug is most likely drug B? metoprolol / prazosin / atropine / phenylephrine / Cocaine', 'Through which receptor does norepinephrine raise the tracing?', 'What would the tracing show if drug B were cocaine?', 'Why can metoprolol / atropine be eliminated?']},

{key:'pe2-epi-two-receptors', alts:[], exam:2,
 title:'Blood Vessels Figure 1: epinephrine at receptors A and B, low and high concentration (PollEV 10/8, Exam 2)', group:'Other', source:'PollEV’s Exam 2.pdf page 2 (poll screenshot)',
 read:[
  'Two receptors on one vessel: A (round site) and B (V-shaped site). At low concentration epinephrine binds only B and vessel C is wide (dilated); at high concentration it binds A and B and vessel D is narrow (constricted).',
  'Epinephrine\'s order of affinity: β1 and β2 at low doses, then α1, then α2. In the blood vessels the low-dose receptor is β2 (dilation): receptor B.',
  'The receptor added at high concentration that wins is α1: receptor A. α1 overrides β2, so the net response at D is constriction (α1 effect minus β2 effect).',
  'Block β2 (propranolol) and the constriction at high dose gets greater; block α1 (prazosin) and the high dose dilates instead (epinephrine reversal).',
  'The trap: α2 is Gi and inhibitory, β1 is in the heart, and epinephrine does not bind muscarinic receptors.'],
 method:'Name the receptors in the blood vessels, recall which ones epinephrine binds at low and at high dose, then decide who runs the show at each dose.',
 asks:['The figure below represents the binding of Epi to two receptors. Receptor A is most likely? Alpha 2 / Beta 1 / Alpha 1 / Beta 2 / Muscarinic receptors', 'Receptor B is most likely?', 'Which responses do vessels C and D show?', 'What would propranolol or prazosin given first change at high concentration?']}
];
