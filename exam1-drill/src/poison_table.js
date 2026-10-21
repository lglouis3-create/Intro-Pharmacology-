/* Dr. Smith's Poisoning Treatment Table 2026 KEY, transcribed row by row (PoisoningTreatmentTable2026KEY.pdf, pages 1–3).
   Her words on 10/20: "you do need to know the details that I have in my table, my key." Wording is hers, typos kept.
   Each row: poison, short label used in the drill, symptoms or diagnostic methods, antidotes [name, mechanism],
   special considerations [her question, her answer], reference column. */
const POISON_TABLE = [
 {id:'apap', poison:'Acetaminophen', sym:'Nausea/vomiting. Clinical signs of liver failure. Acetaminophen levels can be measured in the blood.',
  anti:[['N-acetylcysteine', 'Replenishes glutathione']],
  special:[['At what time after OD does the antidote lose effectiveness?', 'About 8 hours after overdose.'], ['Should you still give it past that time point?', 'Yes']],
  ref:'Marraffa article', page:1},
 {id:'alc', poison:'Toxic alcohols', sym:'Methanol active metabolites can cause anion-gap metabolic acidosis and ocular toxicity. Ethylene glycol active metabolites can crystalize in the microvasculature; renal toxicity is common.',
  anti:[['Ethanol or fomepizole', 'Inhibition of alcohol dehydrogenase']],
  special:[['There are two possible treatments. Is there an advantage of one therapy over the other? Why?', 'Fomepizole is stronger Alc Dehydrogenase inhibitor and has fewer adverse effects than ethanol.']],
  ref:'Marraffa article', page:1},
 {id:'bzd', poison:'Benzodiazepines', sym:'CNS depression and relatively normal vitals. Benzodiazepine levels can be measured in the blood.',
  anti:[['Flumazenil', 'Competitive antagonist of benzodiazepine receptor']],
  special:[['What are some concerns when choosing to use this antidote?', 'Flumazenil can cause withdrawal symptoms in a benzodiazepine dependent patient.']],
  ref:'Marraffa article', page:1},
 {id:'bb', poison:'Beta blockers', sym:'Hypotension, bradycardia, altered mental status, respiratory depression',
  anti:[['Atropine', 'Atropine: increase heart rate.'], ['Calcium', 'Calcium: Try to drive calcium into cardiac cells'], ['Glucagon', 'Glucagon: increase cardiac cellular cAMP to increase heart rate'],
        ['HIET', 'HIET: mechanisms of inotropic effects not understood.'], ['Vasopressors', 'vasopressors: increase blood pressure.'], ['IV FE', 'i.v. 20% fatty acid emulsion: Acts as a sink for the drug if the drug is lipophilic enough.']],
  special:[['What can distinguish between Beta Blocker OD compared to Calcium Channel Blocker OD?', 'BB OD may have altered mental status.']],
  ref:'Marraffa article', page:'1–2'},
 {id:'ccb', poison:'Calcium channel blockers', sym:'Hypotension, bradycardia, but often alert.',
  anti:[['Same as above for BB OD.', 'Same as above for BB OD.']], same:'bb',
  special:[], ref:'Marraffa article', page:2},
 {id:'dig', poison:'Digoxin', sym:'Bradycardia, arrythmias, elevated serum potassium, nausea/vomiting. Digoxin levels can be measured in the blood.',
  anti:[['Digoxin specific antibody fragments', 'Binds digoxin, will be renally eliminated']],
  special:[['Once you give the antidote, why is checking serum digoxin concentrations not helpful?', 'The total dig concentration (Free and bound to Fab) will be increased; can’t use this measurement to calculate more Fab doses.']],
  ref:'Marraffa article', page:2},
 {id:'tca', poison:'Tricyclic Antidepressants', sym:'tachycardia, dilated pupils, dry mouth, agitation, seizures, sometimes vasodilation, elongated QRS interval, reduced cardiac contractility',
  anti:[['Intravenous fluids, dopamine or norepinephrine, sodium bicarbonate for elongated QRS interval', 'These options are mostly supportive care, trying to maintain blood pressure. Sodium bicarbonate counteracts the inhibition on sodium cardiac channels']],
  special:[], ref:'Basic and Clinical Pharmacology, Chapt 58', page:2},
 {id:'opi', poison:'Opioids', sym:'Somnolence, coma, decreased heart and breath rates, decrease pupils',
  anti:[['naloxone', 'Competitive antagonist of opioid receptors']],
  special:[['What is a concern when using this antidote in chronic opioid users?', 'It can trigger withdrawal']],
  ref:'Marraffa article', page:3},
 {id:'sal', poison:'Salicylates', sym:'hyperventilation and respiratory alkalosis then metabolic acidosis, hyperthermia, confusion and seizures',
  anti:[['Supportive care, IV Sodium bicarbonate', 'Renal ion trapping to enhance elimination']],
  special:[], ref:'Basic and Clinical Pharmacology, Chapt 58', page:3},
 {id:'su', poison:'Sulfonylureas and miglitinide', sym:'hypoglycemia',
  anti:[['octreotide', 'Inhibits insulin release from the pancreas']],
  special:[], ref:'Marraffa article', page:3},
 {id:'fe', poison:'Iron', sym:'Vomiting, abdominal pain, and diarrhea within 1 to 6 hours. Lethargy, coma, seizures, bloody vomiting, bloody diarrhea, and shock within 6 to 24 hours. Hypotension and tachycardia within 6 to 24 hours. Liver dysfunction and failure possible in 2 to 5 days.',
  anti:[['Deferoxamine', 'Chelates the circulating ferric iron']],
  special:[], ref:'Pharmacotherapy: A Pathophysiologic Approach, 13th Ed. Chapt e6', page:3},
 {id:'op', poison:'Organophosphate Insecticides', sym:'Acetylcholine excess: SLUDGE or DUMBELLS',
  anti:[['Atropine', 'muscarinic acetylcholine receptor antagonist'], ['Pralidoxime', 'Removes OP from acetylcholinesterase']],
  special:[], ref:'Pharmacotherapy: A Pathophysiologic Approach, 13th Ed. Chapt e6', page:3}
];

/* Antidote diagrams from the 10/19 lecture chat (antidotes/ at the site root, built by antidotes/src/build.py).
   Each page runs on its own; the drill shows it in a frame. rows: poisoning-table rows the diagram explains;
   match: words in a question's stem or concept that bring up the diagram's chip under "Explain more".
   note: what she said on 10/19 where it adds to or differs from the diagram (transcript wording kept). */
const ANTIDOTE_DIAGRAMS = [
 {slug:'01-cyanide-pathway-overview', title:'Cyanide antidote pathway: overview', short:'Cyanide: overview', rows:[], match:/cyanide|methemoglobin|rhodanese|amyl nitrite|methylene blue/i, note:'cn'},
 {slug:'02-cyanide-small-molecules', title:'Cyanide antidote small molecules', short:'Cyanide: molecules', rows:[], match:null, note:'cn'},
 {slug:'03-cyanide-antidote-stepper', title:'Cyanide antidote mechanism', short:'Cyanide: step by step', rows:[], match:/cyanide|methemoglobin|rhodanese|amyl nitrite|methylene blue/i, note:'cn'},
 {slug:'04-receptor-antagonist-naloxone-flumazenil', title:'Antidote is a receptor antagonist', short:'Naloxone, flumazenil', rows:['opi', 'bzd'], match:/naloxone|flumazenil/i, note:'fz'},
 {slug:'05-cholinergic-atropine-physostigmine', title:'Atropine and physostigmine at the cholinergic synapse', short:'Atropine, physostigmine', rows:['op'], match:/atropine|physostigmine|jimson|belladonna/i, note:''},
 {slug:'06-pralidoxime-and-co', title:'Antidote removes toxin from active site', short:'Pralidoxime, CO', rows:['op'], match:/pralidoxime|aging|carbon monoxide|\bCO\b/, note:'pam'},
 {slug:'07-warfarin-vitamin-k', title:'Antidote by-passes an inhibited pathway', short:'Warfarin, vitamin K', rows:[], match:/warfarin|vitamin K|epoxide/i, note:'vk'},
];
const ANTIDOTE_NOTES = {
 cn:'On 10/19 she said thiosulfate "is freely in the body" and that rhodanese is what is given: "by giving the enzyme rodonase. This is the cofactor." She named the eliminated product as "the thiosulfate with a cyanide bound to it is being renally eliminated". The diagram draws the chemistry (rhodanese moves a sulfur from thiosulfate onto cyanide, giving thiocyanate) and does not say which agent is given; her exam keys her version, with rhodanese as the cofactor that enhances metabolism. Why methylene blue: "Your blood can\'t carry oxygen if the hemoglobin in red blood cells is in the form of methemoglobin."',
 fz:'Her final wording on 10/19, after she corrected a slip: "The benzos are the overdose, Flomazinil is your antidote, and your treatment is the antagonist. I had it right the first time."',
 pam:'Aging, in her words on 10/19: "the acetylcholinesterase is permanently bound by that organophosphate, and we can\'t pull it off the acetylcholinesterase using pralodoxine." For CO, the source is the slide only: "CO poisonings are treated with high concentrations of O2 to displace CO from heme of hemoglobin".',
 vk:'Her 10/19 answer for a warfarin overdose: "we can give them vitamin K, OK? Kind of bypassing this blocked metabolic scheme." The risk of over-anticoagulation: "Most obviously we be bruising. Sometimes people can have GI bleeds, right? Really bad thing, maybe they\'ll have a hemorrhagic stroke".',
};
