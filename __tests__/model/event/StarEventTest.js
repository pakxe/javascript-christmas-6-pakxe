import CustomDate from '../../../src/model/CustomDate.js';
import EventFactory from '../../../src/model/event/EventFactory.js';

describe('특별 이벤트 테스트', () => {
  describe('이벤트 기간인 경우', () => {
    const visitDate = CustomDate.createByDay(25);
    const starEvent = EventFactory.create('star');

    starEvent.init({ visitDate });

    test.each`
      testTitle                               | input                           | expected
      ${'올바른 할인 총액을 반환하는지 확인'} | ${starEvent.totalDiscountPrice} | ${1000}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });

  describe('이벤트 기간이 아닌 경우', () => {
    const notInPeriodDate = CustomDate.createByDay(1);
    const starEvent = EventFactory.create('star');

    starEvent.init({ visitDate: notInPeriodDate });

    test.each`
      testTitle                     | input                           | expected
      ${'할인 총액이 0원인지 확인'} | ${starEvent.totalDiscountPrice} | ${0}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });
});
