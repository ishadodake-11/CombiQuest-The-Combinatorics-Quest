/* CombiQuest test runner. Used by the in-app Tests tab and by tests/run-tests.js (Node). */
function runTests(engine,cases){
  const pick=(res,k)=>k=='a5'?res.a&&res.a[5]:k=='a10'?res.a&&res.a[10]:k=='ok'?res.ok:res[k];
  return cases.map(c=>{
    let res;try{res=engine[c.fn](...c.args)}catch(e){res={ok:false,e:String(e)}}
    const keys=Object.keys(c.expect),act={};keys.forEach(k=>act[k]=String(pick(res,k)));
    const pass=keys.every(k=>act[k]===c.expect[k]);
    return{id:c.id,topic:c.topic,desc:c.desc,edge:!!c.edge,input:c.fn+'('+c.args.map(x=>Number.isNaN(x)?'NaN':x).join(', ')+')',
      expected:keys.map(k=>k+' = '+c.expect[k]).join(', '),actual:keys.map(k=>k+' = '+act[k]).join(', '),pass};
  });
}
if(typeof module!=='undefined')module.exports={runTests};
