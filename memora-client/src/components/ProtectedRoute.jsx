import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
    const { accessToken, hydrated } = useAuthStore();

  if (!hydrated) return null; // or loader
  if (!accessToken) {
    //replace: Prevents user from going back to protected page using back button
    return <Navigate to="/auth" replace />
  }
  return <Outlet />;
};

export default ProtectedRoute;