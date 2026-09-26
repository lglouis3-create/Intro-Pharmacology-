const TELL_HTML = `
<h2>Tell apart</h2>
<p class="sub">Pairs that share wording. Each row gives the feature that separates them and the trap a question sets. Nothing here is scored.</p>
<!--LECTURE_ROWS-->
<h3>Exam 1 drug list</h3>
<table class="reftab"><thead><tr><th style="width:24%">Looks alike</th><th>What separates them</th><th style="width:28%">The trap</th><th style="width:10%">Question</th></tr></thead><tbody>
<tr><td><b>Prazosin</b> vs <b>phenoxybenzamine</b></td><td>Prazosin blocks α1 only and is reversible. Phenoxybenzamine blocks α1 and α2 and is irreversible.</td><td>Calling both reversible; the list names phenoxybenzamine as its only irreversible drug.</td><td data-q="DL1-016">DL1-016</td></tr>
<tr><td><b>Phenylephrine</b> vs <b>prazosin</b></td><td>Both are α1-selective. Phenylephrine is an agonist; prazosin is an antagonist.</td><td>Matching on the receptor and missing the direction of the effect.</td><td data-q="DL1-019">DL1-019</td></tr>
<tr><td><b>Metoprolol</b> vs <b>pindolol</b></td><td>Metoprolol is a β1 antagonist. Pindolol is a partial agonist at β1 and β2.</td><td>Filing pindolol with the β antagonists.</td><td data-q="DL1-021">DL1-021</td></tr>
<tr><td><b>Albuterol</b> vs <b>pindolol</b></td><td>Both are β partial agonists. Albuterol acts at β2 only; pindolol at β1 and β2.</td><td>Giving albuterol the β1 action.</td><td data-q="DL1-010">DL1-010</td></tr>
<tr><td><b>Loratadine</b> vs <b>diphenhydramine</b></td><td>Loratadine is an H1 inverse agonist. Diphenhydramine is a non-selective histamine receptor antagonist.</td><td>Calling loratadine an antagonist, or diphenhydramine H1-selective.</td><td data-q="DL1-017">DL1-017</td></tr>
<tr><td><b>Acetylcholine</b> vs <b>varenicline</b></td><td>Acetylcholine is an agonist at M1, M2, M3, Nn and Nm. Varenicline is a partial agonist at Nn only.</td><td>Giving varenicline muscarinic activity.</td><td data-q="DL1-018">DL1-018</td></tr>
</tbody></table>
<p class="sub">Exam_1_Drug_List_2026.pdf, Table 1.</p>
`;
