import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  ActivateFuel,
  AddFuel,
  DeactivateFuel,
  DeleteFuel,
  GetAllFuel,
  GetFuelById,
  UpdateFuel,
  UpdateFuelPayment,
} from "../../services/fuel/fuelService";

export const getAllFuelAsync = createAsyncThunk("fuel/all", async () => {
  const response = await GetAllFuel();
  return response;
});

export const addFuelAsync = createAsyncThunk(
  "fuel/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddFuel(values);
      return response;
    } catch (error) {
      console.log("error", error);

      // Get the error messages array
      const errorMessages = error?.response?.data?.error || error.message;

      // Check if errorMessages is an object with arrays of messages
      if (typeof errorMessages === "object") {
        Object.values(errorMessages).forEach((messages) => {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        });
      } else {
        // Toast a single message if errorMessages is not an object
        toast.error(errorMessages);
      }

      return rejectWithValue(errorMessages);
    }
  }
);

export const getFuelByIdAsync = createAsyncThunk("fuel/by/id", async () => {
  const response = await GetFuelById();
  return response;
});

export const updateFuelAsync = createAsyncThunk(
  "fuel/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateFuel(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateFuelPaymentAsync = createAsyncThunk(
  "fuel/update/payment",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateFuelPayment(id, values);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed: please try again";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteFuelAsync = createAsyncThunk(
  "fuel/delete",
  async ({ id }) => {
    const response = await DeleteFuel(id);
    return response;
  }
);

export const deactivateFuelAsync = createAsyncThunk(
  "fuel/deactivate",
  async ({ id }) => {
    const response = await DeactivateFuel(id);
    return response;
  }
);

export const activateFuelAsync = createAsyncThunk(
  "fuel/activate",
  async ({ id }) => {
    const response = await ActivateFuel(id);
    return response;
  }
);

const fuelSlice = createSlice({
  name: "fuel",
  initialState: {
    getAllFuelResponse: {},
    getFuelByIdResponse: {},
    updateFuelResponse: {},
    updateFuelPaymentResponse: {},
    updateFuelErrorResponse: {},
    deleteFuelResponse: {},
    updateFuelResponseFail: [],
    addFuelResponse: {},
    deactivateFuelResponse: {},
    activateFuelResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFuelAsync.fulfilled, (state, action) => {
      state.getAllFuelResponse = action.payload;
    });

    builder.addCase(addFuelAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addFuelResponse = action?.payload;
        state.getAllFuelResponse?.data?.unshift({
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
    builder.addCase(addFuelAsync.rejected, (state, action) => {
      state.addFuelResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateFuelAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateFuelResponse = action.payload;

        toast.success(action.payload.message);
        window.location.reload();
      }
    });

    builder.addCase(updateFuelAsync.rejected, (state, action) => {
      state.updateFuelResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(updateFuelPaymentAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateFuelPaymentResponse = action.payload;

        toast.success(action.payload.message);
        window.location.reload();
      }
    });

    builder.addCase(updateFuelPaymentAsync.rejected, (state, action) => {
      state.updateFuelPaymentResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getFuelByIdAsync.fulfilled, (state, action) => {
      state.getFuelByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getFuelByIdAsync.rejected, (state, action) => {
      state.getFuelByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteFuelAsync.fulfilled, (state, action) => {
      state.deleteFuelResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteFuelAsync.rejected, (state, action) => {
      state.deleteFuelResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateFuelAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateFuelResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllFuelResponse.data = state.getAllFuelResponse.data.map(
          (fuel) =>
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

    builder.addCase(deactivateFuelAsync.rejected, (state, action) => {
      state.deactivateFuelResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateFuelAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateFuelResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllFuelResponse.data = state.getAllFuelResponse.data.map(
          (fuel) =>
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

    builder.addCase(activateFuelAsync.rejected, (state, action) => {
      state.activateFuelResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default fuelSlice.reducer;
