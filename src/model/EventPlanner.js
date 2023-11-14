import PriceCalculator from './PriceCalculator.js';
import EVENT_LIST from './constants/eventList.js';
import { MIN_ORDER_PRICE } from './constants/rule.js';
import EventFactory from './event/EventFactory.js';
import GiftEvent from './event/GiftEvent.js';

class EventPlanner {
  #eventList;

  #discountList;

  #totalDiscountPrice; // 재호출로 소모되는 시간을 줄이기 위한 멤버 변수 할당

  constructor(eventParams) {
    this.#eventList = this.#initEventList(eventParams);

    this.#discountList = this.#getDiscountList(eventParams);

    this.#totalDiscountPrice = PriceCalculator.calcTotalDiscountPrice(
      this.#discountList,
    );
  }

  #initEventList(eventParams) {
    const { shoppingCart, visitDate } = eventParams;
    if (shoppingCart?.totalPrice < MIN_ORDER_PRICE) return [];

    const eventList = [];
    Object.values(EVENT_LIST).forEach((event) => {
      if (!visitDate.isInPeriod(event.period)) return;

      eventList.push(EventFactory.create(event.engName));
    });
    return eventList;
  }

  // 이벤트마다 init에 필요한 인자가 다를 수 있으므로 params로 받아 사용
  #getDiscountList(eventParams) {
    return this.#eventList.map((event) =>
      this.#singleDiscountPrice({ event, eventParams }),
    );
  }

  #singleDiscountPrice({ event, eventParams }) {
    event.init(eventParams); // 선택적으로 수용하도록 함

    return { name: event.name, totalDiscountPrice: event.totalDiscountPrice };
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

  #getGiftEventList() {
    return this.#eventList.filter((event) => event instanceof GiftEvent);
  }

  get giftList() {
    return this.#getGiftEventList()
      .map((giftEvent) => giftEvent.giftList)
      .flat();
  }

  get discountList() {
    return this.#discountList;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default EventPlanner;
