import {
  Button,
  Col,
  Container,
  Dropdown,
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
import {
  activateAircraftAsync,
  deactivateAircraftAsync,
  getAllAircraftsAsync,
} from "../../../../slices/aircraft/aircraftSlice";
import AddAircraft from "../aircraft/modal/add-aircraft";
import EditAircraft from "../aircraft/modal/edit-aircraft";
import ManageBookingModal from "./modals/manage-booking";
import UpdateStatusModal from "./modals/updated-status";
import BookingFilter from "../../../../component/filters/booking-filter";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import ViewBookingFile from "./modals/view-files";


const Booking = (props) => {
  const dispatch = useDispatch();
  const [viewData, setViewdata] = useState([]);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewBookingFileModal, setViewBookingFileModal] = useState(false);
  const [bookingFile, setBookingFile] = useState("")
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
  const handleActivateAircraft = (id) => {
    dispatch(activateAircraftAsync({ id }));
  };

  useEffect(() => {
    try {
      dispatch(getAllBookingAsync({}));
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
    navigate("/admin-add-booking");
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
  
        const pdfData = response.payload; // Assuming the payload is the PDF binary data
        setBookingFile(pdfData); // Update the state with the PDF data

        toast.success('Booking receipt fetched successfully!');
      } else {
        toast.error('Failed to fetch the booking receipt.');
      }
    } catch (error) {
      console.error('Error fetching the booking receipt:', error);
      toast.error('An error occurred while fetching the receipt.');
    }
  };
  

  



  const handleViewTripSheet = (id) => {
    dispatch(
      getBookingTripSheetAsync({
        booking_id: id,
      })
    );
  }

  
  const handleViewConfirmation = (id) => {
    dispatch(
      getBookingConfirmationSheetAsync({
        booking_id: id,
      })
    );
  }

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
              <Row className="my-3">
                <Col md={11}>
                  <BookingFilter />
                </Col>
                <Col md={1}>
                  <Button onClick={() => handleAdd()} className="shadow mt-3" size="sm">
                    Book A Flight
                  </Button>
                </Col>
              </Row>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    {/* <th>Trip Type</th> */}
                    <th>Departure</th>
                    <th>Departure Date/Time</th>
                    <th>Arrival</th>
                    <th>Arrival Date/Time</th>
                    {/* <th>Number of Pax</th> */}
                    {/* <th>Aircraft Name</th> */}
                    <th>Payment Status</th>
                    {/* <th>Created By</th> */}
                    <th>Status</th>
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
                          pax,
                          flight_date,
                          return_date,
                          trip_type,
                          payment_status,
                          aircraft,
                          bookedBy,
                          status,
                        } = booking;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td> {trip_type} </td> */}
                            <td>{from_location}</td>
                            <td>{flight_date}</td>
                            <td>{to_location}</td>
                            <td>{return_date}</td>
                            {/* <td>{pax}</td> */}
                            {/* <td>{aircraft?.name}</td> */}
                            <td>{payment_status}</td>
                            {/* <td> {bookedBy?.first_name} </td> */}
                            <td>
                              {" "}
                              {status === "no_show" ? "no show" : status}{" "}
                            </td>
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

                                  {payment_status === "pending" ? (
                                    <Dropdown.Item
                                      className="small"
                                      onClick={() =>
                                        handleBookingPaymentStatus(booking.id)
                                      }
                                    >
                                      Paid
                                    </Dropdown.Item>
                                  ) : null}

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
                                  onClick={() => handleViewReceipt(booking.id)}
                                >
                                  View Receipt
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="small"
                                  onClick={() => handleViewTripSheet(booking.id)}
                                >
                                  View Trip Sheet
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="small"
                                  onClick={() => handleViewConfirmation(booking.id)}
                                >
                                  View Confirmation Sheet
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
                      <th>Model</th>
                      <th>Owned By</th>
                      <th>Pax</th>
                      <th>Luggage Capacity</th>
                      <th>Flight Range </th>
                      <th> Fuel Capacity</th>
                      <th>In Flight Services</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airCraftInfo?.getAllAircraftResponse?.data?.length > 0 ? (
                      airCraftInfo?.getAllAircraftResponse?.data.map(
                        (aircraft, index) => {
                          const {
                            model,
                            owned_by,
                            pax_capacity,
                            luggage_capacity,
                            max_flight_range,
                            fuel_capacity,
                            inflight_services,
                            status,
                          } = aircraft;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{model}</td>
                              <td>{owned_by}</td>
                              <td>{pax_capacity}</td>
                              <td>{luggage_capacity}</td>
                              <td>{max_flight_range}</td>
                              <td>{fuel_capacity}</td>
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
