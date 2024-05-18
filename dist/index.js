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
const checkingFunctions_1 = require("./checkingFunctions");
const databaseCalls_1 = require("./databaseCalls");
const apicall = () => __awaiter(void 0, void 0, void 0, function* () {
    const weaponsList = yield (0, databaseCalls_1.fetchAllWeapons)();
    //weaponsList?.forEach((item) => console.log(item));
    //weaponsList?.forEach((item) => console.log(practicalWeaponSkillCheck(item)));
    //console.log(weaponsList);
    const attacksObjectArray = weaponsList === null || weaponsList === void 0 ? void 0 : weaponsList.map((weapon) => {
        const theoreticalAttacksLanded = [];
        (0, checkingFunctions_1.convertStringToArr)(weapon.weapon_attack).forEach((attack) => {
            theoreticalAttacksLanded.push((0, checkingFunctions_1.roundingFunction)(attack * (0, checkingFunctions_1.dSixGreaterThanProbability)(weapon.weapon_skill)));
        });
        const attacksObject = {
            id: weapon.id,
            weapon_theoretical_attacks_landed: theoreticalAttacksLanded,
        };
        return attacksObject;
    });
    attacksObjectArray === null || attacksObjectArray === void 0 ? void 0 : attacksObjectArray.forEach((weapon) => {
        (0, databaseCalls_1.apiUpdateColById)(weapon.id, "weapon_theoretical_attacks_landed", weapon.weapon_theoretical_attacks_landed);
    });
});
//const diceArray = multipleThrows(20);
//const howManyGreaterThan = checkArrayForGreaterOrEqualThan(5, diceArray);
apicall();
//!to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//!to run this file, use  npde --env-file=.env index.js, to specify which file is the .env
//* actually after doing npx tsc --init and setting it up now we can use import statements
//TODO
//put data in table for weapons
//for each weapons add the probability of a hit, the probability against toughness, the probability against armor
