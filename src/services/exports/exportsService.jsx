import { DownloadRequest } from "../../util/apiMethods";

export const ExportBookings = async (params) => {
    // Initialize an array to hold query string parts
    const queryParams = [];

    // Validate that at least start_date or aircraft_type is provided
    if (!params.start_date && !params.aircraft_type) {
        throw new Error("At least start_date or aircraft_type must be provided");
    }

    // Initialize payload with only provided parameters
    const payload = {};
    if (params.start_date) payload.start_date = params.start_date;
    if (params.end_date) payload.end_date = params.end_date;
    if (params.aircraft_type) payload.aircraft_type = params.aircraft_type;

    const queryString = Object.keys(payload)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
        .join('&');

    // Make the request to download the Excel file
    const response = await DownloadRequest(`/export/flybird-clients?${queryString}`);
    return response;
};
