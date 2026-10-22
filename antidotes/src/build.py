"""Builds antidotes/<slug>.html and antidotes/index.html from fragments/ and shim.css.

Diagram content lives in fragments/ (unchanged from the 10/19 handoff; test.js in the drill checks
fragments.sha256). This file only supplies the page shell: theme, embed mode, keyboard steps,
a live region on the caption, and links between diagrams.
Run: python3 antidotes/src/build.py   (the drill's build.py also runs it)
"""
import pathlib, html, json

src = pathlib.Path(__file__).resolve().parent
out = src.parent
css = (src/'shim.css').read_text()
pages = [
 ('01-cyanide-pathway-overview','Cyanide antidote pathway: overview','Toxicokinetic-Based Treatment: Cyanide example (static flowchart)'),
 ('02-cyanide-small-molecules','Cyanide antidote small molecules','Structures of cyanide, thiocyanate, thiosulfate, amyl nitrite and methylene blue'),
 ('03-cyanide-antidote-stepper','Cyanide antidote mechanism','Toxicokinetic-Based Treatment: Cyanide example (animated, 7 steps)'),
 ('04-receptor-antagonist-naloxone-flumazenil','Antidote is a receptor antagonist','Naloxone (opioid receptor) and flumazenil (GABAA benzodiazepine receptor)'),
 ('05-cholinergic-atropine-physostigmine','Atropine and physostigmine at the cholinergic synapse','Receptor antagonist (atropine) and receptor agonist via AChE inhibition (physostigmine)'),
 ('06-pralidoxime-and-co','Antidote removes toxin from active site','Pralidoxime restoring AChE, and high-concentration O₂ displacing CO'),
 ('07-warfarin-vitamin-k','Antidote by-passes an inhibited pathway','Warfarin overdose treated with vitamin K (7 steps, 3 phases)'),
]

# Theme: ?theme= from the drill's viewer, else the drill's saved choice (same origin), else the system setting.
# Embed: ?embed=1 drops the page chrome and reports the page height to the drill's viewer.
HEAD_JS = '''<script>
(function(){
var p=new URLSearchParams(location.search),t=p.get('theme');
if(!t){try{t=localStorage.getItem('phar4344drill:theme');}catch(e){}}
if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);
if(p.get('embed')==='1')document.documentElement.classList.add('embed');
})();
</script>'''
EMBED_CSS = '''html.embed body{background:var(--bg-panel)}
html.embed main{padding:4px 2px 8px}
html.embed .chrome{display:none}
.pager{display:flex;justify-content:space-between;gap:12px;margin-top:18px;font-size:14px}
.keys{font-size:13px;color:var(--text-secondary);margin:10px 0 0}'''
TAIL_JS = '''<script>
(function(){
var cap=document.getElementById('cap');
if(cap)cap.setAttribute('aria-live','polite');
document.addEventListener('keydown',function(e){
  if(e.altKey||e.ctrlKey||e.metaKey||(e.target.closest&&e.target.closest('input,select,textarea')))return;
  var id=e.key==='ArrowRight'?'next':e.key==='ArrowLeft'?'back':'';
  var b=id&&document.getElementById(id);
  if(b&&b.tagName==='BUTTON'){e.preventDefault();b.click();}
});
if(document.documentElement.classList.contains('embed')&&window.parent!==window){
  document.addEventListener('keydown',function(e){if(e.key==='Escape')window.parent.postMessage({antidoteEsc:1},'*');});
  var last=0;
  function send(){var h=Math.ceil(document.body.getBoundingClientRect().height);if(h!==last){last=h;window.parent.postMessage({antidoteH:h,slug:%s},'*');}}
  if(window.ResizeObserver)new ResizeObserver(send).observe(document.body);
  window.addEventListener('load',send);send();
}
})();
</script>'''

tmpl = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
{head_js}
<style>
{css}{embed_css}
</style></head>
<body><main>
<a class="back chrome" href="index.html">← All antidote diagrams</a>
<h1>{title}</h1>
<p class="sub">{sub}</p>
{body}
{keys}<nav class="pager chrome" aria-label="Other diagrams">{prev}{nxt}</nav>
</main>
{tail_js}
</body></html>
'''
links = []
for i, (slug, title, sub) in enumerate(pages):
    body = (src/'fragments'/f'{slug}.html').read_text()
    prev = f'<a href="{pages[i-1][0]}.html">← {html.escape(pages[i-1][1])}</a>' if i else '<span></span>'
    nxt = f'<a href="{pages[i+1][0]}.html">{html.escape(pages[i+1][1])} →</a>' if i + 1 < len(pages) else '<span></span>'
    keys = '<p class="keys">Keyboard: ← and → step through the diagram.</p>\n' if 'id="next"' in body else ''
    (out/f'{slug}.html').write_text(tmpl.format(title=html.escape(title), sub=html.escape(sub), css=css, body=body,
        head_js=HEAD_JS, embed_css=EMBED_CSS, tail_js=TAIL_JS % json.dumps(slug), prev=prev, nxt=nxt, keys=keys))
    links.append(f'<li><a href="{slug}.html">{html.escape(title)}</a><br><span class="sub">{html.escape(sub)}</span></li>')

idx = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Treating Poisonings: Antidote Diagrams</title>
{HEAD_JS}
<style>
{css}
ul{{list-style:none;padding:0;margin:0}} li{{padding:12px 0;border-bottom:1px solid var(--border)}} li:last-child{{border-bottom:0}} li a{{font-weight:500}}
</style></head><body><main>
<a class="back" href="../index.html">← Exam drill</a>
<h1>Treating Poisonings: Antidote Diagrams</h1>
<p class="sub">Intro Pharmacology (PHAR 4344), Treating Poisonings lecture</p>
<div class="card"><ul>
{chr(10).join(links)}
</ul></div></main></body></html>
'''
(out/'index.html').write_text(idx)
print('antidotes: built index +', len(pages), 'pages')
