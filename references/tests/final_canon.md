# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:33.180Z
Suite: adventure-final-canon
Cases tested: 26
Passed: 8
Failed: 18
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 18 failing test(s)

## Recommended Fix Order

1. CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem: 4 failing test(s), 4 high severity
2. CombatResolutionSystem / ValidationSystem: 4 failing test(s), 4 high severity
3. PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem: 3 failing test(s), 3 high severity
4. CombatResolutionSystem / ProgressionSystem: 3 failing test(s), 3 high severity
5. InventorySystem / CardSyncSystem / ContextPacketSystem: 1 failing test(s), 1 high severity
6. InventorySystem / Ability-like item notes: 1 failing test(s), 1 high severity
7. ReputationSystem / QuestLogSystem: 1 failing test(s), 1 high severity
8. ReputationSystem / Location reputation: 1 failing test(s), 1 high severity

## System Cluster — CombatResolutionSystem / WorldEntitySystem / ContextPacketSystem

Failures in cluster: 4
No section marker found.

## System Cluster — CombatResolutionSystem / ValidationSystem

Failures in cluster: 4
No section marker found.

## System Cluster — PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem

Failures in cluster: 3
No section marker found.

## System Cluster — CombatResolutionSystem / ProgressionSystem

Failures in cluster: 3
No section marker found.

## System Cluster — InventorySystem / CardSyncSystem / ContextPacketSystem

Failures in cluster: 1
No section marker found.

## System Cluster — InventorySystem / Ability-like item notes

Failures in cluster: 1
No section marker found.

## System Cluster — ReputationSystem / QuestLogSystem

Failures in cluster: 1
No section marker found.

## System Cluster — ReputationSystem / Location reputation

Failures in cluster: 1
No section marker found.

## FAIL — Race change / divine transformation into drakekin becomes canonical

Suite: adventure-character-transformation
Likely system: PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Major confirmed character changes should become stable player canon, while title/name identity stays clean.

### Expected AI Dungeon-style outcome
Confirmed transformation/title facts persist in state and become visible in Context.

### Why it matters
The roadmap requires outlier build support such as species changes, body-plan changes, mutations, blessings, curses, and transformed weaknesses/resistances.

### Minimal reproduction
- output: "The moon god alters your body completely. You are no longer human; you become a silver-scaled drakekin with small horns, clawed hands, and heat-resistant scales."
- input: "/sheet"
- context: "Continue after the body/title change."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["drakekin","silver","horn","claw"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","353646485","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","horns","drakekin","speciesTraits","bodyTags","horns","drakekin","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","horns","drakekin","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentE

### What likely needs inspection
Inspect PlayerSystem identity/body alteration parsing, PersistentTraitSystem, title/reputation handling, and Context player packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "353646485"
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
    "path": "state.aidrpg.player.body.injuries",
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
    "path": "state.aidrpg.player.body.scars",
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
    "path": "state.aidrpg.player.body.mutations",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "horns",
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.body.speciesTraits",
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
    "path": "state.aidrpg.player.body.bodyTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "horns",
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.appearance.visibleTraits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 2,
      "sample": [
        "horns",
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.appearance.silhouetteTags",
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
  }
]
```

### Debug output samples
#### /sheet
```text
[AIDRPG /sheet]
Build Stage: AIDRPGbeta-final-playtest
Current Turn: 1
Debug: off

Name: Kael
Age: (unknown)
Species: human
Titles: none
Level: 8
XP: 40 / 160

HP: 100 / 100
MP: 40 / 40
EP: 65 / 65
ATK: 10
DEF: 8
SPD: 8
INT: 9
LCK: 6

Player Location Ref: guild_district
Player Scene Ref: guild_hall
Scene Name: Adventurers Guild Hall
Scene Type: building interior
Scene Parent Location: Guild District
Scene Parent Ref: guild_district
Visible Traits: horns, drakekin
Outfit Summary: travel-worn adventuring clothes
Injuries: none
Mutations: horns, drakekin
Active Conditions: none
Permanent Conditions: none

```

## FAIL — Title change / guild-granted title becomes reputation/title memory

Suite: adventure-character-transformation
Likely system: PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Major confirmed character changes should become stable player canon, while title/name identity stays clean.

### Expected AI Dungeon-style outcome
Confirmed transformation/title facts persist in state and become visible in Context.

### Why it matters
The roadmap requires outlier build support such as species changes, body-plan changes, mutations, blessings, curses, and transformed weaknesses/resistances.

### Minimal reproduction
- output: "After the barrow job, the guild formally names you Kael Barrowbreaker. Around the Guild District, Barrowbreaker is now your earned title."
- input: "/sheet"
- context: "Continue after the body/title change."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["Barrowbreaker"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","1440579839","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","speciesTraits","bodyTags","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originTags","species:human","baseline_mo

### What likely needs inspection
Inspect PlayerSystem identity/body alteration parsing, PersistentTraitSystem, title/reputation handling, and Context player packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "1440579839"
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

### Debug output samples
#### /sheet
```text
[AIDRPG /sheet]
Build Stage: AIDRPGbeta-final-playtest
Current Turn: 1
Debug: off

Name: Kael
Age: (unknown)
Species: human
Titles: none
Level: 8
XP: 40 / 160

HP: 100 / 100
MP: 40 / 40
EP: 65 / 65
ATK: 10
DEF: 8
SPD: 8
INT: 9
LCK: 6

Player Location Ref: guild_district
Player Scene Ref: guild_hall
Scene Name: Adventurers Guild Hall
Scene Type: building interior
Scene Parent Location: Guild District
Scene Parent Ref: guild_district
Visible Traits: none
Outfit Summary: travel-worn adventuring clothes
Injuries: none
Mutations: none
Active Conditions: none
Permanent Conditions: none

```

## FAIL — Name/title change / creature title does not overwrite base player name incorrectly

Suite: adventure-character-transformation
Likely system: PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem
Roadmap maturity: FINAL_PRODUCT_EXPECTATION
Severity: High
Confidence: Medium

### Intended function under test
Major confirmed character changes should become stable player canon, while title/name identity stays clean.

### Expected AI Dungeon-style outcome
Confirmed transformation/title facts persist in state and become visible in Context.

### Why it matters
The roadmap requires outlier build support such as species changes, body-plan changes, mutations, blessings, curses, and transformed weaknesses/resistances.

### Minimal reproduction
- output: "The arena crowd starts calling you Ashhorn after your horned drakekin form survives the trial. Your name is still Kael, but Ashhorn becomes a public title."
- input: "/sheet"
- context: "Continue after the body/title change."

### What failed
- Assertion failed: anyStringContainsAll on `state.aidrpg` | expected: ["Kael","Ashhorn"] | actual: ["meta","version","1","createdAtTurn","0","currentTurn","1","currentHook","","mode","normal","seed","0","lastAppliedOutputHash","3900607544","debug","false","dirty","player","false","abilities","items","actors","entities","routes","reputation","false","quests","false","time","false","cards","player","id","player","name","Kael","species","human","levelState","level","8","xp","40","xpToNext","160","totalXp","640","growthClass","standard","history","recentGains","antiFarm","lastSource","","repeatCount","0","lastGainTurn","0","stats","hp","100","maxHp","100","mp","40","maxMp","40","ep","65","maxEp","65","atk","10","def","8","spd","8","intl","9","lck","6","derived","combatPressure","17","mobility","11","threatRating","67","body","limbs","leftArm","present","rightArm","present","leftLeg","present","rightLeg","present","injuries","scars","mutations","drakekin","speciesTraits","bodyTags","drakekin","conditions","active","permanent","vulnerabilities","immunities","appearance","visibleTraits","drakekin","outfitSummary","travel-worn adventuring clothes","silhouetteTags","locationRef","guild_district","sceneRef","guild_hall","age","0","titles","history","majorEvents","timeSkips","traitState","byId","byKey","allIds","conditionIds","traitIds","resistanceTags","immunityTags","vulnerabilityTags","adaptationTags","sensitivityTags","exposureByDomain","growthHooks","recentEvents","build","originT

### What likely needs inspection
Inspect PlayerSystem identity/body alteration parsing, PersistentTraitSystem, title/reputation handling, and Context player packet.

### State diffs
```json
[
  {
    "path": "state.aidrpg.meta.lastAppliedOutputHash",
    "before": "",
    "after": "3900607544"
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
    "path": "state.aidrpg.player.body.injuries",
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
    "path": "state.aidrpg.player.body.scars",
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
    "path": "state.aidrpg.player.body.mutations",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.body.speciesTraits",
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
    "path": "state.aidrpg.player.body.bodyTags",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.appearance.visibleTraits",
    "before": {
      "type": "array",
      "length": 0,
      "sample": []
    },
    "after": {
      "type": "array",
      "length": 1,
      "sample": [
        "drakekin"
      ]
    }
  },
  {
    "path": "state.aidrpg.player.appearance.silhouetteTags",
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
  }
]
```

### Debug output samples
#### /sheet
```text
[AIDRPG /sheet]
Build Stage: AIDRPGbeta-final-playtest
Current Turn: 1
Debug: off

Name: Kael
Age: (unknown)
Species: human
Titles: none
Level: 8
XP: 40 / 160

HP: 100 / 100
MP: 40 / 40
EP: 65 / 65
ATK: 10
DEF: 8
SPD: 8
INT: 9
LCK: 6

Player Location Ref: guild_district
Player Scene Ref: guild_hall
Scene Name: Adventurers Guild Hall
Scene Type: building interior
Scene Parent Location: Guild District
Scene Parent Ref: guild_district
Visible Traits: drakekin
Outfit Summary: travel-worn adventuring clothes
Injuries: none
Mutations: drakekin
Active Conditions: none
Permanent Conditions: none

```

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
