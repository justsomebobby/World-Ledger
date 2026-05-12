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

function seededAdventureState(extra = {}) {
  const baseState = {
    aidrpg: {
      meta: {
        version: 1,
        createdAtTurn: 0,
        currentTurn: 0,
        currentHook: '',
        mode: 'normal',
        seed: 0,
        lastAppliedOutputHash: '',
        debug: false,
        dirty: dirtyShape()
      },
      player: {
        id: 'player',
        name: 'Kael',
        species: 'human',
        levelState: { level: 3, xp: 45, xpToNext: 100, totalXp: 245, growthClass: 'standard' },
        stats: { hp: 100, maxHp: 100, mp: 35, maxMp: 35, ep: 60, maxEp: 60, atk: 7, def: 6, spd: 6, intl: 7, lck: 5 },
        derived: {},
        body: { limbs: { leftArm: 'present', rightArm: 'present', leftLeg: 'present', rightLeg: 'present' }, injuries: [], scars: [], mutations: [], speciesTraits: [], bodyTags: [] },
        conditions: { active: [], permanent: [], vulnerabilities: [], immunities: [] },
        appearance: { visibleTraits: [], outfitSummary: 'travel-worn adventuring clothes', silhouetteTags: [] },
        locationRef: 'adventurers_guild',
        sceneRef: 'guild_hall'
      },
      build: {},
      abilities: {
        byId: {
          skill_ember_ward: {
            id: 'skill_ember_ward',
            displayName: 'Ember Ward',
            family: 'skill',
            intent: 'redirect heat away from allies',
            usePattern: 'defensive fire control',
            aliases: ['ember ward', 'heat ward']
          },
          skill_frost_step: {
            id: 'skill_frost_step',
            displayName: 'Frost Step',
            family: 'skill',
            intent: 'short cold-assisted repositioning',
            usePattern: 'mobility',
            aliases: ['frost step', 'ice step']
          },
          skill_stoneguard: {
            id: 'skill_stoneguard',
            displayName: 'Stoneguard',
            family: 'skill',
            intent: 'brace against impact',
            usePattern: 'defensive stance',
            aliases: ['stoneguard', 'stone guard']
          }
        }
      },
      items: {
        byId: {},
        ownership: { player: [], scene: [], storage: [] },
        equipment: {},
        currency: { byType: { copper: 0, silver: 4, gold: 0 } }
      },
      actors: {
        byId: {
          actor_mira: { id: 'actor_mira', displayName: 'Mira', role: 'healer companion', stance: 'ally', condition: 'steady' },
          actor_bram: { id: 'actor_bram', displayName: 'Bram', role: 'shield companion', stance: 'ally', condition: 'steady' }
        }
      },
      world: {
        currentScene: { id: 'guild_hall', displayName: 'Adventurers Guild Hall', sceneType: 'building interior', parentLocationRef: 'guild_district' },
        locationsById: { guild_district: { identity: { displayName: 'Guild District' } } },
        entitiesById: {}
      },
      time: { current: { day: 1, hour: 8, minute: 0, season: 'spring', weather: 'clear' }, elapsed: { totalHours: 8 }, routes: { knownTravelTimes: {} }, contradictionFlags: [] },
      reputation: {},
      quests: { active: [], archived: [], tracking: {} },
      pending: {},
      cards: {},
      cache: {},
      logs: { recentEvents: [], recentParses: [], recentErrors: [], quarantine: [], migrationHistory: [] }
    }
  };
  return mergeDeep(baseState, extra);
}

function mergeDeep(target, source) {
  if (!source || typeof source !== 'object') return target;
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function noFailureAssertions() {
  return [
    { type: 'noRuntimeErrors' },
    { type: 'noStopTrue' },
    { type: 'maxHookRuntimeMs', expected: 1800 },
    { type: 'stateSizeUnderBytes', limit: 900000 }
  ];
}

function contextPressureHistory() {
  const history = [];
  const filler = [
    'Old rumor about a vanished tower that is not relevant right now.',
    'Market crowd noise, rain, a distant smithy bell, and unrelated gossip.',
    'A bard retells an old dungeon story with a different key and a different party.',
    'Mira once mentioned a shrine, but this does not change the current scene.',
    'Bram talks about armor prices and a friend named Myra, not Mira.'
  ];
  for (let i = 0; i < 80; i += 1) history.push({ type: i % 3 === 0 ? 'story' : i % 3 === 1 ? 'do' : 'say', text: filler[i % filler.length] + ' #' + i });
  return history;
}

function storyCardClutter() {
  const cards = [];
  for (let i = 0; i < 60; i += 1) {
    cards.push({ id: 'card_noise_' + i, keys: 'noise,old rumor,unrelated ' + i, type: 'system', title: 'Noise Card ' + i, value: '[Unrelated background fact number ' + i + ' that should not override current truth.]' });
  }
  return cards;
}

function wholeAdventureBaseline() {
  return base('Adventure baseline / guild quest to dungeon, loot, return, pay, shop, sleep', 'adventure-baseline', [
    { hook: 'input', text: '/sheet', captureDebug: true },
    { hook: 'input', text: 'I ask the adventurers guild for a basic dungeon job for me, Mira, and Bram.' },
    { hook: 'output', text: 'The guild clerk gives your party a simple Old Barrow job: clear three chambers, recover the rusted iron key from the armory, and return for eight silver coins.' },
    { hook: 'input', text: 'We accept the quest and head for the Old Barrow.' },
    { hook: 'output', text: 'The walk to the Old Barrow takes one hour. Mira checks her satchel while Bram leads the way with his shield.' },
    { hook: 'output', text: 'You step into the barrow entry hall. Dust covers the flagstones and a pressure plate waits near the center.' },
    { hook: 'input', text: 'I point out the pressure plate and step around it.' },
    { hook: 'output', text: 'You avoid the pressure plate. No darts fire, and nobody is hurt.' },
    { hook: 'output', text: 'In the ruined armory, two skeletal guards lurch toward you. You use Ember Ward to shield Mira while Bram blocks the first strike.' },
    { hook: 'output', text: 'You defeat the skeletal guards. You gain modest combat experience and find a rusted iron key, a cracked bronze shield, and three silver coins.' },
    { hook: 'output', text: 'The sealed sanctum opens with the rusted iron key. The bone warden burns your forearm with ghost-fire before Mira treats the burn.' },
    { hook: 'output', text: 'The warden falls. Your party returns to the guild two hours later. The clerk pays you eight silver coins for clearing the Old Barrow.' },
    { hook: 'input', text: 'I spend five silver on a healing kit and then sleep for the night at the guild bunkroom.' },
    { hook: 'output', text: 'You buy the healing kit for five silver. After a full night of rest, your burn aches less and the party wakes at dawn.' },
    { hook: 'input', text: '/sheet', captureDebug: true },
    { hook: 'input', text: '/inventory', captureDebug: true },
    { hook: 'input', text: '/time', captureDebug: true },
    { hook: 'context', text: 'Continue after the dungeon job.' }
  ], [
    { type: 'anyStringContainsAny', path: 'state.aidrpg.quests', expected: ['Old Barrow', 'barrow', 'quest'] },
    { type: 'anyStringContainsAny', path: 'state.aidrpg.items', expected: ['rusted iron key', 'cracked bronze shield', 'healing kit', 'silver'] },
    { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected: ['burn', 'forearm', 'injury', 'xp', 'experience'] },
    { type: 'anyStringContainsAny', path: 'state.aidrpg.actors', expected: ['Mira', 'Bram'] },
    { type: 'anyStringContainsAny', path: 'state.aidrpg.time', expected: ['day', 'hour', 'dawn', 'totalHours'] },
    { type: 'lastReturnContainsAny', expected: ['Old Barrow', 'burn', 'healing kit', 'Mira', 'Bram', 'dawn', 'silver'] },
    ...noFailureAssertions()
  ], {
    initialState: seededAdventureState(),
    expectedSystem: 'Whole adventure integration',
    intendedFunction: 'A short AI Dungeon-style adventure should update quest, scene, time, party actors, combat rewards, injury/healing, inventory, economy, sleep/rest, and context together.',
    expectedOutcome: 'State and context preserve the core dungeon truth without over-saving false positives or losing current facts.',
    whyItMatters: 'This is the closest local proxy for a normal AI Dungeon session without automating the live site.',
    patchHint: 'Failures should be grouped by system; patch the highest-impact capture/integration gap first.'
  });
}

const slangInputs = [
  ['formal', 'I take the rusted iron key from the armory floor.'],
  ['casual', 'I grab the rusty key off the floor.'],
  ['slang', 'yo I snag the rusty key real quick.'],
  ['short', 'take key'],
  ['uncertain', 'I scoop up the old iron key-looking thing.'],
  ['multi', 'I pocket the key and check on Mira.'],
  ['negative', 'I almost grab the key, but I leave it there.'],
  ['say-mode-like', 'I say, "someone should grab the key," but I do not touch it.']
];

function inventorySlangTests() {
  const items = [
    ['rusted iron key', ['key', 'rusty key', 'iron key']],
    ['cracked bronze shield', ['shield', 'bronze shield', 'beat-up shield']],
    ['minor healing vial', ['vial', 'heal pot', 'little healing bottle']],
    ['stitched leather charm', ['charm', 'leather charm', 'lucky trinket']],
    ['silver compass', ['compass', 'little compass', 'shiny compass']]
  ];
  const tests = [];
  const verbs = ['take', 'grab', 'pick up', 'collect', 'loot', 'snag', 'yoink', 'pocket', 'scoop up', 'nab'];
  for (const [item, aliases] of items) {
    for (const verb of verbs) {
      const phrase = aliases[(verbs.indexOf(verb) + item.length) % aliases.length];
      tests.push(base('Adventure inventory slang positive / ' + verb + ' ' + phrase, 'adventure-inventory', [
        { hook: 'input', text: 'I ' + verb + ' the ' + phrase + '.' },
        { hook: 'output', text: 'You ' + (verb === 'pocket' ? 'pocket' : 'take') + ' the ' + item + ' and keep moving.' },
        { hook: 'input', text: '/inventory', captureDebug: true }
      ], [
        { type: 'anyStringContainsAny', path: 'state.aidrpg.items', expected: [item].concat(aliases) },
        { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['undefined', 'null item'] },
        ...noFailureAssertions()
      ], { initialState: seededAdventureState(), expectedSystem: 'InventorySystem', intendedFunction: 'Player slang and casual pickup phrasing should still capture confirmed item acquisition after output confirms it.', expectedOutcome: 'The correct item is owned or represented; no garbage/internal name is exposed.', patchHint: 'Inspect item normalization, alias handling, and pickup confirmation parsing.' }));
    }
  }
  const negatives = [
    ['almost', 'I almost grab the rusted iron key, but I stop.', 'You stop before taking the rusted iron key.'],
    ['say', 'I say, "grab the rusted iron key," but keep my hands down.', 'Mira hears you, but nobody takes the key yet.'],
    ['memory', 'I remember the rusted iron key from the last dungeon.', 'The memory passes; there is no key here to take.'],
    ['wish', 'I wish I had the rusted iron key.', 'Wishing for the key does not put it in your hand.'],
    ['teammate prompt', 'I tell Bram to take the rusted iron key.', 'Bram says he will wait until you are sure, and the key remains on the floor.']
  ];
  for (let i = 0; i < 10; i += 1) {
    const neg = negatives[i % negatives.length];
    tests.push(base('Adventure inventory negative control / ' + neg[0] + ' ' + i, 'adventure-negative', [
      { hook: 'input', text: neg[1] },
      { hook: 'output', text: neg[2] },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['rusted iron key'] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'InventorySystem / ValidationSystem', intendedFunction: 'Mentions, speech, wishes, memories, and almost-actions must not grant items.', expectedOutcome: 'No hard inventory state change.', patchHint: 'Inspect false-positive item consequence parsing if this fails.' }));
  }
  return tests;
}

function sceneSlangAndBranchTests() {
  const strong = [
    ['tavern common room', 'I head in.', 'You step into the tavern common room, all candle smoke and wet boots.'],
    ['smithy', 'I go inside the smithy.', 'You walk inside the smithy, where the forge throws orange light across the walls.'],
    ['chapel nave', 'I push through the chapel doors.', 'You push through the chapel doors and stand in the ruined nave.'],
    ['guild hall', 'I roll back to the guild hall.', 'You return to the adventurers guild hall, where the quest board creaks overhead.'],
    ['barrow sanctum', 'I enter the sanctum.', 'You step into the sealed sanctum beyond the stone door.']
  ];
  const tests = [];
  for (let i = 0; i < 50; i += 1) {
    const [expected, input, output] = strong[i % strong.length];
    tests.push(base('Adventure scene strong entry variation ' + (i + 1) + ' / ' + expected, 'adventure-scene', [
      { hook: 'input', text: input },
      { hook: 'output', text: output },
      { hook: 'context', text: 'What is the current place?' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene', expected: expected.split(' ') },
      { type: 'lastReturnContainsAny', expected: expected.split(' ') },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'SceneStateSystem / ContextPacketSystem', intendedFunction: 'Strong scene entry should confirm current scene and expose it to context.', expectedOutcome: 'The current scene updates to the entered place or a clean equivalent label.', patchHint: 'Inspect scene target extraction and scene packet invalidation.' }));
  }
  const weak = [
    ['You smell bread from the bakery across the lane, but you stay outside.', 'bakery'],
    ['You glance toward the smithy while still standing in the market lane.', 'smithy'],
    ['Mira mentions the chapel from yesterday while you remain in the guild hall.', 'chapel'],
    ['A passerby gives directions to the tavern; you do not go there yet.', 'tavern'],
    ['You hear the forge bell from somewhere down the street.', 'forge']
  ];
  for (let i = 0; i < 50; i += 1) {
    const [output, forbidden] = weak[i % weak.length];
    tests.push(base('Adventure scene weak mention negative ' + (i + 1) + ' / ' + forbidden, 'adventure-scene', [
      { hook: 'output', text: output },
      { hook: 'context', text: 'Continue in the current location.' }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.world.currentScene.displayName', expected: [forbidden] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState({ aidrpg: { world: { currentScene: { id: 'market_lane', displayName: 'market lane', sceneType: 'street', parentLocationRef: 'market_district' } } } }), expectedSystem: 'SceneStateSystem', intendedFunction: 'Weak distant/remembered/mentioned location text must not overwrite confirmed current scene.', expectedOutcome: 'The current scene remains the original scene.', patchHint: 'Inspect weak mention filters if this fails.' }));
  }
  const reinforced = [
    ['tavern common room', 'The tavern common room is loud with rain-soaked patrons.', 'The common room smells of wet wool and ale near the hearth.', ['tavern', 'common room']],
    ['smithy forge room', 'The smithy interior glows with forge light.', 'The forge room rings with hammer blows and hot iron.', ['smithy', 'forge']],
    ['chapel nave', 'The ruined chapel nave is lined with broken pews.', 'The nave echoes with your footsteps near the cracked altar.', ['chapel', 'nave']],
    ['barrow sanctum', 'The sealed sanctum is cold and close around you.', 'The sanctum walls hum beneath old bone markings.', ['sanctum']],
    ['guild hall', 'The guild hall is packed with mercenaries.', 'The hall smells of beer, leather, and wet cloaks.', ['guild', 'hall']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [name, out1, out2, expected] = reinforced[i % reinforced.length];
    tests.push(base('Adventure scene reinforced medium variation ' + (i + 1) + ' / ' + name, 'adventure-scene', [
      { hook: 'output', text: out1 },
      { hook: 'output', text: out2 },
      { hook: 'context', text: 'Continue after the repeated environmental scene evidence.' }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.world.currentScene', expected },
      { type: 'lastReturnContainsAny', expected },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState({ aidrpg: { world: { currentScene: { id: 'market_lane', displayName: 'market lane', sceneType: 'street', parentLocationRef: 'market_district' } } } }), expectedSystem: 'SceneStateSystem / ContextPacketSystem', intendedFunction: 'Repeated compatible medium-strength environmental evidence should eventually confirm the actual room/building scene.', expectedOutcome: 'After reinforcement, current scene and context switch away from the stale previous scene.', patchHint: 'Inspect pending scene candidate compatibility, reinforcement count, and label normalization.' }));
  }
  return tests;
}

function injuryHealingStatusTests() {
  const injuries = [
    ['burned forearm', 'The cult flame licks your forearm, leaving an angry burn.', ['burn', 'forearm']],
    ['poisoned thumb', 'A hidden needle pricks your thumb, and poison numbs your hand.', ['poison', 'thumb']],
    ['electrocuted shoulder', 'Blue lightning snaps into your shoulder and leaves your arm twitching.', ['shock', 'lightning', 'shoulder', 'electric']],
    ['bleeding thigh', 'A goblin spear opens a bleeding cut along your thigh.', ['bleeding', 'thigh', 'cut']],
    ['cracked ribs', 'The brute crushes you against the wall, leaving your ribs cracked and every breath painful.', ['rib', 'cracked']],
    ['concussed head', 'Your head cracks against the stone floor and the room spins.', ['head', 'dizzy', 'concussion']],
    ['frostbite fingers', 'The wraith frost blackens the tips of your fingers.', ['frost', 'fingers']],
    ['acid-scarred hand', 'Acid splashes across your hand, eating through the glove.', ['acid', 'hand']],
    ['exhausted legs', 'You sprint uphill until your legs shake and you are exhausted.', ['exhausted', 'legs']],
    ['blinded eyes', 'Ash and sparks fill your eyes, leaving you briefly blinded.', ['blind', 'eyes']]
  ];
  const tests = [];
  for (let i = 0; i < 50; i += 1) {
    const [name, output, expected] = injuries[i % injuries.length];
    tests.push(base('Adventure injury/status capture variation ' + (i + 1) + ' / ' + name, 'adventure-injury', [
      { hook: 'input', text: 'I keep fighting through the hazard.' },
      { hook: 'output', text: output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['instant death', 'godlike', 'missing entire body'] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'PlayerSystem / PersistentTraitSystem / ValidationSystem', intendedFunction: 'Confirmed output injuries/statuses should save proportionally without catastrophic overinterpretation.', expectedOutcome: 'The relevant injury/status is visible in state or sheet.', patchHint: 'Inspect consequence parsing and status severity validation.' }));
  }
  const heals = [
    ['self bandage', 'I bandage my bleeding thigh.', 'You bind the bleeding thigh tightly. The bleeding slows, though the cut still hurts.', ['bleeding', 'cut', 'bandage']],
    ['Mira healing', 'I ask Mira to heal my burned forearm.', 'Mira cools the burned forearm with soft light. The burn remains tender but no longer worsens.', ['Mira', 'burn', 'tender']],
    ['potion slang', 'I chug the little heal bottle.', 'The minor healing vial eases your cracked ribs enough for you to move.', ['healing vial', 'ribs']],
    ['antidote', 'I use the antidote on the poison.', 'The antidote slows the poison. Your hand is weak, but the numbness stops spreading.', ['poison', 'weak', 'antidote']],
    ['rest recovery', 'I sleep it off after the fight.', 'After a full night of rest, the bruising fades and your breath steadies.', ['rest', 'bruise']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, input, output, expected] = heals[i % heals.length];
    tests.push(base('Adventure healing/recovery variation ' + (i + 1) + ' / ' + label, 'adventure-healing', [
      { hook: 'input', text: input },
      { hook: 'output', text: output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.player', expected },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['dead', 'fatal'] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'PlayerSystem / InventorySystem / ActorProfileSystem', intendedFunction: 'Healing by self, ally, item, antidote, or rest should revise status coherently without erasing all evidence or creating contradiction.', expectedOutcome: 'The injury/healing truth is represented; no fatal over-save.', patchHint: 'Inspect healing output parsing, item use, actor healing contributions, and recovery wording.' }));
  }
  return tests;
}

function abilityTrainingAndHallucinationTests() {
  const known = [
    ['Ember Ward', 'heat away from Mira', 'I tweak Ember Ward so the heat bends around Mira instead of just me.', 'Ember Ward bends around Mira and redirects heat away from her.'],
    ['Frost Step', 'cross slick stones', 'I use Frost Step in short bursts to cross the slick stones.', 'Frost Step carries you across the slick stones in controlled bursts.'],
    ['Stoneguard', 'brace against the brute', 'I brace with Stoneguard when the brute swings.', 'Stoneguard locks your stance and absorbs the brute\'s impact.']
  ];
  const tests = [];
  const slangTraining = ['practice', 'train', 'drill', 'work on', 'mess with', 'try to refine', 'grind', 'lab out', 'test', 'run reps on'];
  for (let i = 0; i < 50; i += 1) {
    const k = known[i % known.length];
    const verb = slangTraining[i % slangTraining.length];
    tests.push(base('Adventure ability known-use/training variation ' + (i + 1) + ' / ' + k[0], 'adventure-ability', [
      { hook: 'input', text: 'I ' + verb + ' ' + k[0] + ' to ' + k[1] + '.' },
      { hook: 'output', text: k[3] + ' The adjustment is still clearly part of ' + k[0] + '.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAll', path: 'state.aidrpg.abilities', expected: [k[0].split(' ')[0], k[0].split(' ')[1]] },
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: ['Starfall Execution', 'Moonblade', 'Dragon Pulse'] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'AbilitySystem', intendedFunction: 'Known abilities should update or revise under natural/slang training/use phrasing.', expectedOutcome: 'The known ability remains the anchor and may gain application details.', patchHint: 'Inspect explicit training detection, alias matching, and known ability revision.' }));
  }
  const hallucinations = ['Moonblade', 'Night Eye', 'Dragon Pulse', 'Soul Rend', 'Void Step', 'Starfall Execution', 'Thunder Crown', 'Demon Gate', 'Perfect Counter', 'Blood Nova'];
  for (let i = 0; i < 50; i += 1) {
    const ability = hallucinations[i % hallucinations.length];
    tests.push(base('Adventure ability hallucination negative ' + (i + 1) + ' / ' + ability, 'adventure-negative', [
      { hook: 'input', text: 'I swing my ordinary sword and try to survive.' },
      { hook: 'output', text: 'The strike lands. For a moment it feels like you could someday learn ' + ability + ', but you have not trained it yet.' },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.abilities', expected: [ability] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'AbilitySystem / ValidationSystem', intendedFunction: 'Hypothetical/output-only skill mentions should not create new abilities.', expectedOutcome: 'The named skill is not hard-saved.', patchHint: 'Inspect output-only skill gating if this fails.' }));
  }
  return tests;
}

function combatLootEconomyTimeTests() {
  const tests = [];
  const combat = [
    ['win small', 'You beat the skeleton after a short exchange and gain modest combat experience plus two silver coins.', ['xp', 'experience', 'silver']],
    ['win no loot', 'You drive the wraith back and gain a little experience, but it leaves no loot behind.', ['xp', 'experience']],
    ['loss', 'The brute knocks you down. You do not win the fight and gain no reward yet.', ['no reward']],
    ['party assist', 'Bram blocks the ghoul while Mira steadies your arm; together you win and earn modest experience.', ['Bram', 'Mira', 'experience']],
    ['boss', 'The bone warden collapses. The guild will count this as the dungeon cleared, and you gain meaningful but not massive experience.', ['warden', 'experience']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, output, expected] = combat[i % combat.length];
    const isLoss = label === 'loss';
    tests.push(base('Adventure combat outcome variation ' + (i + 1) + ' / ' + label, 'adventure-combat', [
      { hook: 'input', text: i % 2 ? 'I swing hard and use Stoneguard when they counter.' : 'I fight with my team and watch for openings.' },
      { hook: 'output', text: output },
      { hook: 'input', text: '/sheet', captureDebug: true },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      isLoss ? { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['silver coin', 'two silver'] } : { type: 'anyStringContainsAny', path: 'state.aidrpg', expected },
      { type: 'notAnyStringContains', path: 'state.aidrpg.player', expected: ['level 100', 'godlike', 'mythic'] },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'ProgressionSystem / InventorySystem / ActorProfileSystem', intendedFunction: 'Combat outcome should reward success proportionally and not reward failed fights or over-level the player.', expectedOutcome: 'XP/loot match the outcome; party actor relevance may be updated.', patchHint: 'Inspect combat consequence validation and reward gating.' }));
  }
  const economy = [
    ['paid', 'The guild clerk pays you eight silver coins for clearing the Old Barrow.', ['silver']],
    ['buy kit', 'You buy the healing kit for five silver.', ['healing kit', 'silver']],
    ['no money', 'The merchant refuses because you do not have enough silver.', ['not enough']],
    ['sell ring', 'You sell the tarnished ring for three silver coins.', ['silver', 'ring']],
    ['team pays', 'Mira covers one silver of the room cost, and you pay the rest.', ['Mira', 'silver']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, output, expected] = economy[i % economy.length];
    tests.push(base('Adventure economy variation ' + (i + 1) + ' / ' + label, 'adventure-economy', [
      { hook: 'input', text: i % 2 ? 'I handle the payment.' : 'I settle up with the clerk.' },
      { hook: 'output', text: output },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'InventorySystem / ReputationSystem', intendedFunction: 'Quest payment, purchases, insufficient funds, selling, and ally payment should affect currency/items correctly.', expectedOutcome: 'Currency/item state reflects the confirmed economic result.', patchHint: 'Inspect currency parsing and transaction validation.' }));
  }
  const time = [
    ['ten minutes', 'Ten minutes pass while you search the room.', ['minute', '10']],
    ['one hour', 'The walk back to the guild takes one hour.', ['hour', '9']],
    ['overnight', 'You sleep through the night and wake at dawn.', ['day', 'dawn']],
    ['three hours', 'You wait three hours for the poison to fade.', ['hour', '3']],
    ['moments later', 'Moments later, the door creaks open.', ['minute']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, output, expected] = time[i % time.length];
    tests.push(base('Adventure time/rest variation ' + (i + 1) + ' / ' + label, 'adventure-time', [
      { hook: 'input', text: label === 'overnight' ? 'I sleep for the night.' : 'We wait and continue carefully.' },
      { hook: 'output', text: output },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg.time', expected },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'TimeTravelSystem', intendedFunction: 'Time/rest phrases should advance or preserve time proportionally, including sleep and travel.', expectedOutcome: 'Time state and /time reflect the confirmed time passage without huge jumps.', patchHint: 'Inspect relative time parsing, overnight rollover, and small-time handling.' }));
  }
  return tests;
}

function contextPressureAdventureTests() {
  const tests = [];
  const importantFacts = [
    ['rusted iron key', 'You take the rusted iron key from the armory.', ['key']],
    ['Mira wounded', 'Mira is wounded by a bone dart but stays with the party.', ['Mira', 'wounded']],
    ['sanctum scene', 'You step into the sealed sanctum beyond the barrow door.', ['sanctum']],
    ['poison status', 'A needle poisons your thumb and the numbness spreads.', ['poison']],
    ['Ember Ward adaptation', 'Ember Ward becomes a dome around the whole team.', ['Ember', 'Ward']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, output, expected] = importantFacts[i % importantFacts.length];
    tests.push(base('Adventure context pressure variation ' + (i + 1) + ' / ' + label, 'adventure-context-pressure', [
      { hook: 'output', text: output },
      { hook: 'context', text: 'Continue under crowded context after the important event.' }
    ], [
      { type: 'lastReturnContainsAny', expected },
      { type: 'contextUnderBudget', limit: 12000 },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), initialHistory: contextPressureHistory(), initialStoryCards: storyCardClutter(), expectedSystem: 'ContextPacketSystem', intendedFunction: 'Under cluttered history/story-card pressure, newly important current truth should still survive into context.', expectedOutcome: 'The current key/actor/scene/status/ability truth appears in context without blowing the budget.', patchHint: 'Inspect dirty-priority packets, current-scene truth, and context budget ordering.' }));
  }
  return tests;
}

function deathAndFailureBoundaryTests() {
  const tests = [];
  const cases = [
    ['near death not dead', 'The warden knocks you unconscious, but Mira drags you behind the pillar before the finishing blow.', ['unconscious'], ['dead', 'death confirmed']],
    ['actual death final version', 'The blade pierces your heart. You die on the sanctum floor.', ['dead'], []],
    ['rumor death negative', 'A panicked scout says he heard you died, but you are standing right there.', ['standing'], ['dead']],
    ['team death uncertain', 'Bram drops out of sight under the rubble; you cannot tell if he is alive.', ['Bram', 'rubble'], ['dead']],
    ['failed action no reward', 'Your attack misses and the goblin escapes with the coin purse.', ['misses'], ['reward', 'xp gain']]
  ];
  for (let i = 0; i < 50; i += 1) {
    const [label, output, expected, forbidden] = cases[i % cases.length];
    tests.push(base('Adventure death/failure boundary variation ' + (i + 1) + ' / ' + label, 'adventure-death-boundary', [
      { hook: 'input', text: 'I push the fight to the limit.' },
      { hook: 'output', text: output },
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: 'anyStringContainsAny', path: 'state.aidrpg', expected },
      forbidden.length ? { type: 'notAnyStringContains', path: 'state.aidrpg', expected: forbidden } : { type: 'exists', path: 'state.aidrpg' },
      ...noFailureAssertions()
    ], { initialState: seededAdventureState(), expectedSystem: 'ValidationSystem / PlayerSystem / ActorProfileSystem', intendedFunction: 'Death, near-death, uncertainty, rumors, and failed actions must be distinguished so the script does not over-save catastrophic or rewarding outcomes.', expectedOutcome: 'Only clear actual consequences become hard state.', patchHint: 'Inspect fatality/uncertainty validation and failed-action reward gating.' }));
  }
  return tests;
}

function campaignSectionTests() {
  return [wholeAdventureBaseline()];
}

function allAdventureTests() {
  return [
    ...campaignSectionTests(),
    ...inventorySlangTests(),
    ...sceneSlangAndBranchTests(),
    ...injuryHealingStatusTests(),
    ...abilityTrainingAndHallucinationTests(),
    ...combatLootEconomyTimeTests(),
    ...contextPressureAdventureTests(),
    ...deathAndFailureBoundaryTests()
  ];
}

function getAdventureTests(suite, opts = {}) {
  let tests = [];
  const normalized = suite === 'all' ? 'adventure-full' : suite;
  if (normalized === 'adventure-baseline') tests = campaignSectionTests();
  else if (normalized === 'adventure-inventory') tests = inventorySlangTests();
  else if (normalized === 'adventure-scene') tests = sceneSlangAndBranchTests();
  else if (normalized === 'adventure-injury') tests = injuryHealingStatusTests().filter(t => t.suite === 'adventure-injury');
  else if (normalized === 'adventure-healing') tests = injuryHealingStatusTests().filter(t => t.suite === 'adventure-healing');
  else if (normalized === 'adventure-ability') tests = abilityTrainingAndHallucinationTests();
  else if (normalized === 'adventure-combat') tests = combatLootEconomyTimeTests().filter(t => t.suite === 'adventure-combat');
  else if (normalized === 'adventure-economy') tests = combatLootEconomyTimeTests().filter(t => t.suite === 'adventure-economy');
  else if (normalized === 'adventure-time') tests = combatLootEconomyTimeTests().filter(t => t.suite === 'adventure-time');
  else if (normalized === 'adventure-context-pressure') tests = contextPressureAdventureTests();
  else if (normalized === 'adventure-negative') tests = [
    ...inventorySlangTests().filter(t => t.suite === 'adventure-negative'),
    ...abilityTrainingAndHallucinationTests().filter(t => t.suite === 'adventure-negative'),
    ...deathAndFailureBoundaryTests()
  ];
  else if (normalized === 'adventure-death-boundary') tests = deathAndFailureBoundaryTests();
  else if (normalized === 'adventure-stress' || normalized === 'adventure-full' || normalized === 'true-adventure') tests = allAdventureTests();

  if (opts.limit && tests.length > opts.limit) tests = tests.slice(0, opts.limit);
  return tests;
}

module.exports = { getAdventureTests };
