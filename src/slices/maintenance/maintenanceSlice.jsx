import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  ActivateMaintenance,
  AddMaintenance,
  DeactivateMaintenance,
  DeleteMaintenance,
  GetAllMaintenance,
  GetMaintenanceById,
  UpdateMaintenance,
} from "../../services/maintenance/maintenanceService";

export const getAllMaintenanceAsync = createAsyncThunk(
  "maintenance/all",
  async () => {
    const response = await GetAllMaintenance();
    return response;
  }
);

export const addMaintenanceAsync = createAsyncThunk(
  "maintenance/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddMaintenance(values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getMaintenanceByIdAsync = createAsyncThunk(
  "maintenance/by/id",
  async () => {
    const response = await GetMaintenanceById();
    return response;
  }
);

export const updateMaintenanceAsync = createAsyncThunk(
  "maintenance/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateMaintenance(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteMaintenanceAsync = createAsyncThunk(
  "maintenance/delete",
  async ({ id }) => {
    const response = await DeleteMaintenance(id);
    return response;
  }
);

export const deactivateMaintenanceAsync = createAsyncThunk(
  "maintenance/deactivate",
  async ({ id }) => {
    const response = await DeactivateMaintenance(id);
    return response;
  }
);

export const activateMaintenanceAsync = createAsyncThunk(
  "maintenance/activate",
  async ({ id }) => {
    const response = await ActivateMaintenance(id);
    return response;
  }
);

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState: {
    getAllMaintenanceResponse: {},
    getMaintenanceByIdResponse: {},
    updateMaintenanceResponse: {},
    updateMaintenanceErrorResponse: {},
    deleteMaintenanceResponse: {},
    updateMaintenanceResponseFail: [],
    addMaintenanceResponse: {},
    deactivateMaintenanceResponse: {},
    activateMaintenanceResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMaintenanceAsync.fulfilled, (state, action) => {
      state.getAllMaintenanceResponse = action.payload;
    });

    builder.addCase(addMaintenanceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addMaintenanceResponse = action?.payload;
        state.getAllMaintenanceResponse?.data?.unshift({
          id: action.payload?.data?.id,
          vendor_name: action.payload?.data?.vendor_name,
          fuel_quantity: action.payload?.data?.fuel_quantity,
          fuel_cost: action.payload?.data?.fuel_cost,
          payment_status: action.payload?.data?.payment_status,
          location: action.payload?.data?.location,
        });

        toast.success(action?.payload?.message);
      }

      window.location.reload();
    });
    builder.addCase(addMaintenanceAsync.rejected, (state, action) => {
      state.addMaintenanceResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateMaintenanceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateMaintenanceResponse = action.payload;

        toast.success(action.payload.message);
        window.location.reload();
      }
    });

    builder.addCase(updateMaintenanceAsync.rejected, (state, action) => {
      state.updateMaintenanceResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getMaintenanceByIdAsync.fulfilled, (state, action) => {
      state.getMaintenanceByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getMaintenanceByIdAsync.rejected, (state, action) => {
      state.getMaintenanceByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteMaintenanceAsync.fulfilled, (state, action) => {
      state.deleteMaintenanceResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteMaintenanceAsync.rejected, (state, action) => {
      state.deleteMaintenanceResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateMaintenanceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateMaintenanceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllMaintenanceResponse.data =
          state.getAllMaintenanceResponse.data.map((fuel) =>
            fuel.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : fuel
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateMaintenanceAsync.rejected, (state, action) => {
      state.deactivateMaintenanceResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateMaintenanceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateMaintenanceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllMaintenanceResponse.data =
          state.getAllMaintenanceResponse.data.map((fuel) =>
            fuel.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : fuel
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateMaintenanceAsync.rejected, (state, action) => {
      state.activateMaintenanceResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default maintenanceSlice.reducer;
