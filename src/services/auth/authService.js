import { DeleteRequest, PostRequest, PutRequest } from "../../util/apiMethods";

export const login = async (credentials) => {
  const response = await PostRequest("/auth/login", credentials);
  return response;
};

export const forgetPassword = async (credentials) => {
  const response = await PostRequest("/auth/reset", credentials);
  return response;
};

export const resetPassword = async (credentials, token) => {
  const response = await PutRequest(`/reset/${token}`, credentials);
  return response;
};

export const logout = async () => {
  const response = await PostRequest("/auth/logout");
  return response;
};
