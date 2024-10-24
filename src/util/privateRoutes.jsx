import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const authUser = localStorage.getItem("token");

  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to proceed");
    }
  }, [authUser]);

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return children;
};
