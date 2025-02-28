import { NavLink } from "react-router";
import PostTable from "./PostTable";

const Dashboard = () => {
  return (
    <div className="max-w-[80%] w-full mx-auto mt-4">
      <div className="w-full flex space-x-2 items-center justify-end">
        <NavLink className="btn btn-primary btn-sm" to="/add-post">
          Create post
        </NavLink>
      </div>
      <PostTable />
    </div>
  );
};

export default Dashboard;
