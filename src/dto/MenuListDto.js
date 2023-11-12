import menuListToFlatArr from '../utils/menuListToFlatArr.js';

class MenuListDto {
  static get(menuList) {
    return menuListToFlatArr(menuList);
  }
}

export default MenuListDto;
