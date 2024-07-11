import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllUsers = async () => {
  const response = await GetRequest("/users");
  return response;
};

export const AddUser = async (body) => {
  const response = await PostRequest("/users/create-user", body);
  return response;
};

export const GetUserById = async (id) => {
  const response = await GetRequest(`/users/${id}`);
  return response;
};

export const UpdateUser = async (id, body) => {
  const response = await PutRequest(`/users/update-user/${id}`, body);
  return response;
};

export const DeleteUser = async (id) => {
  await DeleteRequest(`/users/${id}`);
};

export const GetAuthUser = async () => {
  const response = await GetRequest("/users/get-authenticated-user");
  return response;
};
