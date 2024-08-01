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

export const AddBookingStep01 = async (body) => {
  const response = await PostRequest("/booking/step1", body);
  return response;
};

export const AddBookingStep02 = async (bookingId, body) => {
  const response = await PostRequest(
    `/booking/${bookingId}/select-aircraft`,
    body
  );
  return response;
};
export const AddBookingStep03 = async (bookingId, body) => {
  const response = await PostRequest(`/booking/${bookingId}/passengers`, body);
  return response;
};

export const AddBookingStep04 = async (bookingId, body) => {
  const response = await PostRequest(
    `/booking/${bookingId}/additional-services`,
    body
  );
  return response;
};
