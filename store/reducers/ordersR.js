import { ADD_ORDER, SET_ORDER } from "../actions/ordersA";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      orders: action.orders;
    }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalQuantity,
        action.orderData.totalPrice,
        action.orderData.date
      );
      return { orders: state.orders.concat(newOrder) };
  }
  return state;
};
