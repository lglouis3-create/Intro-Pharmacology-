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

2. **Weak spots: session progress + review plan**
   - `sessionLog()` (answers with no gap over 30 min, ending at the latest), `sessStrip()` (one line above the quiz, refreshed after every answer via `refreshSess()`), `vWeak()`.
   - Review plan: questions not solid on their last three answers, grouped by the first "Explain more" link (`linksFor(q)[0]`), ranked by how much is missing; per concept shows the option chosen and its `why`, the correct answer, the first one or two sentences of `teach`, Read links and a Drill button.
   - `picked` may be a number, an array (select-all) or an object (matching); handle all three.

3. **Step-through figures with motion**
   - `stepper(key, title, steps, h, cap, footer)` in diagrams.js renders Back, Next, Replay step, Play all/Pause and step dots.
   - `stepTo(fig, from, to)` in app.js: shapes present in both steps glide (matched by `data-k`, else tag + class + text/fill; the signature must ignore the `fadein`/`glide` classes), new shapes fade in, removed shapes fade out from a ghost copy; elements with an SVG `transform` attribute do not glide; CSS does the motion; off under `prefers-reduced-motion`.
   - Fade-in keyframes animate only `from{opacity:0}` so shapes keep their own opacity.
   - `notes/ANIMATION_PATTERN.md` explains authoring; `stepper_test.js` checks every step-through (settle state, no shape fades out and back in).

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

## Fixes to carry over

- Exam countdown counts calendar days and shows "today", "in progress" or "over" (`daysToExam`, `examCountdown`).
- Matching-question dropdowns: `select[data-l]{max-width:100%;min-width:0;flex:1 1 220px}` so they fit a phone.
- Floating buttons: `body:has(#backbtn) #xback, body:has(#backbtn) #tback{bottom:64px}`.
- Figure labels: render every figure and every step-through step and check no text runs outside the SVG or overlaps other text (the Exam 1 work used a Playwright scan; wait for transitions before measuring).

## Checks to run after porting

`python3 build.py`, `node test.js`, `node style_check.js`, `node browser_test.js`, `node stepper_test.js` (if steppers were ported), then a Playwright sweep of every tab at 375 px and 1100 px in light and dark: no page errors, no sideways scroll, no "undefined" or "NaN" on screen.
