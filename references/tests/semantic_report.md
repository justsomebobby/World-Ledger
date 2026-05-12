# AIDRPG UTM2 Semantic Selector Aggregate Report

Rows aggregated: 5
Unique test IDs: 5 / 1440
Status counts: {"pass":3,"fail":2,"partial":0,"hook_fail":0,"adapter_error":0}
Total checks: 11
Not evaluated checks: 0
Max hook time observed: 281 ms

## Category summary
| Category | Total | Pass | Fail | Partial | Hook fail | Adapter error |
|---|---:|---:|---:|---:|---:|---:|
| INV | 5 | 3 | 2 | 0 | 0 | 0 |

## Failures
### UTM2-INV-FAN-CON-03 — INV/FAN/CON
Status: fail; max hook: 242 ms
Input: I pick up the idea of a iron key, not the actual thing.
Output: The thought of a iron key amuses you, but no real item enters your bag.
Expected: inventory.item_named absent iron key; inventory.item_named absent for iron key
- inventory.item_named absent iron key: fail; evidence: item_1_1 of a iron key  key  of iron iron

### UTM2-INV-FAN-CON-05 — INV/FAN/CON
Status: fail; max hook: 281 ms
Input: I refuse the fake iron key, but accept the moonlit amulet from gate guard.
Output: You leave the iron key alone and accept the moonlit amulet from gate guard.
Expected: inventory.item_named absent moonlit amulet; inventory.item_named absent for moonlit amulet; actor_memory.actor_knows_event present gate guard
- actor_memory.actor_knows_event present gate guard: fail; evidence: actors | threatSettings | version | 1 | byId | bySceneKey | allIds | localIds | pendingGeneration | recentUpdates | sightingsByKey | majorMemory | byActorId | activeIds | recentEvents | config | maxMajorActors | 12 | maxGoals | 6 | maxGrudges | 6 | maxNotes | 8 | maxEvents | 40 | activationSightings | 5 | majorMemory | byActorId | activeIds | recentEvents | config | maxMajorActors | 12 | maxGoals | 6 | maxGrudges | 6 | maxNotes | 8 | maxEvents | 40 | activationSightings | 5

