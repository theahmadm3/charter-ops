import { Tab, Tabs } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";

const SystemConfig = () => {
  return (
    <AdminLayout>
      <Tabs
        defaultActiveKey="services"
        id="justify-tab-example"
        className="mb-3"
      >
        <Tab eventKey="services" title="Services & Charges">
          Tab content for Home
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
    </AdminLayout>
  );
};

export default SystemConfig;
