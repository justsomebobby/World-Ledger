# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:24.714Z
Suite: adventure-named-entities
Cases tested: 4
Passed: 2
Failed: 2
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 2 failing test(s)

## Recommended Fix Order

1. InventorySystem / CardSyncSystem / ContextPacketSystem: 1 failing test(s), 1 high severity
2. InventorySystem / Ability-like item notes: 1 failing test(s), 1 high severity

## System Cluster — InventorySystem / CardSyncSystem / ContextPacketSystem

Failures in cluster: 1
No section marker found.

## System Cluster — InventorySystem / Ability-like item notes

Failures in cluster: 1
No section marker found.

## FAIL — Named item / iron sword named Dawnvein keeps personal identity

Suite: adventure-named-entities
Likely system: InventorySystem / CardSyncSystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Naming an item should create/retain a personal named item identity, not collapse back to generic base type.

### Expected AI Dungeon-style outcome
Dawnvein remains the item name/title while still retaining sword/base material identity.

### Minimal reproduction
- output: "You take the plain iron sword and name it Dawnvein after the orange line in the blade. From now on, Dawnvein is your personal sword."
- input: "/inventory"
- context: "Continue with the named personal sword."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.items` | expected: ["Dawnvein","sword"] | actual: ["byId","item_0_1","id","item_0_1","displayName","plain iron sword","baseType","sword","descriptors","plain","iron","materialTags","iron","quality","","condition","durability","100","stateTags","slot","mainHand","stackable","false","quantity","1","stats","ownership","holder","player","visibility","packed","notes","sourceContext","story_gain","observedChanges","ownership","player","item_0_1","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","12","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect item rename/title fields, displayName vs baseType, and inventory context rendering.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1949043960"
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
    "after": 17
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 11
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 67
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "adventurers_guild",
    "after": "guild_district"
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
        "developing"
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
        "pressure_first"
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
      "length": 2,
      "sample": [
        "durable",
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "power_bias",
        "resilience_bias",
        "speed_bias",
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
      "length": 6,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "resilience-biased",
        "speed-biased"
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
    "path": "state.aidrpg.items.byId.item_0_1",
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
        "item_0_1"
      ]
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
  }
]
```

### Debug output samples
#### /inventory
```text
[AIDRPG /inventory]
Owned Item IDs: 1
Owned Items: plain iron sword

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
Currency - silver: 12
Currency - gold: 0

```

## FAIL — Named item / ring title and function both persist

Suite: adventure-named-entities
Likely system: InventorySystem / Ability-like item notes
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Named magical items should preserve both title and remembered function.

### Expected AI Dungeon-style outcome
King's Quiet stays named and its whisper-hushing function is retained.

### Minimal reproduction
- output: "The old silver ring binds to you and takes the name King's Quiet. King's Quiet can hush nearby whispers when you touch its cracked crown sigil."
- input: "/inventory"
- context: "Continue with the named ring."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.items` | expected: ["King's Quiet","ring"] | actual: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","12","gold","0","pendingNormalization"]
- Assertion failed: anyStringContainsAny on `state.aidrpg.items` | expected: ["hush","whispers","crown sigil"] | actual: ["byId","ownership","player","scene","storage","actors","equipment","mainHand","offHand","head","body","hands","legs","feet","accessory1","accessory2","currency","byType","copper","0","silver","12","gold","0","pendingNormalization"]

### What likely needs inspection
Inspect item notableDescriptors/effects and named item context packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.seed",
    "before": 0,
    "after": 1
  },
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3708977963"
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
    "after": 17
  },
  {
    "path": "state.aidrpg.player.derived.mobility",
    "after": 11
  },
  {
    "path": "state.aidrpg.player.derived.threatRating",
    "after": 67
  },
  {
    "path": "state.aidrpg.player.locationRef",
    "before": "adventurers_guild",
    "after": "guild_district"
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
        "developing"
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
        "pressure_first"
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
      "length": 2,
      "sample": [
        "durable",
        "evasive"
      ]
    }
  },
  {
    "path": "state.aidrpg.build.specializationTags",
    "after": {
      "type": "array",
      "length": 4,
      "sample": [
        "power_bias",
        "resilience_bias",
        "speed_bias",
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
      "length": 6,
      "sample": [
        "force-leaning",
        "stamina-leaning",
        "power-biased",
        "resilience-biased",
        "speed-biased"
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
Currency - silver: 12
Currency - gold: 0

```
