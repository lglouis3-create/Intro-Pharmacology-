# Verify spoken walkthrough scripts against their guide sections

GW = /tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/gw
Scripts: GW/scripts/<section id>.json  {"id","title","segs":[{"text","slide":"deck:page"|null,"reading":id|null}]}
Source of truth: /home/user/Intro-Pharmacology-/exam1-drill/src/guide3.js, the `<section class="guide" id="<section id>">`
block (already verified against the professor's transcripts and slides). Slide text: GW/slide_index.txt (`[deck:page] text`;
handwriting shows up as garbage characters, ignore it). These scripts will be recorded with a paid text-to-speech voice.

Check every sentence of every assigned script:
1. Fact: every fact, number, name, mechanism, comparison and causal claim is stated or directly entailed by the section
   text. A claim the section does not carry is an error, even if true. A quote presented as hers ("She said, ...") must
   match the words in the section (spoken-form changes such as numbers in words are fine).
2. Distortion: a reduction must not change meaning (a dropped "not", "only", "most", a merged list that now says
   something different, a wrong keyed answer for her quiz items).
3. Slide: the segment's slide (look it up in slide_index.txt) is the slide that segment discusses; a better match or null
   when none fits.
4. Form: no class logistics (exam date, format, scope votes), no study advice, no sentences about the audio, slides or
   site, no figurative language, no student names; speech-safe (numbers in words, no symbols, no parentheses, no quotation
   marks, abbreviations spelled as letters or expanded).
Write GW/verify/<section id>.json: {"id", "ok": true|false, "findings":[{"seg": i, "kind": "fact|distortion|slide|form",
"quote": "exact words in the script", "source": "the section's words, or 'absent'", "fix": "replacement text for the whole
segment, or the corrected slide/reading value"}]}. Write a file for every section, ok:true with [] when clean.
Do NOT edit the scripts or the repository. Final reply: per section ok or the count of findings by kind.
