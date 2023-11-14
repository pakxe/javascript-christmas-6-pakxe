import CustomDate from '../../../src/model/CustomDate.js';
import EventFactory from '../../../src/model/event/EventFactory.js';

describe('크리스마스 디데이 이벤트 테스트', () => {
  describe('이벤트 기간인 경우', () => {
    const visitDate = CustomDate.createByDay(25);
    const christmasDDayEvent = EventFactory.create('christmasDDay');

    christmasDDayEvent.init({ visitDate });

    test.each`
      testTitle                               | input                                    | expected
      ${'올바른 할인 총액을 반환하는지 확인'} | ${christmasDDayEvent.totalDiscountPrice} | ${3400}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });

  describe('이벤트 기간이 아닌 경우', () => {
    const christmasDDayEvent = EventFactory.create('christmasDDay');
    const notInPeriodDate = new CustomDate('2023-12-28T00:00:00.000Z');
    christmasDDayEvent.init({ visitDate: notInPeriodDate });

    test.each`
      testTitle                     | input                                    | expected
      ${'할인 총액이 0원인지 확인'} | ${christmasDDayEvent.totalDiscountPrice} | ${0}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });
});
