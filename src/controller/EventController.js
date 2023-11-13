import ShoppingCart from '../model/ShoppingCart.js';
import Io from '../view/Io.js';
import EventPlanner from '../model/EventPlanner.js';
import CustomDate from '../model/CustomDate.js';
import Badge from '../model/Badge.js';
import catchReturn from '../utils/catchReturn.js';

class EventController {
  async process() {
    const { visitDate, shoppingCart } = await this.#requestInformation();

    this.#printResult({ visitDate, shoppingCart });
  }

  async #requestInformation() {
    Io.printOpening();

    const visitDate = await catchReturn(this.#requestVisitDate);
    const shoppingCart = await catchReturn(this.#requestMenuList);

    return { visitDate, shoppingCart };
  }

  async #requestVisitDate() {
    const visitDayStr = await Io.requestVisitDate();

    return new CustomDate(visitDayStr);
  }

  async #requestMenuList() {
    const menuListStr = await Io.requestMenuList();

    return new ShoppingCart(menuListStr);
  }

  #printResult({ visitDate, shoppingCart }) {
    Io.printResultHeader(visitDate.date);
    const eventPlanner = new EventPlanner(visitDate, shoppingCart);

    this.#printBeforeDiscount({ shoppingCart });
    this.#printAfterDiscount({ eventPlanner, shoppingCart });
    this.#printBadge(eventPlanner.totalDiscountPrice);
  }

  #printBeforeDiscount({ shoppingCart }) {
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

  #printBadge(totalDiscountPrice) {
    const badge = Badge.checkBadge(totalDiscountPrice);

    Io.printBadge(badge);
  }
}

export default EventController;
