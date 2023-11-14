import ExitError from '../error/ExitError.js';
import RetryError from '../error/RetryError.js';
import CustomDate from '../model/CustomDate.js';
import EventPlanner from '../model/EventPlanner.js';
import Parser from '../parser/Parser.js';
import Io from '../view/Io.js';

class NewYearController {
  async process(orderHistory) {
    const eventInfo = await this.#retryUntilMax(() =>
      this.#requestOrderId(orderHistory),
    );

    this.#printGift(eventInfo);
  }

  async #requestOrderId(orderHistory) {
    const orderId = await this.#retryUntilMax(Io.requestOrderId);
    const parsedOrderId = Parser.parseInt(orderId);

    // 새해 이후 임시 방문일 생성
    const visitDate = new CustomDate('2024-01-24T00:03:24.000Z');
    const badge = orderHistory.findBadgeByOrderId(parsedOrderId);

    return { visitDate, badge };
  }

  async #retryUntilMax(callback) {
    let result;

    try {
      result = await callback();
    } catch (e) {
      Io.printError(e.message);

      if (e instanceof RetryError) result = await this.#retryUntilMax(callback);

      if (e instanceof ExitError) this.#exit();
    }

    return result;
  }

  #printGift(eventInfo) {
    const eventPlanner = new EventPlanner(eventInfo);

    Io.printGiftList(eventPlanner.giftList);
  }

  #exit() {
    // 종료
  }
}
/**
 * 히스터리 인자로 받기
 * 주문번호를 입력받고 -> 5번 이내
 * 찾으면 해당 이벤트에
 */

export default NewYearController;
