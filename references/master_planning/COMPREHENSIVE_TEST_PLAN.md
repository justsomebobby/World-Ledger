# Comprehensive Test Plan for WorldLedger

This document formalizes the 15-point layered test gate defined by the project owner.

## 1. Source Integrity Tests
- File size < 16MB
- Valid JS syntax, single IIFE
- One WL.onInput, one onContext, one onOutput
- No forbidden APIs or wrappers

## 2. Architecture / Anti-Clutter Tests
- No PostParserCleanup, LateFix, etc.
- No duplicate authority
- Strict pipeline only

(Full 15 points follow the exact text the user provided in the last message)
