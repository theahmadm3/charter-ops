import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  ActivateBooking,
  AddBooking,
  AddBookingStep01,
  AddBookingStep02,
  AddBookingStep03,
  AddBookingStep04,
  DeactivateBooking,
  DeleteBooking,
  GetAllBookings,
  GetBookingById,
  UpdateBooking,
} from "../../services/booking/bookingService";

export const getAllBookingAsync = createAsyncThunk("booking/all", async () => {
  const response = await GetAllBookings();
  return response;
});

export const addBookingAsync = createAsyncThunk(
  "booking/add",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddBooking(values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getBookingByIdAsync = createAsyncThunk(
  "booking/by/id",
  async () => {
    const response = await GetBookingById();
    return response;
  }
);

export const updateBookingAsync = createAsyncThunk(
  "booking/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateBooking(id, values);
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage.error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteBookingAsync = createAsyncThunk(
  "booking/delete",
  async ({ id }) => {
    const response = await DeleteBooking(id);
    return response;
  }
);

export const deactivateBookingAsync = createAsyncThunk(
  "booking/deactivate",
  async ({ id }) => {
    const response = await DeactivateBooking(id);
    return response;
  }
);

export const activateBookingAsync = createAsyncThunk(
  "booking/activate",
  async ({ id }) => {
    const response = await ActivateBooking(id);
    return response;
  }
);

export const addBookingStepOneAsync = createAsyncThunk(
  "booking/add/step/1",
  async (values, { rejectWithValue }) => {
    try {
      const response = await AddBookingStep01(values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addBookingStepTwoAsync = createAsyncThunk(
  "booking/add/step/2",
  async ({ bookingId, values }, { rejectWithValue }) => {
    try {
      const response = await AddBookingStep02(bookingId, values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addBookingStepThreeAsync = createAsyncThunk(
  "booking/add/step/3",
  async ({ bookingId, values }, { rejectWithValue }) => {
    try {
      const response = await AddBookingStep03(bookingId, values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addBookingStepFourAsync = createAsyncThunk(
  "booking/add/step/4",
  async ({ bookingId, values }, { rejectWithValue }) => {
    try {
      const response = await AddBookingStep04(bookingId, values);

      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    getAllBookingResponse: {},
    getBookingByIdResponse: {},
    updateBookingResponse: {},
    updateBookingErrorResponse: {},
    deleteBookingResponse: {},
    updateBookingResponseFail: [],
    addBookingResponse: {},
    deactivateBookingResponse: {},
    activateBookingResponse: {},
    addBookingStepOneResponse: {},
    addBookingStepTwoResponse: {},
    addBookingStepThreeResponse: {},
    addBookingStepFourResponse: {},
    currentStep: "0",
  },

  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBookingAsync.fulfilled, (state, action) => {
      state.getAllBookingResponse = action.payload;
    });

    builder.addCase(addBookingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addBookingResponse = action?.payload;
        state.getAllBookingResponse?.data?.unshift({
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
    builder.addCase(addBookingAsync.rejected, (state, action) => {
      state.addBookingResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(addBookingStepOneAsync.fulfilled, (state, action) => {
      state.addBookingStepOneResponse = action?.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(addBookingStepOneAsync.rejected, (state, action) => {
      state.addBookingStepOneResponse = action?.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(addBookingStepTwoAsync.fulfilled, (state, action) => {
      state.addBookingStepTwoResponse = action?.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(addBookingStepTwoAsync.rejected, (state, action) => {
      state.addBookingStepTwoResponse = action?.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(addBookingStepThreeAsync.fulfilled, (state, action) => {
      state.addBookingStepThreeResponse = action?.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(addBookingStepThreeAsync.rejected, (state, action) => {
      state.addBookingStepThreeResponse = action?.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(addBookingStepFourAsync.fulfilled, (state, action) => {
      state.addBookingStepFourResponse = action?.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(addBookingStepFourAsync.rejected, (state, action) => {
      state.addBookingStepFourResponse = action?.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateBookingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateBookingResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllBookingResponse.data = state.getAllBookingResponse.data.map(
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

    builder.addCase(updateBookingAsync.rejected, (state, action) => {
      state.updateBookingResponse = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(getBookingByIdAsync.fulfilled, (state, action) => {
      state.getBookingByIdResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(getBookingByIdAsync.rejected, (state, action) => {
      state.getBookingByIdResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteBookingAsync.fulfilled, (state, action) => {
      state.deleteBookingResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteBookingAsync.rejected, (state, action) => {
      state.deleteBookingResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateBookingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateBookingResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllBookingResponse.data = state.getAllBookingResponse.data.map(
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

    builder.addCase(deactivateBookingAsync.rejected, (state, action) => {
      state.deactivateBookingResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateBookingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateBookingResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllBookingResponse.data = state.getAllBookingResponse.data.map(
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

    builder.addCase(activateBookingAsync.rejected, (state, action) => {
      state.activateBookingResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export const { setCurrentStep } = bookingSlice.actions;

export default bookingSlice.reducer;
