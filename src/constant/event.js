import deepFreeze from '../utils/deepFreeze.js';

const EVENT = deepFreeze({
  year: 2023,
  month: 12,
  startTime: 'T00:00:00.000Z',
  endTime: 'T23:59:59.000Z', // 보통의 이벤트 종료 시간
});

export default EVENT;
