import { Navigate, Outlet } from "react-router";
import useAuth from "../hook/useAuth";

const UnauthenticatedRoute = () => {
  const { token, user } = useAuth();
  if (!token) return <Outlet />;
  else {
    if (user) {
      if (user.role === "ADMIN") {
        return <Navigate to="/dashboardAdmin" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default UnauthenticatedRoute;
