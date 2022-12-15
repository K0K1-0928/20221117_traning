"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberToBinary_1 = require("../NumberToBinary");
const convertToSinglePrecisionBinaryFloatingPointNumber = (num) => {
    const signPart = getSignPart(num);
    const ntb = new NumberToBinary_1.NumberToBinary();
    const binary = ntb.convertNumberToBinary(num, 32);
    const [exponent, mantissa] = convertExponentAndMantissa(binary);
    return `${signPart}${exponent}${mantissa}`;
};
const getSignPart = (num) => {
    return num >= 0 ? 0 : 1;
};
const convertExponentAndMantissa = (binary) => {
    const bias = 127;
    let n = binary.split(/^0b/)[1];
    let index = 0;
    while (Math.floor(Number(n)) !== 1) {
        const numbers = n.split('.');
        const integerArray = [...numbers[0]];
        const decimalArray = [...numbers[1]];
        const bit = integerArray.pop() || '';
        decimalArray.unshift(bit);
        n = `${integerArray.join('')}.${decimalArray.join('')}`;
        index++;
    }
    const ntb = new NumberToBinary_1.NumberToBinary();
    const exponent = ntb.convertIntegerToBinary(bias + index);
    const mantissa = roundMantissa(n);
    return [exponent, mantissa];
};
const roundMantissa = (numStr) => {
    const mantissa = numStr.split('.')[1];
    const lsb = parseInt(mantissa.substring(22, 23), 10);
    const g = parseInt(mantissa.substring(23, 24), 10);
    const r = parseInt(mantissa.substring(24, 25), 10);
    const s = Number(mantissa
        .substring(25)
        .split('')
        .some((n) => n === '1'));
    return `${mantissa.substring(0, 22)}${Number(g && (lsb || r || s))}`;
};
console.log(convertToSinglePrecisionBinaryFloatingPointNumber(45));
