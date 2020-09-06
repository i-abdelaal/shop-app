import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().authR.userId;
    try {
      const response = await fetch(
        "https://shop-app-ac47e.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrond!");
      }

      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().authR.token;
    const response = await fetch(
      `https://shop-app-ac47e.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== "granted") {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }
    const token = getState().authR.token;
    const userId = getState().authR.userId;
    const response = await fetch(
      `https://shop-app-ac47e.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          ownerPushToken: pushToken,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        ownerId: userId,
        title,
        pushToken,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().authR.token;
    const response = await fetch(
      `https://shop-app-ac47e.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );

    if (!response) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        id,
        title,
        description,
        imageUrl,
      },
    });
  };
};
