import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  GetAllUsers,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
  GetAuthUser,
} from "../../services/user/userService";

export const getAllUsersAsync = createAsyncThunk("users/all", async () => {
  const response = await GetAllUsers();
  return response;
});

export const addUserAsync = createAsyncThunk("users/add", async (values) => {
  const response = await AddUser(values);
  return response;
});

export const getUserByIdAsync = createAsyncThunk("users/by/id", async () => {
  const response = await GetUserById();
  return response;
});

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async ({ id, payload }) => {
    const response = await UpdateUser(id, payload);
    return response;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async ({ id }) => {
    const response = await DeleteUser(id);
    return response;
  }
);

export const getAuthUserAsync = createAsyncThunk("users/auth", async () => {
  const response = await GetAuthUser();
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    getAllUsersResponse: {},
    getUserByIdResponse: {},
    updateUserResponse: {},
    deleteUserResponse: {},
    updateUserResponseFail: [],
    addUserResponse: {},
    getAuthUserResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.getAllUsersResponse = action.payload;
    });

    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addUserResponse = action.payload;
        state.getAllUsersResponse.data.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          email: action.payload?.data?.email,
          status: action.payload?.data?.status,
          phone: action.payload?.data?.phone_number,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.addUserResponse = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.updateUserResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getAuthUserAsync.fulfilled, (state, action) => {
      state.getAuthUserResponse = action.payload;
    });

    builder.addCase(getAuthUserAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(getUserByIdAsync.fulfilled, (state, action) => {
      state.getUserByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getUserByIdAsync.rejected, (state, action) => {
      state.getUserByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.deleteUserResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.deleteUserResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default userSlice.reducer;
