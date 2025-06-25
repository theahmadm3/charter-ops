import { DownloadRequest } from "../../util/apiMethods";

export const ExportBookings = async (params) => {
    if (!params.start_date && !params.aircraft_type) {
        throw new Error("At least start_date or aircraft_type must be provided");
    }

    const queryParams = new URLSearchParams();
    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);
    if (params.aircraft_type) queryParams.append('aircraft_type', params.aircraft_type);

    return await DownloadRequest(`/export/flybird-clients?${queryParams.toString()}`);
};
