const menuListToFlatArr = (menuList) => {
  const flattedMenuList = [];

  menuList.forEach((menus) => flattedMenuList.push(...menus));

  return flattedMenuList;
};

export default menuListToFlatArr;
