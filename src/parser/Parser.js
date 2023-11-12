import DIVIDER from '../constant/divider.js';

class Parser {
  static parseInt(input) {
    return Number(input);
  }

  static trim(input) {
    return input.trim();
  }

  static splitMenuInfo(menu) {
    return menu.split(DIVIDER.menu);
  }

  static splitMenuList(menuList) {
    return menuList.split(DIVIDER.menuList);
  }
}

export default Parser;
