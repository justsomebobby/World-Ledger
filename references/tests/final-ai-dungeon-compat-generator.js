function base(name, suite, steps, assertions, extra = {}) {
  return Object.assign({
    name,
    suite,
    severity: extra.severity || 'high',
    maturity: extra.maturity || 'CURRENT_BLOCKER',
    expectedSystem: extra.expectedSystem || 'AI Dungeon Compatibility',
    intendedFunction: extra.intendedFunction || 'The script should behave safely under AI Dungeon-like runtime constraints.',
    expectedOutcome: extra.expectedOutcome || 'Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.',
    whyItMatters: extra.whyItMatters || 'A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.',
    patchHint: extra.patchHint || 'Patch only the platform-facing assumption or subsystem causing the compatibility failure.',
    initialState: extra.initialState || {},
    initialInfo: extra.initialInfo || {},
    initialHistory: extra.initialHistory || [],
    initialStoryCards: extra.initialStoryCards || [],
    initialMemory: extra.initialMemory || {},
    steps,
    assertions
  }, extra.override || {});
}

function noFailureAssertions() {
  return [
    { type: 'noRuntimeErrors' },
    { type: 'noStopTrue' },
    { type: 'maxHookRuntimeMs', expected: 1800 },
    { type: 'stateSizeUnderBytes', limit: 900000 }
  ];
}

function clutterHistory(count = 90) {
  const out = [];
  const lines = [
    'Old unrelated tavern rumor about a lost axe and a false key.',
    'A previous party member named Myra, not Mira, argued about supplies.',
    'The guild clerk discussed jobs unrelated to the current dungeon.',
    'A memory of a chapel far away should not replace the current room.',
    'Someone mentions a fake Ember Blade skill that should not become canon.'
  ];
  for (let i = 0; i < count; i += 1) out.push({ type: i % 3 === 0 ? 'story' : i % 3 === 1 ? 'do' : 'say', text: lines[i % lines.length] + ' #' + i });
  return out;
}

function clutterCards(count = 80) {
  const out = [];
  for (let i = 0; i < count; i += 1) out.push({ id: i, keys: 'noise,background,old ' + i, entry: 'Unrelated old background card #' + i, type: 'system' });
  return out;
}

function seededState(extra = {}) {
  return Object.assign({
    aidrpg: {
      meta: { version: 1, currentTurn: 0, currentHook: '', lastAppliedOutputHash: '', debug: false, dirty: { player: false, abilities: [], items: [], actors: [], entities: [], routes: [], reputation: false, quests: false, time: false, cards: [] } },
      player: {}, build: {}, abilities: {}, items: {}, actors: {}, world: {}, time: {}, reputation: {}, quests: {}, pending: {}, cards: {}, cache: {},
      logs: { recentEvents: [], recentParses: [], recentErrors: [], quarantine: [], migrationHistory: [] }
    }
  }, extra);
}

function storyCardApiTests() {
  return [
    base('AI Dungeon Story Card API / add duplicate returns false and uses entry field', 'storycard-api', [
      { hook: 'eval', label: 'story-card-add-duplicate', code: `
        (() => {
          state.__storyCardApi = {};
          const first = addStoryCard('goblin,guard', 'A goblin guard blocks the hall.', 'character');
          const duplicate = addStoryCard('goblin,guard', 'Duplicate should not be added.', 'character');
          state.__storyCardApi.first = first;
          state.__storyCardApi.duplicate = duplicate;
          state.__storyCardApi.length = storyCards.length;
          state.__storyCardApi.firstEntry = storyCards[0] && storyCards[0].entry;
          state.__storyCardApi.firstKeys = storyCards[0] && storyCards[0].keys;
          state.__storyCardApi.firstType = storyCards[0] && storyCards[0].type;
          return state.__storyCardApi;
        })();` }
    ], [
      { type: 'equals', path: 'state.__storyCardApi.first', expected: 0 },
      { type: 'equals', path: 'state.__storyCardApi.duplicate', expected: false },
      { type: 'equals', path: 'state.__storyCardApi.length', expected: 1 },
      { type: 'containsText', path: 'state.__storyCardApi.firstEntry', expected: 'goblin guard' },
      { type: 'containsText', path: 'state.__storyCardApi.firstKeys', expected: 'goblin' },
      { type: 'equals', path: 'state.__storyCardApi.firstType', expected: 'character' },
      { type: 'storyCardsHaveEntryFields' },
      ...noFailureAssertions()
    ], { expectedSystem: 'Story Card API Mock', intendedFunction: 'The tester must emulate AI Dungeon addStoryCard(keys, entry, type) closely enough to catch CardSync mistakes.', expectedOutcome: 'addStoryCard returns a numeric index, duplicate keys return false, and storyCards expose entry/keys/type.' }),

    base('AI Dungeon Story Card API / update and remove by numeric index', 'storycard-api', [
      { hook: 'eval', label: 'story-card-update-remove', code: `
        (() => {
          state.__storyCardUpdate = {};
          const idx = addStoryCard('old key', 'Old entry.', 'item');
          const updated = updateStoryCard(idx, 'new key', 'New entry after update.', 'item');
          state.__storyCardUpdate.updated = updated;
          state.__storyCardUpdate.updatedEntry = storyCards[idx] && storyCards[idx].entry;
          state.__storyCardUpdate.updatedKeys = storyCards[idx] && storyCards[idx].keys;
          const removed = removeStoryCard(idx);
          state.__storyCardUpdate.removed = removed;
          state.__storyCardUpdate.length = storyCards.length;
          return state.__storyCardUpdate;
        })();` }
    ], [
      { type: 'equals', path: 'state.__storyCardUpdate.updated', expected: true },
      { type: 'containsText', path: 'state.__storyCardUpdate.updatedEntry', expected: 'New entry' },
      { type: 'containsText', path: 'state.__storyCardUpdate.updatedKeys', expected: 'new key' },
      { type: 'equals', path: 'state.__storyCardUpdate.removed', expected: true },
      { type: 'equals', path: 'state.__storyCardUpdate.length', expected: 0 },
      ...noFailureAssertions()
    ], { expectedSystem: 'Story Card API Mock', intendedFunction: 'The tester must catch CardSync code that assumes object/id patch behavior instead of numeric index update/remove.' }),

    base('AI Dungeon Story Card API / missing update and remove throw', 'storycard-api', [
      { hook: 'eval', label: 'story-card-missing-throws', code: `
        (() => {
          state.__storyCardMissing = {};
          try { updateStoryCard(99, 'x', 'y', 'z'); state.__storyCardMissing.update = 'no_throw'; } catch (e) { state.__storyCardMissing.update = 'throw'; }
          try { removeStoryCard(99); state.__storyCardMissing.remove = 'no_throw'; } catch (e) { state.__storyCardMissing.remove = 'throw'; }
          return state.__storyCardMissing;
        })();` }
    ], [
      { type: 'equals', path: 'state.__storyCardMissing.update', expected: 'throw' },
      { type: 'equals', path: 'state.__storyCardMissing.remove', expected: 'throw' },
      ...noFailureAssertions()
    ], { expectedSystem: 'Story Card API Mock', intendedFunction: 'Missing card updates/removals should be surfaced as errors in tests rather than silently succeeding.' })
  ];
}

function wrapperCompatTests() {
  return [
    base('Wrapper compatibility / standard Input Context Output wrappers return valid { text }', 'wrapper-compat', [
      { hook: 'eval', label: 'standard-wrapper-simulation', code: `
        (() => {
          state.__wrapperCompat = {};
          const inputModifier = (text) => AIDRPG.onInput(text);
          const contextModifier = (text) => AIDRPG.onContext(text);
          const outputModifier = (text) => AIDRPG.onOutput(text);
          const inputReturn = inputModifier('/sheet');
          const contextReturn = contextModifier('Continue the current scene.');
          const outputReturn = outputModifier('You wait without anything important changing.');
          state.__wrapperCompat.inputOk = !!inputReturn && typeof inputReturn.text === 'string';
          state.__wrapperCompat.contextOk = !!contextReturn && typeof contextReturn.text === 'string';
          state.__wrapperCompat.outputOk = !!outputReturn && typeof outputReturn.text === 'string';
          state.__wrapperCompat.noStop = inputReturn.stop !== true && contextReturn.stop !== true && outputReturn.stop !== true;
          state.__wrapperCompat.outputText = outputReturn.text;
          return state.__wrapperCompat;
        })();` }
    ], [
      { type: 'equals', path: 'state.__wrapperCompat.inputOk', expected: true },
      { type: 'equals', path: 'state.__wrapperCompat.contextOk', expected: true },
      { type: 'equals', path: 'state.__wrapperCompat.outputOk', expected: true },
      { type: 'equals', path: 'state.__wrapperCompat.noStop', expected: true },
      { type: 'containsText', path: 'state.__wrapperCompat.outputText', expected: 'wait' },
      ...noFailureAssertions()
    ], { expectedSystem: 'Hook wrapper compatibility', intendedFunction: 'Even without uploaded hook tabs, the canonical thin wrapper shape should call the Library handlers cleanly.' })
  ];
}

function sandboxGuardTests() {
  return [
    base('Sandbox guard / no obvious Node browser network APIs in Library source', 'sandbox-guards', [
      { hook: 'input', text: '/sheet', captureDebug: true }
    ], [
      { type: "sourceMatchesNone", expected: ["\\brequire\\s*\\(", "\\bprocess\\s*\\.", "\\bfs\\s*\\.", "\\bfetch\\s*\\(", "XMLHttpRequest", "localStorage", "\\bdocument\\s*\\.", "\\bwindow\\s*\\.", "\\beval\\s*\\("] },
      { type: 'validHookReturn' },
      ...noFailureAssertions()
    ], { expectedSystem: 'Runtime sandbox safety', intendedFunction: 'The Library should not depend on Node/browser APIs that AI Dungeon may not expose.' }),

    base('Sandbox guard / repeated context calls remain under runtime and size budgets', 'sandbox-guards', [
      { hook: 'output', text: 'You step into the barrow sanctum. Mira is wounded, the rusted iron key is in your hand, and the air smells of poison smoke.' },
      { hook: 'context', text: 'Continue under heavy context pressure.' },
      { hook: 'context', text: 'Continue under heavy context pressure again.' },
      { hook: 'context', text: 'Continue under heavy context pressure a third time.' }
    ], [
      { type: 'contextUnderBudget', limit: 12000 },
      { type: 'stateSizeUnderBytes', limit: 900000 },
      { type: 'storyCardCountAtMost', expected: 200 },
      { type: 'maxHookRuntimeMs', expected: 1800 },
      ...noFailureAssertions()
    ], { initialState: seededState(), initialHistory: clutterHistory(100), initialStoryCards: clutterCards(90), expectedSystem: 'ContextPacketSystem / runtime budget', intendedFunction: 'Context building must remain bounded when history and story cards are crowded.' })
  ];
}

function finalCompatibilityTests() {
  return [
    ...storyCardApiTests(),
    ...wrapperCompatTests(),
    ...sandboxGuardTests(),
    base('Final compatibility / command mention and story text do not execute slash commands', 'ai-dungeon-final', [
      { hook: 'input', text: 'I say, "/sheet" out loud to Mira.' },
      { hook: 'output', text: 'Mira looks confused when you say slash sheet, but no debug panel appears.' },
      { hook: 'context', text: 'Continue after the spoken command.' }
    ], [
      { type: 'notContainsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' },
      ...noFailureAssertions()
    ], { expectedSystem: 'Action-mode semantics', intendedFunction: 'Speech/story mentions of slash commands must not execute debug commands.' }),
    base('Final compatibility / output memory timing does not assume same-action memory effect', 'ai-dungeon-final', [
      { hook: 'input', text: 'I search the fallen acolyte for the black sigil key.' },
      { hook: 'output', text: 'You find a black sigil key and put it in your pouch.' },
      { hook: 'context', text: 'The sealed door waits ahead.' }
    ], [
      { type: 'lastReturnContainsAny', expected: ['key', 'sigil', 'pouch', 'inventory'] },
      { type: 'contextUnderBudget', limit: 12000 },
      ...noFailureAssertions()
    ], { expectedSystem: 'ContextPacketSystem / InventorySystem', intendedFunction: 'Important output-derived state should appear in the next Context hook rather than relying on same-output memory changes.' })
  ];
}

function getFinalAiDungeonCompatibilityTests(suite, opts = {}) {
  let tests = [];
  const normalized = suite === 'all' ? 'ai-dungeon-final' : suite;
  if (normalized === 'storycard-api') tests = storyCardApiTests();
  else if (normalized === 'wrapper-compat') tests = wrapperCompatTests();
  else if (normalized === 'sandbox-guards') tests = sandboxGuardTests();
  else if (normalized === 'ai-dungeon-final' || normalized === 'final-compat' || normalized === 'platform-compat') tests = finalCompatibilityTests();
  if (opts.limit && tests.length > opts.limit) tests = tests.slice(0, opts.limit);
  return tests;
}

module.exports = { getFinalAiDungeonCompatibilityTests };
