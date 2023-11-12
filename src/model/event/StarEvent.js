import CustomDate from '../CustomDate.js';
import Event from './Event.js';

const STAR_DISCOUNT_PRICE = 1_000;
const STAR_DAYS = [3, 10, 17, 24, 25, 31];

class StarEvent extends Event {
  #totalDiscountPrice;

  init({ date }) {
    this.#totalDiscountPrice = this.isWithinEventDays(date)
      ? STAR_DISCOUNT_PRICE
      : 0;
  }

  isWithinEventDays(date) {
    return STAR_DAYS.some((day) => date.isSameDate(new CustomDate(day)));
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}
export default StarEvent;
