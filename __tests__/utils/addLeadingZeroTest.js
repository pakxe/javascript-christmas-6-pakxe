import addLeadingZero from '../../src/utils/addLeadingZero.js';

describe('원하는 만큼 0을 추가하는 함수 테스트', () => {
  test.each`
    testTitle                                                   | input                        | expected
    ${'2자리 수로 채워지는지 확인'}                             | ${addLeadingZero(2, 2)}      | ${'02'}
    ${'요구하는 자리수보다 큰 숫자가 들어가면 그대로인지 확인'} | ${addLeadingZero(324324, 3)} | ${'324324'}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );
});
