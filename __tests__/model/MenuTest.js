import { ERROR } from '../../src/error/constants/error.js';
import Menu from '../../src/model/Menu.js';

describe('메뉴 테스트', () => {
  test('올바른 메뉴 입력일 경우 바르게 생성되는지 확인', () => {
    const menuInput = '아이스크림-2';
    const menu = new Menu(menuInput);

    expect(menu.name).toEqual('아이스크림');
    expect(menu.count).toEqual(2);
  });

  // 오류가 나는 경우에 대한 테스트
  test.each`
    testTitle                                    | menuInput           | expected
    ${'메뉴 개수가 입력되지 않은 경우'}          | ${'티본스테이크-'}  | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'메뉴 개수와 구분자가 입력되지 않은 경우'} | ${'아이스크림'}     | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'빈 칸으로 입력된 경우'}                   | ${''}               | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'메뉴 이름이 없는 경우'}                   | ${'레드와인'}       | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'구분자만 입력된 경우'}                    | ${'-'}              | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'20개 이상으로 메뉴 개수를 입력한 경우'}   | ${'제로콜라-21'}    | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'0개 이하로 메뉴 개수를 입력한 경우'}      | ${'해산물파스타-0'} | ${`${ERROR.prefix} ${ERROR.menu}`}
    ${'없는 메뉴 입력한 경우'}                   | ${'달고나-1'}       | ${`${ERROR.prefix} ${ERROR.menu}`}
  `(
    '$testTitle테스트는 $menuInput이 입력되면 $expected 에러를 던진다.',
    ({ menuInput, expected }) => {
      expect(() => new Menu(menuInput)).toThrow(expected);
    },
  );
});
