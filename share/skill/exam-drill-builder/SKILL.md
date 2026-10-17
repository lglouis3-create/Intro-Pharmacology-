---
name: exam-drill-builder
description: Build or extend a single-file HTML exam drill for any course from its decks, transcripts, readings and the professor's own questions. Set up a course, ingest a lecture (transcript first), ingest polls and quizzes verbatim, build a Readings page and listen deck, prepare an exam build, review the bank, review the learning experience, or set up the daily material check.
---

# Exam drill builder

A drill is one self-contained HTML file (questions with explanations, slide
figures, spaced repetition with confidence buttons, an exam simulator that
follows the blueprint, weak-spot analytics by topic and by skill, reference
tables, tell-apart tables, objective guides, a Readings page with a listen
deck, recorded narration, exports) built from plain source files and published
on GitHub Pages and as a shared artifact. The engine is course-agnostic; a
course is `course.js` plus its content files.

- Template (engine + empty content + sample bank + README):
  `exam-drill-template/` at the root of `github.com/lglouis3-create/Medicinal-chemistry`.
- Current reference engine with every feature below: `exam1-drill/` in
  `github.com/lglouis3-create/Intro-Pharmacology-` (`src/`, `share/` holds the
  porting guide and the agent definitions).

## Modes and the phrases that start them

The user starts a mode with a phrase; nothing runs on its own. If the request
names none, ask which one in one line. A mode acts only on the course it names.

| phrase | mode |
|---|---|
| "set up a drill for <course>" | 1 New course |
| "ingest lecture <N>" / "add the <date> lecture to the <course> drill" | 2 Add a lecture |
| "add the polls / quiz / practice exam" | 2b Verbatim items |
| "exam build for <course> exam <N>" | 3 Exam build |
| "review the <course> bank" | 4 Bank review |
| "readings page" / "add the readings" | 6 Readings and listen deck |
| "review the site" / "what would make it easier to use" | 7 Learning-experience review |
| "set up the daily check for <course>" / "stop the daily check" | 8 Daily material check |
| "set up nightly ingest for <course>" / "stop nightly ingest" | 5 Scheduled ingest |

## What I need from you (ask in one message, after checking first)

Check the course's Claude Project files and its Google Drive folder before
asking. Then ask, in one message, only for what is still missing:

- New course: course code and name; the professors' names as printed on the
  decks and their pronouns; the syllabus (exam dates, counts, minutes,
  formats, which lectures each exam covers, weights); the first deck(s) and
  transcript(s); any polls, practice quizzes, review lists; for a drug
  course, the drug list; where the repo lives.
- Add a lecture: the deck (PDF) and the transcript (or the audio) for that
  lecture; which exam and module if the syllabus does not say; any reading
  the professor assigned for it.
- Exam build: the professor's announcement of the blueprint and any review
  list.
- Readings: confirm the reading-to-lecture list before anything is written.

When a lecture's exam or module label is unclear, ask; the label drives the
pools. When the syllabus changes (dates, titles, weights), record every
difference in the exam's notes file and close any conflict it resolves.

## Where things live

- The course's Claude Project or Drive folder holds the decks, the transcripts
  (one per lecture, labelled by date), the readings, the professor's polls,
  quizzes, practice exams and review lists, and `claude/drill-app-state.md`:
  the running state doc for the drill (what has been ingested, counts,
  verified facts, conflicts, delivery status). Read it first in every session
  and update it at the end.
- The GitHub repo holds `src/` (engine + content), the built HTML, the root
  `index.html` served by GitHub Pages, `audio/`, `notes/`, `STYLE.md`,
  `CHANGELOG.md`, and `.claude/agents/`.
- The session workspace is scratch. Nothing is delivered until it is built,
  checked, committed, merged, published and recorded.

## The course manifest (`course.js`)

```
COURSE = {id, title, short, ns, output, atlas, professors:[…],
  lectures:[{id, deck, decks?, label, prof, exam, module}],
  exams:[{id, name, scope, date, when, questions, minutes, sata?, blurb,
          pools:[{key, name, marks | null, filter:{exam:N} | {prof:'X'} | {lecture:[…]}}],
          blueprint?:{sata, parts:[…]}}],
  activeExam, skills:[{id, label, short}], paceDefault:'cram'|'weekly'|'semester'}
```

- `ns` stays the same for the whole course so progress carries across exams.
- `decks` lists every file a lecture is cited from when it spans more than one
  (a deck finished the next day, a discussion guide, a quiz PDF).
- `prof` per lecture drives the professor tag on Topics cards and the Terms
  generator; a two-professor course needs nothing else.
- `pools` with `marks:null` draw by eligible count; pool marks, when set, add
  up to `questions`.
- `blurb` states, in the professor's words where possible, how the exam is
  written and what is in the bank so far. Update that line at every ingest.
- `skills` is the course's taxonomy; every question carries one `skill`.

## Content files (per course)

- `q_<LID>.js`: one file per lecture; `TOPICS.push({id, name, prof, lecture,
  cite, subs})` then `QUESTIONS.push(...)`. Listed in `DATA_FILES` in `build.py`.
- `guide<N>.js`, `reference<N>.js`, `tell<N>.js`: one trio per exam, mapped in
  `PAGE_BY_EXAM`. HTML in template strings (no backtick or `${` inside).
- `glossary.js`: terms `{id, term, lecture, group, def, gist, scene, confuse,
  quote, cite, src}`; `gen_terms.py` builds the Terms bank from it.
- `readings/*.json` + `gen_readings.py` (`META` table): the Readings page.
- `images.json`: slide crops as data URLs, made by `harvest.py`, never by hand.
- `STYLE.md`: the professor corpus. Per lecture day: every poll verbatim with
  the professor's verdict per option, every question put to the room with the
  accepted answer, every sentence about the exam, the quizzes, what is or is
  not tested, and what was deferred. It decides how stems are worded.
- `notes/L<N>.md` per lecture (sources, slide map, conflicts, not reached) and
  `notes/EXAM<N>.md` per exam (roster from the syllabus, what is in the bank,
  what is missing and what each ingest needs, readings table, syllabus
  changes).
- `diagrams.js`, `scenes.js`, `narration.js`, `graphs.js`, `drugs.js`: figures,
  animated scenes, narration scripts; stubs until the course needs them.

## Question schema

```
{id, lecture, prof, tier:'new'|'old', topic, sub, skill, concept, tags,
 source:'slide'|'transcript'|'both', multi?, lowYield?, dupOf?, readingId?,
 type?:'numeric'|'match', stem, img?, fg?, options:[{t, correct, why}],
 teach, teachImg?, quote?, note?, cite}
numeric: units, answer, tol, steps:[{k, t, why}]
match:   left, right, pairs:[{l, r, why}]
```

Rules every question obeys (the checks enforce most of them):
- One correct option, or `multi:true` with two or more correct and a
  distractor; a select-all stem ends "Select all that apply."
- The professor's spoken words key the answer; then the slides; then the
  readings, and only as discussed in class. A slide the professor did not
  reach gets `lowYield:true` and a note; when a later lecture covers it, the
  question gets the quote, loses `lowYield`, and its cite adds the transcript
  date.
- Every number, name and claim in stem, options, why, teach, quote, cite or
  definition is on the cited slide or in the transcript. If it cannot be
  pointed at, it is not written. No placeholder figures.
- `quote` is an exact transcript substring, transcription errors kept;
  segments may be joined with " ... ". The verifier tests this by script.
- When the transcript and the slide disagree, `note` states both and keys what
  was said; the conflict goes to the lecture's notes file.
- Stems ask the subject in the professor's own formats from `STYLE.md`; never
  "what does the slide say"; no reference to the lecture, deck or drill.
- Options short and parallel; the correct one never the longest; reasoning in
  `why`, never in the option text. `teach` explains the mechanism in two to
  four sentences, not a restatement of the answer.
- Every question the professor put to the room, with the answer they accepted,
  becomes a question in their wording.
- Decks with no printed slide numbers are cited by slide title.
- Expand each abbreviation once. Literal language: no metaphors, no study
  advice, no sentence about the drill itself.
- `concept` groups wordings of one idea; `dupOf` keeps two wordings off one
  paper; `lowYield` keeps an aside off the paper; `readingId` ties a question
  to a reading card. Tell-apart rows each get a question that asks the
  separating feature.

### Verbatim items (polls, quizzes, practice exams, Jeopardy)
- Word for word under `sub:"verbatim"` with the tag `pollev`, `quiz` or `jeopardy`
  and the professor's key; the checks exempt these from the longest-option
  and option-wording rules. A short-answer item is kept as multiple choice
  with a note that it was free response.
- Record in `STYLE.md` what the item set shows about the professor's levels
  (for example: polls for discussion, quizzes graded and more detailed, exam
  "could likely be harder"), and quote the professor's own words on that.

## Checks (run all, every time)

```
python3 build.py && node test.js && node style_check.js && node stepper_test.js
NODE_PATH=$(npm root -g) node browser_test.js    # Chromium + Playwright, about five minutes
python3 cite_check.py                             # needs the decks on disk
```
Plus a Playwright smoke script for any new page: anchors resolve, no
horizontal overflow at 390 px, no page errors. A check that cannot run reports
`NOT RUN`, never passed.

## Delivery cycle (every change)

1. Build and run the checks; the full browser test before any merge.
2. Commit on the work branch with a descriptive message; push.
3. Open a pull request (checks named in the body, skips stated), squash-merge
   it, merge main back into the work branch.
4. Republish the built HTML as the shared artifact (same file path and URL);
   confirm the GitHub Pages deployment of the merged commit reached `success`.
5. Add the change-log bullets (at most 120 characters each) in the same
   commit; update `claude/drill-app-state.md` at the end of the session.
6. Report: what changed, which checks ran and which did not, what is still
   missing and what is needed next.

## Mode 1: new course

1. Copy the template into `src/`. Fill `course.js` from the syllabus; propose
   the skill taxonomy and the exam/module map and confirm both. Start
   `STYLE.md` with the exam facts and `notes/EXAM1.md` with the roster.
2. Ingest the first lecture (Mode 2). Build, run the checks, deliver, create
   `claude/drill-app-state.md`.

## Mode 2: add a lecture

1. Read `claude/drill-app-state.md` and the exam's notes file. Confirm the deck,
   the transcript and the readings are in the Project or Drive before asking.
   Save the transcript and the deck text to the scratchpad (download the
   transcript; read the deck as text when the PDF cannot be fetched).
2. Add the lecture to `course.js` and `DATA_FILES`; write the `LINKS`/sub map
   entry and the page map entry for its exam.
3. Run the `lecture-writer` agent (one per lecture; two lectures run in
   parallel) with the brief in `.claude/agents/lecture-writer.md`: it writes
   `q_<LID>.js` and the fragments (guide nav and sections, reference tables,
   tell-apart table, glossary terms, links map, STYLE.md section, notes,
   report). Give it the scope split when a day finished the previous deck.
4. Integrate the fragments by script: append nav lines and sections to the
   exam's guide, renumbering headings; append reference and tell-apart tables;
   merge glossary terms (ids checked); fill the links map; append the STYLE.md
   section; copy the notes file. Resolve carry-overs the report names (drop
   `lowYield`, add quotes and transcript dates on earlier questions the
   lecture completed).
5. Run `bank-verifier` on each new file (findings only), then
   `verify-fix-applier`; fix anything it could not apply.
6. Build, all checks, browser test, smoke, deliver (Delivery cycle). Update
   the exam blurb's "in the bank so far" line and `notes/EXAM<N>.md`.

## Mode 2b: verbatim items

Polls from the deck or screenshots, practice quizzes with their keys, Jeopardy
and review items: into `STYLE.md` verbatim with the professor's verdicts, then
into the bank as verbatim items (above). Compare the set with the bank and
record what it shows about the exam's level.

## Mode 3: exam build

1. Set the blueprint in `course.js` from the announcement; set `activeExam`.
2. Add the review list, practice exam and prep sheet to `STYLE.md`; check the
   bank against the stated scope and fill holes.
3. Review round with agents in parallel, slices of about 100 questions (Mode 4
   findings format); apply accepted rewrites by script; keyed answers change
   only with a quoted source.
4. Objective guides: one section per objective, the slide's points in slide
   order with transcript quotes, the professor's poll on it with each option
   judged, how the professor asks it; verifier agents check every line.
5. Build, all checks, deliver, state doc, and one line on how to publish.

## Mode 4: bank review

Adversarial only, with the `bank-verifier` brief: is the keyed option right per
the source; is a distractor also defensible; is every claim in `why` and
`teach` sourced; does the cite point at the slide that carries it; does the
stem give the answer away; is there a duplicate. Per finding: id, severity,
exact quote, source quote, fix. Skip clean questions. Then `verify-fix-applier`.

## Mode 6: readings page and listen deck

1. Make the reading-to-lecture list from the syllabus and the Drive folders;
   confirm it with the user before writing (which file is which chapter,
   mismatched chapter numbers, missing files).
2. Run `reading-card-writer` (two or three readings per agent, in parallel):
   one JSON card per reading from the reading's text and the transcripts.
   Fill the `META` table in `gen_readings.py` (exam, lecture ids, status,
   Drive id, links). Tag the questions that test a reading with `readingId`.
3. Run `listen-script-writer` for the exam's readings (one talk of 1,800 to
   2,700 characters each, spoken form, facts from the cards only). Lay the
   scripts out in `notes/READINGS_LISTEN_SCRIPTS.md`, report the count,
   characters and estimated cost, and generate clips only after the user
   approves, one take per clip, named `audio/rd-<id>.mp3`. Until then the
   device voice reads the scripts.
4. Build, checks, smoke at phone width, deliver.

## Mode 7: learning-experience review

Run `learning-presentation-specialist` (`.claude/agents/`): it inspects the
repository and the rendered site at phone, iPad and desktop widths, follows the
student journeys, and writes a ranked recommendations report to
`notes/UX_REVIEW_<date>.md` with the eight-point standard per item. It changes
nothing. Apply items only when the user picks them; a stale text it catches in
your own ingest is yours to fix at once.

## Mode 8: daily material check

Create one scheduled routine per course that fires into the working session on
class mornings: search the course's Drive folders (readings, transcripts,
decks) for files from the last day, remind the user what to add for today and
yesterday by file name, and say what a new lecture needs before ingest. It
never ingests, builds or publishes on its own. "Stop the daily check" disables
it.

## Mode 5: scheduled ingest (only when asked, per course)

As before: one scheduled task per course with the scheduled-task tools; its
prompt is standalone (load this skill, open the course's Project, read the
state doc, ingest what is new with Mode 2, deliver, update the state doc;
nothing new, stop without output). Never create one for a course that has
ended.

## Narration

Recorded clips (ElevenLabs) for figure steps, question explanations, scenes,
drug walkthroughs and the readings listen deck; the site works with sound off
and falls back to the device voice when a clip is missing. Before generating:
report clip count, characters and estimated cost; one take per clip; never
repeat a generation call. Scripts are written in spoken form and checked for
written forms the voice would misread.

## Publishing and security

- Push from the session; open and squash-merge the pull request; republish the
  artifact; confirm Pages. If a push is refused, deliver the built HTML and a
  zip of changed `src/` files with the upload steps.
- A token lives only in `.git/config`, never in tracked files, bundles or zips.
- The site is shared with classmates: personal names and mnemonics stay out of
  the shared build unless the user asks for them.

## Delivery standard

One short report: what changed, which checks ran (skips named), what is
missing and what is needed next, with the numbers that matter in a table.
Never claim a check passed that did not run. A fact that could not be sourced
is left out and said so, never filled in.
