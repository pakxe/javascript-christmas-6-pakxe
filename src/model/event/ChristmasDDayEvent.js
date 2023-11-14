import Event from './Event.js';

const DEFAULT_DISCOUNT_PRICE = 1000;
const INTEREST = 100;

class ChristmasDDayEvent extends Event {
  #totalDiscountPrice;

  init({ visitDate }) {
    this.#totalDiscountPrice = this.isWithinEventPeriod(visitDate)
      ? DEFAULT_DISCOUNT_PRICE + this.#calcTotalDiscountPrice(visitDate)
      : 0;
  }

  isWithinEventPeriod(date) {
    return date.isInPeriod(this.period);
  }

  #calcTotalDiscountPrice(date) {
    const dayDiff = date.differenceDate(this.period.start);

    return dayDiff * INTEREST;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default ChristmasDDayEvent;
