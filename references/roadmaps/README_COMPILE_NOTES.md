# Mass Compile — Tests / Roadmaps / Old Versions

This ZIP intentionally has only three top-level folders:

1. `Tests`
2. `Roadmaps`
3. `Old Versions`

## Compile policy

- Uploaded ZIP packages were extracted where possible instead of being nested as duplicate wrapper archives.
- Files were deduped by exact SHA-256 content hash.
- Exact duplicate content was kept once and logged in `Roadmaps/00_PACKAGE_AUDIT/DUPLICATES_SKIPPED.csv`.
- Original input files processed are logged in `Roadmaps/00_PACKAGE_AUDIT/SOURCE_INPUTS_PROCESSED.csv`.
- Extracted archive inventory is logged in `Roadmaps/00_PACKAGE_AUDIT/ARCHIVES_EXTRACTED.csv`.

## Category meaning

- `Tests`: audits, probes, smoke results, harness reports, regression materials, test corpora.
- `Roadmaps`: roadmaps, plans, source maps, build-control authority, design specs, package audit.
- `Old Versions`: AIDRPG and WorldLedger script/source versions and old implementation references.

Generated helper chunk ZIPs from earlier splitting tasks were excluded to avoid carrying artificial copies of source text.
