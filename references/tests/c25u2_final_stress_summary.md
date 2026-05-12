# c25u2 Final Stress Test Summary

Script tested: `c25u2.txt`
Identified version: `0.25.0-chunk25` / build stage `chunk25-major-actor-memory`.

## Overall

- Total cases tested: **399**
- Passed: **311**
- Failed: **88**
- Pass rate: **77.9%**
- Compared with c25u1: **+41 passes**, **41 fewer failures** on the same 399-case sectioned run.

## Section results

| Suite | Passed | Failed |
|---|---:|---:|
| adventure-ability20 | 20 | 0 |
| adventure-baseline | 0 | 1 |
| adventure-combat20 | 16 | 4 |
| adventure-context-pressure20 | 8 | 12 |
| adventure-death-boundary20 | 4 | 16 |
| adventure-economy10 | 8 | 2 |
| adventure-healing10 | 8 | 2 |
| adventure-injury25 | 8 | 17 |
| adventure-inventory40 | 36 | 4 |
| adventure-negative10 | 10 | 0 |
| adventure-scene40 | 40 | 0 |
| adventure-stress120 | 105 | 15 |
| adventure-time20 | 20 | 0 |
| ai-dungeon-final | 8 | 0 |
| npc-deep20 | 5 | 15 |
| sandbox-guards | 2 | 0 |
| smoke | 9 | 0 |
| storycard-api | 3 | 0 |
| wrapper-compat | 1 | 0 |

## Main improvements vs c25u1

- AI Dungeon compatibility improved from 7/8 to **8/8**.
- Scene improved from 32/40 to **40/40**.
- Context pressure improved from 0/20 to **8/20**.
- NPC deep / major actor memory improved from 0/20 to **5/20**.
- Injury/status improved from 5/25 to **8/25**.
- Healing improved from 6/10 to **8/10**.
- Negative controls improved from 8/10 to **10/10**.
- Combined adventure stress sample improved from 93/120 to **105/120**.
- Time and Ability stayed perfect at **20/20** each.

## Remaining blockers

- **Injury/status persistence** remains weak: 8/25 passed. Poison, shock/electric injury, cracked ribs, concussion/head injury, frostbite, acid/hand injury, and several similar physical consequences are still not reliably visible in player state or `/sheet`.
- **Death/failure boundary validation** remains weak: 4/20 passed. Near-death, actual death, rumor death, and failed-action/no-reward boundary cases are still not consistently represented/gated.
- **Major actor memory** improved but is still not final-ready: 5/20 passed. Captain Dorne is being recognized as an actor, but stance/goals/grudges/details remain too neutral/empty in repeated hostile/order/bars-gate cases.
- **Context pressure** improved but still needs work: 8/20 passed. Mira wounded, poison status, and Ember Ward adaptation still often fail to appear in Context under clutter.
- **Inventory slang positive capture** still has gaps: 36/40 inventory passed, but “pocket rusty key/shield/heal pot/lucky trinket” style positive acquisition does not consistently create owned item state.
- **Combat/economy reward gating** still has small gaps: boss/warden victory XP/experience representation and no-money shop outcomes still fail selected cases.
- **Adventure baseline** still fails because final Context does not preserve enough full-flow truth: the baseline Context ended around `sanctum | Guild District | fire`, but omitted enough key adventure facts such as Old Barrow, burn, healing kit, Mira/Bram, dawn, and silver.

## Best next patch order

1. PlayerSystem / PersistentTraitSystem / ValidationSystem: broaden and normalize injury/status capture.
2. ValidationSystem: improve death/near-death/rumor-death/failed-action boundaries.
3. MajorActorMemorySystem + ActorProfileSystem: extract hostile/trust/order/barred-gate/grudge/goal details into memory records and Context.
4. ContextPacketSystem: preserve dirty actor/status/ability-adaptation/current adventure truth under pressure.
5. InventorySystem: support positive slang acquisition like pocket/snag/yoink while preserving negative-control safety.
6. Progression/Combat/Economy: patch boss reward/XP and no-money shop gating.