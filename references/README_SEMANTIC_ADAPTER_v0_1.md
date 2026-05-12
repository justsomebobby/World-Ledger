# AIDRPG UTM2 Semantic Selector Adapter v0.1

This package turns the UTM2 matrix from hook-smoke testing into semantic selector testing.

It is intentionally shard/chunk oriented. Do **not** ask a model to run all 1,440 cases in one response. Use small chunks and aggregate the output files.

## Files

- `utm2_semantic_shard_runner.js` — runs a full shard when local tooling is stable. In ChatGPT, prefer the chunk runner.
- `utm2_semantic_chunk_runner.js` — runs a shard slice with `--offset` and `--limit`.
- `utm2_semantic_aggregate_results.js` — combines JSONL chunk results into summary JSON, CSV, failure JSONL, and Markdown.
- `selector_adapter_coverage.csv` — lists every selector and whether it has a real, heuristic, permissive, or not-evaluated adapter.

## Recommended ChatGPT-safe protocol

Use multi-run mode.

A category is two shards:

- INV: shards 001-002
- ABL: shards 003-004
- TIM: shards 005-006
- REP: shards 007-008
- QST: shards 009-010
- SCN: shards 011-012
- MEM: shards 013-014
- BDY: shards 015-016
- TRN: shards 017-018
- CRD: shards 019-020
- STA: shards 021-022
- CTX: shards 023-024

For ChatGPT, run 4 to 8 cases per turn. For local Node, use larger chunks only after confirming stability.

Example chunk command:

```bash
node utm2_semantic_chunk_runner.js \
  --script /mnt/data/aidrpgv1-3-8.txt \
  --matrix-dir /mnt/data/aidrpg_ultimate_matrix_v2/jsonl_shards \
  --shard 001 \
  --offset 0 \
  --limit 4 \
  --out-dir /mnt/data/utm2_semantic_run
```

Then continue:

```bash
node utm2_semantic_chunk_runner.js --shard 001 --offset 4 --limit 4 --out-dir /mnt/data/utm2_semantic_run
node utm2_semantic_chunk_runner.js --shard 001 --offset 8 --limit 4 --out-dir /mnt/data/utm2_semantic_run
```

After any batch, aggregate:

```bash
node utm2_semantic_aggregate_results.js \
  --in-dir /mnt/data/utm2_semantic_run \
  --out-dir /mnt/data/utm2_semantic_run
```

## Feedback contract

Every report must include:

1. Script tested.
2. Matrix version.
3. Exact shard/offset/limit chunks run.
4. Row count and unique test ID count.
5. Pass/fail/partial/hook-fail counts.
6. Full failure rows with:
   - test ID
   - player input
   - simulated AI output
   - expected checks
   - actual evidence
   - suspected script issue vs matrix expectation issue
7. A CSV or JSONL file containing every tested row.
8. Not-evaluated selector count. Never report those as passes.

## Interpretation rules

- `pass`: all hook and semantic checks passed.
- `fail`: at least one semantic selector failed.
- `hook_fail`: the hook crashed, timed out, returned unsafe output, or exceeded timeout.
- `partial`: at least one selector is not measurable by this adapter.
- `not_evaluated`: a specific check could not be measured. Do not count it as pass.

## Known v0.1 caveat

`runtime.memory_mb` is not measured. Node cannot directly see AI Dungeon per-hook sandbox memory, so those checks are marked `not_evaluated`.

Some card/reputation/witness selectors are heuristic because the script stores those concepts in several possible structures. Failures in those areas should be read before patching.
