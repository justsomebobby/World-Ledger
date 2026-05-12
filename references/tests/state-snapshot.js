function deepClone(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function getPath(root, path) {
  if (!path) return root;
  const parts = String(path).split('.').filter(Boolean);
  let ref = root;
  for (const part of parts) {
    if (ref == null || typeof ref !== 'object' || !(part in ref)) return undefined;
    ref = ref[part];
  }
  return ref;
}

function stableString(value) {
  try { return JSON.stringify(value, Object.keys(value || {}).sort()); }
  catch { return String(value); }
}

function shallowEqualPrimitive(a, b) {
  return a === b || (Number.isNaN(a) && Number.isNaN(b));
}

function tooLarge(value, limit = 120000) {
  try { return JSON.stringify(value).length > limit; }
  catch { return true; }
}

function brief(value) {
  if (value == null) return value;
  if (typeof value !== 'object') return value;
  if (Array.isArray(value)) return { type: 'array', length: value.length, sample: value.slice(0, 5) };
  const keys = Object.keys(value);
  return { type: 'object', keyCount: keys.length, keys: keys.slice(0, 20) };
}

function diffValues(before, after, prefix = '', out = [], max = 200, depth = 0) {
  if (out.length >= max) return out;
  if (shallowEqualPrimitive(before, after)) return out;

  const beforeObj = before && typeof before === 'object';
  const afterObj = after && typeof after === 'object';

  if (depth > 12 || !beforeObj || !afterObj || Array.isArray(before) || Array.isArray(after)) {
    // Avoid expensive full serialization on huge arrays/objects; keep reports useful and bounded.
    if (beforeObj || afterObj) out.push({ path: prefix || '(root)', before: brief(before), after: brief(after) });
    else out.push({ path: prefix || '(root)', before, after });
    return out;
  }

  if (tooLarge(before) || tooLarge(after)) {
    const beforeKeys = before && typeof before === 'object' ? Object.keys(before) : [];
    const afterKeys = after && typeof after === 'object' ? Object.keys(after) : [];
    const keys = new Set([...beforeKeys, ...afterKeys]);
    for (const key of keys) {
      if (out.length >= max) break;
      const b = before ? before[key] : undefined;
      const a = after ? after[key] : undefined;
      if (b !== a) diffValues(b, a, prefix ? `${prefix}.${key}` : key, out, max, depth + 1);
    }
    return out;
  }

  try {
    if (JSON.stringify(before) === JSON.stringify(after)) return out;
  } catch (_) {}

  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);
  for (const key of keys) {
    if (out.length >= max) break;
    diffValues(before ? before[key] : undefined, after ? after[key] : undefined, prefix ? `${prefix}.${key}` : key, out, max, depth + 1);
  }
  return out;
}

module.exports = { deepClone, getPath, diffValues, stableString };
