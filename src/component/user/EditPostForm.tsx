import { useParams } from "react-router";

const EditPostForm = () => {
  let params = useParams();
  console.log(params);
  return <div>EditPostForm</div>;
};

export default EditPostForm;
