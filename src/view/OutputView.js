import { Console } from '@woowacourse/mission-utils';
import NOTIFICATION_MESSAGE from './constants/notificationMessage.js';
import { PREVIEW_HEADER, PREVIEW_MARK } from './constants/previewMessage.js';
import addMoneyDelimiter from '../utils/addMoneyDelimiter.js';
import { NO_BADGE } from '../model/Badge.js';

const OutputView = (superClass) =>
  class OutputClass extends superClass {
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
        if (totalDiscountPrice === 0) return;
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
    }

    static printFinalPrice(finalPrice) {
      Console.print(PREVIEW_HEADER.finalPrice);

      Console.print(OutputClass.#priceMessage({ price: finalPrice }));
    }

    static printBadge(badge) {
      Console.print(PREVIEW_HEADER.badge);

      if (badge === NO_BADGE) return OutputClass.#printNone();

      Console.print(badge);
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
      Console.print(messages.join(PREVIEW_MARK.newLine));
    }

    static #printNone() {
      Console.print(PREVIEW_MARK.none);
    }

    // 돈과 -상태를 입력받아 구분자로 나눠진 돈을 출력하는 메서드
    static #priceMessage({ price, minus }) {
      const delimitedMoney = addMoneyDelimiter(price);

      return `${minus ? PREVIEW_MARK.minus : ''}${delimitedMoney}${
        PREVIEW_MARK.price
      }`;
    }
  };

export default OutputView;
