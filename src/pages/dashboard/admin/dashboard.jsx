import { Card, Col, Container, Row, Table } from "react-bootstrap";
import AdminLayout from "../../../component/layout/admin-layout";
import { FaPlaneUp } from "react-icons/fa6";
import DateTimeDisplay from "../../../util/date";
import { BarChart } from "../../../component/charts/bar";

const AdminDashboard = () => {
  const user = localStorage.getItem("user");
  let loginUser = null;

  if (user) {
    try {
      loginUser = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing 'user' from localStorage:", error);
    }
  }
  return (
    <AdminLayout>
      <Container fluid>
        <Row className="my-5 ">
          <Col md={6}>
            <Card className=" bg-color-1 ">
              <Card.Body>
                <h2 className="text-capitalize">
                  Welcome,{" "}
                  <span className="text-capitalize">
                    {loginUser?.first_name}
                  </span>{" "}
                </h2>
                <p>
                  {" "}
                  <DateTimeDisplay />{" "}
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="my-3">
                      <h4>0 </h4>
                      <h4>Aircraft</h4>
                    </div>
                  </Col>
                  <Col>
                    <div className="bg-primary text-center py-4 text-white rounded">
                      <FaPlaneUp className="h3" />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="my-3">
                      <h4>0 </h4>
                      <h4>Bookings</h4>
                    </div>
                  </Col>
                  <Col>
                    <div className="bg-primary text-center py-4 text-white rounded">
                      <FaPlaneUp className="h3" />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-5">
          <Col md={4} className="">
            <Card className="">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="mt-4">
                      <h4>0 </h4>
                      <h6>On Ground Aircraft</h6>
                    </div>
                  </Col>
                  <Col>
                    <div className="bg-primary text-center py-4 text-white rounded">
                      <FaPlaneUp className="h3" />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className=" bg-color-1">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="p-3">
                      <div>
                        <h4>0 </h4>
                        <h6>Approved Bookings</h6>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <div>
                        <h4>0 </h4>
                        <h6>Rejected Bookings</h6>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <div>
                        <h4>0 </h4>
                        <h6>Pending Bookings</h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BarChart />
          </Col>
          <Col md={6}>
            <section>
              <Card className="my-4">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Recent Notification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>
                            Chris
                            <br />
                            <small> Booked a flight</small>
                          </p>
                        </td>
                        <td>
                          <small>10:00</small>
                          <p className="text-success">Dec 24, 2023</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </section>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};
export default AdminDashboard;
