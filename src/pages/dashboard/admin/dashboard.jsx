// src/pages/admin/AdminDashboard.js

import { Card, Col, Container, Row, Table } from "react-bootstrap";
import AdminLayout from "../../../component/layout/admin-layout";
import { FaPlaneUp, FaArrowUp, FaArrowDown } from "react-icons/fa6";
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
      <div className="tw-bg-gray-50 tw-min-h-screen">
        <div className="tw-container tw-mx-auto tw-px-6 tw-py-8">
          {/* Header Section */}
          <div className="tw-mb-8">
            <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-2">
              Welcome back, {loginUser?.first_name || 'Admin'}
            </h1>
            <p className="tw-text-gray-600">
              Track, manage and monitor your aviation operations
            </p>
          </div>

          <div className="tw-mt-8 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mb-8">
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-text-center">
              <h4 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
                {activityLog?.getDashboardStatsResponse?.data?.approved_bookings || 0}
              </h4>
              <p className="tw-text-gray-600">Approved Bookings</p>
            </div>
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-text-center">
              <h4 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
                {activityLog?.getDashboardStatsResponse?.data?.rejected_bookings || 0}
              </h4>
              <p className="tw-text-gray-600">Rejected Bookings</p>
            </div>
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-text-center">
              <h4 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
                {activityLog?.getDashboardStatsResponse?.data?.pending_bookings || 0}
              </h4>
              <p className="tw-text-gray-600">Pending Bookings</p>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-0 tw-mb-8">
            {/* Total Aircraft */}
            <div className="tw-bg-white tw-shadow-sm tw-p-6">
              <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
                <div>
                  <p className="tw-text-gray-600 tw-text-sm tw-font-medium">Total Aircraft</p>
                  <p className="tw-text-3xl tw-font-bold tw-text-gray-900">
                    {activityLog?.getDashboardStatsResponse?.data?.total_aircrafts || 0}
                  </p>
                </div>
                <div className="tw-bg-blue-50 tw-p-3 tw-rounded-lg">
                  <FaPlaneUp className="tw-text-blue-600 tw-text-xl" />
                </div>
              </div>
              <div className="tw-flex tw-items-center">
                <FaArrowUp className="tw-text-green-500 tw-text-sm tw-mr-1" />
                <span className="tw-text-green-500 tw-text-sm tw-font-medium">40%</span>
                <span className="tw-text-gray-500 tw-text-sm tw-ml-2">Overall Progress</span>
              </div>
            </div>

            {/* Total Bookings */}
            <div className="tw-bg-white tw-shadow-sm tw-p-6">
              <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
                <div>
                  <p className="tw-text-gray-600 tw-text-sm tw-font-medium">Total Bookings</p>
                  <p className="tw-text-3xl tw-font-bold tw-text-gray-900">
                    {activityLog?.getDashboardStatsResponse?.data?.total_bookings || 0}
                  </p>
                </div>
                <div className="tw-bg-red-50 tw-p-3 tw-rounded-lg">
                  <FaPlaneUp className="tw-text-red-600 tw-text-xl" />
                </div>
              </div>
              <div className="tw-flex tw-items-center">
                <FaArrowDown className="tw-text-red-500 tw-text-sm tw-mr-1" />
                <span className="tw-text-red-500 tw-text-sm tw-font-medium">40%</span>
                <span className="tw-text-gray-500 tw-text-sm tw-ml-2">Overall Progress</span>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="tw-bg-white tw-shadow-sm tw-p-6">
              <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
                <div>
                  <p className="tw-text-gray-600 tw-text-sm tw-font-medium">Total Revenue</p>
                  <p className="tw-text-3xl tw-font-bold tw-text-gray-900">
                    {activityLog?.getDashboardStatsResponse?.data?.total_revenue || '180'}
                  </p>
                </div>
                <div className="tw-bg-yellow-50 tw-p-3 tw-rounded-lg">
                  <FaPlaneUp className="tw-text-yellow-600 tw-text-xl" />
                </div>
              </div>
              <div className="tw-flex tw-items-center">
                <span className="tw-text-yellow-500 tw-text-sm tw-font-medium">↔ 0%</span>
                <span className="tw-text-gray-500 tw-text-sm tw-ml-2">No change</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
            {/* Left Column - Chart and Status */}
            <div className="lg:tw-col-span-2 tw-space-y-8">
              {/* Chart Section */}
              <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                    Booking Details
                  </h3>
                  <select className="tw-text-sm tw-border tw-border-gray-300 tw-rounded tw-px-3 tw-py-1">
                    <option>October</option>
                  </select>
                </div>
                <BarChart
                  chartData={chartData}
                  chartTitle=""
                />
              </div>

              
            </div>

            {/* Right Column - Recent Requests */}
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
              <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-6">
                Recent Request
              </h3>
              <div className="tw-space-y-4">
                {activityLog?.getActivityLogResponse?.data?.slice(0, 4).map(
                  (activity, index) => (
                    <div key={index} className="tw-flex tw-items-start tw-space-x-3">
                      <div className="tw-w-8 tw-h-8 tw-bg-gray-300 tw-rounded-full tw-flex-shrink-0"></div>
                      <div className="tw-flex-1 tw-min-w-0">
                        <div className="tw-flex tw-justify-between tw-items-start tw-mb-1">
                          <p className="tw-text-sm tw-font-medium tw-text-gray-900">
                            {activity?.full_name || 'Jacob Yakubu'}
                          </p>
                          <span className={`tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${index % 3 === 0 ? 'tw-bg-green-100 tw-text-green-800' :
                            index % 3 === 1 ? 'tw-bg-yellow-100 tw-text-yellow-800' :
                              'tw-bg-red-100 tw-text-red-800'
                            }`}>
                            {index % 3 === 0 ? 'Approved' : index % 3 === 1 ? 'Pending' : 'Rejected'}
                          </span>
                        </div>
                        <p className="tw-text-xs tw-text-gray-500 tw-mb-1">
                          {moment(activity?.created_at).format('MMM DD, YYYY')}
                        </p>
                        <p className="tw-text-sm tw-text-gray-600 tw-leading-relaxed">
                          {activity?.activity || 'Funds needed to purchase additional binding wire and site refreshments for labours during concrete pouring scheduled this weekend.'}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
