#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { createRuntime } = require('./runtime/fake-aid-runtime');
const { diffValues } = require('./runtime/state-snapshot');
const { evaluateAssertion } = require('./runtime/assertions');
const { writeReports } = require('./runtime/report-writer');
const { getGeneratedTests } = require('./generators/whole-system-generator');
const { getRedlineTests } = require('./generators/redline-generator');
const { getDungeonTests } = require('./generators/dungeon-runner-generator');
const { getAdventureTests } = require('./generators/adventure-simulation-generator');
const { getFinalAiDungeonCompatibilityTests } = require('./generators/final-ai-dungeon-compat-generator');
const { resolveScriptPath } = require('./runtime/script-resolver');

function parseArgs(argv) {
  const args = { suite: 'smoke', script: '', limit: null, includePassed: false, rerunFailures: false, generatedOnly: false, staticOnly: false, hookTimeoutMs: 2000, scriptTimeoutMs: 2500, maxHistory: 120 };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--script') args.script = argv[++i] || '';
    else if (arg === '--suite') args.suite = argv[++i] || 'smoke';
    else if (arg === '--limit') args.limit = Number(argv[++i] || 0) || null;
    else if (arg === '--include-passed') args.includePassed = true;
    else if (arg === '--rerun-failures') args.rerunFailures = true;
    else if (arg === '--generated-only') args.generatedOnly = true;
    else if (arg === '--static-only') args.staticOnly = true;
    else if (arg === '--hook-timeout-ms') args.hookTimeoutMs = Number(argv[++i] || args.hookTimeoutMs) || args.hookTimeoutMs;
    else if (arg === '--script-timeout-ms') args.scriptTimeoutMs = Number(argv[++i] || args.scriptTimeoutMs) || args.scriptTimeoutMs;
    else if (arg === '--max-history') args.maxHistory = Number(argv[++i] || args.maxHistory) || args.maxHistory;
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

function showHelp() {
  console.log(`AIDRPG Final AI Dungeon Adventure Stress Tester v1.4

Usage:
  node runner.js --suite smoke
  node runner.js --script /path/to/aidrpg-script.txt --suite smoke
  node runner.js --suite core
  node runner.js --suite intent
  node runner.js --suite inventory --limit 100
  node runner.js --suite context
  node runner.js --suite integration
  node runner.js --suite full --limit 300
  node runner.js --suite all --limit 300
  node runner.js --suite npc --limit 200
  node runner.js --suite aid-runtime
  node runner.js --suite context-pressure
  node runner.js --suite story-cards
  node runner.js --suite npc-deep --limit 200
  node runner.js --suite simulation --limit 200
  node runner.js --suite deep --limit 500
  node runner.js --rerun-failures

Suites:
  smoke, core, intent, player, inventory, time, scene, world, abilities, traits,
  context, actors, npc, npc-deep, aid-runtime, context-pressure, story-cards, action-modes, mode-semantics, validation, integration, simulation, deep, dungeon-run, dungeon-branches, dungeon-ability, dungeon-combat, dungeon-full, adventure-baseline, adventure-scene, adventure-inventory, adventure-injury, adventure-healing, adventure-ability, adventure-combat, adventure-economy, adventure-time, adventure-context-pressure, adventure-negative, adventure-death-boundary, adventure-stress, true-adventure, ai-dungeon-final, storycard-api, wrapper-compat, sandbox-guards, regressions, full/all
`);
}

function loadJsonTestsFromDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  const out = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const parsed = JSON.parse(fs.readFileSync(full, 'utf8'));
    if (Array.isArray(parsed)) out.push(...parsed);
    else if (parsed && Array.isArray(parsed.tests)) out.push(...parsed.tests);
  }
  return out;
}

function getStaticTestsForSuite(suite) {
  const root = process.cwd();
  const suitesDir = path.join(root, 'suites');
  let tests = [];
  if (!fs.existsSync(suitesDir)) return tests;
  const normalized = suite === 'full' ? 'all' : suite;
  if (normalized === 'all') {
    const names = fs.readdirSync(suitesDir).filter(f => fs.statSync(path.join(suitesDir, f)).isDirectory());
    for (const name of names) tests.push(...loadJsonTestsFromDir(path.join(suitesDir, name)));
  } else if (normalized === 'core') {
    tests.push(...loadJsonTestsFromDir(path.join(suitesDir, 'core-state')));
    tests.push(...loadJsonTestsFromDir(path.join(suitesDir, 'turn-engine')));
  } else {
    tests.push(...loadJsonTestsFromDir(path.join(suitesDir, normalized)));
  }
  return tests;
}

function getTestsForSuite(args) {
  const suite = args.suite === 'all' ? 'full' : args.suite;
  let tests = [];
  if (!args.generatedOnly) tests.push(...getStaticTestsForSuite(suite));
  if (!args.staticOnly) {
    const generatedFinalCompatibilityTests = getFinalAiDungeonCompatibilityTests(suite, { limit: args.limit });
    const generatedAdventureTests = getAdventureTests(suite, { limit: args.limit });
    const generatedStressTests = getRedlineTests(suite, { limit: args.limit });
    const generatedDungeonTests = getDungeonTests(suite, { limit: args.limit });
    if (generatedFinalCompatibilityTests.length) tests.push(...generatedFinalCompatibilityTests);
    else if (generatedAdventureTests.length) tests.push(...generatedAdventureTests);
    else if (generatedStressTests.length) tests.push(...generatedStressTests);
    else if (generatedDungeonTests.length) tests.push(...generatedDungeonTests);
    else tests.push(...getGeneratedTests(suite, { limit: args.limit }));
  }

  const seen = new Set();
  tests = tests.filter(t => {
    const key = `${t.suite || ''}:${t.name || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (args.limit && tests.length > args.limit && suite !== 'inventory') tests = tests.slice(0, args.limit);
  return tests;
}

function normalizeTest(test) {
  return Object.assign({
    name: '(unnamed test)', suite: 'unknown', initialState: {}, initialInfo: {}, initialHistory: [], initialStoryCards: [], initialMemory: {}, steps: [], assertions: []
  }, test);
}

function runTest(rawTest, scriptPath, runtimeOptions = {}) {
  const test = normalizeTest(rawTest);
  const runtime = createRuntime({
    state: test.initialState || {},
    info: test.initialInfo || {},
    history: test.initialHistory || [],
    storyCards: test.initialStoryCards || [],
    memory: test.initialMemory || {},
    hookTimeoutMs: runtimeOptions.hookTimeoutMs || 2000,
    scriptTimeoutMs: runtimeOptions.scriptTimeoutMs || 2500,
    maxHistory: runtimeOptions.maxHistory || 120
  });

  const result = {
    name: test.name,
    suite: test.suite,
    expectedSystem: test.expectedSystem || '',
    description: test.description || '',
    whyItMatters: test.whyItMatters || '',
    patchHint: test.patchHint || '',
    severity: test.severity || '',
    maturity: test.maturity || 'UNLABELED',
    intendedFunction: test.intendedFunction || '',
    expectedOutcome: test.expectedOutcome || '',
    evaluationNotes: test.evaluationNotes || '',
    passed: true,
    steps: [],
    assertions: [],
    errors: [],
    stateDiffs: [],
    hookDurations: [],
    debugOutputs: [],
    logs: [],
    storyCardOps: []
  };

  try {
    runtime.loadScript(scriptPath);
  } catch (err) {
    result.passed = false;
    result.errors.push(String(err && err.stack ? err.stack : err));
    return result;
  }

  for (const step of test.steps || []) {
    const before = runtime.snapshot();
    let hookReturn = null;
    const startMs = Date.now();
    try {
      if (step.hook === 'eval') {
        hookReturn = runtime.runEval(step.code || step.text || '', step.label || 'eval-step');
      } else {
        hookReturn = runtime.runHook(step.hook, step.text || '');
        if (step.addHistory !== false && (step.hook === 'input' || step.hook === 'output')) {
          const defaultHistoryType = step.hook === 'input' ? 'do' : 'story';
          runtime.addHistory(step.historyType || defaultHistoryType, step.text || '');
        }
      }
      result.lastReturn = hookReturn;
      runtime.context.lastReturn = hookReturn;
    } catch (err) {
      result.passed = false;
      result.errors.push(String(err && err.stack ? err.stack : err));
    }
    const durationMs = Date.now() - startMs;
    result.hookDurations.push({ hook: step.hook, text: String(step.text || '').slice(0, 120), durationMs });
    const after = runtime.snapshot();
    const diffs = diffValues(before.state, after.state, 'state', [], 120);
    result.stateDiffs.push(...diffs);
    result.steps.push({ hook: step.hook, text: step.text || '', returnValue: hookReturn });
    if (step.captureDebug) {
      result.debugOutputs.push({ command: step.text || '', text: hookReturn && hookReturn.text ? hookReturn.text : '' });
    }
  }

  for (const assertion of test.assertions || []) {
    const checked = evaluateAssertion(assertion, runtime, result);
    const entry = Object.assign({}, assertion, checked);
    if (!entry.passed) result.passed = false;
    result.assertions.push(entry);
  }

  // Keep reports light enough for old Chromebooks. Passing tests do not need full diffs.
  if (result.passed) result.stateDiffs = [];
  else result.stateDiffs = result.stateDiffs.slice(0, 40);
  result.logs = runtime.getLogs().slice(0, 40);
  result.storyCardOps = runtime.getStoryCardOps().slice(0, 40);
  return result;
}

function loadFailuresAsTests() {
  const failuresPath = path.join(process.cwd(), 'reports', 'failures-only.json');
  if (!fs.existsSync(failuresPath)) throw new Error('No reports/failures-only.json found. Run a suite first.');
  const previous = JSON.parse(fs.readFileSync(failuresPath, 'utf8'));
  return previous.map(f => ({
    name: f.name, suite: f.suite, expectedSystem: f.expectedSystem, description: f.description, whyItMatters: f.whyItMatters, patchHint: f.patchHint,
    steps: f.steps || [],
    assertions: (f.assertions || []).map(a => {
      const keep = { type: a.type };
      for (const key of ['path','expected','limit','min','max']) if (key in a) keep[key] = a[key];
      return keep;
    })
  }));
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) return showHelp();

  const resolved = resolveScriptPath(args.script);
  const scriptPath = resolved.scriptPath;
  if (!scriptPath || !fs.existsSync(scriptPath)) {
    console.error('Missing AIDRPG script. Pass --script /path/to/latest-script.txt, set AIDRPG_SCRIPT, or put aidrpg-script.js in this folder.');
    process.exit(1);
  }

  let tests = [];
  try {
    tests = args.rerunFailures ? loadFailuresAsTests() : getTestsForSuite(args);
  } catch (err) {
    console.error(String(err && err.stack ? err.stack : err));
    process.exit(1);
  }

  if (!tests.length) {
    console.error(`No tests found for suite: ${args.suite}`);
    process.exit(1);
  }

  const results = tests.map(t => runTest(t, scriptPath, args));
  const paths = writeReports(results, {
    suite: args.rerunFailures ? 'rerun-failures' : args.suite,
    includePassed: args.includePassed,
    reportDir: path.join(process.cwd(), 'reports'),
    scriptPath
  });

  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;
  console.log(`Done. Cases tested: ${results.length}. Passed: ${passed}. Failed: ${failed}.`);
  console.log(`Script: ${scriptPath} (${resolved.source})`);
  console.log(`Report: ${paths.latestMd}`);
  console.log(`Patch targets: ${paths.patchTargets}`);
  if (failed) console.log('Paste reports/ai-review-package.md back into ChatGPT for patch guidance.');
  process.exit(0);
}

main();
