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
    rng.shuffle(rest)
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
    base = dict(lecture=t['lecture'], prof='Gottlieb', tier='new', topic='TERMS', sub=group_ids[t['group']],
                skill='term', concept='term-' + t['id'], tags=['term'], source=t.get('src', 'slide'),
                cite=cite, quote=t.get('quote', ''))
    # gist (or def) + hook; the -3 item's stem already carries the def, so it gets the hook (or gist) only
    teach = (t.get('gist') or t['def']) + (' ' + t['hook'] if t.get('hook') else '')
    teach3 = t.get('hook') or t.get('gist') or t['def']
    def fig(q):
        if t.get('fig'):
            q['fg'] = t['fig']
        return q
    first = None
    # 1. a situation -> the term (the term named nowhere in the stem)
    if t.get('scene'):
        d = pick_distractors(t, 'term', need_longer=True)
        if d:
            opts = [{'t': plain(t['term']), 'correct': True, 'why': 'This situation is ' + t['term'].lower() + ': ' + (t.get('gist') or t['def'])}]
            for x in d:
                opts.append({'t': plain(x['term']), 'correct': False, 'why': x['term'] + ' would be: ' + (x.get('gist') or x['def'])})
            first = 'T-' + t['id'] + '-1'
            qs.append(fig(dict(base, id=first, stem='Which term fits this situation? ' + t['scene'], options=opts, teach=teach)))
    # 2. the term -> its one-line meaning (short options; a longer wrong gist must exist)
    if t.get('gist'):
        d2 = pick_distractors(t, 'gist', need_longer=True)
        if d2:
            opts = [{'t': t['gist'], 'correct': True, 'why': 'That is ' + t['term'].lower() + '.'}]
            for x in d2:
                opts.append({'t': x['gist'], 'correct': False, 'why': 'That is ' + x['term'].lower() + ', not ' + t['term'].lower() + '.'})
            q2 = fig(dict(base, id='T-' + t['id'] + '-2', stem=plain(t['term']) + ' means:', options=opts, teach=teach))
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
        opts = [{'t': plain(t['term']), 'correct': True, 'why': 'This is the definition of ' + t['term'] + '.'}]
        for x in d3:
            opts.append({'t': plain(x['term']), 'correct': False, 'why': x['term'] + ': ' + (x.get('gist') or x['def'])})
        q3 = fig(dict(base, id='T-' + t['id'] + '-3', stem='Which term is defined as: ' + text3.rstrip('.') + '?', options=opts, teach=teach3))
        if first:
            q3['dupOf'] = first
        qs.append(q3)

out = ["TOPICS.push({id:'TERMS', name:'Terminology', prof:'Gottlieb', lecture:'L01',",
       "  cite:'Definitions from the Day 1–5 decks and transcripts',",
       "  subs:[" + ','.join(f"{{id:'{gid}', name:{json.dumps(g)}, cite:'glossary'}}" for g, gid in group_ids.items()) + "]});",
       '/* Generated by gen_terms.py from glossary.js. Edit the glossary, not this file. */',
       'QUESTIONS.push(' + ',\n'.join(json.dumps(q, ensure_ascii=False) for q in qs) + ');']
open('q_TERMS.js', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(qs), 'term questions from', len(TERMS), 'terms')
