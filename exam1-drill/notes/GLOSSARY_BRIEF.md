# Glossary brief — terminology for the Terms section

Build `/home/user/Intro-Pharmacology-/exam1-drill/src/glossary.js`: the course's Exam 1 vocabulary with a short definition each, sourced to the lecture decks and transcripts (primary) with the Katzung reading as a fallback. The engine renders it as a glossary page with figures, a flashcard drill, and generates definition questions from it.

## Sources
- Lecture notes with slide maps, polls and quotes: `/home/user/Intro-Pharmacology-/exam1-drill/notes/L01.md`, `L02.md`, `L03.md`, and `STYLE.md` (the professor's polls verbatim).
- The verified question bank, whose `teach`, `quote` and `cite` fields already carry sourced definitions: `src/q_L01.js`, `q_L02.js`, `q_L03.js` (load them to read; do not edit them).
- Deck text and transcripts on Google Drive if a term needs checking (read with mcp__Google_Drive__read_file_content; load via ToolSearch "select:mcp__Google_Drive__read_file_content"): Day 1 deck 1ZUq-XlzGCPE5S38kiTu6AS5ajO-cizKO / transcript 1w7jIllvAmTAPp7lZTbSyWTQ-WOULOqJj; Day 2 deck 1GYHkv_r9EXYOU78-aBrwWRElcxZXl1gK / transcript 1k_ncKVlf9DeXGeLeCs3D8mdDgr8rtawW; Day 3 deck 1RNOXMuSLw0DgZHQ2wml5GJT9zFYxpoVV / transcript 1ODwE2pYvFwi-V6YDudv8wnd3ZrBcIxbK.
- Katzung 16e Ch. 2 plain text: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/ch2.clean.txt` (only for a term the lectures use but never define).

## Format (plain JS, `node --check` clean, no backticks, no `${`)
```js
const TERMS = [
 {id:'affinity', term:'Affinity', lecture:'L01', group:'Drug–receptor binding',
  def:'One or two sentences, the professor's own definition where he gave one.',
  hook:'optional one short line: the separating feature vs the term it is confused with (e.g. "Affinity is read on the x-axis; efficacy on the y-axis.")',
  confuse:['efficacy','potency'],           // ids of terms it is confused with; used as distractors
  fig:'binding-kd',                          // optional figure key from the list below
  quote:'verbatim slide text or transcript line',
  cite:'Pharmacodynamics-Day-1-2026s.pdf slide ~21; transcript 9/22',
  src:'both'},
 ...
];
```
- `group` is one of: 'Drug–receptor binding', 'Drug classes', 'Dose–response curves', 'Receptors and signaling', 'Drug basics'.
- 35–50 terms. Include at least: pharmacology, pharmacodynamics, pharmacokinetics, drug, receptor, ligand, affinity, efficacy, intrinsic activity, potency (pharmacological vs apparent as two terms if the lecture separates them), Kd, EC50/ED50, Emax, dose–response curve, graded response, threshold, slope, full agonist, partial agonist, inverse agonist, antagonist, competitive (reversible) antagonist, irreversible (non-competitive) antagonist, orthosteric site, allosteric site/modulator, selectivity, receptor occupancy theory, two-state model, spare receptors (only if a lecture covers it), signal transduction, transducer, effector, second messenger, G protein (Gs, Gi, Gq as one term or three), ion channel (ligand-gated), receptor tyrosine kinase, nuclear receptor, mechanism of action (MOA), site of action (SOA), natural dietary supplement — only terms the lectures actually use.
- Every `def` must be traceable to the cited source; where the professor's wording and the slide differ, use the slide and put his wording in `hook` or `quote`. No outside knowledge.
- `confuse` should name 1–3 real look-alikes from the same list.
- Figure keys available (the engine draws them; attach one only where it helps define the term): `drc-basic` (dose–response curve with EC50 and Emax marked), `potency` (two curves, same Emax, different EC50), `efficacy` (two curves, different Emax), `partial` (full vs partial agonist), `inverse` (agonist above baseline, inverse agonist below, antagonist flat), `competitive` (parallel rightward shift, same Emax), `irreversible` (reduced Emax), `binding-kd` (binding curve, Kd at 50% occupancy), `sites` (receptor with orthosteric and allosteric sites), `two-state` (R ⇌ R* equilibrium), `gpcr` (receptor → G protein → effector → second messenger), `spare` (response maximal before full occupancy).

Also write `/home/user/Intro-Pharmacology-/exam1-drill/notes/GLOSSARY.md`: the term list with source quotes, and any term where sources disagree. Check with `node --check glossary.js`. Report the count per group and any term you left out for lack of a source. Do not commit.
