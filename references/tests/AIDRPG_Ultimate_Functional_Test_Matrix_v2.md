# AIDRPG Ultimate Functional Test Matrix v2

Target script family: `aidrpgv1-3-8.txt`  
Matrix version: `AIDRPG-UTM-v2.0`  
Generated: 2026-04-27

This is a functional, sharded test matrix intended to expand beyond the known green v1.3.8 test battery. It is not a claim that all 1,440 cases have been executed against the script. It is a validated test specification designed so the tests can be run in small shards without crashing ChatGPT-style tool sessions.

## Matrix size

- Total test variants: **1440**
- Categories: **12**
- Scenario genres: **6**
- Choice groups per category/genre: **4**
- Variants per category × genre × group: **5**
- Shards: **24**
- Cases per shard: **60**
- Estimated hook calls per shard: **180** (`onInput`, `onContext`, `onOutput` per case)

## Safety design

Do **not** run all 1,440 cases in one ChatGPT/tool session. Run one JSONL shard at a time.

Recommended command shape for a future runner:

```bash
node run_matrix_shard.js --script ./aidrpgv1-3-8.txt --matrix ./jsonl_shards/AIDRPG_UTM2_shard_001.jsonl --isolated --timeout-ms 1800
```

Each case includes:
- exact player input
- exact simulated AI output
- fixture id
- expected checks
- failure signal
- priority
- shard id

## Categories

| Code | Category | Cases | Main hardening method |
|---|---:|---:|---|
| INV | Inventory acquisition, denial, theft, and item identity | 120 | cross-system conflict + randomized scenario fuzzing |
| ABL | Ability learning, use, quotes, failure, and duplicate control | 120 | ability denial mutation + duplicate/update control |
| TIM | Time, route, travel, aging, and dream/quote boundaries | 120 | quote/dream mutation + route/time consistency |
| REP | Reputation, rumor spread, witness credibility, and private acts | 120 | witness isolation + rumor credibility fuzzing |
| QST | Quest acceptance, completion, refusal, reward ambiguity | 120 | objective ambiguity + refusal/completion mutation |
| SCN | Scene, location, exits, entity presence, and drift prevention | 120 | scene drift + entity presence fuzzing |
| MEM | Actor memory, witness isolation, party presence, non-present entities | 120 | actor-memory witness isolation + non-present entity bleed tests |
| BDY | Death, injury, unconsciousness, self-harm/ally-harm boundaries | 120 | boundary event validation + self/ally-harm consequence tests |
| TRN | Transformation, disguise, illusion, species permanence | 120 | temporary vs permanent transformation mutation |
| CRD | Story Card/CardSync creation, duplicates, safe mode, managed namespace | 120 | CardSync duplicate/safe-mode stress |
| STA | State corruption, migration, malformed buckets, stale pending flags | 120 | corrupted state and migration repair |
| CTX | Context/runtime pressure, spam, long text, hook lifecycle, return safety | 120 | runtime/context budget and hook lifecycle stress |

## Scenario genres

| Code | Genre | Cases |
|---|---:|---:|
| FAN | classic_fantasy | 240 |
| ANI | anime_shonen | 240 |
| HOR | grimdark_horror | 240 |
| SCI | sci_fi_mecha | 240 |
| MOD | modern_urban | 240 |
| EPC | bookish_epic | 240 |

## Choice groups

| Code | Group | Cases | Purpose |
|---|---:|---:|---|
| CON | control | 360 | clean canonical phrasing |
| REA | player_realism | 360 | casual, slang, typo-prone, safety-conscious player phrasing |
| POP | pop_culture_reference | 360 | anime/book/game trope phrasing and named-style references |
| CHA | chaos_breaker | 360 | cheating, evil, silly, nonsensical, wall-walking, ally-harm, witness traps |

## Shard index

| Shard | Cases | Est. hooks | Categories | Genres | Groups | Test ID range |
|---|---:|---:|---|---|---|---|
| shard_001 | 60 | 180 | INV | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-INV-FAN-CON-01 → UTM2-INV-HOR-CHA-05 |
| shard_002 | 60 | 180 | INV | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-INV-SCI-CON-01 → UTM2-INV-EPC-CHA-05 |
| shard_003 | 60 | 180 | ABL | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-ABL-FAN-CON-01 → UTM2-ABL-HOR-CHA-05 |
| shard_004 | 60 | 180 | ABL | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-ABL-SCI-CON-01 → UTM2-ABL-EPC-CHA-05 |
| shard_005 | 60 | 180 | TIM | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-TIM-FAN-CON-01 → UTM2-TIM-HOR-CHA-05 |
| shard_006 | 60 | 180 | TIM | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-TIM-SCI-CON-01 → UTM2-TIM-EPC-CHA-05 |
| shard_007 | 60 | 180 | REP | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-REP-FAN-CON-01 → UTM2-REP-HOR-CHA-05 |
| shard_008 | 60 | 180 | REP | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-REP-SCI-CON-01 → UTM2-REP-EPC-CHA-05 |
| shard_009 | 60 | 180 | QST | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-QST-FAN-CON-01 → UTM2-QST-HOR-CHA-05 |
| shard_010 | 60 | 180 | QST | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-QST-SCI-CON-01 → UTM2-QST-EPC-CHA-05 |
| shard_011 | 60 | 180 | SCN | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-SCN-FAN-CON-01 → UTM2-SCN-HOR-CHA-05 |
| shard_012 | 60 | 180 | SCN | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-SCN-SCI-CON-01 → UTM2-SCN-EPC-CHA-05 |
| shard_013 | 60 | 180 | MEM | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-MEM-FAN-CON-01 → UTM2-MEM-HOR-CHA-05 |
| shard_014 | 60 | 180 | MEM | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-MEM-SCI-CON-01 → UTM2-MEM-EPC-CHA-05 |
| shard_015 | 60 | 180 | BDY | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-BDY-FAN-CON-01 → UTM2-BDY-HOR-CHA-05 |
| shard_016 | 60 | 180 | BDY | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-BDY-SCI-CON-01 → UTM2-BDY-EPC-CHA-05 |
| shard_017 | 60 | 180 | TRN | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-TRN-FAN-CON-01 → UTM2-TRN-HOR-CHA-05 |
| shard_018 | 60 | 180 | TRN | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-TRN-SCI-CON-01 → UTM2-TRN-EPC-CHA-05 |
| shard_019 | 60 | 180 | CRD | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-CRD-FAN-CON-01 → UTM2-CRD-HOR-CHA-05 |
| shard_020 | 60 | 180 | CRD | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-CRD-SCI-CON-01 → UTM2-CRD-EPC-CHA-05 |
| shard_021 | 60 | 180 | STA | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-STA-FAN-CON-01 → UTM2-STA-HOR-CHA-05 |
| shard_022 | 60 | 180 | STA | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-STA-SCI-CON-01 → UTM2-STA-EPC-CHA-05 |
| shard_023 | 60 | 180 | CTX | ANI,FAN,HOR | CHA,CON,POP,REA | UTM2-CTX-FAN-CON-01 → UTM2-CTX-HOR-CHA-05 |
| shard_024 | 60 | 180 | CTX | EPC,MOD,SCI | CHA,CON,POP,REA | UTM2-CTX-SCI-CON-01 → UTM2-CTX-EPC-CHA-05 |

## Fixture notes

Fixtures are conceptual input states for a runner. They are stored in `AIDRPG_Ultimate_Functional_Test_Fixtures_v2.json`.

## Validation performed

The matrix was validated for:
- unique test IDs
- no missing required fields
- all cases have non-empty input/output/checks
- every check has selector and operator
- all shard sizes are 60 or less
- recommended timeout does not exceed 1,800 ms per hook
- 24 JSONL shard files were written

Validation result: **PASSED**.
