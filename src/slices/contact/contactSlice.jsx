import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  UpdateContactStatus,
  GetAllContacts,
} from "../../services/contact/contactService";

export const getAllContactsAsync = createAsyncThunk("contact/all", async () => {
  const response = await GetAllContacts();
  return response;
});



export const updateContactResquestStatusAsync = createAsyncThunk(
  "contact/update-status",
  async ({ id, status }) => {
    const response = await UpdateContactStatus(id,status);
    return response;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    getAllContactResponse: [],
    getAllContactMeta: {},
    getAllContactLinks: {},
    updateContactStatusResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContactsAsync.fulfilled, (state, action) => {
      state.getAllContactResponse = action.payload.data; 
      state.getAllContactMeta = action.payload.meta; 
      state.getAllContactLinks = action.payload.links;
    });


    builder.addCase(updateContactResquestStatusAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateContactStatusResponse = action.payload;
    
        toast.success(action.payload.message);
        // Refresh the page to load changes
        window.location.reload();
      }
    });

    builder.addCase(updateContactResquestStatusAsync.rejected, (state, action) => {
      state.updateContactStatusResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    
  },
});

export default contactSlice.reducer;

