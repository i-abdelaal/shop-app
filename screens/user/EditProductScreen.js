import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import CustomHButton from "../../components/UI/CustomHButton";
import { createProduct, updateProduct } from "../../store/actions/productsA";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputIdentifier]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputIdentifier]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      isFormValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const product = props.navigation.getParam("item");

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      description: product ? product.description : "",
      price: "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    isFormValid: product ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert("Invalid Input", "Please check your inputs in the form.", [
        {
          text: "Okay",
        },
      ]);
      return;
    }
    if (product) {
      dispatch(
        updateProduct(
          product.id,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, product, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            placeholder="please enter a valid title..."
            initialValue={product ? product.title : ""}
            initiallyValid={!!product}
            required
            onInputChange={inputChangeHandler}
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            placeholder="please enter a valid image url..."
            initialValue={product ? product.imageUrl : ""}
            initiallyValid={!!product}
            required
            onInputChange={inputChangeHandler}
          />
          {product ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please use numbers only!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              placeholder="please use numbers only..."
              required
              min={0.1}
              onInputChange={inputChangeHandler}
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter at least 5 words!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="done"
            placeholder="please enter at least 5 words..."
            initialValue={product ? product.description : ""}
            initiallyValid={!!product}
            required
            minLength={5}
            onInputChange={inputChangeHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  const product = navData.navigation.getParam("item");
  return {
    headerTitle: product ? "Edit Product" : "Add New Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
