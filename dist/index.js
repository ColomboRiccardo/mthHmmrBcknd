"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseCalls_1 = require("./databaseCalls");
const theoreticalAttackSimulation_1 = require("./theoreticalAttackSimulation");
const apicall = () => __awaiter(void 0, void 0, void 0, function* () {
    const weaponList = yield (0, databaseCalls_1.fetchAllFromWeaponsTable)();
    const attackHitsTable = (0, theoreticalAttackSimulation_1.simulateWeaponHits)(weaponList);
    attackHitsTable.forEach(({ id, mode, name, attacksLanded }) => {
        (0, databaseCalls_1.updateWeaponHitSimulationColById)(id, mode, name, attacksLanded);
    });
    const attackWoundsTable = (0, theoreticalAttackSimulation_1.simulateWeaponWounds)(weaponList, attackHitsTable);
    attackWoundsTable.forEach(({ id, mode, name, strength, hit, wounds }) => {
        (0, databaseCalls_1.updateWeaponWoundSimulationColById)(id, mode, name, strength, hit, wounds);
    });
});
apicall();
//!to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//!to run this file, use  node --env-file=.env index.js, to specify which file is the .env
//* actually after doing npx tsc --init and setting it up now we can use import statements
