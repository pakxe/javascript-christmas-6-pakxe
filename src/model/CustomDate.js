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

  isInDaysOfWeek(daysOfWeek) {
    return daysOfWeek.includes(this.#date.getDay());
  }

  isInPeriod({ start, end }) {
    return this.#date >= start && this.#date <= end;
  }

  differenceDate(anotherDate) {
    const timeDifference = Math.abs(this.#date - anotherDate);
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference);
  }

  isSameDate(anotherDate) {
    const differenceDay = this.differenceDate(anotherDate);

    return differenceDay === 0;
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
