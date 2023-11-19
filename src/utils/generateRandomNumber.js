const generateRandomNumber = (length) => {
  const numberLength = `1e${length}`;
  const randomNumber = Math.floor(Math.random() * numberLength);

  return randomNumber;
};

export default generateRandomNumber;
