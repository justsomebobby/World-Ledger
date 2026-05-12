function base(name, suite, steps, assertions, extra = {}) {
  return Object.assign({
    name,
    suite,
    steps,
    assertions,
    initialState: {},
    initialInfo: { actionCount: 0, maxChars: 12000 },
    initialHistory: [],
    initialStoryCards: [],
    initialMemory: {},
    description: '',
    intendedFunction: '',
    expectedOutcome: '',
    whyItMatters: '',
    patchHint: '',
    severity: 'High',
    maturity: 'FINAL_PRODUCT_EXPECTATION'
  }, extra);
}

function dirtyShape() {
  return { player: false, abilities: [], items: [], actors: [], entities: [], routes: [], reputation: false, quests: false, time: false };
}

function seededAbilities() {
  const abilities = { byId: {}, byKey: {}, allIds: [], skillIds: [], talentIds: [], passiveIds: [], recentEvents: [] };
  function addSkill(id, name, tags, intended) {
    abilities.byId[id] = {
      identity: { id, name, type: 'skill' },
      keys: { normalizedName: id.replace(/^skill_/, ''), aliases: [], keyPhrases: [name] },
      meaning: { originContext: 'Seeded known dungeon-test ability.', originSignature: 'dungeon_seed_' + id, intendedFunction: intended, stableMeaningFlags: ['explicit_input', 'structured_record'], emergentApplications: [] },
      progression: { tier: 1, xp: 0, useCount: 0, trainingCount: 1, masteryState: 'novice', lastConfirmedTurn: 0, lastUsedTurn: 0, lastTrainedTurn: 0 },
      observation: { confidence: 0.8, lastEvidence: '', notes: [], observedFunctions: [], semanticTags: tags },
      source: { firstSeenTurn: 0, sourceIntentType: 'train', sourceTags: [] }
    };
    abilities.byKey[id.replace(/^skill_/, '')] = id;
    abilities.allIds.push(id);
    abilities.skillIds.push(id);
  }
  addSkill('skill_ember_ward', 'Ember Ward', ['fire', 'defense', 'heat'], 'defensive heat redirection and ally protection');
  addSkill('skill_frost_step', 'Frost Step', ['ice', 'movement'], 'controlled movement over slick surfaces');
  addSkill('skill_stoneguard', 'Stoneguard', ['earth', 'defense'], 'brace against impact and protect allies');
  return { abilities };
}

function baseState() {
  return {
    aidrpg: {
      meta: { version: 1, currentTurn: 0, currentHook: '', mode: 'normal', seed: 0, lastAppliedOutputHash: '', debug: false, dirty: dirtyShape() },
      player: { id: 'player', name: 'Kael', species: 'human', sceneRef: 'scene_entry_hall', locationRef: 'location_old_barrow' },
      build: {},
      abilities: seededAbilities().abilities,
      items: {
        byId: {
          ration_pack: { id: 'ration_pack', displayName: 'Ration Pack', baseType: 'food', condition: { state: 'intact' }, tags: ['food'] },
          minor_healing_vial: { id: 'minor_healing_vial', displayName: 'Minor Healing Vial', baseType: 'potion', condition: { state: 'sealed' }, tags: ['healing'] }
        },
        ownership: { player: ['ration_pack', 'minor_healing_vial'], scene: [], storage: [] },
        equipment: {},
        currency: { byType: { copper: 4, silver: 0, gold: 0 } }
      },
      actors: {
        byId: {
          mira: { id: 'mira', identity: { displayName: 'Mira', role: 'companion healer' }, relationship: { stance: 'ally' }, condition: { tags: ['alert'] }, currentSceneRef: 'scene_entry_hall' },
          bram: { id: 'bram', identity: { displayName: 'Bram', role: 'shield bearer' }, relationship: { stance: 'ally' }, condition: { tags: ['steady'] }, currentSceneRef: 'scene_entry_hall' }
        },
        byName: { mira: 'mira', bram: 'bram' },
        importantIds: ['mira', 'bram']
      },
      world: {
        currentScene: {
          sceneRef: 'scene_entry_hall', displayName: 'barrow entry hall', sceneType: 'dungeon_room', entityRef: 'entity_entry_hall', parentLocationRef: 'location_old_barrow', lastChangedTurn: 0,
          localEntityIds: [], localActorIds: ['mira', 'bram'], localHazards: [], localExits: ['north archway'], conditionTags: [], localEntitiesById: {}, localActorsById: {}, sceneConfidence: 3,
          sceneHintLabel: '', sceneHintStrength: 0, sceneHintTurn: 0, pendingSceneLabel: '', pendingSceneStrength: 0, pendingSceneCount: 0, pendingSceneTurn: 0
        },
        locationsById: { location_old_barrow: { identity: { displayName: 'Old Barrow', type: 'dungeon' } } },
        entitiesById: {}
      },
      time: { current: { day: 1, hour: 8, minute: 0, season: '', weather: '' }, elapsed: { totalHours: 8 }, routes: { knownTravelTimes: {} }, contradictionFlags: [] },
      reputation: {},
      quests: {},
      pending: {},
      cards: {},
      cache: {},
      logs: { recentEvents: [], recentParses: [], recentErrors: [], quarantine: [], migrationHistory: [] }
    }
  };
}

function dungeonContextCards() {
  return [
    { title: 'Old Barrow', keys: 'old barrow,dungeon,barrow', value: '[The Old Barrow is a three-chamber starter dungeon: entry hall, armory, and sealed sanctum. It should test scene, team, combat, healing, ability, XP, loot, and consequence persistence.]', type: 'location' },
    { title: 'Mira', keys: 'Mira,healer,companion', value: '[Mira is the party healer. She can bandage wounds, soothe poison, and react to danger. Relationship and condition should persist if important.]', type: 'actor' },
    { title: 'Bram', keys: 'Bram,shield,companion', value: '[Bram is a shield-bearing ally who can block, be injured, or help protect the party.]', type: 'actor' }
  ];
}

function dungeonBaseExtra(extra = {}) {
  return Object.assign({
    initialState: baseState(),
    initialStoryCards: dungeonContextCards(),
    initialHistory: [
      { type: 'start', text: 'You and your companions Mira and Bram stand at the entrance of the Old Barrow.' }
    ]
  }, extra);
}

function assertNoFailure() {
  return [
    { type: 'noRuntimeErrors' },
    { type: 'validHookReturn' },
    { type: 'noStopTrue' },
    { type: 'stateSizeUnderBytes', limit: 750000 },
    { type: 'contextUnderBudget', path: 'lastReturn.text', limit: 12000 }
  ];
}

function dungeonFlowSmokeTests() {
  return [
    base('Dungeon simulation / full path A: clean three-chamber completion', 'dungeon-run', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I step into the barrow entry hall and ask Mira and Bram to stay alert.' },
      { hook: 'output', text: 'You step into the barrow entry hall. Mira watches the cracked walls while Bram raises his shield near the north archway.' },
      { hook: 'context', text: 'Continue the dungeon.' },
      { hook: 'input', text: 'I use Frost Step to cross the slick stones without triggering the old pressure plates.' },
      { hook: 'output', text: 'Frost Step carries you lightly over the slick stones. The pressure plates do not sink, and Mira notes the safe path.' },
      { hook: 'input', text: 'I enter the armory and fight the two skeletal guards with Bram covering Mira.' },
      { hook: 'output', text: 'Inside the ruined armory, two skeletal guards attack. Bram blocks one while your strike shatters the other. You gain combat experience and find a rusted iron key on the cracked weapon rack.' },
      { hook: 'input', text: 'I unlock the sanctum and use Ember Ward to protect Mira from the cult flame.' },
      { hook: 'output', text: 'The rusted iron key opens the sealed sanctum. Ember Ward bends the cult flame away from Mira and reinforces its defensive use. The bone warden collapses, and you gain experience for clearing the barrow.' },
      { hook: 'context', text: 'Summarize current dungeon truth.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world', expected: ['sanctum', 'armory', 'barrow'] },
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'rusted iron key' },
      { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: 'Ember Ward' },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: ['Frost Step', 'frost'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['xp', 'level', 'experience'] },
      { type: 'lastReturnContainsAny', expected: ['Rusted Iron Key', 'rusted iron key', 'Owned Items'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({
      expectedSystem: 'Integration / Full Dungeon Flow',
      intendedFunction: 'Run a fixed three-chamber dungeon path and verify scene, team, combat, known ability use, loot, XP/progression, context, and debug output can all survive together.',
      expectedOutcome: 'The script should finish a clean dungeon path with current scene truth, key loot, ability revisions, XP/progression evidence, and no broken debug output.',
      whyItMatters: 'This is the closest local proxy for a short real AI Dungeon playthrough without depending on the live model.',
      patchHint: 'Review the failed system cluster first. A failure here may be caused by SceneStateSystem, InventorySystem, AbilitySystem, ProgressionSystem, ActorProfileSystem, or ContextPacketSystem.'
    }))
  ];
}

function dungeonBranchTests() {
  return [
    base('Dungeon branch / trap avoided: no injury and no phantom status', 'dungeon-branches', [
      { hook: 'input', text: 'I warn the group and use Frost Step to cross the pressure plates carefully.' },
      { hook: 'output', text: 'You cross the pressure plates without triggering them. Mira and Bram follow your safe path, and no one is injured.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['bleeding', 'poisoned', 'broken leg', 'arm burn', 'exhausted'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.actors', expected: ['bleeding', 'poisoned', 'broken leg'] },
      { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: 'Frost Step' },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'ValidationSystem / PlayerSystem / ActorProfileSystem', intendedFunction: 'A clean avoidance branch should not invent injuries or statuses just because danger was nearby.', expectedOutcome: 'No player or party injury/status is saved; Frost Step use may update.', patchHint: 'Inspect false-positive consequence parsing if injuries/statuses appear.' })),

    base('Dungeon branch / minor injury: small cut persists but does not become catastrophic', 'dungeon-branches', [
      { hook: 'input', text: 'I slip while dodging the pressure plate darts.' },
      { hook: 'output', text: 'A dart grazes your forearm, leaving a shallow bleeding cut, but you remain able to fight.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['bleeding', 'forearm', 'cut', 'injury'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['dead', 'missing arm', 'severed', 'crippled'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'PlayerSystem / ValidationSystem', intendedFunction: 'Minor injury branch should save the injury/status without escalating it beyond the output.', expectedOutcome: 'Player has a minor injury/bleeding marker, not a fatal or severe body rewrite.', patchHint: 'Inspect consequence severity parsing and validation if this over- or under-saves.' })),

    base('Dungeon branch / major injury then ally healing: injury and healing both persist coherently', 'dungeon-branches', [
      { hook: 'input', text: 'I take the front line against the skeletal brute.' },
      { hook: 'output', text: 'The skeletal brute slams its mace into your ribs, leaving you badly bruised and gasping.' },
      { hook: 'input', text: 'I ask Mira to heal me while Bram holds the brute back.' },
      { hook: 'output', text: 'Mira presses glowing hands to your ribs. The worst pain eases, though the bruising remains tender. Bram keeps the brute away long enough for you to stand.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'context', text: 'Continue after the healing.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['rib', 'bruise', 'bruised', 'tender', 'injury'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Mira', 'healer', 'heal', 'Bram'] },
      { type: 'lastReturnContainsAny', expected: ['Mira', 'ribs', 'bruise', 'injury', 'healing'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'PlayerSystem / ActorProfileSystem / ContextPacketSystem', intendedFunction: 'Major injury followed by ally healing should update both player condition and relevant companion state/context.', expectedOutcome: 'Injury is softened/healed but not erased into contradiction; Mira/Bram remain relevant actors.', patchHint: 'Inspect player injury validation, healing consequence handling, actor contribution capture, and context exposure.' })),

    base('Dungeon branch / poison then cure: status should apply and then revise', 'dungeon-branches', [
      { hook: 'input', text: 'I open the green-sealed chest.' },
      { hook: 'output', text: 'A thin needle pricks your thumb. Numbing poison spreads through your hand.' },
      { hook: 'input', text: 'I drink the minor healing vial and let Mira treat the poison.' },
      { hook: 'output', text: 'The minor healing vial dulls the poison, and Mira binds your thumb with an herb paste. You are still weak, but the poison is no longer spreading.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['poison', 'weak', 'thumb', 'condition'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.items', expected: ['minor healing vial', 'healing vial', 'vial'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['dead', 'permanent poison death'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'PersistentTraitSystem / InventorySystem / PlayerSystem', intendedFunction: 'Poison and healing should create/revise status and consume/use relevant healing item without catastrophic interpretation.', expectedOutcome: 'Poison/weakness is represented; healing item use is recognized; no fatal over-save.', patchHint: 'Inspect status validation, item consumption, and healing-output parsing.' }))
  ];
}

function dungeonAbilityPathTests() {
  return [
    base('Dungeon ability / known skill adapted defensively in combat', 'dungeon-ability', [
      { hook: 'input', text: 'I use Ember Ward differently, shaping it into a low dome around the team instead of a wall.' },
      { hook: 'output', text: 'Ember Ward bends into a low dome around you, Mira, and Bram. It still redirects heat, but now protects the whole team from the cult flame.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.abilities.byId.skill_ember_ward', expected: ['Ember Ward', 'team'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['skill_low_dome', 'Low Dome'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'AbilitySystem', intendedFunction: 'Known ability modification should revise/extend the known ability instead of creating a random unrelated skill.', expectedOutcome: 'Ember Ward records team/dome defensive application; no duplicate unrelated skill record.', patchHint: 'Inspect ability revision and emergent application capture.' })),

    base('Dungeon ability / explicit training can create a new technique when player drives it', 'dungeon-ability', [
      { hook: 'input', text: 'I practice a new shield-step technique with Bram, timing my Frost Step beside his guard.' },
      { hook: 'output', text: 'After repeated practice with Bram, the shield-step technique begins to work: Frost Step carries you into position just as Bram raises his shield.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: ['shield-step', 'shield step', 'Frost Step'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Bram'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'AbilitySystem / ActorProfileSystem', intendedFunction: 'Explicit player-driven training with a companion should be allowed to create or update structured ability meaning.', expectedOutcome: 'A technique or Frost Step application is saved with Bram/contextual meaning.', patchHint: 'Inspect explicit training detection, ability candidate confirmation, and companion co-training signal capture.' })),

    base('Dungeon ability / output-only new skill hallucination stays blocked', 'dungeon-ability', [
      { hook: 'input', text: 'I swing my normal sword at the bone warden.' },
      { hook: 'output', text: 'Your sword clangs against bone. You suddenly learned Starfall Execution, a legendary sword skill, even though you did not train it.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Starfall Execution', 'starfall'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'AbilitySystem / ValidationSystem', intendedFunction: 'AI Dungeon model hallucinations about sudden skill learning should not hard-save new abilities without player-driven use/training or validation.', expectedOutcome: 'Starfall Execution is not added as a new ability.', patchHint: 'Inspect output-only ability gating if this fails.' })),

    base('Dungeon ability / similar ability names do not cross-update', 'dungeon-ability', [
      { hook: 'input', text: 'I use Ember Ward, not Ember Blade, to shield Mira from the flame.' },
      { hook: 'output', text: 'Ember Ward curves around Mira and redirects the heat. Ember Blade is not involved.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: 'Ember Ward' },
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Ember Blade'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'AbilitySystem', intendedFunction: 'Similar-name ability confusion should not update/create the wrong skill.', expectedOutcome: 'Only Ember Ward is affected; Ember Blade is not created or revised.', patchHint: 'Inspect ability name matching, negation handling, and candidate scoring.' }))
  ];
}

function dungeonCombatOutcomeTests() {
  return [
    base('Dungeon combat / victory grants proportional XP and loot without over-reward', 'dungeon-combat', [
      { hook: 'input', text: 'I fight the two skeletal guards with Stoneguard and a careful sword strike.' },
      { hook: 'output', text: 'Stoneguard absorbs the first blow. You shatter one skeletal guard and Bram helps finish the second. You gain modest combat experience and collect two silver coins from the armory floor.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['xp', 'level', 'experience'] },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.items', expected: ['silver', 'coin'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['level 100', 'godlike', 'mythic'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'ProgressionSystem / InventorySystem / AbilitySystem', intendedFunction: 'Combat outcome should grant proportional XP and loot without absurd advancement.', expectedOutcome: 'Modest XP/progression evidence and two silver coins are tracked; no huge level jump.', patchHint: 'Inspect progression reward parsing, anti-farm/balance guards, currency capture, and ability use capture.' })),

    base('Dungeon combat / failed attack should not grant victory XP or loot', 'dungeon-combat', [
      { hook: 'input', text: 'I rush the bone warden without a plan.' },
      { hook: 'output', text: 'Your strike glances off the bone warden. You do not defeat it, and the sanctum remains dangerous.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['warden core', 'boss loot', 'sanctum treasure'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['cleared barrow', 'massive experience', 'level up'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'ValidationSystem / ProgressionSystem / InventorySystem', intendedFunction: 'Negative combat result should not falsely save victory, boss loot, or clear rewards.', expectedOutcome: 'No victory loot or big XP is granted from failed attack output.', patchHint: 'Inspect victory/loot/XP validation gating.' })),

    base('Dungeon combat / retry same victory output does not double XP, currency, status, or loot', 'dungeon-combat', [
      { hook: 'input', text: 'I finish the skeletal guard and collect the reward.' },
      { hook: 'output', text: 'You defeat the skeletal guard, gain modest experience, and collect three silver coins.' },
      { hook: 'output', text: 'You defeat the skeletal guard, gain modest experience, and collect three silver coins.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.items', expectedText: 'silver', max: 12 },
      { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.logs', expectedText: 'experience', max: 12 },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'TurnEngine / OperationGuard / InventorySystem / ProgressionSystem', intendedFunction: 'Retried or duplicate AI Dungeon output should not double-commit XP, currency, loot, or status effects.', expectedOutcome: 'The second identical output is detected as duplicate/no-op for protected commits.', patchHint: 'Inspect OperationGuard keys for item/currency/progression commits and duplicate output hashing.' }))
  ];
}

function dungeonContextPressureTests() {
  const clutterHistory = [];
  for (let i = 0; i < 24; i += 1) {
    clutterHistory.push({ type: i % 2 ? 'story' : 'do', text: 'Old barrow ambient detail ' + i + ': dust, stone, and distant water drops.' });
  }
  const clutterCards = dungeonContextCards().concat(Array.from({ length: 16 }, (_, i) => ({ title: 'Clutter Card ' + i, keys: 'clutter,dust,stone,' + i, value: '[Low-priority old context clutter card ' + i + '.]', type: 'note' })));

  return [
    base('Dungeon context pressure / newly relevant key, wound, ally, and scene survive clutter', 'dungeon-context-pressure', [
      { hook: 'input', text: 'I enter the sealed sanctum with Mira while holding the black sigil key.' },
      { hook: 'output', text: 'The black sigil key opens the sealed sanctum. Mira follows you inside, worried about the bleeding cut on your arm.' },
      { hook: 'context', text: 'Continue inside the sanctum under heavy context pressure.' }
    ], [
      { type: 'lastReturnContainsAny', expected: ['sanctum'] },
      { type: 'lastReturnContainsAny', expected: ['black sigil key', 'sigil key', 'key'] },
      { type: 'lastReturnContainsAny', expected: ['Mira'] },
      { type: 'lastReturnContainsAny', expected: ['bleeding', 'cut', 'arm'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ initialHistory: clutterHistory, initialStoryCards: clutterCards, expectedSystem: 'ContextPacketSystem', intendedFunction: 'Under cluttered AI Dungeon context conditions, newly important current truth should still be visible to the model.', expectedOutcome: 'Sanctum, key, Mira, and bleeding/cut information survive into context.', patchHint: 'Inspect dirty priority packet ordering, context budget trimming, scene/inventory/actor/player packet inclusion.' }))
  ];
}

function dungeonNegativeControls() {
  return [
    base('Dungeon negative control / teammate says item name but player does not receive item', 'dungeon-negative-controls', [
      { hook: 'input', text: 'I ask Mira what she sees.' },
      { hook: 'output', text: 'Mira whispers, "There is probably a sapphire relic in the sanctum, but we do not have it."' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['sapphire relic'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'InventorySystem / ValidationSystem', intendedFunction: 'Dialogue mentioning an item should not grant ownership.', expectedOutcome: 'No sapphire relic item is created/owned.', patchHint: 'Inspect quoted speech and mention-only item capture filters.' })),

    base('Dungeon negative control / ability speculation does not create skill', 'dungeon-negative-controls', [
      { hook: 'input', text: 'I ask Bram what technique might help.' },
      { hook: 'output', text: 'Bram says you could someday learn Iron Halo if you trained for months, but you do not know it now.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Iron Halo'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'AbilitySystem / ValidationSystem', intendedFunction: 'Speculative future ability dialogue should not create a current ability.', expectedOutcome: 'Iron Halo is not saved.', patchHint: 'Inspect ability speculation/future-tense filters.' })),

    base('Dungeon negative control / remembered injury does not become current injury', 'dungeon-negative-controls', [
      { hook: 'input', text: 'I think about earlier battles.' },
      { hook: 'output', text: 'You remember when your leg was broken years ago, but right now you are walking normally.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['broken leg'] },
      ...assertNoFailure()
    ], dungeonBaseExtra({ expectedSystem: 'PlayerSystem / ValidationSystem', intendedFunction: 'Past-memory injuries should not become current injuries.', expectedOutcome: 'No current broken leg is saved.', patchHint: 'Inspect temporal/past-tense injury filters.' }))
  ];
}

function getDungeonTests(suite = 'dungeon-run', options = {}) {
  let tests = [];
  if (suite === 'dungeon-run' || suite === 'dungeon-basic') tests = dungeonFlowSmokeTests();
  else if (suite === 'dungeon-branches') tests = dungeonBranchTests();
  else if (suite === 'dungeon-ability') tests = dungeonAbilityPathTests();
  else if (suite === 'dungeon-combat') tests = dungeonCombatOutcomeTests();
  else if (suite === 'dungeon-context-pressure') tests = dungeonContextPressureTests();
  else if (suite === 'dungeon-negative-controls') tests = dungeonNegativeControls();
  else if (suite === 'dungeon-full' || suite === 'dungeon' || suite === 'dungeon-simulation' || suite === 'standard-dungeon') {
    tests = [
      ...dungeonFlowSmokeTests(),
      ...dungeonBranchTests(),
      ...dungeonAbilityPathTests(),
      ...dungeonCombatOutcomeTests(),
      ...dungeonContextPressureTests(),
      ...dungeonNegativeControls()
    ];
  }
  return tests.slice(0, options.limit || tests.length);
}

module.exports = {
  getDungeonTests,
  dungeonFlowSmokeTests,
  dungeonBranchTests,
  dungeonAbilityPathTests,
  dungeonCombatOutcomeTests,
  dungeonContextPressureTests,
  dungeonNegativeControls
};
