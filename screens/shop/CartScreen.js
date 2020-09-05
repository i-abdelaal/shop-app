import React, { useState } from "react";
import {
  FlatList,
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cartA";
import * as orderActoins from "../../store/actions/ordersA";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const cart = useSelector((state) => state.cartR);
  const dispatch = useDispatch();

  const cartItems = [];

  for (const i in cart.items) {
    cartItems.push({
      productId: i,
      productTitle: cart.items[i].productTitle,
      productPrice: cart.items[i].productPrice,
      quantity: cart.items[i].quantity,
      sum: cart.items[i].sum,
    });
  }
  cartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(
      orderActoins.addOrder(cartItems, cart.totalQuantity, cart.totalPrice)
    );
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <View>
          <Text style={styles.summaryText}>
            Items Count:{" "}
            <Text style={styles.summaryAmount}>{cart.totalQuantity}</Text>
          </Text>
          <Text style={styles.summaryText}>
            Total Price:{" "}
            <Text style={styles.summaryAmount}>
              ${Math.round(cart.totalPrice.toFixed(2) * 100) / 100}
            </Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              color={Colors.accent}
              title="Order Now"
              disabled={cartItems.length === 0}
              onPress={sendOrderHandler}
            />
          )}
        </View>
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              qty={itemData.item.quantity}
              title={itemData.item.productTitle}
              sum={itemData.item.sum}
              incrementIcon
              decrementIcon
              deleteIcon
              onAdd={() => {
                dispatch(cartActions.incrementCart(itemData.item.productId));
              }}
              onDecrement={() => {
                dispatch(cartActions.decrementCart(itemData.item.productId));
              }}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export const cartScreenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  summaryAmount: {
    color: Colors.number,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default CartScreen;
