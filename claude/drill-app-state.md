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
- Bank: 285 questions (L01 35 + L02 35 + L03 35 + L04 35 + DL1 27 + TERMS 118).

## 2026-09-28 (night) update
- Figure `classes` (diagrams.js): four receptors side by side, agonist / reversible antagonist / irreversible antagonist / allosteric modulator, each answering where it binds, whether it activates, whether it lets go. On DL1 diazepam (009, 020), phenoxybenzamine (moa + irreversible-drug), prazosin, phenylephrine; glossary allosteric-agonist and allosteric-antagonist.
- Diazepam note and teach rewritten in plain words (gen_druglist.py NOTE / TEACH); key unchanged. Tell-apart row on the three questions a class name answers.
- Checks: build.py, test.js, style_check.js, browser_test.js passing.

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
