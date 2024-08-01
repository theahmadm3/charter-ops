import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  firstTimeLogin,
  forgetPassword,
  login,
  logout,
  resetPassword,
} from "../../services/auth/authService";

export const loginAsync = createAsyncThunk(
  "users/login",
  async ({ credentials }) => {
    const response = await login(credentials);

    return response;
  }
);

export const forgetPasswordAsnyc = createAsyncThunk(
  "users/forget/password",
  async ({ values }, thunkAPI) => {
    try {
      const response = await forgetPassword(values);
      return response;
    } catch (error) {
      // Handle errors here
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "users/reset/password",
  async ({ credentials, token }, thunkAPI) => {
    try {
      const response = await resetPassword(credentials, token);
      return response;
    } catch (error) {
      // Handle errors here
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const firstTimeLoginAsync = createAsyncThunk(
  "users/first/time/login",
  async ({ credentials }, thunkAPI) => {
    try {
      const response = await firstTimeLogin(credentials);
      return response;
    } catch (error) {
      // Handle errors here
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk("users/logout", async () => {
  const response = await logout();

  return response;
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loginResponse: {},
    forgotPasswordResponse: {},
    resetPasswordResponse: {},
    firstTimeLoginResponse: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginResponse = action.payload;
      toast.success(action.payload.message);
      localStorage.setItem("token", action?.payload?.data?.token);
      localStorage.setItem("expires_at", action?.payload?.data?.expires_at);
      localStorage.setItem("user", JSON.stringify(action?.payload?.data?.user));
    });

    builder.addCase(loginAsync.pending, (state, action) => {
      state.loginResponse = action.payload;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      toast.error("Login failed!");
      state.loginResponse = action.payload;
    });
    builder.addCase(forgetPasswordAsnyc.fulfilled, (state, action) => {
      state.forgotPasswordResponse = action.payload;
      toast.success("Check your email to complete");
    });
    builder.addCase(forgetPasswordAsnyc.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success("Password Reset was Successful");
    });
    builder.addCase(firstTimeLoginAsync.fulfilled, (state, action) => {
      state.firstTimeLoginResponse = action.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(firstTimeLoginAsync.rejected, (state, action) => {
      state.firstTimeLoginResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success(action.payload.message);
    });
  },
});

export default userSlice.reducer;
