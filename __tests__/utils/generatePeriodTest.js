import { TIME } from '../../src/constant/periodInfo.js';
import generatePeriod from '../../src/utils/generatePeriod.js';

test('시작과 끝으로 구성된 기간을 반환하는 함수 테스트', () => {
  const { start, end } = generatePeriod({
    start: '2001.03.24',
    end: '2023.11.13',
  });

  const expectedStart = new Date(`2001-03-24${TIME.start}`);
  const expectedEnd = new Date(`2023-11-13${TIME.end}`);

  expect(start.getTime()).toEqual(expectedStart.getTime()); // 두 기간을 시간으로 반환한 값이 일치 = 같은 날과 시간
  expect(end.getTime()).toEqual(expectedEnd.getTime());
});
