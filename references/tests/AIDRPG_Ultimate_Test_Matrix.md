# AIDRPG Ultimate Test Matrix

Purpose: turn the current strong automated pass into a broader discovery program. This is a spec artifact, not a claim that these cases have been run yet.

Total proposed variants: **120**

## Methods

- **MUT — Mutation Testing:** Prove tests fail when a parser rule is intentionally weakened or inverted. (10 variants)
- **FUZ — Randomized Scenario Fuzzing:** Generate weird player/output phrasing around known dangerous boundaries. (10 variants)
- **LCS — Long Campaign Simulation:** Detect slow state drift, stale pending flags, duplicate growth, and performance creep. (10 variants)
- **XSC — Cross-System Conflict:** Verify one messy turn updates only the systems with confirmed evidence. (10 variants)
- **SCM — State Corruption & Migration:** Ensure damaged saved state repairs safely without inventing canon. (10 variants)
- **AIR — Real AI Output Replay:** Replay messy model outputs collected from live/near-live play. (10 variants)
- **RCS — Runtime & Context Budget Stress:** Keep hooks fast and context bounded under AI Dungeon-style constraints. (10 variants)
- **HLS — Hook Lifecycle & Return Semantics:** Validate Input/Context/Output behavior and invalid return edge cases. (10 variants)
- **SCS — Story Card & CardSync Stress:** Stress story card duplication, live/dry-run rules, and dirty queues. (10 variants)
- **DIF — Differential Regression:** Compare v1.3.8 behavior to prior known-bug versions and expected fixes. (10 variants)
- **QRA — Quest/Reputation Ambiguity:** Separate public/accepted canon from rumor, refusal, hypotheticals, and plans. (10 variants)
- **DBT — Death/Body/Transformation Boundary:** Prevent false death/body/species/time mutations from quoted, dream, or temporary text. (10 variants)

## Release Gate

- All P0 variants pass.
- No isolated P1 script failures remain unexplained.
- Long-run state remains bounded.
- Hook p95 is below target and no hook approaches the AI Dungeon-style timeout.
- Any playtest failure is converted into a replay/regression row.

## Full Matrix

### MUT-001 — Inventory denial removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I do not take the silver key.`
- Simulated AI Output: `You leave the silver key on the altar.`
- Expected: No silver key granted.
- Checks: items.ownership.player must not contain silver key; /inventory shows none
- Failure Signals: Any silver key item appears
- Automation Notes: Run once against normal script; then flip deny regex and verify this test fails.

### MUT-002 — Ability quote filter removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I read the scroll title.`
- Simulated AI Output: `The scroll title says "You learned Crimson Lotus Fang," but you learn nothing.`
- Expected: No ability granted.
- Checks: abilities list has no Crimson Lotus Fang
- Failure Signals: Ability created from quoted title
- Automation Notes: Mutation should remove quote guard and fail.

### MUT-003 — Time dream filter removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I sleep in the inn.`
- Simulated AI Output: `You dream that twenty years pass, then wake up unchanged.`
- Expected: No age/time-skip canon.
- Checks: player.age unchanged; history.timeSkips unchanged
- Failure Signals: Player aged or time skip stored
- Automation Notes: Mutation removes dream/hypothetical guard.

### MUT-004 — Reputation private filter removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I mutter a confession alone.`
- Simulated AI Output: `Alone in the cellar, you admit you robbed the mayor, but nobody hears.`
- Expected: No public reputation change.
- Checks: reputation.bySubject unchanged; no rumor
- Failure Signals: Public bad reputation added
- Automation Notes: Mutation removes witness/publicity guard.

### MUT-005 — Quest refusal guard removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I refuse the job.`
- Simulated AI Output: `The guard offers a bounty, but you decline it and walk away.`
- Expected: No quest accepted.
- Checks: quests.active remains unchanged
- Failure Signals: Bounty quest active
- Automation Notes: Mutation removes refusal/decline guard.

### MUT-006 — Duplicate ability guard removed

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I cast Ember Ward again.`
- Simulated AI Output: `You cast Ember Ward. The ember ward flares around you.`
- Expected: One use event only.
- Checks: use count increments <=1 this turn; no duplicate notes
- Failure Signals: Multiple duplicate uses/notes
- Automation Notes: Mutation disables per-turn operation key.

### MUT-007 — State repair disabled

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `/sheet`
- Simulated AI Output: `The command opens your sheet.`
- Expected: Invalid preloaded state repairs enough for command.
- Checks: no exception; state.aidrpg.meta.version exists
- Failure Signals: throw/timeout/bad container
- Automation Notes: Inject corrupted state before turn.

### MUT-008 — Card duplicate check disabled

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `I inspect my profile.`
- Simulated AI Output: `Your profile card is updated.`
- Expected: Managed card ref remains unique.
- Checks: no duplicate managed refs; duplicateRefs length 0
- Failure Signals: duplicate story cards
- Automation Notes: Mutation removes namespace uniqueness.

### MUT-009 — Context clamp disabled

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: `look`
- Simulated AI Output: `A normal room description.`
- Expected: Context under maxChars/budget.
- Checks: context.length <= configured max + tolerance
- Failure Signals: oversized context
- Automation Notes: Seed huge memory, many actors/items.

### MUT-010 — Stop/empty return guard disabled

- Method: Mutation Testing
- Section: mutation-core
- Priority: P0
- Player Input: ``
- Simulated AI Output: `The story continues.`
- Expected: Fail-soft text return; no invalid empty/stop output.
- Checks: return.text is non-empty string
- Failure Signals: empty text or stop in wrong hook
- Automation Notes: Mutation removes RuntimeGate/fail-soft path.

### FUZ-001 — Inventory ambiguous verbs

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I sort of almost pocket the {item}, then decide not to.`
- Simulated AI Output: `You almost take the {item}, but leave it untouched.`
- Expected: No item granted.
- Checks: No owned item matching {item}
- Failure Signals: Item granted from almost/leave
- Automation Notes: Fuzz {item}: key, ring, potion, crown, map.

### FUZ-002 — Inventory interrupted possession

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I grab for the {item}.`
- Simulated AI Output: `You grab for the {item}, but a goblin snatches it and runs away.`
- Expected: No item granted.
- Checks: No item matching {item}; no capture beginning with 'for '
- Failure Signals: Owned item begins 'for the...' or item granted
- Automation Notes: Fuzz stealers and interruption clauses.

### FUZ-003 — Ability failed attempts

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I try to use {ability}.`
- Simulated AI Output: `You attempt {ability}, but it fizzles and no usable technique remains.`
- Expected: No ability learned; maybe failed event log only.
- Checks: No canonical ability {ability}
- Failure Signals: Ability granted from failed attempt
- Automation Notes: Fuzz ability names, failure phrases.

### FUZ-004 — Ability quoted commands

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I listen to Mira.`
- Simulated AI Output: `Mira says, "Use {ability} now," but you do not know that technique.`
- Expected: No ability learned.
- Checks: No canonical ability {ability}
- Failure Signals: Ability created from quote
- Automation Notes: Fuzz speaker names and quote punctuation.

### FUZ-005 — Time hypothetical

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I ask what would happen later.`
- Simulated AI Output: `"In fifty years," says the oracle, "this city may fall."`
- Expected: No actual time skip.
- Checks: age unchanged; elapsed unchanged; no timeSkips
- Failure Signals: Time skip recorded
- Automation Notes: Fuzz quoted years and future hypotheticals.

### FUZ-006 — Reputation rumor without witness

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I whisper about the duke.`
- Simulated AI Output: `You whisper alone that you hate the duke. The wall does not answer.`
- Expected: No reputation change.
- Checks: No subject change for duke
- Failure Signals: Reputation updated
- Automation Notes: Fuzz private adverbs and subjects.

### FUZ-007 — Quest planned not accepted

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `Maybe I should rescue the prince later.`
- Simulated AI Output: `You think about rescuing the prince someday, but accept no quest.`
- Expected: No quest active.
- Checks: quests.active unchanged
- Failure Signals: Quest accepted
- Automation Notes: Fuzz goal verbs without acceptance.

### FUZ-008 — Death metaphor

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I give a dying performance.`
- Simulated AI Output: `The audience says your joke killed them, but everyone is alive.`
- Expected: No death/unconscious state.
- Checks: player.hp unchanged; no dead condition
- Failure Signals: dead/unconscious applied
- Automation Notes: Fuzz idioms.

### FUZ-009 — Transformation costume

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `I wear a dragon mask.`
- Simulated AI Output: `You look like a dragon for the festival, but it is only a costume.`
- Expected: Species unchanged.
- Checks: player.species unchanged; no permanent mutation
- Failure Signals: species becomes dragon
- Automation Notes: Fuzz costumes, illusions, disguises.

### FUZ-010 — Long no-op weird text

- Method: Randomized Scenario Fuzzing
- Section: fuzz-boundaries
- Priority: P0
- Player Input: `maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe maybe`
- Simulated AI Output: `Nothing important happens; you regain focus.`
- Expected: No canon changes and no timeout.
- Checks: state hashes stable for major systems; hook < budget
- Failure Signals: canon mutation or timeout
- Automation Notes: Generate 100-1000 tokens of odd text.

### LCS-001 — 500-turn mixed mundane loop

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `Turn N: travel, observe, talk, rest, train lightly.`
- Simulated AI Output: `The world responds with small non-canonical or confirmed events.`
- Expected: State grows slowly; no duplicate storms.
- Checks: state size growth bounded; hook p95 < 500ms; no pending flags older than 3 turns
- Failure Signals: state size runaway, stale pending, time creep
- Automation Notes: Generate deterministic 500 turns with seed.

### LCS-002 — 2000-turn endurance

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `Random but valid action sequence.`
- Simulated AI Output: `Random model-like response sequence.`
- Expected: No crashes; bounded logs/arrays.
- Checks: recentEvents/parses/errors capped; all arrays under configured caps
- Failure Signals: uncapped logs or timeout
- Automation Notes: Run locally; too large for chat tool.

### LCS-003 — Repeated ability legitimate use

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I cast Ember Ward.`
- Simulated AI Output: `You cast Ember Ward and it protects you.`
- Expected: Use count increments once per turn.
- Checks: useCount delta exactly 1 per turn; no duplicate name variants
- Failure Signals: multiple increments per turn
- Automation Notes: Repeat 100 turns.

### LCS-004 — Repeated inventory inspect

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `/inventory`
- Simulated AI Output: `[AIDRPG /inventory]...`
- Expected: Admin command does not mutate canon.
- Checks: item count stable; no new cards unless explicitly dirty
- Failure Signals: admin commands mutate state incorrectly
- Automation Notes: Run every 10 turns.

### LCS-005 — Route shuttling

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I travel from town to forest and back.`
- Simulated AI Output: `The trip takes thirty minutes each way unless delayed.`
- Expected: Route base time stable both directions.
- Checks: same canonical route time; delays logged separately
- Failure Signals: route time overwritten
- Automation Notes: Alternate directions 50 times.

### LCS-006 — Many actors rotate

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I talk to a new named NPC.`
- Simulated AI Output: `NPC gives one small clue.`
- Expected: Actor memory capped and recency stable.
- Checks: majorMemory caps respected; activeIds current
- Failure Signals: actor memory runaway
- Automation Notes: Introduce 200 names.

### LCS-007 — Economy accumulation

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I buy and sell small items.`
- Simulated AI Output: `Transactions complete with stated currency.`
- Expected: Currency never NaN/negative unless debt allowed.
- Checks: currency integer finite; ownership correct
- Failure Signals: NaN/negative/duplicate items
- Automation Notes: Random trade fixtures.

### LCS-008 — Quest churn

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I accept/complete/decline minor tasks.`
- Simulated AI Output: `Some tasks accepted; some refused; some completed.`
- Expected: Quest lifecycle stable.
- Checks: active+archived no duplicate IDs; statuses valid
- Failure Signals: duplicates or wrong status
- Automation Notes: 100 quest microcycles.

### LCS-009 — Stale pending clear

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `I start to learn a spell, then get interrupted for ten turns.`
- Simulated AI Output: `No successful training occurs.`
- Expected: Pending ability expires/clears.
- Checks: pending.abilityCandidate empty after TTL
- Failure Signals: old candidate grants later
- Automation Notes: Explicit interruption sequence.

### LCS-010 — Context drift audit

- Method: Long Campaign Simulation
- Section: long-campaign
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `You check your surroundings.`
- Expected: Context reflects current canon, not obsolete facts.
- Checks: no stale location/quest/item after state changes
- Failure Signals: old canon persists in context
- Automation Notes: Snapshot context every 25 turns.

### XSC-001 — Item plus failed ability

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I grab the lantern and try Void Step.`
- Simulated AI Output: `You secure the lantern, but Void Step fails completely.`
- Expected: Lantern gained; Void Step not gained.
- Checks: item yes; ability no
- Failure Signals: all-or-nothing or ability false positive
- Automation Notes: Checks two systems same turn.

### XSC-002 — Travel plus route delay plus injury

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I limp to the forest in rain.`
- Simulated AI Output: `The trip normally takes 30 minutes, but rain and injury make it 50. You sprain your ankle.`
- Expected: Base route 30, actual delay 50, injury active.
- Checks: route base preserved; delay reason; condition sprained ankle
- Failure Signals: route overwritten to 50
- Automation Notes: Separate base vs actual.

### XSC-003 — Rumor plus hidden deed

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I steal the seal unseen.`
- Simulated AI Output: `No one sees you, but later a rumor vaguely mentions theft.`
- Expected: Hidden deed pending; rumor only if spread text confirms.
- Checks: no direct public reputation unless witness/proof
- Failure Signals: public reputation immediately changes
- Automation Notes: Ambiguous public knowledge.

### XSC-004 — Quest offer plus refusal plus item reward shown

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I refuse the mayor's quest.`
- Simulated AI Output: `The mayor offers a gold ring as reward, but you decline the quest and take nothing.`
- Expected: No quest; no ring.
- Checks: quests no; inventory no
- Failure Signals: ring or quest granted
- Automation Notes: Reject reward previews.

### XSC-005 — Death phrase plus living continuation

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I charge dramatically.`
- Simulated AI Output: `You nearly die, but stagger up alive with a cut.`
- Expected: No death; injury may apply.
- Checks: no dead; hp > 0; injury optional
- Failure Signals: dead condition set
- Automation Notes: Boundary contradiction.

### XSC-006 — Transformation plus disguise

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I pretend to be a wolf.`
- Simulated AI Output: `Your wolf disguise fools the guard, but your body remains human.`
- Expected: Species unchanged; disguise note optional.
- Checks: species unchanged; no permanent mutation
- Failure Signals: wolf species/mutation
- Automation Notes: Temporary appearance only.

### XSC-007 — Multiple item references

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I take the red key, not the blue key.`
- Simulated AI Output: `You take the red key and leave the blue key behind.`
- Expected: Only red key owned.
- Checks: red yes; blue no
- Failure Signals: both keys granted
- Automation Notes: Selective acquisition.

### XSC-008 — Ability taught but rejected

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `Teach me Dragon Palm.`
- Simulated AI Output: `The master offers to teach Dragon Palm, but you refuse the lesson.`
- Expected: No ability.
- Checks: no Dragon Palm
- Failure Signals: ability granted from offer
- Automation Notes: Offer vs acceptance.

### XSC-009 — Quest complete without active

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `I say the beast is slain.`
- Simulated AI Output: `The villagers thank you for killing the beast, though you never accepted a quest.`
- Expected: No invalid active completion; optional archived event only if supported.
- Checks: no active phantom quest
- Failure Signals: phantom quest appears
- Automation Notes: Completion claims.

### XSC-010 — Card sync dirty plus no canon change

- Method: Cross-System Conflict
- Section: cross-system
- Priority: P0
- Player Input: `/cardsync`
- Simulated AI Output: `[AIDRPG /cardsync] Dirty Queue: 0`
- Expected: Admin report only.
- Checks: no dirty queue growth from status command
- Failure Signals: status command dirties cards
- Automation Notes: Story card/status conflict.

### SCM-001 — Missing root

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P0
- Player Input: `/sheet`
- Simulated AI Output: `Sheet opens.`
- Expected: Root state recreated.
- Checks: state.aidrpg exists; no throw
- Failure Signals: crash
- Automation Notes: Start with state = {}.

### SCM-002 — Array root

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `/sheet`
- Simulated AI Output: `Sheet opens.`
- Expected: Invalid array root repaired.
- Checks: state.aidrpg object
- Failure Signals: crash or array persists
- Automation Notes: state.aidrpg=[] before hook.

### SCM-003 — Bad meta dirty

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Dirty shape repaired.
- Checks: meta.dirty has expected arrays/booleans
- Failure Signals: bad dirty remains
- Automation Notes: Inject dirty as string.

### SCM-004 — Future schema

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Future version quarantined and downgraded safely.
- Checks: quarantine records future_version_detected; version current
- Failure Signals: migration exception
- Automation Notes: meta.version=999.

### SCM-005 — Circular-ish cache payload

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Serialization guards do not crash.
- Checks: no throw; cache reset if invalid
- Failure Signals: JSON stringify crash
- Automation Notes: Use unserializable style object if harness supports.

### SCM-006 — Malformed items ownership

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `/inventory`
- Simulated AI Output: `Inventory opens.`
- Expected: Ownership repaired to arrays.
- Checks: ownership.player array
- Failure Signals: inventory command crash
- Automation Notes: ownership.player='key'.

### SCM-007 — Malformed ability records

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `/sheet`
- Simulated AI Output: `Sheet opens.`
- Expected: Ability container repaired/quarantined.
- Checks: abilities.byId object or safe default
- Failure Signals: crash in AbilitySystem.init
- Automation Notes: abilities.byId=[] or string.

### SCM-008 — Malformed storyCards

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Card index refresh handles weird cards.
- Checks: no throw; duplicates tracked
- Failure Signals: CardSync crash
- Automation Notes: Seed storyCards with missing fields.

### SCM-009 — Oversized logs

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Logs pruned to caps.
- Checks: recentEvents <= cap; errors <= cap
- Failure Signals: state bloat persists
- Automation Notes: Seed 5000 log entries.

### SCM-010 — Partial old-version state

- Method: State Corruption & Migration
- Section: state-corruption
- Priority: P1
- Player Input: `/time`
- Simulated AI Output: `Time opens.`
- Expected: Old missing containers filled.
- Checks: all top-level containers exist
- Failure Signals: undefined access
- Automation Notes: Use minimal v0 state.

### AIR-001 — Contradictory acquisition replay

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `I reach for the key.`
- Simulated AI Output: `You take the key. No—before your fingers close, the goblin snatches it and flees.`
- Expected: Final contradiction should deny ownership or mark uncertain, not grant.
- Checks: no key OR uncertain pending, not owned
- Failure Signals: key owned despite final denial
- Automation Notes: Replay real contradictory outputs.

### AIR-002 — Model lists future rewards

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `What is the quest reward?`
- Simulated AI Output: `If you accept, you will receive a silver sword, but for now you have nothing.`
- Expected: No sword.
- Checks: inventory no silver sword
- Failure Signals: reward preview granted
- Automation Notes: Common model reward phrasing.

### AIR-003 — Model says learned in recap

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Recap my training.`
- Simulated AI Output: `Last time, you learned Star Fang—or at least you thought you did. In truth, you failed.`
- Expected: No ability.
- Checks: no Star Fang if previous state lacks it
- Failure Signals: recap creates ability
- Automation Notes: Replay recap hallucinations.

### AIR-004 — Location drift

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Where am I?`
- Simulated AI Output: `You are in the forest. Actually, you never left the tavern.`
- Expected: Current scene should resolve to final correction or remain old if uncertain.
- Checks: scene not both forest/tavern; no duplicate active scenes
- Failure Signals: scene drift/duplicate
- Automation Notes: Replay self-correction.

### AIR-005 — Rumor misattribution

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `What are people saying?`
- Simulated AI Output: `People fear bandits, not you. Some say the mayor is corrupt.`
- Expected: No player reputation penalty.
- Checks: no negative player reputation from bandits/mayor
- Failure Signals: player blamed
- Automation Notes: Replay ambient rumor.

### AIR-006 — Death cliffhanger

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Continue.`
- Simulated AI Output: `You die—then gasp awake from the nightmare.`
- Expected: No death.
- Checks: no dead; hp stable
- Failure Signals: death applied from nightmare
- Automation Notes: Replay dream correction.

### AIR-007 — Quest completion ambiguity

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `I report back.`
- Simulated AI Output: `The captain believes the task may be done, but asks for proof before marking it complete.`
- Expected: Quest remains active/pending proof.
- Checks: active quest not completed
- Failure Signals: premature completion
- Automation Notes: Replay uncertain completion.

### AIR-008 — Time montage

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Train for a while.`
- Simulated AI Output: `Weeks blur together, though only an afternoon truly passes.`
- Expected: Only afternoon passes unless explicit actual weeks.
- Checks: elapsed hours ≈ afternoon, not weeks
- Failure Signals: weeks applied
- Automation Notes: Replay figurative time.

### AIR-009 — Ability flavor text

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Attack stylishly.`
- Simulated AI Output: `Your blade dances like Moonfire Kata, though you know no such art.`
- Expected: No Moonfire Kata ability.
- Checks: ability no
- Failure Signals: ability created from simile
- Automation Notes: Replay style comparison.

### AIR-010 — Story card echo

- Method: Real AI Output Replay
- Section: ai-output-replay
- Priority: P0
- Player Input: `Remember my gear.`
- Simulated AI Output: `The old card says you own the ruby crown, but you gave it away yesterday.`
- Expected: Current state wins over stale card.
- Checks: no ruby crown if ownership removed
- Failure Signals: stale card regrants item
- Automation Notes: Replay stale memory/card conflict.

### RCS-001 — Huge inventory context

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `You look around.`
- Expected: Context remains within budget.
- Checks: context length <= info.maxChars; hook < 2s
- Failure Signals: timeout/oversize
- Automation Notes: Seed 500 items.

### RCS-002 — Huge actor memory

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `You look around.`
- Expected: Actor packet summarized/capped.
- Checks: context includes only top relevant/capped actors
- Failure Signals: unbounded context
- Automation Notes: Seed 500 actors.

### RCS-003 — Huge abilities

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `You focus.`
- Expected: Abilities summarized/capped.
- Checks: context under budget; high-salience abilities retained
- Failure Signals: context blowup
- Automation Notes: Seed 300 abilities.

### RCS-004 — Regex worst-case text

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
- Simulated AI Output: `Nothing happens.`
- Expected: No catastrophic regex backtracking.
- Checks: all hooks under threshold
- Failure Signals: timeout
- Automation Notes: Use long repeated tokens and punctuation.

### RCS-005 — Long quoted denial

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P0
- Player Input: `I read a long manual.`
- Simulated AI Output: `"You learned X" repeated many times, but it is fiction and you learn nothing.`
- Expected: No mass abilities.
- Checks: no new X abilities; hook fast
- Failure Signals: ability spam/timeout
- Automation Notes: Generate 200 quoted ability names.

### RCS-006 — Context maxChars low

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Graceful truncation with maxChars=1000.
- Checks: context <= 1000 + tolerance; no crash
- Failure Signals: bad truncation/throw
- Automation Notes: Set info.maxChars low.

### RCS-007 — Memory fields huge

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Memory/context/frontMemory handled safely.
- Checks: no hook timeout; context sorted/capped
- Failure Signals: timeout/memory
- Automation Notes: Seed state.memory fields if harness supports.

### RCS-008 — Output giant narrative

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `continue`
- Simulated AI Output: `You see a stone. You see a stone. You see a stone. You see a stone.`
- Expected: Parsers scan safely and do not invent mass canon.
- Checks: hook <2s; no mass entities
- Failure Signals: timeout or entity spam
- Automation Notes: Stress output parser with 1000 repeated sentences.

### RCS-009 — Admin spam

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `/sheet`
- Simulated AI Output: `[AIDRPG /sheet]...`
- Expected: Commands stay fast after repeated use.
- Checks: p95 command hook < 250ms
- Failure Signals: command slowdown
- Automation Notes: Run /sheet,/inventory,/time 100x.

### RCS-010 — Dirty queue pressure

- Method: Runtime & Context Budget Stress
- Section: runtime-context
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `Many canonical things change clearly.`
- Expected: Dirty queues capped/batched safely.
- Checks: dirtyQueue cap; no duplicate targets
- Failure Signals: queue runaway
- Automation Notes: Seed many dirty systems.

### HLS-001 — Input empty string guard

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: ``
- Simulated AI Output: `The story waits.`
- Expected: Fail-soft/no crash; avoid invalid empty return.
- Checks: return.text string; no stop
- Failure Signals: empty text failure
- Automation Notes: Simulate AI Dungeon input rules.

### HLS-002 — Context missing info

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P0
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Context fail-soft if info missing.
- Checks: return.text original/safe; diagnostic recorded
- Failure Signals: throw
- Automation Notes: Delete global info before context hook.

### HLS-003 — Output stop not returned

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `continue`
- Simulated AI Output: `stop`
- Expected: Script should not return stop:true from output.
- Checks: return.text is string; stop absent/false
- Failure Signals: stop:true or literal invalid handling
- Automation Notes: AI Dungeon docs warn stop misuse.

### HLS-004 — Non-string input

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `{bad object}`
- Simulated AI Output: `A room.`
- Expected: RuntimeGate normalizes text.
- Checks: no throw; text stringified safely
- Failure Signals: TypeError
- Automation Notes: Pass object/null/number values.

### HLS-005 — State global missing

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Fail-soft diagnostic if no state object.
- Checks: no unhandled throw if possible
- Failure Signals: ReferenceError/unhandled
- Automation Notes: Harness may need sandbox injection.

### HLS-006 — Library loaded twice

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: __shellReady prevents duplicate init but hooks still run.
- Checks: single AIDRPG object; state not reset
- Failure Signals: double-load state reset
- Automation Notes: Evaluate script twice.

### HLS-007 — Hook order normal

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `input->context->output`
- Simulated AI Output: `Normal response.`
- Expected: Turn count increments on input only.
- Checks: currentTurn +1 per player action
- Failure Signals: turn increments on context/output
- Automation Notes: Trace hook sequence.

### HLS-008 — Output duplicate idempotence

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `continue`
- Simulated AI Output: `You gain a copper coin.`
- Expected: Same output replay should not double-apply.
- Checks: coin added once; duplicateOutput true second time
- Failure Signals: double coin
- Automation Notes: Run same output twice.

### HLS-009 — Command clear pending

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `/sheet`
- Simulated AI Output: `[AIDRPG /sheet]...`
- Expected: Admin command clears pending input intent/ability candidate.
- Checks: pending inputIntent null; abilityCandidate null
- Failure Signals: pending remains and later grants
- Automation Notes: Set pending before command.

### HLS-010 — Invalid return object defense

- Method: Hook Lifecycle & Return Semantics
- Section: hook-lifecycle
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Harness catches non-object/non-text returns if script path changes.
- Checks: normalized to {text}
- Failure Signals: crash
- Automation Notes: Mutation/test harness validation.

### SCS-001 — Duplicate managed player card

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `/cardsync`
- Simulated AI Output: `Card sync runs.`
- Expected: One managed player summary card.
- Checks: index.byNamespace player count 1; duplicateRefs 0
- Failure Signals: duplicate player cards
- Automation Notes: Preload duplicate storyCards.

### SCS-002 — Dry-run no mutation

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `/cardsync safe on`
- Simulated AI Output: `Safe mode enabled.`
- Expected: No live storyCard mutation while safe.
- Checks: storyCards unchanged; dryRunLog updated
- Failure Signals: live writes in safe mode
- Automation Notes: Toggle safe mode.

### SCS-003 — Live write gated

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `/cardsync live on`
- Simulated AI Output: `Live writes requested.`
- Expected: Live writes only if safe off and API compatible.
- Checks: pendingWrites/dryRun reflect mode
- Failure Signals: unsafe write
- Automation Notes: Check config flags.

### SCS-004 — Dirty queue dedupe

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `I gain three items.`
- Simulated AI Output: `You gain an apple, sword, and map.`
- Expected: Dirty targets unique.
- Checks: dirtyQueue unique family:id
- Failure Signals: duplicate dirty entries
- Automation Notes: Multi-item output.

### SCS-005 — Card API add duplicate key

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Duplicate addStoryCard returns false handled.
- Checks: no throw; duplicate tracked/logged
- Failure Signals: throw/unhandled false
- Automation Notes: Mock addStoryCard false.

### SCS-006 — Card missing update target

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Missing updateStoryCard handled.
- Checks: quarantine/log, no throw
- Failure Signals: throw escapes
- Automation Notes: Mock updateStoryCard throw.

### SCS-007 — Story card stale conflict

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `The card says you own crown, state says no.`
- Expected: state.aidrpg remains source of truth.
- Checks: context follows state, not stale card
- Failure Signals: stale regrant
- Automation Notes: Seed stale cards.

### SCS-008 — Many story cards

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Index refresh bounded.
- Checks: hook fast; card index capped
- Failure Signals: timeout/index blowup
- Automation Notes: Seed 1000 cards.

### SCS-009 — Namespace collision

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: Only SYS:AIDRPG managed cards controlled.
- Checks: external cards untouched
- Failure Signals: external card overwritten
- Automation Notes: Seed external similar keys.

### SCS-010 — Card removal missing

- Method: Story Card & CardSync Stress
- Section: story-card
- Priority: P1
- Player Input: `look`
- Simulated AI Output: `A room.`
- Expected: removeStoryCard missing target handled.
- Checks: no throw; operation log
- Failure Signals: throw
- Automation Notes: Mock remove failure.

### DIF-001 — v1.3.6 inventory denial regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `You never take the black gate key.`
- Simulated AI Output: `You never take the black gate key.`
- Expected: v1.3.8 should pass; v1.3.6 failed.
- Checks: No black gate key
- Failure Signals: Regression reappears
- Automation Notes: Run against old and current scripts.

### DIF-002 — v1.3.6 idea key regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I pick up the idea of a brass key.`
- Simulated AI Output: `You consider the idea, not the object.`
- Expected: No brass key.
- Checks: inventory no brass key
- Failure Signals: key granted
- Automation Notes: Old failure guard.

### DIF-003 — v1.3.7 ability quote regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I read the scroll title.`
- Simulated AI Output: `The scroll title says "You learned Crimson Lotus Fang," but you only read the title and learn nothing.`
- Expected: No ability.
- Checks: no Crimson Lotus Fang
- Failure Signals: ability granted
- Automation Notes: Old v1.3.7 failure.

### DIF-004 — v1.3.7 failed ability regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I try Void Lantern Veil.`
- Simulated AI Output: `The veil collapses, and no usable technique remains.`
- Expected: No ability.
- Checks: no Void Lantern Veil
- Failure Signals: ability granted
- Automation Notes: Old v1.3.7 failure.

### DIF-005 — v1.3.7 pretend ability regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I pretend to use Azure Dragon Step.`
- Simulated AI Output: `Everyone laughs at the joke; you know no such technique.`
- Expected: No ability.
- Checks: no Azure Dragon Step
- Failure Signals: ability granted
- Automation Notes: Old v1.3.7 failure.

### DIF-006 — v1.3.7 grabbed-for regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I grab for the obsidian key.`
- Simulated AI Output: `The goblin snatches the obsidian key and runs away with it.`
- Expected: No item.
- Checks: inventory no obsidian key and no 'for the obsidian key'
- Failure Signals: bad item capture
- Automation Notes: Old v1.3.7 failure.

### DIF-007 — Time quote regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I read an inscription.`
- Simulated AI Output: `"Twenty years pass," says the inscription, but nothing happens.`
- Expected: No time skip.
- Checks: no timeSkips/age change
- Failure Signals: aged
- Automation Notes: Old v1.3.6 failure.

### DIF-008 — Illusion item regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I pick it up.`
- Simulated AI Output: `You pick up the gem, but it dissolves as an illusion.`
- Expected: No gem.
- Checks: inventory no gem
- Failure Signals: gem granted
- Automation Notes: Old v1.3.6 failure.

### DIF-009 — Reward preview regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I ask about rewards.`
- Simulated AI Output: `If you accept, you may receive a crown.`
- Expected: No crown.
- Checks: inventory no crown
- Failure Signals: crown granted
- Automation Notes: Cross-version check.

### DIF-010 — Duplicate use regression

- Method: Differential Regression
- Section: differential
- Priority: P0
- Player Input: `I cast Ember Ward.`
- Simulated AI Output: `Ember Ward flares.`
- Expected: One update per turn.
- Checks: no duplicate entries
- Failure Signals: duplicate notes/use count
- Automation Notes: Compare record diff.

### QRA-001 — Accepted quest explicit

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I accept the rat cellar job.`
- Simulated AI Output: `You accept the rat cellar job.`
- Expected: Quest active.
- Checks: active quest includes rat cellar
- Failure Signals: quest missing
- Automation Notes: Positive control.

### QRA-002 — Offered quest only

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `Tell me about work.`
- Simulated AI Output: `The innkeeper offers a rat cellar job, but waits for your answer.`
- Expected: No active quest yet.
- Checks: no active rat quest; optional offer memory
- Failure Signals: quest active
- Automation Notes: Offer not accept.

### QRA-003 — Declined after accept-looking phrasing

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I nod then reconsider and decline.`
- Simulated AI Output: `You almost accept, but finally decline the job.`
- Expected: No active quest.
- Checks: no active quest
- Failure Signals: quest active
- Automation Notes: Final clause wins.

### QRA-004 — Private confession reputation

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I confess alone.`
- Simulated AI Output: `You confess to treason in an empty cave.`
- Expected: No public reputation.
- Checks: no public reputation
- Failure Signals: reputation change
- Automation Notes: Witness guard.

### QRA-005 — Witnessed crime

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I steal in front of guards.`
- Simulated AI Output: `The guards see you steal the purse and shout your name.`
- Expected: Negative public/local reputation.
- Checks: reputation subject local/guards negative
- Failure Signals: no reputation change
- Automation Notes: Positive control.

### QRA-006 — Rumor not about player

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I listen.`
- Simulated AI Output: `People hate the bandits for burning farms.`
- Expected: No player reputation change.
- Checks: player reputation unchanged
- Failure Signals: player blamed
- Automation Notes: Subject attribution.

### QRA-007 — Rumor about player confirmed

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I enter town.`
- Simulated AI Output: `People whisper that you saved the bridge.`
- Expected: Positive player/local reputation.
- Checks: local reputation positive
- Failure Signals: missing positive rep
- Automation Notes: Positive control.

### QRA-008 — Quest completed with proof

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I show the wolf pelt.`
- Simulated AI Output: `The captain accepts proof and marks the hunt complete.`
- Expected: Quest completed/archived.
- Checks: active removed; archived complete
- Failure Signals: still active or missing archive
- Automation Notes: Completion control.

### QRA-009 — Quest failure explicit

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I return empty-handed.`
- Simulated AI Output: `The client dismisses you; the deadline passed and the job fails.`
- Expected: Quest failed/archived.
- Checks: status failed
- Failure Signals: quest remains active
- Automation Notes: Failure control.

### QRA-010 — Sarcastic reputation

- Method: Quest/Reputation Ambiguity
- Section: quest-reputation
- Priority: P1
- Player Input: `I joke with villagers.`
- Simulated AI Output: `"Great, our hero," someone says sarcastically after you trip.`
- Expected: Do not over-award positive rep.
- Checks: no major positive reputation
- Failure Signals: positive rep gained
- Automation Notes: Sarcasm detection.

### DBT-001 — Actual death

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P0
- Player Input: `I stand still.`
- Simulated AI Output: `The spear pierces your heart. You die.`
- Expected: Dead condition and hp 0.
- Checks: dead active; hp=0
- Failure Signals: death not recorded
- Automation Notes: Positive control.

### DBT-002 — Rumored death

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I enter town.`
- Simulated AI Output: `People say you died, but you are standing right there alive.`
- Expected: No death.
- Checks: no dead; hp>0
- Failure Signals: dead applied
- Automation Notes: Rumor guard.

### DBT-003 — Actual unconscious

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I take the blow.`
- Simulated AI Output: `The club knocks you unconscious.`
- Expected: Unconscious condition.
- Checks: unconscious active
- Failure Signals: missing unconscious
- Automation Notes: Positive control.

### DBT-004 — Almost unconscious

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I stagger.`
- Simulated AI Output: `You nearly fall unconscious but stay awake.`
- Expected: No unconscious.
- Checks: no unconscious
- Failure Signals: unconscious applied
- Automation Notes: Near miss guard.

### DBT-005 — Permanent transformation

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I drink the cursed draught.`
- Simulated AI Output: `The curse transforms you into a wolf permanently.`
- Expected: Species/body mutation changes.
- Checks: species wolf or mutation permanent
- Failure Signals: no transformation
- Automation Notes: Positive control.

### DBT-006 — Temporary illusion transformation

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I step through mist.`
- Simulated AI Output: `For a moment you appear to become a wolf, but it is only an illusion.`
- Expected: No permanent species/body change.
- Checks: species unchanged; no permanent mutation
- Failure Signals: wolf species
- Automation Notes: Temporary guard.

### DBT-007 — Age actual

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I wait.`
- Simulated AI Output: `Twenty years pass in the tower.`
- Expected: Age/time skip if mortal.
- Checks: timeSkips includes 20; age +20 if known
- Failure Signals: no time skip
- Automation Notes: Positive control.

### DBT-008 — Age quote

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P0
- Player Input: `I read a prophecy.`
- Simulated AI Output: `"Twenty years pass" is written on the wall.`
- Expected: No actual age change.
- Checks: age unchanged
- Failure Signals: aged
- Automation Notes: Quote guard.

### DBT-009 — Limb loss actual

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I fail to dodge.`
- Simulated AI Output: `The blade severs your left hand.`
- Expected: Injury/limb status updates.
- Checks: left hand/arm injured or missing
- Failure Signals: no injury
- Automation Notes: Positive control.

### DBT-010 — Limb loss metaphor

- Method: Death/Body/Transformation Boundary
- Section: death-body-transform
- Priority: P1
- Player Input: `I perform poorly.`
- Simulated AI Output: `The critic says your performance was disarming.`
- Expected: No limb injury.
- Checks: limbs unchanged
- Failure Signals: injury applied
- Automation Notes: Metaphor guard.

