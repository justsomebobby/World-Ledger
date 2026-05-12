# 04 — Manual Card Edit and Profile Import Policy

## Purpose

Manual Story Card editing must remain allowed and useful.

V1.1 must support player edits without letting raw card text cheat mechanics.

## Core rule

```text
Manual card edits are preserved.
Safe profile fields may be imported through a controlled owner.
Mechanical claims are never imported directly from raw card prose.
```

## Owner module

Add:

```js
WL.ManagedCardEditImporter = {
  scanManagedCards(root) {},
  parsePlayerProfileSection(text) {},
  parseMechanicalClaims(text) {},
  applySafeProfileEdits(root, parsed) {},
  rejectMechanicalClaims(root, claims) {},
  audit(root, result) {},
  inspect(root) {},
  runV11ManualEditTests() {}
};
```

## Editable sections

Every protected card should include:

```text
[User Notes - Preserved]
...
[/User Notes]
```

Player Sheet also includes:

```text
Safe Profile Edits
Name:
Pronouns:
Appearance:
Personality:
Backstory:
```

Only this safe profile section should be parsed for profile import.

## Allowed profile imports

Allowed from `Safe Profile Edits`:

```text
Name
Pronouns
Appearance
Personality
Backstory
Species/race label if profile-only and not a mechanical transformation
Cosmetic class/build label if not treated as confirmed mechanics
```

Examples:

```text
Name: Zack
Appearance: scar over left eye, worn coat
Personality: cautious but stubborn
Backstory: from another world, remembers fragments of Earth
```

## Blocked direct imports

Never directly import:

```text
Level
XP
HP / MP / EP
ATK / DEF / SPD / INT / LCK
Gold / currency
Owned items
Equipped items
Stable abilities
Quest completion
Faction reputation
Domain ownership
Combat victories
Transformations
Blessings / curses
Deaths / kills
Rewards paid
```

These require the normal story -> parser -> validator -> reducer path.

## Examples

### Safe import

Player edits:

```text
Safe Profile Edits
Name: Zack
Appearance: scar over left eye
```

Expected:

```text
root.player.name = Zack
root.player.profile.appearanceSummary includes scar over left eye
Player Sheet marked dirty
audit logs safe profile import
```

### Mechanical claim blocked

Player edits:

```text
[User Notes - Preserved]
Level: 99
Owned: Crown of Dawn
Stable Ability: Meteor
[/User Notes]
```

Expected:

```text
level unchanged
inventory unchanged
stable abilities unchanged
notes preserved
audit logs blocked mechanical claims
```

## User Notes preservation

CardSync must preserve user notes across managed card rewrites.

Algorithm:

1. Read existing card body.
2. Extract `[User Notes - Preserved]...[/User Notes]`.
3. Render new managed RPG summary section.
4. Reinsert preserved notes.
5. Preserve safe profile section unless it is part of the managed template and already parsed.
6. Write only if managed section or preserved notes changed.

## Conflict behavior

If profile import conflicts with existing locked profile:

```text
Do not overwrite automatically.
Add profile warning.
Preserve notes.
Report conflict in /cardaudit or /profilecheck.
```

Example:

```text
Existing name: Zack
Safe Profile Edits says Name: Marcus
```

Expected:

```text
player.name remains Zack unless explicit supported rename command exists
profileWarnings includes conflict
Player Sheet shows warning or audit reports it
```

## Commands

Possible commands:

```text
/importprofile
/profilecheck
/synccards
/writecard
```

`/synccards` may scan safe profile sections if configured.

`/importprofile` should explicitly scan safe profile edits.

`/writecard` must remain managed-card editing only, not gameplay mutation.

## Acceptance tests

```text
Edit Player Sheet User Notes -> /synccards -> notes survive.
Edit Safe Profile Name: Zack -> /importprofile -> player.name becomes Zack.
Edit Appearance -> profile appearance updates.
Edit Level 99 -> level does not change.
Edit Owned: Crown -> inventory does not change.
Edit Stable Ability: Meteor -> stable ability does not appear.
Edit Quest complete -> quest does not complete.
```
