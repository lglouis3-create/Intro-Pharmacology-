# Porting the engine to another drill

For a drill made from `exam-drill-template/` (for example the PHAR 4221 Basic Pharmacokinetics repository). Port behaviour, not content. Nothing from this course's bank, pages, quotes, figures or audio goes across.

## 1. Files to copy whole

From `exam1-drill/src/`:

| File | Why |
|---|---|
| `app.js` | The engine: views, quiz, spaced review, Weak spots, Exam sim, Terms, Readings, listen deck, narration, steppers, links, per-exam pages |
| `shell.html` | The CSS and page shell, including the readings, deck, drug-drill and tag styles |
| `build.py` | Runs the generators, parses every source, embeds the changelog, writes the built file and the root `index.html` |
| `test.js`, `style_check.js`, `browser_test.js`, `stepper_test.js` | The checks, including the readings, verbatim-item and narration rules |
| `gen_readings.py`, `gen_terms.py` | Generators for `readings.js` and the Terms bank (gen_terms reads each lecture's exam and professor from `course.js`) |
| `load.js` | Loader used by the tests |

From the repository root: `.claude/agents/*.md` (or `share/agents/*.md`).

## 2. Files to adapt

| File | What to change |
|---|---|
| `course.js` | The course manifest: `professors`, `lectures[] {id, deck, decks?, label, prof, exam, module}`, `exams[] {id, name, scope, date, when, questions, minutes, blurb, pools, blueprint?}`, `activeExam`, `skills`, `paceDefault`. Pools with `marks:null` draw by eligible count |
| `app.js` link tables | `LINKS`, `BY_LECTURE`, `BY_GROUP` (Exam 1), `LINKS2`, `BY_LECTURE2`, `TERM_SUB2`, `DL2_SUB` (Exam 2), `SUB3`, `TERM_SUB3`, `LINKS3`, `BY_LECTURE3` (Exam 3): these are course-specific regexes and anchor names. Keep the shape, replace the content. A new course can start with lecture-level fallbacks only |
| `app.js` `DIAGRAMS`, `PAGE_BY_EXAM`, `VIEWS` | List the course's figure groups; map each exam id to its page strings; drop views the course does not use (`rxq` and `drugs` are drug-table pages; a kinetics course would remove them or replace them with an equation drill) |
| `app.js` `RD_STATUS`, `rdCard()` | The status labels and the pronoun field name (`her_words` here; use `his_words` or `prof_words` and change the one lookup) |
| `gen_readings.py` `META` | One row per reading: exam, lecture ids, status, Drive file id, links |
| `diagrams.js`, `graphs.js`, `scenes.js`, `narration.js`, `drugs.js` | Content-bound; start empty (the engine tolerates empty tables) and add the course's own figures |
| `guide.js`, `reference.js`, `tell.js` (+ `2`, `3`) | Content; one trio per exam |
| `glossary.js`, `q_*.js`, `readings/*.json` | Content |
| `STYLE.md`, `notes/`, `CHANGELOG.md`, `README.md` | Per course |

## 3. Things that will break if forgotten
- `build.py` `DATA_FILES` and `PAGES` lists must name the new course's files; a page listed but absent fails the build.
- `test.js` requires each cite to name the lecture's `deck` (or one of `decks`) and, for transcript-sourced items, the word "transcript".
- `style_check.js` bans stems that say "the slide", "the lecture", "the deck", "in class", "according to …", "Dr. <name>" and "this drill" and bans "because"/"since" inside option text except for `term` items and verbatim polls or quizzes.
- Verbatim items need `sub:"verbatim"` and the tag `pollev` or `quiz`.
- `readingId` on a question must match a card id; link anchors in `META` must exist in the page strings.
- `NAR_BASE()` assumes the built file is served from the drill folder or the repository root; keep that layout or edit the function.
- Progress keys use `COURSE.ns`; keep `ns` stable for the whole course so a student's progress survives updates.

## 4. Checks after porting
```
cd <drill>/src
python3 build.py && node test.js && node style_check.js
node stepper_test.js            # if steppers were ported
NODE_PATH=$(npm root -g) node browser_test.js   # Chromium; about five minutes
```
Then a Playwright sweep of every tab at 390 px and 1100 px in light and dark themes: no page errors, no horizontal overflow, every "Explain more" and readings chip resolves to an element.

## 5. Agents in the new repository
Copy `share/agents/*.md` to `<repo>/.claude/agents/`. If the repository's `.gitignore` ignores `.claude`, add the files with `git add -f`. The agents take their lecture ids, paths and the professor's name and pronouns from the caller's prompt; nothing in them is course-specific.

## 6. The daily material check
Create one scheduled routine per course that fires into the working session on class mornings: search the course's Drive folders (readings, transcripts, decks) for files from the last day, remind the student what to add, and name what a new lecture needs before ingest. The routine never ingests, builds or publishes on its own.
