import DateUtils from '../../utils/DateUtils.js';
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
    return STAR_DAYS.some((day) =>
      DateUtils.isSameDate(new CustomDate(day), date),
    );
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}
export default StarEvent;
