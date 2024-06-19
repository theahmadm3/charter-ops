import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  GetAllUsers,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
  getAuthUser,
  updateAuthUser,
  GetAllCustomer,
  GetAllVendor,
  AddAdminUser,
  GetAllAdminUsers,
} from "../../services/user/userService";

export const getAllUsersAsync = createAsyncThunk("users/all", async () => {
  const response = await GetAllUsers();
  return response;
});

export const getAllAdminUsersAsync = createAsyncThunk(
  "users/admin/all",
  async () => {
    const response = await GetAllAdminUsers();
    return response;
  }
);
export const getAllCustomersAsync = createAsyncThunk(
  "users/customer",
  async () => {
    const response = await GetAllCustomer();
    return response;
  }
);

export const getAllVendorsAsync = createAsyncThunk("users/vendor", async () => {
  const response = await GetAllVendor();
  return response;
});

export const getUserByIdAsync = createAsyncThunk(
  "users/by/id",
  async ({ id }) => {
    const response = await GetUserById(id);
    return response;
  }
);

export const addUserAsync = createAsyncThunk("users/add", async (values) => {
  const response = await AddUser(values);
  return response;
});

export const addAdminUserAsync = createAsyncThunk(
  "users/add/admin",
  async (values) => {
    const response = await AddAdminUser(values);
    console.log("error from slice", response);
    return response;
  }
);

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
  const response = await getAuthUser();
  return response;
});

export const updateAuthUsersAsync = createAsyncThunk(
  "users/auth/update",
  async (payload) => {
    const response = await updateAuthUser(payload);
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    getAllUsersResponse: {},
    getAllAdminUsersResponse: {},
    getAllCustomersResponse: {},
    getAllVendorsResponse: {},
    getUserByIdResponse: {},
    updateUserResponse: {},
    updateUserResponseFail: [],
    addUserResponse: {},
    addAdminUserResponse: {},
    getAuthUserResponse: {},
    updateAuthUserResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.getAllUsersResponse = action.payload;
    });

    builder.addCase(getAllAdminUsersAsync.fulfilled, (state, action) => {
      state.getAllAdminUsersResponse = action.payload;
    });

    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addUserResponse = action.payload;
        state.getAllUsersResponse.data.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          email: action.payload?.data?.email,
          status: action.payload?.data?.status,
          phone_number: action.payload?.data?.phone_number,
          profile_picture: action?.payload?.profile_picture,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(addAdminUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addAdminUserResponse = action.payload;
        state.getAllAdminUsersResponse.data.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          last_name: action.payload?.data?.last_name,
          email: action.payload?.data?.email,
          role: action.payload?.data?.role,
          department: action.payload?.data?.department,
          supervisor: action.payload?.data?.supervisor,
          level: action.payload?.data?.level,
          phone_number: action.payload?.data?.phone_number,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(addAdminUserAsync.rejected, (state, action) => {
      toast.error("Failed: Please try again");
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.updateUserResponse = action.payload;
      toast.success(action.payload.message);
    });
    // builder.addCase(updateUserAsync.rejected, (state, action) => {
    //   const errorMessages = [];

    //   for (const field in action.payload) {
    //     if (action.payload.hasOwnProperty(field)) {
    //       const messages = action.payload[field].map(
    //         (message) => `${field}: ${message}`
    //       );
    //       errorMessages.push(...messages);
    //     }
    //   }
    //   toast.error(errorMessages.join("\n"));
    // });

    builder.addCase(getAuthUserAsync.fulfilled, (state, action) => {
      state.getAuthUserResponse = action.payload;
    });

    builder.addCase(getAuthUserAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateAuthUsersAsync.fulfilled, (state, action) => {
      state.updateAuthUserResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(updateAuthUsersAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(getAllCustomersAsync.fulfilled, (state, action) => {
      state.getAllCustomersResponse = action.payload;
    });

    builder.addCase(getAllCustomersAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(getAllVendorsAsync.fulfilled, (state, action) => {
      state.getAllVendorsResponse = action.payload;
    });

    builder.addCase(getAllVendorsAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
  },
});

export default userSlice.reducer;
