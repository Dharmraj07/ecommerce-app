import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the slice
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null, // To handle error states
};

// Thunk to fetch all products from the server
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/api/products");
    return response.data;
  }
);

// Thunk to fetch details of a single product
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:3000/api/products/${productId}`
    );
    return response.data;
  }
);

// The slice for managing products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Additional reducers can go here if needed
  },
  extraReducers: (builder) => {
    // Handling the different states of the fetchAllProducts thunk
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload; // Store the fetched product list
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Set the error message if the request failed
      });

    // Handling the different states of the fetchProductDetails thunk
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload; // Store the fetched product details
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Set the error message if the request failed
      });
  },
});

// Export actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;
