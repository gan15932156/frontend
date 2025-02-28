import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { InsertPostSchema, InsertPostType } from "./PostTable";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePostForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (newUser: InsertPostType) =>
      api.post<InsertPostType, AxiosResponse<{ data: InsertPostType }>>(
        "/post",
        newUser
      ),
    onSuccess: (data) => {
      console.log(data);
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsertPostType>({ resolver: zodResolver(InsertPostSchema) });
  const onSubmit: SubmitHandler<InsertPostType> = async (data) => {
    mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="mx-auto fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Post</legend>
          <label className="fieldset-label">Title</label>
          <textarea
            {...register("title", { required: true })}
            cols={2}
            className="input"
            placeholder="Title"
            disabled={isPending}
          ></textarea>
          {errors.title && <div>Title is required</div>}
          <label className="fieldset-label">Content</label>
          <textarea
            {...register("content", { required: true })}
            cols={2}
            className="input"
            placeholder="Content"
            disabled={isPending}
          ></textarea>
          {errors.content && <div>Content is required</div>}
          <button
            className="btn btn-neutral mt-4"
            type="submit"
            disabled={isPending}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePostForm;
