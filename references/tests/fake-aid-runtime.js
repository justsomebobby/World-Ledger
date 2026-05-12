const fs = require('fs');
const path = require('path');
const vm = require('vm');
const SCRIPT_CACHE = new Map();

function deepClone(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function normalizeKeys(keys) {
  if (Array.isArray(keys)) return keys.map(k => String(k ?? '').trim()).filter(Boolean).join(',');
  return String(keys ?? '').trim();
}

function cardEntry(card) {
  if (!card || typeof card !== 'object') return '';
  if (typeof card.entry === 'string') return card.entry;
  if (typeof card.value === 'string') return card.value;
  if (typeof card.description === 'string') return card.description;
  return '';
}

function normalizeInitialStoryCards(cards) {
  if (!Array.isArray(cards)) return [];
  return cards.map((card, index) => {
    const keys = normalizeKeys(card && (card.keys ?? card.key ?? ''));
    const entry = cardEntry(card);
    const type = String((card && card.type) || 'system');
    const normalized = Object.assign({}, card || {}, {
      id: card && card.id != null ? card.id : index,
      keys,
      entry,
      type
    });
    // Compatibility alias: AI Dungeon docs use entry; older local tester versions used value.
    if (normalized.value == null) normalized.value = entry;
    return normalized;
  });
}

function createRuntime(options = {}) {
  const logs = [];
  function blockedRequire(name) {
    throw new Error('AI Dungeon sandbox mock: require() is not available inside scripts: ' + String(name || ''));
  }
  const storyCardOps = [];
  const scriptSources = { library: '' };
  const context = {
    state: deepClone(options.state || {}),
    info: Object.assign({ actionCount: 0, maxChars: 12000, memoryLength: 0 }, deepClone(options.info || {})),
    history: deepClone(options.history || []),
    storyCards: normalizeInitialStoryCards(deepClone(options.storyCards || [])),
    memory: deepClone(options.memory || {}),
    text: '',
    stop: false,
    module: { exports: {} },
    exports: {},
    require: options.allowRequire === true ? require : blockedRequire,
    setTimeout: function fakeSetTimeout() { return 0; },
    clearTimeout: function fakeClearTimeout() {},
    Math,
    Date,
    JSON,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Error,
    TypeError,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    Buffer,
    console: {
      log: (...args) => logs.push({ level: 'log', message: args.map(String).join(' ') }),
      warn: (...args) => logs.push({ level: 'warn', message: args.map(String).join(' ') }),
      error: (...args) => logs.push({ level: 'error', message: args.map(String).join(' ') })
    }
  };
  context.globalThis = context;

  function findCardIndexByKeys(keys) {
    const normalizedKeys = normalizeKeys(keys);
    return context.storyCards.findIndex(c => normalizeKeys(c && c.keys) === normalizedKeys);
  }

  function assertValidIndex(index, fnName) {
    const numeric = Number(index);
    if (!Number.isInteger(numeric) || numeric < 0 || numeric >= context.storyCards.length) {
      throw new Error(`${fnName}: story card index does not exist: ${index}`);
    }
    return numeric;
  }

  // AI Dungeon-shaped Story Card API.
  // addStoryCard(keys, entry, type) returns the numeric index, or false when duplicate keys already exist.
  context.addStoryCard = function addStoryCard(keys, entry, type = 'system') {
    const normalizedKeys = normalizeKeys(keys);
    if (!normalizedKeys) throw new Error('addStoryCard: keys are required');
    const duplicateIndex = findCardIndexByKeys(normalizedKeys);
    if (duplicateIndex !== -1) {
      storyCardOps.push({ op: 'addStoryCard', keys: normalizedKeys, entry: String(entry ?? ''), type: String(type || 'system'), result: false, reason: 'duplicate_keys' });
      return false;
    }
    const card = {
      id: context.storyCards.length,
      keys: normalizedKeys,
      entry: String(entry ?? ''),
      value: String(entry ?? ''), // compatibility alias for older project code; entry remains canonical
      type: String(type || 'system')
    };
    context.storyCards.push(card);
    storyCardOps.push({ op: 'addStoryCard', index: context.storyCards.length - 1, card: deepClone(card), result: context.storyCards.length - 1 });
    return context.storyCards.length - 1;
  };

  // AI Dungeon-shaped updateStoryCard(index, keys, entry, type). Throws when missing.
  // For compatibility with older tester files, an object/id is accepted but recorded as legacy usage.
  context.updateStoryCard = function updateStoryCard(index, keys, entry, type = 'system') {
    let idx;
    let legacy = false;
    if (typeof index === 'number') idx = assertValidIndex(index, 'updateStoryCard');
    else {
      legacy = true;
      const id = typeof index === 'string' ? index : index && index.id;
      idx = context.storyCards.findIndex(c => c && String(c.id) === String(id));
      if (idx === -1) throw new Error(`updateStoryCard: story card id does not exist: ${id}`);
      // Legacy patch-shape support: updateStoryCard(id, { ...patch })
      if (keys && typeof keys === 'object' && !Array.isArray(keys)) {
        const patch = keys;
        const next = Object.assign({}, context.storyCards[idx], patch);
        if (patch.entry == null && patch.value != null) next.entry = String(patch.value);
        if (patch.value == null && patch.entry != null) next.value = String(patch.entry);
        context.storyCards[idx] = next;
        storyCardOps.push({ op: 'updateStoryCard', index: idx, legacy, patch: deepClone(patch), result: true });
        return true;
      }
    }

    const next = Object.assign({}, context.storyCards[idx], {
      id: context.storyCards[idx].id,
      keys: normalizeKeys(keys),
      entry: String(entry ?? ''),
      value: String(entry ?? ''),
      type: String(type || 'system')
    });
    if (!next.keys) throw new Error('updateStoryCard: keys are required');
    context.storyCards[idx] = next;
    storyCardOps.push({ op: 'updateStoryCard', index: idx, legacy, card: deepClone(next), result: true });
    return true;
  };

  // AI Dungeon-shaped removeStoryCard(index). Throws when missing.
  context.removeStoryCard = function removeStoryCard(index) {
    let idx;
    let legacy = false;
    if (typeof index === 'number') idx = assertValidIndex(index, 'removeStoryCard');
    else {
      legacy = true;
      const id = typeof index === 'string' ? index : index && index.id;
      idx = context.storyCards.findIndex(c => c && String(c.id) === String(id));
      if (idx === -1) throw new Error(`removeStoryCard: story card id does not exist: ${id}`);
    }
    const removed = context.storyCards.splice(idx, 1)[0];
    // Preserve numeric indexing semantics for newly created cards after removal.
    context.storyCards.forEach((card, i) => { if (typeof card.id === 'number') card.id = i; });
    storyCardOps.push({ op: 'removeStoryCard', index: idx, legacy, removed: deepClone(removed), result: true });
    return true;
  };

  const vmContext = vm.createContext(context);

  return {
    context,
    vmContext,
    logs,
    storyCardOps,
    scriptSources,

    loadScript(scriptPath) {
      const source = fs.readFileSync(scriptPath, 'utf8');
      scriptSources.library = source;
      context.__aidrpgScriptSource = source;
      const cacheKey = scriptPath + ':' + source.length + ':' + source.slice(0, 80);
      let compiled = SCRIPT_CACHE.get(cacheKey);
      if (!compiled) {
        compiled = new vm.Script(source, { filename: path.basename(scriptPath) });
        SCRIPT_CACHE.set(cacheKey, compiled);
      }
      compiled.runInContext(vmContext, { timeout: Number(options.scriptTimeoutMs || 2500) });
      if (!context.AIDRPG) throw new Error('Script did not create globalThis.AIDRPG');
      return context.AIDRPG;
    },

    runHook(hook, text) {
      if (!context.AIDRPG) throw new Error('AIDRPG is not loaded');
      context.text = String(text ?? '');
      context.stop = false;
      context.__aidHookText = context.text;
      let code = '';
      if (hook === 'input' || hook === 'debug') code = 'AIDRPG.onInput(__aidHookText)';
      else if (hook === 'context') code = 'AIDRPG.onContext(__aidHookText)';
      else if (hook === 'output') code = 'AIDRPG.onOutput(__aidHookText)';
      else throw new Error(`Unknown hook: ${hook}`);
      return vm.runInContext(code, vmContext, { filename: `${hook}-hook.vm`, timeout: Number(options.hookTimeoutMs || 2000) });
    },

    runEval(code, label = 'eval-step') {
      return vm.runInContext(String(code || ''), vmContext, { filename: `${label}.vm`, timeout: Number(options.evalTimeoutMs || 2000) });
    },

    addHistory(type, text) {
      context.history.push({ type: type || 'do', text: String(text ?? ''), rawText: String(text ?? '') });
      const maxHistory = Number(options.maxHistory || 120);
      if (Number.isFinite(maxHistory) && maxHistory > 0) {
        while (context.history.length > maxHistory) context.history.shift();
      }
      context.info.actionCount = Number(context.info.actionCount || 0) + 1;
    },

    snapshot() {
      return deepClone({
        state: context.state,
        info: context.info,
        history: context.history,
        storyCards: context.storyCards,
        memory: context.memory,
        text: context.text,
        stop: context.stop
      });
    },

    getLogs() { return deepClone(logs); },
    getStoryCardOps() { return deepClone(storyCardOps); }
  };
}

module.exports = { createRuntime, deepClone, normalizeKeys };
