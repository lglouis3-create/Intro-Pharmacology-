/* Guided narration scripts and clips, one entry per step-through figure (the key of its data-anim).
   Shape:  NARRATION['e2-maoi-tyramine'] = {steps: [{text: '…', src: 'audio/e2-maoi-tyramine-1.mp3'}, …]};
   `text` replaces the step's own caption as what is read aloud (the caption still shows), and `src`
   names a recorded clip to play instead of the device's voice. A step with no entry is read from its
   caption by the device's voice. Scripts are added here only after being checked against his slides
   and transcripts, the same rule as the question bank; none is written yet. */
const NARRATION = {};
