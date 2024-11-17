import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import ProductReducer from "./product-slice/productSlice"
import cartSlice from "./cart-slice/cartSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    products:ProductReducer,
    cart:cartSlice
  },
});

export default store;
