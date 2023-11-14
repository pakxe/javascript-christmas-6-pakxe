export const NO_BADGE = '배지 없음';
export const BADGE_LIST = [
  {
    name: '별',
    minPrice: 5_000,
  },
  {
    name: '트리',
    minPrice: 10_000,
  },
  {
    name: '산타',
    minPrice: 20_000,
  },
];

class Badge {
  static checkBadge(totalDiscountPrice) {
    let badge = NO_BADGE;

    BADGE_LIST.forEach(({ name, minPrice }) => {
      if (totalDiscountPrice >= minPrice) badge = name;
    });

    return badge;
  }
}

export default Badge;
