import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  GetAllUsers,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
  GetAuthUser,
  DeactivateUser,
  ActivateUser,
  GetActivityLog,
  GetDashboardStats,
} from "../../services/user/userService";

export const getAllUsersAsync = createAsyncThunk(
  "users/all",
  async ({ user_type }) => {
    const response = await GetAllUsers(user_type);
    return response;
  }
);

export const addUserAsync = createAsyncThunk(
  "users/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddUser(values);
      return response;
    } catch (error) {
      const errors = error?.response?.data?.error;
      if (errors) {
        for (const [field, messages] of Object.entries(errors)) {
          messages.forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      return rejectWithValue(error);
    }
  }
);

export const getUserByIdAsync = createAsyncThunk("users/by/id", async () => {
  const response = await GetUserById();
  return response;
});

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async ({ id, values }) => {
    const response = await UpdateUser(id, values);
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

export const deactivateUserAsync = createAsyncThunk(
  "users/deactivate",
  async ({ id }) => {
    const response = await DeactivateUser(id);
    return response;
  }
);

export const activateUserAsync = createAsyncThunk(
  "users/activate",
  async ({ id }) => {
    const response = await ActivateUser(id);
    return response;
  }
);

export const getAuthUserAsync = createAsyncThunk("users/auth", async () => {
  const response = await GetAuthUser();
  return response;
});

export const getActivityLogAsync = createAsyncThunk(
  "users/activity/log",
  async () => {
    const response = await GetActivityLog();
    return response;
  }
);

export const getDashboardStatsAsync = createAsyncThunk(
  "users/dashboard/stats",
  async () => {
    const response = await GetDashboardStats();
    return response;
  }
);



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
    deactivateUserResponse: {},
    activateUserResponse: {},
    getActivityLogResponse: {},
    getDashboardStatsResponse:{},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.getAllUsersResponse = action.payload;
    });

    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addUserResponse = action?.payload;
        state.getAllUsersResponse?.data?.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          last_name: action.payload?.data?.last_name,
          email: action.payload?.data?.email,
          status: action.payload?.data?.status,
          phone: action.payload?.data?.phone,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.addUserResponse = action.payload;
      // toast.error(action?.payload?.message);
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
    builder.addCase(deactivateUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateUserResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllUsersResponse.data = state.getAllUsersResponse.data.map(
          (user) =>
            user.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : user
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateUserAsync.rejected, (state, action) => {
      state.deactivateUserResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateUserResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllUsersResponse.data = state.getAllUsersResponse.data.map(
          (user) =>
            user.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : user
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateUserAsync.rejected, (state, action) => {
      state.activateUserResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(getActivityLogAsync.fulfilled, (state, action) => {
      state.getActivityLogResponse = action.payload;
    });

    builder.addCase(getActivityLogAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
    builder.addCase(getDashboardStatsAsync.fulfilled, (state, action) => {
      state.getDashboardStatsResponse = action.payload;
    });

    builder.addCase(getDashboardStatsAsync.rejected, (state, action) => {
      state.getDashboardStatsResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default userSlice.reducer;
