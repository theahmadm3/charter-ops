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
// import AddClient from "./modal/add-client";
import { getAllRoleAsync } from "../../../../slices/config/configSlice";
import {
  activateAircraftAsync,
  deactivateAircraftAsync,
  getAllAircraftsAsync,
} from "../../../../slices/aircraft/aircraftSlice";
import AddAircraft from "./modal/add-aircraft";
// import EditClient from "./modal/edit-client";

const Aircraft = () => {
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const dispatch = useDispatch();
  const [modalAddAircraft, setModalAddAircraft] = useState(false);
  const [modalEditAircraft, setModalEditAircraft] = useState(false);
  const [updateAircraft, setUpdateAircraft] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllAircraftsAsync());
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

  const handleDeactivateAircraft = (id) => {
    dispatch(deactivateAircraftAsync({ id }));
  };
  const handleActivateClient = (id) => {
    dispatch(activateAircraftAsync({ id }));
  };
  return (
    <AdminLayout>
      <Container>
        <AddAircraft
          show={modalAddAircraft}
          onHide={() => setModalAddAircraft(false)}
        />
        {/* <EditClient
          show={modalEditClient}
          onHide={() => setModalEditClient(false)}
          data={updateClient}
        /> */}

        <div>
          <div className="my-3 text-end">
            <Button
              onClick={() => setModalAddAircraft(true)}
              className="shadow"
            >
              Add Aircraft
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
              {airCraftInfo?.getAllAircraftResponse?.data?.length > 0 ? (
                airCraftInfo?.getAllAircraftResponse?.data.map(
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
                <tr>
                  <td colSpan="7">
                    <p className="text-center">No aircrafts available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Aircraft;
