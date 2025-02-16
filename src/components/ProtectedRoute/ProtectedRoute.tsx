import { Navigate, Outlet } from "react-router";
// Store
import { useAuthStore } from "store/auth.store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
