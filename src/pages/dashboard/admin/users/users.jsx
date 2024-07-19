import { Button, Dropdown, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServiceAsync,
  getAllDepartmentsAsync,
  getAllPartnershipsAsync,
  getAllRoleAsync,
  getAllServicesAsync,
} from "../../../../slices/config/configSlice";
import { toast } from "react-toastify";

import {
  activateUserAsync,
  deactivateUserAsync,
  deleteUserAsync,
  getAllUsersAsync,
} from "../../../../slices/user/userSlice";
import { HiDotsHorizontal } from "react-icons/hi";
import AddUser from "./modal/add-user";
import EditUser from "./modal/edit-user";

const Users = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("users");
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [updateUser, setUpdateUser] = useState([]);
  const [userType, setUserType] = useState();

  const userInfo = useSelector((state) => state?.users);

  const handleEditUser = (id) => {
    setModalEditUser(true);

    const updateUser = userInfo?.getAllUsersResponse?.data.filter(
      (data) => data.id === id
    );
    setUpdateUser(updateUser);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAsync({ id }))
      .then((response) => {
        if (response) {
          toast.success("User deleted successfully");
        } else {
          toast.error("Error: User deletion failed");
        }
      })
      .catch((error) => {
        toast.error("Error: Please try again");
        console.error("Error occurred:", error);
      });
  };

  useEffect(() => {
    const savedActiveKey = localStorage.getItem("userActiveTab");
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  const handleSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("userActiveTab", key);
  };

  const handleDeactivateUser = (id) => {
    dispatch(deactivateUserAsync({ id }));
  };
  const handleActivateUser = (id) => {
    dispatch(activateUserAsync({ id }));
  };

  useEffect(() => {
    try {
      dispatch(getAllUsersAsync({ user_type: "staff" }));
      dispatch(getAllRoleAsync());
      dispatch(getAllDepartmentsAsync());
      dispatch(getAllPartnershipsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleAddUser = (user_type) => {
    setModalAddUser(true);
    setUserType(user_type);
  };
  return (
    <AdminLayout>
      <AddUser
        show={modalAddUser}
        onHide={() => setModalAddUser(false)}
        user_type={userType}
      />
      <EditUser
        show={modalEditUser}
        onHide={() => setModalEditUser(false)}
        data={updateUser}
      />

      <div className="my-3 container">
        <h6 className="mb-4">List of Users</h6>
        <Tabs
          activeKey={activeKey}
          onSelect={handleSelect}
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="users"
            title={
              <span
                onClick={() =>
                  dispatch(getAllUsersAsync({ user_type: "staff" }))
                }
              >
                Staff
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button
                  onClick={() => handleAddUser("staff")}
                  className="shadow"
                >
                  Add User
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
                  {userInfo?.getAllUsersResponse?.data?.length > 0 ? (
                    userInfo?.getAllUsersResponse?.data.map((user, index) => {
                      const { first_name, last_name, email, phone, status } =
                        user;
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
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  Manage
                                </Dropdown.Item>
                                {status ? (
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
                      <td colSpan="7">No Users available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="partner"
            title={
              <span
                onClick={() =>
                  dispatch(getAllUsersAsync({ user_type: "partner" }))
                }
              >
                Partner
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => handleAddUser("partner")}>
                  Add Partner
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
                  {userInfo?.getAllUsersResponse?.data?.length > 0 ? (
                    userInfo?.getAllUsersResponse?.data.map((user, index) => {
                      const { first_name, last_name, email, phone, status } =
                        user;
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
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  Manage
                                </Dropdown.Item>
                                {status ? (
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
                      <td colSpan="7">No Users available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab
            eventKey="crew"
            title={
              <span
                onClick={() =>
                  dispatch(getAllUsersAsync({ user_type: "crew" }))
                }
              >
                Crew
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => handleAddUser("crew")}>Add Crew</Button>
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
                  {userInfo?.getAllUsersResponse?.data?.length > 0 ? (
                    userInfo?.getAllUsersResponse?.data.map((user, index) => {
                      const { first_name, last_name, email, phone, status } =
                        user;
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
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  Manage
                                </Dropdown.Item>
                                {status ? (
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
                      <td colSpan="7">No Users available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Users;
