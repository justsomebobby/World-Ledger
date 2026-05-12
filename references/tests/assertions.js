const { getPath } = require('./state-snapshot');

function norm(value) { return String(value ?? '').toLowerCase(); }
function textContains(actual, expected) { return norm(actual).includes(norm(expected)); }

function flattenStrings(value, out = []) {
  if (value == null) return out;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    out.push(String(value));
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) flattenStrings(item, out);
    return out;
  }
  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      out.push(String(key));
      flattenStrings(value[key], out);
    }
  }
  return out;
}

function typeName(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function isInternalIdLeak(text) {
  const sample = String(text ?? '');
  return /\b(?:item|actor|entity|route|ability|quest|scene|loc)_[a-z0-9_]{2,}\b/i.test(sample)
    || /\b[a-z]+_[a-z]+_[a-z0-9_]*\b/.test(sample);
}

function countMatches(strings, expected) {
  const needle = norm(expected);
  return strings.filter(s => norm(s).includes(needle)).length;
}

function byteSize(value) {
  try { return Buffer.byteLength(JSON.stringify(value ?? null), 'utf8'); }
  catch { return Infinity; }
}

function objectKeyCount(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 0;
  return Object.keys(value).length;
}

function evaluateAssertion(assertion, runtime, testResult) {
  const root = runtime.context;
  const actual = assertion.path ? getPath(root, assertion.path) : undefined;
  const type = assertion.type;

  try {
    if (type === 'exists') return { passed: actual !== undefined && actual !== null, actual };
    if (type === 'notExists') return { passed: actual === undefined || actual === null, actual };
    if (type === 'truthy') return { passed: !!actual, actual };
    if (type === 'falsy') return { passed: !actual, actual };
    if (type === 'equals') return { passed: actual === assertion.expected, actual };
    if (type === 'notEquals') return { passed: actual !== assertion.expected, actual };
    if (type === 'type') return { passed: typeName(actual) === assertion.expected, actual: typeName(actual), value: actual };
    if (type === 'containsText') return { passed: textContains(actual, assertion.expected), actual };
    if (type === 'notContainsText') return { passed: !textContains(actual, assertion.expected), actual };
    if (type === 'containsTextAll') {
      const text = String(actual ?? '');
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const missing = expected.filter(e => !textContains(text, e));
      return { passed: missing.length === 0, actual: text.slice(0, 1600), expected, missing };
    }
    if (type === 'containsTextAny') {
      const text = String(actual ?? '');
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      return { passed: expected.some(e => textContains(text, e)), actual: text.slice(0, 1600), expected };
    }
    if (type === 'arrayIncludes') return { passed: Array.isArray(actual) && actual.includes(assertion.expected), actual };
    if (type === 'arrayExcludes') return { passed: !Array.isArray(actual) || !actual.includes(assertion.expected), actual };
    if (type === 'arrayLengthAtLeast') return { passed: Array.isArray(actual) && actual.length >= Number(assertion.expected || 0), actual: Array.isArray(actual) ? actual.length : actual };
    if (type === 'arrayLengthAtMost') return { passed: actual === undefined || (Array.isArray(actual) && actual.length <= Number(assertion.expected || 0)), actual: Array.isArray(actual) ? actual.length : actual };
    if (type === 'numberAtLeast') return { passed: typeof actual === 'number' && actual >= Number(assertion.expected), actual };
    if (type === 'numberAtMost') return { passed: typeof actual === 'number' && actual <= Number(assertion.expected), actual };
    if (type === 'numberBetween') {
      const min = Number(assertion.min); const max = Number(assertion.max);
      return { passed: typeof actual === 'number' && actual >= min && actual <= max, actual };
    }
    if (type === 'objectHasKeys') {
      const keys = Array.isArray(assertion.expected) ? assertion.expected : [];
      const missing = keys.filter(k => !actual || typeof actual !== 'object' || !(k in actual));
      return { passed: missing.length === 0, actual: { missing, keys: actual && typeof actual === 'object' ? Object.keys(actual).slice(0, 80) : actual } };
    }
    if (type === 'objectKeyCountAtMost') {
      const max = Number(assertion.expected || assertion.max || 0);
      return { passed: objectKeyCount(actual) <= max, actual: objectKeyCount(actual) };
    }
    if (type === 'anyStringContains') {
      const strings = flattenStrings(actual);
      return { passed: strings.some(s => textContains(s, assertion.expected)), actual: strings.slice(0, 160) };
    }
    if (type === 'anyStringContainsAny') {
      const strings = flattenStrings(actual);
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      return { passed: expected.some(e => strings.some(s => textContains(s, e))), actual: strings.slice(0, 160), expected };
    }
    if (type === 'anyStringContainsAll') {
      const strings = flattenStrings(actual);
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const missing = expected.filter(e => !strings.some(s => textContains(s, e)));
      return { passed: missing.length === 0, actual: strings.slice(0, 160), expected, missing };
    }
    if (type === 'notAnyStringContains') {
      const strings = flattenStrings(actual);
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const found = expected.filter(e => strings.some(s => textContains(s, e)));
      return { passed: found.length === 0, actual: strings.slice(0, 160), expected, found };
    }
    if (type === 'noFlattenedStringContains') {
      const strings = flattenStrings(actual);
      const bad = strings.find(s => textContains(s, assertion.expected));
      return { passed: !bad, actual: bad || strings.slice(0, 160) };
    }
    if (type === 'flattenedMatchCountAtMost') {
      const strings = flattenStrings(actual);
      const count = countMatches(strings, assertion.expectedText || assertion.expected);
      const max = Number(assertion.max ?? 0);
      return { passed: count <= max, actual: { count, sample: strings.slice(0, 160) } };
    }
    if (type === 'noInternalIdLeak') {
      const text = assertion.path ? String(actual ?? '') : String((testResult.lastReturn && testResult.lastReturn.text) || '');
      return { passed: !isInternalIdLeak(text), actual: text.slice(0, 1500) };
    }
    if (type === 'validHookReturn') {
      const last = testResult.lastReturn;
      return { passed: !!last && typeof last === 'object' && typeof last.text === 'string', actual: last };
    }
    if (type === 'contextUnderBudget') {
      const limit = Number(assertion.limit || 12000);
      const text = String(actual ?? ((testResult.lastReturn && testResult.lastReturn.text) || ''));
      return { passed: text.length <= limit, actual: text.length };
    }
    if (type === 'lastReturnContainsAll') {
      const text = String((testResult.lastReturn && testResult.lastReturn.text) || '');
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const missing = expected.filter(e => !textContains(text, e));
      return { passed: missing.length === 0, actual: text.slice(0, 1800), expected, missing };
    }
    if (type === 'lastReturnContainsAny') {
      const text = String((testResult.lastReturn && testResult.lastReturn.text) || '');
      const expected = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      return { passed: expected.some(e => textContains(text, e)), actual: text.slice(0, 1800), expected };
    }
    if (type === 'noStopTrue') {
      const last = testResult.lastReturn || {};
      return { passed: last.stop !== true, actual: last };
    }
    if (type === 'stateSizeUnderBytes') {
      const limit = Number(assertion.limit || assertion.expected || 750000);
      const size = byteSize(root.state || root);
      return { passed: size <= limit, actual: size, limit };
    }
    if (type === 'storyCardCountAtMost') {
      const max = Number(assertion.expected || assertion.max || 200);
      const cards = root.storyCards || [];
      return { passed: Array.isArray(cards) && cards.length <= max, actual: Array.isArray(cards) ? cards.length : cards };
    }
    if (type === 'storyCardsHaveEntryFields') {
      const cards = Array.isArray(root.storyCards) ? root.storyCards : [];
      const bad = cards.filter(c => !c || typeof c.entry !== 'string' || typeof c.keys !== 'string');
      return { passed: bad.length === 0, actual: { count: cards.length, bad: bad.slice(0, 10) } };
    }
    if (type === 'storyCardOpsNoLegacy') {
      const ops = Array.isArray(testResult.storyCardOps) ? testResult.storyCardOps : [];
      const legacy = ops.filter(op => op && op.legacy === true);
      return { passed: legacy.length === 0, actual: legacy.slice(0, 20) };
    }
    if (type === 'sourceDoesNotContainAny') {
      const src = String(root.__aidrpgScriptSource || '');
      const patterns = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const found = patterns.filter(p => p && src.includes(String(p)));
      return { passed: found.length === 0, actual: found };
    }
    if (type === 'sourceMatchesNone') {
      const src = String(root.__aidrpgScriptSource || '');
      const patterns = Array.isArray(assertion.expected) ? assertion.expected : [assertion.expected];
      const found = [];
      for (const p of patterns) {
        try { if (new RegExp(String(p)).test(src)) found.push(String(p)); } catch (_e) { if (src.includes(String(p))) found.push(String(p)); }
      }
      return { passed: found.length === 0, actual: found };
    }
    if (type === 'maxHookRuntimeMs') {
      const max = Number(assertion.expected || assertion.max || 2000);
      const durations = Array.isArray(testResult.hookDurations) ? testResult.hookDurations : [];
      const slow = durations.filter(d => Number(d.durationMs || 0) > max);
      return { passed: slow.length === 0, actual: durations, max };
    }
    if (type === 'noRuntimeErrors') return { passed: !testResult.errors || testResult.errors.length === 0, actual: testResult.errors || [] };
    if (type === 'maxStateDiffs') {
      const max = Number(assertion.expected || 9999);
      const count = Array.isArray(testResult.stateDiffs) ? testResult.stateDiffs.length : 0;
      return { passed: count <= max, actual: count };
    }
    if (type === 'stateDiffPathIncludes') {
      const needle = String(assertion.expected || '');
      const diffs = Array.isArray(testResult.stateDiffs) ? testResult.stateDiffs : [];
      const hits = diffs.filter(d => String(d.path || '').includes(needle));
      return { passed: hits.length > 0, actual: hits.slice(0, 20) };
    }
    if (type === 'noStateDiffPathIncludes') {
      const needle = String(assertion.expected || '');
      const diffs = Array.isArray(testResult.stateDiffs) ? testResult.stateDiffs : [];
      const hits = diffs.filter(d => String(d.path || '').includes(needle));
      return { passed: hits.length === 0, actual: hits.slice(0, 20) };
    }
    if (type === 'moduleExists') {
      const mod = getPath(root, `AIDRPG.${assertion.expected}`);
      return { passed: !!mod && typeof mod === 'object', actual: !!mod };
    }
    if (type === 'functionExists') {
      const fn = getPath(root, `AIDRPG.${assertion.expected}`);
      return { passed: typeof fn === 'function', actual: typeof fn };
    }
  } catch (err) {
    return { passed: false, actual, error: String(err && err.stack ? err.stack : err) };
  }
  return { passed: false, actual, error: `Unknown assertion type: ${type}` };
}

module.exports = { evaluateAssertion, flattenStrings, isInternalIdLeak };
