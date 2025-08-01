import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Loading from "./util/loading.jsx";
import store from "./store/store.jsx";
import ErrorPage from "./error-page.jsx";
import UnauthorisedPage from "./unauthorised-page.jsx";
import { Provider } from "react-redux";
import ForgetPassword from "./pages/auth/forget-password";
import ResetPassword from "./pages/auth/reset-password";
import AdminDashboard from "./pages/dashboard/admin/dashboard";
import SystemConfig from "./pages/dashboard/admin/config/system-config.jsx";
import Users from "./pages/dashboard/admin/users/users";
import Clients from "./pages/dashboard/admin/client/clients";
import Aircraft from "./pages/dashboard/admin/aircraft/aircraft";
import Booking from "./pages/dashboard/admin/booking/booking";
import AddBooking from "./pages/dashboard/admin/booking/add-booking.jsx";
import Fuels from "./pages/dashboard/admin/fuel/fuel.jsx";
import FirstTimeLogin from "./pages/auth/first-time-login.jsx";
import { ProtectedRoute } from "./util/privateRoutes.jsx";
import ContactRequests from "./pages/dashboard/admin/contact-request/contact-requests.jsx";
import Maintenance from "./pages/dashboard/admin/maintenance/maintenance";
import Transaction from "./pages/dashboard/admin/transaction/transaction";
import Reports from "./pages/dashboard/admin/reports/reports.jsx";
import App from "./App.jsx";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/first-time-login",
    element: <FirstTimeLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorisedPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-config",
    element: (
      <ProtectedRoute>
        <SystemConfig />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-clients",
    element: (
      <ProtectedRoute>
        <Clients />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-aircraft",
    element: (
      <ProtectedRoute>
        <Aircraft />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-booking",
    element: (
      <ProtectedRoute>
        <Booking />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-add-booking",
    element: (
      <ProtectedRoute>
        <AddBooking />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-fuel",
    element: (
      <ProtectedRoute>
        <Fuels />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-maintenance",
    element: (
      <ProtectedRoute>
        <Maintenance />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-requests",
    element: (
      <ProtectedRoute>
        <ContactRequests />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-transaction",
    element: (
      <ProtectedRoute>
        <Transaction />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-report",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer hideProgressBar />
      <Loading />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);