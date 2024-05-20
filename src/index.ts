import {
  convertStringToArr,
  dSixGreaterThanProbability,
  roundingFunction,
} from "./helperFunctions";
import {
  fetchAllFromWeaponsTable,
  updateWeaponHitSimulationColById,
  updateWeaponWoundSimulationColById,
} from "./databaseCalls";
import { practicalWeaponSkillCheck } from "./weaponsProbability";
import {
  simulateWeaponHits,
  simulateWeaponWounds,
} from "./theoreticalAttackSimulation";
import { Weapon } from "./types";

const apicall = async () => {
  const weaponList: Weapon[] = await fetchAllFromWeaponsTable();
  const attackHitsTable = simulateWeaponHits(weaponList);

  attackHitsTable.forEach(({ id, mode, name, attacksLanded }) => {
    updateWeaponHitSimulationColById(id, mode, name, attacksLanded);
  });

  const attackWoundsTable = simulateWeaponWounds(weaponList, attackHitsTable);

  attackWoundsTable.forEach(({ id, mode, name, strength, hit, wounds }) => {
    updateWeaponWoundSimulationColById(id, mode, name, strength, hit, wounds);
  });
};

apicall();

//!to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//!to run this file, use  node --env-file=.env index.js, to specify which file is the .env
//* actually after doing npx tsc --init and setting it up now we can use import statements
