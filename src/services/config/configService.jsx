import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllServices = async () => {
  const response = await GetRequest("/services");
  return response;
};

export const AddUser = async (body) => {
  const response = await PostRequest("auth/users", body);
  return response;
};

export const AddAdminUser = async (body) => {
  const response = await PostRequest("auth/get/admin/create", body);
  return response;
};

export const GetUserById = async (id) => {
  const response = await GetRequest(`auth/users/${id}`);
  return response;
};

export const UpdateUser = async (id, body) => {
  const response = await PutRequest(`auth/users/${id}/`, body);
  return response;
};

export const DeleteUser = async (id) => {
  await DeleteRequest(`auth/users/${id}`);
};

export const getAuthUser = async () => {
  const response = await GetRequest("/auth/user");
  return response;
};

export const updateAuthUser = async (body) => {
  const response = await PutRequest("/auth/user/auth/update", body);
  return response;
};
