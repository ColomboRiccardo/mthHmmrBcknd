import { DiceValues, StrengthValues, ToughnessValues } from "./types";

export const checkArrayForGreaterOrEqualThan = (
  value: number,
  arrayVal: number[]
) => {
  return arrayVal.reduce((acc, num) => {
    if (num >= value) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
};

export const convertStringToArr = (myString: string) => {
  //console.log(myString);
  return JSON.parse(myString.replace('"[', "[").replace(']"', "]"));
};

export const convertStringToNumber = (myString: string): number => {
  return Number(myString.replace('"[', "").replace(']"', ""));
};

export const roundingFunction = (value: number) => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
};

//! these are the helper functions related to a dice

export const dSixGreaterThanProbability = (diceValue: number) => {
  return (7 - diceValue) / 6;
};

export const throwDice = (): DiceValues => {
  return (Math.floor(Math.random() * 6) + 1) as DiceValues;
};

export const multipleThrows = (times: number) => {
  let dicesArray: DiceValues[] = [];
  for (let i = 0; i < times; i++) {
    dicesArray.push(throwDice());
  }
  return dicesArray;
};

export const checkDiceCorrectness = () => {
  let throws = 10000;
  const testArray = multipleThrows(throws);
  let numberForValues = {
    "Number of 1": 0,
    "Number of 2": 0,
    "Number of 3": 0,
    "Number of 4": 0,
    "Number of 5": 0,
    "Number of 6": 0,
  };
  testArray.forEach((value) => {
    switch (value) {
      case 1:
        numberForValues["Number of 1"]++;
        break;
      case 2:
        numberForValues["Number of 2"]++;
        break;
      case 3:
        numberForValues["Number of 3"]++;
        break;
      case 4:
        numberForValues["Number of 4"]++;
        break;
      case 5:
        numberForValues["Number of 5"]++;
        break;
      case 6:
        numberForValues["Number of 6"]++;
    }
  });
  return numberForValues;
};

//console.log(multipleThrows(60));
//console.log(checkDiceCorrectness());

export const strengthVsToughnessProbability = (
  strength: StrengthValues,
  toughness: ToughnessValues
): number => {
  const ratio = strength / toughness;
  if (ratio >= 2) {
    return 5 / 6;
  } else if (ratio < 2 && ratio > 1) {
    return 4 / 6;
  } else if (ratio == 1) {
    return 3 / 6;
  } else if (ratio < 1 && ratio > 0.5) {
    return 2 / 6;
  } else if (ratio <= 0.5) {
    return 1 / 6;
  } else {
    return 0;
  }
};
