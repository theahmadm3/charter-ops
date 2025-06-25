import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Pagination,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import {
  getAllBookingAsync,
  getBookingConfirmationSheetAsync,
  getBookingReceiptAsync,
  getBookingTripSheetAsync,
} from "../../../../slices/booking/bookingSlice";
import { useEffect, useState } from "react";
import ViewBookingFile from "../booking/modals/view-files";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import ViewBooking from "../booking/modals/view-booking";
import CustomPagination from "../../../../util/pagination";
import { toast } from "react-toastify";

const Transaction = () => {
  const [viewData, setViewdata] = useState([]);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewBookingFileModal, setViewBookingFileModal] = useState(false);
  const bookingInfo = useSelector((state) => state?.booking);
  const dispatch = useDispatch();
  const [bookingFile, setBookingFile] = useState("");

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleViewBooking = (id) => {
    setViewBooking(true);
    const viewInfo = bookingInfo?.getAllBookingResponse?.data?.filter(
      (data) => data.id === id
    );
    setViewdata(viewInfo);
  };

  const [currentPage, setCurrentPage] = useState(
    bookingInfo?.getAllBookingResponse?.meta?.current_page[0]
  );
  useEffect(() => {
    dispatch(getAllBookingAsync({ page: currentPage, payment_status: "paid" }));
  }, [currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(getAllBookingAsync({ page: newPage }));
  };

  const handleViewReceipt = async (id) => {
    try {
      const response = await dispatch(
        getBookingReceiptAsync({
          booking_id: id,
        })
      );

      if (response?.payload) {
        setViewBookingFileModal(true);
        const pdfData = baseUrl + `bookings/receipt-preview/${id}`;

        setBookingFile(pdfData);

        toast.success("Booking receipt fetched successfully!");
      } else {
        toast.error("Failed to fetch the booking receipt.");
      }
    } catch (error) {
      console.error("Error fetching the booking receipt:", error);
      toast.error("An error occurred while fetching the receipt.");
    }
  };

  const handleViewTripSheet = async (id) => {
    try {
      const response = await dispatch(
        getBookingTripSheetAsync({
          booking_id: id,
        })
      );

      if (response?.payload) {
        setViewBookingFileModal(true);
        const tripSheetData = baseUrl + `bookings/trip-sheet-preview/${id}`;

        setBookingFile(tripSheetData);

        toast.success("Trip sheet fetched successfully!");
      } else {
        toast.error("Failed to fetch the trip sheet.");
      }
    } catch (error) {
      console.error("Error fetching the trip sheet:", error);
      toast.error("An error occurred while fetching the trip sheet.");
    }
  };

  const handleViewConfirmation = async (id) => {
    try {
      const response = await dispatch(
        getBookingConfirmationSheetAsync({
          booking_id: id,
        })
      );

      if (response?.payload) {
        setViewBookingFileModal(true); // Assuming you're using the same modal for different files
        const confirmationSheetData =
          baseUrl + `bookings/trip-confirmation-preview/${id}`;

        setBookingFile(confirmationSheetData); // Update the state with the confirmation sheet data

        toast.success("Confirmation sheet fetched successfully!");
      } else {
        toast.error("Failed to fetch the confirmation sheet.");
      }
    } catch (error) {
      console.error("Error fetching the confirmation sheet:", error);
      toast.error("An error occurred while fetching the confirmation sheet.");
    }
  };

  return (
    <AdminLayout>
      <ViewBooking
        show={viewBooking}
        onHide={() => setViewBooking(false)}
        data={viewData}
      />
      <ViewBookingFile
        show={viewBookingFileModal}
        onHide={() => setViewBookingFileModal(false)}
        data={bookingFile}
      />

      <Container fluid>
        <div>
          <h6 className="mb-4"> Booking Transaction</h6>

          <Table striped hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Route</th>
                <th>Date & Time</th>
                <th>Booked By</th>
                <th>Client</th>
                <th>Aircraft</th>

                <th>Amount</th>
                <th>Payment Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookingInfo?.getAllBookingResponse?.data?.length > 0 ? (
                bookingInfo?.getAllBookingResponse?.data.map(
                  (booking, index) => {
                    const {
                      from_location,
                      to_location,
                      flight_time,
                      flight_date,
                      return_date,
                      return_time,
                      payment_status,
                      client,
                      bookedBy,
                      aircraft,
                      total_amount,
                    } = booking;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{from_location + " -> " + to_location}</td>
                        <td>
                          {`${moment(flight_date).format("ll")} | ${moment(
                            flight_time,
                            "HH:mm:ss"
                          ).format("LT")}`}
                          &rarr;
                          {`${moment(return_date).format("ll")} | ${moment(
                            return_time,
                            "HH:mm:ss"
                          ).format("LT")}`}
                        </td>
                        <td>
                          {bookedBy?.first_name + " " + bookedBy?.last_name}
                        </td>
                        <td>{client?.first_name + " " + client?.last_name}</td>
                        <td>
                          {aircraft?.reg_no + " " + aircraft?.aircraft_type}
                        </td>

                        <td>
                          {total_amount
                            ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(total_amount)
                            : "--"}
                        </td>
                        <td className="text-success">{payment_status}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              className="border-0"
                            >
                              <HiDotsHorizontal />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                className="small"
                                onClick={() => handleViewBooking(booking.id)}
                              >
                                View More
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="small"
                                onClick={() => handleViewReceipt(booking.id)}
                              >
                                View Receipt
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr className="text-center">
                  <td colSpan="10">No booking available</td>
                </tr>
              )}
            </tbody>
          </Table>

          <CustomPagination
            currentPage={currentPage}
            lastPage={
              bookingInfo?.getAllBookingResponse?.meta?.last_page[0] || 1
            }
            onPageChange={handlePageChange}
            links={bookingInfo?.getAllBookingResponse?.meta?.links || []}
          />
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Transaction;
