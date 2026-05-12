# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:05:02.345Z
Suite: regressions
Cases tested: 161
Passed: 134
Failed: 27
Suspicious: 0

## Roadmap Maturity Breakdown

- UNLABELED: 19 failing test(s)
- CURRENT_BLOCKER: 7 failing test(s)
- CURRENT_WARNING: 1 failing test(s)

## Recommended Fix Order

1. ActorProfileSystem: 7 failing test(s), 6 high severity
2. InventorySystem: 6 failing test(s), 6 high severity
3. TimeTravelSystem: 6 failing test(s), 5 high severity
4. Unknown / Cross-System: 3 failing test(s), 2 high severity
5. IntentParser: 1 failing test(s)
6. PlayerSystem: 1 failing test(s)
7. SceneStateSystem: 1 failing test(s), 1 high severity
8. WorldEntitySystem: 1 failing test(s), 1 high severity
9. ContextPacketSystem: 1 failing test(s), 1 high severity

## System Cluster — ActorProfileSystem

Failures in cluster: 7
Likely section starts near line 12298.

### Likely Source Area
```js
12295: },
12296: 
12297:     // === ACTOR PROFILE GENERATION SYSTEM ===
12298: ActorProfileSystem: {
12299:   init(root = state.aidrpg) {
12300:     if (!root || typeof root !== "object") return null;
12301: 
12302:     if (!root.actors || typeof root.actors !== "object" || Array.isArray(root.actors)) {
12303:       root.actors = {};
12304:     }
12305: 
12306:     const actors = root.actors;
12307: 
12308:     if (!actors.byId || typeof actors.byId !== "object" || Array.isArray(actors.byId)) {
12309:       actors.byId = {};
12310:     }
12311:     if (!actors.bySceneKey || typeof actors.bySceneKey !== "object" || Array.isArray(actors.bySceneKey)) {
12312:       actors.bySceneKey = {};
12313:     }
12314:     if (!Array.isArray(actors.allIds)) actors.allIds = [];
12315:     if (!Array.isArray(actors.localIds)) actors.localIds = [];
12316:     if (!Array.isArray(actors.pendingGeneration)) actors.pendingGeneration = [];
12317:     if (!Array.isArray(actors.recentUpdates)) actors.recentUpdates = [];
12318:     if (!actors.sightingsByKey || typeof actors.sightingsByKey !== "object" || Array.isArray(actors.sightingsByKey)) {
12319:       actors.sightingsByKey = {};
12320:     }
12321: 
12322:     return actors;
12323:   },
12324: 
12325:   processOutput(rawText, root = state.aidrpg) {
12326:     if (!root || typeof root !== "object") return 0;
12327:     this.init(root);
12328: 
12329:     const A = globalThis.AIDRPG;
12330:     const U = A.Utils;
12331:     const raw = String(rawText || "");
12332:     if (!raw.trim()) return 0;
12333: 
```

## System Cluster — InventorySystem

Failures in cluster: 6
Likely section starts near line 3574.

### Likely Source Area
```js
3571: },
3572: 
3573:     // === INVENTORY SYSTEM ===
3574: InventorySystem: {
3575:   init(root = state.aidrpg) {
3576:     if (!root || typeof root !== "object") return null;
3577: 
3578:     if (!root.items || typeof root.items !== "object" || Array.isArray(root.items)) {
3579:       root.items = {};
3580:     }
3581: 
3582:     const items = root.items;
3583: 
3584:     if (!items.byId || typeof items.byId !== "object" || Array.isArray(items.byId)) {
3585:       items.byId = {};
3586:     }
3587: 
3588:     if (!items.ownership || typeof items.ownership !== "object" || Array.isArray(items.ownership)) {
3589:       items.ownership = {};
3590:     }
3591: 
3592:     if (!Array.isArray(items.ownership.player)) {
3593:       items.ownership.player = [];
3594:     }
3595: 
3596:     if (!items.ownership.storage || typeof items.ownership.storage !== "object" || Array.isArray(items.ownership.storage)) {
3597:       items.ownership.storage = {};
3598:     }
3599: 
3600:     if (!items.ownership.actors || typeof items.ownership.actors !== "object" || Array.isArray(items.ownership.actors)) {
3601:       items.ownership.actors = {};
3602:     }
3603: 
3604:     if (!items.equipment || typeof items.equipment !== "object" || Array.isArray(items.equipment)) {
3605:       items.equipment = {};
3606:     }
3607: 
3608:     const equipment = items.equipment;
3609: 
```

## System Cluster — TimeTravelSystem

Failures in cluster: 6
Likely section starts near line 7757.

### Likely Source Area
```js
7754: },
7755: 
7756:     // === TIME / TRAVEL SYSTEM ===
7757: TimeTravelSystem: {
7758:   init(root = state.aidrpg) {
7759:     if (!root || typeof root !== "object") return null;
7760: 
7761:     if (!root.time || typeof root.time !== "object" || Array.isArray(root.time)) {
7762:       root.time = {};
7763:     }
7764: 
7765:     const time = root.time;
7766: 
7767:     if (!time.current || typeof time.current !== "object" || Array.isArray(time.current)) {
7768:       time.current = {};
7769:     }
7770:     if (typeof time.current.day !== "number" || time.current.day < 1) time.current.day = 1;
7771:     if (typeof time.current.hour !== "number" || time.current.hour < 0) time.current.hour = 8;
7772:     if (typeof time.current.minute !== "number" || time.current.minute < 0) time.current.minute = 0;
7773:     if (typeof time.current.season !== "string") time.current.season = "";
7774:     if (typeof time.current.weather !== "string") time.current.weather = "";
7775: 
7776:     if (!time.elapsed || typeof time.elapsed !== "object" || Array.isArray(time.elapsed)) {
7777:       time.elapsed = {};
7778:     }
7779:     if (typeof time.elapsed.totalHours !== "number" || time.elapsed.totalHours < 0) {
7780:       time.elapsed.totalHours = 0;
7781:     }
7782: 
7783:     if (!time.timeline || typeof time.timeline !== "object" || Array.isArray(time.timeline)) {
7784:       time.timeline = {};
7785:     }
7786:     if (!Array.isArray(time.timeline.recentEvents)) {
7787:       time.timeline.recentEvents = [];
7788:     }
7789: 
7790:     if (!time.routes || typeof time.routes !== "object" || Array.isArray(time.routes)) {
7791:       time.routes = {};
7792:     }
```

## System Cluster — Unknown / Cross-System

Failures in cluster: 3
No section marker found.

## System Cluster — IntentParser

Failures in cluster: 1
Likely section starts near line 2787.

### Likely Source Area
```js
2784: },
2785: 
2786:     // === INTENT PARSER ===
2787: IntentParser: {
2788:   parseInput(rawText, root = state.aidrpg) {
2789:     if (!root || typeof root !== "object") return null;
2790: 
2791:     const U = globalThis.AIDRPG.Utils;
2792:     const trimmed = U.normalizeSpaces(String(rawText || ""));
2793: 
2794:     if (!root.pending || typeof root.pending !== "object" || Array.isArray(root.pending)) {
2795:       root.pending = {};
2796:     }
2797: 
2798:     if (!trimmed) {
2799:       root.pending.inputIntent = null;
2800:       return null;
2801:     }
2802: 
2803:     const lower = trimmed.toLowerCase();
2804:     const scores = this.scoreActionFamilies(lower, trimmed);
2805:     const primaryType = this.pickPrimaryType(scores);
2806:     const alternates = this.buildAlternates(scores, primaryType);
2807: 
2808:     const intent = {
2809:       primaryType: primaryType,
2810:       confidence: this.scoreToConfidence(scores[primaryType] || 0),
2811:       alternates: alternates,
2812:       targetHint: this.extractTarget(trimmed, primaryType),
2813:       weaponHint: this.extractWeapon(trimmed, primaryType),
2814:       styleHint: this.extractStyle(trimmed, primaryType),
2815:       abilityHint: this.extractAbility(trimmed, primaryType),
2816:       itemHint: this.extractItem(trimmed, primaryType),
2817:       destinationHint: this.extractDestination(trimmed, primaryType),
2818:       trainingHint: this.extractTrainingFocus(trimmed, primaryType),
2819:       environmentHint: "",
2820:       tags: this.buildTags(primaryType, scores, trimmed),
2821:       rawText: trimmed
2822:     };
```

## System Cluster — PlayerSystem

Failures in cluster: 1
Likely section starts near line 1773.

### Likely Source Area
```js
1770: },
1771: 
1772:     // === PLAYER SYSTEM ===
1773: PlayerSystem: {
1774:   init(root = state.aidrpg) {
1775:     if (!root || typeof root !== "object") return null;
1776: 
1777:     const U = globalThis.AIDRPG.Utils;
1778: 
1779:     if (!root.player || typeof root.player !== "object" || Array.isArray(root.player)) {
1780:       root.player = {};
1781:     }
1782: 
1783:     const player = root.player;
1784: 
1785:     if (typeof player.id !== "string" || !player.id) player.id = "player";
1786:     if (typeof player.name !== "string") player.name = "";
1787:     if (typeof player.species !== "string" || !player.species) player.species = "human";
1788:     if (typeof player.age !== "number" || player.age < 0) player.age = 0;
1789:     if (!Array.isArray(player.titles)) player.titles = [];
1790:     if (!player.history || typeof player.history !== "object" || Array.isArray(player.history)) player.history = {};
1791:     if (!Array.isArray(player.history.majorEvents)) player.history.majorEvents = [];
1792:     if (!Array.isArray(player.history.timeSkips)) player.history.timeSkips = [];
1793: 
1794:     if (!player.levelState || typeof player.levelState !== "object" || Array.isArray(player.levelState)) {
1795:       player.levelState = {};
1796:     }
1797:     if (typeof player.levelState.level !== "number") player.levelState.level = 1;
1798:     if (typeof player.levelState.xp !== "number") player.levelState.xp = 0;
1799:     if (typeof player.levelState.xpToNext !== "number") player.levelState.xpToNext = 100;
1800:     if (typeof player.levelState.totalXp !== "number") player.levelState.totalXp = 0;
1801:     if (typeof player.levelState.growthClass !== "string" || !player.levelState.growthClass) {
1802:       player.levelState.growthClass = "standard";
1803:     }
1804: 
1805:     if (!player.stats || typeof player.stats !== "object" || Array.isArray(player.stats)) {
1806:       player.stats = {};
1807:     }
1808: 
```

## System Cluster — SceneStateSystem

Failures in cluster: 1
Likely section starts near line 5143.

### Likely Source Area
```js
5140: },
5141: 
5142:     // === SCENE STATE SYSTEM ===
5143: SceneStateSystem: {
5144:   init(root = state.aidrpg) {
5145:   if (!root || typeof root !== "object") return null;
5146: 
5147:   if (!root.world || typeof root.world !== "object" || Array.isArray(root.world)) {
5148:     root.world = {};
5149:   }
5150: 
5151:   if (!root.world.currentScene || typeof root.world.currentScene !== "object" || Array.isArray(root.world.currentScene)) {
5152:     root.world.currentScene = {};
5153:   }
5154: 
5155:   const scene = root.world.currentScene;
5156: 
5157:   if (typeof scene.sceneRef !== "string") scene.sceneRef = "";
5158:   if (typeof scene.displayName !== "string") scene.displayName = "";
5159:   if (typeof scene.sceneType !== "string") scene.sceneType = "unknown";
5160:   if (typeof scene.entityRef !== "string") scene.entityRef = "";
5161:   if (typeof scene.parentLocationRef !== "string") scene.parentLocationRef = "";
5162:   if (typeof scene.lastChangedTurn !== "number") scene.lastChangedTurn = 0;
5163: 
5164:   if (!Array.isArray(scene.localEntityIds)) scene.localEntityIds = [];
5165:   if (!Array.isArray(scene.localActorIds)) scene.localActorIds = [];
5166:   if (!Array.isArray(scene.localHazards)) scene.localHazards = [];
5167:   if (!Array.isArray(scene.localExits)) scene.localExits = [];
5168:   if (!Array.isArray(scene.conditionTags)) scene.conditionTags = [];
5169: 
5170:   if (!scene.localEntitiesById || typeof scene.localEntitiesById !== "object" || Array.isArray(scene.localEntitiesById)) {
5171:     scene.localEntitiesById = {};
5172:   }
5173: 
5174:   if (!scene.localActorsById || typeof scene.localActorsById !== "object" || Array.isArray(scene.localActorsById)) {
5175:     scene.localActorsById = {};
5176:   }
5177: 
5178:   if (typeof scene.sceneHintLabel !== "string") scene.sceneHintLabel = "";
```

## System Cluster — WorldEntitySystem

Failures in cluster: 1
Likely section starts near line 6210.

### Likely Source Area
```js
6207: },
6208: 
6209:     // === WORLD ENTITY SYSTEM ===
6210: WorldEntitySystem: {
6211:   init(root = state.aidrpg) {
6212:     if (!root || typeof root !== "object") return null;
6213: 
6214:     if (!root.world || typeof root.world !== "object" || Array.isArray(root.world)) {
6215:       root.world = {};
6216:     }
6217: 
6218:     const world = root.world;
6219: 
6220:     if (!world.locationsById || typeof world.locationsById !== "object" || Array.isArray(world.locationsById)) {
6221:       world.locationsById = {};
6222:     }
6223: 
6224:     if (!world.entitiesById || typeof world.entitiesById !== "object" || Array.isArray(world.entitiesById)) {
6225:       world.entitiesById = {};
6226:     }
6227: 
6228:     if (!world.factionsById || typeof world.factionsById !== "object" || Array.isArray(world.factionsById)) {
6229:       world.factionsById = {};
6230:     }
6231: 
6232:     if (!world.routesById || typeof world.routesById !== "object" || Array.isArray(world.routesById)) {
6233:       world.routesById = {};
6234:     }
6235: 
6236:     if (!world.currentScene || typeof world.currentScene !== "object" || Array.isArray(world.currentScene)) {
6237:       world.currentScene = {};
6238:     }
6239: 
6240:     if (!world.mapMemory || typeof world.mapMemory !== "object" || Array.isArray(world.mapMemory)) {
6241:       world.mapMemory = {};
6242:     }
6243:     const map = world.mapMemory;
6244:     if (!map.namedLocationsById || typeof map.namedLocationsById !== "object" || Array.isArray(map.namedLocationsById)) map.namedLocationsById = {};
6245:     if (!map.dungeonLayoutsById || typeof map.dungeonLayoutsById !== "object" || Array.isArray(map.dungeonLayoutsById)) map.dungeonLayoutsById = {};
```

## System Cluster — ContextPacketSystem

Failures in cluster: 1
Likely section starts near line 15461.

### Likely Source Area
```js
15458: },
15459: 
15460:     // === CONTEXT PACKET SYSTEM ===
15461: ContextPacketSystem: {
15462:   init(root = state.aidrpg) {
15463:     if (!root || typeof root !== "object") return null;
15464: 
15465:     if (!root.cache || typeof root.cache !== "object" || Array.isArray(root.cache)) {
15466:       root.cache = {};
15467:     }
15468: 
15469:     if (!root.meta || typeof root.meta !== "object" || Array.isArray(root.meta)) {
15470:       root.meta = {};
15471:     }
15472: 
15473:     if (typeof root.meta.mode !== "string" || !root.meta.mode) {
15474:       root.meta.mode = "normal";
15475:     }
15476: 
15477:     if (typeof root.cache.priorityPacket !== "string") root.cache.priorityPacket = "";
15478:     if (typeof root.cache.scenePacket !== "string") root.cache.scenePacket = "";
15479:     if (typeof root.cache.playerPacket !== "string") root.cache.playerPacket = "";
15480:     if (typeof root.cache.timePacket !== "string") root.cache.timePacket = "";
15481:     if (typeof root.cache.actorPacket !== "string") root.cache.actorPacket = "";
15482:     if (typeof root.cache.reputationPacket !== "string") root.cache.reputationPacket = "";
15483:     if (typeof root.cache.questPacket !== "string") root.cache.questPacket = "";
15484:     if (typeof root.cache.worldPacket !== "string") root.cache.worldPacket = "";
15485:     if (typeof root.cache.mapPacket !== "string") root.cache.mapPacket = "";
15486:     if (typeof root.cache.recentEventPacket !== "string") root.cache.recentEventPacket = "";
15487:     if (typeof root.cache.contextPacket !== "string") root.cache.contextPacket = "";
15488:     if (typeof root.cache.packetMode !== "string") root.cache.packetMode = "normal";
15489: 
15490:     return root.cache;
15491:   },
15492: 
15493:   buildContext(rawText, root = state.aidrpg) {
15494:     if (!root || typeof root !== "object") return String(rawText || "");
15495:     this.init(root);
15496: 
```

## FAIL — Intent 9: equip phrasing

Suite: intent
Likely system: IntentParser
Roadmap maturity: UNLABELED
Severity: Medium
Confidence: Medium

### Intended function under test
Verify freeform player phrasing is converted into the correct broad action family.

### Expected AI Dungeon-style outcome
The primary intent should be equip.

### Minimal reproduction
- input: "I equip the cracked bronze shield."

### What failed
- Assertion failed: equals on `state.aidrpg.pending.inputIntent.primaryType` | expected: "equip" | actual: "defend"

### What likely needs inspection
Inspect IntentParser scoring, extraction, and primary intent tie-breaking.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  }
]
```

## FAIL — Player: identity hints from AI output should become stable player facts

Suite: player
Likely system: PlayerSystem
Roadmap maturity: UNLABELED
Severity: Medium
Confidence: Medium

### Intended function under test
Test stable player identity extraction from AI Dungeon-style opening narration.

### Minimal reproduction
- input: "Begin."
- output: "You, Kaelen, a 24 year old elf, wake beneath the branches. Your head brushes the low beam."

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.player.appearance.visibleTraits` | expected: "tall" | actual: []

### What likely needs inspection
Inspect PlayerSystem. The failed assertion and state diff show the expected state was not produced or exposed.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1223769095"
  },
  {
    "path": "state.aidrpg.player.name",
    "before": "",
    "after": "Kaelen"
  },
  {
    "path": "state.aidrpg.player.species",
    "before": "human",
    "after": "elf"
  },
  {
    "path": "state.aidrpg.player.age",
    "before": 0,
    "after": 24
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 4
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.07
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 4,
          "note": "interaction",
          "minutesAdvanced": 4
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

## FAIL — Story-granted item 1: guard pouch

Suite: inventory
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Test story-supplied item capture from AI output, not just explicit player pickup commands.

### Expected AI Dungeon-style outcome
The item implied by the narration should become a stable item record: rusted iron key.

### Minimal reproduction
- input: "I examine what happened."
- output: "You find a rusted iron key in the dead guard's pouch and take it."
- input: "/inventory"

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "rusted iron key" | actual: ["byId","item_1_1","id","item_1_1","displayName","dead guards pouch","baseType","pouch","descriptors","dead","guards","materialTags","quality","","condition","durability","100","stateTags","slot","","stackable","false","quantity","1","stats","ownership","holder","player","visibility","packed","notes","sourceContext","story_gain","observedChanges","ownership","player","item_1_1","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1067222151"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "item_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.byId.item_1_1",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "id",
        "displayName",
        "baseType",
        "descriptors",
        "materialTags",
        "quality",
        "condition",
        "slot",
        "stackable",
        "quantity",
        "stats",
        "ownership",
        "notes"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.ownership.player",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "item_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.pendingNormalization",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 1
Owned Items: dead guards pouch

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Story-granted item 2: merchant gift

Suite: inventory
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Test story-supplied item capture from AI output, not just explicit player pickup commands.

### Expected AI Dungeon-style outcome
The item implied by the narration should become a stable item record: small silver compass.

### Minimal reproduction
- input: "I examine what happened."
- output: "The merchant presses a small silver compass into your hand as thanks."
- input: "/inventory"

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "small silver compass" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1964987335"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "local_actor_merchant"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "actorId": "actor_1_1",
          "name": "local_actor_merchant"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "local_actor_merchant"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "local_actor_merchant"
      ]
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 0
Owned Items: none

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Story-granted item 3: quest reward

Suite: inventory
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Test story-supplied item capture from AI output, not just explicit player pickup commands.

### Expected AI Dungeon-style outcome
The item implied by the narration should become a stable item record: stitched leather charm.

### Minimal reproduction
- input: "I examine what happened."
- output: "Mira rewards you with a stitched leather charm marked with a moon symbol."
- input: "/inventory"

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "stitched leather charm" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3753173484"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 5
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.08
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 5,
          "note": "inspection",
          "minutesAdvanced": 5
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.pendingReports",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 0
Owned Items: none

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Story-granted item 4: loot chest

Suite: inventory
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Test story-supplied item capture from AI output, not just explicit player pickup commands.

### Expected AI Dungeon-style outcome
The item implied by the narration should become a stable item record: chipped bronze dagger.

### Minimal reproduction
- input: "I examine what happened."
- output: "Inside the chest you claim a chipped bronze dagger and three silver coins."
- input: "/inventory"

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "chipped bronze dagger" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "859062266"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "local_entity_chest"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntitiesById.local_entity_chest",
    "after": "chest"
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 5
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.08
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 5,
          "note": "inspection",
          "minutesAdvanced": 5
        }
      ]
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 0
Owned Items: none

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Story-granted item 5: condition item

Suite: inventory
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Test story-supplied item capture from AI output, not just explicit player pickup commands.

### Expected AI Dungeon-style outcome
The item implied by the narration should become a stable item record: sword.

### Minimal reproduction
- input: "I examine what happened."
- output: "Your sword cracks against the golem, leaving the blade chipped and dull."
- input: "/inventory"

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "sword" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect story-granted item capture, output consequence parsing, item record creation, and visible carry summary.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1229443138"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 5
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.08
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 5,
          "note": "inspection",
          "minutesAdvanced": 5
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.pendingReports",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 0
Owned Items: none

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Time: thirty-minute confirmed travel advances elapsed time once

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Confirmed AI output saying travel took thirty minutes should advance elapsed time by about 0.5 hours.

### Expected AI Dungeon-style outcome
Elapsed time increases once; debug time reflects the advance.

### Why it matters
If time does not advance from actual narration, travel/rest timelines drift and later context becomes unreliable.

### Minimal reproduction
- input: "I travel from the market gate to the ruined chapel."
- output: "The road from the market gate to the ruined chapel takes thirty minutes."
- input: "/time"

### What failed
- Assertion failed: numberBetween on `state.aidrpg.time.elapsed.totalHours` | range: 0.45..0.75 | actual: 11

### What likely needs inspection
Inspect TimeTravelSystem.processOutput duration extraction and apply-time-advance logic.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2063408665"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "travel"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.parentLocationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "gate",
        "path"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 11
Minute: 0
Season: (unset)
Weather: (unset)

Elapsed Hours: 11
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Time: duplicate thirty-minute output must not double-advance time

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Repeated/retried identical output should not apply the same travel duration twice.

### Expected AI Dungeon-style outcome
Elapsed time remains about thirty minutes, not one hour.

### Why it matters
AI Dungeon retries and erase/continue can replay output. Time systems need idempotency.

### Minimal reproduction
- input: "I travel to the ruined chapel."
- output: "The road to the ruined chapel takes thirty minutes."
- output: "The road to the ruined chapel takes thirty minutes."
- input: "/time"

### What failed
- Assertion failed: numberBetween on `state.aidrpg.time.elapsed.totalHours` | range: 0.45..0.75 | actual: 11

### What likely needs inspection
Inspect TurnEngine duplicate output hashing and TimeTravelSystem idempotency keys.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1900409253"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "travel"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.parentLocationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "path"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 11
Minute: 0
Season: (unset)
Weather: (unset)

Elapsed Hours: 11
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Time: three-hour wait advances clock coherently

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Common AI phrasing such as three hours pass should advance elapsed time coherently.

### Minimal reproduction
- input: "I wait at the shrine until the storm weakens."
- output: "Three hours pass before the storm weakens enough to move safely."
- input: "/time"

### What failed
- Assertion failed: numberBetween on `state.aidrpg.time.elapsed.totalHours` | range: 2.75..3.25 | actual: 8.5

### What likely needs inspection
Inspect duration phrase parser for numeric words and hour units.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3201748288"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "recovery",
          "note": "rest"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "recovery"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 30
  },
  {
    "path": "state.aidrpg.time.current.weather",
    "before": "",
    "after": "storm"
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.5
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 30,
          "note": "rest",
          "minutesAdvanced": 30
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 30
Season: (unset)
Weather: storm

Elapsed Hours: 8.5
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Time: vague moments later should not create a giant jump

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_WARNING
Severity: Medium
Confidence: Medium

### Intended function under test
Small vague time phrases should remain small or be ignored, not converted into hours/days.

### Minimal reproduction
- input: "I wait for Mira to answer."
- output: "A few tense moments later, Mira finally answers."
- input: "/time"

### What failed
- Assertion failed: numberAtMost on `state.aidrpg.time.elapsed.totalHours` | expected: 0.25 | actual: 8.25

### What likely needs inspection
Inspect vague duration mapping and soft-fail behavior.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "728361399"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "recovery",
          "note": "rest"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "recovery"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 15
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.25
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 15,
          "note": "rest",
          "minutesAdvanced": 15
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.pendingReports",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 15
Season: (unset)
Weather: (unset)

Elapsed Hours: 8.25
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Time: route duration memory should store meaningful route travel baseline

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Known route durations should become route memory, not just one-off elapsed time.

### Minimal reproduction
- input: "I travel from Parada to the Stone Veil road marker."
- output: "The route from Parada to the Stone Veil road marker takes two days by wagon."
- input: "/time"

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.time.routes` | expected: ["parada","stone","2"] | actual: ["knownTravelTimes","baseTravelTimes","recentRouteEvents"]
- Assertion failed: numberAtLeast on `state.aidrpg.time.elapsed.totalHours` | expected: 24 | actual: 11

### What likely needs inspection
Inspect route key normalization and knownTravelTimes update logic.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "442502359"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "travel"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "",
    "after": "location_stone_veil_road_marker"
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.parentLocationRef",
    "before": "",
    "after": "location_stone_veil_road_marker"
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "path"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.locationsById.location_stone_veil_road_marker",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "identity",
        "mutable"
      ]
    }
  },
  {
    "path": "state.aidrpg.time.current.hour",
    "before": 8,
    "after": 11
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 11
Minute: 0
Season: (unset)
Weather: (unset)

Elapsed Hours: 11
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Time + Context: current time truth should be exposed after travel

Suite: time
Likely system: TimeTravelSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Time is not useful unless the next Context pass exposes compact current time truth to the AI.

### Minimal reproduction
- input: "I travel to the ruined chapel."
- output: "The walk to the ruined chapel takes forty-five minutes, and dusk is approaching."
- context: "The player stands near the chapel gate."

### What failed
- Assertion failed: numberBetween on `state.aidrpg.time.elapsed.totalHours` | range: 0.65..0.9 | actual: 11

### What likely needs inspection
Inspect TimeTravelSystem context summary and ContextPacketSystem time packet priority.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1705553763"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "travel"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.parentLocationRef",
    "before": "",
    "after": "location_ruined_chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  }
]
```

## FAIL — Scene: arrival output should establish local scene truth

Suite: scene
Likely system: SceneStateSystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Confirmed arrival should update immediate local truth and context exposure.

### Minimal reproduction
- input: "I continue to the old chapel."
- output: "After the walk, you arrive at the old chapel gate. The cracked stone steps and sealed black door stand before you."
- context: "Continue at the chapel gate."

### What failed
- Assertion failed: anyStringContainsAny on `state.aidrpg.world` | expected: ["old chapel","chapel gate","black door","cracked stone"] | actual: ["currentScene","sceneRef","scene_chapel","displayName","chapel","sceneType","scene","entityRef","entity_chapel","parentLocationRef","","lastChangedTurn","1","localEntityIds","localActorIds","localHazards","localExits","door","gate","conditionTags","damaged","localEntitiesById","localActorsById","sceneHintLabel","chapel","sceneHintStrength","3","sceneHintTurn","1","pendingSceneLabel","","pendingSceneStrength","0","pendingSceneCount","0","pendingSceneTurn","0","sceneConfidence","3","locationsById","entitiesById","entity_chapel","identity","id","entity_chapel","displayName","chapel","kind","scene","createdTurn","1","mutable","conditionTags","damaged","hazardTags","exitHints","door","gate","ownerHints","materialHints","stone","districtHints","actorHints","objectHints","lastConfirmedTurn","1","links","sceneRef","scene_chapel","parentLocationRef","","factionIds","factionsById","routesById","mapMemory","namedLocationsById","dungeonLayoutsById","goalBindingsById","recentMapEvents","currentDungeonId","","lastDungeonRoomId","","activeEncounter","enemyLabel","","totalCount","0","remainingCount","0","resolved","false","recentEvents"]

### What likely needs inspection
Inspect SceneStateSystem.processOutput, current scene refs, local hazards/exits, and ContextPacketSystem scene packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "923512262"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.sceneRef",
    "before": "",
    "after": "scene_chapel"
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneRef",
    "before": "",
    "after": "scene_chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.displayName",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneType",
    "before": "unknown",
    "after": "scene"
  },
  {
    "path": "state.aidrpg.world.currentScene.entityRef",
    "before": "",
    "after": "entity_chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.lastChangedTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

## FAIL — World: building ownership/layout/materials should not dissolve into vague text

Suite: world
Likely system: WorldEntitySystem
Roadmap maturity: CURRENT_BLOCKER
Severity: High
Confidence: Medium

### Intended function under test
Important places need identity, materials, ownership, side/district, and layout detail preserved.

### Minimal reproduction
- input: "I inspect the Ashglass Bar in the market district."
- output: "The Ashglass Bar is a two-story tavern of black glass and oak on the east side of the market district, owned by Talla Venn."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.world` | expected: ["Ashglass","tavern","market"] | actual: ["currentScene","sceneRef","","displayName","","sceneType","unknown","entityRef","","parentLocationRef","","lastChangedTurn","0","localEntityIds","localActorIds","localHazards","localExits","east","conditionTags","localEntitiesById","localActorsById","sceneHintLabel","tavern","sceneHintStrength","1","sceneHintTurn","1","pendingSceneLabel","","pendingSceneStrength","0","pendingSceneCount","0","pendingSceneTurn","0","sceneConfidence","0","locationsById","location_ashglass_bar","identity","id","location_ashglass_bar","displayName","Ashglass Bar","kind","location","createdTurn","1","mutable","districtHints","atmosphereTags","linkedEntityIds","linkedFactionIds","ownerHints","materialHints","conditionTags","lastConfirmedTurn","1","layoutFacts","roomAssignment","","entitiesById","factionsById","routesById","mapMemory","namedLocationsById","named_location_ashglass_bar","id","named_location_ashglass_bar","displayName","Ashglass Bar","layoutFacts","roomAssignment","","goalRefs","firstSeenTurn","1","lastSeenTurn","1","dungeonLayoutsById","goalBindingsById","recentMapEvents","currentDungeonId","","lastDungeonRoomId","","activeEncounter","enemyLabel","","totalCount","0","remainingCount","0","resolved","false","recentEvents"]

### What likely needs inspection
Inspect WorldEntitySystem entity/building record extraction and identity/mutable split.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "13799343"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "east"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "tavern"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.world.locationsById.location_ashglass_bar",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "identity",
        "mutable"
      ]
    }
  }
]
```

## FAIL — Context pressure: newly dirty inventory should survive crowded history/cards

Suite: context-pressure
Likely system: ContextPacketSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
AI Dungeon context assembly has limited space. Immediate current truth should survive context pressure better than older lore.

### Expected AI Dungeon-style outcome
The key should be visible in script-generated context even when history/cards are crowded.

### Why it matters
If the key disappears from context, the live AI may forget the player can open the chapel door.

### Minimal reproduction
- input: "I take the black sigil key from the dead guard."
- output: "You take the black sigil key and leave the iron keyring behind."
- context: "The player stands before the sealed chapel door while old lore and many memories compete for context."

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "black sigil key" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]
- Assertion failed: lastReturnContainsAny | expected: ["black sigil key","sigil key","key"] | actual: "Current truth:\nPlayer: Lvl 1 | Age unknown | human | Titles: none | HP 100/100 | MP 20/20 | EP 50/50 | Cond: none | Injuries: none | Outfit: unspecified\nRecent: XP +3 from combat\nTime: Day 1 | 08:06\nScene: unknown place | Type: unknown\n\nThe player stands before the sealed chapel door while old lore and many memories compete for context."

### What likely needs inspection
Inspect ContextPacketSystem priority ordering, dirty inventory priority, packet size caps, and stale packet invalidation.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1494043864"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 3,
          "source": "combat",
          "note": "defend"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "combat"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 6
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.1
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 6,
          "note": "combat",
          "minutesAdvanced": 6
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.pendingReports",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

## FAIL — NPC simulation 1: Mira trust after rescue

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: Mira, trust, uneasy.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I pull Mira away from the collapsing wall and ask if she can still walk."
- output: "Mira coughs, shaken but alive. She grips your sleeve and says she trusts you now, though she is still uneasy around the chapel."
- context: "Current scene includes Mira."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["Mira","trust","uneasy"] | actual: ["majorMemory","byActorId","actor_1_2","actorId","actor_1_2","name","She","createdTurn","1","lastSeenTurn","1","lastUpdatedTurn","1","relationshipStance","friendly","goals","grudges","attitudeNotes","She grips your sleeve and says she trusts you","longTermNotes","recentEvents","relationship: friendly: She grips your sleeve and says she trusts you","activation","reason","important_named_actor","activationCount","1","activeIds","actor_1_2","recentEvents","turn","1","kind","activated","actorId","actor_1_2","name","She","text","important_named_actor","turn","1","kind","relationship","actorId","actor_1_2","name","She","text","friendly: She grips your sleeve and says she trusts you","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","actor_1_2","identity","id","actor_1_2","name","She","sceneKey","she","category","humanoid","roleTags","rankTags","leader","factionRefs","levelProfile","resolvedLevel","7","bandMin","5","bandMax","9","stats","hp","126","maxHp","126","atk","11","def","11","spd","11","intl","11","buildTags","command","abilities","command presence","equipment","ordinary gear","relationshipToPlayer","0","knownState","alive","true","injured","mood","","locationRef","","lastSeenTurn","1","importance","persistent","true","major","true","score","5","sightings","1","bySceneKey","she","actor_1_2","allIds",

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "233162021"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "social",
          "note": "talk"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "social"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.byActorId.actor_1_2",
    "after": {
      "type": "object",
      "keyCount": 12,
      "keys": [
        "actorId",
        "name",
        "createdTurn",
        "lastSeenTurn",
        "lastUpdatedTurn",
        "relationshipStance",
        "goals",
        "grudges",
        "attitudeNotes",
        "longTermNotes",
        "recentEvents",
        "activation"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.activeIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        {
          "turn": 1,
          "kind": "activated",
          "actorId": "actor_1_2",
          "name": "She",
          "text": "important_named_actor"
        },
        {
          "turn": 1,
          "kind": "relationship",
          "actorId": "actor_1_2",
          "name": "She",
          "text": "friendly: She grips your sleeve and says she trusts you"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "actor_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "she"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "actorId": "actor_1_2",
          "name": "She"
        }
      ]
    }
  }
]
```

## FAIL — NPC simulation 2: Guard hostility after threat

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: Captain Dorne, hostile, guard.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I threaten Captain Dorne and demand he open the gate."
- output: "Captain Dorne stiffens, becoming openly hostile. He orders two guards to block your path."
- context: "Current scene includes Captain Dorne."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["Captain Dorne","hostile","guard"] | actual: ["majorMemory","byActorId","actor_1_1","actorId","actor_1_1","name","Captain Dorne","createdTurn","1","lastSeenTurn","1","lastUpdatedTurn","1","relationshipStance","neutral","goals","grudges","attitudeNotes","longTermNotes","recentEvents","activation","reason","titled_major_actor","activationCount","1","activeIds","actor_1_1","recentEvents","turn","1","kind","activated","actorId","actor_1_1","name","Captain Dorne","text","titled_major_actor","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","actor_1_1","identity","id","actor_1_1","name","Captain Dorne","sceneKey","captain_dorne","category","humanoid","roleTags","captain","rankTags","leader","factionRefs","levelProfile","resolvedLevel","7","bandMin","5","bandMax","9","stats","hp","126","maxHp","126","atk","11","def","11","spd","11","intl","11","buildTags","command","abilities","command presence","equipment","ordinary gear","relationshipToPlayer","0","knownState","alive","true","injured","mood","","locationRef","","lastSeenTurn","1","importance","persistent","true","major","true","score","5","sightings","1","bySceneKey","captain_dorne","actor_1_1","allIds","actor_1_1","localIds","pendingGeneration","recentUpdates","turn","1","actorId","actor_1_1","name","Captain Dorne","sightingsByKey","captain_dorne","1"]

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3710213006"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.byActorId.actor_1_1",
    "after": {
      "type": "object",
      "keyCount": 12,
      "keys": [
        "actorId",
        "name",
        "createdTurn",
        "lastSeenTurn",
        "lastUpdatedTurn",
        "relationshipStance",
        "goals",
        "grudges",
        "attitudeNotes",
        "longTermNotes",
        "recentEvents",
        "activation"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.activeIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.majorMemory.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "kind": "activated",
          "actorId": "actor_1_1",
          "name": "Captain Dorne",
          "text": "titled_major_actor"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "captain_dorne"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "actorId": "actor_1_1",
          "name": "Captain Dorne"
        }
      ]
    }
  }
]
```

## FAIL — NPC simulation 3: Merchant relationship and transaction

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: Talla, cracked bronze shield.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I politely buy the cracked bronze shield from Talla."
- output: "Talla accepts your silver and hands over the cracked bronze shield, warming to your respectful tone."
- context: "Current scene includes Talla."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["Talla","cracked bronze shield"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2811873800"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 3,
          "source": "combat",
          "note": "defend"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "combat"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "damaged"
      ]
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 6
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.1
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 6,
          "note": "combat",
          "minutesAdvanced": 6
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  }
]
```

## FAIL — NPC simulation 5: Wounded NPC condition persists

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: Seren, wounded, bandage.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I check Seren's wound."
- output: "Seren is pale and wounded, clutching a blood-soaked bandage, but she insists she can keep moving."
- context: "Current scene includes Seren."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["Seren","wounded","bandage"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "975937308"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.conditions.active",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "soaked"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.conditions.permanent",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.vulnerabilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.immunities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byId.condition_1_2",
    "after": {
      "type": "object",
      "keyCount": 4,
      "keys": [
        "identity",
        "state",
        "meaning",
        "progression"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byKey.soaked",
    "after": "condition_1_2"
  },
  {
    "path": "state.aidrpg.player.traitState.allIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.conditionIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.traitIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.resistanceTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.immunityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.vulnerabilityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.adaptationTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.sensitivityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.exposureByDomain.water",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "count",
        "lastTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.growthHooks",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  }
]
```

## FAIL — NPC simulation 6: NPC follows player as companion state

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: Mira, follow, chapel.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I ask Mira to follow me to the old chapel."
- output: "Mira agrees to follow, keeping close behind you as you approach the old chapel."
- context: "Current scene includes Mira."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["Mira","follow","chapel"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3944436405"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "social",
          "note": "talk"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "social"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 8
  }
]
```

## FAIL — NPC simulation 8: Beast/monster profile should not become normal civilian

Suite: npc
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: Medium
Confidence: Medium

### Intended function under test
Simulate an AI Dungeon NPC interaction and verify the script preserves the intended actor identity, condition, relationship stance, or selectivity.

### Expected AI Dungeon-style outcome
Actor state/context should preserve: ash wolf, wary, limp.

### Why it matters
NPC memory is only useful if important recurring actors persist while throwaway extras do not bloat the state.

### Minimal reproduction
- input: "I study the ash wolf circling the camp."
- output: "The ash wolf limps on one burned paw, wary but not yet attacking."
- context: "Current scene includes ash wolf."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.actors` | expected: ["ash wolf","wary","limp"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect ActorProfileSystem name detection, importance threshold, relationship stance parsing, current condition parsing, and actor context packet exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2550022719"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 2
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 2,
          "source": "exploration",
          "note": "inspect"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "exploration"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.conditions.active",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "burned"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.conditions.permanent",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.vulnerabilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.immunities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byId.condition_1_2",
    "after": {
      "type": "object",
      "keyCount": 4,
      "keys": [
        "identity",
        "state",
        "meaning",
        "progression"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byKey.burned",
    "after": "condition_1_2"
  },
  {
    "path": "state.aidrpg.player.traitState.allIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.conditionIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.traitIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.resistanceTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.immunityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.vulnerabilityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.adaptationTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.sensitivityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.exposureByDomain.fire",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "count",
        "lastTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.growthHooks",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  }
]
```

## FAIL — Model-style output 1: Narrative implication: item granted without explicit take verb

Suite: model-style
Likely system: InventorySystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Many AI Dungeon outputs imply possession without saying “you take”. Story-granted item capture should handle this.

### Expected AI Dungeon-style outcome
The script should interpret the AI Dungeon-style prose without over-saving or missing the intended state.

### Minimal reproduction
- input: "I accept the reward without making a scene."
- output: "The grateful widow slips a worn brass locket into your palm before disappearing into the rain."
- context: "Continue the scene while preserving current truth."

### What failed
- Assertion failed: anyStringContainsAny on `state.aidrpg.items` | expected: ["worn brass locket"] | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect InventorySystem parsing of implicit/negative/ambiguous model output.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3745583021"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 4
  },
  {
    "path": "state.aidrpg.time.current.weather",
    "before": "",
    "after": "rain"
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.07
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 4,
          "note": "interaction",
          "minutesAdvanced": 4
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

## FAIL — Model-style output 2: Dialogue implication: NPC attitude changes through speech

Suite: model-style
Likely system: ActorProfileSystem
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Relationship changes may be implied through dialogue and body language, not explicit “trust +1” wording.

### Expected AI Dungeon-style outcome
The script should interpret the AI Dungeon-style prose without over-saving or missing the intended state.

### Minimal reproduction
- input: "I apologize to Mira and admit I was wrong."
- output: "“Maybe I misjudged you,” Mira says, her voice softening. She no longer keeps her hand on her knife."
- context: "Continue the scene while preserving current truth."

### What failed
- Assertion failed: anyStringContainsAny on `state.aidrpg.actors` | expected: ["Mira","softening","misjudged","knife"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect ActorProfileSystem parsing of implicit/negative/ambiguous model output.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2016103762"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 4
  },
  {
    "path": "state.aidrpg.time.elapsed.totalHours",
    "before": 0,
    "after": 8.07
  },
  {
    "path": "state.aidrpg.time.timeline.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "day": 1,
          "hour": 8,
          "minute": 4,
          "note": "interaction",
          "minutesAdvanced": 4
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.time.pendingAdvance",
    "before": {
      "type": "object",
      "keyCount": 6,
      "keys": [
        "kind",
        "minutes",
        "destinationHint",
        "startLocationRef",
        "createdTurn",
        "note"
      ]
    },
    "after": null
  },
  {
    "path": "state.aidrpg.time.contradictionFlags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.recentChanges",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.rumors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.reputation.pendingReports",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

## FAIL — Integration: guard loot + injury + time + NPC + context

Suite: integration
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Full AI Dungeon-style turn: one input and one model output should update inventory, player condition, time/scene, NPC state, and immediate context.

### Minimal reproduction
- input: "I search the dead guard, take his rusted iron key, bandage my wounded arm, and hurry toward the old chapel before sunset."
- output: "You find a rusted iron key in the guard's pouch. Your arm still aches, but the bandage slows the bleeding. The road to the chapel takes thirty minutes. Mira follows, clearly uneasy."
- context: "The player approaches the old chapel before sunset."

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "rusted iron key" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]
- Assertion failed: noInternalIdLeak on `lastReturn.text` | actual: "Current truth:\nPriority: Cond bleeding\nPlayer: Lvl 1 | Age unknown | human | Titles: none | HP 100/100 | MP 20/20 | EP 50/50 | Cond: bleeding | Injuries: none | Outfit: unspecified | Traits: Active: bleeding\nMap: Goal places: find a rusted iron key in the guard's pouch at guard's pouch [location_guards_pouch] | Map note: Goal location: find a rusted iron key in the guard's pouch at guard's pouch.\nRecent: XP +3 from combat\nTime: Day 1 | 08:06\nScene: unknown place | Type: unknown | Facts: path\nNearby actors: local_actor_guard [humanoid] lvl 1-3\n\nThe player approaches the old chapel before sunset."

### What likely needs inspection
Use state diffs to find the first missing link: item capture, player injury, time parsing, actor parsing, or context exposure.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2439680617"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "actor_1_3"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 3,
          "source": "combat",
          "note": "defend"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "combat"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.conditions.active",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "bleeding"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.conditions.permanent",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.vulnerabilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.conditions.immunities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byId.condition_1_2",
    "after": {
      "type": "object",
      "keyCount": 4,
      "keys": [
        "identity",
        "state",
        "meaning",
        "progression"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.byKey.bleeding",
    "after": "condition_1_2"
  },
  {
    "path": "state.aidrpg.player.traitState.allIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.conditionIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "condition_1_2"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState.traitIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.resistanceTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.immunityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.vulnerabilityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.adaptationTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.sensitivityTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.growthHooks",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.traitState.recentEvents",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  }
]
```

## FAIL — Integration: merchant purchase should affect actor, item, currency, and inventory display

Suite: integration
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Medium
Confidence: Medium

### Intended function under test
Test merchant transaction across inventory, currency/ownership, actor relation, debug display, and context.

### Minimal reproduction
- input: "I buy the cracked bronze shield from Talla for two silver."
- output: "Talla accepts two silver coins and hands you the cracked bronze shield, smiling at the fair trade."
- input: "/inventory"
- context: "The market remains busy around Talla's stall."

### What failed
- Assertion failed: anyStringContainsAny on `state.aidrpg.actors` | expected: ["Talla","trade","merchant","smiling"] | actual: ["majorMemory","byActorId","activeIds","recentEvents","config","maxMajorActors","12","maxGoals","6","maxGrudges","6","maxNotes","8","maxEvents","40","activationSightings","5","byId","bySceneKey","allIds","localIds","pendingGeneration","recentUpdates","sightingsByKey"]

### What likely needs inspection
Inspect Unknown / Cross-System. The failed assertion and state diff show the expected state was not produced or exposed.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2115297543"
  },
  {
    "path": "state.aidrpg.meta.dirty.abilities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.items",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "item_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.actors",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.entities",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.routes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.meta.dirty.cards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 3
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 3,
          "source": "combat",
          "note": "defend"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "combat"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.byId.item_1_1",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "id",
        "displayName",
        "baseType",
        "descriptors",
        "materialTags",
        "quality",
        "condition",
        "slot",
        "stackable",
        "quantity",
        "stats",
        "ownership",
        "notes"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.ownership.player",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "item_1_1"
      ]
    }
  },
  {
    "path": "state.aidrpg.items.pendingNormalization",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 1
Owned Items: cracked bronze shield

Equipped:
mainHand: (empty)
offHand: (empty)
head: (empty)
body: (empty)
hands: (empty)
legs: (empty)
feet: (empty)
accessory1: (empty)
accessory2: (empty)

Currency - copper: 0
Currency - silver: 0
Currency - gold: 0

```

## FAIL — Simulation: chapel key puzzle path

Suite: simulation
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: High
Confidence: Medium

### Intended function under test
Multi-turn AI Dungeon-style puzzle simulation testing NPC clue, correct item selection, negation, door interaction, and context persistence.

### Minimal reproduction
- input: "I question Mira about the chapel door."
- output: "Mira says the chapel door only opens for the black sigil key, then points toward the dead guard."
- input: "I search the dead guard and take the black sigil key, not the iron keyring."
- output: "You find the black sigil key in the guard's pouch and leave the iron keyring behind."
- input: "I unlock the chapel door with the black sigil key."
- output: "The black sigil key turns in the chapel lock, and the sealed door opens."
- context: "The chapel door is open."

### What failed
- Assertion failed: anyStringContains on `state.aidrpg.items` | expected: "black sigil key" | actual: ["byId","ownership","player","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","0","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect Unknown / Cross-System. The failed assertion and state diff show the expected state was not produced or exposed.

### State diffs
```json
[
  {
    "path": "state.aidrpg",
    "after": {
      "type": "object",
      "keyCount": 14,
      "keys": [
        "meta",
        "player",
        "build",
        "abilities",
        "items",
        "actors",
        "world",
        "time",
        "reputation",
        "quests",
        "pending",
        "cards",
        "cache",
        "logs"
      ]
    }
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "583185414"
  },
  {
    "path": "state.aidrpg.player.titles",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.levelState.xp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.totalXp",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history.recentGains",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        {
          "turn": 1,
          "amount": 1,
          "source": "logistics",
          "note": "interact"
        }
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm.lastSource",
    "before": "",
    "after": "logistics"
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.build.originTags",
    "before": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    },
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "species:human",
        "baseline_mortal",
        "adaptable",
        "novice"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.combatTags",
    "before": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "unproven"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "positioning_first"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stamina_leaning"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "generalist_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "stable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.styleTags",
    "before": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "offensive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.archetypeSummary",
    "before": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    },
    "after": {
      "type": "array",
      "length": 3,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "generalist"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.specializationState",
    "after": {
      "type": "object",
      "keyCount": 11,
      "keys": [
        "profileTags",
        "profileSourceTags",
        "currentTargetTags",
        "currentEnvironmentTags",
        "currentSituationTags",
        "recentAssessments",
        "currentEdge",
        "currentPressure",
        "currentSummary",
        "noveltyActive",
        "lastAssessmentTurn"
      ]
    }
  },
  {
    "path": "state.aidrpg.actors.byId",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.bySceneKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.actors.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.localIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.pendingGeneration",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.recentUpdates",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.actors.sightingsByKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localEntityIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localActorIds",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localHazards",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.localExits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "door"
      ]
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.conditionTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintLabel",
    "before": "",
    "after": "chapel"
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintStrength",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.world.currentScene.sceneHintTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.time.current.minute",
    "before": 0,
    "after": 4
  }
]
```
