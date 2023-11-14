import findMenu from '../../utils/findMenu.js';

import GiftEvent from './GiftEvent.js';

// 24만원엔 다른 상품을 주는 식의 확장이 있을 수 있다. 따라서 맵으로 관리
const GIFT_LIST = [{ giftName: '샴페인', minPrice: 120_000 }];

class ChampagneEvent extends GiftEvent {
  #giftList = new Map(); // name: count

  #totalDiscountPrice;

  init({ visitDate, shoppingCart }) {
    this.#calcGiftList(shoppingCart.totalPrice);

    this.#totalDiscountPrice = this.isWithinEventDays(visitDate)
      ? this.#calcTotalDiscountPrice()
      : 0;
  }

  isWithinEventDays(date) {
    return date.isInPeriod(this.period);
  }

  #calcGiftList(totalPrice) {
    GIFT_LIST.forEach((gift) => this.#giveGiftIfOverPrice(gift, totalPrice));
  }

  #giveGiftIfOverPrice({ giftName, minPrice }, totalPrice) {
    if (totalPrice < minPrice) return;

    if (this.#giftList.has(giftName))
      this.#giftList.set(giftName, this.#giftList.get(giftName) + 1);
    else this.#giftList.set(giftName, 1);
  }

  #calcTotalDiscountPrice() {
    let totalPrice = 0;

    this.#giftList.forEach((count, name) => {
      totalPrice += findMenu(name).price * count;
    });

    return totalPrice;
  }

  get giftList() {
    const giftListArr = [];

    this.#giftList.forEach((count, name) => giftListArr.push({ name, count }));

    return giftListArr;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default ChampagneEvent;
