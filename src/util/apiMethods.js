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

export const DownloadRequest = async (url) => {
  try {
    const response = await api.get(url, {
      responseType: "blob",
      headers: {
        'accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'X-CSRF-TOKEN': localStorage.getItem('csrf_token') || ''
      }
    });

    // Create download link
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Extract filename
    const disposition = response.headers['content-disposition'];
    const match = disposition?.match(/filename="?(.+)"?/);
    const filename = match ? match[1] : 'export.xlsx';

    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    return response;
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};
