"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberToBinary = void 0;
class NumberToBinary {
    constructor() {
        this.convertNumberToBinary = (num, digits) => {
            const numStr = num.toString();
            const integersAndDecimals = numStr.split('.');
            const integers = Number(integersAndDecimals[0]);
            const decimals = Number(`0.${integersAndDecimals[1]}`);
            const intBinary = this.convertIntegerToBinary(integers);
            const decBinary = this.convertDecimalToBinary(decimals, digits);
            return `0b${intBinary}.${decBinary}`;
        };
        this.convertIntegerToBinary = (num) => {
            let n = num;
            const binary = [];
            while (n !== 0) {
                binary.push(Math.floor(n % 2));
                n = Math.floor(n / 2);
            }
            return binary.reverse().join('');
        };
        this.convertDecimalToBinary = (num, digits) => {
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
    }
}
exports.NumberToBinary = NumberToBinary;
