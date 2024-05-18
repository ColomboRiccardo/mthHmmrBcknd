"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundingFunction = exports.convertStringToArr = exports.dSixGreaterThanProbability = exports.checkArrayForGreaterOrEqualThan = void 0;
const checkArrayForGreaterOrEqualThan = (value, arrayVal) => {
    return arrayVal.reduce((acc, num) => {
        if (num >= value) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
};
exports.checkArrayForGreaterOrEqualThan = checkArrayForGreaterOrEqualThan;
const dSixGreaterThanProbability = (diceValue) => {
    return (7 - diceValue) / 6;
};
exports.dSixGreaterThanProbability = dSixGreaterThanProbability;
const convertStringToArr = (myString) => {
    return JSON.parse(myString.replace('"', ""));
};
exports.convertStringToArr = convertStringToArr;
const roundingFunction = (value) => {
    return Math.round((value + Number.EPSILON) * 10000) / 10000;
};
exports.roundingFunction = roundingFunction;
