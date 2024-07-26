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
              Book A Plane
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Route</th>
                <th>Rates</th>
                <th>Pax</th>
                <th>Date</th>
                <th>Time</th>
                <th>Booked By</th>
                <th>Paid To</th>
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
                      rate,
                      pax,
                      flight_date,
                      flight_time,
                      client_id,
                      payment_status,
                      status,
                    } = booking;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{from_location + " " + to_location}</td>
                        <td>{rate}</td>
                        <td>{pax}</td>
                        <td>{flight_date}</td>
                        <td>{flight_time}</td>
                        <td>{client_id}</td>
                        <td>{payment_status}</td>
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
                                // onClick={() => handleEditClient(booking.id)}
                              >
                                Manage
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
