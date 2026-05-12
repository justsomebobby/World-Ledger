# WorldLedger Current Planning Resource — Organized + Deduped

This ZIP is a planning/resource package for the current WorldLedger clean-core work.

## How to use it

Start here:
1. `01_PLANNING_CONTROL_AND_ROADMAPS/WorldLedger_Clean_Core_Build_Control.docx`
2. `02_CURRENT_SOURCE_CANDIDATES/FinalWLCore.txt`
3. `02_CURRENT_SOURCE_CANDIDATES/WorldLedger_CleanCore_Build9_2_FinalCandidate.txt`
4. `04_V1_1_SALVAGE_REFERENCE/WorldLedgerV1.1.19.txt`
5. `05_REJECTED_DO_NOT_USE_AS_BASE/WorldLedgerV1.2.0.txt`

## Organization

- `01_PLANNING_CONTROL_AND_ROADMAPS` — build-control, roadmap, backlog, salvage/integration planning.
- `02_CURRENT_SOURCE_CANDIDATES` — current/latest candidate source files.
- `03_CLEAN_CORE_BUILD_HISTORY` — clean-core phase/build history and hardening files.
- `04_V1_1_SALVAGE_REFERENCE` — V1.1.x salvage/reference sources.
- `05_REJECTED_DO_NOT_USE_AS_BASE` — rejected/failure reference files only.
- `07_TEST_REGRESSION_RESOURCES` — tester maps, old test results, planning/test packages.
- `08_EXTRACTED_UPLOAD_ARCHIVES` — contents extracted from uploaded ZIP archives.
- `99_MANIFESTS` — exact included-file list, skipped duplicates, archive inventory, and source upload hashes.

## Deduping rule

Exact duplicate file content was included once by SHA-256 hash. Skipped duplicates are listed in:
`99_MANIFESTS/DUPLICATES_SKIPPED.csv`

Uploaded ZIP archives were unpacked into folders instead of nested as raw ZIPs, so the resource is easier to browse and avoids duplicate bundled copies. Original archive hashes and extraction status are listed in:
`99_MANIFESTS/ORIGINAL_ARCHIVE_INVENTORY.csv`
