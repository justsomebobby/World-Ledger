# AIDRPG v1.3.8 Player-Breaker Test Feedback

Generated: 2026-04-27T22:11:09.883Z

## Tested artifact

- Script: `/mnt/data/aidrpgv1-3-8.txt`
- Observed runtime: `AIDRPG VERSION 1.3.8-production`; `BUILD_STAGE AIDRPG-v1.3.8-final-release`
- Source hook shape: AI Dungeon-style `onInput`, `onContext`, and `onOutput` hooks were present.

## Executive result

- Total recorded test rows: **343**
- Passed: **343**
- Failed: **0**
- Highest observed hook duration: **264 ms**
- Result: **No failures found in these runs.** This does not prove the script is impossible to break; it means this tester set did not reproduce a current defect.

## Exact commands run

- `node selftest.js`
- `node runner14.js --preset smoke --limit 10 --script /mnt/data/aidrpgv1-3-8.txt --isolated --include-passed --out /mnt/data/reports_138_smoke_isolated`
- `node runner14.js --preset standard --script /mnt/data/aidrpgv1-3-8.txt --include-passed --out /mnt/data/reports_138_standard --progress-every 25`
- `node runner14.js --preset adversarial --script /mnt/data/aidrpgv1-3-8.txt --include-passed --out /mnt/data/reports_138_adv_direct --progress-every 1`
- `node runner.js --suite smoke --limit 20 --script /mnt/data/aidrpgv1-3-8.txt --include-passed`

## Suite summaries

| Suite | Total | Passed | Failed | Max Hook ms |
|---|---:|---:|---:|---:|
| selftest | 3 | 3 | 0 |  |
| runner14-smoke-isolated | 10 | 10 | 0 | 124 |
| runner14-standard-direct | 256 | 256 | 0 | 264 |
| runner14-adversarial-direct | 67 | 67 | 0 | 224 |
| official-smoke | 9 | 9 | 0 |  |

## Category summaries

### selftest

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| selftest | 3 | 3 | 0 |

### runner14-smoke-isolated

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| smoke-loop | 1 | 1 | 0 |
| input-only | 6 | 6 | 0 |
| confirmed-inventory | 3 | 3 | 0 |

### runner14-standard-direct

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| smoke-loop | 1 | 1 | 0 |
| input-only | 6 | 6 | 0 |
| confirmed-inventory | 30 | 30 | 0 |
| inventory-denial | 36 | 36 | 0 |
| delayed-confirmation | 4 | 4 | 0 |
| dialogue-instruction | 55 | 55 | 0 |
| quest-confirm-deny | 56 | 56 | 0 |
| scene-confirm-deny | 17 | 17 | 0 |
| ability-confirm-deny | 24 | 24 | 0 |
| anime-style | 2 | 2 | 0 |
| time-confirm-deny | 3 | 3 | 0 |
| reputation | 3 | 3 | 0 |
| sword-flow | 3 | 3 | 0 |
| story-cards | 8 | 8 | 0 |
| context-pressure | 2 | 2 | 0 |
| chaotic | 5 | 5 | 0 |
| long-play | 1 | 1 | 0 |

### runner14-adversarial-direct

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| smoke-loop | 1 | 1 | 0 |
| player-breaker-inventory | 15 | 15 | 0 |
| player-breaker-ability | 6 | 6 | 0 |
| player-breaker-time | 5 | 5 | 0 |
| player-breaker-reputation | 1 | 1 | 0 |
| player-breaker-state | 1 | 1 | 0 |
| player-breaker-context | 2 | 2 | 0 |
| player-breaker-fuzz | 36 | 36 | 0 |

### official-smoke

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| smoke | 9 | 9 | 0 |

## Failures

No failures were recorded. No reproduction/fix block is available because no current defect was caught in these runs.

## Previously failing player-breaker areas now covered by passing cases

- PASS | runner14-adversarial-direct#0 | smoke-loop | runtime identity and basic commands
- PASS | runner14-adversarial-direct#1 | player-breaker-inventory | straight negation: silver dagger | output tested: You do not pick up the silver dagger; you leave it on the table.
- PASS | runner14-adversarial-direct#2 | player-breaker-inventory | never phrasing: black gate key | output tested: You never take the black gate key. The lock remains untouched.
- PASS | runner14-adversarial-direct#3 | player-breaker-inventory | almost but not: crystal orb | output tested: You almost take the crystal orb, but your fingers stop short.
- PASS | runner14-adversarial-direct#4 | player-breaker-inventory | metaphorical pickup: brass key | output tested: You pick up the idea of a brass key while reading the map, not an actual key.
- PASS | runner14-adversarial-direct#5 | player-breaker-inventory | false player claim: jeweled crown | output tested: You shout, "I picked up the jeweled crown!" but everyone can see your hands are empty.
- PASS | runner14-adversarial-direct#6 | player-breaker-inventory | written instruction: red healing potion | output tested: A sign reads: "You pick up the red healing potion." It is only an example sentence.
- PASS | runner14-adversarial-direct#7 | player-breaker-inventory | confirm then revoke: obsidian key | output tested: You pick up the obsidian key, but then it dissolves as an illusion and you have nothing.
- PASS | runner14-adversarial-direct#8 | player-breaker-inventory | quoted second person as lesson: minor healing vial | output tested: Mira says, "You pick up the minor healing vial," as a grammar lesson. Nothing changes hands.
- PASS | runner14-adversarial-direct#9 | player-breaker-inventory | repeated failure: tower shield | output tested: You try, fail, retry, fail again, and finally walk away from the tower shield.
- PASS | runner14-adversarial-direct#10 | player-breaker-inventory | clean confirm control: rusted iron key | output tested: You pick up the rusted iron key and secure it in your pouch.
- PASS | runner14-adversarial-direct#11 | player-breaker-inventory | grant only first item when second is refused | output tested: You pick up the brass key but leave the silver dagger where it is.
- PASS | runner14-adversarial-direct#12 | player-breaker-inventory | grant only handed item, not mentioned decoy | output tested: Mira refuses to give you the jeweled crown, but she hands you the red healing potion.
- PASS | runner14-adversarial-direct#13 | player-breaker-inventory | do not grant stolen-by-NPC item | output tested: You grab for the obsidian key, but the goblin snatches the obsidian key and runs away with it.
- PASS | runner14-adversarial-direct#14 | player-breaker-inventory | grant recovered item after failed decoy | output tested: You fail to take the crystal orb. After searching again, you recover the black gate key from the drawer.
- PASS | runner14-adversarial-direct#15 | player-breaker-inventory | same pickup output spam does not multiply item | output tested: You pick up the black sigil key from the altar.
- PASS | runner14-adversarial-direct#16 | player-breaker-ability | noncanonical ability wording: Crimson Lotus Fang | output tested: The scroll title says "You learned Crimson Lotus Fang," but you only read the title and learn nothing.
- PASS | runner14-adversarial-direct#17 | player-breaker-ability | noncanonical ability wording: Void Lantern Veil | output tested: You attempt Void Lantern Veil; the veil collapses, and no usable technique remains.
- PASS | runner14-adversarial-direct#18 | player-breaker-ability | noncanonical ability wording: Hollow Star Palm | output tested: Mira says, "Use Hollow Star Palm now," but you do not know that technique.
- PASS | runner14-adversarial-direct#19 | player-breaker-ability | noncanonical ability wording: Azure Dragon Step | output tested: You pretend to use Azure Dragon Step while telling a joke.
- PASS | runner14-adversarial-direct#20 | player-breaker-ability | confirmed ability wording: Iron Root Stance | output tested: Iron Root Stance takes hold as a stable defensive posture you can repeat.
- PASS | runner14-adversarial-direct#21 | player-breaker-ability | repeated same ability use does not spawn many duplicate records | output tested: Ember Ward forms around you again as the same practiced ward.
- PASS | runner14-adversarial-direct#22 | player-breaker-time | quoted time skip does not age | output tested: You, Kaelen, a 19 year old human adventurer, wake in the inn.
- PASS | runner14-adversarial-direct#23 | player-breaker-time | dream time skip does not age | output tested: You, Kaelen, a 19 year old human adventurer, wake in the inn.
- PASS | runner14-adversarial-direct#24 | player-breaker-time | almost death does not kill | output tested: You, Kaelen, a 19 year old human adventurer, wake in the inn.
- PASS | runner14-adversarial-direct#25 | player-breaker-time | rumored death does not kill | output tested: You, Kaelen, a 19 year old human adventurer, wake in the inn.
- PASS | runner14-adversarial-direct#26 | player-breaker-time | unsupported route rewrite creates contradiction or preserves base | output tested: The trip from Greybridge to Stoneford takes 2 hours.
- PASS | runner14-adversarial-direct#27 | player-breaker-reputation | sarcastic private brag does not create public hero reputation | output tested: Alone in your room, you sarcastically say, "Everyone praises me as the hero of Greybridge," but nobody hears you.
- PASS | runner14-adversarial-direct#28 | player-breaker-state | corrupted state containers are repaired without crash | output tested: You look around and recover your bearings.
- PASS | runner14-adversarial-direct#29 | player-breaker-context | small maxChars context remains bounded | output tested: You pick up the obsidian lantern from the shrine.
- PASS | runner14-adversarial-direct#30 | player-breaker-context | very long adversarial no-grant text does not time out or grant bait item | output tested: Line 0: you do not take the platinum dragon crown; this is only a rumor, quote, dream, joke, or instruction. Line 1: you do not take the platinum dragon crown;…

## Full pass/fail manifest

| ID | Suite | Category | Result | Max ms | Test name |
|---|---|---|---|---:|---|
| selftest#0 | selftest | selftest | PASS |  | Tester internal selftest |
| runner14-smoke-isolated#0 | runner14-smoke-isolated | smoke-loop | PASS | 21 | runtime identity and basic commands |
| runner14-smoke-isolated#1 | runner14-smoke-isolated | input-only | PASS | 16 | input-only pickup does not grant rusted iron key |
| runner14-smoke-isolated#2 | runner14-smoke-isolated | input-only | PASS | 15 | input-only pickup does not grant obsidian key |
| runner14-smoke-isolated#3 | runner14-smoke-isolated | input-only | PASS | 4 | input-only pickup does not grant silver dagger |
| runner14-smoke-isolated#4 | runner14-smoke-isolated | input-only | PASS | 4 | input-only pickup does not grant red healing potion |
| runner14-smoke-isolated#5 | runner14-smoke-isolated | input-only | PASS | 3 | input-only pickup does not grant black gate key |
| runner14-smoke-isolated#6 | runner14-smoke-isolated | input-only | PASS | 4 | input-only pickup does not grant jeweled crown |
| runner14-smoke-isolated#7 | runner14-smoke-isolated | confirmed-inventory | PASS | 124 | confirmed pick up grants exactly one rusted iron key |
| runner14-smoke-isolated#8 | runner14-smoke-isolated | confirmed-inventory | PASS | 36 | confirmed take grants exactly one rusted iron key |
| runner14-smoke-isolated#9 | runner14-smoke-isolated | confirmed-inventory | PASS | 7 | confirmed grab grants exactly one rusted iron key |
| runner14-standard-direct#0 | runner14-standard-direct | smoke-loop | PASS | 24 | runtime identity and basic commands |
| runner14-standard-direct#1 | runner14-standard-direct | input-only | PASS | 15 | input-only pickup does not grant rusted iron key |
| runner14-standard-direct#2 | runner14-standard-direct | input-only | PASS | 9 | input-only pickup does not grant obsidian key |
| runner14-standard-direct#3 | runner14-standard-direct | input-only | PASS | 4 | input-only pickup does not grant silver dagger |
| runner14-standard-direct#4 | runner14-standard-direct | input-only | PASS | 3 | input-only pickup does not grant red healing potion |
| runner14-standard-direct#5 | runner14-standard-direct | input-only | PASS | 3 | input-only pickup does not grant black gate key |
| runner14-standard-direct#6 | runner14-standard-direct | input-only | PASS | 3 | input-only pickup does not grant jeweled crown |
| runner14-standard-direct#7 | runner14-standard-direct | confirmed-inventory | PASS | 113 | confirmed pick up grants exactly one rusted iron key |
| runner14-standard-direct#8 | runner14-standard-direct | confirmed-inventory | PASS | 33 | confirmed take grants exactly one rusted iron key |
| runner14-standard-direct#9 | runner14-standard-direct | confirmed-inventory | PASS | 7 | confirmed grab grants exactly one rusted iron key |
| runner14-standard-direct#10 | runner14-standard-direct | confirmed-inventory | PASS | 264 | confirmed pocket grants exactly one rusted iron key |
| runner14-standard-direct#11 | runner14-standard-direct | confirmed-inventory | PASS | 99 | confirmed retrieve grants exactly one rusted iron key |
| runner14-standard-direct#12 | runner14-standard-direct | confirmed-inventory | PASS | 9 | confirmed pick up grants exactly one obsidian key |
| runner14-standard-direct#13 | runner14-standard-direct | confirmed-inventory | PASS | 8 | confirmed take grants exactly one obsidian key |
| runner14-standard-direct#14 | runner14-standard-direct | confirmed-inventory | PASS | 5 | confirmed grab grants exactly one obsidian key |
| runner14-standard-direct#15 | runner14-standard-direct | confirmed-inventory | PASS | 24 | confirmed pocket grants exactly one obsidian key |
| runner14-standard-direct#16 | runner14-standard-direct | confirmed-inventory | PASS | 23 | confirmed retrieve grants exactly one obsidian key |
| runner14-standard-direct#17 | runner14-standard-direct | confirmed-inventory | PASS | 8 | confirmed pick up grants exactly one silver dagger |
| runner14-standard-direct#18 | runner14-standard-direct | confirmed-inventory | PASS | 7 | confirmed take grants exactly one silver dagger |
| runner14-standard-direct#19 | runner14-standard-direct | confirmed-inventory | PASS | 5 | confirmed grab grants exactly one silver dagger |
| runner14-standard-direct#20 | runner14-standard-direct | confirmed-inventory | PASS | 21 | confirmed pocket grants exactly one silver dagger |
| runner14-standard-direct#21 | runner14-standard-direct | confirmed-inventory | PASS | 21 | confirmed retrieve grants exactly one silver dagger |
| runner14-standard-direct#22 | runner14-standard-direct | confirmed-inventory | PASS | 10 | confirmed pick up grants exactly one red healing potion |
| runner14-standard-direct#23 | runner14-standard-direct | confirmed-inventory | PASS | 8 | confirmed take grants exactly one red healing potion |
| runner14-standard-direct#24 | runner14-standard-direct | confirmed-inventory | PASS | 5 | confirmed grab grants exactly one red healing potion |
| runner14-standard-direct#25 | runner14-standard-direct | confirmed-inventory | PASS | 19 | confirmed pocket grants exactly one red healing potion |
| runner14-standard-direct#26 | runner14-standard-direct | confirmed-inventory | PASS | 19 | confirmed retrieve grants exactly one red healing potion |
| runner14-standard-direct#27 | runner14-standard-direct | confirmed-inventory | PASS | 6 | confirmed pick up grants exactly one black gate key |
| runner14-standard-direct#28 | runner14-standard-direct | confirmed-inventory | PASS | 6 | confirmed take grants exactly one black gate key |
| runner14-standard-direct#29 | runner14-standard-direct | confirmed-inventory | PASS | 5 | confirmed grab grants exactly one black gate key |
| runner14-standard-direct#30 | runner14-standard-direct | confirmed-inventory | PASS | 27 | confirmed pocket grants exactly one black gate key |
| runner14-standard-direct#31 | runner14-standard-direct | confirmed-inventory | PASS | 19 | confirmed retrieve grants exactly one black gate key |
| runner14-standard-direct#32 | runner14-standard-direct | confirmed-inventory | PASS | 8 | confirmed pick up grants exactly one jeweled crown |
| runner14-standard-direct#33 | runner14-standard-direct | confirmed-inventory | PASS | 6 | confirmed take grants exactly one jeweled crown |
| runner14-standard-direct#34 | runner14-standard-direct | confirmed-inventory | PASS | 5 | confirmed grab grants exactly one jeweled crown |
| runner14-standard-direct#35 | runner14-standard-direct | confirmed-inventory | PASS | 19 | confirmed pocket grants exactly one jeweled crown |
| runner14-standard-direct#36 | runner14-standard-direct | confirmed-inventory | PASS | 18 | confirmed retrieve grants exactly one jeweled crown |
| runner14-standard-direct#37 | runner14-standard-direct | inventory-denial | PASS | 27 | denied pickup does not grant rusted iron key [1] |
| runner14-standard-direct#38 | runner14-standard-direct | inventory-denial | PASS | 10 | denied pickup does not grant rusted iron key [2] |
| runner14-standard-direct#39 | runner14-standard-direct | inventory-denial | PASS | 6 | denied pickup does not grant rusted iron key [3] |
| runner14-standard-direct#40 | runner14-standard-direct | inventory-denial | PASS | 18 | denied pickup does not grant rusted iron key [4] |
| runner14-standard-direct#41 | runner14-standard-direct | inventory-denial | PASS | 16 | denied pickup does not grant rusted iron key [5] |
| runner14-standard-direct#42 | runner14-standard-direct | inventory-denial | PASS | 4 | denied pickup does not grant rusted iron key [6] |
| runner14-standard-direct#43 | runner14-standard-direct | inventory-denial | PASS | 19 | denied pickup does not grant obsidian key [1] |
| runner14-standard-direct#44 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant obsidian key [2] |
| runner14-standard-direct#45 | runner14-standard-direct | inventory-denial | PASS | 6 | denied pickup does not grant obsidian key [3] |
| runner14-standard-direct#46 | runner14-standard-direct | inventory-denial | PASS | 14 | denied pickup does not grant obsidian key [4] |
| runner14-standard-direct#47 | runner14-standard-direct | inventory-denial | PASS | 14 | denied pickup does not grant obsidian key [5] |
| runner14-standard-direct#48 | runner14-standard-direct | inventory-denial | PASS | 4 | denied pickup does not grant obsidian key [6] |
| runner14-standard-direct#49 | runner14-standard-direct | inventory-denial | PASS | 16 | denied pickup does not grant silver dagger [1] |
| runner14-standard-direct#50 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant silver dagger [2] |
| runner14-standard-direct#51 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant silver dagger [3] |
| runner14-standard-direct#52 | runner14-standard-direct | inventory-denial | PASS | 15 | denied pickup does not grant silver dagger [4] |
| runner14-standard-direct#53 | runner14-standard-direct | inventory-denial | PASS | 16 | denied pickup does not grant silver dagger [5] |
| runner14-standard-direct#54 | runner14-standard-direct | inventory-denial | PASS | 20 | denied pickup does not grant silver dagger [6] |
| runner14-standard-direct#55 | runner14-standard-direct | inventory-denial | PASS | 18 | denied pickup does not grant red healing potion [1] |
| runner14-standard-direct#56 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant red healing potion [2] |
| runner14-standard-direct#57 | runner14-standard-direct | inventory-denial | PASS | 6 | denied pickup does not grant red healing potion [3] |
| runner14-standard-direct#58 | runner14-standard-direct | inventory-denial | PASS | 17 | denied pickup does not grant red healing potion [4] |
| runner14-standard-direct#59 | runner14-standard-direct | inventory-denial | PASS | 16 | denied pickup does not grant red healing potion [5] |
| runner14-standard-direct#60 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant red healing potion [6] |
| runner14-standard-direct#61 | runner14-standard-direct | inventory-denial | PASS | 16 | denied pickup does not grant black gate key [1] |
| runner14-standard-direct#62 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant black gate key [2] |
| runner14-standard-direct#63 | runner14-standard-direct | inventory-denial | PASS | 4 | denied pickup does not grant black gate key [3] |
| runner14-standard-direct#64 | runner14-standard-direct | inventory-denial | PASS | 17 | denied pickup does not grant black gate key [4] |
| runner14-standard-direct#65 | runner14-standard-direct | inventory-denial | PASS | 14 | denied pickup does not grant black gate key [5] |
| runner14-standard-direct#66 | runner14-standard-direct | inventory-denial | PASS | 4 | denied pickup does not grant black gate key [6] |
| runner14-standard-direct#67 | runner14-standard-direct | inventory-denial | PASS | 14 | denied pickup does not grant jeweled crown [1] |
| runner14-standard-direct#68 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant jeweled crown [2] |
| runner14-standard-direct#69 | runner14-standard-direct | inventory-denial | PASS | 6 | denied pickup does not grant jeweled crown [3] |
| runner14-standard-direct#70 | runner14-standard-direct | inventory-denial | PASS | 13 | denied pickup does not grant jeweled crown [4] |
| runner14-standard-direct#71 | runner14-standard-direct | inventory-denial | PASS | 11 | denied pickup does not grant jeweled crown [5] |
| runner14-standard-direct#72 | runner14-standard-direct | inventory-denial | PASS | 5 | denied pickup does not grant jeweled crown [6] |
| runner14-standard-direct#73 | runner14-standard-direct | delayed-confirmation | PASS | 13 | delayed handoff commits obsidian key only on confirm turn |
| runner14-standard-direct#74 | runner14-standard-direct | delayed-confirmation | PASS | 13 | delayed handoff commits crystal orb only on confirm turn |
| runner14-standard-direct#75 | runner14-standard-direct | delayed-confirmation | PASS | 13 | delayed handoff commits silver dagger only on confirm turn |
| runner14-standard-direct#76 | runner14-standard-direct | delayed-confirmation | PASS | 12 | delayed handoff commits black gate key only on confirm turn |
| runner14-standard-direct#77 | runner14-standard-direct | dialogue-instruction | PASS | 33 | dialogue instruction does not grant rusted iron key from Mira |
| runner14-standard-direct#78 | runner14-standard-direct | dialogue-instruction | PASS | 11 | quoted second-person pickup does not grant rusted iron key from Mira |
| runner14-standard-direct#79 | runner14-standard-direct | dialogue-instruction | PASS | 19 | dialogue instruction does not grant obsidian key from Mira |
| runner14-standard-direct#80 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant obsidian key from Mira |
| runner14-standard-direct#81 | runner14-standard-direct | dialogue-instruction | PASS | 6 | dialogue instruction does not grant silver dagger from Mira |
| runner14-standard-direct#82 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant silver dagger from Mira |
| runner14-standard-direct#83 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant red healing potion from Mira |
| runner14-standard-direct#84 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant red healing potion from Mira |
| runner14-standard-direct#85 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant black gate key from Mira |
| runner14-standard-direct#86 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant black gate key from Mira |
| runner14-standard-direct#87 | runner14-standard-direct | dialogue-instruction | PASS | 20 | dialogue instruction does not grant rusted iron key from Captain Rook |
| runner14-standard-direct#88 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant rusted iron key from Captain Rook |
| runner14-standard-direct#89 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant obsidian key from Captain Rook |
| runner14-standard-direct#90 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant obsidian key from Captain Rook |
| runner14-standard-direct#91 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant silver dagger from Captain Rook |
| runner14-standard-direct#92 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant silver dagger from Captain Rook |
| runner14-standard-direct#93 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant red healing potion from Captain Rook |
| runner14-standard-direct#94 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant red healing potion from Captain Rook |
| runner14-standard-direct#95 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant black gate key from Captain Rook |
| runner14-standard-direct#96 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant black gate key from Captain Rook |
| runner14-standard-direct#97 | runner14-standard-direct | dialogue-instruction | PASS | 19 | dialogue instruction does not grant rusted iron key from the merchant |
| runner14-standard-direct#98 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant rusted iron key from the merchant |
| runner14-standard-direct#99 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant obsidian key from the merchant |
| runner14-standard-direct#100 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant obsidian key from the merchant |
| runner14-standard-direct#101 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant silver dagger from the merchant |
| runner14-standard-direct#102 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant silver dagger from the merchant |
| runner14-standard-direct#103 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant red healing potion from the merchant |
| runner14-standard-direct#104 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant red healing potion from the merchant |
| runner14-standard-direct#105 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant black gate key from the merchant |
| runner14-standard-direct#106 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant black gate key from the merchant |
| runner14-standard-direct#107 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant rusted iron key from the goblin |
| runner14-standard-direct#108 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant rusted iron key from the goblin |
| runner14-standard-direct#109 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant obsidian key from the goblin |
| runner14-standard-direct#110 | runner14-standard-direct | dialogue-instruction | PASS | 9 | quoted second-person pickup does not grant obsidian key from the goblin |
| runner14-standard-direct#111 | runner14-standard-direct | dialogue-instruction | PASS | 17 | dialogue instruction does not grant silver dagger from the goblin |
| runner14-standard-direct#112 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant silver dagger from the goblin |
| runner14-standard-direct#113 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant red healing potion from the goblin |
| runner14-standard-direct#114 | runner14-standard-direct | dialogue-instruction | PASS | 3 | quoted second-person pickup does not grant red healing potion from the goblin |
| runner14-standard-direct#115 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant black gate key from the goblin |
| runner14-standard-direct#116 | runner14-standard-direct | dialogue-instruction | PASS | 5 | quoted second-person pickup does not grant black gate key from the goblin |
| runner14-standard-direct#117 | runner14-standard-direct | dialogue-instruction | PASS | 5 | dialogue instruction does not grant rusted iron key from Elder Vael |
| runner14-standard-direct#118 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant rusted iron key from Elder Vael |
| runner14-standard-direct#119 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant obsidian key from Elder Vael |
| runner14-standard-direct#120 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant obsidian key from Elder Vael |
| runner14-standard-direct#121 | runner14-standard-direct | dialogue-instruction | PASS | 20 | dialogue instruction does not grant silver dagger from Elder Vael |
| runner14-standard-direct#122 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant silver dagger from Elder Vael |
| runner14-standard-direct#123 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant red healing potion from Elder Vael |
| runner14-standard-direct#124 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant red healing potion from Elder Vael |
| runner14-standard-direct#125 | runner14-standard-direct | dialogue-instruction | PASS | 4 | dialogue instruction does not grant black gate key from Elder Vael |
| runner14-standard-direct#126 | runner14-standard-direct | dialogue-instruction | PASS | 4 | quoted second-person pickup does not grant black gate key from Elder Vael |
| runner14-standard-direct#127 | runner14-standard-direct | dialogue-instruction | PASS | 22 | confirmed dialogue handoff grants rusted iron key |
| runner14-standard-direct#128 | runner14-standard-direct | dialogue-instruction | PASS | 8 | confirmed dialogue handoff grants red healing potion |
| runner14-standard-direct#129 | runner14-standard-direct | dialogue-instruction | PASS | 15 | confirmed dialogue handoff grants silver dagger |
| runner14-standard-direct#130 | runner14-standard-direct | dialogue-instruction | PASS | 6 | confirmed dialogue handoff grants black gate key |
| runner14-standard-direct#131 | runner14-standard-direct | dialogue-instruction | PASS | 8 | confirmed dialogue handoff grants minor healing vial |
| runner14-standard-direct#132 | runner14-standard-direct | quest-confirm-deny | PASS | 36 | confirmed quest accept: repair the north wall |
| runner14-standard-direct#133 | runner14-standard-direct | quest-confirm-deny | PASS | 21 | confirmed quest agree to: repair the north wall |
| runner14-standard-direct#134 | runner14-standard-direct | quest-confirm-deny | PASS | 7 | confirmed quest take: repair the north wall |
| runner14-standard-direct#135 | runner14-standard-direct | quest-confirm-deny | PASS | 15 | denied quest does not activate: repair the north wall |
| runner14-standard-direct#136 | runner14-standard-direct | quest-confirm-deny | PASS | 20 | denied quest does not activate: repair the north wall |
| runner14-standard-direct#137 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: repair the north wall |
| runner14-standard-direct#138 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: repair the north wall |
| runner14-standard-direct#139 | runner14-standard-direct | quest-confirm-deny | PASS | 17 | confirmed quest accept: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#140 | runner14-standard-direct | quest-confirm-deny | PASS | 16 | confirmed quest agree to: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#141 | runner14-standard-direct | quest-confirm-deny | PASS | 8 | confirmed quest take: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#142 | runner14-standard-direct | quest-confirm-deny | PASS | 15 | denied quest does not activate: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#143 | runner14-standard-direct | quest-confirm-deny | PASS | 16 | denied quest does not activate: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#144 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#145 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: escort Bram to The Drunken Huntsman |
| runner14-standard-direct#146 | runner14-standard-direct | quest-confirm-deny | PASS | 21 | confirmed quest accept: deliver the guild letter |
| runner14-standard-direct#147 | runner14-standard-direct | quest-confirm-deny | PASS | 14 | confirmed quest agree to: deliver the guild letter |
| runner14-standard-direct#148 | runner14-standard-direct | quest-confirm-deny | PASS | 10 | confirmed quest take: deliver the guild letter |
| runner14-standard-direct#149 | runner14-standard-direct | quest-confirm-deny | PASS | 54 | denied quest does not activate: deliver the guild letter |
| runner14-standard-direct#150 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | denied quest does not activate: deliver the guild letter |
| runner14-standard-direct#151 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: deliver the guild letter |
| runner14-standard-direct#152 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: deliver the guild letter |
| runner14-standard-direct#153 | runner14-standard-direct | quest-confirm-deny | PASS | 17 | confirmed quest accept: investigate the burned tavern |
| runner14-standard-direct#154 | runner14-standard-direct | quest-confirm-deny | PASS | 19 | confirmed quest agree to: investigate the burned tavern |
| runner14-standard-direct#155 | runner14-standard-direct | quest-confirm-deny | PASS | 7 | confirmed quest take: investigate the burned tavern |
| runner14-standard-direct#156 | runner14-standard-direct | quest-confirm-deny | PASS | 15 | denied quest does not activate: investigate the burned tavern |
| runner14-standard-direct#157 | runner14-standard-direct | quest-confirm-deny | PASS | 15 | denied quest does not activate: investigate the burned tavern |
| runner14-standard-direct#158 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: investigate the burned tavern |
| runner14-standard-direct#159 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | denied quest does not activate: investigate the burned tavern |
| runner14-standard-direct#160 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | confirmed quest accept: protect the market gate |
| runner14-standard-direct#161 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | confirmed quest agree to: protect the market gate |
| runner14-standard-direct#162 | runner14-standard-direct | quest-confirm-deny | PASS | 6 | confirmed quest take: protect the market gate |
| runner14-standard-direct#163 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | denied quest does not activate: protect the market gate |
| runner14-standard-direct#164 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: protect the market gate |
| runner14-standard-direct#165 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: protect the market gate |
| runner14-standard-direct#166 | runner14-standard-direct | quest-confirm-deny | PASS | 14 | denied quest does not activate: protect the market gate |
| runner14-standard-direct#167 | runner14-standard-direct | quest-confirm-deny | PASS | 18 | confirmed quest accept: recover the sun relic |
| runner14-standard-direct#168 | runner14-standard-direct | quest-confirm-deny | PASS | 15 | confirmed quest agree to: recover the sun relic |
| runner14-standard-direct#169 | runner14-standard-direct | quest-confirm-deny | PASS | 9 | confirmed quest take: recover the sun relic |
| runner14-standard-direct#170 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | denied quest does not activate: recover the sun relic |
| runner14-standard-direct#171 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: recover the sun relic |
| runner14-standard-direct#172 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: recover the sun relic |
| runner14-standard-direct#173 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: recover the sun relic |
| runner14-standard-direct#174 | runner14-standard-direct | quest-confirm-deny | PASS | 14 | confirmed quest accept: clear the old barrow |
| runner14-standard-direct#175 | runner14-standard-direct | quest-confirm-deny | PASS | 14 | confirmed quest agree to: clear the old barrow |
| runner14-standard-direct#176 | runner14-standard-direct | quest-confirm-deny | PASS | 8 | confirmed quest take: clear the old barrow |
| runner14-standard-direct#177 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: clear the old barrow |
| runner14-standard-direct#178 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: clear the old barrow |
| runner14-standard-direct#179 | runner14-standard-direct | quest-confirm-deny | PASS | 17 | denied quest does not activate: clear the old barrow |
| runner14-standard-direct#180 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: clear the old barrow |
| runner14-standard-direct#181 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | confirmed quest accept: find the missing apprentice |
| runner14-standard-direct#182 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | confirmed quest agree to: find the missing apprentice |
| runner14-standard-direct#183 | runner14-standard-direct | quest-confirm-deny | PASS | 8 | confirmed quest take: find the missing apprentice |
| runner14-standard-direct#184 | runner14-standard-direct | quest-confirm-deny | PASS | 12 | denied quest does not activate: find the missing apprentice |
| runner14-standard-direct#185 | runner14-standard-direct | quest-confirm-deny | PASS | 13 | denied quest does not activate: find the missing apprentice |
| runner14-standard-direct#186 | runner14-standard-direct | quest-confirm-deny | PASS | 10 | denied quest does not activate: find the missing apprentice |
| runner14-standard-direct#187 | runner14-standard-direct | quest-confirm-deny | PASS | 11 | denied quest does not activate: find the missing apprentice |
| runner14-standard-direct#188 | runner14-standard-direct | scene-confirm-deny | PASS | 16 | confirmed scene entry: Sun Palace |
| runner14-standard-direct#189 | runner14-standard-direct | scene-confirm-deny | PASS | 23 | blocked scene entry does not enter: Sun Palace |
| runner14-standard-direct#190 | runner14-standard-direct | scene-confirm-deny | PASS | 15 | confirmed scene entry: The Drunken Huntsman |
| runner14-standard-direct#191 | runner14-standard-direct | scene-confirm-deny | PASS | 17 | blocked scene entry does not enter: The Drunken Huntsman |
| runner14-standard-direct#192 | runner14-standard-direct | scene-confirm-deny | PASS | 13 | confirmed scene entry: The Silver Hart |
| runner14-standard-direct#193 | runner14-standard-direct | scene-confirm-deny | PASS | 12 | blocked scene entry does not enter: The Silver Hart |
| runner14-standard-direct#194 | runner14-standard-direct | scene-confirm-deny | PASS | 11 | confirmed scene entry: smithy forge room |
| runner14-standard-direct#195 | runner14-standard-direct | scene-confirm-deny | PASS | 14 | blocked scene entry does not enter: smithy forge room |
| runner14-standard-direct#196 | runner14-standard-direct | scene-confirm-deny | PASS | 14 | confirmed scene entry: chapel nave |
| runner14-standard-direct#197 | runner14-standard-direct | scene-confirm-deny | PASS | 17 | blocked scene entry does not enter: chapel nave |
| runner14-standard-direct#198 | runner14-standard-direct | scene-confirm-deny | PASS | 12 | confirmed scene entry: barrow sanctum |
| runner14-standard-direct#199 | runner14-standard-direct | scene-confirm-deny | PASS | 13 | blocked scene entry does not enter: barrow sanctum |
| runner14-standard-direct#200 | runner14-standard-direct | scene-confirm-deny | PASS | 16 | confirmed scene entry: market gate |
| runner14-standard-direct#201 | runner14-standard-direct | scene-confirm-deny | PASS | 13 | blocked scene entry does not enter: market gate |
| runner14-standard-direct#202 | runner14-standard-direct | scene-confirm-deny | PASS | 12 | confirmed scene entry: guild hall |
| runner14-standard-direct#203 | runner14-standard-direct | scene-confirm-deny | PASS | 12 | blocked scene entry does not enter: guild hall |
| runner14-standard-direct#204 | runner14-standard-direct | scene-confirm-deny | PASS | 16 | named building outranks road after travel phrase |
| runner14-standard-direct#205 | runner14-standard-direct | ability-confirm-deny | PASS | 16 | confirmed ability stores exact name: Ember Ward |
| runner14-standard-direct#206 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Ember Ward |
| runner14-standard-direct#207 | runner14-standard-direct | ability-confirm-deny | PASS | 9 | denied ability does not store: Ember Ward |
| runner14-standard-direct#208 | runner14-standard-direct | ability-confirm-deny | PASS | 19 | confirmed ability stores exact name: Moonlit Thunder Step |
| runner14-standard-direct#209 | runner14-standard-direct | ability-confirm-deny | PASS | 24 | denied ability does not store: Moonlit Thunder Step |
| runner14-standard-direct#210 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | denied ability does not store: Moonlit Thunder Step |
| runner14-standard-direct#211 | runner14-standard-direct | ability-confirm-deny | PASS | 13 | confirmed ability stores exact name: Crimson Lotus Fang |
| runner14-standard-direct#212 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | denied ability does not store: Crimson Lotus Fang |
| runner14-standard-direct#213 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | denied ability does not store: Crimson Lotus Fang |
| runner14-standard-direct#214 | runner14-standard-direct | ability-confirm-deny | PASS | 13 | confirmed ability stores exact name: Azure Dragon Step |
| runner14-standard-direct#215 | runner14-standard-direct | ability-confirm-deny | PASS | 13 | denied ability does not store: Azure Dragon Step |
| runner14-standard-direct#216 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Azure Dragon Step |
| runner14-standard-direct#217 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | confirmed ability stores exact name: Hollow Star Palm |
| runner14-standard-direct#218 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | denied ability does not store: Hollow Star Palm |
| runner14-standard-direct#219 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Hollow Star Palm |
| runner14-standard-direct#220 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | confirmed ability stores exact name: Iron Root Stance |
| runner14-standard-direct#221 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | denied ability does not store: Iron Root Stance |
| runner14-standard-direct#222 | runner14-standard-direct | ability-confirm-deny | PASS | 13 | denied ability does not store: Iron Root Stance |
| runner14-standard-direct#223 | runner14-standard-direct | ability-confirm-deny | PASS | 14 | confirmed ability stores exact name: Glass Petal Cut |
| runner14-standard-direct#224 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Glass Petal Cut |
| runner14-standard-direct#225 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Glass Petal Cut |
| runner14-standard-direct#226 | runner14-standard-direct | ability-confirm-deny | PASS | 17 | confirmed ability stores exact name: Void Lantern Veil |
| runner14-standard-direct#227 | runner14-standard-direct | ability-confirm-deny | PASS | 13 | denied ability does not store: Void Lantern Veil |
| runner14-standard-direct#228 | runner14-standard-direct | ability-confirm-deny | PASS | 12 | denied ability does not store: Void Lantern Veil |
| runner14-standard-direct#229 | runner14-standard-direct | anime-style | PASS | 23 | anime named technique identity survives adaptation |
| runner14-standard-direct#230 | runner14-standard-direct | anime-style | PASS | 7 | Ember Ward low dome stays application, not Low Dome skill |
| runner14-standard-direct#231 | runner14-standard-direct | time-confirm-deny | PASS | 15 | denied long sleep does not age player |
| runner14-standard-direct#232 | runner14-standard-direct | time-confirm-deny | PASS | 13 | confirmed twenty-year time skip ages player once |
| runner14-standard-direct#233 | runner14-standard-direct | time-confirm-deny | PASS | 6 | route base and weather delay persist |
| runner14-standard-direct#234 | runner14-standard-direct | reputation | PASS | 19 | public positive deed creates positive reputation |
| runner14-standard-direct#235 | runner14-standard-direct | reputation | PASS | 14 | secret deed does not create public reputation |
| runner14-standard-direct#236 | runner14-standard-direct | reputation | PASS | 14 | negative rumor creates negative/blame reputation |
| runner14-standard-direct#237 | runner14-standard-direct | sword-flow | PASS | 25 | pickup/equip/use/throw/recover sword does not duplicate |
| runner14-standard-direct#238 | runner14-standard-direct | sword-flow | PASS | 12 | confirmed stolen sword is removed or unequipped/lost |
| runner14-standard-direct#239 | runner14-standard-direct | sword-flow | PASS | 18 | named item preserves two-word name and damage applies |
| runner14-standard-direct#240 | runner14-standard-direct | story-cards | PASS | 15 | Story Card sync repeat safety 1 |
| runner14-standard-direct#241 | runner14-standard-direct | story-cards | PASS | 15 | Story Card sync repeat safety 2 |
| runner14-standard-direct#242 | runner14-standard-direct | story-cards | PASS | 21 | Story Card sync repeat safety 3 |
| runner14-standard-direct#243 | runner14-standard-direct | story-cards | PASS | 14 | Story Card sync repeat safety 4 |
| runner14-standard-direct#244 | runner14-standard-direct | story-cards | PASS | 14 | Story Card sync repeat safety 5 |
| runner14-standard-direct#245 | runner14-standard-direct | story-cards | PASS | 13 | Story Card sync repeat safety 6 |
| runner14-standard-direct#246 | runner14-standard-direct | story-cards | PASS | 14 | Story Card sync repeat safety 7 |
| runner14-standard-direct#247 | runner14-standard-direct | story-cards | PASS | 13 | Story Card sync repeat safety 8 |
| runner14-standard-direct#248 | runner14-standard-direct | context-pressure | PASS | 7 | important item survives crowded context |
| runner14-standard-direct#249 | runner14-standard-direct | context-pressure | PASS | 6 | recent named ability survives crowded context |
| runner14-standard-direct#250 | runner14-standard-direct | chaotic | PASS | 12 | chaotic action does not create fake item: lick the cursed doorknob |
| runner14-standard-direct#251 | runner14-standard-direct | chaotic | PASS | 12 | chaotic action does not create fake item: insult the soup |
| runner14-standard-direct#252 | runner14-standard-direct | chaotic | PASS | 11 | chaotic action does not create fake item: argue with the clouds |
| runner14-standard-direct#253 | runner14-standard-direct | chaotic | PASS | 14 | chaotic action does not create fake item: cartwheel into a barrel |
| runner14-standard-direct#254 | runner14-standard-direct | chaotic | PASS | 12 | chaotic action does not create fake item: declare I own Excalibur and am level 999 |
| runner14-standard-direct#255 | runner14-standard-direct | long-play | PASS | 36 | standard mini adventure stays coherent |
| runner14-adversarial-direct#0 | runner14-adversarial-direct | smoke-loop | PASS | 20 | runtime identity and basic commands |
| runner14-adversarial-direct#1 | runner14-adversarial-direct | player-breaker-inventory | PASS | 70 | straight negation: silver dagger |
| runner14-adversarial-direct#2 | runner14-adversarial-direct | player-breaker-inventory | PASS | 63 | never phrasing: black gate key |
| runner14-adversarial-direct#3 | runner14-adversarial-direct | player-breaker-inventory | PASS | 6 | almost but not: crystal orb |
| runner14-adversarial-direct#4 | runner14-adversarial-direct | player-breaker-inventory | PASS | 19 | metaphorical pickup: brass key |
| runner14-adversarial-direct#5 | runner14-adversarial-direct | player-breaker-inventory | PASS | 224 | false player claim: jeweled crown |
| runner14-adversarial-direct#6 | runner14-adversarial-direct | player-breaker-inventory | PASS | 9 | written instruction: red healing potion |
| runner14-adversarial-direct#7 | runner14-adversarial-direct | player-breaker-inventory | PASS | 12 | confirm then revoke: obsidian key |
| runner14-adversarial-direct#8 | runner14-adversarial-direct | player-breaker-inventory | PASS | 6 | quoted second person as lesson: minor healing vial |
| runner14-adversarial-direct#9 | runner14-adversarial-direct | player-breaker-inventory | PASS | 84 | repeated failure: tower shield |
| runner14-adversarial-direct#10 | runner14-adversarial-direct | player-breaker-inventory | PASS | 15 | clean confirm control: rusted iron key |
| runner14-adversarial-direct#11 | runner14-adversarial-direct | player-breaker-inventory | PASS | 8 | grant only first item when second is refused |
| runner14-adversarial-direct#12 | runner14-adversarial-direct | player-breaker-inventory | PASS | 9 | grant only handed item, not mentioned decoy |
| runner14-adversarial-direct#13 | runner14-adversarial-direct | player-breaker-inventory | PASS | 9 | do not grant stolen-by-NPC item |
| runner14-adversarial-direct#14 | runner14-adversarial-direct | player-breaker-inventory | PASS | 11 | grant recovered item after failed decoy |
| runner14-adversarial-direct#15 | runner14-adversarial-direct | player-breaker-inventory | PASS | 19 | same pickup output spam does not multiply item |
| runner14-adversarial-direct#16 | runner14-adversarial-direct | player-breaker-ability | PASS | 33 | noncanonical ability wording: Crimson Lotus Fang |
| runner14-adversarial-direct#17 | runner14-adversarial-direct | player-breaker-ability | PASS | 25 | noncanonical ability wording: Void Lantern Veil |
| runner14-adversarial-direct#18 | runner14-adversarial-direct | player-breaker-ability | PASS | 25 | noncanonical ability wording: Hollow Star Palm |
| runner14-adversarial-direct#19 | runner14-adversarial-direct | player-breaker-ability | PASS | 23 | noncanonical ability wording: Azure Dragon Step |
| runner14-adversarial-direct#20 | runner14-adversarial-direct | player-breaker-ability | PASS | 20 | confirmed ability wording: Iron Root Stance |
| runner14-adversarial-direct#21 | runner14-adversarial-direct | player-breaker-ability | PASS | 10 | repeated same ability use does not spawn many duplicate records |
| runner14-adversarial-direct#22 | runner14-adversarial-direct | player-breaker-time | PASS | 37 | quoted time skip does not age |
| runner14-adversarial-direct#23 | runner14-adversarial-direct | player-breaker-time | PASS | 15 | dream time skip does not age |
| runner14-adversarial-direct#24 | runner14-adversarial-direct | player-breaker-time | PASS | 15 | almost death does not kill |
| runner14-adversarial-direct#25 | runner14-adversarial-direct | player-breaker-time | PASS | 19 | rumored death does not kill |
| runner14-adversarial-direct#26 | runner14-adversarial-direct | player-breaker-time | PASS | 6 | unsupported route rewrite creates contradiction or preserves base |
| runner14-adversarial-direct#27 | runner14-adversarial-direct | player-breaker-reputation | PASS | 14 | sarcastic private brag does not create public hero reputation |
| runner14-adversarial-direct#28 | runner14-adversarial-direct | player-breaker-state | PASS | 14 | corrupted state containers are repaired without crash |
| runner14-adversarial-direct#29 | runner14-adversarial-direct | player-breaker-context | PASS | 9 | small maxChars context remains bounded |
| runner14-adversarial-direct#30 | runner14-adversarial-direct | player-breaker-context | PASS | 68 | very long adversarial no-grant text does not time out or grant bait item |
| runner14-adversarial-direct#31 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 18 | deterministic inventory fuzz 1: sun badge |
| runner14-adversarial-direct#32 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 12 | deterministic inventory fuzz 2: opal ring |
| runner14-adversarial-direct#33 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 18 | deterministic inventory fuzz 3: wolf mask |
| runner14-adversarial-direct#34 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 5 | deterministic inventory fuzz 4: blue potion |
| runner14-adversarial-direct#35 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 7 | deterministic inventory fuzz 5: amber key |
| runner14-adversarial-direct#36 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 15 | deterministic inventory fuzz 6: glass coin |
| runner14-adversarial-direct#37 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 11 | deterministic inventory fuzz 7: sun badge |
| runner14-adversarial-direct#38 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 8 | deterministic inventory fuzz 8: opal ring |
| runner14-adversarial-direct#39 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 7 | deterministic inventory fuzz 9: sun badge |
| runner14-adversarial-direct#40 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 8 | deterministic inventory fuzz 10: glass coin |
| runner14-adversarial-direct#41 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 14 | deterministic inventory fuzz 11: tin whistle |
| runner14-adversarial-direct#42 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 12: amber key |
| runner14-adversarial-direct#43 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 8 | deterministic inventory fuzz 13: opal ring |
| runner14-adversarial-direct#44 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 15 | deterministic inventory fuzz 14: bone knife |
| runner14-adversarial-direct#45 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 9 | deterministic inventory fuzz 15: opal ring |
| runner14-adversarial-direct#46 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 15 | deterministic inventory fuzz 16: sun badge |
| runner14-adversarial-direct#47 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 17: amber key |
| runner14-adversarial-direct#48 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 23 | deterministic inventory fuzz 18: tin whistle |
| runner14-adversarial-direct#49 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 20 | deterministic inventory fuzz 19: amber key |
| runner14-adversarial-direct#50 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 20: sun badge |
| runner14-adversarial-direct#51 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 21: amber key |
| runner14-adversarial-direct#52 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 5 | deterministic inventory fuzz 22: glass coin |
| runner14-adversarial-direct#53 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 23: amber key |
| runner14-adversarial-direct#54 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 9 | deterministic inventory fuzz 24: sun badge |
| runner14-adversarial-direct#55 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 14 | deterministic inventory fuzz 25: amber key |
| runner14-adversarial-direct#56 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 7 | deterministic inventory fuzz 26: bone knife |
| runner14-adversarial-direct#57 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 8 | deterministic inventory fuzz 27: sun badge |
| runner14-adversarial-direct#58 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 16 | deterministic inventory fuzz 28: blue potion |
| runner14-adversarial-direct#59 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 13 | deterministic inventory fuzz 29: tin whistle |
| runner14-adversarial-direct#60 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 20 | deterministic inventory fuzz 30: bone knife |
| runner14-adversarial-direct#61 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 8 | deterministic inventory fuzz 31: glass coin |
| runner14-adversarial-direct#62 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 7 | deterministic inventory fuzz 32: tin whistle |
| runner14-adversarial-direct#63 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 12 | deterministic inventory fuzz 33: wolf mask |
| runner14-adversarial-direct#64 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 17 | deterministic inventory fuzz 34: wolf mask |
| runner14-adversarial-direct#65 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 6 | deterministic inventory fuzz 35: sun badge |
| runner14-adversarial-direct#66 | runner14-adversarial-direct | player-breaker-fuzz | PASS | 6 | deterministic inventory fuzz 36: blue potion |
| official-smoke#0 | official-smoke | smoke | PASS |  | Script loads and creates AIDRPG through input |
| official-smoke#1 | official-smoke | smoke | PASS |  | Context hook returns text |
| official-smoke#2 | official-smoke | smoke | PASS |  | Output hook runs without crashing |
| official-smoke#3 | official-smoke | smoke | PASS |  | Debug commands do not crash |
| official-smoke#4 | official-smoke | smoke | PASS |  | Smoke: AIDRPG shell loads and input hook initializes state |
| official-smoke#5 | official-smoke | smoke | PASS |  | Smoke: debug sheet command runs |
| official-smoke#6 | official-smoke | smoke | PASS |  | Smoke: debug inventory command runs |
| official-smoke#7 | official-smoke | smoke | PASS |  | Smoke: context hook returns bounded context |
| official-smoke#8 | official-smoke | smoke | PASS |  | Smoke: output hook runs without crashing |

## Raw files in this package

- `full_results_table.csv`: every row with suite, category, pass/fail, input/output excerpts, evidence, and hook-step JSON.
- `results_combined.json`: structured full results.
- `failures.json`: empty array for this run.
- `exact_commands.txt`: commands and paths.
