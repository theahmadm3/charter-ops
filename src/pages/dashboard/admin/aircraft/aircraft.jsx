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
import EditAircraft from "./modal/edit-aircraft";
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
  return (
    <AdminLayout>
      <Container>
        <AddAircraft
          show={modalAddAircraft}
          onHide={() => setModalAddAircraft(false)}
        />
        <EditAircraft
          show={modalEditAircraft}
          onHide={() => setModalEditAircraft(false)}
          data={updateAircraft}
        />

        <div>
          <h6 className="mb-4">List of Aircraft</h6>

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
                <th>Name</th>
                <th>Owned By</th>
                <th>Pax Capacity</th>
                <th>Manufacturer</th>
                <th>Luggage Capacity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {airCraftInfo?.getAllAircraftResponse?.data?.length > 0 ? (
                airCraftInfo?.getAllAircraftResponse?.data.map(
                  (aircraft, index) => {
                    const {
                      name,
                      owned_by,
                      pax_capacity,
                      manufacturer,
                      luggage_capacity,
                      status,
                    } = aircraft;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{owned_by}</td>
                        <td>{pax_capacity}</td>
                        <td>{manufacturer}</td>
                        <td>{luggage_capacity}</td>
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
                                onClick={() => handleEditAircraft(aircraft.id)}
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
