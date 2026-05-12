# ChatGPT-safe AIDRPG tester usage

This cleaned build avoids the repeated timeout/crash pattern from giant one-shot stress runs.
It has three entry points, all using the same AI Dungeon-shaped fake runtime:

1. `aid-mimic.js` — smallest single-turn or few-turn AI Dungeon mimic.
2. `runner14.js` — targeted play-loop assertions: input proposes; story output confirms, denies, delays, or modifies canon.
3. `run_v14_all.js` — supervised launcher that can run official suites and custom play-loop tests in sections.

## Fastest ChatGPT-safe commands

```bash
node aid-mimic.js --input "I pick up the rusted iron key." --output "You pick up the rusted iron key."
node runner14.js --preset smoke --limit 10
node runner14.js --category inventory-denial --limit 1 --isolated --case-timeout-ms 6000
node run_v14_all.js --quick --no-official --custom-timeout-ms 60000
```

The bundled `aidrpg-script.js` has been replaced with the uploaded `aidrpgv1-3-4` script so the default path tests your current script. You can still test any other file explicitly:

```bash
node runner14.js --script /path/to/latest-script.txt --preset smoke --limit 10
node runner.js --script /path/to/latest-script.txt --suite smoke --include-passed
node run_v14_all.js --script /path/to/latest-script.txt --quick --no-official
```

## What changed from v1.4

- `run_v14_all.js --script ...` now actually passes that script to both the official runner and the custom play-loop runner.
- `runner.js` now accepts `--script`; it no longer has to rely on only `./aidrpg-script.js`.
- Script resolution is centralized in `runtime/script-resolver.js`: explicit `--script`, `AIDRPG_SCRIPT`, local `aidrpg-script.js`, then likely AIDRPG script files in the current folder, parent folder, or `/mnt/data`.
- `runner14.js` defaults to direct bounded mode for small safe smoke runs; `--isolated` is still available when you want one process per case.
- The default `smoke` preset avoids the most regex-heavy denial matrix so it is safe for ChatGPT/tool runs. Use focused one-case denial checks when needed.
- `aid-mimic.js` gives ChatGPT a tiny safe runner instead of needing to launch a full stress harness.
- The fake runtime blocks `require()` inside the VM by default to better mimic AI Dungeon's sandbox.
- History is capped by default so long-play tests do not grow without bound.

## AI Dungeon lifecycle emulated

```text
player input -> AIDRPG.onInput(text)
context request -> AIDRPG.onContext(text)
model/story output -> AIDRPG.onOutput(text)
```

It provides `state`, `history`, `storyCards`, `info`, `text`, `log/console.log`, and Story Card functions shaped like AI Dungeon:

```js
addStoryCard(keys, entry, type)        // numeric index or false on duplicate keys
updateStoryCard(index, keys, entry, type)
removeStoryCard(index)
```

## Interpreting failures

- A failed assertion means the script probably mishandled a gameplay/canon behavior.
- A hook timeout means the local tester stopped a hook that exceeded the configured VM budget.
- A process timeout means the launcher budget expired; check partial progress files before treating it as a script bug.
