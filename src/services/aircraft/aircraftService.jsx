import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllAircrafts = async () => {
  const response = await GetRequest("/aircrafts");
  return response;
};

export const AddAircraft = async (body) => {
  const response = await PostRequest("/aircrafts", body);
  return response;
};

export const GetAircraftById = async (id) => {
  const response = await GetRequest(`/aircrafts/${id}`);
  return response;
};

export const UpdateAircraft = async (id, body) => {
  const response = await PutRequest(`/aircrafts/${id}`, body);
  return response;
};

export const DeleteAircraft = async (id) => {
  const response = await DeleteRequest(`/aircrafts/${id}`);
  return response;
};

export const ActivateAircraft = async (id) => {
  try {
    const response = await PutRequest(`/aircrafts/activate/${id}`);
    return response;
  } catch (error) {
    console.error("Error in ActivateService:", error);
    throw error;
  }
};

export const DeactivateAircraft = async (id) => {
  try {
    const response = await PutRequest(`/aircrafts/deactivate/${id}`);
    return response;
  } catch (error) {
    console.error("Error in DeactivateService:", error);
    throw error;
  }
};
