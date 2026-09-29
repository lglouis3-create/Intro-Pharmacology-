# PollEV bank task — his polls verbatim, with his keys, plus same-figure variants

Source: `PollEV_s.pdf` (3 pages), the professor's own PollEV questions with the keyed answer highlighted (green highlight or a green check mark; red X marks are wrong choices). Rendered pages to read: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/pollev-1.png`, `pollev-2.png`, `pollev-3.png` (read them with the Read tool; they are images). The keyed answer in this PDF is authoritative for the exam: he reuses these "word by word" or with "a different figure or a different point of reference".

Output: `/home/user/Intro-Pharmacology-/exam1-drill/src/q_POLLS.js` with
```js
TOPICS.push({id:'PE', name:'PollEV questions', prof:'Gottlieb', lecture:'PE', cite:'PollEV_s.pdf (his polls with his keys)',
  subs:[{id:'verbatim', name:'His polls, word for word', cite:'PollEV_s.pdf'},{id:'variant', name:'Same figure, different point of reference', cite:'PollEV_s.pdf'}]});
QUESTIONS.push( ... );
```
Schema as in notes/BRIEF.md; `lecture:'PE'`, `topic:'PE'`, `sub:'verbatim'|'variant'`, `cite:'PollEV_s.pdf page N'` (add the lecture transcript when a why/teach uses his spoken reasoning), `tags:['poll','pollev']`, `skill` (figure / recall / tell / apply / drug), `concept` — reuse the concept id of the existing lecture question on the same idea (read q_L01–q_L04.js) and set `dupOf` to that question's id when the verbatim poll duplicates it, so an exam paper never carries both.

## Figures
His figures are embedded, answer marks cropped off. Put `img:'<key>'` on the question (and `imgCap` for a one-line caption if needed; never a caption that gives the answer). Keys:
- `pollev-gs-cascade` — the NE/β1/Gs/AC/cAMP/PKA/Ca++ diagram (rank the sequence poll, page 1)
- `pollev-kd-table` — Drug A / Drug B Kd table (β1, β2, M1) (page 1 and page 2; same table)
- `pollev-two-hearts` — #R=10 vs #R=100 dishes, [D] = 1000 nMols (page 2)
- `pollev-five-drc` — five DRCs A–E with dotted Y line (page 2; used for "highest affinity", "least effective", "kill 100% of a bacterial colony")
- `pollev-abcde-similar` — Response % of control, curves A–E over 10^-9…10^-3 M (page 2, "DRC B agonist alone + another agonist with similar efficacy"; the same figure is `pollev-abcde-ne-epi`, `pollev-abcde-allo-ag`, `pollev-abcde-allo-ant` on page 3)
- `pollev-figure1` — Figure 1: A–E from a 50% baseline (page 3, "DRC E most likely represents")
- `pollev-dotted-x` — dotted agonist alone + three solid right-shifted curves (page 3, "drug X is most likely"); `pollev-dotted-ne` is the same figure for the norepinephrine version
Text-only polls (NDS, which statement is correct, safety/efficacy, fungal pneumonia, affinity true/false, efficacy, channels, G-protein correct statement, allosteric correct statement, transporter, bond affinity, full agonists, which drug is a partial agonist) need no image.

## Part 1 — verbatim (about 27 questions)
One question per poll in the PDF, stem and options word for word (fix only obvious typos such as "Meotprolol" → "Metoprolol", "chose" → "choose"; keep his phrasing otherwise), keyed exactly as the PDF highlights. Read the highlight/check marks carefully; where the PDF key differs from what the lecture bank keys, the PDF wins and you add a `note` saying so in plain sentences (known: "Which is more important?" is keyed **Safety**; "Which of the following is CORRECT?" G-protein set is keyed "The potency of a drug is dependent on the affinity, efficacy and # of receptors"). Every `why` explains the option from the lecture's reasoning (notes/L0X.md and STYLE.md carry his spoken answers; transcripts are in the scratchpad: t01f.txt 9/22, tf.txt 9/23, trf.txt 9/24, t4.txt 9/28). The rank-the-sequence poll becomes a single-answer question whose options are orderings (one correct: Binding of drug and receptor → alpha s subunit dissociation → AC activation → increase levels of cAMP → RGS-mediated hydrolysis).

## Part 2 — variants (about 25 questions)
For each figure, the other questions he could ask on the same picture — "a different point of reference":
- Five-DRC figure: highest affinity (A), least effective (D), most likely to kill 100% (B), which is/are partial agonist(s), most potent full agonist, lowest affinity, which statement is CORRECT about the figure. Use his transcript keys for the five-curve figure (Day 3: A highest affinity; B the only full agonist; D lowest efficacy; A, C, D, E partial).
- A–E response figure: with B as reference: + full agonist of similar efficacy (A), + allosteric agonist affecting only affinity (A), + competitive antagonist (which curve? right shift same Emax → C), + irreversible antagonist (right shift and lower Emax → E), + partial agonist; with D as reference: + allosteric antagonist affecting affinity and efficacy (E), + allosteric agonist affecting only affinity (?), etc. Only write a variant whose answer follows from a rule the lectures state (notes/L04.md lists them: full+full left shift same Emax; competitive right shift same Emax; irreversible right shift lower Emax; inverse agonist below baseline; allosteric agonist affinity-only left shift; allosteric antagonist affinity+efficacy right and down). If the figure has no curve matching the rule, key "None of the above" only when the lecture's rule makes that certain; otherwise skip.
- Figure 1 (50% baseline): DRC A/B/C/D/E most likely represents → full agonist (A), partial agonist (B), neutral antagonist / metoprolol (C), partial inverse agonist (D), full inverse agonist / loratadine (E); with drug-list names as options (norepinephrine, albuterol, metoprolol, loratadine, epinephrine, prazosin, diphenhydramine).
- Dotted-line figure: drug X as competitive antagonist / metoprolol; a variant asking what would change if X were phenoxybenzamine (Emax would fall) as a statement question.
- Kd table: β2 in the lungs (Drug B), β1 in the heart (Drug B, 100 nM), M1 (equal), "which drug is more selective for β1 over β2" only if the lecture states how to read selectivity from Kd.
- Two hearts: increase potency; variant: what stays the same (affinity/Kd, efficacy) as a select-all.
Options for curve letters: A / B / C / D / E or None of the above, in that order (the engine keeps them in order). Keep the correct option from being the uniquely longest.

Every question: `teach` ≤ 70 words on the concept, `why` per option, `quote` only if it states the reasoning, `reading` optional (Katzung Ch. 2, ≤ 2 sentences, scratchpad/ch2.clean.txt), `fg` optional.

Check: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && python3 build.py && node test.js && node style_check.js` — all must pass. Report: the list of polls with the key you read from the PDF (so it can be cross-checked), any place the PDF key disagrees with the lecture bank, and the variants written. Do not commit; touch no other file.
