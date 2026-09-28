# Reading-enrichment brief — PHAR 4344 Exam 1 drill

Goal: deepen the explanations of existing questions using the assigned textbook readings, without changing any keyed answer. The lecture (deck + transcript) stays the primary source for what the exam keys; the textbook adds the mechanism, the definition or the worked reasoning behind it.

## Textbook files (Google Drive; read with mcp__Google_Drive__read_file_content — load it via ToolSearch "select:mcp__Google_Drive__read_file_content")
Katzung, Basic & Clinical Pharmacology, 16th ed. (the syllabus's required text):
| chapter | fileId |
|---|---|
| Ch. 1 Introduction: The Nature of Drugs & Drug Development & Regulation | 1RFWrersAluemOn2e2VoeMUUc4pomRprO |
| Ch. 2 Drug Receptors & Pharmacodynamics | 1ZVE4Yu0CK3wgawDgzxAWAgss6l7C8kZb |
| Ch. 6 Introduction to Autonomic Pharmacology | 1MyxIvcPC9-TqxR4jiC4GYCNZB5JkpzHL |

Read your assigned chapter(s) in full before editing. If the text carries page numbers, cite them; otherwise cite the section heading.

## What to add
For each question where the chapter directly supports the concept, add a `reading` field:
```js
reading:[{src:'Katzung 16e, Ch. 2', sec:'Relation Between Drug Dose & Clinical Response — Potency', t:'2–4 sentences in your own words, restating what the textbook says about this concept and how it bears on the keyed answer. Short quoted phrases are fine.'}]
```
- One entry is usual; two at most (for example one from Ch. 2 and one from Ch. 6).
- Every sentence in `t` must be traceable to the chapter text. No outside knowledge, no other editions, no other books.
- Literal language only: no metaphors, no study advice, no sentence about the drill or the lecture ("the slide says", "in class"). Expand each abbreviation once within the entry.
- Do not add a `reading` entry to a question the chapter does not cover; a forced entry is worse than none. Roughly half to two thirds of a lecture's questions will qualify.
- Keep `t` free of backticks and `${`.

## What else you may fix while there
- A `why` or `teach` sentence that is vague or one-line may be expanded using the lecture sources already cited on that question (deck text and transcript). Nothing from the textbook goes into `why` or `teach`; textbook content goes only into `reading`.
- If the textbook and the lecture disagree on something a question tests, do NOT change the key. Add or extend `note:` stating both positions and that the exam is written from the lecture. Report it in your summary.
- Keep: ids, `concept`, the correct option never the longest, select-all rules, 4–5 options, every option with a `why`.

## Checks
When done: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && python3 build.py && node test.js && node style_check.js` — all must pass. Other agents are editing the other q files at the same time; a failure inside a file that is not yours is not yours to fix.

Return: how many questions got a `reading` entry, any textbook-vs-lecture conflicts, and whether the chapter text carried page numbers. Do not commit.
