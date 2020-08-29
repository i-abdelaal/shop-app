import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cartA";

const ProductDetailScreen = (props) => {
  const product = props.navigation.getParam("item");

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  desc: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

ProductDetailScreen.navigationOptions = (navData) => {
  return { headerTitle: navData.navigation.getParam("item").title };
};

export default ProductDetailScreen;
