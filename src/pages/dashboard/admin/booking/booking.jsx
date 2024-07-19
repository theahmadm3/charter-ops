import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllBookingAsync } from "../../../../slices/booking/bookingSlice";

const Booking = () => {
  const dispatch = useDispatch();
  const [updateClient, setUpdateClient] = useState([]);

  const bookingInfo = useSelector((state) => state?.booking);

  const handleEditClient = (id) => {
    setModalEditClient(true);

    const updateClient = clientInfo?.getAllClientsResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateClient(updateClient);
  };

  const handleDeactivateClient = (id) => {
    dispatch(deactivateClientAsync({ id }));
  };
  const handleActivateClient = (id) => {
    dispatch(activateClientAsync({ id }));
  };

  useEffect(() => {
    try {
      dispatch(getAllBookingAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <AdminLayout>
      <Container>
        <div>
          <h6 className="mb-4">List of Bookings</h6>

          <div className="my-3 text-end">
            <Button
              // onClick={() => setModalAddClient(true)}
              className="shadow"
            >
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
                  (client, index) => {
                    const { first_name, last_name, email, phone, status } =
                      client;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
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
                                onClick={() => handleEditClient(client.id)}
                              >
                                Manage
                              </Dropdown.Item>
                              {status ? (
                                <Dropdown.Item
                                  className="small bg-danger text-white"
                                  onClick={() =>
                                    handleDeactivateClient(client.id)
                                  }
                                >
                                  Deactivate
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  className="small bg-success text-white"
                                  onClick={() =>
                                    handleActivateClient(client.id)
                                  }
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
