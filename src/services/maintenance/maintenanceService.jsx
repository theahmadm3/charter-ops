import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllMaintenance = async () => {
  const response = await GetRequest("/maintenance-activities");
  return response;
};

export const AddMaintenance = async (body) => {
  const response = await PostRequest("/maintenance-activities", body);
  return response;
};

export const GetMaintenanceById = async (id) => {
  const response = await GetRequest(`/maintenance-activities/${id}`);
  return response;
};

export const UpdateMaintenance = async (id, body) => {
  const response = await PutRequest(`/maintenance-activities/${id}`, body);
  return response;
};

export const UpdateMaintenancePayment = async (id, body) => {
  const response = await PutRequest(`/fuels/${id}/payment-status`, body);
  return response;
};

export const DeleteMaintenance = async (id) => {
  const response = await DeleteRequest(`/maintenance-activities/${id}`);
  return response;
};

export const DeactivateMaintenance = async (id) => {
  const response = await PutRequest(`/maintenance-activities/${id}/deactivate`);
  return response;
};
export const ActivateMaintenance = async (id) => {
  const response = await PutRequest(`/maintenance-activities/${id}/activate`);
  return response;
};
