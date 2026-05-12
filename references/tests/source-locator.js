const fs = require('fs');

const SYSTEM_MARKERS = {
  CoreState: 'CoreState:',
  TurnEngine: 'TurnEngine:',
  Utils: 'Utils:',
  AdminDebugSystem: 'AdminDebugSystem:',
  PlayerSystem: 'PlayerSystem:',
  BuildIdentitySystem: 'BuildIdentitySystem:',
  IntentParser: 'IntentParser:',
  ProgressionSystem: 'ProgressionSystem:',
  InventorySystem: 'InventorySystem:',
  SceneStateSystem: 'SceneStateSystem:',
  WorldEntitySystem: 'WorldEntitySystem:',
  TimeTravelSystem: 'TimeTravelSystem:',
  AbilitySystem: 'AbilitySystem:',
  PersistentTraitSystem: 'PersistentTraitSystem:',
  ConsequenceParser: 'ConsequenceParser:',
  ValidationSystem: 'ValidationSystem:',
  SpecializationSystem: 'SpecializationSystem:',
  ActorProfileSystem: 'ActorProfileSystem:',
  ContextPacketSystem: 'ContextPacketSystem:',
  ReputationSystem: 'ReputationSystem:',
  QuestLogSystem: 'QuestLogSystem:',
  CardSyncSystem: 'CardSyncSystem:',
  NPCGenerationSystem: 'NPCGenerationSystem:',
  CombatResolutionSystem: 'CombatResolutionSystem:'
};

function buildSourceIndex(scriptPath) {
  const source = fs.readFileSync(scriptPath, 'utf8');
  const lines = source.split(/\r?\n/);
  const index = {};
  for (const [system, marker] of Object.entries(SYSTEM_MARKERS)) {
    const lineNo = lines.findIndex(line => line.includes(marker));
    if (lineNo !== -1) index[system] = { line: lineNo + 1, marker };
  }
  return { lines, index };
}

function getPatchZone(scriptPath, system) {
  const { lines, index } = buildSourceIndex(scriptPath);
  const found = index[system];
  if (!found) return { system, line: null, snippet: '', note: 'No section marker found.' };
  const start = Math.max(0, found.line - 4);
  const end = Math.min(lines.length, found.line + 35);
  const snippet = lines.slice(start, end).map((line, i) => `${start + i + 1}: ${line}`).join('\n');
  return { system, line: found.line, snippet, note: `Likely section starts near line ${found.line}.` };
}

module.exports = { buildSourceIndex, getPatchZone };
