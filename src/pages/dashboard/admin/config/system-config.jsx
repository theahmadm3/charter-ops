import { Button, Dropdown, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateDepartmentAsync,
  activatePartnershipAsync,
  activateRoleAsync,
  activateServiceAsync,
  activateSupplierAsync,
  deactivateDepartmentAsync,
  deactivatePartnershipAsync,
  deactivateRoleAsync,
  deactivateServiceAsync,
  deactivateSupplierAsync,
  getAllDepartmentsAsync,
  getAllPartnershipsAsync,
  getAllRoleAsync,
  getAllServicesAsync,
  getAllSuppliersAsync,
} from "../../../../slices/config/configSlice";
import AddService from "./modal/service/add-service";
import { HiDotsHorizontal } from "react-icons/hi";
import EditService from "./modal/service/edit-service";
import AddDepartment from "./modal/department/add-department";
import moment from "moment";
import EditDepartment from "./modal/department/edit-department";
import AddSupplier from "./modal/supplier/add-supplier";
import EditSupplier from "./modal/supplier/edit-supplier";
import AddPartnership from "./modal/partnership/add-partnership";
import EditPartnership from "./modal/partnership/edit-partnership";

const SystemConfig = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("services");
  const [modalAddService, setModalAddService] = useState(false);
  const [modalEditService, setModalEditService] = useState(false);
  const [modalAddDepartment, setModalAddDepartment] = useState(false);
  const [modalEditDepartment, setModalEditDepartment] = useState(false);
  const [modalAddSupplier, setModalAddSupplier] = useState(false);
  const [modalEditSupplier, setModalEditSupplier] = useState(false);
  const [modalAddPartnership, setModalAddPartnership] = useState(false);
  const [modalEditPartnership, setModalEditPartnership] = useState(false);

  const configInfo = useSelector((state) => state?.config);
  const [updateService, setUpdateService] = useState([]);
  const [updateDepartment, setUpdateDepartment] = useState([]);
  const [updateSupplier, setUpdateSupplier] = useState([]);
  const [updatePartnership, setUpdatePartnership] = useState([]);

  const handleEditService = (id) => {
    setModalEditService(true);

    const updateService = configInfo?.getAllServicesResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateService(updateService);
  };

  const handleDeactivateService = (id) => {
    dispatch(deactivateServiceAsync({ id }));
  };
  const handleActivateService = (id) => {
    dispatch(activateServiceAsync({ id }));
  };

  const handleDeactivateSupplier = (id) => {
    dispatch(deactivateSupplierAsync({ id }));
  };
  const handleActivateSupplier = (id) => {
    dispatch(activateSupplierAsync({ id }));
  };

  const handleDeactivatePartnership = (id) => {
    dispatch(deactivatePartnershipAsync({ id }));
  };
  const handleActivatePartnership = (id) => {
    dispatch(activatePartnershipAsync({ id }));
  };

  const handleDeactivateDepartment = (id) => {
    dispatch(deactivateDepartmentAsync({ id }));
  };
  const handleActivateDepartment = (id) => {
    dispatch(activateDepartmentAsync({ id }));
  };

  const handleDeactivateRole = (id) => {
    dispatch(deactivateRoleAsync({ id }));
  };
  const handleActivateRole = (id) => {
    dispatch(activateRoleAsync({ id }));
  };

  const handleEditDepartment = (id) => {
    setModalEditDepartment(true);

    const updateDepartment =
      configInfo?.getAllDepartmentsResponse?.data?.filter(
        (data) => data.id === id
      );
    setUpdateDepartment(updateDepartment);
  };
  // const handleDeletDepartment = (id) => {
  //   dispatch(deleteDepartmentAsync({ id }))
  //     .then((response) => {
  //       if (response) {
  //         toast.success("Department deleted successfully");
  //       } else {
  //         toast.error("Error: Service deletion failed");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Error: Please try again");
  //       console.error("Error occurred:", error);
  //     });
  // };

  const handleEditSupplier = (id) => {
    setModalEditSupplier(true);

    const updateSupplier = configInfo?.getAllSuppliersResponse?.data?.filter(
      (data) => data.id === id
    );
    setUpdateSupplier(updateSupplier);
  };
  // const handleDeleteSupplier = (id) => {
  //   dispatch(deleteSupplierAsync({ id }))
  //     .then((response) => {
  //       if (response) {
  //         toast.success("Supplier deleted successfully");
  //       } else {
  //         toast.error("Error: Service deletion failed");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Error: Please try again");
  //       console.error("Error occurred:", error);
  //     });
  // };

  const handleEditPartnership = (id) => {
    setModalEditPartnership(true);

    const updatePartnership =
      configInfo?.getAllPartnershipTypesResponse?.data?.filter(
        (data) => data.id === id
      );
    setUpdatePartnership(updatePartnership);
  };

  // const handleDeletePartnership = (id) => {
  //   dispatch(deletePartnershipAsync({ id }))
  //     .then((response) => {
  //       if (response) {
  //         toast.success("Partnership deleted successfully");
  //       } else {
  //         toast.error("Error: Service deletion failed");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Error: Please try again");
  //       console.error("Error occurred:", error);
  //     });
  // };

  useEffect(() => {
    const savedActiveKey = localStorage.getItem("configActiveTab");
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  const handleSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("configActiveTab", key);
  };
  useEffect(() => {
    try {
      dispatch(getAllServicesAsync());
      dispatch(getAllPartnershipsAsync());
      dispatch(getAllSuppliersAsync());
      dispatch(getAllDepartmentsAsync());
      dispatch(getAllRoleAsync());
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
      <EditService
        show={modalEditService}
        onHide={() => setModalEditService(false)}
        data={updateService}
      />
      <AddDepartment
        show={modalAddDepartment}
        onHide={() => setModalAddDepartment(false)}
      />
      <EditDepartment
        show={modalEditDepartment}
        onHide={() => setModalEditDepartment(false)}
        data={updateDepartment}
      />
      <AddSupplier
        show={modalAddSupplier}
        onHide={() => setModalAddSupplier(false)}
      />
      <EditSupplier
        show={modalEditSupplier}
        onHide={() => setModalEditSupplier(false)}
        data={updateSupplier}
      />
      <AddPartnership
        show={modalAddPartnership}
        onHide={() => setModalAddPartnership(false)}
      />
      <EditPartnership
        show={modalEditPartnership}
        onHide={() => setModalEditPartnership(false)}
        data={updatePartnership}
      />
      <div className="my-3 container">
        <h6 className="mb-4">System Configuration</h6>
        <Tabs
          activeKey={activeKey}
          onSelect={handleSelect}
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="services"
            title={
              <span onClick={() => dispatch(getAllServicesAsync())}>
                Services & Charges
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => setModalAddService(true)}>
                  Add Service
                </Button>
              </div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Service Name</th>
                    <th>Rate Type</th>
                    <th>Charge Rate</th>
                    <th>Currency</th>
                    <th>Remark</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {configInfo?.getAllServicesResponse?.data?.length > 0 ? (
                    configInfo.getAllServicesResponse?.data?.map(
                      (service, index) => {
                        const {
                          service_name,
                          rate_type,
                          charge_rate,
                          currency,
                          remarks,
                          status,
                        } = service;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{service_name}</td>
                            <td>{rate_type}</td>
                            <td>{charge_rate}</td>
                            <td>{currency}</td>
                            <td>{remarks}</td>
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
                                    onClick={() =>
                                      handleEditService(service.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>
                                  {status ? (
                                    <Dropdown.Item
                                      className="small bg-danger text-white"
                                      onClick={() =>
                                        handleDeactivateService(service.id)
                                      }
                                    >
                                      Deactivate
                                    </Dropdown.Item>
                                  ) : (
                                    <Dropdown.Item
                                      className="small bg-success text-white"
                                      onClick={() =>
                                        handleActivateService(service.id)
                                      }
                                    >
                                      Activate
                                    </Dropdown.Item>
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td colSpan="7">No services available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="departments"
            title={
              <span onClick={() => dispatch(getAllDepartmentsAsync())}>
                Departments
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => setModalAddDepartment(true)}>
                  Add Department
                </Button>
              </div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Service Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {configInfo?.getAllDepartmentsResponse?.data?.length > 0 ? (
                    configInfo?.getAllDepartmentsResponse?.data?.map(
                      (department, index) => {
                        const { name, created_at, status } = department;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{moment(created_at).format("LL")}</td>
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
                                    onClick={() =>
                                      handleEditDepartment(department.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>
                                  {status ? (
                                    <Dropdown.Item
                                      className="small bg-danger text-white"
                                      onClick={() =>
                                        handleDeactivateDepartment(
                                          department.id
                                        )
                                      }
                                    >
                                      Deactivate
                                    </Dropdown.Item>
                                  ) : (
                                    <Dropdown.Item
                                      className="small bg-success text-white"
                                      onClick={() =>
                                        handleActivateDepartment(department.id)
                                      }
                                    >
                                      Activate
                                    </Dropdown.Item>
                                  )}
                                  {/* <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeletDepartment(department.id)
                                    }
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
                      <td colSpan="7">No departments available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="Fuel"
            title={
              <span onClick={() => dispatch(getAllSuppliersAsync())}>
                Fuel Supplier
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => setModalAddSupplier(true)}>
                  Add Supplier
                </Button>
              </div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th> Name</th>
                    <th> Remark</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {configInfo?.getAllSuppliersResponse?.data?.length > 0 ? (
                    configInfo?.getAllSuppliersResponse?.data?.map(
                      (supplier, index) => {
                        const { name, remarks, created_at, status } = supplier;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{remarks}</td>
                            <td>{moment(created_at).format("LL")}</td>
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
                                    onClick={() =>
                                      handleEditSupplier(supplier.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>
                                  {status ? (
                                    <Dropdown.Item
                                      className="small bg-danger text-white"
                                      onClick={() =>
                                        handleDeactivateSupplier(supplier.id)
                                      }
                                    >
                                      Deactivate
                                    </Dropdown.Item>
                                  ) : (
                                    <Dropdown.Item
                                      className="small bg-success text-white"
                                      onClick={() =>
                                        handleActivateSupplier(supplier.id)
                                      }
                                    >
                                      Activate
                                    </Dropdown.Item>
                                  )}

                                  {/* <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeleteSupplier(supplier.id)
                                    }
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
                      <td colSpan="7">No supplier available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="aircraft"
            title={
              <span onClick={() => dispatch(getAllPartnershipsAsync())}>
                Aircraft partnership types
              </span>
            }
          >
            <div>
              <div className="my-3 text-end">
                <Button onClick={() => setModalAddPartnership(true)}>
                  Add Partnership
                </Button>
              </div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th> Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {configInfo?.getAllPartnershipTypesResponse?.data?.length >
                  0 ? (
                    configInfo?.getAllPartnershipTypesResponse?.data?.map(
                      (partnership, index) => {
                        const { name, created_at, status } = partnership;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{moment(created_at).format("LL")}</td>
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
                                    onClick={() =>
                                      handleEditPartnership(partnership.id)
                                    }
                                  >
                                    Manage
                                  </Dropdown.Item>

                                  {status ? (
                                    <Dropdown.Item
                                      className="small bg-danger text-white"
                                      onClick={() =>
                                        handleDeactivatePartnership(
                                          partnership.id
                                        )
                                      }
                                    >
                                      Deactivate
                                    </Dropdown.Item>
                                  ) : (
                                    <Dropdown.Item
                                      className="small bg-success text-white"
                                      onClick={() =>
                                        handleActivatePartnership(
                                          partnership.id
                                        )
                                      }
                                    >
                                      Activate
                                    </Dropdown.Item>
                                  )}

                                  {/* <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeletePartnership(partnership.id)
                                    }
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
                      <td colSpan="7">No partnerships available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="role"
            title={
              <span onClick={() => dispatch(getAllRoleAsync())}>Roles</span>
            }
          >
            <div>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th> Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {configInfo?.getAllRoleResponse?.data?.length > 0 ? (
                    configInfo?.getAllRoleResponse?.data?.map((role, index) => {
                      const { role_name, created_at, status } = role;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{role_name}</td>
                          <td>{moment(created_at).format("LL")}</td>
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
                                {/* <Dropdown.Item
                                  className="small"
                                  onClick={() => handleEditPartnership(role.id)}
                                >
                                  Manage
                                </Dropdown.Item> */}

                                {status ? (
                                  <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeactivateRole(role.id)
                                    }
                                  >
                                    Deactivate
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    className="small bg-success text-white"
                                    onClick={() => handleActivateRole(role.id)}
                                  >
                                    Activate
                                  </Dropdown.Item>
                                )}

                                {/* <Dropdown.Item
                                    className="small bg-danger text-white"
                                    onClick={() =>
                                      handleDeletePartnership(partnership.id)
                                    }
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
                      <td colSpan="7">No partnerships available</td>
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

export default SystemConfig;
