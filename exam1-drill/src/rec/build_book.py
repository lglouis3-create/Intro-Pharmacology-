"""Joins recorded Exam 4 clips into one MP3 with chapters: the 'Exam 4 core' listen, in her study-list order.
Usage: python3 -I rec/build_book.py <scratch dir>   (writes ../audio/exam4-core.mp3 and book_exam4.js)"""
import os, re, subprocess, sys, json
A = os.path.join(os.path.dirname(__file__), '..', '..', 'audio'); S = sys.argv[1]
def clips(prefix):
    fs = [f for f in os.listdir(A) if re.fullmatch(re.escape(prefix) + r'-\d+\.mp3', f)]
    return sorted(fs, key=lambda f: int(f.rsplit('-', 1)[1][:-4]))
CH = [
  ("Her second think/pair/share table: sorting the enzyme examples", clips('s3-enz-grid')),
  ("Her second think/pair/share table, one gene at a time", clips('s3-tps2-table')),
  ("Worksheet: reading the trastuzumab label (Guide 27)", clips('gw-guide4-l21-5')),
  ("Worksheet: the Herceptin label talk", ['rd-label-trastuzumab.mp3']),
  ("Worksheet: carbamazepine and abacavir, one gene, two variants (Guide 28)", clips('gw-guide4-l21-6')),
  ("Worksheet: the Tegretol label talk", ['rd-label-carbamazepine.mp3']),
  ("Worksheet: the Ziagen label talk", ['rd-label-abacavir.mp3']),
  ("Furuta 1998: CYP2C19, omeprazole and H. pylori cure (Guide 22)", clips('gw-guide4-l20-8')),
  ("Furuta 1998: the reading talk", ['rd-furuta-1998.mp3']),
  ("Warfarin: CYP2C9, VKORC1 and CYP4F2 (Guide 20)", clips('gw-guide4-l20-6')),
  ("Warfarin, CPIC Figure 1: how warfarin works", clips('s3-warfarin-target')),
  ("Warfarin, CPIC Figure 2: which variants change the dose", clips('s3-warfarin-genotype')),
  ("Walking the CPIC warfarin algorithm (Guide 25)", clips('gw-guide4-l21-3')),
  ("The CPIC warfarin guideline talk", ['rd-cpic-warfarin-2017.mp3']),
  ("Causality and the Naranjo algorithm (Guide 31)", clips('gw-guide4-l22-3')),
  ("Scoring one case with the Naranjo algorithm", clips('s3-naranjo-case')),
]
def dur(f): return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).decode())
gap_clip, gap_ch = 0.7, 2.0
for g in (gap_clip, gap_ch):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', str(g), '-ar', '44100', '-ac', '1', f'{S}/sil{g}.wav'], check=True)
lst, t, chap = [], 0.0, []
for ci, (title, fs) in enumerate(CH):
    assert fs, title
    if ci: lst.append(f'{S}/sil{gap_ch}.wav'); t += gap_ch
    start = t
    for k, f in enumerate(fs):
        if k: lst.append(f'{S}/sil{gap_clip}.wav'); t += gap_clip
        p = os.path.abspath(os.path.join(A, f)); w = f'{S}/{f[:-4]}.wav'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', p, '-ar', '44100', '-ac', '1', w], check=True)
        lst.append(w); t += dur(w)
    chap.append((title, start, t))
open(f'{S}/list.txt', 'w').write(''.join(f"file '{x}'\n" for x in lst))
meta = ';FFMETADATA1\ntitle=PHAR 4344 Exam 4 core\nartist=PHAR 4344 drill\n' + ''.join(f'[CHAPTER]\nTIMEBASE=1/1000\nSTART={int(a*1000)}\nEND={int(b*1000)}\ntitle={n}\n' for n, a, b in chap)
open(f'{S}/meta.txt', 'w').write(meta)
out = os.path.join(A, 'exam4-core.mp3')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{S}/list.txt', '-i', f'{S}/meta.txt', '-map_metadata', '1', '-map_chapters', '1', '-ac', '1', '-b:a', '64k', '-id3v2_version', '3', out], check=True)
js = 'const BOOK4 = ' + json.dumps({'file': 'exam4-core.mp3', 'title': 'Exam 4 core', 'secs': round(dur(out)), 'chapters': [{'t': n, 's': round(a, 1)} for n, a, b in chap]}, indent=1) + ';\n'
open(os.path.join(os.path.dirname(__file__), '..', 'book_exam4.js'), 'w').write('// The Exam 4 core listen: one MP3 of recorded clips in her study-list order (rec/build_book.py).\n' + js)
print(len(chap), 'chapters', round(dur(out)/60, 1), 'min', os.path.getsize(out), 'bytes')
