/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const authUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const department = user?.department;
  const location = useLocation();

  const departmentPaths = {
    commercial: [
      "/admin-dashboard",
      "/admin-booking",
      "/admin-transaction",
      "/admin-clients",
    ],
    "logistics and supply": ["/admin-maintenance", "/admin-fuel"],
  };

  const allowedPaths = department ? departmentPaths[department.toLowerCase()] || [] : [];

  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to proceed");
    }
  }, [authUser]);

  if (!authUser) {
    return <Navigate to="/" />;
  }

  if (!allowedPaths.includes(location.pathname) && user.role.role_name !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
