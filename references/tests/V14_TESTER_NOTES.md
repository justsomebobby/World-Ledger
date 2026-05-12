# AIDRPG Final AI Dungeon Stress Tester v1.4 Notes

This v1.4 tester is a wrapper and custom harness built on top of the v1.3 official tester.
It does **not** replace the official suites. It adds a more reliable way to run them under
ChatGPT/container constraints and adds a targeted AI Dungeon play-loop harness.

## Why v1.4 exists

The late v1.3 testing cycle repeatedly wasted time on the same harness problems:

- long all-in-one runs made the container look hung;
- stdout/stderr buffering made partial progress hard to trust;
- Python subprocess wrappers added another failure mode;
- a single stalled category could prevent later categories from running;
- broad phrase grids produced many duplicate failures from one root cause;
- shallow preflight passes were not enough to support a final verdict.

v1.4 fixes the test process rather than changing the game script.

## Main design changes

1. **Node-only supervised runner**
   - `run_v14_all.js` uses Node child processes directly.
   - No Python wrapper is required.
   - stdout and stderr are written to files, not held in memory.

2. **Sectioned official suites**
   - Official v1.3 suites are run one at a time.
   - Every suite gets its own `.out`, `.err`, `.json`, and `.md` report.
   - A timeout is recorded as a harness/runtime risk, not silently counted as a pass.

3. **Custom AI Dungeon play-loop harness**
   - `runner14.js` tests the rule: player input proposes; story output confirms, denies, delays, quotes, or modifies.
   - The custom suite focuses on denied actions, delayed confirmation, dialogue instructions, quoted second-person text, exact named abilities, scene denial, quest denial, time denial, reputation, card sync, sword flow, chaotic play, and context pressure.

4. **Incremental progress files**
   - Custom progress is written to `reports/v14/custom/progress.ndjson` after every case.
   - Partial summaries are written during the run.
   - If a tool timeout interrupts the run, the completed work is still readable.

5. **Root-cause grouping**
   - Final summaries group failures by system and category.
   - This avoids treating 200 repeated inventory-denial failures as 200 unrelated bugs.

## Recommended commands

From inside the unzipped tester folder:

```bash
node run_v14_all.js --script /path/to/latest-aidrpg-script.txt --quick
```

For a serious candidate:

```bash
node run_v14_all.js --script /path/to/latest-aidrpg-script.txt --custom-preset standard
```

For a larger final pass:

```bash
node run_v14_all.js --script /path/to/latest-aidrpg-script.txt --full
```

Custom-only focused categories:

```bash
node runner14.js --script ./aidrpg-script.js --category inventory-denial
node runner14.js --script ./aidrpg-script.js --category ability-confirm-deny
node runner14.js --script ./aidrpg-script.js --category sword-flow --include-passed
```

## Output files

- `reports/v14/final_summary.md`
- `reports/v14/final_summary.json`
- `reports/v14/official/*.json`
- `reports/v14/official/*.md`
- `reports/v14/official/*.out`
- `reports/v14/official/*.err`
- `reports/v14/custom/summary.md`
- `reports/v14/custom/summary.json`
- `reports/v14/custom/results.json`
- `reports/v14/custom/progress.ndjson`

## Important interpretation rule

A process timeout means: "the local tester command did not finish under the assigned harness budget."
It does not automatically mean the AIDRPG script failed a gameplay assertion.
Only failed assertions in a report should be treated as gameplay/script failures.

## Custom categories

- `smoke-loop`
- `input-only`
- `confirmed-inventory`
- `inventory-denial`
- `delayed-confirmation`
- `dialogue-instruction`
- `quest-confirm-deny`
- `scene-confirm-deny`
- `ability-confirm-deny`
- `anime-style`
- `time-confirm-deny`
- `reputation`
- `story-cards`
- `sword-flow`
- `context-pressure`
- `chaotic`
- `long-play`

## Final-report philosophy

The report should classify each issue as:

- `CURRENT_BLOCKER`
- `CURRENT_WARNING`
- `FUTURE_EXPECTATION`
- `TESTER_LIMITATION`

The goal is concise, copyable feedback: exact repro, expected behavior, actual behavior, and patch area.
