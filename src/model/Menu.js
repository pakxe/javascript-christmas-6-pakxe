import MENU_LIST from '../constant/menuList.js';
import ERROR from '../error/constants/error.js';
import Parser from '../parser/Parser.js';
import Validator from '../validator/Validator.js';
import { MENU_COUNT } from './constants/rule.js';
import MenuError from '../error/MenuError.js';

class Menu {
  #menu;

  constructor(menu) {
    const parsedMenu = this.#parseMenu(menu);
    this.#validateMenu(parsedMenu);

    this.#menu = parsedMenu;
  }

  #parseMenu(menu) {
    const [name, count] = Parser.splitMenuInfo(menu);
    return { name, count: Parser.parseInt(count) };
  }

  #validateMenu({ name, count }) {
    if (this.#isInvalidName(name)) throw new MenuError(ERROR.menu);
    if (this.#isInvalidCount(count)) throw new MenuError(ERROR.menu);
  }

  #isInvalidName(menuName) {
    const validMenuNameList = MENU_LIST.map(({ name }) => name);

    return !validMenuNameList.includes(menuName);
  }

  // 합치면 오버틀로우일 수 있으므로 여기서부터 합을 계산한다.
  #isInvalidCount(count) {
    return Validator.isNotInRange([MENU_COUNT.min, MENU_COUNT.max], count);
  }

  get name() {
    return this.#menu.name;
  }

  get count() {
    return this.#menu.count;
  }
}

export default Menu;
