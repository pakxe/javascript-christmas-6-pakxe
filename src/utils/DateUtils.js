class DateUtils {
  static getLastDayOfMonth(year, month) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }
}

export default DateUtils;
