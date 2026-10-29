#!/usr/bin/env python3
"""Builds readings.js (const READINGS = [...]) from src/readings/*.json plus the course facts below:
which exam and lecture each reading belongs to, its status in class, its Drive link and the pages it points to."""
import json, os, glob
HERE = os.path.dirname(os.path.abspath(__file__))
# id -> exam, lecture id(s), date label, status, links, Drive file id
META = {
 'casarett-ch2': dict(exam=3, lectures=['L13'], status='background', drive='1no1QOt4EWTWF7nXJfbB1wXDRk6SYCVqH', links=[['guide','guide3-4','Guide: exposure'],['guide','guide3-7','Guide: dose–response curves'],['ref','ref3-5','Reference: frequency and half-life'],['ref','ref3-7','Reference: the LD50 table']]),
 'rodriguez-mozaz': dict(exam=3, lectures=['L13','L14'], status='discussed', drive='1wXHP2hs5bfbkNXxCgpUqfALQzdct7ZdC', links=[['guide','guide3-l14-3','Guide: the reading discussed'],['ref','ref3-l14-3','Reference: the reading by principle']]),
 'katzung-57': dict(exam=3, lectures=['L14','L15'], status='assigned', drive='1hf9wt_yiFlsmqrZlnwKxZJoBAGz7imaQ', links=[['guide','guide3-l15-10','Guide: what moved to 10/19']]),
 'katzung-58': dict(exam=3, lectures=['L14','L15'], status='assigned', drive='1wiZJ4AFDgDcYQzrggh81lE85CV2hn9xn', links=[['guide','guide3-l15-7','Guide: overdose changes kinetics'],['guide','guide3-l15-9','Guide: preventing absorption'],['ref','ref3-l15-7','Reference: treatment approaches']]),
 'dipiro-e9': dict(exam=3, lectures=['L15'], status='discussed', drive='1F1DWfzg4N9RrqRzgnrZ670tN2iIjoui3', links=[['guide','guide3-l15-9','Guide: preventing absorption']]),
 'aapcc-bb': dict(exam=3, lectures=['L16'], status='discussed', drive='1_94-Tuaz2NnBTG20hDC7hH_Yx7cSy4gT', links=[['guide','guide3-l15-10','Guide: evidence-based guidelines']]),
 'aapcc-ccb': dict(exam=3, lectures=['L16'], status='discussed', drive='1jXdXnZXsgsCJqceJUyxWwzyPRmo8Td3o', links=[['guide','guide3-l15-10','Guide: evidence-based guidelines']]),
 'marraffa': dict(exam=3, lectures=['L16'], status='discussed', drive='1Xa8ZTWXxMZDdn1v6732oGJzFGIQWJzS1', links=[]),
 'katzung-5': dict(exam=4, lectures=['L18','L19'], status='background', date='Tue 10/20 – Thu 10/22', drive='1nRnG1kVR0Nq1VgATSktxfIASE9KR8o79', links=[['guide','guide4-l18-1','Guide: naming variants'],['guide','guide4-l19-4','Guide: CYP2C9 and warfarin'],['guide','guide4-l19-6','Guide: irinotecan and UGT1A1']]),
 'dipiro-e6': dict(exam=4, lectures=[], status='assigned', date='Tue 10/20', drive='1dXEvIYObmQk0u4mT3yBxWqs1Isi49XBR', links=[]),
 'furuta-1998': dict(exam=4, lectures=['L19','L20'], status='discussed', date='Introduced Thu 10/22; discussed Mon 10/26', drive='1JicYDOQ8dTUK-5rsyDlEq20gArVwKc6j', links=[['guide','guide4-l20-8','Guide: the Furuta 1998 discussion'],['guide','guide4-l19-5','Guide: CYP2C19 and PPIs']]),
 'label-abacavir': dict(exam=4, lectures=['L21'], status='discussed', date='Tue 10/27', drive='1sdpa2XF9pppf8hDWC7LLpJOCrbgHPaIZ', links=[['guide','guide4-l21-6','Guide 28: carbamazepine and abacavir']]),
 'label-carbamazepine': dict(exam=4, lectures=['L21'], status='discussed', date='Tue 10/27', drive='1F38CLjvV8oTnXIQAuMwd28eMflUGd-_F', links=[['guide','guide4-l21-6','Guide 28: carbamazepine and abacavir']]),
 'label-trastuzumab': dict(exam=4, lectures=['L21'], status='discussed', date='Tue 10/27', drive='1b67c0c856hh9cIQN-pIzoTzC4b-ylbqn', links=[['guide','guide4-l21-5','Guide 27: trastuzumab and HER2']]),
 'cpic-warfarin-2017': dict(exam=4, lectures=['L21'], status='discussed', date='Tue 10/27', drive='1XmXKozagnU8-5rPc4aQGHy6cDL6eN6tM', links=[['guide','guide4-l21-3','Guide 25: the warfarin algorithm'],['guide','guide4-l21-2','Guide 24: CPIC guidelines']]),
 'naranjo': dict(exam=4, lectures=['L22'], status='discussed', date='Wed 10/28', drive='1grrhx5-0rlCQBo7lpW6tbVbdCm535LPC', links=[['guide','guide4-l22-3','Guide 31: the Naranjo algorithm']]),
 'katzung-1': dict(exam=1, lectures=['L01'], status='his', drive='1RFWrersAluemOn2e2VoeMUUc4pomRprO', links=[['guide','guide-7','Guide 7: drug basics he tests']]),
 'katzung-2': dict(exam=1, lectures=['L01','L02','L03','L04','L05'], status='his', drive='1ZVE4Yu0CK3wgawDgzxAWAgss6l7C8kZb', links=[['guide','guide-1','Guide 1: affinity, efficacy, potency'],['guide','guide-3','Guide 3: kinds of antagonists']]),
 'katzung-6': dict(exam=1, lectures=['L06'], status='his', drive='1MyxIvcPC9-TqxR4jiC4GYCNZB5JkpzHL', links=[['guide','guide-10','Guide 10: how to read a curve']]),
 'katzung-7': dict(exam=2, lectures=['L09'], status='his', drive='', links=[['guide','guide2-4','Guide: muscarinic drugs']]),
 'katzung-8': dict(exam=2, lectures=['L08','L09'], status='his', drive='1ztNurRtGdWMIa5nRIVnNAymDtqAR9ar1', links=[['guide','guide2-4','Guide: muscarinic drugs']]),
 'katzung-9': dict(exam=2, lectures=['L10','L11'], status='his', drive='16rbcHCnovDtluF3UuoU13SJ_ZLGXkbMN', links=[['guide','guide2-5','Guide: indirect-acting adrenergic drugs'],['guide','guide2-7','Guide: β drugs, epinephrine, NE']]),
 'katzung-10': dict(exam=2, lectures=['L10','L11'], status='his', drive='1xkl8inenYnZwP-g4ouJ1ErPsrKv2pfGq', links=[['guide','guide2-6','Guide: α1 and α2 drugs'],['guide','guide2-7','Guide: β drugs, epinephrine, NE']]),
 'katzung-17': dict(exam=2, lectures=['L12'], status='his', drive='1PeBXfI60PH9FSy76Z4_4ZwTNCmQSlkTM', links=[['guide','guide2-10','Guide: RAAS']]),
 'katzung-19': dict(exam=2, lectures=['L11'], status='his', drive='10IokEm4YKnfC6GTyfx_R54BsAtAa_ku_', links=[['guide','guide2-9','Guide: nitric oxide']]),
}
ORDER = list(META)
cards = {}
for f in glob.glob(os.path.join(HERE, 'readings', '*.json')):
    c = json.load(open(f, encoding='utf-8')); cards[c['id']] = c
out = []
for rid in ORDER:
    if rid not in cards: continue
    c = dict(cards[rid]); m = META[rid]
    c.update(exam=m['exam'], lectures=m['lectures'], status=m['status'], links=m['links'],
             drive=('https://drive.google.com/file/d/%s/view' % m['drive']) if m['drive'] else '')
    if m.get('date'): c['date'] = m['date']
    out.append(c)
unknown = [k for k in cards if k not in META]
if unknown: raise SystemExit('readings without META: ' + ', '.join(unknown))
js = 'const READINGS = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n'
assert '`' not in js and '${' not in js
open(os.path.join(HERE, 'readings.js'), 'w', encoding='utf-8').write(js)
print('readings.js: %d readings' % len(out))
