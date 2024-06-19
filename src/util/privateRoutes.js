import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const authUser = localStorage.getItem("token");
  //   const { user } = authUser();
  if (!authUser) {
    toast.error("Please login to proceed");
    return <Navigate to="/login" />;
  }

  return children;
};
