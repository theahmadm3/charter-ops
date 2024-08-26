import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  activateClientAsync,
  deactivateClientAsync,
  getAllClientAsync,
} from "../../../../slices/client/clientSlice";
import AddClient from "./modal/add-client";
import { getAllRoleAsync } from "../../../../slices/config/configSlice";
import EditClient from "./modal/edit-client";

const Clients = () => {
  const clientInfo = useSelector((state) => state?.client);
  const dispatch = useDispatch();
  const [modalAddClient, setModalAddClient] = useState(false);
  const [modalEditClient, setModalEditClient] = useState(false);
  const [updateClient, setUpdateClient] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
      dispatch(getAllRoleAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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
  return (
    <AdminLayout>
      <Container fluid>
        <AddClient
          show={modalAddClient}
          onHide={() => setModalAddClient(false)}
        />
        <EditClient
          show={modalEditClient}
          onHide={() => setModalEditClient(false)}
          data={updateClient}
        />

        <div>
          <h6 className="mb-4">List of Passenger</h6>

          <div className="my-3 text-end">
            <Button onClick={() => setModalAddClient(true)} className="shadow">
              Add Passenger
            </Button>
          </div>
          <Table striped hover responsive>
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
                                onClick={() => handleActivateClient(client.id)}
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
