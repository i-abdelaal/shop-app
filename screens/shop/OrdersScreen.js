import React, { useEffect } from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHButton from "../../components/UI/CustomHButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/ordersA";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.ordersR.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          totalP={itemData.item.totalPrice}
          date={itemData.item.readableDate}
          totalQ={itemData.item.totalQuantity}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
