/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const authUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.role_name?.toLowerCase();
  const location = useLocation();

  const rolePaths = {
    "commercial": [
      "/admin-dashboard",
      "/admin-booking",
      "/admin-transaction",
      "/admin-clients",
    ],
    "logistics": [
      "/admin-dashboard",
      "/admin-maintenance",
      "/admin-fuel",
    ],
    "maintenance": [
      "/admin-dashboard",
      "/admin-maintenance",
      "/admin-fuel",
    ],
  };

  // Determine allowed paths for the user's role (empty array if role not found)
  const allowedPaths = role ? rolePaths[role] || [] : [];

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
