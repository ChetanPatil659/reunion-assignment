import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  token: '',
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/user/login", data);

    return await response.data;
  } catch (error) {
    return error;
  }
});

export const registerUser = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/register",
      data
    );

    return await response.data;
  } catch (error) {
    return error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await axios("http://localhost:8000/user/getUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
        }
    })

    return await response.data;
  } catch (error) {
    return error;
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
    try {
      const response = await axios("http://localhost:8000/user/logout", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
          }
      })
  
      return await response.data;
    } catch (error) {
      return error;
    }
  });

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      });
      builder.addCase(getUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

      builder.addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
        state.token = '';
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      });
      builder.addCase(logoutUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userReducer.reducer;
