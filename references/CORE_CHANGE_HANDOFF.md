# Core Change Handoff

## Main intent

This resource package is arranged around the idea that the next changes are not isolated side patches. They are meant to affect the WorldLedger clean core through the approved architecture:

scanner -> proposal -> validator -> reducer -> ledger -> dirty -> context/cards

That means economy, contracts, domain, social consequence, card candidate, graph, and roadmap work should be treated as core-system integration work, not loose add-ons.

## Active control rule

The Build Control document remains the authority. It says the clean rebuild must use one input hook, one context hook, one output hook, one runtime pipeline, one scanner, one proposal builder, one validator, one reducer registry, one operation ledger, one context budgeter, one card renderer, one card sync, and one acceptance suite.

## Current active planning layer

The roadmap/backlog files represent current planned follow-on work. They should be read as forward planning and sequencing, not as already-complete release claims.

## Current core target layer

Build 9.6B2 is placed under current core targets because it moves economy/services/wages/debt into reducer-owned economy records. It should be reviewed as a core ownership integration point.

## Non-ignored references

Older WorldLedger/AIDRPG files are preserved as salvage, history, or regression material. They are not discarded, but they are explicitly separated so they do not accidentally become the active base.

## Do-not-base warning

Rejected or failure builds are retained only for evidence and regression design. They are not to be used as the base for new implementation work.
