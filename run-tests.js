/* Run with:  node tests/run-tests.js */
const E=require('../js/math-engine.js'),cases=require('./test-cases.js'),{runTests}=require('./test-runner.js');
const rows=runTests(E,cases);
rows.forEach(r=>console.log((r.pass?'PASS':'FAIL')+'  '+r.id+'  '+r.desc+'\n      input: '+r.input+'\n      expected: '+r.expected+'\n      actual:   '+r.actual));
const ok=rows.filter(r=>r.pass).length;console.log('\n'+ok+' / '+rows.length+' tests passed');process.exit(ok==rows.length?0:1);
