# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:30.098Z
Suite: adventure-reputation-delay
Cases tested: 3
Passed: 1
Failed: 2
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 2 failing test(s)

## Recommended Fix Order

1. ReputationSystem / QuestLogSystem: 1 failing test(s), 1 high severity
2. ReputationSystem / Location reputation: 1 failing test(s), 1 high severity

## System Cluster — ReputationSystem / QuestLogSystem

Failures in cluster: 1
No section marker found.

## System Cluster — ReputationSystem / Location reputation

Failures in cluster: 1
No section marker found.

## FAIL — Reputation delay / deed becomes known after reporting to guild

Suite: adventure-reputation-delay
Likely system: ReputationSystem / QuestLogSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Reputation should propagate when a valid report/witness path exists.

### Expected AI Dungeon-style outcome
Guild reputation updates after proof is reported.

### Minimal reproduction
- output: "In the Old Barrow, you defeat the bone warden. Nobody in town knows yet."
- input: "We return to the Adventurers Guild and report the completed bone warden contract."
- output: "The guild clerk verifies your proof and records that Kael defeated the bone warden. Guild members begin calling you reliable."
- context: "Continue after reporting the deed."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.reputation` | expected: ["bone warden","guild"] | actual: ["global","notoriety","0","prestige","0","fear","0","byFaction","byLocation","byActor","rumorTitles","recentChanges","bySubject","rumors","titles","pendingReports","tracking","primarySubjectId","","summaryDirty","false","lastChangedTurn","0","pendingDeeds"]

### What likely needs inspection
Inspect report-to-guild reputation commit path and quest completion linkage.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3281924793"
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
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  }
]
```

## FAIL — Reputation delay / remote town does not know local deed immediately

Suite: adventure-reputation-delay
Likely system: ReputationSystem / Location reputation
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Reputation should be location-scoped until a spread event occurs.

### Expected AI Dungeon-style outcome
The tavern/local crowd may know, but a remote town should not instantly know.

### Minimal reproduction
- output: "At The Drunken Huntsman, three witnesses see you save Mira from assassins. The tavern crowd knows what happened, but Stonebridge has not heard anything yet."
- context: "Continue before rumors travel to Stonebridge."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg.reputation` | expected: ["Mira","Drunken Huntsman"] | actual: ["global","notoriety","0","prestige","0","fear","0","byFaction","byLocation","byActor","rumorTitles","recentChanges","bySubject","rumors","titles","pendingReports","tracking","primarySubjectId","","summaryDirty","false","lastChangedTurn","0","pendingDeeds"]
- Assertion failed: lastReturnContainsAny | expected: ["Drunken Huntsman","Mira","witness"] | actual: "Current truth:\nPlayer: Lvl 8 | Age unknown | human | Titles: none | HP 100/100 | MP 40/40 | EP 65/65 | Cond: none | Injuries: none | Outfit: travel-worn adventuring clothes\nTime: Day 1 | 09:00 | Season: spring | Weather: clear\nScene: Adventurers Guild Hall | Location: Guild District | Type: building interior\n\nContinue before rumors travel to Stonebridge."

### What likely needs inspection
Inspect byLocation reputation and rumor spread timing.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1128249838"
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
  },
  {
    "path": "state.aidrpg.items.equipment.mainHand",
    "after": null
  }
]
```
