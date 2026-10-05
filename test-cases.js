/* CombiQuest test data. Each case: engine function, arguments, expected fields. */
const TEST_CASES=[
 {id:'T01',topic:'Counting',desc:'Podium: P(5,3)',fn:'counting',args:['P',5,3],expect:{v:'60'}},
 {id:'T02',topic:'Counting',desc:'Squad: C(10,4)',fn:'counting',args:['C',10,4],expect:{v:'210'}},
 {id:'T03',topic:'Counting',desc:'Lock codes 5³',fn:'counting',args:['PR',5,3],expect:{v:'125'}},
 {id:'T04',topic:'Counting',desc:'Scoops, stars and bars C(13,4)',fn:'counting',args:['CR',10,4],expect:{v:'715'}},
 {id:'T05',topic:'Counting',desc:'Exact large value C(60,30)',fn:'counting',args:['C',60,30],expect:{v:'118264581564861424'}},
 {id:'T06',topic:'Counting',desc:'Edge: r = 0',fn:'counting',args:['P',5,0],expect:{v:'1'},edge:true},
 {id:'T07',topic:'Counting',desc:'Edge: r > n',fn:'counting',args:['P',3,5],expect:{v:'0'},edge:true},
 {id:'T08',topic:'Counting',desc:'Edge: n = 0 types, r = 3',fn:'counting',args:['CR',0,3],expect:{v:'0'},edge:true},
 {id:'T09',topic:'Counting',desc:'Invalid: negative n',fn:'counting',args:['P',-1,2],expect:{ok:'false'},edge:true},
 {id:'T10',topic:'Pigeonhole',desc:'N = 25, k = 6, m = 5 (exactly at bound)',fn:'pigeonhole',args:[25,6,5],expect:{ceil:'5',need:'25',guaranteed:'true'}},
 {id:'T11',topic:'Pigeonhole',desc:'One short: N = 24',fn:'pigeonhole',args:[24,6,5],expect:{ceil:'4',need:'25',guaranteed:'false'}},
 {id:'T12',topic:'Pigeonhole',desc:'Edge: N = 0',fn:'pigeonhole',args:[0,3,2],expect:{ceil:'0',guaranteed:'false'},edge:true},
 {id:'T13',topic:'Pigeonhole',desc:'Invalid: k = 0 boxes',fn:'pigeonhole',args:[10,0,3],expect:{ok:'false'},edge:true},
 {id:'T14',topic:'Recurrence',desc:'Fibonacci, a(10)',fn:'recurrence',args:[1,1,0,1],expect:{type:'real',a10:'55',match:'true'}},
 {id:'T15',topic:'Recurrence',desc:'Distinct roots 2 and 1, a(5)',fn:'recurrence',args:[3,-2,1,3],expect:{type:'real',a5:'63',match:'true'}},
 {id:'T16',topic:'Recurrence',desc:'Repeated root 2, a(5)',fn:'recurrence',args:[4,-4,1,4],expect:{type:'repeated',a5:'192',match:'true'}},
 {id:'T17',topic:'Recurrence',desc:'Edge: complex roots, a(5)',fn:'recurrence',args:[0,-1,1,0],expect:{type:'complex',a5:'0',match:'true'},edge:true},
 {id:'T18',topic:'Recurrence',desc:'Edge: c₁ = c₂ = 0',fn:'recurrence',args:[0,0,2,3],expect:{type:'degenerate',a5:'0',match:'true'},edge:true},
 {id:'T19',topic:'Recurrence',desc:'Invalid: missing value (NaN)',fn:'recurrence',args:[NaN,1,0,1],expect:{ok:'false'},edge:true}
];
if(typeof module!=='undefined')module.exports=TEST_CASES;
