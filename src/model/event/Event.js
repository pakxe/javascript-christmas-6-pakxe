// import validateDate from '../../validator/validateDate.js';

import OverridingError from '../../error/OverridingError.js';

class Event {
  #name;

  #period; // { start: Date{} , end: Date {} }

  constructor({ name, period }) {
    this.#name = name;

    this.#period = period;
  }

  // 각자의 날짜 검증이 다를 수 있으므로 오버라이딩해서 구현하도록 함
  isWithinEventDays() {
    throw new OverridingError();
  }

  get name() {
    return this.#name;
  }

  get period() {
    return this.#period;
  }

  // 이벤트 플래너가 사용하기 쉽도록 혜택 금액 반환 메서드는 통일
  get totalDiscountPrice() {
    throw new OverridingError();
  }
}

export default Event;
