import Badge, { BADGE_LIST, NO_BADGE } from '../../src/model/Badge.js';

describe('배지 테스트', () => {
  // 성공한 경우에 대한 테스트
  test.each`
    testTitle                                        | input                      | expected
    ${'5000원 미만은 "배지 없음"이 출력되는지 확인'} | ${Badge.checkBadge(4999)}  | ${NO_BADGE}
    ${'5000원 이상은 "별"이 출력되는지 확인'}        | ${Badge.checkBadge(5000)}  | ${BADGE_LIST[0].name}
    ${'10000원 이상은 "트리"가 출력되는지 확인'}     | ${Badge.checkBadge(12000)} | ${BADGE_LIST[1].name}
    ${'20000원 이상은 "산타"가 출력되는지 확인'}     | ${Badge.checkBadge(20000)} | ${BADGE_LIST[2].name}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );
});
