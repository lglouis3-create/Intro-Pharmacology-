# Poll brief — frame questions the way Dr. Gottlieb frames his polls

He has said he reuses poll questions on the exam "word by word" or with "a word or two" changed, and that the exam will use "either a different figure or a different point of reference" for the same questions. So the bank must ask in his shapes. Read `exam1-drill/STYLE.md` in full first (every poll verbatim with his answer), then your lecture's `notes/L0X.md`.

## His formats (from the polls)
1. **Graph poll.** A dose–response plot with curves labelled A–E, then one of:
   - "I have 5 dose response curves, A–E, of 5 different drugs. Which drug is most likely drug E?" — options are drug-list names (norepinephrine, epinephrine, phenylephrine, albuterol, pindolol, metoprolol, prazosin, phenoxybenzamine, loratadine, diphenhydramine, histamine, acetylcholine, tropicamide, varenicline, diazepam).
   - "If DRC B is the DRC of norepinephrine binding to the β1 receptor alone, which DRC best represents norepinephrine in the presence of [epinephrine / albuterol / metoprolol / phenoxybenzamine / an allosteric agonist that affects only affinity]?" — options A / B / C / D / None of the above.
   - "The dotted line is the agonist alone; the solid lines are the agonist in the presence of increasing doses of drug X. Drug X is most likely:" — options are drug-list names or class names.
   - "Which of these drugs has the highest affinity? / is most potent? / is most efficacious? / is a partial agonist?" over labelled curves.
2. **"Which statement is CORRECT?" / "Which statement is INCORRECT?"** — 3–4 statements plus "All of the above" (he keys "all of the above" when two are definitely right).
3. **"Which of the following drugs is a [partial agonist / inverse agonist / irreversible antagonist]?"** — five drug-list names.
4. **True / False** on one definition ("Affinity of a drug for the receptor is dependent on the type of chemical bonds it makes. True / False").
5. **Scenario + predict**: "A drug inhibits the transporter that removes norepinephrine from the synapse. What effect would that have on the potency of norepinephrine?" — would increase / would lower / no effect.
6. **Select all** for lists ("which of these is a second messenger — select all").

## Graph questions carry the plot in the stem
Add a `graph` field and the engine draws it above the options:
```js
graph:{curves:[{label:'A', ec:-1, emax:100}, {label:'B', ec:0, emax:100}, {label:'C', ec:0, emax:50, dashed:true}],
       base:0, x:'log dose', y:'% of maximal response', marks:[{x:0, label:'EC50 B'}], caption:'optional one line'}
```
- `ec` is log10 of the EC50 on a −3…3 axis (−1 is left of 0; +1 is right); `emax` and `base` are percent. `dashed:true` for "agonist alone / point of reference". `base` for a constitutively active receptor (e.g. 30) and a curve can carry its own `base` and `emax` below it for an inverse agonist (emax 5).
- Choose the curve positions from the lecture's rules, which the transcript states: full + full agonist → left shift, same Emax; full + partial → pulled down toward the partial's Emax; competitive (reversible) antagonist → right shift, same Emax; irreversible antagonist → right shift and lower Emax; inverse agonist → below baseline; allosteric agonist affecting only affinity → left shift, same Emax; allosteric antagonist affecting affinity and efficacy → right shift and lower Emax. A question whose answer depends on a rule not in your lecture's sources is not written.
- The stem never names the curve that is the answer; the curves are labelled A–E and the letters are shuffled by you, not always A = answer. Set `skill:'figure'`.

## What to do for your lecture file
1. **Reframe**: go through every question. Where the tested fact is one he polled or would poll, rewrite the stem into his format above (keep id, concept, key and options unless the format needs "All of the above" — then rebuild the options so the key stays sourced; the correct option still must not be the uniquely longest; select-all rules unchanged). Leave stems that are already in his shape.
2. **Add poll-style questions**: 10–15 new questions per lecture (ids continuing the file's numbering), most with a `graph`, using the drug-list drugs the way he does, plus a few "Which statement is CORRECT/INCORRECT?" and True/False items. Each: `skill`, `concept` (reuse an existing concept id when it is the same idea in a new format), `teach` ≤ 70 words on the concept, `why` per option, `quote` only if it states the reasoning, `cite`, optional `reading` (≤ 2 sentences from Katzung Ch. 2, scratchpad/ch2.clean.txt) and `fg`.
3. Sourcing stays strict: every rule a graph question relies on must be in the cited lecture (deck text or transcript). For L01/L02, where the lecture's polls are mostly definitions and statements, the graph items are fewer and must rest only on what those lectures state (e.g. affinity from bond type; phenoxybenzamine vs prazosin).

Check: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && python3 build.py && node test.js && node style_check.js` (failures in other files are not yours). Report: stems reframed (ids), new questions added (ids, how many with graphs), and any rule you needed that the sources did not state. Do not commit; touch no other file.
