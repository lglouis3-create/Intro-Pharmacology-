# Bank review brief — adversarial pass before Exam 1 (Fri Oct 2)

You review ONE slice of the question bank (the file named in your prompt) in `/home/user/Intro-Pharmacology-/exam1-drill/src/`. You do not edit any file. You return findings only.

## What the exam will look like (his own statements; use these as the yardstick)
- ~50 questions, 2 points each, ExamSoft, backwards navigation, select-all "2 or 3 max". One 9/29 poll verbatim; the Jeopardy bonus likely verbatim too.
- Exam 1 = mechanism of action; "highly applicable ... Got to know a few things and apply a lot"; "not slide 200 at the bottom in the smallest font ... about the concepts".
- His formats (STYLE.md, notes/POLL_BRIEF.md): curves A–E with a point of reference ("DRC B is NE alone, which DRC represents NE in the presence of X"), "drug X is most likely", "Which statement is CORRECT / INCORRECT" with "All of the above", True/False, scenario increase/decrease/no effect, drug-list names as options, Kd values as options (smallest Kd = highest affinity).
- The 9/30 review (notes/L06.md): every curve question is answered by the three questions — shift (ED50)? baseline? Emax? plus symmetry — and by "is it helping or making life more difficult". Signal transduction: which is the signal / receptor / transducer / effector / second messenger; the steps forward and back. Second messengers he names: cAMP and IP3 (and Ca++, PKA per the Day 2 slide).
- Drug list: all reversible/competitive except phenoxybenzamine (irreversible); diazepam = allosteric agonist (GABA); loratadine = inverse agonist (H1); metoprolol = β1 competitive antagonist; albuterol/aripiprazole/varenicline/pindolol = partial agonists; NE, epinephrine, histamine, phenylephrine = full agonists; prazosin = α1 antagonist.

## What to flag (adversarial only; skip clean questions)
1. Keyed option wrong per the cited slide/transcript (quote both).
2. A distractor that is also defensible (would he accept it?).
3. A claim in `why`/`teach`/`note` not on the cited slide or in the transcript, or contradicting the 9/30 review method (e.g. a teach that says an inverse agonist lowers Emax, or that a competitive antagonist changes the baseline, or that an irreversible antagonist changes the baseline).
4. Stem gives the answer away, or is not in his format when a format exists for that concept (e.g. a curve question without a figure, or with letters shuffled so the key letter changes meaning).
5. Duplicate of another question in the same file without `dupOf`.
6. Anything that tests trivia he said he will not test (brand names, doses, who Clark/Ariens were, chemical structures, "FYI" slides, anatomy).
7. Explanations that are long or off the point: `teach` should state the mechanism and the rule in his terms, 1–4 sentences; flag teaches over ~90 words or that explain something the question did not ask.

Sources: notes/L01.md…L06.md (slide maps, polls, cues, conflicts), STYLE.md, the transcripts in `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/` (t01f.txt 9/22, tf.txt 9/23, trf.txt 9/24, t4.txt 9/28, t5.txt 9/29, t6.txt 9/30), the deck text dumps there (part2.txt etc.) and the bank itself. Verify against the source before flagging; do not flag from memory of pharmacology alone — the exam is written from his lectures.

## Output
Write `/home/user/Intro-Pharmacology-/exam1-drill/notes/review/<file>.json` (create the folder if needed): a JSON array of findings, each
`{"id":"L03-012","severity":"key|distractor|unsourced|format|dup|trivia|explain","quote":"<exact text from the question>","source":"<slide/transcript quote or 'none found'>","fix":"<proposed replacement text, same field, same correctness pattern; or 'remove'>","field":"stem|options[2].t|options[2].why|teach|note|quote|cite"}`.
A keyed answer changes only with a stated source. Keep fixes minimal and in his words. Then reply with a 5-line summary (counts by severity, the three worst findings).
