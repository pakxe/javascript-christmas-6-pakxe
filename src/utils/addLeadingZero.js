const addLeadingZero = (num, maxDigits) => {
  const numberString = `${num}`;
  const numberOfZerosToAdd = Math.max(0, maxDigits - numberString.length);

  const zeros = '0'.repeat(numberOfZerosToAdd);

  return zeros + numberString;
};

export default addLeadingZero;
