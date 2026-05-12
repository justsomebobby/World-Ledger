# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:12.972Z
Suite: adventure-map-continuity
Cases tested: 19
Passed: 14
Failed: 5
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 5 failing test(s)

## Recommended Fix Order

1. TimeTravelSystem: 5 failing test(s), 5 high severity

## System Cluster — TimeTravelSystem

Failures in cluster: 5
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

## FAIL — Route timing / break affects actual elapsed time but not base route duration

Suite: adventure-route-time
Likely system: TimeTravelSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Breaks should affect actual elapsed travel without rewriting the remembered base route.

### Expected AI Dungeon-style outcome
Known route stays one hour; actual interrupted trip can be one hour thirty.

### Minimal reproduction
- input: "We travel from the guild to the Old Barrow but take a thirty minute lunch break halfway."
- output: "The base walk to the Old Barrow is one hour, but the lunch break makes the trip take one hour and thirty minutes total."
- input: "We go back later without taking a break."
- output: "Without the break, the walk back to the Adventurers Guild takes the normal one hour."
- input: "/time"
- context: "Continue after route with break and normal return."

### What failed
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["thirty","30","break","1.5","90"] | actual: ["current","day","1","hour","9","minute","8","season","spring","weather","clear","elapsed","totalHours","9.13","routes","knownTravelTimes","route_adventurers_guild_to_location_old_barrow","fromRef","adventurers_guild","toRef","location_old_barrow","minutes","60","lastActualMinutes","60","lastDelayReason","","lastConfirmedTurn","1","symmetric","true","route_location_old_barrow_to_adventurers_guild","fromRef","location_old_barrow","toRef","adventurers_guild","minutes","60","lastActualMinutes","60","lastDelayReason","","lastConfirmedTurn","1","symmetric","true","baseTravelTimes","route_adventurers_guild_to_location_old_barrow","60","recentRouteEvents","turn","1","message","Route memory: adventurers guild <-> old barrow is 60 minutes.","contradictionFlags","timeline","recentEvents","day","1","hour","9","minute","0","note","travel","minutesAdvanced","60","day","1","hour","9","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["one hour","1 hour","normal"] | actual: ["current","day","1","hour","9","minute","8","season","spring","weather","clear","elapsed","totalHours","9.13","routes","knownTravelTimes","route_adventurers_guild_to_location_old_barrow","fromRef","adventurers_guild","toRef","location_old_barrow","minutes","60","lastActualMinutes","60","lastDelayReason","","lastConfirmedTurn","1","symmetric","true","route_location_old_barrow_to_adventurers_guild","fromRef","location_old_barrow","toRef","adventurers_guild","minutes","60","lastActualMinutes","60","lastDelayReason","","lastConfirmedTurn","1","symmetric","true","baseTravelTimes","route_adventurers_guild_to_location_old_barrow","60","recentRouteEvents","turn","1","message","Route memory: adventurers guild <-> old barrow is 60 minutes.","contradictionFlags","timeline","recentEvents","day","1","hour","9","minute","0","note","travel","minutesAdvanced","60","day","1","hour","9","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]

### What likely needs inspection
Inspect route duration memory and trip-event logging.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.currentTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "recentGains"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "lastSource",
        "repeatCount"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.derived.combatPressure",
    "after": 10
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 8
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 35
  },
  {
    "path": "state.aidrpg.player.age",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.titles",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.history",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "majorEvents",
        "timeSkips"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "byId",
        "byKey",
        "allIds",
        "conditionIds",
        "traitIds",
        "resistanceTags",
        "immunityTags",
        "vulnerabilityTags",
        "adaptationTags",
        "sensitivityTags",
        "exposureByDomain",
        "growthHooks",
        "recentEvents"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "combat_capable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "balanced_method"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "stamina_leaning",
        "control_sensitive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "power_bias",
        "technical_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
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
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "technical-biased"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.matchupProfile",
    "after": {
      "type": "object",
      "keyCount": 3,
      "keys": [
        "strongAgainst",
        "weakAgainst",
        "unfamiliarAgainst"
      ]
    }
  },
  {
    "path": "state.aidrpg.abilities.byKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.abilities.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.skillIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.talentIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.passiveIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.recentEvents",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
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
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.scene",
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
    "path": "state.aidrpg.items.ownership.storage",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.actors",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.offHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.head",
    "after": null
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 9
Minute: 8
Season: spring
Weather: clear

Elapsed Hours: 9.13
Known Route Times: 1
Contradiction Flags: none
Known Routes: adventurers guild <-> Old Barrow = 60m base
Recent Route Notes: Route memory: adventurers guild <-> old barrow is 60 minutes.

```

## FAIL — Route timing variant / rain delay changes actual trip but not base route

Suite: adventure-route-time
Likely system: TimeTravelSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Delays should be logged as actual trip conditions, not random route rewrites.

### Expected AI Dungeon-style outcome
Base route remains stable while the delayed trip is remembered.

### Minimal reproduction
- input: "We go from the Adventurers Guild to the Old Barrow, but muddy rain slows you down."
- output: "The rain and mud make the trip to the Old Barrow take one hour and twenty minutes, but the dry return later takes the usual one hour."
- input: "/time"
- context: "Continue after route variant."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.time` | expected: ["Old Barrow","Adventurers Guild"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","rain","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["one hour","1 hour","normal","usual"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","rain","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["delay","ninety","90","two hours","2 hours","forty","40","twenty","20","detour","mud","limps","scouts"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","rain","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]

### What likely needs inspection
Inspect delay/event reason capture and route baseline separation.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.currentTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "recentGains"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "lastSource",
        "repeatCount"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.derived.combatPressure",
    "after": 10
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 8
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 35
  },
  {
    "path": "state.aidrpg.player.age",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.titles",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.history",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "majorEvents",
        "timeSkips"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "byId",
        "byKey",
        "allIds",
        "conditionIds",
        "traitIds",
        "resistanceTags",
        "immunityTags",
        "vulnerabilityTags",
        "adaptationTags",
        "sensitivityTags",
        "exposureByDomain",
        "growthHooks",
        "recentEvents"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "combat_capable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "balanced_method"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "stamina_leaning",
        "control_sensitive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "power_bias",
        "technical_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
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
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "technical-biased"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.matchupProfile",
    "after": {
      "type": "object",
      "keyCount": 3,
      "keys": [
        "strongAgainst",
        "weakAgainst",
        "unfamiliarAgainst"
      ]
    }
  },
  {
    "path": "state.aidrpg.abilities.byKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.abilities.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.skillIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.talentIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.passiveIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.recentEvents",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
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
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.scene",
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
    "path": "state.aidrpg.items.ownership.storage",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.actors",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.offHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.head",
    "after": null
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 8
Season: spring
Weather: rain

Elapsed Hours: 8.13
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Route timing variant / injured companion delay changes actual trip but not base route

Suite: adventure-route-time
Likely system: TimeTravelSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Delays should be logged as actual trip conditions, not random route rewrites.

### Expected AI Dungeon-style outcome
Base route remains stable while the delayed trip is remembered.

### Minimal reproduction
- input: "We go from the Adventurers Guild to the Old Barrow, but Mira limps on the road."
- output: "Because Mira limps, the trip to the Old Barrow takes one hour and forty minutes. After she is healed, the return takes the normal one hour."
- input: "/time"
- context: "Continue after route variant."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.time` | expected: ["Old Barrow","Adventurers Guild"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["one hour","1 hour","normal","usual"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["delay","ninety","90","two hours","2 hours","forty","40","twenty","20","detour","mud","limps","scouts"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]

### What likely needs inspection
Inspect delay/event reason capture and route baseline separation.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.currentTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "recentGains"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "lastSource",
        "repeatCount"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.derived.combatPressure",
    "after": 10
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 8
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 35
  },
  {
    "path": "state.aidrpg.player.age",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.titles",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.history",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "majorEvents",
        "timeSkips"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "byId",
        "byKey",
        "allIds",
        "conditionIds",
        "traitIds",
        "resistanceTags",
        "immunityTags",
        "vulnerabilityTags",
        "adaptationTags",
        "sensitivityTags",
        "exposureByDomain",
        "growthHooks",
        "recentEvents"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "combat_capable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "balanced_method"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "stamina_leaning",
        "control_sensitive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "power_bias",
        "technical_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
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
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "technical-biased"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.matchupProfile",
    "after": {
      "type": "object",
      "keyCount": 3,
      "keys": [
        "strongAgainst",
        "weakAgainst",
        "unfamiliarAgainst"
      ]
    }
  },
  {
    "path": "state.aidrpg.abilities.byKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.abilities.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.skillIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.talentIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.passiveIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.recentEvents",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
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
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.scene",
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
    "path": "state.aidrpg.items.ownership.storage",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.actors",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.offHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.head",
    "after": null
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 8
Season: spring
Weather: clear

Elapsed Hours: 8.13
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Route timing variant / scouting delay changes actual trip but not base route

Suite: adventure-route-time
Likely system: TimeTravelSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Delays should be logged as actual trip conditions, not random route rewrites.

### Expected AI Dungeon-style outcome
Base route remains stable while the delayed trip is remembered.

### Minimal reproduction
- input: "We go from the Adventurers Guild to the Old Barrow, but Bram scouts ahead."
- output: "Bram scouts ahead twice, so reaching the Old Barrow takes ninety minutes. The direct return takes one hour."
- input: "/time"
- context: "Continue after route variant."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.time` | expected: ["Old Barrow","Adventurers Guild"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["one hour","1 hour","normal","usual"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["delay","ninety","90","two hours","2 hours","forty","40","twenty","20","detour","mud","limps","scouts"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]

### What likely needs inspection
Inspect delay/event reason capture and route baseline separation.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.currentTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "recentGains"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "lastSource",
        "repeatCount"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.derived.combatPressure",
    "after": 10
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 8
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 35
  },
  {
    "path": "state.aidrpg.player.age",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.titles",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.history",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "majorEvents",
        "timeSkips"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "byId",
        "byKey",
        "allIds",
        "conditionIds",
        "traitIds",
        "resistanceTags",
        "immunityTags",
        "vulnerabilityTags",
        "adaptationTags",
        "sensitivityTags",
        "exposureByDomain",
        "growthHooks",
        "recentEvents"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "combat_capable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "balanced_method"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "stamina_leaning",
        "control_sensitive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "power_bias",
        "technical_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
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
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "technical-biased"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.matchupProfile",
    "after": {
      "type": "object",
      "keyCount": 3,
      "keys": [
        "strongAgainst",
        "weakAgainst",
        "unfamiliarAgainst"
      ]
    }
  },
  {
    "path": "state.aidrpg.abilities.byKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.abilities.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.skillIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.talentIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.passiveIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.recentEvents",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
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
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.scene",
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
    "path": "state.aidrpg.items.ownership.storage",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.actors",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.offHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.head",
    "after": null
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 8
Season: spring
Weather: clear

Elapsed Hours: 8.13
Known Route Times: 0
Contradiction Flags: none

```

## FAIL — Route timing variant / detour delay changes actual trip but not base route

Suite: adventure-route-time
Likely system: TimeTravelSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Delays should be logged as actual trip conditions, not random route rewrites.

### Expected AI Dungeon-style outcome
Base route remains stable while the delayed trip is remembered.

### Minimal reproduction
- input: "We go from the Adventurers Guild to the Old Barrow, but a fallen tree blocks the north road."
- output: "The fallen tree forces a detour, making the trip two hours. Once cleared, the same route back takes one hour."
- input: "/time"
- context: "Continue after route variant."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.time` | expected: ["Old Barrow","Adventurers Guild"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["one hour","1 hour","normal","usual"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.time` | expected: ["delay","ninety","90","two hours","2 hours","forty","40","twenty","20","detour","mud","limps","scouts"] | actual: ["current","day","1","hour","8","minute","8","season","spring","weather","clear","elapsed","totalHours","8.13","routes","knownTravelTimes","baseTravelTimes","recentRouteEvents","contradictionFlags","timeline","recentEvents","day","1","hour","8","minute","8","note","movement","minutesAdvanced","8","pendingAdvance"]

### What likely needs inspection
Inspect delay/event reason capture and route baseline separation.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.currentTurn",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.player.levelState.history",
    "after": {
      "type": "object",
      "keyCount": 1,
      "keys": [
        "recentGains"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.antiFarm",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "lastSource",
        "repeatCount"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.levelState.lastGainTurn",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.derived.combatPressure",
    "after": 10
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 8
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 35
  },
  {
    "path": "state.aidrpg.player.age",
    "after": 0
  },
  {
    "path": "state.aidrpg.player.titles",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.player.history",
    "after": {
      "type": "object",
      "keyCount": 2,
      "keys": [
        "majorEvents",
        "timeSkips"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.traitState",
    "after": {
      "type": "object",
      "keyCount": 13,
      "keys": [
        "byId",
        "byKey",
        "allIds",
        "conditionIds",
        "traitIds",
        "resistanceTags",
        "immunityTags",
        "vulnerabilityTags",
        "adaptationTags",
        "sensitivityTags",
        "exposureByDomain",
        "growthHooks",
        "recentEvents"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.originTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "direct_force",
        "combat_capable"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.methodTags",
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "balanced_method"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.resourceTags",
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "stamina_leaning",
        "control_sensitive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.defenseTags",
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
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "power_bias",
        "technical_bias"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.temperamentTags",
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
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "technical-biased"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.masteryNotes",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.build.matchupProfile",
    "after": {
      "type": "object",
      "keyCount": 3,
      "keys": [
        "strongAgainst",
        "weakAgainst",
        "unfamiliarAgainst"
      ]
    }
  },
  {
    "path": "state.aidrpg.abilities.byKey",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.abilities.allIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.skillIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.talentIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.passiveIds",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.abilities.recentEvents",
    "after": {
      "type": "array",
      "length": 0,
      "sample": []
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
      "length": 0,
      "sample": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.scene",
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
    "path": "state.aidrpg.items.ownership.storage",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.ownership.actors",
    "after": {
      "type": "object",
      "keyCount": 0,
      "keys": []
    }
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.offHand",
    "after": null
  },
  {
    "path": "state.aidrpg.items.equipment.head",
    "after": null
  }
]
```

### Debug output samples
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 8
Season: spring
Weather: clear

Elapsed Hours: 8.13
Known Route Times: 0
Contradiction Flags: none

```
