export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (items, totalQuantity, totalPrice) => {
  return { type: ADD_ORDER, orderData: { items, totalQuantity, totalPrice } };
};
