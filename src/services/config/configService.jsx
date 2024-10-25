import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

// Services
export const GetAllServices = async () => {
  const response = await GetRequest("/services");
  return response;
};

export const AddService = async (body) => {
  const response = await PostRequest("/services", body);
  return response;
};

export const GetServiceById = async (id) => {
  const response = await GetRequest(`/services/${id}`);
  return response;
};

export const UpdateService = async (id, body) => {
  const response = await PutRequest(`/services/${id}`, body);
  return response;
};

export const DeleteService = async (id) => {
  const response = await DeleteRequest(`/services/${id}`);
  return response;
};

export const ActivateService = async (id) => {
  try {
    const response = await PutRequest(`/services/activate/${id}`);
    return response;
  } catch (error) {
    console.error("Error in ActivateService:", error);
    throw error;
  }
};

export const DeactivateService = async (id) => {
  try {
    const response = await PutRequest(`/services/deactivate/${id}`);
    return response;
  } catch (error) {
    console.error("Error in DeactivateService:", error);
    throw error;
  }
};

// Additional Service
export const GetAllAdditionalServices = async () => {
  const response = await GetRequest("/additional-services");
  return response;
};

export const AddAdditionalService = async (body) => {
  const response = await PostRequest("/additional-services", body);
  return response;
};

export const UpdateAdditionalService = async (id, body) => {
  const response = await PutRequest(`/additional-services/${id}`, body);
  return response;
};

export const GetAdditionalServiceById = async (service_id) => {
  const response = await GetRequest(
    `/services/${service_id}/additional-services`
  );
  return response;
};

export const ActivateAdditionalService = async (id) => {
  try {
    const response = await PatchRequest(`/additional-services/${id}/activate`);
    return response;
  } catch (error) {
    console.error("Error in ActivateService:", error);
    throw error;
  }
};

export const DeactivateAdditionalService = async (id) => {
  try {
    const response = await PatchRequest(
      `/additional-services/${id}/deactivate`
    );
    return response;
  } catch (error) {
    console.error("Error in DeactivateService:", error);
    throw error;
  }
};

// Supplier
export const GetAllSuppliers = async () => {
  const response = await GetRequest("/suppliers");
  return response;
};

export const AddSupplier = async (body) => {
  const response = await PostRequest("/suppliers", body);
  return response;
};

export const GetSupplierById = async (id) => {
  const response = await GetRequest(`/suppliers/${id}`);
  return response;
};

export const UpdateSupplier = async (id, body) => {
  const response = await PutRequest(`/suppliers/${id}`, body);
  return response;
};

export const DeleteSupplier = async (id) => {
  await DeleteRequest(`/suppliers/${id}`);
};

export const ActivateSupplier = async (id) => {
  const response = await PutRequest(`/suppliers/activate/${id}`);
  return response;
};
export const DeactivateSupplier = async (id) => {
  const response = await PutRequest(`/suppliers/deactivate/${id}`);
  return response;
};

// Department
export const GetAllDepartments = async () => {
  const response = await GetRequest("/departments");
  return response;
};

export const AddDepartment = async (body) => {
  const response = await PostRequest("/departments", body);
  return response;
};

export const GetDepartmentById = async (id) => {
  const response = await GetRequest(`/departments/${id}`);
  return response;
};

export const UpdateDepartment = async (id, body) => {
  const response = await PutRequest(`/departments/${id}`, body);
  return response;
};

export const DeleteDepartment = async (id) => {
  await DeleteRequest(`/departments/${id}`);
};

export const ActivateDepartment = async (id) => {
  const response = await PutRequest(`/departments/activate/${id}`);
  return response;
};
export const DeactivateDepartment = async (id) => {
  const response = await PutRequest(`/departments/deactivate/${id}`);
  return response;
};

// Partnership
export const GetAllPartnershipTypes = async () => {
  const response = await GetRequest("/partnership_types");
  return response;
};

export const AddPartnershipType = async (body) => {
  const response = await PostRequest("/partnership_types", body);
  return response;
};

export const GetPartnershipTypeById = async (id) => {
  const response = await GetRequest(`/partnership_types/${id}`);
  return response;
};

export const UpdatePartnershipType = async (id, body) => {
  const response = await PutRequest(`/partnership_types/${id}`, body);
  return response;
};

export const DeletePartnershipType = async (id) => {
  await DeleteRequest(`/partnership_types/${id}`);
};

export const ActivatePartnershipType = async (id) => {
  const response = await PutRequest(`/partnership_types/activate/${id}`);
  return response;
};
export const DeactivatePartnershipType = async (id) => {
  const response = await PutRequest(`/partnership_types/deactivate/${id}`);
  return response;
};

// Role
export const GetAllRoles = async () => {
  const response = await GetRequest("/config/roles");
  return response;
};

export const AddRole = async (body) => {
  const response = await PostRequest("/config/roles/create-role", body);
  return response;
};

export const GetRoleById = async (id) => {
  const response = await GetRequest(`/config/roles/${id}`);
  return response;
};

export const UpdateRole = async (id, body) => {
  const response = await PutRequest(`/config/roles/update-role/${id}`, body);
  return response;
};
export const ActivateRole = async (id, body) => {
  const response = await PutRequest(`/config/roles/activate-role/${id}`, body);
  return response;
};
export const DeactivateRole = async (id, body) => {
  const response = await PutRequest(
    `/config/roles/deactivate-role/${id}`,
    body
  );
  return response;
};

// Airport
export const GetAllAirports = async () => {
  const response = await GetRequest("/airports");
  return response;
};

export const SearchAirports = async (query) => {
  const response = await GetRequest(`/airports/search?query=${query}`);
  return response;
};
