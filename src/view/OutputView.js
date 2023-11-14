import { Console } from '@woowacourse/mission-utils';
import { PREVIEW_HEADER, PREVIEW_MARK } from './constants/previewMessage.js';
import addMoneyDelimiter from '../utils/addMoneyDelimiter.js';
import { NO_BADGE } from '../model/Badge.js';
import {
  NOTIFICATION_MESSAGE,
  WARNING_MESSAGE,
} from './constants/notificationMessage.js';

const OutputView = (superClass) =>
  class OutputClass extends superClass {
    static printWarning() {
      const warningMessageList = Object.entries(WARNING_MESSAGE).map(
        ([_, message]) => message,
      );

      OutputClass.#printListWithNewLine(warningMessageList);
    }

    static printOrderId(orderId) {
      Console.print(PREVIEW_HEADER.orderId);
      Console.print(NOTIFICATION_MESSAGE.orderId(orderId));
    }

    static printOpening() {
      Console.print(NOTIFICATION_MESSAGE.opening);
    }

    static printResultHeader(date) {
      Console.print(NOTIFICATION_MESSAGE.resultHeader(date));
    }

    static printMenuList(menuList) {
      Console.print(PREVIEW_HEADER.menuList);

      const menuListMessages = OutputClass.#createMessageList(menuList);

      OutputClass.#printListWithNewLine(menuListMessages);
    }

    static printTotalPriceWithoutDiscount(price) {
      Console.print(PREVIEW_HEADER.totalPriceWithoutDiscount);
      Console.print(OutputClass.#priceMessage({ price }));
      OutputClass.#printNewLine();
    }

    static printGiftList(giftList) {
      Console.print(PREVIEW_HEADER.giftList);

      if (giftList.length === 0) return OutputClass.#printNone();

      const giftListMessages = OutputClass.#createMessageList(giftList);

      OutputClass.#printListWithNewLine(giftListMessages);
    }

    static printDiscountList(discountList) {
      Console.print(PREVIEW_HEADER.discountList);

      if (discountList.length === 0) return OutputClass.#printNone();

      const discountMessages =
        OutputClass.#createDiscountMessages(discountList);

      OutputClass.#printListWithNewLine(discountMessages);
    }

    static #createDiscountMessages(discountList) {
      const messages = [];

      discountList.forEach(({ name, totalDiscountPrice }) => {
        const price = OutputClass.#priceMessage({
          price: totalDiscountPrice,
          minus: true,
        });

        messages.push(`${name}${PREVIEW_MARK.namePriceDivider} ${price}`);
      });

      return messages;
    }

    static printTotalDiscountPrice(totalDiscountPrice) {
      Console.print(PREVIEW_HEADER.totalDiscountPrice);

      const price = OutputClass.#priceMessage({
        price: totalDiscountPrice,
        minus: totalDiscountPrice !== 0,
      });

      Console.print(price);
      OutputClass.#printNewLine();
    }

    static printFinalPrice(finalPrice) {
      Console.print(PREVIEW_HEADER.finalPrice);

      Console.print(OutputClass.#priceMessage({ price: finalPrice }));
      OutputClass.#printNewLine();
    }

    static printBadge(badge) {
      Console.print(PREVIEW_HEADER.badge);

      if (badge === NO_BADGE) return OutputClass.#printNone();

      Console.print(badge);
      OutputClass.#printNewLine();
    }

    static printError(errorMessage) {
      Console.print(errorMessage);
    }

    static #createMessageList(list) {
      const messages = [];

      list.forEach(({ name, count }) =>
        messages.push(`${name} ${count}${PREVIEW_MARK.count}`),
      );

      return messages;
    }

    static #printListWithNewLine(messages) {
      Console.print(messages.join(PREVIEW_MARK.newLine) + PREVIEW_MARK.newLine);
    }

    static #printNone() {
      Console.print(PREVIEW_MARK.none);
    }

    static #priceMessage({ price, minus }) {
      const delimitedMoney = addMoneyDelimiter(price);

      return `${minus ? PREVIEW_MARK.minus : ''}${delimitedMoney}${
        PREVIEW_MARK.price
      }`;
    }

    static #printNewLine() {
      Console.print('');
      // 아무것도 입력하지 않으면 개행이 되어서 빈 문자열을 넘겨주었습니다.
    }
  };

export default OutputView;
