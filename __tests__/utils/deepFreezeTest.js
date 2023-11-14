import deepFreeze from '../../src/utils/deepFreeze.js';

describe('깊은 수정 금지를 명령하는 함수 테스트', () => {
  test('', () => {
    const obj = deepFreeze({
      me: {
        name: 'pakxe',
        major: 'ICE',
        univ: 'inha',
      },
    });

    expect(() => {
      obj.name = '나는 이름 도둑이당';
    }).toThrow(); // 이름이 바뀌지 못하고 수정할 수 없단 에러를 던짐
  });
});
