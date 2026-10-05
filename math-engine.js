/* CombiQuest · Maths engine (Unit IV: Combinatorics & Recurrence)
   Pure functions, no DOM access. Runs in the browser (globals) and in Node (module.exports). */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const F=n=>{let f=1n;for(let i=2n;i<=BigInt(n);i++)f*=i;return f};            // exact n! using BigInt
const fmt=x=>Math.abs(x-Math.round(x))<1e-9?String(Math.round(x)):x.toFixed(4);
const rf=(c1,c2)=>'a(n) = '+c1+'·a(n−1) + ('+c2+')·a(n−2)';
const isInt=x=>typeof x==='number'&&Number.isInteger(x);

/* ---------- 1. Counting: P, C, n^r, C(n+r-1,r) ---------- */
function counting(m,n,r){
  if(!['P','C','PR','CR'].includes(m))return{ok:false,e:'Unknown counting type.'};
  if(!isInt(n)||!isInt(r))return{ok:false,e:'n and r must be whole numbers.'};
  if(n<0||r<0)return{ok:false,e:'n and r cannot be negative.'};
  if(n>60||r>60)return{ok:false,e:'Please use n ≤ 60 and r ≤ 60.'};
  let v,s=[],edge=false;
  if(m=='P'||m=='C'){
    if(r>n)return{ok:true,v:0n,edge:true,s:['Edge case: r > n.','Cannot pick '+r+' distinct items from only '+n+'.','So '+m+'('+n+','+r+') = 0']};
    if(m=='P'){v=F(n)/F(n-r);s=['P(n,r) = n!/(n−r)! = '+n+'!/'+(n-r)+'!','= '+(r?Array.from({length:r},(_,i)=>n-i).join(' × '):'1 (empty product)'),'= '+v]}
    else{v=F(n)/(F(r)*F(n-r));s=['C(n,r) = n!/(r!(n−r)!)','= P('+n+','+r+')/'+r+'! = '+F(n)/F(n-r)+'/'+F(r),'= '+v]}
    if(r==0||r==n){edge=true;s.unshift('Edge case: '+(r==0?'r = 0, choose nothing (0! = 1).':'r = n, use every item.'))}
  }else if(m=='PR'){
    v=BigInt(n)**BigInt(r);s=['Product rule: n choices for each of r slots','= n^r = '+n+'^'+r+' = '+v];
    if(n==0&&r==0){edge=true;s.unshift('Edge case: 0⁰ = 1 by convention (one empty word).')}
  }else{
    if(n==0){v=r==0?1n:0n;edge=true;s=['Edge case: n = 0 types.','Choosing '+r+' items from no types: '+(r==0?'the empty selection counts once.':'impossible.'),'= '+v]}
    else{const N=n+r-1;v=F(N)/(F(r)*F(N-r));s=['Stars and bars: r stars, n−1 bars','= C(n+r−1, r) = C('+N+','+r+')','= '+N+'!/('+r+'!·'+(N-r)+'!)','= '+v]}
  }
  return{ok:true,v,s,edge};
}

/* ---------- 2. Pigeonhole ---------- */
function pigeonhole(N,k,m){
  if(![N,k,m].every(isInt))return{ok:false,e:'N, k and m must be whole numbers.'};
  if(N<0)return{ok:false,e:'N cannot be negative.'};
  if(k<1)return{ok:false,e:'Need at least one box (k ≥ 1).'};
  if(m<1)return{ok:false,e:'Threshold m must be at least 1.'};
  const ceil=Math.ceil(N/k),need=k*(m-1)+1,guaranteed=N>=need,lines=[];
  if(N==0)lines.push('Edge case: N = 0, nothing is placed.');
  lines.push('Σ nᵢ = N = '+N+' over k = '+k+' boxes  ⇒  some box holds ≥ ⌈N/k⌉ = ⌈'+N+'/'+k+'⌉ = '+ceil,
    'Worst case keeps every box at m−1 = '+(m-1)+': that is k(m−1) = '+k*(m-1)+' items.',
    'To force '+m+' in one box you need k(m−1)+1 = '+need+' items.',
    guaranteed?'N = '+N+' ≥ '+need+' ⇒ a box with at least '+m+' items is guaranteed.':'N = '+N+' < '+need+' ⇒ no box is forced to reach '+m+'.');
  return{ok:true,ceil,need,guaranteed,lines};
}

/* ---------- 3. Recurrence a(n) = c1·a(n−1) + c2·a(n−2) ---------- */
const terms=(c1,c2,a0,a1,N)=>{const a=[a0,a1];for(let i=2;i<=N;i++)a.push(c1*a[i-1]+c2*a[i-2]);return a};
function recurrence(c1,c2,a0,a1,N=10){
  if(![c1,c2,a0,a1].every(x=>typeof x==='number'&&Number.isFinite(x)))return{ok:false,e:'All four values (c₁, c₂, a₀, a₁) must be numbers.'};
  const a=terms(c1,c2,a0,a1,N),D=c1*c1+4*c2,L=[];let type,f;
  if(c2==0)L.push('Edge case: c₂ = 0, the recurrence is really first order.');
  L.push('Characteristic equation: r² − '+c1+'r − ('+c2+') = 0','Discriminant D = c₁² + 4c₂ = '+D);
  if(D>0){
    type='real';const s=Math.sqrt(D),r1=(c1+s)/2,r2=(c1-s)/2,al=(a1-a0*r2)/(r1-r2),be=a0-al;f=n=>al*r1**n+be*r2**n;
    L.push('D > 0: distinct real roots r₁ = '+fmt(r1)+', r₂ = '+fmt(r2),'aₙ = α·r₁ⁿ + β·r₂ⁿ with α+β = '+a0+' and α·r₁+β·r₂ = '+a1,'α = '+fmt(al)+', β = '+fmt(be));
  }else if(D==0){
    const r=c1/2;
    if(r==0){type='degenerate';f=n=>n==0?a0:n==1?a1:0;L.push('Edge case: repeated root 0, so aₙ = 0 for n ≥ 2.')}
    else{type='repeated';const be=(a1-a0*r)/r;f=n=>(a0+be*n)*r**n;L.push('D = 0: repeated root r = '+fmt(r),'aₙ = (α + β·n)·rⁿ with α = '+a0+', β = '+fmt(be))}
  }else{
    type='complex';const rho=Math.sqrt(-c2),th=Math.atan2(Math.sqrt(-D)/2,c1/2),A=a0,B=(a1/rho-A*Math.cos(th))/Math.sin(th);f=n=>rho**n*(A*Math.cos(n*th)+B*Math.sin(n*th));
    L.push('D < 0: complex roots, modulus ρ = √(−c₂) = '+fmt(rho)+', angle θ = '+fmt(th)+' rad','aₙ = ρⁿ(A·cos nθ + B·sin nθ) with A = '+fmt(A)+', B = '+fmt(B));
  }
  const fv=f(5),match=Math.abs(fv-a[5])<=1e-6*Math.max(1,Math.abs(a[5]));
  L.push('a(2) = '+c1+'·'+a1+' + ('+c2+')·'+a0+' = '+a[2],'Self-check at n = 5: formula '+fmt(fv)+' · recurrence '+a[5]+(match?'  ✓':'  ✗'));
  return{ok:true,a,type,lines:L,match};
}

/* ---------- Question generators used by the game ---------- */
function gc(d){const ms=d==1?['P','C']:d==2?['P','C','PR']:['P','C','PR','CR'],m=ms[R(0,ms.length-1)],n=d==1?R(4,6):d==2?R(5,8):R(7,10),r=R(2,Math.min(d==3?4:3,n-1));
  const t={P:'Rank '+r+' of '+n+' distinct runners on a podium. How many podiums?',C:'Pick a squad of '+r+' from '+n+' runners. How many squads?',PR:'A lock has '+r+' dials with '+n+' symbols each. How many codes?',CR:'Choose '+r+' scoops from '+n+' flavours, repeats allowed, order ignored. How many orders?'}[m];
  const x=counting(m,n,r);return{q:t,a:String(x.v),s:x.s,h:{P:'Order matters, no repeats: n!/(n−r)!',C:'Order ignored: C(n,r) = P(n,r)/r!',PR:'Product rule: n^r',CR:'Stars and bars: C(n+r−1, r)'}[m]}}
function gp(){const t=R(0,2),h='Worst case: spread evenly, then add one more.';
  if(t==0){const N=R(10,40),k=R(3,9);return{q:N+' socks go into '+k+' drawers. At least how many must share the fullest drawer?',a:String(Math.ceil(N/k)),s:['⌈N/k⌉ = ⌈'+N+'/'+k+'⌉ = '+Math.ceil(N/k)],h:'Divide and round UP.'}}
  const k=t==1?R(3,8):4,m=R(2,5);return{q:t==1?k+' boxes. Fewest pigeons that FORCES '+m+' in one box?':'A deck has 4 suits. Fewest draws that guarantee '+m+' of one suit?',a:String(k*(m-1)+1),s:['Worst case: '+(m-1)+' in each of '+k+' = '+k*(m-1),'One more forces it: k(m−1)+1 = '+(k*(m-1)+1)],h}}
function gd(){const k=R(3,5),m=R(2,4);return{drop:{k,m,c:Array(k).fill(0),n:0},q:'VAULT: drop pigeons into '+k+' boxes. Spread them so the lock trips EXACTLY on drop k(m−1)+1, when a box reaches '+m+'.',s:['Even spread: '+(m-1)+' per box = '+k*(m-1)+' safe drops; drop '+(k*(m-1)+1)+' must trigger it.'],h:'Add to the emptiest box each time.'}}
function gr(kind,d){
  if(kind=='root'){let p=R(-2,4),q=R(-2,4);while(p==q)q=R(-2,4);const c1=p+q,c2=-p*q;return{q:'For '+rf(c1,c2)+', what is the LARGER root of the characteristic equation?',a:String(Math.max(p,q)),s:['r² − '+c1+'r − ('+c2+') = 0','(r − '+p+')(r − '+q+') = 0','Roots: '+p+' and '+q],h:'Factor r² − c1·r − c2.'}}
  const c1=R(1,3),c2=R(-1,2),a0=R(0,2),a1=R(1,3),k=R(4,4+d),a=terms(c1,c2,a0,a1,k);
  return{q:rf(c1,c2)+', a(0)='+a0+', a(1)='+a1+'. Find a('+k+').',a:String(a[k]),s:['Terms: '+a.join(', ')],h:'Compute a(2), a(3), … one by one.'}}

const ENGINE={counting,pigeonhole,recurrence};
if(typeof module!=='undefined')module.exports=Object.assign({},ENGINE,{terms,gc,gp,gd,gr,F});
