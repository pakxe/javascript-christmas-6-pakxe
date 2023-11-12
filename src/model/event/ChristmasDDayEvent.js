import Event from './Event.js';

const DEFAULT_DISCOUNT_PRICE = 1000;
const INTEREST = 100;

class ChristmasDDayEvent extends Event {
  #totalDiscountPrice;

  init({ date }) {
    this.#totalDiscountPrice = this.isWithinEventDays(date)
      ? DEFAULT_DISCOUNT_PRICE + this.#calcTotalDiscountPrice(date)
      : 0;
  }

  isWithinEventDays(date) {
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
