/* Workshop view: custom-input solvers. All maths comes from math-engine.js. */
const num=id=>{const v=$(id).value.trim();return v===''?NaN:Number(v)};          // empty field -> NaN -> validation message
const put=(id,lines)=>{const o=$(id);o.innerHTML=lines.map(l=>'<div'+(l[1]?' class="'+l[1]+'"':'')+'>'+l[0]+'</div>').join('');o.scrollIntoView({block:'nearest',behavior:'smooth'})};

$('#wc').onclick=()=>{const m=$('#wm').value,n=num('#wn'),r=num('#wr'),x=counting(m,n,r);
  if(!x.ok)return put('#o1',[[x.e,'bad']]);
  put('#o1',[[m+' · n='+n+' · r='+r+(x.edge?' · <b>edge case</b>':'')],...x.s.map((t,i,a)=>[t,i==a.length-1?'good':''])])};

$('#pc').onclick=()=>{const x=pigeonhole(num('#pn'),num('#pk'),num('#pm'));
  if(!x.ok)return put('#o2',[[x.e,'bad']]);
  put('#o2',x.lines.map((t,i,a)=>[t,i==a.length-1?(x.guaranteed?'good':'bad'):'']))};

$('#rc').onclick=()=>{const x=recurrence(num('#c1'),num('#c2'),num('#a0'),num('#a1'));
  if(!x.ok)return put('#o3',[[x.e,'bad']]);
  put('#o3',[...x.lines.map(t=>[t,t.includes('✓')?'good':t.includes('✗')?'bad':'']),
    ['<table><tr><th>n</th>'+x.a.map((_,i)=>'<th>'+i+'</th>').join('')+'</tr><tr><th>a</th>'+x.a.map(v=>'<td>'+v+'</td>').join('')+'</tr></table>']])};

/* one-tap examples, including edge cases */
const CHIPS={
  t1:[{l:'r > n',f:{wn:3,wr:5,wm:'P'}},{l:'r = 0',f:{wn:7,wr:0,wm:'C'}},{l:'n = 0 types',f:{wn:0,wr:3,wm:'CR'}},{l:'C(60,30)',f:{wn:60,wr:30,wm:'C'}},{l:'Invalid',f:{wn:-2,wr:3,wm:'P'}}],
  t2:[{l:'Exactly at bound',f:{pn:25,pk:6,pm:5}},{l:'One short',f:{pn:24,pk:6,pm:5}},{l:'N = 0',f:{pn:0,pk:5,pm:3}},{l:'Invalid k = 0',f:{pn:10,pk:0,pm:3}}],
  t3:[{l:'Fibonacci',f:{c1:1,c2:1,a0:0,a1:1}},{l:'Repeated root',f:{c1:4,c2:-4,a0:1,a1:4}},{l:'Complex roots',f:{c1:0,c2:-1,a0:1,a1:0}},{l:'c₂ = 0',f:{c1:2,c2:0,a0:1,a1:3}},{l:'Invalid (empty)',f:{c1:'',c2:1,a0:0,a1:1}}]};
const GO={t1:'#wc',t2:'#pc',t3:'#rc'};
Object.keys(CHIPS).forEach(t=>{const d=document.createElement('div');d.className='chips';
  d.innerHTML='<span class="sm">Try:</span>'+CHIPS[t].map((c,i)=>'<button data-i="'+i+'">'+c.l+'</button>').join('');
  d.querySelectorAll('button').forEach(b=>b.onclick=()=>{const f=CHIPS[t][b.dataset.i].f;Object.keys(f).forEach(k=>$('#'+k).value=f[k]);$(GO[t]).click()});
  $('#'+t+' .out').before(d)});

/* sub-tabs: Count / Pigeon / Recurrence */
document.querySelectorAll('.tb2').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tb2').forEach(x=>x.classList.toggle('on',x==b));document.querySelectorAll('.tp').forEach(p=>p.hidden=p.id!=b.dataset.t)});
