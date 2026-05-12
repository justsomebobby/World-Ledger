# v1.4.1 safe tester cleanup

## Fixed

- Fixed the main script-selection bug: `run_v14_all.js --script X` no longer silently falls back to `./aidrpg-script.js` for the custom runner.
- Added `--script` support to `runner.js` so official/static/generated suites can test the intended script without copying files around.
- Added central script auto-resolution so the tester works when run from the package folder, from `/mnt/data`, or with `AIDRPG_SCRIPT`.

## Added

- `aid-mimic.js`: a tiny AI Dungeon mimic runner for one-turn or JSON case-file testing.
- `runtime/ai-dungeon-mimic.js`: reusable mimic API for ChatGPT/tool-safe tests.
- `runtime/script-resolver.js`: shared script path resolver.
- `examples/mimic-case.json`: sample two-turn case.
- `CHATGPT_SAFE_USAGE.md`: quick commands and interpretation notes.

## Changed

- `runner14.js` defaults to direct bounded mode for small smoke runs; use `--isolated` for one-process-per-case mode.
- `npm test` / `node runner14.js --preset smoke --limit 10` is intentionally small and avoids the regex-heavy denial matrix by default.
- `run_v14_all.js --quick` uses smoke custom coverage and caps custom cases at 10 unless you ask for more.
- The bundled `aidrpg-script.js` is now the uploaded current `aidrpgv1-3-4` script.

## Runtime safety

- VM hook timeout defaults remain bounded.
- `require()` is blocked inside the AI Dungeon VM mock by default.
- History is capped to avoid unbounded growth in local tests.
