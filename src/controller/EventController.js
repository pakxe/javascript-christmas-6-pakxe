import ShoppingCart from '../model/ShoppingCart.js';
import Io from '../view/Io.js';
import EventPlanner from '../model/EventPlanner.js';
import CustomDate from '../model/CustomDate.js';
import Badge from '../model/Badge.js';
import catchReturn from '../utils/catchReturn.js';

class EventController {
  #orderHistory;

  constructor(orderHistory) {
    this.#orderHistory = orderHistory;
  }

  async process() {
    const { visitDate, shoppingCart } = await this.#requestInformation();

    this.#printResult({ visitDate, shoppingCart });
  }

  async #requestInformation() {
    Io.printOpening();
    Io.printWarning();

    const visitDate = await catchReturn(this.#requestVisitDate);
    const shoppingCart = await catchReturn(this.#requestShoppingCart);

    return { visitDate, shoppingCart };
  }

  async #requestVisitDate() {
    const visitDayStr = await Io.requestVisitDate();

    return CustomDate.createByDay(visitDayStr);
  }

  async #requestShoppingCart() {
    const menuListStr = await Io.requestMenuList();

    return new ShoppingCart(menuListStr);
  }

  #printResult({ visitDate, shoppingCart }) {
    Io.printResultHeader(visitDate.date);

    const eventPlanner = new EventPlanner({ visitDate, shoppingCart });
    const badge = Badge.checkBadge(eventPlanner.totalDiscountPrice);

    this.#printTotalPriceWithoutDiscount({ shoppingCart });
    this.#printAfterDiscount({ eventPlanner, shoppingCart });
    Io.printBadge(badge);

    this.#addOrderToHistory({
      visitDate,
      menuList: shoppingCart.menuList,
      badge,
    });
  }

  #printTotalPriceWithoutDiscount({ shoppingCart }) {
    const { menuList } = shoppingCart;
    const totalPriceWithoutDiscount = shoppingCart.totalPrice;

    Io.printMenuList(menuList);
    Io.printTotalPriceWithoutDiscount(totalPriceWithoutDiscount);
  }

  #printAfterDiscount({ eventPlanner, shoppingCart }) {
    const { giftList, discountList, totalDiscountPrice } = eventPlanner;

    Io.printGiftList(giftList);
    Io.printDiscountList(discountList);

    const totalPriceWithoutDiscount = shoppingCart.totalPrice;

    Io.printTotalDiscountPrice(totalDiscountPrice);
    Io.printFinalPrice(eventPlanner.calcFinalPrice(totalPriceWithoutDiscount));
  }

  #addOrderToHistory(OrderInfo) {
    const orderId = this.#orderHistory.add(OrderInfo);

    Io.printOrderId(orderId);
  }
}

export default EventController;
