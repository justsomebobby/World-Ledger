# AIDRPG Whole-System Tester Starter

This is the first usable build of your local AIDRPG tester.

It does **not** automate the live AI Dungeon website. It runs your AI Dungeon-style script locally, sends it fake player inputs and fake AI outputs, checks state/debug/context behavior, and writes a repair report.

## What this starter can do now

- Load `aidrpg-script.js`
- Create fake AI Dungeon globals: `state`, `info`, `history`, `storyCards`, `memory`, `text`, `stop`
- Mock Story Card functions: `addStoryCard`, `updateStoryCard`, `removeStoryCard`
- Run `AIDRPG.onInput(text)`
- Run `AIDRPG.onContext(text)`
- Run `AIDRPG.onOutput(text)`
- Run smoke/core/intent/basic integration tests
- Generate starter inventory stress variations
- Write Markdown and JSON reports
- Group failures and show state diffs

## Chromebook setup

1. Turn on Linux on your Chromebook:

   Settings → About ChromeOS → Developers → Linux development environment → Set up

2. Open the Linux Terminal.

3. Install Node.js:

```bash
sudo apt update
sudo apt install -y nodejs npm
node -v
npm -v
```

4. Unzip this folder and open it:

```bash
cd aidrpg-tester-starter
```

5. Put your latest full AIDRPG script into:

```text
aidrpg-script.js
```

This starter already includes the uploaded `Chunk1-22(3).txt` as `aidrpg-script.js`, but replace it whenever you have a newer chunk.

6. Run the smoke test:

```bash
node runner.js --suite smoke
```

7. Open the report:

```bash
cat reports/latest-report.md
```

## Useful commands

```bash
node runner.js --suite smoke
node runner.js --suite core
node runner.js --suite intent
node runner.js --suite inventory --limit 50
node runner.js --suite integration
node runner.js --suite all --limit 200
node runner.js --rerun-failures
```

## What to paste back into ChatGPT

After a run, paste:

```text
reports/latest-report.md
```

or, for a shorter patch request:

```text
reports/ai-review-package.md
```

Then ask:

> Patch the AIDRPG script based on this tester report. Focus only on the highest severity failures and avoid whole-library rewrites.

## Important expectation

This starter is Phase 1. It proves the local test loop works. The later phases add deeper inventory verification, exact resolver tracing, full state path assertions, and more system-specific tests.
