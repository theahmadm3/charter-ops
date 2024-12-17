import { Card, Col, Container, Row } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { FaPlaneUp } from "react-icons/fa6";
import { useEffect } from "react";
import { getAllReportingAsync } from "../../../../slices/reporting/reportingSlice";
import FormatCurrency from "../../../../util/formatCurrency";
import ReportingFilter from "../../../../component/filters/reporting-filter";

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
  const dispatch = useDispatch();

  const reporting = useSelector((state) => state?.reporting);
  console.log("reporting", reporting);

  useEffect(() => {
    try {
      dispatch(getAllReportingAsync({}));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <AdminLayout>
      <Container fluid>
        <div>
          <ReportingFilter />
        </div>
        {/* Top Section */}
        <Row className="mb-4">
          <Col md={4}>
            <StatsCard
              title="Total amount of outstanding payments"
              value={
                reporting?.getAllReportingResponse?.data
                  ?.outstanding_payments ? (
                  <FormatCurrency
                    value={
                      reporting.getAllReportingResponse.data
                        .outstanding_payments
                    }
                    currency="USD"
                  />
                ) : (
                  ".."
                )
              }
            />
            <StatsCard
              title="Total amount of fuel collected"
              value={
                reporting?.getAllReportingResponse?.data?.fuel_collected ? (
                  <FormatCurrency
                    value={
                      reporting.getAllReportingResponse.data.fuel_collected
                    }
                    currency="USD"
                  />
                ) : (
                  ".."
                )
              }
            />
            {/* <StatsCard
              title="Total amount for maintenance added"
              value="$800,000"
            /> */}
            {/* <StatsCard
              title="Outstanding Bookings"
              value={reporting?.getAllReportingResponse?.data?.ddd}
            /> */}
          </Col>
          <Col md={4}>
            <StatsCard
              title="Count of clients ( active)"
              value={reporting?.getAllReportingResponse?.data?.active_clients}
            />
            <StatsCard
              title="Count of planes ( active)"
              value={reporting?.getAllReportingResponse?.data?.active_planes}
            />
            {/* <StatsCard title="Count of system users" value="2,000" /> */}
          </Col>
          <Col md={4}>
            <StatsCard
              title="Count of crew members"
              value={reporting?.getAllReportingResponse?.data?.crew_members}
            />
            <StatsCard
              title="Count of total passengers from all flights completed"
              value={reporting?.getAllReportingResponse?.data?.total_passengers}
            />
            {/* <StatsCard title="Inactive Planes" value="20" /> */}
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row>
          {/* <Col xs={3} md={3}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="my-3">
                      <h4>
                        {
                          reporting?.getDashboardStatsResponse?.data
                            ?.total_aircrafts
                        }
                      </h4>
                      <h4>Total amount for maintenance added</h4>
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
          </Col> */}
          <Col md={12}>
            <Card className="bg-color-1">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {reporting?.getAllReportingResponse?.data
                          ?.maintenance_cost !== null ? (
                          <FormatCurrency
                            value={
                              reporting?.getAllReportingResponse?.data
                                ?.maintenance_cost
                            }
                            currency="USD"
                          />
                        ) : (
                          ".."
                        )}
                      </h4>
                      <h6>Total amount for maintenance added</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {reporting?.getAllReportingResponse?.data?.system_users}
                      </h4>
                      <h6> Count of system users </h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3">
                      <h4>
                        {reporting?.getAllReportingResponse?.data
                          ?.total_revenue !== null ? (
                          <FormatCurrency
                            value={
                              reporting?.getAllReportingResponse?.data
                                ?.total_revenue
                            }
                            currency="USD"
                          />
                        ) : (
                          ".."
                        )}
                      </h4>
                      <h6> Total Revenue </h6>
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
