import { Outlet } from "react-router";

const Rootlayout = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default Rootlayout;
