import deepFreeze from '../../utils/deepFreeze.js';
import generateEventPeriod from '../../utils/generateEventPeriod.js';

const UNTIL_CHRISTMAS = {
  start: '2023.12.01',
  end: '2023.12.25',
};

export const MONTHLY = {
  start: '2023.12.01',
  end: '2023.12.31',
};

export const NEW_YEAR = {
  start: '2024.01.01',
  end: '2024.01.31',
};

const EVENT_LIST = deepFreeze({
  christmasDDay: {
    name: '크리스마스 디데이 이벤트',
    engName: 'christmasDDay',
    period: generateEventPeriod(UNTIL_CHRISTMAS),
  },
  weekdays: {
    name: '평일 할인',
    engName: 'weekdays',
    period: generateEventPeriod(MONTHLY),
  },
  weekend: {
    name: '주말 할인',
    engName: 'weekend',
    period: generateEventPeriod(MONTHLY),
  },
  star: {
    name: '특별 할인',
    engName: 'star',
    period: generateEventPeriod(MONTHLY),
  },
  gift: {
    name: '증정 이벤트',
    engName: 'gift',
    period: generateEventPeriod(MONTHLY),
  },
  newYear: {
    name: '새해 이벤트',
    engName: 'newYear',
    period: generateEventPeriod(NEW_YEAR),
  },
});

export default EVENT_LIST;
