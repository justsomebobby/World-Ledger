# 05 — CardAudit and ReleaseCheck Gates

## Purpose

V1.1 must prove the card system is correct. It must not merely say PASS because the latest layer says so.

`/cardaudit` and `/releasecheck` must validate the native owner behavior:

- PlayerProfile
- CardRegistry
- CardRenderer
- CardSyncLite
- GeneratedCardPolicy
- ManagedCardEditImporter
- AI Dungeon command suppression

## `/cardaudit` required sections

`/cardaudit` must report:

```text
1. CardSync mode
2. Live/dry-run status
3. Story Card API capability
4. Protected registry count
5. Protected card sync status
6. Generated card policy status
7. Write budgets
8. Dirty queue
9. Skipped operations
10. Duplicate warnings
11. Tombstones
12. Broad trigger scan
13. Junk generated card scan
14. User Notes preservation status
15. Safe profile import status
16. Recent card errors
17. Last writes
18. Command-output contamination check
```

## `/cardaudit` must fail if

```text
Protected card registry missing.
Player Sheet renderer missing.
Player Sheet lacks HP/MP/EP.
Player Sheet lacks ATK/DEF/SPD/INT/LCK.
A managed card starts with machine metadata.
Generic WorldLedger trigger appears.
Generated card policy missing.
Generated create budget exceeds 1 per turn by default.
Junk generated cards exist without explicit manual override.
Broad triggers exist on generated cards.
Duplicate protected cards are unmanaged and unreported.
User Notes section missing on protected cards.
CardSync matches protected cards by title only.
```

## `/releasecheck` required sections

`/releasecheck` must include:

```text
1. Build identity: V1.1.0-core-card-system
2. Native owner presence
3. PlayerProfile/profile bootstrap gates
4. Protected registry gates
5. Player-facing renderer gates
6. CardSync live write and note preservation gates
7. GeneratedCardPolicy gates
8. Manual edit import gates
9. Command suppression gates
10. Baseline V1.0 gameplay safety gates
11. Result
```

## `/releasecheck` must fail if

```text
PlayerProfile owner missing.
Player Sheet renderer missing.
Player Sheet lacks HP/MP/EP.
Player Sheet lacks ATK/DEF/SPD/INT/LCK.
Protected registry missing stable [WL:id] markers.
CardSync can match protected cards by title only.
Generic WorldLedger trigger appears on protected cards.
Generated card policy missing.
Generated card creates > 1 per turn by default.
Junk names can create generated cards.
Manual edit Level 99 changes level.
Manual edit owned item changes inventory.
Card text can create inventory/quest/ability state.
Command output can enter story/event parsing.
```

## `/releasecheck` may warn if

```text
Player name still Unknown and no identity evidence has appeared.
Story Card API partially unavailable but fallback is active.
Dirty protected cards pending too long.
Duplicate old protected card detected but quarantined/adoptable.
User Notes section missing on old managed card awaiting rewrite.
Generated candidate pending but not promoted.
```

## V1.1 regression tests

### T1 — Player identity accepted

```text
Output: “where you, Zack, stood.”
Expected:
- player.name = Zack
- Player Sheet title/body says Zack
- dirty target consumed after sync
```

### T2 — Player identity rejected

```text
Output: “You see Zack across the room.”
Expected:
- player.name remains unchanged
```

### T3 — Stats visible

```text
Run /synccards.
Expected Player Sheet contains HP, MP, EP, ATK, DEF, SPD, INT, LCK, Level, XP.
```

### T4 — Ability candidate

```text
Output: “You try Ember Ward, but nothing happens.”
Expected:
- Abilities card lists candidate/failed attempt
- no stable ability
- no generated stable ability card
```

### T5 — Stable ability

```text
Output: “After repeated training, Ember Ward finally works as a defensive ward.”
Expected:
- stable ability accepted only if validator/reducer confirms
- Abilities card updates
- generated ability card eligible
```

### T6 — Junk actor blocked

```text
Output: “The old guards mutter by the road.”
Expected:
- no WL Actor — Old Guards
- no road card
- summary-only mention allowed
```

### T7 — Named actor promoted

```text
Output: “Old Man Gerrik leans close and offers you work.”
Expected:
- actor state may record Gerrik
- actor card pending/accepted depending importance
- card title readable if created
```

### T8 — Visible item not owned

```text
Output: “The Crown of Dawn rests on the altar.”
Expected:
- visible/available item only
- no inventory ownership
- no generated owned item card
```

### T9 — Failed grab

```text
Output: “You try to grab the Crown of Dawn, but it vanishes.”
Expected:
- Crown not owned
- Inventory card may list blocked false positive
```

### T10 — Notes preserved

```text
Edit Player Sheet User Notes.
Run /synccards.
Expected note survives.
```

### T11 — Safe profile import

```text
Safe Profile Edits:
Name: Zack
Appearance: scar over left eye
Expected name/appearance update only.
```

### T12 — Mechanical cheat blocked

```text
User Notes:
Level: 99
Owned: Crown of Dawn
Stable Ability: Meteor
Expected no level/item/ability mutation.
```

### T13 — Command leakage blocked

```text
Enter /audit.
Expected:
- no audit output in story prose
- output stored in state.worldledger.lastCommandOutput
- parser does not scan it
```

### T14 — Duplicate protected cards

```text
Create two old Player Sheet-like cards.
Run /synccards.
Expected:
- no third Player Sheet
- duplicate warning
- safe adoption/neutralization plan
```

### T15 — Stress

```text
Run 50–100 normal outputs with many mentions.
Expected:
- no card explosion
- protected cards update
- generated cards rare
- budgets respected
- no broad triggers
```

## Final V1.1 gate

V1.1 is not accepted unless:

```text
/releasecheck PASS
/cardaudit PASS
/player profile test PASS
/card UX test PASS
generated card test PASS
manual edit test PASS
command hook test PASS
baseline V1.0 safety tests PASS
```
