import EVENT_LIST from '../constants/eventList.js';
import ChristmasDDayEvent from './ChristmasDDayEvent.js';
import StarEvent from './StarEvent.js';
import WeekDaysEvent from './WeekDaysEvent.js';
import WeekendEvent from './WeekendEvent.js';
import FactoryError from '../../error/FactoryError.js';
import NewYearEvent from './NewYearEvent.js';
import ChampagneEvent from './ChampagneEvent.js';

class EventFactory {
  static create(name) {
    // 해당하는 이벤트가 없으면 팩토리 오류
    if (!Object.prototype.hasOwnProperty.call(EVENT_LIST, name))
      throw new FactoryError();

    return this.#checkMainEvent(name);
  }

  static #checkMainEvent(name) {
    if (name === EVENT_LIST.christmasDDay.engName)
      return new ChristmasDDayEvent(EVENT_LIST.christmasDDay);
    if (name === EVENT_LIST.weekdays.engName)
      return new WeekDaysEvent(EVENT_LIST.weekdays);
    if (name === EVENT_LIST.weekend.engName)
      return new WeekendEvent(EVENT_LIST.weekend);
    if (name === EVENT_LIST.star.engName) return new StarEvent(EVENT_LIST.star);
    if (name === EVENT_LIST.gift.engName)
      return new ChampagneEvent(EVENT_LIST.gift);

    return this.#checkNewYearEvent(name); // 체인 형식으로 이벤트 호출.. 줄이 길어지는 것을 막기위해 분리하다보니 불가피하게 이런 방식을 택하게 되었음
  }

  static #checkNewYearEvent(name) {
    // 2024.1월을 위한 새해 이벤트
    if (name === EVENT_LIST.newYear.engName)
      return new NewYearEvent(EVENT_LIST.newYear);
  }
}

export default EventFactory;
