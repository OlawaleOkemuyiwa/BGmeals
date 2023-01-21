import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addFoodItemToCart(latestState, action) {
      const newFoodItem = action.payload;
      const { id, name, price, restaurantId } = newFoodItem;

      latestState.totalQuantity++;
      latestState.totalAmount += price;

      const existingCartItem = latestState.cartItems.find(
        cartItem => cartItem.id === newFoodItem.id
      );

      if (!existingCartItem) {
        latestState.cartItems.push({
          id,
          name,
          price,
          restaurantId,
          quantity: 1,
          totalPrice: price,
        });
      } else {
        existingCartItem.quantity++;
        existingCartItem.totalPrice += price;
      }
    },
    removeMealFromCart(latestState, action) {
      const foodItemId = action.payload;

      const cartItemIndex = latestState.cartItems.findIndex(
        cartItem => cartItem.id === foodItemId
      );
      const cartItem = latestState.cartItems[cartItemIndex];

      latestState.totalQuantity--;
      latestState.totalAmount -= cartItem.price;

      if (cartItem.quantity === 1) {
        latestState.cartItems.splice(cartItemIndex, 1);
      } else {
        cartItem.quantity--;
        cartItem.totalPrice -= cartItem.price;
      }
    },
    clearCart(latestState) {
      latestState.cartItems = [];
      latestState.totalAmount = 0;
      latestState.totalQuantity = 0;
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
