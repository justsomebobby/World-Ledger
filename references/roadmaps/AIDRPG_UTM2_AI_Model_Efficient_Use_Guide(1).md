# AIDRPG Ultimate Functional Test Matrix v2 - AI Model Efficient Use Guide

## Purpose

This guide tells an AI assistant or tester chat exactly how to use the Ultimate Functional Test Matrix v2 without crashing, losing progress, or returning vague feedback. It is designed for the AIDRPG v1.3.8 test phase and later versions that expose the same AI Dungeon-style hooks.

The matrix is intentionally large. It contains 1,440 proposed test variants, split into 24 JSONL shards of 60 cases each. Do not try to run, summarize, or semantically analyze the entire matrix in one giant response. Use shards, save raw outputs, and report exact evidence.

## What files are in the matrix package

| File | Purpose | AI model usage |
|---|---|---|
| `AIDRPG_Ultimate_Functional_Test_Matrix_v2.jsonl` | Full 1,440-case JSONL matrix | Do not load into a chat response unless needed for validation; prefer shards. |
| `jsonl_shards/AIDRPG_UTM2_shard_###.jsonl` | 24 shards, 60 cases each | Primary unit for safe execution. |
| `AIDRPG_Ultimate_Functional_Test_Matrix_v2.csv` | Full spreadsheet-friendly table | Use for review, filtering, and cross-checking. |
| `AIDRPG_Ultimate_Functional_Test_Matrix_v2.xlsx` | Human-readable workbook | Use for planning and manual review, not execution. |
| `AIDRPG_Ultimate_Functional_Test_Fixtures_v2.json` | Fixture definitions | Load before cases to seed clean/corrupted/route/card states. |
| `AIDRPG_Ultimate_Functional_Test_Schema_v2.json` | Required field schema | Validate any mutated or added rows. |
| `AIDRPG_Ultimate_Functional_Test_Shard_Index_v2.csv` | Shard index | Use as the progress ledger. |
| `AIDRPG_Ultimate_Functional_Run_Plan_v2.md` | Basic run instructions | Use alongside this guide. |
| `validate_AIDRPG_UTM2_matrix.py` | Structural validator | Run after mutations. |

## What I tested in this chat

I ran a hook-execution smoke validation against the current `aidrpgv1-3-8.txt` script using all 24 shards.

Result:

- Shards executed: 24/24
- Matrix rows executed through hooks: 1,440/1,440
- Hook-execution smoke passes: 1,440
- Hook-execution smoke failures: 0
- Hook timeouts: 0
- Highest observed hook time: 366 ms
- Approximate total shard wall time: 66.254 seconds

Important caveat: this confirms every row is runnable through the AI Dungeon mimic input -> context -> output hook sequence without hook errors or timeouts. It does not mean every semantic `checks` selector has a completed automated evaluator. Semantic assertion runners must implement selector-specific checks such as `inventory.item_named`, `ability.named`, `scene.current`, `actor_memory.non_present_actor_knows_event`, and so on.

## Snags found while trying to run it

### Snag 1: all-in-one execution is risky

An all-in-one run attempt did not complete reliably in this environment. The safe approach is shard-by-shard execution. This is exactly why the matrix is split into 24 shards.

Do this:

```bash
node run_utm2_shards_smoke.js --shard 001 --out reports/utm2_shard001_smoke.jsonl
```

Do not do this unless running locally with a durable terminal and generous timeout:

```bash
node run_utm2_shards_smoke.js --shard all --out reports/utm2_all_smoke.jsonl
```

### Snag 2: output size can become the real crash risk

The test cases themselves are small, but detailed per-case feedback for 1,440 tests can become too large for one chat response. A model should write raw artifacts to files and only summarize the run in chat.

### Snag 3: “passed hook smoke” is not the same as “passed semantic checks”

Hook smoke means the script did not crash and the turn completed. Semantic pass means every expected check was evaluated against final state. A feedback report must label these separately.

### Snag 4: full semantic evaluation needs selector adapters

The matrix uses selectors like:

- `inventory.item_named`
- `ability.named`
- `pending.ability_candidate`
- `time.elapsed_years`
- `actor_memory.non_present_actor_knows_event`
- `cards.duplicate_count`
- `context.critical_packets`

A generic runner cannot guess all of these safely. It must map each selector to actual `state.aidrpg` paths and state summaries. If a selector is not implemented, report `not_evaluated`, not pass.


### Snag 5: raw output must be written synchronously or awaited

A quick runner that streams JSONL and exits immediately can lose the raw results file even when the summary is written. Use synchronous writes, await stream finish, or write to a temp file and rename it after the final flush. The included smoke runner uses `fs.writeFileSync` for this reason.

## Recommended multi-run protocol

Use this protocol when running in ChatGPT or another limited execution environment.

### Minimal safe unit

Run one shard per turn:

```text
Test 001 = shard 001 only
Test 002 = shard 002 only
...
Test 024 = shard 024 only
```

Each shard has 60 cases and approximately 180 hook calls. This is the safest option for avoiding lost progress.

### Faster but still reasonable unit

Run three shards per turn only if the model has already shown it can execute one shard cleanly:

```text
Test 1 = shards 001-003
Test 2 = shards 004-006
Test 3 = shards 007-009
Test 4 = shards 010-012
Test 5 = shards 013-015
Test 6 = shards 016-018
Test 7 = shards 019-021
Test 8 = shards 022-024
```

### Do not use this as a default

```text
Test 1 = all 24 shards
```

That encourages timeout, memory pressure, incomplete artifacts, or shallow feedback.

## Exact command pattern

Use a reports folder and one output file per shard.

```bash
mkdir -p reports/utm2
node run_utm2_shards_smoke.js \
  --script ./aidrpgv1-3-8.txt \
  --matrix-dir ./jsonl_shards \
  --shard 001 \
  --out reports/utm2/utm2_shard001_hook_smoke.jsonl
```

The runner should also write:

```text
reports/utm2/utm2_shard001_hook_smoke_summary.json
```

For semantic evaluation, use a separate runner or an extended version of the smoke runner:

```bash
node run_utm2_semantic_shard.js \
  --script ./aidrpgv1-3-8.txt \
  --matrix-dir ./jsonl_shards \
  --fixtures ./AIDRPG_Ultimate_Functional_Test_Fixtures_v2.json \
  --shard 001 \
  --out reports/utm2/utm2_shard001_semantic_results.jsonl \
  --csv reports/utm2/utm2_shard001_semantic_results.csv
```

## Required feedback files from any test run

Every test run should produce these files:

| File | Required? | Purpose |
|---|---:|---|
| `run_summary.md` | yes | Human-readable overview. |
| `run_summary.json` | yes | Machine-readable totals and environment. |
| `full_results.csv` | yes | Every case row, including passes. |
| `full_results.jsonl` | yes | Raw per-case records. |
| `failures.csv` | yes, even if empty | Only failed semantic/hook cases. |
| `not_evaluated.csv` | yes, if semantic runner is incomplete | Selectors that were not evaluated. |
| `progress_ledger.csv` | yes | Which shards ran and which remain. |
| `suspected_causes.md` | yes, if failures exist | Grouped root-cause analysis. |

A chat response should link these files and summarize. It should not dump thousands of rows into chat.

## Required columns for full results

Every row in `full_results.csv` should include:

| Column | Meaning |
|---|---|
| `test_id` | Matrix test ID. |
| `shard` | Shard number. |
| `category_code` | Category such as `INV`, `ABL`, `TIM`, etc. |
| `scenario_genre_code` | Genre such as `FAN`, `ANI`, `HOR`, etc. |
| `choice_group_code` | `CON`, `REA`, `POP`, or `CHA`. |
| `player_input` | Exact player input. |
| `simulated_ai_output` | Exact simulated AI output. |
| `expected_summary` | Matrix expected behavior. |
| `hook_status` | `pass`, `fail`, or `timeout`. |
| `semantic_status` | `pass`, `fail`, or `not_evaluated`. |
| `failed_checks` | JSON array of failed checks. |
| `not_evaluated_checks` | JSON array of checks that need an adapter. |
| `max_hook_ms` | Highest hook duration. |
| `state_evidence` | Relevant final state excerpt. |
| `suspected_cause` | Brief cause if failed. |
| `recommended_fix` | Brief fix direction if failed. |

## Feedback standard for failures

For every failure, include this block:

```text
Test ID:
Shard:
Category:
Genre:
Choice group:
Player input:
Simulated AI output:
Expected:
Actual evidence:
Failed check(s):
Likely system area:
Suspected cause:
Recommended fix:
Regression test status:
```

Do not say “some inventory tests failed” without listing exact test IDs and exact reproductions.

## How to mutate or expand the matrix safely

### Rule 1: never edit IDs in place without versioning

Do not overwrite old IDs. Add new IDs with a new matrix version or suffix.

Good:

```text
UTM2-INV-FAN-CHA-06
UTM2.1-INV-FAN-CHA-06
```

Bad:

```text
Change UTM2-INV-FAN-CHA-01 to mean a different test.
```

### Rule 2: mutate one dimension at a time

A good mutation changes one of these:

- genre
- player choice group
- item/ability/location name
- witness condition
- denial wording
- timing wording
- quote/hypothetical framing
- pop culture phrasing
- chaos behavior

Do not mutate all of them at once unless the point is a chaos stress case.

### Rule 3: maintain exact expected checks

Every new case must have:

- exact `player_input`
- exact `simulated_ai_output`
- exact `expected_summary`
- structured `checks`
- a clear `failure_signal`
- a fixture ID
- a shard ID

### Rule 4: shard size stays small

Keep shards at 60 cases. If you add 300 new cases, create 5 new shards. Do not create one 300-case shard.

### Rule 5: validate after every mutation batch

Run:

```bash
python validate_AIDRPG_UTM2_matrix.py
```

The validation should check:

- unique IDs
- required fields present
- valid JSONL
- valid fixture references
- shard size <= 60
- checks are arrays
- no blank player input/output

## Mutation recipes by category

### Inventory mutation ideas

- “grab for X” versus “grab X”
- “take the idea of X”
- “loot X from a corpse” versus “consider looting X”
- “X is handed to you, but you refuse”
- “X is stolen before you secure it”
- disguised objects: “the sword is actually a painted stick”

### Ability mutation ideas

- quoted ability names
- manuals/titles that mention an ability but do not teach it
- anime-style named techniques
- failed activation
- pretending to use an ability
- copying a fictional character’s move without possessing it
- repeated use spam

### Time/travel mutation ideas

- dream/vision/prophecy time skips
- quoted “twenty years pass”
- route base time versus weather delay
- contradictory route time without reason
- teleportation versus travel
- time loop reset

### Witness/memory mutation ideas

- ally present in room
- ally in party but away
- witness killed before reporting
- public crowd sees action
- hidden action with no witnesses
- rumor spreads later with uncertain source

### Chaos/player breaker mutation ideas

- player walks into walls repeatedly
- player attacks themselves
- player kills an ally in private
- player kills an ally in public
- player tries to declare god mode
- player claims they already have every item
- player speaks in slang or memes
- player writes nonsense syntax

## AI assistant prompt for future chats

Paste this when using the matrix in a new chat:

```text
You are testing AIDRPG using the Ultimate Functional Test Matrix v2. Do not produce decorative reports. Do not summarize away passes or failures. Run only the shard(s) I request. Save raw outputs to files. Return exact command(s), script filename and checksum if possible, shard number(s), total cases, hook pass/fail, semantic pass/fail, not-evaluated checks, max hook time, and links to raw CSV/JSONL/Markdown reports. For every failure, include test ID, exact player input, exact simulated AI output, expected behavior, actual state evidence, failed check, suspected cause, and recommended fix. If a semantic selector is unsupported, mark it not_evaluated instead of pass. Never claim the script is final unless all requested shards were actually run and all semantic checks were evaluated.
```

## Recommended response format from a tester chat

```text
Completed: shard 001
Script: aidrpgv1-3-8.txt
Matrix: AIDRPG-UTM-v2.0
Cases: 60
Hook smoke: 60 passed, 0 failed, 0 timed out
Semantic checks: 52 passed, 3 failed, 5 not evaluated
Max hook: 245 ms
Files: [summary.md] [full_results.csv] [failures.csv] [not_evaluated.csv] [results.jsonl]

Failures:
1. UTM2-...
   Input: ...
   Output: ...
   Expected: ...
   Actual: ...
   Suspected cause: ...
   Recommended fix: ...

Not evaluated:
- selector_name: reason adapter missing
```

## Practical release-gate interpretation

Do not interpret results as all-or-nothing without context.

| Result | Meaning |
|---|---|
| Hook smoke fails | Script or tester runtime issue. Fix before semantic analysis. |
| Hook smoke passes but semantic checks fail | Script behavior bug or expected-check bug. Inspect exact state. |
| Semantic checks are not evaluated | Tester adapter incomplete. Do not count as pass. |
| All requested semantic checks pass | Strong evidence for that shard only. |
| All 24 shards pass semantically | Strong matrix-level confidence, still not proof against every possible player. |

## Multi-run progress ledger template

Use a ledger like this and update it after every shard:

```csv
shard,status,hook_pass,hook_fail,semantic_pass,semantic_fail,not_evaluated,max_hook_ms,artifact_prefix,next_action
001,complete,60,0,0,0,0,245,utm2_shard001,run semantic adapter
002,not_started,,,,,,,,run hook smoke
```

## Current hook-smoke validation summary

The current smoke validation completed in split shard mode:

```text
24 shards complete
1,440 cases run
1,440 hook-smoke passes
0 hook-smoke failures
0 timeouts
366 ms highest observed hook time
```

This should be treated as evidence that the matrix is runnable and ChatGPT-safe when split into shards. It should not replace semantic evaluation.
