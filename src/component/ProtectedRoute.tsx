import { Navigate, Outlet } from "react-router";
import useAuth from "../hook/useAuth";
const ProtectedRoute = ({ role }: { role: "ADMIN" | "USER" }) => {
  const { token, user } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user) {
    if (role === user.role) {
      return <Outlet />;
    }
  }
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
