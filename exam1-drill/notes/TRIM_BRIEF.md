# Trim brief — explanations must explain the tested concept, nothing else

The learner's complaint: the "From the textbook" blocks (and some `teach` blocks) carry material that does not help answer the question or understand the concept it tests. Example of what is wrong: a question asking which drug is an α1 agonist got a textbook block about eye drops, mydriasis, and the history of the word "adrenoceptor". What was wanted: what it means to be an α1 agonist.

## Rules for every `reading` entry in your file
1. At most 2 sentences, at most 45 words in total. Count them.
2. Every sentence must pass this test: "If the learner did not know this, could they get this question wrong or misunderstand the concept it tests?" If no, delete the sentence.
3. State the concept, not the context: no clinical examples, no history, no naming conventions, no figure or table numbers inside the sentence (keep those in `sec`), no "for example" tangents unless the example IS what the question tests.
4. Only shorten and rephrase what is already there (it was sourced from the chapter). Add nothing new. If nothing in the entry passes rule 2, delete the entire `reading` field for that question.
5. Keep `src` and `sec` as they are (shorten `sec` if it lists three sections; keep the one the surviving sentences come from).
6. Literal language, no metaphors, no "the chapter"/"the textbook"/"the slide"/"the lecture" phrasing.

## Rules for `teach`
- If a `teach` block runs past ~70 words or has more than one `{h,t}` section, cut it to the concept the question tests, using the same test as rule 2. Do not add anything. Keep it at least one full sentence.
- `why` texts: leave unless one is longer than ~30 words, in which case cut it to the error the option reveals.

## Check and report
`cd /home/user/Intro-Pharmacology-/exam1-drill/src && python3 build.py && node test.js && node style_check.js` must pass (failures in other q files are not yours). Report: how many readings kept, deleted, and the longest surviving one (word count). Do not commit.
