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
  ).map((monthData) => monthData.total_amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Bookings Count",
        data,
        backgroundColor: "#8ED7FD",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="tw-container-fluid">
        <div className="tw-flex tw-flex-wrap tw--mx-4 tw-my-12">
          <div className="tw-w-full md:tw-w-1/2 tw-px-4 tw-mb-8">
            <div className="tw-backdrop-blur-sm tw-bg-cyan-950/40 tw-border-b tw-border-white/10 tw-shadow-sm tw-text-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
              <div className="tw-p-6">
                <div className="tw-flex tw-flex-wrap tw--mx-4">
                  <div className="tw-w-full md:tw-w-2/3 tw-px-4">
                    <h2 className="tw-text-2xl tw-font-bold tw-capitalize">
                      Welcome,{" "}
                      <span className="tw-capitalize">
                        {loginUser?.first_name}
                      </span>
                    </h2>
                    <p className="tw-mt-2">
                      <DateTimeDisplay />
                    </p>
                  </div>
                  <div className="tw-w-full md:tw-w-1/3 tw-px-4">
                    <p className="tw-mt-4 tw-text-sm tw-opacity-80">
                      Last Login:{" "}
                      {moment(loginUser?.last_seen_at).format("lll")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-w-full md:tw-w-1/4 tw-px-4 tw-mb-8">
            <div className="tw-bg-white tw-rounded-lg tw-shadow tw-overflow-hidden">
              <div className="tw-p-6">
                <div className="tw-flex tw-flex-wrap tw--mx-4">
                  <div className="tw-w-2/3 tw-px-4">
                    <div className="tw-my-3">
                      <h4 className="tw-text-3xl tw-font-bold">
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.total_aircrafts
                        }
                      </h4>
                      <h4 className="tw-text-lg tw-font-medium">Aircraft</h4>
                    </div>
                  </div>
                  <div className="tw-w-1/3 tw-px-4">
                    <div className="tw-backdrop-blur-sm tw-bg-cyan-950/40 tw-border-b tw-border-white/10 tw-shadow-sm tw-py-4 tw-px-1 tw-text-white tw-rounded-lg">
                      <FaPlaneUp className="tw-text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tw-w-full md:tw-w-1/4 tw-px-4 tw-mb-8">
            <div className="tw-bg-white tw-rounded-lg tw-shadow tw-overflow-hidden">
              <div className="tw-p-6">
                <div className="tw-flex tw-flex-wrap tw--mx-4">
                  <div className="tw-w-2/3 tw-px-4">
                    <div className="tw-my-3">
                      <h4 className="tw-text-3xl tw-font-bold">
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.total_bookings
                        }
                      </h4>
                      <h4 className="tw-text-lg tw-font-medium">Bookings</h4>
                    </div>
                  </div>
                  <div className="tw-w-1/3 tw-px-4">
                    <div className="tw-backdrop-blur-sm tw-bg-cyan-950/40 tw-border-b tw-border-white/10 tw-shadow-sm tw-text-center tw-py-4 tw-px-1 tw-text-white tw-rounded-lg">
                      <FaPlaneUp className="tw-text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tw-flex tw-flex-wrap tw--mx-4 tw-my-12">
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

          <div className="tw-w-full tw-px-4 tw-mb-8">
            <div className="tw-backdrop-blur-sm tw-bg-cyan-950/40 tw-border-b tw-border-white/10 tw-shadow-sm tw-text-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
              <div className="tw-p-6">
                <div className="tw-flex tw-flex-wrap tw--mx-4">
                  <div className="tw-w-full md:tw-w-1/3 tw-px-4">
                    <div className="tw-p-3">
                      <h4 className="tw-text-3xl tw-font-bold">
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.approved_bookings
                        }
                      </h4>
                      <h6 className="tw-text-lg tw-font-medium">Approved Bookings</h6>
                    </div>
                  </div>
                  <div className="tw-w-full md:tw-w-1/3 tw-px-4">
                    <div className="tw-p-3">
                      <h4 className="tw-text-3xl tw-font-bold">
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.rejected_bookings
                        }
                      </h4>
                      <h6 className="tw-text-lg tw-font-medium">Rejected Bookings</h6>
                    </div>
                  </div>
                  <div className="tw-w-full md:tw-w-1/3 tw-px-4">
                    <div className="tw-p-3">
                      <h4 className="tw-text-3xl tw-font-bold">
                        {
                          activityLog?.getDashboardStatsResponse?.data
                            ?.pending_bookings
                        }
                      </h4>
                      <h6 className="tw-text-lg tw-font-medium">Pending Bookings</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tw-flex tw-flex-wrap tw--mx-4">
          <div className="tw-w-full md:tw-w-1/2 tw-px-4 tw-mb-8">
            {/* Bar Chart */}
            <BarChart
              chartData={chartData}
              chartTitle="Monthly Bookings Summary"
            />
          </div>
          <div className="tw-w-full md:tw-w-1/2 tw-px-4 tw-mb-8">
            {/* Recent Notifications */}
            <section>
              <div className="tw-bg-white tw-rounded-lg tw-shadow tw-overflow-hidden tw-my-6">
                <div className="tw-p-6">
                  <table className="tw-w-full">
                    <thead>
                      <tr>
                        <th className="tw-text-left tw-py-3 tw-px-4 tw-font-semibold tw-text-lg">Recent Notification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog?.getActivityLogResponse?.data?.map(
                        (activity, index) => (
                          <tr key={index} className="tw-border-t">
                            <td className="tw-py-3 tw-px-4">
                              <p>
                                {activity?.full_name}
                                <br />
                                <small className="tw-text-gray-600">{activity?.activity}</small>
                              </p>
                            </td>
                            <td className="tw-py-3 tw-px-4 tw-text-right">
                              <span className="tw-text-green-500">
                                {moment(activity?.created_at).format("lll")}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
