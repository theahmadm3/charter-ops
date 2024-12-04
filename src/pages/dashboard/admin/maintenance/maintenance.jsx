import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { updateFuelPaymentAsync } from "../../../../slices/fuel/fuelSlice";
import { getAllAircraftsAsync } from "../../../../slices/aircraft/aircraftSlice";
import moment from "moment";
import AddMaintenance from "./modal/add-maintenance";
import { getAllAircraftMaintenanceOrgAsync } from "../../../../slices/amo/amoSlice";
import { getAllMaintenanceAsync } from "../../../../slices/maintenance/maintenanceSlice";
import EditMaintenance from "./modal/edit-maintenance";

const Maintenance = () => {
  const maintenanceInfo = useSelector((state) => state?.maintenance);
  const dispatch = useDispatch();
  const [modalAddMaintenance, setModalAddMaintenance] = useState(false);
  const [modalEditMaintenance, setModalEditMaintenance] = useState(false);
  const [updateMaintenance, setUpdateMaintenance] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllMaintenanceAsync());
      dispatch(getAllAircraftsAsync());
      dispatch(getAllAircraftMaintenanceOrgAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleEditMaintenance = (id) => {
    setModalEditMaintenance(true);

    const updateFuel = maintenanceInfo?.getAllMaintenanceResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateMaintenance(updateFuel);
  };

  // const handleDeactivateFuel = (id) => {
  //   dispatch(deactivateFuelAsync({ id }));
  // };
  // const handleActivateFuel = (id) => {
  //   dispatch(activateFuelAsync({ id }));
  // };

  return (
    <AdminLayout>
      <Container fluid>
        <AddMaintenance
          show={modalAddMaintenance}
          onHide={() => setModalAddMaintenance(false)}
        />
        <EditMaintenance
          show={modalEditMaintenance}
          onHide={() => setModalEditMaintenance(false)}
          data={updateMaintenance}
        />

        <div>
          <h6 className="mb-4"> Aircraft Maintenance</h6>

          <div className="my-3 text-end">
            <Button
              onClick={() => setModalAddMaintenance(true)}
              className="shadow"
            >
              Add Maintenance
            </Button>
          </div>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Aircraft</th>
                <th>Type of Mtce</th>
                <th>AMO</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(
                maintenanceInfo?.getAllMaintenanceResponse?.data
              ) &&
              maintenanceInfo?.getAllMaintenanceResponse?.data.length > 0 ? (
                maintenanceInfo.getAllMaintenanceResponse.data.map(
                  (fuel, index) => {
                    const { maintenance_type, amount_paid, amo, aircraft, id } =
                      fuel;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          {aircraft?.reg_no + " " + aircraft?.aircraft_type}
                        </td>
                        <td>{maintenance_type}</td>
                        <td>{amo?.name}</td>
                        <td>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(amount_paid.replace(/,/g, "")))}
                        </td>

                        <td>{moment(fuel.captured_date).format("ll")}</td>
                        {/* <td>{location}</td> */}
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
                                onClick={() => handleEditMaintenance(id)}
                              >
                                Manage
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
                  <td colSpan="9">No maintenance records available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Maintenance;
