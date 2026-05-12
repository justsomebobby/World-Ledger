const { createRuntime } = require('./runtime/fake-aid-runtime'); const path=require('path');
const id='skill_ember_ward';
const init={aidrpg:{meta:{version:1,currentTurn:0,currentHook:'',mode:'normal',seed:0,lastAppliedOutputHash:'',debug:false,dirty:{player:false,abilities:[],items:[],actors:[],entities:[],routes:[],reputation:false,quests:false,time:false}}, abilities:{byId:{[id]:{identity:{id,name:'Ember Ward',type:'skill'},keys:{normalizedName:'ember_ward',aliases:[],keyPhrases:['Ember Ward','ember_ward']},meaning:{originContext:'I trained Ember Ward to shield allies from heat.',originSignature:'sig_seed',intendedFunction:'defensive application',stableMeaningFlags:['explicit_input'],emergentApplications:[]},progression:{tier:1,xp:0,useCount:0,trainingCount:1,masteryState:'novice',lastConfirmedTurn:0,lastUsedTurn:0,lastTrainedTurn:0},observation:{confidence:.8,lastEvidence:'',notes:[],observedFunctions:[],semanticTags:['fire','defense']},source:{firstSeenTurn:0,sourceIntentType:'train',sourceTags:[]}}},byKey:{ember_ward:id},allIds:[id],skillIds:[id],talentIds:[],passiveIds:[],recentEvents:[]}}};
const rt=createRuntime({state:init,info:{actionCount:0},history:[],storyCards:[],memory:{}}); rt.loadScript(path.join(process.cwd(),'aidrpg-script.js'));
function run(h,t){let r=rt.runHook(h,t); console.log('---',h,t,'\n',r&&r.text&&r.text.slice(0,120)); rt.addHistory(h==='input'?'do':'story',t); return r;}
run('input','/sheet');
run('input','I use Ember Ward to shield Mira from the forge heat.');
run('output','Ember Ward flickers around Mira and redirects the forge heat away from her.');
run('input','I look around.');
run('output','You learned a new skill called Moonblade.');
console.log(JSON.stringify(rt.context.state.aidrpg.abilities,null,2));
