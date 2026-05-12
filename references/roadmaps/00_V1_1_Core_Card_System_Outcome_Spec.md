# 00 — V1.1 Core Card System Outcome Spec

## Purpose

WorldLedger V1.1.0 must replace the current card-writing behavior with a native, player-facing RPG memory card system.

This is **not** a prettification pass. It is **not** a wrapper patch. It is not an overlay that hides bad cards with nicer cards.

The correct purpose is:

```text
CardSyncLite = maintain canon RPG memory cards for the player and AI Dungeon.
```

The incorrect current tendency is:

```text
CardSyncLite = dump internal mirror state into Story Cards.
```

## Intended player experience

When the player opens AI Dungeon Story Cards, WorldLedger-managed cards should look like useful RPG tools:

- `WL — Zack / Player Sheet`
- `WL — Body & Status`
- `WL — Inventory & Equipment`
- `WL — Abilities & Training`
- `WL — Quest Log`
- `WL — Party, Actors & Social Memory`
- `WL — Places, Scene & Time`
- `WL — WorldLedger Settings`
- `WL — Command Log & Audit`

They should not look like debug objects, raw JSON, state dumps, or internal mirror logs.

## What cards are

Story Cards are durable editable memory surfaces. They help AI Dungeon remember the adventure.

WorldLedger must treat cards as:

```text
state mirrors
RPG reference pages
player-editable memory surfaces
AI-facing durable reminders
```

WorldLedger must not treat cards as:

```text
primary canon source for mechanics
free item/XP/ability import channel
debug dump field
unbounded generated entity storage
command output storage for normal story context
```

## Canon rule

State remains canon for mechanics.

Story Cards mirror state and may preserve safe user notes, but raw card prose must not auto-fire mechanics.

Allowed:

- user edits appearance notes
- user edits backstory notes
- user edits name/pronouns in a safe profile section
- script rewrites managed RPG summary sections
- script preserves `[User Notes - Preserved]`
- script creates generated cards only for promoted important records

Blocked:

- card says “owns Crown of Dawn” and inventory gains Crown
- card says “Level 99” and player becomes level 99
- card says “Meteor mastered” and stable ability appears
- card says “Quest complete” and quest completes
- card says “1000 gold” and currency changes
- old polluted cards importing false truth

## High context mode definition

High context mode means:

```text
use the largest safe context budget tier that remains stable in AI Dungeon
prioritize important memory
trim aggressively when needed
respect hard caps and info.maxChars
never flood context just because more text exists
```

High context mode does **not** mean:

```text
dump every card, audit, actor, item, debug line, candidate, and old note into context
```

## Native owners to replace or strengthen

V1.1.0 must make the card behavior native by modifying these owners directly:

| Owner | Role |
|---|---|
| `PlayerProfile` | name/profile bootstrap, safe profile import, identity protection |
| `CardRegistry` | managed IDs, protected definitions, duplicate adoption, tombstones |
| `CardRenderer` | player-facing RPG templates |
| `CardSyncLite` | dirty queues, budgets, live write orchestration |
| `CardApiAdapter` | official Story Card API calls, fallback, invalid-card cleanup |
| `GeneratedCardPolicy` | promotion gates, junk rejection, trigger hygiene |
| `ManagedCardEditImporter` | safe profile import only, mechanics blocked |
| `CardAudit` | card health, UX rules, policy violations |
| `ReleaseCheckLite` | authoritative final V1.1 gates |
| AI Dungeon Input tab | command output suppression |

## What must improve from V1.0.0

### Player profile

Observed problem:

```text
Story establishes Zack.
Player card stays Name: Unknown.
```

Required outcome:

```text
Story says “where you, Zack, stood.”
PlayerProfile safely commits name=Zack.
Player Sheet title/body updates.
No NPC/location/sign contamination.
```

### Stats and resources

Observed problem:

```text
Stats are active in status but not meaningful in cards.
```

Required outcome:

```text
Player Sheet always shows Level, XP, HP, MP, EP, ATK, DEF, SPD, INT, LCK.
```

### Abilities

Observed problem:

```text
Abilities card exists but is empty/generic.
```

Required outcome:

```text
Abilities & Training card separates stable abilities, candidate abilities, failed attempts, training notes, costs, limits, and risks.
```

### Generated cards

Observed problem:

```text
Generic phrases can become generated cards too quickly.
```

Required outcome:

```text
Protected cards are always live.
Generated cards are rare, promoted, meaningful, safe, budgeted, and not generic.
```

### Triggers

Observed problem:

```text
Managed cards can use broad/internal triggers like WorldLedger.
```

Required outcome:

```text
No generic WorldLedger trigger.
No broad triggers like guard, road, key, sword, quest, magic, player.
Triggers are narrow, story-relevant, and family-specific.
```

### Manual editing

Observed problem:

```text
User Notes are preserved but not very useful.
```

Required outcome:

```text
User Notes are structured, preserved, and documented.
Safe Profile Edits can import non-mechanical profile fields.
Mechanical claims remain notes only.
```

### Commands

Observed problem:

```text
/audit output can leak into story prose.
```

Required outcome:

```text
Slash commands run as control/UI actions.
Command output is stored and optionally shown via state.message.
Command text/output is not sent to AI/story context.
```

## Definition of done for V1.1 card system

V1.1 is successful when:

- opening Story Cards feels like opening a clean RPG journal
- protected cards are readable, useful, and stable
- generated cards are rare and obviously meaningful
- player name/profile updates natively
- stats/resources are visible
- ability memory is useful
- manual editing feels intentional
- card text cannot cheat mechanics
- command output does not pollute story
- `/releasecheck` and `/cardaudit` prove these rules
