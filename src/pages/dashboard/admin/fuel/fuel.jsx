import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  getAllFuelAsync,
  updateFuelPaymentAsync,
} from "../../../../slices/fuel/fuelSlice";
import AddFuel from "./modal/add-fuel";
import { getAllAircraftsAsync } from "../../../../slices/aircraft/aircraftSlice";
import moment from "moment";
import EditFuel from "./modal/edit-fuel";

const Fuels = () => {
  const fuelInfo = useSelector((state) => state?.fuel);
  const dispatch = useDispatch();
  const [modalAddFuel, setModalAddFuel] = useState(false);
  const [modalEditFuel, setModalEditFuel] = useState(false);
  const [updateFuel, setUpdateFuel] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllFuelAsync());
      dispatch(getAllAircraftsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleEditFuel = (id) => {
    setModalEditFuel(true);

    const updateFuel = fuelInfo?.getAllFuelResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateFuel(updateFuel);
  };

  // const handleDeactivateFuel = (id) => {
  //   dispatch(deactivateFuelAsync({ id }));
  // };
  // const handleActivateFuel = (id) => {
  //   dispatch(activateFuelAsync({ id }));
  // };

  const handleUpdateFuelPayment = (id) => {
    dispatch(
      updateFuelPaymentAsync({
        id,
        values: {
          payment_status: "paid",
        },
      })
    );
  };

  return (
    <AdminLayout>
      <Container fluid>
        <AddFuel show={modalAddFuel} onHide={() => setModalAddFuel(false)} />
        <EditFuel
          show={modalEditFuel}
          onHide={() => setModalEditFuel(false)}
          data={updateFuel}
        />

        <div>
          <h6 className="mb-4"> Fuel Management</h6>

          <div className="my-3 text-end">
            <Button onClick={() => setModalAddFuel(true)} className="shadow">
              Add Fuel
            </Button>
          </div>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Aircraft</th>
                <th>Vendor Name</th>
                <th>Fuel Quantity</th>
                <th>Fuel Cost</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fuelInfo?.getAllFuelResponse?.data?.length > 0 ? (
                fuelInfo?.getAllFuelResponse?.data.map((fuel, index) => {
                  const {
                    vendor_name,
                    fuel_quantity,
                    fuel_cost,
                    location,
                    payment_status,
                    aircraft,
                    id,
                  } = fuel;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{aircraft?.name}</td>
                      <td>{vendor_name}</td>
                      <td>{fuel_quantity}</td>
                      <td>{fuel_cost}</td>
                      <td>{location}</td>
                      <td>{moment(fuel.created_at).format("ll")}</td>
                      <td>{payment_status}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" className="border-0">
                            <HiDotsHorizontal />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="small"
                              onClick={() => handleEditFuel(id)}
                            >
                              Manage
                            </Dropdown.Item>
                            {payment_status === "unpaid" && (
                              <Dropdown.Item
                                className="small bg-danger text-white"
                                onClick={() => handleUpdateFuelPayment(id)}
                              >
                                Mark as Paid
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">
                  <td colSpan="8">No fuel records available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};
export default Fuels;
