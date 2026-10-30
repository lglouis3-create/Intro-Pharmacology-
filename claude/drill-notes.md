# PHAR 4344 drill: notes for the exam-drill-builder skill review

Written 2026-10-30 from the repository (`lglouis3-create/Intro-Pharmacology-`, branch `claude/eager-heisenberg-ig6y2o`) and the session log that covers 2026-10-23 to 2026-10-30. Earlier sessions (2026-09-25 to 2026-10-22) have no log on hand. Facts for that period come from `claude/drill-app-state.md`, the git history and the files named. Anything that has neither a file path nor a commit hash is marked "from session memory, unverified".

Terms used below:
- "SKILL.md" means the installed skill text at `~/.claude/skills/synced/…/exam-drill-builder/SKILL.md` (245 lines). The line numbers cited refer to that file.
- "Share draft" means `share/skill/exam-drill-builder/SKILL.md` (317 lines). It is a replacement draft written from this course on 2026-10-17 (commit `31740a2`), and it differs from the installed text.
- The template (`exam-drill-template/` in `lglouis3-create/Medicinal-chemistry`) is outside this session's repository scope and was not read. `exam1-drill/notes/ENGINE_UPGRADES.md:6` says the template "is an older version of the same engine". `share/FEATURES.md` is this repository's own inventory, as of 2026-10-17, of what the drill has beyond the template.

## 1. What this drill does beyond the template and SKILL.md, and why the course needed it

The course facts behind these additions:
- Two professors teach in sequence: Dr. Gottlieb, then Dr. Smith (syllabus, Drive file `1lVvIIHHHpXyRMUpi4Y6B5XZonUz1HQkc`, "Instructors").
- There are four exams, on Oct 2, Oct 12, Oct 23 and Nov 2 (same syllabus, exam table).
- "quizzes will cover reading material assigned for that day or the day before" (same syllabus, "Grading criteria").

Features up to 2026-10-17 are listed with file and function names in `share/FEATURES.md`. In brief:
- One site for all four exams, with an exam group per page (`exGroup()`, `PAGE_BY_EXAM` in `app.js`).
- Links from each answer to the guide, reference and tell-apart pages (`linksFor0()`).
- A Readings page and listen deck (`gen_readings.py`, `readings/*.json`, `vReadings()`; first commit `a63d34d`).
- Recorded narration with a device-voice fallback (`NAR`, `NARR_Q`, `audio/`).
- The professor's polls and quizzes kept verbatim in the bank (`sub:"verbatim"`).
- Six project agents (`.claude/agents/*.md`, commit `31740a2`).

Added after 2026-10-17. Each entry has the file and the commit that added it.

| Feature | Where | First commit | Why this course needed it |
|---|---|---|---|
| Smith focus switch: hides Gottlieb exams while her exams are studied, and says what it hides | `app.js` (`FOCUS_EXAM`, `focusNote()`) | `c289f63`; notice `54a3c4a` | Exams 3 and 4 are hers only. `exam1-drill/src/course.js:108` quotes "Doctor Gottlieb will not have questions on the, the last exam." (T) 10/26. The notice was added after your question "Why did the guides and sections remove the exam 3 stuff to be shown ?" (session log, 2026-10-26). |
| Poisoning table drill | `src/poison_table.js` | `96e33bf` | Her posted table key is in STYLE.md (state doc, 10/21 entry). |
| Antidote diagram pages | `antidotes/` (sources `antidotes/src`, hashes checked by `test.js`) | `28018c7` | Built from a 10/19 chat handoff (state doc, "2026-10-21: antidote diagrams"). |
| "Why" question banks | `src/q_WHY_L13.js` to `q_WHY_L17.js` | `63baf64` | 121 questions that ask the reason behind a concept (state doc, "2026-10-22: why questions"). |
| Exam 3 bank rewritten to her quiz format; `core:true` / `coreWhy` and "★ Most likely" buttons | `q_*.js`, `coreBtn()` in `app.js` | `b41039d` | Her format: 4 options, no absolute words, no length cue (state doc, "2026-10-22/23"). |
| Short-answer page | `src/sa3.js` | `f2090d7` | Her Exam 3 format included "2 short answer" (state doc, "2026-10-22 (later)"). |
| Strict exam mode (no backward navigation), opt-in | `app.js`, store key `ns+':noback'` | `f2090d7` | Her 10/21 remark on backward navigation (state doc, "2026-10-22 (later)"). |
| Step-throughs for Exam 3 processes | `src/steps3a.js`, `steps3b.js` | `b2a4e0e` | State doc, "2026-10-22/23". |
| Update notice bar (`version.json`) and place kept across a refresh | `app.js`, `exam1-drill/version.json` | `557d93d`; moved into header `d25bf95` | You asked for it; see section 4. |
| Break video suggested after an exam sim or 30 minutes of study | `app.js` (`motivSuggest`), `exam1-drill/media/break.mp4` | `c22e4bd` | You asked for it; see section 4. |
| Guide walkthroughs: spoken script per guide section, slide shown per part, recorded clips | `src/walk/*.json`, `gen_walk.py`, `guide_walk.js`, `exam1-drill/slides/` | `e1c893b`; recorded `f9b4617` | You asked for it; see section 4. |
| Exam 4 question routing by the guide's Sources lines | `linksFor0()` / `SEC4` in `app.js` | `620890f` | Exam 4 guide sections list their question ids. |
| Exam 4 answer links extended to the reading card and the day's tell-apart table | `linksFor0()` in `app.js` | `d1df52f` | A phone review found Exam 4 answers linked only to the guide (state doc, 10/30 entry). |
| Daily simulated-student paper and click-through | `src/daily/paper.js`, `STUDENT.md`, `glitch.js` | `3536d71`; option shuffle `2395ea7` | You asked for a daily task "running simulations in perfecting questions" (session log, 2026-10-24). |
| Restore-after-restart section in the state doc | `claude/drill-app-state.md`, "Restore after a container restart" | `59f9c38` | The scratchpad is wiped on each container restart (your message, session log, 2026-10-26). |

## 2. Problems hit during the build and how each was fixed

| Problem | Fix | Commit |
|---|---|---|
| A container restart wiped the scratchpad, taking the daily scripts and transcript copies with it (session log, 2026-10-26). | Moved the scripts into `src/daily/`. Added Drive IDs and restore steps to the state doc. Each new lecture adds its restore line. | `3536d71`, `59f9c38`, `7170575`, `66b6946`, `d12d362` |
| Push rejected because the remote work branch was ahead. | Merged origin into the branch, then pushed. | `a27704d` |
| A CHANGELOG edit was committed without a rebuild, so the built page did not show it. | Rebuilt and committed. | `4dd68c7` |
| Long single writes by writer agents stopped partway: the L21 bank stopped at L21-035, and the walkthrough scripts were affected too. | Split the work across smaller agents and wrote in several appends. | `8d20327` then `07ca71a` (L21 bank); `9ac0d4c`, `4ee15d7`, `43e578e` (walkthroughs) |
| L22 guide replacements left instruction text and stray "How she asks it" fragments in guides 29–32. | Removed by regex and by hand. | `b307703` (four fragments). The earlier "drop (…)" cleanup commit is from session memory, unverified. |
| The Drive copy of ADE deck p. 35 carried the user's personal text, including other people's names. | Removed the slide image and set the deck's page count to 34. You then approved rewriting the branch history (filter-branch, force-with-lease). The image was never on `main`. | `3b0f4ed`. The rewritten commit has no surviving hash. |
| Walkthrough parts showed the wrong guide table when tapped out of order. | `gwShow` now skips copies of a table inside `.gwtable`. | `b307703` |
| On the daily practice paper the correct answer was option A on 28 of 40 questions. `paper.js` printed options in stored order, while the site shuffles them. | Seeded option shuffle in `paper.js`. The same draw then gave A 12 times out of 40. | `2395ea7` |
| Exam 4 answers linked only to the guide. A single "Try it" question added an extra finish screen. Several phone buttons were under 40 px. The "Hear the why" safety timer could cut off a slow device voice. | Reading and tell-apart links added. One-question drills return directly. Coarse-pointer rule set to 44 px. Timer lengthened. `browser_test.js` updated for the new return. | `d1df52f` |
| The ElevenLabs workspace quota ran out on 10/18 after 62 of 181 Exam 3 clips. | Recorded later, once you supplied credits. Clips whose scripts had changed were retired. | `85b8bc1` (retired), `a243a93` (all Exam 3 narration) |
| Deck PDFs downloaded at first without page markers, so slide numbers were approximate (state doc, "Known limits"). | Exam 4 decks are converted to text per page with `pdftotext -layout` (state doc, restore section). Slides are rendered to `exam1-drill/slides/`. | `e1c893b` (slides) |
| Pencil marks in a scanned textbook figure. | Removed, and the rule was recorded in `exam1-drill/STYLE.md`. | `fc1a3c7` |
| A refresh sent the student back to Topics, and the result page was lost. | Place saved and restored. Exam result page resumes. | `557d93d`, `d25bf95` |
| Wrong lecture dates for Day 8 and Day 9. | Corrected in `course.js`. | `d39efee` |
| Her figure is a 2004 lansoprazole study, but the assigned paper is Furuta 1998 (omeprazole). | Stated in the guide and on the reading card. | `b6a9aa6` |
| The exam sim clock scaled when `ex.questions` was null. | Scaling now happens only when the count is set. | `c1ae4b0` |
| The break video does not play in the test Chromium, which has no H.264. | Not fixed (state doc, 10/23 entry). | none |

## 3. SKILL.md steps that were wrong, missing, or skipped here, and why

- **State doc location (SKILL.md lines 58–60, 171).** The skill puts `claude/drill-app-state.md` in the course's Claude Project. Here it is in the repository at `claude/drill-app-state.md`. Whether a Project copy also exists is from session memory, unverified.
- **Sources (SKILL.md lines 38, 58).** The skill expects decks and transcripts in the Claude Project. Here they come from Google Drive folders, and their IDs are in the state doc's restore section.
- **`ingest.py`, `harvest.py`, `render_test.js`, `explain_check.js`, `cite_check.py`, `browser_test.py` (SKILL.md lines 104, 153–156, 178).** None of these files exist in `exam1-drill/src/`. The checks run here are `build.py`, `test.js`, `style_check.js`, `browser_test.js` (Node, not Python) and `src/daily/glitch.js`. The state doc's top section records that `cite_check`, `explain_check` and `coverage_check` were not built for this course.
- **Questions per lecture (SKILL.md line 185, "Write 15–30 questions").** Exam 4 banks hold 66 (L18), 44 (L19), 66 (L20), 59 (L21) and 87 (L22) questions (build output, 2026-10-30).
- **Guides "in bullets, not paragraphs" (SKILL.md line 203).** The Exam 3 guide was rewritten to explain the reasoning after your request (section 4), in commit `a243a93`.
- **"No reference to the lecture or deck in the stem" (SKILL.md line 128).** The Exam 3 rewrite removed "she/her key" from stems (state doc, "2026-10-22/23"). Exam 4 stems still refer to her. On 2026-10-30, 134 lines in `src/q_L*.js` contained both "stem" and one of "she ", "her " or "Dr. Smith". The 10/30 daily polish left these unchanged (state doc, 10/30 entry).
- **Mode 5 scheduled ingest (SKILL.md lines 220–229).** Three scheduled tasks fire into this session: nightly ingest, daily polish, and a weekday reading reminder (state doc, 10/24 entry). They read Drive, not a Project, and do not use `--slides-text`. The daily polish task, with simulated students and a UX review, is not in SKILL.md.
- **Exam blueprint (SKILL.md lines 77, 195).** `course.js` defines `pools`. Exam 4 has `questions:null` (`exam1-drill/src/course.js:101`), even though `course.js:103` records "about 55 questions per her 10/28 words".
- **Delivery (SKILL.md lines 188–190, 235–238).** Pushes from this session succeeded, so no zip or git bundle was made. Delivery was: commit, PR, squash-merge, merge main back, republish the artifact, then confirm the Pages deploy (`share/FEATURES.md`, last section). Whether the step "grep the tree and any zip for tokens" ran each time is from session memory, unverified.
- **Personal material (SKILL.md line 239).** The rule covers mnemonics and names. It did not anticipate personal text layered onto a deck page in the student's Drive copy; that case is the ADE p. 35 entry in section 2.
- **Review round in slices of about 100 (SKILL.md line 198).** Here each lecture got two `bank-verifier` agents and a `verify-fix-applier` (`.claude/agents/`), and guides and walkthroughs got separate verifiers (state doc, 10/27–10/29 entries).
- **Installed SKILL.md vs the Share draft.** The two files differ: `diff` shows changes from line 2 onward. The 10/17 draft says "Paste it over the current `SKILL.md`" (`share/README.md`). Whether that was done is not established; the installed file is shorter (245 vs 317 lines).

## 4. Design and content decisions you made

Your words are quoted from the session log at `/root/.claude/projects/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e.jsonl`. That log holds your messages from 2026-10-23 on, plus the summaries' quotes of earlier ones from that session. Decisions before then are recorded in the state doc in paraphrase, not in your words.

| Decision | Your words or the record | Where it landed |
|---|---|---|
| No parenthetical glosses in stems | "Would she include the parenthesis ? I feel like thats a giveaway ?" | `dd925d7`; state doc "Stems: no parenthetical glosses" |
| Star the author items | "yes star them" | state doc 10/23: "Author items starred (user decision)" |
| Record all audio with one voice, readings first | "I have the credits use this ID voice: jNB0TWZK9LKlBbU54wMW  I would like the reading talks first and the you organize priority on what you see fit but do all of them please" | `a243a93` |
| Leave filler out of displayed quotes | "make sure they're aren't any transcript of what she said doesnt include irrelevant parts such as this bc its not important or adds anything" | `327501a`; `tidySpeech` in `app.js` |
| Guides teach the reasoning | "Make it isn't just reiterated what was said but giving the student a proper explanation/ understanding of the concept and reasoning out the reasoning why based on what the article discussed" | `a243a93` |
| Show why the other options are wrong after a right answer | "I noticed if you answer it right it doesn't show you automatically why the others are wrong if that can be fixed please" | `8aa6915` |
| Update bar for classmates | "Is it possible to send out a little status bar above that says \" updated material please refresh when able\"" and "I just dont want them to lose their place when refreshing" | `557d93d` |
| Quiz 4 answers taken as correct | "quiz 4 is correct as i got a 100" | state doc 10/23: "Quiz 4 key" relabeled |
| Break video | "Can we add this where it its a suggested pop as a motivation booster after completing an exam sim or interaction/studying on the site for a certain amount of time ?" | `c22e4bd` |
| Guide walkthroughs | "Can we add audio walk through for guide 1 -39? But evaluate and reduce what doesn't need to be said. Along with a transcript …" and "yes do make sure what the player does is effective and good supplemental material that help in understanding the reading more" | `e1c893b`, `abf2115` |
| Exam 4 guides and daily tasks | "If we can also make the guide like we did in exam 3 that was extremely useful/ maybe have this be a daily task as well. Along with a daily task of perfecting user interaction or glitches and running simulations in perfecting questions." | `9a3f194`, `3536d71`; scheduled tasks (state doc, 10/24) |
| Focus switch says what it hides; walkthrough port prompt | "if that can be clear to the user that  is what happens when having that selected. Also can you give me a prompt on how we execute the guide to also play the slides along with the narration" | `54a3c4a`; `exam1-drill/notes/WALKTHROUGH_PORT_PROMPT.md` |
| Restart protection | "Yes or whatever will save you the most time" | `59f9c38` |
| Purge ADE p. 35 from branch history | "Purge it (Recommended)" (answer to a question, 2026-10-29) | `3b0f4ed` and the history rewrite |
| No Exam 2 material before Exam 1 | state doc: "RULE (user, 10/01)" | state doc, 10/01 entry |
| Keep Gottlieb's inverse-agonist quote on L14-054 | state doc: "(user's call)" | state doc, "2026-10-22: why questions" |
| Textbook over her spoken slips (rhodanese, digoxin Fab, NOAEL) | state doc: "by the user's decision" | `408ddb6`; state doc, "2026-10-22 (later)" |

Standing rules applied in this session: report the cost before any paid audio; no student names; transcripts are never committed. The transcripts rule is written in the state doc's restore section. The other two are from session memory, unverified.

## 5. Planned but not done

- Record the Exam 4 walkthroughs: 84,336 characters, about $15.33. Waiting on your approval (state doc, 10/29 entry).
- Exam 4 "Hear the why" uses the device voice; no clips are recorded (state doc, 10/25 entry).
- Whether the Exam 4 exam sim mixes in Exam 3 toxicology items. Asked on 10/29, no answer yet (state doc, 10/29 entry).
- From the 10/30 phone review: per-day Tell apart drill buttons, reference-table links from Exam 4 answers, and a topic-scoped "Study what is due" on the end screen (state doc, 10/30 entry).
- Concept titles taken from guide headings (state doc, 10/28 entry).
- A second link for the DPD/TPMT tell-apart row, and a Furuta reference table (state doc, 10/27 entry).
- Select-all items all have 3–4 correct out of 4–5; the count is to be varied at the next edit (state doc, 10/25 entry).
- Eleven class B/C spoken slips waiting on you (state doc, "2026-10-22 (later)").
- UX review items R2–R9 from 10/17, recorded as waiting on you (state doc, 10/17 entry). Whether they were handled later is from session memory, unverified.
- Open source questions: `dipiro-e6` may be the wrong posted chapter (state doc, 10/24); her key cites "Pharmacotherapy e6" (state doc, 10/22/23); Quiz 4 Q1 has no correct option (state doc, 10/22/23).
- Material not yet in Drive: her Exam 4 study hints, which she said she would post (state doc, 10/29: "study hints to be posted"), and the Engelbrecht and Shargel source for Table 18-1 (from session memory, unverified). The 10/21 Examples pp. 1–5 were not recorded, and she offered to post a recording (state doc, 10/24).
- `cite_check`, `explain_check` and `coverage_check` were not built for this course (state doc, top section).
- Apply the Share draft to the installed skill: not done, as section 3 shows.
- After Exam 4 (Mon Nov 2), each scheduled task is to report once that it can be stopped (from session memory, unverified).

## 6. State doc

- `claude/drill-app-state.md` in this repository.
  - Its header still reads "Updated 2026-09-28", although entries continue to 2026-10-30.
  - It has no entry dated between 2026-10-01 and 2026-10-12, which is the Exam 2 period.
  - It ends with "Restore after a container restart".
- Whether a copy exists in a Claude Project is from session memory, unverified.
- Related records in the repository:
  - `exam1-drill/CHANGELOG.md` (embedded in the build).
  - `exam1-drill/notes/L01.md` to `L22.md` (per-lecture cues and conflicts).
  - `exam1-drill/notes/EXAM3.md`.
  - `share/` (the 10/17 feature inventory, porting guide, agents and skill draft).
