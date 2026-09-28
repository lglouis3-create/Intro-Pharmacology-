# Quote brief — a lecture quote must add insight or go

The learner's complaint: quotes like “90% says all the above. What is the correct answer? I would say all the above, right?” add nothing. A quote under an explanation is worth showing only when it states the concept, the reasoning, or the professor's own way of putting the distinction.

For every question in your file, judge the `quote` field:
- KEEP if it states the concept or the reason (e.g. “Affinity is on the x-axis; efficacy is on the y-axis.” / “The dose that binds 50% of the receptors, that is your Kd.”). Trim it to the sentence(s) that carry the point; a quote is at most two sentences.
- REPLACE if the transcript (or slide) has a better line for the same concept: you may swap in a different verbatim line from the sources already cited on that question (deck text / transcript). Check the sources in the scratchpad or notes before replacing; never invent or paraphrase a quote.
- DELETE the `quote` field entirely if it is answer-reading ("the answer is C"), class management, poll tallies, a restatement of the option text, or garbled transcription. A question with no quote is fine.
- Never change stems, options, keys, teach, reading, cite.

Sources for replacement quotes: deck text and transcripts are in the scratchpad (`/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/`: t01f.txt = 9/22 transcript, tf.txt = 9/23, trf.txt = 9/24) and the lecture notes in `notes/L0X.md`. If a file is missing, read the transcript from Google Drive (mcp__Google_Drive__read_file_content; load via ToolSearch "select:mcp__Google_Drive__read_file_content"): 9/22 1w7jIllvAmTAPp7lZTbSyWTQ-WOULOqJj, 9/23 1k_ncKVlf9DeXGeLeCs3D8mdDgr8rtawW, 9/24 1ODwE2pYvFwi-V6YDudv8wnd3ZrBcIxbK.

Check: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && node --check <file>` and `python3 build.py && node test.js && node style_check.js` (failures in other files are not yours). Report counts: kept / trimmed / replaced / deleted. Do not commit.
