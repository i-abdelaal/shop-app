import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { enableScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import productsR from "./store/reducers/productsR";
import cartR from "./store/reducers/cartR";
import ordersR from "./store/reducers/ordersR";
import authR from "./store/reducers/authR";
import AppNavigator from "./navigation/AppNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const rootReducer = combineReducers({ productsR, cartR, ordersR, authR });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
