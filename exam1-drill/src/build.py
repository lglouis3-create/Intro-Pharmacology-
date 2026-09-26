#!/usr/bin/env python3
"""Assemble the single-file drill from shell.html + course.js + content + app.js.

Every source is syntax-checked first and the assembled script again before the
output is replaced, so a stray comma stops the build instead of shipping a page
that loads blank."""
import os, re, subprocess, sys, tempfile, json

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
DATA_FILES = ['q_L01.js', 'q_L02.js', 'q_L03.js', 'q_DL1.js']
PAGES = ['reference.js', 'tell.js', 'guide.js']
SOURCES = ['course.js'] + DATA_FILES + PAGES + ['app.js']

def node_check(path, label):
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f'ERROR: {label} has a JavaScript syntax error\n{(r.stderr or r.stdout).strip()}')

missing = [f for f in SOURCES if not os.path.exists(f)]
if missing:
    sys.exit('ERROR: missing sources: ' + ', '.join(missing))
for f in SOURCES:
    node_check(f, f)
print(f'  {len(SOURCES)} sources parse cleanly')

course = open('course.js', encoding='utf-8').read()
out_name = re.search(r"output:\s*'([^']+)'", course).group(1)
title = re.search(r"title:\s*'([^']+)'", course).group(1)

parts = [course, 'const TOPICS = [];\nconst QUESTIONS = [];\n']
for f in DATA_FILES + PAGES:
    parts.append(open(f, encoding='utf-8').read())
parts.append(open('app.js', encoding='utf-8').read())
script = '\n'.join(parts)
if '</script' in script:
    sys.exit('ERROR: a source contains "</script", which would end the page script early')

shell = open('shell.html', encoding='utf-8').read()
if '/*__DATA__*/' not in shell:
    sys.exit('ERROR: data marker not found in shell.html')
html = shell.replace('/*__DATA__*/', script).replace('__TITLE__', title)

with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as t:
    t.write(script); tmp = t.name
try:
    node_check(tmp, 'the assembled script')
finally:
    os.unlink(tmp)
print('  assembled script parses cleanly')

out = os.path.join(HERE, '..', out_name)
with open(out + '.tmp', 'w', encoding='utf-8') as fh:
    fh.write(html)
os.replace(out + '.tmp', out)
# GitHub Pages serves the repo root: keep index.html in step with the build
import shutil
shutil.copyfile(out, os.path.join(HERE, '..', '..', 'index.html'))
print(f'wrote {os.path.normpath(out)}  ({len(html)/1024:.0f} KB)')
