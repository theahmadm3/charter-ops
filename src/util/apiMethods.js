import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// Set default headers and content type
// api.defaults.headers.common["token"] = `${localStorage.getItem("token")}`;
const token = localStorage.getItem("token");
// Set default headers and content type
if (token != null) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
}

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
api.defaults.headers.patch["Content-Type"] = "application/json";

export const GetRequest = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const PostRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const PutRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const PatchRequest = async (url, data) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const DeleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
