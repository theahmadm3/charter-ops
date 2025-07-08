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
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  bookingPaymentStatusAsync,
  getAllBookingAsync,
  getBookingConfirmationSheetAsync,
  getBookingReceiptAsync,
  getBookingTripSheetAsync,
} from "../../../../slices/booking/bookingSlice";
import { useNavigate } from "react-router-dom";
import ViewBooking from "./modals/view-booking";
// import ExportToExcel from "./modals/export-to-excel";
import {
  activateAircraftAsync,
  deactivateAircraftAsync,
  deleteAircraftAsync,
  getAllAircraftsAsync,
} from "../../../../slices/aircraft/aircraftSlice";
import AddAircraft from "../aircraft/modal/add-aircraft";
import EditAircraft from "../aircraft/modal/edit-aircraft";
import ManageBookingModal from "./modals/manage-booking";
import UpdateStatusModal from "./modals/updated-status";
import BookingFilter from "../../../../component/filters/booking-filter";
import { toast } from "react-toastify";
import ViewBookingFile from "./modals/view-files";
import moment from "moment";
import CustomPagination from "../../../../util/pagination";
import ExportToExcel from "./modals/export-bookings";
import { capitalise } from "../../../../util/usableFunctions";

const Booking = () => {
  const dispatch = useDispatch();
  const [viewData, setViewdata] = useState([]);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewBookingFileModal, setViewBookingFileModal] = useState(false);
  const [bookingFile, setBookingFile] = useState("");
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("flight");
  const [modalAddAircraft, setModalAddAircraft] = useState(false);
  const [modalEditAircraft, setModalEditAircraft] = useState(false);
  const [updateAircraft, setUpdateAircraft] = useState([]);
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const bookingInfo = useSelector((state) => state?.booking);
  const [updateBooking, setUpdateBooking] = useState([]);
  const [manageBooking, setManageBooking] = useState(false);
  const [updateBookingStatus, setUpdateBookingStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    bookingInfo?.getAllBookingResponse?.meta?.current_page[0]
  );

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleEditAircraft = (id) => {
    setModalEditAircraft(true);

    const updateAircraft = airCraftInfo?.getAllAircraftResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateAircraft(updateAircraft);
  };

  const handleDeactivateAircraft = (id) => {
    dispatch(deactivateAircraftAsync({ id }));
  };

  const handleDeleteAircraft = (id) => {
    dispatch(deleteAircraftAsync({ id }));
  };

  const handleActivateAircraft = (id) => {
    dispatch(activateAircraftAsync({ id }));
  };

  useEffect(() => {
    try {
      dispatch(getAllBookingAsync({}));
      dispatch(getAllAircraftsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleViewBooking = (id) => {
    setViewBooking(true);
    const viewInfo = bookingInfo?.getAllBookingResponse?.data?.filter(
      (data) => data.id === id
    );
    setViewdata(viewInfo);
  };

  const handleAdd = () => {
    window.location.href = "/admin-add-booking";
  };

  useEffect(() => {
    const savedActiveKey = localStorage.getItem("bookActiveTab");
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  const handleSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("bookActiveTab", key);
  };

  const handleEditBooking = (id) => {
    const updateBooking = bookingInfo?.getAllBookingResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateBooking(updateBooking);
    setManageBooking(true);
  };

  const handleBookingStatus = (id) => {
    const updateBooking = bookingInfo?.getAllBookingResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateBooking(updateBooking);

    setUpdateBookingStatus(true);
  };

  const handleBookingPaymentStatus = (id) => {
    dispatch(
      bookingPaymentStatusAsync({
        booking_id: id,
        values: {
          payment_status: "paid",
        },
      })
    );
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

  useEffect(() => {
    dispatch(getAllBookingAsync({ page: currentPage }));
  }, [currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(getAllBookingAsync({ page: newPage }));
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
      <UpdateStatusModal
        show={updateBookingStatus}
        onHide={() => setUpdateBookingStatus(false)}
        data={updateBooking}
      />
      <ManageBookingModal
        show={manageBooking}
        onHide={() => setManageBooking(false)}
        data={updateBooking}
      />

      <AddAircraft
        show={modalAddAircraft}
        onHide={() => setModalAddAircraft(false)}
      />
      <EditAircraft
        show={modalEditAircraft}
        onHide={() => setModalEditAircraft(false)}
        data={updateAircraft}
      />
      <Container fluid>
        <div>
          <Tabs
            activeKey={activeKey}
            onSelect={handleSelect}
            id="justify-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="flight"
              title={
                <span onClick={() => dispatch(getAllBookingAsync({}))}>
                  Flight Management
                </span>
              }
            >
              <Row className="w-100">
                <BookingFilter />
              </Row>
              <div className="w-100 d-inline-flex align-items-center justify-content-end gap-4 my-4">
                <ExportToExcel />
                <Button
                  onClick={() => handleAdd()}
                  className="shadow "
                // size="sm"
                >
                  Book A Flight
                </Button>
              </div>
              {/* <Row className="my-3 w-100">
                <Col md={6}>

                </Col>
                <Col md={6} className="text-end">

                </Col>
              </Row> */}

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>A/C Type</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Waiting</th>
                    <th>Client</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookingInfo?.getAllBookingResponse?.data?.length > 0 ? (
                    bookingInfo?.getAllBookingResponse?.data.map(
                      (booking, index) => {
                        const {
                          aircraft,
                          from_location,
                          to_location,
                          flight_time,
                          flight_date,
                          return_date,
                          return_time,
                          overtime,
                          payment_status,
                          client,
                          status,
                        } = booking;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{moment(flight_date).format("ll")}</td>
                            <td>
                              {aircraft?.reg_no || "N/A"}
                              {/* {moment(flight_date).format("ll") +
                                " | " +
                                (flight_time ? moment(flight_time, "HH:mm:ss").format("LT") : "N/A")} */}
                            </td>
                            <td>{from_location || "N/A"} {flight_time ? moment(flight_time, "HH:mm:ss").format("LT") : "N/A"}</td>
                            <td>{to_location || "N/A"} {return_time ? moment(return_time, "HH:mm:ss").format("LT") : "N/A"}</td>
                            <td>{overtime || "N/A"}</td>
                            <td>
                              {client?.first_name && client?.last_name
                                ? client.first_name + " " + client.last_name
                                : "N/A"}
                            </td>
                            <td>{aircraft?.remarks || "N/A"}</td>
                            <td>{capitalise(status)}</td>
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
                                    onClick={() =>
                                      handleViewBooking(booking.id)
                                    }
                                  >
                                    View
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    className="small"
                                    onClick={() =>
                                      handleEditBooking(booking.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>
                                  {payment_status === "pending" && (
                                    <Dropdown.Item
                                      className="small"
                                      onClick={() =>
                                        handleBookingPaymentStatus(booking.id)
                                      }
                                    >
                                      Paid
                                    </Dropdown.Item>
                                  )}
                                  <Dropdown.Item
                                    className="small"
                                    onClick={() =>
                                      handleBookingStatus(booking.id)
                                    }
                                  >
                                    Update Status
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    className="small"
                                    onClick={() =>
                                      handleViewReceipt(booking.id)
                                    }
                                  >
                                    {status === "pending"
                                      ? "View Invoice"
                                      : "View Receipt"}
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    className="small"
                                    onClick={() =>
                                      handleViewTripSheet(booking.id)
                                    }
                                  >
                                    View Trip Sheet
                                  </Dropdown.Item>
                                  {status != "pending" && (
                                    <Dropdown.Item
                                      className="small"
                                      onClick={() =>
                                        handleViewConfirmation(booking.id)
                                      }
                                    >
                                      View Confirmation Sheet
                                    </Dropdown.Item>
                                  )}
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
            </Tab>

            <Tab
              eventKey="aircraft"
              title={
                <span onClick={() => dispatch(getAllAircraftsAsync({}))}>
                  Aircraft Management{" "}
                </span>
              }
            >
              <div>
                <div className="my-3 text-end">
                  <Button
                    onClick={() => setModalAddAircraft(true)}
                    className="shadow"
                  >
                    Add Aircraft
                  </Button>
                </div>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Registration No</th>
                      <th>Aircraft Type</th>
                      <th>Owned By</th>
                      <th>Pax</th>
                      <th>Total Seat</th>
                      <th>Crew</th>
                      <th>In Flight Services</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {airCraftInfo?.getAllAircraftResponse?.data?.length > 0 ? (
                      airCraftInfo?.getAllAircraftResponse?.data.map(
                        (aircraft, index) => {
                          const {
                            reg_no,
                            owned_by,
                            aircraft_type,
                            inflight_services,
                            pax_capacity,
                            total_seat_capacity,
                            crew_capacity,
                            status,
                          } = aircraft;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{reg_no}</td>
                              <td>{aircraft_type}</td>
                              <td>{owned_by}</td>
                              <td>{pax_capacity}</td>
                              <td>{total_seat_capacity}</td>
                              <td>{crew_capacity}</td>
                              <td>
                                {inflight_services &&
                                  inflight_services.length > 0 ? (
                                  inflight_services.map((service, idx) => (
                                    <span key={idx}>
                                      {service}
                                      {idx < inflight_services.length - 1
                                        ? ", "
                                        : ""}
                                    </span>
                                  ))
                                ) : (
                                  <span>No services available</span>
                                )}
                              </td>
                              <td>{status ? "Active" : "Not Active"}</td>
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
                                      onClick={() =>
                                        handleEditAircraft(aircraft.id)
                                      }
                                    >
                                      Manage
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      className="small"
                                      onClick={() =>
                                        handleDeleteAircraft(aircraft.id)
                                      }
                                    >
                                      Delete
                                    </Dropdown.Item>
                                    {status ? (
                                      <Dropdown.Item
                                        className="small bg-danger text-white"
                                        onClick={() =>
                                          handleDeactivateAircraft(aircraft.id)
                                        }
                                      >
                                        Deactivate
                                      </Dropdown.Item>
                                    ) : (
                                      <Dropdown.Item
                                        className="small bg-success text-white"
                                        onClick={() =>
                                          handleActivateAircraft(aircraft.id)
                                        }
                                      >
                                        Activate
                                      </Dropdown.Item>
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td colSpan="11">
                          <p className="text-center">No aircrafts available</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Booking;
