const fs = require('fs');
const path = require('path');
const { getPatchZone } = require('./source-locator');

const SYSTEM_HINTS = [
  ['items', 'InventorySystem'], ['inventory', 'InventorySystem'], ['equipment', 'InventorySystem'], ['currency', 'InventorySystem'],
  ['abilities', 'AbilitySystem'], ['persistentTraits', 'PersistentTraitSystem'], ['conditions', 'PersistentTraitSystem'],
  ['actors', 'ActorProfileSystem'], ['actor', 'ActorProfileSystem'],
  ['world.currentScene', 'SceneStateSystem'], ['currentScene', 'SceneStateSystem'],
  ['world.locations', 'WorldEntitySystem'], ['locationsById', 'WorldEntitySystem'], ['entitiesById', 'WorldEntitySystem'], ['routes', 'WorldEntitySystem'],
  ['time', 'TimeTravelSystem'], ['quests', 'QuestLogSystem'], ['reputation', 'ReputationSystem'],
  ['cache.scenePacket', 'ContextPacketSystem'], ['cache.playerPacket', 'ContextPacketSystem'], ['cache.actorPacket', 'ContextPacketSystem'], ['lastReturn.text', 'ContextPacketSystem'],
  ['pending.validatedConsequences', 'ValidationSystem'], ['validatedConsequences', 'ValidationSystem'],
  ['pending.consequenceCandidates', 'ConsequenceParser'], ['candidate', 'ConsequenceParser'],
  ['pending.inputIntent', 'IntentParser'], ['inputIntent', 'IntentParser'],
  ['meta.currentTurn', 'TurnEngine'], ['meta.lastAppliedOutputHash', 'TurnEngine'], ['turnScratch', 'TurnEngine'],
  ['player', 'PlayerSystem'], ['build', 'BuildIdentitySystem'], ['storyCards', 'CardSyncSystem']
];

function likelySystemFromPath(pathText = '') {
  const p = String(pathText || '');
  for (const [needle, system] of SYSTEM_HINTS) {
    if (p.includes(needle)) return system;
  }
  return 'Unknown / Cross-System';
}

function likelySystemFromResult(result) {
  if (result.expectedSystem) return result.expectedSystem;
  const failed = (result.assertions || []).filter(a => !a.passed);
  const first = failed[0];
  if (first && first.path) return likelySystemFromPath(first.path);
  const s = String(result.suite || '').toLowerCase();
  if (s.includes('inventory')) return 'InventorySystem';
  if (s.includes('intent')) return 'IntentParser';
  if (s.includes('time')) return 'TimeTravelSystem';
  if (s.includes('context')) return 'ContextPacketSystem';
  if (s.includes('actor')) return 'ActorProfileSystem';
  if (s.includes('ability')) return 'AbilitySystem';
  if (s.includes('scene')) return 'SceneStateSystem';
  if (s.includes('world')) return 'WorldEntitySystem';
  if (s.includes('validation')) return 'ValidationSystem';
  return 'Unknown / Cross-System';
}

function summarizeFailure(test) {
  const failed = (test.assertions || []).filter(a => !a.passed);
  const system = likelySystemFromResult(test);
  let severity = 'Low';
  if (test.errors && test.errors.length) severity = 'High';
  else if (failed.some(a => ['noRuntimeErrors','validHookReturn','exists','objectHasKeys'].includes(a.type))) severity = 'High';
  else if (failed.length) severity = test.severity || 'Medium';
  const confidence = (test.errors && test.errors.length) || failed.length ? 'Medium' : 'Low';
  return { system, severity, confidence };
}

function assertionLine(a) {
  let line = `- Assertion failed: ${a.type}`;
  if (a.path) line += ` on \`${a.path}\``;
  if ('expected' in a) line += ` | expected: ${JSON.stringify(a.expected)}`;
  if ('min' in a || 'max' in a) line += ` | range: ${a.min}..${a.max}`;
  line += ` | actual: ${String(JSON.stringify(a.actual) ?? 'undefined').slice(0, 1400)}`;
  if (a.error) line += ` | error: ${a.error}`;
  return line;
}

function writeReports(results, options = {}) {
  const reportDir = options.reportDir || path.join(process.cwd(), 'reports');
  const scriptPath = options.scriptPath || path.join(process.cwd(), 'aidrpg-script.js');
  fs.mkdirSync(reportDir, { recursive: true });

  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;
  const failures = results.filter(r => !r.passed);
  const suspicious = results.filter(r => r.suspicious && r.passed).length;


  const maturityGroups = {};
  for (const f of failures) {
    const m = f.maturity || 'UNLABELED';
    if (!maturityGroups[m]) maturityGroups[m] = [];
    maturityGroups[m].push(f);
  }

  const grouped = {};
  for (const f of failures) {
    const summary = summarizeFailure(f);
    if (!grouped[summary.system]) grouped[summary.system] = [];
    grouped[summary.system].push(f);
  }

  const lines = [];
  lines.push('# AIDRPG Whole-System Tester Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Suite: ${options.suite || 'unknown'}`);
  lines.push(`Cases tested: ${results.length}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push(`Suspicious: ${suspicious}`);
  lines.push('');

  if (failures.length === 0) {
    lines.push('## Result');
    lines.push('');
    lines.push('No failing assertions were found in this run. This does not prove the whole game is perfect; it means this suite did not catch a failure. Larger limits and more generated suites can still reveal problems.');
    lines.push('');
  } else {

    lines.push('## Roadmap Maturity Breakdown');
    lines.push('');
    for (const [maturity, list] of Object.entries(maturityGroups).sort((a,b)=>b[1].length-a[1].length)) {
      lines.push(`- ${maturity}: ${list.length} failing test(s)`);
    }
    lines.push('');
    lines.push('## Recommended Fix Order');
    lines.push('');
    Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).forEach(([system, list], idx) => {
      const high = list.filter(x => summarizeFailure(x).severity === 'High').length;
      lines.push(`${idx + 1}. ${system}: ${list.length} failing test(s)${high ? `, ${high} high severity` : ''}`);
    });
    lines.push('');
  }

  for (const [system, list] of Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length)) {
    const zone = getPatchZone(scriptPath, system);
    lines.push(`## System Cluster — ${system}`);
    lines.push('');
    lines.push(`Failures in cluster: ${list.length}`);
    lines.push(zone.note || '');
    if (zone.snippet) {
      lines.push('');
      lines.push('### Likely Source Area');
      lines.push('```js');
      lines.push(zone.snippet.slice(0, 4000));
      lines.push('```');
    }
    lines.push('');
  }

  for (const result of results) {
    if (result.passed && !options.includePassed) continue;
    const summary = summarizeFailure(result);
    lines.push(`## ${result.passed ? 'PASS' : 'FAIL'} — ${result.name}`);
    lines.push('');
    lines.push(`Suite: ${result.suite || 'unknown'}`);
    lines.push(`Likely system: ${summary.system}`);
    if (result.maturity) lines.push(`Roadmap maturity: ${result.maturity}`);
    lines.push(`Severity: ${summary.severity}`);
    lines.push(`Confidence: ${summary.confidence}`);
    lines.push('');
    if (result.description) { lines.push('### Purpose'); lines.push(result.description); lines.push(''); }
    if (result.intendedFunction) { lines.push('### Intended function under test'); lines.push(result.intendedFunction); lines.push(''); }
    if (result.expectedOutcome) { lines.push('### Expected AI Dungeon-style outcome'); lines.push(result.expectedOutcome); lines.push(''); }
    if (result.evaluationNotes) { lines.push('### Evaluation notes'); lines.push(result.evaluationNotes); lines.push(''); }
    if (result.whyItMatters) { lines.push('### Why it matters'); lines.push(result.whyItMatters); lines.push(''); }
    if (result.steps && result.steps.length) {
      lines.push('### Minimal reproduction');
      for (const step of result.steps) lines.push(`- ${step.hook}: ${JSON.stringify(step.text || '')}`);
      lines.push('');
    }
    if (result.errors && result.errors.length) {
      lines.push('### Runtime errors');
      for (const err of result.errors) { lines.push('```text'); lines.push(String(err)); lines.push('```'); }
    }
    const failedAssertions = (result.assertions || []).filter(a => !a.passed);
    if (failedAssertions.length) {
      lines.push('### What failed');
      for (const a of failedAssertions) lines.push(assertionLine(a));
      lines.push('');
      lines.push('### What likely needs inspection');
      lines.push(result.patchHint || `Inspect ${summary.system}. The failed assertion and state diff show the expected state was not produced or exposed.`);
      lines.push('');
    }
    if (result.stateDiffs && result.stateDiffs.length) {
      lines.push('### State diffs');
      lines.push('```json');
      lines.push(JSON.stringify(result.stateDiffs.slice(0, 35), null, 2));
      lines.push('```');
      lines.push('');
    }
    if (result.debugOutputs && result.debugOutputs.length) {
      lines.push('### Debug output samples');
      for (const d of result.debugOutputs.slice(0, 3)) {
        lines.push(`#### ${d.command}`); lines.push('```text'); lines.push(String(d.text || '').slice(0, 1800)); lines.push('```');
      }
      lines.push('');
    }
  }

  const latestMd = path.join(reportDir, 'latest-report.md');
  const latestJson = path.join(reportDir, 'latest-report.json');
  const failuresJson = path.join(reportDir, 'failures-only.json');
  const aiReview = path.join(reportDir, 'ai-review-package.md');
  const patchTargets = path.join(reportDir, 'patch-targets.md');

  fs.writeFileSync(latestMd, lines.join('\n'));
  fs.writeFileSync(latestJson, JSON.stringify(results, null, 2));
  fs.writeFileSync(failuresJson, JSON.stringify(failures, null, 2));

  const patchLines = ['# Patch Targets', '', `Suite: ${options.suite || 'unknown'}`, `Failures: ${failures.length}`, ''];
  Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).forEach(([system, list], idx) => {
    const zone = getPatchZone(scriptPath, system);
    patchLines.push(`## ${idx + 1}. ${system}`);
    patchLines.push(`Failures: ${list.length}`);
    patchLines.push(zone.note || '');
    patchLines.push('Representative failures:');
    for (const f of list.slice(0, 5)) patchLines.push(`- ${f.name}`);
    if (zone.snippet) { patchLines.push('```js'); patchLines.push(zone.snippet.slice(0, 2500)); patchLines.push('```'); }
    patchLines.push('');
  });
  fs.writeFileSync(patchTargets, patchLines.join('\n'));

  const aiLines = [];
  aiLines.push('# AI Review Package');
  aiLines.push('');
  aiLines.push('Use this to ask ChatGPT for patch guidance. Focus on high severity and avoid whole-library rewrites.');
  aiLines.push('');
  aiLines.push(`Suite: ${options.suite || 'unknown'}`);
  aiLines.push(`Cases tested: ${results.length}`);
  aiLines.push(`Failures: ${failures.length}`);
  aiLines.push('');
  Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).forEach(([system, list]) => {
    aiLines.push(`## ${system} (${list.length} failures)`);
    for (const f of list.slice(0, 8)) {
      aiLines.push(`### ${f.name}`);
      if (f.description) aiLines.push(`Purpose: ${f.description}`);
      if (f.maturity) aiLines.push(`Roadmap maturity: ${f.maturity}`);
      aiLines.push('Reproduction:');
      for (const step of f.steps || []) aiLines.push(`- ${step.hook}: ${JSON.stringify(step.text || '')}`);
      aiLines.push('Failed assertions:');
      for (const a of (f.assertions || []).filter(x=>!x.passed)) aiLines.push(assertionLine(a));
      aiLines.push('');
    }
  });
  fs.writeFileSync(aiReview, aiLines.join('\n'));

  return { latestMd, latestJson, failuresJson, aiReview, patchTargets };
}

module.exports = { writeReports, likelySystemFromPath };
