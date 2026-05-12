const fs=require('fs');
const p='generators/redline-generator.js';
const s=fs.readFileSync(p,'utf8');
const insert=fs.readFileSync('/tmp/stress_functions.js','utf8');
const idx=s.indexOf('function getRedlineTests(');
if(idx<0) throw new Error('marker not found');
const prefix=s.slice(0,idx);
const newGet = `function getRedlineTests(suite = 'redlines', options = {}) {
  const limit = options.limit || null;
  let tests = [];
  if (suite === 'scene-confirmation' || suite === 'redline-scene' || suite === 'scene-redlines') tests = sceneRedlines();
  else if (suite === 'ability-status' || suite === 'redline-ability' || suite === 'ability-redlines' || suite === 'status-redlines') tests = abilityRedlines();
  else if (suite === 'scene-expanded' || suite === 'redline-scene-expanded') tests = expandedSceneRedlines();
  else if (suite === 'ability-expanded' || suite === 'status-expanded' || suite === 'redline-ability-expanded') tests = expandedAbilityRedlines();
  else if (suite === 'negative-controls' || suite === 'false-positive-controls') tests = negativeControlStressTests();
  else if (suite === 'similar-names') tests = similarNameConfusionStressTests();
  else if (suite === 'context-pressure-stress') tests = contextPressureStressTests();
  else if (suite === 'idempotency-stress' || suite === 'retry-stress') tests = broadRetryIdempotencyStressTests();
  else if (suite === 'hallucination-stress' || suite === 'contradiction-stress') tests = contradictionAndHallucinationStressTests();
  else if (suite === 'command-mode-safety' || suite === 'action-mode-stress') tests = commandAndModeSafetyStressTests();
  else if (suite === 'expanded-validation') tests = [...expandedSceneRedlines(), ...expandedAbilityRedlines()];
  else if (suite === 'true-stress' || suite === 'final-stress' || suite === 'stress' || suite === 'stress-all') tests = finalTrueStressTests();
  else if (suite === 'redlines-expanded') tests = [...expandedSceneRedlines(), ...expandedAbilityRedlines()];
  else if (suite === 'redlines') tests = [...sceneRedlines(), ...abilityRedlines()];
  return tests.slice(0, limit || tests.length);
}

module.exports = {
  getRedlineTests, sceneRedlines, abilityRedlines, expandedSceneRedlines, expandedAbilityRedlines,
  negativeControlStressTests, similarNameConfusionStressTests, contextPressureStressTests,
  broadRetryIdempotencyStressTests, contradictionAndHallucinationStressTests, commandAndModeSafetyStressTests, finalTrueStressTests
};
`;
fs.writeFileSync(p, prefix+insert+'\n'+newGet);
console.log('patched', fs.statSync(p).size);
