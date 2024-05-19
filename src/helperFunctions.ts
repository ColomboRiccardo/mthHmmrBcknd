import { DiceValues } from "./types";

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
  console.log(myString);
  return JSON.parse(myString.replace('"', ""));
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
