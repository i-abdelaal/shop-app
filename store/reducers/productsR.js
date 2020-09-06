import PRODUCTS from "../../data/dummy-data";

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/productsA";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };

    case DELETE_PRODUCT:
      return {
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productData.id
      );
      const avProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productData.id
      );

      const updatedProduct = new Product(
        action.productData.id,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updUserProducts = [...state.userProducts];
      updUserProducts[productIndex] = updatedProduct;

      const updAvProducts = [...state.availableProducts];
      updAvProducts[avProductIndex] = updatedProduct;
      return {
        availableProducts: updAvProducts,
        userProducts: updUserProducts,
      };
  }
  return state;
};
