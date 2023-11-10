// 배민앱에 새로운 가게를 입점해도 메뉴를 객체로 관리하지 않을 것 같음
const CATEGORY = {
  appetizer: 'appetizer',
  mainCourse: 'mainCourse',
  dessert: 'dessert',
  beverage: 'beverage',
};

const APPETIZER = [
  { name: '양송이수프', price: 6_000 },
  { name: '타파스', prize: 5_500 },
  { name: '시저샐러드', price: 8_000 },
].map((field) => ({ ...field, category: CATEGORY.dessert }));

const MAIN_COURSE = [
  { name: '티본스테이크', price: 55_000 },
  { name: '바비큐리브', price: 54_000 },
  { name: '해산물파스타', price: 35_000 },
  { name: '크리스마스파스타', price: 25_000 },
].map((field) => ({ ...field, category: CATEGORY.mainCourse }));

const DESSERT = [
  { name: '초코케이크', price: 15_000 },
  { name: '아이스크림', price: 5_000 },
].map((field) => ({ ...field, category: CATEGORY.dessert }));

const BEVERAGE = [
  { name: '제로콜라', price: 3_000 },
  { name: '레드와인', price: 60_000 },
  { name: '샴페인', price: 25_000 },
].map((field) => ({ ...field, category: CATEGORY.beverage }));

const MENU_LIST = [...APPETIZER, ...MAIN_COURSE, ...DESSERT, ...BEVERAGE];
export default MENU_LIST;
