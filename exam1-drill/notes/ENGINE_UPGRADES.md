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

## Fixes to carry over

- Exam countdown counts calendar days and shows "today", "in progress" or "over" (`daysToExam`, `examCountdown`).
- Matching-question dropdowns: `select[data-l]{max-width:100%;min-width:0;flex:1 1 220px}` so they fit a phone.
- Floating buttons: `body:has(#backbtn) #xback, body:has(#backbtn) #tback{bottom:64px}`.
- Figure labels: render every figure and every step-through step and check no text runs outside the SVG or overlaps other text (the Exam 1 work used a Playwright scan; wait for transitions before measuring).

## Checks to run after porting

`python3 build.py`, `node test.js`, `node style_check.js`, `node browser_test.js`, `node stepper_test.js` (if steppers were ported), then a Playwright sweep of every tab at 375 px and 1100 px in light and dark: no page errors, no sideways scroll, no "undefined" or "NaN" on screen.
