# Generates the narrated reading walkthroughs STEPS3['rd-<reading id>'] into steps4.js.
# Each step pairs one segment of the reading's listen talk (readings/<id>.json "listen", recorded as
# audio/s3-rd-<id>-<i>.mp3) with a picture and a short written key point. Design follows Mayer's
# multimedia principles: narration timed to the picture (temporal contiguity), one idea per step
# (segmenting), the current part highlighted (signaling), labels on the picture (spatial contiguity),
# and a short caption instead of the full narration on screen (redundancy).
# Facts: the listen talks (rec/talks4.json), reading cards, guide4 sections 24, 25, 27, 28, 31.
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); SRC = os.path.join(HERE, '..')
P = os.path.join(SRC, 'steps4.js')
W = 360
MONO = 'font-family:ui-monospace,Menlo,Consolas,monospace;'


def esc(s): return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
def svg(h, label, body): return f'<svg viewBox="0 0 {W} {h}" role="img" aria-label="{esc(label)}">{body}</svg>'
def txt(x, y, s, cls='s3txt', anchor='start', style=''):
    st = f' style="{style}"' if style else ''
    return f'<text x="{x}" y="{y}" class="{cls}" text-anchor="{anchor}"{st}>{esc(s)}</text>'
def box(x, y, w, h, cls='s3box', rx=6): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" class="{cls}"/>'


def listen(rid): return json.load(open(os.path.join(SRC, 'readings', rid + '.json')))['listen']


def segments(text, markers):
    """Split the talk at each marker (the marker starts the new segment), in order."""
    out, rest = [], text
    for m in markers:
        i = rest.find(m)
        assert i > 0, (m, rest[:80])
        out.append(rest[:i].strip()); rest = rest[i:]
    out.append(rest.strip())
    return out


# ---------------- the three drug labels: her eight worksheet questions ----------------
QLAB = ['1 Gene and variant', '2 What it does', '3 Patient or tumor?', '4 Efficacy or toxicity?',
        '5 How it is tested', '6 Test named?', '7 Who is tested', '8 What the result changes']
LABELS = {
    'label-abacavir': {
        'title': 'Ziagen (abacavir) label', 'sub': 'HIV medicine',
        'ans': [['HLA-B', 'HLA-B*57:01'], ['Hypersensitivity, multi-organ;', 'can be fatal'], ['The patient (inherited)'],
                ['Prevent toxicity'], ['Genotyping (a blood test)'], ['No test named'],
                ['All patients, before starting', 'or restarting'], ['Positive: contraindicated']],
        'markers': ['Item one', 'Item two', 'Item three', 'The recording ends', 'Item five', 'Item six', 'Item seven', 'Item eight', 'Her main point'],
        'intro': '<b>Ziagen (abacavir) label</b>, one of the three labels on her drug-label worksheet (10/27). The worksheet asks the same eight questions of each label.',
        'compare': '<b>Same gene, different variant.</b> Carbamazepine goes with HLA-B*15:02 and a skin reaction (SJS/TEN); abacavir goes with HLA-B*57:01 and a whole-organ hypersensitivity reaction. A negative test for one variant does not clear the other drug.'},
    'label-carbamazepine': {
        'title': 'Tegretol (carbamazepine) label', 'sub': 'older antiepileptic',
        'ans': [['HLA-B*15:02', 'HLA-A*31:01'], ['SJS/TEN skin reactions; B*15:02', 'strong, A*31:01 moderate'], ['The patient (inherited)'],
                ['Prevent toxicity'], ['Genotyping'], ['High-resolution B*15:02 typing;', 'none named for A*31:01'],
                ['At-risk ancestry', '(broad areas of Asia)'], ['B*15:02 positive: avoid unless', 'benefit clearly outweighs risk']],
        'markers': ['Item one', 'Item two', 'Item three', 'The recording ends', 'Item five', 'Item six', 'Item seven', 'Item eight', 'Abacavir also carries'],
        'intro': '<b>Tegretol (carbamazepine) label</b>, one of the three labels on her drug-label worksheet (10/27). The copy provided is dated 7/2026; in class the date was read as 2017.',
        'compare': '<b>Same gene, different variant.</b> Abacavir also carries an HLA-B warning, but for HLA-B*57:01. Carbamazepine\'s reaction is in the skin; abacavir\'s is a whole-organ hypersensitivity reaction.'},
    'label-trastuzumab': {
        'title': 'Herceptin (trastuzumab) label', 'sub': 'HER2 cancers',
        'ans': [['HER2 (185 kDa receptor);', 'no variant named'], ['Blocks HER2-overexpressing', 'tumor cells'], ['The tumor (phenotyped)'],
                ['Ensure efficacy'], ['IHC on the tumor', '(trials also used FISH)'], ['No brand kit; an', 'FDA-authorized test'],
                ['Breast; gastric or GE', 'junction adenocarcinoma'], ['HER2 positive: candidate', 'HER2 negative: do not use']],
        'markers': ['Item one', 'Item two', 'Item three', 'Item four', 'Item five', 'Item six', 'Item seven', 'Item eight'],
        'intro': '<b>Herceptin (trastuzumab) label</b>, one of the three labels on her worksheet (10/27): her example where the tumor is tested, not the patient, and the test is about efficacy.',
        'compare': None},
}


def label_svg(cfg, cur, compare=False):
    b = txt(180, 20, cfg['title'], 's3txt', 'middle', 'font-weight:600;font-size:14px') + txt(180, 36, 'her worksheet: eight questions per label', 's3sub', 'middle')
    if compare:
        b += box(14, 60, 156, 120) + box(190, 60, 156, 120, 's3hi')
        for x, name, allele, react in [(92, 'Carbamazepine', 'HLA-B*15:02', 'skin: SJS / TEN'), (268, 'Abacavir', 'HLA-B*57:01', 'whole-organ reaction')]:
            b += txt(x, 88, name, 's3txt', 'middle', 'font-weight:600') + txt(x, 118, allele, 's3txt', 'middle', MONO + 'font-size:15px') + txt(x, 150, react, 's3sub', 'middle')
        b += '<line x1="92" y1="196" x2="268" y2="196" class="s3acc"/>' + txt(180, 216, 'same gene (HLA-B), different variant', 's3txt', 'middle')
        b += txt(180, 246, 'a negative test for one variant', 's3sub', 'middle') + txt(180, 262, 'does not clear the other drug', 's3sub', 'middle')
        return svg(280, 'Carbamazepine with HLA-B 15:02 and abacavir with HLA-B 57:01: same gene, different variant.', b)
    for i, q in enumerate(QLAB):
        y = 48 + 34 * i
        cls = 's3hi' if i == cur else 's3box'
        b += box(8, y, 344, 30, cls, 5) + txt(16, y + 19, q, 's3sub')
        if cur is not None and i <= cur:
            a = cfg['ans'][i]
            if len(a) == 1: b += txt(164, y + 19, a[0], 's3txt', 'start', 'font-size:12px')
            else: b += txt(164, y + 13, a[0], 's3txt', 'start', 'font-size:12px') + txt(164, y + 26, a[1], 's3txt', 'start', 'font-size:12px')
    return svg(48 + 34 * 8 + 4, f"{cfg['title']}: her eight worksheet questions" + (f', answer {cur + 1} highlighted' if cur is not None else ''), b)


def label_steps(rid):
    cfg = LABELS[rid]; seg = segments(listen(rid), cfg['markers'])
    steps = [{'t': cfg['intro'], 'svg': label_svg(cfg, None), 'say': seg[0]}]
    for i in range(8):
        a = ' '.join(cfg['ans'][i]).replace('; ', '; ')
        steps.append({'t': f'<b>{QLAB[i][0]}. {QLAB[i][2:]}</b> {esc(a)}', 'svg': label_svg(cfg, i), 'say': seg[i + 1]})
    if cfg['compare']: steps.append({'t': cfg['compare'], 'svg': label_svg(cfg, None, True), 'say': seg[9]})
    assert len(steps) == len(seg), (rid, len(steps), len(seg))
    return {'title': 'Narrated walkthrough: ' + cfg['title'], 'src': 'Drug label and her drug-label worksheet; reading card; guide 27-28; transcript 10/27', 'steps': steps}


# ---------------- CPIC warfarin guideline ----------------
def cpic_steps(R):
    seg = segments(listen('cpic-warfarin-2017'), ['Figure one shows', 'In Figure two', 'For non African ancestry', 'For African ancestry', 'Strong means', 'Dr. Smith said on October twenty eighth'])
    wt, wg = R['warfarin-target']['steps'], R['warfarin-genotype']['steps']
    b0 = txt(180, 22, 'CPIC warfarin guideline, 2017 update', 's3txt', 'middle', 'font-weight:600;font-size:14px')
    b0 += box(20, 50, 150, 90, 's3hi') + txt(95, 82, 'HOW to use', 's3txt', 'middle', 'font-weight:600') + txt(95, 102, 'test results that', 's3sub', 'middle') + txt(95, 118, 'are available', 's3sub', 'middle')
    b0 += box(190, 50, 150, 90) + txt(265, 82, 'not WHETHER', 's3txt', 'middle', 'font-weight:600') + txt(265, 102, 'a test should', 's3sub', 'middle') + txt(265, 118, 'be ordered', 's3sub', 'middle')
    b0 += txt(180, 172, 'two figures to know:', 's3sub', 'middle') + txt(180, 192, 'Figure 1: how warfarin works', 's3txt', 'middle') + txt(180, 212, 'Figure 2: the dosing algorithm', 's3txt', 'middle')
    rows = [('Strong', 'desirable effects clearly outweigh', 'undesirable effects'), ('Moderate', 'a close or uncertain balance', ''), ('Optional', 'a close balance; opinions', 'can differ')]
    b5 = txt(180, 22, 'How strong is each recommendation?', 's3txt', 'middle', 'font-weight:600;font-size:14px')
    for i, (k, a, c) in enumerate(rows):
        y = 44 + 62 * i
        b5 += box(14, y, 332, 52, 's3hi' if i == 0 else 's3box') + txt(28, y + 31, k, 's3txt', 'start', 'font-weight:600') + txt(128, y + 24, a, 's3sub') + (txt(128, y + 40, c, 's3sub') if c else '')
    b6 = txt(180, 22, 'Her case: which way does each gene move the dose?', 's3txt', 'middle', 'font-weight:600;font-size:13px')
    b6 += '<defs><marker id="mA-rdc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M1,1 L8,5 L1,9" class="s3acc"/></marker></defs>'
    b6 += '<line x1="20" y1="80" x2="340" y2="80" class="s3line"/>' + '<line x1="180" y1="66" x2="180" y2="94" class="s3line"/>'
    b6 += txt(180, 58, 'average starting dose', 's3sub', 'middle') + txt(24, 104, 'lower', 's3sub') + txt(336, 104, 'higher', 's3sub', 'end')
    b6 += '<line x1="180" y1="140" x2="70" y2="140" class="s3acc" marker-end="url(#mA-rdc)"/>' + txt(125, 166, 'CYP2C9 variant', 's3txt', 'middle') + txt(125, 184, 'lower dose', 's3sub', 'middle')
    b6 += '<line x1="180" y1="210" x2="290" y2="210" class="s3acc" marker-end="url(#mA-rdc)"/>' + txt(235, 236, 'CYP4F2*3', 's3txt', 'middle') + txt(235, 254, 'higher dose, 5-10%', 's3sub', 'middle')
    b6 += txt(180, 284, 'opposite effects on the dose; no net figure is given', 's3sub', 'middle')
    steps = [
        {'t': '<b>CPIC warfarin guideline, 2017 update.</b> CPIC guidelines show how to use genetic test results that are available, not whether a test should be ordered.', 'svg': svg(230, 'CPIC answers how to use available results, not whether to test.', b0)},
        {'t': '<b>Figure 1:</b> R- and S-warfarin inhibit VKORC1, so less reduced vitamin K reaches GGCX and fewer active clotting factors are made. CYP2C9 clears S-warfarin; CYP4F2 removes vitamin K from the cycle.', 'svg': wt[-1]['svg']},
        {'t': '<b>Figure 2 starts here:</b> no VKORC1 and CYP2C9 genotype means the patient is dosed clinically. With a genotype, self-identified ancestry picks the branch.', 'svg': wg[1]['svg']},
        {'t': '<b>Non-African branch:</b> a published algorithm with VKORC1 -1639G&gt;A and CYP2C9*2 and *3 (strong). *5, *6, *8 or *11 lower the dose 15-30% per allele and CYP4F2*3 raises it 5-10% (both optional).', 'svg': wg[6]['svg']},
        {'t': '<b>African branch:</b> test CYP2C9*5, *6, *8 and *11 first, or dose clinically. rs12777823 A/G or A/A lowers the dose 10-25% (moderate). No CYP4F2 recommendation.', 'svg': wg[7]['svg']},
        {'t': '<b>Recommendation strength:</b> strong, moderate or optional.', 'svg': svg(236, 'Strong, moderate and optional recommendation strengths.', b5)},
        {'t': '<b>Her case questions:</b> was all the genotyping done, and does the patient need more or less than the average starting dose? A CYP2C9 variant and CYP4F2*3 have opposite effects on the dose.', 'svg': svg(296, 'From the average starting dose, a CYP2C9 variant moves the dose lower and CYP4F2 star 3 moves it higher.', b6)},
    ]
    for s, sg in zip(steps, seg): s['say'] = sg
    assert len(steps) == len(seg)
    return {'title': 'Narrated walkthrough: CPIC warfarin guideline (2017)', 'src': 'CPIC warfarin guideline 2017 update, Figures 1-2 and footnotes; reading card; guide 24-25; transcripts 10/27, 10/28', 'steps': steps}


# ---------------- Naranjo algorithm ----------------
NQ = [('Previous conclusive reports', '+1', '0'), ('Appeared after the drug was given', '+2', '-1'), ('Improved when drug stopped', '+1', '0'),
      ('Reappeared when given again', '+2', '-1'), ('Other causes could explain it', '-1', '+2'), ('Reappeared with a placebo', '-1', '+1'),
      ('Toxic level in blood or fluids', '+1', '0'), ('Changed with the dose', '+1', '0'), ('Similar reaction before', '+1', '0'), ('Objective evidence', '+1', '0')]


def naranjo_svg(hi=(), cols=False, bands=False, timing=False):
    b = txt(180, 18, 'Naranjo algorithm: did this drug cause the reaction?', 's3txt', 'middle', 'font-weight:600;font-size:13px')
    b += txt(22, 40, 'Q', 's3sub') + txt(44, 40, 'question', 's3sub') + txt(262, 40, 'Yes', 's3sub', 'middle') + txt(300, 40, 'No', 's3sub', 'middle') + txt(338, 40, 'DK', 's3sub', 'middle')
    if cols: b += box(244, 26, 112, 236, 's3hi', 4)
    for i, (q, y_, n_) in enumerate(NQ):
        y = 46 + 21 * i
        b += box(8, y, 344, 19, 's3hi' if (i + 1) in hi else 's3box', 3)
        b += txt(22, y + 14, str(i + 1), 's3sub') + txt(44, y + 14, q, 's3txt', 'start', 'font-size:12px')
        b += txt(262, y + 14, y_, 's3txt', 'middle', 'font-size:12px') + txt(300, y + 14, n_, 's3txt', 'middle', 'font-size:12px') + txt(338, y + 14, '0', 's3sub', 'middle')
    if bands:
        for j, (lab, rng) in enumerate([('definite', '9'), ('probable', '5-8'), ('possible', '1-4'), ('doubtful', '0')]):
            x = 8 + 87 * j
            b += box(x, 266, 83, 40, 's3hi' if j == 0 else 's3box') + txt(x + 41, 282, rng, 's3txt', 'middle', 'font-weight:600') + txt(x + 41, 299, lab, 's3sub', 'middle')
        b += txt(180, 322, 'her word for the lowest band: remote', 's3sub', 'middle')
        return svg(330, 'Naranjo score sheet with the four score bands.', b)
    if timing: b += txt(180, 280, 'highlighted: the questions about timing', 's3sub', 'middle'); return svg(290, 'Naranjo score sheet with the timing questions 2, 3, 4 and 6 highlighted.', b)
    return svg(262, 'Naranjo score sheet: ten questions with yes, no and do-not-know points.', b)


def naranjo_steps():
    seg = segments(listen('naranjo'), ['Each question is answered', 'Question one', 'Question two', 'Question three', 'Question four', 'Question five', 'Question six', 'Questions seven to ten', 'Dr. Smith pointed to questions two', 'The points are added'])
    T = ['<b>Naranjo algorithm:</b> ten questions that score how likely it is that one drug caused a patient\'s adverse reaction. The answers come from talking with the patient.',
         'Each question is answered <b>yes, no or do not know</b>; each answer has set points, and do not know is 0 on every question.',
         '<b>Q1</b>, previous conclusive reports: yes +1. Answered from the literature.',
         '<b>Q2</b>, appeared after the drug was given: yes +2, no -1.',
         '<b>Q3</b>, improved when the drug was stopped or an antagonist given: yes +1.',
         '<b>Q4</b>, reappeared when the drug was given again: yes +2, no -1.',
         '<b>Q5</b>, other causes could explain it on their own: yes -1, no +2, scored the other way round.',
         '<b>Q6</b>, reappeared with a placebo: yes -1, no +1.',
         '<b>Q7 to Q10</b>, toxic level, change with the dose, similar reaction before, objective evidence: yes +1 each.',
         '<b>Timing questions:</b> she pointed to Q2, Q3 and Q4, and counted Q6 as time related too.',
         '<b>Add the points:</b> 9 definite, 5-8 probable, 1-4 possible, 0 doubtful (her word: remote). A total above 9 or below 0 has no printed band.']
    pics = [naranjo_svg(), naranjo_svg(cols=True), naranjo_svg({1}), naranjo_svg({2}), naranjo_svg({3}), naranjo_svg({4}), naranjo_svg({5}), naranjo_svg({6}),
            naranjo_svg({7, 8, 9, 10}), naranjo_svg({2, 3, 4, 6}, timing=True), naranjo_svg(bands=True)]
    assert len(seg) == len(T) == len(pics)
    return {'title': 'Narrated walkthrough: the Naranjo algorithm', 'src': 'Naranjo Algorithm (one page); reading card; guide 31; transcript 10/28',
            'steps': [{'t': t, 'svg': p, 'say': s} for t, p, s in zip(T, pics, seg)]}


if __name__ == '__main__':
    import subprocess
    R = json.loads(subprocess.run(['node', '-e', "const fs=require('fs'),vm=require('vm');const sx={};vm.createContext(sx);vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';this.R=STEPS3',sx);process.stdout.write(JSON.stringify({'warfarin-target':sx.R['warfarin-target'],'warfarin-genotype':sx.R['warfarin-genotype']}))", P], capture_output=True, text=True, check=True).stdout)
    out = {'rd-' + r: label_steps(r) for r in LABELS}
    out['rd-cpic-warfarin-2017'] = cpic_steps(R)
    out['rd-naranjo'] = naranjo_steps()
    src = open(P).read()
    src = re.sub(r"\n// ---- narrated reading walkthroughs \(generated by rec/gen_reading_walks.py\) ----\n.*\Z", '', src, flags=re.S)
    block = '\n// ---- narrated reading walkthroughs (generated by rec/gen_reading_walks.py) ----\n'
    for k, v in out.items():
        block += f"STEPS3[{json.dumps(k)}] = {json.dumps(v, ensure_ascii=False, indent=1)};\n"
    open(P, 'w').write(src.rstrip('\n') + '\n' + block)
    # spoken segments for the recorder
    json.dump({k: [s['say'] for s in v['steps']] for k, v in out.items()}, open(os.path.join(HERE, 'reading_walk_say.json'), 'w'), indent=1, ensure_ascii=False)
    for k, v in out.items(): print(k, len(v['steps']), 'steps', sum(len(s['say']) for s in v['steps']), 'chars')
