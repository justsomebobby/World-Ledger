# WorldLedger Final Master Roadmap v9.4 — Revised Salvage + Playability Plan

**Status:** planning/control artifact only. This is not source code and not a release claim.  
**Current implementation base:** `WorldLedger_CleanCore_Build9_3F_CommandAliasRestoration.txt`  
**Planning predecessor:** `WorldLedger_Build9_4A_DeepFeatureGap_Salvage_Audit.md`  
**This document replaces/supersedes:** `WorldLedger_Master_Roadmap_Salvage_Integration_Plan_v9_4.md` as the final feature roadmap.  
**Immediate next code target:** `Build 9.4B — Identity Foundation: ItemIdentity + CardCandidateRegistry + WorldGraphIndex`.

---

## 0. Clarification on version naming

There was no hidden code build called **Build 9.4**.

The naming is:

- **9.3F** — current live-playtest source baseline after command alias restoration.
- **9.4A** — no-code deep feature gap + salvage audit.
- **v9.4 roadmap** — planning artifact family, not source.
- **this file** — final revised roadmap/control plan.
- **9.4B** — next actual code build.

So when the plan starts at **9.4B**, it is not skipping code. It is following the convention that **9.4A was the audit/planning phase** and **9.4B is the first implementation chunk after that audit**.

---

## 1. Executive verdict

The current 9.3F build is a clean-core foundation, not the full intended final system. It proves the basic engine shape: commands, context, protected cards, safer generated cards, inventory/quest basics, body HP/EP correction, and live-state cleanup.

It does **not** yet fully implement the advanced AIDRPG/WorldLedger goal.

This final roadmap explicitly adds or hardens the previously under-specified areas:

1. **Clean item identity and inventory naming** — no `Are Empty`, no `Up The Rusty Dagger`, no abstract-junk items.
2. **Effective but not overwhelming stacking** — stack only what should stack; preserve unique weapons/armor/tools/descriptors/conditions.
3. **Ability cost development matrix** — rough story-driven cost at first, then hardens through observed use, resource strain, scale, mastery, fatigue, environment, and body truth.
4. **Ability development matrix** — candidate → unstable → practiced → stable → mastered, with skills/talents/passives/abilities separated.
5. **Card generation as a lifecycle** — cards only from eligible candidates with provenance, importance, confidence, and graph relations.
6. **World webbing** — actors, places, factions, laws, concepts, items, contracts, rumors, crimes, domains, summons, and quests link through a graph.
7. **Kingdom/domain systems** — contracts, employees, labor, projects, ownership, wages, assignments, supplies, progress, breaches, and outcomes.
8. **Reputation/rumor/witness/crime/clue systems** — who saw what, who knows what, how information travels, and how reputation persists locally and regionally.
9. **Race/species/body mechanics** — benefits, weaknesses, senses, needs, instincts, vulnerabilities, and social treatment.
10. **Summons/followers/party** — controlled entities with presence, loyalty, obedience, cost, injury, death, duration, and upkeep.
11. **Meaningful stats and leveling** — role-based stat formulas, level 1–1000 scale, domain XP, anti-farm, build identity, and no rubber-band enemy scaling.
12. **Combat/matchup/enemy tier logic** — enemies scale from world truth, not player level; outcomes compare body, role, equipment, resources, numbers, terrain, surprise, training, and matchup.
13. **AI Dungeon playability** — bounded hooks, no whole-world scans, no huge context dumps, no command output as canon, no card prose mechanics, compact surfaces, and live probe tests.

---

## 2. Non-negotiable implementation law

Every system must follow this route:

```text
source prose / old feature / live bug / user command
→ source classification
→ EventScanner observation
→ ProposalBuilder structured claim
→ CanonValidator accept/reject/pend/deny
→ owner reducer commits truth
→ OperationLedger idempotency key
→ DirtyQueue targets
→ ContextBudgeter reads truth
→ CardRenderer/CardSync mirrors truth
→ CommandRenderer displays truth
→ AcceptanceSuite proves behavior
```

No feature gets to bypass this through:

```text
hook wrappers
late repair layers
pretty-card wrappers
state reconciler patches
command mutation
context mutation
raw Story Card mechanics
fake PASS normalization
acceptance shrink
whole-world scanning every turn
```

---

## 3. Final dependency order

The order is designed for actual AI Dungeon playability. The next layers cannot be safely implemented until identity is stable.

```text
9.3F current base
→ 9.4B Identity Foundation: ItemIdentity + CardCandidateRegistry + WorldGraphIndex
→ 9.4C Ability Cost + Development Matrix
→ 9.4D Context/Card/Command surfaces for identity + ability cost
→ 9.5 Presence, knowledge, reputation, witness, rumor, crime, clue
→ 9.6 Contracts, labor, employees, economy, domain/kingdom MVP
→ 9.7 Race, species, body traits, weaknesses, social treatment
→ 9.8 Summons, followers, pets, mounts, party/controlled entities
→ 9.9 Progression, stats, XP economy, level 1–1000
→ 9.10 Combat matchup, enemy tiers, encounter outcomes, rewards
→ 9.11 Crafting, warfare, absorption, evolution
→ 9.12 Lore/concept authority, world bible integration, card/context polish
→ 9.13 Migration, compaction, tombstones, safe mode, live-state repair
→ 10.0 Release candidate gate
```

---

# Build 9.4B — Identity Foundation: ItemIdentity + CardCandidateRegistry + WorldGraphIndex

## Purpose

This build is the foundation for all future systems. It prevents junk items/cards and gives the engine a clean identity layer for inventory, generated cards, laws/concepts, actors, places, factions, quests, contracts, rumors, crimes, domain assets, and summons.

The original draft had CardCandidateRegistry and WorldGraphIndex, but item identity and stacking were not explicit enough. This revised roadmap makes them **P0 requirements**.

## 9.4B-1 ItemIdentitySystem

### Goals

- Clean item names before they enter inventory.
- Preserve meaningful descriptors.
- Prevent abstract/empty/junk items.
- Decide stackable vs unique identity without bloating inventory.
- Make inventory pleasant to read and mechanically useful.

### Active authority targets

- `WL.EventScanner.detectInventoryCandidates`
- `WL.EventScanner.cleanCandidateTarget`
- `WL.ProposalBuilder.fromEvents`
- `WL.CanonValidator.validateAll`
- `WL.InventoryEquipmentSystem.apply`
- new `WL.ItemIdentitySystem`
- `WL.CommandRenderer.inventory`
- `WL.CardRenderer.renderProtected('inventory_equipment')`
- `WL.AcceptanceSuite.rowsFor`

### Schema additions

```js
root.inventory.itemsById[itemId] = {
  id,
  displayName,        // Rusty Dagger
  baseName,           // Dagger
  descriptors,        // [Rusty]
  material,           // Iron, Bronze, Silver, etc. when known
  quality,            // crude, standard, fine, masterwork, etc.
  condition,          // intact, damaged, broken, rusted, cracked, etc.
  rarity,
  stackable,
  quantity,
  uniqueInstance,
  equipmentSlot,
  custody,
  owner,
  provenance,
  sourceHashes,
  firstSeenTurn,
  lastTouchedTurn,
  tags
}
```

### Naming rules

Bad names must never commit:

```text
Are Empty
Up The Rusty Dagger
Hold
Merchant Says the Crystal Saber
Through the Street Noise Wound
Quest to Clear Wolves
```

Good names:

```text
Rusty Dagger
Iron Lantern
Silver Coin
Crystal Saber
Old Bren's Map
Fine Leather Boots
Broken Bronze Shield
```

### Item name pipeline

```text
raw acquisition phrase
→ target extraction
→ negative/failed/dream/quote/source denial
→ item-name sanitizer
→ semantic item classifier
→ stack policy
→ inventory reducer commit
```

### Stack policy

The inventory should be compact without destroying item identity.

#### Stackable by default

- Currency.
- Identical mundane ammunition.
- Identical rations/food portions.
- Identical herbs/reagents/material units.
- Identical simple consumables when condition/quality/source are the same.
- Identical trade goods when no unique state exists.

#### Non-stackable by default

- Weapons.
- Armor.
- Tools.
- Magical items.
- Named items.
- Quest items.
- Items with condition/durability differences.
- Items with owner/custody/legal status.
- Equipped items.
- Items with inscriptions, enchantments, history, or provenance.

#### Merge key

Stack only when these match:

```text
baseName + descriptors + material + quality + condition + legal/custody state + magic tags + owner/provenance class
```

Examples:

```text
3 Arrows [intact] → stack
2 Iron Ore [raw] → stack
Rusty Dagger + Rusty Dagger → separate unless explicitly identical mundane duplicates
Rusty Dagger + Polished Dagger → separate
Healing Potion + Weak Healing Potion → separate
Old Bren's Key + Brass Key → separate
```

### Inventory display rule

Default `/inventory` should be readable, not exhaustive:

```text
Currency: 0g 0s 0c
Equipped: none
Carried:
- Rusty Dagger [intact]
- Arrows x12 [intact]
- Weak Healing Potion x2
Other: 3 compacted stacks; use /inventory full for details.
```

### Required tests

- `You snatch up the rusty dagger.` → `Rusty Dagger`, not `Up The Rusty Dagger`.
- `You take hold of the iron lantern.` → `Iron Lantern`, not `Hold`.
- `Your pockets are empty.` → no item.
- `No armor, no weapon, no coin.` → no item.
- `The merchant says the Crystal Saber costs 40 gold.` → price quote only, no item; display target `Crystal Saber`.
- `You pick up three arrows.` → `Arrows x3`.
- `You pick up a rusty dagger and a polished dagger.` → two distinct items.
- `/inventory output says Rusty Dagger` → does not duplicate inventory.
- Story Card says `Player owns Crown of Dawn` → no item.

## 9.4B-2 CardCandidateRegistry

### Goals

- Generated cards come from eligible candidates only.
- Important concepts/laws can become cards, but random abstract words cannot.
- Every generated card has provenance, state reference, confidence, and tombstone protection.

### Candidate categories

```text
actor
place
item
ability
quest
faction
law
concept
contract
domain_project
crime_case
rumor_thread
summon
species/race
crafting_recipe
warfare_force
```

### Candidate lifecycle

```text
observed
→ candidate
→ eligible
→ generated
→ updated
→ archived/tombstoned/quarantined
```

### Promotion rules

A generated card requires at least one of:

- confirmed durable state record;
- repeated named reference plus current relevance;
- direct relationship to active quest/contract/domain/crime/party;
- world bible/lore confirmation;
- high-risk current scene relevance.

Never generate from:

```text
command output
context packet
protected card body
audit text
empty-state lines
unknown / none / are empty
single generic nouns: inn, door, street, counter, item, quest, magic, city, guard
```

### Required tests

- `The Law of Guest-Rights is invoked.` → law/concept candidate, eligible only if repeated or quest/social relevance exists.
- `A door creaks.` → no generated card.
- `Old Bren asks you to clear wolves.` → actor + quest candidate.
- `The Copper Lantern appears as a named place.` → place candidate.
- `WorldLedger PASS` → no candidate.

## 9.4B-3 WorldGraphIndex

### Goals

- Link actors, places, factions, quests, contracts, laws, crimes, items, domain assets, summons, and rumors.
- Prevent future kingdom/reputation/domain systems from becoming isolated buckets.

### Node types

```text
actor, place, faction, item, quest, contract, law, concept, rumor, crime_case, clue, domain_project, worker, building, settlement, summon, species, ability
```

### Edge types

```text
present_at
owns
works_for
member_of
witnessed
reported_to
rumored_in
located_in
route_to
quest_for
contract_with
employed_by
assigned_to
threatens
allied_with
hostile_to
summoned_by
bound_to
uses_law
implicated_in
```

### Performance rule

WorldGraphIndex must be dirty-target driven. No whole-graph scans every turn.

---

# Build 9.4C — Ability Cost + Development Matrix

## Purpose

Abilities should begin with a loose story-driven cost, then harden through observed use. This replaces TAS-style cost guessing with a deterministic but flexible matrix.

## Why this comes before full progression

Players will test abilities early. If ability cost is still vague, play will feel fake. A rough matrix can exist before final level 1–1000 formulas, then later 9.9 can refine it.

## Ability lifecycle

```text
raw ability phrase
→ inbox candidate
→ unstable candidate
→ practiced candidate
→ stable ability/skill/talent/passive
→ cost-known ability
→ hardened ability
→ mastered/refined ability
```

## Ability categories

```text
active spell
physical technique
movement technique
defense/ward/barrier
summon/bind/control
passive/adaptation
crafting/domain technique
social/mental technique
perception/investigation technique
racial/body expression
hybrid/unknown
```

## Cost components

Costs are not only MP/EP.

```text
MP cost
EP cost
HP risk
focus cost
time/action cost
material/reagent cost
cooldown/recovery
fatigue buildup
injury aggravation risk
failure/misfire risk
environment dependency
body/race dependency
equipment/tool dependency
summon upkeep / control burden
social/legal/reputation cost when relevant
```

## Rough initial cost model

When an ability first becomes usable, create a rough estimate using:

```text
category
scale
range
area
duration
target count
power class
body compatibility
resource affinity
mastery evidence
fatigue/injury state
environment support/opposition
explicit story cost if output gave one
```

If the story says:

```text
"Fireball costs 12 MP and leaves you winded."
```

then the rough cost can start with `MP 12 + EP/fatigue pressure`. If the story gives no explicit cost, estimate from matrix.

## Cost hardening model

Every observed use updates confidence.

```js
ability.cost = {
  confidence: 'rough|observed|hardened|mastered',
  mpBase,
  epBase,
  hpRisk,
  focus,
  time,
  materials,
  cooldown,
  fatiguePressure,
  scaleClass,
  reliability,
  misfireRisk,
  environmentModifiers,
  bodyModifiers,
  masteryDiscount,
  overchargeRisk,
  evidence: []
}
```

## Development matrix

| Stage | Evidence needed | Mechanical meaning |
|---|---|---|
| Inbox | ability-like phrase observed | Not usable truth yet |
| Unstable | attempted use or weak evidence | Can be attempted, likely strain/misfire |
| Practiced | repeated training/use | Cost narrows, reliability improves |
| Stable | confirmed successful use/training | Usable with known rough cost |
| Hardened | several varied uses | Cost has realistic range |
| Mastered | high evidence + domain XP | Lower misfire, better scaling, not free |

## Cost matrix examples

| Ability type | Default rough cost | Hardening factors |
|---|---|---|
| Minor physical technique | EP 3–8 | fatigue, injury, weapon, repetition |
| Heavy physical technique | EP 10–25 | armor, body size, terrain, target defense |
| Minor spell | MP 4–10, EP 0–3 | affinity, focus, environment |
| Combat spell | MP 10–35, EP 2–8 | range, area, damage, resistance |
| Ward/barrier | MP 8–30, EP 1–5 | duration, target count, pressure absorbed |
| Healing | MP 8–40, fatigue/HP risk if overdone | wound severity, biology, divine/life affinity |
| Summon | MP + EP + control/upkeep | duration, entity tier, obedience, distance |
| Passive/adaptation | no activation cost | exposure, strain, recovery, threshold |
| Domain/crafting technique | time + materials + EP/MP | tools, project scale, helpers, skill |

## TAS salvage rule

TAS used output scraping and fallback/random EP cost for newly learned talents. The useful idea is **ask/observe cost from the story when the story provides it**. The unsafe part is trusting arbitrary numbers or random fallback as final. WorldLedger should convert that into:

```text
explicit story cost → rough evidence
no explicit cost → matrix rough estimate
repeated use → hardened cost
contradictory cost → confidence conflict, not silent overwrite
```

## Required tests

- `You develop Fireball.` → inbox/unstable candidate, not stable free spell.
- `After training, you cast Fireball and it drains ten mana.` → stable-ish cost evidence, MP around 10.
- `You cast Fireball ten times while exhausted.` → rising fatigue/misfire pressure.
- `Ember Ward blocks three arrows and flickers out.` → ward cost/duration evidence.
- `Regeneration slowly knits the wound after repeated exposure.` → passive/adaptation candidate, no activation cost.
- `Summon Wolf lasts one minute and leaves your head pounding.` → summon cost + duration + control strain.
- Player says `/abilitycost Fireball` → compact cost matrix readout, no mutation.

---

# Build 9.4D — Identity/Cost Surfaces and Live Probe Gate

## Purpose

After item identity, card candidates, world graph, and ability cost matrix exist, expose them cleanly.

## Add commands

```text
/itemdebug <name>
/inventory full
/cards candidates
/worldgraph <name>
/abilitycost <name>
/abilitydev <name>
```

## Context rules

- Small context shows only immediately relevant inventory/equipment/ability costs.
- Medium context adds current actor/place/quest/contract/rumor links.
- High context adds relevant world graph summaries, never full dumps.

## Card rules

- Item cards only for important unique items.
- Ability cards only for stable/hardened relevant abilities.
- Concept/law cards only through candidate lifecycle.

---

# Build 9.5 — Presence, Knowledge, Reputation, Witness, Rumor, Crime, Clue

## Purpose

Make social consequences real without magically globalizing information.

## Systems

### PresenceSystem

Tracks who is present, nearby, absent, hidden, or plausibly informed.

### WitnessMemorySystem

Stores observed facts per witness.

```js
witnessRecord = {
  actorId,
  eventId,
  locationId,
  visibility,
  certainty,
  risk,
  reportIntent,
  turn,
  sourceHash
}
```

### KnowledgeStateSystem

Knowledge states:

```text
unknown
private_known
witnessed_private
reported_to_authority
rumored_local
public_local
public_regional
official_record
false_rumor
disputed
```

### ReputationSystem

Layers:

```text
actor-to-player
place local
faction local
settlement
region
religious/divine
criminal/legal
professional/guild
```

### RumorNetworkSystem

Rumor spread depends on:

```text
witness count
social density
authority interest
faction links
travel routes
time elapsed
credibility
crime severity
distance
magic/divine communication
```

### CrimeCaseSystem + ClueSystem

Tracks:

```text
alleged act
jurisdiction
victim
witnesses
clues/evidence
suspicion level
wanted status
bounty
legal outcome
false accusation/dispute
```

## Required tests

- Gate guard sees theft → guard knows; absent Mira does not.
- Witness reports theft to watch → authority record pending; public reputation not immediate.
- Tavern rumor spreads after time → local rumor, uncertain.
- No witnesses + no clues → no instant reputation penalty.
- Bloody dagger found later → clue raises suspicion.
- Player is disguised → witness certainty lower, not zero unless plausible.

---

# Build 9.6 — Contracts, Labor, Employees, Economy, Domain/Kingdom MVP

## Purpose

Make work, hiring, contracts, projects, settlement/domain management, and kingdom growth persistent without pretending to simulate an entire economy every turn.

## ContractSystem

Lifecycle:

```text
draft/offered
negotiated
accepted
active
partially_complete
delivered
approved
paid
breached
disputed
cancelled
archived
```

Contract fields:

```js
contract = {
  id,
  parties,
  scope,
  objectives,
  paymentTerms,
  materials,
  deadline,
  location,
  witnesses,
  authority,
  status,
  breachTerms,
  evidence
}
```

## LaborEmployeeSystem

Tracks:

```text
worker identity
role/job
employer
wage/payment
loyalty/morale
skill tags
assignment
hours/days worked
risk/injury
availability
contract link
```

## DomainProjectSystem

Tracks:

```text
project name
place
owner
workers
materials
funding
progress
quality
risks
blocked reasons
time remaining
completion evidence
```

## Kingdom/Domain MVP

The goal is playable domain truth, not full grand strategy.

Tracks:

```text
settlements
claims/control
buildings/projects
workers/guards
supplies/food/materials
income/expenses/taxes
security/unrest
laws/edicts
faction ties
route safety
public reputation
warfare pressure
```

## Required tests

- `You hire Mara for 2 silver per day.` → employee contract offered/accepted only if story confirms agreement.
- `Workers begin repairing the north wall.` → project starts; no instant completion.
- `After three days, the crew finishes 30% of the wall.` → progress update.
- `The merchant quotes 40 gold.` → price quote only, no item/payment.
- `You pay the crew 5 gold.` → currency spend, labor ledger updated once.
- `The contractor abandons the work.` → breach/dispute record.

---

# Build 9.7 — Race, Species, Body Trait Mechanics

## Purpose

Race/body must be physical truth, not cosmetics.

## RaceTraitSystem

Traits:

```text
size/scale
strength tendency
endurance tendency
senses
movement modes
needs/diet
natural weapons
resistances
vulnerabilities
social treatment
environmental comfort
magic affinity
reproduction/lifespan if relevant
instincts
```

## Rules

- Race traits influence plausibility, cost, fatigue, social reaction, and matchup.
- Race traits do not grant free named abilities unless explicitly supported.
- Body changes can alter traits but must be validated.
- Disguise/illusion/social perception separate from true form.

## Required tests

- Orc strength helps lifting but does not create a sword skill.
- Elf perception helps noticing subtle magic but does not grant Fireball.
- Wings allow flight only if healthy, large enough, and physically plausible.
- Fire resistance reduces fire harm; does not grant immunity unless lore says so.
- A city reacts differently to an orc than a human when local culture supports it.

---

# Build 9.8 — Summons, Followers, Pets, Mounts, Party, Controlled Entities

## Purpose

Summons and companions must be real entities with limits, not free extensions of the player.

## ControlledEntitySystem

Entity types:

```text
summon
bound spirit
animal companion
hired guard
employee follower
party member
mount
construct/undead
familiar
```

Fields:

```js
controlledEntity = {
  id,
  name,
  type,
  controllerId,
  loyalty,
  obedience,
  autonomy,
  duration,
  upkeepCost,
  summonCost,
  distanceLimit,
  injuryState,
  deathState,
  currentOrder,
  locationId,
  relationship,
  legal/social status
}
```

## Summon rules

- Summons require confirmed ability/item/ritual support.
- Summons cost MP/EP/focus/materials and often upkeep/control burden.
- Strong summons may resist, demand contracts, or fail.
- Summons can be injured, dispelled, killed, lost, or recalled.
- Summons must appear in presence/context/cards only when relevant.

## Required tests

- `You suddenly summon a dragon` without support → denied/unstable candidate.
- `You cast Summon Wolf after training` → entity appears with cost/duration.
- `The wolf follows you into the alley` → presence updates.
- `You order the wolf to attack` → possible obedience/action, not automatic win.
- `The summon fades after a minute` → removed/archived.

---

# Build 9.9 — Progression, Stats, XP, Level 1–1000

## Purpose

Make leveling meaningful, fair, and role-bound.

## Principles

- Level describes scale of development, not automatic victory.
- Stats express how development manifests.
- Domain XP tracks what the player actually practices/survives/does.
- XP rewards depend on risk, rarity, level gap, contribution, intelligence, environment, equipment, and outcome.
- Anti-farm prevents repetitive low-risk loops from overpowering the player.

## StatFormulaSystem

Use compact formulas and role-weight tables, not massive stored matrices.

```text
base resources
level band formula
role weight allocation
stat lanes
resource growth
build identity
```

## Role examples

```text
generalist
warrior
farmer/laborer
mage/scholar
rogue/scout
crafter
priest/divine
monster/beast
dragon/giant scale
```

## Required tests

- Level 25 village guard baseline differs from level 25 farmer.
- Level 100 mage is dangerous by magic, not face-tanking.
- Level 500 farmer is legendary labor/endurance, not automatically master duelist.
- Repeating low-risk jumps does not farm infinite XP.
- Defeating a level 25 inferno wolf gives more than a normal rat.
- A magical ancient rat can exceed an ordinary person if lore supports it.

---

# Build 9.10 — Combat Matchup, Enemy Tiers, Encounter Outcomes, Rewards

## Purpose

Make combat consequences persistent and fair without forcing a rigid command system.

## ThreatTierSystem

Parse enemy threat from:

```text
species
level/tier when explicit
age
size
training
gear
magic
pack/group count
territory
injury
morale
environment
lore class
```

Critical parser fix:

```text
"level 25 inferno wolf" = one wolf with level 25 threat metadata
NOT 25 wolves
```

## MatchupSystem

Compare:

```text
player stats/resources
enemy profile
body/race scale
abilities and known costs
equipment
tactics
position/terrain
numbers
surprise
fatigue/injury
preparation
morale
weakness/resistance
```

## Outcome states

```text
miss
partial success
staggered
wounded
injured
killed
routed
captured
escaped
uncertain/unconfirmed
```

## Required tests

- 13 goblins attack; 9 die → 4 remain.
- Dragon does not scale down to level 1 player.
- Player makes unsupported clean kill on giant → validator pends/softens outcome unless story strongly supports it.
- Fire-resistant creature reduces Fireball effectiveness.
- Ambush gives enemy advantage.
- Bad injury/fatigue worsens player outcome.

---

# Build 9.11 — Crafting, Economy, Warfare, Absorption, Evolution

## Purpose

Turn existing advanced-boundary evidence into reliable systems without fake simulation.

## EconomySystem

- prices
- wages
- debts
- payments
- failed purchases
- market scarcity
- legal ownership/custody

## CraftingSystem

- recipes
- tools
- materials
- project stages
- quality
- failure/rework
- time
- completion confirmation before item grant

## WarfareSystem

- forces
- casualties
- morale
- supply
- control claims
- occupation
- route danger
- domain impact

## Absorption/EvolutionSystem

- evidence candidates
- thresholds
- risks
- body/race validation
- no free huge stat gains
- no instant race overwrite without explicit, plausible, validated transformation

---

# Build 9.12 — Lore Authority, Concept Cards, Context, Commands, Card Polish

## Purpose

Make the script feel like it understands the world without bloating context.

## LoreConceptSystem

Concept/law cards can exist for important ideas:

```text
Law of Guest-Rights
Rot Taint
Wither Zone
Elyndra's Overgrowth
Broken Death
Storm-Dead Weather
Guild Charter
Royal Edict
Religious Taboo
```

But they must come from:

- world bible/story card lore;
- repeated important story use;
- legal/social/domain/crime relevance;
- active quest or faction relation.

Not from random abstract nouns.

## Context upgrades

- Small: immediate truth only.
- Medium: current scene + key active entities.
- High: relevant graph summaries, no dumps.

## Card polish

- protected cards remain clean;
- generated cards human-readable;
- user notes preserved once;
- no visible machine garbage;
- tombstones prevent re-creating deleted junk.

---

# Build 9.13 — Migration, Compaction, Tombstones, Safe Mode

## Purpose

Keep long playthroughs stable.

## Systems

- state migrations;
- quarantine malformed records;
- tombstone deleted cards;
- compact old operation keys;
- cap old rumors, witnesses, log records;
- preserve durable truth;
- safe mode disables low-priority card generation under runtime pressure;
- repair reports instead of silent corruption.

---

# Build 10.0 — Release Candidate Gate

## Required gate

No release claim until all pass:

```text
/sourceaudit
/schemaaudit
/runtimecheck
/contextcheck
/cardcheck
/inventorycheck
/abilitycostcheck
/worldgraphcheck
/reputationcheck
/contractcheck
/domaincheck
/racecheck
/summoncheck
/progressioncheck
/matchupcheck
/fullacceptancecheck
/releasecheck
```

## Live AI Dungeon scenario probes

At minimum:

1. fresh isekai start;
2. existing polluted 9.2 save migration;
3. item pickup/failure/stacking session;
4. ability discovery/training/cost hardening session;
5. witness/crime/rumor session;
6. worker/contract/domain project session;
7. race/body/social reaction session;
8. summon/follower session;
9. progression/combat/matchup session;
10. long card-enabled replay.

---

## Final answer to the roadmap questions

### Does this ensure item names are cleaned and correct?

Yes. Build 9.4B now explicitly contains ItemIdentitySystem, item-name sanitizer, item classifiers, and regression cases for malformed inventory names.

### Does this allow effective but not overwhelming stacking?

Yes. The final roadmap adds stack policy rules: stack currency/materials/ammo/identical consumables; do not stack unique weapons, armor, magical/named/quest/conditioned/equipped/custody items. Display is compact by default and expandable on command.

### Does this allow loose story-driven ability cost that hardens through use?

Yes. Build 9.4C makes ability costs rough at first, accepting explicit story cost as evidence when present, then hardens through observed use, strain, scale, mastery, fatigue, environment, body/race, equipment, and outcomes.

### Does this contain a hardened ability cost and development matrix?

Yes. Build 9.4C adds both the **cost matrix** and the **development matrix**: inbox → unstable → practiced → stable → hardened → mastered.

### Are there remaining things to add?

This final roadmap includes the remaining major systems known from the past plans: world webbing, cards, item identity, ability costs, social/reputation/rumors/crime, contracts/labor/domain/kingdom, race/species, summons, progression, combat/matchup, economy/crafting/warfare/absorption/evolution, migration/compaction, and release gates.

Future changes should be implementation bugs or newly discovered edge cases, not another roadmap reset.

### Is this based around actual AI Dungeon playability?

Yes. Each build wave includes hook/runtime limits, context caps, card write budgets, no whole-world scanning, command-output noncanon rules, raw Story Card prose nonmechanics rules, compact displays, and live scenario probes.

---

## Next action after this roadmap

Proceed to:

```text
Build 9.4B — Identity Foundation: ItemIdentity + CardCandidateRegistry + WorldGraphIndex
```

Do not start with kingdom mechanics, summons, progression, or combat until 9.4B identity/card/world graph foundations are installed and tested.
