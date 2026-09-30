# Guide brief — concept guides with visuals (the "Guides" tab)

Write `/home/user/Intro-Pharmacology-/exam1-drill/src/guide.js`:
```js
const GUIDE_HTML = `
<h2>Guides</h2>
<p class="sub">One guide per exam concept: what to know, how he tests it, and the figure that shows it.</p>
<nav class="guidenav">…anchor links…</nav>
<section id="g-xxx"> … </section>
`;
```
HTML inside a template string: no backticks, no `${`. Figures are placed with a marker the engine replaces: `<!--FIG:key-->` for a drawn figure (keys: drc-basic, potency, efficacy, partial, inverse, competitive, irreversible, binding-kd, spare, sites, two-state, gpcr, classes) and `<!--IMG:key-->` for one of his poll figures (pollev-five-drc, pollev-abcde-similar, pollev-figure1, pollev-dotted-x, pollev-kd-table, pollev-two-hearts, pollev-gs-cascade). A drawn graph with custom curves: `<!--GRAPH:{"curves":[{"label":"A","ec":-1,"emax":100},{"label":"B","ec":0,"emax":100,"dashed":true}],"base":0,"caption":"..."}-->` (valid JSON, `ec` = log10 EC50 on −3…3, `emax`/`base` in percent).

## What a guide is
The learner asked for "a good guide and distinction of these concepts with good visuals" and "what I need to know on those concepts" from the lecture transcripts. Each guide is bullets, not paragraphs, and every bullet is sourced (deck text or transcript; cite in a trailing `<small>` as `Day N slide ~X` or `(T) 9/2X`). Structure per guide:
1. **What it is** — the slide definition in one or two bullets, and his spoken definition marked (T) when it adds something.
2. **How to read it on a curve / figure** — the figure, then bullets that say exactly what to look at (x-axis vs y-axis, plateau, baseline, shift direction).
3. **Distinctions** — a small table "X vs Y: what separates them" for every pair he confuses students with (drawn from notes/L0X.md tell-apart rows).
4. **How he asks it** — his own poll stems verbatim (from exam1-drill/STYLE.md and the PollEV pages), each with the keyed answer and one line on why.
5. **Traps** — the wrong answers students picked in his polls and the slip-ups he warned about (T).

## Guides to write (Exam 1, Days 1–4; Day 5 is added later)
1. Affinity, efficacy, potency (and Kd, EC50/ED50, Emax; x-axis vs y-axis; the potency triad affinity/efficacy/# of receptors; pharmacological vs apparent potency).
2. Agonist classes: full, partial, inverse agonist, neutral antagonist — the two-state model, baseline/constitutive activity, intrinsic activity.
3. Antagonists: reversible (competitive, surmountable) vs irreversible (covalent, insurmountable) vs chemical vs physiological vs indirect; what each does to the agonist's curve (shift, Emax).
4. Orthosteric vs allosteric: allosteric agonist/antagonist (PAM/NAM), the four characteristics (affinity yes, efficacy no, symmetrical no, saturable yes), diazepam.
5. Drug–drug on one receptor: full+full, full+partial, agonist+inverse agonist, agonist+competitive, agonist+irreversible, agonist+allosteric — one figure per case and the rule for each; this is the exam's core.
6. Receptors and signalling: receptor classes (ion channel, GPCR, RTK, nuclear), G proteins Gs/Gi/Gq, transducer/effector/second messenger, the NE→β1→Gs→AC→cAMP→PKA→Ca++ sequence and what ends it.
7. Drug basics he tests: MOA vs SOA, what must be known; natural dietary supplements; safety vs efficacy (his answer: efficacy; equal efficacy → safer drug).
8. The Exam 1 drug list: a table of the 15 drugs by class and receptor, plus which one he uses for each curve question (NE at β1 reference, epinephrine, albuterol, metoprolol, phenoxybenzamine, loratadine, diazepam, prazosin, phenylephrine, varenicline).

## Sources
- notes/L01.md … L04.md (slide maps, polls, cues, tell-apart rows, reference tables, conflicts), exam1-drill/STYLE.md (all polls verbatim), the PollEV pages (`/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/pollev-1.png … pollev-3.png`, read as images), transcripts in the scratchpad (t01f.txt 9/22, tf.txt 9/23, trf.txt 9/24, t4.txt 9/28), and the verified question bank (src/q_L0X.js, q_POLLS.js) whose teach/why/quote fields are sourced.
- Where sources disagree, state both in one plain sentence and which to use on the exam (see the `note` fields in the bank).
- Literal language; no study advice; no sentence about the guide itself. Expand each abbreviation once per guide.

Check with `cd /home/user/Intro-Pharmacology-/exam1-drill/src && node --check guide.js && python3 build.py` (other files may be mid-edit by other agents; a failure outside guide.js is not yours). Report: guides written, figures used, any claim you could not source and left out. Do not commit; touch no other file.
