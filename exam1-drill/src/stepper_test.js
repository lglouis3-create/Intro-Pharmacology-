// Step-through figures: every step settles cleanly (one step shown, dots in sync, no leftover
// fade-out copies or inline transforms, faded shapes keep their opacity, rotated labels keep their
// rotation), and between steps no shape both fades out and fades back in (it should stay or glide).
const path = require('path');
const {chromium} = require('playwright');
(async () => {
const b = await chromium.launch();
const p = await b.newPage({viewport: {width: 900, height: 1000}}); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + path.join(__dirname, '..', '..', 'index.html'));
const keys=await p.evaluate(()=>FIG.keys().filter(k=>/-anim$/.test(k)));
const check=()=>p.evaluate(()=>{const bad=[];const fig=document.querySelector('.fig');const on=fig.querySelectorAll('.st.on');
 if(on.length!==1)bad.push('on='+on.length);
 const i=[...fig.querySelectorAll('.st')].indexOf(on[0]);const d=[...fig.querySelectorAll('.sdot')].findIndex(x=>x.classList.contains('on'));if(i!==d)bad.push('dot '+d+' vs '+i);
 if(fig.querySelector('.st-out'))bad.push('ghost left');
 on[0].querySelectorAll('[opacity]').forEach(el=>{const a=+el.getAttribute('opacity'),c=+getComputedStyle(el).opacity;if(Math.abs(a-c)>0.02)bad.push('opacity '+el.tagName+' '+a+'≠'+c);});
 on[0].querySelectorAll('*').forEach(el=>{if(el.style.transform)bad.push('leftover transform');});
 on[0].querySelectorAll('[transform]').forEach(el=>{const t=getComputedStyle(el).transform;if(/rotate/.test(el.getAttribute('transform'))&&(t==='none'))bad.push('rotation lost');});
 return [...new Set(bad)];});
let problems=0;
for(const k of keys){await p.evaluate(k=>{document.getElementById('view').innerHTML='<div style="max-width:620px">'+FIG(k)+'</div>';},k);
 const n=await p.evaluate(()=>document.querySelectorAll('.fig .st').length);
 await p.click('[data-go="replay"]'); await p.waitForTimeout(700); let r=await check(); if(r.length){problems++;console.log(k,'replay0',r);}
 for(let i=0;i<n;i++){await p.click('[data-go="1"]'); await p.waitForTimeout(1000); r=await check(); if(r.length){problems++;console.log(k,'step',i+2,r);}}
 for(let i=0;i<7;i++){await p.click(i%3?'[data-go="1"]':'[data-go="-1"]'); await p.waitForTimeout(40);} await p.click('[data-go="dot"][data-i="'+(n-1)+'"]'); await p.waitForTimeout(1100); r=await check(); if(r.length){problems++;console.log(k,'rapid',r);}
}

let worst = [], total = 0;

for(const k of keys){await p.evaluate(k=>{document.getElementById('view').innerHTML='<div style="max-width:620px">'+FIG(k)+'</div>';},k);
 const n=await p.evaluate(()=>document.querySelectorAll('.fig .st').length);
 for(let i=0;i<Math.min(n,5);i++){
  await p.click('[data-go="1"]');
  // right after the click: ghost leaves whose signature is also in the new step = wrongly faded
  const bad=await p.evaluate(()=>{const g=document.querySelector('.st-out');if(!g)return 0;const on=document.querySelector('.st.on');
   const sig=el=>el.getAttribute('data-k')||[el.tagName,(el.getAttribute('class')||'').replace(/\b(fadein|glide)\b/g,'').trim(),el.tagName==='text'?el.textContent:(el.getAttribute('fill')||'')].join('|');
   const cnt={};on.querySelectorAll('text,circle,rect,ellipse,line,polyline,polygon,path').forEach(e=>{if(!e.classList.contains('capt')){const s=sig(e);cnt[s]=(cnt[s]||0)+1;}});
   const gs={};g.querySelectorAll('text,circle,rect,ellipse,line,polyline,polygon,path').forEach(e=>{const s=sig(e);gs[s]=(gs[s]||0)+1;});
   let c=0;on.querySelectorAll('.fadein').forEach(e=>{if(e.classList.contains('capt'))return;const s=sig(e);if(gs[s]){c++;gs[s]--;}});return c;});
  total+=bad;if(bad)worst.push(k+' move '+(i+1)+': '+bad);
  await p.waitForTimeout(1000);}
}

const ok = !problems && !total && !errs.length;
console.log(`stepper_test.js: ${ok ? 'passed' : 'FAILED'} (${keys.length} step-throughs; settle problems ${problems}; wrongly faded ${total}; page errors ${errs.length})`);
if (!ok) console.log(worst.slice(0, 10), errs.slice(0, 5));
await b.close(); process.exit(ok ? 0 : 1);
})();
