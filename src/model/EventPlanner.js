import PriceCalculator from './PriceCalculator.js';
import EVENT_LIST from './constants/eventList.js';
import EventFactory from './event/EventFactory.js';
import GiftEvent from './event/GiftEvent.js';

class EventPlanner {
  #eventList;

  #discountList;

  #totalDiscountPrice;

  constructor(date, shoppingCart) {
    this.#eventList = this.#initEventList();

    this.#discountList = this.#getDiscountList(date, shoppingCart);

    this.#totalDiscountPrice = PriceCalculator.getTotalDiscountPrice(
      this.#discountList,
    );
  }

  #initEventList() {
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
    const giftEventList = this.#eventList.filter(
      (event) => event instanceof GiftEvent,
    ); // TODO: 보편적인 상속으로 바꾸기

    return giftEventList.map((giftEvent) => giftEvent.giftList).flat();
  }

  get discountList() {
    return this.#discountList;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }

  // TODO: 할인 총액이 중복계산되는 부분 수정
  getFinalPrice(totalPriceWithoutDiscount) {
    const giftPrice = this.#eventList
      .filter((event) => event instanceof GiftEvent)
      .reduce((total, event) => total + event.totalDiscountPrice, 0);

    return PriceCalculator.getFinalPrice(
      totalPriceWithoutDiscount,
      this.#totalDiscountPrice - giftPrice,
    );
  }
}

export default EventPlanner;
