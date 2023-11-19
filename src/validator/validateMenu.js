import MENU_LIST from '../constant/menuList.js';
import MenuError from '../error/MenuError.js';
import { ERROR } from '../error/constants/error.js';
import { MENU_COUNT } from '../model/constants/rule.js';
import Validator from './Validator.js';

const isInvalidName = (menuName) => {
  const validMenuNameList = MENU_LIST.map(({ name }) => name);

  return !validMenuNameList.includes(menuName);
};

// 합치면 오버틀로우일 수 있으므로 여기서부터 합을 계산한다.
const isInvalidCount = (count) => {
  return Validator.isNotInRange([MENU_COUNT.min, MENU_COUNT.max], count);
};

const validateMenu = ({ name, count }) => {
  if (Validator.isNan(count)) throw new MenuError(ERROR.menu);
  if (isInvalidName(name)) throw new MenuError(ERROR.menu);
  if (isInvalidCount(count)) throw new MenuError(ERROR.menu);
};

export default validateMenu;
