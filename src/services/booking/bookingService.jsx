import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../util/apiMethods";

export const GetAllBookings = async (params) => {
  // Initialize an empty array to hold query string parts
  const queryParams = [];

  // Add parameters to the query string array only if they have a value
  if (params.payment_status)
    queryParams.push(`payment_status=${params.payment_status}`);
  if (params.status) queryParams.push(`status=${params.status}`);
  if (params.aircraft_reg_no)
    queryParams.push(`aircraft_reg_no=${params.aircraft_reg_no}`);
  if (params.trip_type) queryParams.push(`trip_type=${params.trip_type}`);
  if (params.aircraft_name)
    queryParams.push(`aircraft_name=${params.aircraft_name}`);
  if (params.flight_date)
    queryParams.push(`flight_date=${encodeURIComponent(params.flight_date)}`);
  if (params.return_date)
    queryParams.push(`return_date=${encodeURIComponent(params.return_date)}`);

  // Join the query string parts with "&"
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  // Make the request with the query string if it exists
  const response = await GetRequest(`/bookings${queryString}`);
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

export const AddBookingStep05 = async (bookingId, body) => {
  const response = await PostRequest(`/booking/${bookingId}/trip-sheet`, body);
  return response;
};

export const GetAvailableAircraftBookingById = async (bookingId) => {
  const response = await GetRequest(
    `/available-aircraft?booking_id=${bookingId}`
  );
  return response;
};

export const BookingStatus = async (booking_id, body) => {
  const response = await PutRequest(`/bookings/${booking_id}/status`, body);
  return response;
};

export const BookingPaymentStatus = async (booking_id, body) => {
  const response = await PutRequest(
    `/bookings/${booking_id}/payment-status`,
    body
  );
  return response;
};

export const GetBookingReceipt = async (booking_id) => {
  const response = await GetRequest(`/bookings/receipt-preview/${booking_id}`);
  return response;
};

export const GetBookingTripSheet = async (booking_id) => {
  const response = await GetRequest(
    `/bookings/trip-sheet-preview/${booking_id}`
  );
  return response;
};

export const GetBookingTripConfirmation = async (booking_id) => {
  const response = await GetRequest(
    `/bookings/trip-confirmation-preview/${booking_id}`
  );
  return response;
};
