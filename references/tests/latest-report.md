# AIDRPG Whole-System Tester Report

Generated: 2026-04-27T19:31:36.797Z
Suite: smoke
Cases tested: 5
Passed: 5
Failed: 0
Suspicious: 0

## Result

No failing assertions were found in this run. This does not prove the whole game is perfect; it means this suite did not catch a failure. Larger limits and more generated suites can still reveal problems.

## PASS — Script loads and creates AIDRPG through input

Suite: smoke
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Low
Confidence: Low

### Purpose
Confirms the script loads, the input hook runs, and state.aidrpg exists.

### Why it matters
If this fails, no later system testing is meaningful.

### Minimal reproduction
- input: "I look around."

## PASS — Context hook returns text

Suite: smoke
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Low
Confidence: Low

### Purpose
Confirms context building can run after a normal input.

### Why it matters
Context is the immediate AI-facing truth layer. If this breaks, the AI cannot see current state properly.

### Minimal reproduction
- input: "I inspect the stone room."
- context: "The player is in a stone room."

## PASS — Output hook runs without crashing

Suite: smoke
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Low
Confidence: Low

### Purpose
Confirms output processing can run on normal prose.

### Why it matters
Most persistent consequences are handled in Output. Output crashes make gameplay unsafe.

### Minimal reproduction
- input: "I search the guard."
- output: "You search the guard and find nothing unusual."

## PASS — Debug commands do not crash

Suite: smoke
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Low
Confidence: Low

### Purpose
Confirms core debug commands return readable text.

### Why it matters
Debug commands are how the tester and user inspect the system while building.

### Minimal reproduction
- debug: "/sheet"
- debug: "/inventory"
- debug: "/time"
- debug: "/questlog"

### Debug output samples
#### /sheet
```text
[AIDRPG /sheet] Build Stage: AIDRPG-v1.3.4-final-release Current Turn: 1 Debug: off Name: (unset) Age: (unknown) Species: human Titles: none Level: 1 XP: 0 / 100 HP: 100 / 100 MP: 20 / 20 EP: 50 / 50 ATK: 5 DEF: 5 SPD: 5 INT: 5 LCK: 5 Scale Band: baseline Benchmark Role: dungeon Benchmark Avg Stats: ATK 5, DEF 5, SPD 5, INT 5, LCK 5 Benchmark Gap: ATK +0, DEF +0, SPD +0, INT +0, LCK +0 Above Benchmark: none Below Benchmark: none Player Location Ref: (none) Player Scene Ref: (none) Scene Name: (none) Scene Type: unknown Scene Parent Location: (none) Scene Parent Ref: (none) Visible Traits: none Outfit Summary: (none) Injuries: none Mutations: none Active Conditions: none Permanent Conditions: none

Build Dominance Profile:
Build Role: dungeon
Dominant Build Stats: atk, def, spd
Weak Build Stats: none
Resource Lean: mixed_resource
Combat/Defense Style: direct_force / fragile
Mobility/Magic Style: ordinary_or_slow / mundane_or_unproven
Domains: none_confirmed
Build Vulnerabilities: physical_impact_danger

```
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
Currency - silver: 0
Currency - gold: 0

```
#### /time
```text
[AIDRPG /time]
Day: 1
Hour: 8
Minute: 0
Season: (unset)
Weather: (unset)

Elapsed Hours: 0
Known Route Times: 0
Contradiction Flags: none

```

## PASS — Smoke: AIDRPG shell loads and input hook initializes state

Suite: smoke
Likely system: Unknown / Cross-System
Roadmap maturity: UNLABELED
Severity: Low
Confidence: Low

### Intended function under test
Confirm the whole script can be loaded and called like AI Dungeon calls it.

### Minimal reproduction
- input: "I look around."
