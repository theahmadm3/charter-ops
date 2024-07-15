import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect } from "react";
import { getAllClientAsync } from "../../../../slices/client/clientSlice";

const Clients = () => {
  const clientInfo = useSelector((state) => state?.client);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return (
    <AdminLayout>
      <Container>
        <div>
          <div className="my-3 text-end">
            <Button onClick={() => setModalAddUser(true)} className="shadow">
              Add CLient
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clientInfo?.getAllClientsResponse?.data?.length > 0 ? (
                clientInfo?.getAllClientsResponse?.data.map((client, index) => {
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
                          <Dropdown.Toggle variant="light" className="border-0">
                            <HiDotsHorizontal />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="small"
                              //   onClick={() => handleEditUser(user.id)}
                            >
                              Manage
                            </Dropdown.Item>
                            {/* {status ? (
                                  <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeactivateUser(user.id)
                                    }
                                  >
                                    Deactivate
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    className="small bg-success text-white"
                                    onClick={() => handleActivateUser(user.id)}
                                  >
                                    Activate
                                  </Dropdown.Item>
                                )} */}
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
                })
              ) : (
                <tr>
                  <td colSpan="7">No client available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Clients;
