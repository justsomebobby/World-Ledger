const fs = require('fs');
const path = require('path');

function isLikelyScriptFile(name) {
  const base = String(name || '').toLowerCase();
  if (!(base.endsWith('.js') || base.endsWith('.txt'))) return false;
  if (base.includes('runner') || base.includes('tester') || base.includes('report') || base.includes('package')) return false;
  return /aidrpg|ai[-_]?dungeon|script/.test(base);
}
function scoreCandidate(file) {
  const base = path.basename(file).toLowerCase();
  let score = 0;
  if (base === 'aidrpg-script.js') score += 100;
  if (/aidrpgv?\d|aidrpg-v|aidrpg/.test(base)) score += 70;
  if (/script/.test(base)) score += 20;
  if (base.endsWith('.js')) score += 10;
  try { const st = fs.statSync(file); score += Math.min(40, Math.floor(st.size / 50000)); score += Math.min(20, Math.floor(st.mtimeMs / 100000000000)); } catch (_e) {}
  return score;
}
function listCandidateScripts(dir) {
  const out = [];
  if (!dir || !fs.existsSync(dir)) return out;
  let entries = [];
  try { entries = fs.readdirSync(dir); } catch (_e) { return out; }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    let st;
    try { st = fs.statSync(full); } catch (_e) { continue; }
    if (!st.isFile() || !isLikelyScriptFile(entry)) continue;
    out.push({ path: full, size: st.size, mtimeMs: st.mtimeMs, score: scoreCandidate(full) });
  }
  out.sort((a,b) => (b.score-a.score) || (b.mtimeMs-a.mtimeMs) || (b.size-a.size));
  return out;
}
function resolveScriptPath(explicit, options = {}) {
  const cwd = options.cwd || process.cwd();
  const tried = [];
  function check(candidate, label) {
    if (!candidate) return '';
    const resolved = path.resolve(cwd, candidate);
    tried.push(`${label || 'candidate'}: ${resolved}`);
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
    return '';
  }
  const fromExplicit = check(explicit, 'explicit --script');
  if (fromExplicit) return { scriptPath: fromExplicit, source: 'explicit', tried };
  const fromEnv = check(process.env.AIDRPG_SCRIPT, 'AIDRPG_SCRIPT');
  if (fromEnv) return { scriptPath: fromEnv, source: 'env', tried };
  const localDefault = check(path.join(cwd, 'aidrpg-script.js'), 'default');
  if (localDefault) return { scriptPath: localDefault, source: 'default', tried };
  const dirs = Array.from(new Set([cwd, path.dirname(cwd), '/mnt/data'].filter(Boolean)));
  const candidates = [];
  for (const dir of dirs) candidates.push(...listCandidateScripts(dir));
  if (candidates.length) return { scriptPath: candidates[0].path, source: 'auto', candidates, tried };
  return { scriptPath: '', source: 'missing', candidates: [], tried };
}
module.exports = { resolveScriptPath, listCandidateScripts };
