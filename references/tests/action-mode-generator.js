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
    severity: 'Medium',
    maturity: 'CURRENT_BLOCKER'
  }, extra);
}

function getActionModeSemanticsTests(limit) {
  const tests = [
    base('Mode semantics: Say-mode item mention must not grant item', 'action-modes', [
      { hook: 'input', historyType: 'say', text: 'You say, "I saw a rusted iron key on the altar."' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'notContainsText', path: 'lastReturn.text', expected: 'rusted iron key' },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'AI Dungeon action-mode semantics / InventorySystem',
      severity: 'High',
      intendedFunction: 'Say mode is speech. Mentioning an item name in dialogue should not create possession.',
      expectedOutcome: 'No inventory record or ownership entry is created from speech alone.',
      whyItMatters: 'Players often talk about objects. Speech should not be mistaken for acquisition.',
      patchHint: 'Ensure InventorySystem only commits item gain from validated output/confirmed action, not Say-mode quoted text.'
    }),

    base('Mode semantics: Say-mode claimed action must not directly mutate inventory', 'action-modes', [
      { hook: 'input', historyType: 'say', text: 'You say, "I take the rusted iron key."' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'AI Dungeon action-mode semantics / InventorySystem',
      severity: 'High',
      intendedFunction: 'Quoted speech that describes an action should not be treated as the action happening.',
      expectedOutcome: 'The player does not receive the key until Do/action plus model output confirms it.',
      patchHint: 'Check quoted-speech detection and prevent inventory commits from Say-mode text.'
    }),

    base('Mode semantics: Say-mode slash command inside dialogue must not run command', 'action-modes', [
      { hook: 'input', historyType: 'say', text: 'You say, "/sheet"' }
    ], [
      { type: 'notContainsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' },
      { type: 'validHookReturn' },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'AdminDebugSystem / AI Dungeon action-mode semantics',
      severity: 'Medium',
      intendedFunction: 'Debug/admin commands should execute only when entered as exact slash commands, not when spoken by a character.',
      expectedOutcome: 'Spoken /sheet remains dialogue and does not display the sheet.',
      patchHint: 'AdminDebugSystem should only accept normalized raw text that begins with / as the actual command input, not quoted speech.'
    }),

    base('Mode semantics: Exact /sheet command still works', 'action-modes', [
      { hook: 'input', historyType: 'story', text: '/sheet', captureDebug: true }
    ], [
      { type: 'lastReturnContainsAll', expected: ['[AIDRPG /sheet]','Build Stage','Current Turn'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'AdminDebugSystem',
      severity: 'High',
      intendedFunction: 'Slash commands are allowed when entered directly as commands.',
      expectedOutcome: '/sheet displays the debug sheet.',
      patchHint: 'If this fails, inspect AdminDebugSystem.handleCommand and Input hook command path.'
    }),

    base('Mode semantics: Story-mode prose mentioning /sheet must not execute command', 'action-modes', [
      { hook: 'input', historyType: 'story', text: 'The words "/sheet" are scratched into the tavern table.' }
    ], [
      { type: 'notContainsText', path: 'lastReturn.text', expected: '[AIDRPG /sheet]' },
      { type: 'validHookReturn' },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'AdminDebugSystem / Story mode semantics',
      severity: 'Medium',
      intendedFunction: 'Story text can contain slash-looking text without being a command unless the whole input is the command.',
      expectedOutcome: 'The input passes through as story text and does not run /sheet.',
      patchHint: 'Admin commands should require exact/direct slash command shape, not embedded text matching.'
    }),

    base('Mode semantics: Do-mode action waits for model output before item ownership changes', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I take the rusted iron key from the altar.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'notContainsText', path: 'lastReturn.text', expected: 'rusted iron key' },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'IntentParser / InventorySystem / ValidationSystem',
      severity: 'High',
      intendedFunction: 'Do mode expresses an attempted action. Inventory should change only after model output validates the outcome.',
      expectedOutcome: 'The key is not owned immediately after Input alone.',
      whyItMatters: 'A failed or interrupted action should not grant items before the AI resolves the result.',
      patchHint: 'Keep Input parsing as intent/candidate only; commit ownership in Output after validation.'
    }),

    base('Mode semantics: Do-mode plus confirmed output grants item once', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I take the rusted iron key from the altar.' },
      { hook: 'output', text: 'You take the rusted iron key from the altar and place it in your pouch.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'anyStringContains', path: 'state.aidrpg.items', expected: 'rusted iron key' },
      { type: 'lastReturnContainsAny', expected: ['rusted iron key','Rusted Iron Key','key'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'InventorySystem / ValidationSystem',
      severity: 'High',
      intendedFunction: 'Confirmed model output should allow the item gain to commit.',
      expectedOutcome: 'The player owns the rusted iron key after the AI output confirms acquisition.',
      patchHint: 'If this fails, inspect output item capture, validation, and ownership mutation.'
    }),

    base('Mode semantics: Confirmed output retry grants item only once', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I take the rusted iron key from the altar.' },
      { hook: 'output', text: 'You take the rusted iron key from the altar and place it in your pouch.' },
      { hook: 'output', text: 'You take the rusted iron key from the altar and place it in your pouch.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'flattenedMatchCountAtMost', path: 'state.aidrpg.items', expectedText: 'rusted iron key', max: 3 },
      { type: 'arrayLengthAtMost', path: 'state.aidrpg.items.ownership.player', expected: 1 },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'TurnEngine / OperationGuard / InventorySystem',
      severity: 'High',
      intendedFunction: 'A retried/replayed confirmed output should not duplicate the same item commit.',
      expectedOutcome: 'Only one owned item record is created for the key.',
      patchHint: 'Inspect OperationGuard idempotency keys for item commit operations.'
    }),

    base('Mode semantics: Output dialogue asking player to take item must not grant item', 'action-modes', [
      { hook: 'input', historyType: 'say', text: 'You say, "What should I do?"' },
      { hook: 'output', text: 'Mira points at the altar and says, "Take the rusted iron key before the cult returns."' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'ConsequenceParser / InventorySystem / dialogue parsing',
      severity: 'High',
      intendedFunction: 'NPC dialogue instructing the player to take an item is not the same as the player receiving it.',
      expectedOutcome: 'No inventory gain from quoted dialogue command.',
      patchHint: 'ConsequenceParser should ignore quoted imperative speech for item acquisition unless narration confirms the player takes/receives it.'
    }),

    base('Mode semantics: Negative output must not grant item', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I try to take the rusted iron key.' },
      { hook: 'output', text: 'You reach for the rusted iron key, but the priest snatches it away before you can take it.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'ValidationSystem / InventorySystem',
      severity: 'High',
      intendedFunction: 'Failed or negated acquisition should not commit item ownership.',
      expectedOutcome: 'No key is added because the narration says the attempt failed.',
      patchHint: 'Add negation/failure handling around item acquisition candidates.'
    }),

    base('Mode semantics: Hypothetical output must not create absolute canon', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I consider taking the rusted iron key.' },
      { hook: 'output', text: 'If you took the rusted iron key now, the door might open, but you hesitate.' },
      { hook: 'input', text: '/inventory', captureDebug: true }
    ], [
      { type: 'notAnyStringContains', path: 'state.aidrpg.items.ownership.player', expected: ['rusted iron key','rusted_iron_key'] },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'ValidationSystem / ConsequenceParser',
      severity: 'High',
      intendedFunction: 'Hypothetical model text should not become absolute inventory/world canon.',
      expectedOutcome: 'No item is added from conditional/hypothetical language.',
      patchHint: 'Validation should reject candidates inside if/might/could/hypothetical clauses.'
    }),

    base('Mode semantics: Speaking a time phrase should not advance time', 'action-modes', [
      { hook: 'input', historyType: 'say', text: 'You say, "Three hours pass, right?"' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberAtMost', path: 'state.aidrpg.time.elapsed.totalHours', expected: 0.01 },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'TimeTravelSystem / Say mode semantics',
      severity: 'High',
      intendedFunction: 'Time phrases spoken by a character should not advance world time.',
      expectedOutcome: 'World time remains unchanged after speech alone.',
      patchHint: 'TimeTravelSystem should commit time passage from validated narration/output, not quoted speech.'
    }),

    base('Mode semantics: Output-confirmed time passage advances time once', 'action-modes', [
      { hook: 'input', historyType: 'do', text: 'I wait for the storm to pass.' },
      { hook: 'output', text: 'Three hours pass before the storm weakens.' },
      { hook: 'input', text: '/time', captureDebug: true }
    ], [
      { type: 'numberAtLeast', path: 'state.aidrpg.time.elapsed.totalHours', expected: 2.5 },
      { type: 'noRuntimeErrors' }
    ], {
      expectedSystem: 'TimeTravelSystem / ValidationSystem',
      severity: 'High',
      intendedFunction: 'Confirmed narration that time passes should advance time.',
      expectedOutcome: 'Elapsed time increases by roughly three hours.',
      patchHint: 'If this fails, inspect TimeTravelSystem output duration parser and validation.'
    })
  ];

  return tests.slice(0, limit || tests.length);
}

module.exports = { getActionModeSemanticsTests };
