import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    //replace: Prevents user from going back to protected page using back button
    return <Navigate to="/auth" replace />
  }
  return <Outlet />;
};

export default ProtectedRoute;