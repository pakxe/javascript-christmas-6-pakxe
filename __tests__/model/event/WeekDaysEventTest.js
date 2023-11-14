import CustomDate from '../../../src/model/CustomDate.js';
import ShoppingCart from '../../../src/model/ShoppingCart.js';
import { WEEKDAYS_DISCOUNT_PRICE } from '../../../src/model/constants/discount.js';
import EventFactory from '../../../src/model/event/EventFactory.js';

describe('평일 이벤트 테스트', () => {
  const shoppingCart = new ShoppingCart('초코케이크-2');

  describe('이벤트 기간인 경우', () => {
    const visitDate = CustomDate.createByDay(4); // 평일
    const weekDaysEvent = EventFactory.create('weekdays');

    test('올바른 할인 총액을 반환하는지 확인', () => {
      weekDaysEvent.init({ visitDate, shoppingCart });

      expect(weekDaysEvent.totalDiscountPrice).toEqual(
        WEEKDAYS_DISCOUNT_PRICE * 2,
      );
    });

    test('디저트가 없는 경우 올바른 할인 총액을 반환하는지 확인', () => {
      const shoppingCartNotDessert = new ShoppingCart('해산물파스타-4');
      weekDaysEvent.init({ visitDate, shoppingCart: shoppingCartNotDessert });

      expect(weekDaysEvent.totalDiscountPrice).toEqual(0);
    });
  });

  describe('이벤트 기간이 아닌 경우', () => {
    const notInPeriodDate = CustomDate.createByDay(1); // 주말
    const weekDaysEvent = EventFactory.create('weekdays');

    weekDaysEvent.init({ visitDate: notInPeriodDate, shoppingCart });

    test.each`
      testTitle                     | input                               | expected
      ${'할인 총액이 0원인지 확인'} | ${weekDaysEvent.totalDiscountPrice} | ${0}
    `(
      '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
      ({ input, expected }) => {
        expect(input).toEqual(expected);
      },
    );
  });
});
