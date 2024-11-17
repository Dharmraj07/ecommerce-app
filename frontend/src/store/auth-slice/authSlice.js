import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to register.");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      const { token } = response.data;

      // Save token and login time in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("loginTime", Date.now());

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to login.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("loginTime");
    },
    autoLogout: (state) => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const currentTime = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (currentTime - loginTime > fiveMinutes) {
          state.token = "";
          state.isAuthenticated = false;
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("loginTime", Date.now());
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, autoLogout } = authSlice.actions;
export default authSlice.reducer;
