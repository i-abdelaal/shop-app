import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-app-ac47e.firebaseio.com/orders/u1.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrond!");
      }

      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].totalQuantity,
            resData[key].totalPrice,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDER, orders: loadedOrders });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const addOrder = (items, totalQuantity, totalPrice) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://shop-app-ac47e.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalQuantity,
          totalPrice,
          date: date.toISOString(),
        }),
      }
    );
    if (!response) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData.name);
    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items, totalQuantity, totalPrice, date },
    });
  };
};
