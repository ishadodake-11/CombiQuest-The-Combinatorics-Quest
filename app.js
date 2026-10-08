/* App start-up: navigation, splash, effects */
$('#nm').onclick=()=>show('map');$('#nw').onclick=()=>show('lab');$('#nt').onclick=()=>show('theory');$('#ne').onclick=()=>show('tests');
/* splash */
function boot(){$('#ov').innerHTML='<div class="ov" id="bt"><div style="text-align:center"><div class="big" style="font-size:46px">Combi<span class="gr">Quest</span></div><div class="ld"><i></i></div></div></div>';const end=()=>{$('#bt')&&($('#ov').innerHTML='');show('map')};$('#bt').onclick=end;setTimeout(end,1400)}
function pop(t){const a=document.querySelector('.arena');if(!a)return;const f=document.createElement('span');f.className='fl';f.textContent=t+' XP';a.appendChild(f);setTimeout(()=>f.remove(),900);for(let i=0;i<12;i++){const p=document.createElement('i');p.className='pt';const g=Math.random()*6.28,d=50+Math.random()*60;p.style.setProperty('--dx',Math.cos(g)*d+'px');p.style.setProperty('--dy',Math.sin(g)*d+'px');a.appendChild(p);setTimeout(()=>p.remove(),800)}}
function confetti(){for(let i=0;i<46;i++){const c=document.createElement('i');c.className='cf';c.style.cssText='left:'+Math.random()*100+'vw;background:var(--r'+R(0,2)+');animation-delay:'+Math.random()*.4+'s;--rx:'+(Math.random()*160-80)+'px';document.body.appendChild(c);setTimeout(()=>c.remove(),2700)}}
renderTheory();paint();drawMap();boot();
