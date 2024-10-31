import {
  GetRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllContacts = async () => {
  const response = await GetRequest("/contact-requests");
  //console.log("API Response:", response);
  return response;
};

export const UpdateContactStatus = async (id, status) => {
  const response = await PutRequest(`/contact-requests/${id}/status`, { status });
  //console.log("API Responsew:", response);
  return response;
};
