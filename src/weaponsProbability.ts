import { throwDice, multipleThrows, checkDiceCorrectness } from "./diceThrow";
import {
  checkArrayForGreaterOrEqualThan,
  dSixGreaterThanProbability,
} from "./helperFunctions";

const numberOfTries = 100;

type WeaponProfile = {
  id: number;
  created_at: string;
  weapon_name: string;
  weapon_type: "ranged" | "melee";
  weapon_range: number;
  weapon_attacks: number;
  weapon_skills: number;
  weapon_strength: number;
  weapon_armor_penetration: number;
  weapon_damage: number;
  weapon_tags: string[];
};

type diceValues = 1 | 2 | 3 | 4 | 5 | 6;

type PracticalWeaponSkillCheck = {
  attackSimulationList: diceValues[][];
  attacksThatHit: number[];
};

const createAttacksArray = (numberOfAttacks: number): diceValues[] => {
  const attacksArray: diceValues[] = [];
  for (let i = 0; i < numberOfAttacks; i++) {
    attacksArray.push(throwDice());
  }
  return attacksArray;
};

export const practicalWeaponSkillCheck = ({
  weapon_attacks,
  weapon_skills,
}: WeaponProfile): PracticalWeaponSkillCheck => {
  const numberOfTries = 100;
  const attackSimulationList: diceValues[][] = [];
  const attacksThatHit: number[] = [];
  //this is going to make an array of arrays, which is a simulation of attacking with this weapon x times
  for (let i = 0; i < numberOfTries; i++) {
    attackSimulationList.push(createAttacksArray(weapon_attacks));
    attacksThatHit.push(
      checkArrayForGreaterOrEqualThan(weapon_skills, attackSimulationList[i])
    );
  }

  const results = {
    attackSimulationList,
    attacksThatHit,
  };

  return results;
};
