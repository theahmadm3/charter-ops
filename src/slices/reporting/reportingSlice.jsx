import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllReporting } from "../../services/reporting/reportingService";

export const getAllReportingAsync = createAsyncThunk(
  "reporting/all",
  async (params) => {
    const response = await GetAllReporting(params);
    return response;
  }
);

const reportingSlice = createSlice({
  name: "reporting",
  initialState: {
    getAllReportingResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReportingAsync.fulfilled, (state, action) => {
      state.getAllReportingResponse = action.payload;
    });
  },
});

export default reportingSlice.reducer;
