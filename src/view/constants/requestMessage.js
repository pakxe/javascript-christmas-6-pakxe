import DIVIDER from '../../constant/divider.js';
import { DECEMBER_EVENT } from '../../constant/periodInfo.js';
import deepFreeze from '../../utils/deepFreeze.js';

const INPUT_HINT = {
  number: '(숫자만 입력해 주세요!)',
  menu: `(e.g. 해산물파스타${DIVIDER.menu}2${DIVIDER.menuList}레드와인${DIVIDER.menu}1${DIVIDER.menuList}초코케이크${DIVIDER.menu}1)`,
};

const REQUEST_MESSAGE = deepFreeze({
  ...INPUT_HINT,
  visitDate: `${DECEMBER_EVENT.month}월 중 식당 예상 방문 날짜는 언제인가요? ${INPUT_HINT.number}\n`,
  menuList: `주문하실 메뉴를 메뉴와 개수를 알려주세요. ${INPUT_HINT.menu}\n`,
  orderId: '주문했을 때 받았던 주문 번호를 입력해주세요.\n',
});

export default REQUEST_MESSAGE;
