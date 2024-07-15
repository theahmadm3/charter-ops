import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllClients = async () => {
  const response = await GetRequest("/clients");
  return response;
};

export const AddClient = async (body) => {
  const response = await PostRequest("/clients/create-client", body);
  return response;
};

export const GetClientById = async (id) => {
  const response = await GetRequest(`/clients/${id}`);
  return response;
};

export const UpdateClient = async (id, body) => {
  const response = await PutRequest(`/clients/update-client/${id}`, body);
  return response;
};

export const DeleteClient = async (id) => {
  const response = await DeleteRequest(`/clients/${id}`);
  return response;
};

export const DeactivateClient = async (id) => {
  const response = await PutRequest(`/clients/deactivate/${id}`);
  return response;
};
export const ActivateClient = async (id) => {
  const response = await PutRequest(`/clients/activate/${id}`);
  return response;
};
