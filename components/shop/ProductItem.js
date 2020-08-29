import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          {props.productButtons && (
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetails}
              />
              <Button
                color={Colors.primary}
                title="Add To Cart"
                onPress={props.onAddToCart}
              />
            </View>
          )}
          {props.userButtons && (
            <View style={styles.actions}>
              <Button
                color={Colors.accent}
                title="Edit"
                onPress={props.onEdit}
              />
              <Button color="red" title="Delete" onPress={props.onDelete} />
            </View>
          )}
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
});

export default ProductItem;
