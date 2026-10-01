# PHAR 4344 drill — state

Updated 2026-09-28.

## Delivered
- `exam1-drill/PHAR4344_Exam1_Drill.html`, built from `exam1-drill/src/` (`python3 build.py`).
- 132 questions: L01 Day 1 (9/22) 35 · L02 Day 2 (9/23) 35 · L03 Day 3 (9/24) 35 · Exam 1 drug list 27. 26 are select-all.
- Skills: recall 43 · apply 27 · drug 27 · tell 22 · figure 9 · calc 4.
- Checks run and passing: build.py, test.js, style_check.js, browser_test.js (Chromium).
- Checks not built for this course: cite_check (needs the PDFs with page numbers), explain_check, coverage_check.
- Adversarial review done on L01–L03 against deck text + transcript. No keyed answer changed. L03-034 was rewritten because the old key was inferred, not stated.

## 2026-09-28 update
- Textbook notes (`reading` field) on 114 of 132 questions from Katzung 16e Ch. 1, 2, 6 (Drive: Fall 2026/Intro Pharmacology/Readings). Keys unchanged. Conflicts noted on the question: diazepam (PAM vs allosteric agonist, DL1-009/020), potency definition (L02-033, L03-028), PKA as second messenger (L02-019), Gs signal duration (L02-005).
- Page: last-updated stamp + change log (CHANGELOG.md, embedded by build.py), exam countdown (`when` in course.js), phone-stacked tables, keyboard shortcuts, seen bars.
- Chapter text carries only AccessMedicine printout pagination; `sec` cites section headings.

## 2026-09-28 (evening) update
- Terms: `glossary.js` (50 terms, sourced; disagreements in notes/GLOSSARY.md) → `gen_terms.py` → `q_TERMS.js` (98 questions, skill `term`). Exam draw caps term items at 15%.
- Figures: `diagrams.js` FIG(key) inline SVG; keys drc-basic, potency, efficacy, partial, inverse, competitive, irreversible, binding-kd, spare, sites, two-state, gpcr. Attached via `fg` on 33 questions and on glossary terms.
- Readings trimmed to ≤2 sentences / ≤45 words (TRIM_BRIEF.md); style check rejects "the chapter/textbook" phrasing and source references in definitions.
- Bank: 401 questions (PE 58 added) (L01 50 + L02 50 + L03 48 + L04 50 + DL1 27 + TERMS 118). 58 carry a `graph` (curves drawn in the stem via FIG.graph); 92 tagged `poll` (his formats: graph poll, CORRECT/INCORRECT + all of the above, True/False pair, which-drug-is-a, scenario/predict, select-all). notes/POLL_BRIEF.md holds the formats. Curve-letter and T/F options are never shuffled.

## 2026-09-28 (night) update
- Figure `classes` (diagrams.js): four receptors side by side, agonist / reversible antagonist / irreversible antagonist / allosteric modulator, each answering where it binds, whether it activates, whether it lets go. On DL1 diazepam (009, 020), phenoxybenzamine (moa + irreversible-drug), prazosin, phenylephrine; glossary allosteric-agonist and allosteric-antagonist.
- Diazepam note and teach rewritten in plain words (gen_druglist.py NOTE / TEACH); key unchanged. Tell-apart row on the three questions a class name answers.
- Checks: build.py, test.js, style_check.js, browser_test.js passing.

## 2026-10-01: L06 (9/30) + Jeopardy + bank review
- RULE (user, 10/01): no Exam 2 material on the site until after Exam 1 (Fri Oct 2). The 9/30 transcript second half and Autonomic Nervous System.pdf are not ingested.
- Terms redesign: glossary entries carry `gist` (≤14 words) and `scene` (situation without the term name); gen_terms.py makes T-id-1 scene→term, T-id-2 term→gist, T-id-3 def→term (dupOf the first). Flashcards show the scene first. FIG crosstalk on cross-talk.
- L06 Day 6 (9/30): Part 3 deck (Drive 1oyAam1CYFWz9rv2pOnzHG4lGKSbOGv6g, 2 pages), review slides Pharmacodynamics reviews.pdf (Drive 1n1TKj61a3hsnw6cciHrYdRcWoMjSVjDo, 11 pages), transcript 09.30 (Drive 1RNbCiQ44t_i3fpyyEFHbF3jafBuym7ZK; read in full; ~60% is Exam 1, the rest is Exam 2 autonomic material). 35 questions q_L06.js (incl. 4 match items: classify A–E, what each question rules in, G-protein steps forward and reverse), notes/L06.md. Review figures cropped: rev-rt-figure, rev-shifts-base0/50, rev-dotted-left/right, rev-allo-ant, rev-pindolol, p3-therapeutic-efficacy.
- Jeopardy (9/30): Drive folder "Jeopardy Questions" (IMG_3010–3018, IMG_9313–9321); 18 items verbatim + the 9/30 PollEV page-6 poll as q_JEOP.js (JP-001…019, topic JP, tags include 'pollev' for the verbatim exemptions in test.js). Keys all from the transcript (notes/L06.md table). New figure crops jeop-abcde-effect, jeop-a-plus-b. Conflicts: curve E on the 50% figure keyed inverse agonist (his Jeopardy key) though he first said "irreversible"; J11 stem he called wrong (SSRI); J2 "I changed the question".
- PollEV’s Exam 1.pdf (Drive 1z1I--AB79jydLVR4VW4aAP0wm1VvUicK) updated 10/01: only page 6 new (irreversible antagonist = phenoxybenzamine). L02-012 now mirrors it.
- Guide 10 "How to tackle a curve question" (first in guide.js) + guide 6 "How he will ask it (9/30)" + FIG gpcr-anim (step-through Gs cascade with Back/Next/Play; click handler in app.js, `.st` groups). Tell apart: Day 6 table, indirect/regulation grids, stepper.
- Adversarial review (notes/REVIEW_BRIEF.md; findings notes/review/*.json): 78 bank findings, 77 applied (L01-009 kept); 34 glossary findings applied (occupancy-theory and nam terms removed; defs no longer name their own term); 5 tell rows fixed. No keyed answer was found wrong; two re-keys sourced to his words (L01-019 partial agonist = efficacy 1–99%; L01-034 reverse step = α rejoins β/γ).
- Bank: 550 questions. course.js lectures now L01–L06, JP, PE, DL1; lecture entries may carry `decks:[…]` (test.js accepts any of them in the cite).
- Exam facts 9/30: ~50 questions × 2 points, backwards navigation, select-all 2–3 max, one 9/29 poll verbatim plus a Jeopardy bonus; "which is the signal/receptor/transducer/effector/second messenger" and the steps forward/back will be asked; know cAMP and IP3.

## 2026-09-30: L05 + guides
- L05 Day 5 (9/29): Part 2 deck (Drive 1cPh8uE-c_Vhyp3y2jnlHcOHSyScHx63N; 44 pages, all lectured), transcript 09.29 (Drive 1rE_AnXhO-HdJ-rRVWnL_FupJfcdJgN1s). 45 questions, notes/L05.md. Conflicts: page-26 handwriting "shift left" vs slide/transcript right; SI 0.1 (slide) vs "1.1" spoken.
- PollEV’s.pdf v2 (Drive 1z1I--AB79jydLVR4VW4aAP0wm1VvUicK, 6 pages): pages 4–5 are the 9/29 polls (PE-059…080). Pink-card green highlights are STUDENT responses; keys come from transcripts. PE-003 keyed Efficacy.
- guide.js: nine guides (GUIDE_BRIEF.md). Figure markers <!--FIG:-->, <!--IMG:-->, <!--GRAPH:{json}--> expanded by expandFigs() on Guides and Reference.
- Bank: 500 questions. Remaining Exam 1 lecture: 9/30 (a few Part 2 slides + review/Jeopardy).

## PollEV PDF (2026-09-29)
- PollEV_s.pdf (user upload, 3 pages): his polls with keyed answers. Figures cropped to images.json (keys pollev-*; raw screenshots in src/polls/, git-ignored). q_POLLS.js = 27 verbatim (sub 'verbatim', tags pollev, dupOf the lecture item) + 31 variants. Verbatim polls are exempt from the ≥3-option, longest-option and reasoning-word rules.
- PDF keys that corrected the bank: Kd table values (L02-032), potency poll wording "# of receptors" (L02-033), "Which is more important?" = Safety (PE-003, note).

## Sources (Google Drive: GoodNotes/FSOP/P2 Year/Fall 2026/Intro Pharmacology)
- Syllabus: SyllabusF26_PHAR_4344_PT_II_Intro_to_Pharmacology_Final.pdf
- Slides/Exam 1: Pharmacodynamics-Day-1-2026s.pdf, Pharmacodynamics-Day_2_2026s copy.pdf, Pharmacodynamics-Day_3_2026s.pdf (+ condensed), Exam_1_Drug_List_2026.pdf
- Transcripts (Transcripts/Intro Pharmacology): 09.22, 09.23, 09.24

## Known limits
- Slide numbers are approximate (marked ~). Drive returns deck text with no page markers, and the PDF downloads failed. Cite by title if in doubt; slide maps are in notes/L0X.md.
- No slide images in this build, so curve questions describe the curve in words.
- Exam 1 question count and select-all count are not announced. The simulator asks for a length and uses the 120 minutes the syllabus allots.

## Ingested 2026-09-29: L04 Day 4 (9/28)
- Deck Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf (Part 1 = pages 1–56 covered 9/28); transcript 09.28. 35 questions, notes/L04.md. Lecture stopped at slide ~56 (spare receptors, indirect antagonists, regulation, quantal, TI not yet taught).

## Next to ingest (Exam 1 = Sept 22 – Sept 30)
- 9/29 Drug–receptor interactions II (competitive and irreversible antagonists, allosteric)
- 9/30 Receptor regulation, quantal responses, therapeutic index
- Carried over from 9/24: two-state model and full + partial agonist combinations (L03-031–035 are slide-only for now)

## Conflicts logged
See `## Conflicts / uncertain` in notes/L01.md, L02.md and L03.md. The ones that reach questions carry a `note`: ADME and apparent vs pharmacological potency (L01-015, L01-018), potency determinants on the slide vs spoken (L02-033), and agonist reversibility (L03-015).
