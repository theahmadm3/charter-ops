import { Card, Col, Container, Row } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useSelector } from "react-redux";
import { FaPlaneUp } from "react-icons/fa6";

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card className=" mb-3 shadow-sm">
      <Card.Body>
        <div className=" mb-2">
          {icon && <div className="me-2">{icon}</div>}
          <h4>{value}</h4>
        </div>
        <p className="mb-0">{title}</p>
      </Card.Body>
    </Card>
  );
};

const Reports = () => {
  const activityLog = useSelector((state) => state?.users);

  return (
    <AdminLayout>
      <Container fluid>
        {/* Top Section */}
        <Row className="mb-4">
          <Col md={4}>
            <StatsCard title="Revenue Generated" value="$4,000,000" />
            <StatsCard title="Fuel" value="$700,000" />
            <StatsCard title="Maintenance Amount" value="$800,000" />
            <StatsCard title="Outstanding Bookings" value="$800,000" />
          </Col>
          <Col md={4}>
            <StatsCard title="Clients" value="50,000" />
            <StatsCard title="Active Users" value="2,000" />
            <StatsCard title="Inactive Users" value="2,000" />
          </Col>
          <Col md={4}>
            <StatsCard title="Planes" value="50" />
            <StatsCard title="Active Planes" value="30" />
            <StatsCard title="Inactive Planes" value="20" />
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row>
          <Col xs={3} md={3}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="my-3">
                      <h4>
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.total_aircrafts
                        }
                      </h4>
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
          <Col md={9}>
            <Card className="bg-color-1">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.approved_bookings
                        }
                      </h4>
                      <h6>Approved Bookings</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.rejected_bookings
                        }
                      </h4>
                      <h6>Rejected Bookings</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.pending_bookings
                        }
                      </h4>
                      <h6>Pending Bookings</h6>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Reports;
