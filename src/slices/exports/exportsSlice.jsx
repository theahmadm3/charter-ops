import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExportBookings } from "../../services/exports/exportsService";


export const exportBookingsAsync = createAsyncThunk(
    "export/bookings",
    async (params, { rejectWithValue }) => {
        try {
            const response = await ExportBookings(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const exportSlice = createSlice({
    name: "export",
    initialState: {
        exportResponse: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetExportState: (state) => {
            state.exportResponse = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exportBookingsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportBookingsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.exportResponse = action.payload;
                state.error = null;
            })
            .addCase(exportBookingsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetExportState } = exportSlice.actions;
export default exportSlice.reducer;
