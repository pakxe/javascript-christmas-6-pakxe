import addMoneyDelimiter from '../../src/utils/addMoneyDelimiter.js';

describe('돈에 구분자를 추가하는 함수 테스트', () => {
  test.each`
    testTitle                                    | input                         | expected
    ${'100원이 100원 그대로 나오는지 테스트'}    | ${addMoneyDelimiter(100)}     | ${'100'}
    ${'1000원이 1,000원이 되는지 테스트'}        | ${addMoneyDelimiter(1000)}    | ${'1,000'}
    ${'10000원이 10,000원이 되는지 테스트'}      | ${addMoneyDelimiter(10000)}   | ${'10,000'}
    ${'100000원이 100,000원이 되는지 테스트'}    | ${addMoneyDelimiter(100000)}  | ${'100,000'}
    ${'1000000원이 1,000,000원이 되는지 테스트'} | ${addMoneyDelimiter(1000000)} | ${'1,000,000'}
  `(
    '$testTitle 테스트는 "$input"이 입력되면 "$expected"과 일치한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );
});
