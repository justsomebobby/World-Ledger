function generateInventoryTests(options = {}) {
  const limit = Number(options.limit || 40);
  const target = 'rusted iron key';
  const confusers = ['iron keyring', 'iron dagger', 'silver key', 'rusted coin'];
  const verbs = ['take', 'grab', 'pick up', 'collect', 'loot', 'retrieve'];
  const suffixes = ['', ' from the corpse', ' off the table', ' beside the dagger', ' near the door', ', not the keyring', ' but leave the dagger'];

  const tests = [];
  let count = 0;
  for (const verb of verbs) {
    for (const suffix of suffixes) {
      if (count >= limit) return tests;
      const playerInput = `I ${verb} the ${target}${suffix}.`;
      const aiOutput = `You ${verb === 'pick up' ? 'pick up' : 'take'} the ${target}.`;
      tests.push({
        name: `Generated inventory phrase ${count + 1}: ${playerInput}`,
        suite: 'inventory',
        description: 'Generated stress case for item phrasing. This starter checks for crashes and debug visibility; later versions will assert exact item ownership once item resolver tracing is added.',
        steps: [
          { hook: 'input', text: playerInput },
          { hook: 'output', text: aiOutput },
          { hook: 'debug', text: '/inventory', captureDebug: true }
        ],
        assertions: [
          { type: 'exists', path: 'state.aidrpg.items' },
          { type: 'validHookReturn' }
        ],
        whyItMatters: 'Inventory bugs often appear only when item names have similar nearby confusers, negation, or different pickup verbs.',
        patchHint: 'If this fails, inspect InventorySystem input/output processing, item normalization, and ownership mutation.'
      });
      count += 1;
    }
  }
  return tests;
}

module.exports = { generateInventoryTests };
