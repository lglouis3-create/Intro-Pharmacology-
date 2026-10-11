/* Guided narration scripts and clips, one entry per step-through figure (the key of its data-anim).
   Shape:  NARRATION['e2-maoi'] = {cite: 'where the facts come from', steps: [{text: '…', src: 'audio/e2-maoi-1.mp3'}, …]};
   `text` is what is read aloud for that step (the caption still shows), and `src` names a recorded clip
   to play instead of the device's voice. A step with no entry is read from its caption by the device's
   voice. Every script here states only what the figure's own caption states, which was checked against
   his slides and transcripts (the cites); a script explains the step, it does not add facts. Exam 2
   figures come first, in the order of what he said he tests most (drug list MOA and site, organ
   receptors, DUMBBELSS, drug pairs, reversals, tracings, the RAAS cascade). Exam 1 figures are read
   from their captions until their scripts are written. */
const NARRATION = {};

NARRATION['e2-nmj'] = {cite: 'NMJ slides 13–19, 27–29, 39, 46–50; (T) 10/1, 10/5; Poll 10', steps: [
 {text: 'Start at rest. The motor nerve terminal has made acetylcholine and packed it into vesicles. Across the cleft sit two things a drug can target: the nicotinic muscle receptor, N m, which is an ion channel, and the enzyme acetylcholinesterase, which breaks acetylcholine down.'},
 {text: 'An action potential arrives and opens calcium channels. Calcium enters the terminal, and that is what makes the vesicles release acetylcholine into the cleft. Release is calcium dependent.'},
 {text: 'Acetylcholine binds both alpha subunits of N m. The channel opens, sodium rushes in, the end plate depolarizes, and the skeletal muscle contracts. Agonist at N m means contraction.'},
 {text: 'Recovery. Acetylcholinesterase splits acetylcholine into choline and acetate, the channel closes, and the muscle relaxes. Now you can see the two drug targets: the receptor itself, which is direct, and the enzyme, which is indirect. Every NMJ drug on the list acts at one of these two.'},
 {text: 'Botulinum toxin acts before the receptor. It is an endopeptidase that cuts the SNARE proteins, so the vesicles cannot release acetylcholine, and the muscle relaxes. On his poll, Botox is the only drug that decreases acetylcholine release; the other four act at a receptor or the enzyme.'},
 {text: 'Succinylcholine is an N m agonist. It opens the channel the way acetylcholine does, but it is not broken down effectively, so the end plate stays depolarized and cannot fire again. The result is paralysis from an agonist. His words: you must know that succinylcholine is an agonist that opens those ion channels. The two phases are in the next figure.'},
 {text: 'The curare-like drugs, the ones with c u r in the name, rocuronium, vecuronium, pancuronium, are competitive, reversible antagonists at N m. The channel cannot open, acetylcholine cannot act, and the muscle is paralyzed. Both succinylcholine and the curare-like drugs cause paralysis; the difference he tests is agonist versus antagonist.'},
 {text: 'To reverse curare, block the enzyme. Neostigmine inhibits acetylcholinesterase and does not cross the blood brain barrier, so more acetylcholine stays in the cleft and outcompetes curare, because curare is competitive. The channel opens again. He asks a question like this every year, and about a third of the class misses it: a second paralytic would deepen the paralysis; neostigmine adds acetylcholine.'}]};

NARRATION['e2-sch'] = {cite: 'NMJ slides 19, 21–24, 28; (T) 10/5', steps: [
 {text: 'First the normal case. Acetylcholine binds both alpha subunits of N m and opens the channel. Sodium comes in, the end plate depolarizes, and the muscle contracts.'},
 {text: 'Acetylcholinesterase breaks acetylcholine down quickly, so the end plate repolarizes. He calls this re-priming. Because the end plate can fire again and again, repetitive firing gives muscle tension. Hold on to that idea: tension needs repeated firing.'},
 {text: 'Succinylcholine is two acetylcholine molecules joined at the alkyl ends. It opens N m exactly like acetylcholine, but it is not metabolized effectively at the synapse, so it stays on the receptor far longer.'},
 {text: 'Phase one, the depolarizing block. The end plate stays depolarized, so it cannot re-prime and cannot fire again. No repetitive firing means no tension, so the muscle is paralyzed. This is why an agonist paralyzes.'},
 {text: 'Phase two, the channel block. With a prolonged infusion, succinylcholine lodges inside the channel pore. Sodium and potassium cannot move, and the paralysis is prolonged. His picture: it actually can get lodged inside of that channel.'},
 {text: 'Compare the curare-like drugs. They are competitive antagonists: they keep the channel from opening, so the end plate never depolarizes at all. Both routes end in paralysis, one by holding the channel open, one by keeping it shut. On his poll, the drug that paralyzes by antagonizing acetylcholine at N m is rocuronium, not succinylcholine.'}]};

NARRATION['e2-chol'] = {cite: 'Cholinergic slides 5, 9, 11–14, 17–20, 32; NMJ slides 33–41; (T) 10/5', steps: [
 {text: 'This is the parasympathetic synapse. The postganglionic nerve ending releases acetylcholine onto muscarinic receptors on the effector cell. Muscarinic receptors are G protein coupled receptors, not ion channels.'},
 {text: 'Acetylcholine activates the muscarinic receptor. His summary: M 1 in the brain, M 2 in the heart, M 3 everywhere else. M 2 is G i and slows the heart; M 3 is G q and raises calcium, which contracts smooth muscle and drives glands. Then acetylcholinesterase splits acetylcholine into choline and acetate, and the signal ends.'},
 {text: 'The muscarinic agonists: pilocarpine, carbachol, bethanechol, methacholine. They are non-selective across M 1, M 2 and M 3, and reversible, so they produce DUMBBELSS. His biggest trap: students think these agonists also bind nicotinic receptors. They do not. Only acetylcholine itself binds both.'},
 {text: 'Atropine is a competitive, reversible, non-selective antagonist at M 1, M 2 and M 3. Blocking the receptor gives anti-DUMBBELSS: tachycardia, dry mouth, mydriasis, bronchial dilation. It has no affinity for nicotinic receptors, so an answer that has atropine blocking N m or blocking norepinephrine is wrong.'},
 {text: 'The cholinesterase inhibitors act on the enzyme, not the receptor. The stigmines and donepezil stop the breakdown, so acetylcholine piles up at every cholinergic synapse and you get DUMBBELSS. Where they go is the exam point: neostigmine stays in the periphery; physostigmine, rivastigmine and donepezil cross the blood brain barrier.'}]};

NARRATION['e2-op'] = {cite: 'NMJ slides 39–44; Cholinergic slides 20–23; (T) 10/5', steps: [
 {text: 'Normal acetylcholinesterase. The enzyme splits acetylcholine into choline and acetate, so acetylcholine acts only briefly and the level in the synapse stays low.'},
 {text: 'A reversible inhibitor, neostigmine or any of the stigmines, binds the active site and then comes off again. While it is on, acetylcholine rises; when it comes off, the enzyme works again. That is the difference he wants: reversible means it comes off.'},
 {text: 'An organophosphate, malathion or parathion as an insecticide, sarin, soman or tabun as a nerve gas, phosphorylates the active site. That is a covalent bond, very stable and slow, so the enzyme stays off and acetylcholine piles up everywhere: massive DUMBBELSS, ganglia, the neuromuscular junction, and the brain. The slide word is irreversible.'},
 {text: 'The first antidote is pralidoxime, 2 P A M, the cholinesterase reactivator. Given early, within about an hour, it pulls the phosphate off the enzyme and the enzyme works again. It is the only drug here that fixes the enzyme.'},
 {text: 'Then atropine. It blocks M 1, M 2 and M 3, which gives anti-DUMBBELSS and stops the muscarinic effects. It does nothing at N m, so it does not treat the muscle paralysis. On the exam, pralidoxime reactivates; atropine only blocks the muscarinic receptors.'}]};

NARRATION['e2-adr'] = {cite: 'Adrenergic slides 9–15, 21–24, 31–32; (T) 10/6; Poll 19', steps: [
 {text: 'Cocaine blocks the norepinephrine transporter, the NET. His words: a 100 percent inhibitor of the net process. Norepinephrine stays in the synapse, so there is more of it at alpha 1 and beta receptors in the heart, the vessels and the brain. Cocaine never touches the receptor itself; it raises the amount of transmitter.'},
 {text: 'The amphetamines work the other way: their primary action is to push norepinephrine, and also dopamine and serotonin, out of the terminal. Their reuptake block and MAO block are secondary and moderate. On his poll, the drug that increases the potency of norepinephrine by blocking the NET is cocaine, not amphetamine; amphetamine is a releaser first.'},
 {text: 'The MAO inhibitors block the enzyme that breaks norepinephrine down inside the terminal, so more is stored and released. Phenelzine blocks MAO A and MAO B; selegiline blocks MAO B. Both are irreversible.'},
 {text: 'Clonidine is an alpha 2 agonist. Alpha 2 is G i, and it sits on the nerve ending, so activating it releases less norepinephrine. Sympathetic tone falls: vasodilation and bradycardia. That is why clonidine is the drug that lowers blood pressure on his poll, even though it is an agonist.'},
 {text: 'Mirtazapine is the opposite at the same receptor. It blocks the presynaptic alpha 2 autoreceptor, the brake, so more norepinephrine and more serotonin are released. His line: what happens if I inhibit the inhibitor? I get a positive effect. Same receptor, opposite directions: clonidine lowers release, mirtazapine raises it.'}]};

NARRATION['e2-maoi'] = {cite: 'Adrenergic slides 13–15; (T) 10/6', steps: [
 {text: 'Two forms of the enzyme. MAO A sits in the brain, the liver and the gut, and it breaks down norepinephrine and dopamine; in the gut and liver it also breaks down tyramine from food. MAO B sits in the striatum of the brain and breaks down dopamine. His cue: if you are not sure, think about B for brain.'},
 {text: 'Phenelzine is non-selective and irreversible, so it blocks MAO A as well as MAO B. With gut MAO A blocked, tyramine from fermented food, cheese, bread, wine, is no longer broken down. It reaches the blood and releases norepinephrine, and the result is a hypertensive crisis. That is the cheese effect.'},
 {text: 'Selegiline at low doses blocks only MAO B in the brain. Dopamine rises, which is the point for depression and Parkinson disease, while MAO A in the gut and liver still breaks tyramine down. No cheese effect. The exam distinction is which enzyme: A and B with the crisis, B only without it.'}]};

NARRATION['e2-epi'] = {cite: 'Adrenergic slides 47–51; (T) 10/7, 10/8; Poll 29; Jeopardy 10/8', steps: [
 {text: 'Arteries and veins carry two receptors that pull in opposite directions. Alpha 1 is G q, raises calcium, and constricts. Beta 2 is G s, raises cyclic AMP, and dilates. Epinephrine binds both, but not equally: beta 1 and beta 2 at low doses, alpha 1 and then alpha 2 at high doses.'},
 {text: 'At a low dose, epinephrine binds beta 2 best, so the vessel dilates and pressure falls. In his 10 8 poll, this was receptor B.'},
 {text: 'At a high dose, alpha 1 joins in and overrides beta 2. The vessel constricts and blood pressure goes up. The trace you see is a net effect, alpha 1 minus beta 2, which he calls the net pressor effect. Receptor A in that poll is alpha 1.'},
 {text: 'Now give propranolol first, his compound 1. Beta 2, the physiological antagonist of alpha 1, is blocked, so alpha 1 acts alone and the rise in blood pressure is greater than before. A beta blocker does not reverse epinephrine; it makes the pressor response larger.'},
 {text: 'Give prazosin first instead. Alpha 1 is blocked, beta 2 is unopposed, and the same high dose now dilates: pressure falls. This is epinephrine reversal, the net depressor effect. In an epinephrine overdose he wants the alpha 1 blocker first, then the beta blocker; a beta blocker first leaves the vessels clamped.'}]};

NARRATION['e2-no'] = {cite: 'Adrenergic slides 63, 67–74; (T) 10/7; Poll 27', steps: [
 {text: 'The M 3 receptors on blood vessels sit on the endothelium, the inner lining, and they are not innervated. A muscarinic agonist, acetylcholine in his example, binds M 3, which is coupled to G q. Note where this starts: the endothelium, not the smooth muscle.'},
 {text: 'G q activates phospholipase C, which makes I P 3. I P 3 opens its receptor on the endoplasmic reticulum, and calcium floods into the cytoplasm of the endothelial cell. Same G q sequence as everywhere else, but in this cell it leads to dilation, not constriction.'},
 {text: 'Calcium joins calmodulin, and the complex activates nitric oxide synthase. The enzyme turns L arginine into L citrulline, and nitric oxide is the by-product. So nitric oxide is made in the endothelium, from L arginine, by nitric oxide synthase.'},
 {text: 'Nitric oxide is a gas. It dissolves across into the smooth muscle and activates soluble guanylate cyclase, which turns G T P into cyclic G M P, and cyclic G M P relaxes the muscle: vasodilation. His take home: activate the M 3s on the endothelium, or take nitroglycerin, and you are producing nitric oxide, a powerful vasodilator.'},
 {text: 'Phosphodiesterase breaks cyclic G M P down, and the dilation ends. Remember this enzyme; the drug interaction he wants is built on it.'},
 {text: 'The nitrates, nitroglycerin, nitroprusside, isosorbide, give away nitric oxide. Their nitric oxide bypasses M 3, calcium and the synthase and goes straight to soluble guanylate cyclase: more cyclic G M P, vasodilation. So do not answer M 3 as the nitrates site; they skip it.'},
 {text: 'Sildenafil blocks phosphodiesterase, so cyclic G M P is not broken down. His phrase: P D E inhibitors increase the potency of nitric oxide. Put a nitrate and sildenafil together and cyclic G M P piles up from both sides: marked hypotension. He said he would like you to tell him on an exam why that combination is bad.'}]};

NARRATION['e2-raasc'] = {cite: 'RAAS slides 3, 5–9, 15, 18, 23; (T) 10/8', steps: [
 {text: 'The cascade, first to last. Angiotensinogen is made in the liver. Renin, from the kidney, cuts it into angiotensin 1, which is inactive. A C E then converts angiotensin 1 into angiotensin 2, the active peptide. He wants this order tattooed in your head: what comes first, what comes last.'},
 {text: 'Angiotensin 2 acts at two receptors. A T 1 is G q and raises calcium: vasoconstriction, aldosterone release, so sodium and water are kept and potassium is lost, and less renal blood flow. A T 2 is G i and does the opposite; it is the physiological antagonist of A T 1.'},
 {text: 'One more job for A C E: it also breaks down bradykinin, a potent dilator. That matters later, because blocking A C E leaves bradykinin standing.'},
 {text: 'Renin is the rate-limiting enzyme. Its release goes up with sympathetic beta 1 on the juxtaglomerular cells, with low pressure inside the kidney, and with low sodium chloride at the macula densa. Block renin and everything downstream falls. Where each drug cuts in is the next figure.'}]};

NARRATION['e2-raas'] = {cite: 'RAAS slides 4, 8–14, 19, 21–29; Adrenergic slides 56–57; (T) 10/8; Polls 30–32', steps: [
 {text: 'Metoprolol blocks beta 1 on the juxtaglomerular cells, so less renin is released. His words: suppressed, not abolished, because the sodium and pressure controls still work. Everything downstream is lower, but nothing is shut off.'},
 {text: 'Aliskiren binds renin itself, the rate-limiting enzyme, reversibly. His rule: if you block that, everything downstream from that goes down. Angiotensin 1, angiotensin 2, A T 1 and A T 2 activation, and aldosterone all fall.'},
 {text: 'The A C E inhibitors, the prils, lisinopril and captopril, block A C E. Angiotensin 1 builds up, angiotensin 2 falls, and bradykinin is not broken down, which gives the dry cough and angioedema. Renin is upstream of the block, so it does not fall; on his poll, lisinopril decreases angiotensin 2, not renin and not angiotensin 1.'},
 {text: 'The A R Bs, the sartans, losartan and valsartan, block A T 1, ten thousand fold over A T 2. The body compensates upstream, so angiotensin 2 rises, and the extra angiotensin 2 activates A T 2, which he calls the cherry on top. So valsartan decreases A T 1 activation; it does not lower angiotensin 2 and it raises A T 2 activation.'},
 {text: 'Spironolactone and eplerenone act after the cascade, at the aldosterone receptor, the mineralocorticoid receptor in the kidney. They are potassium-sparing diuretics: sodium and water are lost, potassium is kept, so hyperkalemia.'},
 {text: 'Five drugs, five block points, his acronym CLAMS: captopril, losartan, aliskiren, metoprolol, spironolactone. Hyperkalemia belongs to all of them. Dry cough and angioedema belong to the A C E inhibitors only, because only they raise bradykinin. He guaranteed one to two questions on what these drugs do to the cascade.'}]};

NARRATION['e2-baro'] = {cite: 'ANS slides 48–53; Adrenergic slide 30; (T) 10/1, 10/6', steps: [
 {text: 'Lying down, blood is spread evenly and the parasympathetic system is in control. His words: I am resting and digesting. This is the baseline the reflex defends.'},
 {text: 'Stand up. Gravity pools blood in the leg veins, so less returns to the heart, the ventricles fill less, and stroke volume and blood pressure fall. Nothing has sensed it yet.'},
 {text: 'The baroreceptors are pressure sensing ion channels in the carotid sinus, nerve 9, and the aortic arch, nerve 10. With less pressure they are stretched less, so they fire less. Less firing means more sympathetic activity. Firing and sympathetic tone move in opposite directions; that is the trap on his poll.'},
 {text: 'The brain answers. His phrasing: shut it down parasympathetic, enhance the sympathetic. The slide prints one arrow beside S N S and P N S; use his spoken version.'},
 {text: 'The sympathetic system squeezes the veins and constricts the vessels through alpha 1, and the heart beats faster and harder through beta 1. Blood returns to the heart and the brain, and the pressure recovers.'},
 {text: 'Now the drug. After a first dose of prazosin, alpha 1 is blocked, so the veins cannot be squeezed. Blood stays in the legs and the patient faints: first dose orthostatic hypotension, syncope. The heart still speeds up through beta 1, so there is reflex tachycardia as well. His counseling point: get up slowly.'}]};

NARRATION['e2-achlab'] = {cite: 'Adrenergic slides 75–83; (T) 10/7', steps: [
 {text: 'His lab: a rat on a polygraph, heart rate on the top trace and blood pressure on the bottom. At rest both are steady; that is the baseline you compare everything to.'},
 {text: 'An intravenous bolus of acetylcholine, 5 micrograms per kilogram. It activates M 3 on the endothelium, not on the smooth muscle. Nitric oxide is made, the vessels dilate, and blood pressure falls.'},
 {text: 'Heart rate goes up, not down. Acetylcholine at M 2 should slow the heart, so why tachycardia? The baroreceptors sense the fall in pressure: shut off parasympathetic, kick up sympathetic. Norepinephrine on beta 1 overrides the M 2. His words: this is a beta one reflex tachycardia; blood pressure rules.'},
 {text: 'Pre-treat with atropine, which blocks M 1, M 2 and M 3, then give the same acetylcholine. M 3 is blocked, so no nitric oxide and no fall in pressure. M 2 is blocked too, so the parasympathetic tone on the heart is gone and beta 1 runs unopposed: the rate stays up, and there is no reflex because there was no drop.'},
 {text: 'Give acetylcholine at 100 times the dose, 5 to 500. Atropine is a reversible, competitive antagonist, so enough agonist outcompetes it: the fall in blood pressure and the reflex tachycardia come back. Competitive means more agonist wins.'}]};

NARRATION['e2-gi'] = {cite: 'ANS slides 45–47; (T) 10/1', steps: [
 {text: 'In the gut, the parasympathetic fiber releases acetylcholine onto M 3 on the smooth muscle. M 3 is G q and raises calcium, so motility, tone and secretions go up. His phrase: I am going to put my GI to work.'},
 {text: 'The sympathetic fiber is different here. It does not end on the gut muscle; it ends on the parasympathetic nerve. Norepinephrine binds alpha 2, which is G i and lowers cyclic AMP, on that parasympathetic ending.'},
 {text: 'Alpha 2 is inhibitory, so less acetylcholine is released, fewer M 3 receptors are activated, and motility and tone fall: constipation. His words: the alpha 2 is not on the gut, the alpha 2 is on the nerve of the parasympathetic system. That is the exception he asks about; in the heart, both fibers reach the organ.'}]};

NARRATION['e2-adrc'] = {cite: 'Adrenergic slide 8; ANS slide 14; (T) 10/6', steps: [
 {text: 'Synthesis, inside the sympathetic nerve terminal: tyrosine becomes L dopa, L dopa becomes dopamine, and dopamine becomes norepinephrine. He said it is very similar to acetylcholine: made from a precursor, stored, released on an action potential.'},
 {text: 'Storage. Norepinephrine is packed into vesicles, ready for release.'},
 {text: 'Release. An action potential arrives, calcium enters, and the vesicle releases norepinephrine into the synapse. Like acetylcholine, release is calcium dependent.'},
 {text: 'Binding. Norepinephrine binds alpha 1, which is G q and raises calcium, and beta, which is G s and raises cyclic AMP, on the effector cell. It also binds alpha 2 on the terminal itself. Alpha 2 is G i and is negative feedback, his gatekeeper: it suppresses further release.'},
 {text: 'Removal, two ways. The norepinephrine transporter, the NET, takes it back into the terminal and recycles it into the vesicle. MAO inside the terminal and COMT break it down to inactive metabolites. His summary: too much, the enzymes break it; not enough, more goes through the transporter. Every indirect drug acts on one of these steps; that is the next figure.'}]};
