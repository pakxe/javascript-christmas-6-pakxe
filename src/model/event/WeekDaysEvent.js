import DateUtils from '../../utils/DateUtils.js';
import Event from './Event.js';
import { WEEKDAYS } from '../constants/daysOfWeek.js';
import { CATEGORY } from '../../constant/menuList.js';
import { WEEKDAYS_DISCOUNT_PRICE } from '../constants/discount.js';
import findMenu from '../../utils/findMenu.js';

class WeekDaysEvent extends Event {
  #totalDiscountPrice;

  init({ date, shoppingCart }) {
    this.#totalDiscountPrice = this.isWithinEventDays(date)
      ? this.#calcTotalDiscountPrice(shoppingCart)
      : 0;
  }

  isWithinEventDays(date) {
    // 이벤트 기간 이내인지
    if (!DateUtils.isInPeriod(date, this.period)) return false;

    // 이벤트 요일이 맞는지
    return DateUtils.isInDaysOfWeek(date, WEEKDAYS);
  }

  #calcTotalDiscountPrice(shoppingCart) {
    const dessertList = shoppingCart.getListOfCategory(CATEGORY.dessert);

    return dessertList.reduce(
      (total, menu) => total + this.#calcSingleDiscountPrice(menu),
      0,
    );
  }

  // 할인 금액보다 싼 상품이 있다면 그 상품의 가격만을 리턴
  #calcSingleDiscountPrice(menu) {
    const { price } = findMenu(menu.name);

    const discountPrice =
      price < WEEKDAYS_DISCOUNT_PRICE ? price : WEEKDAYS_DISCOUNT_PRICE;

    return discountPrice * menu.count;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default WeekDaysEvent;