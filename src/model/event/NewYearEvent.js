import { BADGE_LIST, NO_BADGE } from '../Badge.js';
import GiftEvent from './GiftEvent.js';

// 어떤 이벤트인지 모르므로 최대한 수용할 수 있도록 설계
const GIFT_LIST = [
  { name: '별 상품', price: 1_000 },
  { name: '트리 상품', price: 2_000 },
  { name: '산타 상품', price: 3_000 },
];

class NewYearEvent extends GiftEvent {
  #giftList = [];

  #totalDiscountPrice;

  init({ visitDate, badge }) {
    this.#totalDiscountPrice = this.isWithinEventPeriod(visitDate)
      ? this.#calcTotalDiscountPrice(badge)
      : 0;

    this.#calcGiftList(badge);
  }

  isWithinEventPeriod(date) {
    return date.isInPeriod(this.period);
  }

  #calcTotalDiscountPrice(badge) {
    if (badge === NO_BADGE) return 0;

    let price;
    BADGE_LIST.forEach((badgeInfo, i) => {
      if (badgeInfo.name === badge) price = GIFT_LIST[i].price;
    });

    return price;
  }

  // 누적되지 않는 보상 (트리 뱃지면, 별, 트리 상품을 모두 받는 것이 아닌 트리만)
  // 다른 이벤트는 누적이지만 이건 다르게 사용한 이유는 단일 뱃지로만 상품을 판단하는 것이기 떄문
  #calcGiftList(badge) {
    BADGE_LIST.forEach((badgeInfo, i) =>
      this.#addGift(badgeInfo.name, badge, i),
    );
  }

  #addGift(badgeName, badge, index) {
    if (badgeName === badge)
      this.#giftList.push({ name: GIFT_LIST[index].name, count: 1 });
  }

  get giftList() {
    return this.#giftList;
  }

  get totalDiscountPrice() {
    return this.#totalDiscountPrice;
  }
}

export default NewYearEvent;
