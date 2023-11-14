import FactoryError from '../../../src/error/FactoryError.js';
import ChampagneEvent from '../../../src/model/event/ChampagneEvent.js';
import ChristmasDDayEvent from '../../../src/model/event/ChristmasDDayEvent.js';
import EventFactory from '../../../src/model/event/EventFactory.js';
import NewYearEvent from '../../../src/model/event/NewYearEvent.js';
import StarEvent from '../../../src/model/event/StarEvent.js';
import WeekDaysEvent from '../../../src/model/event/WeekDaysEvent.js';
import WeekendEvent from '../../../src/model/event/WeekendEvent.js';

describe('이벤트 팩토리 테스트', () => {
  test.each`
    testTitle                     | event                                   | expectedInstanceType
    ${'크리스마스 디데이 이벤트'} | ${EventFactory.create('christmasDDay')} | ${ChristmasDDayEvent}
    ${'평일 이벤트'}              | ${EventFactory.create('weekdays')}      | ${WeekDaysEvent}
    ${'주말 이벤트'}              | ${EventFactory.create('weekend')}       | ${WeekendEvent}
    ${'특별 이벤트'}              | ${EventFactory.create('star')}          | ${StarEvent}
    ${'증정 이벤트'}              | ${EventFactory.create('champagne')}     | ${ChampagneEvent}
    ${'(데모) 새해 이벤트'}       | ${EventFactory.create('newYear')}       | ${NewYearEvent}
  `(
    '$testTitle 테스트는 "$input"의 타입이 "$expectedInstanceType"과 일치하는지 확인한다.',
    ({ input, expected }) => {
      expect(input).toEqual(expected);
    },
  );

  test('이벤트 리스트에 없는 이름 입력시 오류', () => {
    expect(() => EventFactory.create('pakxe').toThrow(FactoryError));
  });
});
