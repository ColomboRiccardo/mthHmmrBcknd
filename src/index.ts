import {
  convertStringToArr,
  dSixGreaterThanProbability,
  roundingFunction,
} from "./checkingFunctions";
import { apiUpdateColById, fetchAllWeapons } from "./databaseCalls";
import { practicalWeaponSkillCheck } from "./weaponsProbability";

const apicall = async () => {
  const weaponsList = await fetchAllWeapons();
  //weaponsList?.forEach((item) => console.log(item));
  //weaponsList?.forEach((item) => console.log(practicalWeaponSkillCheck(item)));

  //console.log(weaponsList);

  const attacksObjectArray = weaponsList?.map((weapon) => {
    const theoreticalAttacksLanded: number[] = [];
    convertStringToArr(weapon.weapon_attack).forEach((attack: number) => {
      theoreticalAttacksLanded.push(
        roundingFunction(
          attack * dSixGreaterThanProbability(weapon.weapon_skill)
        )
      );
    });
    const attacksObject = {
      id: weapon.id,
      weapon_theoretical_attacks_landed: theoreticalAttacksLanded,
    };
    return attacksObject;
  });

  attacksObjectArray?.forEach((weapon) => {
    apiUpdateColById(
      weapon.id,
      "weapon_theoretical_attacks_landed",
      weapon.weapon_theoretical_attacks_landed
    );
  });
};

//const diceArray = multipleThrows(20);
//const howManyGreaterThan = checkArrayForGreaterOrEqualThan(5, diceArray);

apicall();

//!to compile this without any external library or similar with tsc (since it does not support the import or await statement by default), the command is npx tsc -t es2022 -m es2022 --moduleResolution index.ts
//!to run this file, use  npde --env-file=.env index.js, to specify which file is the .env
//* actually after doing npx tsc --init and setting it up now we can use import statements

//TODO
//put data in table for weapons
//for each weapons add the probability of a hit, the probability against toughness, the probability against armor
