# AIDRPG Whole-System Tester Report

Generated: 2026-04-25T23:57:53.510Z
Suite: ai-dungeon-final
Cases tested: 8
Passed: 7
Failed: 1
Suspicious: 0

## Roadmap Maturity Breakdown

- CURRENT_BLOCKER: 1 failing test(s)

## Recommended Fix Order

1. ContextPacketSystem / InventorySystem: 1 failing test(s)

## System Cluster — ContextPacketSystem / InventorySystem

Failures in cluster: 1
No section marker found.

## PASS — AI Dungeon Story Card API / add duplicate returns false and uses entry field

Suite: storycard-api
Likely system: Story Card API Mock
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
The tester must emulate AI Dungeon addStoryCard(keys, entry, type) closely enough to catch CardSync mistakes.

### Expected AI Dungeon-style outcome
addStoryCard returns a numeric index, duplicate keys return false, and storyCards expose entry/keys/type.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- eval: ""

## PASS — AI Dungeon Story Card API / update and remove by numeric index

Suite: storycard-api
Likely system: Story Card API Mock
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
The tester must catch CardSync code that assumes object/id patch behavior instead of numeric index update/remove.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- eval: ""

## PASS — AI Dungeon Story Card API / missing update and remove throw

Suite: storycard-api
Likely system: Story Card API Mock
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
Missing card updates/removals should be surfaced as errors in tests rather than silently succeeding.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- eval: ""

## PASS — Wrapper compatibility / standard Input Context Output wrappers return valid { text }

Suite: wrapper-compat
Likely system: Hook wrapper compatibility
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
Even without uploaded hook tabs, the canonical thin wrapper shape should call the Library handlers cleanly.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- eval: ""

## PASS — Sandbox guard / no obvious Node browser network APIs in Library source

Suite: sandbox-guards
Likely system: Runtime sandbox safety
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
The Library should not depend on Node/browser APIs that AI Dungeon may not expose.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- input: "/sheet"

### Debug output samples
#### /sheet
```text
[AIDRPG /sheet]
Build Stage: chunk22-actorprofiles
Current Turn: 1
Debug: off

Name: (unset)
Species: human
Level: 1
XP: 0 / 100

HP: 100 / 100
MP: 20 / 20
EP: 50 / 50
ATK: 5
DEF: 5
SPD: 5
INT: 5
LCK: 5

Player Location Ref: (none)
Player Scene Ref: (none)
Scene Name: (none)
Scene Type: unknown
Scene Parent Location: (none)
Scene Parent Ref: (none)
Visible Traits: none
Outfit Summary: (none)
Injuries: none
Mutations: none
Active Conditions: none
Permanent Conditions: none

```

## PASS — Sandbox guard / repeated context calls remain under runtime and size budgets

Suite: sandbox-guards
Likely system: ContextPacketSystem / runtime budget
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
Context building must remain bounded when history and story cards are crowded.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- output: "You step into the barrow sanctum. Mira is wounded, the rusted iron key is in your hand, and the air smells of poison smoke."
- context: "Continue under heavy context pressure."
- context: "Continue under heavy context pressure again."
- context: "Continue under heavy context pressure a third time."

## PASS — Final compatibility / command mention and story text do not execute slash commands

Suite: ai-dungeon-final
Likely system: Action-mode semantics
Roadmap maturity: CURRENT_BLOCKER
Severity: Low
Confidence: Low

### Intended function under test
Speech/story mentions of slash commands must not execute debug commands.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- input: "I say, \"/sheet\" out loud to Mira."
- output: "Mira looks confused when you say slash sheet, but no debug panel appears."
- context: "Continue after the spoken command."

## FAIL — Final compatibility / output memory timing does not assume same-action memory effect

Suite: ai-dungeon-final
Likely system: ContextPacketSystem / InventorySystem
Roadmap maturity: CURRENT_BLOCKER
Severity: high
Confidence: Medium

### Intended function under test
Important output-derived state should appear in the next Context hook rather than relying on same-output memory changes.

### Expected AI Dungeon-style outcome
Valid hook returns, no platform-only failures, bounded context/state, no bad Story Card API assumptions.

### Why it matters
A script can pass local logic tests but still fail in AI Dungeon if the platform API/runtime assumptions are wrong.

### Minimal reproduction
- input: "I search the fallen acolyte for the black sigil key."
- output: "You find a black sigil key and put it in your pouch."
- context: "The sealed door waits ahead."

### What failed
- Assertion failed: lastReturnContainsAny | expected: ["key","sigil","pouch","inventory"] | actual: "Current truth:\nScene: unknown place | Type: unknown\nPlayer: Lvl 1 | human | HP 100/100 | MP 20/20 | EP 50/50 | Cond: none | Outfit: unspecified\nTime: Day 1 | 08:05\n\nThe sealed door waits ahead."

### What likely needs inspection
Patch only the platform-facing assumption or subsystem causing the compatibility failure.

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
    "after": "905521844"
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
      "length": 2,
      "sample": [
        "item_1_1",
        "item_1_2"
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
    "path": "state.aidrpg.items.byId.item_1_2",
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
      "length": 2,
      "sample": [
        "item_1_1",
        "item_1_2"
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
