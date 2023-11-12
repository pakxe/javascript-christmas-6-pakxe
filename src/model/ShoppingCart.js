import Parser from '../parser/Parser.js';
import findMenu from '../utils/findMenu.js';
import validateMenuList from '../validator/validateMenuList.js';
import Menu from './Menu.js';
import PriceCalculator from './PriceCalculator.js';
import MenuListDto from '../dto/MenuListDto.js';

class ShoppingCart {
  #menuList = new Map(); // { category: Menu [] } 구조

  constructor(menuList) {
    const parsedMenuList = this.#parseMenuList(menuList);
    this.#categorizeMenuList(parsedMenuList);

    validateMenuList(this.#menuList);
  }

  #categorizeMenuList(menuList) {
    menuList.forEach((menu) => {
      const { category } = findMenu(menu.name);

      if (this.#menuList.has(category)) this.#menuList.get(category).push(menu);
      else this.#menuList.set(category, [menu]);
    });
  }

  #parseMenuList(menuList) {
    const splittedMenuList = Parser.splitMenuList(menuList);

    return splittedMenuList.map((menu) => new Menu(menu));
  }

  getListOfCategory(category) {
    if (!this.#menuList.has(category)) return [];

    return this.#menuList.get(category);
  }

  get totalPrice() {
    return PriceCalculator.getTotalPriceWithoutDiscount(this.#menuList);
  }

  get menuList() {
    return MenuListDto.get(this.#menuList);
  }
}

export default ShoppingCart;
