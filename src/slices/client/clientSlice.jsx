import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  ActivateClient,
  AddClient,
  DeactivateClient,
  DeleteClient,
  GetAllClients,
  GetClientById,
  UpdateClient,
} from "../../services/client/clientService";

export const getAllClientAsync = createAsyncThunk("client/all", async () => {
  const response = await GetAllClients();
  return response;
});

export const addClientAsync = createAsyncThunk(
  "client/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddClient(values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getClientByIdAsync = createAsyncThunk("client/by/id", async () => {
  const response = await GetClientById();
  return response;
});

export const updateClientAsync = createAsyncThunk(
  "client/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateClient(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage.error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteClientAsync = createAsyncThunk(
  "client/delete",
  async ({ id }) => {
    const response = await DeleteClient(id);
    return response;
  }
);

export const deactivateClientAsync = createAsyncThunk(
  "client/deactivate",
  async ({ id }) => {
    const response = await DeactivateClient(id);
    return response;
  }
);

export const activateClientAsync = createAsyncThunk(
  "client/activate",
  async ({ id }) => {
    const response = await ActivateClient(id);
    return response;
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    getAllClientsResponse: {},
    getClientByIdResponse: {},
    updateClientResponse: {},
    updateClientErrorResponse: {},
    deleteClientResponse: {},
    updateClientResponseFail: [],
    addClientResponse: {},
    deactivateClientResponse: {},
    activateClientResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClientAsync.fulfilled, (state, action) => {
      state.getAllClientsResponse = action.payload;
    });

    builder.addCase(addClientAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addClientResponse = action?.payload;
        state.getAllClientsResponse?.data?.unshift({
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
    builder.addCase(addClientAsync.rejected, (state, action) => {
      state.addClientResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateClientAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateClientResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllClientsResponse.data = state.getAllClientsResponse.data.map(
          (client) =>
            client.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : client
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateClientAsync.rejected, (state, action) => {
      state.updateClientErrorResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getClientByIdAsync.fulfilled, (state, action) => {
      state.getClientByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getClientByIdAsync.rejected, (state, action) => {
      state.getClientByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteClientAsync.fulfilled, (state, action) => {
      state.deleteClientResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteClientAsync.rejected, (state, action) => {
      state.deleteClientResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateClientAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateClientResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllClientsResponse.data = state.getAllClientsResponse.data.map(
          (client) =>
            client.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : client
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateClientAsync.rejected, (state, action) => {
      state.deactivateClientResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateClientAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateClientResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllClientsResponse.data = state.getAllClientsResponse.data.map(
          (client) =>
            client.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  status: action.payload.data.status,
                  phone: action.payload.data.phone,
                }
              : client
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateClientAsync.rejected, (state, action) => {
      state.activateClientResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default clientSlice.reducer;
