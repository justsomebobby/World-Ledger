# AIDRPG Whole-System Tester Report

Generated: 2026-04-26T03:04:19.844Z
Suite: adventure-character-transformation
Cases tested: 7
Passed: 4
Failed: 3
Suspicious: 0

## Roadmap Maturity Breakdown

- FINAL_PRODUCT_EXPECTATION: 3 failing test(s)

## Recommended Fix Order

1. PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem: 3 failing test(s), 3 high severity

## System Cluster — PlayerSystem / PersistentTraitSystem / ReputationSystem / ContextPacketSystem

Failures in cluster: 3
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
