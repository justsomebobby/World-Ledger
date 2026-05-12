# C25U2 Expanded Test Summary

Target: c25u2.txt
Version: 0.25.0-chunk25
Build stage: chunk25-major-actor-memory

## Totals

- Core compatibility/sanity: 23 / 23 passed
- Generated adventure sample: 80 / 100 passed
- Expanded custom issue-analysis matrix: 142 / 142 passed
- Combined useful total: 245 / 265 passed
- Failed: 20 / 265

## Current-stage blockers

None found for Chunk 25 major-actor-memory or for the previously reported C25U1 blockers.

## Fixed from C25U1

- Inventory negative/declined acquisition blockers passed 30 / 30.
- Inventory next-context visibility passed 10 / 10.
- Scene recognition custom matrix passed 12 / 12.
- Injury/status custom matrix passed 15 / 15.
- Healing custom matrix passed 8 / 8.
- Major actor basic recognition passed 13 / 13.
- Major actor sequence memory passed 10 / 10.

## Remaining generated-suite warnings / future expectations

1. Inventory slang positive: “pocket the rusty key/shield” does not create inventory.
2. Generated injury/status variants still miss poison thumb, lightning shoulder, cracked ribs, concussion/head spin, frostbite fingers, acid hand, and blinded eyes.
3. Generated healing antidote wording still does not preserve poison/weak/antidote state.

## Patch focus

1. Add “pocket” as confirmed acquisition verb.
2. Add the generated injury variants to ConsequenceParser / ValidationSystem.
3. Add antidote/poison-slowed recovery state handling.
