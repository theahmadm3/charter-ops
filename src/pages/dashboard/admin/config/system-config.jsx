import { Button, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllDepartmentsAsync,
  getAllPartnershipsAsync,
  getAllServicesAsync,
  getAllSuppliersAsync,
} from "../../../../slices/config/configSlice";

const SystemConfig = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("services");
  const [modalAddService, setModalAddService] = useState(false);

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
              <div>
                <Button onClick={() => setModalAddService(true)}>
                  Add Service
                </Button>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Service Name</th>
                    <th>Rate Type</th>
                    <th>Charge Rate</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
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
