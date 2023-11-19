import { MIN_ORDER_PRICE } from '../../model/constants/rule.js';
import deepFreeze from '../../utils/deepFreeze.js';

const COMMON_MESSAGE = {
  retry: '다시 입력해 주세요.',
  limitRetry: (count) => `주문번호 입력 ${count}회 오류. `,
};

const ERROR = deepFreeze({
  prefix: '[ERROR]',
  retry: '다시 입력해주세요.',
  visitDay: `유효하지 않은 날짜입니다. ${COMMON_MESSAGE.retry}`,
  menu: `유효하지 않은 주문입니다. ${COMMON_MESSAGE.retry}`,
  onlyBeverage: `음료만 포함되어 있는 경우 주문할 수 없습니다. ${COMMON_MESSAGE.retry}`,
  underMinOrderPrice: `총 주문 금액이 ${MIN_ORDER_PRICE}원 이상이어야 주문할 수 있습니다. ${COMMON_MESSAGE.retry}`,
  notFoundOrderId: '입력하신 주문 번호에 해당하는 정보가 존재하지 않습니다. ',
  exit: '프로그램을 종료합니다.',
});

export { ERROR, COMMON_MESSAGE };
