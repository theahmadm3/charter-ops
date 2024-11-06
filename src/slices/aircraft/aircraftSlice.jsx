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
      const errors = error?.response?.data.error;
      if (errors) {
        for (const [field, messages] of Object.entries(errors)) {
          messages.forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      return rejectWithValue(errors);
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
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeleteAircraft(id);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.error;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
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
    addAircraftError: {},
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
          owned_by: action.payload?.data?.owned_by,
          reg_no: action.payload?.data?.reg_no,
          aircraft_type: action.payload?.data?.aircraft_type,
          inflight_services: action.payload?.data?.inflight_services,
          pax_capacity: action.payload?.data?.pax_capacity,
          total_seat_capacity: action.payload?.data?.total_seat_capacity,
          crew_capacity: action.payload?.data?.crew_capacity,
          status: action.payload?.data?.status,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(addAircraftAsync.rejected, (state, action) => {
      state.addAircraftError = action.payload;
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
                  owned_by: action.payload?.data?.owned_by,
                  reg_no: action.payload?.data?.reg_no,
                  aircraft_type: action.payload?.data?.aircraft_type,
                  inflight_services: action.payload?.data?.inflight_services,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  total_seat_capacity:
                    action.payload?.data?.total_seat_capacity,
                  crew_capacity: action.payload?.data?.crew_capacity,
                  status: action.payload?.data?.status,
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
      // Filter out the deleted aircraft from getAllAircraftResponse.data
      window.location.reload();

      // Update deleteAircraftResponse and show a success message
      state.deleteAircraftResponse = action.payload;
      toast.success(action.payload.message);
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
                  owned_by: action.payload?.data?.owned_by,
                  reg_no: action.payload?.data?.reg_no,
                  aircraft_type: action.payload?.data?.aircraft_type,
                  inflight_services: action.payload?.data?.inflight_services,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  total_seat_capacity:
                    action.payload?.data?.total_seat_capacity,
                  crew_capacity: action.payload?.data?.crew_capacity,
                  status: action.payload?.data?.status,
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
                  owned_by: action.payload?.data?.owned_by,
                  reg_no: action.payload?.data?.reg_no,
                  aircraft_type: action.payload?.data?.aircraft_type,
                  inflight_services: action.payload?.data?.inflight_services,
                  pax_capacity: action.payload?.data?.pax_capacity,
                  total_seat_capacity:
                    action.payload?.data?.total_seat_capacity,
                  crew_capacity: action.payload?.data?.crew_capacity,
                  status: action.payload?.data?.status,
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
