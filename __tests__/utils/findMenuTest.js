import { CATEGORY } from '../../src/constant/menuList.js';
import findMenu from '../../src/utils/findMenu.js';

describe('이름과 일치하는 메뉴 정보를 반환하는 함수 테스트', () => {
  test('제로콜라 정보가 반환되는지 테스트', () => {
    expect(findMenu('제로콜라')).toEqual({
      name: '제로콜라',
      price: 3_000,
      category: CATEGORY.beverage,
    });
  });

  test('티본스테이크 정보가 반환되는지 테스트', () => {
    expect(findMenu('티본스테이크')).toEqual({
      name: '티본스테이크',
      price: 55_000,
      category: CATEGORY.mainCourse,
    });
  });
});
