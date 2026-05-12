# AIDRPG Final AI Dungeon Stress Tester v1.3

This is the final-purpose tester package for the AIDRPG Library script.

## What this tester emulates

The tester locally runs the important AI Dungeon script flow:

```text
player input -> AIDRPG.onInput(text)
context request -> AIDRPG.onContext(text)
model/story output -> AIDRPG.onOutput(text)
state/context/debug/report inspection
```

It is designed for Library-centered AIDRPG scripts that expose:

```js
AIDRPG.onInput(text)
AIDRPG.onContext(text)
AIDRPG.onOutput(text)
```

## What was tightened in v1.3

### 1. AI Dungeon-shaped Story Card API mock

The runtime now models the documented Story Card function shape more closely:

```js
addStoryCard(keys, entry, type)        // returns numeric index or false on duplicate keys
updateStoryCard(index, keys, entry, type)
removeStoryCard(index)
```

The tester records story card operations and can flag legacy assumptions such as object/id patch calls when strict CardSync behavior is being tested.

### 2. Wrapper compatibility check

Even if the actual Input/Context/Output tabs are not uploaded, the tester simulates the standard thin wrapper shape and verifies the Library handlers return valid `{ text }` objects without `stop: true`.

### 3. Sandbox/runtime guard checks

The tester checks for obvious AI Dungeon-hostile source assumptions such as Node/browser/network APIs, oversized state, oversized context, slow hooks, and invalid hook returns.

### 4. Context timing check

The tester checks that important state learned from Output is exposed through the next Context call, rather than assuming Output memory changes affect the same model generation.

### 5. Full adventure stress flow

The adventure simulator remains included:

```text
guild quest -> travel -> dungeon -> traps -> combat -> loot -> injury/healing -> return -> payment -> shop -> sleep
```

It includes slang/casual phrasing, false positives, injuries, healing, death/failure boundary checks, economy, time, context pressure, ability training, ability hallucination rejection, and negative controls.

## Main suites

```bash
node runner.js --suite smoke --include-passed
node runner.js --suite ai-dungeon-final --generated-only --include-passed
node runner.js --suite storycard-api --generated-only --include-passed
node runner.js --suite wrapper-compat --generated-only --include-passed
node runner.js --suite sandbox-guards --generated-only --include-passed
node runner.js --suite adventure-baseline --generated-only --include-passed
node runner.js --suite adventure-stress --generated-only --limit 250
node runner.js --suite adventure-scene --generated-only --limit 80
node runner.js --suite adventure-inventory --generated-only --limit 80
node runner.js --suite adventure-injury --generated-only --limit 80
node runner.js --suite adventure-healing --generated-only --limit 80
node runner.js --suite adventure-ability --generated-only --limit 100
node runner.js --suite adventure-time --generated-only --limit 80
node runner.js --suite adventure-context-pressure --generated-only --limit 80
node runner.js --suite adventure-negative --generated-only --limit 120
node runner.js --suite adventure-death-boundary --generated-only --limit 80
```

## Recommended no-timeout workflow

Run sectioned tests instead of one huge run:

1. `smoke`
2. `ai-dungeon-final`
3. `adventure-baseline`
4. `adventure-time`
5. `adventure-ability`
6. `adventure-scene`
7. `adventure-inventory`
8. `adventure-injury`
9. `adventure-healing`
10. `adventure-negative`
11. `adventure-context-pressure`
12. `adventure-death-boundary`

This avoids long single runs and gives clearer system-by-system patch targets.

## Known boundary

This tester does not predict the exact live AI Dungeon model prose. It tests likely player/story phrasing against your actual Library script and inspects real state/context/debug behavior. It is a strong QA tool, not a perfect copy of the live service.
