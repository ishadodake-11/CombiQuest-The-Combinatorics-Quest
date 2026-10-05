/* Theory view (formulation, algorithms, architecture diagram) and Tests view. */
function renderTheory(){
  const box=(x,y,w,h,t,sub)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" style="fill:var(--glass2);stroke:var(--bd)"/><text x="'+(x+w/2)+'" y="'+(y+20)+'" text-anchor="middle" style="fill:var(--ink);font:700 12px Outfit,sans-serif">'+t+'</text>'+sub.split('|').map((s,i)=>'<text x="'+(x+w/2)+'" y="'+(y+36+i*12)+'" text-anchor="middle" style="fill:var(--dim);font:9.5px JetBrains Mono,monospace">'+s+'</text>').join('');
  const ar=(a,b,c,d)=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" marker-end="url(#ar)" style="stroke:var(--dim);stroke-width:1.5"/>';
  const svg='<svg viewBox="0 0 440 290" class="arch"><defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" style="fill:var(--dim)"/></marker></defs>'
   +box(10,8,130,56,'Map &amp; Battle','game.js|stages · hearts · timer')+box(155,8,130,56,'Workshop','workshop.js|custom inputs')+box(300,8,130,56,'Theory &amp; Tests','docs-ui.js|this page')
   +box(10,100,110,56,'Storage','storage.js|XP · progress · sound')+box(300,100,130,56,'Test suite','test-cases.js|test-runner.js')
   +box(60,200,320,66,'Maths engine','math-engine.js (pure functions, no DOM)|counting · pigeonhole · recurrence · generators')
   +ar(65,64,65,100)+ar(135,64,150,200)+ar(220,64,220,200)+ar(365,64,365,100)+ar(365,156,335,200)+'</svg>';
  $('#theory').innerHTML=`
<div class="pn th"><h2>1 · Counting</h2>
<p>n! = n(n−1)…2·1 and 0! = 1. Choosing r items from n:</p>
<div class="fm">P(n,r) = n! / (n−r)!  (ordered, no repeats)<br>C(n,r) = n! / (r!(n−r)!)  (unordered, no repeats)<br>nʳ  (ordered, repeats)  ·  C(n+r−1, r)  (unordered, repeats: r stars, n−1 bars)</div>
<p>Conventions: P(n,r) = C(n,r) = 0 for r &gt; n, and 0⁰ = 1.</p>
<ol><li>Read type, n and r.</li><li>Validate: whole numbers, 0 ≤ n, r ≤ 60.</li><li>Handle edge cases (r &gt; n, r = 0, n = 0).</li><li>Compute factorials with BigInt (exact).</li><li>Apply the formula for the chosen type.</li><li>Display every intermediate step.</li></ol></div>
<div class="pn th"><h2>2 · Pigeonhole principle</h2>
<p>If Σ nᵢ = N items are placed in k boxes, then max nᵢ ≥ ⌈N/k⌉. <i>Proof:</i> if every nᵢ ≤ ⌈N/k⌉ − 1 then N ≤ k(⌈N/k⌉ − 1) &lt; N, a contradiction.</p>
<div class="fm">Force m items in one box  ⇔  N ≥ k(m−1) + 1</div>
<ol><li>Read N, k and m.</li><li>Validate: N ≥ 0, k ≥ 1, m ≥ 1, whole numbers.</li><li>Compute ⌈N/k⌉.</li><li>Compute k(m−1)+1.</li><li>Compare N with k(m−1)+1.</li><li>Explain the worst case in words.</li></ol></div>
<div class="pn th"><h2>3 · Linear recurrence (order 2)</h2>
<div class="fm">aₙ = c₁aₙ₋₁ + c₂aₙ₋₂  →  r² − c₁r − c₂ = 0,  D = c₁² + 4c₂<br>D &gt; 0: aₙ = α·r₁ⁿ + β·r₂ⁿ<br>D = 0: aₙ = (α + βn)·rⁿ<br>D &lt; 0: aₙ = ρⁿ(A cos nθ + B sin nθ),  ρ = √(−c₂),  θ = atan2(√(−D)/2, c₁/2)</div>
<ol><li>Read c₁, c₂, a₀, a₁ and validate they are numbers.</li><li>Generate terms a₂, a₃, … from the recurrence.</li><li>Form the characteristic equation and compute D.</li><li>Choose the case and solve for the constants from a₀, a₁.</li><li>Verify the closed form against the recurrence at n = 5.</li><li>Show every step and the table of terms.</li></ol></div>
<div class="pn th"><h2>Software architecture</h2>${svg}<div class="sm">Interface views call the maths engine and never contain maths themselves. The test suite exercises the same engine the game and Workshop use.</div></div>`;
}
function renderTests(){
  const rows=runTests(ENGINE,TEST_CASES),ok=rows.filter(r=>r.pass).length;
  $('#tests').innerHTML='<div class="pn"><h2>Test suite</h2><div class="sm">'+rows.length+' cases run live against the maths engine. Edge cases and invalid inputs are tagged.</div>'
   +'<div class="row"><button class="pri" id="rt">Run all tests</button><div class="'+(ok==rows.length?'good':'bad')+'" style="align-self:center;font-weight:700">'+ok+' / '+rows.length+' passed</div></div>'
   +'<table><tr><th>ID</th><th>Case</th><th>Input</th><th>Expected</th><th>Actual</th><th>Result</th></tr>'
   +rows.map(r=>'<tr><td>'+r.id+'</td><td style="text-align:left">'+r.desc+(r.edge?' <span class="tag">edge</span>':'')+'</td><td>'+r.input+'</td><td>'+r.expected+'</td><td>'+r.actual+'</td><td class="'+(r.pass?'good':'bad')+'">'+(r.pass?'PASS':'FAIL')+'</td></tr>').join('')
   +'</table></div>';
  $('#rt').onclick=renderTests;
}
