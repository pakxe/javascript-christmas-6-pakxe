import EVENT from '../../constant/event.js';
import deepFreeze from '../../utils/deepFreeze.js';

const NOTIFICATION_MESSAGE = deepFreeze({
  opening: `안녕하세요 ! 우테코 식당 ${EVENT.month}월 이벤트 플래너입니다.`,
  resultHeader: (day) =>
    `${EVENT.month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
});

export default NOTIFICATION_MESSAGE;
