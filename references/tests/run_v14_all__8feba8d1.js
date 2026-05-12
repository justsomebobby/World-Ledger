#!/usr/bin/env node
/*
  AIDRPG v1.4 supervised test launcher.

  Runs official v1.3 suites in small isolated subprocesses, captures stdout/stderr
  to files, copies each JSON/MD report immediately, then runs the v1.4 custom
  AI Dungeon play-loop harness. This avoids the repeated problem where one long
  suite or stdout pipe makes the whole chat/tool run look hung.
*/

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function parseArgs(argv) {
  const args = {
    script: '',
    out: path.join(process.cwd(), 'reports', 'v14'),
    official: true,
    custom: true,
    customPreset: 'standard',
    officialTimeoutMs: 70000,
    customTimeoutMs: 90000,
    includePassed: false,
    quick: false,
    full: false
  };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--script') args.script = argv[++i] || '';
    else if (a === '--out') args.out = argv[++i] || args.out;
    else if (a === '--no-official') args.official = false;
    else if (a === '--no-custom') args.custom = false;
    else if (a === '--custom-preset') args.customPreset = argv[++i] || args.customPreset;
    else if (a === '--official-timeout-ms') args.officialTimeoutMs = Number(argv[++i] || args.officialTimeoutMs) || args.officialTimeoutMs;
    else if (a === '--custom-timeout-ms') args.customTimeoutMs = Number(argv[++i] || args.customTimeoutMs) || args.customTimeoutMs;
    else if (a === '--include-passed') args.includePassed = true;
    else if (a === '--quick') args.quick = true;
    else if (a === '--full') { args.full = true; args.customPreset = 'full'; }
    else if (a === '--help' || a === '-h') args.help = true;
  }
  return args;
}

function help() {
  console.log(`AIDRPG v1.4 supervised tester

Usage:
  node run_v14_all.js --script /mnt/data/aidrpgv1-3-3.txt
  node run_v14_all.js --script ./my-script.txt --quick
  node run_v14_all.js --script ./my-script.txt --full
  node run_v14_all.js --no-official --custom-preset standard

Outputs:
  reports/v14/final_summary.md
  reports/v14/final_summary.json
  reports/v14/official/*.json|*.md|*.out|*.err
  reports/v14/custom/summary.md|summary.json|progress.ndjson`);
}

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function copyIfExists(src, dst) { if (fs.existsSync(src)) fs.copyFileSync(src, dst); }
function safeReadJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_e) { return null; } }

function runProcess(cmd, args, options) {
  return new Promise(resolve => {
    mkdirp(path.dirname(options.stdoutPath));
    const out = fs.openSync(options.stdoutPath, 'w');
    const err = fs.openSync(options.stderrPath, 'w');
    const child = spawn(cmd, args, { cwd: options.cwd, stdio: ['ignore', out, err], windowsHide: true });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill('SIGTERM'); } catch (_e) {}
      setTimeout(() => { try { child.kill('SIGKILL'); } catch (_e) {} }, 1500).unref();
    }, options.timeoutMs);
    child.on('exit', (code, signal) => {
      clearTimeout(timer);
      try { fs.closeSync(out); } catch (_e) {}
      try { fs.closeSync(err); } catch (_e) {}
      resolve({ code, signal, timedOut, stdoutPath: options.stdoutPath, stderrPath: options.stderrPath });
    });
  });
}

function officialSuitePlan(args) {
  const preflight = [
    ['smoke', ['--suite', 'smoke', '--include-passed']],
    ['ai-dungeon-final', ['--suite', 'ai-dungeon-final', '--include-passed']],
    ['storycard-api', ['--suite', 'storycard-api', '--include-passed']],
    ['wrapper-compat', ['--suite', 'wrapper-compat', '--include-passed']],
    ['sandbox-guards', ['--suite', 'sandbox-guards', '--include-passed']],
    ['core', ['--suite', 'core', '--include-passed']],
    ['intent', ['--suite', 'intent', '--include-passed']],
    ['inventory', ['--suite', 'inventory', '--include-passed']],
    ['regressions', ['--suite', 'regressions', '--include-passed']]
  ];
  if (args.quick) return preflight.concat([
    ['adventure-context-pressure', ['--suite', 'adventure-context-pressure', '--generated-only', '--limit', '50']],
    ['adventure-negative', ['--suite', 'adventure-negative', '--generated-only', '--limit', '80']]
  ]);
  const sectioned = [
    ['time', ['--suite', 'time', '--include-passed']],
    ['scene', ['--suite', 'scene', '--include-passed']],
    ['world', ['--suite', 'world', '--include-passed']],
    ['abilities', ['--suite', 'abilities', '--include-passed']],
    ['actors', ['--suite', 'actors', '--include-passed']],
    ['npc-deep', ['--suite', 'npc-deep', '--limit', '50']],
    ['dungeon-run', ['--suite', 'dungeon-run', '--include-passed']],
    ['dungeon-branches', ['--suite', 'dungeon-branches', '--include-passed']],
    ['dungeon-ability', ['--suite', 'dungeon-ability', '--include-passed']],
    ['dungeon-combat', ['--suite', 'dungeon-combat', '--include-passed']],
    ['dungeon-full', ['--suite', 'dungeon-full', '--include-passed']],
    ['adventure-baseline', ['--suite', 'adventure-baseline', '--generated-only', '--include-passed']],
    ['adventure-scene', ['--suite', 'adventure-scene', '--generated-only', '--limit', args.full ? '150' : '80']],
    ['adventure-inventory', ['--suite', 'adventure-inventory', '--generated-only', '--limit', args.full ? '100' : '80']],
    ['adventure-injury', ['--suite', 'adventure-injury', '--generated-only', '--limit', '80']],
    ['adventure-healing', ['--suite', 'adventure-healing', '--generated-only', '--limit', '80']],
    ['adventure-ability', ['--suite', 'adventure-ability', '--generated-only', '--limit', '100']],
    ['adventure-combat', ['--suite', 'adventure-combat', '--generated-only', '--limit', '80']],
    ['adventure-economy', ['--suite', 'adventure-economy', '--generated-only', '--limit', '80']],
    ['adventure-time', ['--suite', 'adventure-time', '--generated-only', '--limit', '80']],
    ['adventure-context-pressure', ['--suite', 'adventure-context-pressure', '--generated-only', '--limit', args.full ? '100' : '80']],
    ['adventure-negative', ['--suite', 'adventure-negative', '--generated-only', '--limit', args.full ? '150' : '120']],
    ['adventure-death-boundary', ['--suite', 'adventure-death-boundary', '--generated-only', '--limit', '80']],
    ['adventure-stress', ['--suite', 'adventure-stress', '--generated-only', '--limit', args.full ? '661' : '250']],
    ['true-adventure', ['--suite', 'true-adventure', '--generated-only', '--limit', args.full ? '661' : '250']]
  ];
  return preflight.concat(sectioned);
}

async function runOfficial(args, summary) {
  const officialDir = path.join(args.out, 'official');
  mkdirp(officialDir);
  const suites = officialSuitePlan(args);
  const runner = path.join(process.cwd(), 'runner.js');
  for (const [name, suiteArgs] of suites) {
    const started = Date.now();
    const res = await runProcess('node', [runner, ...suiteArgs], {
      cwd: process.cwd(),
      timeoutMs: args.officialTimeoutMs,
      stdoutPath: path.join(officialDir, `${name}.out`),
      stderrPath: path.join(officialDir, `${name}.err`)
    });
    const latestJson = path.join(process.cwd(), 'reports', 'latest-report.json');
    const latestMd = path.join(process.cwd(), 'reports', 'latest-report.md');
    const jsonCopy = path.join(officialDir, `${name}.json`);
    const mdCopy = path.join(officialDir, `${name}.md`);
    copyIfExists(latestJson, jsonCopy);
    copyIfExists(latestMd, mdCopy);
    const data = safeReadJson(jsonCopy);
    const total = Array.isArray(data) ? data.length : 0;
    const passed = Array.isArray(data) ? data.filter(x => x && x.passed).length : 0;
    const failed = total - passed;
    const maxHookMs = Array.isArray(data) ? data.reduce((m, r) => Math.max(m, ...(Array.isArray(r.hookDurations) ? r.hookDurations.map(d => Number(d.durationMs || 0)) : [0])), 0) : 0;
    summary.official.push({ name, args: suiteArgs, code: res.code, signal: res.signal, timedOut: res.timedOut, durationMs: Date.now() - started, total, passed, failed, maxHookMs, report: jsonCopy });
    fs.writeFileSync(path.join(args.out, 'official_progress.json'), JSON.stringify(summary.official, null, 2));
  }
}

async function runCustom(args, summary) {
  const customDir = path.join(args.out, 'custom');
  mkdirp(customDir);
  const runner = path.join(process.cwd(), 'runner14.js');
  const customArgs = [runner, '--script', path.join(process.cwd(), 'aidrpg-script.js'), '--preset', args.customPreset, '--out', customDir, '--progress-every', '20'];
  if (args.includePassed) customArgs.push('--include-passed');
  const res = await runProcess('node', customArgs, {
    cwd: process.cwd(),
    timeoutMs: args.customTimeoutMs,
    stdoutPath: path.join(customDir, 'runner14.out'),
    stderrPath: path.join(customDir, 'runner14.err')
  });
  const customSummary = safeReadJson(path.join(customDir, 'summary.json')) || {};
  summary.custom = Object.assign({ code: res.code, signal: res.signal, timedOut: res.timedOut }, customSummary);
}

function writeFinalSummary(args, summary) {
  const officialTotal = summary.official.reduce((n, s) => n + Number(s.total || 0), 0);
  const officialPassed = summary.official.reduce((n, s) => n + Number(s.passed || 0), 0);
  const officialFailed = officialTotal - officialPassed;
  const customTotal = Number(summary.custom.total || 0);
  const customPassed = Number(summary.custom.passed || 0);
  const customFailed = Number(summary.custom.failed || 0);
  const total = officialTotal + customTotal;
  const passed = officialPassed + customPassed;
  const failed = officialFailed + customFailed;
  const maxHookMs = Math.max(
    summary.official.reduce((m, s) => Math.max(m, Number(s.maxHookMs || 0)), 0),
    Number(summary.custom.maxHookMs || 0)
  );
  summary.totals = { total, passed, failed, officialTotal, officialPassed, officialFailed, customTotal, customPassed, customFailed, maxHookMs };
  fs.writeFileSync(path.join(args.out, 'final_summary.json'), JSON.stringify(summary, null, 2));
  const lines = [];
  lines.push('# AIDRPG v1.4 Supervised Test Summary');
  lines.push('');
  lines.push(`Generated: ${summary.generatedAt}`);
  lines.push(`Script: ${summary.script}`);
  lines.push(`Total completed checks: ${total}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push(`Max observed hook duration: ${maxHookMs} ms`);
  lines.push('');
  lines.push('## Official suite results');
  lines.push('');
  for (const s of summary.official) {
    const status = s.timedOut ? 'TIMEOUT' : (s.failed ? 'FAIL' : 'PASS');
    lines.push(`- ${status} ${s.name}: ${s.passed}/${s.total} passed, ${s.durationMs} ms${s.timedOut ? ' (process timeout/harness limit)' : ''}`);
  }
  lines.push('');
  lines.push('## Custom AI Dungeon play-loop result');
  lines.push('');
  if (summary.custom && summary.custom.total != null) {
    lines.push(`- Custom: ${customPassed}/${customTotal} passed${summary.custom.timedOut ? ' (process timeout; see custom/progress.ndjson)' : ''}`);
    if (summary.custom.failureGroups && summary.custom.failureGroups.length) {
      lines.push('');
      lines.push('### Custom failure groups');
      for (const g of summary.custom.failureGroups) {
        lines.push(`- ${g.system}: ${g.count}`);
        for (const e of (g.examples || []).slice(0, 3)) lines.push(`  - ${e.category}: ${e.name} — ${e.message}`);
      }
    }
  } else {
    lines.push('- Custom: not run or no summary produced.');
  }
  lines.push('');
  lines.push('## Interpretation rules');
  lines.push('');
  lines.push('- Official suite failures usually indicate a broad regression.');
  lines.push('- Custom play-loop failures target AI Dungeon canon semantics: input proposes, story output confirms/denies.');
  lines.push('- Process timeouts are labeled as harness/runtime risk and should not be counted as script assertion failures unless a report file shows failed assertions.');
  fs.writeFileSync(path.join(args.out, 'final_summary.md'), lines.join('\n'));
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) return help();
  mkdirp(args.out);
  if (args.script) {
    if (!fs.existsSync(args.script)) throw new Error(`Script not found: ${args.script}`);
    fs.copyFileSync(args.script, path.join(process.cwd(), 'aidrpg-script.js'));
  } else if (!fs.existsSync(path.join(process.cwd(), 'aidrpg-script.js'))) {
    throw new Error('Provide --script or place aidrpg-script.js in this folder.');
  }
  const summary = { version: '1.4.0-supervisor', generatedAt: new Date().toISOString(), script: args.script || path.join(process.cwd(), 'aidrpg-script.js'), official: [], custom: null };
  if (args.official) await runOfficial(args, summary);
  if (args.custom) await runCustom(args, summary);
  writeFinalSummary(args, summary);
  const t = summary.totals || {};
  console.log(`v1.4 supervised run done. Cases: ${t.total || 0}. Passed: ${t.passed || 0}. Failed: ${t.failed || 0}.`);
  console.log(`Report: ${path.join(args.out, 'final_summary.md')}`);
  if (t.failed) process.exitCode = 1;
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
