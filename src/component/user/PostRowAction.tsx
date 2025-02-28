import { Row } from "@tanstack/react-table";
import { PostType } from "./PostTable";
import { NavLink } from "react-router";

interface Props {
  row: Row<PostType>;
}
const PostRowAction: React.FC<Props> = ({ row }) => {
  const { id } = row.original;

  return (
    <div>
      <NavLink
        className="badge badge-warning badge-sm gap-2"
        to={"/post/edit/" + id}
      >
        Edit maybe create reusable add post form
      </NavLink>
    </div>
  );
};

export default PostRowAction;
