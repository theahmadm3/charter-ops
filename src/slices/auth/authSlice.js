import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
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
  async (credentials) => {
    const response = await forgetPassword(credentials);

    return response;
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginResponse = action.payload;
      toast.success(action.payload.message);
      localStorage.setItem("token", action?.payload?.token);
      localStorage.setItem("user", JSON.stringify(action?.payload?.user));
    });

    builder.addCase(loginAsync.pending, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      toast.error("Login failed!");
    });
    builder.addCase(forgetPasswordAsnyc.fulfilled, (state, action) => {
      state.forgotPasswordResponse = action.payload;
      toast.success("Check your email to complete");
    });
    builder.addCase(forgetPasswordAsnyc.rejected, (state, action) => {
      toast.error("Not found");
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success("Password Reset was Successful");
    });
    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success(action.payload.message);
    });
  },
});

export default userSlice.reducer;
