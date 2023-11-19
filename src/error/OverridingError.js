import CustomError from './CustomError.js';

class OverridingError extends CustomError {
  constructor() {
    super('메서드를 오버라이딩 해주세요.');
  }
}

export default OverridingError;
