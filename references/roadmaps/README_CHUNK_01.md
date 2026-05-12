# WorldLedger V1.1.0 Core Card System — Chunk 01

## Chunk identity

**Chunk name:** `WorldLedgerV1.1.0_CORE_CARD_SYSTEM_CHUNK_01_OUTCOME_LOCK`  
**Type:** planning / explanation-state / salvage classification  
**Code changes:** none  
**Purpose:** lock the intended outcome before changing the WorldLedger core.

This chunk exists so V1.1.0 does **not** repeat the earlier patch-loop failure. The next implementation work must apply fixes directly to native owners, not add a pretty-card wrapper or another late correction block.

## What this chunk creates

This package creates the explanation-state documents required before implementation:

1. `00_V1_1_Core_Card_System_Outcome_Spec.md`
2. `01_Old_AIDRPG_Card_Patch_Salvage_Map.md`
3. `02_Card_Templates_Player_Facing.md`
4. `03_Generated_Card_Eligibility_Rules.md`
5. `04_Manual_Card_Edit_and_Profile_Import_Policy.md`
6. `05_Card_Audit_and_ReleaseCheck_Gates.md`
7. `06_Chunk_01_Acceptance_Report.md`
8. `07_Source_Intake_and_GitHub_Reference_Plan.md`

## Core correction

The current WorldLedger V1.0.0 engine is alive, but the Story Card system behaves too much like an internal debug mirror.

V1.1.0 must replace that with native, player-facing RPG memory cards:

- character sheet
- body/status page
- inventory/equipment page
- abilities/training page
- quest journal
- actors/social memory
- places/time journal
- settings/audit page

The machine metadata remains, but it belongs at the bottom of cards as compact markers, not as the visible card identity.

## Non-negotiable rule

Do **not** add:

- `CardUXPatch`
- `PrettyCardWrapper`
- `FinalCardOverlay`
- `GeneratedCardCleanerLayer`
- late force flags
- failure-to-pass normalizers
- safe-mode rituals
- generated-cards-off-by-default regression

Apply changes to the core owners:

- `WL.PlayerProfile`
- `WL.CardRegistry`
- `WL.CardRenderer`
- `WL.CardSyncLite`
- `WL.GeneratedCardPolicy`
- `WL.ManagedCardEditImporter`
- `WL.CardAudit`
- `WL.ReleaseCheckLite`
- AI Dungeon Input/Context/Output tabs

## Acceptance for this chunk

This chunk is complete when the package contains the outcome spec, salvage map, card templates, generated-card rules, manual edit policy, audit/release gates, and source intake plan, with no engine behavior changed.
