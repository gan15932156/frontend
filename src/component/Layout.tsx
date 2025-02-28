import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";
import useAuth from "../hook/useAuth";
const Layout = () => {
  const { token, user } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (!user) <div>Loading...</div>;
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
