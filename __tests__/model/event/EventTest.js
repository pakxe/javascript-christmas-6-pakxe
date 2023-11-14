import { ERROR } from '../../../src/error/constants/error.js';
import Event from '../../../src/model/event/Event.js';
import generatePeriod from '../../../src/utils/generatePeriod.js';

describe('이벤트 테스트', () => {
  const name = '테스트 이벤트';
  const period = generatePeriod({ start: '2001.03.24', end: '2023.11.13' });
  const event = new Event({ name, period });

  test.each`
    testTitle                                | input           | expected
    ${'올바른 이름으로 생성되었는지 테스트'} | ${event.name}   | ${name}
    ${'올바른 기간으로 생성되었는지 테스트'} | ${event.period} | ${period}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );

  describe('오버라이딩 오류를 뱉는지 테스트', () => {
    test.each`
      testTitle                            | input                             | expected
      ${'오버라이딩이 필요한 메서드 호출'} | ${() => event.totalDiscountPrice} | ${`${ERROR.prefix} 메서드를 오버라이딩 해주세요.`}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected" 오류를 던진다..',
      ({ input, expected }) => {
        expect(input).toThrow(expected);
      },
    );
  });
});
