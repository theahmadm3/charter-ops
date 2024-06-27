import { PostRequest } from "../../util/apiMethods";

export const login = async (credentials) => {
  const response = await PostRequest("/users/login", credentials);
  return response;
};

export const forgetPassword = async (credentials) => {
  const response = await PostRequest("/password/forgot", credentials);
  return response;
};

export const resetPassword = async (credentials) => {
  const response = await PostRequest("/password/reset", credentials);
  return response;
};

export const logout = async () => {
  const response = await PostRequest("/users/logout");
  return response;
};
