import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllFuel = async () => {
  const response = await GetRequest("/fuels");
  return response;
};

export const AddFuel = async (body) => {
  const response = await PostRequest("/fuels", body);
  return response;
};

export const GetFuelById = async (id) => {
  const response = await GetRequest(`/fuels/${id}`);
  return response;
};

export const UpdateFuel = async (id, body) => {
  const response = await PutRequest(`/fuels/${id}`, body);
  return response;
};

export const DeleteFuel = async (id) => {
  const response = await DeleteRequest(`/fuels/${id}`);
  return response;
};

export const DeactivateFuel = async (id) => {
  const response = await PutRequest(`/fuels/deactivate/${id}`);
  return response;
};
export const ActivateFuel = async (id) => {
  const response = await PutRequest(`/fuels/activate/${id}`);
  return response;
};
