# WorldLedger Build 7.4B — Tester Source Integration Map

Status: coverage/control artifact only. No WorldLedger source code was edited.

Purpose: integrate the newly supplied old tester packages as coverage sources without letting them derail production. These packages are not the new master architecture. They are regression mining sources: they tell us what kinds of failures to prevent, which rows to port into each build gate, and which old assumptions should not return.

## 1. Newly supplied tester packages inspected

### aidrpg-tester-true-stress-v1.0.zip
Contains an older broad stress runner with runtime harness, fake AI Dungeon runtime, assertion helpers, generators, reports, and an old AIDRPG script.

Key files:
- `runner.js`
- `runtime/fake-aid-runtime.js`
- `runtime/assertions.js`
- `generators/whole-system-generator.js`
- `generators/redline-generator.js`
- `generators/action-mode-generator.js`
- `generators/inventory-generator.js`
- `reports/latest-report.json`
- `reports/failures-only.json`
- `reports/patch-targets.md`
- `aidrpg-script.js`

Report snapshot:
- 82 rows
- 56 passed
- 26 failed

Important suites/categories:
- stress-negative-controls
- stress-similar-names
- stress-context-pressure
- stress-idempotency
- stress-contradiction
- stress-command-mode-safety
- scene-confirmation
- scene-expanded
- ability-status
- ability-expanded

Most useful current lessons:
- near-action inventory denial: “almost grab” must not grant
- weak/distant scene mention must not replace current scene
- similar item names must resolve correctly
- status consequences like exhausted must be visible in state and commands
- context must carry current scene wording well enough to avoid losing truth

### aidrpg-final-ai-dungeon-stress-tester-v1.3.zip
Contains an AI Dungeon platform compatibility/stress tester.

Key files:
- `runner.js`
- `FINAL_TESTER_REFERENCE_v1_3.md`
- `DUNGEON_SIMULATION_TESTER_REFERENCE.md`
- `ADVENTURE_STRESS_TESTER_REFERENCE.md`
- `generators/final-ai-dungeon-compat-generator.js`
- `runtime/fake-aid-runtime.js`
- `templates/input-tab-example.js`
- `templates/context-tab-example.js`
- `templates/output-tab-example.js`

Report snapshot:
- 8 rows
- 7 passed
- 1 failed

Most useful current lesson:
- output-derived state must appear in the next Context hook. The old failing row: after “You find a black sigil key and put it in your pouch,” the next Context packet needed to mention the key/inventory/pouch. This is a Build 8 context-card gate, not a Build 7.5 owner-system gate.

### aidrpg-final-ai-dungeon-stress-tester-v1.4.zip
Contains the v1.4 play-loop tester with `runner14.js`.

Key files:
- `runner14.js`
- `run_v14_all.js`
- `V14_TESTER_NOTES.md`
- `FINAL_TESTER_REFERENCE_v1_3.md`
- `generators/final-ai-dungeon-compat-generator.js`
- `runtime/fake-aid-runtime.js`
- `reports/latest-report.json`

Report snapshot:
- 8 compatibility rows
- 7 passed
- 1 failed: same output-to-next-context timing issue as v1.3

Most useful runner14 coverage:
- input-only pickup must not grant
- confirmed inventory matrix across many verbs/items/sources
- denied inventory matrix across illusion, blocked, no item, snatched away, almost, vanished, sealed
- delayed confirmation: denied first turn, confirmed second turn
- dialogue instruction and quoted second-person text must not grant
- narrated dialogue handoff should grant
- quest confirm/deny
- ability confirm/deny
- anime-style exact technique identity preservation
- Ember Ward application must not create a separate “Low Dome” skill
- time confirm/deny, including denied long sleep and confirmed time skip aging once
- route base plus weather delay persistence
- reputation public/secret/rumor distinction
- sword pickup/equip/use/throw/recover and stolen sword removal
- named item rename/damage persistence
- Story Card repeat sync safety

### aidrpg-ai-dungeon-mimic-tester-v1.4.1-safe.zip
Contains the safe v1.4.1 tester plus AI Dungeon mimic runtime.

Key files:
- `runner14.js`
- `run_v14_all.js`
- `runtime/ai-dungeon-mimic.js`
- `runtime/script-resolver.js`
- `aid-mimic.js`
- `CHATGPT_SAFE_USAGE.md`
- `CHANGELOG_v1_4_1_SAFE.md`
- `reports/validation-smoke/summary.json`
- `reports/v14quick/final_summary.json`

Report snapshot:
- latest report: 5 smoke rows, 5 passed
- validation-smoke: 10 rows, 10 passed

Most useful current lesson:
- this package is safest as a platform simulation reference for hook shape, timeout, returned text shape, and simple validation-smoke. It should not be run wholesale every build, but its mimic runtime assumptions should inform the Build 8/9 platform checks.

## 2. How these testers change the plan

They do not replace the current clean-core build plan.

They do change the regression coverage standard. The old tester packages prove that our small local smoke rows are not enough before Context/Cards. The new rule is:

- Each focused build chunk ports only the relevant tester categories.
- The full v1.4 play-loop and mimic tests become pre-release / pre-Build-8 / final-acceptance references.
- We do not run 1,200+ rows every production turn.
- We do not copy old AIDRPG script code into WorldLedger as chunks.
- We translate useful tester expectations into current clean-core owner tests.

## 3. Tester material mapped to current and future builds

### Already mostly represented in current Build 7.4

Inventory/currency safety:
- input-only denial
- confirmed pickup/handoff/pocket/retrieve
- inventory denial: idea/metaphor, sign/manual/example, dialogue instruction, almost/failed grab
- delayed confirmation basics
- mixed refusal plus confirmed handoff
- currency handoff/spend/purchase/quote separation

Quest safety:
- offer versus accept
- promised reward not paid
- objective item does not become inventory
- reward paid once
- repair/escort/recover objectives linked to places/actors/items

Time/body safety:
- sleep overnight
- interrupted rest denial
- fatigue/strain
- poison/injury basics
- route base versus delay

Combat/threat safety:
- group count and reinforcements
- horde/pack threat
- dragon no downscale
- elite guard tier

### Build 7.5 must port now

Ability/progression and actor-junk compaction:
- repeated Ember Ward use creates one compact record, not bloat and not disappearance
- practiced ward/stance/technique wording becomes compact evidence
- exact anime technique names are preserved
- application wording does not create fake separate skills, e.g. Ember Ward low dome is application, not “Low Dome” skill
- denied/failed/pretend/quoted abilities still do not become canon
- actor/item junk suppression from story prose: no actor_ring, actor_your_stamina, item_quick_nap_on_the_floor
- named possessive actor evidence, e.g. Grete’s sharp eyes...
- weak world-info place candidate, e.g. “known as The Drunken Barnacle...”

### Build 7.6 should port

Progression/combat/formula/core RPG balance:
- XP challenge rows from formula appendix
- overlevel XP decay
- underleveled danger warning
- ability evidence thresholds
- resource cost labels
- damage severity conversion
- combat reward operation keys
- no world rubber-band scaling
- training anti-farm and repeated low-risk decay

### Build 8 should port

Context and protected cards:
- next Context hook reflects output-derived state, e.g. black sigil key in pouch
- current scene/location packet appears and stays compact
- custody correction appears in context
- uncertainty is labeled
- context avoids full dumps
- protected cards mirror state only
- dirty protected card updates only when needed
- max card writes per turn
- generated card creation disabled unless allowed
- no stale metadata, no repeated body, no [object Object]

### Build 9 / final acceptance should port

Platform and full play-loop validation:
- AI Dungeon hook wrappers return valid text shape
- no obvious Node/browser/network APIs
- repeated context calls under runtime and size budgets
- command mention and story text do not execute slash commands
- Story Card API duplicate/update/remove assumptions
- safe mimic runtime smoke
- full v1.4 play-loop representative subset
- long-story replay probes

## 4. Important old failures now promoted to permanent regression rows

These must stay in the acceptance set once ported:

Inventory / item state:
- “You almost grab the bronze dagger, but stop before taking it.” → no item
- “You reach for the item, but it is illusion / vanishes / sealed behind glass.” → no item
- quoted item instruction from NPC → no item
- narrated handoff after quote → item granted
- delayed denied turn then confirmed turn → only confirmed turn grants
- source/action fragments like “from the altar,” “secure it,” “in your pouch” must not become item names
- similar names: minor healing vial versus poison vial; iron key versus keyring
- sword pickup/equip/use/throw/recover does not duplicate
- stolen/lost sword is not still owned/equipped
- named item rename and damage persist

Ability:
- failed/collapsed technique → no stable ability
- quoted command to use unknown technique → no ability
- pretend/joke ability use → no ability
- repeated Ember Ward → compact use/evidence, not spam
- exact named technique preserved
- application wording does not create fake separate skill

Time/world/context:
- visible tavern across street does not replace current scene
- denied long sleep does not age player
- confirmed long skip ages once, not twice
- route base and weather delay both persist
- current output-derived state appears in next context, not assumed same-turn memory

Actor/reputation:
- random scene NPCs do not become major actors
- named/important actors persist
- secret deed does not create public reputation
- public deed can create positive reputation
- rumor/claim remains labeled, not confirmed fact

Cards/platform:
- generated cards disabled until allowed
- no broad triggers
- context/card text does not create canon
- command output does not become story
- no unsupported platform APIs

## 5. What not to do with these testers

Do not run all old tests every build chunk.

Do not adapt the clean WorldLedger architecture to satisfy outdated AIDRPG command names or state paths unless the behavior is still correct.

Do not import old script code wholesale.

Do not let old tester assumptions override the new WorldLedger plan where the plan is intentionally different. For example, WorldLedger may have different command names or schema buckets, but the safety behavior must still pass: no duplicate rewards, no context/card-created canon, no unsupported actor/item/quest mutation.

## 6. Immediate next build implication

Proceed with Build 7.5, but use the old testers as the regression source for that chunk.

Build 7.5 target name:

`Build 7.5 — Ability / Progression / Actor-Junk Compaction Hardening`

Build 7.5 required regression imports:

1. Ember Ward repeated-use compaction.
2. Exact technique identity preservation.
3. Application wording does not create separate fake ability.
4. Denied/failed/pretend/quoted ability remains denied.
5. Actor/item junk suppression from story prose.
6. Grete-style possessive actor capture.
7. Weak world-info place candidate from “known as...” without making it current location.
8. No cards/context/release promotion during this build.

## 7. Stop gate before Build 8

Before Context/Cards, run a combined gate containing:

- Build 7.2 inventory/currency hardening rows
- Build 7.3 time/body rows
- Build 7.4 quest/world/actor relationship rows
- Build 7.5 ability/junk/compaction rows
- v1.4 output-to-next-context timing row, marked pending until Build 8 actually exists
- source audit: one hook each, one scanner, one validator, one reducer dispatcher, no wrappers, no fake pass, no reconcile

Build 8 is not safe until this combined gate has no owner-system blockers.
