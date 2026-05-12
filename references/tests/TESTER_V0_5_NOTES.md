# AIDRPG Tester v0.5 Notes

This update tightens the tester around AI Dungeon-specific scripting behavior rather than generic JavaScript behavior.

## New AI Dungeon-specific suites

- `aid-runtime`: checks hook return shape, stop misuse, state size, storyCard count, and approximate 2-second hook timing.
- `context-pressure`: seeds crowded history and Story Cards, then checks whether immediate current truth still appears in script-generated context.
- `story-cards`: stresses duplicate/near-duplicate Story Card pressure and verifies current scene truth is not dependent only on Story Card matching.
- `npc-deep`: runs varied NPC phrasing/output tests for trust, hostility, injury, following, betrayal, fear, and merchant relationships.
- `model-style`: tests prose patterns that AI Dungeon often produces: implied item grants, dialogue/body-language relationship changes, failed attempts, and hedged/uncertain rumors.

## New assertion support

- `noStopTrue`
- `stateSizeUnderBytes`
- `storyCardCountAtMost`
- `maxHookRuntimeMs`

## Why this update matters

AI Dungeon scripts run in Input, Context, and Output hooks; output memory changes only matter on later actions; Context has limited space; Story Cards are dynamic and can be omitted; and each hook is sandboxed with memory/time limits. This tester version starts checking those actual failure modes.
