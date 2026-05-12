# AIDRPG v1.1.6 Combined Progress Stage Results

Total checks: 151
Passed: 131
Failed: 20

## Section Summary
- runtime_identity: 8/8 passed (0 failed)
- commands: 18/18 passed (0 failed)
- chunk2_regression: 20/20 passed (0 failed)
- chunk3_regression: 30/30 passed (0 failed)
- chunk4_build_dominance: 19/21 passed (2 failed)
- chunk5_matchup_guard: 5/5 passed (0 failed)
- chunk6_worldstructure_core: 19/27 passed (8 failed)
- future_chunk7_expectation: 1/1 passed (0 failed)
- regression_safety: 7/7 passed (0 failed)
- worldstructure_settlement_probe: 0/7 passed (7 failed)
- worldstructure_structure_probe: 2/3 passed (1 failed)
- worldstructure_project_condition_probe: 2/4 passed (2 failed)

## Failed Checks
- [chunk4_build_dominance] magic domain build: magic style domain_caster
```json
{
  "prof": {
    "level": 1,
    "levelBand": "baseline",
    "benchmarkRole": "mage",
    "actualPrimaryStats": [
      "intl",
      "spd",
      "lck"
    ],
    "primaryStats": [
      "spd",
      "intl",
      "lck"
    ],
    "weakStats": [],
    "resourceLean": "mana_leaning",
    "combatStyle": "technical_control",
    "magicStyle": "technical_magic_potential",
    "defenseStyle": "fragile",
    "mobilityStyle": "basic_mobility",
    "domainTags": [
      "none_confirmed"
    ],
    "vulnerabilityNotes": [
      "physical_impact_danger"
    ],
    "dominanceTags": [
      "primary_spd",
      "primary_intl",
      "primary_lck",
      "technical_identity",
      "scale_baseline"
    ],
    "benchmarkGap": {
      "atk": 0,
      "def": 1,
      "spd": 3,
      "intl": 30,
      "lck": 3
    },
    "note": "Build profile preserves strengths and weaknesses; it does not decide combat outcomes by itself."
  }
}
```
- [chunk4_build_dominance] magic domain build: domain tag earth
```json
{
  "prof": {
    "level": 1,
    "levelBand": "baseline",
    "benchmarkRole": "mage",
    "actualPrimaryStats": [
      "intl",
      "spd",
      "lck"
    ],
    "primaryStats": [
      "spd",
      "intl",
      "lck"
    ],
    "weakStats": [],
    "resourceLean": "mana_leaning",
    "combatStyle": "technical_control",
    "magicStyle": "technical_magic_potential",
    "defenseStyle": "fragile",
    "mobilityStyle": "basic_mobility",
    "domainTags": [
      "none_confirmed"
    ],
    "vulnerabilityNotes": [
      "physical_impact_danger"
    ],
    "dominanceTags": [
      "primary_spd",
      "primary_intl",
      "primary_lck",
      "technical_identity",
      "scale_baseline"
    ],
    "benchmarkGap": {
      "atk": 0,
      "def": 1,
      "spd": 3,
      "intl": 30,
      "lck": 3
    },
    "note": "Build profile preserves strengths and weaknesses; it does not decide combat outcomes by itself."
  }
}
```
- [chunk6_worldstructure_core] project storage bucket exists for Chunk 6 core
```json
{
  "sKeys": [
    "schemaVersion",
    "nodesById",
    "edgesById",
    "settlementsById",
    "activeSettlementId",
    "currentNodeId",
    "recentStructureEvents",
    "contradictions",
    "dirtyNodeIds",
    "settings"
  ]
}
```
- [chunk6_worldstructure_core] assignment storage bucket exists for Chunk 6 core
```json
{
  "sKeys": [
    "schemaVersion",
    "nodesById",
    "edgesById",
    "settlementsById",
    "activeSettlementId",
    "currentNodeId",
    "recentStructureEvents",
    "contradictions",
    "dirtyNodeIds",
    "settings"
  ]
}
```
- [chunk6_worldstructure_core] contains relation stores parentId on child
```json
{
  "rows": [
    {
      "id": "ws_scene_scene_common_room",
      "name": "common room",
      "kind": "room",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": []
    },
    {
      "id": "ws_building_scene_common_room_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [
        "ws_room_ws_building_scene_common_roo_common_room"
      ],
      "relations": [
        "wse_ws_building_scene_common_room_tavern_contains_ws_room_ws_buildin"
      ]
    },
    {
      "id": "ws_room_ws_building_scene_common_roo_common_room",
      "name": "common room",
      "kind": "room",
      "parentId": "ws_building_scene_common_room_tavern",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_building_scene_common_room_tavern_contains_ws_room_ws_buildin"
      ]
    }
  ],
  "edges": [
    {
      "from": "tavern",
      "type": "contains",
      "to": "common room",
      "confidence": 0.7
    }
  ]
}
```
- [chunk6_worldstructure_core] under-construction project has project record/core bucket
```json
{
  "structure": {
    "schemaVersion": 1,
    "nodesById": {
      "ws_structure_world_palisade_wall": {
        "id": "ws_structure_world_palisade_wall",
        "name": "palisade wall",
        "kind": "structure",
        "parentId": "",
        "children": [],
        "relationIds": [],
        "conditionTags": [
          "under_construction"
        ],
        "owner": "",
        "use": "",
        "confidence": 0.75,
        "source": "structure_condition",
        "firstTurn": 1,
        "lastTurn": 1
      }
    },
    "edgesById": {},
    "settlementsById": {},
    "activeSettlementId": "",
    "currentNodeId": "",
    "recentStructureEvents": [
      {
        "turn": 1,
        "text": "Structure noted: palisade wall (structure)"
      },
      {
        "turn": 1,
        "text": "Structure condition: palisade wall under_construction"
      }
    ],
    "contradictions": [],
    "dirtyNodeIds": [
      "ws_structure_world_palisade_wall"
    ],
    "settings": {
      "maxNodes": 120,
      "maxEdges": 180
    }
  },
  "rows": [
    {
      "id": "ws_structure_world_palisade_wall",
      "name": "palisade wall",
      "kind": "structure",
      "parentId": "",
      "conditions": [
        "under_construction"
      ],
      "owner": "",
      "use": "",
      "children": [],
      "relations": []
    }
  ]
}
```
- [chunk6_worldstructure_core] direct settlement statement creates Stoneford settlement
```json
{
  "rows": [],
  "structure": {
    "schemaVersion": 1,
    "nodesById": {},
    "edgesById": {},
    "settlementsById": {},
    "activeSettlementId": "",
    "currentNodeId": "",
    "recentStructureEvents": [],
    "contradictions": [],
    "dirtyNodeIds": [],
    "settings": {
      "maxNodes": 120,
      "maxEdges": 180
    }
  },
  "village": "[AIDRPG /village]\nNodes: 0 | Edges: 0 | Active settlement: none\n"
}
```
- [chunk6_worldstructure_core] village well is structure, not active settlement
```json
{
  "rows": [
    {
      "id": "ws_location_world_market_square",
      "name": "market square",
      "kind": "location",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": []
    },
    {
      "id": "ws_settlement_world_village_well",
      "name": "village well",
      "kind": "settlement",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_"
      ]
    },
    {
      "id": "ws_location_ws_settlement_world_village__market_square",
      "name": "market square",
      "kind": "location",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_"
      ]
    }
  ],
  "structure": {
    "schemaVersion": 1,
    "nodesById": {
      "ws_location_world_market_square": {
        "id": "ws_location_world_market_square",
        "name": "market square",
        "kind": "location",
        "parentId": "",
        "children": [],
        "relationIds": [],
        "conditionTags": [],
        "owner": "",
        "use": "",
        "confidence": 0.7,
        "source": "current_scene",
        "firstTurn": 1,
        "lastTurn": 1
      },
      "ws_settlement_world_village_well": {
        "id": "ws_settlement_world_village_well",
        "name": "village well",
        "kind": "settlement",
        "parentId": "",
        "children": [],
        "relationIds": [
          "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_"
        ],
        "conditionTags": [],
        "owner": "",
        "use": "",
        "confidence": 0.65,
        "source": "layout_relation",
        "firstTurn": 1,
        "lastTurn": 1
      },
      "ws_location_ws_settlement_world_village__market_square": {
        "id": "ws_location_ws_settlement_world_village__market_square",
        "name": "market square",
        "kind": "location",
        "parentId": "",
        "children": [],
        "relationIds": [
          "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_"
        ],
        "conditionTags": [],
        "owner": "",
        "use": "",
        "confidence": 0.65,
        "source": "layout_relation",
        "firstTurn": 1,
        "lastTurn": 1
      }
    },
    "edgesById": {
      "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_": {
        "id": "wse_ws_settlement_world_village_well_near_ws_location_ws_settlement_",
        "from": "ws_settlement_world_village_well",
        "to": "ws_location_ws_settlement_world_village__market_square",
        "type": "near",
        "confidence": 0.65,
        "firstTurn": 1,
        "lastTurn": 1
      }
    },
    "settlementsById": {
      "ws_settlement_world_village_well": {
        "id": "ws_sett
```
- [chunk6_worldstructure_core] /village anchors to Stoneford rather than incidental structure
```json
{
  "village": "[AIDRPG /village]\nNodes: 5 | Edges: 2 | Active settlement: village well\nCurrent: Stoneford market square | location | parent none\nState: none\nKnown local structures: none\nRecent: Structure noted: smithy (building) | Structure noted: tavern (building) | Layout: smithy north_of tavern\n",
  "rows": [
    {
      "id": "ws_scene_scene_location_stoneford_market_square",
      "name": "Stoneford market square",
      "kind": "location",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": []
    },
    {
      "id": "ws_settlement_location_stoneford_village_well",
      "name": "village well",
      "kind": "settlement",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_settlement_location_stoneford_village_well_near_ws_location_w"
      ]
    },
    {
      "id": "ws_location_ws_settlement_location_stone_market_square",
      "name": "market square",
      "kind": "location",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_settlement_location_stoneford_village_well_near_ws_location_w"
      ]
    },
    {
      "id": "ws_building_ws_settlement_location_stone_smithy",
      "name": "smithy",
      "kind": "building",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_building_ws_settlement_location_stone_smithy_north_of_ws_buil"
      ]
    },
    {
      "id": "ws_building_ws_settlement_location_stone_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": [],
      "owner": "",
      "use": "",
      "children": [],
      "relations": [
        "wse_ws_building_ws_settlement_location_stone_smithy_north_of_ws_buil"
      ]
    }
  ],
  "structure": {
    "schemaVersion": 1,
    "nodesById": {
      "ws_scene_scene_location_stoneford_market_square": {
        "id": "ws_scene_scene_location_stoneford_market_square",
        "name": "Stoneford market square",
        "kind": "location",
        "parentId": "",
        "children": [],
        "relationIds": [],
        "conditionTags": [],
        "owner": "",
        "use": "",
        "confidence": 0.7,
        "source": "current_scene",
        "firstTurn": 1,
        "lastTurn": 1
      },
      "ws_settlement_location_stoneford_village_well": {
        "id": "ws_settlement_location_stoneford_village_well",
        "name": "village well",
        "kind": "settlement",
        "parentId": "",
        "children": [],
        "relationIds": [
          "wse_ws_settlement_location_stoneford_village_well_near_ws_location_w"
        ],
        "conditionTags": [],
        "owner": "",
        "use": "",
        "confidence": 0.65,
        "source": "layout_relation",
        "firstTurn": 1,
        "last
```
- [chunk6_worldstructure_core] node cap enforced at or under 120
```json
{
  "count": 121,
  "max": 120
}
```
- [worldstructure_settlement_probe] direct settlement phrase creates stoneford
```json
{
  "out": "Stoneford is a small village.",
  "active": "",
  "rows": [],
  "map": "[AIDRPG /structure]\nNodes: 0 | Edges: 0 | Active settlement: none\n"
}
```
- [worldstructure_settlement_probe] direct settlement phrase creates greybridge
```json
{
  "out": "The town of Greybridge surrounds you.",
  "active": "",
  "rows": [],
  "map": "[AIDRPG /structure]\nNodes: 0 | Edges: 0 | Active settlement: none\n"
}
```
- [worldstructure_settlement_probe] direct settlement phrase creates ravenfall
```json
{
  "out": "Ravenfall is a coastal city.",
  "active": "",
  "rows": [],
  "map": "[AIDRPG /structure]\nNodes: 0 | Edges: 0 | Active settlement: none\n"
}
```
- [worldstructure_settlement_probe] direct settlement phrase creates ashford
```json
{
  "out": "You arrive in Ashford, a farming hamlet.",
  "active": "",
  "rows": [],
  "map": "[AIDRPG /structure]\nNodes: 0 | Edges: 0 | Active settlement: none\n"
}
```
- [worldstructure_settlement_probe] village well is not misclassified as settlement
```json
{
  "active": "village well",
  "rows": [
    {
      "id": "ws_building_world_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_settlement_world_village_well",
      "name": "village well",
      "kind": "settlement",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_building_ws_settlement_world_village__tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    }
  ]
}
```
- [worldstructure_settlement_probe] town gate is not misclassified as settlement
```json
{
  "active": "town gate",
  "rows": [
    {
      "id": "ws_route_world_gate",
      "name": "gate",
      "kind": "route",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_settlement_world_town_gate",
      "name": "town gate",
      "kind": "settlement",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_building_ws_settlement_world_town_gat_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    }
  ]
}
```
- [worldstructure_settlement_probe] city wall is not misclassified as settlement
```json
{
  "active": "city wall",
  "rows": [
    {
      "id": "ws_building_world_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_settlement_world_city_wall",
      "name": "city wall",
      "kind": "settlement",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_building_ws_settlement_world_city_wal_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    }
  ]
}
```
- [worldstructure_structure_probe] guard tower creates expected structure
```json
{
  "rows": [
    {
      "id": "ws_building_world_tavern",
      "name": "tavern",
      "kind": "building",
      "parentId": "",
      "conditions": []
    }
  ],
  "expected": "building"
}
```
- [worldstructure_project_condition_probe] bakery project condition finished
```json
{
  "out": "The bakery project is finished.",
  "rows": []
}
```
- [worldstructure_project_condition_probe] bridge condition repaired
```json
{
  "out": "The bridge is repaired.",
  "rows": [
    {
      "id": "ws_scene_scene_bridge",
      "name": "bridge",
      "kind": "route",
      "parentId": "",
      "conditions": []
    },
    {
      "id": "ws_route_scene_bridge_bridge",
      "name": "bridge",
      "kind": "route",
      "parentId": "",
      "conditions": [
        "repaired"
      ]
    }
  ]
}
```