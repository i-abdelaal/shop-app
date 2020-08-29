import moment from "moment";

class Order {
  constructor(id, items, totalQuantity, totalPrice, date) {
    this.id = id;
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm a");
  }
}

export default Order;
