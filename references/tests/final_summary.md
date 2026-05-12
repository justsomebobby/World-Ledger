# AIDRPG v1.4 Supervised Test Summary

Generated: 2026-04-27T19:31:39.840Z
Script: /mnt/data/aidrpg_tester_v141_safe/aidrpg-final-ai-dungeon-stress-tester-v1.4/aidrpg-script.js
Total completed checks: 10
Passed: 10
Failed: 0
Max observed hook duration: 62 ms

## Official suite results


## Custom AI Dungeon play-loop result

- Custom: 10/10 passed

## Interpretation rules

- Official suite failures usually indicate a broad regression.
- Custom play-loop failures target AI Dungeon canon semantics: input proposes, story output confirms/denies.
- Process timeouts are labeled as harness/runtime risk and should not be counted as script assertion failures unless a report file shows failed assertions.