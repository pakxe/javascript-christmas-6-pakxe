import { CATEGORY } from '../constant/menuList.js';
import MenuError from '../error/MenuError.js';
import ERROR from '../error/constants/error.js';
import PriceCalculator from '../model/PriceCalculator.js';
import {
  MENU_COUNT,
  MENU_LIST_COUNT,
  MIN_ORDER_PRICE,
} from '../model/constants/menu.js';
import menuListToFlatArr from '../utils/menuListToFlatArr.js';
import Validator from './Validator.js';

// 데이터를 담을 필요가 없으므로 함수로 작성
const isDuplicatedMenu = (menuList) => {
  const menuNameList = menuList.map((menu) => menu.name);
  const uniqueMenuList = new Set(menuNameList);

  return uniqueMenuList.size !== menuList.length;
};

const isInvalidCount = (menuList) => {
  const totalCount = menuList.reduce((total, menu) => total + menu.count, 0);

  return Validator.isNotInRange([MENU_COUNT.min, MENU_COUNT.max], totalCount);
};

// 최소 주문 메뉴 개수가 있는 경우 (ex. 1인 1메뉴 처럼)
const isInvalidMenuCount = (menuList) => {
  const menuCount = menuList.length;

  return Validator.isNotInRange([
    MENU_LIST_COUNT.min,
    MENU_LIST_COUNT.max,
    menuCount,
  ]);
};

const isOnlyBeverage = (menuList) => {
  if (menuList.has(CATEGORY.beverage) && menuList.size === 1) return true;

  return false;
};

const isUnderMinOrderPrice = (menuList) => {
  return (
    PriceCalculator.getTotalPriceWithoutDiscount(menuList) < MIN_ORDER_PRICE
  );
};

const validateMenuList = (menuList) => {
  const flattedMenuList = menuListToFlatArr(menuList);

  if (isDuplicatedMenu(flattedMenuList)) throw new MenuError(ERROR.menu);
  if (isInvalidCount(flattedMenuList)) throw new MenuError(ERROR.menu);
  if (isInvalidMenuCount(flattedMenuList)) throw new MenuError(ERROR.menu);

  if (isOnlyBeverage(menuList)) throw new MenuError(ERROR.onlyBeverage);
  if (isUnderMinOrderPrice(menuList))
    throw new MenuError(ERROR.underMinOrderPrice);
};

export default validateMenuList;
