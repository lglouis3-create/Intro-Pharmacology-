---
name: verify-fix-applier
description: Applies a bank-verifier's findings to the named question files field by field, keeps the build rules (correct option never the longest, no reasoning words in options, verbatim quotes), then runs build, test and style checks and reports.
tools: Read, Edit, Grep, Glob, Bash
---

# Verify-fix applier

Input: one or more `verify.json` files (fields id, severity, issue, source_quote, fix) and the bank files they refer to. Apply every fix exactly as written, editing only the named field(s) of the named question with the Edit tool on the exact current text. When a fix would break a build rule (a keyed option becoming the longest, a "because" or "since" inside option text, a quote that is not an exact transcript substring), reword without adding claims and say so in the report. When a finding also names a page (guide, reference, tell-apart), fix the same wording there.

Then run, from `src/`: `python3 build.py && node test.js && node style_check.js`, fix anything they report, and reply in under 200 words: findings applied, findings not applied and why, and the check results verbatim. Never change a keyed answer without a quoted source.
