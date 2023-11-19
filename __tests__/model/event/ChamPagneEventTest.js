import CustomDate from '../../../src/model/CustomDate.js';
import ShoppingCart from '../../../src/model/ShoppingCart.js';
import EventFactory from '../../../src/model/event/EventFactory.js';

describe('증정 이벤트 테스트', () => {
  const visitDate = CustomDate.createByDay(25);
  const shoppingCart = new ShoppingCart('해산물파스타-10');

  describe('이벤트 기간인 경우', () => {
    const champagneEvent = EventFactory.create('champagne');
    champagneEvent.init({ visitDate, shoppingCart });

    test.each`
      testTitle                                    | input                                | expected
      ${'올바른 증정 상품 목록을 반환하는지 확인'} | ${champagneEvent.giftList}           | ${[{ name: '샴페인', count: 1 }]}
      ${'올바른 증정 상품 총액을 반환하는지 확인'} | ${champagneEvent.totalDiscountPrice} | ${25000}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });

  describe('이벤트 기간이 아닌 경우', () => {
    const champagneEvent = EventFactory.create('champagne');
    const notInPeriodDate = new CustomDate('2023-03-24T00:00:00.000Z');
    champagneEvent.init({ visitDate: notInPeriodDate, shoppingCart });

    test.each`
      testTitle                                                     | input                                | expected
      ${'이벤트 기간이 아닌 경우 상품 목록을 반환하지 않는지 확인'} | ${champagneEvent.giftList}           | ${[]}
      ${'증정 상품 총액이 0원인지 확인'}                            | ${champagneEvent.totalDiscountPrice} | ${0}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });
});
