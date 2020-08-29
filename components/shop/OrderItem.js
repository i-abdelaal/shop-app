import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalP}>${props.totalP.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={!showDetails ? Colors.accent : Colors.primary}
        title={!showDetails ? "Show More" : "Show Less"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailedItems}>
          <View>
            <Text style={styles.count}>
              Items Count:
              <Text style={styles.totalQ}> {props.totalQ}</Text>
            </Text>
          </View>
          <View>
            {props.items.map((item) => (
              <CartItem
                key={item.productId}
                qty={item.quantity}
                title={item.productTitle}
                sum={item.sum}
              />
            ))}
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalP: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.number,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  count: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginTop: 5,
  },
  totalQ: {
    color: Colors.accent,
  },
  detailedItems: {
    width: "100%",
  },
});

export default OrderItem;
