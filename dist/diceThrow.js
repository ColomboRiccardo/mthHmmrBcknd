"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDiceCorrectness = exports.multipleThrows = exports.throwDice = void 0;
const throwDice = () => {
    return (Math.floor(Math.random() * 6) + 1);
};
exports.throwDice = throwDice;
const multipleThrows = (times) => {
    let dicesArray = [];
    for (let i = 0; i < times; i++) {
        dicesArray.push((0, exports.throwDice)());
    }
    return dicesArray;
};
exports.multipleThrows = multipleThrows;
const checkDiceCorrectness = () => {
    let throws = 10000;
    const testArray = (0, exports.multipleThrows)(throws);
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
exports.checkDiceCorrectness = checkDiceCorrectness;
//console.log(multipleThrows(60));
//console.log(checkDiceCorrectness());
