import PriceCalculator from './PriceCalculator.js';
import EVENT_LIST from './constants/eventList.js';
import { MIN_ORDER_PRICE } from './constants/rule.js';
import EventFactory from './event/EventFactory.js';
import GiftEvent from './event/GiftEvent.js';

class EventPlanner {
  #eventList;

  #discountList;

  #totalDiscountPrice; // 재호출로 소모되는 시간을 줄이기 위한 멤버 변수 할당

  constructor(date, shoppingCart) {
    this.#eventList = this.#initEventList(shoppingCart.totalPrice);

    this.#discountList = this.#getDiscountList(date, shoppingCart);

    this.#totalDiscountPrice = PriceCalculator.calcTotalDiscountPrice(
      this.#discountList,
    );
  }

  #initEventList(totalPrice) {
    // 10000원 이하면 이벤트 적용 x
    if (totalPrice < MIN_ORDER_PRICE) return [];

    return Object.values(EVENT_LIST).map((event) =>
      EventFactory.create(event.engName),
    );
  }

  #getDiscountList(date, shoppingCart) {
    return this.#eventList.map((event) =>
      this.#singleDiscountPrice(event, date, shoppingCart),
    );
  }

  #singleDiscountPrice(event, date, shoppingCart) {
    event.init({ date, shoppingCart }); // 선택적으로 수용하도록 함

    return { name: event.name, totalDiscountPrice: event.totalDiscountPrice };
  }

  get giftList() {
    return this.#getGiftEventList()
      .map((giftEvent) => giftEvent.giftList)
      .flat();
  }

  #getGiftEventList() {
    return this.#eventList.filter((event) => event instanceof GiftEvent);
  }

  get discountList() {
    return this.#discountList;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }

  calcFinalPrice(totalPriceWithoutDiscount) {
    const totalGiftPrice = this.#getGiftEventList().reduce(
      (total, event) => total + event.totalDiscountPrice,
      0,
    );

    const totalDiscountPrice = this.#totalDiscountPrice - totalGiftPrice;
    return PriceCalculator.getFinalPrice(
      totalPriceWithoutDiscount,
      totalDiscountPrice,
    );
  }
}

export default EventPlanner;
