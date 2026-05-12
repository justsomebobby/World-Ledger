const { createRuntime, deepClone } = require('./fake-aid-runtime');
function text(v) { return typeof v === 'string' ? v : String(v ?? ''); }
function trimText(v, max = 1200) { const s = text(v); return s.length > max ? s.slice(0, max) + `... [trimmed ${s.length - max} chars]` : s; }
function summarizeState(state) {
  const root = state && state.aidrpg ? state.aidrpg : {};
  const player = root.player || {}, items = root.items || {}, abilities = root.abilities || {}, world = root.world || {}, time = root.time || {}, quests = root.quests || {};
  return {
    turn: root.meta && root.meta.currentTurn,
    version: root.meta && root.meta.version,
    player: { name: player.name || '', species: player.species || '', level: player.levelState && player.levelState.level, hp: player.stats && player.stats.hp, mp: player.stats && player.stats.mp, ep: player.stats && player.stats.ep, locationRef: player.locationRef || '', sceneRef: player.sceneRef || '' },
    itemCount: items.byId ? Object.keys(items.byId).length : 0,
    ownedItemIds: items.ownership && Array.isArray(items.ownership.player) ? items.ownership.player.slice(0, 20) : [],
    abilityCount: abilities.byId ? Object.keys(abilities.byId).length : 0,
    activeQuestCount: Array.isArray(quests.active) ? quests.active.length : 0,
    scene: world.currentScene ? (world.currentScene.displayName || world.currentScene.name || '') : '',
    time: time.current || {},
    logCounts: root.logs ? { events: Array.isArray(root.logs.recentEvents) ? root.logs.recentEvents.length : 0, parses: Array.isArray(root.logs.recentParses) ? root.logs.recentParses.length : 0, errors: Array.isArray(root.logs.recentErrors) ? root.logs.recentErrors.length : 0 } : {}
  };
}
function createMimic(scriptPath, options = {}) {
  const rt = createRuntime({ state: options.state || {}, info: Object.assign({ actionCount: 0, maxChars: 12000, memoryLength: 0 }, options.info || {}), history: options.history || [], storyCards: options.storyCards || [], memory: options.memory || {}, hookTimeoutMs: options.hookTimeoutMs || 1800, scriptTimeoutMs: options.scriptTimeoutMs || 2200, evalTimeoutMs: options.evalTimeoutMs || 1200, maxHistory: options.maxHistory || 80, allowRequire: options.allowRequire === true });
  rt.loadScript(scriptPath);
  return rt;
}
function runTurn(rt, turn = {}, options = {}) {
  const log = { input: null, context: null, output: null, errors: [], durations: [] };
  const inputText = text(turn.input || turn.player || turn.text || ''), outputText = text(turn.output || turn.story || turn.model || ''), contextSeed = text(turn.context || turn.contextSeed || inputText || 'Continue the adventure.');
  function run(hook, value) { const started = Date.now(); try { const ret = rt.runHook(hook, value); const durationMs = Date.now() - started; log.durations.push({ hook, durationMs }); return { ok: true, durationMs, text: ret && typeof ret.text === 'string' ? ret.text : '', stop: !!(ret && ret.stop), raw: ret }; } catch (err) { const durationMs = Date.now() - started; const message = String(err && err.stack ? err.stack : err); log.errors.push({ hook, durationMs, message }); return { ok: false, durationMs, text: value, error: message }; } }
  if (inputText || options.alwaysRunInput) { log.input = run('input', inputText); rt.addHistory('do', log.input.text || inputText); }
  if (turn.runContext !== false && options.runContext !== false) log.context = run('context', contextSeed);
  if (outputText || options.alwaysRunOutput) { log.output = run('output', outputText); rt.addHistory('story', log.output.text || outputText); }
  return { ok: log.errors.length === 0, input: log.input ? { ok: log.input.ok, text: trimText(log.input.text), durationMs: log.input.durationMs, stop: log.input.stop, error: log.input.error } : null, context: log.context ? { ok: log.context.ok, text: trimText(log.context.text), durationMs: log.context.durationMs, stop: log.context.stop, error: log.context.error } : null, output: log.output ? { ok: log.output.ok, text: trimText(log.output.text), durationMs: log.output.durationMs, stop: log.output.stop, error: log.output.error } : null, stateSummary: summarizeState(rt.context.state), storyCardCount: Array.isArray(rt.context.storyCards) ? rt.context.storyCards.length : 0, historyCount: Array.isArray(rt.context.history) ? rt.context.history.length : 0, errors: log.errors };
}
function runTurns(scriptPath, turns, options = {}) { const rt = createMimic(scriptPath, options); const results = []; for (let i=0;i<turns.length;i+=1) { const result = runTurn(rt, turns[i], options); result.index = i; results.push(result); if (!result.ok && options.stopOnError) break; } return { results, finalState: options.includeState ? deepClone(rt.context.state) : undefined, finalStateSummary: summarizeState(rt.context.state), storyCards: options.includeStoryCards ? deepClone(rt.context.storyCards) : undefined }; }
module.exports = { createMimic, runTurn, runTurns, summarizeState };
