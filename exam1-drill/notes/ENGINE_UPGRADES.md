# Engine upgrades to port to other drills

Source: `lglouis3-create/Intro-Pharmacology-`, folder `exam1-drill/` (PHAR 4344 Exam 1 drill), PRs #29–#45, 2026-10-02.
Code is in `exam1-drill/src/`: `app.js` (engine), `shell.html` (CSS), `diagrams.js` (figures), `build.py`, tests.

Port **behaviour, not content**. Do not copy Exam 1 questions, figures, quotes or the professor's topic counts into another course. Each item names where the code is so it can be adapted to the target engine, which may differ (the exam-drill-builder template in `Medicinal-chemistry/exam-drill-template` is an older version of the same engine).

## Course-agnostic features (port these)

1. **What's new card + short change log**
   - `newsCard()`, `NEWS_KEY`, `newsId()` in app.js; card shown on Topics; "Got it" stores the newest entry seen per browser.
   - `CHANGELOG.md`: newest first, `## date (title)` then `- bullet` lines, one short line each. `build.py` embeds it.
   - `style_check.js` fails on any change-log bullet over 120 characters.
   - Rule: every update adds its bullets to the change log in the same commit.

2. **Weak spots: session progress + concept-level remediation**
   - `sessionLog()` (answers with no gap over 30 min, ending at the latest), `sessStrip()` (one line above the quiz, refreshed after every answer via `refreshSess()`), `vWeak()`.
   - Concepts, not questions: answers are grouped by `q.concept` (`conceptOf(q)`, `CQ`, `logByConcept()`); every answer goes through `noteAnswer(q, entry)` (the three former `S.log.push` sites: the quiz, the all-on-one-page drill, the exam), which pushes the log entry and refreshes `S.c[concept] = {s, m, hist, box, due, r}`. `rebuildConcepts()` derives the whole of `S.c` from `S.log` when it is missing (older exports), so the log stays the source of truth; `syncConcepts()` recomputes it on each render of the page.
   - Status rules (`conceptRecord()`; a miss = wrong, or right but marked "I guessed"): `unfamiliar` seen once and missed once · `struggling` ≥2 misses, or under 60% on the last 5 with ≥2 attempts · `improving` missed before, last 2 solid, not mastered · `mastered` ≥3 solid answers on ≥2 different questions across ≥2 sessions, no miss in the last 3 · `returning` was mastered then missed (listed with the strugglers, marked "returned") · `learning` right so far, not weak, not mastered. One right answer never masters.
   - Card per weak concept (`conceptStats()`, `conceptTitle()`, `conceptLine()`): status with its evidence line (exact counts), the wrong option chosen more than once with its `why`, partial credit on a select-all ("2 of 3 right, 1 wrong tick", from the stored `picked`), the answer, the idea (`planIdea`), a folded "More" with the full teach, Practice concept and the Read links (`linksFor`). Strugglers first (misses × recency × tier; verbatim polls weigh 1.5×), then unfamiliar, then improving; mastered concepts fold away.
   - Practice concept (quiz mode `'concept'`: `startConceptQuiz()`, `pickConcept()`, `conceptDone()`): the concept's other wordings first (a `dupOf` sibling of the one missed, then one not seen this session), two of them when it has two, then one step up (the next ladder tier, else a question from the same section); the same question is not served twice within 10 minutes while another exists; three per concept at most; the session ends with a per-concept summary ("2 of 2 right, now improving").
   - Spaced review: a mastered concept gets a check at the pace's box intervals (`box` 3 at mastery, one up per solid answer; `conceptDue()` = the later of that and its questions' due); "Due for spaced review (n)" lists and runs them (one question each); a missed check makes it `returning`.
   - Stable identifiers: `ID_ALIASES` (old question id → new) is applied in `normalize()` to `S.log`, `S.q` (records merged) and `S.flags`; `CONCEPT_ALIASES` (old concept → new) to `S.c` and every concept lookup. Log entries whose id is no longer in the bank stay in `S.log` and are ignored by every view. Concepts are derived from the current bank at render time, so a renamed concept regroups. **Rule: when an id or a concept changes, add the old → new pair to `ID_ALIASES` / `CONCEPT_ALIASES`.**
   - `picked` may be a number, an array (select-all) or an object (matching); `wrongPicks()` handles all three.

3. **Step-through figures with motion**
   - `stepper(key, title, steps, h, cap, footer)` in diagrams.js renders Back, Next, Replay step, Play all/Pause and step dots. The step words are HTML under the picture (14 px), in a box that keeps the height of the longest step so the buttons do not jump.
   - `stepTo(fig, from, to)` in app.js (rewritten 10/10) uses the Web Animations API with FLIP (measure, invert, play), animating only transform and opacity and leaving nothing inline afterwards. One easing: `cubic-bezier(.65,0,.35,1)`. Staging: leaving shapes fade and shrink out (280 ms); shapes present in both steps glide (620 ms, from 120 ms; matched by `data-k`, else tag + class + text/fill, ignoring motion classes); new shapes fade and scale in from 380 ms (480 ms); `data-o="n"` delays a shape by n × 150 ms so a chain builds link by link. Shapes that change size morph; colour or text changes cross-fade; a new click picks up mid-motion; rotated labels glide.
   - Play after Pause resumes from the step shown; Play pacing is 1.4 s of motion plus 150 ms per word of the step text, clamped to 3.2–8 s. `prefers-reduced-motion` turns all motion off.
   - Coloured SVG labels mix the figure colour 55:45 with the ink colour (`color-mix`) to keep ≥4.5:1 contrast in both themes.
   - Exam 2 figures are drawn on a 300-wide canvas with no text under 11 units (≥11 px on a 375 px phone); Exam 1 figures use `.lbl.xs` at 10 units (was 8.5) and scroll sideways inside the figure on phones.
   - `stepper_test.js` checks every step-through (settle state, no shape fades out and back in).
   - Sources: aerotwist.com/blog/flip-your-animations, MDN transform-box, web.dev animations-and-performance.

4. **Diagrams tab**
   - `vDiagrams()` with a `DIAGRAMS` list of `[group name, [figure keys]]` (course-specific list), a contents card per group, chips that jump to each figure.

5. **Explain-one cards for tables**
   - A `Why?` button in each row's first cell (`data-xpick="group:key"`), an `Explain one` select (`data-xsel`), an output div (`data-xout`), and one `<template data-x="group:key">` per row in the page HTML.
   - `showExplain()`, delegated change/click handlers, `data-xgo` scrolls to that row's figure, `xBack()` shows a floating "↑ Back to the explanation" button.
   - `scrollToEl()` scrolls so the target sits below the sticky header.

6. **Terms: search and A–Z**
   - `glossWire()`, `termLetter()`, `LETTERS_AZ`: search across term, gist, definition and example (name matches first), letter bar (empty letters disabled; tapping switches to A–Z order), By group / A–Z toggle.
   - One `IntersectionObserver` at a time (`TIO`), disconnected on leaving; floating "↑ Search or pick a letter" button.

7. **Exam blueprint draw** (only if the course has announced topic counts)
   - `course.js` `exams[].blueprint = {sata, parts: [{key, name, n | [min,max] | min | rest}]}`; `drawBlueprint()` and `bpCat()` in app.js.
   - `bpCat` keyword regexes are course-specific; rewrite them for the target course.

## Terms tab: how the glossary is set up

Files: `src/glossary.js` (the data), `src/gen_terms.py` (writes `src/q_TERMS.js`), `vTerms()` and `glossWire()` in app.js.

1. **Data: one object per term in `glossary.js`** (`const TERMS = [...]`, listed in `build.py` PAGES):
   ```js
   {id:'rtk', term:'Receptor tyrosine kinase (RTK, 1-TM)', lecture:'L02', group:'Receptors and signaling',
    def:'Full definition in slide wording.',
    gist:'One-line meaning (≤ ~15 words).',
    scene:'A situation that shows the term in action, without naming it.',
    hook:'Optional: the professor’s example or the trap.',
    confuse:['gpcr','nuclear-receptor'],   // ids of look-alike terms, used as distractors
    fig:'gpcr',                             // optional figure key from diagrams.js
    quote:'Optional verbatim lecture quote.', cite:'Deck file slides ~N; transcript date', src:'both'}
   ```
   - 4–6 `group` names per course (for PK, e.g. Absorption, Distribution, Metabolism, Elimination, Dosing equations).
   - Every field must come from the course's decks or transcripts; `cite` names the deck and slide.
2. **Questions: `gen_terms.py`** runs inside `build.py` and writes up to three questions per term into `q_TERMS.js` (topic `TERMS`, skill `term`):
   - scene → which term (term names as options);
   - term → its one-line meaning (gists as options);
   - full definition → which term.
   - Distractors come from `confuse` first, then the same group; the stem never contains the term's own words; the second question is `dupOf` the first so one exam paper never carries both.
   - The exam draw caps term questions at 15% of a paper (`nTerm` in `drawExam`).
3. **Terms tab modes** (`vTerms`): Glossary (cards with gist, definition, "In action" scene, hook, figure, cite), Flashcards (scene first with the term hidden, then the term and meaning; Knew it / Not sure / Did not know feed spaced repetition under `term:<id>`), Quiz me (the generated questions, counted in Weak spots under the skill "Terms"). A group filter applies to all three.
4. **Search and A–Z** (see item 6 above): `glossWire()` builds the search box, the letter bar, the By group / A–Z toggle and the back-to-search button.
5. Tests: `test.js` checks each term question; `style_check.js` checks that no definition names its own source.

## "Explain more" after every answer

After a question is answered (one at a time, all on one page, or in the exam review), the explanation ends with a row of buttons that open the page section teaching that concept, and a floating button brings the learner back to the same question with their place kept.

- **Where it is drawn:** `explainHTML(q)` is appended after the cite line in `qCard()` and in the exam review.
- **How a question finds its sections:** `linksFor(q)` returns up to three `[view, anchor id, label]` links:
  1. `LINKS`: a list of `[regex, links]`; the regex is tested against `q.concept`, `q.fg`, `q.sub` and `q.tags`; the first match wins. This is the course-specific part: write one row per concept family.
  2. Fallbacks: `BY_GROUP[q.sub]` (term questions), then `BY_LECTURE[q.lecture]`.
  3. A drug-list question always links to the drug-list guide and reference.
- **Targets:** every section a link points to needs an `id`: guide sections `guide-N`, reference `ref-N`, tell apart `tell-<name>`, diagrams `dg-<figure key>`. For a PK drill add an Equations page (`equations.js`, a view `eq`, sections `eq-<name>` such as `eq-half-life`, `eq-clearance`, `eq-vd`, `eq-loading-dose`) and use `['eq', 'eq-half-life', 'Equations: half-life']` in `LINKS`.
- **Going and coming back:** `jump(view, anchor)` pushes `{view, scroll position}` onto `RET`, opens the view and scrolls to the anchor; `backBtn()` shows "← Back to the question" (or the exam, the figures, the map); clicking it pops `RET`, reopens the view and restores the scroll. The quiz and exam state (`Q`, `EX`) are global, so the question is exactly as it was.
- Use `scrollToEl()` (header-aware) in `jump` so the section title is not hidden under the sticky header.
- **Check:** a test that every `LINKS`/`BY_*` anchor id exists in the rendered pages, and that every question resolves to at least one link.

## Answer layout: one at a time or all on one page

- `S.layout` is `'one'` or `'all'`, saved with the learner's progress (`normalize()` defaults it to `'one'`).
- `layoutToggle()` draws two chips, "One at a time" and "All on one page"; it appears on Topics, in the quiz header and on the exam start page. One delegated click handler on `[data-layout]` saves the choice and re-renders.
- Quiz: `renderQ()` sends `'all'` to `renderAll()`, which shows the first 40 cards of the drill with a "show more" button; each card is answered in place and only that card re-renders (`refreshCard()`).
- Exam: `renderExam()` sends `'all'` to `renderExamAll()`; the clock, flags and Submit work the same in both layouts.
- Both layouts share one record of what was answered (`Q.doneIds`), so switching mid-drill never asks a question twice.

## Light, dark or system theme

- A select in the header (`themeSelect()`): System, Light, Dark; saved in the browser under `<ns>:theme`; `applyTheme()` sets `data-theme="light"` or `"dark"` on `<html>` (System removes it).
- CSS: colours are variables on `:root`; dark values are set twice, under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...} }` and under `:root[data-theme="dark"] {...}`, so System follows the device and Light/Dark override it.
- Figures use the same variables (`--ink`, `--muted`, `--line`, `--chip`, `--figA`…`--figE`), so every SVG switches with the theme.

## No name prompt on first visit

- The Intro Pharm drill never asks for a name. Progress is saved under a profile that defaults to `'default'` (`PROFILE = store.get(<ns>:profile) || 'default'`).
- Anyone who shares a browser can type a different profile name on the Progress page (Profile → Switch); that is optional and never shown as a pop-up.
- To remove a first-visit prompt from another drill: delete the `prompt(...)` call at start-up and use the default profile, keeping the optional switch on the Progress page.

## Fixes to carry over

- Exam countdown counts calendar days and shows "today", "in progress" or "over" (`daysToExam`, `examCountdown`).
- Matching-question dropdowns: `select[data-l]{max-width:100%;min-width:0;flex:1 1 220px}` so they fit a phone.
- Floating buttons: `body:has(#backbtn) #xback, body:has(#backbtn) #tback{bottom:64px}`.
- Phone figures: `wrap()` puts each SVG in `.svgx`; `fitFigs()` (app.js, a MutationObserver on `#view`) gives a picture whose smallest label would be under 10 px a `--minw` so it scrolls sideways in its own box under 560 px, with a "Scroll the picture sideways" hint.
- Read-strip tables (first row of `th`, no `thead`) stack on a phone like the other tables (`stackTables`), so words are not split.
- `sessStrip()` counts the exam being studied only, as Weak spots does; `planIdea(q)` drops a teach's opening sentence when it is the answer.
- Weak spots reads a question's history through its `concept` (item 2); `S.c` is rebuilt from the log when an older export has none.
- Figure labels: render every figure and every step-through step and check no text runs outside the SVG or overlaps other text (the Exam 1 work used a Playwright scan; wait for transitions before measuring).

## Engine fixes from the independent audit (10/11)

- **Exam persistence:** `EXKEY()` = `<ns>:exam:<profile>`; `saveExam()` writes `{exam, name, qs, i, ans, flag, orders, ends, done, score}` from `renderExam()` (every pick, move and layout change), the all-on-one-page pick handler, the flag handler and `submitExam()`; `loadExam()` validates it field by field at start-up (`EX = loadExam()`, and the page opens on the exam tab when a paper is in progress); `vExam()` submits a paper whose `ends` has passed; `endExam()` deletes the saved paper (`endExam(true)` keeps it across a profile switch). `window.onbeforeunload` returns `''` while a paper is open. `store.del(k)` was added for this.
- **store.get after a failed write:** `FAILED` (a Set of keys whose last `setItem` threw) makes `get()` return the in-memory value instead of the stale stored one.
- **Folded answer card:** `moreHTML(q, hidden)` is appended by `qCard()` and the exam review: visible = verdict, the why of the option chosen and of the right one, the teach, the note and the figure feedback; behind `<details class="qmore fold">More` = the other options' whys, the figure (`q.fg`), the textbook notes, the quote and the cite. Explain-more chips stay visible.
- **Confidence:** after a right answer, Next records "Knew it"; "Not sure" / "I guessed" are small buttons beside it; keys 1/2/3 do the same; the hint names the keys the code accepts (A–J, 1–9). Flashcard "Not sure" counts as right (`st.ok++`), as in the quiz.
- **Matching:** a note under the dropdowns says it is scored all-or-nothing; the verdict adds "n of m pairs right"; the keyboard handler lets Enter check and continue a matching question (letters stay off).
- **"Study what is due":** `pickSR()` sets `Q.ahead` when it serves from the soonest-due fallback; `aheadNote()` prints "Nothing is due; reviewing the soonest due." in the quiz header (both layouts).
- **Flashcards:** `TM.last` is the card just rated; the next pick skips it while another candidate exists (due → unseen → any). The meta line reads "n/N cards seen · d due · u new".
- **Legends:** `foldLegend()` in `examPage()` wraps the run of `<p class="sub">` at the top of a page that match `LEGEND_RX` (Notation:, Cites:, Source shorthand:, Slide numbers marked) in `<details class="legend fold">Notation &amp; sources`, closed by default. Page files are untouched.
- **Topics first screen:** `newsCard()` is a `<details class="card news fold">`, closed on a phone (`PHONE.matches`), open otherwise; the page has no `<h2>` (the header names the course) and no second "updated" stamp.
- **Header:** at ≥561 px the theme select is absolutely positioned at the right of the title row and the nav takes the full width (`nav button{padding:3px 7px;font-size:13px}`, `gap:2px`): one row at ≥880 px of bar width, two on an iPad; the phone layout is unchanged.
- **Exam start:** the blueprint is a folded two-column list (`.bpcols`); `bpState()` disables the checkbox unless the full paper length is chosen.
- **Performance:** `.fig` and `.guide` have `content-visibility:auto` with `contain-intrinsic-size:auto`; `scrollToEl()` settles on its target after the scroll (content rendered on the way can move it); `jump()` uses `scrollIntoView`, which forces a skipped subtree to render. A `contentvisibilityautostatechange` listener re-measures the sideways-scroll hint. `memoHTML(key, sig, build, ref)` keeps the HTML of the Diagrams groups (static), the question map (keyed on the log, flags and filter) and the Graphs list (keyed on the log).
- **Small:** `normalize()` clamps `box` to 0…5 (questions and concepts); `conceptTitle()` uses the ladder name, then the term name, then the moa/soa/adr/ddi forms, then the id's words ("a-vs-b" → "A vs B", a trailing location word in parentheses, drug names capitalised via `DRUGS`), and falls back to the most-missed question's stem (70 characters) for a bag of four or more plain words; `main` keeps 96 px under a floating button (`body:has(#backbtn) main` …).

## Checks to run after porting

`python3 build.py`, `node test.js`, `node style_check.js`, `node browser_test.js`, `node stepper_test.js` (if steppers were ported), then a Playwright sweep of every tab at 375 px and 1100 px in light and dark: no page errors, no sideways scroll, no "undefined" or "NaN" on screen.
