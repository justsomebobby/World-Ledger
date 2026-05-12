# 02 — Player-Facing Card Templates

## Purpose

These templates define what V1.1 Story Cards should look like. They are not optional cosmetics. They are the target behavior for `WL.CardRenderer`.

Every protected card should start with useful RPG information, not machine metadata.

Machine markers belong at the bottom:

```text
[WL:id=protected_player_sheet]
[WL:v=1.1]
```

## Global card rendering rules

1. Do not start a card with `[WorldLedger Mirror ID: ...]`.
2. Do not use `[Generated Mirror - Script Owned]` as a visible heading.
3. Do not spam `unknown` repeatedly.
4. Use clean headings and short sections.
5. Label candidate/unconfirmed facts.
6. Preserve `[User Notes - Preserved]` exactly.
7. Keep cards short enough for AI Dungeon card limits.
8. Separate mechanical truth from editable notes.
9. Never render audit/debug spam into normal RPG cards.
10. Always include compact WL markers at the bottom.

## Protected card set

V1.1 protected cards:

```text
WL — Player Sheet
WL — Body & Status
WL — Inventory & Equipment
WL — Abilities & Training
WL — Quest Log
WL — Party, Actors & Social Memory
WL — Places, Scene & Time
WL — WorldLedger Settings
WL — Command Log & Audit
```

## Template: Player Sheet

Dynamic title:

```text
WL — Zack / Player Sheet
```

Fallback title if name unknown:

```text
WL — Player Sheet
```

Body:

```text
Zack — Player Sheet

Identity
- Name: Zack
- Species: Human
- Class / Build: Unset
- Level: 1
- XP: 0 / 100

Vitals
- HP: 100 / 100
- MP: 50 / 50
- EP: 100 / 100

Core Stats
- ATK 10 | DEF 10 | SPD 10 | INT 10 | LCK 10

Current State
- Location: Unknown
- Conditions: none
- Injuries: none
- Fatigue: normal

Abilities
- Stable: none
- Training/Candidates: none

Equipment
- Main hand: empty
- Off hand: empty
- Armor: none

Safe Profile Edits
Name:
Pronouns:
Appearance:
Personality:
Backstory:

[User Notes - Preserved]
You may safely edit appearance, personality, backstory, and profile notes here.
Mechanical claims still require story confirmation.
[/User Notes]

[WL:id=protected_player_sheet]
[WL:v=1.1]
```

Required data sources:

- `root.player.name`
- `root.player.profile`
- `root.player.level`
- `root.player.xp`
- `root.player.xpToNext`
- `root.body.resources` or equivalent HP/MP/EP state
- `WL.PlayerProfile.coreStats(root)`
- current location summary
- conditions/injuries/fatigue
- stable and candidate ability summaries
- equipment summary

## Template: Body & Status

```text
Body & Status

Resources
- HP: 100 / 100
- MP: 50 / 50
- EP: 100 / 100

Condition
- Fatigue: normal
- Conditions: none
- Injuries: none
- Body traits: none

Form / Body Logic
- Current form: baseline human or not set yet
- Movement constraints: none confirmed
- Environmental needs: none confirmed

Recent Body Events
- none

[User Notes - Preserved]
Add body/status flavor notes here. Mechanical changes still require story confirmation.
[/User Notes]

[WL:id=protected_body_status]
[WL:v=1.1]
```

## Template: Inventory & Equipment

```text
Inventory & Equipment

Currency
- Gold: 0 | Silver: 0 | Copper: 0

Owned Items
- Rusty Dagger x1

Equipped
- Main hand: Rusty Dagger
- Off hand: empty
- Armor: none

Visible / Available Nearby
- Crown of Dawn — visible, not owned

Custody / Held By Others
- none

Promised / Unpaid Rewards
- none

Recent Blocked False Positives
- failed grab: Crown of Dawn was not added

[User Notes - Preserved]
You may add organization notes or item descriptions here.
Writing “owns an item” here does not add it mechanically.
[/User Notes]

[WL:id=protected_inventory_equipment]
[WL:v=1.1]
```

Required distinctions:

- owned
- equipped
- visible but not owned
- available nearby
- held by someone else
- promised reward
- paid reward
- blocked false positive

## Template: Abilities & Training

```text
Abilities & Training

Stable Abilities
- none

Candidates / Training
- Ember Ward — attempted once; no confirmed effect yet.

Failed / Denied Attempts
- Ember Ward — failed activation; not stable.

Known Costs / Limits / Risks
- none confirmed

Manual / Pinned Ability Notes
- none

[User Notes - Preserved]
You may add flavor, visuals, limitations, or training notes here.
Mechanical mastery still requires story confirmation.
[/User Notes]

[WL:id=protected_abilities_training]
[WL:v=1.1]
```

Ability status categories:

- stable
- candidate
- training
- failed/denied
- unconfirmed rumor
- manually pinned note

Generated individual ability cards should only be created for:

- stable abilities
- manually pinned major abilities
- major candidate abilities after promotion threshold

## Template: Quest Log

```text
Quest Log

Active Quests
- none

Offered / Available Work
- Old Man Gerrik may have work for a strong back — offered/rumored, not accepted.

Promised Rewards
- none

Completed
- none

Failed / Abandoned
- none

[User Notes - Preserved]
Add quest notes here. Writing “completed” here does not complete a quest mechanically.
[/User Notes]

[WL:id=protected_quest_log]
[WL:v=1.1]
```

## Template: Party, Actors & Social Memory

```text
Party, Actors & Social Memory

Party / Companions
- none

Important Actors
- Old Man Gerrik — tavern contact; may offer work.

Mentioned Groups
- old guards — mentioned only; no individual card yet.

Relationships / Reputation
- none confirmed

Social Promises / Debts
- none

[User Notes - Preserved]
Add social memory notes here. Mechanical reputation changes still require story confirmation.
[/User Notes]

[WL:id=protected_actors_social]
[WL:v=1.1]
```

## Template: Places, Scene & Time

```text
Places, Scene & Time

Current Scene
- Location: Unknown
- Time: unknown
- Weather: unknown

Known Places
- Rusty Tankard — tavern; mentioned as possible work lead.

Nearby / Visible
- none confirmed

Travel / Route Notes
- none

[User Notes - Preserved]
Add place or route notes here. Writing “arrived at X” here does not change location mechanically.
[/User Notes]

[WL:id=protected_places_time]
[WL:v=1.1]
```

## Template: Settings

```text
WorldLedger Settings

Runtime Profile
- Version: 1.1.0-core-card-system
- Context mode: High, budgeted
- Live context updates: ON
- Live Story Card memory: ON
- Generated cards: ON, promotion-gated
- Manual Story Card editing: ON
- Raw card prose as mechanics: BLOCKED

Card Generation
- Protected cards: always maintained
- Generated cards: rare, promoted, budgeted
- Generated creates per turn: 1
- Generated updates per turn: 4

[User Notes - Preserved]
Add safe settings notes here. Settings must be changed through commands or supported config paths.
[/User Notes]

[WL:id=protected_settings]
[WL:v=1.1]
```

## Template: Command Log & Audit

This card should not become a giant debug dump.

```text
Command Log & Audit

Last Command
- none

Recent Card Warnings
- none

Recent Blocked Imports
- none

Recent Generated Card Skips
- none

[User Notes - Preserved]
This card is for compact command/audit memory only. It should not be used as story context.
[/User Notes]

[WL:id=protected_command_audit]
[WL:v=1.1]
```

## Bad card examples to prevent

```text
[WorldLedger Mirror ID: wl.protected_worldledger_player]
[Generated Mirror - Script Owned]
Canon player sheet / editable memory.
Name: Unknown
Race/Species: unknown
Age: unknown
Class/Specialization: none
Appearance: unspecified
```

```text
WL Actor: Old Guards
[WorldLedger Mirror ID: wl.actor_actor_old_guards]
```

```text
WorldLedger Inventory
Canon inventory memory. Owned items only: none. Visible item candidates: none.
```

These are machine-facing, ugly, and not meaningful enough.
