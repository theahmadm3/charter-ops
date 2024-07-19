import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  ActivateAircraft,
  AddAircraft,
  DeactivateAircraft,
  DeleteAircraft,
  GetAircraftById,
  GetAllAircrafts,
  UpdateAircraft,
} from "../../services/aircraft/aircraftService";

export const getAllAircraftsAsync = createAsyncThunk(
  "aircraft/all",
  async () => {
    const response = await GetAllAircrafts();
    return response;
  }
);

export const addAircraftAsync = createAsyncThunk(
  "aircraft/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddAircraft(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getAircraftByIdAsync = createAsyncThunk(
  "aircraft/by/id",
  async () => {
    const response = await GetAircraftById();
    return response;
  }
);

export const updateAircraftAsync = createAsyncThunk(
  "aircraft/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateAircraft(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage.error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAircraftAsync = createAsyncThunk(
  "aircraft/delete",
  async ({ id }) => {
    const response = await DeleteAircraft(id);
    return response;
  }
);

export const deactivateAircraftAsync = createAsyncThunk(
  "aircraft/deactivate",
  async ({ id }) => {
    const response = await DeactivateAircraft(id);
    return response;
  }
);

export const activateAircraftAsync = createAsyncThunk(
  "aircraft/activate",
  async ({ id }) => {
    const response = await ActivateAircraft(id);
    return response;
  }
);

const aircraftSlice = createSlice({
  name: "aircraft",
  initialState: {
    getAllAircraftResponse: {},
    getAircraftByIdResponse: {},
    updateAircraftResponse: {},
    updateAircraftErrorResponse: {},
    deleteAircraftResponse: {},
    updateAircraftResponseFail: [],
    addAircraftResponse: {},
    deactivateAircraftResponse: {},
    activateAircraftResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAircraftsAsync.fulfilled, (state, action) => {
      state.getAllAircraftResponse = action.payload;
    });

    builder.addCase(addAircraftAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addAircraftResponse = action?.payload;
        state.getAllAircraftResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          owned_by: action.payload?.data?.owned_by,
          pax_capacity: action.payload?.data?.pax_capacity,
          manufacturer: action.payload?.data?.manufacturer,
          luggage_capacity: action.payload?.data?.luggage_capacity,
          cruise_speed: action.payload?.data?.cruise_speed,
          status: action.payload?.data?.status,
          remarks: action.payload?.data?.remarks,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(addAircraftAsync.rejected, (state, action) => {
      state.addAircraftResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateAircraftAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateAircraftResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllAircraftResponse.data =
          state.getAllAircraftResponse.data.map((aircraft) =>
            aircraft.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  name: action.payload?.data?.name,
                  owned_by: action.payload?.data?.owned_by,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  manufacturer: action.payload?.data?.manufacturer,
                  luggage_capacity: action.payload?.data?.luggage_capacity,
                  cruise_speed: action.payload?.data?.cruise_speed,
                  status: action.payload?.data?.status,
                  remarks: action.payload?.data?.remarks,
                }
              : aircraft
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateAircraftAsync.rejected, (state, action) => {
      state.updateAircraftErrorResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getAircraftByIdAsync.fulfilled, (state, action) => {
      state.getAircraftByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getAircraftByIdAsync.rejected, (state, action) => {
      state.getAircraftByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteAircraftAsync.fulfilled, (state, action) => {
      state.deleteAircraftResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteAircraftAsync.rejected, (state, action) => {
      state.deleteAircraftResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateAircraftAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateAircraftResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllAircraftResponse.data =
          state.getAllAircraftResponse.data.map((aircraft) =>
            aircraft.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  name: action.payload?.data?.name,
                  owned_by: action.payload?.data?.owned_by,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  manufacturer: action.payload?.data?.manufacturer,
                  luggage_capacity: action.payload?.data?.luggage_capacity,
                  cruise_speed: action.payload?.data?.cruise_speed,
                  status: action.payload?.data?.status,
                  remarks: action.payload?.data?.remarks,
                }
              : aircraft
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateAircraftAsync.rejected, (state, action) => {
      state.deactivateAircraftResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateAircraftAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateAircraftResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllAircraftResponse.data =
          state.getAllAircraftResponse.data.map((aircraft) =>
            aircraft.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  name: action.payload?.data?.name,
                  owned_by: action.payload?.data?.owned_by,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  manufacturer: action.payload?.data?.manufacturer,
                  luggage_capacity: action.payload?.data?.luggage_capacity,
                  cruise_speed: action.payload?.data?.cruise_speed,
                  status: action.payload?.data?.status,
                  remarks: action.payload?.data?.remarks,
                }
              : aircraft
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateAircraftAsync.rejected, (state, action) => {
      state.activateAircraftResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default aircraftSlice.reducer;
