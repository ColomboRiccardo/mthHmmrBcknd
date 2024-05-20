//here we are going to put the code that gets an array of weapons, simulates the attacks and returns an array of objects of attacks with the corresponding weapon_id

import { StrengthValues, Weapon, WeaponsKeywords } from "./types";
import {
  convertStringToArr,
  convertStringToNumber,
  dSixGreaterThanProbability,
  roundingFunction,
  strengthVsToughnessProbability,
} from "./helperFunctions";

interface AttacksLanded {
  id: number;
  mode: string;
  attacksLanded: number[];
}

interface WoundingAttacks {
  [index: string]: number[];
}

interface AttacksObject {
  id: number;
  theoretical_atks_landed: AttacksLanded;
}

//given a weaponlist this function can simulate the whole firing phase
export const simulateAllWeapons = (weaponList: Weapon[]) => {
  let attackHitsTable: AttacksLanded[] = [];

  weaponList.forEach((weapon) => {
    attackHitsTable.concat(theoreticalWeaponHits(weapon));
  });

  console.log(attackHitsTable);
};

//this function takes a weapon as an argument and calculates an object with various arrays of hits
const theoreticalWeaponHits = ({
  id,
  weapon_name: name,
  weapon_skill: skills,
  weapon_attack: attacks,
  weapon_keywords: keywords,
}: Weapon): AttacksLanded[] => {
  const weaponAttacksArray = convertStringToArr(attacks);
  const weaponKeywordsArray: WeaponsKeywords[] = convertStringToArr(keywords);

  const attacksLandedArray: AttacksLanded[] = [];

  let weaponId = id;
  let mode = "base attacks";
  let attacksLanded = weaponAttacksArray.map((attack: number) =>
    roundingFunction(attack * dSixGreaterThanProbability(skills))
  );
  const baseAttackMode = {
    id: weaponId,
    name,
    mode,
    attacksLanded,
  };
  attacksLandedArray.push(baseAttackMode);

  if (weaponKeywordsArray.includes("sustained hits 1")) {
    let mode = "sustained hits 1";
    let attacksLanded = weaponAttacksArray.map((attack: number) =>
      roundingFunction(attack * dSixGreaterThanProbability(skills) + 1 / 6)
    );
    const sustainedAttackMode = {
      id: weaponId,
      name,
      mode,
      attacksLanded,
    };
    attacksLandedArray.push(sustainedAttackMode);
  }

  if (weaponKeywordsArray.includes("heavy")) {
    let movedSkills = skills - 1;
    let mode = "heavy, moved";
    let attacksLanded = weaponAttacksArray.map((attack: number) =>
      roundingFunction(attack * dSixGreaterThanProbability(movedSkills))
    );
    const heavyAttackMode = {
      id: weaponId,
      name,
      mode,
      attacksLanded,
    };
    attacksLandedArray.push(heavyAttackMode);
  }

  if (
    weaponKeywordsArray.includes("sustained hits 1") &&
    weaponKeywordsArray.includes("heavy")
  ) {
    let movedSkills = skills - 1;
    let mode = "heavy, moved && sustained hits 1";
    let attacksLanded = weaponAttacksArray.map((attack: number) =>
      roundingFunction(attack * dSixGreaterThanProbability(movedSkills) + 1 / 6)
    );
    const heavySustainedAttackMode = {
      id: weaponId,
      name,
      mode,
      attacksLanded,
    };
    attacksLandedArray.push(heavySustainedAttackMode);
  }

  return attacksLandedArray;
};

//const theoreticalWeaponsWound = (
//   { weapon_keywords: keywords, weapon_strength: strength }: Weapon,
//   theoreticalWeaponHits: AttacksLanded
// ) => {
//   const weaponModes = Object.keys(theoreticalWeaponHits);
//   const weaponHits = Object.values(theoreticalWeaponHits);

//   const woundingAttacks: WoundingAttacks = {};

//   for (let i = 0; i < weaponModes.length; i++) {
//     woundingAttacks[weaponModes[i]] = weaponHits[i].map(
//       (hits) =>
//         hits *
//         strengthVsToughnessProbability(
//           convertStringToNumber(strength) as StrengthValues,
//           4
//         )
//     );
//   }
// };
