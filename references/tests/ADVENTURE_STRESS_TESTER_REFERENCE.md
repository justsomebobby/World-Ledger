# AIDRPG Adventure Stress Tester v1.2

This tester adds a fixed short-adventure simulation harness on top of the previous whole-system tester.
It does not randomize the dungeon. It uses a reusable three-part adventure structure so test results are comparable between script versions.

## Adventure shape

1. Adventurers Guild
   - take quest
   - talk to team
   - accept/decline variants
   - time starts at guild

2. Old Barrow Dungeon
   - entry hall scene confirmation
   - trap / no-trap branches
   - fight / fail / win branches
   - injuries: burns, poison, electricity, bleeding, ribs, concussion, frostbite, acid, exhaustion, blindness
   - healing: self-bandage, ally healing, potion/vial, antidote, rest
   - known ability use and adaptation
   - explicit training
   - output-only skill hallucination rejection
   - loot, currency, keys, shields, healing items

3. Return Loop
   - return to guild
   - get paid
   - spend money
   - buy healing supplies
   - sleep for the night
   - check /sheet, /inventory, /time, /questlog, Context

## Major suite commands

Small baseline:
`node runner.js --suite adventure-baseline --generated-only --include-passed`

Section-by-section:
`node runner.js --suite adventure-scene --generated-only --limit 50`
`node runner.js --suite adventure-inventory --generated-only --limit 60`
`node runner.js --suite adventure-injury --generated-only --limit 50`
`node runner.js --suite adventure-healing --generated-only --limit 50`
`node runner.js --suite adventure-ability --generated-only --limit 100`
`node runner.js --suite adventure-combat --generated-only --limit 50`
`node runner.js --suite adventure-economy --generated-only --limit 50`
`node runner.js --suite adventure-time --generated-only --limit 50`
`node runner.js --suite adventure-context-pressure --generated-only --limit 50`
`node runner.js --suite adventure-negative --generated-only --limit 80`
`node runner.js --suite adventure-death-boundary --generated-only --limit 50`

Full stress:
`node runner.js --suite adventure-stress --generated-only --limit 250`

Uncapped full stress, heavier:
`node runner.js --suite true-adventure --generated-only --include-passed`

## Timeout-safe workflow

Run in sections first. Use limits for old Chromebooks or chat execution.

Recommended order:
1. `adventure-baseline`
2. `adventure-negative --limit 80`
3. `adventure-scene --limit 50`
4. `adventure-inventory --limit 60`
5. `adventure-injury --limit 50`
6. `adventure-healing --limit 50`
7. `adventure-ability --limit 100`
8. `adventure-time --limit 50`
9. `adventure-context-pressure --limit 50`
10. `adventure-stress --limit 250`

The tester is designed to produce reports per section so failures can be patched by subsystem rather than dumping everything at once.

## What counts as a good result

A good script should:
- take confirmed quest/loot/payment/healing/time facts into state
- reject speech, memories, wishes, almost-actions, rumors, and hypotheticals as hard state
- preserve current scene truth under Context
- avoid duplicate commits on retries
- preserve/modify known abilities without creating hallucinated skills
- track injuries/statuses proportionally
- handle slang/casual phrasing without granting wrong outcomes
- distinguish actual death from near-death, rumors, uncertainty, and failure
