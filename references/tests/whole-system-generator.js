const { getActionModeSemanticsTests } = require('./action-mode-generator');
function base(name, suite, steps, assertions, extra = {}) {
  return Object.assign({
    name,
    suite,
    steps,
    assertions,
    initialState: {},
    initialInfo: { actionCount: 0 },
    initialHistory: [],
    initialStoryCards: [],
    initialMemory: {},
    description: '',
    intendedFunction: '',
    expectedOutcome: '',
    whyItMatters: '',
    patchHint: '',
    severity: 'Medium'
  }, extra);
}

function smokeTests() {
  return [
    base('Smoke: AIDRPG shell loads and input hook initializes state', 'smoke', [{ hook: 'input', text: 'I look around.' }], [
      { type: 'exists', path: 'AIDRPG' },
      { type: 'functionExists', expected: 'onInput' },
      { type: 'functionExists', expected: 'onContext' },
      { type: 'functionExists', expected: 'onOutput' },
      { type: 'exists', path: 'state.aidrpg' },
      { type: 'validHookReturn' },
      { type: 'noRuntimeErrors' }
    ], { intendedFunction: 'Confirm the whole script can be loaded and called like AI Dungeon calls it.' }),
    base('Smoke: debug sheet command runs', 'smoke', [{ hook: 'input', text: '/sheet', captureDebug: true }], [
      { type: 'validHookReturn' },
      { type: 'containsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AdminDebugSystem' }),
    base('Smoke: debug inventory command runs', 'smoke', [{ hook: 'input', text: '/inventory', captureDebug: true }], [
      { type: 'validHookReturn' },
      { type: 'containsText', path: 'lastReturn.text', expected: '[AIDRPG /inventory]' },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AdminDebugSystem' }),
    base('Smoke: context hook returns bounded context', 'smoke', [{ hook: 'input', text: 'I check the room.' }, { hook: 'context', text: 'The player stands in a room.' }], [
      { type: 'validHookReturn' },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'ContextPacketSystem' }),
    base('Smoke: output hook runs without crashing', 'smoke', [{ hook: 'input', text: 'I wait.' }, { hook: 'output', text: 'A quiet moment passes.' }], [
      { type: 'validHookReturn' },
      { type: 'exists', path: 'state.aidrpg.logs' },
      { type: 'noRuntimeErrors' }
    ])
  ];
}

function coreTests() {
  const keys = ['meta','player','build','abilities','items','actors','world','time','reputation','quests','pending','cards','cache','logs'];
  return [
    base('CoreState: top-level schema self-repairs from empty state', 'core', [{ hook: 'input', text: 'I breathe.' }], [
      { type: 'objectHasKeys', path: 'state.aidrpg', expected: keys },
      { type: 'numberAtLeast', path: 'state.aidrpg.meta.currentTurn', expected: 1 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'CoreState' }),
    base('TurnEngine: currentTurn increments only on input', 'core', [{ hook: 'input', text: 'I look.' }, { hook: 'context', text: 'context' }, { hook: 'output', text: 'output' }], [
      { type: 'equals', path: 'state.aidrpg.meta.currentTurn', expected: 1 },
      { type: 'equals', path: 'state.aidrpg.meta.currentHook', expected: '' },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.pending.recentHookTrace', expected: 12 }
    ], { expectedSystem: 'TurnEngine' }),
    base('TurnEngine: repeated output should not create runaway scratch/history state', 'core', [{ hook: 'input', text: 'I rest.' }, { hook: 'output', text: 'You rest for an hour.' }, { hook: 'output', text: 'You rest for an hour.' }], [
      { type: 'exists', path: 'state.aidrpg.pending.turnScratch' },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.pending.recentHookTrace', expected: 12 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TurnEngine', intendedFunction: 'Replay or retry-like repeated output should not corrupt per-turn bookkeeping.' })
  ];
}

function intentTests(limit) {
  const cases = [
    ['attack', 'I slash the goblin with my axe.', 'attack'],
    ['defend', 'I raise my shield and brace for the blow.', 'defend'],
    ['inspect', 'I search the corpse for anything useful.', 'inspect'],
    ['loot', 'I take the rusted iron key from the corpse.', 'loot'],
    ['talk', 'I ask Mira what she saw near the chapel.', 'talk'],
    ['barter', 'I haggle with the merchant over the silver ring.', 'barter'],
    ['travel', 'I travel to the ruined chapel before sunset.', 'travel'],
    ['move', 'I crawl under the broken gate.', 'move'],
    ['equip', 'I equip the cracked bronze shield.', 'equip'],
    ['unequip', 'I remove the bloodied cloak.', 'unequip'],
    ['consume_item', 'I drink the minor healing vial.', 'consume_item'],
    ['train', 'I practice redirecting heat away from my allies.', 'train'],
    ['use_ability', 'I channel my ember ward around Mira.', 'use_ability'],
    ['interact', 'I unlock the sealed chapel door with the black sigil key.', 'interact'],
    ['mixed', 'I ask Mira to watch my back while I take the key and head to the chapel.', 'talk']
  ];
  return cases.slice(0, limit || cases.length).map(([label, input, expected], idx) => base(
    `Intent ${idx + 1}: ${label} phrasing`,
    'intent',
    [{ hook: 'input', text: input }],
    [
      { type: 'equals', path: 'state.aidrpg.pending.inputIntent.primaryType', expected },
      { type: 'numberBetween', path: 'state.aidrpg.pending.inputIntent.confidence', min: 0.2, max: 0.95 },
      { type: 'noRuntimeErrors' }
    ],
    { expectedSystem: 'IntentParser', intendedFunction: 'Verify freeform player phrasing is converted into the correct broad action family.', expectedOutcome: `The primary intent should be ${expected}.`, patchHint: 'Inspect IntentParser scoring, extraction, and primary intent tie-breaking.' }
  ));
}

function inventoryTests(limit) {
  const scenarios = [];
  const verbs = ['take','grab','pick up','collect','loot','retrieve'];
  const targets = [
    { item: 'rusted iron key', confusers: ['iron keyring','iron dagger','silver key','rusted coin'] },
    { item: 'cracked bronze shield', confusers: ['bronze coin','cracked shield strap','bronze helm'] },
    { item: 'minor healing vial', confusers: ['empty vial','minor poison vial','healing herb'] },
    { item: 'black sigil key', confusers: ['black sigil charm','black iron keyring','silver chapel key'] }
  ];
  const modifiers = ['', 'from the corpse', 'off the table', 'beside the dagger', 'near the door', 'not the keyring', 'but leave the dagger'];
  let id = 0;
  for (const target of targets) {
    for (const verb of verbs) {
      for (const mod of modifiers) {
        const input = `I ${verb} the ${target.item}${mod ? ' ' + mod : ''}.`;
        const output = `You take the ${target.item} and secure it.`;
        scenarios.push(base(`Inventory resolution ${++id}: ${target.item} / ${verb} / ${mod || 'plain'}`, 'inventory', [
          { hook: 'input', text: input },
          { hook: 'output', text: output },
          { hook: 'input', text: '/inventory', captureDebug: true }
        ], [
          { type: 'anyStringContains', path: 'state.aidrpg.items', expected: target.item },
          { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: target.confusers },
          { type: 'notContainsText', path: 'lastReturn.text', expected: 'undefined' },
          { type: 'noInternalIdLeak', path: 'lastReturn.text' },
          { type: 'noRuntimeErrors' }
        ], {
          expectedSystem: 'InventorySystem',
          intendedFunction: 'Test that player-directed pickup resolves the intended item and does not accidentally select similar nearby items.',
          expectedOutcome: `The player should own ${target.item}; confusers such as ${target.confusers.join(', ')} should not be selected.`,
          whyItMatters: 'Wrong-item selection can break quests, keys, equipment, rewards, and player trust.',
          patchHint: 'Inspect InventorySystem item normalization, candidate scoring, ownership mutation, negation handling, and visible inventory formatting.',
          severity: 'High'
        }));
        if (scenarios.length >= (limit || 99999)) return scenarios;
      }
    }
  }
  return scenarios;
}

function storyGrantedItemTests(limit) {
  const cases = [
    ['guard pouch', 'You find a rusted iron key in the dead guard\'s pouch and take it.', 'rusted iron key'],
    ['merchant gift', 'The merchant presses a small silver compass into your hand as thanks.', 'small silver compass'],
    ['quest reward', 'Mira rewards you with a stitched leather charm marked with a moon symbol.', 'stitched leather charm'],
    ['loot chest', 'Inside the chest you claim a chipped bronze dagger and three silver coins.', 'chipped bronze dagger'],
    ['condition item', 'Your sword cracks against the golem, leaving the blade chipped and dull.', 'sword']
  ];
  return cases.slice(0, limit || cases.length).map(([label, output, expected], idx) => base(`Story-granted item ${idx + 1}: ${label}`, 'inventory', [
    { hook: 'input', text: 'I examine what happened.' },
    { hook: 'output', text: output },
    { hook: 'input', text: '/inventory', captureDebug: true }
  ], [
    { type: 'anyStringContains', path: 'state.aidrpg.items', expected },
    { type: 'notContainsText', path: 'lastReturn.text', expected: 'undefined' },
    { type: 'noInternalIdLeak', path: 'lastReturn.text' }
  ], {
    expectedSystem: 'InventorySystem',
    intendedFunction: 'Test story-supplied item capture from AI output, not just explicit player pickup commands.',
    expectedOutcome: `The item implied by the narration should become a stable item record: ${expected}.`,
    patchHint: 'Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.',
    severity: 'High'
  }));
}

function playerTests() {
  return [
    base('Player: identity hints from AI output should become stable player facts', 'player', [{ hook: 'input', text: 'Begin.' }, { hook: 'output', text: 'You, Kaelen, a 24 year old elf, wake beneath the branches. Your head brushes the low beam.' }], [
      { type: 'containsText', path: 'state.aidrpg.player.name', expected: 'Kaelen' },
      { type: 'containsText', path: 'state.aidrpg.player.species', expected: 'elf' },
      { type: 'anyStringContains', path: 'state.aidrpg.player.appearance.visibleTraits', expected: 'tall' }
    ], { expectedSystem: 'PlayerSystem', intendedFunction: 'Test stable player identity extraction from AI Dungeon-style opening narration.' }),
    base('Player: injury should be preserved after output consequence', 'player', [{ hook: 'input', text: 'I block the bandit.' }, { hook: 'output', text: 'The bandit\'s blade cuts your left arm, leaving a bleeding gash.' }], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['left arm','bleeding','gash','injury'] }
    ], { expectedSystem: 'PlayerSystem', intendedFunction: 'Test that injuries described by AI output persist as mechanical body/condition state.', severity: 'High', patchHint: 'Inspect ConsequenceParser, ValidationSystem, and PlayerSystem.applyValidatedConsequences.' })
  ];
}

function npcTests(limit) {
  const npcScenarios = [
    {
      name: 'Mira trust after rescue', npc: 'Mira', input: 'I pull Mira away from the collapsing wall and ask if she can still walk.',
      output: 'Mira coughs, shaken but alive. She grips your sleeve and says she trusts you now, though she is still uneasy around the chapel.',
      expected: ['Mira','trust','uneasy'], notExpected: [], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'Guard hostility after threat', npc: 'Captain Dorne', input: 'I threaten Captain Dorne and demand he open the gate.',
      output: 'Captain Dorne stiffens, becoming openly hostile. He orders two guards to block your path.',
      expected: ['Captain Dorne','hostile','guard'], notExpected: [], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'Merchant relationship and transaction', npc: 'Talla', input: 'I politely buy the cracked bronze shield from Talla.',
      output: 'Talla accepts your silver and hands over the cracked bronze shield, warming to your respectful tone.',
      expected: ['Talla','cracked bronze shield'], notExpected: ['hostile'], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'Random extra should not become important actor', npc: 'dock worker', input: 'I pass a nameless dock worker on the road.',
      output: 'A tired dock worker nods once and disappears into the crowd.',
      expected: [], notExpected: ['dock worker'], system: 'ActorProfileSystem', severity: 'Medium'
    },
    {
      name: 'Wounded NPC condition persists', npc: 'Seren', input: 'I check Seren\'s wound.',
      output: 'Seren is pale and wounded, clutching a blood-soaked bandage, but she insists she can keep moving.',
      expected: ['Seren','wounded','bandage'], notExpected: [], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'NPC follows player as companion state', npc: 'Mira', input: 'I ask Mira to follow me to the old chapel.',
      output: 'Mira agrees to follow, keeping close behind you as you approach the old chapel.',
      expected: ['Mira','follow','chapel'], notExpected: [], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'NPC betrayal should alter relationship', npc: 'Veyra', input: 'I accuse Veyra of lying about the sigil.',
      output: 'Veyra smiles thinly, revealing she betrayed you to the chapel cult hours ago.',
      expected: ['Veyra','betray','cult'], notExpected: [], system: 'ActorProfileSystem', severity: 'High'
    },
    {
      name: 'Beast/monster profile should not become normal civilian', npc: 'ash wolf', input: 'I study the ash wolf circling the camp.',
      output: 'The ash wolf limps on one burned paw, wary but not yet attacking.',
      expected: ['ash wolf','wary','limp'], notExpected: ['merchant'], system: 'ActorProfileSystem', severity: 'Medium'
    }
  ];
  return npcScenarios.slice(0, limit || npcScenarios.length).map((s, idx) => base(`NPC simulation ${idx + 1}: ${s.name}`, 'npc', [
    { hook: 'input', text: s.input },
    { hook: 'output', text: s.output },
    { hook: 'context', text: `Current scene includes ${s.npc}.` }
  ], [
    ...(s.expected.length ? [{ type: 'anyStringContainsAll', path: 'state.aidrpg.actors', expected: s.expected }] : []),
    ...(s.notExpected.length ? [{ type: 'notAnyStringContains', path: 'state.aidrpg.actors', expected: s.notExpected }] : []),
    { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
    { type: 'noRuntimeErrors' }
  ], {
    expectedSystem: s.system,
    severity: s.severity,
    intendedFunction: 'Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.',
    expectedOutcome: s.expected.length ? `Actor state/context should preserve: ${s.expected.join(', ')}.` : `This should not create a persistent important actor record for: ${s.notExpected.join(', ')}.`,
    whyItMatters: 'NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.',
    patchHint: 'Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.'
  }));
}

function timeDeepTests(limit) {
  const tests = [
    base('Time: /time command exposes initialized clock state', 'time', [
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'exists', path: 'state.aidrpg.time.current' },
      { type: 'exists', path: 'state.aidrpg.time.elapsed' },
      { type: 'lastReturnContainsAny', expected: ['Day', 'Hour', 'Elapsed', 'Contradiction'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Debug time command should expose current day/hour/minute and contradiction state for tester visibility.', expectedOutcome: 'A stable time structure and readable /time output should exist.', patchHint: 'Inspect TimeTravelSystem.init and AdminDebugSystem.formatTime.', severity: 'High' }),

    base('Time: thirty-minute confirmed travel advances elapsed time once', 'time', [
      { hook: 'input', text: 'I travel from the market gate to the ruined chapel.' },
      { hook: 'output', text: 'The road from the market gate to the ruined chapel takes thirty minutes.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberBetween', path: 'state.aidrpg.time.elapsed.totalHours', min: 0.45, max: 0.75 },
      { type: 'lastReturnContainsAny', expected: ['Elapsed Hours', '0.5', '0.50', '30'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Confirmed AI output saying travel took thirty minutes should advance elapsed time by about 0.5 hours.', expectedOutcome: 'Elapsed time increases once; debug time reflects the advance.', whyItMatters: 'If time does not advance from actual narration, travel/rest timelines drift and later context becomes unreliable.', patchHint: 'Inspect TimeTravelSystem.processOutput duration extraction and apply-time-advance logic.', severity: 'High' }),

    base('Time: duplicate thirty-minute output must not double-advance time', 'time', [
      { hook: 'input', text: 'I travel to the ruined chapel.' },
      { hook: 'output', text: 'The road to the ruined chapel takes thirty minutes.' },
      { hook: 'output', text: 'The road to the ruined chapel takes thirty minutes.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberBetween', path: 'state.aidrpg.time.elapsed.totalHours', min: 0.45, max: 0.75 },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.time.contradictionFlags', expected: 2 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Repeated/retried identical output should not apply the same travel duration twice.', expectedOutcome: 'Elapsed time remains about thirty minutes, not one hour.', whyItMatters: 'AI Dungeon retries and erase/continue can replay output. Time systems need idempotency.', patchHint: 'Inspect TurnEngine duplicate output hashing and TimeTravelSystem idempotency keys.', severity: 'High' }),

    base('Time: three-hour wait advances clock coherently', 'time', [
      { hook: 'input', text: 'I wait at the shrine until the storm weakens.' },
      { hook: 'output', text: 'Three hours pass before the storm weakens enough to move safely.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberBetween', path: 'state.aidrpg.time.elapsed.totalHours', min: 2.75, max: 3.25 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Common AI phrasing such as three hours pass should advance elapsed time coherently.', patchHint: 'Inspect duration phrase parser for numeric words and hour units.', severity: 'High' }),

    base('Time: overnight rest advances day or significant elapsed time', 'time', [
      { hook: 'input', text: 'I make camp and rest overnight.' },
      { hook: 'output', text: 'You sleep through the night and wake at dawn the next day.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberAtLeast', path: 'state.aidrpg.time.elapsed.totalHours', expected: 6 },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.time', expected: ['dawn','next day','day'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Overnight rest should not be treated like a zero-time action.', patchHint: 'Inspect rest-duration parsing and day rollover handling.', severity: 'High' }),

    base('Time: vague moments later should not create a giant jump', 'time', [
      { hook: 'input', text: 'I wait for Mira to answer.' },
      { hook: 'output', text: 'A few tense moments later, Mira finally answers.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberAtMost', path: 'state.aidrpg.time.elapsed.totalHours', expected: 0.25 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_WARNING', intendedFunction: 'Small vague time phrases should remain small or be ignored, not converted into hours/days.', patchHint: 'Inspect vague duration mapping and soft-fail behavior.', severity: 'Medium' }),

    base('Time: earlier today should not move current clock backward destructively', 'time', [
      { hook: 'input', text: 'I ask when the guard vanished.' },
      { hook: 'output', text: 'The witness says the guard vanished earlier today, before the bells rang.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberAtLeast', path: 'state.aidrpg.time.current.day', expected: 1 },
      { type: 'numberAtLeast', path: 'state.aidrpg.time.current.hour', expected: 0 },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.time.contradictionFlags', expected: 3 },
      { type: 'noRuntimeErrors' }
    ], { initialState: { aidrpg: { time: { current: { day: 3, hour: 16, minute: 0 }, elapsed: { totalHours: 56 }, routes: { knownTravelTimes: {} }, contradictionFlags: [] } } }, expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_WARNING', intendedFunction: 'Relative past references should be logged/tentative, not necessarily rewinding the active clock.', patchHint: 'Inspect timeline event logging versus current-clock mutation.', severity: 'Medium' }),

    base('Time: impossible contradiction should be flagged, not silently accepted', 'time', [
      { hook: 'input', text: 'I check the time.' },
      { hook: 'output', text: 'The sun is rising at dawn. A heartbeat later, it is midnight three days ago.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.time', expected: ['contradiction','impossible','flag','timeline'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Contradictory AI output should be detected or fail-soft, not treated as clean time canon.', patchHint: 'Inspect contradiction detection and fail-soft time validation.', severity: 'High' }),

    base('Time: route duration memory should store meaningful route travel baseline', 'time', [
      { hook: 'input', text: 'I travel from Parada to the Stone Veil road marker.' },
      { hook: 'output', text: 'The route from Parada to the Stone Veil road marker takes two days by wagon.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.time.routes', expected: ['parada','stone','2'] },
      { type: 'numberAtLeast', path: 'state.aidrpg.time.elapsed.totalHours', expected: 24 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Known route durations should become route memory, not just one-off elapsed time.', patchHint: 'Inspect route key normalization and knownTravelTimes update logic.', severity: 'High' }),

    base('Time + Context: current time truth should be exposed after travel', 'time', [
      { hook: 'input', text: 'I travel to the ruined chapel.' },
      { hook: 'output', text: 'The walk to the ruined chapel takes forty-five minutes, and dusk is approaching.' },
      { hook: 'context', text: 'The player stands near the chapel gate.' }
    ], [
      { type: 'numberBetween', path: 'state.aidrpg.time.elapsed.totalHours', min: 0.65, max: 0.9 },
      { type: 'lastReturnContainsAny', expected: ['dusk','time','45','forty-five','chapel'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Time is not useful unless the next Context pass exposes compact current time truth to the AI.', patchHint: 'Inspect TimeTravelSystem context summary and ContextPacketSystem time packet priority.', severity: 'High' }),

    base('Time: rest intent in Input should create pending time intent without finalizing all consequences', 'time', [
      { hook: 'input', text: 'I rest for two hours but stay alert for danger.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.pending', expected: ['rest','two hours','2'] },
      { type: 'numberAtMost', path: 'state.aidrpg.time.elapsed.totalHours', expected: 0.1 },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'TimeTravelSystem', maturity: 'CURRENT_WARNING', intendedFunction: 'Input may record declared rest/travel intent, but actual time should generally finalize from Output confirmation.', patchHint: 'Inspect processInput pending time intent versus processOutput actual time advance.', severity: 'Medium' })
  ];
  return tests.slice(0, limit || tests.length);
}

function timeSceneWorldTests() {
  return [
    ...timeDeepTests(),
    base('Scene: heading toward chapel should not hard-arrive before output confirms arrival', 'scene', [{ hook: 'input', text: 'I head toward the old chapel.' }, { hook: 'output', text: 'You begin walking down the road toward the old chapel.' }], [
      { type: 'exists', path: 'state.aidrpg.world' },
      { type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene', expected: ['inside old chapel','chapel interior'] }
    ], { expectedSystem: 'SceneStateSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Test pending travel versus confirmed arrival.' }),
    base('Scene: arrival output should establish local scene truth', 'scene', [{ hook: 'input', text: 'I continue to the old chapel.' }, { hook: 'output', text: 'After the walk, you arrive at the old chapel gate. The cracked stone steps and sealed black door stand before you.' }, { hook: 'context', text: 'Continue at the chapel gate.' }], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world', expected: ['old chapel','chapel gate','black door','cracked stone'] },
      { type: 'lastReturnContainsAny', expected: ['chapel','gate','door','steps'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'SceneStateSystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Confirmed arrival should update immediate local truth and context exposure.', severity: 'High', patchHint: 'Inspect SceneStateSystem.processOutput, current scene refs, local hazards/exits, and ContextPacketSystem scene packet.' }),
    base('World: burned barricaded tavern should persist as mutable world/entity state', 'world', [{ hook: 'input', text: 'I look at the tavern.' }, { hook: 'output', text: 'The old tavern is burned, abandoned, and barricaded with cracked boards.' }], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg', expected: ['tavern','burned'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected: ['barricaded','abandoned','cracked boards'] }
    ], { expectedSystem: 'WorldEntitySystem', maturity: 'CURRENT_BLOCKER', severity: 'High', intendedFunction: 'Test mutable world state capture from AI Dungeon narration.' }),
    base('World: building ownership/layout/materials should not dissolve into vague text', 'world', [{ hook: 'input', text: 'I inspect the Ashglass Bar in the market district.' }, { hook: 'output', text: 'The Ashglass Bar is a two-story tavern of black glass and oak on the east side of the market district, owned by Talla Venn.' }], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.world', expected: ['Ashglass','tavern','market'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world', expected: ['two-story','black glass','oak','east','Talla'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'WorldEntitySystem', maturity: 'CURRENT_BLOCKER', intendedFunction: 'Important places need identity, materials, ownership, side/district, and layout detail preserved.', patchHint: 'Inspect WorldEntitySystem entity/building record extraction and identity/mutable split.', severity: 'High' })
  ];
}

function abilityTraitTests() {
  return [
    base('Ability: training preserves purpose, not just generic fire label', 'abilities', [{ hook: 'input', text: 'I train a defensive fire-control technique to redirect heat away from allies.' }, { hook: 'output', text: 'You practice shaping flame into a ward that redirects heat away from allies instead of launching it.' }], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.abilities', expected: ['fire','heat','allies'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['fireball'] }
    ], { expectedSystem: 'AbilitySystem', severity: 'High', intendedFunction: 'Test that ability meaning is preserved across freeform training, not flattened into the wrong generic skill.', patchHint: 'Inspect AbilitySystem discovery, origin context, intended function, aliases, and stable meaning.' }),
    base('Trait: cold mention should not create overpowered resistance', 'traits', [{ hook: 'input', text: 'The cave feels cold.' }, { hook: 'output', text: 'The cold air brushes your skin, but nothing major happens.' }], [
      { type: 'notAnyStringContains', path: 'state.aidrpg', expected: ['maxed cold resistance','immunity to cold','cold immunity'] }
    ], { expectedSystem: 'PersistentTraitSystem', intendedFunction: 'Test that weak environmental mentions do not create exaggerated permanent traits.' })
  ];
}

function contextTests() {
  return [
    base('Context: newly acquired key should appear in immediate context when relevant', 'context', [{ hook: 'input', text: 'I take the black sigil key.' }, { hook: 'output', text: 'You take the black sigil key.' }, { hook: 'context', text: 'The player stands before the sealed chapel door.' }], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'black sigil key' },
      { type: 'lastReturnContainsAny', expected: ['black sigil key','sigil key','key'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
    ], { expectedSystem: 'ContextPacketSystem', severity: 'High', intendedFunction: 'Test that important newly dirty inventory facts are visible to the AI on the next context pass.' }),
    base('Context: NPC relationship should be exposed after actor update', 'context', [{ hook: 'input', text: 'I help Mira stand.' }, { hook: 'output', text: 'Mira trusts you enough to follow, though she remains afraid of the chapel.' }, { hook: 'context', text: 'Mira is nearby.' }], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Mira','trust','afraid','follow'] },
      { type: 'lastReturnContainsAny', expected: ['Mira','trust','afraid','follow'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
    ], { expectedSystem: 'ContextPacketSystem', intendedFunction: 'Test actor-to-context exposure, not just actor state creation.' })
  ];
}

function validationTests() {
  return [
    base('Validation: vague rumor should not canonize town-wide curse disaster', 'validation', [{ hook: 'input', text: 'I listen to rumors.' }, { hook: 'output', text: 'Some villagers whisper that the town might be cursed, though nobody is certain.' }], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.world', expected: ['globalDisaster','confirmed town curse','certainly cursed'] },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.pending.validatedConsequences', expected: 10 }
    ], { expectedSystem: 'ValidationSystem', intendedFunction: 'Test that uncertainty remains uncertain and does not become hard canon.' }),
    base('Validation: impossible instant godlike growth should be rejected or softened', 'validation', [{ hook: 'input', text: 'I swing my sword once.' }, { hook: 'output', text: 'With one casual swing, you instantly become level 1600 and stronger than every god.' }], [
      { type: 'numberAtMost', path: 'state.aidrpg.player.levelState.level', expected: 50 },
      { type: 'notAnyStringContains', path: 'state.aidrpg', expected: ['stronger than every god'] }
    ], { expectedSystem: 'ValidationSystem', severity: 'High', intendedFunction: 'Test that scale-breaking AI output does not corrupt progression/state.' })
  ];
}

function integrationTests() {
  return [
    base('Integration: guard loot + injury + time + NPC + context', 'integration', [
      { hook: 'input', text: 'I search the dead guard, take his rusted iron key, bandage my wounded arm, and hurry toward the old chapel before sunset.' },
      { hook: 'output', text: 'You find a rusted iron key in the guard\'s pouch. Your arm still aches, but the bandage slows the bleeding. The road to the chapel takes thirty minutes. Mira follows, clearly uneasy.' },
      { hook: 'context', text: 'The player approaches the old chapel before sunset.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'rusted iron key' },
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected: ['Mira','uneasy','thirty','chapel','wounded','bandage'] },
      { type: 'lastReturnContainsAny', expected: ['key','Mira','chapel','wound','bandage','thirty'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
      { type: 'noInternalIdLeak', path: 'lastReturn.text' }
    ], { expectedSystem: 'Unknown / Cross-System', severity: 'High', intendedFunction: 'Full AI Dungeon-style turn: one input and one model output should update inventory, player condition, time/scene, NPC state, and immediate context.', patchHint: 'Use state diffs to find the first missing link: item capture, player injury, time parsing, actor parsing, or context exposure.' }),
    base('Integration: merchant purchase should affect actor, item, currency, and inventory display', 'integration', [
      { hook: 'input', text: 'I buy the cracked bronze shield from Talla for two silver.' },
      { hook: 'output', text: 'Talla accepts two silver coins and hands you the cracked bronze shield, smiling at the fair trade.' },
      { hook: 'input', text: '/inventory', captureDebug: true },
      { hook: 'context', text: 'The market remains busy around Talla\'s stall.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'cracked bronze shield' },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Talla','trade','merchant','smiling'] },
      { type: 'notContainsText', path: 'lastReturn.text', expected: 'undefined' },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
    ], { expectedSystem: 'Unknown / Cross-System', intendedFunction: 'Test merchant transaction across inventory, currency/ownership, actor relation, debug display, and context.' })
  ];
}

function simulationTests(limit) {
  const flows = [
    base('Simulation: chapel key puzzle path', 'simulation', [
      { hook: 'input', text: 'I question Mira about the chapel door.' },
      { hook: 'output', text: 'Mira says the chapel door only opens for the black sigil key, then points toward the dead guard.' },
      { hook: 'input', text: 'I search the dead guard and take the black sigil key, not the iron keyring.' },
      { hook: 'output', text: 'You find the black sigil key in the guard\'s pouch and leave the iron keyring behind.' },
      { hook: 'input', text: 'I unlock the chapel door with the black sigil key.' },
      { hook: 'output', text: 'The black sigil key turns in the chapel lock, and the sealed door opens.' },
      { hook: 'context', text: 'The chapel door is open.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'black sigil key' },
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['iron keyring'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected: ['chapel','door','open','Mira'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
    ], { expectedSystem: 'Unknown / Cross-System', severity: 'High', intendedFunction: 'Multi-turn AI Dungeon-style puzzle simulation testing NPC clue, correct item selection, negation, door interaction, and context persistence.' }),
    base('Simulation: NPC injury and trust arc', 'simulation', [
      { hook: 'input', text: 'I help Seren after the bandit attack.' },
      { hook: 'output', text: 'Seren is wounded, bleeding from her side, but she survives because you press a bandage to the wound.' },
      { hook: 'input', text: 'I ask Seren to tell me who attacked her.' },
      { hook: 'output', text: 'Seren trusts you enough to whisper that Captain Dorne ordered the ambush.' },
      { hook: 'context', text: 'Seren is nearby and Captain Dorne controls the gate.' }
    ], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.actors', expected: ['Seren','wounded'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['trust','Captain Dorne','ambush'] },
      { type: 'lastReturnContainsAny', expected: ['Seren','wounded','trust','Captain Dorne'] }
    ], { expectedSystem: 'ActorProfileSystem', severity: 'High', intendedFunction: 'Multi-turn NPC memory simulation: condition + relationship + revealed information should persist and be available to context.' }),
    base('Simulation: hostile guard escalation', 'simulation', [
      { hook: 'input', text: 'I threaten Captain Dorne at the gate.' },
      { hook: 'output', text: 'Captain Dorne becomes hostile and orders the guards to bar the gate.' },
      { hook: 'input', text: 'I attack the nearest guard with my axe.' },
      { hook: 'output', text: 'The guard blocks clumsily, and your axe cuts his shoulder. Dorne shouts for reinforcements.' },
      { hook: 'context', text: 'The gate confrontation continues.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Captain Dorne','hostile','guard','reinforcements'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected: ['axe','shoulder','hostile','gate'] }
    ], { expectedSystem: 'Unknown / Cross-System', intendedFunction: 'Combat/NPC simulation testing hostility, actor updates, injury consequences, and context carry-forward.' })
  ];
  return flows.slice(0, limit || flows.length);
}


function aiDungeonRuntimeTests() {
  return [
    base('AI Dungeon runtime: hooks must never return stop true', 'aid-runtime', [
      { hook: 'input', text: 'I look around.' },
      { hook: 'context', text: 'The player is in a quiet room.' },
      { hook: 'output', text: 'The room remains quiet.' }
    ], [
      { type: 'validHookReturn' },
      { type: 'noStopTrue' },
      { type: 'maxHookRuntimeMs', max: 2000 },
      { type: 'stateSizeUnderBytes', limit: 750000 },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'Unknown / Cross-System',
      intendedFunction: 'AI Dungeon treats stop badly in Input/Context/Output for normal gameplay. The script should not rely on stop for ordinary logic.',
      expectedOutcome: 'Every hook should return normal { text } output, remain under timeout, and keep state size bounded.',
      patchHint: 'Inspect any command/intercept logic that returns stop or grows state/logs too aggressively.',
      severity: 'High'
    }),
    base('AI Dungeon runtime: Script Test style outputs must include state and storyCards without mutation explosions', 'aid-runtime', [
      { hook: 'input', text: 'I ask the innkeeper about rumors.' },
      { hook: 'output', text: 'The innkeeper mentions Mira, Captain Dorne, the burned tavern, and the sealed chapel door.' },
      { hook: 'context', text: 'The conversation continues inside the inn.' }
    ], [
      { type: 'validHookReturn' },
      { type: 'storyCardCountAtMost', max: 120 },
      { type: 'stateSizeUnderBytes', limit: 900000 },
      { type: 'maxHookRuntimeMs', max: 2000 },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'Unknown / Cross-System',
      intendedFunction: 'Stress the shape of what AI Dungeon Script Test reports: returned text, state, logs, and storyCards should remain bounded after a high-information output.',
      expectedOutcome: 'State may update, but it should not explode in size or create excessive cards from one output.',
      patchHint: 'Inspect card/entity creation thresholds, log caps, and candidate buffering.',
      severity: 'High'
    })
  ];
}

function contextPressureTests() {
  const longHistory = [];
  for (let i = 0; i < 24; i += 1) {
    longHistory.push({ type: i % 2 ? 'story' : 'do', text: `History ${i}: the player traveled, spoke with Mira, heard rumors of the chapel, and carried the black sigil key.`, rawText: `History ${i}` });
  }
  const longCards = [];
  for (let i = 0; i < 30; i += 1) {
    longCards.push({ id: `seed_card_${i}`, keys: `lore,key${i}`, value: `[Long lore card ${i}: This is deliberately verbose world information that should not crowd out immediate player truth.]`, type: 'system', title: `Lore ${i}`, description: 'pressure card' });
  }
  return [
    base('Context pressure: newly dirty inventory should survive crowded history/cards', 'context-pressure', [
      { hook: 'input', text: 'I take the black sigil key from the dead guard.' },
      { hook: 'output', text: 'You take the black sigil key and leave the iron keyring behind.' },
      { hook: 'context', text: 'The player stands before the sealed chapel door while old lore and many memories compete for context.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'black sigil key' },
      { type: 'lastReturnContainsAny', expected: ['black sigil key', 'sigil key', 'key'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
      { type: 'maxHookRuntimeMs', max: 2000 }
    ], {
      initialHistory: longHistory,
      initialStoryCards: longCards,
      expectedSystem: 'ContextPacketSystem',
      intendedFunction: 'AI Dungeon context assembly has limited space. Immediate current truth should survive context pressure better than older lore.',
      expectedOutcome: 'The key should be visible in script-generated context even when history/cards are crowded.',
      whyItMatters: 'If the key disappears from context, the live AI may forget the player can open the chapel door.',
      patchHint: 'Inspect ContextPacketSystem priority ordering, dirty inventory priority, packet size caps, and stale packet invalidation.',
      severity: 'High'
    }),
    base('Context pressure: actor relationship should survive crowded history/cards', 'context-pressure', [
      { hook: 'input', text: 'I help Mira escape the cultist and ask her to stay close.' },
      { hook: 'output', text: 'Mira trusts you now, but she remains frightened of Captain Dorne and agrees to follow at your side.' },
      { hook: 'context', text: 'Mira is beside the player as Captain Dorne approaches.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Mira','trust','frightened','follow','Captain Dorne'] },
      { type: 'lastReturnContainsAny', expected: ['Mira','trust','frightened','follow','Captain Dorne'] },
      { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
    ], {
      initialHistory: longHistory,
      initialStoryCards: longCards,
      expectedSystem: 'ContextPacketSystem',
      intendedFunction: 'Important NPC current-truth should be available to the AI even under crowded context.',
      expectedOutcome: 'Mira relationship/stance facts should be stored and exposed.',
      patchHint: 'Inspect ActorProfileSystem persistence and ContextPacketSystem actor packet priority.',
      severity: 'High'
    })
  ];
}

function storyCardStressTests() {
  return [
    base('Story Cards: exact duplicate-like card pressure should not cause card bloat during one turn', 'story-cards', [
      { hook: 'input', text: 'I inspect the burned tavern and ask Mira what changed.' },
      { hook: 'output', text: 'The burned tavern is still called The Copper Hart. Its roof is charred, the door is barricaded, and Mira says Captain Dorne ordered it sealed.' },
      { hook: 'context', text: 'The burned tavern is nearby.' }
    ], [
      { type: 'storyCardCountAtMost', max: 12 },
      { type: 'stateSizeUnderBytes', limit: 850000 },
      { type: 'noRuntimeErrors' }
    ], {
      initialStoryCards: [
        { id: 'card_tavern_1', keys: 'tavern,Copper Hart,burned tavern', value: '[The Copper Hart is a tavern.]', title: 'The Copper Hart', type: 'Location' },
        { id: 'card_tavern_2', keys: 'tavern,Copper Hart,burned tavern', value: '[The Copper Hart is a tavern.]', title: 'The Copper Hart duplicate', type: 'Location' },
        { id: 'card_mira', keys: 'Mira,companion', value: '[Mira is a cautious guide.]', title: 'Mira', type: 'NPC' }
      ],
      expectedSystem: 'CardSyncSystem',
      intendedFunction: 'AI Dungeon Story Cards can bloat context when duplicates and near-duplicates build up. The script should not worsen duplicate pressure in one output.',
      expectedOutcome: 'The system should avoid runaway story card creation/update attempts and preserve bounded state.',
      patchHint: 'Inspect card dedupe, card sync queues, singleton card identity, and safe card update wrappers.',
      severity: 'Medium'
    }),
    base('Story Cards: immediate scene truth should not depend only on Story Card matching', 'story-cards', [
      { hook: 'input', text: 'I kick the rotten bridge until part of it collapses.' },
      { hook: 'output', text: 'A section of the rotten bridge collapses into the ravine, leaving only a narrow cracked beam across.' },
      { hook: 'context', text: 'The player is at the ravine bridge.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world', expected: ['bridge','collapses','collapsed','cracked beam','ravine'] },
      { type: 'lastReturnContainsAny', expected: ['bridge','collapsed','cracked','ravine'] }
    ], {
      initialStoryCards: [{ id: 'bridge_card', keys: 'bridge,ravine', value: '[The ravine bridge was once old but passable.]', title: 'Ravine Bridge', type: 'Location' }],
      expectedSystem: 'WorldEntitySystem',
      intendedFunction: 'Current scene truth must be carried by state/context immediately, not only by a possibly stale Story Card trigger.',
      expectedOutcome: 'The bridge collapse should be stored in world/scene state and included in context.',
      patchHint: 'Inspect WorldEntitySystem mutable state capture and ContextPacketSystem scene packet.',
      severity: 'High'
    })
  ];
}

function npcDeepPhrasingTests(limit) {
  const actors = [
    { name: 'Mira', role: 'guide', states: ['trusts you','uneasy','follows you'], output: 'Mira exhales shakily, says she trusts you now, and follows close behind though the chapel still makes her uneasy.' },
    { name: 'Captain Dorne', role: 'guard captain', states: ['hostile','orders guards','bars gate'], output: 'Captain Dorne turns hostile, orders the guards to bar the gate, and calls you a threat to the city.' },
    { name: 'Seren', role: 'wounded scout', states: ['wounded','bleeding','trusts you'], output: 'Seren is wounded and bleeding, but after you bind her side she trusts you enough to reveal the ambush route.' },
    { name: 'Talla', role: 'merchant', states: ['merchant','fair trade','warms to you'], output: 'Talla the merchant accepts the fair trade, smiles, and warms to you after the exchange.' },
    { name: 'Veyra', role: 'cult informant', states: ['betrays you','cult','fearful'], output: 'Veyra looks fearful, then betrays you by signaling the chapel cultists from the alley.' }
  ];
  const phrasings = [
    n => `I ask ${n} for help and watch how they react.`,
    n => `I check on ${n} after the fight.`,
    n => `I speak quietly to ${n} near the chapel.`,
    n => `I study ${n}'s stance before deciding what to do.`,
    n => `I try to calm ${n} and learn where they stand.`
  ];
  const tests = [];
  for (const actor of actors) {
    for (const phrase of phrasings) {
      tests.push(base(`NPC deep phrasing: ${actor.name} / ${phrase(actor.name).slice(0, 38)}`, 'npc-deep', [
        { hook: 'input', text: phrase(actor.name) },
        { hook: 'output', text: actor.output },
        { hook: 'context', text: `${actor.name} remains relevant in the current scene.` }
      ], [
        { type: 'anyStringContains', path: 'state.aidrpg.actors', expected: actor.name },
        { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: actor.states },
        { type: 'lastReturnContainsAny', expected: [actor.name, ...actor.states] },
        { type: 'objectKeyCountAtMost', path: 'state.aidrpg.actors.byId', max: 20 },
        { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
      ], {
        expectedSystem: 'ActorProfileSystem',
        intendedFunction: 'Stress NPC persistence across varied player phrasing and AI output wording: important actors need identity, role/condition, stance, and context exposure.',
        expectedOutcome: `${actor.name} should persist with at least one meaningful state: ${actor.states.join(', ')}.`,
        whyItMatters: 'NPCs are a major AI Dungeon failure point: if relationships and conditions do not persist, freeform scenes lose continuity quickly.',
        patchHint: 'Inspect ActorProfileSystem name extraction, importance threshold, relationship/condition parser, and ContextPacketSystem actor packet.',
        severity: 'High'
      }));
      if (tests.length >= (limit || 99999)) return tests;
    }
  }
  return tests;
}

function modelStyleOutputTests(limit) {
  const cases = [
    {
      name: 'Narrative implication: item granted without explicit take verb',
      input: 'I accept the reward without making a scene.',
      output: 'The grateful widow slips a worn brass locket into your palm before disappearing into the rain.',
      expected: ['worn brass locket'],
      path: 'state.aidrpg.items',
      system: 'InventorySystem',
      hint: 'Many AI Dungeon outputs imply possession without saying “you take”. Story-granted item capture should handle this.'
    },
    {
      name: 'Dialogue implication: NPC attitude changes through speech',
      input: 'I apologize to Mira and admit I was wrong.',
      output: '“Maybe I misjudged you,” Mira says, her voice softening. She no longer keeps her hand on her knife.',
      expected: ['Mira','softening','misjudged','knife'],
      path: 'state.aidrpg.actors',
      system: 'ActorProfileSystem',
      hint: 'Relationship changes may be implied through dialogue and body language, not explicit “trust +1” wording.'
    },
    {
      name: 'Negative outcome: failed attempt should not create success state',
      input: 'I try to force the chapel door open without the key.',
      output: 'The chapel door refuses to budge. Without the black sigil key, the lock will not turn.',
      expected: ['door','refuses','black sigil key'],
      path: 'state.aidrpg',
      system: 'ValidationSystem',
      hint: 'Failed attempts should not be stored as success. The system should preserve the lock requirement or failure state, not mark the door open.'
    },
    {
      name: 'Ambiguous model prose: possible curse should stay tentative',
      input: 'I listen to the drunk miners gossip.',
      output: 'They say the mine might be cursed, or maybe it is only bad air and old fear talking.',
      expected: ['mine'],
      path: 'state.aidrpg',
      system: 'ValidationSystem',
      hint: 'AI Dungeon often hedges. Tentative information should not become hard canon too early.'
    }
  ];
  return cases.slice(0, limit || cases.length).map((c, i) => base(`Model-style output ${i + 1}: ${c.name}`, 'model-style', [
    { hook: 'input', text: c.input },
    { hook: 'output', text: c.output },
    { hook: 'context', text: 'Continue the scene while preserving current truth.' }
  ], [
    { type: 'anyStringContainsAny', path: c.path, expected: c.expected },
    { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 },
    { type: 'noRuntimeErrors' }
  ], {
    expectedSystem: c.system,
    intendedFunction: c.hint,
    expectedOutcome: `The script should interpret the AI Dungeon-style prose without over-saving or missing the intended state.`,
    patchHint: `Inspect ${c.system} parsing of implicit/negative/ambiguous model output.`,
    severity: 'High'
  }));
}

function getGeneratedTests(suite = 'full', options = {}) {
  const limit = options.limit || null;
  if (suite === 'smoke') return smokeTests().slice(0, limit || 99999);
  if (suite === 'core') return coreTests().slice(0, limit || 99999);
  if (suite === 'aid-runtime') return aiDungeonRuntimeTests().slice(0, limit || 99999);
  if (suite === 'context-pressure') return contextPressureTests().slice(0, limit || 99999);
  if (suite === 'story-cards') return storyCardStressTests().slice(0, limit || 99999);
  if (suite === 'model-style') return modelStyleOutputTests(limit || 99999);
  if (suite === 'action-modes' || suite === 'mode-semantics') return getActionModeSemanticsTests(limit || 99999);
  if (suite === 'intent') return intentTests(limit);
  if (suite === 'player') return playerTests().slice(0, limit || 99999);
  if (suite === 'inventory') return [...inventoryTests(limit || 80), ...storyGrantedItemTests(limit ? Math.max(1, Math.floor(limit / 10)) : 5)].slice(0, limit || 99999);
  if (suite === 'story-items') return storyGrantedItemTests(limit);
  if (suite === 'npc' || suite === 'actors') return npcTests(limit || 100);
  if (suite === 'npc-deep') return npcDeepPhrasingTests(limit || 100);
  if (suite === 'time') return timeSceneWorldTests().filter(t => t.suite === 'time').slice(0, limit || 99999);
  if (suite === 'scene') return timeSceneWorldTests().filter(t => t.suite === 'scene').slice(0, limit || 99999);
  if (suite === 'world') return timeSceneWorldTests().filter(t => t.suite === 'world').slice(0, limit || 99999);
  if (suite === 'abilities') return abilityTraitTests().filter(t => t.suite === 'abilities').slice(0, limit || 99999);
  if (suite === 'traits') return abilityTraitTests().filter(t => t.suite === 'traits').slice(0, limit || 99999);
  if (suite === 'context') return contextTests().slice(0, limit || 99999);
  if (suite === 'validation') return validationTests().slice(0, limit || 99999);
  if (suite === 'integration') return integrationTests().slice(0, limit || 99999);
  if (suite === 'simulation') return simulationTests(limit || 99999);
  const all = [
    ...smokeTests(),
    ...coreTests(),
    ...aiDungeonRuntimeTests(),
    ...intentTests(),
    ...playerTests(),
    ...inventoryTests(48),
    ...storyGrantedItemTests(),
    ...timeSceneWorldTests(),
    ...abilityTraitTests(),
    ...contextTests(),
    ...contextPressureTests(),
    ...storyCardStressTests(),
    ...getActionModeSemanticsTests(),
    ...npcTests(),
    ...npcDeepPhrasingTests(25),
    ...modelStyleOutputTests(),
    ...validationTests(),
    ...integrationTests(),
    ...simulationTests()
  ];
  if (suite === 'deep' || suite === 'full' || suite === 'all') return all.slice(0, limit || all.length);
  return all.slice(0, limit || all.length);
}

module.exports = { getGeneratedTests };
