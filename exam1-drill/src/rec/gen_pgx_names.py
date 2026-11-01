# Generates STEPS3['pgx-names'] (how to read and say a variant name) into steps4.js.
# Every label comes from guide4 sections 1-5 (Intro to PGx slides pp. 22-29, 35; transcripts 10/21, 10/22, 10/27).
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(HERE, '..', 'steps4.js')
W = 360
def esc(s): return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
def tok(x, y, w, s, cls='s3box', fs=18, mono=True):
    f = 'font-family:ui-monospace,Menlo,Consolas,monospace;' if mono else ''
    return (f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="6" class="{cls}"/>'
            f'<text x="{x + w / 2}" y="{y + 23}" class="s3txt" text-anchor="middle" style="{f}font-size:{fs}px">{esc(s)}</text>')
def brace(x, w, y, lines, cls='s3line'):
    out = f'<path d="M{x + 2},{y} v6 h{w - 4} v-6" class="{cls}"/><line x1="{x + w / 2}" y1="{y + 6}" x2="{x + w / 2}" y2="{y + 14}" class="{cls}"/>'
    for i, l in enumerate(lines):
        out += f'<text x="{x + w / 2}" y="{y + 28 + 15 * i}" class="{"s3txt" if i == 0 else "s3sub"}" text-anchor="middle">{esc(l)}</text>'
    return out
def say(y, s, h=None):
    ls = s if isinstance(s, list) else [s]; h = h or 22 + 19 * len(ls)
    return (f'<rect x="10" y="{y}" width="340" height="{h}" rx="10" class="s3hi"/>'
            f'<text x="24" y="{y + 16}" class="s3sub">Say it</text>'
            + ''.join(f'<text x="24" y="{y + 33 + 19 * i}" class="s3txt" style="font-size:15px">{esc(l)}</text>' for i, l in enumerate(ls)))
def head(s):
    return f'<text x="180" y="20" class="s3txt" text-anchor="middle" style="font-weight:600;font-size:14px">{esc(s)}</text>'
def svg(h, label, body):
    return f'<svg viewBox="0 0 {W} {h}" role="img" aria-label="{esc(label)}">{body}</svg>'

steps = []
# 1 gene symbol
b = head('1. Every name starts with the gene')
b += tok(105, 40, 150, 'CYP2C19', 's3hi', 22).replace('font-size:22px', 'font-size:22px;font-style:italic')
b += brace(105, 150, 82, ['gene symbol', 'italic = the gene; plain = the enzyme it makes'])
b += '<text x="180" y="160" class="s3sub" text-anchor="middle">ABCB1 = the gene for P-glycoprotein</text>'
b += '<text x="180" y="176" class="s3sub" text-anchor="middle"><tspan font-style="italic">TPMT</tspan> = the gene; TPMT = the enzyme</text>'
b += say(196, '“sip two-C-nineteen”')
steps.append({'t': 'Every variant name begins with the <b>gene symbol</b>. Written in italics it means the gene; in plain type it means the protein the gene makes, such as the enzyme thiopurine methyltransferase for <i>TPMT</i>. In class CYP is said as one word, <b>“sip”</b>, so CYP2C19 is “sip two C nineteen”.',
              'svg': svg(246, 'The gene symbol CYP2C19 with a label: gene symbol, said sip two C nineteen.', b)})
# 2 star allele
b = head('2. A star and a number name the version (allele)')
b += tok(14, 40, 120, 'CYP2C19', 's3box', 18) + tok(140, 40, 62, '*1', 's3hi', 20) + tok(208, 40, 62, '*2', 's3box', 20) + tok(276, 40, 62, '*3', 's3box', 20)
b += brace(140, 62, 82, ['wild type', 'always *1'], 's3acc') + brace(208, 130, 82, ['variants', 'need a table'])
b += '<text x="180" y="152" class="s3sub" text-anchor="middle">The star name does not say where the change is.</text>'
b += '<text x="180" y="168" class="s3sub" text-anchor="middle">A table defines each one: *2 = 681 G&gt;A, *3 = 636 G&gt;A</text>'.replace('&amp;gt;', '&gt;')
b += say(186, '“sip two-C-nineteen star two”')
steps.append({'t': 'After the gene comes a <b>star</b> and a number for the allele. By convention <b>*1 is the wild type in every gene</b>; the other numbers are variants. The star name alone does not tell you where the change is: a table defines each allele, for example CYP2C19*2 is 681 G&gt;A and *3 is 636 G&gt;A. All cytochrome P450 genes are named this way.',
              'svg': svg(236, 'CYP2C19 followed by star 1, star 2 and star 3; star 1 is labelled wild type.', b)})
# 3 discovery order
b = head('3. Star numbers follow discovery, not position')
b += '<text x="20" y="66" class="s3sub">start codon</text><line x1="30" y1="76" x2="30" y2="96" class="s3line"/>'
b += '<rect x="30" y="80" width="300" height="12" rx="4" class="s3box"/>'
x3, x2 = 30 + 300 * 636 / 800, 30 + 300 * 681 / 800
b += f'<line x1="{x3:.0f}" y1="70" x2="{x3:.0f}" y2="102" class="s3acc"/><line x1="{x2:.0f}" y1="70" x2="{x2:.0f}" y2="102" class="s3acc"/>'
b += f'<text x="{x3 - 6:.0f}" y="122" class="s3txt" text-anchor="end">*3 at 636</text><text x="{x2 + 6:.0f}" y="122" class="s3txt" text-anchor="start">*2 at 681</text>'
b += f'<text x="{x3 - 6:.0f}" y="138" class="s3sub" text-anchor="end">found second</text><text x="{x2 + 6:.0f}" y="138" class="s3sub" text-anchor="start">found first</text>'
b += '<text x="180" y="170" class="s3sub" text-anchor="middle">Another gene numbers its own finds:</text>'
b += '<text x="180" y="186" class="s3sub" text-anchor="middle">CYP2C9*2 is not at 681; CYP2C9*3 is not at 636.</text>'
b += say(202, '“star two” was found before “star three”')
steps.append({'t': 'Star numbers run in the <b>order the variants were found</b>, not along the gene. CYP2C19*2 was characterized first, at nucleotide 681; *3 was found later at 636, so *3 sits closer to the start codon. Each gene is numbered separately, so CYP2C9*2 and *3 are at other places, and they keep some activity while CYP2C19*2 and *3 have none.',
              'svg': svg(252, 'A gene bar with the start codon on the left; star 3 at 636 lies left of star 2 at 681.', b)})
# 4 genotype
b = head('4. Two alleles make a genotype')
b += tok(40, 40, 120, 'CYP2C19', 's3box', 18) + tok(166, 40, 50, '*1', 's3hi', 20) + tok(222, 40, 30, '/', 's3box', 20) + tok(258, 40, 50, '*2', 's3hi', 20)
b += brace(166, 50, 82, ['copy 1']) + brace(258, 50, 82, ['copy 2'])
rows = [('*1/*1', 'normal', 'both copies work'), ('*1/*2', 'about half', 'gene dose effect'), ('*2/*3', 'none', 'neither copy works')]
for i, (g, a, w) in enumerate(rows):
    y = 138 + 22 * i
    b += f'<text x="40" y="{y}" class="s3txt" style="font-family:ui-monospace,Menlo,Consolas,monospace">{esc(g)}</text><text x="120" y="{y}" class="s3txt">{a}</text><text x="210" y="{y}" class="s3sub">{w}</text>'
b += say(208, '“star one, star two”: heterozygous')
steps.append({'t': 'We are diploid: one copy of the gene from each parent. The two alleles are written together with a slash, the <b>genotype</b>. In CYP2C19, *1/*1 has normal activity, *1/*2 about half (the gene dose effect), and *2/*3 none, because neither copy makes active enzyme.',
              'svg': svg(258, 'CYP2C19 star 1 slash star 2 with copy 1 and copy 2 labelled, and a table of three genotypes.', b)})
# 5 letters and copies
b = head('5. Letters and copy counts after the number')
b += tok(30, 40, 82, 'TPMT', 's3box', 18) + tok(118, 40, 50, '*3', 's3box', 20) + tok(174, 40, 36, 'A', 's3hi', 20)
b += brace(174, 36, 82, ['letter']) + '<text x="222" y="54" class="s3sub">*3 proved to be</text><text x="222" y="70" class="s3sub">two SNPs on</text><text x="222" y="86" class="s3sub">one allele</text>'
b += tok(14, 136, 92, 'CYP2D6', 's3box', 18) + tok(112, 136, 46, '*2', 's3box', 20) + tok(164, 136, 46, 'xN', 's3hi', 20)
b += brace(164, 46, 178, ['N copies']) + '<text x="222" y="150" class="s3sub">extra copies</text><text x="222" y="166" class="s3sub">of *2: ultrarapid</text><text x="222" y="182" class="s3sub">metabolizer</text>'
b += say(230, ['“T P M T star three A”', '“sip two-D-six star two times N”'])
steps.append({'t': 'Some names carry more after the number. A <b>letter</b>: TPMT*3 was renamed TPMT*3A when further work showed it is two SNPs on one allele, a haplotype. <b>xN</b>: CYP2D6*2xN means N copies of the *2 gene; extra copies make a lot of enzyme, an ultrarapid metabolizer.',
              'svg': svg(292, 'TPMT star 3 A with the letter labelled, and CYP2D6 star 2 x N with N copies labelled.', b)})
# 6 SNP notation
b = head('6. SNP notation: wild type first, then the variant')
b += tok(8, 40, 82, 'ABCB1', 's3box', 18) + tok(96, 40, 70, '3435', 's3box', 18) + tok(172, 40, 40, 'C', 's3hi', 20) + tok(218, 40, 40, '&gt;', 's3box', 20).replace('&amp;gt;', '&gt;') + tok(264, 40, 40, 'T', 's3box', 20)
b += brace(8, 82, 82, ['gene']) + brace(96, 70, 82, ['position', 'from start']) + brace(172, 40, 82, ['wild', 'type'], 's3acc') + brace(264, 40, 82, ['variant'])
b += '<text x="180" y="166" class="s3sub" text-anchor="middle">A minus sign means before the gene starts:</text>'
b += '<text x="180" y="182" class="s3sub" text-anchor="middle">VKORC1 -1639G&gt;A is in the upstream untranslated region</text>'.replace('&amp;gt;', '&gt;')
b += say(198, '“A B C B one, 3435, C to T”')
steps.append({'t': 'SNP nomenclature gives the gene, the nucleotide position counted from the start codon, the <b>wild type nucleotide first</b>, an arrow, then the variant. In ABCB1 3435 C&gt;T, C is the wild type and T the variant. A minus sign before the number means upstream of the gene: VKORC1 -1639G&gt;A lies in the upstream untranslated region.',
              'svg': svg(248, 'ABCB1 3435 C greater-than T split into gene, position, wild type and variant.', b)})
# 7 rs number
b = head('7. The rs number: one ID, no clues')
b += tok(100, 40, 160, 'rs4986893', 's3hi', 20)
b += brace(100, 160, 82, ['reference SNP number', 'from the SNP database (dbSNP)'])
for i, s in enumerate(['= CYP2C19*3', '= CYP2C19 636 G>A']):
    b += f'<text x="180" y="{156 + 18 * i}" class="s3txt" text-anchor="middle" style="font-family:ui-monospace,Menlo,Consolas,monospace">{esc(s)}</text>'
b += '<text x="180" y="208" class="s3sub" text-anchor="middle">Unique, but it does not show the gene, position or wild type.</text>'
b += say(222, '“r s 4986893”')
steps.append({'t': 'The <b>reference SNP (rs) number</b> comes from the SNP database (dbSNP); no other SNP has it, and the Human Genome Variation Society recommends it as the standard. rs4986893, CYP2C19*3 and CYP2C19 636 G&gt;A are three names for one change. The rs number alone does not show the gene, the position or the wild type.',
              'svg': svg(272, 'rs4986893 labelled reference SNP number, equal to CYP2C19 star 3 and to 636 G greater-than A.', b)})
# 8 HLA
b = head('8. HLA names: gene, star, allele')
b += tok(40, 40, 96, 'HLA-B', 's3box', 18) + tok(142, 40, 34, '*', 's3box', 20) + tok(182, 40, 80, '15:02', 's3hi', 20)
b += brace(40, 96, 82, ['gene']) + brace(182, 80, 82, ['allele', 'the Tegretol label prints 1502'])
pairs = [('HLA-B*15:02', 'carbamazepine', 'skin (SJS/TEN)'), ('HLA-B*57:01', 'abacavir', 'multi-organ'), ('HLA-A*31:01', 'carbamazepine', 'hypersensitivity')]
for i, (g, d, r) in enumerate(pairs):
    y = 148 + 20 * i
    b += f'<text x="20" y="{y}" class="s3txt" style="font-family:ui-monospace,Menlo,Consolas,monospace">{esc(g)}</text><text x="140" y="{y}" class="s3txt">{d}</text><text x="250" y="{y}" class="s3sub">{esc(r)}</text>'
b += say(212, '“H L A B fifteen-oh-two”')
steps.append({'t': 'HLA names follow the same pattern: the gene (<b>HLA-B</b>), a star, then the allele. The FDA Table of Pharmacogenetic Associations prints <b>HLA-B*15:02</b>; the Tegretol label prints HLA-B*1502, the same allele. In class these are said as numbers: “HLA-B 1502”, “HLA-B 5701”, “HLA-A 3101”.',
              'svg': svg(262, 'HLA-B star 15:02 split into gene and allele, with three HLA alleles and their drugs.', b)})

entry = ("STEPS3['pgx-names'] = {\n  title: 'How to read and say a variant name',\n"
         "  src: 'Intro to PGx slides pp. 22-29 and 35 (nomenclature, genotype, haplotype, TPMT); PGx-Examples slides on CYP2D6 copy number; CPIC warfarin guideline 2017; Tegretol label; transcripts 10/21, 10/22, 10/27',\n"
         "  steps: [\n" + ',\n'.join('    {t: ' + json.dumps(s['t']) + ',\n     svg: ' + json.dumps(s['svg']) + '}' for s in steps) + "\n  ]\n};\n")
src = open(P).read()
src = re.sub(r"\nSTEPS3\['pgx-names'\] = \{.*?\n\};\n", '\n', src, flags=re.S)
open(P, 'w').write(src.rstrip('\n') + '\n\n' + entry)
print('pgx-names', len(steps), 'steps')
