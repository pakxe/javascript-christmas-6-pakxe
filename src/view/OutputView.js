import { Console } from '@woowacourse/mission-utils';
import NOTIFICATION_MESSAGE from './constants/notificationMessage.js';
import { PREVIEW_HEADER, PREVIEW_MARK } from './constants/previewMessage.js';
import addMoneyDelimiter from '../utils/addMoneyDelimiter.js';

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

      const messages = [];
      menuList.forEach(({ name, count }) =>
        messages.push(`${name} ${count}${PREVIEW_MARK.count}`),
      );

      Console.print(messages.join(PREVIEW_MARK.newLine));
    }

    static printTotalPriceWithoutDiscount(price) {
      Console.print(PREVIEW_HEADER.totalPriceWithoutDiscount);

      const delimitedMoney = addMoneyDelimiter(price);

      Console.print(delimitedMoney + PREVIEW_MARK.price);
    }

    static printGiftList(giftList) {
      Console.print(PREVIEW_HEADER.giftList);

      const messages = [];
      giftList.forEach(({ name, count }) =>
        messages.push(`${name} ${count}${PREVIEW_MARK.count}`),
      );

      Console.print(messages.join(PREVIEW_MARK.newLine));
    }

    static printDiscountList(discountList) {
      Console.print(PREVIEW_HEADER.discountList);

      if (discountList.length === 0) return Console.print(PREVIEW_MARK.none);

      const messages = [];
      discountList.forEach(({ name, totalDiscountPrice }) => {
        if (totalDiscountPrice === 0) return;

        const delimitedPrice = addMoneyDelimiter(totalDiscountPrice);
        messages.push(
          `${name}${PREVIEW_MARK.namePriceDivider} ${PREVIEW_MARK.minus}${delimitedPrice}${PREVIEW_MARK.price}`,
        );
      });

      Console.print(messages.join(PREVIEW_MARK.newLine));
    }

    static printTotalDiscountPrice(totalDiscountPrice) {
      Console.print(PREVIEW_HEADER.totalDiscountPrice);

      const delimitedPrice = addMoneyDelimiter(totalDiscountPrice);

      Console.print(PREVIEW_MARK.minus + delimitedPrice + PREVIEW_MARK.price);
    }

    static printFinalPrice(finalPrice) {
      Console.print(PREVIEW_HEADER.finalPrice);

      const delimitedPrice = addMoneyDelimiter(finalPrice);

      Console.print(delimitedPrice + PREVIEW_MARK.price);
    }

    static printBadge(badge) {
      Console.print(PREVIEW_HEADER.badge);

      if (badge === null) return Console.print(PREVIEW_MARK.none);

      Console.print(badge);
    }
  };

export default OutputView;
