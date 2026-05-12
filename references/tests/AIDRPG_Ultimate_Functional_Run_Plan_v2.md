# AIDRPG UTM2 Run Plan

## Goal

Run 1,440 proposed player-breaker variants safely without overwhelming a ChatGPT/tool execution session.

## Primary rule

Run one shard at a time. Each shard has 60 cases and approximately 180 hook calls.

## Recommended order

1. Run all control shards by category if your runner supports filtering.
2. Run player realism shards.
3. Run pop-culture/anime/book trope shards.
4. Run chaos-breaker shards.
5. Re-run any failed category with per-case isolation and full state dumps.

## Safe shard loop

```bash
for f in jsonl_shards/AIDRPG_UTM2_shard_*.jsonl; do
  node run_matrix_shard.js --script ./aidrpgv1-3-8.txt --matrix "$f" --isolated --timeout-ms 1800 --report "reports/$(basename "$f" .jsonl).json"
done
```

If running inside ChatGPT or a similarly constrained tool environment, do not use the loop. Run these manually one shard at a time.

## Failure artifact required

For every failure, capture:

- test_id
- fixture_id
- player_input
- simulated_ai_output
- hook that failed
- exception or timeout text
- final state snapshot
- failed check selector/op/target/value
- related logs
- context packet excerpt

## Release gate suggestion

Do not call a version final until:

- all 24 shards pass once in isolated mode
- all high/critical priority cases pass twice
- a 500+ turn campaign simulation has no unbounded state growth
- all failures are converted into permanent regression tests
