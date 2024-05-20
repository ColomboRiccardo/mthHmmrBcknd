//here we are going to put the code that gets an array of weapons, simulates the attacks and returns an array of objects of attacks with the corresponding weapon_id

import {
  StrengthValues,
  ToughnessValues,
  Weapon,
  WeaponsKeywords,
} from "./types";
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
  name: string;
  attacksLanded: number[];
}

export interface WoundsPassed {
  id: number;
  mode: string;
  name: string;
  strength: number;
  hit: number;
  wounds: number[];
}

interface AttacksObject {
  id: number;
  theoretical_atks_landed: AttacksLanded;
}

//given a weaponlist this function can simulate the whole firing phase
export const simulateWeaponHits = (weaponList: Weapon[]) => {
  let attackHitsTable: AttacksLanded[] = weaponList.reduce((acc, weapon) => {
    let hits = theoreticalWeaponHits(weapon);
    return acc.concat(hits);
  }, [] as AttacksLanded[]);

  //console.log(attackHitsTable);

  return attackHitsTable;
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

//given a weaponlist this function can simulate the whole firing phase
export const simulateWeaponWounds = (
  weaponList: Weapon[],
  weaponHits: AttacksLanded[]
) => {
  const toughnessArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let attackWoundsTable = weaponHits.reduce((acc, weaponProfile) => {
    let weaponCharacteristics = weaponList.find(
      (weapon) => weapon.id == weaponProfile.id
    );
    let wounds = theoreticalWeaponWounds(
      weaponCharacteristics as Weapon,
      weaponProfile,
      toughnessArray
    );
    return acc.concat(wounds);
  }, [] as WoundsPassed[]);

  return attackWoundsTable;
};

//here we want to iterate through elements of weponList one by one and create an array of objects with arrays of wounds per mode of firing. then we concatenate them and we send them
//watch out though, every row is going to be 1 value of toughness, 1 value of mode. potentially, we have 12 toughnesses * 3 modes * 16 hits = a shitton per weapon
const theoreticalWeaponWounds = (
  { weapon_keywords: keywords, weapon_strength: strength }: Weapon,
  { id, mode, name, attacksLanded }: AttacksLanded,
  toughnessArray: number[]
) => {
  const theoreticalWeaponWounds: WoundsPassed[] = [];

  attacksLanded.forEach((hit) => {
    const woundingAttacksObject = {
      id,
      mode,
      name,
      strength: convertStringToArr(strength),
      hit,
      wounds: toughnessArray.map((toughness) => {
        return roundingFunction(
          hit *
            strengthVsToughnessProbability(
              convertStringToArr(strength)[0] as StrengthValues,
              toughness as ToughnessValues
            )
        );
      }),
    };
    theoreticalWeaponWounds.push(woundingAttacksObject);
  });

  return theoreticalWeaponWounds;
};
