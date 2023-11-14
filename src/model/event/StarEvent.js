import { DECEMBER_EVENT, TIME } from '../../constant/periodInfo.js';
import addLeadingZero from '../../utils/addLeadingZero.js';
import Event from './Event.js';

const STAR_DISCOUNT_PRICE = 1_000;
const STAR_DAYS = [3, 10, 17, 24, 25, 31];

class StarEvent extends Event {
  #totalDiscountPrice;

  init({ visitDate }) {
    this.#totalDiscountPrice = this.isWithinEventPeriod(visitDate)
      ? STAR_DISCOUNT_PRICE
      : 0;
  }

  isWithinEventPeriod(date) {
    return STAR_DAYS.some((day) => {
      const starDate = this.#createStarDateObj(day);

      return date.isSameDate(new Date(starDate));
    });
  }

  #createStarDateObj(day) {
    return `${DECEMBER_EVENT.year}-${DECEMBER_EVENT.month}-${addLeadingZero(
      day,
    )}${TIME.start}`;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default StarEvent;
