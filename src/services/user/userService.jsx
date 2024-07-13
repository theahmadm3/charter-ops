import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllUsers = async (user_type) => {
  let url = "/users";
  if (user_type) {
    url += `?user_type=${user_type}`;
  }

  const response = await GetRequest(url);
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
  const response = await DeleteRequest(`/users/${id}`);
  return response;
};

export const DeactivateUser = async (id) => {
  const response = await PutRequest(`/users/deactivate/${id}`);
  return response;
};
export const ActivateUser = async (id) => {
  const response = await PutRequest(`/users/activate/${id}`);
  return response;
};

export const GetAuthUser = async () => {
  const response = await GetRequest("/users/get-authenticated-user");
  return response;
};
