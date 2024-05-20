"use strict";
//TODO this is for the practical throws, we'll have that later
Object.defineProperty(exports, "__esModule", { value: true });
exports.practicalWeaponSkillCheck = void 0;
const helperFunctions_1 = require("./helperFunctions");
const numberOfTries = 100;
const createAttacksArray = (numberOfAttacks) => {
    const attacksArray = [];
    for (let i = 0; i < numberOfAttacks; i++) {
        attacksArray.push((0, helperFunctions_1.throwDice)());
    }
    return attacksArray;
};
const practicalWeaponSkillCheck = ({ weapon_attacks, weapon_skills, }) => {
    const numberOfTries = 100;
    const attackSimulationList = [];
    const attacksThatHit = [];
    //this is going to make an array of arrays, which is a simulation of attacking with this weapon x times
    for (let i = 0; i < numberOfTries; i++) {
        attackSimulationList.push(createAttacksArray(weapon_attacks));
        attacksThatHit.push((0, helperFunctions_1.checkArrayForGreaterOrEqualThan)(weapon_skills, attackSimulationList[i]));
    }
    const results = {
        attackSimulationList,
        attacksThatHit,
    };
    return results;
};
exports.practicalWeaponSkillCheck = practicalWeaponSkillCheck;
