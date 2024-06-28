import { Button, Col, Dropdown, Row, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartmentsAsync,
  getAllPartnershipsAsync,
  getAllServicesAsync,
  getAllSuppliersAsync,
} from "../../../../slices/config/configSlice";
import AddService from "./modal/add-service";
import { HiDotsHorizontal } from "react-icons/hi";

const SystemConfig = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("services");
  const [modalAddService, setModalAddService] = useState(false);
  const configInfo = useSelector((state) => state?.config);
  console.log("first", configInfo);

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
      dispatch(getAllServicesAsync());
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
              <div className="my-3">
                <Button onClick={() => setModalAddService(true)}>
                  Add Service
                </Button>
              </div>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Service Name</th>
                    <th>Rate Type</th>
                    <th>Charge Rate</th>
                    <th>Currency</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
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
                                <Dropdown.Item className="small">
                                  Manage
                                </Dropdown.Item>
                                <Dropdown.Item className="small">
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
            Tab content for Profile
          </Tab>
          <Tab
            eventKey="Fuel"
            title={
              <span onClick={() => dispatch(getAllSuppliersAsync())}>
                Fuel Supplier
              </span>
            }
          >
            Tab content for Loooonger Tab
          </Tab>
          <Tab
            eventKey="aircraft"
            title={
              <span onClick={() => dispatch(getAllPartnershipsAsync())}>
                Aircraft partnership types
              </span>
            }
          >
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SystemConfig;
