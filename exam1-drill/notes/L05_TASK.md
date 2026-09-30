# L05 task — Day 5 (9/29): spare receptors, indirect antagonists, receptor regulation, quantal responses, therapeutic index

Follow notes/BRIEF.md (question format, sourcing), notes/POLL_BRIEF.md (his formats; put a `graph` on curve questions), notes/READING_BRIEF.md + TRIM_BRIEF.md (readings ≤ 2 sentences), notes/QUOTE_BRIEF.md (quotes must state the reasoning), and the L04 conventions in notes/L04_TASK.md (plain `note`s, `fg` figure keys, `tags:['poll']` for his formats).

Outputs: `src/q_L05.js` (replace the stub) and `notes/L05.md` (slide map, polls verbatim with his answers, exam cues, tell-apart rows with a question id each, reference tables, conflicts, objectives, `## New terms` in glossary format with lecture:'L05').

Sources:
- Deck: Part 2 of the Day 4–5 deck. Text with page markers: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/part2.txt` (44 pages; page N of Part 2 = slide ~56+N of the full deck, but cite as `Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf page N`). Thumbnails `scratchpad/p2_001.png … p2_044.png` (read with the Read tool to see figures); the PDF itself at `scratchpad/part2.pdf` if a page needs a closer look (Read with pages).
- Transcript 9/29: Google Drive fileId 1rE_AnXhO-HdJ-rRVWnL_FupJfcdJgN1s (read with mcp__Google_Drive__read_file_content, loaded via ToolSearch "select:mcp__Google_Drive__read_file_content"); save a copy to `scratchpad/t5.txt`. Read it in full. It decides what was actually lectured and how he asks.
- Katzung Ch. 2 text for readings: `scratchpad/ch2.clean.txt` (spare receptors, quantal dose-effect curves, therapeutic index are in it).
- Existing bank for concept ids to reuse: q_L04.js (spare receptors first mention, indirect antagonist), q_L01.js (metoprolol, thiazide), glossary.js.

Scope: everything lectured on 9/29 (if the transcript shows the lecture stopped before the end of Part 2, the remaining pages are slide-only, `source:'slide'`, and say so in the notes). 35–45 questions in his formats: spare receptors (response vs occupancy), indirect antagonists (SSRIs, ACh examples, exogenous vs endogenous), up-/down-regulation and desensitization (GPCR rapid desensitization, internalization, long-term down-regulation; clinical examples on the slides), how regulation changes potency, enhancement of drug effects, individual vs population, quantal responses (ED50/TD50/LD50 as population values), therapeutic index and safety index arithmetic (state every number from the slide and check the arithmetic in `teach`), therapeutic window, effect vs side effect. Numbers only from the slides/transcript — never invented.

Figure keys available: drc-basic, potency, efficacy, partial, inverse, competitive, irreversible, binding-kd, spare, sites, two-state, gpcr, classes. If a needed picture is missing (a quantal frequency-distribution/cumulative curve, a therapeutic-window figure, or a desensitization time course), describe it precisely in notes/L05.md under `## Figures wanted` (axes, curves, labels, what the question reads off it) so it can be drawn.

Check: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && python3 build.py && node test.js && node style_check.js` — all must pass. Report counts (questions, per skill, select-all, graphs, readings), where the lecture stopped, and conflicts. Do not commit; touch no other file.
