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

export const dSixGreaterThanProbability = (diceValue: number) => {
  return (7 - diceValue) / 6;
};

export const convertStringToArr = (myString: string) => {
  console.log(myString);
  return JSON.parse(myString.replace('"', ""));
};

export const roundingFunction = (value: number) => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
};
