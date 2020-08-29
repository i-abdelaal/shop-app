export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DECREMENT_CART = "DECREMENT_CART";
export const INCREMENT_CART = "INCREMENT_CART";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

export const removeFromCart = (pId) => {
  return { type: REMOVE_FROM_CART, pId };
};

export const decrementCart = (pId) => {
  return { type: DECREMENT_CART, pId };
};

export const incrementCart = (pId) => {
  return { type: INCREMENT_CART, pId };
};
