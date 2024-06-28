import { Tab, Table, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllServicesAsync } from "../../../../slices/config/configSlice";

const SystemConfig = () => {
  const dispatch = useDispatch();

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
          defaultActiveKey="services"
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="departments" title="Departments">
            Tab content for Profile
          </Tab>
          <Tab eventKey="Fuel" title="Fuel Supplier">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="aircraft" title="Aircraft partnership types">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SystemConfig;
