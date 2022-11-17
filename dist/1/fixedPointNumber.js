"use strict";
const convertNumberToBinary = (num, digits) => {
    const numStr = num.toString();
    const integersAndDecimals = numStr.split('.');
    const integers = Number(integersAndDecimals[0]);
    const decimals = Number(`0.${integersAndDecimals[1]}`);
    const intBinary = convertIntegerToBinary(integers);
    const decBinary = convertDecimalToBinary(decimals, digits);
    return `0b${intBinary}.${decBinary}`;
};
const convertIntegerToBinary = (num) => {
    let n = num;
    const binary = [];
    while (n !== 0) {
        binary.push(Math.floor(n % 2));
        n = Math.floor(n / 2);
    }
    return binary.reverse().join('');
};
const convertDecimalToBinary = (num, digits) => {
    let n = num;
    const binary = [];
    for (let i = 0; i < digits; i++) {
        n = n * 2;
        binary.push(Math.floor(n));
        if (Math.floor(n) === 1)
            n = n - 1;
    }
    return binary.join('');
};
console.log(convertNumberToBinary(12.345, 10));
console.log(convertNumberToBinary(57.39, 10));
console.log(convertNumberToBinary(113.06, 10));
