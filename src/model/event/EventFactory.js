import EVENT_LIST from '../constants/eventList.js';
import ChristmasDDayEvent from './ChristmasDDayEvent.js';
import GiftEvent from './GiftEvent.js';
import StarEvent from './StarEvent.js';
import WeekDaysEvent from './WeekDaysEvent.js';
import WeekendEvent from './WeekendEvent.js';
import FactoryError from '../../error/FactoryError.js';

class EventFactory {
  static create(name) {
    // 해당하는 이벤트가 없으면 팩토리 오류
    if (!Object.prototype.hasOwnProperty.call(EVENT_LIST, name))
      throw new FactoryError();

    if (name === EVENT_LIST.christmasDDay.engName)
      return new ChristmasDDayEvent(EVENT_LIST.christmasDDay);
    if (name === EVENT_LIST.weekdays.engName)
      return new WeekDaysEvent(EVENT_LIST.weekdays);
    if (name === EVENT_LIST.weekend.engName)
      return new WeekendEvent(EVENT_LIST.weekend);
    if (name === EVENT_LIST.star.engName) return new StarEvent(EVENT_LIST.star);
    if (name === EVENT_LIST.gift.engName) return new GiftEvent(EVENT_LIST.gift);
  }
}

export default EventFactory;
