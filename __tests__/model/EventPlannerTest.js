import CustomDate from '../../src/model/CustomDate.js';
import EventPlanner from '../../src/model/EventPlanner.js';
import ShoppingCart from '../../src/model/ShoppingCart.js';

describe('이벤트 플래너 테스트', () => {
  test('다중 이벤트 상황에서 이벤트 리스트와 할인 금액, 최종 금액 테스트', () => {
    const visitDate = CustomDate.createByDay(25);
    const shoppingCart = new ShoppingCart(
      '티본스테이크-3,초코케이크-2,샴페인-2,양송이수프-1',
    );

    /**
     * 크리스마스 디데이 이벤트: 1000 + 24 * 100 = 3400
     * 평일 할인: 25일 = 월요일, 초코케이크 2개 = 2023 * 2
     * 특별 할인: 별이 달려있으므로 1000
     * 증정 이벤트: 총 구매 액이 12만원이 넘으므로 샴페인 증정 25000
     */
    const eventPlanner = new EventPlanner({ visitDate, shoppingCart });
    const expectedDiscountList = [
      { name: '크리스마스 디데이 이벤트', totalDiscountPrice: 3400 },
      { name: '평일 할인', totalDiscountPrice: 4046 },
      { name: '특별 할인', totalDiscountPrice: 1000 },
      { name: '증정 이벤트', totalDiscountPrice: 25000 },
    ];

    // 55000 * 3 + 15000 * 2 + 25000 * 2 + 6000 = 251000
    expect(eventPlanner.discountList).toEqual(expectedDiscountList);
    expect(eventPlanner.giftList).toEqual([{ name: '샴페인', count: 1 }]);
    expect(eventPlanner.totalDiscountPrice).toEqual(33446);
    expect(eventPlanner.calcFinalPrice(shoppingCart.totalPrice)).toEqual(
      251000 - 33446 + 25000,
    );
  });

  test('10000원 이하 상황에서 이벤트 리스트와 할인 금액, 최종 금액 테스트', () => {
    const visitDate = CustomDate.createByDay(1);
    const shoppingCart = new ShoppingCart('아이스크림-1');

    const eventPlanner = new EventPlanner({ visitDate, shoppingCart });

    expect(eventPlanner.discountList).toEqual([]);
    expect(eventPlanner.giftList).toEqual([]);
    expect(eventPlanner.totalDiscountPrice).toEqual(0);
    expect(eventPlanner.calcFinalPrice(shoppingCart.totalPrice)).toEqual(5000);
  });

  test('(데모) 새해에 이벤트 리스트와 할인 금액, 상품 목록 테스트', () => {
    const visitDate = new CustomDate('2024-01-04T00:00:00.000Z');
    const badge = '산타';

    const eventPlanner = new EventPlanner({ visitDate, badge });

    /**
     * 배지는 산타
     * 산타에 해당하는 새해 이벤트의 증정품은 '산타 상품', 가격은 3000원(상당)
     */
    expect(eventPlanner.discountList).toEqual([
      { name: '새해 이벤트', totalDiscountPrice: 3_000 },
    ]);
    expect(eventPlanner.giftList).toEqual([{ name: '산타 상품', count: 1 }]);
    expect(eventPlanner.totalDiscountPrice).toEqual(3_000);
  });
});
