import {
  DeleteRequest,
  GetRequest,
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
  await DeleteRequest(`/services/${id}`);
};

export const ActivateService = async (id) => {
  await PutRequest(`/services/activate/${id}`);
};
export const DeactivateService = async (id) => {
  await PutRequest(`/services/deactivate/${id}`);
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
  await PutRequest(`/suppliers/activate/${id}`);
};
export const DeactivateSupplier = async (id) => {
  await PutRequest(`/suppliers/deactivate/${id}`);
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
  await PutRequest(`/departments/activate/${id}`);
};
export const DeactivateDepartment = async (id) => {
  await PutRequest(`/departments/deactivate/${id}`);
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
  await PutRequest(`/partnership_types/activate/${id}`);
};
export const DeactivatePartnershipType = async (id) => {
  await PutRequest(`/partnership_types/deactivate/${id}`);
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
  const response = await PutRequest(
    `/config/roles/update-role/activate-role/${id}`,
    body
  );
  return response;
};
export const DeactivateRole = async (id, body) => {
  const response = await PutRequest(
    `/config/roles/deactivate-role/${id}`,
    body
  );
  return response;
};
