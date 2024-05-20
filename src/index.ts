import {
  convertStringToArr,
  dSixGreaterThanProbability,
  roundingFunction,
} from "./helperFunctions";
import { fetchAllFromWeaponsTable } from "./databaseCalls";
import { practicalWeaponSkillCheck } from "./weaponsProbability";
import { simulateAllWeapons } from "./theoreticalAttackSimulation";
import { Weapon } from "./types";

const apicall = async () => {
  const weaponList: Weapon[] = await fetchAllFromWeaponsTable();
  simulateAllWeapons(weaponList);
};

apicall();

//!to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//!to run this file, use  node --env-file=.env index.js, to specify which file is the .env
//* actually after doing npx tsc --init and setting it up now we can use import statements
