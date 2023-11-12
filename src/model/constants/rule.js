import deepFreeze from '../../utils/deepFreeze.js';

const MENU_COUNT = deepFreeze({
  min: 1,
  max: 20,
});

const MENU_LIST_COUNT = deepFreeze({
  min: 1,
  max: 20,
});

const MIN_ORDER_PRICE = 10_000;

export { MENU_COUNT, MENU_LIST_COUNT, MIN_ORDER_PRICE };
