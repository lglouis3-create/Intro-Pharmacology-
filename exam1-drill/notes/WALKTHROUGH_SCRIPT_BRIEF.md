# Brief: spoken walkthrough scripts for Exam 3 guide sections (PHAR 4344, Dr. Helen E. Smith)

The student asked for an audio walkthrough of guide sections 1 to 39, "like an educational podcast", with what does not
need to be said removed, a transcript, and the deck slide being discussed shown while it plays.

Repo: /home/user/Intro-Pharmacology-/exam1-drill/src. GW = /tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/gw
- Source text: guide3.js, the `<section class="guide" id="...">` blocks. These sections are already verified against her
  transcripts and slides. EVERY fact, number, name and quote in a script must come from the assigned section's text.
  Do not add facts from memory or other files. If a section line is unclear, leave it out.
- Slide index: GW/slide_index.txt, one line per slide: `[deck:page] slide text` for decks tox (Principles of Toxicology),
  resp (Toxic Responses), treat (Treating Poisonings), pgx (Introduction to Pharmacogenomics). The section's Sources line
  names slides by title; find the page whose text carries that title. Some slide text includes handwriting picked up as
  garbage characters; ignore it.
- Reading ids (for segments about a reading): aapcc-bb, aapcc-ccb, casarett-ch2, dipiro-e9, marraffa, rodriguez-mozaz,
  katzung-5 (cards in src/readings/<id>.json; use only to pick the id, not for facts).
- Style examples for speech-safe text: src/narration3_audit.js.

## What to write, per assigned section
GW/scripts/<section id>.json:
{"id": "<section id>", "title": "<short spoken title, e.g. Five principles of toxicology>",
 "segs": [{"text": "...", "slide": "tox:7" | null, "reading": "marraffa" | null}, ...]}
- 3 to 7 segments; each segment 40 to 130 words and about one idea. "slide" = the single slide that segment discusses
  (null when none fits). "reading" only when the segment discusses a reading or guideline.
- Total length: about 250 to 450 words; up to 650 for the longest sections (31, 11, 14, 4, 12); 120 to 200 for 8 and 39.
- First segment opens with the section number and topic in one short sentence, e.g. "Section seven. Dose and response."
## Reduce: say what teaches, drop what does not
- Keep: the idea in plain words, the reasoning chains (because / so), the comparisons that separate look-alikes, the traps
  her questions use and why each is wrong, and at most one or two of her quotes that carry a point.
- Drop: the Sources line, question ids, "How she asks it" boilerplate (keep one sentence if it teaches the format of her
  question), dates of lectures unless they matter, repeated statements, long lists read item by item (state the pattern
  and the two or three items that matter most), table headers, anything about the guide, the site, or studying.
- No class logistics (exam date, format, scope votes), no study advice, no sentences about the audio or the slides
  ("as you can see", "on screen"), no metaphors, similes or figurative language, no student names.
## Spoken form (it is read by a text-to-speech voice)
- Numbers and units in words: "fifty percent", "L D fifty", "two thousand twelve", "less than sixty minutes".
- Expand abbreviations on first use or spell as letters ("C Y P two E one", "N A P Q I"); no symbols (≥, →, %, μ, ±),
  no parentheses, no slashes, no quotation marks inside the text; mark her words as: She said, ... (verbatim words, can cut
  with "..." avoided: shorten by quoting a complete clause instead).
- Plain sentences, varied length, second person allowed ("you"), single narrator.
## Finish
Validate each file with python3 -c "import json;json.load(open(F))". Final reply: files written, word counts, and any fact
you dropped because the section text was unclear.
