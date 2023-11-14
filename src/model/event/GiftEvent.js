import Event from './Event.js';

// 증정이 있는 이벤트인 경우 이 이벤트를 상속해 검증할 수 있도록 한다.
class GiftEvent extends Event {}

export default GiftEvent;
