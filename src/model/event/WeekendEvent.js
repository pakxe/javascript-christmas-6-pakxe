import Event from './Event.js';
import { WEEKEND } from '../constants/daysOfWeek.js';
import { CATEGORY } from '../../constant/menuList.js';
import { WEEKEND_DISCOUNT_PRICE } from '../constants/discount.js';
import findMenu from '../../utils/findMenu.js';

class WeekendEvent extends Event {
  #totalDiscountPrice;

  init({ visitDate, shoppingCart }) {
    this.#totalDiscountPrice = this.isWithinEventPeriod(visitDate)
      ? this.#calcTotalDiscountPrice(shoppingCart)
      : 0;
  }

  isWithinEventPeriod(date) {
    if (!date.isInPeriod(this.period)) return false;

    return date.isInDaysOfWeek(WEEKEND);
  }

  #calcTotalDiscountPrice(shoppingCart) {
    const dessertList = shoppingCart.getListOfCategory(CATEGORY.mainCourse);

    return dessertList.reduce(
      (total, menu) => total + this.#calcSingleDiscountPrice(menu),
      0,
    );
  }

  // 할인 금액보다 싼 상품이 있다면 그 상품의 가격만을 리턴
  #calcSingleDiscountPrice(menu) {
    const { price } = findMenu(menu.name);

    return price < WEEKEND_DISCOUNT_PRICE ? price : WEEKEND_DISCOUNT_PRICE;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default WeekendEvent;
