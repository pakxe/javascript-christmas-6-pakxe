import CustomError from './CustomError.js';

class FactoryError extends CustomError {
  constructor() {
    super('객체 반환을 위한 올바른 키가 아닙니다.');
  }
}

export default FactoryError;
