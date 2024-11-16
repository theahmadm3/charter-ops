import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  ActivateAircraftMaintenanceOrg,
  AddAircraftMaintenanceOrg,
  DeactivateAircraftMaintenanceOrg,
  DeleteAircraftMaintenanceOrg,
  GetAircraftMaintenanceOrgById,
  GetAllAircraftMaintenanceOrg,
  UpdateAircraftMaintenanceOrg,
} from "../../services/amo/amoService";

export const getAllAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/all",
  async () => {
    const response = await GetAllAircraftMaintenanceOrg();
    return response;
  }
);

export const addAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddAircraftMaintenanceOrg(values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAircraftMaintenanceOrgByIdAsync = createAsyncThunk(
  "amo/by/id",
  async () => {
    const response = await GetAircraftMaintenanceOrgById();
    return response;
  }
);

export const updateAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateAircraftMaintenanceOrg(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/delete",
  async ({ id }) => {
    const response = await DeleteAircraftMaintenanceOrg(id);
    return response;
  }
);

export const deactivateAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/deactivate",
  async ({ id }) => {
    const response = await DeactivateAircraftMaintenanceOrg(id);
    return response;
  }
);

export const activateAircraftMaintenanceOrgAsync = createAsyncThunk(
  "amo/activate",
  async ({ id }) => {
    const response = await ActivateAircraftMaintenanceOrg(id);
    return response;
  }
);

const aircraftMaintenanceOrgSlice = createSlice({
  name: "aircraftMaintenanceOrg",
  initialState: {
    getAllAircraftMaintenanceOrgResponse: {},
    getAircraftMaintenanceOrgByIdResponse: {},
    updateAircraftMaintenanceOrgResponse: {},
    updateAircraftMaintenanceOrgErrorResponse: {},
    deleteAircraftMaintenanceOrgResponse: {},
    updateAircraftMaintenanceOrgResponseFail: [],
    addAircraftMaintenanceOrgResponse: {},
    deactivateAircraftMaintenanceOrgResponse: {},
    activateAircraftMaintenanceOrgResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        state.getAllAircraftMaintenanceOrgResponse = action.payload;
      }
    );

    builder.addCase(
      addAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.addAircraftMaintenanceOrgResponse = action?.payload;
          state.getAllAircraftMaintenanceOrgResponse?.data?.unshift({
            id: action.payload?.data?.id,
            name: action.payload?.data?.name,
            contact_email: action.payload?.data?.contact_email,
            contact_phone: action.payload?.data?.contact_phone,
            address: action.payload?.data?.address,
            created_at: action.payload?.data?.created_at,
          });

          toast.success(action?.payload?.message);
        }

        // window.location.reload();
      }
    );
    builder.addCase(
      addAircraftMaintenanceOrgAsync.rejected,
      (state, action) => {
        state.addMaintenanceResponse = action.payload;
        toast.error(action?.payload?.message);
      }
    );

    builder.addCase(
      updateAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.updateAircraftMaintenanceOrgResponse = action.payload;

          toast.success(action.payload.message);
          window.location.reload();
        }
      }
    );

    builder.addCase(
      updateAircraftMaintenanceOrgAsync.rejected,
      (state, action) => {
        state.updateAircraftMaintenanceOrgErrorResponse = action.payload;
        toast.success(action.payload.message);
      }
    );

    builder.addCase(
      getAircraftMaintenanceOrgByIdAsync.fulfilled,
      (state, action) => {
        state.getAircraftMaintenanceOrgByIdResponse = action.payload;
        toast.success(action?.payload?.message);
      }
    );

    builder.addCase(
      getAircraftMaintenanceOrgByIdAsync.rejected,
      (state, action) => {
        state.getAircraftMaintenanceOrgByIdResponse = action.payload;
        toast.error(action?.payload?.message);
      }
    );

    builder.addCase(
      deleteAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        state.deleteAircraftMaintenanceOrgResponse = action.payload;
        toast.success(action?.payload?.message);
      }
    );

    builder.addCase(
      deleteAircraftMaintenanceOrgAsync.rejected,
      (state, action) => {
        state.deleteAircraftMaintenanceOrgResponse = action.payload;
        toast.error(action?.payload?.message);
      }
    );
    builder.addCase(
      deactivateAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.deactivateAircraftMaintenanceOrgResponse = action.payload;

          // Filter and replace the existing record with the new record
          state.getAllAircraftMaintenanceOrgResponse.data =
            state.getAllAircraftMaintenanceOrgResponse.data.map((fuel) =>
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
      }
    );

    builder.addCase(
      deactivateAircraftMaintenanceOrgAsync.rejected,
      (state, action) => {
        state.deactivateAircraftMaintenanceOrgResponse = action.payload;
        toast.error(action?.payload?.message);
      }
    );

    builder.addCase(
      activateAircraftMaintenanceOrgAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.activateAircraftMaintenanceOrgResponse = action.payload;

          // Filter and replace the existing record with the new record
          state.getAllAircraftMaintenanceOrgResponse.data =
            state.getAllAircraftMaintenanceOrgResponse.data.map((fuel) =>
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
      }
    );

    builder.addCase(
      activateAircraftMaintenanceOrgAsync.rejected,
      (state, action) => {
        state.activateAircraftMaintenanceOrgResponse = action.payload;
        toast.error(action?.payload?.message);
      }
    );
  },
});

export default aircraftMaintenanceOrgSlice.reducer;
