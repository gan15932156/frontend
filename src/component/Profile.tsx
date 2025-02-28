import { z } from "zod";
import useAuth from "../hook/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
const ProfileSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(1),
});
export type ProfileType = z.infer<typeof ProfileSchema>;

const Profile = () => {
  const { user, saveUserInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
  });
  const onSubmit: SubmitHandler<ProfileType> = async (data) => {
    if (user) {
      let newUserData: { name?: string; age?: number } = {};
      if (data.name != user.name) {
        newUserData.name = data.name;
      }
      if (data.age != Number.parseInt(user.age)) {
        newUserData.age = data.age;
      }
      if (Object.keys(newUserData).length > 0) {
        await saveUserInfo(newUserData);
        // console.log("success");
      }
    }
  };
  useEffect(() => {
    if (user) {
      reset({
        age: Number.parseInt(user.age),
        name: user.name,
      });
    }
  }, [user]);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="max-w-md w-full mx-auto mt-4">
      <div className="card card-side bg-base-100 shadow-sm w-full h-[320px]">
        <figure>
          <img src="https://i.pravatar.cc/300" alt="Profiel image" />
        </figure>
        <div className="card-body">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </label>
            {errors.name && <div>Name is required</div>}
            <label className="input input-bordered flex items-center gap-2">
              Age
              <input
                type="number"
                min={1}
                className="grow"
                placeholder="Age"
                {...register("age", { required: true })}
              />
            </label>
            {errors.age && <div>Age is required</div>}
            <button className="btn btn-neutral mt-4" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
