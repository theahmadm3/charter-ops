import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  activateAircraftAsync,
  deactivateAircraftAsync,
  getAllAircraftsAsync,
} from "../../../../slices/aircraft/aircraftSlice";
import AddAircraft from "./modal/add-aircraft";
import EditAircraft from "./modal/edit-aircraft";

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
                          {inflight_services && inflight_services.length > 0 ? (
                            inflight_services.map((service, idx) => (
                              <span key={idx}>
                                {service}
                                {idx < inflight_services.length - 1 ? ", " : ""}
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
                  <td colSpan="11">
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
