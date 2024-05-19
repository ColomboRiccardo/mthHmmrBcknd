//here we are going to put the code that gets an array of weapons, simulates the attacks and returns an array of objects of attacks with the corresponding weapon_id

import { Weapon, WeaponsKeywords } from "./types";
import {
  convertStringToArr,
  dSixGreaterThanProbability,
  roundingFunction,
} from "./helperFunctions";

interface AttacksLanded {
  [index: string]: number[];
}

interface AttacksObject {
  id: number;
  theoretical_atks_landed: AttacksLanded;
}

//given a weaponlist this function can simulate the whole firing phase
export const simulateAllWeapons = (weaponList: Weapon[]) => {
  let attacksObjectArray: AttacksObject[];

  weaponList.forEach((weapon) => {
    let theoretical_atks_landed = theoreticalWeaponHits(weapon);
    let attacksObject: AttacksObject = {
      id: weapon.id,
      theoretical_atks_landed,
    };
    attacksObjectArray.push(attacksObject);
  });
};

//this function takes a weapon as an argument and calculates an object with various arrays of hits
const theoreticalWeaponHits = ({
  weapon_skill: skills,
  weapon_attack: attacks,
  weapon_keywords: keywords,
}: Weapon) => {
  const weaponAttacksArray = convertStringToArr(attacks);
  const weaponKeywordsArray: WeaponsKeywords[] = convertStringToArr(keywords);

  const attacksLanded: AttacksLanded = {};

  weaponAttacksArray.forEach((attack: number) => {
    attacksLanded["base attacks"].push(
      attack * dSixGreaterThanProbability(skills)
    );

    if (weaponKeywordsArray.includes("sustained hits 1")) {
      attacksLanded["sustained hits 1"].push(
        attack * dSixGreaterThanProbability(skills) + 1 / 6
      );
    }

    if (weaponKeywordsArray.includes("heavy")) {
      let movedSkills = skills - 1;
      attacksLanded["moved"].push(
        attack * dSixGreaterThanProbability(movedSkills)
      );
    }

    if (
      weaponKeywordsArray.includes("sustained hits 1") &&
      weaponKeywordsArray.includes("heavy")
    ) {
      let movedSkills = skills - 1;
      attacksLanded["sustained hits 1, moved"].push(
        attack * dSixGreaterThanProbability(movedSkills)
      );
    }
  });

  return attacksLanded;
};

const theoreticalWeaponsWound = (
  { weapon_keywords: keywords, weapon_strength: strength }: Weapon,
  theoreticalWeaponHits: AttacksLanded
) => {};
