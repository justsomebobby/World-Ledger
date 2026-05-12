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
    severity: 'High',
    maturity: 'CURRENT_BLOCKER'
  }, extra);
}

function confirmedMarketLaneState() {
  return {
    aidrpg: {
      meta: { version: 1, currentTurn: 0, currentHook: '', mode: 'normal', seed: 0, lastAppliedOutputHash: '', debug: false, dirty: { player: false, abilities: [], items: [], actors: [], entities: [], routes: [], reputation: false, quests: false, time: false } },
      world: {
        currentScene: {
          sceneRef: 'scene_market_lane', displayName: 'market lane', sceneType: 'street', entityRef: 'entity_market_lane', parentLocationRef: 'location_market_district', lastChangedTurn: 0,
          localEntityIds: [], localActorIds: [], localHazards: [], localExits: [], conditionTags: [], localEntitiesById: {}, localActorsById: {},
          sceneHintLabel: '', sceneHintStrength: 0, sceneHintTurn: 0, pendingSceneLabel: '', pendingSceneStrength: 0, pendingSceneCount: 0, pendingSceneTurn: 0, sceneConfidence: 3
        }
      },
      player: { sceneRef: 'scene_market_lane', locationRef: 'location_market_district' }
    }
  };
}

function seededEmberWardState() {
  const id = 'skill_ember_ward';
  return {
    aidrpg: {
      meta: { version: 1, currentTurn: 0, currentHook: '', mode: 'normal', seed: 0, lastAppliedOutputHash: '', debug: false, dirty: { player: false, abilities: [], items: [], actors: [], entities: [], routes: [], reputation: false, quests: false, time: false } },
      abilities: {
        byId: {
          [id]: {
            identity: { id, name: 'Ember Ward', type: 'skill' },
            keys: { normalizedName: 'ember_ward', aliases: [], keyPhrases: ['Ember Ward', 'ember_ward'] },
            meaning: { originContext: 'I trained Ember Ward to shield allies from heat.', originSignature: 'sig_seed_ember_ward', intendedFunction: 'defensive application', stableMeaningFlags: ['explicit_input', 'structured_record'], emergentApplications: [] },
            progression: { tier: 1, xp: 0, useCount: 0, trainingCount: 1, masteryState: 'novice', lastConfirmedTurn: 0, lastUsedTurn: 0, lastTrainedTurn: 0 },
            observation: { confidence: 0.8, lastEvidence: '', notes: [], observedFunctions: [], semanticTags: ['fire', 'defense'] },
            source: { firstSeenTurn: 0, sourceIntentType: 'train', sourceTags: [] }
          }
        },
        byKey: { ember_ward: id },
        allIds: [id], skillIds: [id], talentIds: [], passiveIds: [], recentEvents: []
      }
    }
  };
}

function seededAbilityState(name) {
  const key = String(name || 'Ember Ward').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const id = 'skill_' + key;
  return {
    aidrpg: {
      meta: { version: 1, currentTurn: 0, currentHook: '', mode: 'normal', seed: 0, lastAppliedOutputHash: '', debug: false, dirty: { player: false, abilities: [], items: [], actors: [], entities: [], routes: [], reputation: false, quests: false, time: false } },
      abilities: {
        byId: {
          [id]: {
            identity: { id, name, type: 'skill' },
            keys: { normalizedName: key, aliases: [], keyPhrases: [name, key] },
            meaning: { originContext: 'Seeded known ability for regression testing.', originSignature: 'seed_' + key, intendedFunction: 'known ability', stableMeaningFlags: ['explicit_input', 'structured_record'], emergentApplications: [] },
            progression: { tier: 1, xp: 0, useCount: 0, trainingCount: 1, masteryState: 'novice', lastConfirmedTurn: 0, lastUsedTurn: 0, lastTrainedTurn: 0 },
            observation: { confidence: 0.8, lastEvidence: '', notes: [], observedFunctions: [], semanticTags: [] },
            source: { firstSeenTurn: 0, sourceIntentType: 'train', sourceTags: [] }
          }
        },
        byKey: { [key]: id },
        allIds: [id], skillIds: [id], talentIds: [], passiveIds: [], recentEvents: []
      }
    }
  };
}

function sceneRedlines() {
  return [
    base('Scene validation: strong entry confirms tavern quickly', 'scene-confirmation', [
      { hook: 'input', text: 'I enter the tavern and look around.' },
      { hook: 'output', text: 'You step into the tavern and look around. The common room smells of ale, rain, and old smoke.' },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.world.currentScene', expected: 'tavern' },
      { type: 'numberAtLeast', path: 'state.aidrpg.world.currentScene.sceneConfidence', expected: 3 },
      { type: 'lastReturnContainsAny', expected: ['tavern', 'common room', 'ale', 'smoke'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'SceneStateSystem', intendedFunction: 'Strong scene-entry language should confirm the new scene quickly because AI Dungeon output has clearly placed the player there.', expectedOutcome: 'The current scene should become tavern/common-room related and be exposed to context.', patchHint: 'Inspect SceneStateSystem.extractSceneCandidate/applySceneCandidate strong-pattern handling and ContextPacketSystem scene packet.' }),

    base('Scene validation: weak smithy mention does not replace confirmed lane scene', 'scene-confirmation', [
      { hook: 'input', text: 'I stay in the lane and look around.' },
      { hook: 'output', text: 'You glance toward the smithy while standing in the lane, but you do not go inside.' },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'equals', path: 'state.aidrpg.world.currentScene.displayName', expected: 'market lane' },
      { type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene.displayName', expected: ['smithy', 'forge'] },
      { type: 'lastReturnContainsAny', expected: ['market lane', 'lane'] },
      { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem', intendedFunction: 'Weak references to nearby places should not replace a previously confirmed current scene.', expectedOutcome: 'The scene remains market lane; smithy may be a hint/pending reference but should not become confirmed current scene.', patchHint: 'Inspect weak mention filtering, scene candidate strength, pendingScene handling, and confirmed-scene protection.' }),

    base('Scene validation: reinforced medium room mention confirms on second supporting turn', 'scene-confirmation', [
      { hook: 'input', text: 'I listen from where I am.' },
      { hook: 'output', text: 'The tavern common room is loud with rain-soaked patrons and clattering mugs.' },
      { hook: 'input', text: 'I keep watching the room.' },
      { hook: 'output', text: 'The common room smells of wet wool and ale while the hearth pops nearby.' },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene.displayName', expected: ['common room', 'tavern'] },
      { type: 'numberAtLeast', path: 'state.aidrpg.world.currentScene.sceneConfidence', expected: 2 },
      { type: 'lastReturnContainsAny', expected: ['common room', 'tavern', 'hearth', 'ale'] },
      { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem', intendedFunction: 'A medium-strength room/building implication may be tentative on the first turn, but a second reinforcing line about the same place should confirm it.', expectedOutcome: 'After the second reinforcing output, currentScene should confirm the common room/tavern area.', patchHint: 'Inspect pendingSceneLabel/pendingSceneCount/pendingSceneStrength and reinforced_presence confirmation.' })
  ];
}

function abilityRedlines() {
  return [
    base('Ability/status validation: known ability use revises existing record; raw learned-skill output does not create new ability', 'ability-status', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I channel Ember Ward around Mira.' },
      { hook: 'output', text: 'Ember Ward flickers around Mira and redirects the forge heat away from her, reinforcing its defensive use.' },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I look around the quiet room.' },
      { hook: 'output', text: 'The echoing lesson makes you feel like you learned a new skill called Moonblade, though you did not practice or use it.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'arrayIncludes', path: 'state.aidrpg.abilities.byId.skill_ember_ward.observation.observedFunctions', expected: 'defensive application' },
      { type: 'anyStringContainsAll', path: 'state.aidrpg.abilities.byId.skill_ember_ward', expected: ['Ember Ward', 'defensive'] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Moonblade', 'moonblade'] },
      { type: 'noRuntimeErrors' }
    ], { initialState: seededEmberWardState(), expectedSystem: 'AbilitySystem', intendedFunction: 'Known abilities should still update/revise from clear use evidence, while raw output-only “you learned X skill” should not hard-save a brand-new ability by itself.', expectedOutcome: 'Ember Ward receives observation/revision evidence; Moonblade is not created as a new ability from output alone.', patchHint: 'Inspect AbilitySystem.processInput/processOutput, extractRevisionCandidates, captureObservedUseSignals, and output-only ability discovery gating.' }),

    base('Ability/status validation: explicit input-driven training creates a structured ability record', 'ability-status', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I train Ember Ward.' },
      { hook: 'output', text: 'You train Ember Ward until the ward flickers steadily around your hand.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: 'Ember Ward' },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: ['trainingCount', 'lastTrainedTurn', 'trained technique'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem', intendedFunction: 'Explicit player input to train an ability should remain a valid canon path for ability creation/update.', expectedOutcome: 'Ember Ward becomes a structured ability record from explicit input-driven training plus confirming output.', patchHint: 'Inspect IntentParser train detection and AbilitySystem.extractInputCandidate/confirmCandidate.' }),

    base('Ability/status validation: explicit input-driven ability use creates or updates a structured ability record', 'ability-status', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I channel Ember Ward.' },
      { hook: 'output', text: 'Ember Ward flares in a defensive ring and pushes heat away from your skin.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: 'Ember Ward' },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: ['useCount', 'lastUsedTurn', 'defensive application'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem', intendedFunction: 'Explicit player input to use/channel an ability should remain a valid canon path for ability creation/update.', expectedOutcome: 'Ember Ward becomes or updates as a structured ability record from explicit ability use plus confirming output.', patchHint: 'Inspect IntentParser use_ability detection and AbilitySystem candidate confirmation.' }),

    base('Status validation: validated consequence still updates trait/status canon and sheet output', 'ability-status', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I handle the venomous thorn carefully.' },
      { hook: 'output', text: 'The thorn cuts your palm, leaving you bleeding and poisoned.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'arrayIncludes', path: 'state.aidrpg.player.conditions.active', expected: 'bleeding' },
      { type: 'arrayIncludes', path: 'state.aidrpg.player.conditions.active', expected: 'poisoned' },
      { type: 'lastReturnContainsAny', expected: ['bleeding', 'poisoned'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'ValidationSystem/PersistentTraitSystem/PlayerSystem', intendedFunction: 'Status/trait canon should still update when there is a validated consequence, even while raw output-only ability discovery is gated.', expectedOutcome: 'Bleeding and poisoned become active conditions and appear in /sheet.', patchHint: 'Inspect ConsequenceParser status_gain, ValidationSystem, PersistentTraitSystem, and PlayerSystem condition application.' }),

    base('Ability/status validation: raw output-only learned skill is ignored when not input-driven', 'ability-status', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: 'I look around the room without practicing anything.' },
      { hook: 'output', text: 'For a heartbeat you think you learned a new skill called Moonblade, but it is only a passing idea.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Moonblade', 'moonblade'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem', intendedFunction: 'Raw output-only “you learned X skill” wording should not hard-save a brand-new ability without explicit player use/training or a validated future path.', expectedOutcome: 'Moonblade is not created in abilities from this output alone.', patchHint: 'Inspect AbilitySystem output-only discovery gating and ensure extractOutputCandidates is not directly committing brand-new records.' })
  ];
}

function expandedSceneRedlines() {
  const tests = [...sceneRedlines()];
  const strongEntries = [
    { name: 'tavern common room', input: 'I go into the tavern.', output: 'You step into the tavern common room, where candles flicker over crowded tables.', expected: ['tavern', 'common room'] },
    { name: 'smithy forge', input: 'I enter the smithy.', output: 'You walk inside the smithy, heat rolling from the forge as hammers ring.', expected: ['smithy', 'forge'] },
    { name: 'ruined chapel', input: 'I push through the chapel doors.', output: 'You push through the ruined chapel doors and stand beneath the cracked altar windows.', expected: ['chapel'] },
    { name: 'cellar', input: 'I descend into the cellar.', output: 'You descend into the cellar, the air turning cold and damp around the stacked barrels.', expected: ['cellar'] },
    { name: 'guild hall', input: 'I enter the guild hall.', output: 'You enter the guild hall and find adventurers gathered beneath the quest board.', expected: ['guild hall', 'hall'] }
  ];
  for (const v of strongEntries) {
    tests.push(base('Scene expanded strong entry: ' + v.name, 'scene-expanded', [
      { hook: 'input', text: v.input },
      { hook: 'output', text: v.output },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene.displayName', expected: v.expected },
      { type: 'numberAtLeast', path: 'state.aidrpg.world.currentScene.sceneConfidence', expected: 3 },
      { type: 'lastReturnContainsAny', expected: v.expected },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'SceneStateSystem', intendedFunction: 'Strong entry variants should confirm scenes immediately.', expectedOutcome: 'Current scene matches the entered location/building/room.', patchHint: 'Strong scene entry extraction/confirmation.' }));
  }

  const weakMentions = [
    { place: 'smithy', output: 'You glance toward the smithy while standing in the lane, but you do not go inside.', forbidden: ['smithy', 'forge'] },
    { place: 'tavern', output: 'Music spills from the tavern across the street while you remain in the market lane.', forbidden: ['tavern'] },
    { place: 'chapel', output: 'The chapel bell rings somewhere uphill, distant and faint, as you wait in the lane.', forbidden: ['chapel'] },
    { place: 'bakery', output: 'The smell of bread drifts from the bakery nearby, but your boots stay planted in the lane.', forbidden: ['bakery'] },
    { place: 'guild hall', output: 'A guard points toward the guild hall and tells you it is two streets over.', forbidden: ['guild hall'] },
    { place: 'shrine', output: 'You remember the ruined shrine from the map, though you are still in the market lane.', forbidden: ['shrine'] }
  ];
  for (const v of weakMentions) {
    tests.push(base('Scene expanded weak mention does not replace lane: ' + v.place, 'scene-expanded', [
      { hook: 'input', text: 'I stay where I am and observe.' },
      { hook: 'output', text: v.output },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'equals', path: 'state.aidrpg.world.currentScene.displayName', expected: 'market lane' },
      { type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene.displayName', expected: v.forbidden },
      { type: 'lastReturnContainsAny', expected: ['market lane', 'lane'] },
      { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem', intendedFunction: 'Weak location mentions must not overwrite a confirmed scene.', expectedOutcome: 'Confirmed scene remains market lane.', patchHint: 'Weak mention filtering and candidate strength.' }));
  }

  const reinforced = [
    { label: 'tavern/common room', out1: 'The tavern common room is loud with rain-soaked patrons and clattering mugs.', out2: 'The common room smells of wet wool and ale while the hearth pops nearby.', expected: ['tavern', 'common room'] },
    { label: 'smithy/forge room', out1: 'The smithy interior glows orange as coals pulse beneath the forge.', out2: 'The forge room rings with hammer blows and the smell of hot iron.', expected: ['smithy', 'forge'] },
    { label: 'chapel nave', out1: 'The ruined chapel nave stretches ahead, its pews broken beneath dust.', out2: 'The nave is quiet except for rain tapping through the cracked chapel roof.', expected: ['chapel', 'nave'] },
    { label: 'cellar/barrel room', out1: 'The tavern cellar is lined with sweating barrels and low rafters.', out2: 'The barrel room smells of sour ale and cold stone.', expected: ['cellar', 'barrel'] },
    { label: 'guild hall/main hall', out1: 'The guild hall is crowded with mercenaries comparing notices near the board.', out2: 'The main hall buzzes with contracts, boots, and low voices.', expected: ['guild hall', 'main hall', 'hall'] },
    { label: 'apothecary/shop interior', out1: 'The apothecary shop is narrow and fragrant with dried herbs.', out2: 'The shop interior is crowded with glass jars and labeled tinctures.', expected: ['apothecary', 'shop'] }
  ];
  for (const v of reinforced) {
    tests.push(base('Scene expanded reinforced medium confirms: ' + v.label, 'scene-expanded', [
      { hook: 'input', text: 'I study my surroundings.' },
      { hook: 'output', text: v.out1 },
      { hook: 'input', text: 'I keep observing the place.' },
      { hook: 'output', text: v.out2 },
      { hook: 'context', text: 'Continue from the current scene.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene.displayName', expected: v.expected },
      { type: 'numberAtLeast', path: 'state.aidrpg.world.currentScene.sceneConfidence', expected: 2 },
      { type: 'lastReturnContainsAny', expected: v.expected },
      { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem', intendedFunction: 'Repeated compatible medium-strength place descriptions should confirm the scene.', expectedOutcome: 'Current scene updates from market lane to the reinforced room/building.', patchHint: 'Pending scene compatibility, count/strength accumulation, and cache invalidation.' }));
  }

  return tests;
}

function expandedAbilityRedlines() {
  const tests = [...abilityRedlines()];
  const knownUses = [
    { ability: 'Ember Ward', input: 'I channel Ember Ward around Mira.', output: 'Ember Ward redirects the forge heat away from Mira and reinforces its defensive use.', expected: ['Ember Ward', 'defensive'] },
    { ability: 'Frost Step', input: 'I use Frost Step to cross the icy stones.', output: 'Frost Step carries you lightly across the icy stones, improving its movement use.', expected: ['Frost Step', 'movement'] },
    { ability: 'Stoneguard', input: 'I brace with Stoneguard before the blow lands.', output: 'Stoneguard hardens your stance and reinforces its defensive guarding pattern.', expected: ['Stoneguard', 'defensive'] }
  ];
  for (const v of knownUses) {
    tests.push(base('Ability expanded known use revises existing record: ' + v.ability, 'ability-expanded', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: v.input },
      { hook: 'output', text: v.output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.abilities', expected: v.expected },
      { type: 'noRuntimeErrors' }
    ], { initialState: seededAbilityState(v.ability), expectedSystem: 'AbilitySystem', intendedFunction: 'Known ability use should revise/update existing ability state, not create unrelated or duplicate records.', expectedOutcome: 'Existing ability record remains present and gains/reinforces appropriate observed function evidence.', patchHint: 'Known ability resolution and revision.' }));
  }

  const explicitTrain = [
    { ability: 'Ember Ward', input: 'I train Ember Ward to protect allies from heat.', output: 'You train Ember Ward until the heat bends away from your allies.', expected: ['Ember Ward'] },
    { ability: 'Frost Step', input: 'I practice Frost Step by moving across slick stones.', output: 'You practice Frost Step until your steps become lighter on the ice.', expected: ['Frost Step'] },
    { ability: 'Stoneguard', input: 'I drill Stoneguard until my stance holds under impact.', output: 'You train Stoneguard, locking your footing against repeated blows.', expected: ['Stoneguard'] },
    { ability: 'Ashen Pulse', input: 'I practice Ashen Pulse with careful bursts from my palm.', output: 'You practice Ashen Pulse until the burst becomes controlled and repeatable.', expected: ['Ashen Pulse'] }
  ];
  for (const v of explicitTrain) {
    tests.push(base('Ability expanded explicit input training creates/updates: ' + v.ability, 'ability-expanded', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: v.input },
      { hook: 'output', text: v.output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: v.expected },
      { type: 'anyStringContainsAny', path: 'state.aidrpg.abilities', expected: ['trainingCount', 'lastTrainedTurn', 'sourceIntentType', 'train'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem', intendedFunction: 'Explicit input-driven training remains a valid creation/update path.', expectedOutcome: 'Ability appears as structured ability state with training/source evidence.', patchHint: 'Train intent detection and ability candidate confirmation.' }));
  }

  const outputOnlyFalse = [
    { skill: 'Moonblade', input: 'I look around without practicing.', output: 'You suddenly learned a new skill called Moonblade, though nothing in your actions explains it.' },
    { skill: 'Night Eye', input: 'I sit quietly and listen.', output: 'A voice says you have awakened the passive skill Night Eye, but you did not train or use it.' },
    { skill: 'Dragon Pulse', input: 'I read the faded sign.', output: 'The sign claims you mastered Dragon Pulse instantly.' },
    { skill: 'Soul Rend', input: 'I remember old rumors.', output: 'For a moment you imagine learning Soul Rend, but it is only a thought.' },
    { skill: 'Void Step', input: 'I do nothing with magic or movement.', output: 'The narration says you gained Void Step despite no practice, use, teacher, or trigger.' }
  ];
  for (const v of outputOnlyFalse) {
    tests.push(base('Ability expanded output-only learned skill blocked: ' + v.skill, 'ability-expanded', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: v.input },
      { hook: 'output', text: v.output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: [v.skill, v.skill.toLowerCase().replace(/\s+/g, '_'), v.skill.toLowerCase()] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem', intendedFunction: 'Raw output-only learned-skill text must not hard-save a new ability without input-driven or validated support.', expectedOutcome: v.skill + ' is not created.', patchHint: 'Output-only ability discovery gating.' }));
  }

  const statuses = [
    { label: 'bleeding and poisoned', input: 'I handle the venomous thorn carefully.', output: 'The thorn cuts your palm, leaving you bleeding and poisoned.', expected: ['bleeding', 'poisoned'] },
    { label: 'burned', input: 'I reach through the flame to grab the latch.', output: 'The flame burns your forearm badly enough to leave you burned.', expected: ['burned'] },
    { label: 'exhausted', input: 'I keep sprinting uphill long after my breath gives out.', output: 'Your legs shake and you are exhausted by the climb.', expected: ['exhausted'] }
  ];
  for (const v of statuses) {
    tests.push(base('Status expanded validated condition applies: ' + v.label, 'ability-expanded', [
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: v.input },
      { hook: 'output', text: v.output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      ...v.expected.map(e => ({ type: 'arrayIncludes', path: 'state.aidrpg.player.conditions.active', expected: e })),
      { type: 'lastReturnContainsAny', expected: v.expected },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'ValidationSystem/PersistentTraitSystem/PlayerSystem', intendedFunction: 'Validated status consequences should still commit to canon and appear in /sheet.', expectedOutcome: 'Expected active status appears without runtime errors.', patchHint: 'Status consequence validation/application.' }));
  }

  return tests;
}


function negativeControlStressTests() {
  const tests = [];
  const itemNoGrant = [
    ['spoken item name', 'I say, "The rusted iron key is probably important."', 'You say the rusted iron key is probably important, but you do not touch it.', 'rusted iron key'],
    ['imagined item', 'I imagine holding the black sigil key.', 'For a moment you imagine the black sigil key in your palm, but your hand is empty.', 'black sigil key'],
    ['NPC suggestion', 'I ask the guard what I should do.', 'The guard says, "You should take the silver compass from the table," but he does not hand it to you.', 'silver compass'],
    ['almost pickup', 'I reach toward the bronze dagger.', 'You almost grab the bronze dagger, but stop before taking it.', 'bronze dagger'],
    ['memory mention', 'I remember the healing vial I saw yesterday.', 'You remember seeing a healing vial yesterday, but it is not here now.', 'healing vial']
  ];
  for (const [label, input, output, item] of itemNoGrant) {
    tests.push(base('Stress negative item control: ' + label, 'stress-negative-controls', [
      { hook: 'input', text: input, historyType: 'say' },
      { hook: 'output', text: output, historyType: 'story' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: [item, item.toLowerCase().replace(/\s+/g, '_')] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.byId', expected: [item] },
      { type: 'lastReturnContainsAny', expected: ['none', 'Owned Item IDs: 0'] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'ValidationSystem/InventorySystem', intendedFunction: 'Mentioning, imagining, suggesting, almost taking, or remembering an item must not grant the item.', expectedOutcome: 'No hard inventory state change unless output confirms actual acquisition/transfer.', whyItMatters: 'AI Dungeon often mentions items in speech, memory, suggestions, and hypotheticals. These must not become possession.', patchHint: 'Inspect action-mode gating, output consequence validation, negation/near-action filters, and story-granted item capture thresholds.', severity: 'High' }));
  }
  const abilityNoLearn = [
    ['could learn', 'I ask about old sword techniques.', 'You could learn Moonblade someday if you found a master, but you do not learn it now.', 'Moonblade'],
    ['rumor skill', 'I listen to rumors at the tavern.', 'The patrons whisper about a skill called Night Eye that thieves sometimes learn.', 'Night Eye'],
    ['book title', 'I read the book spine.', 'The book is titled Dragon Pulse, but it is only a dusty manual you have not studied.', 'Dragon Pulse'],
    ['dream ability', 'I fall asleep by the fire.', 'In a dream, you wield Soul Rend, but the knowledge fades when you wake.', 'Soul Rend'],
    ['NPC dialogue ability', 'I ask Mira about magic.', 'Mira says, "Void Step is real, but you are nowhere near learning it."', 'Void Step']
  ];
  for (const [label, input, output, ability] of abilityNoLearn) {
    tests.push(base('Stress negative ability control: ' + label, 'stress-negative-controls', [
      { hook: 'input', text: input }, { hook: 'output', text: output }, { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: [ability, ability.toLowerCase().replace(/\s+/g, '_')] },
      { type: 'noRuntimeErrors' }
    ], { expectedSystem: 'AbilitySystem/ValidationSystem', intendedFunction: 'Hypothetical, rumor, title, dream, or dialogue-only ability mentions must not create abilities.', expectedOutcome: ability + ' is not hard-saved.', whyItMatters: 'The model frequently hallucinates skill names. Only explicit use/training or validated discovery should create/revise ability state.', patchHint: 'Inspect output-only ability gating and validation confidence requirements.', severity: 'High' }));
  }
  const sceneNoMove = [
    ['visible tavern', 'I stand in the market lane.', 'The tavern is visible across the street, but you remain in the market lane.', ['market lane'], ['tavern']],
    ['distant chapel bell', 'I wait outside.', 'A chapel bell rings somewhere in the distance while you stay at the gate.', ['gate', 'market lane', 'lane'], ['chapel']],
    ['remembered smithy', 'I think about buying tools.', 'You remember the smithy from earlier, though you are still in the alley.', ['alley', 'market lane', 'lane'], ['smithy']],
    ['directions to guild hall', 'I ask for directions.', 'The boy points toward the guild hall at the end of the road, but you have not gone there yet.', ['road', 'lane', 'market'], ['guild hall']],
    ['smell of bakery', 'I pause in the lane.', 'The smell of bread drifts from the bakery nearby while you remain outside.', ['lane', 'outside'], ['bakery']]
  ];
  for (const [label, input, output, expectedKeep, forbidden] of sceneNoMove) {
    tests.push(base('Stress negative scene control: ' + label, 'stress-negative-controls', [
      { hook: 'input', text: input }, { hook: 'output', text: output }, { hook: 'context', text: 'Continue with current scene truth.' }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene.displayName', expected: forbidden },
      { type: 'lastReturnContainsAny', expected: expectedKeep },
      { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem/ContextPacketSystem', intendedFunction: 'Weak, distant, remembered, or visible locations must not replace the current scene.', expectedOutcome: 'Scene remains the previously confirmed local place until actual arrival/entry is confirmed.', patchHint: 'Inspect weak mention filters and scene candidate strength scoring.', severity: 'High' }));
  }
  return tests;
}

function similarNameConfusionStressTests() {
  const tests = [];
  const itemCases = [
    { target: 'rusted iron key', confusers: ['iron keyring', 'iron dagger', 'silver key'], input: 'I take the rusted iron key, not the keyring.', output: 'You take the rusted iron key and leave the iron keyring behind.' },
    { target: 'black sigil key', confusers: ['black sigil charm', 'black iron keyring', 'silver chapel key'], input: 'I take the black sigil key, not the charm.', output: 'You take the black sigil key, leaving the black sigil charm untouched.' },
    { target: 'minor healing vial', confusers: ['minor poison vial', 'empty vial', 'healing herb'], input: 'I drink the minor healing vial, not the poison vial.', output: 'You drink the minor healing vial and leave the poison vial alone.' },
    { target: 'cracked bronze shield', confusers: ['bronze coin', 'cracked shield strap', 'bronze helm'], input: 'I equip the cracked bronze shield, not the helm.', output: 'You equip the cracked bronze shield and ignore the bronze helm.' },
    { target: 'stitched leather charm', confusers: ['stitched leather pouch', 'leather charm strap', 'silver charm'], input: 'I accept the stitched leather charm, not the pouch.', output: 'You accept the stitched leather charm and leave the pouch behind.' }
  ];
  for (const c of itemCases) tests.push(base('Stress similar item resolution: ' + c.target, 'stress-similar-names', [
    { hook: 'input', text: c.input }, { hook: 'output', text: c.output }, { hook: 'input', text: '/inventory', captureDebug: true }
  ], [
    { type: 'anyStringContains', path: 'state.aidrpg.items', expected: c.target },
    { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: c.confusers },
    { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.items.ownership.player', expectedText: c.target, max: 1 },
    { type: 'noInternalIdLeak', path: 'lastReturn.text' }, { type: 'noRuntimeErrors' }
  ], { expectedSystem: 'InventorySystem', intendedFunction: 'Exact or intended item identity should win over similar names and negated confusers.', expectedOutcome: 'Player receives only ' + c.target + '.', whyItMatters: 'Wrong item resolution is high-risk for keys, quest items, equipment, and rewards.', patchHint: 'Inspect item candidate scoring, exact-name priority, alias priority, negation penalties, and visible name formatting.', severity: 'High' }));
  const actorCases = [
    { target: 'Mira', confusers: ['Myra', 'Miri'], input: 'I ask Mira to follow me, not Myra.', output: 'Mira agrees to follow you while Myra stays behind.' },
    { target: 'Captain Dorne', confusers: ['Dorn', 'Dorian'], input: 'I confront Captain Dorne directly.', output: 'Captain Dorne becomes hostile, though Dorian says nothing.' },
    { target: 'Seren', confusers: ['Sera', 'Serin'], input: 'I bandage Seren.', output: 'Seren winces as you tighten the bandage. Sera watches from the doorway.' }
  ];
  for (const c of actorCases) tests.push(base('Stress similar actor resolution: ' + c.target, 'stress-similar-names', [
    { hook: 'input', text: c.input }, { hook: 'output', text: c.output }, { hook: 'context', text: 'Continue with relevant actors.' }
  ], [
    { type: 'anyStringContains', path: 'state.aidrpg.actors', expected: c.target },
    { type: 'lastReturnContainsAny', expected: [c.target] },
    { type: 'notAnyStringContains', path: 'state.aidrpg.actors.byId', expected: c.confusers },
    { type: 'noRuntimeErrors' }
  ], { expectedSystem: 'ActorProfileSystem/ContextPacketSystem', intendedFunction: 'Actor identity resolution should not confuse similar names or create the wrong persistent actor.', expectedOutcome: c.target + ' becomes the relevant actor, not ' + c.confusers.join(', ') + '.', patchHint: 'Inspect actor name extraction, exact name matching, display names, aliases, and importance thresholds.', severity: 'High' }));
  const abilityCases = [
    { target: 'Ember Ward', confusers: ['Ember Blade', 'Ember Word'], input: 'I train Ember Ward, not Ember Blade.', output: 'You train Ember Ward until it bends heat away from allies.' },
    { target: 'Frost Step', confusers: ['Frost Strike', 'Frost Sight'], input: 'I practice Frost Step across slick stones.', output: 'Frost Step grows smoother as you cross the stones.' },
    { target: 'Stoneguard', confusers: ['Stone Grasp', 'Stoneward'], input: 'I brace with Stoneguard.', output: 'Stoneguard reinforces your stance under the impact.' }
  ];
  for (const c of abilityCases) tests.push(base('Stress similar ability resolution: ' + c.target, 'stress-similar-names', [
    { hook: 'input', text: c.input }, { hook: 'output', text: c.output }, { hook: 'input', text: '/sheet', captureDebug: true }
  ], [
    { type: 'anyStringContains', path: 'state.aidrpg.abilities', expected: c.target },
    { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: c.confusers },
    { type: 'noRuntimeErrors' }
  ], { initialState: seededAbilityState(c.target), expectedSystem: 'AbilitySystem', intendedFunction: 'Known ability names should update the intended ability, not a similar invented ability.', expectedOutcome: c.target + ' is revised, not confused with ' + c.confusers.join(', ') + '.', patchHint: 'Inspect ability key matching, aliases, exact-name priority, and output-only new ability gating.', severity: 'High' }));
  return tests;
}

function contextPressureStressTests() {
  const clutterHistory = Array.from({ length: 45 }, (_, i) => ({ type: 'story', text: 'Old background detail #' + i + ': market gossip, weather, unrelated route names, and distant rumors.' }));
  const clutterCards = Array.from({ length: 70 }, (_, i) => ({ id: 'card_' + i, title: 'Old Card ' + i, keys: 'old,rumor,archive,' + i, value: '[Old unrelated lore card #' + i + ' with enough words to pressure context.]', type: 'system' }));
  return [
    base('Stress context pressure: new key item survives clutter', 'stress-context-pressure', [
      { hook: 'input', text: 'I take the black sigil key from the altar.' }, { hook: 'output', text: 'You take the black sigil key from the altar and keep it for the sealed chapel door.' }, { hook: 'context', text: 'You stand before the sealed chapel door.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'black sigil key' }, { type: 'lastReturnContainsAny', expected: ['black sigil key', 'sigil key', 'key'] }, { type: 'contextUnderBudget', limit: 12000 }, { type: 'noRuntimeErrors' }
    ], { initialHistory: clutterHistory, initialStoryCards: clutterCards, expectedSystem: 'ContextPacketSystem/InventorySystem', intendedFunction: 'Newly important item truth must remain visible to the AI under pressure.', expectedOutcome: 'Context mentions the key or at least preserves relevant current item truth.', patchHint: 'Inspect dirty item priority, context packet ordering, and budget allocator.', severity: 'High' }),
    base('Stress context pressure: new actor condition survives clutter', 'stress-context-pressure', [
      { hook: 'input', text: 'I help Mira after the fight.' }, { hook: 'output', text: 'Mira is wounded and limping, but she trusts you enough to keep following.' }, { hook: 'context', text: 'Continue with the nearby companion.' }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.actors', expected: 'Mira' }, { type: 'lastReturnContainsAny', expected: ['Mira', 'wounded', 'limping', 'trust', 'following'] }, { type: 'contextUnderBudget', limit: 12000 }, { type: 'noRuntimeErrors' }
    ], { initialHistory: clutterHistory, initialStoryCards: clutterCards, expectedSystem: 'ContextPacketSystem/ActorProfileSystem', intendedFunction: 'Important actor truth must remain visible under context pressure.', expectedOutcome: 'Context includes currently relevant actor facts.', patchHint: 'Inspect actor dirty priority, important actor threshold, and context packet ordering.', severity: 'High' }),
    base('Stress context pressure: scene update survives clutter', 'stress-context-pressure', [
      { hook: 'input', text: 'I enter the tavern common room.' }, { hook: 'output', text: 'You step into the tavern common room, where rain-soaked patrons crowd around the hearth.' }, { hook: 'context', text: 'Continue from current place.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene.displayName', expected: ['tavern', 'common room'] }, { type: 'lastReturnContainsAny', expected: ['tavern', 'common room', 'hearth'] }, { type: 'contextUnderBudget', limit: 12000 }, { type: 'noRuntimeErrors' }
    ], { initialState: confirmedMarketLaneState(), initialHistory: clutterHistory, initialStoryCards: clutterCards, expectedSystem: 'ContextPacketSystem/SceneStateSystem', intendedFunction: 'Immediate scene truth must override stale crowded context.', expectedOutcome: 'Context reports the tavern/common room rather than stale lane/card facts.', patchHint: 'Inspect scene packet dirty priority and stale cache invalidation.', severity: 'High' })
  ];
}

function broadRetryIdempotencyStressTests() {
  const paths = [
    { label: 'time and item', input: 'I walk to the chapel and take the black sigil key.', output: 'The walk to the chapel takes thirty minutes. You take the black sigil key from the altar.', checks: [{ type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.items', expectedText: 'black sigil key', max: 8 }, { type: 'numberAtMost', path: 'state.aidrpg.time.current.minute', expected: 30 }]},
    { label: 'actor trust', input: 'I rescue Mira.', output: 'Mira coughs but survives. She trusts you now and agrees to follow.', checks: [{ type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.actors', expectedText: 'Mira', max: 12 }, { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.actors', expectedText: 'trust', max: 8 }]},
    { label: 'status condition', input: 'I grab the burning chain.', output: 'The chain burns your palm, leaving you burned and bleeding.', checks: [{ type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.player.conditions.active', expectedText: 'burned', max: 1 }, { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.player.conditions.active', expectedText: 'bleeding', max: 1 }]},
    { label: 'ability training', input: 'I train Ember Ward to protect allies from heat.', output: 'You train Ember Ward until the heat bends away from your allies.', checks: [{ type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.abilities', expectedText: 'Ember Ward', max: 15 }], initialState: seededAbilityState('Ember Ward')},
    { label: 'scene confirmation', input: 'I enter the tavern common room.', output: 'You step into the tavern common room and look around at the crowded hearth.', checks: [{ type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.world.currentScene.displayName', expectedText: 'tavern', max: 1 }], initialState: confirmedMarketLaneState()}
  ];
  return paths.map(p => base('Stress retry idempotency: ' + p.label, 'stress-idempotency', [
    { hook: 'input', text: p.input }, { hook: 'output', text: p.output }, { hook: 'output', text: p.output }, { hook: 'context', text: 'Continue after possible retry.' }
  ], [...p.checks, { type: 'noRuntimeErrors' }], { initialState: p.initialState || {}, expectedSystem: 'TurnEngine/OperationGuard/Cross-System', intendedFunction: 'Repeating the same output path must not double-commit side effects across item, time, actor, status, ability, or scene systems.', expectedOutcome: 'State remains canonical without duplicate commits or runaway records after repeated output.', patchHint: 'Inspect OperationGuard keys for every commit path and duplicate output handling in each subsystem.', severity: 'High' }));
}

function contradictionAndHallucinationStressTests() {
  return [
    base('Stress contradiction: enter tavern then still outside should avoid unrelated hard scene', 'stress-contradiction', [
      { hook: 'input', text: 'I go to the tavern.' }, { hook: 'output', text: 'You step into the tavern, but somehow you are still standing outside in the market lane.' }, { hook: 'context', text: 'Continue carefully.' }
    ], [{ type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene.displayName', expected: ['cellar', 'chapel', 'smithy'] }, { type: 'noRuntimeErrors' }], { initialState: confirmedMarketLaneState(), expectedSystem: 'SceneStateSystem/ValidationSystem', intendedFunction: 'Contradictory output should not create unrelated hard scene truth.', expectedOutcome: 'Script either preserves prior truth, chooses cautiously, or flags uncertainty without jumping to unrelated places.', patchHint: 'Inspect contradiction handling and scene validation.', severity: 'Medium' }),
    base('Stress hallucination: impossible instant mastery should not level wildly', 'stress-contradiction', [
      { hook: 'input', text: 'I glance at a poster.' }, { hook: 'output', text: 'By reading the poster once, you instantly master Dragon Pulse to legendary perfection and gain 500 levels.' }, { hook: 'input', text: '/sheet', captureDebug: true }
    ], [{ type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Dragon Pulse', 'legendary'] }, { type: 'numberAtMost', path: 'state.aidrpg.player.levelState.level', expected: 10 }, { type: 'noRuntimeErrors' }], { expectedSystem: 'ValidationSystem/AbilitySystem/ProgressionSystem', intendedFunction: 'Obvious model hallucination should not create massive progression or mastery.', expectedOutcome: 'No hard-save of Dragon Pulse or huge level jump from unsupported output.', patchHint: 'Inspect validation thresholds for ability/progression claims.', severity: 'High' }),
    base('Stress hallucination: rumor death should not mark actor dead', 'stress-contradiction', [
      { hook: 'input', text: 'I listen to tavern rumors.' }, { hook: 'output', text: 'A drunk says he heard Mira died last winter, though nobody knows if it is true.' }, { hook: 'context', text: 'Continue with actor truth.' }
    ], [{ type: 'notAnyStringContains', path: 'state.aidrpg.actors', expected: ['dead', 'corpse', 'killed'] }, { type: 'noRuntimeErrors' }], { expectedSystem: 'ActorProfileSystem/ValidationSystem', intendedFunction: 'Rumors should not hard-canonize actor death or major status changes.', expectedOutcome: 'No absolute death status is stored from weak rumor text.', patchHint: 'Inspect actor status validation and rumor/uncertainty filters.', severity: 'High' }),
    base('Stress hallucination: hypothetical quest completion should not complete quest', 'stress-contradiction', [
      { hook: 'input', text: 'I ask what might happen if I found the relic.' }, { hook: 'output', text: 'If you found the relic, the chapel quest would be complete, but you have not found it yet.' }, { hook: 'input', text: '/questlog', captureDebug: true }
    ], [{ type: 'notAnyStringContains', path: 'state.aidrpg.quests', expected: ['complete', 'completed', 'relic found'] }, { type: 'noRuntimeErrors' }], { expectedSystem: 'QuestLogSystem/ValidationSystem', maturity: 'FUTURE_EXPECTATION', intendedFunction: 'Hypothetical quest completion language should not complete quests.', expectedOutcome: 'No hard quest completion from if/then hypothetical text.', patchHint: 'When QuestLogSystem exists, inspect hypothetical/conditional filters.', severity: 'Medium' })
  ];
}

function commandAndModeSafetyStressTests() {
  return [
    base('Stress command safety: spoken /sheet does not execute command', 'stress-command-mode-safety', [{ hook: 'input', text: 'I say "/sheet" to Mira.', historyType: 'say' }], [{ type: 'notContainsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' }, { type: 'validHookReturn' }, { type: 'noRuntimeErrors' }], { expectedSystem: 'AdminDebugSystem/IntentParser', intendedFunction: 'Quoted or spoken commands must not execute admin commands.', expectedOutcome: 'Input returns normal text, not /sheet output.', patchHint: 'Inspect command parser anchoring and quote/speech detection.', severity: 'High' }),
    base('Stress command safety: exact /sheet still executes', 'stress-command-mode-safety', [{ hook: 'input', text: '/sheet', captureDebug: true }], [{ type: 'containsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' }, { type: 'validHookReturn' }, { type: 'noRuntimeErrors' }], { expectedSystem: 'AdminDebugSystem', intendedFunction: 'Real debug command still works.', expectedOutcome: '/sheet returns sheet output.', patchHint: 'Do not over-block exact slash commands.', severity: 'High' }),
    base('Stress command safety: story mention /inventory does not execute', 'stress-command-mode-safety', [{ hook: 'input', text: 'The chalkboard reads: /inventory', historyType: 'story' }], [{ type: 'notContainsText', path: 'lastReturn.text', expected: '[AIDRPG /inventory]' }, { type: 'validHookReturn' }, { type: 'noRuntimeErrors' }], { expectedSystem: 'AdminDebugSystem/IntentParser', intendedFunction: 'Story/editor text mentioning a command must not execute it unless it is the actual command.', expectedOutcome: 'No inventory debug output.', patchHint: 'Inspect command parser anchoring and current text exactness.', severity: 'High' }),
    base('Stress do-mode action waits for output confirmation before inventory commit', 'stress-command-mode-safety', [{ hook: 'input', text: 'I take the rusted iron key.' }], [{ type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['rusted iron key', 'rusted_iron_key'] }, { type: 'noRuntimeErrors' }], { expectedSystem: 'InventorySystem/IntentParser', intendedFunction: 'Player action intent alone should not grant inventory before model output confirms outcome.', expectedOutcome: 'No inventory ownership after Input-only step.', patchHint: 'Inspect input intent versus output consequence separation.', severity: 'High' })
  ];
}

function finalTrueStressTests() {
  return [
    ...negativeControlStressTests(),
    ...similarNameConfusionStressTests(),
    ...contextPressureStressTests(),
    ...broadRetryIdempotencyStressTests(),
    ...contradictionAndHallucinationStressTests(),
    ...commandAndModeSafetyStressTests(),
    ...expandedSceneRedlines(),
    ...expandedAbilityRedlines()
  ];
}

function getRedlineTests(suite = 'validation-checks', options = {}) {
  const limit = options.limit || null;
  let tests = [];
  if (suite === 'scene-confirmation' || suite === 'scene-confirmation' || suite === 'scene-validation-checks') tests = sceneRedlines();
  else if (suite === 'ability-status' || suite === 'ability-status' || suite === 'ability-validation-checks' || suite === 'status-validation-checks') tests = abilityRedlines();
  else if (suite === 'scene-expanded' || suite === 'scene-expanded') tests = expandedSceneRedlines();
  else if (suite === 'ability-expanded' || suite === 'status-expanded' || suite === 'ability-expanded') tests = expandedAbilityRedlines();
  else if (suite === 'negative-controls' || suite === 'false-positive-controls') tests = negativeControlStressTests();
  else if (suite === 'similar-names') tests = similarNameConfusionStressTests();
  else if (suite === 'context-pressure-stress') tests = contextPressureStressTests();
  else if (suite === 'idempotency-stress' || suite === 'retry-stress') tests = broadRetryIdempotencyStressTests();
  else if (suite === 'hallucination-stress' || suite === 'contradiction-stress') tests = contradictionAndHallucinationStressTests();
  else if (suite === 'command-mode-safety' || suite === 'action-mode-stress') tests = commandAndModeSafetyStressTests();
  else if (suite === 'expanded-validation') tests = [...expandedSceneRedlines(), ...expandedAbilityRedlines()];
  else if (suite === 'true-stress' || suite === 'final-stress' || suite === 'stress' || suite === 'stress-all') tests = finalTrueStressTests();
  else if (suite === 'expanded-validation') tests = [...expandedSceneRedlines(), ...expandedAbilityRedlines()];
  else if (suite === 'validation-checks') tests = [...sceneRedlines(), ...abilityRedlines()];
  return tests.slice(0, limit || tests.length);
}

module.exports = {
  getRedlineTests, sceneRedlines, abilityRedlines, expandedSceneRedlines, expandedAbilityRedlines,
  negativeControlStressTests, similarNameConfusionStressTests, contextPressureStressTests,
  broadRetryIdempotencyStressTests, contradictionAndHallucinationStressTests, commandAndModeSafetyStressTests, finalTrueStressTests
};
