import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  activateBookingAsync,
  deactivateBookingAsync,
  getAllBookingAsync,
} from "../../../../slices/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  const [updateClient, setUpdateClient] = useState([]);
  const navigate = useNavigate();

  const bookingInfo = useSelector((state) => state?.booking);

  const handleEditClient = (id) => {
    setModalEditClient(true);

    const updateClient = bookingInfo?.getAllClientsResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateClient(updateClient);
  };

  const handleDeactivateBooking = (id) => {
    dispatch(deactivateBookingAsync({ id }));
  };
  const handleActivateBooking = (id) => {
    dispatch(activateBookingAsync({ id }));
  };

  useEffect(() => {
    try {
      dispatch(getAllBookingAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin-add-booking");
  };
  return (
    <AdminLayout>
      <Container>
        <div>
          <h6 className="mb-4">List of Bookings</h6>

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
                <th>Request Status</th>
                <th>Payment Status</th>
                <th>Created By</th>
                <th>Status</th>
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
                      flight_time,
                      trip_type,
                      payment_status,
                      aircraft_id,
                      client_id,
                      status,
                    } = booking;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td> {trip_type} </td>
                        <td>{from_location}</td>
                        <td>{to_location}</td>
                        <td>{flight_date + " , " + flight_time}</td>
                        <td>{pax}</td>
                        <td>{aircraft_id}</td>
                        <td>{status ? "Active" : "Not Active"}</td>
                        <td>{payment_status}</td>
                        <td> {client_id} </td>
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
                                // onClick={() => handleEditClient(booking.id)}
                              >
                                Manage
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="small"
                                // onClick={() => handleEditClient(booking.id)}
                              >
                                Paid
                              </Dropdown.Item>
                              {status ? (
                                <Dropdown.Item
                                  className="small bg-danger text-white"
                                  // onClick={() =>
                                  //   handleDeactivateBooking(booking.id)
                                  // }
                                >
                                  Deactivate
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  className="small bg-success text-white"
                                  // onClick={() =>
                                  //   handleActivateBooking(booking.id)
                                  // }
                                >
                                  Activate
                                </Dropdown.Item>
                              )}
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
                  <td colSpan="9">No booking available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Booking;
