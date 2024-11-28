// src/pages/admin/AdminDashboard.js

import { Card, Col, Container, Row, Table } from "react-bootstrap";
import AdminLayout from "../../../component/layout/admin-layout";
import { FaPlaneUp } from "react-icons/fa6";
import DateTimeDisplay from "../../../util/date";
import moment from "moment";
import { useEffect } from "react";
import {
  getActivityLogAsync,
  getDashboardStatsAsync,
} from "../../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../component/charts/bar-chart";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const activityLog = useSelector((state) => state?.users);

  const user = localStorage.getItem("user");
  let loginUser = null;

  if (user) {
    try {
      loginUser = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing 'user' from localStorage:", error);
    }
  }

  useEffect(() => {
    try {
      dispatch(getActivityLogAsync());
      dispatch(getDashboardStatsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const labels = Object.keys(
    activityLog?.getDashboardStatsResponse?.data?.bookings_by_month || {}
  );
  const data = Object.values(
    activityLog?.getDashboardStatsResponse?.data?.bookings_by_month || {}
  ).map((monthData) => monthData.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Bookings Count",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <AdminLayout>
      <Container fluid>
        <Row className="my-5 ">
          <Col md={6}>
            <Card className=" bg-color-1 ">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h2 className="text-capitalize">
                      Welcome,{" "}
                      <span className="text-capitalize">
                        {loginUser?.first_name}
                      </span>
                    </h2>
                    <p>
                      <DateTimeDisplay />
                    </p>
                  </Col>
                  <Col md={4}>
                    <p className="mt-4">
                      <small>
                        Last Login:{" "}
                        {moment(loginUser?.last_seen_at).format("lll")}
                      </small>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
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
          <Col md={3}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="my-3">
                      <h4>
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.total_bookings
                        }
                      </h4>
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
          {/* <Col md={4}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <div className="mt-4">
                      <h4>{activityLog?.getDashboardStatsResponse?.data?.on_ground_bookings ? activityLog?.getDashboardStatsResponse?.data?.on_ground_bookings : 0}</h4>
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
          </Col> */}

          <Col md={12}>
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

        <Row>
          <Col md={6}>
            {/* Bar Chart */}
            <BarChart
              chartData={chartData}
              chartTitle="Monthly Bookings Summary"
            />
          </Col>
          <Col md={6}>
            {/* Recent Notifications */}
            <section>
              <Card className="my-4 activity-log-card">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Recent Notification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog?.getActivityLogResponse?.data?.map(
                        (activity, index) => (
                          <tr key={index}>
                            <td>
                              <p>
                                {activity?.full_name}
                                <br />
                                <small>{activity?.activity}</small>
                              </p>
                            </td>
                            <td>
                              <span className="text-success">
                                {moment(activity?.created_at).format("lll")}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
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
