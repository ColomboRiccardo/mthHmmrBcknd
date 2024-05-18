type DiceValues = 1 | 2 | 3 | 4 | 5 | 6;

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
