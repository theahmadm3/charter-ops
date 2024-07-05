import { Button, Dropdown, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartmentAsync,
  deletePartnershipAsync,
  deleteServiceAsync,
  deleteSupplierAsync,
  getAllDepartmentsAsync,
  getAllPartnershipsAsync,
  getAllServicesAsync,
  getAllSuppliersAsync,
} from "../../../../slices/config/configSlice";
import AddService from "../config/modal/service/add-service";
import { HiDotsHorizontal } from "react-icons/hi";
import EditService from "../config/modal/service/edit-service";
import AddDepartment from "../config/modal/department/add-department";
import { toast } from "react-toastify";
import moment from "moment";
import EditDepartment from "../config/modal/department/edit-department";
import AddSupplier from "../config/modal/supplier/add-supplier";
import EditSupplier from "../config/modal/supplier/edit-supplier";
import AddPartnership from "../config/modal/partnership/add-partnership";
import EditPartnership from "../config/modal/partnership/edit-partnership";
import { getAllUsersAsync } from "../../../../slices/user/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("users");
  const [modalAddService, setModalAddService] = useState(false);
  const [modalEditService, setModalEditService] = useState(false);
  const [modalAddDepartment, setModalAddDepartment] = useState(false);

  const configInfo = useSelector((state) => state?.config);
  const [updateService, setUpdateService] = useState([]);
  const [updateDepartment, setUpdateDepartment] = useState([]);
  const [updateSupplier, setUpdateSupplier] = useState([]);
  const [updatePartnership, setUpdatePartnership] = useState([]);

  const handleEditService = (id) => {
    setModalEditService(true);

    const updateService = configInfo?.getAllServicesResponse?.filter(
      (data) => data.id === id
    );
    setUpdateService(updateService);
  };

  const handleDeleteService = (id) => {
    dispatch(deleteServiceAsync({ id }))
      .then((response) => {
        if (response) {
          toast.success("Service deleted successfully");
        } else {
          toast.error("Error: Service deletion failed");
        }
      })
      .catch((error) => {
        toast.error("Error: Please try again");
        console.error("Error occurred:", error);
      });
  };

  useEffect(() => {
    const savedActiveKey = localStorage.getItem("activeTab");
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  const handleSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeTab", key);
  };
  useEffect(() => {
    try {
      dispatch(getAllUsersAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <AdminLayout>
      <AddService
        show={modalAddService}
        onHide={() => setModalAddService(false)}
      />

      <div className="my-3 container">
        <h6 className="mb-4">Users</h6>
        <Tabs
          activeKey={activeKey}
          onSelect={handleSelect}
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="users"
            title={
              <span onClick={() => dispatch(getAllServicesAsync())}>Users</span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button
                  onClick={() => setModalAddService(true)}
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
                {/* <tbody>
                  {configInfo?.getAllServicesResponse?.length > 0 ? (
                    configInfo.getAllServicesResponse.map((service, index) => {
                      const {
                        service_name,
                        rate_type,
                        charge_rate,
                        currency,
                        remarks,
                      } = service;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{service_name}</td>
                          <td>{rate_type}</td>
                          <td>{charge_rate}</td>
                          <td>{currency}</td>
                          <td>{remarks}</td>
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
                                  onClick={() => handleEditService(service.id)}
                                >
                                  Manage
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="small bg-danger text-white"
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7">No services available</td>
                    </tr>
                  )}
                </tbody> */}
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="partner"
            title={
              <span onClick={() => dispatch(getAllDepartmentsAsync())}>
                Partner
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => setModalAddDepartment(true)}>
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
                {/* <tbody>
                  {configInfo?.getAllDepartmentsResponse?.length > 0 ? (
                    configInfo.getAllDepartmentsResponse.map(
                      (department, index) => {
                        const { name, created_at } = department;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{moment(created_at).format("LL")}</td>

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
                                    onClick={() =>
                                      handleEditDepartment(department.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeletDepartment(department.id)
                                    }
                                  >
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td colSpan="7">No departments available</td>
                    </tr>
                  )}
                </tbody> */}
              </Table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Users;
