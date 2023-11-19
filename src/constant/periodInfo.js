import deepFreeze from '../utils/deepFreeze.js';

const DECEMBER_EVENT = deepFreeze({
  year: 2023,
  month: 12,
  startDay: 1,
  endDay: 31,
});

const NEW_YEAR_EVENT = deepFreeze({
  year: 2024,
  month: 1,
});

const TIME = deepFreeze({
  start: 'T00:00:00.000Z',
  end: 'T23:59:59.000Z', // 보통의 이벤트 종료 시간
});

export { DECEMBER_EVENT, NEW_YEAR_EVENT, TIME };
