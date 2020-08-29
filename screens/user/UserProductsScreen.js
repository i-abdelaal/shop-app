import React from "react";
import { FlatList, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHButton from "../../components/UI/CustomHButton";
import ProductItem from "../../components/shop/ProductItem";
import { deleteProduct } from "../../store/actions/productsA";
import { removeFromCart } from "../../store/actions/cartA";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.productsR.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (item) => {
    props.navigation.navigate({ routeName: "EditProduct", params: { item } });
  };

  const deleteHandler = (id) => {
    Alert.alert("Delete Item!", "Do you really want to delete this item", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
          dispatch(removeFromCart(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          userButtons
          onSelect={() => {
            editProductHandler(itemData.item);
          }}
          onEdit={() => {
            editProductHandler(itemData.item);
          }}
          onDelete={deleteHandler.bind(this, itemData.item.id)}
        />
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
