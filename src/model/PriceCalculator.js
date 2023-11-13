import MENU_LIST from '../constant/menuList.js';
import menuListToFlatArr from '../utils/menuListToFlatArr.js';

class PriceCalculator {
  static getTotalPriceWithoutDiscount(menuList) {
    const flattedMenuList = menuListToFlatArr(menuList);

    const totalPrice = flattedMenuList.reduce(
      (total, menu) => total + this.#calcMenuPrice(menu),
      0,
    );

    return totalPrice;
  }

  static #calcMenuPrice(menu) {
    const menuPrice = this.#getMenuPrice(menu.name);

    return menuPrice * menu.count;
  }

  static #getMenuPrice(menuName) {
    const { price } = MENU_LIST.find((menu) => menu.name === menuName);

    return price;
  }

  static calcTotalDiscountPrice(discountList) {
    return discountList.reduce(
      (total, discountInfo) => total + discountInfo.totalDiscountPrice,
      0,
    );
  }

  static getFinalPrice(totalPriceWithoutDiscount, totalDiscountPrice) {
    return totalPriceWithoutDiscount - totalDiscountPrice;
  }
}

export default PriceCalculator;
