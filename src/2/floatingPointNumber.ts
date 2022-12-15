import { NumberToBinary } from '../NumberToBinary';

const convertToSinglePrecisionBinaryFloatingPointNumber = (num: number) => {
  const signPart = getSignPart(num);
  const ntb = new NumberToBinary();
  const binary = ntb.convertNumberToBinary(num, 32);
  const [exponent, mantissa] = convertExponentAndMantissa(binary);
  return `${signPart}${exponent}${mantissa}`;
};

const getSignPart = (num: number) => {
  return num >= 0 ? 0 : 1;
};

const convertExponentAndMantissa = (binary: string) => {
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
  const ntb = new NumberToBinary();
  const exponent = ntb.convertIntegerToBinary(bias + index);
  const mantissa = roundMantissa(n);
  return [exponent, mantissa];
};

const roundMantissa = (numStr: string) => {
  const mantissa = numStr.split('.')[1];
  return mantissa.substring(0, 23);
};

console.log(convertToSinglePrecisionBinaryFloatingPointNumber(45));
