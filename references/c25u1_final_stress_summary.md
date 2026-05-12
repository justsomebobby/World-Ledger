# c25u1 Final AI Dungeon Stress Test Report

Script tested: c25u1.txt
Detected version/build from uploaded file: VERSION 0.25.0-chunk25 / BUILD_STAGE chunk25-major-actor-memory.

## Overall result
- Total cases tested: 399
- Passed: 270
- Failed: 129
- Pass rate: 68%

## Section results
| Suite | Tested | Passed | Failed | Pass rate |
|---|---:|---:|---:|---:|
| adventure-ability20 | 20 | 20 | 0 | 100% |
| adventure-baseline | 1 | 0 | 1 | 0% |
| adventure-combat20 | 20 | 16 | 4 | 80% |
| adventure-context-pressure20 | 20 | 0 | 20 | 0% |
| adventure-death-boundary20 | 20 | 4 | 16 | 20% |
| adventure-economy10 | 10 | 8 | 2 | 80% |
| adventure-healing10 | 10 | 6 | 4 | 60% |
| adventure-injury25 | 25 | 5 | 20 | 20% |
| adventure-inventory40 | 40 | 36 | 4 | 90% |
| adventure-negative10 | 10 | 8 | 2 | 80% |
| adventure-scene40 | 40 | 32 | 8 | 80% |
| adventure-stress120 | 120 | 93 | 27 | 78% |
| adventure-time20 | 20 | 20 | 0 | 100% |
| ai-dungeon-final | 8 | 7 | 1 | 88% |
| npc-deep20 | 20 | 0 | 20 | 0% |
| sandbox-guards10 | 2 | 2 | 0 | 100% |
| smoke | 9 | 9 | 0 | 100% |
| storycard-api10 | 3 | 3 | 0 | 100% |
| wrapper-compat10 | 1 | 1 | 0 | 100% |

## Failure clusters by system
| System | Failures |
|---|---:|
| ContextPacketSystem | 20 |
| PlayerSystem / PersistentTraitSystem / ValidationSystem | 20 |
| ActorProfileSystem | 20 |
| InventorySystem | 18 |
| SceneStateSystem / ContextPacketSystem | 18 |
| ValidationSystem / PlayerSystem / ActorProfileSystem | 16 |
| ProgressionSystem / InventorySystem / ActorProfileSystem | 4 |
| PlayerSystem / InventorySystem / ActorProfileSystem | 4 |
| InventorySystem / ValidationSystem | 4 |
| Whole adventure integration | 2 |
| InventorySystem / ReputationSystem | 2 |
| ContextPacketSystem / InventorySystem | 1 |

## Key findings
1. **Baseline stability is good.** Smoke/load/debug, wrapper compatibility, Story Card API mock checks, and sandbox guards passed.
2. **Time and ability tests are strong.** The sampled time suite and ability suite both passed completely.
3. **Context pressure is the largest blocker.** Context pressure tests failed across the sampled suite: important current truths such as keys, actor status, scene changes, poison, and ability adaptations were not being carried into Context under clutter.
4. **Major actor memory/NPC deep tests failed.** MajorActorMemorySystem exists, but the deep NPC suite did not preserve the expected names/stances/goals/grudges/relationship details across the tested phrasing set.
5. **Injury/status and death/failure boundaries still need work.** Statuses and injury severities were not consistently canonized or safely classified in the sampled stress tests.
6. **Inventory improved but still has edge gaps.** Inventory passed most sampled cases, but slang/casual item acquisition and negative-control cases still show some failures.
7. **Scene is mostly improved but still has a barrow/sanctum entry pattern failing.** General scene tests passed most cases, but specific strong-entry extraction for barrow/sanctum remained unreliable.

## Best next patch order
1. ContextPacketSystem: dirty/current truth priority under clutter and after Output-derived changes.
2. MajorActorMemorySystem + ActorProfileSystem: reliable named actor capture, stance, goals, grudges, long-term notes, and active actor context.
3. PlayerSystem / PersistentTraitSystem / ValidationSystem: injury/status capture and death/near-death/failure boundaries.
4. SceneStateSystem: barrow/sanctum strong-entry extraction and context invalidation.
5. InventorySystem / ValidationSystem: slang pickup and “almost took” negative-control handling.
6. Economy/combat integration: boss reward and no-money shop gating.

## Representative failing examples
### ContextPacketSystem
Failures sampled: 20

- **Adventure context pressure variation 1 / rusted iron key** (adventure-context-pressure)
  - Expected: The current key/actor/scene/status/ability truth appears in context without blowing the budget.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["key"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 1 | 08:00 | Season: spring | Weather
  - Patch hint: Inspect dirty-priority packets, current-scene truth, and context budget ordering.
- **Adventure context pressure variation 2 / Mira wounded** (adventure-context-pressure)
  - Expected: The current key/actor/scene/status/ability truth appears in context without blowing the budget.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["Mira","wounded"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 1 | 08:00 | Season: spring | Weather
  - Patch hint: Inspect dirty-priority packets, current-scene truth, and context budget ordering.
- **Adventure context pressure variation 3 / sanctum scene** (adventure-context-pressure)
  - Expected: The current key/actor/scene/status/ability truth appears in context without blowing the budget.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["sanctum"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior | Facts: door\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 1 | 08:00 | Season: sp
  - Patch hint: Inspect dirty-priority packets, current-scene truth, and context budget ordering.
- **Adventure context pressure variation 4 / poison status** (adventure-context-pressure)
  - Expected: The current key/actor/scene/status/ability truth appears in context without blowing the budget.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["poison"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 1 | 08:00 | Season: spring | Weather
  - Patch hint: Inspect dirty-priority packets, current-scene truth, and context budget ordering.

### PlayerSystem / PersistentTraitSystem / ValidationSystem
Failures sampled: 20

- **Adventure injury/status capture variation 1 / burned forearm** (adventure-injury)
  - Expected: The relevant injury/status is visible in state or sheet.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["burn","forearm"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect consequence parsing and status severity validation.
- **Adventure injury/status capture variation 2 / poisoned thumb** (adventure-injury)
  - Expected: The relevant injury/status is visible in state or sheet.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["poison","thumb"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect consequence parsing and status severity validation.
- **Adventure injury/status capture variation 3 / electrocuted shoulder** (adventure-injury)
  - Expected: The relevant injury/status is visible in state or sheet.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["shock","lightning","shoulder","electric"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect consequence parsing and status severity validation.
- **Adventure injury/status capture variation 5 / cracked ribs** (adventure-injury)
  - Expected: The relevant injury/status is visible in state or sheet.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["rib","cracked"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect consequence parsing and status severity validation.

### ActorProfileSystem
Failures sampled: 20

- **NPC deep phrasing: Mira / I ask Mira for help and watch how they** (npc-deep)
  - Expected: Mira should persist with at least one meaningful state: trusts you, uneasy, follows you.
  - Failed assertion: anyStringContains on state.aidrpg.actors
  - Expected signal: "Mira"
  - Actual signal: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sighting
  - Patch hint: Inspect ActorProfileSystem name extraction, importance threshold, relationship/condition parser, and ContextPacketSystem actor packet.
- **NPC deep phrasing: Mira / I check on Mira after the fight.** (npc-deep)
  - Expected: Mira should persist with at least one meaningful state: trusts you, uneasy, follows you.
  - Failed assertion: anyStringContains on state.aidrpg.actors
  - Expected signal: "Mira"
  - Actual signal: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sighting
  - Patch hint: Inspect ActorProfileSystem name extraction, importance threshold, relationship/condition parser, and ContextPacketSystem actor packet.
- **NPC deep phrasing: Mira / I speak quietly to Mira near the chape** (npc-deep)
  - Expected: Mira should persist with at least one meaningful state: trusts you, uneasy, follows you.
  - Failed assertion: anyStringContains on state.aidrpg.actors
  - Expected signal: "Mira"
  - Actual signal: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sighting
  - Patch hint: Inspect ActorProfileSystem name extraction, importance threshold, relationship/condition parser, and ContextPacketSystem actor packet.
- **NPC deep phrasing: Mira / I study Mira's stance before deciding ** (npc-deep)
  - Expected: Mira should persist with at least one meaningful state: trusts you, uneasy, follows you.
  - Failed assertion: anyStringContains on state.aidrpg.actors
  - Expected signal: "Mira"
  - Actual signal: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sighting
  - Patch hint: Inspect ActorProfileSystem name extraction, importance threshold, relationship/condition parser, and ContextPacketSystem actor packet.

### InventorySystem
Failures sampled: 18

- **Adventure inventory slang positive / pocket rusty key** (adventure-inventory)
  - Expected: The correct item is owned or represented; no garbage/internal name is exposed.
  - Failed assertion: anyStringContainsAny on state.aidrpg.items
  - Expected signal: ["rusted iron key","key","rusty key","iron key"]
  - Actual signal: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","4","gold","0","pendingNormalization"]
  - Patch hint: Inspect item normalization, alias handling, and pickup confirmation parsing.
- **Adventure inventory slang positive / pocket bronze shield** (adventure-inventory)
  - Expected: The correct item is owned or represented; no garbage/internal name is exposed.
  - Failed assertion: anyStringContainsAny on state.aidrpg.items
  - Expected signal: ["cracked bronze shield","shield","bronze shield","beat-up shield"]
  - Actual signal: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","4","gold","0","pendingNormalization"]
  - Patch hint: Inspect item normalization, alias handling, and pickup confirmation parsing.
- **Adventure inventory slang positive / pocket heal pot** (adventure-inventory)
  - Expected: The correct item is owned or represented; no garbage/internal name is exposed.
  - Failed assertion: anyStringContainsAny on state.aidrpg.items
  - Expected signal: ["minor healing vial","vial","heal pot","little healing bottle"]
  - Actual signal: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","4","gold","0","pendingNormalization"]
  - Patch hint: Inspect item normalization, alias handling, and pickup confirmation parsing.
- **Adventure inventory slang positive / pocket lucky trinket** (adventure-inventory)
  - Expected: The correct item is owned or represented; no garbage/internal name is exposed.
  - Failed assertion: anyStringContainsAny on state.aidrpg.items
  - Expected signal: ["stitched leather charm","charm","leather charm","lucky trinket"]
  - Actual signal: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","4","gold","0","pendingNormalization"]
  - Patch hint: Inspect item normalization, alias handling, and pickup confirmation parsing.

### SceneStateSystem / ContextPacketSystem
Failures sampled: 18

- **Adventure scene strong entry variation 5 / barrow sanctum** (adventure-scene)
  - Expected: The current scene updates to the entered place or a clean equivalent label.
  - Failed assertion: anyStringContainsAny on state.aidrpg.world.currentScene
  - Expected signal: ["barrow","sanctum"]
  - Actual signal: ["id","guild_hall","displayName","Adventurers Guild Hall","sceneType","building interior","parentLocationRef","guild_district","sceneRef","guild_hall","entityRef","","lastChangedTurn","0","localEntityIds","localActorIds","localHazards","localExits","door","con
  - Patch hint: Inspect scene target extraction and scene packet invalidation.
- **Adventure scene strong entry variation 10 / barrow sanctum** (adventure-scene)
  - Expected: The current scene updates to the entered place or a clean equivalent label.
  - Failed assertion: anyStringContainsAny on state.aidrpg.world.currentScene
  - Expected signal: ["barrow","sanctum"]
  - Actual signal: ["id","guild_hall","displayName","Adventurers Guild Hall","sceneType","building interior","parentLocationRef","guild_district","sceneRef","guild_hall","entityRef","","lastChangedTurn","0","localEntityIds","localActorIds","localHazards","localExits","door","con
  - Patch hint: Inspect scene target extraction and scene packet invalidation.
- **Adventure scene strong entry variation 15 / barrow sanctum** (adventure-scene)
  - Expected: The current scene updates to the entered place or a clean equivalent label.
  - Failed assertion: anyStringContainsAny on state.aidrpg.world.currentScene
  - Expected signal: ["barrow","sanctum"]
  - Actual signal: ["id","guild_hall","displayName","Adventurers Guild Hall","sceneType","building interior","parentLocationRef","guild_district","sceneRef","guild_hall","entityRef","","lastChangedTurn","0","localEntityIds","localActorIds","localHazards","localExits","door","con
  - Patch hint: Inspect scene target extraction and scene packet invalidation.
- **Adventure scene strong entry variation 20 / barrow sanctum** (adventure-scene)
  - Expected: The current scene updates to the entered place or a clean equivalent label.
  - Failed assertion: anyStringContainsAny on state.aidrpg.world.currentScene
  - Expected signal: ["barrow","sanctum"]
  - Actual signal: ["id","guild_hall","displayName","Adventurers Guild Hall","sceneType","building interior","parentLocationRef","guild_district","sceneRef","guild_hall","entityRef","","lastChangedTurn","0","localEntityIds","localActorIds","localHazards","localExits","door","con
  - Patch hint: Inspect scene target extraction and scene packet invalidation.

### ValidationSystem / PlayerSystem / ActorProfileSystem
Failures sampled: 16

- **Adventure death/failure boundary variation 1 / near death not dead** (adventure-death-boundary)
  - Expected: Only clear actual consequences become hard state.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["unconscious"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3343081056","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect fatality/uncertainty validation and failed-action reward gating.
- **Adventure death/failure boundary variation 2 / actual death final version** (adventure-death-boundary)
  - Expected: Only clear actual consequences become hard state.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["dead"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","2870841354","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect fatality/uncertainty validation and failed-action reward gating.
- **Adventure death/failure boundary variation 3 / rumor death negative** (adventure-death-boundary)
  - Expected: Only clear actual consequences become hard state.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["standing"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3453248595","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect fatality/uncertainty validation and failed-action reward gating.
- **Adventure death/failure boundary variation 5 / failed action no reward** (adventure-death-boundary)
  - Expected: Only clear actual consequences become hard state.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["misses"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","1","lastAppliedOutputHash","464655920","debug","false","dirty","player","false","abilities","items","actors","actor_1_1","entities","routes","reputation","fals
  - Patch hint: Inspect fatality/uncertainty validation and failed-action reward gating.

### ProgressionSystem / InventorySystem / ActorProfileSystem
Failures sampled: 4

- **Adventure combat outcome variation 5 / boss** (adventure-combat)
  - Expected: XP/loot match the outcome; party actor relevance may be updated.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["warden","experience"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","3","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3568228820","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect combat consequence validation and reward gating.
- **Adventure combat outcome variation 10 / boss** (adventure-combat)
  - Expected: XP/loot match the outcome; party actor relevance may be updated.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["warden","experience"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","3","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3568228820","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect combat consequence validation and reward gating.
- **Adventure combat outcome variation 15 / boss** (adventure-combat)
  - Expected: XP/loot match the outcome; party actor relevance may be updated.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["warden","experience"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","3","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3568228820","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect combat consequence validation and reward gating.
- **Adventure combat outcome variation 20 / boss** (adventure-combat)
  - Expected: XP/loot match the outcome; party actor relevance may be updated.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["warden","experience"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","3","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3568228820","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests"
  - Patch hint: Inspect combat consequence validation and reward gating.

### PlayerSystem / InventorySystem / ActorProfileSystem
Failures sampled: 4

- **Adventure healing/recovery variation 3 / potion slang** (adventure-healing)
  - Expected: The injury/healing truth is represented; no fatal over-save.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["healing vial","ribs"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect healing output parsing, item use, actor healing contributions, and recovery wording.
- **Adventure healing/recovery variation 4 / antidote** (adventure-healing)
  - Expected: The injury/healing truth is represented; no fatal over-save.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["poison","weak","antidote"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect healing output parsing, item use, actor healing contributions, and recovery wording.
- **Adventure healing/recovery variation 8 / potion slang** (adventure-healing)
  - Expected: The injury/healing truth is represented; no fatal over-save.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["healing vial","ribs"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect healing output parsing, item use, actor healing contributions, and recovery wording.
- **Adventure healing/recovery variation 9 / antidote** (adventure-healing)
  - Expected: The injury/healing truth is represented; no fatal over-save.
  - Failed assertion: anyStringContainsAny on state.aidrpg.player
  - Expected signal: ["poison","weak","antidote"]
  - Actual signal: ["id","player","name","Kael","species","human","levelState","level","3","xp","46","xpToNext","100","totalXp","246","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistic
  - Patch hint: Inspect healing output parsing, item use, actor healing contributions, and recovery wording.

### InventorySystem / ValidationSystem
Failures sampled: 4

- **Adventure inventory negative control / almost 0** (adventure-negative)
  - Expected: No hard inventory state change.
  - Failed assertion: notAnyStringContains on state.aidrpg.items
  - Expected signal: ["rusted iron key"]
  - Actual signal: ["byId","item_1_1","id","item_1_1","displayName","rusted iron key","baseType","key","descriptors","rusted","iron","materialTags","iron","quality","","condition","durability","100","stateTags","slot","","stackable","false","quantity","1","stats","ownership","ho
  - Patch hint: Inspect false-positive item consequence parsing if this fails.
- **Adventure inventory negative control / almost 5** (adventure-negative)
  - Expected: No hard inventory state change.
  - Failed assertion: notAnyStringContains on state.aidrpg.items
  - Expected signal: ["rusted iron key"]
  - Actual signal: ["byId","item_1_1","id","item_1_1","displayName","rusted iron key","baseType","key","descriptors","rusted","iron","materialTags","iron","quality","","condition","durability","100","stateTags","slot","","stackable","false","quantity","1","stats","ownership","ho
  - Patch hint: Inspect false-positive item consequence parsing if this fails.
- **Adventure inventory negative control / almost 0** (adventure-negative)
  - Expected: No hard inventory state change.
  - Failed assertion: notAnyStringContains on state.aidrpg.items
  - Expected signal: ["rusted iron key"]
  - Actual signal: ["byId","item_1_1","id","item_1_1","displayName","rusted iron key","baseType","key","descriptors","rusted","iron","materialTags","iron","quality","","condition","durability","100","stateTags","slot","","stackable","false","quantity","1","stats","ownership","ho
  - Patch hint: Inspect false-positive item consequence parsing if this fails.
- **Adventure inventory negative control / almost 5** (adventure-negative)
  - Expected: No hard inventory state change.
  - Failed assertion: notAnyStringContains on state.aidrpg.items
  - Expected signal: ["rusted iron key"]
  - Actual signal: ["byId","item_1_1","id","item_1_1","displayName","rusted iron key","baseType","key","descriptors","rusted","iron","materialTags","iron","quality","","condition","durability","100","stateTags","slot","","stackable","false","quantity","1","stats","ownership","ho
  - Patch hint: Inspect false-positive item consequence parsing if this fails.

### Whole adventure integration
Failures sampled: 2

- **Adventure baseline / guild quest to dungeon, loot, return, pay, shop, sleep** (adventure-baseline)
  - Expected: State and context preserve the core dungeon truth without over-saving false positives or losing current facts.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["Old Barrow","burn","healing kit","Mira","Bram","dawn","silver"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior | Facts: damaged, fire\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 2 | 14:00 | S
  - Patch hint: Failures should be grouped by system; patch the highest-impact capture/integration gap first.
- **Adventure baseline / guild quest to dungeon, loot, return, pay, shop, sleep** (adventure-baseline)
  - Expected: State and context preserve the core dungeon truth without over-saving false positives or losing current facts.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["Old Barrow","burn","healing kit","Mira","Bram","dawn","silver"]
  - Actual signal: "Current truth:\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior | Facts: damaged, fire\nPlayer: Lvl 3 | human | HP 100/100 | MP 35/35 | EP 60/60 | Cond: none | Outfit: travel-worn adventuring clothes\nTime: Day 2 | 14:00 | S
  - Patch hint: Failures should be grouped by system; patch the highest-impact capture/integration gap first.

### InventorySystem / ReputationSystem
Failures sampled: 2

- **Adventure economy variation 3 / no money** (adventure-economy)
  - Expected: Currency/item state reflects the confirmed economic result.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["not enough"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","1","lastAppliedOutputHash","2476989969","debug","false","dirty","player","false","abilities","items","actors","actor_1_1","entities","routes","reputation","fal
  - Patch hint: Inspect currency parsing and transaction validation.
- **Adventure economy variation 8 / no money** (adventure-economy)
  - Expected: Currency/item state reflects the confirmed economic result.
  - Failed assertion: anyStringContainsAny on state.aidrpg
  - Expected signal: ["not enough"]
  - Actual signal: ["meta","version","1","createdAtTurn","0","currentTurn","2","currentHook","","mode","normal","seed","1","lastAppliedOutputHash","2476989969","debug","false","dirty","player","false","abilities","items","actors","actor_1_1","entities","routes","reputation","fal
  - Patch hint: Inspect currency parsing and transaction validation.

### ContextPacketSystem / InventorySystem
Failures sampled: 1

- **Final compatibility / output memory timing does not assume same-action memory effect** (ai-dungeon-final)
  - Expected: Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.
  - Failed assertion: lastReturnContainsAny
  - Expected signal: ["key","sigil","pouch","inventory"]
  - Actual signal: "Current truth:\nScene: unknown place | Type: unknown\nPlayer: Lvl 1 | human | HP 100/100 | MP 20/20 | EP 50/50 | Cond: none | Outfit: unspecified\nTime: Day 1 | 08:05\n\nThe sealed door waits ahead."
  - Patch hint: Patch only the platform-facing assumption or subsystem causing the compatibility failure.
