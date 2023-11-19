import { CATEGORY } from '../../src/constant/menuList.js';
import { ERROR } from '../../src/error/constants/error.js';
import ShoppingCart from '../../src/model/ShoppingCart.js';

describe('장바구니 테스트', () => {
  const menuListInput = '아이스크림-1,티본스테이크-2,제로콜라-3,시저샐러드-4';
  const shoppingCart = new ShoppingCart(menuListInput);

  // 정상인 경우에 대한 테스트
  test('올바른 메뉴 목록 입력일 경우 바르게 생성되는지 확인', () => {
    const menuList = shoppingCart.menuList.map(({ name, count }) => ({
      name,
      count,
    }));

    expect(menuList).toEqual([
      { name: '아이스크림', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '제로콜라', count: 3 },
      { name: '시저샐러드', count: 4 },
    ]);
  });

  test('올바르게 총 가격을 반환하는지 확인', () => {
    // 5000 + 55000 * 2 + 3000 * 3 + 8000 * 4
    expect(shoppingCart.totalPrice).toEqual(156000);
  });

  test('카테고리에 해당하는 메뉴들을 잘 반환하는지 확인', () => {
    const menuList = shoppingCart
      .getListOfCategory(CATEGORY.beverage)
      .map(({ name, count }) => ({ name, count }));

    expect(menuList).toEqual([{ name: '제로콜라', count: 3 }]);
  });

  // 오류가 나는 경우에 대한 테스트
  test.each`
    testTitle                           | menuInput                          | expected
    ${'중복되는 메뉴 입력이 있는 경우'} | ${'티본스테이크-2,티본스테이크-4'} | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'총 합 20개가 넘는 입력인 경우'}  | ${'아이스크림-10,시저샐러드-21'}   | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'음료만 있는 입력인 경우'}        | ${'제로콜라-1'}                    | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'빈칸 입력인 경우'}               | ${''}                              | ${`${ERROR.prefix} ${ERROR.menu}`}
  `(
    '$testTitle 테스트는 "$menuInput"이 입력되면 "$expected"라고 에러를 던진다.',
    ({ menuInput, expected }) => {
      expect(() => new ShoppingCart(menuInput)).toThrow(expected);
    },
  );
});
