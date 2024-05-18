"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArrayForGreaterOrEqualThan = void 0;
const checkArrayForGreaterOrEqualThan = (value, arrayVal) => {
    return arrayVal.reduce((acc, num) => {
        if (num >= value) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
};
exports.checkArrayForGreaterOrEqualThan = checkArrayForGreaterOrEqualThan;
