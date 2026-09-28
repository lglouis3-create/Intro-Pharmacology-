# PHAR 4344 Intro to Pharmacology — Exam 1 Drill

Open `PHAR4344_Exam1_Drill.html` in any browser, phone included. It is one file, works offline, and keeps progress in that browser under a profile name.

- **Topics**: drill by lecture or subtopic, filter by skill.
- **Quiz**: spaced repetition. A wrong answer or "I guessed" brings the item back at once, and a missed concept returns in a different wording. "Not sure" holds the interval; "Knew it" lengthens it.
- **Weak spots**: accuracy by topic and by skill, and the wrong options you keep choosing.
- **Exam sim**: timed paper, no feedback until you submit (120 minutes for the full paper, per the syllabus).
- **Reference / Tell apart**: the drug list and lecture tables, plus look-alike pairs with a linked question each.
- **Progress**: switch profile, set the pace, export or import progress, export missed questions as CSV.

Build and checks (from `src/`):

    python3 build.py && node test.js && node style_check.js
    NODE_PATH=$(npm root -g) node browser_test.js

Each update gets an entry at the top of `CHANGELOG.md`; the build embeds it and the Progress page shows it with the build date.

`q_TERMS.js` is generated from `glossary.js` by `gen_terms.py`, and `q_DL1.js` is generated: edit `gen_druglist.py`, then run `python3 gen_druglist.py`.
