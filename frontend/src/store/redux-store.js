import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart-slice";
import authSliceReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
});

export default store;
