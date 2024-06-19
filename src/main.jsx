import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Login from "./pages/auth/login.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./util/loading.jsx";
import store from "./store/store.jsx";
import ErrorPage from "./error-page.jsx";
import { Provider } from "react-redux";
import ForgetPassword from "./pages/auth/forget-password";
import ResetPassword from "./pages/auth/reset-password";
import AdminDashboard from "./pages/dashboard/admin/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/reset-password/:token`,
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
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
