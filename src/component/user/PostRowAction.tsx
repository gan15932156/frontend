import { Row } from "@tanstack/react-table";
import { PostType } from "./PostTable";
import { NavLink } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../api";
import toast from "react-hot-toast";

interface Props {
  row: Row<PostType>;
}
const PostRowAction: React.FC<Props> = ({ row }) => {
  const { id } = row.original;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) =>
      api.delete<string, AxiosResponse<{ success: boolean; message: string }>>(
        "/post/" + id
      ),
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success(data.data.message);
      } else {
        toast.error("Cannot delete post.");
      }
    },
  });
  const handleDeletePost = () => {
    if (confirm("Are you sure to delete this post.")) {
      mutate(id);
    }
  };
  return (
    <div className="flex space-x-2 items-center justify-start">
      <NavLink
        className="badge badge-warning badge-sm gap-2"
        to={"/post/edit/" + id}
      >
        Edit
      </NavLink>
      <button
        disabled={isPending}
        className="badge badge-error badge-sm gap-2 cursor-pointer"
        onClick={handleDeletePost}
      >
        Delete
      </button>
    </div>
  );
};

export default PostRowAction;
