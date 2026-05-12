# AI Review Package

Use this to ask ChatGPT for patch guidance. Focus on high severity and avoid whole-library rewrites.

Suite: ai-dungeon-final
Cases tested: 8
Failures: 1

## ContextPacketSystem / InventorySystem (1 failures)
### Final compatibility / output memory timing does not assume same-action memory effect
Roadmap maturity: CURRENT_BLOCKER
Reproduction:
- input: "I search the fallen acolyte for the black sigil key."
- output: "You find a black sigil key and put it in your pouch."
- context: "The sealed door waits ahead."
Failed assertions:
- Assertion failed: lastReturnContainsAny | expected: ["key","sigil","pouch","inventory"] | actual: "Current truth:\nScene: unknown place | Type: unknown\nPlayer: Lvl 1 | human | HP 100/100 | MP 20/20 | EP 50/50 | Cond: none | Outfit: unspecified\nTime: Day 1 | 08:05\n\nThe sealed door waits ahead."
