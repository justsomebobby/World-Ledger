# 01 — Old AIDRPG Card Patch Salvage Map

## Purpose

The old AIDRPG versions are a salvage mine, not a copy-paste source.

Many old fixes solved pieces of the same card/profile problems, but many were added as late patches, wrappers, or finalization piles. V1.1.0 should extract the working behavior and rebuild it inside WorldLedger's current native owners.

## Salvage classifications

| Classification | Meaning |
|---|---|
| `DIRECT TRANSPLANT` | Small isolated function may be reused almost directly after renaming/adapting. Rare. |
| `ADAPT` | Behavior is good but old architecture is bad. Rebuild inside current owner. |
| `TEST ONLY` | Old patch is too messy, but the regression test is valuable. |
| `SPEC SOURCE` | Old plan/doc gives authoritative target behavior. |
| `REJECT` | Old behavior caused patch loops, false passes, bad defaults, or unsafe wrappers. |

## Source family: AIDRPG v1.5.0 protected starter cards

**Classification:** `ADAPT`

### Problem it tried to solve

AIDRPG needed stable player-facing Story Cards that could be bootstrapped and maintained.

### Useful behavior

- protected starter card reconciliation
- `/cardsync bootstrap` / controlled sync command idea
- player-facing starter cards such as Player Summary, Ability Index, Skills, Talents, Inventory Summary, Actor Memory Summary, Quest Summary, Reputation Summary, Time Route Summary
- refresh card index before writes
- dirty queue idea
- singleton protected cards

### Reject

- old late closure patch structure
- safe-mode ritual as final posture
- generated cards disabled forever
- late wrappers around hook behavior
- command output returned directly into story

### V1.1 owner target

- `CardRegistry`
- `CardSyncLite`
- `CardRenderer`
- `/synccards` command

### Acceptance test

```text
/synccards creates or updates protected cards without duplicates.
Deleting a protected Player Sheet triggers controlled restore.
Renaming a protected card does not break matching if marker remains.
```

## Source family: AIDRPG v1.5.x / v1.6.x player-facing renderers

**Classification:** `ADAPT`

### Problem it tried to solve

Older builds had more satisfying player/inventory/ability displays than the current WorldLedger V1.0 card output.

### Useful behavior

- Player Summary layout including name, race/species, age, level, XP, HP, MP, EP
- stat display: ATK, DEF, SPD, INT, LCK
- condition/injury display
- ability records and ability progress notes
- inventory ownership versus visible/available item distinction
- blocked false-positive notes

### Reject

- old giant initialization chain
- old patch layering
- old mixed architecture where too many systems mutated too much

### V1.1 owner target

- `PlayerProfile`
- `CardRenderer.renderPlayerSheet`
- `CardRenderer.renderInventoryEquipment`
- `CardRenderer.renderAbilitiesTraining`

### Acceptance test

```text
Player Sheet shows HP/MP/EP and ATK/DEF/SPD/INT/LCK.
Inventory distinguishes owned items from visible-but-not-owned items.
Failed ability attempts appear as candidate/failed evidence, not stable mastery.
```

## Source family: AIDRPG v1.8.5 final QA / identity and card readiness

**Classification:** `ADAPT` and `TEST ONLY`

### Problem it tried to solve

AIDRPG needed identity safeguards, live card readiness, manual card ingestion, strict `/cardaudit`, context budgeting, and final QA checks.

### Useful behavior

- `StartupIdentityImporter` concept
- `PlayerIdentityGuard` concept
- bad player name rejection
- actor-name sanitization
- generated-card cleanup / junk neutralization tests
- strict `/cardaudit`
- manual card ingestion support
- live card default checks
- managed Story Card mirror checks

### Reject

- copying the full v1.8.5 file
- giant init chains
- finalization patch piles
- repeated “fix at the bottom” structures

### V1.1 owner target

- `PlayerProfile`
- `GeneratedCardPolicy`
- `CardAudit`
- `ManagedCardEditImporter`
- `ReleaseCheckLite`

### Acceptance test

```text
Story says “where you, Zack, stood.” -> player name becomes Zack.
Story says “You see Zack across the room.” -> player name does not change.
/cardaudit reports junk cards, broad triggers, protected duplicates, write budgets, and manual import status.
```

## Source family: Gap Chunk C / Story Card contract

**Classification:** `SPEC SOURCE`

### Problem it tried to solve

Earlier card systems repeatedly suffered from:

- duplicate protected cards
- junk generated cards
- broad triggers
- unsafe live writes
- card text becoming canon
- old polluted card import
- missing update targets
- title-only identity
- stale conflicts
- API assumptions

### Useful behavior

- state is canon
- Story Cards mirror state
- Story Cards do not create state
- architecture: `CardSyncLite -> CardRegistry -> CardRenderer -> CardApiAdapter -> Story Card API`
- dirty targets drive sync
- generated cards require eligibility
- card audit must explain create/update/skip/reject decisions

### Reject

Nothing from this as a spec. It is a design anchor.

### V1.1 owner target

All card owners.

### Acceptance test

```text
Editing a card to say Level 99 does not change level.
Editing a card to say owns Crown does not add Crown.
Generated junk names are rejected before write.
```

## Source family: old generated-card hardening patches

**Classification:** `ADAPT` and `TEST ONLY`

### Problem it tried to solve

Old builds repeatedly created junk cards from scenery, generic roles, broad nouns, plural groups, and temporary mentions.

### Useful behavior

- junk actor reject lists
- junk place reject lists
- junk item reject lists
- broad trigger deny lists
- tombstones for rejected junk
- same-turn generated write limits
- dirty queue and budget enforcement

### Reject

- deleting user cards blindly
- generated cards disabled forever
- broad post-hoc cleanup that fights creation every turn

### V1.1 owner target

- `GeneratedCardPolicy`
- `CardRegistry.tombstone`
- `CardSyncLite.processGenerated`

### Acceptance test

```text
“old guards” does not create WL Actor — Old Guards.
“road” does not create place card.
“sword” does not become item card from one-off mention.
Old Man Gerrik can become actor card after meaningful interaction.
```

## Source family: Inner Self / Auto-Cards / TAS public GitHub references

**Classification:** `REFERENCE ONLY` unless exact small functions are reviewed later.

### Known useful public-source behaviors

- Inner Self: segmented NPC memory, goals, secrets, planning, self-reflection, agent-like long-term memory.
- Auto-Cards: watches normal gameplay and creates/updates plot-relevant Story Cards for object permanence.
- TAS: automatically creates/tracks/updates player stats during AI Dungeon adventures.

### Use in V1.1

- Use Auto-Cards as reference for candidate extraction, scoring, generation thresholds, and object permanence purpose.
- Use Inner Self as reference for identity/memory segregation and durable character memory.
- Use TAS as reference for player-facing stat display and automatic stat tracking posture.

### Reject

- wholesale import
- mismatched globals
- incompatible UI behavior
- their defaults overriding WorldLedger doctrine

### V1.1 owner target

Reference only unless explicitly mined during a later chunk.

## Salvage discipline

No old fix enters V1.1 unless it has:

1. source family named
2. classification assigned
3. owner module target named
4. accepted behavior stated
5. rejected behavior stated
6. acceptance test listed

This prevents reintroducing the patch pile.
