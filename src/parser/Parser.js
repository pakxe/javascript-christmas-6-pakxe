import DIVIDER from '../constant/divider.js';

class Parser {
  static parseInt(input) {
    return Number(input);
  }

  static trim(input) {
    return input.trim();
  }

  static splitMenuInfo(menu) {
    return menu.split(DIVIDER.menu);
  }

  static splitMenuList(menuList) {
    return menuList.split(DIVIDER.menuList);
  }

  static addLeadingZero(num, maxDigits) {
    const numberString = `${num}`;
    const numberOfZerosToAdd = Math.max(0, maxDigits - numberString.length);

    const zeros = '0'.repeat(numberOfZerosToAdd);

    return zeros + numberString;
  }
}

export default Parser;
