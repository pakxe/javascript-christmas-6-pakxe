import { ERROR } from '../error/constants/error.js';
import VisitDateError from '../error/VisitDateError.js';
import Parser from '../parser/Parser.js';
import Validator from '../validator/Validator.js';
import addLeadingZero from '../utils/addLeadingZero.js';
import { DECEMBER_EVENT } from '../constant/periodInfo.js';

class CustomDate {
  #date;

  static createByDay(day) {
    const parsedDay = Parser.parseInt(day);

    this.#validateDay(parsedDay);

    const date = `${DECEMBER_EVENT.year}-${
      DECEMBER_EVENT.month
    }-${addLeadingZero(day, 2)}`;

    return new CustomDate(date);
  }

  constructor(date) {
    this.#date = new Date(date);
  }

  static #validateDay(day) {
    if (Validator.isNan(day)) throw new VisitDateError(ERROR.visitDay);
    if (
      Validator.isNotInRange(
        [DECEMBER_EVENT.startDay, DECEMBER_EVENT.endDay],
        day,
      )
    )
      throw new VisitDateError(ERROR.visitDay);
  }

  /**
   * 이 객체의 요일이 인자로 넘어온 요일 배열에 포함되지 않는지 여부 반환
   * @param { CustomDay {} }
   * @param { number [] } daysOfWeek 요일 int 배열
   * [일, 월, 화, 수, 목, 금, 토, 일] 의 인덱스를 가진다.
   */
  isInDaysOfWeek(daysOfWeek) {
    return daysOfWeek.includes(this.#date.getDay());
  }

  isInPeriod({ start, end }) {
    return this.#date >= start && this.#date <= end;
  }

  differenceDate(date) {
    const timeDifference = Math.abs(this.#date - date);
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference);
  }

  isSameDate(date) {
    const differenceDay = this.differenceDate(date);

    return differenceDay === 0;
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
