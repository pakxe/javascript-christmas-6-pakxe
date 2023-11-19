import Io from '../view/Io.js';

const catchReturn = async (callback) => {
  let result;

  try {
    result = await callback();
  } catch (e) {
    Io.printError(e.message);
    result = await catchReturn(callback);
  }

  return result;
};

export default catchReturn;
