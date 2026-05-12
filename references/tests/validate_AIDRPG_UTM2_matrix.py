#!/usr/bin/env python3
import json, sys, os
from collections import Counter, defaultdict

def load_cases(path):
    if path.endswith(".jsonl"):
        with open(path, "r", encoding="utf-8") as f:
            return [json.loads(line) for line in f if line.strip()]
    with open(path, "r", encoding="utf-8") as f:
        obj = json.load(f)
    return obj.get("cases", obj if isinstance(obj, list) else [])

def validate(cases):
    problems = []
    ids = [r.get("test_id") for r in cases]
    dupes = [k for k, v in Counter(ids).items() if v > 1]
    if dupes:
        problems.append(f"duplicate test IDs: {dupes[:10]}")
    required = ["test_id","category_code","scenario_genre","choice_group","fixture_id",
                "player_input","simulated_ai_output","checks","shard_id",
                "recommended_timeout_ms","run_mode"]
    for r in cases:
        tid = r.get("test_id", "<missing>")
        for key in required:
            if key not in r or r[key] in ("", None, []):
                problems.append(f"{tid}: missing or empty {key}")
        if not isinstance(r.get("checks"), list) or not r.get("checks"):
            problems.append(f"{tid}: checks must be a non-empty list")
        else:
            for i, chk in enumerate(r["checks"]):
                if not isinstance(chk, dict) or not chk.get("selector") or not chk.get("op"):
                    problems.append(f"{tid}: bad check at index {i}: {chk!r}")
        if int(r.get("recommended_timeout_ms", 0) or 0) > 1800:
            problems.append(f"{tid}: timeout exceeds safe budget")
    shards = defaultdict(int)
    for r in cases:
        shards[r.get("shard_id")] += 1
    for sid, count in shards.items():
        if count > 60:
            problems.append(f"{sid}: too many cases for ChatGPT-safe shard ({count})")
    return problems, shards

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "AIDRPG_Ultimate_Functional_Test_Matrix_v2.jsonl"
    cases = load_cases(path)
    problems, shards = validate(cases)
    print(f"cases={len(cases)} shards={len(shards)} max_shard_size={max(shards.values()) if shards else 0}")
    if problems:
        print("VALIDATION FAILED")
        for p in problems[:200]:
            print("-", p)
        sys.exit(1)
    print("VALIDATION PASSED")

if __name__ == "__main__":
    main()
