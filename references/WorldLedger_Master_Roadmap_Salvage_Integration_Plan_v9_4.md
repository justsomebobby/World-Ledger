# WorldLedger Master Roadmap — Salvage Integration Plan v9.4

**Status:** planning artifact only. This is not source code and not a release claim.  
**Current implementation base:** `WorldLedger_CleanCore_Build9_3F_CommandAliasRestoration.txt`  
**Immediate purpose:** convert all useful old AIDRPG/WorldLedger/TAS/Inner Self/Auto-Cards/RPGUI ideas into an ordered, owner-routed implementation plan without falling back into wrappers, reconcile layers, or fake-green releases.

---

## 0. Executive answer

The current 9.3F line is the correct **clean-core base**, but it is not the full intended final AIDRPG/WorldLedger system. It is the foundation that survived the first live AI Dungeon reality check: command routing, card display, generated-card junk denial, body HP/EP correction, and cleanup of known pollution.

The full intended version still needs controlled feature waves for:

- safe Auto-Cards-style candidate promotion and world graph webbing;
- reputation, rumor, witness, clue, law, and crime systems;
- contracts, labor, employees, service agreements, domain/kingdom projects;
- race/species/body trait mechanics and social treatment;
- summons, followers, pets, mounts, party and controlled entities;
- meaningful progression, stat formulas, level 1-1000 scaling, XP budget and anti-farm;
- threat tiers, encounter logic, matchup resolution, enemy stat bands, combat rewards;
- crafting, economy, warfare, absorption, evolution, and long-run memory compaction.

The answer to "how do we put this together effectively" is:

> Build the missing systems as **small owner-owned feature waves**, each with schema, scanner events, proposals, validation, reducer commits, operation keys, card/context surfaces, commands, acceptance rows, and live AI Dungeon tests. Nothing gets to bypass the core pipeline.

---

## 1. Source base and salvage material

### 1.1 Current clean source

- `WorldLedger_CleanCore_Build9_3F_CommandAliasRestoration.txt`
- `WorldLedger_Build9_3F_Audit_Playtest_Gate_Data.json`
- `WorldLedger_Build9_3E_Audit_Playtest_Gate_Report.md`
- `WorldLedger_Build9_4A_DeepFeatureGap_Salvage_Audit.md`

### 1.2 Clean build authority

- `WorldLedger_Clean_Core_Build_Control.docx`

This remains the architecture authority. It defines one hook each, one runtime pipeline, one scanner, one proposal builder, one validator, one reducer registry, one context budgeter, one card renderer/sync, and one acceptance suite.

### 1.3 Roadmap and design sources mined

- `AIDRPG_MASTER_PACKAGE_v1_3_ROADMAP_GAP_ALIGNED_original_upload.zip`
- `AIDRPG_Final_Build_Planning_Package_v1_4_23_REPAIRED_FINAL_WITH_PRODUCTION_CHUNKS_01_TO_25.zip`
- Design Bible Chunks 1-33 / repaired package material
- Production Roadmap Chunks 01-25
- Final Build Control Map v1
- Gap Closure / Gap Chunks A-G
- Formula Appendix / Developer Spec / MVP Spec / Test Spec where available

### 1.4 Old implementation/source evidence

- `WorldLedgerV1.1.19.txt`
- `WorldLedgerV1.2.0.txt` as failure evidence only
- `WorldLedgerV1.1.13.txt`
- WorldLedger V0.3 through V0.18.28 lineage
- `aidrpgv1-5-0_FINAL_UNCOMPRESSED.txt`
- `aidrpgv1-8-2_NATURAL_CONFIRMATION_REPAIR.txt`
- `aidrpgv1-9-9_FULL_REGRESSION_QA.txt`
- `Oldaidrpgtestsandresults.zip`

### 1.5 Third-party inspiration / salvage lessons

- **TAS / True Auto Stats**: freeform stat/inventory/ability inference, emergent growth ambition, action parsing, but must be rebuilt through proposal/validation/reducer authority.
- **Inner Self**: long-term actor memory, selective activation, thought priority, agent identity, but must become selective major-actor memory and knowledge records, not universal simulation of every NPC.
- **Auto-Cards**: object permanence and Story Card drafting, but must be mediated through CardCandidateRegistry, scoring, provenance, tombstones, and owner-routed truth.
- **RPGUI**: clean RPG presentation and helper discipline, but translated into text cards/commands/context rather than HTML UI.

### 1.6 Extraction scan status

The current salvage extraction folder contains roughly **519 extracted files** and **512 text/markdown/json/csv files**. The roadmap below is based on those packages plus the current 9.3F source and the 9.4A gap audit.

---

## 2. Non-negotiable integration method

Every future feature must use this integration path:

```text
Old idea / old code / design chunk / live bug
→ salvage note
→ active authority map
→ schema addition
→ parser event or command surface
→ proposal type
→ validator rule
→ reducer owner commit
→ operation key
→ dirty queue target
→ context/card/command presentation
→ acceptance rows
→ live AI Dungeon probe
```

Forbidden:

```text
hook wrapper
pretty card wrapper
late reconcile layer
command output mutation
context mutation
raw Story Card mechanics
fake PASS normalization
acceptance shrink
manual “we’ll just see” feature activation
```

---

## 3. System dependency graph

The biggest risk is implementing systems in the wrong order. Reputation, contracts, domain, summons, and combat all need card/world graph identity first. Progression and combat need race/body/threat schemas. Domain needs contracts/labor/economy. Rumors need who-is-present and knowledge boundaries.

Recommended dependency chain:

```text
9.3F Clean Foundation
→ 9.4B CardCandidateRegistry + WorldGraphIndex
→ 9.4C Resolver + Threat Parser Foundations
→ 9.5 Knowledge / Reputation / Witness / Rumor / Crime
→ 9.6 Contracts / Labor / Economy / Domain
→ 9.7 Race / Species / Body Trait Mechanics
→ 9.8 Party / Followers / Summons / Controlled Entities
→ 9.9 Progression / Stats / XP / Level 1-1000
→ 9.10 Combat Matchup / Enemy Tiers / Encounter Outcomes
→ 9.11 Crafting / Warfare / Absorption / Evolution
→ 9.12 Lore Authority / Context / Commands / Card Polish
→ 9.13 Migration / Compaction / Safe Mode
→ 10.0 Release Candidate Gate
```

---

## 4. Build wave roadmap

## Build 9.4B — CardCandidateRegistry + WorldGraphIndex

**Why this comes first:** All the advanced systems produce entities and relationships. Without a safe candidate/graph layer, generated cards will either be too timid to be useful or too eager and create junk.

### Goals

- Make generated cards meaningful, rare, and state-backed.
- Support important abstract/lore concepts without allowing random abstract junk.
- Create a graph layer for actor-place-faction-quest-contract-domain-rumor connections.
- Replace ad hoc generated-card decisions with a lifecycle.

### Salvage sources

- WorldLedger V1.1 core card system roadmap.
- Auto-Cards concept of durable memory/cards.
- 9.3 live failure: `Are Empty` generated card.
- Production Chunk 16 context/card safety.
- Production Chunk 15 world bible/lore authority.

### Active authority targets

- `WL.Schema.root.cards`
- `WL.CardRegistry`
- `WL.GeneratedCardPolicy`
- `WL.CardRenderer`
- `WL.CardSync`
- new `WL.CardCandidateRegistry`
- new `WL.WorldGraphIndex`
- `WL.ContextBudgeter`
- `WL.AcceptanceSuite`

### Schema additions

```js
root.cards.candidatesById = {}
root.cards.candidateIds = []
root.cards.tombstonesById = {}
root.cards.quarantine = []
root.worldGraph = {
  nodesById: {}, nodeIds: [],
  edgesById: {}, edgeIds: [],
  reverseIndex: {},
  dirtyNodeIds: []
}
```

Candidate shape:

```js
{
  id,
  kind: 'actor|place|item|ability|quest|contract|domain|faction|law|concept|case|summon',
  title,
  stateRef,
  evidenceCount,
  evidenceTurns,
  sourceHashes,
  importanceScore,
  confidence,
  relations: [],
  status: 'observed|candidate|eligible|generated|archived|banned|quarantined'
}
```

### Rules

Generated cards may be created only from eligible candidates, not raw text. Candidate generation may observe raw output, but card creation must require a stable state reference or a concept/lore owner confirmation.

### Required tests

- `Your pockets are empty.` → no item, no card.
- `A random door creaks.` → no generated card.
- `The Law of Guest-Rights is invoked by the innkeeper.` → law/concept candidate, not item/actor.
- `The Copper Lantern is mentioned three times and receives a quest.` → place card eligible.
- `Old Man Gerrik gives a quest.` → actor candidate eligible.
- `WorldLedger audit text says PASS.` → no card candidate.

### Done when

- no generated-card junk from command/context/card/audit text;
- card creation decisions are inspectable;
- cards have provenance and graph edges;
- protected cards still outrank generated cards under write budget.

---

## Build 9.4C — Resolver + Threat Parser Foundations

### Goals

- Fix `level 25 inferno wolf` being parsed as 25 wolves.
- Add resolver normalization for project/contract/place suffixes.
- Add threat schema fields needed later by combat/progression.

### Salvage sources

- 9.4A probe failure.
- Production Chunks 12, 14, 17, 24.
- Old combat/threat boundary code from WorldLedger V0.18+ and AIDRPG v1.8.2.

### Active authority targets

- `WL.EventScanner.detectCombatThreatCandidates`
- `WL.EventScanner.cleanCreatureLabel`
- `WL.CombatThreatSystem`
- `WL.AdvancedBoundarySystem` project/domain ID resolver
- `WL.CanonValidator`
- `WL.AcceptanceSuite`

### Key parser law

```text
number + plural creature + attacks = group count
level + number + creature = single threat profile with level
rank/tier + creature = single threat profile unless plural/group syntax exists
```

### Required tests

- `A level 25 inferno wolf appears.` → one threat profile, level 25.
- `Twenty-five inferno wolves appear.` → group count 25.
- `13 goblins attack. 9 die.` → four remain.
- `The north wall project advances.` and `construction on the north wall` → same project id.

---

## Build 9.5 — Knowledge, Reputation, Witnesses, Rumors, Crime, and Clues

This is the largest missing “Inner Self plus world consequence” layer.

### Goals

- Model who saw what.
- Distinguish hidden deed, private knowledge, rumor, public fact, faction knowledge, proof.
- Allow crime consequences without omniscient NPCs.
- Let reputation persist and spread realistically.

### Salvage sources

- Design Bible Chunks 12, 13, 30, 31.
- Production Chunk 20.
- AIDRPG v1.8.2 `ReputationSystem` / `InvestigationSystem` data ideas.
- Inner Self actor memory: typed memory, priority, activation confidence, cooldowns.

### New owners

```js
WL.KnowledgeWitnessSystem
WL.ReputationSystem
WL.RumorPropagationSystem
WL.InvestigationCaseSystem
WL.FactionLawSystem
```

### Schema additions

```js
root.knowledge = {
  eventsById: {},
  witnessRecordsById: {},
  knowledgeByActorId: {},
  knowledgeByFactionId: {},
  hiddenEvents: [],
  publicFacts: [],
  privateFacts: []
}
root.reputation = {
  bySubjectId: {},
  byFactionId: {},
  localScores: {},
  recentChanges: [],
  rumors: [],
  titles: []
}
root.investigation = {
  casesById: {},
  caseIds: [],
  evidenceById: {},
  clueIds: []
}
```

### Reputation visibility buckets

```text
hidden: happened, but no known witness/proof
private: one actor or small group knows
rumor: unproven claim circulating with confidence/source
public: widely known in a place/faction
faction: institution-specific knowledge
proven: evidence tied strongly enough for consequences
```

### Required tests

- `Mira sees you steal the idol.` → private witness knowledge.
- `No one sees you steal the idol.` → hidden deed, no public reputation.
- `Rumors spread that an orc stole the idol.` → rumor, not proof.
- `The guard finds the stolen idol in your pack.` → evidence raises proof.
- `The city watch posts a warrant.` → faction/public legal consequence.
- A remote village does not instantly know unless route/social channel exists.

---

## Build 9.6 — Contracts, Labor, Employees, Economy, and Domain/Kingdom MVP

### Goals

- Make kingdom/domain gameplay real enough for persistent campaigns.
- Separate contracts from quests.
- Track hired workers, wages, obligations, materials, project progress, refusal/breach/delay.

### Salvage sources

- Design Bible Chunk 11.
- Design Bible Chunk 28 / Production Chunk 18 and 23.
- Old AIDRPG `TransactionLedgerSystem`, `DomainManagementSystem`, `QuestLogSystem` concepts.
- Build Control advanced boundary doctrine.

### New owners

```js
WL.ContractSystem
WL.LaborSystem
WL.EconomyTransactionSystem
WL.DomainProjectSystem
WL.DomainAssetSystem
```

### Contract schema

```js
{
  id,
  type: 'service|labor|delivery|construction|crafting|guard|mercenary|rental|loan',
  parties: { employer, worker, client, guarantor },
  obligations: [],
  payment: { amount, currency, schedule, paidAmount },
  deadline,
  status: 'offered|negotiating|active|fulfilled|breached|cancelled|disputed',
  evidence: [],
  relatedQuestId,
  relatedProjectId
}
```

### Domain project schema

```js
{
  id,
  name,
  domainId,
  kind: 'building|repair|wall|road|farm|mine|shop|fortification|settlement_project',
  status: 'planned|active|paused|blocked|completed|damaged',
  requirements: { materials: [], laborDays: 0, tools: [], permissions: [] },
  assignedWorkerIds: [],
  progressPercent,
  materialLedger: [],
  timeLedger: [],
  ownerId,
  locationId
}
```

### Required tests

- `You hire Bran for 2 silver per day to repair the north wall.` → contract + worker + project, no completed work yet.
- `Bran refuses unpaid work.` → refusal/dispute, no progress.
- `Workers make 25% progress after three days and consume stone.` → progress + material/time ledger.
- `The contract is breached.` → contract status changes.
- `The north wall` and `north wall project` resolve to one project.

---

## Build 9.7 — Race, Species, Body, Origin, and Social Treatment Mechanics

### Goals

- Make race and body physically meaningful without inventing unearned powers.
- Convert world/race Story Cards into conservative trait candidates.
- Apply traits to resources, fatigue, injury, senses, equipment constraints, social treatment, and magic/body logic.

### Salvage sources

- Design Bible Chunk 20.
- Formula chunks 21/25.
- RaceRegistry pieces in WorldLedger 1.1.x.
- Live orc body/fatigue scenario.

### New owners

```js
WL.RaceTraitSystem
WL.BodyFormulaSystem
WL.SpeciesConstraintSystem
WL.SocialTreatmentSystem
```

### Trait schema

```js
{
  id,
  owner: 'player|actor|species',
  kind: 'strength|sense|weakness|need|movement|size|magic_affinity|social_marker|environmental_constraint',
  source: 'setup|story_card|output_confirmed|manual_note_candidate',
  confidence,
  mechanicalScope,
  evidence: []
}
```

### Required tests

- `Zack is an orc.` → identity + trait candidates, not free huge stats.
- `Your orc build helps shove the cart.` → strength/body evidence.
- `Your tusks frighten the clerk.` → social treatment evidence.
- `Your gills let you breathe underwater.` → only if race/body supports or output confirms transformation.

---

## Build 9.8 — Party, Followers, Summons, Pets, Mounts, and Vehicles

### Goals

- Support companions and summons without card spam or uncontrolled NPC simulation.
- Separate temporary summons from persistent companions.
- Track controller, loyalty, presence, duration, capacity, condition, dismissal/death.

### Salvage sources

- Design Bible Chunk 8.
- Production Chunks 21, 22, 24.
- AIDRPG v1.5.5 party/companion stability.
- Inner Self major actor memory, but with strict eligibility.

### New owners

```js
WL.PartyFollowerSystem
WL.SummonSystem
WL.ControlledEntitySystem
WL.CompanionMemorySystem
```

### Entity schema

```js
{
  id,
  kind: 'companion|follower|summon|pet|mount|vehicle|minion',
  name,
  controllerId,
  loyalty,
  controlState,
  duration,
  presentState: 'present|elsewhere|dismissed|dead|unknown',
  combatRole,
  cardEligibility,
  evidence: []
}
```

### Required tests

- `You summon a fire wolf for one minute.` → temporary summon, duration, no permanent card.
- `Ashfang, your named summoned wolf, returns again.` → persistent summon candidate.
- `Mira joins your party.` → companion record, possible card if recurring/important.
- `Five skeletons are summoned for one battle.` → group summary, not five cards.

---

## Build 9.9 — Progression, Stats, XP, Level 1-1000, and Ability Growth

### Goals

- Make leveling meaningful and visible.
- Give stats clear mechanical meaning.
- Support domain XP, training XP, anti-farm, risk-based rewards, and ability/passive growth.

### Salvage sources

- Design Bible Chunks 4, 5, 6, 19, 21, 22, 25.
- Formula Appendix.
- TAS freeform stat-growth ambition.
- AIDRPG v1.6.2 ability growth/combat rewards.

### New owners

```js
WL.ProgressionFormulaSystem
WL.StatFormulaSystem
WL.XPBudgetSystem
WL.AbilityGrowthSystem
WL.LevelUpSystem
```

### Formula approach

Do not start by trying to perfectly balance the entire RPG. Start with stable, inspectable formulas:

```text
Level XP: total development / broad challenge proof
Stat XP: activity-specific training and strain
Domain XP: repeated domain-specific practice and consequences
Ability XP: successful use, failed attempts, training, cost pressure
Reward XP: threat, risk, contribution, novelty, difficulty, consequences
Anti-farm: repeated low-risk actions decay quickly
```

### Required tests

- `You gain 20 XP.` → level XP increases once.
- `You train sword drills for two hours.` → sword/domain/stat XP + EP fatigue.
- `You jump in place for hours.` → EP/fatigue, little/no repeat XP.
- `A level 25 inferno wolf is defeated.` → high but bounded XP.
- `A normal rat is killed.` → low reward.

---

## Build 9.10 — Combat Matchup, Enemy Tiers, Encounter Outcomes, and Reward Resolver

### Goals

- Stop relying only on text interpretation for combat consequences.
- Track threat profiles, stat bands, body/environment/equipment matchup, outcome pressure, damage, capture/flee/downed states, and rewards.
- Preserve no-rubber-band doctrine: the world does not scale down to the player.

### Salvage sources

- Design Bible Chunks 7, 8, 23, 24.
- Production Chunks 12, 14, 17, 24.
- AIDRPG `ScaleMultiplayerSystem`, `ActorThreatProfileSystem`, combat reward code.

### New owners

```js
WL.ThreatTierSystem
WL.MatchupSystem
WL.CombatOutcomeSystem
WL.DamageHealingResolver
WL.CombatRewardResolver
```

### Required tests

- `A dragon far beyond your level attacks.` → overwhelming threat warning, no downgrade.
- `You fight in cramped hallway with a spear.` → environment/equipment modifiers.
- `Thirteen goblins attack. Nine die.` → group count remains four.
- `You are captured instead of killed.` → downed/captured state.
- `Healing closes the wound but leaves fatigue.` → health/status distinction.

---

## Build 9.11 — Crafting, Warfare, Absorption, Evolution, and Advanced Boundaries

### Goals

- Expand current boundary/evidence systems into useful MVPs without fake full simulation.
- Keep absorption/evolution candidates bounded until thresholds are explicit and validated.

### Salvage sources

- Production Chunks 19 and 24.
- Design Bible Chunks 10, 24, 28.
- Old advanced boundary systems in WorldLedger V0.18+ and AIDRPG v1.8.2.

### Owners

```js
WL.CraftingSystem
WL.RepairEnchantingSystem
WL.WarfareSystem
WL.EvolutionAbsorptionSystem
```

### Required tests

- `You learn the recipe for iron nails.` → recipe known, no item.
- `You craft after consuming materials and time.` → material ledger + crafted item if complete.
- `Army of 80 marches; 15 die.` → force count and casualties.
- `You absorb wolf essence.` → candidate only, no free race overwrite.

---

## Build 9.12 — Lore Authority, World Bible Import, Context, Cards, and Command Surfaces

### Goals

- Use world lore/Story Cards as authority references without exposing hidden lore or granting mechanics.
- Add commands for new systems.
- Improve context priority around presence, reputation risk, contracts, active summons, and domain projects.

### Salvage sources

- Production Chunks 15, 16, 17.
- Final World Bible and Story Cards JSON.
- Inner Self context priority and thought activation discipline.
- Auto-Cards context/card trigger hygiene.

### Owners

```js
WL.LoreAuthoritySystem
WL.WorldBibleReferenceSystem
WL.ContextBudgeter
WL.CardRenderer
WL.CommandRenderer
```

### Commands to add

```text
/reputation
/rumors
/crime
/contracts
/domain
/labor
/party
/summons
/race
/stats
/progression
/threats
/worldgraph
/cards
```

### Required tests

- commands are compact and read-only;
- context never mutates state;
- hidden lore remains hidden unless triggered/revealed;
- small context prioritizes danger/resources/presence/legal risk over lore dumps.

---

## Build 9.13 — Migration, Quarantine, Compaction, Safe Mode, and Long-Run Stability

### Goals

- Keep long campaigns from degrading.
- Make schema evolution explicit.
- Add graceful degradation for card conflicts/timeouts.

### Salvage sources

- TAS/Inner Self/Auto-Cards improvement plan.
- AI Dungeon live timeout behavior.
- Build 9.2/9.3 live pollution cleanup experience.

### Owners

```js
WL.Migration
WL.Quarantine
WL.CleanupManager
WL.SafeModeController
WL.DiagnosticsSystem
```

### Required behavior

- versioned migrations;
- old-save cleanup and quarantine;
- card API failure retry safety;
- optional generated-card safe mode;
- low-frequency compaction;
- rough cost budgeting by subsystem;
- long replay budget tests.

---

## Build 10.0 — Release Candidate Gate

### Goals

- No new gameplay behavior.
- Final identity-only promotion only after the expanded feature suite passes.
- Live AI Dungeon playtest candidate with all advanced MVPs installed.

### Required gates

```text
/sourceaudit
/schemaaudit
/runtimecheck
/contextcheck
/cardcheck
/fullacceptancecheck
/releasecheck
```

External gates:

- old failure smoke suite;
- card generation/junk suite;
- crime/reputation suite;
- contracts/labor/domain suite;
- race/body suite;
- summons/party suite;
- progression/combat suite;
- long replay with card sync enabled;
- live mobile command length check;
- no immediate AI Dungeon timeout.

---

## 5. Salvage-to-code workflow

Every build chunk should start with this file header:

```text
Current phase:
Base source:
Salvage sources:
Active authorities touched:
Forbidden patterns:
Expected tests before editing:
No final/release language because behavior is being added:
```

Then use this sequence:

### 5.1 Salvage intake

For each old file/idea:

```text
1. Identify the old problem it solved.
2. Identify the old bug it caused or could cause.
3. Extract only schema/rule/test/heuristic.
4. Map it to one owner system.
5. Write acceptance row before implementation.
6. Implement through scanner/proposal/validator/reducer or card/context/command owner.
7. Reject the old wrapper/direct mutation method.
```

### 5.2 Feature one-page template

```md
## Feature: <name>

Goal:
Old source evidence:
Current gap:
Owner:
State schema:
Events:
Proposal types:
Validator rules:
Reducer commits:
Operation keys:
Dirty targets:
Card/context/command surfaces:
Failure-denial rules:
Tests:
Live AI Dungeon probe:
Done criteria:
```

### 5.3 No-go checklist

A feature is blocked if:

- it creates state directly in the parser;
- it reads command/context/card text as canon;
- it generates cards from raw abstract nouns;
- it does not have idempotency keys;
- it has no compact command output;
- it has no targeted tests;
- it changes release status while adding behavior;
- it edits stale duplicate functions instead of active authority.

---

## 6. System-by-system implementation notes

### 6.1 Card generation and world webbing

The generated-card system should become the **world memory promotion system**, not a title scraper.

Rules:

- Raw text may create observations.
- Observations may become state records through validators/reducers.
- State records may become card candidates.
- Only eligible candidates become cards.
- Tombstoned junk stays dead.
- Manual notes are preserved but never become mechanics.

Important categories:

```text
actor, place, item, ability, quest, contract, domain, faction, law, custom, religion, case, rumor, summon, vehicle, project, organization
```

### 6.2 Reputation and rumor network

Reputation should be local and evidence-based, not omniscient.

Core concepts:

```text
who saw it
who heard it
who believes it
who can prove it
who has authority to act on it
where the information has traveled
how confident the rumor is
whether the player is identified or only described
```

### 6.3 Domain and kingdom mechanics

Start with contracts/labor/projects before kingdom-scale simulation.

Minimum viable kingdom play:

```text
owned/controlled place
projects
workers
materials
wages
time progress
delays/refusals
asset completion
upkeep/revenue evidence
faction/legal control
```

Do not simulate full economy invisibly. Record evidence and require confirmation.

### 6.4 Race/species/body mechanics

Race mechanics should be conservative and source-backed. Race Story Cards can define likely traits, but strong mechanical effects need repeated or explicit confirmation.

Examples:

```text
Orc: strong build evidence, social fear/prejudice/respect, high EP/HP candidate, possible magic/culture constraints only if lore supports.
Elf: perception/magic sensitivity, long-lived social implications, possible physical fragility only if lore supports.
Undead: no normal fatigue or death rules only if true form/body confirms.
```

### 6.5 Summons and party

Temporary summons should be lightweight. Named recurring companions/summons may get cards. Groups should be summarized, not card-spammed.

### 6.6 Progression and combat

Progression must not be a generic XP counter. It should reflect:

```text
risk
training type
domain practice
ability success/failure
resource strain
injury
enemy threat
contribution
novelty
anti-farm decay
```

Combat must be matchup-based:

```text
stats + body + weapon + armor + ability + terrain + numbers + surprise + condition + enemy tier + morale + objective
```

---

## 7. Feature backlog table

The full machine-readable backlog is saved separately as:

- `WorldLedger_Roadmap_Backlog_v9_4.csv`
- `WorldLedger_Roadmap_Backlog_v9_4.json`

Summary table:

| Build | Priority | System | Feature | Owner |
|---|---:|---|---|---|
| 9.4B | P0 | Cards / World Graph | CardCandidateRegistry FSM + WorldGraphIndex | CardSystem + WorldGraphSystem |
| 9.4B | P0 | Cards / World Graph | Generated-card scoring, tombstones, provenance | GeneratedCardPolicy |
| 9.4B | P0 | Cards / World Graph | Concept/law/faction/lore candidate categories | CardSystem + LoreConceptSystem |
| 9.4B | P0 | Context/Cards | Card pressure and budget caps | ContextBudgeter + CardSync |
| 9.4C | P0 | Combat Parser | Level phrase vs group-count disambiguation | CombatThreatSystem |
| 9.4C | P0 | Resolvers | Canonical suffix stripping and duplicate resolver | Resolver/Sanitizer layer |
| 9.4C | P1 | Threat Schema | Threat profile stat-band placeholders | ThreatTierSystem |
| 9.5A | P0 | Knowledge / Presence | Who-is-present and witness records | KnowledgeWitnessSystem |
| 9.5A | P0 | Crime / Clues | Crime event and evidence records | InvestigationCaseSystem |
| 9.5B | P0 | Reputation | Subject reputation buckets | ReputationSystem |
| 9.5B | P1 | Rumors | Rumor propagation with distance/time/social channels | RumorPropagationSystem |
| 9.5C | P1 | Factions / Law | Faction law, authority, response escalation | FactionLawSystem |
| 9.6A | P0 | Contracts | Contract lifecycle distinct from quests | ContractSystem |
| 9.6A | P0 | Labor | Worker/employee records and assignment | LaborSystem |
| 9.6B | P0 | Domain | DomainProjectSystem MVP | DomainProjectSystem |
| 9.6B | P1 | Economy | Services, shops, wages, debt, failed purchases | EconomyTransactionSystem |
| 9.6C | P1 | Domain Assets | Holdings, rooms, control, taxes/upkeep | DomainAssetSystem |
| 9.7A | P0 | Race / Species | RaceTrait candidates from setup + Story Cards | RaceTraitSystem |
| 9.7B | P0 | Body Formula | Race/body modifiers to HP/MP/EP, fatigue, injury | BodyFormulaSystem |
| 9.7C | P1 | Social Treatment | Race/body/social modifiers | SocialTreatmentSystem |
| 9.8A | P0 | Party / Followers | Persistent companion/follower records | PartyFollowerSystem |
| 9.8B | P0 | Summons | Summon lifecycle and control limits | SummonSystem |
| 9.8C | P1 | Pets / Mounts / Vehicles | Controlled entity boundaries | ControlledEntitySystem |
| 9.9A | P0 | Progression | XP economy and level-up application | ProgressionFormulaSystem |
| 9.9B | P0 | Stats | Core stat formulas + derived values | StatFormulaSystem |
| 9.9C | P1 | Anti-farm | Training and reward budgets | XPBudgetSystem |
| 9.9D | P1 | Ability Growth | Ability/skill/passive/talent growth costs | AbilityGrowthSystem |
| 9.10A | P0 | Combat | Combat outcome event model | CombatOutcomeSystem |
| 9.10B | P0 | Matchup | Matchup matrix and modifiers | MatchupSystem |
| 9.10C | P1 | Enemy Tiers | Creature tier and stat-band library | ThreatTierSystem |
| 9.10D | P1 | Combat Rewards | Risk-based reward resolver | CombatRewardResolver |
| 9.11A | P1 | Crafting | Recipes, materials, quality, repair | CraftingSystem |
| 9.11B | P1 | Warfare | Force records and control claims | WarfareSystem |
| 9.11C | P2 | Absorption/Evolution | Bounded candidate threshold system | EvolutionAbsorptionSystem |
| 9.12A | P0 | Lore / World Bible | Lore authority/import layer | LoreAuthoritySystem |
| 9.12B | P1 | Context | High/medium/small context priority pass | ContextBudgeter |
| 9.12C | P1 | Commands | Command surface expansion and compact UI | CommandRenderer |
| 9.13A | P1 | Migration | State migrations for new schemas | StateManager/Migration |
| 9.13B | P1 | Compaction | Long-run cleanup and quarantine | CleanupManager/Quarantine |
| 9.13C | P2 | Safe Mode | Feature flags/degradation thresholds | SafeModeController |
| 10.0A | P0 | Release | Full old/regression/live scenario matrix | AcceptanceSuite + ReleaseCheck |
| 10.0B | P0 | Packaging | Install docs, tiny hooks, final identity-only promotion | Build packager |


---

## 8. Minimal next action

The next code build should be:

```text
Build 9.4B — CardCandidateRegistry + WorldGraphIndex
```

Do not jump directly to kingdom mechanics, summons, or full combat. Those systems need stable entity identity, graph relations, and card promotion before they can safely persist or mirror anything.

### 9.4B implementation chunks

1. Schema + migration only.
2. Candidate creation from confirmed state records.
3. WorldGraph node/edge insertion from existing actors/places/items/quests.
4. Scoring/tombstone/quarantine policy.
5. Generated-card renderer uses candidate eligibility, not raw record loops.
6. Context shows only relevant graph/candidate summaries.
7. Commands: `/worldgraph`, `/cardcandidates`, `/cards` compact output.
8. Acceptance rows and live probes.

---

## 9. Roadmap doctrine

The project is now past "make it load." The target is a persistent AI Dungeon RPG truth engine. The only safe way to finish it is to continue the clean-core method:

```text
one feature wave
one owner map
one schema change set
one parser/proposal/validator/reducer path
one acceptance expansion
one live probe
no wrappers
no fake pass
```

This roadmap should become the planning authority after the 9.4A audit. It does not replace the Build Control document. It translates the old plans into the next practical implementation order.
