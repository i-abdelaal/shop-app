import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}
const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.qty} </Text>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
      </View>
      {props.incrementIcon && (
        <TouchableCmp onPress={props.onAdd} style={styles.Button}>
          <AntDesign name="caretup" size={23} color={Colors.accent} />
        </TouchableCmp>
      )}
      {props.decrementIcon && (
        <TouchableCmp onPress={props.onDecrement} style={styles.Button}>
          <AntDesign name="caretdown" size={23} color="red" />
        </TouchableCmp>
      )}
      <View style={styles.itemData}>
        <Text style={styles.amount}>${props.sum}</Text>
      </View>
      {props.deleteIcon && (
        <TouchableCmp onPress={props.onRemove} style={styles.Button}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableCmp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: Colors.primary,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.number,
  },
  Button: {
    marginLeft: 20,
  },
});

export default CartItem;
