# Prompt: add narrated guide walkthroughs with synced slides to another drill

Paste the block below into a Claude Code session on the target repository (for the PHAR 4221 Basic Pharmacokinetics
drill: lglouis3-create/Basic-Pharmacokinetics-). Attach the source repository with add_repo if the session cannot
read it.

```
Add narrated guide walkthroughs to this drill, the same way lglouis3-create/Intro-Pharmacology- built them for its
Exam 3 and Exam 4 guides (read that repo on its main branch first; attach it with add_repo if needed). Each guide
section gets a "Listen: walkthrough" bar. The player reads the section part by part, highlights the transcript line
being read, and shows the lecture slide that part discusses beside it, changing slides as the narration moves on.

Read these files in Intro-Pharmacology- before writing anything:
- exam1-drill/src/app.js: the block that starts at the comment "Guide walkthroughs" (SLIDE_BASE, gwBars, gwPanelHTML,
  gwShow, gwReading, gwOpen, gwPlay, gwPause, gwEnd, gwMedia and the click, key and change handlers). This is the player.
- exam1-drill/src/gen_walk.py and exam1-drill/src/walk/*.json: the script format and its validation.
- exam1-drill/src/build.py: how guide_walk.js and the GW_CLIPS list are generated and loaded.
- exam1-drill/src/shell.html: the .gw* styles.
- exam1-drill/notes/WALKTHROUGH_SCRIPT_BRIEF.md and WALKTHROUGH_VERIFY_BRIEF.md: how scripts are written and checked.

Steps:
1. Slides. Render every lecture deck PDF in this course to slides/<deck>-NN.jpg (PyMuPDF, 1280 px wide, JPEG quality 70)
   and write src/walk/decks.json ({deck key: {name, n}}). Use the instructor's clean decks; check for handwriting before
   using a student's annotated copy, and keep classmates' names off the site. Write a text index, one line per slide:
   [deck:page] slide text.
2. Scripts. For each guide section, one src/walk/<section id>.json: {"id", "title", "segs": [{"text", "slide":
   "deck:page" or null, "reading": id or null, "table": n (optional: show the section's n-th guide table instead of a
   slide)}]}. 3 to 7 parts per section, 40 to 130 words each, about 250 to 500 words per section, written only from
   the guide section's own text (already verified against the professor's sources). Every part names the single slide
   it discusses, so the slide changes as the narration advances. For calculation sections, say each step of the worked
   example in words (the relation, the substitution, the unit cancellation, the result with units), and point the part
   at the slide or guide table that shows that step. Spoken form: numbers and units in words, no symbols or
   parentheses, abbreviations spelled as letters, the reason before the numbers, no study advice, no sentences about
   the slides or the site, literal language.
3. Check. Have reviewer agents compare every sentence with its guide section and its slide (fact, distortion, wrong
   slide, form) and apply their fixes before any recording.
4. Player. Port the player code and styles; have gen_walk.py build guide_walk.js, and build.py list audio/gw-*.mp3 as
   GW_CLIPS. The player plays a recorded clip per part when one exists, else the device voice; keeps the slide in step
   with the part; lets the student browse the deck, open a slide full size, change speed, continue to the next
   section, resume where they stopped, and use K or Space and the arrow keys; puts the transcript first on phones.
5. Test with Playwright at 390 and 1200 px: every section opens, every slide loads, parts advance and the slide follows,
   pause and resume hold the position, no horizontal scroll, no console errors. Then run the repo's own checks.
6. Recording. Report the character count and the cost estimate before any paid audio. Record only after the user
   approves, one clip per part named audio/gw-<section id>-<part index>.mp3, and confirm every clip downloads and its
   length fits its word count.
7. Commit, push, open and merge the pull request as this repo does, publish, and update the state doc and changelog.
```
