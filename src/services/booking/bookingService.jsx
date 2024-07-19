import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllBookings = async () => {
  const response = await GetRequest("/bookings");
  return response;
};

export const AddBooking = async (body) => {
  const response = await PostRequest("/bookings", body);
  return response;
};

export const GetBookingById = async (id) => {
  const response = await GetRequest(`/bookings/${id}`);
  return response;
};

export const UpdateBooking = async (id, body) => {
  const response = await PutRequest(`/bookings/${id}`, body);
  return response;
};

export const DeleteBooking = async (id) => {
  const response = await DeleteRequest(`/bookings/${id}`);
  return response;
};

export const DeactivateBooking = async (id) => {
  const response = await PutRequest(`/bookings/deactivate/${id}`);
  return response;
};

export const ActivateBooking = async (id) => {
  const response = await PutRequest(`/bookings/activate/${id}`);
  return response;
};
