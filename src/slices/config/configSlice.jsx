import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  ActivateAdditionalService,
  ActivateDepartment,
  ActivatePartnershipType,
  ActivateRole,
  ActivateService,
  ActivateSupplier,
  AddAdditionalService,
  AddDepartment,
  AddPartnershipType,
  AddRole,
  AddService,
  AddSupplier,
  DeactivateAdditionalService,
  DeactivateDepartment,
  DeactivatePartnershipType,
  DeactivateRole,
  DeactivateService,
  DeactivateSupplier,
  DeleteDepartment,
  DeletePartnershipType,
  DeleteService,
  DeleteSupplier,
  GetAdditionalServiceById,
  GetAllAdditionalServices,
  GetAllAirports,
  GetAllDepartments,
  GetAllPartnershipTypes,
  GetAllRoles,
  GetAllServices,
  GetAllSuppliers,
  GetDepartmentById,
  GetPartnershipTypeById,
  GetRoleById,
  GetServiceById,
  GetSupplierById,
  SearchAirports,
  UpdateAdditionalService,
  UpdateDepartment,
  UpdatePartnershipType,
  UpdateRole,
  UpdateService,
  UpdateSupplier,
} from "../../services/config/configService";

// Services
export const getAllServicesAsync = createAsyncThunk(
  "services/all",
  async () => {
    const response = await GetAllServices();
    return response;
  }
);

export const addServiceAsync = createAsyncThunk(
  "service/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddService(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getServiceByIdAsync = createAsyncThunk(
  "service/by/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await GetServiceById(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateServiceAsync = createAsyncThunk(
  "service/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateService(id, values);

      return response;
    } catch (error) {
      toast.error(error?.response?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteServiceAsync = createAsyncThunk(
  "service/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeleteService(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activateServiceAsync = createAsyncThunk(
  "service/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivateService(id);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log the error
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateServiceAsync = createAsyncThunk(
  "service/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivateService(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Additional Service

export const getAllAdditionalSServicesAsync = createAsyncThunk(
  "additional/services/all",
  async () => {
    const response = await GetAllAdditionalServices();
    return response;
  }
);

export const addAdditionalServiceAsync = createAsyncThunk(
  "additional/service/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddAdditionalService(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateAdditionalServiceAsync = createAsyncThunk(
  "additional/service/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateAdditionalService(id, values);

      return response;
    } catch (error) {
      console.log("addd res", error?.response?.data?.message);
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage.error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAdditionalServiceByIdAsync = createAsyncThunk(
  "get/additional/service/by/id",
  async ({ service_id }, { rejectWithValue }) => {
    try {
      const response = await GetAdditionalServiceById(service_id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activateAdditionalServiceAsync = createAsyncThunk(
  "additional/service/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivateAdditionalService(id);
      return response;
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateAdditionalServiceAsync = createAsyncThunk(
  "additional/service/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivateAdditionalService(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Supplier
export const getAllSuppliersAsync = createAsyncThunk(
  "suppliers/all",
  async () => {
    const response = await GetAllSuppliers();
    return response;
  }
);

export const addSupplierAsync = createAsyncThunk(
  "suppliers/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddSupplier(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getSupplierByIdAsync = createAsyncThunk(
  "suppliers/by/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await GetSupplierById(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateSupplierAsync = createAsyncThunk(
  "suppliers/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateSupplier(id, values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSupplierAsync = createAsyncThunk(
  "suppliers/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeleteSupplier(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activateSupplierAsync = createAsyncThunk(
  "suppliers/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivateSupplier(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateSupplierAsync = createAsyncThunk(
  "suppliers/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivateSupplier(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Department
export const getAllDepartmentsAsync = createAsyncThunk(
  "departments/all",
  async () => {
    const response = await GetAllDepartments();
    return response;
  }
);

export const addDepartmentAsync = createAsyncThunk(
  "departments/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddDepartment(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getDepartmentByIdAsync = createAsyncThunk(
  "departments/by/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await GetDepartmentById(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateDepartmentAsync = createAsyncThunk(
  "departments/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdateDepartment(id, values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDepartmentAsync = createAsyncThunk(
  "departments/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeleteDepartment(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activateDepartmentAsync = createAsyncThunk(
  "departments/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivateDepartment(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateDepartmentAsync = createAsyncThunk(
  "departments/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivateDepartment(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Partnership
export const getAllPartnershipsAsync = createAsyncThunk(
  "partnership/all",
  async () => {
    const response = await GetAllPartnershipTypes();
    return response;
  }
);

export const addPartnershipAsync = createAsyncThunk(
  "partnership/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddPartnershipType(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getPartnershipByIdAsync = createAsyncThunk(
  "partnership/by/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await GetPartnershipTypeById(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updatePartnershipAsync = createAsyncThunk(
  "partnership/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await UpdatePartnershipType(id, values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deletePartnershipAsync = createAsyncThunk(
  "partnership/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeletePartnershipType(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activatePartnershipAsync = createAsyncThunk(
  "partnership/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivatePartnershipType(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivatePartnershipAsync = createAsyncThunk(
  "partnership/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivatePartnershipType(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Role
export const getAllRoleAsync = createAsyncThunk("role/all", async () => {
  const response = await GetAllRoles();
  return response;
});

export const addRoleAsync = createAsyncThunk(
  "role/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await AddRole(values);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getRoleByIdAsync = createAsyncThunk(
  "role/by/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await GetRoleById(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateRoleAsync = createAsyncThunk(
  "role/update",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await UpdateRole(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const activateRoleAsync = createAsyncThunk(
  "role/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await ActivateRole(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateRoleAsync = createAsyncThunk(
  "role/deactivate",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await DeactivateRole(id);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Airports
export const getAllAirportsAsync = createAsyncThunk("airport/all", async () => {
  const response = await GetAllAirports();
  return response;
});

export const searchAirportsAsync = createAsyncThunk(
  "airport/search",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await SearchAirports(query);

      return response;
    } catch (error) {
      toast.error(error?.response?.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const configSlice = createSlice({
  name: "config",
  initialState: {
    getAllServicesResponse: {},
    addServiceResponse: {},
    getServiceByIdResponse: {},
    updateServiceResponse: {},
    deleteServiceResponse: {},
    activateServiceResponse: {},
    deactivateServiceResponse: {},

    // Additional Service
    getAllAdditionalServicesResponse: {},
    addAdditionalServiceResponse: {},
    getAdditionalServiceByIdResponse: {},
    updateAdditionalServiceResponse: {},
    deleteAdditionalServiceResponse: {},
    activateAdditionalServiceResponse: {},
    deactivateAdditionalServiceResponse: {},

    // Supplier
    getAllSuppliersResponse: {},
    addSupplierResponse: {},
    getSupplierByIdResponse: {},
    updateSupplierResponse: {},
    deleteSupplierResponse: {},
    activateSupplierResponse: {},
    deactivateSupplierResponse: {},
    // Department
    getAllDepartmentsResponse: {},
    addDepartmentResponse: {},
    getDepartmentByIdResponse: {},
    updateDepartmentResponse: {},
    deleteDepartmentResponse: {},
    activateDepartmentResponse: {},
    deactivateDepartmentResponse: {},

    // Partnership
    getAllPartnershipTypesResponse: {},
    addPartnershipTypeResponse: {},
    getPartnershipTypeByIdResponse: {},
    updatePartnershipTypeResponse: {},
    deletePartnershipTypeResponse: {},
    activatePartnershipTypeResponse: {},
    deactivatePartnershipTypeResponse: {},
    // Role
    getAllRoleResponse: {},
    addRoleResponse: {},
    getRoleByIdResponse: {},
    updateRoleResponse: {},
    activateRoleResponse: {},
    deactivateRoleResponse: {},

    // Airport
    getAllAirportsResponse: {},
    searchAirportsResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    // Service
    builder.addCase(getAllServicesAsync.fulfilled, (state, action) => {
      state.getAllServicesResponse = action.payload;
    });

    builder.addCase(addServiceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addServiceResponse = action.payload;
        state.getAllServicesResponse.data.unshift({
          id: action.payload?.data?.id,
          service_name: action.payload?.data?.service_name,
          rate_type: action.payload?.data?.rate_type,
          charge_rate: action.payload?.data?.charge_rate,
          currency: action.payload?.data?.currency,
          remarks: action.payload?.data?.remarks,
          status: action.payload?.data?.status,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addServiceAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(getServiceByIdAsync.fulfilled, (state, action) => {
      state.getServiceByIdResponse = action.payload;
    });

    builder.addCase(getServiceByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateServiceAsync.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.updateServiceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllServicesResponse.data =
          state.getAllServicesResponse.data.map((service) =>
            service.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  service_name: action.payload.data.service_name,
                  rate_type: action.payload.data.rate_type,
                  charge_rate: action.payload.data.charge_rate,
                  currency: action.payload.data.currency,
                  remarks: action.payload.data.remarks,
                  status: action.payload.data.status,
                }
              : service
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateServiceAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteServiceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deleteServiceResponse = action.payload;
        state.getAllServicesResponse = state.getAllServicesResponse.filter(
          (service) => service.id !== action.payload.id
        );

        toast.success("Service delete successfully");
      }
    });

    builder.addCase(deleteServiceAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateServiceAsync.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.activateServiceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllServicesResponse.data =
          state.getAllServicesResponse.data.map((service) =>
            service.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  service_name: action.payload.data.service_name,
                  rate_type: action.payload.data.rate_type,
                  charge_rate: action.payload.data.charge_rate,
                  currency: action.payload.data.currency,
                  remarks: action.payload.data.remarks,
                  status: action.payload.data.status,
                }
              : service
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateServiceAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deactivateServiceAsync.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.deactivateServiceResponse = action.payload;
        state.getAllServicesResponse.data =
          state.getAllServicesResponse.data.map((service) =>
            service.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  service_name: action.payload.data.service_name,
                  rate_type: action.payload.data.rate_type,
                  charge_rate: action.payload.data.charge_rate,
                  currency: action.payload.data.currency,
                  remarks: action.payload.data.remarks,
                  status: action.payload.data.status,
                }
              : service
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateServiceAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    // Additional Service

    builder.addCase(
      getAllAdditionalSServicesAsync.fulfilled,
      (state, action) => {
        state.getAllAdditionalServicesResponse = action.payload;
      }
    );

    builder.addCase(addAdditionalServiceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addAdditionalServiceResponse = action.payload;
        state.getAllAdditionalServicesResponse.unshift({
          id: action.payload?.data?.id,
          service_name: action.payload?.data?.service_name,
          rate_type: action.payload?.data?.rate_type,
          charge_rate: action.payload?.data?.charge_rate,
          currency: action.payload?.data?.currency,
          remarks: action.payload?.data?.remarks,
          status: action.payload?.data?.status,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addAdditionalServiceAsync.rejected, (state, action) => {
      state.addAdditionalServiceResponse = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(
      getAdditionalServiceByIdAsync.fulfilled,
      (state, action) => {
        state.getAdditionalServiceByIdResponse = action.payload;
      }
    );

    builder.addCase(getAdditionalServiceByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateAdditionalServiceAsync.fulfilled, (state, action) => {
      state.updateAdditionalServiceResponse = action.payload;
      state.getAllAdditionalServicesResponse =
        state.getAllAdditionalServicesResponse.map((service) =>
          service.id === action.payload.id
            ? {
                id: action.payload?.id,
                service_name: action.payload?.service_name,
                rate_type: action.payload?.rate_type,
                charge_rate: action.payload?.charge_rate,
                currency: action.payload?.currency,
                remarks: action.payload?.remarks,
                status: action.payload?.status,
                service_id: action.payload?.service_id,
              }
            : service
        );

      toast.success(action.payload.message);
    });

    builder.addCase(updateAdditionalServiceAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(
      activateAdditionalServiceAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.activateAdditionalServiceResponse = action.payload;

          // Filter and replace the existing record with the new record
          state.getAllAdditionalServicesResponse =
            state.getAllAdditionalServicesResponse.map((service) =>
              service.id === action.payload
                ? {
                    id: action.payload.data.id,
                    service_name: action.payload.data.service_name,
                    rate_type: action.payload.data.rate_type,
                    charge_rate: action.payload.data.charge_rate,
                    currency: action.payload.data.currency,
                    remarks: action.payload.data.remarks,
                    status: action.payload.data.status,
                  }
                : service
            );

          toast.success(action.payload.message);
        }
      }
    );

    builder.addCase(
      activateAdditionalServiceAsync.rejected,
      (state, action) => {
        toast.error(action?.payload?.message);
      }
    );

    builder.addCase(
      deactivateAdditionalServiceAsync.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.deactivateAdditionalServiceResponse = action.payload;
          state.getAllAdditionalServicesResponse =
            state.getAllAdditionalServicesResponse.map((service) =>
              service.id === action.payload
                ? {
                    id: action.payload.data.id,
                    service_name: action.payload.data.service_name,
                    rate_type: action.payload.data.rate_type,
                    charge_rate: action.payload.data.charge_rate,
                    currency: action.payload.data.currency,
                    remarks: action.payload.data.remarks,
                    status: action.payload.data.status,
                  }
                : service
            );
          toast.success(action.payload.message);
        }
      }
    );

    builder.addCase(
      deactivateAdditionalServiceAsync.rejected,
      (state, action) => {
        toast.error(action?.payload?.message);
      }
    );

    // Supplier
    builder.addCase(getAllSuppliersAsync.fulfilled, (state, action) => {
      state.getAllSuppliersResponse = action.payload;
    });

    builder.addCase(addSupplierAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addSupplierResponse = action.payload;
        state.getAllSuppliersResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          remarks: action.payload?.data?.remarks,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action.payload?.message);
      }
    });
    builder.addCase(addSupplierAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(getSupplierByIdAsync.fulfilled, (state, action) => {
      state.getServiceByIdResponse = action.payload;
    });

    builder.addCase(getSupplierByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateSupplierAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateSupplierResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllSuppliersResponse.data =
          state.getAllSuppliersResponse.data.map((client) =>
            client.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  name: action.payload?.data?.name,
                  remarks: action.payload?.data?.remarks,
                  created_at: action.payload?.data?.created_at,
                  status: action.payload?.data?.status,
                }
              : client
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateSupplierAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteSupplierAsync.fulfilled, (state, action) => {
      state.deleteServiceResponse = action.payload;
    });

    builder.addCase(deleteSupplierAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateSupplierAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateServiceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllSuppliersResponse.data =
          state.getAllSuppliersResponse.data.map((supplier) =>
            supplier.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  name: action.payload.data.name,
                  remarks: action.payload.data.remarks,
                  created_at: action.payload.data.created_at,
                  status: action.payload.data.status,
                }
              : supplier
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateSupplierAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deactivateSupplierAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateServiceResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllSuppliersResponse.data =
          state.getAllSuppliersResponse.data.map((supplier) =>
            supplier.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  name: action.payload.data.name,
                  remarks: action.payload.data.remarks,
                  created_at: action.payload.data.created_at,
                  status: action.payload.data.status,
                }
              : supplier
          );

        toast.success(action.payload.data.message);
      }
    });

    builder.addCase(deactivateSupplierAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    // Department
    builder.addCase(getAllDepartmentsAsync.fulfilled, (state, action) => {
      state.getAllDepartmentsResponse = action.payload;
    });

    builder.addCase(addDepartmentAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addDepartmentResponse = action.payload;
        state.getAllDepartmentsResponse.data.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action.payload?.message);
      }
    });
    builder.addCase(addDepartmentAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(getDepartmentByIdAsync.fulfilled, (state, action) => {
      state.getDepartmentByIdResponse = action.payload;
    });

    builder.addCase(getDepartmentByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateDepartmentAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateDepartmentResponse = action.payload;
        state.getAllDepartmentsResponse.data.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action.payload?.message);
      }
    });

    builder.addCase(updateDepartmentAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteDepartmentAsync.fulfilled, (state, action) => {
      state.deleteDepartmentResponse = action.payload;
    });

    builder.addCase(deleteDepartmentAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateDepartmentAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateDepartmentResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllDepartmentsResponse.data =
          state.getAllDepartmentsResponse.data.map((department) =>
            department.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  name: action.payload.data.name,
                  created_at: action.payload.data.created_at,
                  status: action.payload.data.status,
                }
              : department
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateDepartmentAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(deactivateDepartmentAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateDepartmentResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllDepartmentsResponse.data =
          state.getAllDepartmentsResponse.data.map((department) =>
            department.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  name: action.payload.data.name,
                  created_at: action.payload.data.created_at,
                  status: action.payload.data.status,
                }
              : department
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateDepartmentAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    // Partnership
    builder.addCase(getAllPartnershipsAsync.fulfilled, (state, action) => {
      state.getAllPartnershipTypesResponse = action.payload;
    });

    builder.addCase(addPartnershipAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addPartnershipTypeResponse = action.payload;
        state.getAllPartnershipTypesResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action?.payload?.data?.message);
      }
    });
    builder.addCase(addPartnershipAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(getPartnershipByIdAsync.fulfilled, (state, action) => {
      state.getPartnershipTypeByIdResponse = action.payload;
    });

    builder.addCase(getPartnershipByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updatePartnershipAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updatePartnershipTypeResponse = action.payload;
        state.getAllPartnershipTypesResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action?.payload?.message);
      }
    });

    builder.addCase(updatePartnershipAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(deletePartnershipAsync.fulfilled, (state, action) => {
      state.deletePartnershipTypeResponse = action.payload;
    });

    builder.addCase(deletePartnershipAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(activatePartnershipAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activatePartnershipTypeResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllPartnershipTypesResponse.data =
          state.getAllPartnershipTypesResponse.data.map((partnershipType) =>
            partnershipType.id === action.payload.data.id
              ? {
                  id: action.payload.data.id,
                  name: action.payload.data.name,
                  created_at: action.payload.data.created_at,
                  status: action.payload.data.status,
                }
              : partnershipType
          );

        toast.success(action.payload.data.message);
      }
    });

    builder.addCase(activatePartnershipAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(deactivatePartnershipAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivatePartnershipTypeResponse = action.payload;
        state.getAllPartnershipTypesResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          created_at: action.payload?.data?.created_at,
          status: action.payload?.data?.status,
        });

        toast.success(action?.payload?.message);
      }
    });
    builder.addCase(deactivatePartnershipAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    // Role
    builder.addCase(getAllRoleAsync.fulfilled, (state, action) => {
      state.getAllRoleResponse = action.payload;
    });

    builder.addCase(addRoleAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addRoleResponse = action.payload;
        state.getAllRoleResponse.data.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          email: action.payload?.data?.email,
          status: action.payload?.data?.status,
          phone_number: action.payload?.data?.phone_number,
          profile_picture: action?.payload?.profile_picture,
        });

        toast.success("Role added successfully");
      }
    });
    builder.addCase(addRoleAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(getRoleByIdAsync.fulfilled, (state, action) => {
      state.getRoleByIdResponse = action.payload;
    });

    builder.addCase(getRoleByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateRoleAsync.fulfilled, (state, action) => {
      state.updateRoleResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(updateRoleAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(activateRoleAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.activateRoleResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllRoleResponse.data = state.getAllRoleResponse.data.map(
          (role) =>
            role.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  role_name: action.payload?.data?.role_name,
                  status: action.payload?.data?.status,
                }
              : role
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(activateRoleAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
    builder.addCase(deactivateRoleAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.deactivateRoleResponse = action.payload;

        // Filter and replace the existing record with the new record
        state.getAllRoleResponse.data = state.getAllRoleResponse.data.map(
          (role) =>
            role.id === action.payload.data.id
              ? {
                  id: action.payload?.data?.id,
                  role_name: action.payload?.data?.role_name,
                  status: action.payload?.data?.status,
                }
              : role
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(deactivateRoleAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
    // Airport
    builder.addCase(getAllAirportsAsync.fulfilled, (state, action) => {
      state.getAllAirportsResponse = action.payload;
    });

    builder.addCase(getAllAirportsAsync.rejected, (state, action) => {
      state.getAllAirportsResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(searchAirportsAsync.fulfilled, (state, action) => {
      state.getAllAirportsResponse = action.payload;
    });

    builder.addCase(searchAirportsAsync.rejected, (state, action) => {
      state.getAllAirportsResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default configSlice.reducer;
