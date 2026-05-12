# 03 — Generated Card Eligibility Rules

## Purpose

Generated cards must be meaningful and rare.

V1.0.0 proved that live card writing works, but generated cards can become ugly, too eager, or meaningless. V1.1 must add a native `GeneratedCardPolicy` that decides what deserves an individual Story Card.

Protected summary cards are always maintained. Individual generated cards require promotion.

## Owner module

Add or replace:

```js
WL.GeneratedCardPolicy = {
  classifyCandidate(root, family, record) {},
  scoreCandidate(root, family, record) {},
  isJunkName(family, name) {},
  isBroadTrigger(trigger) {},
  buildTriggers(family, record) {},
  decide(root, family, record) {},
  shouldCreate(root, family, record) {},
  shouldUpdate(root, family, record) {},
  tombstoneRejected(root, family, key, reason) {},
  inspect(root) {},
  runV11GeneratedCardTests() {}
};
```

## Decision states

```text
ACCEPT — write/update generated card now.
PENDING — keep in state/summary, no individual card yet.
REJECT — do not create card; may remain as summary or ordinary state.
HARD_DENY — never create this generated card unless manually overridden.
```

## Required gates before generated card creation

A generated candidate must pass all required gates:

1. stable canonical ID exists
2. family is known
3. display name is safe
4. not junk/scenery/generic role
5. not broad-trigger-only
6. importance score passes threshold
7. not duplicate of existing managed card
8. not tombstoned
9. write budget available
10. source state supports the card
11. renderer exists

## Default budgets

```js
generatedCardCreatesPerTurn: 1
generatedCardUpdatesPerTurn: 4
protectedCardUpdatesPerTurn: 8
cardScanBudget: 20
cardCleanupBudget: 5
```

Protected cards always outrank generated cards.

## Importance scoring

Start at 0.

Add:

```text
+3 companion / active party member
+3 active quest target
+3 stable ability
+3 owned/equipped/key item
+2 current place
+2 repeated interaction
+2 named actor with role and dialogue
+2 active faction/organization in current arc
+1 repeated mention
+1 direct player interaction
```

Subtract:

```text
-5 generic role
-5 plural generic group
-5 broad trigger
-5 one-off scenery
-5 visible-only item
-10 debug/system/internal phrase
-10 command/audit/control text
```

Thresholds:

```text
actor: score >= 5 unless companion/questgiver
place: score >= 4 if current/repeated
item: score >= 6 unless owned/equipped/quest-critical
ability: stable required, or manually pinned major candidate
quest: active/offered/contracted required
faction/group: named organization evidence required
```

## Classification examples

### Accept or pending actor

```text
Old Man Gerrik
```

If he has dialogue, a role, a quest offer, repeated interaction, or clear relevance:

```text
family: actor
status: ACCEPT or PENDING depending score
```

### Reject generic group

```text
old guards
```

Unless story treats this as a named organization, this is a generic plural scene group.

```text
family: group/generic
status: REJECT
summary: Party, Actors & Social Memory may mention it under Mentioned Groups.
individual card: no
```

### Possible faction/group

```text
The Old Guards
```

If capitalization and story context imply a named faction/group:

```text
family: faction_or_group
status: PENDING until repeated/important/named organization evidence exists
```

### Hard denied scenery

```text
road
street
door
room
wall
floor
common room
warmth
```

```text
status: HARD_DENY
```

### Visible-only item

```text
The Crown of Dawn rests on the altar.
```

```text
inventory: visible/available, not owned
individual item card: PENDING or REJECT unless acquired/quest-critical
```

### Owned/equipped item

```text
You pick up the rusty dagger.
```

```text
inventory: owned
individual generated item card: possible only if equipped, important, named, or quest-critical
```

### Failed ability

```text
You try Ember Ward, but nothing happens.
```

```text
ability summary: candidate/failed note
individual ability card: no stable card yet
```

### Stable ability

```text
After repeated training, Ember Ward finally works as a defensive ward.
```

```text
ability summary: stable if validator/reducer confirms
individual ability card: eligible
```

## Junk name deny examples

Reject generated individual cards for:

```text
guard
guards
old guards
stranger
someone
figure
voice
man
woman
person
people
crowd
villagers
workers
bandits
wolf
wolves
road
street
room
door
wall
floor
shop
market
sword
key
item
quest
magic
skill
player
you
system
debug
audit
WorldLedger
AIDRPG
```

Exception:

A generic word may be part of a specific proper name:

```text
The Black Banner Company
Crown of Dawn
Old Man Gerrik
Sturdy Oak Inn
The Old Guards, if clearly a named faction
```

## Trigger policy

Never use these as generated card triggers:

```text
WorldLedger
AIDRPG
system
debug
audit
state
context
memory
story
guard
road
room
door
sword
key
item
quest
magic
skill
player
you
```

Prefer specific triggers:

```text
Zack
Old Man Gerrik
Crown of Dawn
Sturdy Oak Inn
Ember Ward
Black Banner Company
```

## Tombstones

Rejected junk candidates should be tombstoned when appropriate so they do not get recreated every turn.

Example tombstone:

```js
{
  family: 'actor',
  canonicalKey: 'old_guards',
  reason: 'generic plural group rejected',
  createdTurn: 12,
  manualOverrideCanRestore: false
}
```

## Generated card acceptance tests

Required tests:

```text
old guards -> no actor card
The Old Guards -> faction/group pending until named organization evidence
Old Man Gerrik -> actor card after interaction/importance
road -> no place card
room -> no place card
sword -> no item card from one-off mention
Crown on altar -> visible item only, not owned item card
Rusty Dagger owned/equipped -> possible item card if important
audit text -> no card candidate
WorldLedger debug line -> no card candidate
```
