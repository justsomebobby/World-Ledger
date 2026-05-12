# WorldLedger Build 7.4A — Tester / Regression Coverage Map

Status: **read-only coverage map**.  
No WorldLedger source was edited. No build file was generated. This map exists to stop the clean-core rebuild from underusing available tester material before Build 7.5 and before Context/Card implementation.

## 1. Purpose

The immediate purpose is to answer: **what tester, report, story replay, and old-source material exists, what coverage it provides, what is already represented in the current clean-core audits, and what still must be ported before Build 8 Context/Cards.**

This is not a replacement for Build Control. It is a tester/regression companion to Build Control.

The build law still holds:

- one Input hook
- one Context hook
- one Output hook
- one Runtime pipeline
- one EventScanner
- one ProposalBuilder
- one CanonValidator
- one ReducerRegistry
- one OperationLedger
- no hook wrappers
- no reconcile blocks
- no fake pass normalizers
- no acceptance shrink
- old code/test cases are evidence until translated into the clean owner path

## 2. Materials inventoried

### 2.1 Active current build base

- `/mnt/data/WorldLedger_CleanCore_Build7_4_QuestActorWorldRelationshipHardening.txt`
- Current planned next code build: **Build 7.5**, not Build 8.

### 2.2 Control authority

- `/mnt/data/WorldLedger_Clean_Core_Build_Control.docx`
- `/mnt/data/WorldLedger_Clean_Core_Build_Control.md`

Use as the non-negotiable architecture contract.

### 2.3 Old tester/report package

From `/mnt/data/Oldaidrpgtestsandresults.zip`:

- `AIDRPG_Final_Tester_Manual.docx`
- `AIDRPG_v1_3_7_Player_Breaker_Test_Report.docx`
- `AIDRPG_v1_3_8_Player_Breaker_Test_Feedback.docx`
- `AIDRPG_v1_3_8_test_feedback_report.md`
- `c25u1_final_stress_summary.md`
- `c25u2_final_stress_summary.md`
- `c25u5-expanded-summary.md`
- `c25u1-expanded-combined.json`
- `SEMANTIC_ADAPTER_CALIBRATION_REPORT.md`
- `README_SEMANTIC_ADAPTER_v0_1.md`
- compiled old scripts including `aidrpgv1-3-8.txt`, `aidrpgv1-6-2_ABILITY_GROWTH_COMBAT_REWARDS.txt`, `aidrpgv1-7-8_SETUP_QUEST_POLISH.txt`, `aidrpgv1-8-5_FINAL_QA_RELEASE.txt`, `aidrpgv1-9-2_CONSEQUENCE_COMBAT_INJURY_CORE.txt`, and `c25u6.txt`

Important finding: this zip contains tester **reports/manuals and script builds**, but I did **not** find the actual runner files such as `runner14.js`, `runner.js`, or `selftest.js` in `/mnt/data`. Until the actual runner code is provided, the old test cases must be ported into our local clean-core audit harness manually, category by category.

### 2.4 Planning/build packages

- `AIDRPG_Final_Build_Planning_Package_v1_4_23_REPAIRED_FINAL_WITH_PRODUCTION_CHUNKS_01_TO_25.zip`
- `AIDRPG_Final_Build_Planning_Package_v1_4_READY_FOR_CODEPASS1.zip`
- `AIDRPG_MASTER_PACKAGE_v1_3_ROADMAP_GAP_ALIGNED.zip`

Relevant areas:

- Build Chunk 10: proposal/local clause binding and risk flags
- Build Chunk 11: CanonValidator and clause-level canon rules
- Build Chunk 12: owner-specific sanitizer/resolver rules
- Build Chunk 14: core reducer plans
- Build Chunk 15: context/card/dirty queue migration
- Build Chunk 16: release/regression matrix lock
- Design Bible chunks for stats, XP, threat, combat, crafting, economy, quest, investigation, actors, world/time/travel, and final lockdown

### 2.5 Story replay / long story sources

- `/mnt/data/v178_story_replay_150_noctx.json`
- `/mnt/data/1777678043836-personal-isekai-text.zip`
- `/mnt/data/1777678081953-isekai-rpg-is-text.zip`
- `/mnt/data/1777680516817-projectaidrpg.md`
- `/mnt/data/1777516182917-next-door-whore.md`
- `/mnt/data/1778183321557-ainurlindal-text.zip`

These are not unit tests by themselves. They are **story-probe sources** for natural phrasing, junk extraction, actor/place drift, card pressure, and long-play state growth.

### 2.6 World/rule fixtures

- `/mnt/data/Story cards .json`
- `/mnt/data/story_cards_VERSION_A_FINAL_merged_cleanup.json`
- `/mnt/data/Final World Bible.txt`

Use these as data/rule fixtures for race, body, threat, faction, region, and persistence behavior. Do not hardcode all lore into mechanics.

## 3. Tester families and what each contributes

## 3.1 AIDRPG Final Tester Manual

Role: **operating guide for serious local AI Dungeon-style testing**.

Coverage categories named by the manual:

- smoke/load
- AI Dungeon compatibility
- Input hook
- Context hook
- Output hook
- state persistence
- inventory
- scene tracking
- time
- abilities
- injuries/statuses
- actors
- quests
- reputation
- card sync
- duplicate-output/retry safety
- false positives from dialogue, memory, hypotheticals, weak mentions, slang phrasing
- short adventure flow: guild quest, dungeon, combat, injury/healing, loot, payment, shopping, sleep

Manual-defined test suites:

- `smoke`
- `final-ai-dungeon-compat` / `aid-compat`
- `adventure-baseline`
- `adventure-scene`
- `adventure-inventory`
- `adventure-injury`
- `adventure-healing`
- `adventure-ability`
- `adventure-combat`
- `adventure-economy`
- `adventure-time`
- `adventure-context-pressure`
- `adventure-negative`
- `adventure-death-boundary`
- `adventure-stress`

How to use it now:

- Do not claim Build 7.4+ is “seriously audited” unless our local checks cover these categories or we explicitly say which categories are missing.
- The manual’s grouping method should become the final report style for `/fullacceptancecheck` and final human audit.

## 3.2 AIDRPG v1.3.8 Player-Breaker Report

Role: **gold-standard compact regression suite for false-positive prevention**.

Reported result:

- total rows: 343
- passed: 343
- failed: 0
- highest hook duration: 264 ms

Suite totals:

| Suite | Total | Passed | Failed |
|---|---:|---:|---:|
| selftest | 3 | 3 | 0 |
| runner14-smoke-isolated | 10 | 10 | 0 |
| runner14-standard-direct | 256 | 256 | 0 |
| runner14-adversarial-direct | 67 | 67 | 0 |
| official-smoke | 9 | 9 | 0 |

Important category totals:

| Category | Total | Meaning for WorldLedger |
|---|---:|---|
| input-only | 12 across smoke/standard | normal player intent must not directly grant canon success |
| confirmed-inventory | 33 across smoke/standard | positive acquisition phrasing must work |
| inventory-denial | 36 | quote/idea/manual/dream/fail/false-claim inventory denial |
| delayed-confirmation | 4 | pending/confirmed distinction |
| dialogue-instruction | 55 | quoted/NPC/instruction phrasing must not mutate canon incorrectly |
| quest-confirm-deny | 56 | quest objectives/rewards must not leak into inventory/payment |
| scene-confirm-deny | 17 | scene/location must distinguish weak mention from arrival |
| ability-confirm-deny | 24 | ability learning/use denial and confirmation |
| time-confirm-deny | 3 | quoted/dream/nonliteral time handling |
| reputation | 3 | private/sarcastic statements do not become public reputation |
| story-cards | 8 | card API/basic card behavior |
| context-pressure | 2 | bounded context under pressure |
| chaotic | 5 | mixed adversarial phrasing |
| long-play | 1 | basic long-play stability |
| player-breaker-inventory | 15 | high-risk inventory false positives/false negatives |
| player-breaker-ability | 6 | high-risk ability false positives and repeated-use compaction |
| player-breaker-time | 5 | time/death denial |
| player-breaker-context | 2 | small context and long adversarial no-grant text |
| player-breaker-fuzz | 36 | seeded inventory fuzz |

Must port into WorldLedger AcceptanceSuite:

- every player-breaker row
- all 36 inventory-denial rows
- all quest-confirm-deny rows relevant to inventory/reward/quest leakage
- scene-confirm-deny rows before Context/Cards
- ability-confirm-deny rows before cards show abilities
- context-pressure rows when Build 8 begins
- story-card rows when CardSystem begins

Current clean-core status:

- Many player-breaker inventory/ability/time rows are now represented in Build 7.2–7.4 audits.
- The full 343-row suite is **not yet ported**.
- Build 8 should not proceed until the missing rows are either ported or explicitly scheduled for the exact Context/Card phase.

## 3.3 AIDRPG v1.3.7 Player-Breaker Failure Report

Role: **known bad patterns that must remain permanent negative regressions**.

Reported result:

- smoke pass: 10/10
- adversarial pass: 61/67
- six failures
- max hook duration: 212 ms

Permanent failure rows to keep:

1. `grab for X, but NPC snatches X` must not grant X.
2. Scroll/manual/title says “learned X” but player learns nothing must not create X.
3. Attempted X collapses and no usable technique remains must not create X.
4. NPC says “Use X” but player does not know X must not create X.
5. Pretend/joke use of X must not create X.
6. Eighteen repeated uses of Ember Ward must compact into one bounded record, not text/array spam.

Current clean-core status:

- Inventory interrupted possession: represented and passing from 7.2.
- Ability false-positive denial: represented and passing from 7.1/7.2/7.4 audits.
- Ember Ward repeated-use compaction: **still not fully implemented in clean-core Build 7.4**. This is a Build 7.5 priority.

## 3.4 C25U stress summaries

Role: **large generated adventure-stress expectation source**. These are especially useful for systems that pass unit tests but fail long-form play.

### C25U1 final stress summary

Reported result:

- total: 399
- passed: 270
- failed: 129
- pass rate: 68%

Major failures:

- ContextPacketSystem: 20 failures
- injury/status visibility: 20 failures
- ActorProfileSystem/NPC deep: 20 failures
- death/failure boundaries: 16 failures
- inventory: 18 failures total across clusters
- scene/context: 18 failures

Key lessons:

- smoke/load can pass while context pressure, actor memory, injury, death/failure boundaries, and adventure integration fail badly.
- final Context must preserve dirty/current truth under pressure.
- actor memory must store stance/goals/grudges/relationship details.
- injury/status must be normalized and visible.

### C25U2 final stress summary

Reported result:

- total: 399
- passed: 311
- failed: 88
- pass rate: 77.9%
- improved by +41 passes over C25U1

Remaining blockers:

- injury/status still weak: 8/25
- death/failure boundary weak: 4/20
- major actor memory not final-ready: 5/20
- context pressure still weak: 8/20
- inventory slang positive capture gaps: 36/40
- combat/economy reward gating gaps
- adventure baseline context omitted key facts such as Old Barrow, burn, healing kit, Mira/Bram, dawn, and silver

### C25U5 expanded summary

Reported result:

- core compatibility/sanity: 23/23
- expanded custom issue-analysis matrix: 142/142
- prior-warning targeted cleanup suite: 76/76
- generated adventure sample suites: 154/170
- combined useful total: 395/411
- failures: 16

Remaining warnings:

- generated death-boundary suite wanted explicit preservation of negated death / failed-action text
- generated context-pressure suite missed bare important facts with no prior actor/ability setup
- examples: “Mira is wounded by a bone dart…” and “Ember Ward becomes a dome…” should become visible enough without unsafe promotion

Current clean-core status:

- Build 7.3 improved injury/rest/poison, but C25U injury/death/failure scope is broader than our current rows.
- Build 7.4 improved actors/quests, but deep actor memory from C25U is not complete.
- Context pressure cannot be judged until Build 8, but the C25U context failures should define Build 8 tests.

## 3.5 UTM2 Semantic Adapter Calibration

Role: **semantic selector test plan**, not just hook-smoke.

Calibration result:

- rows evaluated: 5 / 1440
- checks: 11
- pass: 3
- fail: 2
- max hook time: 281 ms

Important findings:

- “pick up the idea of an iron key” still created an item in old tested script.
- “accept moonlit amulet from gate guard” exposed a witness/actor-memory expectation question.

Planned category shards:

- INV
- ABL
- TIM
- REP
- QST
- SCN
- MEM
- BDY
- TRN
- CRD
- STA
- CTX

Current clean-core status:

- UTM2 is not yet ported.
- This is the long-term route to a much larger semantic suite, but should be run in batches, not all at once.

## 3.6 Story replay JSON / long story exports

Role: **realistic freeform phrasing and junk-pressure source**.

`v178_story_replay_150_noctx.json` showed long replay outcomes across several stories, including actor/item/location counts, story card ops, dirty queue size, performance, and junk examples.

Important junk examples from the replay:

- actors: “but I’m a quick learner”
- actors: “your Manual Labor”
- actors: “you sleep”
- actors: “your body”
- actors: “powers you don’t fully understand”
- actors: “your Dark Energy”
- actors: “it’s too late”
- actors: “landing back on your face”
- actors: “you with a fresh stylus”
- item: “with a piece of your vitality”

Build 7.4 audit also found current story-probe risks:

- `actor_ring`
- `actor_your_stamina`
- `item_quick_nap_on_the_floor`
- missed `Grete` from possessive/narrative phrasing
- missed weak place candidate for `The Drunken Barnacle` in guide/world-info narration

Current clean-core status:

- These should be Build 7.5 targets before cards/context mirror junk.

## 3.7 Build chunks and production planning package

Role: **architecture/test doctrine source**.

Especially important:

- Build Chunk 10 requires EventProposal to preserve local clause binding, target binding, source hook, safety flags, owner module assignment, operation-key suggestions, and risk flags.
- Build Chunk 10 explicitly says ReleaseCheck must fail if inventory proposals cannot represent denied/revoked/abstract/dream/quote cases, ability proposals cannot represent failed/quoted learning cases, place proposals cannot separate weak mention from arrival, time proposals cannot represent nonliteral references, or reward proposals cannot separate promise from payment.
- Build Chunk 11 is the canonical source for clause-level CanonValidator development.

Current clean-core status:

- Current pipeline follows this design at a small scale.
- More of the old build-chunk tests should be ported to `/fullacceptancecheck` before final release.

## 4. Current Clean-Core coverage status after Build 7.4

Legend:

- **Covered** = implemented and locally tested in current clean-core builds.
- **Partial** = exists but too thin for final play.
- **Missing** = not implemented or not adequately ported.
- **Future-phase** = intentionally held for Context/Card/Acceptance phase.

| Area | Current status | Evidence / issue |
|---|---|---|
| source structure / no wrappers | Covered | source audits show one hook each, no banned strings |
| input-only mutation denial | Covered | current audits block normal input grants |
| command/debug/context/card echo mutation | Covered for command/context basics | Card echo cannot be fully tested until CardSystem exists |
| inventory confirmed acquisition | Partial | many forms work; slang/aliases and long-play weirdness still need broader rows |
| inventory denial | Partial/Covered for many old breaker rows | 7.2 fixed idea/sign/lesson/quote; full v1.3.8 36-row denial suite not fully ported |
| inventory interrupted possession | Covered | `grab for X but snatched` represented |
| currency/payment | Partial | copper pouch/buy/quote work; broader wages/sell/trade/debt repayment still needed |
| equipment/custody | Partial/Missing | slots exist conceptually, not deeply tested |
| quest offer/accept/progress/reward | Partial | 7.4 fixed objective leakage and some links; multi-objective/failure/deadline archive still thin |
| actor ↔ quest/place links | Partial | 7.4 added basic relationships; deep actor memory still weak |
| profile/race setup | Covered/Partial | loose placeholders work; race-card linking works in correct storyCards environment; richer scenario setup still needs long-play tests |
| form/body distinction | Partial | dream/disguise/illusion/temp/permanent basics work; body/equipment fit and body-trait implications thin |
| injury/status/rest | Partial | 7.3 covers basic injury/poison/rest; C25U injury/death/failure suite is much broader |
| death/failure boundary | Missing/Partial | must port C25U and v1.3.8 time/death rows more fully |
| ability false-positive denial | Covered for v1.3.7 breaker cases | still must port full 24 ability-confirm-deny rows |
| ability repeated-use compaction | Missing/Partial | Ember Ward repeated-use is Build 7.5 priority |
| skill/talent/passive categories | Partial | core exists; lifecycle/XP/history/card eligibility not final-depth |
| progression/domain XP | Partial | basic lanes and anti-input-cheat exist; full formulas/training/combat rewards not complete |
| combat/threat/group counts | Partial | group counts/horde/elite/dragon work; creature matrix/environment/rewards still thin |
| economy/crafting/domain/warfare/absorption/evolution | Boundary only | honest evidence systems, not full reducers |
| world places/layouts | Partial | named places/rooms/contradictions exist; weak mention vs arrival, parent graph, generated-card readiness still thin |
| actor memory | Partial | named actor basics exist; junk suppression and deep memory are next |
| reputation/private/public | Partial | private sarcastic claim blocked; full witness/public spread not complete |
| context | Future-phase | not implemented as final budgeter yet |
| cards | Future-phase | not implemented as final CardSystem yet |
| flat AcceptanceSuite | Missing | build checks exist, but full old tester categories not ported |
| long-play regression harness | Missing/Partial | story-probe used manually; not automated enough |

## 5. Specific old-source logic to salvage cleanly

Do not copy old wrappers. Translate these concepts into the current clean owner architecture.

### 5.1 From `aidrpgv1-3-8.txt`

Salvage concepts:

- broad ability noncanon gate
- interrupted-possession inventory gate
- compact repeated ability state
- clause splitter that respects `but/however/then/after/while`
- quote stripping before canonical checks
- item/ability normalized-key comparison

Destination owners:

- `CanonValidator`
- `EventScanner` local-clause helpers
- `AbilityLifecycleSystem.recordUseCompact`
- `InventoryEquipmentSystem` validation helpers

Do not copy:

- final patch wrapper form
- version/stage patching
- rescue wrappers around old hook paths

### 5.2 From `c25u6.txt` / C25U late scripts

Salvage concepts:

- death rumor rejected recent events
- failed action recent events
- injury/status phrase matrix: burns, poison numbness, electric shock, cracked ribs, smoke inhalation, frostbite/cold numbness, gashes, bruises, scratches, healing cuts
- major actor memory: sightings, goals, grudges, stance, local actor packets
- context dirty priority: actor/status/ability/current truth under pressure
- no-money shop refusal gates
- failed action/reward gating

Destination owners:

- `FormTransformationSystem` / body-status owner
- `CanonValidator` death/failure rules
- `ActorSocialSystem`
- `ContextSystem` when Build 8 begins
- `InventoryEquipmentSystem` / economy boundary for failed purchases

Do not copy:

- monolithic old state structure
- CardSync wrappers
- context output formatting wholesale

### 5.3 From `aidrpgv1-6-2_ABILITY_GROWTH_COMBAT_REWARDS.txt`

Likely salvage:

- ability growth and combat reward heuristics
- progression/cost/reward integration
- combat-earned XP separation

Destination:

- Build 7.5/7.6 or later: `AbilityLifecycleSystem`, `ProgressionSystem`, `CombatThreatSystem`

### 5.4 From `aidrpgv1-7-8_SETUP_QUEST_POLISH.txt`

Likely salvage:

- setup/profile polish
- quest wording polish
- quest/reward contamination rules

Destination:

- `PlayerProfileSystem`
- `QuestObjectiveRewardSystem`

### 5.5 From `aidrpgv1-8-5_FINAL_QA_RELEASE.txt` and `aidrpgv1-8-2_NATURAL_CONFIRMATION_REPAIR.txt`

Likely salvage:

- final QA regression expectations
- natural confirmation safeguards
- command/check output hygiene

Destination:

- AcceptanceSuite
- CanonValidator
- SourceGuard

### 5.6 From `aidrpgv1-9-2_CONSEQUENCE_COMBAT_INJURY_CORE.txt`

Likely salvage:

- consequences/injury/combat state logic
- death/failure boundaries
- lasting injury/condition rules

Destination:

- Build 7.6: body/death/failure/combat consequence hardening

## 6. What must be ported before Build 8

Build 8 is Context + Cards. Context/Cards mirror state. Therefore the state must not still be producing junk entities or missing current-truth facts.

### Mandatory before Build 8

1. **Ability repeated-use compaction**
   - `Ember Ward forms around you again...` creates/updates one compact record.
   - Repeated 18-use spam remains bounded.
   - arrays/evidence notes dedupe.

2. **Actor/item junk suppression from long-story lines**
   - no `actor_ring`
   - no `actor_your_stamina`
   - no `item_quick_nap_on_the_floor`
   - no actors from `your body`, `you sleep`, `it's too late`, etc.

3. **Named actor narrative capture**
   - `Grete's sharp eyes...` creates Grete actor evidence.
   - actor possessive/presence phrasing must work without creating abstract junk.

4. **World-info weak place candidates**
   - `A flophouse known as The Drunken Barnacle...` creates weak place candidate.
   - quoted lesson/manual text still does not grant mechanics.

5. **Death/failure boundary events**
   - death rumors do not kill, but may store rejected death rumor recent event.
   - failed attack / enemy escapes / no reward events are recorded enough for context later.

6. **Broader injury/status normalization**
   - burn forearm
   - poisoned thumb
   - electric shoulder shock
   - cracked ribs
   - concussion/head injury
   - frostbite/cold numbness
   - acid hand/arm burn
   - smoke inhalation
   - healing cuts/recovering ribs

7. **No-money shop/economy failure gates**
   - cannot afford / not enough money / lack enough gold / not enough silver must not create item or spend currency.

8. **Old v1.3.8 regression row import plan**
   - the 343 rows do not all need to be physically coded before Build 8 if Build 8 is still a draft, but the Build 8 stop gate must include the relevant context/story-card rows and all player-breaker rows.

## 7. Proposed next development chunks

### Build 7.5 — Ability / Progression / Actor-Junk Compaction Hardening

Primary scope:

- Ember Ward repeated-use compaction
- practiced ward/stance/technique output evidence
- dedupe ability arrays/history
- preserve ability false-positive denials
- actor/item junk suppression from long-story probes
- Grete possessive actor detection
- weak world-info place candidate for Drunken Barnacle

Active edit targets:

- `EventScanner.detectAbilityProgressionCandidates`
- `EventScanner.detectActorSocialCandidates`
- `EventScanner.detectWorldPlaceCandidates`
- `CanonValidator` local-clause risk rules
- `AbilityLifecycleSystem`
- `ActorSocialSystem`
- `WorldStructureSystem`

Do not touch:

- hooks
- Runtime binding
- release status
- Context/Card implementation
- old wrapper patterns

Required tests:

- 18 repeated Ember Ward uses compactly recorded.
- false ability rows from v1.3.7 remain denied.
- `Borin appears, a ring of iron keys jangling in his hand` does not create actor `Ring`.
- `Your stamina gives way...` does not create actor `Your Stamina`.
- `You take a quick nap on the floor...` does not create item `Quick Nap On The Floor`.
- `Grete's sharp eyes snap to you...` creates Grete actor evidence.
- `A flophouse known as The Drunken Barnacle...` creates weak place candidate.

### Build 7.6 — Body / Death / Failure Boundary Expansion

Primary scope:

- broader injury/status phrase matrix from C25U
- death rumor / near-death / actual death / unconscious distinction
- failed action/no-reward boundary
- no false death from rumor/dream/quote
- body-status cleanup names for ugly injuries

Active edit targets:

- `EventScanner.detectFormBodyCandidates`
- `CanonValidator` death/failure/body rules
- `FormTransformationSystem` / body-status reducer
- `DiagnosticsSystem` recent events

Required tests:

- burned forearm
- poisoned thumb
- electric shoulder shock
- cracked ribs
- concussion
- frostbite
- acid-burn hand
- smoke inhalation
- rumor death blocked but recorded
- near-death/unconscious recorded without marking dead
- actual clear death boundary recorded appropriately if/when supported
- failed attack/missed/escaped with purse recorded, no reward/item

### Build 7.7 — Economy / Combat Reward / Creature Matrix Hardening

Primary scope:

- no-money shop gates
- boss/warden reward XP gating
- combat reward only after confirmed meaningful contribution
- creature tier matrix from story cards/world bible
- environment/terrain/resistance tags
- pack/horde/swarm pressure tags
- crafting/material consumption boundary if not already strong enough

Active edit targets:

- `EventScanner.detectAdvancedBoundaryCandidates`
- `EventScanner.detectCombatThreatCandidates`
- `CanonValidator`
- `CombatThreatSystem`
- `AdvancedBoundarySystem`
- `ProgressionSystem`

Required tests:

- cannot afford dagger → no item/no payment
- boss defeated → reward/growth only if confirmed outcome
- normal rat vs soldier vs magical ancient rat XP ordering
- inferno wolf pack has fire/pack threat tags
- dragon/drake/wyvern threat tags differ enough for context later

### Build 7.8 — Regression Harness Import / Pre-Context Gate

Primary scope:

- import old v1.3.8 player-breaker rows into local clean-core audit harness
- import C25U representative rows into current build checks
- create a flat category report compatible with final AcceptanceSuite
- decide whether Build 8 may begin

Required coverage groups:

- input-only
- confirmed-inventory
- inventory-denial
- delayed-confirmation
- dialogue-instruction
- quest-confirm-deny
- scene-confirm-deny
- ability-confirm-deny
- time-confirm-deny
- reputation
- story-card preflight
- context-pressure preflight
- player-breaker inventory/ability/time/context/fuzz
- C25U injury/death/actor/context-pressure representative rows

## 8. Build 8 stop gate when it eventually begins

Context/Card work may begin only after the pre-context gate says:

- no known actor/item junk generators remain from story-probe rows
- ability repeated-use compaction is in place
- death/failure/injury current truth is represented enough for context
- quest/objective/place/actor links are stable enough to mirror
- v1.3.8 player-breaker inventory/ability/time rows are ported or explicitly included in the Build 8 stop gate

Build 8 itself must then test:

- Small/Medium/High context modes
- high context means useful safe packet, not flood
- context excludes raw debug/command/card prose
- candidate ability is not stable ability
- hidden lore not injected unless revealed
- inventory/quest/body/actor/current scene prioritized under pressure
- Player Sheet renders once
- no `[object Object]`
- no stale metadata
- user notes preserved once
- generated cards have clean titles and scoped triggers
- no broad triggers like `inn`, `street`, `door`, `counter`, `guard`, `town`, `city`

## 9. Immediate recommendation

Do **not** proceed to Build 8.

Do proceed to:

```text
Build 7.5 — Ability / Progression / Actor-Junk Compaction Hardening
```

Reason: Build 7.4 is structurally clean and fixed quest relationship links, but the next highest-risk blocker is state junk and ability compaction. Cards/context will amplify both if they are not fixed first.

## 10. Short handoff summary

If this map has to be pasted into a future chat:

```text
Use Build 7.4 as current source. Do not build Context/Cards yet.
Oldaidrpgtestsandresults.zip contains critical tester reports and old scripts.
v1.3.8 report: 343/343 passed; port its category coverage into WorldLedger acceptance.
v1.3.7 report: keep six known player-breaker failures as permanent negative regressions.
C25U summaries: use as long-play stress expectations for context pressure, actor memory, injury/status, death/failure, inventory slang, economy gates.
Semantic adapter: future 1440-row category route; port in batches later.
Next code chunk is Build 7.5: ability repeated-use compaction + actor/item junk suppression + named possessive actor detection + weak world-info place candidate handling.
Do not add wrappers. Edit active scanner/proposal/validator/reducer owners only.
```
