import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllAircraftMaintenanceOrg = async () => {
  const response = await GetRequest("/aircraft-maintenance-organizations");
  return response;
};

export const AddAircraftMaintenanceOrg = async (body) => {
  const response = await PostRequest(
    "/aircraft-maintenance-organizations",
    body
  );
  return response;
};

export const GetAircraftMaintenanceOrgById = async (id) => {
  const response = await GetRequest(
    `/aircraft-maintenance-organizations/${id}`
  );
  return response;
};

export const UpdateAircraftMaintenanceOrg = async (id, body) => {
  const response = await PutRequest(
    `/aircraft-maintenance-organizations/${id}`,
    body
  );
  return response;
};

export const DeleteAircraftMaintenanceOrg = async (id) => {
  const response = await DeleteRequest(
    `/aircraft-maintenance-organizations/${id}`
  );
  return response;
};

export const DeactivateAircraftMaintenanceOrg = async (id) => {
  const response = await PutRequest(
    `/aircraft-maintenance-organizations/${id}/deactivate`
  );
  return response;
};
export const ActivateAircraftMaintenanceOrg = async (id) => {
  const response = await PutRequest(
    `/aircraft-maintenance-organizations/${id}/activate`
  );
  return response;
};
