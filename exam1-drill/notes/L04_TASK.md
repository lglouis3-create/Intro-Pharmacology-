# L04 task — Day 4 (9/28): Drug–receptor interactions I

Follow notes/BRIEF.md (question format and sourcing) for lecture **L04**. Outputs: `src/q_L04.js` and `notes/L04.md`.

Scope: what was lectured on 9/28. Read the "Part 1" PDF (the slides covered today) and the 9/28 transcript in full; consult the full Day 4–5 deck only to confirm slide order. Cite the full deck filename `Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf` with `slide ~N` (approximate numbers, counted from the text). Syllabus topic for 9/28: agonist, inverse agonist and partial agonist (two-state model, full agonist + full agonist, full agonist + partial agonist). If the lecture also reached competitive/irreversible antagonists or allosteric interactions, include them.

Rules added since the first three lectures (all mandatory):
1. `reading` (notes/READING_BRIEF.md and TRIM_BRIEF.md): Katzung 16e Ch. 2 only where it directly supports the tested concept; at most 2 sentences / 45 words on what the concept means; no examples, history, figure numbers. Chapter text: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/ch2.clean.txt`. No "the chapter/the textbook" phrasing.
2. `quote` (notes/QUOTE_BRIEF.md): only a line that states the concept or the professor's reasoning; at most two sentences; never answer-reading, poll tallies or option restatements. Omit the field otherwise.
3. `note` when sources disagree, written plainly: what the slide says, what was said in class or in the book, and which to use on the exam.
4. `fg:'key'` where a figure helps the explanation. Keys: drc-basic, potency, efficacy, partial, inverse, competitive, irreversible, binding-kd, spare, sites, two-state, gpcr, classes (six drug classes side by side).
5. Existing questions L03-031 to L03-035 were written from Day 3 slides that were deferred to today (two-state model, full agonist + full agonist, full agonist + partial agonist / aripiprazole). Do not duplicate them; where today's transcript now explains those slides, write the new question on what was said today and set `concept` to the same concept id as the L03 item it overlaps with (read q_L03.js for the ids) so the scheduler treats them as one idea.
6. Every option `why` and `teach` short and on the tested concept (teach ≤ 70 words).

Also in notes/L04.md: the slide map, polls verbatim with his answers, exam cues, tell-apart rows (HTML rows with a question id each), reference tables, conflicts, objectives, and a `## New terms` section listing any term the lecture defines that is not already in `src/glossary.js` (read it first), in the glossary's own JS format with def/hook/confuse/fig/quote/cite/src, lecture:'L04'.

Checks: `cd src && python3 build.py && node test.js && node style_check.js` must pass. Report counts (questions, per skill, select-all, readings, figures), slides not readable, and conflicts. Do not commit.
