import DateUtils from '../../utils/DateUtils.js';
import deepFreeze from '../../utils/deepFreeze.js';
import EVENT from '../../constant/event.js';

const MONTHLY_EVENT_PERIOD = deepFreeze({
  start: new Date(`${EVENT.year}-${EVENT.month}-01${EVENT.startTime}`),
  end: new Date(
    `${EVENT.year}-${EVENT.month}-${DateUtils.getLastDayOfMonth(
      EVENT.year,
      EVENT.month,
    )}${EVENT.endTime}`,
  ),
});

const EVENT_LIST = Object.freeze({
  christmasDDay: {
    name: '크리스마스 디데이 이벤트',
    engName: 'christmasDDay',
    period: {
      start: new Date(`${EVENT.year}-${EVENT.month}-01${EVENT.startTime}`),
      end: new Date(`${EVENT.year}-${EVENT.month}-25${EVENT.endTime}`),
    },
  },
  weekdays: {
    name: '평일 할인',
    engName: 'weekdays',
    period: MONTHLY_EVENT_PERIOD,
  },
  weekend: {
    name: '주말 할인',
    engName: 'weekend',
    period: MONTHLY_EVENT_PERIOD,
  },
  star: {
    name: '특별 할인',
    engName: 'star',
    period: MONTHLY_EVENT_PERIOD,
  },
  gift: {
    name: '증정 이벤트',
    engName: 'gift',
    period: MONTHLY_EVENT_PERIOD,
  },
});

export default EVENT_LIST;
