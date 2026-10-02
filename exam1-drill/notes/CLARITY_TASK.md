# Guides, Reference, Tell apart: read as a student who has not seen the lecture

Edit ONLY src/guide.js, src/reference.js, src/tell.js (template strings: no backticks, no `${`). Keep every FIG/IMG/GRAPH marker, every data-q, every h3 id. Do not touch diagrams.js, app.js, shell.html or the banks; a separate pass is fixing figure labels.

Read every section start to finish as a P2 student who missed class and has only this page. Fix every place where the reader would have to assume something:
1. A term used before it is defined in that section (Emax, EC50/ED50, Kd, baseline, constitutive activity, spare receptors, R and R*, point of reference, orthosteric, allosteric, surmountable, indirect antagonist, transducer, effector, second messenger, TI, safety index, quantal, graded). Define it in the same sentence or the one before, in ≤ 15 words, the first time it appears in each guide.
2. A rule stated without its reason (e.g. "an inverse agonist goes to 0" without "because it shuts off receptors that were active on their own"). Add the because-clause in the same sentence.
3. A reading strip or decision-table cell that only makes sense with the figure in front of you: make the cell self-contained (e.g. "0, cannot tell" → "starts at 0, so a drop cannot show").
4. Symbols and notation: R, R*, R >>> R*, R = R*, R << R*, ↑ ↓ →, "Δ". Spell out once per guide what each means and what baseline it gives (≈0%, 50%, ≈100%).
5. Contradictions between two places (same fact stated two ways) or with the figures: list each and fix to the version supported by notes/L0X.md.
6. Abbreviations not expanded on first use in each guide/section (PAM, NAM, SSRI, SNRI, PDE, AC, PLC, PKA, GRK, RAS, ACE, NET, SERT, AChE, NE, ACh, 5-HT, TI, SI, ED50, LD50, TD50, MOA, SOA, ADR, DDI, NDS, GPCR, 7-TM, 1-TM).
7. Any sentence a reader could take two ways; rewrite it to one meaning.
8. Text cut off or truncated mid-word (look for "…" or a cell that ends without a verb).
Keep the format of the last rewrite: ≤5 bullets per "What it is", three-column distinctions, reading strips. Add words only where they remove an assumption; do not re-expand to quote dumps. Literal language; no sentence about the page; no new facts or numbers beyond notes/L0X.md and the existing text.

Check: cd src && node --check guide.js && node --check reference.js && node --check tell.js && python3 build.py && node test.js && node style_check.js. Report per page: the assumptions removed (one line each, grouped), contradictions found and how resolved, and anything you could not resolve from the notes. Do not commit.
