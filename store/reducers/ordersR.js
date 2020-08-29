import { ADD_ORDER } from "../actions/ordersA";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.totalQuantity,
        action.orderData.totalPrice,
        new Date()
      );
      return { orders: state.orders.concat(newOrder) };
  }
  return state;
};
