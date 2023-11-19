import CustomDate from '../../../src/model/CustomDate.js';
import ShoppingCart from '../../../src/model/ShoppingCart.js';
import { WEEKEND_DISCOUNT_PRICE } from '../../../src/model/constants/discount.js';
import EventFactory from '../../../src/model/event/EventFactory.js';

describe('주말 이벤트 테스트', () => {
  const shoppingCart = new ShoppingCart('티본스테이크-3');

  describe('이벤트 기간인 경우', () => {
    const visitDate = CustomDate.createByDay(1); // 주말
    const weekendEvent = EventFactory.create('weekend');

    test('올바른 할인 총액을 반환하는지 확인', () => {
      weekendEvent.init({ visitDate, shoppingCart });

      expect(weekendEvent.totalDiscountPrice).toEqual(
        WEEKEND_DISCOUNT_PRICE * 3,
      );
    });

    test('매인메뉴가 없는 경우 올바른 할인 총액을 반환하는지 확인', () => {
      const shoppingCartNotMainCourse = new ShoppingCart('초코케이크-2');
      weekendEvent.init({ visitDate, shoppingCart: shoppingCartNotMainCourse });

      expect(weekendEvent.totalDiscountPrice).toEqual(0);
    });
  });

  describe('이벤트 기간이 아닌 경우', () => {
    const notInPeriodDate = CustomDate.createByDay(4); // 평일
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
