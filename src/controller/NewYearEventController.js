import ExitError from '../error/ExitError.js';
import RetryError from '../error/RetryError.js';
import CustomDate from '../model/CustomDate.js';
import EventPlanner from '../model/EventPlanner.js';
import Parser from '../parser/Parser.js';
import Io from '../view/Io.js';

class NewYearController {
  async process(orderHistory) {
    const orderId = await this.#retryUntilMax(this.#requestOrderId);
    const eventInfo = this.#findBadgeByOrderId({ orderHistory, orderId });

    this.#printGift(eventInfo);
  }

  async #requestOrderId() {
    const orderId = await Io.requestOrderId();
    const parsedOrderId = Parser.parseInt(orderId);

    return parsedOrderId;
  }

  #findBadgeByOrderId({ orderHistory, orderId }) {
    // 새해 이후 임시 방문일 생성
    const visitDate = new CustomDate('2024-01-24T00:03:24.000Z');
    const badge = orderHistory.findBadgeByOrderId(orderId);

    return { visitDate, badge };
  }

  #printGift(eventInfo) {
    const { giftList } = new EventPlanner(eventInfo);

    Io.printGiftList(giftList);
  }

  #exit() {
    // 종료
  }

  async #retryUntilMax(callback) {
    let result;

    try {
      result = await callback();
    } catch (e) {
      Io.printError(e.message);

      if (e instanceof RetryError) result = await this.#retryUntilMax(callback); // 재시도 5회 이내
      if (e instanceof ExitError) this.#exit(); // 재시도 5회 초과
    }

    return result;
  }
}

export default NewYearController;
