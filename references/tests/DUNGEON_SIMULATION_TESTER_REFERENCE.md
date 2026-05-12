# AIDRPG Dungeon Simulation Tester Reference

## Purpose

This tester upgrade adds a fixed three-chamber dungeon simulation to the AIDRPG tester. It is designed to complement isolated stress tests by running short AI Dungeon-style adventure flows with player input, team dialogue, combat, healing, injuries, known ability use, new technique attempts, loot, XP/progression, context pressure, negative controls, and duplicate/retry checks.

The goal is not to randomize a dungeon. The goal is to use a stable, repeatable dungeon so each script version can be compared against the same expected gameplay paths.

## Standard dungeon

The dungeon is the Old Barrow:

1. Barrow Entry Hall
   - party setup with Mira and Bram
   - scene confirmation
   - trap/pressure plate branch
   - team dialogue and safety checks

2. Ruined Armory
   - skeletal guard combat
   - known ability use
   - loot and currency
   - XP/progression checks
   - victory/failure split

3. Sealed Sanctum
   - key gate
   - boss/warden-style encounter
   - known ability adaptation
   - injury/healing branches
   - context pressure checks

## Suites added

Run all dungeon tests:

```bash
node runner.js --suite dungeon-full --generated-only --include-passed
```

Run specific sections:

```bash
node runner.js --suite dungeon-run --generated-only --include-passed
node runner.js --suite dungeon-branches --generated-only --include-passed
node runner.js --suite dungeon-ability --generated-only --include-passed
node runner.js --suite dungeon-combat --generated-only --include-passed
node runner.js --suite dungeon-context-pressure --generated-only --include-passed
node runner.js --suite dungeon-negative-controls --generated-only --include-passed
```

## What this tests

- fixed multi-turn dungeon flow
- scene transitions across rooms/chambers
- party/NPC relevance with Mira and Bram
- trap avoided / minor injury / major injury / poison branches
- healing by item and companion
- known ability use and revision
- explicit new technique training
- output-only skill hallucination rejection
- similar ability-name confusion
- combat victory, failure, proportional XP, loot, and currency
- duplicate/retry protection for reward outputs
- context pressure with cluttered history/story cards
- negative controls where dialogue/speculation/memory should not hard-save state

## Why this helps

Isolated tests tell you whether one system works in one phrase. The dungeon simulation checks whether major planned systems survive a short realistic play sequence together. This catches integration failures such as:

- inventory works but context omits the key
- abilities update in isolation but not in combat flow
- injury saves but healing does not revise it
- NPCs exist but do not remain relevant in context
- victory output grants loot but failed attack output also grants loot
- output-only skill hallucinations become permanent abilities
- duplicate model output doubles XP, currency, or effects

## How to read the results

Failures are grouped by likely system. The most useful files are:

- `reports/latest-report.md`
- `reports/patch-targets.md`
- `reports/ai-review-package.md`

Use the dungeon suite as a final-product integration test. Some failures may be future expectations depending on current roadmap stage, but they are intentionally included because the dungeon runner is meant to validate the final whole RPG framework.
