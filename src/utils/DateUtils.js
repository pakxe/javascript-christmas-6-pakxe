import CustomDate from '../model/CustomDate.js';

class DateUtils {
  static getLastDayOfMonth(year, month) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  /**
   * 이 객체의 요일이 인자로 넘어온 요일 배열에 포함되지 않는지 여부 반환
   * @param { CustomDay {} }
   * @param { number [] } daysOfWeek 요일 int 배열
   * [일, 월, 화, 수, 목, 금, 토, 일] 의 인덱스를 가진다.
   */
  static isInDaysOfWeek(date, daysOfWeek) {
    const thisDay = date.day;

    return daysOfWeek.includes(thisDay);
  }

  static isInPeriod(date, { start, end }) {
    return date.get() >= start && date.get() <= end;
  }

  static differenceDay(date, anotherDate) {
    let timeDifference;

    if (anotherDate instanceof CustomDate)
      timeDifference = Math.abs(date.get() - anotherDate.get());
    if (anotherDate instanceof Date)
      timeDifference = Math.abs(date.get() - anotherDate);

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference);
  }

  static isSameDate(date, anotherDate) {
    const differenceDay = DateUtils.differenceDay(date, anotherDate);

    return differenceDay === 0;
  }
}

export default DateUtils;
