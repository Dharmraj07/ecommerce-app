import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the slice
const initialState = {
  isLoading: false,
  cart: [], // Array of cart items
  error: null, // To handle error states
  totalPrice: 0, // Total price of all items in the cart
  totalCartItem: 0, 
};

// Thunk to fetch cart items for a user
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.products; // Assuming the API returns an object with a products array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data.products;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Thunk to update the quantity of a cart item
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:3000/api/cart", {
        data: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// The slice for managing cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add any custom reducers if needed
    resetCartState: (state) => {
      state.totalPrice = 0;
      state.totalCartItem = 0;
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    // Helper function to calculate total price and total cart items
    const calculateTotals = (cart) => {
      const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalCartItem = cart.reduce((acc, item) => acc + item.quantity, 0);
      return { totalPrice, totalCartItem };
    };

    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        const { totalPrice, totalCartItem } = calculateTotals(state.cart);
        state.totalPrice = totalPrice;
        state.totalCartItem = totalCartItem;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart.";
      });

    // Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        const { totalPrice, totalCartItem } = calculateTotals(state.cart);
        state.totalPrice = totalPrice;
        state.totalCartItem = totalCartItem;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add item to cart.";
      });

    // Update Cart Quantity
    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        const { totalPrice, totalCartItem } = calculateTotals(state.cart);
        state.totalPrice = totalPrice;
        state.totalCartItem = totalCartItem;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update item quantity.";
      });

    // Remove from Cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        const { totalPrice, totalCartItem } = calculateTotals(state.cart);
        state.totalPrice = totalPrice;
        state.totalCartItem = totalCartItem;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to remove item from cart.";
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
