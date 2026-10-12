#!/usr/bin/env python3
"""Generate q_TERMS.js from glossary.js: up to three questions per term: a
situation to recognise (scene -> term), the term's one-line meaning (term ->
gist, short options), and the full definition -> term.
Distractors come from the term's `confuse` list first, then its group. The
second question is `dupOf` the first so one exam paper never carries both."""
import json, random, re, subprocess, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
if not os.path.exists('glossary.js'):
    sys.exit('gen_terms.py: glossary.js not found')
js = "const fs=require('fs'),vm=require('vm');process.stdout.write(JSON.stringify(vm.runInNewContext(fs.readFileSync('glossary.js','utf8')+';TERMS',{})))"
TERMS = json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout)
by_id = {t['id']: t for t in TERMS}
# lecture -> exam (from course.js), so distractors outside the confuse list and the group
# come from the same exam first (an Exam 2 term is not offered an Exam 1 term as a look-alike).
js_c = "const fs=require('fs'),vm=require('vm');const C=vm.runInNewContext(fs.readFileSync('course.js','utf8')+';COURSE',{});process.stdout.write(JSON.stringify({exam:Object.fromEntries(C.lectures.map(l=>[l.id,l.exam])),prof:Object.fromEntries(C.lectures.map(l=>[l.id,l.prof]))}))"
try:
    _lec = json.loads(subprocess.run(['node', '-e', js_c], capture_output=True, text=True, check=True).stdout)
    LEC_EXAM, LEC_PROF = _lec['exam'], _lec['prof']
except Exception:
    LEC_EXAM, LEC_PROF = {}, {}
exam_of = lambda t: LEC_EXAM.get(t['lecture'], 1)
groups = {}
for t in TERMS:
    groups.setdefault(t['group'], []).append(t)

def plain(term):
    """The term without its parenthetical: 'Competitive (reversible) antagonist' -> 'Competitive antagonist'."""
    return re.sub(r'\s*\([^)]*\)', '', term).strip()

def words(s, n=4):
    """Lower-case words of n+ letters (parentheticals included)."""
    return [w for w in re.split(r'[^0-9A-Za-zα-ωΑ-Ω]+', s.lower()) if len(w) >= n]

def names_itself(text, t):
    """True when any 4+-letter word of the term (including its parenthetical) occurs in text."""
    low = text.lower()
    return any(w in low for w in words(t['term']))

def is_parent(x, t):
    """A synonym or parent class: its first 4+-letter word is used in the term's own def or gist."""
    w = words(plain(x['term']))
    if not w:
        return False
    low = (t['def'] + ' ' + t.get('gist', '')).lower()
    return w[0] in low

def pick_distractors(t, key, k=3, need_longer=False):
    """Distractor terms: confusables first, then the same group, then anywhere.
    A synonym or parent class (its name is used in the term's own def or gist) is never a distractor."""
    rng = random.Random(t['id'])
    pool = [by_id[c] for c in t.get('confuse', []) if c in by_id and c != t['id']]
    same = [x for x in groups[t['group']] if x['id'] != t['id'] and x not in pool]
    rng.shuffle(same)
    rest = [x for x in TERMS if x['id'] != t['id'] and x not in pool and x not in same]
    # same exam first, each part shuffled on its own (so adding another exam's terms
    # leaves this exam's draws unchanged)
    rest_same = [x for x in rest if exam_of(x) == exam_of(t)]
    rest_other = [x for x in rest if exam_of(x) != exam_of(t)]
    rng.shuffle(rest_same)
    rng.shuffle(rest_other)
    rest = rest_same + rest_other
    cands = [x for x in pool + same + rest if not is_parent(x, t)]
    chosen = []
    if need_longer:
        shown = (lambda x: len(plain(x['term']))) if key == 'term' else (lambda x: len(x[key]))
        longer = [x for x in cands if shown(x) > shown(t)]
        if not longer:
            return None
        chosen.append(longer[0])
    for x in cands:
        if len(chosen) >= k:
            break
        if x not in chosen:
            chosen.append(x)
    return chosen

qs = []
group_ids = {}
for g in groups:
    group_ids[g] = 'g' + str(len(group_ids) + 1)

for t in TERMS:
    cite = t.get('cite', '')
    base = dict(lecture=t['lecture'], prof=LEC_PROF.get(t['lecture'], 'Gottlieb'), tier='new', topic='TERMS', sub=group_ids[t['group']],
                skill='term', concept='term-' + t['id'], tags=['term'], source=t.get('src', 'slide'),
                cite=cite, quote=t.get('quote', ''))
    # Explanations: a wrong option's why says what that term IS (its gist) and the distinguishing
    # point versus the right term; the right option's why gives the gist plus the key feature.
    # Term names keep their display capitalisation. Teach adds the hook and the scene when present,
    # so it never just repeats the definition.
    def first_sentence(s):
        m = re.match(r'(.+?[.!?])(\s|$)', s.strip())
        return m.group(1) if m else s.strip()
    def gist_of(x):
        return (x.get('gist') or first_sentence(x['def'])).strip()
    def key_feature(x):
        fs = first_sentence(x['def'])
        if x.get('gist') and fs.lower() != x['gist'].lower():
            return fs
        return x.get('hook', '')
    def wrong_why(x, lead):
        return f"{x['term']}: {gist_of(x)} {lead} {t['term']}: {gist_of(t)}"
    def teach_with(scene_in_stem):
        parts = [gist_of(t)]
        if t.get('hook'):
            parts.append(t['hook'])
        if t.get('scene') and not scene_in_stem:
            parts.append('Scene: ' + t['scene'])
        if len(parts) == 1:
            kf = key_feature(t)
            if kf and kf != parts[0]:
                parts.append(kf)
        return ' '.join(parts)
    def fig(q):
        if t.get('fig'):
            q['fg'] = t['fig']
        return q
    first = None
    # 1. a situation -> the term (the term named nowhere in the stem)
    if t.get('scene'):
        d = pick_distractors(t, 'term', need_longer=True)
        if d:
            opts = [{'t': plain(t['term']), 'correct': True, 'why': f"This situation is {t['term']}: {gist_of(t)} {key_feature(t)}".strip()}]
            for x in d:
                opts.append({'t': plain(x['term']), 'correct': False, 'why': wrong_why(x, 'The situation described is')})
            first = 'T-' + t['id'] + '-1'
            qs.append(fig(dict(base, id=first, stem='Which term fits this situation? ' + t['scene'], options=opts, teach=teach_with(True))))
    # 2. the term -> its one-line meaning (short options; a longer wrong gist must exist)
    if t.get('gist'):
        d2 = pick_distractors(t, 'gist', need_longer=True)
        if d2:
            opts = [{'t': t['gist'], 'correct': True, 'why': f"{t['term']}: {gist_of(t)} {key_feature(t)}".strip()}]
            for x in d2:
                opts.append({'t': x['gist'], 'correct': False, 'why': wrong_why(x, 'The term asked for is')})
            q2 = fig(dict(base, id='T-' + t['id'] + '-2', stem=plain(t['term']) + ' means:', options=opts, teach=teach_with(False)))
            if first:
                q2['dupOf'] = first
            else:
                first = q2['id']
            qs.append(q2)
    # 3. the full definition -> the term. When the def names the term (any 4+-letter word of
    #    the term, parenthetical included) fall back to the gist; when the gist does too, skip.
    text3 = None
    if not names_itself(t['def'], t):
        text3 = t['def']
    elif t.get('gist') and not names_itself(t['gist'], t):
        text3 = t['gist']
    d3 = pick_distractors(t, 'term', need_longer=True) if text3 else None
    if d3:
        opts = [{'t': plain(t['term']), 'correct': True, 'why': f"This defines {t['term']}: {gist_of(t)} {t.get('hook', '')}".strip()}]
        for x in d3:
            opts.append({'t': plain(x['term']), 'correct': False, 'why': wrong_why(x, 'The definition given is')})
        q3 = fig(dict(base, id='T-' + t['id'] + '-3', stem='Which term is defined as: ' + text3.rstrip('.') + '?', options=opts, teach=teach_with(False)))
        if first:
            q3['dupOf'] = first
        qs.append(q3)

out = ["TOPICS.push({id:'TERMS', name:'Terminology', prof:'Gottlieb', lecture:'L01',",
       "  cite:'Definitions from the Day 1–13 decks and transcripts',",
       "  subs:[" + ','.join(f"{{id:'{gid}', name:{json.dumps(g)}, cite:'glossary'}}" for g, gid in group_ids.items()) + "]});",
       '/* Generated by gen_terms.py from glossary.js. Edit the glossary, not this file. */',
       'QUESTIONS.push(' + ',\n'.join(json.dumps(q, ensure_ascii=False) for q in qs) + ');']
open('q_TERMS.js', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(qs), 'term questions from', len(TERMS), 'terms')
