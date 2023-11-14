import CustomDate from '../../src/model/CustomDate.js';
import EventPlanner from '../../src/model/EventPlanner.js';
import PriceCalculator from '../../src/model/PriceCalculator.js';
import ShoppingCart from '../../src/model/ShoppingCart.js';

describe('가격 계산기 테스트', () => {
  const visitDate = CustomDate.createByDay(25);
  const shoppingCart = new ShoppingCart('아이스크림-2');
  const { menuList } = shoppingCart;
  const { discountList, totalDiscountPrice } = new EventPlanner({
    visitDate,
    shoppingCart,
  });
  const totalPriceWithoutDiscount = shoppingCart.totalPrice;

  /**
   * 적용되는 이벤트
   * 크리스마스 디데이 이벤트: -3400
   * 특별 할인: -1000
   * 평일 할인: -2023 * 2
   * 총: 8446
   */

  // 성공한 경우에 대한 테스트
  test.each`
    testTitle                                                    | input                                                                           | expected
    ${'올바르게 원가를 반환하는지 확인'}                         | ${PriceCalculator.getTotalPriceWithoutDiscount(menuList)}                       | ${10000}
    ${'올바르게 할인 금액을 반환하는지 확인'}                    | ${PriceCalculator.calcTotalDiscountPrice(discountList)}                         | ${8446}
    ${'올바르게 할인이 적용된 최종 지출 금액을 반환하는지 확인'} | ${PriceCalculator.getFinalPrice(totalPriceWithoutDiscount, totalDiscountPrice)} | ${10000 - 8446}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );
});
