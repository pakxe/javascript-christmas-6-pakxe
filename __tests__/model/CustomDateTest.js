import { DECEMBER_EVENT } from '../../src/constant/periodInfo.js';
import { ERROR } from '../../src/error/constants/error.js';
import CustomDate from '../../src/model/CustomDate.js';
import Menu from '../../src/model/Menu.js';

const SAME_DATE_DIFF_TIME = new Date(
  `${DECEMBER_EVENT.year}-${DECEMBER_EVENT.month}-24T23:12:00.001Z`, // 2023-12-24
);
const ANOTHER_DATE = new Date(
  `${DECEMBER_EVENT.year}-${DECEMBER_EVENT.month}-23T10:12:00.001Z`,
); // 2023-12-03

describe('방문일 테스트', () => {
  const visitDateInput = '24';
  const visitDate = CustomDate.createByDay(visitDateInput);

  // 성공한 경우에 대한 테스트
  test.each`
    testTitle                                                        | input                                        | expected
    ${'올바른 방문일 입력일 경우 바르게 생성되는지 확인'}            | ${visitDate.date}                            | ${24}
    ${'같은 날짜지만 다른 시간이어도 같은 날이라고 출력되는지 확인'} | ${visitDate.isSameDate(SAME_DATE_DIFF_TIME)} | ${true}
    ${'날짜의 차이를 올바르게 구하는지 확인'}                        | ${visitDate.differenceDate(ANOTHER_DATE)}    | ${1}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );

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
    '$testTitle 테스트는 "$menuInput"이 입력되면 "$expected" 에러를 던진다.',
    ({ menuInput, expected }) => {
      expect(() => new Menu(menuInput)).toThrow(expected);
    },
  );
});
