# WorldLedger 10.0A-R3D Source Map

## Build identity

- Build version: `clean-core-build-10-0a-r3d-effort-reward-xp-calibration`
- Build stage: `Build 10.0A-R3D — Effort Reward / XP Calibration`
- Status: `BUILD_PHASE_ONLY_NOT_RELEASE`

## New/changed owner sections

- `WL.FeatureDefaults`
  - Adds `effortReward100AR3DEnabled`.

- `WL.Schema.root()`
  - Adds `effortRewards` default bucket.

- `WL.EventScanner`
  - Adds `detectEffortRewardCandidates` as the only scanner entry point for R3D.
  - Emits `progression/xp_candidate` proposals only.

- `WL.EffortRewardResolver`
  - New single owner policy for organic effort classification.
  - Does not mutate XP directly.
  - Records applied effort summaries only after `ProgressionFormulaSystem` applies accepted XP.

- `WL.ProgressionFormulaSystem.applyXp`
  - Records R3D effort reward audit entries after XP is applied through the existing progression owner.

- `WL.ProgressionSystem.apply`
  - Removed unreachable legacy direct mutation block after the dispatch return.

- `WL.CommandRenderer`
  - Adds `/build100ar3dcheck`, `/effortrewardcheck`, `/xpeffortcheck`, `/effortrewards`.

- `WL.EffortReward100AR3DSelfTest`
  - Adds R3D self-test rows for training, combat, study, summon-command contribution, varied story leveling, anti-farm protection, debug denial, and init/default agreement.

## Boundaries

- No new reducer authority.
- No direct parser XP grants.
- No card/context/command XP grants.
- No world/card/lore/inventory behavior change.
- No hook wrapper.
