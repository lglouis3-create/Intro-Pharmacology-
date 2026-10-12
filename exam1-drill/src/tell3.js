const TELL3_HTML = `
<p class="sub">Pairs that share wording: the feature that separates them and the trap a question sets. Source shorthand: Tox = Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf (cited by slide title); T = transcript date.</p>

<h3 id="tell3-words">The words and the principles</h3>
<table class="reftab"><thead>
<tr><th style="width:20%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:12%">Source</th><th style="width:9%">Question</th></tr></thead><tbody>
<tr><td>Toxin vs toxicant</td><td>Toxin: made by a biological system (snake venom). Toxicant: made by human activity (smokestack emissions)</td><td>Calling a venom a toxicant because it is "poisonous"</td><td>Tox ‘Definitions’; T 10/9</td><td data-q="L13-001">L13-001</td></tr>
<tr><td>Bioactivation vs detoxification</td><td>Bioactivation: metabolism to something more harmful (acetaminophen → NAPQI by CYP2E1). Detoxification: to something less harmful (glucuronide, sulfate)</td><td>Treating all metabolism as detoxification</td><td>Tox ‘ADME: Metabolism’; T 10/9</td><td data-q="L13-017">L13-017</td></tr>
<tr><td>Most common route vs most effective route</td><td>Most common: oral. Most effective at delivering a toxic agent: intravenous</td><td>Answering "oral" to an effectiveness question</td><td>Tox ‘Exposure: Route’; T 10/9</td><td data-q="L13-007">L13-007</td></tr>
<tr><td>Acute, subacute, subchronic, chronic</td><td>Less than 24 hours; less than 1 month; 1 to 3 months; more than 3 months</td><td>Sliding subacute and subchronic into each other</td><td>Tox ‘Exposure: Duration’; T 10/9</td><td data-q="L13-010">L13-010</td></tr>
<tr><td>Single vs repeated exposure</td><td>Benzene once: headache, sleepiness. Benzene daily for years: leukemia</td><td>Expecting the chronic effect to be the acute effect, only stronger</td><td>Tox ‘Single vs. Repeated’; T 10/9</td><td data-q="L13-011">L13-011</td></tr>
<tr><td>Chronic effect vs immediate effect of a chronic exposure</td><td>A chronic exposure can also give an immediate effect after each exposure (the daily headache from the unrepaired leak)</td><td>Reading "chronic" as "no effect until later"</td><td>Tox ‘Single vs. Repeated’; T 10/9</td><td data-q="L13-013">L13-013</td></tr>
</tbody></table>

<h3 id="tell3-curves">Dose and dose–response</h3>
<table class="reftab"><thead>
<tr><th style="width:20%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:12%">Source</th><th style="width:9%">Question</th></tr></thead><tbody>
<tr><td>Individual vs population dose–response</td><td>Individual: each dose's response (percent enzyme inhibition), shows multiple targets. Population: fraction responding, gives LD50 and threshold</td><td>Reading an LD50 off an individual curve</td><td>Tox ‘First’ and ‘Second Dose-Response Relationship’; T 10/9</td><td data-q="L13-025">L13-025</td></tr>
<tr><td>LD50 vs threshold on the cumulative curve</td><td>LD50 at 50% mortality; threshold at the lowest dose with a response</td><td>Reading the threshold at the start of the steep part</td><td>Tox ‘Second Dose-Response Relationship’; T 10/9</td><td data-q="L13-026">L13-026</td></tr>
<tr><td>Essential U-shape vs hormesis</td><td>Essential (iron): deficiency, a region of homeostasis, toxicity. Hormesis (red wine): benefit then harm, no homeostasis</td><td>Giving red wine a homeostasis region</td><td>Tox ‘Shape of Dose-Response’; T 10/9</td><td data-q="L13-027">L13-027</td></tr>
<tr><td>Threshold vs linear no-threshold</td><td>Threshold: no response below a dose. Linear: a response possible from the first molecule, the carcinogen model</td><td>Giving every agent a threshold</td><td>Tox ‘Threshold Dose’; T 10/9</td><td data-q="L13-029">L13-029</td></tr>
<tr><td>Threshold at 24 months vs 33 months (2-AAF)</td><td>Lower at 33 months because the cumulative dose was higher</td><td>Calling the animals more sensitive instead of more dosed</td><td>Tox ‘More on Threshold Dose’; T 10/9</td><td data-q="L13-030">L13-030</td></tr>
<tr><td>TI vs MOS vs MOE (not yet taught)</td><td>TI = toxic dose / therapeutic dose, no slope. MOS = TD1 / ED99, slope. MOE = NOAEL / exposure, repeated non-therapeutic exposures</td><td>Picking TI for the slope question</td><td>Tox ‘Values Developed from Dose-Response’</td><td data-q="L13-032">L13-032</td></tr>
</tbody></table>
`;
