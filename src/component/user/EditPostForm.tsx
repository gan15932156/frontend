import { useParams } from "react-router";
import CreatePostForm from "./CreatePostForm";

const EditPostForm = () => {
  let params = useParams();
  return <CreatePostForm postId={params.postId} />;
};

export default EditPostForm;
