import { Console } from '@woowacourse/mission-utils';
import REQUEST_MESSAGE from './constants/requestMessage.js';

const InputView = (superClass) =>
  class extends superClass {
    static requestVisitDate() {
      return Console.readLineAsync(REQUEST_MESSAGE.visitDate);
    }

    static requestMenuList() {
      return Console.readLineAsync(REQUEST_MESSAGE.menuList);
    }

    static requestOrderId() {
      return Console.readLineAsync(REQUEST_MESSAGE.orderId);
    }
  };

export default InputView;
