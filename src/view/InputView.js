import { Console } from '@woowacourse/mission-utils';
import REQUEST_MESSAGE from './constants/requestMessage.js';
import { PREVIEW_HEADER } from './constants/previewMessage.js';

const InputView = (superClass) =>
  class extends superClass {
    static requestVisitDate() {
      return Console.readLineAsync(REQUEST_MESSAGE.visitDate);
    }

    static requestMenuList() {
      return Console.readLineAsync(REQUEST_MESSAGE.menuList);
    }

    static requestOrderId() {
      const requestMessageWithHeader = `${PREVIEW_HEADER.requestOrderId}\n${REQUEST_MESSAGE.orderId}`;

      return Console.readLineAsync(requestMessageWithHeader);
    }
  };

export default InputView;
