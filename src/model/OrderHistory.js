import ExitError from '../error/ExitError.js';
import RetryError from '../error/RetryError.js';
import { COMMON_MESSAGE, ERROR } from '../error/constants/error.js';
import Parser from '../parser/Parser.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';

const ORDER_ID_LENGTH = 13; // 주민번호와 같은 길이..
const RETRY_COUNT_MAX = 5;

export const NOT_FOUNT_ORDER_ID = '입력된 주문 번호와 일치하는 정보 없음';

class OrderHistory {
  #customerHistoryList = new Map();

  #retryCount = 0;

  add({ visitDate, menuList, badge }) {
    const orderId = this.#generateOrderId();

    this.#customerHistoryList.set(orderId, {
      visitDate,
      menuList,
      badge,
      isProductReceived: false, // 이벤트 참여해 상품을 수령했는지 여부
    });

    return orderId;
  }

  // 중복되지 않는 주문 번호 반환
  #generateOrderId() {
    let orderId;

    do {
      orderId = generateRandomNumber(ORDER_ID_LENGTH);
    } while (this.#customerHistoryList.has(orderId));

    return orderId;
  }

  findBadgeByOrderId(orderId) {
    if (!this.#customerHistoryList.has(orderId)) {
      this.#retryCount += 1;
      this.#checkRetryCount();

      throw new RetryError(
        ERROR.notFoundOrderId + COMMON_MESSAGE.limitRetry(this.#retryCount),
      );
    }
    this.#handleReceiveState(orderId);
    return this.#customerHistoryList.get(orderId).badge;
  }

  #handleReceiveState(orderId) {
    const { isProductReceived } = this.#customerHistoryList.get(orderId);

    if (isProductReceived) throw new Error('이미 수령된 상품입니다.');

    const prev = this.#customerHistoryList.get(orderId);
    prev.isProductReceived = true;
  }

  #checkRetryCount() {
    if (this.#retryCount >= RETRY_COUNT_MAX)
      throw new ExitError(
        COMMON_MESSAGE.limitRetry(this.#retryCount) + ERROR.exit,
      );
  }

  get participationRate() {
    const totalOrderCount = this.#customerHistoryList.size;

    const receivedCount = [...this.#customerHistoryList].filter(
      ([_, history]) => history.isProductReceived,
    ).length;

    const participationRate = (receivedCount / totalOrderCount) * 100;

    return Parser.parseToFixed(participationRate, 2); // 소수점 2자리까지만 출력
  }
}

export default OrderHistory;
