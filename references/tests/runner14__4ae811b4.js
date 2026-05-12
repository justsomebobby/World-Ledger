#!/usr/bin/env node
/*
  AIDRPG v1.4 AI Dungeon Play-Loop Tester

  This is a companion runner for the v1.3 official tester. It is designed for the
  exact failure class that kept recurring in late 1.3 testing:

    player input proposes intent;
    story output confirms, denies, delays, quotes, or modifies;
    only confirmed canon should commit.

  It avoids giant stdout buffers, writes progress incrementally, and groups
  failures by root system instead of returning thousands of duplicate rows.
*/

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { createRuntime } = require('./runtime/fake-aid-runtime');
const { flattenStrings } = require('./runtime/assertions');

const VERSION = '1.4.0-playloop';

function parseArgs(argv) {
  const args = {
    script: path.join(process.cwd(), 'aidrpg-script.js'),
    out: path.join(process.cwd(), 'reports', 'v14-custom'),
    category: 'all',
    preset: 'standard',
    limit: 0,
    includePassed: false,
    progressEvery: 25,
    resume: false,
    failFastCategory: 0,
    direct: false,
    singleIndex: null,
    caseTimeoutMs: 8000,
    hookTimeoutMs: 2000,
    scriptTimeoutMs: 2500
  };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--script') args.script = argv[++i] || args.script;
    else if (a === '--out') args.out = argv[++i] || args.out;
    else if (a === '--category') args.category = argv[++i] || args.category;
    else if (a === '--preset') args.preset = argv[++i] || args.preset;
    else if (a === '--limit') args.limit = Number(argv[++i] || 0) || 0;
    else if (a === '--include-passed') args.includePassed = true;
    else if (a === '--progress-every') args.progressEvery = Number(argv[++i] || 25) || 25;
    else if (a === '--resume') args.resume = true;
    else if (a === '--fail-fast-category') args.failFastCategory = Number(argv[++i] || 0) || 0;
    else if (a === '--direct') args.direct = true;
    else if (a === '--single-index') args.singleIndex = Number(argv[++i] || -1);
    else if (a === '--case-timeout-ms') args.caseTimeoutMs = Number(argv[++i] || 8000) || 8000;
    else if (a === '--hook-timeout-ms') args.hookTimeoutMs = Number(argv[++i] || 2000) || 2000;
    else if (a === '--script-timeout-ms') args.scriptTimeoutMs = Number(argv[++i] || 2500) || 2500;
    else if (a === '--help' || a === '-h') args.help = true;
  }
  return args;
}

function showHelp() {
  console.log(`AIDRPG v1.4 AI Dungeon Play-Loop Tester

Usage:
  node runner14.js --script ./aidrpg-script.js --preset standard
  node runner14.js --script ./aidrpg-script.js --preset standard --direct
  node runner14.js --category inventory-denial --limit 120
  node runner14.js --category ability-denial --include-passed

Categories:
  all, smoke-loop, input-only, confirmed-inventory, inventory-denial,
  delayed-confirmation, dialogue-instruction, quest-confirm-deny,
  scene-confirm-deny, ability-confirm-deny, time-confirm-deny,
  reputation, story-cards, sword-flow, context-pressure, chaotic,
  anime-style, long-play

Presets:
  smoke     ~ small fast loop sanity check
  standard  ~ targeted important coverage, usually 550-750 custom cases
  full      ~ larger phrase/product matrix, usually 1200+ custom cases

Notes:
  This runner complements the official runner.js. It intentionally tests AI
  Dungeon turn semantics instead of raw parser grids: input proposes, output
  confirms/denies, state should follow confirmed story truth only.`);
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function lc(v) { return String(v ?? '').toLowerCase(); }
function norm(v) { return lc(v).replace(/[’'`´"]/g, '').replace(/\s+/g, ' ').trim(); }
function includes(text, needle) { return norm(text).includes(norm(needle)); }
function textAny(text, needles) { return needles.some(n => includes(text, n)); }

function safeStrings(value) {
  try { return flattenStrings(value, []); } catch (_e) { return []; }
}

function runHook(rt, hook, text, log) {
  const start = Date.now();
  const ret = rt.runHook(hook, text);
  const durationMs = Date.now() - start;
  if (hook === 'input' || hook === 'output') {
    const histType = hook === 'input' ? 'do' : 'story';
    rt.addHistory(histType, text);
  }
  log.steps.push({ hook, text, returnText: ret && typeof ret.text === 'string' ? ret.text.slice(0, 800) : '', durationMs });
  if (durationMs > log.maxHookMs) log.maxHookMs = durationMs;
  return ret;
}

function runCommand(rt, command, log) {
  const start = Date.now();
  const ret = rt.runHook('input', command);
  const durationMs = Date.now() - start;
  log.steps.push({ hook: 'input-command', text: command, returnText: ret && ret.text ? ret.text.slice(0, 1600) : '', durationMs });
  if (durationMs > log.maxHookMs) log.maxHookMs = durationMs;
  return ret && typeof ret.text === 'string' ? ret.text : '';
}

function root(rt) { return rt.context.state && rt.context.state.aidrpg ? rt.context.state.aidrpg : {}; }
function inventoryText(rt, log) { return runCommand(rt, '/inventory', log); }
function sheetText(rt, log) { return runCommand(rt, '/sheet', log); }
function questText(rt, log) { return runCommand(rt, '/questlog', log); }
function repText(rt, log) { return runCommand(rt, '/reputation', log); }
function timeText(rt, log) { return runCommand(rt, '/time', log); }

function ownedItemNames(rt, log) {
  const txt = inventoryText(rt, log);
  const line = txt.split(/\n/).find(x => /^Owned Items:/i.test(x)) || '';
  return { text: txt, line };
}

function inventoryHas(rt, log, item) {
  const inv = ownedItemNames(rt, log);
  return includes(inv.line || inv.text, item);
}

function inventoryHasAny(rt, log, items) {
  const inv = ownedItemNames(rt, log);
  return items.some(item => includes(inv.line || inv.text, item));
}

function countInOwnedInventory(rt, log, item) {
  const inv = ownedItemNames(rt, log);
  const target = norm(item);
  if (!target) return 0;
  const text = norm(inv.line || inv.text);
  return text.split(target).length - 1;
}

function abilityStrings(rt) {
  const r = root(rt);
  const abilities = r.abilities || {};
  const target = {
    byId: abilities.byId || {},
    byKey: abilities.byKey || {},
    priorityAbilityKey: abilities.priorityAbilityKey || '',
    priority: abilities.priority || null,
    current: abilities.current || null
  };
  return safeStrings(target).join('\n');
}

function abilityHas(rt, abilityName) {
  return includes(abilityStrings(rt), abilityName);
}

function contextText(rt, log, seed = 'Current scene context check.') {
  const ret = runHook(rt, 'context', seed, log);
  return ret && typeof ret.text === 'string' ? ret.text : '';
}

function currentSceneName(rt) {
  const r = root(rt);
  const scene = r.world && r.world.currentScene ? r.world.currentScene : {};
  return String(scene.displayName || scene.name || scene.sceneName || scene.sceneRef || '');
}

function storyCardManagedCount(rt) {
  const cards = Array.isArray(rt.context.storyCards) ? rt.context.storyCards : [];
  const managed = cards.filter(c => /SYS:AIDRPG|AIDRPG|aidrpg/i.test(String(c.keys || '') + ' ' + String(c.entry || c.value || '')));
  return { total: cards.length, managed: managed.length, keys: managed.map(c => c.keys) };
}

function caseObj(category, name, system, severity, run, opts = {}) {
  return Object.assign({ category, name, system, severity, maturity: 'CURRENT', run }, opts);
}

function pass(message, extra = {}) { return Object.assign({ passed: true, message }, extra); }
function fail(message, extra = {}) { return Object.assign({ passed: false, message }, extra); }

function makeRuntime(scriptPath, args) {
  const rt = createRuntime({
    state: {},
    info: { actionCount: 0, maxChars: 12000, memoryLength: 0 },
    history: [],
    storyCards: [],
    memory: {},
    hookTimeoutMs: args.hookTimeoutMs,
    scriptTimeoutMs: args.scriptTimeoutMs
  });
  rt.loadScript(scriptPath);
  return rt;
}

const ITEMS = [
  'rusted iron key', 'obsidian key', 'silver dagger', 'red healing potion',
  'black gate key', 'jeweled crown', 'crystal orb', 'minor healing vial',
  'brass key', 'tower shield'
];
const SOURCES = ['from the altar', 'from the table', 'near the shrine', 'inside the guild chest', 'beside the broken cart'];
const TAKE_VERBS = ['pick up', 'take', 'grab', 'retrieve', 'recover', 'pocket', 'scoop up', 'snatch', 'gather', 'stash'];
const DENIALS = [
  item => `You reach for the ${item}, but it is only an illusion and your hand closes on empty air.`,
  item => `You try to take the ${item}, but Mira stops you before you can get it.`,
  item => `You cannot pick up the ${item}; it is fused to the stone.`,
  item => `There is no ${item} here, so you get nothing.`,
  item => `The goblin snatches the ${item} away before you can take it.`,
  item => `You almost grab the ${item}, but stop yourself.`,
  item => `You reach for the ${item}, but it vanishes before you get it.`,
  item => `The ${item} remains sealed behind glass.`
];
const CONFIRMS = [
  (verb, item, source) => `You ${verb} the ${item} ${source}.`,
  (verb, item, source) => `You ${verb} the ${item} ${source} and secure it in your pouch.`,
  (_verb, item, source) => `Mira hands you the ${item} ${source}, and you accept it.`,
  (_verb, item, source) => `The chest opens; you receive the ${item} ${source}.`
];

function buildTests(preset) {
  const tests = [];

  // smoke-loop: real hook/command sanity.
  tests.push(caseObj('smoke-loop', 'runtime identity and basic commands', 'RuntimeGate/AdminDebugSystem', 'CURRENT_BLOCKER', (rt, log) => {
    const version = String(rt.context.AIDRPG && rt.context.AIDRPG.VERSION || '');
    const stage = String(rt.context.AIDRPG && rt.context.AIDRPG.BUILD_STAGE || '');
    const cmds = ['/sheet', '/inventory', '/time', '/questlog', '/reputation', '/cardsync'];
    const bad = [];
    for (const c of cmds) {
      const out = runCommand(rt, c, log);
      if (typeof out !== 'string' || !out.trim()) bad.push(c);
    }
    if (bad.length) return fail('One or more admin/debug commands returned empty text.', { bad, version, stage });
    return pass('Runtime and debug/admin commands work.', { version, stage });
  }));

  // input-only: proposal should not grant.
  for (const item of ITEMS.slice(0, preset === 'full' ? ITEMS.length : 6)) {
    tests.push(caseObj('input-only', `input-only pickup does not grant ${item}`, 'InventorySystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', `I pick up the ${item}.`, log);
      return inventoryHas(rt, log, item) ? fail('Input alone granted an item.', { item }) : pass('Input alone stayed proposal-only.', { item });
    }));
  }

  // confirmed inventory matrix.
  const itemSet = preset === 'full' ? ITEMS : ITEMS.slice(0, 6);
  const verbSet = preset === 'full' ? TAKE_VERBS : ['pick up', 'take', 'grab', 'pocket', 'retrieve'];
  const sourceSet = preset === 'full' ? SOURCES : SOURCES.slice(0, 3);
  for (const item of itemSet) {
    for (const verb of verbSet) {
      const source = sourceSet[(tests.length + item.length + verb.length) % sourceSet.length];
      tests.push(caseObj('confirmed-inventory', `confirmed ${verb} grants exactly one ${item}`, 'InventorySystem', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', `I ${verb} the ${item}.`, log);
        runHook(rt, 'output', `You ${verb} the ${item} ${source} and secure it in your pouch.`, log);
        const has = inventoryHas(rt, log, item);
        const count = countInOwnedInventory(rt, log, item);
        const badFragment = inventoryHasAny(rt, log, ['from the altar', 'from the table', 'near the shrine', 'secure it', 'in your pouch']);
        if (!has) return fail('Confirmed acquisition did not add the item.', { item, verb, source });
        if (count > 1) return fail('Confirmed acquisition duplicated the item.', { item, count });
        if (badFragment) return fail('Confirmed acquisition leaked source/action fragment as item.', { item, verb, source });
        return pass('Confirmed acquisition created one clean item.', { item, verb, source });
      }));
    }
  }

  // denied inventory matrix: high value but bounded.
  const denialItems = preset === 'smoke' ? ITEMS.slice(0, 2) : itemSet;
  for (const item of denialItems) {
    const forms = preset === 'full' ? DENIALS : DENIALS.slice(0, 6);
    for (let i = 0; i < forms.length; i += 1) {
      tests.push(caseObj('inventory-denial', `denied pickup does not grant ${item} [${i + 1}]`, 'InventorySystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', `I take the ${item}.`, log);
        runHook(rt, 'output', forms[i](item), log);
        return inventoryHas(rt, log, item) ? fail('Denied/failed output still granted item.', { item, output: forms[i](item) }) : pass('Denied output did not grant item.', { item });
      }));
    }
  }

  // delayed confirmation.
  for (const item of ['obsidian key', 'crystal orb', 'silver dagger', 'black gate key']) {
    tests.push(caseObj('delayed-confirmation', `delayed handoff commits ${item} only on confirm turn`, 'InventorySystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', `I reach for the ${item}.`, log);
      runHook(rt, 'output', `You reach for the ${item}, but the ward pushes your hand away.`, log);
      const early = inventoryHas(rt, log, item);
      runHook(rt, 'input', `I ask Mira to lower the ward.`, log);
      runHook(rt, 'output', `Mira lowers the ward and hands you the ${item}.`, log);
      const later = inventoryHas(rt, log, item);
      if (early) return fail('Denied first turn committed item before delayed confirmation.', { item });
      if (!later) return fail('Confirmed second turn did not commit item.', { item });
      return pass('Delayed confirmation behaved correctly.', { item });
    }));
  }

  // dialogue instruction and quoted second person.
  const speakers = ['Mira', 'Captain Rook', 'the merchant', 'the goblin', 'Elder Vael'];
  const quoteVerbs = ['Take', 'Grab', 'Pick up', 'Pocket'];
  for (const speaker of speakers) {
    for (const item of itemSet.slice(0, preset === 'full' ? 8 : 5)) {
      const verb = quoteVerbs[(speaker.length + item.length) % quoteVerbs.length];
      tests.push(caseObj('dialogue-instruction', `dialogue instruction does not grant ${item} from ${speaker}`, 'InventorySystem/DialogueGuard', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', 'I ask what to do.', log);
        runHook(rt, 'output', `${speaker} points at the altar and says, "${verb} the ${item} before the cult returns."`, log);
        return inventoryHas(rt, log, item) ? fail('Quoted/dialogue instruction granted item.', { speaker, item, verb }) : pass('Dialogue instruction stayed non-canon.', { speaker, item });
      }));
      tests.push(caseObj('dialogue-instruction', `quoted second-person pickup does not grant ${item} from ${speaker}`, 'InventorySystem/DialogueGuard', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', 'I listen.', log);
        runHook(rt, 'output', `${speaker} says, "You pick up the ${item} only when I say so."`, log);
        return inventoryHas(rt, log, item) ? fail('Quoted second-person text granted item.', { speaker, item }) : pass('Quoted second-person text stayed dialogue only.', { speaker, item });
      }));
    }
  }
  for (const item of ['rusted iron key', 'red healing potion', 'silver dagger', 'black gate key', 'minor healing vial']) {
    tests.push(caseObj('dialogue-instruction', `confirmed dialogue handoff grants ${item}`, 'InventorySystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', 'I hold out my hand.', log);
      runHook(rt, 'output', `Mira says, "Take this." She places the ${item} in your hand, and you accept it.`, log);
      return inventoryHas(rt, log, item) ? pass('Narrated handoff committed item.', { item }) : fail('Narrated handoff did not commit item.', { item });
    }));
  }

  // quest confirm/deny.
  const questObjs = [
    'repair the north wall', 'escort Bram to The Drunken Huntsman', 'deliver the guild letter',
    'investigate the burned tavern', 'protect the market gate', 'recover the sun relic',
    'clear the old barrow', 'find the missing apprentice'
  ];
  const acceptVerbs = ['accept', 'agree to', 'take', 'start', 'commit to'];
  const denyForms = [
    q => `You consider Elder Mira's quest to ${q}, but decline it.`,
    q => `You decide not to accept Elder Mira's quest to ${q}.`,
    q => `You refuse the quest to ${q}.`,
    q => `You ask about the quest to ${q}, but you do not accept it.`
  ];
  for (const q of questObjs) {
    for (const av of (preset === 'full' ? acceptVerbs : ['accept', 'agree to', 'take'])) {
      tests.push(caseObj('quest-confirm-deny', `confirmed quest ${av}: ${q}`, 'QuestLogSystem', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', `I ${av} Elder Mira's quest.`, log);
        runHook(rt, 'output', `You ${av} Elder Mira's quest to ${q}.`, log);
        const qt = questText(rt, log);
        return includes(qt, q) ? pass('Confirmed quest accepted.', { objective: q }) : fail('Confirmed quest was not logged.', { objective: q, questlog: qt });
      }));
    }
    for (const df of denyForms) {
      tests.push(caseObj('quest-confirm-deny', `denied quest does not activate: ${q}`, 'QuestLogSystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', `I consider Elder Mira's quest to ${q}.`, log);
        runHook(rt, 'output', df(q), log);
        const qt = questText(rt, log);
        return includes(qt, q) ? fail('Denied quest became active.', { objective: q, questlog: qt }) : pass('Denied quest stayed inactive.', { objective: q });
      }));
    }
  }

  // scene confirm/deny.
  const scenes = ['Sun Palace', 'The Drunken Huntsman', 'The Silver Hart', 'smithy forge room', 'chapel nave', 'barrow sanctum', 'market gate', 'guild hall'];
  for (const scene of scenes) {
    tests.push(caseObj('scene-confirm-deny', `confirmed scene entry: ${scene}`, 'SceneStateSystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', `I enter ${scene}.`, log);
      runHook(rt, 'output', `You enter ${scene}. The air changes around you.`, log);
      const current = currentSceneName(rt) + '\n' + contextText(rt, log);
      return includes(current, scene) ? pass('Confirmed scene became current.', { scene }) : fail('Confirmed scene was not current.', { scene, current });
    }));
    tests.push(caseObj('scene-confirm-deny', `blocked scene entry does not enter: ${scene}`, 'SceneStateSystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', `I enter ${scene}.`, log);
      runHook(rt, 'output', `You try to enter ${scene}, but the guards stop you on the road outside.`, log);
      const current = currentSceneName(rt) + '\n' + contextText(rt, log);
      return includes(current, scene) ? fail('Blocked scene entry still became current scene.', { scene, current }) : pass('Blocked entry did not promote target scene.', { scene, current });
    }));
  }
  tests.push(caseObj('scene-confirm-deny', 'named building outranks road after travel phrase', 'SceneStateSystem', 'CURRENT_BLOCKER', (rt, log) => {
    runHook(rt, 'input', 'I go back to The Drunken Huntsman.', log);
    runHook(rt, 'output', 'After the road, you enter The Drunken Huntsman.', log);
    const current = currentSceneName(rt) + '\n' + contextText(rt, log);
    if (!includes(current, 'Drunken Huntsman')) return fail('Named destination did not outrank road.', { current });
    if (/^road$/i.test(currentSceneName(rt).trim())) return fail('Current scene stayed road instead of named destination.', { current });
    return pass('Named destination outranked road.', { currentScene: currentSceneName(rt) });
  }));

  // ability confirm/deny, including anime styles and Ember Ward special case.
  const abilities = ['Ember Ward', 'Moonlit Thunder Step', 'Crimson Lotus Fang', 'Azure Dragon Step', 'Hollow Star Palm', 'Iron Root Stance', 'Glass Petal Cut', 'Void Lantern Veil'];
  const denyAbilityForms = [
    a => `You try to channel ${a}, but nothing happens and no technique takes shape.`,
    a => `The pattern collapses before ${a} manifests.`,
    a => `You cannot use ${a}; the energy fails before forming.`,
    a => `No ${a} answers your call.`
  ];
  for (const ability of abilities) {
    tests.push(caseObj('ability-confirm-deny', `confirmed ability stores exact name: ${ability}`, 'AbilitySystem', 'CURRENT_BLOCKER', (rt, log) => {
      runHook(rt, 'input', `I channel ${ability}.`, log);
      runHook(rt, 'output', `${ability} takes shape as a controlled technique with a clear purpose.`, log);
      const ctx = contextText(rt, log);
      const has = abilityHas(rt, ability) || includes(ctx, ability);
      return has ? pass('Confirmed ability became canonical with exact name.', { ability }) : fail('Confirmed ability was not stored/exposed.', { ability, abilities: abilityStrings(rt), context: ctx });
    }));
    for (const df of (preset === 'full' ? denyAbilityForms : denyAbilityForms.slice(0, 2))) {
      tests.push(caseObj('ability-confirm-deny', `denied ability does not store: ${ability}`, 'AbilitySystem/ValidationSystem', 'CURRENT_BLOCKER', (rt, log) => {
        runHook(rt, 'input', `I channel ${ability}.`, log);
        runHook(rt, 'output', df(ability), log);
        const ctx = contextText(rt, log);
        const has = abilityHas(rt, ability) || includes(ctx, ability);
        return has ? fail('Denied ability became canonical or priority context.', { ability, abilities: abilityStrings(rt), context: ctx }) : pass('Denied ability stayed unconfirmed.', { ability });
      }));
    }
  }
  tests.push(caseObj('anime-style', 'anime named technique identity survives adaptation', 'AbilitySystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'input', 'I channel Moonlit Thunder Step to move as a controlled afterimage dash.', log);
    runHook(rt, 'output', 'Moonlit Thunder Step becomes a controlled afterimage dash that lets you cross the arena without losing balance.', log);
    const ctx = contextText(rt, log);
    if (!abilityHas(rt, 'Moonlit Thunder Step') && !includes(ctx, 'Moonlit Thunder Step')) return fail('Exact anime technique name was not preserved.', { abilities: abilityStrings(rt), context: ctx });
    if (abilityHas(rt, 'Thunder Step Variation') && !abilityHas(rt, 'Moonlit Thunder Step')) return fail('Technique was flattened into a partial variation name.', { abilities: abilityStrings(rt) });
    return pass('Anime technique identity preserved.', { context: ctx.slice(0, 500) });
  }));
  tests.push(caseObj('anime-style', 'Ember Ward low dome stays application, not Low Dome skill', 'AbilitySystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'input', 'I use Ember Ward to shield the whole team.', log);
    runHook(rt, 'output', 'Ember Ward becomes a low ember dome around the whole team, but Low Dome is not a separate technique.', log);
    const strings = abilityStrings(rt);
    if (!includes(strings + contextText(rt, log), 'Ember Ward')) return fail('Ember Ward did not remain canonical.', { abilities: strings });
    if (abilityHas(rt, 'Low Dome')) return fail('Low Dome became a separate canonical ability.', { abilities: strings });
    return pass('Low-dome wording stayed under Ember Ward.', { abilities: strings.slice(0, 700) });
  }));

  // time confirmation/denial.
  tests.push(caseObj('time-confirm-deny', 'denied long sleep does not age player', 'TimeTravelSystem/PlayerSystem', 'CURRENT_BLOCKER', (rt, log) => {
    runHook(rt, 'output', 'You, Kaelen, a 19 year old human adventurer, wake in the inn.', log);
    runHook(rt, 'input', 'I sleep for twenty years.', log);
    runHook(rt, 'output', 'You try to sleep for twenty years, but Mira wakes you after one hour.', log);
    const st = sheetText(rt, log);
    if (includes(st, 'Age: 39') || includes(st, 'Age: 59')) return fail('Denied long sleep aged the player.', { sheet: st });
    return pass('Denied time skip did not age player.', { sheet: st });
  }));
  tests.push(caseObj('time-confirm-deny', 'confirmed twenty-year time skip ages player once', 'TimeTravelSystem/PlayerSystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'You, Kaelen, a 19 year old human adventurer, wake in the inn.', log);
    runHook(rt, 'output', 'Twenty years pass after the curse reshapes your body.', log);
    const st = sheetText(rt, log);
    if (includes(st, 'Age: 39')) return pass('Confirmed time skip aged once.', { sheet: st });
    if (includes(st, 'Age: 59')) return fail('Confirmed time skip double-aged player.', { sheet: st });
    return fail('Confirmed time skip did not age to expected value.', { sheet: st });
  }));
  tests.push(caseObj('time-confirm-deny', 'route base and weather delay persist', 'TimeTravelSystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'The trip from Oakbridge to Stoneford takes 2 hours.', log);
    runHook(rt, 'output', 'Because of heavy rain, the return from Stoneford to Oakbridge takes 3 hours instead of the usual 2 hours.', log);
    const tt = timeText(rt, log);
    const hasBase = includes(tt, 'Oakbridge') && includes(tt, 'Stoneford') && (includes(tt, '120m') || includes(tt, '2 hours'));
    const hasDelay = includes(tt, 'rain') && (includes(tt, '180m') || includes(tt, '3 hours'));
    if (!hasBase) return fail('Route base time missing.', { time: tt });
    if (!hasDelay) return fail('Route delay detail missing.', { time: tt });
    return pass('Route base and delay persisted.', { time: tt });
  }));

  // reputation.
  tests.push(caseObj('reputation', 'public positive deed creates positive reputation', 'ReputationSystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'After you save the market from bandits, word spreads through Greybridge and the town praises you as a hero.', log);
    const rep = repText(rt, log);
    return textAny(rep, ['positive', 'hero', 'praises', 'save']) ? pass('Positive public reputation recorded.', { reputation: rep }) : fail('Positive public deed was not recorded.', { reputation: rep });
  }));
  tests.push(caseObj('reputation', 'secret deed does not create public reputation', 'ReputationSystem/ValidationSystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'You secretly save the market from bandits, but nobody sees it and no word spreads.', log);
    const rep = repText(rt, log);
    return textAny(rep, ['hero', 'praises', 'positive']) ? fail('Secret deed created public reputation.', { reputation: rep }) : pass('Secret deed stayed non-public.', { reputation: rep });
  }));
  tests.push(caseObj('reputation', 'negative rumor creates negative/blame reputation', 'ReputationSystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'Word spreads through Greybridge that you caused the tavern fire and betrayed the guildmaster.', log);
    const rep = repText(rt, log);
    return textAny(rep, ['negative', 'blame', 'betrayed', 'caused the tavern fire', 'bad']) ? pass('Negative rumor recorded as negative/blame.', { reputation: rep }) : fail('Negative rumor missing or not negative.', { reputation: rep });
  }));

  // sword flow.
  tests.push(caseObj('sword-flow', 'pickup/equip/use/throw/recover sword does not duplicate', 'InventorySystem/Equipment', 'CURRENT_BLOCKER', (rt, log) => {
    runHook(rt, 'input', 'You pick up the iron sword.', log);
    if (inventoryHas(rt, log, 'iron sword')) return fail('Input-only second-person pickup granted sword.', {});
    runHook(rt, 'output', 'You pick up the iron sword from the rack.', log);
    runHook(rt, 'output', 'You pick up the iron sword from the rack.', log);
    runHook(rt, 'input', 'I equip the iron sword.', log);
    runHook(rt, 'output', 'You equip the iron sword in your main hand.', log);
    runHook(rt, 'output', 'You slash with the iron sword, parry with it, throw it, miss, and retrieve the iron sword from the mud.', log);
    const count = countInOwnedInventory(rt, log, 'iron sword');
    const inv = inventoryText(rt, log);
    if (count !== 1) return fail('Sword flow duplicated or lost sword incorrectly.', { count, inventory: inv });
    if (!includes(inv, 'mainHand') && !includes(inv, 'main hand')) return fail('Sword equipment did not persist.', { inventory: inv });
    return pass('Sword pickup/equip/use/throw/recover safe.', { inventory: inv });
  }));
  tests.push(caseObj('sword-flow', 'confirmed stolen sword is removed or unequipped/lost', 'InventorySystem/Equipment', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'You pick up the iron sword from the rack.', log);
    runHook(rt, 'output', 'You equip the iron sword in your main hand.', log);
    runHook(rt, 'output', 'You throw your iron sword, but the goblin catches it and runs away with your iron sword.', log);
    const inv = inventoryText(rt, log);
    const stillOwnedAndEquipped = includes(inv, 'Owned Items: iron sword') && (includes(inv, 'mainHand: iron sword') || includes(inv, 'main_hand: iron sword'));
    return stillOwnedAndEquipped ? fail('Confirmed stolen/lost sword stayed owned and equipped.', { inventory: inv }) : pass('Confirmed stolen/lost sword did not stay fully owned/equipped.', { inventory: inv });
  }));
  tests.push(caseObj('sword-flow', 'named item preserves two-word name and damage applies', 'InventorySystem', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'You pick up the iron sword from the rack.', log);
    runHook(rt, 'output', 'You name the iron sword Dawn Edge.', log);
    runHook(rt, 'output', 'The iron sword is damaged by the ogre strike and the blade cracks.', log);
    const inv = inventoryText(rt, log);
    const stateText = safeStrings(root(rt).items || {}).join('\n');
    if (!includes(inv + stateText, 'Dawn Edge')) return fail('Two-word personal item name was not preserved.', { inventory: inv, items: stateText.slice(0, 800) });
    if (!textAny(inv + stateText, ['damaged', 'crack', 'cracked', 'durability', 'condition'])) return fail('Named item damage was not applied/exposed.', { inventory: inv, items: stateText.slice(0, 1000) });
    return pass('Named item and damage persisted.', { inventory: inv });
  }));

  // story card repeat sync.
  for (let i = 0; i < (preset === 'full' ? 20 : 8); i += 1) {
    tests.push(caseObj('story-cards', `Story Card sync repeat safety ${i + 1}`, 'CardSyncSystem', 'CURRENT_WARNING', (rt, log) => {
      runCommand(rt, '/cardsync live on', log);
      runCommand(rt, '/cardsync safe off', log);
      runHook(rt, 'output', 'You enter the burned tavern. The burned tavern is in Greybridge and its roof is blackened by fire.', log);
      runHook(rt, 'output', 'You enter the burned tavern. The burned tavern is in Greybridge and its roof is blackened by fire.', log);
      const cardInfo = storyCardManagedCount(rt);
      const uniqueKeys = new Set(cardInfo.keys.map(k => norm(k))).size;
      if (cardInfo.managed > 12) return fail('Card sync produced too many managed cards for one repeated fact.', cardInfo);
      if (uniqueKeys < cardInfo.keys.length) return fail('Card sync produced duplicate managed keys.', cardInfo);
      return pass('Story Card repeat sync did not duplicate aggressively.', cardInfo);
    }));
  }

  // context pressure: current truth survives clutter.
  tests.push(caseObj('context-pressure', 'important item survives crowded context', 'ContextPacketSystem/InventorySystem', 'CURRENT_WARNING', (rt, log) => {
    for (let i = 0; i < 40; i += 1) rt.addHistory('story', `Background chatter ${i}: villagers discuss weather, soup, old gossip, and market prices.`);
    runHook(rt, 'output', 'You pick up the black sigil key from the altar.', log);
    const ctx = contextText(rt, log, 'Crowded context check with many stale memories.');
    return includes(ctx, 'black sigil key') || inventoryHas(rt, log, 'black sigil key') ? pass('Important recent item survived context/inventory check.', { context: ctx.slice(0, 800) }) : fail('Important recent item absent under context pressure.', { context: ctx });
  }));
  tests.push(caseObj('context-pressure', 'recent named ability survives crowded context', 'ContextPacketSystem/AbilitySystem', 'CURRENT_WARNING', (rt, log) => {
    for (let i = 0; i < 40; i += 1) rt.addHistory('story', `Old travel note ${i}: roads, shops, clouds, and random inn gossip.`);
    runHook(rt, 'input', 'I use Ember Ward to protect the team.', log);
    runHook(rt, 'output', 'Ember Ward becomes a dome around the whole team.', log);
    const ctx = contextText(rt, log, 'Crowded ability context check.');
    return includes(ctx, 'Ember Ward') ? pass('Recent ability survived context pressure.', { context: ctx.slice(0, 800) }) : fail('Recent ability dropped under context pressure.', { context: ctx, abilities: abilityStrings(rt) });
  }));

  // chaotic/non-standard play.
  const chaoticActs = [
    ['lick the cursed doorknob', ['doorknob']],
    ['insult the soup', ['soup']],
    ['argue with the clouds', ['clouds']],
    ['cartwheel into a barrel', ['barrel']],
    ['declare I own Excalibur and am level 999', ['Excalibur']]
  ];
  for (const [act, badItems] of chaoticActs) {
    tests.push(caseObj('chaotic', `chaotic action does not create fake item: ${act}`, 'ValidationSystem/InventorySystem', 'CURRENT_WARNING', (rt, log) => {
      runHook(rt, 'input', `I ${act}.`, log);
      runHook(rt, 'output', `You ${act}, but the world does not reward the nonsense with free possessions or impossible power.`, log);
      const bad = badItems.filter(x => inventoryHas(rt, log, x));
      const st = sheetText(rt, log);
      if (bad.length) return fail('Chaotic action created fake item.', { act, bad, inventory: inventoryText(rt, log) });
      if (includes(st, 'Level: 999')) return fail('Chaotic claim created impossible level.', { sheet: st });
      return pass('Chaotic/nonstandard play stayed safe.', { act });
    }));
  }

  // long-play composed scenario.
  tests.push(caseObj('long-play', 'standard mini adventure stays coherent', 'Cross-System', 'CURRENT_WARNING', (rt, log) => {
    runHook(rt, 'output', 'You, Kaelen, a 24 year old elf adventurer, arrive in Greybridge.', log);
    runHook(rt, 'output', 'You accept Elder Mira\'s quest to recover the sun relic from the barrow sanctum.', log);
    runHook(rt, 'output', 'You enter The Drunken Huntsman and speak with Captain Rook, an A-rank guard captain.', log);
    runHook(rt, 'output', 'The trip from Greybridge to the barrow sanctum takes 2 hours.', log);
    runHook(rt, 'output', 'You pick up the red healing potion, the rusted iron key, and 7 copper coins from the altar.', log);
    runHook(rt, 'output', 'You fight the barrow ghoul, suffer a bruised shoulder, and use Ember Ward to protect Mira.', log);
    runHook(rt, 'output', 'You recover the sun relic and return to Greybridge through heavy rain in 3 hours instead of the usual 2.', log);
    const inv = inventoryText(rt, log);
    const qt = questText(rt, log);
    const tt = timeText(rt, log);
    const ctx = contextText(rt, log);
    const missing = [];
    if (!includes(inv, 'red healing potion')) missing.push('potion inventory');
    if (!includes(inv, 'rusted iron key')) missing.push('key inventory');
    if (!includes(inv, '7') && !includes(inv, 'copper')) missing.push('currency');
    if (!includes(qt, 'sun relic')) missing.push('quest');
    if (!includes(tt, 'Greybridge') && !includes(tt, 'barrow')) missing.push('route');
    if (!includes(ctx, 'Ember Ward') && !abilityHas(rt, 'Ember Ward')) missing.push('ability context');
    return missing.length ? fail('Mini adventure lost important current truth.', { missing, inv, qt, tt, ctx: ctx.slice(0, 1000) }) : pass('Mini adventure stayed coherent.', { inv, qt, tt });
  }));

  return tests;
}

function filterTests(tests, args) {
  let out = tests;
  if (args.preset === 'smoke') {
    const keep = new Set(['smoke-loop', 'input-only', 'inventory-denial', 'dialogue-instruction', 'ability-confirm-deny', 'sword-flow']);
    out = out.filter(t => keep.has(t.category)).slice(0, 80);
  }
  if (args.category && args.category !== 'all') out = out.filter(t => t.category === args.category);
  if (args.limit && out.length > args.limit) out = out.slice(0, args.limit);
  return out;
}

function classifyFailures(results) {
  const groups = new Map();
  for (const r of results.filter(x => !x.passed)) {
    const key = r.system || 'Unknown';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }
  return Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
}

function writeSummary(args, tests, results, interrupted = false) {
  ensureDir(args.out);
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;
  const byCategory = {};
  for (const r of results) {
    if (!byCategory[r.category]) byCategory[r.category] = { total: 0, passed: 0, failed: 0 };
    byCategory[r.category].total += 1;
    if (r.passed) byCategory[r.category].passed += 1;
    else byCategory[r.category].failed += 1;
  }
  const maxHookMs = results.reduce((m, r) => Math.max(m, Number(r.maxHookMs || 0)), 0);
  const failures = results.filter(r => !r.passed);
  const summary = { version: VERSION, generatedAt: new Date().toISOString(), interrupted, planned: tests.length, total, passed, failed, maxHookMs, byCategory, failureGroups: classifyFailures(results).map(([system, list]) => ({ system, count: list.length, examples: list.slice(0, 5).map(x => ({ name: x.name, category: x.category, message: x.message })) })) };
  fs.writeFileSync(path.join(args.out, 'summary.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(args.out, 'results.json'), JSON.stringify(results.filter(r => args.includePassed || !r.passed), null, 2));

  const lines = [];
  lines.push(`# AIDRPG v1.4 AI Dungeon Play-Loop Report`);
  lines.push('');
  lines.push(`Generated: ${summary.generatedAt}`);
  lines.push(`Preset: ${args.preset}`);
  lines.push(`Category: ${args.category}`);
  lines.push(`Planned cases: ${tests.length}`);
  lines.push(`Completed cases: ${total}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push(`Max observed hook duration: ${maxHookMs} ms`);
  if (interrupted) lines.push(`Interrupted: yes`);
  lines.push('');
  lines.push(`## Category Results`);
  lines.push('');
  for (const [cat, row] of Object.entries(byCategory).sort()) {
    lines.push(`- ${cat}: ${row.passed}/${row.total} passed${row.failed ? ` (${row.failed} failed)` : ''}`);
  }
  lines.push('');
  if (!failed) {
    lines.push('## Result');
    lines.push('');
    lines.push('No failures found in this v1.4 custom play-loop pass. This does not replace live AI Dungeon testing, but it covers the major canon-confirmation failure modes.');
  } else {
    lines.push('## Main Failure Groups');
    lines.push('');
    for (const [system, list] of classifyFailures(results)) {
      lines.push(`### ${system} — ${list.length} failing check(s)`);
      for (const r of list.slice(0, 8)) {
        lines.push(`- ${r.severity || 'CURRENT'} | ${r.category} | ${r.name}: ${r.message}`);
      }
      lines.push('');
    }
    lines.push('## Representative Reproductions');
    lines.push('');
    for (const r of failures.slice(0, 20)) {
      lines.push(`### ${r.name}`);
      lines.push(`System: ${r.system}`);
      lines.push(`Severity: ${r.severity}`);
      lines.push(`Issue: ${r.message}`);
      if (r.steps && r.steps.length) {
        lines.push('Steps:');
        for (const s of r.steps.slice(0, 8)) lines.push(`- ${s.hook}: ${JSON.stringify(s.text)}`);
      }
      if (r.extra) {
        lines.push('Evidence:');
        lines.push('```json');
        lines.push(JSON.stringify(r.extra, null, 2).slice(0, 2400));
        lines.push('```');
      }
      lines.push('');
    }
  }
  fs.writeFileSync(path.join(args.out, 'summary.md'), lines.join('\n'));
  return summary;
}

function executeTestAtIndex(args, tests, index) {
  const t = tests[index];
  if (!t) return { index, passed: false, severity: 'TESTER_ERROR', message: 'No test at index ' + index };
  const log = { steps: [], maxHookMs: 0 };
  try {
    const rt = makeRuntime(args.script, args);
    const check = t.run(rt, log);
    return Object.assign({ index, name: t.name, category: t.category, system: t.system, severity: t.severity, passed: !!check.passed, message: check.message || '', maxHookMs: log.maxHookMs, steps: log.steps }, check);
  } catch (err) {
    return { index, name: t.name, category: t.category, system: t.system, severity: 'CURRENT_BLOCKER', passed: false, message: 'Runtime/test exception: ' + String(err && err.stack ? err.stack : err), maxHookMs: log.maxHookMs, steps: log.steps };
  }
}

function recordProgress(args, tests, results, result, index) {
  const progressPath = path.join(args.out, 'progress.ndjson');
  fs.appendFileSync(progressPath, JSON.stringify({ index, total: tests.length, name: result.name, category: result.category, passed: result.passed, message: result.message, maxHookMs: result.maxHookMs }) + '\n');
  if (args.progressEvery && (index + 1) % args.progressEvery === 0) writeSummary(args, tests, results, true);
}

function runDirect(args, tests) {
  ensureDir(args.out);
  fs.writeFileSync(path.join(args.out, 'progress.ndjson'), '');
  const results = [];
  const categoryFails = new Map();
  for (let i = 0; i < tests.length; i += 1) {
    const t = tests[i];
    const failCount = categoryFails.get(t.category) || 0;
    if (args.failFastCategory && failCount >= args.failFastCategory) {
      const skipped = { index: i, name: t.name, category: t.category, system: t.system, severity: 'TESTER_SKIPPED', passed: true, skipped: true, message: `Skipped after ${failCount} category failures to avoid redundant matrix waste.`, maxHookMs: 0, steps: [] };
      results.push(skipped); recordProgress(args, tests, results, skipped, i); continue;
    }
    const result = executeTestAtIndex(args, tests, i);
    if (!result.passed) categoryFails.set(t.category, failCount + 1);
    results.push(result); recordProgress(args, tests, results, result, i);
  }
  return results;
}

function runIsolated(args, tests) {
  ensureDir(args.out);
  fs.writeFileSync(path.join(args.out, 'progress.ndjson'), '');
  const results = [];
  const categoryFails = new Map();
  for (let i = 0; i < tests.length; i += 1) {
    const t = tests[i];
    const failCount = categoryFails.get(t.category) || 0;
    if (args.failFastCategory && failCount >= args.failFastCategory) {
      const skipped = { index: i, name: t.name, category: t.category, system: t.system, severity: 'TESTER_SKIPPED', passed: true, skipped: true, message: `Skipped after ${failCount} category failures to avoid redundant matrix waste.`, maxHookMs: 0, steps: [] };
      results.push(skipped); recordProgress(args, tests, results, skipped, i); continue;
    }
    const childArgs = [__filename, '--script', args.script, '--preset', args.preset, '--category', args.category, '--limit', String(args.limit || 0), '--single-index', String(i), '--out', args.out, '--hook-timeout-ms', String(args.hookTimeoutMs), '--script-timeout-ms', String(args.scriptTimeoutMs), '--direct'];
    const child = spawnSync(process.execPath, childArgs, { encoding: 'utf8', timeout: args.caseTimeoutMs, maxBuffer: 1024 * 512 });
    let result;
    if (child.error || child.status === null) {
      result = { index: i, name: t.name, category: t.category, system: t.system, severity: 'CURRENT_BLOCKER', passed: false, message: `Single-case process timeout or execution failure after ${args.caseTimeoutMs}ms: ${child.error ? child.error.message : 'status null'}`, maxHookMs: args.caseTimeoutMs, steps: [] };
    } else {
      const text = String(child.stdout || '').trim().split(/\n/).filter(Boolean).pop() || '';
      try { result = JSON.parse(text); }
      catch (_e) { result = { index: i, name: t.name, category: t.category, system: t.system, severity: 'TESTER_ERROR', passed: false, message: 'Could not parse child JSON. stderr=' + String(child.stderr || '').slice(0, 500) + ' stdout=' + String(child.stdout || '').slice(0, 500), maxHookMs: 0, steps: [] }; }
    }
    if (!result.passed) categoryFails.set(t.category, failCount + 1);
    results.push(result); recordProgress(args, tests, results, result, i);
  }
  return results;
}

function run() {
  const args = parseArgs(process.argv);
  if (args.help) return showHelp();
  if (!fs.existsSync(args.script)) { console.error(`Missing script file: ${args.script}`); process.exit(2); }
  const tests = filterTests(buildTests(args.preset), args);
  if (args.singleIndex !== null && Number.isFinite(args.singleIndex)) {
    const result = executeTestAtIndex(args, tests, args.singleIndex);
    console.log(JSON.stringify(result));
    process.exit(result.passed ? 0 : 1);
  }
  const results = args.direct ? runDirect(args, tests) : runIsolated(args, tests);
  const summary = writeSummary(args, tests, results, false);
  console.log(`AIDRPG v1.4 play-loop done. Cases: ${summary.total}. Passed: ${summary.passed}. Failed: ${summary.failed}.`);
  console.log(`Report: ${path.join(args.out, 'summary.md')}`);
  if (summary.failed) process.exitCode = 1;
}

run();
