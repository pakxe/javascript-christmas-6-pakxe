import DIVIDER from '../../constant/divider.js';
import EVENT from '../../constant/event.js';
import { MENU_COUNT, MIN_ORDER_PRICE } from '../../model/constants/rule.js';
import addMoneyDelimiter from '../../utils/addMoneyDelimiter.js';
import deepFreeze from '../../utils/deepFreeze.js';
import { PREVIEW_MARK } from './previewMessage.js';

const NOTIFICATION_MESSAGE = deepFreeze({
  opening: `안녕하세요 ! 우테코 식당 ${EVENT.month}월 이벤트 플래너입니다.`,
  resultHeader: (day) =>
    `${EVENT.month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
});

const WARNING_MESSAGE = deepFreeze({
  header: '[ 주의 사항 ]',
  minOrderPrice: `총 주문 금액 ${addMoneyDelimiter(MIN_ORDER_PRICE)}${
    PREVIEW_MARK.price
  } 이상부터 이벤트가 적용됩니다.`,
  beverage: '음료만 주문 시, 주문할 수 없습니다.',
  menuCount: `메뉴는 한 번에 최대 ${MENU_COUNT.max}개까지만 주문할 수 있습니다.`,
  menuCountEx: `(e.g. 시저샐러드${DIVIDER.menu}1${DIVIDER.menuList}티본스테이크${DIVIDER.menu}1${DIVIDER.menuList}크리스마스파스타${DIVIDER.menu}1${DIVIDER.menuList}제로콜라${DIVIDER.menu}3${DIVIDER.menuList}아이스크림${DIVIDER.menu}1의 총개수는 7개)`,
  // 쉽게 바뀌지 않을 것이라 생각해 하드코딩
});

export { NOTIFICATION_MESSAGE, WARNING_MESSAGE };
