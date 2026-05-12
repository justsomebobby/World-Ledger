# AIDRPG Whole-System Tester v0.6 Coverage Audit

This version tightens the tester against the planned AIDRPG system and adds the missing time-focused suite.

## AI Dungeon-specific coverage

- Hook return shape and stop behavior checks
- Hook timeout checks against AI Dungeon's 2-second script timeout expectation
- State size checks against sandbox pressure
- Context pressure tests with crowded history and story cards
- Story Card duplicate/bloat tests
- Output-memory-next-turn risk modeled through context follow-up tests
- Immediate truth checks: state -> Context, not Story Cards alone

## Current-stage Chunk 22 coverage

The following suites are considered current-stage blockers or warnings by Chunk 22:

- smoke
- core-state
- turn-engine
- intent
- player
- progression
- inventory
- story-items
- scene
- world
- time
- abilities
- traits
- validation
- context
- context-pressure
- actors / npc / npc-deep
- integration
- simulation
- aid-runtime

Future-stage systems are still present as warning/final-version coverage when relevant:

- reputation
- quests
- card-sync
- selective long-term major actor memory

## Added in v0.6

### Deep TimeTravelSystem suite

Added tests for:

- /time debug visibility
- thirty-minute travel advancement
- duplicate-output idempotency for time advancement
- three-hour wait phrase parsing
- overnight rest/day rollover expectations
- vague “moments later” soft handling
- “earlier today” relative reference safety
- impossible time contradiction flagging
- route duration memory
- time context exposure after travel
- Input rest intent vs Output-confirmed actual advancement

### Scene/World expansion

Added tests for:

- pending travel vs confirmed arrival
- confirmed chapel arrival scene truth
- burned/barricaded tavern mutable state
- building ownership/layout/material/district preservation

### Report maturity labels

Reports now include a `Roadmap maturity` field when a test marks itself as:

- CURRENT_BLOCKER
- CURRENT_WARNING
- FUTURE_EXPECTATION
- FINAL_VERSION_EXPECTATION

This helps avoid treating not-yet-built future systems as current failures.

## Suggested commands

```bash
node runner.js --suite smoke
node runner.js --suite aid-runtime
node runner.js --suite time --generated-only
node runner.js --suite scene --generated-only
node runner.js --suite world --generated-only
node runner.js --suite context-pressure --generated-only
node runner.js --suite npc-deep --generated-only --limit 50
node runner.js --suite deep --generated-only --limit 150
```

## Still expandable later

The next useful improvements would be deeper coverage for:

- reputation/quest once Chunk 23 is installed
- CardSync once Chunk 24 is installed
- selective long-term major actor memory once Chunk 25 is installed
- combat/matchup stress testing if the combat resolution layer grows more complex
