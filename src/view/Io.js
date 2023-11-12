// view를 controller입장에서 더 간편하게 사용하기 위한 통합 인터페이스 Io
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {}

class Io extends InputView(OutputView(View)) {}

export default Io;
