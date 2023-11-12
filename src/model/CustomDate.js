import ERROR from '../error/constants/error.js';
import EVENT from '../constant/eventInfo.js';
import VisitDateError from '../error/VisitDateError.js';
import Parser from '../parser/Parser.js';
import Validator from '../validator/Validator.js';

class CustomDate {
  #date;

  constructor(day) {
    const parsedDay = Parser.parseInt(day);

    this.#validateDay(parsedDay);

    // 확장 가능성을 생각해 Date 객체로 다룸
    this.#date = new Date(
      `${EVENT.year}-${EVENT.month}-${Parser.addLeadingZero(day, 2)}`,
    );
  }

  #validateDay(day) {
    if (Validator.isNan(day)) throw new VisitDateError(ERROR.visitDay);
    if (Validator.isNotInRange([EVENT.startDay, EVENT.endDay], day))
      throw new VisitDateError(ERROR.visitDay);
  }

  get() {
    return this.#date;
  }

  // 년월일 중 일
  get date() {
    return this.#date.getDate();
  }

  // 요일
  get day() {
    return this.#date.getDay();
  }
}

export default CustomDate;
