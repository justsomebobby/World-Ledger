# WorldLedger 10.0A-R1 Local Story Harness Test — You Are a Summoner

## Scope

This was a local approximation test, not a live AI Dungeon install. I loaded `WorldLedger_CleanCore_Build10_0A_R1_OrganizationalClean.txt`, parsed the exported markdown into chronological input/output-like chunks, and fed all 437 chunks through the script pipeline. This is harsher than normal live play because it asks the script to interpret an entire export/history file, including prose that may not appear exactly the same in live AI Dungeon output.

## Runtime result

- Runtime errors: 0
- Duration: 4300 ms for 437 chunks
- Safe mode active at end: False
- Story cards actually created in harness: 0
- Card candidates: 82
- World graph nodes: 117

## State counts observed

```json
{
  "actors": 64,
  "places": 16,
  "inventory": 35,
  "storyCards": 0,
  "cardCandidates": 82,
  "worldGraphNodes": 117,
  "party": 1,
  "summons": 4,
  "controlled": 1,
  "combatThreats": 0,
  "outcomes": 16,
  "rewards": 0,
  "contracts": 1,
  "routes": 0,
  "elapsed": 240,
  "day": 1,
  "hour": 12,
  "conditions": 2,
  "injuries": 25,
  "deniedSummons": 3,
  "deniedControlled": 1,
  "safeMode": false
}
```

## Good signs

- The script did not crash on the full story export.
- It did recognize that the story contains a summoner/familiar-heavy scenario.
- It detected Penpen and several academy instructors/students as persistent actor/card candidates.
- Context generation completed after the run.
- Safe mode did not trigger falsely.

## Blocking issues found

### 1. Summon parser false positives

The script created summon records for non-summons:

