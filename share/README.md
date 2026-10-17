# Share kit: what the PHAR 4344 exam drill added, and how to carry it to another course

Source: `lglouis3-create/Intro-Pharmacology-`, folder `exam1-drill/` (built file `exam1-drill/PHAR4344_Exam1_Drill.html`, sources in `exam1-drill/src/`). State of 2026-10-17, after PR #79.

This folder is for two uses:

1. **Another course's drill** (the PHAR 4221 Basic Pharmacokinetics repository, or any drill made from `exam-drill-template/`): `FEATURES.md` says what this drill can do beyond the template and where each piece lives; `PORTING.md` says which files to copy, what to adapt, and how to check the result; `agents/` holds the six agent definitions to drop into that repository's `.claude/agents/`.
2. **The `exam-drill-builder` skill in Claude**: `skill/exam-drill-builder/SKILL.md` is a full replacement draft of the skill with the methods this course settled on (transcript-first keying, verbatim polls and quizzes, the two-pass verification, per-exam pages, the Readings page and listen deck, the review agent, the daily material check, the delivery cycle). Paste it over the current `SKILL.md`; nothing in it depends on this repository.

Contents:

| Path | What it is |
|---|---|
| `FEATURES.md` | Inventory of capabilities beyond the template, grouped by what a student sees, how content is produced, and how the site is checked and delivered |
| `PORTING.md` | File-by-file porting guide, adaptation points, checks to run after porting |
| `agents/*.md` | Six project agents: lecture-writer, bank-verifier, verify-fix-applier, reading-card-writer, listen-script-writer, learning-presentation-specialist |
| `skill/exam-drill-builder/SKILL.md` | The upgraded skill text |

Nothing in this kit carries course content: no questions, quotes, figures or professor material move with it. Each course keeps its own bank, pages, STYLE.md and notes.
