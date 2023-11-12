import MENU_LIST from '../constant/menuList.js';

const findMenu = (name) => {
  return MENU_LIST.find((menu) => menu.name === name);
};

export default findMenu;
