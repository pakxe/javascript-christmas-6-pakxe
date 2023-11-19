import EVENT_LIST from '../constants/eventList.js';
import ChristmasDDayEvent from './ChristmasDDayEvent.js';
import StarEvent from './StarEvent.js';
import WeekDaysEvent from './WeekDaysEvent.js';
import WeekendEvent from './WeekendEvent.js';
import FactoryError from '../../error/FactoryError.js';
import NewYearEvent from './NewYearEvent.js';
import ChampagneEvent from './ChampagneEvent.js';

class EventFactory {
  static #eventMap = new Map([
    [EVENT_LIST.christmasDDay.engName, ChristmasDDayEvent],
    [EVENT_LIST.weekdays.engName, WeekDaysEvent],
    [EVENT_LIST.weekend.engName, WeekendEvent],
    [EVENT_LIST.star.engName, StarEvent],
    [EVENT_LIST.champagne.engName, ChampagneEvent],
    [EVENT_LIST.newYear.engName, NewYearEvent],
  ]);

  static create(name) {
    // 해당하는 이벤트가 없으면 팩토리 오류
    if (!Object.prototype.hasOwnProperty.call(EVENT_LIST, name))
      throw new FactoryError();

    const EventClass = this.#eventMap.get(name);

    if (EventClass) return new EventClass(EVENT_LIST[name]);
  }
}

export default EventFactory;
