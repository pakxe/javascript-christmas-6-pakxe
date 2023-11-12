import Parser from '../parser/Parser.js';
import validateMenu from '../validator/validateMenu.js';

class Menu {
  #menu;

  constructor(menu) {
    const parsedMenu = this.#parseMenu(menu);
    validateMenu(parsedMenu);

    this.#menu = parsedMenu;
  }

  #parseMenu(menu) {
    const [name, count] = Parser.splitMenuInfo(menu);
    return { name, count: Parser.parseInt(count) };
  }

  get name() {
    return this.#menu.name;
  }

  get count() {
    return this.#menu.count;
  }
}

export default Menu;
