import { Button, Container, Dropdown, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  activateBookingAsync,
  bookingStatusAsync,
  deactivateBookingAsync,
  getAllBookingAsync,
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

const Booking = (props) => {
  const dispatch = useDispatch();
  const [viewData, setViewdata] = useState([]);
  const [viewBooking, setViewBooking] = useState(false);
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("flight");
  const [modalAddAircraft, setModalAddAircraft] = useState(false);
  const [modalEditAircraft, setModalEditAircraft] = useState(false);
  const [updateAircraft, setUpdateAircraft] = useState([]);
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const bookingInfo = useSelector((state) => state?.booking);
  const [updateBooking, setUpdateBooking] = useState([]);
  const [manageBooking, setManageBooking] = useState(false);

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
      dispatch(getAllBookingAsync());
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
    dispatch(
      bookingStatusAsync({
        booking_id: id,
        values: {
          status: "pending",
        },
      })
    );
  };

  return (
    <AdminLayout>
      <ViewBooking
        show={viewBooking}
        onHide={() => setViewBooking(false)}
        data={viewData}
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
              <div className="my-3 text-end">
                <Button onClick={() => handleAdd()} className="shadow">
                  Book A Flight
                </Button>
              </div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Trip Type</th>
                    <th>From</th>
                    <th>Destination</th>
                    <th>Date / Time</th>
                    <th>Number of Pax</th>
                    <th>Aircraft Name</th>
                    <th>Payment Status</th>
                    <th>Created By</th>
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
                          booking_process_stage,
                        } = booking;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td> {trip_type} </td>
                            <td>{from_location}</td>
                            <td>{to_location}</td>
                            <td>{flight_date + " , " + return_date}</td>
                            <td>{pax}</td>
                            <td>{aircraft?.name}</td>
                            <td>{payment_status}</td>
                            <td> {bookedBy?.first_name} </td>
                            <td> {booking_process_stage} </td>
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
                                  <Dropdown.Item
                                    className="small"
                                    // onClick={() => handleEditClient(booking.id)}
                                  >
                                    Paid
                                  </Dropdown.Item>

                                  <Dropdown.Item
                                    className="small"
                                    onClick={() =>
                                      handleBookingStatus(booking.id)
                                    }
                                  >
                                    Update Status
                                  </Dropdown.Item>

                                  {/* <Dropdown.Item
                                  className="small bg-danger text-white"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </Dropdown.Item> */}
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
