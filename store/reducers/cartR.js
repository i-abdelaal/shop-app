import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_CART,
  INCREMENT_CART,
  removeFromCart,
} from "../actions/cartA";
import { ADD_ORDER } from "../actions/ordersA";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalPrice: 0,
  totalQuantity: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + prodPrice,
        };
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + prodPrice,
        };
      }
    case REMOVE_FROM_CART:
      if (!state.items[action.pId]) {
        return state;
      } else {
        const removedItem = state.items[action.pId];
        const cartItems = { ...state.items };
        delete cartItems[action.pId];
        return {
          items: cartItems,
          totalPrice:
            state.totalPrice - removedItem.productPrice * removedItem.quantity,
          totalQuantity: state.totalQuantity - removedItem.quantity,
        };
      }

    case DECREMENT_CART:
      const selectedItem = state.items[action.pId];
      if (selectedItem.quantity > 1) {
        const decrementedItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        return {
          items: { ...state.items, [action.pId]: decrementedItem },
          totalPrice: state.totalPrice - selectedItem.productPrice,
          totalQuantity: state.totalQuantity - 1,
        };
      } else {
        const updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pId];
        return {
          items: updatedCartItems,
          totalPrice: state.totalPrice - selectedItem.productPrice,
          totalQuantity: state.totalQuantity - selectedItem.quantity,
        };
      }

    case INCREMENT_CART:
      const loadedProduct = state.items[action.pId];
      const incrementedItem = new CartItem(
        loadedProduct.quantity + 1,
        loadedProduct.productPrice,
        loadedProduct.productTitle,
        loadedProduct.sum + loadedProduct.productPrice
      );
      updatedCartItems = { ...state.items, [action.pId]: incrementedItem };
      return {
        items: updatedCartItems,
        totalPrice: state.totalPrice + loadedProduct.productPrice,
        totalQuantity: state.totalQuantity + 1,
      };
    case ADD_ORDER:
      return initialState;
  }
  return state;
};
