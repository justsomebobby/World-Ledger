# Current Plan Index

This index summarizes the uploaded roadmap backlog by build/priority/system.

## Build 9.4B
- **P0 / Cards / World Graph** — CardCandidateRegistry FSM + WorldGraphIndex  
  Owner: CardSystem + WorldGraphSystem  
  Output: candidate registry, graph edge index, card promotion gates
- **P0 / Cards / World Graph** — Generated-card scoring, tombstones, provenance  
  Owner: GeneratedCardPolicy  
  Output: importance score, evidence hashes, status states, quarantine/tombstone tables
- **P0 / Cards / World Graph** — Concept/law/faction/lore candidate categories  
  Owner: CardSystem + LoreConceptSystem  
  Output: safe concept cards for laws, institutions, named rituals, local customs
- **P0 / Context/Cards** — Card pressure and budget caps  
  Owner: ContextBudgeter + CardSync  
  Output: per-turn creates/updates, optional backlog, protected priority

## Build 9.4C
- **P0 / Combat Parser** — Level phrase vs group-count disambiguation  
  Owner: CombatThreatSystem  
  Output: level field on threat profile; group counts only when plural/group syntax
- **P0 / Resolvers** — Canonical suffix stripping and duplicate resolver  
  Owner: Resolver/Sanitizer layer  
  Output: north wall == north wall project; quest/project/contract suffix normalization
- **P1 / Threat Schema** — Threat profile stat-band placeholders  
  Owner: ThreatTierSystem  
  Output: threat level, tier, size, body, ecology, training, magic tags

## Build 9.5A
- **P0 / Knowledge / Presence** — Who-is-present and witness records  
  Owner: KnowledgeWitnessSystem  
  Output: present actors, sight/hearing constraints, witnessed events
- **P0 / Crime / Clues** — Crime event and evidence records  
  Owner: InvestigationCaseSystem  
  Output: case id, suspect, victim, item, evidence, proof level

## Build 9.5B
- **P0 / Reputation** — Subject reputation buckets  
  Owner: ReputationSystem  
  Output: public/private/faction/rumor/hidden reputation
- **P1 / Rumors** — Rumor propagation with distance/time/social channels  
  Owner: RumorPropagationSystem  
  Output: rumor scope, source, route, speed, confidence decay

## Build 9.5C
- **P1 / Factions / Law** — Faction law, authority, response escalation  
  Owner: FactionLawSystem  
  Output: local law records, enforcement thresholds, fines/warrants/arrest risk

## Build 9.6A
- **P0 / Contracts** — Contract lifecycle distinct from quests  
  Owner: ContractSystem  
  Output: parties, terms, obligations, payment, deadline, status
- **P0 / Labor** — Worker/employee records and assignment  
  Owner: LaborSystem  
  Output: employee id, role, skill, wage, availability, loyalty, task

## Build 9.6B
- **P0 / Domain** — DomainProjectSystem MVP  
  Owner: DomainProjectSystem  
  Output: project requirements, progress, workers, material ledger
- **P1 / Economy** — Services, shops, wages, debt, failed purchases  
  Owner: EconomyTransactionSystem  
  Output: price quotes, debts, service contracts, wage payments

## Build 9.6C
- **P1 / Domain Assets** — Holdings, rooms, control, taxes/upkeep  
  Owner: DomainAssetSystem  
  Output: building records, owner/control, upkeep/revenue evidence

## Build 9.7A
- **P0 / Race / Species** — RaceTrait candidates from setup + Story Cards  
  Owner: RaceTraitSystem  
  Output: trait candidates, confidence, source card refs

## Build 9.7B
- **P0 / Body Formula** — Race/body modifiers to HP/MP/EP, fatigue, injury  
  Owner: BodyFormulaSystem  
  Output: derived resource caps/pressure, recovery, constraints

## Build 9.7C
- **P1 / Social Treatment** — Race/body/social modifiers  
  Owner: SocialTreatmentSystem  
  Output: fear/prejudice/respect evidence, local attitudes

## Build 9.8A
- **P0 / Party / Followers** — Persistent companion/follower records  
  Owner: PartyFollowerSystem  
  Output: member status, loyalty, role, present/elsewhere/dead

## Build 9.8B
- **P0 / Summons** — Summon lifecycle and control limits  
  Owner: SummonSystem  
  Output: summon id, controller, duration, loyalty/control, capacity

## Build 9.8C
- **P1 / Pets / Mounts / Vehicles** — Controlled entity boundaries  
  Owner: ControlledEntitySystem  
  Output: pet/mount/vehicle records, custody, condition, travel capability

## Build 9.9A
- **P0 / Progression** — XP economy and level-up application  
  Owner: ProgressionFormulaSystem  
  Output: XP lanes, level XP, level-up thresholds, stat growth

## Build 9.9B
- **P0 / Stats** — Core stat formulas + derived values  
  Owner: StatFormulaSystem  
  Output: ATK/DEF/SPD/INT/LCK formulas and display

## Build 9.9C
- **P1 / Anti-farm** — Training and reward budgets  
  Owner: XPBudgetSystem  
  Output: repetition decay, risk/contribution multipliers, domain budget

## Build 9.9D
- **P1 / Ability Growth** — Ability/skill/passive/talent growth costs  
  Owner: AbilityGrowthSystem  
  Output: mastery, costs, fatigue/env pressure, category transfer

## Build 9.10A
- **P0 / Combat** — Combat outcome event model  
  Owner: CombatOutcomeSystem  
  Output: attack/defend/dodge/capture/downed/flee outcome records

## Build 9.10B
- **P0 / Matchup** — Matchup matrix and modifiers  
  Owner: MatchupSystem  
  Output: body/equipment/terrain/surprise/numbers/magic matchup weights

## Build 9.10C
- **P1 / Enemy Tiers** — Creature tier and stat-band library  
  Owner: ThreatTierSystem  
  Output: normal/elite/boss/ancient/magical tags, stat bands

## Build 9.10D
- **P1 / Combat Rewards** — Risk-based reward resolver  
  Owner: CombatRewardResolver  
  Output: danger/contribution/threat reward estimates

## Build 9.11A
- **P1 / Crafting** — Recipes, materials, quality, repair  
  Owner: CraftingSystem  
  Output: recipe knowledge, material ledger, project quality, repair completion

## Build 9.11B
- **P1 / Warfare** — Force records and control claims  
  Owner: WarfareSystem  
  Output: forces, casualties, control, morale, logistics evidence

## Build 9.11C
- **P2 / Absorption/Evolution** — Bounded candidate threshold system  
  Owner: EvolutionAbsorptionSystem  
  Output: candidate source, threshold evidence, denied/unstable/stable

## Build 9.12A
- **P0 / Lore / World Bible** — Lore authority/import layer  
  Owner: LoreAuthoritySystem  
  Output: revealed vs hidden lore, source card refs, regional triggers

## Build 9.12B
- **P1 / Context** — High/medium/small context priority pass  
  Owner: ContextBudgeter  
  Output: who present, location, danger, quests, reputation risk, active contracts

## Build 9.12C
- **P1 / Commands** — Command surface expansion and compact UI  
  Owner: CommandRenderer  
  Output: /reputation /contracts /domain /party /summons /crime /worldgraph

## Build 9.13A
- **P1 / Migration** — State migrations for new schemas  
  Owner: StateManager/Migration  
  Output: versioned migrations and old-save cleanup

## Build 9.13B
- **P1 / Compaction** — Long-run cleanup and quarantine  
  Owner: CleanupManager/Quarantine  
  Output: archive old rumors, stale cards, old graph edges, diagnostics

## Build 9.13C
- **P2 / Safe Mode** — Feature flags/degradation thresholds  
  Owner: SafeModeController  
  Output: timeout/card conflict fallbacks

## Build 10.0A
- **P0 / Release** — Full old/regression/live scenario matrix  
  Owner: AcceptanceSuite + ReleaseCheck  
  Output: expanded flat acceptance rows, no shrink, live replay set

## Build 10.0B
- **P0 / Packaging** — Install docs, tiny hooks, final identity-only promotion  
  Owner: Build packager  
  Output: Library file, Input/Context/Output tabs, migration notes
