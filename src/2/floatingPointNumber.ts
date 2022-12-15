import { NumberToBinary } from '../NumberToBinary';

const convertToSinglePrecisionBinaryFloatingPointNumber = (num: number) => {
  const signPart = getSignPart(num);
  const ntb = new NumberToBinary();
  const binary = ntb.convertNumberToBinary(Math.abs(num), 32);
  const [exponent, mantissa] = convertExponentAndMantissa(binary);
  const decimal = parseInt(`${signPart}${exponent}${mantissa}`, 2);
  return `0x${decimal.toString(16).toUpperCase()}`;
};

const getSignPart = (num: number) => {
  return num >= 0 ? 0 : 1;
};

const convertExponentAndMantissa = (binary: string) => {
  const bias = 127;
  let n = binary.split(/^0b/)[1];
  let index = 0;
  if (Math.floor(Number(n)) < 1) {
    while (Math.floor(Number(n)) !== 1) {
      const numbers = n.split('.');
      const integerArray = [...numbers[0]];
      const decimalArray = [...numbers[1]];
      const bit = decimalArray.shift() || '';
      integerArray.push(bit);
      n = `${integerArray.join('')}.${decimalArray.join('')}`;
      index--;
    }
  } else {
    while (Math.floor(Number(n)) !== 1) {
      const numbers = n.split('.');
      const integerArray = [...numbers[0]];
      const decimalArray = [...numbers[1]];
      const bit = integerArray.pop() || '';
      decimalArray.unshift(bit);
      n = `${integerArray.join('')}.${decimalArray.join('')}`;
      index++;
    }
  }
  const ntb = new NumberToBinary();
  const exponent = ntb.convertIntegerToBinary(bias + index);
  const mantissa = roundMantissa(n);
  return [exponent, mantissa];
};

const roundMantissa = (numStr: string) => {
  const mantissa = numStr.split('.')[1];
  const lsb = parseInt(mantissa.substring(22, 23), 10);
  const g = parseInt(mantissa.substring(23, 24), 10);
  const r = parseInt(mantissa.substring(24, 25), 10);
  const s = Number(
    mantissa
      .substring(25)
      .split('')
      .some((n) => n === '1')
  );
  const canonicalize = parseInt(mantissa.substring(0, 23), 2);
  return (canonicalize + Number(g && (lsb || r || s)))
    .toString(2)
    .padStart(23, '0');
};

console.log(convertToSinglePrecisionBinaryFloatingPointNumber(45));
console.log(convertToSinglePrecisionBinaryFloatingPointNumber(-23.4));
console.log(convertToSinglePrecisionBinaryFloatingPointNumber(0.2));
console.log(convertToSinglePrecisionBinaryFloatingPointNumber(36.375));
console.log(convertToSinglePrecisionBinaryFloatingPointNumber(-123.06));
