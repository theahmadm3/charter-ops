import { GetRequest } from "../../util/apiMethods";

export const GetAllReporting = async (params) => {
  // Initialize an array to hold query string parts
  const queryParams = [];

  //  parameters to the query string array only if they have a value
  if (params.start_date) queryParams.push(`start_date=${params.start_date}`);
  if (params.end_date) queryParams.push(`end_date=${params.end_date}`);

  // Join the query string parts with "&"
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  // Make the request with the query string if it exists
  const response = await GetRequest(`/reporting/statistics/${queryString}`);
  return response;
};
