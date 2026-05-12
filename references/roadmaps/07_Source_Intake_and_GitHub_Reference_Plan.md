# 07 — Source Intake and GitHub Reference Plan

## Purpose

This document defines how the four uploaded packages and external GitHub sources should be used during V1.1 implementation.

The goal is to avoid two failure modes:

```text
1. Guessing fixes that old sources already solved.
2. Copying broken old code wholesale and recreating patch loops.
```

## Local source library

Use these four package families as the main local source library:

```text
1. Oldaidrpgtestsandresults.zip
2. WorldLedger_V1_1_Core_Card_System_Roadmap_Package.zip
3. WorldLedger_uploaded_files_package.zip
4. AIDRPG_Final_Build_Planning_Package_v1_4_23_REPAIRED_FINAL_WITH_PRODUCTION_CHUNKS_01_TO_25.zip
```

Also use individual uploaded files already available in the workspace:

```text
aidrpgv1-5-0_FINAL_UNCOMPRESSED.txt
aidrpgv1-8-5_FINAL_QA_RELEASE.txt
aidrpgv1-9-9_FULL_REGRESSION_QA.txt
Potential improvements for TAS, and Inner Self safe guards.txt.txt
AI_Dungeon_Scripting_Reference.docx
Story cards .json
WorldLedgerV1-0-0.txt
```

## External GitHub sources

External public sources should be used as behavior references, not blind code imports.

Known public references:

```text
True Auto Stats for AI Dungeon RPG Scenarios
- GitHub: Yi1i1i / True-Auto-Stats-for-AIDungeon-RPG-Scenarios
- Use for: player-facing stat tracking posture, RPG stat display, command/stat expectations

Inner Self
- GitHub: LewdLeah / Inner-Self
- Use for: NPC memory, goals, secrets, planning, self-reflection, segmented character memory

Auto-Cards
- GitHub: LewdLeah / Auto-Cards
- Use for: plot-relevant Story Card generation, object permanence, title/candidate generation discipline

Hashtag-DnD
- GitHub: raeleus / Hashtag-DnD
- Use for: AI Dungeon command/tool script patterns only if needed
```

## GitHub source usage rules

Allowed:

```text
- inspect public code for proven AI Dungeon patterns
- adapt small isolated helper concepts after review
- copy tests/behavior expectations into V1.1 acceptance gates
- use as reference for hook/tab behavior, card operations, and command ergonomics
```

Not allowed:

```text
- paste entire public script into WorldLedger
- import incompatible globals
- override WorldLedger state schema
- copy old defaults that disable the live V1.1 target
- copy adult/flavor-specific content or scenario-specific assumptions
- copy code without assigning it to a WorldLedger owner module
```

## Intake workflow for old local files

Before each implementation chunk:

1. Search old local sources for the exact target behavior.
2. Record matching functions/systems in the salvage map.
3. Classify each match: `DIRECT TRANSPLANT`, `ADAPT`, `TEST ONLY`, `SPEC SOURCE`, or `REJECT`.
4. Assign it to a V1.1 owner.
5. Write the acceptance test before coding.
6. Implement only inside the owner.

## Intake workflow for GitHub files

Before using any GitHub code:

1. Identify the exact repository and file.
2. Record what behavior it solves.
3. Confirm it fits AI Dungeon scripting constraints.
4. Classify it.
5. Adapt only the behavior unless a tiny helper is safe to transplant.
6. Add a V1.1 regression test.

## Directly relevant old local search targets

Search these terms before implementation:

```text
CardSyncSystem
/cardsync bootstrap
Player Summary
Ability Index
serializeProtected
serializeAbilityCard
serializeItemCard
queueDirty
safeEnsureSingletonCard
StartupIdentityImporter
PlayerIdentityGuard
NameSanitizerSystem
manualOverrides
ingestManualOverrides
/cardaudit
strict cardaudit
generated queue
neutralized
broad trigger
scenery_business_not_actor
old guards
generic role
```

## Current base file

Current target base:

```text
WorldLedgerV1-0-0.txt
```

V1.1 implementation must start from this working base and change native owners directly.

## What the build chat should say before coding each chunk

For each chunk after this one, the build chat should state:

```text
Source behavior being salvaged:
Old file/function where it appears:
Classification:
WorldLedger owner receiving it:
Acceptance test:
Rejected old behavior:
```

This prevents silent over-copying.
