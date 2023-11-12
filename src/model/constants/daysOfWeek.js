import deepFreeze from '../../utils/deepFreeze.js';

const DAYS_OF_WEEK = deepFreeze({
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
});

const WEEKDAYS = deepFreeze([
  DAYS_OF_WEEK.sun,
  DAYS_OF_WEEK.mon,
  DAYS_OF_WEEK.tue,
  DAYS_OF_WEEK.wed,
  DAYS_OF_WEEK.thu,
]);

const WEEKEND = deepFreeze([DAYS_OF_WEEK.fri, DAYS_OF_WEEK.sat]);

export { DAYS_OF_WEEK, WEEKDAYS, WEEKEND };
