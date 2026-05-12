# C25U5 Expanded Test Result

Target: c25u5.txt
Stage: Chunk 25 / major actor memory

## Counted results

- Core compatibility/sanity: 23 / 23 passed
- Expanded custom issue-analysis matrix: 142 / 142 passed
- Prior-warning targeted cleanup suite: 76 / 76 passed
- Generated adventure sample suites: 154 / 170 passed

Combined useful total: 395 / 411 passed
Failures: 16 / 411

## Current-stage blockers

None found for the current Chunk 25 major-actor-memory target.

## Fixed from C25U4

- Economy refusal wording now passes the targeted retest, including:
  - cannot afford
  - do not have enough money
  - not enough silver
  - not enough coins
  - lack enough gold
- Compass/small tool acquisition remains clean.
- Concrete/declined inventory acquisition remains clean.
- Inventory next-context visibility remains clean.
- Scene, injury, healing, actor memory, reputation, quest, and CardSync regression groups remain clean.
- Combat outcome and death/failure targeted retests remain clean.
- No live Story Card writes occurred.

## Remaining warnings / final-product expectations

1. Generated death-boundary suite still expects explicit preservation of negated-death / failed-action text.
   - Rumor death negative: “A panicked scout says he heard you died, but you are standing right there.”
   - Failed action: “Your attack misses and the goblin escapes with the coin purse.”
   - Targeted safety behavior passes: the player is not falsely marked dead and failed action is logged in the targeted suite.
   - Generated suite wants terms like “standing” or “misses” exposed in state/context/sheet.

2. Generated context-pressure suite still misses bare one-line important facts with no prior actor/ability setup.
   - “Mira is wounded by a bone dart but stays with the party.”
   - “Ember Ward becomes a dome around the whole team.”
   - Targeted seeded pressure tests pass after Mira and Ember Ward are established.
   - Generated suite expects these to become context-visible even without prior establishment.

## Patch notes

- For death-boundary robustness, store a lightweight recent event for rejected death rumors:
  - “Death rumor rejected: player is standing/alive.”
- Store failed action events with the actual action/escape wording:
  - “Failed action: attack missed; goblin escaped with coin purse.”
- For context pressure, optionally add output-only short-lived recent-event capture for bare important named actor/ability facts:
  - Named actor injured even if not previously established.
  - Known-looking capitalized ability adaptation even if no explicit training record exists.
- Keep current hard-save protections: do not turn rumors into actual death, do not create abilities from hallucinated output-only learning, and do not loosen inventory negation.

## Bottom line

C25U5 is stronger than C25U4. The two previous economy warnings are fixed in targeted testing, and the current Chunk 25 major-actor-memory layer remains clean. Remaining failures are generated-suite final-product expectations around exposing negated death/failed actions and bare one-line context-pressure facts.
