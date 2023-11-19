import { ERROR } from '../../src/error/constants/error.js';
import CustomDate from '../../src/model/CustomDate.js';
import { DAYS_OF_WEEK, WEEKEND } from '../../src/model/constants/daysOfWeek.js';
import generatePeriod from '../../src/utils/generatePeriod.js';

describe('방문일 테스트', () => {
  const visitDateInput = '1'; // 2023-12-01은 금요일!
  const visitDate = CustomDate.createByDay(visitDateInput);

  const sameDateDiffTime = new Date('2023-12-01T23:12:00.001Z');
  const anotherDate = new Date('2023-11-30T10:12:00.001Z');
  const period = generatePeriod({ start: '2023.12.01', end: '2023.12.03' });

  // 성공한 경우에 대한 테스트
  test.each`
    testTitle                                                        | input                                     | expected
    ${'올바른 방문일 입력일 경우 바르게 생성되는지 확인'}            | ${visitDate.date}                         | ${1}
    ${'같은 날짜지만 다른 시간이어도 같은 날이라고 출력되는지 확인'} | ${visitDate.isSameDate(sameDateDiffTime)} | ${true}
    ${'날짜의 차이를 올바르게 구하는지 확인'}                        | ${visitDate.differenceDate(anotherDate)}  | ${1}
    ${'기간이내인지를 올바르게 구하는지 확인'}                       | ${visitDate.isInPeriod(period)}           | ${true}
    ${'주말(금, 토)에 포함되는지 확인'}                              | ${visitDate.isInDaysOfWeek(WEEKEND)}      | ${true}
    ${'요일을 올바르게 반환하는지 확인'}                             | ${visitDate.day}                          | ${DAYS_OF_WEEK.fri}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );

  // 오류가 나는 경우에 대한 테스트
  test.each`
    testTitle                          | input                                 | expected
    ${'1~31이내의 방문일이 아닌 경우'} | ${() => CustomDate.createByDay(0)}    | ${`${ERROR.prefix} ${ERROR.visitDay}`}
    ${'숫자가 아닌 경우'}              | ${() => CustomDate.createByDay('hi')} | ${`${ERROR.prefix} ${ERROR.visitDay}`}
    ${'빈 입력일 경우'}                | ${() => CustomDate.createByDay()}     | ${`${ERROR.prefix} ${ERROR.visitDay}`}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected" 에러를 던진다.',
    ({ input, expected }) => {
      expect(input).toThrow(expected);
    },
  );
});
