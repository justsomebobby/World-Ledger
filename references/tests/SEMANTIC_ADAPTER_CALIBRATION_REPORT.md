# UTM2 Semantic Selector Adapter v0.1 — Calibration Report

This is not a full 1,440-case semantic report yet. It is the first adapter calibration run proving that selector evaluation works and can find real semantic failures after hook-smoke passes.

## Calibration run

Script tested: `/mnt/data/aidrpgv1-3-8.txt`

Chunks run:

```bash
node utm2_semantic_chunk_runner.js --shard 001 --offset 0 --limit 4 --script /mnt/data/aidrpgv1-3-8.txt --out-dir /mnt/data/chunk004
node utm2_semantic_chunk_runner.js --shard 001 --offset 4 --limit 1 --script /mnt/data/aidrpgv1-3-8.txt --out-dir /mnt/data/chunk_case5
node utm2_semantic_aggregate_results.js --in-dir /mnt/data/utm2_semantic_calibration_v1 --out-dir /mnt/data/utm2_semantic_calibration_v1
```

## Calibration result

- Rows evaluated: 5 / 1440
- Checks evaluated: 11
- Pass: 3
- Fail: 2
- Partial: 0
- Hook fail: 0
- Adapter error: 0
- Not evaluated checks: 0
- Max hook time: 281 ms

## Findings from the calibration

### UTM2-INV-FAN-CON-03

Input:

```text
I pick up the idea of a iron key, not the actual thing.
```

Simulated AI output:

```text
The thought of a iron key amuses you, but no real item enters your bag.
```

Expected:

```text
inventory.item_named absent iron key
inventory.item_named absent for iron key
```

Actual semantic evidence:

```text
item_1_1 of a iron key key of iron iron
```

Verdict: likely real script issue. The script still grants an item when the player only picks up the idea of the item and the output denies physical acquisition.

Likely fix area: inventory acquisition parser / denial filter. Add or strengthen guards for `idea of`, `thought of`, `concept of`, `not the actual thing`, and output denial phrases such as `no real item enters your bag`.

### UTM2-INV-FAN-CON-05

Input:

```text
I refuse the fake iron key, but accept the moonlit amulet from gate guard.
```

Simulated AI output:

```text
You leave the iron key alone and accept the moonlit amulet from gate guard.
```

Expected:

```text
inventory.item_named absent moonlit amulet
actor_memory.actor_knows_event present gate guard
```

Actual semantic evidence:

```text
No actor memory record for gate guard was created.
```

Verdict: adapter found no witness memory. This may be a real gap if the desired behavior is that visible witnesses are recorded. However, this case also deserves matrix review because the expected inventory check says the accepted moonlit amulet should be absent, which may conflict with the plain-language scenario.

Likely fix area if witness behavior is desired: actor memory / witness parser. Add rules for `from <actor>`, `in front of <actor>`, `<actor> witnesses`, and visible actor mentions to create or update a witness memory record only for present witnesses.

## Why this matters

The earlier full hook-smoke pass said every case could execute without crashing. This semantic adapter run shows why selector adapters are necessary: hook stability alone did not catch that an invalid item was added to inventory.

## Next recommended multi-run sequence

Do not run all 1,440 cases in one ChatGPT turn. Use category batches.

1. `Test 1`: INV shards 001-002 in small chunks.
2. `Test 2`: ABL shards 003-004.
3. `Test 3`: TIM shards 005-006.
4. `Test 4`: REP shards 007-008.
5. `Test 5`: QST shards 009-010.
6. `Test 6`: SCN shards 011-012.
7. `Test 7`: MEM shards 013-014.
8. `Test 8`: BDY shards 015-016.
9. `Test 9`: TRN shards 017-018.
10. `Test 10`: CRD shards 019-020.
11. `Test 11`: STA shards 021-022.
12. `Test 12`: CTX shards 023-024.

Each test should return the CSV/JSONL/Markdown aggregate for only that category. Then a final combine step can merge all category reports.
