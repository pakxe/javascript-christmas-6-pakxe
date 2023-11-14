import EventController from './controller/EventController.js';
import NewYearController from './controller/NewYearEventController.js';
import OrderHistory from './model/OrderHistory.js';

class App {
  async run() {
    const orderHistory = new OrderHistory();

    await this.#eventPlanner(orderHistory);
    // await this.#checkNewYearGift(orderHistory);
  }

  async #eventPlanner(orderHistory) {
    const controller = new EventController(orderHistory);

    await controller.process(orderHistory);
  }

  async #checkNewYearGift(orderHistory) {
    const newYearController = new NewYearController();

    await newYearController.process(orderHistory);
  }
}

export default App;
