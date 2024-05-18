//here we are going to put the code that gets an array of weapons, simulates the attacks and returns an array of objects of attacks with the corresponding weapon_id

import {
  convertStringToArr,
  dSixGreaterThanProbability,
  roundingFunction,
} from "./helperFunctions";

type Weapon = {
  id: number;
  datasheet_id: number;
  weapon_name: string;
  weapon_keywords: string;
  weapon_range: number;
  weapon_type: string;
  weapon_attack: string;
  weapon_strength: string;
  weapon_armor_penetration: number;
  weapon_damage: string;
  weapon_skill: number;
};

const simulateAllWeapons = (weaponList: Weapon[]) => {
  const weaponTheoreticalHits = weaponList.map((weapon) =>
    simulateWeaponHits(weapon)
  );
};

const simulateWeaponHits = (weapon: Weapon) => {
  const theoreticalAttacksLanded: number[] = [];
  convertStringToArr(weapon.weapon_attack).forEach((attack: number) => {
    theoreticalAttacksLanded.push(
      roundingFunction(attack * dSixGreaterThanProbability(weapon.weapon_skill))
    );
  });
  const attacksObject = {
    id: weapon.id,
    weapon_theoretical_attacks_landed: theoreticalAttacksLanded,
  };
  return attacksObject;
  //   attacksObjectArray?.forEach((weapon) => {
  //     apiUpdateColById(
  //       weapon.id,
  //       "weapon_theoretical_attacks_landed",
  //       weapon.weapon_theoretical_attacks_landed
  //     );
  //   });
};
