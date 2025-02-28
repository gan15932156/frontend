import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { InsertPostSchema, InsertPostType, PostType } from "./PostTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
interface Props {
  postId?: string;
}
const CreatePostForm: React.FC<Props> = ({ postId }) => {
  const queryClient = useQueryClient();
  const { mutate: addMutate, isPending: isAddPending } = useMutation({
    mutationFn: (newPost: InsertPostType) =>
      api.post<InsertPostType, AxiosResponse<{ data: InsertPostType }>>(
        "/post",
        newPost
      ),
    onSuccess: () => {
      reset();
    },
  });
  const { mutate: editMutate, isPending: isEditPending } = useMutation({
    mutationFn: (newPost: InsertPostType) =>
      api.put<InsertPostType, AxiosResponse<{ data: InsertPostType }>>(
        `/post/${postId}`,
        newPost
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
    },
  });
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const { data } = await api.get<void, AxiosResponse<{ data: PostType }>>(
        `/post/${postId}`
      );
      return data.data;
    },
    enabled: !!postId,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsertPostType>({ resolver: zodResolver(InsertPostSchema) });
  const onSubmit: SubmitHandler<InsertPostType> = async (data) => {
    if (!!postId) {
      // edit
      editMutate(data);
    } else {
      // add
      addMutate(data);
    }
  };
  if (isPostLoading) <div>Loading...</div>;
  useEffect(() => {
    reset({ content: postData?.content, title: postData?.title });
  }, [postData]);
  return (
    !isPostError && (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mx-auto fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Post</legend>
            <label className="fieldset-label">Title</label>
            <textarea
              {...register("title", { required: true })}
              cols={50}
              rows={4}
              className="textarea"
              placeholder="Title"
              disabled={isAddPending || isEditPending}
            ></textarea>
            {errors.title && <div>Title is required</div>}
            <label className="fieldset-label">Content</label>
            <textarea
              {...register("content", { required: true })}
              cols={50}
              rows={4}
              className="textarea"
              placeholder="Content"
              disabled={isAddPending || isEditPending}
            ></textarea>
            {errors.content && <div>Content is required</div>}
            <button
              className="btn btn-neutral mt-4"
              type="submit"
              disabled={isAddPending || isEditPending}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    )
  );
};

export default CreatePostForm;
