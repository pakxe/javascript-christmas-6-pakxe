import ShoppingCart from '../model/ShoppingCart.js';
import Io from '../view/Io.js';
import EventPlanner from '../model/EventPlanner.js';
import CustomDate from '../model/CustomDate.js';
import Badge from '../model/Badge.js';

class EventController {
  async process() {
    Io.printOpening();

    const visitDate = await this.#requestVisitDate();
    const shoppingCart = await this.#requestMenuList();

    Io.printResultHeader(visitDate.date);

    this.#printMenuList(shoppingCart.menuList);
    this.#printTotalPriceWithoutDiscount(shoppingCart.totalPrice);

    const eventPlanner = new EventPlanner(visitDate, shoppingCart);
    this.#printGiftList(eventPlanner.giftList);
    this.#printDiscountList(eventPlanner.discountList);
    this.#printTotalDisCountPrice(eventPlanner.totalDiscountPrice);
    this.#printFinalPrice(eventPlanner.getFinalPrice(shoppingCart.totalPrice));
    this.#printBadge(eventPlanner.totalDiscountPrice);
  }

  // 방문일 물어보기
  async #requestVisitDate() {
    const visitDayStr = await Io.requestVisitDate();

    return new CustomDate(visitDayStr);
  }

  // 메뉴 물어보기
  async #requestMenuList() {
    const menuListStr = await Io.requestMenuList();

    return new ShoppingCart(menuListStr);
  }

  #printMenuList(menuList) {
    Io.printMenuList(menuList);
  }

  #printTotalPriceWithoutDiscount(totalPrice) {
    Io.printTotalPriceWithoutDiscount(totalPrice);
  }

  #printGiftList(giftList) {
    Io.printGiftList(giftList);
  }

  #printDiscountList(discountList) {
    Io.printDiscountList(discountList);
  }

  #printTotalDisCountPrice(totalDiscountPrice) {
    Io.printTotalDiscountPrice(totalDiscountPrice);
  }

  #printFinalPrice(finalPrice) {
    Io.printFinalPrice(finalPrice);
  }

  #printBadge(totalDiscountPrice) {
    const badge = Badge.checkBadge(totalDiscountPrice);

    Io.printBadge(badge);
  }
}

export default EventController;

const a = new EventController();
a.process();
