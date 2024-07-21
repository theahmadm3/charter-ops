import { Button, Container, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import AddClient from "./modal/add-client";
import {
  activateFuelAsync,
  deactivateFuelAsync,
  getAllFuelAsync,
} from "../../../../slices/fuel/fuelSlice";

const Fuels = () => {
  const fuelInfo = useSelector((state) => state?.fuel);
  const dispatch = useDispatch();
  const [modalAddFuel, setModalAddFuel] = useState(false);
  const [updateFuel, setUpdateFuel] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllFuelAsync());
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

  const handleDeactivateFuel = (id) => {
    dispatch(deactivateFuelAsync({ id }));
  };
  const handleActivateFuel = (id) => {
    dispatch(activateFuelAsync({ id }));
  };
  return (
    <AdminLayout>
      <Container>
        <AddClient show={modalAddFuel} onHide={() => setModalAddFuel(false)} />
        {/* <EditClient
          show={modalEditClient}
          onHide={() => setModalEditClient(false)}
          data={updateClient}
        /> */}

        <div>
          <h6 className="mb-4"> Fuel Management</h6>

          <div className="my-3 text-end">
            <Button
              // onClick={() => setModalAddClient(true)}

              className="shadow"
            >
              Add Fuel
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th> Name</th>
                <th>Description </th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fuelInfo?.getAllFuelResponse?.data?.length > 0 ? (
                fuelInfo?.getAllFuelResponse?.data.map((fuel, index) => {
                  const { first_name, last_name, status } = fuel;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{first_name}</td>
                      <td>{last_name}</td>

                      <td>{status ? "Active" : "Not Active"}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" className="border-0">
                            <HiDotsHorizontal />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="small"
                              onClick={() => handleEditFuel(fuel.id)}
                            >
                              Manage
                            </Dropdown.Item>
                            {status ? (
                              <Dropdown.Item
                                className="small bg-danger text-white"
                                onClick={() => handleDeactivateFuel(fuel.id)}
                              >
                                Deactivate
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item
                                className="small bg-success text-white"
                                onClick={() => handleActivateFuel(fuel.id)}
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
                <tr className="text-center">
                  <td colSpan="7">No fuel available</td>
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
