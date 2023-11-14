import { DECEMBER_EVENT } from '../../constant/periodInfo.js';
import deepFreeze from '../../utils/deepFreeze.js';

const PREVIEW_MARK = deepFreeze({
  open: '<',
  close: '>',
  count: '개',
  price: '원',
  none: '없음\n',
  namePriceDivider: ':',
  minus: '-',
  newLine: '\n',
});

// 일괄 수정을 위한 래핑 스트링
const wrapPreview = (message) =>
  `${PREVIEW_MARK.open}${message}${PREVIEW_MARK.close}`;

// TODO: 반복되고, 함수명이 상수형인거 수정해야함.
const PREVIEW_HEADER = deepFreeze({
  menuList: wrapPreview('주문 메뉴'),
  totalPriceWithoutDiscount: wrapPreview('할인 전 총주문 금액'),
  giftList: wrapPreview('증정 메뉴'),
  discountList: wrapPreview('혜택 내역'),
  totalDiscountPrice: wrapPreview('총혜택 금액'),
  finalPrice: wrapPreview('할인 후 예상 결제 금액'),
  badge: wrapPreview(`${DECEMBER_EVENT.month}월 이벤트 배지`),
  orderId: wrapPreview('주문 번호'),
});

export { PREVIEW_HEADER, PREVIEW_MARK };
