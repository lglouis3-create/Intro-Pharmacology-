# Handoff: Treating Poisonings antidote diagrams (Intro Pharmacology, PHAR 4344)

This package holds the final versions of seven diagrams built in a claude.ai chat on 2026-10-19 for the "Treating Poisonings" lecture. Each diagram is a self-contained HTML page with no external libraries, fonts, or network requests, so it can be added to the pharmacology GitHub Pages site as-is.

## Instructions for Claude Code

1. Copy `site/antidotes/` into the pharmacology GitHub Pages repo (for example as `/antidotes/`) and link `antidotes/index.html` from the site's main page or the matching exam drill.
2. Keep the scientific content, captions, step order, and labels unchanged. The content was checked step by step against the slide figures and course files listed below. Visual restyling to match the site's theme is fine.
3. To restyle, edit `shim.css` (color tokens and text classes) and run `python3 tools/build.py`, which rebuilds every page in `site/antidotes/` from `fragments/` and `shim.css`. Edit diagram content in `fragments/`, never in the built pages.
4. Element IDs (`next`, `back`, `cap`, `pills`, and others) repeat across pages. Each page works only as its own HTML file. Embedding two diagrams on one page requires renaming IDs or wrapping each in an iframe.
5. Every script runs inside its own function wrapper. One earlier version failed because a top-level variable named `top` collided with the browser's `window.top`; keep the wrappers.

## Verification already run

- `node --check` passed on all five interactive scripts.
- Each page loaded in headless Chromium (Playwright, 400 px wide viewport). Every Next button and every example toggle was clicked through all steps. No page errors or console errors were reported.
- Screenshots confirmed layout at phone width. A label overlap on the pralidoxime page (Step 2, "Pralidoxime" against "OR₂") was fixed by moving the label down.
- Not tested: real iOS Safari, dark mode rendering in a browser, and screen-reader output.

## Shared behavior

- Light and dark themes come from `prefers-color-scheme` in `shim.css`.
- Animations are skipped when the viewer has `prefers-reduced-motion` set; each step then jumps to its end state.
- On the step-based pages, Next plays that step's movement, while Back and the step tabs jump straight to the end state of a step.

## The seven pages

### 01. Cyanide antidote pathway: overview (static)
Two columns: cytochrome c oxidase on the left (working, cyanide-bound, freed), hemoglobin on the right (Fe²⁺ → methemoglobin Fe³⁺ → cyanomethemoglobin → rhodanese and thiosulfate → methemoglobin → hemoglobin). Source slide: "Toxicokinetic-Based Treatment: Cyanide example" (Golan Fig 51-4 reproduced in *Treating Poisonings Students Fall 2026*).

### 02. Cyanide antidote small molecules (static)
Line structures of cyanide, thiocyanate, thiosulfate, amyl nitrite, and methylene blue. Methylene blue is drawn with S⁺ to match the slide figure, using ring circles for the delocalized charge.

### 03. Cyanide antidote mechanism (7 steps)
Start (panel A), CN binds (panel B), Step 1 amyl nitrite (electron leaves hemoglobin iron, Fe²⁺ → Fe³⁺), Step 2 cyanide extraction (CN⁻ moves to methemoglobin, O₂ returns to the enzyme), Step 3a sulfur loads onto rhodanese (thiosulfate → Cys–S–S⁻, sulfite leaves), Step 3b sulfur moves onto cyanide (SCN⁻ forms, rhodanese returns to Cys–S⁻), Step 4 methylene blue (electron returns, Fe³⁺ → Fe²⁺).

Course framing: the *Treating Poisonings* slide "Toxicokinetic-Based Treatment: Enhance Metabolism (Or detoxification)" places cyanide under accelerating enzymes "by administering cofactors." The slide "Treatment Removes Toxin from Active Site" lists cyanide again, so steps 1–2 belong to the pharmacologic category and step 3 to the toxicokinetic one.

### 04. Antidote is a receptor antagonist (naloxone, flumazenil)
Toggle between opioid/naloxone and benzodiazepine/flumazenil. Three states: no drug, overdose (toxin activates the receptor; effect line "somnolence, coma" from the Toxidromes table in *Treating Poisonings*), and antidote (antagonist occupies the receptor without activating it).

### 05. Atropine and physostigmine at the cholinergic synapse
Toggle between two scenarios.
- Organophosphate / atropine: the OP blocks AChE, ACh builds up, every muscarinic receptor turns on (SLUDGE); atropine occupies the receptors while ACh stays high.
- Jimson weed / physostigmine: the belladonna alkaloid occupies the receptors (delirium, flushing, ileus); physostigmine blocks AChE, ACh rises, and the extra ACh outcompetes the alkaloid.

Sources: *PCOL-NMJ* deck (atropine as M1, M2, M3 antagonist at muscarinic sites; physostigmine as AChE antagonist and treatment for anti-muscarinic poisoning); Toxidromes table in *Treating Poisonings*; *Chapter 2, Drug Receptors & Pharmacodynamics* (response to a competitive antagonist depends on the concentration of competing agonist).

### 06. Antidote removes toxin from active site (pralidoxime, CO)
Toggle between two scenes.
- Pralidoxime, panel D of the "Pralidoxime example" slide: Start (serine residue with backbone; OP with =O, R₁, OR₂, X), Step 1 (P bonds serine O, HX leaves), Step 2 (pralidoxime N⁺ at the anionic site, oxime O bonds P, P–serine bond breaks, H returns to serine), Step 3 (OP leaves as R₁–P(=O)(OH)–OR₂, pralidoxime regains N–OH), Step 4 aging (from the OP-bound enzyme, OR₂ loses R₂ as HOR₂).
- CO: CO on heme iron, high-concentration O₂ given, O₂ displaces CO.

Sources: "Pharmacological Treatment: Pralidoxime example" and "Treatment Removes Toxin from Active Site" slides in *Treating Poisonings*; *PCOL-NMJ* antidote slide for the anionic site and the proton from the NOH group.

### 07. Antidote by-passes an inhibited pathway (warfarin, vitamin K)
Seven numbered steps in three phases, with the part of the cycle each step uses highlighted and pool counts shown under each vitamin K form.
- Normal cycle: 1 reduced vitamin K reaches the carboxylase; 2 glutamate → γ-carboxyglutamate and vitamin K → epoxide; 3 epoxide reductase (NADH → NAD⁺) recycles the epoxide.
- Warfarin overdose: 4 warfarin blocks epoxide reductase; 5 the reduced pool drains and carboxylation stops.
- Vitamin K treatment: 6 given vitamin K enters the reduced pool; 7 carboxylation resumes while the epoxide keeps building up.

Pool counts (reduced, epoxide, carboxylated) by step: start 3, 1, 0; step 1 2, 1, 0; step 2 2, 2, 1; step 3 3, 1, 1; step 4 3, 1, 1; step 5 0, 4, 4; step 6 3, 4, 4; step 7 2, 5, 5. Reduced plus epoxide stays at 4 through step 5 and rises to 7 at step 6, where 3 vitamin K are added. The counts show direction of change only, not real amounts.

Source slide: "Pharmacological Treatment: Treatment by-passes an inhibited pathway" (warfarin OD treated with vitamin K) in *Treating Poisonings*.

## Open items to check before publishing

These points come from general pharmacology or chemistry, or from a drawing choice, rather than from the slide figures or course files. The 10.19 lecture transcript is now in the course project and may settle some of them.

- Cyanide: Fe²⁺/Fe³⁺ charges and the electron drawn moving in steps 1 and 4 are general chemistry; the slide names the steps only.
- Cyanide: the rhodanese active-site cysteine, the Cys–S–S⁻ intermediate, and sulfite as the leftover are general biochemistry. Splitting step 3 into 3a and 3b is a drawing choice.
- Cyanide: why methylene blue is needed (methemoglobin cannot carry O₂) and why blocking cytochrome c oxidase is toxic are not stated on the slide.
- Receptor antagonist page: the slide calls benzodiazepines toxins "that act as an agonist"; the page follows that framing.
- Atropine: blocks muscarinic sites only and does not restore AChE; pralidoxime is the AChE treatment.
- Pralidoxime: HX leaving in step 1 and the H returning to serine in step 2 are drawn so atoms balance. The *PCOL-NMJ* slide text describing the anionic site and proton donation is partly garbled from scanning; check against the slide image.
- Pralidoxime: the course files do not state what aging means clinically. The common teaching is that the aged enzyme cannot be reactivated.
- CO: "CO-bound heme cannot carry O₂" is general physiology.
- Warfarin: how given vitamin K becomes the reduced form without epoxide reductase is not in the figure or course files. The clinical result of warfarin overdose (loss of functional clotting factors, bleeding) is general pharmacology.

## Package contents

- `site/antidotes/index.html` and the seven built pages
- `fragments/` — source markup and script for each diagram
- `shim.css` — shared color tokens and text classes (light and dark)
- `tools/build.py` — rebuilds `site/antidotes/` from `fragments/` and `shim.css`
