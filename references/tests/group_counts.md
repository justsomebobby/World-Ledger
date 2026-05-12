# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:27.488Z
Suite: adventure-group-counts
Cases tested: 12
Passed: 1
Failed: 11
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 11 failing test(s)

## Recommended Fix Order

1. CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem: 4 failing test(s), 4 high severity
2. CombatResolutionSystem / ValidationSystem: 4 failing test(s), 4 high severity
3. CombatResolutionSystem / ProgressionSystem: 3 failing test(s), 3 high severity

## System Cluster — CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem

Failures in cluster: 4
No section marker found.

## System Cluster — CombatResolutionSystem / ValidationSystem

Failures in cluster: 4
No section marker found.

## System Cluster — CombatResolutionSystem / ProgressionSystem

Failures in cluster: 3
No section marker found.

## FAIL — Group count / 13 skeletons, kill 9 leaves exactly 4

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Enemy group counts should remain numerically coherent.

### Expected AI Dungeon-style outcome
13 skeletons minus 9 leaves 4, not zero or twenty.

### Why it matters
AI Dungeon often ends group fights early or invents extra enemies; the script should preserve known counts.

### Minimal reproduction
- output: "There are exactly thirteen skeletons in the crypt. You cut down nine skeletons, leaving four skeletons still fighting."
- context: "Continue fighting the remaining skeletons."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","9","4","skeletons"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3161070631","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","scene_crypt","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species

### What likely needs inspection
Inspect group entity counts, killed/remaining math, and group context packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3161070631"
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
      "length": 1,
      "sample": [
        "active_encounter"
      ]
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
    "path": "state.aidrpg.player.sceneRef",
    "before": "guild_hall",
    "after": "scene_crypt"
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
  }
]
```

## FAIL — Group count / finish remaining 4 skeletons completes group

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ProgressionSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Clearing the exact remaining enemies should finish the group without inventing more.

### Expected AI Dungeon-style outcome
Original group becomes cleared only after the remaining count reaches zero.

### Minimal reproduction
- output: "The fight began with thirteen skeletons. Nine are already down, and four remain."
- input: "I finish the last four skeletons."
- output: "You defeat the remaining four skeletons. All thirteen skeletons from the original group are now down."
- context: "Continue after the skeletons group is cleared."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","four","skeletons"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","2555948541","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","41","xpToNext","160","totalXp","641","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistics","repeatCount","0","lastGainTurn","1","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growt

### What likely needs inspection
Inspect group count decrement, completion state, and reward gating.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2618108561"
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

## FAIL — Group count / reinforcements are allowed only when explicitly narrated for skeletons

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ValidationSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Extra enemies can exist when explicitly introduced, but not by random drift.

### Expected AI Dungeon-style outcome
4 remaining + 6 reinforcements = 10 enemies.

### Minimal reproduction
- output: "There are exactly thirteen skeletons. You defeat nine, leaving four."
- output: "Six more skeletons arrive as reinforcements from the tunnel, so ten skeletons are now present."
- context: "Continue after explicit reinforcements join the skeletons."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["six","reinforcements","ten"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","1856237114","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:

### What likely needs inspection
Inspect explicit reinforcement detection vs unsupported count drift.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "4075487400"
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

## FAIL — Group count / 13 goblins, kill 9 leaves exactly 4

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Enemy group counts should remain numerically coherent.

### Expected AI Dungeon-style outcome
13 goblins minus 9 leaves 4, not zero or twenty.

### Why it matters
AI Dungeon often ends group fights early or invents extra enemies; the script should preserve known counts.

### Minimal reproduction
- output: "There are exactly thirteen goblins in the alley. You cut down nine goblins, leaving four goblins still fighting."
- context: "Continue fighting the remaining goblins."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","9","4","goblins"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","2126917814","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:

### What likely needs inspection
Inspect group entity counts, killed/remaining math, and group context packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2126917814"
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
      "length": 1,
      "sample": [
        "active_encounter"
      ]
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
  }
]
```

## FAIL — Group count / reinforcements are allowed only when explicitly narrated for goblins

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ValidationSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Extra enemies can exist when explicitly introduced, but not by random drift.

### Expected AI Dungeon-style outcome
4 remaining + 6 reinforcements = 10 enemies.

### Minimal reproduction
- output: "There are exactly thirteen goblins. You defeat nine, leaving four."
- output: "Six more goblins arrive as reinforcements from the tunnel, so ten goblins are now present."
- context: "Continue after explicit reinforcements join the goblins."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["six","reinforcements","ten"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3923848250","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:

### What likely needs inspection
Inspect explicit reinforcement detection vs unsupported count drift.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "129051048"
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

## FAIL — Group count / 13 ash imps, kill 9 leaves exactly 4

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Enemy group counts should remain numerically coherent.

### Expected AI Dungeon-style outcome
13 ash imps minus 9 leaves 4, not zero or twenty.

### Why it matters
AI Dungeon often ends group fights early or invents extra enemies; the script should preserve known counts.

### Minimal reproduction
- output: "There are exactly thirteen ash imps in the forge. You cut down nine ash imps, leaving four ash imps still fighting."
- context: "Continue fighting the remaining ash imps."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","9","4","ash imps"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","193675517","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:h

### What likely needs inspection
Inspect group entity counts, killed/remaining math, and group context packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "193675517"
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
      "length": 1,
      "sample": [
        "active_encounter"
      ]
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
  }
]
```

## FAIL — Group count / finish remaining 4 ash imps completes group

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ProgressionSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Clearing the exact remaining enemies should finish the group without inventing more.

### Expected AI Dungeon-style outcome
Original group becomes cleared only after the remaining count reaches zero.

### Minimal reproduction
- output: "The fight began with thirteen ash imps. Nine are already down, and four remain."
- input: "I finish the last four ash imps."
- output: "You defeat the remaining four ash imps. All thirteen ash imps from the original group are now down."
- context: "Continue after the ash imps group is cleared."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","four","ash imps"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","1934731101","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","41","xpToNext","160","totalXp","641","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistics","repeatCount","0","lastGainTurn","1","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growt

### What likely needs inspection
Inspect group count decrement, completion state, and reward gating.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "192042622"
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

## FAIL — Group count / reinforcements are allowed only when explicitly narrated for ash imps

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ValidationSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Extra enemies can exist when explicitly introduced, but not by random drift.

### Expected AI Dungeon-style outcome
4 remaining + 6 reinforcements = 10 enemies.

### Minimal reproduction
- output: "There are exactly thirteen ash imps. You defeat nine, leaving four."
- output: "Six more ash imps arrive as reinforcements from the tunnel, so ten ash imps are now present."
- context: "Continue after explicit reinforcements join the ash imps."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["six","reinforcements","ten"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","423706522","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:h

### What likely needs inspection
Inspect explicit reinforcement detection vs unsupported count drift.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1793763751"
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

## FAIL — Group count / 13 bandits, kill 9 leaves exactly 4

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Enemy group counts should remain numerically coherent.

### Expected AI Dungeon-style outcome
13 bandits minus 9 leaves 4, not zero or twenty.

### Why it matters
AI Dungeon often ends group fights early or invents extra enemies; the script should preserve known counts.

### Minimal reproduction
- output: "There are exactly thirteen bandits in the north road. You cut down nine bandits, leaving four bandits still fighting."
- context: "Continue fighting the remaining bandits."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","9","4","bandits"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","157704809","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:h

### What likely needs inspection
Inspect group entity counts, killed/remaining math, and group context packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "157704809"
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
      "length": 1,
      "sample": [
        "active_encounter"
      ]
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
  }
]
```

## FAIL — Group count / finish remaining 4 bandits completes group

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ProgressionSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Clearing the exact remaining enemies should finish the group without inventing more.

### Expected AI Dungeon-style outcome
Original group becomes cleared only after the remaining count reaches zero.

### Minimal reproduction
- output: "The fight began with thirteen bandits. Nine are already down, and four remain."
- input: "I finish the last four bandits."
- output: "You defeat the remaining four bandits. All thirteen bandits from the original group are now down."
- context: "Continue after the bandits group is cleared."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["13","four","bandits"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","2790544317","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","41","xpToNext","160","totalXp","641","growthClass","standard","history","recentGains","turn","1","amount","1","source","logistics","note","interact","antiFarm","lastSource","logistics","repeatCount","0","lastGainTurn","1","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growt

### What likely needs inspection
Inspect group count decrement, completion state, and reward gating.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "2266285284"
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

## FAIL — Group count / reinforcements are allowed only when explicitly narrated for bandits

Suite: adventure-group-counts
Likely system: CombatResolutionSystem / ValidationSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Extra enemies can exist when explicitly introduced, but not by random drift.

### Expected AI Dungeon-style outcome
4 remaining + 6 reinforcements = 10 enemies.

### Minimal reproduction
- output: "There are exactly thirteen bandits. You defeat nine, leaving four."
- output: "Six more bandits arrive as reinforcements from the tunnel, so ten bandits are now present."
- context: "Continue after explicit reinforcements join the bandits."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["six","reinforcements","ten"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","0","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","1673151002","debug","false","dirty","player","false","abilities","items","actors","entities","active_encounter","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:

### What likely needs inspection
Inspect explicit reinforcement detection vs unsupported count drift.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1194717949"
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
