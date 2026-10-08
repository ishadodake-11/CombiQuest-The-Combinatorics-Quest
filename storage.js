/* CombiQuest · Storage, progress, XP and sound */

const $=s=>document.querySelector(s);
const day=d=>d.toISOString().slice(0,10);
let P={xp:0,best:{},pw:{f:2,h:2,s:2},day:'',streak:0,hs:[],mute:false};try{Object.assign(P,JSON.parse(localStorage.getItem('cq3')||'{}'))}catch(e){}
{const t=new Date(),y=new Date(t-864e5);if(P.day!=day(t)){P.streak=P.day==day(y)?P.streak+1:1;P.day=day(t)}}
const save=()=>{try{localStorage.setItem('cq3',JSON.stringify(P))}catch(e){}};
const RK=['Apprentice','Counter','Combinator','Recurrence Sage','Grandmaster'];
function paint(){const l=Math.min(4,Math.floor(P.xp/150));$('#rk').textContent=RK[l];$('#xp').textContent=P.xp;$('#sk').textContent=P.streak;$('#xb').style.width=(l==4?100:(P.xp%150)/1.5)+'%';$('#mu').textContent=P.mute?'MUTED':'SND'}
let AC;const beep=(f,d=.1,t='square',v=.04)=>{if(P.mute)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}};
const sfx={ok:()=>{beep(660,.08);setTimeout(()=>beep(990,.12),80)},bad:()=>beep(130,.35,'sawtooth'),win:()=>[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,.15),i*110)),tick:()=>beep(440,.04)};
$('#mu').onclick=()=>{P.mute=!P.mute;save();paint()};
