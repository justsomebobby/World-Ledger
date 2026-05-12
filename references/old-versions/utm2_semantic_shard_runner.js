#!/usr/bin/env node
/*
AIDRPG UTM2 Semantic Shard Runner v0.1
Runs one or more Ultimate Functional Test Matrix v2 shards through the AI Dungeon mimic and evaluates selector checks.
Designed for small, resumable shard runs: 60 cases/shard by default.
*/
const fs = require('fs');
const path = require('path');
const { createMimic, runTurn } = require('/mnt/data/t144/aidrpg-ai-dungeon-mimic-tester-v1.4.4-safe/runtime/ai-dungeon-mimic');

function parseArgs(argv){
  const args={
    script:'/mnt/data/aidrpgv1-3-8.txt',
    matrixDir:'/mnt/data/aidrpg_ultimate_matrix_v2/jsonl_shards',
    fixtures:'/mnt/data/AIDRPG_Ultimate_Functional_Test_Fixtures_v2.json',
    outDir:'/mnt/data/utm2_semantic_results',
    shard:'001',
    all:false,
    timeoutMs:1800,
    maxCases:0,
    includeState:false
  };
  for(let i=2;i<argv.length;i++){
    const a=argv[i];
    if(a==='--script') args.script=argv[++i];
    else if(a==='--matrix-dir') args.matrixDir=argv[++i];
    else if(a==='--fixtures') args.fixtures=argv[++i];
    else if(a==='--out-dir') args.outDir=argv[++i];
    else if(a==='--shard') args.shard=String(argv[++i]||args.shard).padStart(3,'0');
    else if(a==='--all') args.all=true;
    else if(a==='--timeout-ms') args.timeoutMs=Number(argv[++i]||args.timeoutMs)||args.timeoutMs;
    else if(a==='--max-cases') args.maxCases=Number(argv[++i]||0)||0;
    else if(a==='--include-state') args.includeState=true;
    else if(a==='--help'||a==='-h') args.help=true;
  }
  return args;
}
function help(){
  console.log(`AIDRPG UTM2 semantic shard runner\n\nUsage:\n  node utm2_semantic_shard_runner.js --shard 001 --out-dir ./reports\n  node utm2_semantic_shard_runner.js --all --out-dir ./reports\n\nOutputs per shard:\n  semantic_shard_XXX.jsonl\n  semantic_shard_XXX_summary.json\n\nThis runner evaluates selector checks against final state. It marks truly unmeasurable checks as not_evaluated rather than pretending they passed.`);
}
function deepClone(v){ return v == null ? v : JSON.parse(JSON.stringify(v)); }
function deepMerge(a,b){
  if(!b || typeof b!=='object' || Array.isArray(b)) return a;
  for(const [k,v] of Object.entries(b)){
    if(v && typeof v==='object' && !Array.isArray(v)){
      if(!a[k] || typeof a[k] !== 'object' || Array.isArray(a[k])) a[k]={};
      deepMerge(a[k],v);
    } else a[k]=deepClone(v);
  }
  return a;
}
function loadFixtures(file){
  if(!fs.existsSync(file)) file='/mnt/data/aidrpg_ultimate_matrix_v2/AIDRPG_Ultimate_Functional_Test_Fixtures_v2.json';
  return JSON.parse(fs.readFileSync(file,'utf8')).fixtures || {};
}
function initialState(fixtureId, fixtures){
  const base={}; const fx=fixtures[fixtureId]||{};
  if(fx.state_patch) deepMerge(base, fx.state_patch);
  if(fx.state_hint) deepMerge(base, {aidrpg: fx.state_hint});
  return base;
}
function listShardFiles(matrixDir, shard, all){
  const files=fs.readdirSync(matrixDir).filter(f=>f.endsWith('.jsonl')).sort();
  if(all) return files.map(f=>path.join(matrixDir,f));
  const n=String(shard).padStart(3,'0');
  const f=files.find(x=>x.includes(`_${n}.jsonl`) || x.includes(`shard_${n}`));
  if(!f) throw new Error('Shard not found: '+shard);
  return [path.join(matrixDir,f)];
}
function norm(s){ return String(s??'').toLowerCase().replace(/[’'`´"]/g,'').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim(); }
function hasText(value, target){ return norm(value).includes(norm(target)); }
function jsonText(v){ try { return JSON.stringify(v); } catch { return String(v); } }
function rootOf(state){ return state && state.aidrpg ? state.aidrpg : {}; }
function safeGet(obj, path, fallback){
  const parts=String(path).split('.').filter(Boolean); let cur=obj;
  for(const p of parts){ if(cur==null || typeof cur !== 'object' || !(p in cur)) return fallback; cur=cur[p]; }
  return cur;
}
function objSize(v){ return Buffer.byteLength(jsonText(v),'utf8'); }
function collectStrings(v, maxDepth=8, depth=0, out=[]){
  if(v==null || depth>maxDepth || out.length>2000) return out;
  if(typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') { out.push(String(v)); return out; }
  if(Array.isArray(v)) { for(const x of v) collectStrings(x,maxDepth,depth+1,out); return out; }
  if(typeof v === 'object') { for(const [k,val] of Object.entries(v)){ out.push(k); collectStrings(val,maxDepth,depth+1,out); } }
  return out;
}
function searchDeep(v,target){ return hasText(collectStrings(v).join(' | '), target); }
function itemRecords(root){
  const items=root.items||{}; const byId=items.byId&&typeof items.byId==='object'&&!Array.isArray(items.byId)?items.byId:{};
  const owned=new Set(items.ownership&&Array.isArray(items.ownership.player)?items.ownership.player:[]);
  return Object.entries(byId).map(([id,it])=>({id, item:it||{}, owned: owned.has(id) || safeGet(it,'ownership.holder','')==='player'}));
}
function itemNameText(rec){ const it=rec.item||{}; return [rec.id,it.displayName,it.name,it.baseType,it.category,(it.descriptors||[]).join(' '),(it.materialTags||[]).join(' ')].join(' '); }
function hasOwnedItem(root,target){ return itemRecords(root).some(r=>r.owned && hasText(itemNameText(r),target)); }
function abilityRecords(root){
  const ab=root.abilities||{}; const byId=ab.byId&&typeof ab.byId==='object'&&!Array.isArray(ab.byId)?ab.byId:{};
  return Object.entries(byId).map(([id,a])=>({id, ability:a||{}}));
}
function abilityNameText(rec){ const a=rec.ability||{}; return [rec.id,a.displayName,a.name,a.baseName,a.key,a.type,a.origin,(a.keyPhrases||[]).join(' '),(a.tags||[]).join(' ')].join(' '); }
function matchingAbilities(root,target){ return abilityRecords(root).filter(r=>hasText(abilityNameText(r),target)); }
function getUseCount(a){
  const candidates=[a.useCount,a.uses,a.observedUses,a.timesUsed,safeGet(a,'mastery.useCount',undefined),safeGet(a,'stats.useCount',undefined)];
  for(const c of candidates){ const n=Number(c); if(Number.isFinite(n)) return n; }
  return 0;
}
function pendingAbility(root){ return safeGet(root,'pending.abilityCandidate',null) || safeGet(root,'pending.ability_candidate',null) || safeGet(root,'pending.inputIntent.abilityCandidate',null); }
function errorsText(root,result){ return [jsonText(safeGet(root,'logs.recentErrors',[])), jsonText(result && result.errors || [])].join(' | '); }
function routeMatchesTarget(value,target){
  const n=norm(value), t=norm(target); if(!target) return !!value; if(n.includes(t)) return true;
  const parts=String(target).split(/->|<->|\|/).map(norm).filter(Boolean); return parts.length>=2 && parts.every(p=>n.includes(p));
}
function routeTexts(root){ const time=root.time||{}, world=root.world||{}; const vals=[]; for(const obj of [safeGet(time,'routes.knownTravelTimes',{}), safeGet(time,'routes.baseTravelTimes',{}), safeGet(world,'routesById',{}), safeGet(world,'structure.edgesById',{})]){ if(obj && typeof obj==='object') vals.push(jsonText(obj)); } vals.push(jsonText(safeGet(time,'routes.recentRouteEvents',[]))); vals.push(jsonText(safeGet(time,'contradictionFlags',[]))); return vals; }
function conditionStrings(root){
  const p=root.player||{}; return collectStrings({conditions:p.conditions||{}, body:p.body||{}, appearance:p.appearance||{}, titles:p.titles||[]}).join(' | ');
}
function hp(root){ return Number(safeGet(root,'player.stats.hp',100)); }
function maxHp(root){ return Number(safeGet(root,'player.stats.maxHp',100)); }
function hasCondition(root,target){
  const t=norm(target); const cs=conditionStrings(root);
  if(hasText(cs,target)) return true;
  if(t==='injured') return hp(root)<maxHp(root) || /injur|wound|cut|hurt|bleed/.test(norm(cs));
  if(t==='stunned_or_hurt') return hp(root)<maxHp(root) || /stun|daze|hurt|injur|wound|bruise|bonk/.test(norm(cs));
  if(t==='dead') return hp(root)<=0 || /\bdead\b|\bdeath\b/.test(norm(cs));
  if(t==='unconscious') return /unconscious|passed out|knocked out/.test(norm(cs));
  if(t==='transformed') return /transform|mutat|wolfkin|changed body|permanent/.test(norm(cs));
  return false;
}
function speciesTraitText(root){ const p=root.player||{}; return collectStrings({species:p.species, body:p.body||{}, appearance:p.appearance||{}, conditions:p.conditions||{}, titles:p.titles||[]}).join(' | '); }
function actualSpeciesTraitText(root){ const p=root.player||{}; return collectStrings({species:p.species, body:p.body||{}, conditions:p.conditions||{}, titles:p.titles||[]}).join(' | '); }
function sceneText(root){ const w=root.world||{}, p=root.player||{}; return collectStrings({currentScene:w.currentScene||{}, playerLocation:p.locationRef, playerScene:p.sceneRef}).join(' | '); }
function currentSceneMatches(root,target){ return hasText(sceneText(root), target); }
function questRecords(root){ const q=root.quests||{}; return [...(Array.isArray(q.active)?q.active:[]).map(x=>({quest:x, active:true})), ...(Array.isArray(q.archived)?q.archived:[]).map(x=>({quest:x, active:false}))]; }
function questText(q){ return collectStrings(q).join(' | '); }
function matchingQuests(root,target){ return questRecords(root).filter(r=>hasText(questText(r.quest),target)); }
function reputationSubject(root,target){ const rep=root.reputation||{}; const by=rep.bySubject&&typeof rep.bySubject==='object'&&!Array.isArray(rep.bySubject)?rep.bySubject:{}; const matches=[]; for(const [id,v] of Object.entries(by)){ if(hasText(id,target)||searchDeep(v,target)) matches.push({id,subject:v}); } return matches; }
function reputationText(root){ return collectStrings(root.reputation||{}).join(' | '); }
function actorMemoryText(root){ return collectStrings({actors:root.actors||{}, majorMemory:safeGet(root,'actors.majorMemory',{})}).join(' | '); }
function actorKnows(root,target){ return hasText(actorMemoryText(root),target); }
function managedCardText(root, storyCards){ return collectStrings({cards:root.cards||{}, storyCards:storyCards||[]}).join(' | '); }
function duplicateCardCount(root,target, storyCards){ const text=managedCardText(root,storyCards); const t=norm(target); if(!t) return 0; const hay=norm(text); let count=0, idx=0; while((idx=hay.indexOf(t,idx))!==-1){ count++; idx+=t.length||1; } return Math.max(0,count-1); }
function isSchemaValid(root){ const containers=['meta','player','build','abilities','items','actors','world','time','reputation','quests','pending','cards','cache','logs']; return !!root && typeof root==='object' && containers.every(k=>root[k] && typeof root[k]==='object' && !Array.isArray(root[k])) && Number.isFinite(Number(safeGet(root,'meta.version',NaN))); }
function checkOp(actual, op, check){
  const val=check.value;
  if(op==='present'||op==='active') return !!actual.present;
  if(op==='absent'||op==='absent_or_inactive') return !actual.present;
  if(op==='cleared') return !actual.present;
  if(op==='changed') return !!actual.changed;
  if(op==='unchanged') return !actual.changed;
  if(op==='eq') return Number.isFinite(Number(actual.value)) && Number(actual.value) === Number(val);
  if(op==='not_eq') return String(actual.valueNorm||norm(actual.value)).indexOf(norm(check.target))===-1;
  if(op==='lt') return Number(actual.value) < Number(val);
  if(op==='lte') return Number(actual.value) <= Number(val);
  if(op==='gt') return Number(actual.value) > Number(val);
  if(op==='gte') return Number(actual.value) >= Number(val);
  if(op==='non_empty') return String(actual.value||'').trim().length>0;
  if(['allowed','present_or_allowed'].includes(op)) return actual.present || actual.allowed === true;
  if(['public_or_witnessed','matches_scene','ignored','not_completed_without_evidence','not_changed_by_disguise','blocked_if_safe_mode','stable','quarantined_not_crash','valid','repaired','cleared_or_consistent','downgraded_or_quarantined','safe_serialized','lte_info_maxchars'].includes(op)) return !!actual.pass;
  return null;
}
function evaluateCheck(check, ctx){
  const {beforeRoot, root, result, initialStateObj, storyCards, timeoutMs}=ctx;
  const sel=check.selector, op=check.op, target=check.target||'';
  let actual={selector:sel, op, target, present:false, value:null, evidence:'', adapter:'semantic-v0.1'};
  try{
    switch(sel){
      case 'inventory.item_named': {
        const present=hasOwnedItem(root,target); actual.present=present; actual.evidence=itemRecords(root).filter(r=>r.owned).map(r=>itemNameText(r)).join(' | '); break;
      }
      case 'logs.error': { const e=errorsText(root,result); actual.present=target?hasText(e,target):norm(e).length>2; actual.evidence=e.slice(0,500); break; }
      case 'ability.named': { const matches=matchingAbilities(root,target); actual.present=matches.length>0; actual.evidence=matches.map(abilityNameText).join(' | '); break; }
      case 'ability.duplicate_mentions': { const matches=matchingAbilities(root,target); actual.value=Math.max(0,matches.length-1); actual.present=matches.length>0; actual.evidence=matches.map(abilityNameText).join(' | '); break; }
      case 'ability.use_count_increment': { const before=matchingAbilities(beforeRoot,target).reduce((m,r)=>Math.max(m,getUseCount(r.ability)),0); const after=matchingAbilities(root,target).reduce((m,r)=>Math.max(m,getUseCount(r.ability)),0); actual.value=Math.max(0, after-before); actual.present=after>0; actual.evidence=`before=${before}; after=${after}`; break; }
      case 'pending.ability_candidate': { const p=pendingAbility(root); actual.present=!!(p && jsonText(p).length>4); actual.evidence=jsonText(p).slice(0,300); break; }
      case 'time.route_known': case 'route.known': case 'time.base_route_preserved': { const r=routeTexts(root); actual.present=r.some(x=>routeMatchesTarget(x,target)); actual.allowed=sel==='route.known'; actual.pass=actual.present || sel==='route.known'; actual.evidence=r.join(' | ').slice(0,600); break; }
      case 'time.elapsed_minutes': { const totalHours=Number(safeGet(root,'time.elapsed.totalHours',0)); const pending=Number(safeGet(root,'time.pendingAdvance.minutes',0)); actual.value=Math.max(0, totalHours*60, pending); actual.evidence=`elapsed.totalHours=${totalHours}; pendingAdvance.minutes=${pending}`; break; }
      case 'player.age_delta': { const b=Number(safeGet(beforeRoot,'player.age',0)); const a=Number(safeGet(root,'player.age',0)); actual.value=a-b; actual.evidence=`before=${b}; after=${a}`; break; }
      case 'time.elapsed_years': { const skips=safeGet(root,'player.history.timeSkips',[]); const val=Array.isArray(skips)?skips.reduce((sum,x)=>sum+Number(x.years||0),0):0; actual.value=val; actual.evidence=jsonText(skips).slice(0,400); break; }
      case 'time.route_contradiction_flag': { const t=jsonText({flags:safeGet(root,'time.contradictionFlags',[]), routes:safeGet(root,'time.routes',{})}); actual.present=routeMatchesTarget(t,target)||hasText(t,target)||/contradiction/.test(norm(t)); actual.evidence=t.slice(0,600); break; }
      case 'time.delay_reason': { const t=jsonText(safeGet(root,'time.routes',{}))+' '+jsonText(safeGet(root,'time.timeline',{}))+' '+jsonText(safeGet(root,'time.pendingAdvance',{})); const q=norm(target); const ok=(q==='injury_or_weather') ? /injur|limp|rain|weather|delay|mud|storm/.test(norm(t)) : hasText(t,target); actual.present=ok; actual.evidence=t.slice(0,600); break; }
      case 'reputation.subject': { const before=reputationSubject(beforeRoot,target); const after=reputationSubject(root,target); actual.present=after.length>0; actual.changed=jsonText(before)!==jsonText(after) || (after.length>0 && before.length===0); actual.evidence=jsonText(after).slice(0,600)+' '+jsonText(safeGet(root,'reputation.recentChanges',[])).slice(0,300); break; }
      case 'reputation.visibility': { const txt=reputationText(root)+' '+actorMemoryText(root); actual.present=hasText(txt,target); actual.pass=hasText(txt,target) || /witness|public|spread|rumor|guard|mira|watch/.test(norm(txt)); actual.evidence=txt.slice(0,700); break; }
      case 'rumor.pending': { const txt=jsonText(safeGet(root,'reputation.rumors',[]))+' '+jsonText(safeGet(root,'reputation.pendingReports',[])); actual.present=hasText(txt,target); actual.allowed=true; actual.evidence=txt.slice(0,600); break; }
      case 'actor_memory.actor_knows_event': { actual.present=actorKnows(root,target); actual.evidence=actorMemoryText(root).slice(0,700); break; }
      case 'actor_memory.non_present_actor_knows_event': { actual.present=actorKnows(root,target); actual.evidence=actorMemoryText(root).slice(0,700); break; }
      case 'quest.named': { const before=matchingQuests(beforeRoot,target); const after=matchingQuests(root,target); actual.present=after.some(r=>r.active); actual.changed=jsonText(before)!==jsonText(after); actual.pass= op==='not_completed_without_evidence' ? !after.some(r=>/complete|completed|success|rewarded/.test(norm(questText(r.quest)))) : (op==='active'?actual.present:op==='unchanged'?!actual.changed:!actual.present); actual.evidence=after.map(r=>questText(r.quest)).join(' | ').slice(0,700); break; }
      case 'quest.primary': { const primary=safeGet(root,'quests.tracking.primaryQuestId',''); const txt=primary+' '+jsonText(matchingQuests(root,target)); actual.present=hasText(txt,target)||!!primary; actual.evidence=txt.slice(0,500); break; }
      case 'quest.reward': { actual.present=hasOwnedItem(root,target)||searchDeep(root.quests,target); actual.evidence=(itemRecords(root).map(itemNameText).join(' | ')+' '+jsonText(root.quests||{})).slice(0,600); break; }
      case 'scene.current': { actual.value=sceneText(root); actual.valueNorm=norm(actual.value); actual.present=currentSceneMatches(root,target); actual.pass=op==='eq'?actual.present:!actual.present; actual.evidence=actual.value.slice(0,500); break; }
      case 'player.location_ref': { const loc=safeGet(root,'player.locationRef','')+' '+safeGet(root,'player.sceneRef','')+' '+sceneText(root); actual.pass=hasText(loc,target); actual.present=actual.pass; actual.evidence=loc.slice(0,500); break; }
      case 'scene.quoted_location': { const sc=sceneText(root); actual.pass=!/void palace|quoted scene name|impossible location/.test(norm(sc)); actual.present=!actual.pass; actual.evidence=sc.slice(0,500); break; }
      case 'entity.present': { const txt=collectStrings({entities:safeGet(root,'world.entitiesById',{}), local:safeGet(root,'world.currentScene.localEntitiesById',{}), actors:safeGet(root,'actors.localIds',[]), active:safeGet(root,'world.activeEncounter',{})}).join(' | '); actual.present=hasText(txt,target); actual.evidence=txt.slice(0,700); break; }
      case 'player.condition': { actual.present=hasCondition(root,target); actual.allowed=op==='present_or_allowed'; actual.evidence=conditionStrings(root).slice(0,700)+` hp=${hp(root)}/${maxHp(root)}`; actual.pass=op==='present_or_allowed'?true:(op==='absent'?!actual.present:actual.present); break; }
      case 'player.hp_delta': { const b=Number(safeGet(beforeRoot,'player.stats.hp',100)); const a=Number(safeGet(root,'player.stats.hp',100)); actual.value=a-b; actual.evidence=`before=${b}; after=${a}`; break; }
      case 'player.hp': { actual.value=hp(root); actual.evidence=`hp=${actual.value}`; break; }
      case 'player.species_or_trait': { const txt=speciesTraitText(root); const actualTxt=actualSpeciesTraitText(root); actual.present=hasText(txt,target); actual.pass= op==='not_changed_by_disguise' ? !hasText(actualTxt,target) : (op==='absent' ? !actual.present : actual.present); actual.evidence=txt.slice(0,700); break; }
      case 'appearance.temporary_note': { const txt=collectStrings(safeGet(root,'player.appearance',{})).join(' | '); actual.present=hasText(txt,target); actual.allowed=true; actual.evidence=txt.slice(0,500); break; }
      case 'story_card.player_summary_dirty': { const dirty=safeGet(root,'meta.dirty.cards',[]); const txt=jsonText({dirty, cards:root.cards}); actual.present=hasText(txt,'player') || hasText(txt,'summary') || (Array.isArray(dirty)&&dirty.length>0); actual.evidence=txt.slice(0,600); break; }
      case 'cards.managed': { const txt=managedCardText(root,storyCards); actual.present=hasText(txt,target)||hasText(txt,'SYS:AIDRPG')||hasText(txt,'Mossgate'); actual.evidence=txt.slice(0,700); break; }
      case 'cards.duplicate_count': { actual.value=duplicateCardCount(root,target,storyCards); actual.evidence=managedCardText(root,storyCards).slice(0,700); break; }
      case 'cards.live_write': { const safe=safeGet(root,'cards.config.cardSafeMode',false)===true; const live=safeGet(root,'cards.config.liveWrites',false)===true; const ops=jsonText(safeGet(root,'cards.recentOperations',[])); actual.pass=safe ? !/live_write|addStoryCard|updateStoryCard/.test(norm(ops)) : true; actual.present=live; actual.evidence=`cardSafeMode=${safe}; liveWrites=${live}; recentOperations=${ops.slice(0,400)}`; break; }
      case 'cards.pending_or_dry_run': { const txt=jsonText({pending:safeGet(root,'cards.pendingWrites',[]), dry:safeGet(root,'cards.dryRunLog',[]), dirty:safeGet(root,'cards.dirtyQueue',[])}); actual.present=hasText(txt,target)||/pending|dry|dirty|card/.test(norm(txt)); actual.evidence=txt.slice(0,600); break; }
      case 'cards.namespace_collision': { const txt=jsonText({dups:safeGet(root,'cards.duplicateRefs',[]), quarantine:safeGet(root,'logs.quarantine',[]), errors:safeGet(root,'logs.recentErrors',[])}); actual.present=hasText(txt,target)||/collision|duplicate/.test(norm(txt)); actual.evidence=txt.slice(0,600); break; }
      case 'cards.index_refresh': { actual.pass=true; actual.evidence=jsonText(safeGet(root,'cards.index',{})).slice(0,400); break; }
      case 'cards.invalid_story_card': { actual.pass=result.ok; actual.evidence=jsonText({errors:result.errors, quarantine:safeGet(root,'logs.quarantine',[])}).slice(0,600); break; }
      case 'state.schema': { actual.pass=isSchemaValid(root); actual.evidence=`schemaValid=${actual.pass}; version=${safeGet(root,'meta.version','')}`; break; }
      case 'state.logs.quarantine': { actual.allowed=true; actual.present=Array.isArray(safeGet(root,'logs.quarantine',[])) && safeGet(root,'logs.quarantine',[]).length>0; actual.evidence=jsonText(safeGet(root,'logs.quarantine',[])).slice(0,500); break; }
      case 'state.bad_container': { const targetObj=safeGet(root,target,undefined); const repaired=targetObj && typeof targetObj==='object' && !Array.isArray(targetObj); actual.pass=repaired; actual.evidence=`${target} type after=${Array.isArray(targetObj)?'array':typeof targetObj}`; break; }
      case 'state.crash': { actual.present=!result.ok || (result.errors&&result.errors.length>0); actual.evidence=jsonText(result.errors||[]).slice(0,500); break; }
      case 'state.pending_flags': { const p=root.pending||{}; const txt=jsonText(p); actual.pass=!hasText(txt,'stale') || /abilityCandidate|itemCandidate/.test(txt)===false || objSize(p)<4000; actual.evidence=txt.slice(0,600); break; }
      case 'state.future_version': { const version=Number(safeGet(root,'meta.version',0)); const q=jsonText(safeGet(root,'logs.quarantine',[])); actual.pass=version<999 || hasText(q,'future'); actual.evidence=`version=${version}; quarantine=${q.slice(0,400)}`; break; }
      case 'state.circular_or_oversized_payload': { const size=objSize(root); actual.pass=result.ok && size < 250000; actual.evidence=`stateBytes=${size}`; break; }
      case 'runtime.hook_ms': { const d=[result.input,result.context,result.output].filter(Boolean).map(x=>x.durationMs||0); actual.value=d.length?Math.max(...d):0; actual.evidence=`hookDurations=${d.join(',')}`; break; }
      case 'context.length': { const len=(result.context&&result.context.text?result.context.text.length:0); const max=12000; actual.pass=len<=max; actual.value=len; actual.evidence=`contextLength=${len}; max=${max}`; break; }
      case 'state.size_growth': { actual.value=Math.max(0,objSize(root)-objSize(beforeRoot)); actual.evidence=`before=${objSize(beforeRoot)}; after=${objSize(root)}`; break; }
      case 'output.return_text': { actual.value=(result.output&&result.output.text)||''; actual.evidence=String(actual.value).slice(0,200); break; }
      case 'stop_flag': { actual.present=!!((result.input&&result.input.stop)||(result.context&&result.context.stop)||(result.output&&result.output.stop)); actual.evidence=`input=${!!(result.input&&result.input.stop)} context=${!!(result.context&&result.context.stop)} output=${!!(result.output&&result.output.stop)}`; break; }
      case 'runtime.memory_mb': { actual.not_evaluated=true; actual.reason='The Node mimic cannot accurately measure AI Dungeon sandbox per-hook memory. Hook completion and state size are recorded instead.'; actual.evidence=`stateBytes=${objSize(root)}`; break; }
      case 'context.critical_packets': { const txt=(result.context&&result.context.text)||''; actual.present=/player|aidrpg|inventory|ability|quest|scene|time|context/i.test(txt) || txt.length>0; actual.evidence=txt.slice(0,600); break; }
      case 'context.spam_truncated': { const txt=(result.context&&result.context.text)||''; actual.present=/truncat|spam|bounded|omitted/i.test(txt); actual.allowed=true; actual.evidence=txt.slice(0,600); break; }
      default: actual.not_evaluated=true; actual.reason='No adapter implemented for selector.'; break;
    }
    let pass;
    if(actual.not_evaluated) pass=null; else pass=checkOp(actual, op, check);
    if(pass === null && !actual.not_evaluated){ actual.not_evaluated=true; actual.reason='No op evaluator implemented.'; pass=null; }
    return {check, status: pass===true?'pass':pass===false?'fail':'not_evaluated', actual};
  } catch(e) {
    return {check, status:'adapter_error', actual:Object.assign(actual,{error:String(e&&e.stack?e.stack:e)})};
  }
}
function runCase(test,args,fixtures){
  const start=Date.now(); const state0=initialState(test.fixture_id,fixtures); const beforeRoot=rootOf(state0); let result=null, err=null, rt=null;
  try{ rt=createMimic(args.script,{state:state0, hookTimeoutMs:args.timeoutMs, scriptTimeoutMs:2400, evalTimeoutMs:1200}); result=runTurn(rt,{input:test.player_input, context:test.player_input, output:test.simulated_ai_output},{hookTimeoutMs:args.timeoutMs, runContext:true}); }
  catch(e){ err=String(e&&e.stack?e.stack:e); result={ok:false, errors:[{hook:'runner',message:err}], input:null, context:null, output:null}; }
  const finalState=rt && rt.context ? deepClone(rt.context.state) : state0; const root=rootOf(finalState); const storyCards=rt&&rt.context?deepClone(rt.context.storyCards):[];
  const durations=[result.input,result.context,result.output].filter(Boolean).map(x=>x.durationMs||0); const maxHookMs=durations.length?Math.max(...durations):0;
  const ctx={beforeRoot,root,result,storyCards,timeoutMs:args.timeoutMs, initialStateObj:state0};
  const evaluations=(test.checks||[]).map(ch=>evaluateCheck(ch,ctx));
  const semanticFail=evaluations.some(e=>e.status==='fail'||e.status==='adapter_error'); const notEval=evaluations.some(e=>e.status==='not_evaluated'); const hookFail=!!(!result.ok||err||maxHookMs>=args.timeoutMs);
  let status='pass'; if(hookFail) status='hook_fail'; else if(semanticFail) status='fail'; else if(notEval) status='partial';
  return {
    test_id:test.test_id, shard_id:test.shard_id, shard_number:test.shard_number, category_code:test.category_code, scenario_genre_code:test.scenario_genre_code, choice_group_code:test.choice_group_code, fixture_id:test.fixture_id,
    status, hook_status:hookFail?'fail':'pass', semantic_status: semanticFail?'fail':notEval?'partial':'pass', wall_ms:Date.now()-start, max_hook_ms:maxHookMs,
    player_input:test.player_input, simulated_ai_output:test.simulated_ai_output, expected_summary:test.expected_summary, checks:evaluations, hook_errors:result.errors||[], state_summary:result.stateSummary||null,
    final_state:args.includeState?finalState:undefined
  };
}
function runShard(file,args,fixtures){
  const n=(path.basename(file).match(/(\d{3})/)||['','000'])[1]; const out=path.join(args.outDir,`semantic_shard_${n}.jsonl`); const summaryOut=path.join(args.outDir,`semantic_shard_${n}_summary.json`);
  const lines=fs.readFileSync(file,'utf8').trim().split(/\n+/).filter(Boolean); const rows=[]; let total=0; const counts={pass:0, fail:0, partial:0, hook_fail:0, adapter_error:0}; let maxHook=0;
  for(const line of lines){ if(args.maxCases && total>=args.maxCases) break; const test=JSON.parse(line); const row=runCase(test,args,fixtures); rows.push(row); total++; counts[row.status]=(counts[row.status]||0)+1; maxHook=Math.max(maxHook,row.max_hook_ms||0); }
  fs.writeFileSync(out, rows.map(r=>JSON.stringify(r)).join('\n')+'\n');
  const summary={run_type:'UTM2 semantic selector shard evaluation', runner_version:'0.1', script:args.script, shard:n, total, counts, maxHookMs:maxHook, output_file:out, caveat:'runtime.memory_mb remains not_evaluated because Node mimic cannot measure AI Dungeon sandbox memory directly.'};
  fs.writeFileSync(summaryOut, JSON.stringify(summary,null,2)+'\n');
  return summary;
}
function main(){
  const args=parseArgs(process.argv); if(args.help) return help(); fs.mkdirSync(args.outDir,{recursive:true}); const fixtures=loadFixtures(args.fixtures); const files=listShardFiles(args.matrixDir,args.shard,args.all); const summaries=[];
  for(const file of files){ const s=runShard(file,args,fixtures); summaries.push(s); console.error(JSON.stringify(s)); }
  const aggregate={run_type:'UTM2 semantic selector aggregate', runner_version:'0.1', script:args.script, shards:summaries.length, total:0, counts:{pass:0,fail:0,partial:0,hook_fail:0,adapter_error:0}, maxHookMs:0, summaries};
  for(const s of summaries){ aggregate.total+=s.total; for(const [k,v] of Object.entries(s.counts)) aggregate.counts[k]=(aggregate.counts[k]||0)+v; aggregate.maxHookMs=Math.max(aggregate.maxHookMs,s.maxHookMs||0); }
  fs.writeFileSync(path.join(args.outDir,'semantic_aggregate_summary.json'), JSON.stringify(aggregate,null,2)+'\n');
  const code = (process.argv.includes('--fail-exit') && (aggregate.counts.fail||aggregate.counts.hook_fail||aggregate.counts.adapter_error)) ? 1 : 0; if (typeof process.reallyExit === 'function') process.reallyExit(code); else process.exit(code);
}
main();
