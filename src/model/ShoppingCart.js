import Parser from '../parser/Parser.js';
import findMenu from '../utils/findMenu.js';
import validateMenuList from '../validator/validateMenuList.js';
import Menu from './Menu.js';
import PriceCalculator from './PriceCalculator.js';
import MenuListDto from '../dto/MenuListDto.js';

class ShoppingCart {
  #menuList = new Map(); // { category: Menu [] }

  #totalPrice; // 계산에 리소스가 많이 필요할 수도 있으므로 생성자에서 미리 계산

  constructor(menuList) {
    const parsedMenuList = this.#parseMenuList(menuList);
    this.#categorizeMenuList(parsedMenuList);

    validateMenuList(this.#menuList);

    this.#totalPrice = PriceCalculator.getTotalPriceWithoutDiscount(
      this.#menuList,
    );
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
    return this.#totalPrice;
  }

  get menuList() {
    return MenuListDto.get(this.#menuList);
  }
}

export default ShoppingCart;
