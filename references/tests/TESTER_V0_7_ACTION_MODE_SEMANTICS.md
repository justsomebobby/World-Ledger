# AIDRPG Tester v0.7 — AI Dungeon Action Mode Semantics

Adds validation tests for Do/Say/Story/action-mode semantics and parser discipline.

Run:

```bash
node runner.js --suite action-modes
node runner.js --suite mode-semantics
```

Checks added:
- speaking an item name does not grant it
- saying “I take X” does not take X
- spoken /sheet does not execute
- exact /sheet still executes
- Do input does not mutate inventory before output
- confirmed output grants once
- retried output does not duplicate commit
- NPC dialogue telling the player to take something does not grant it
- negative/hypothetical output does not commit success
- spoken time phrases do not advance time
- output-confirmed time passage advances time
