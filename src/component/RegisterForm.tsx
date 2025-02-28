import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { z } from "zod";
import api from "../api";
import { AxiosResponse } from "axios";
import useAuth from "../hook/useAuth";

const RegisterSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});
type RegisterType = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const { login } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: (newUser: RegisterType) =>
      api.post<RegisterType, AxiosResponse<{ accessToken: string }>>(
        "/user/register",
        newUser
      ),
    onSuccess: (data) => {
      login(data.data.accessToken);
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({ resolver: zodResolver(RegisterSchema) });
  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mx-auto fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Register</legend>
        <label className="fieldset-label">Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          className="input"
          placeholder="Name"
          disabled={isPending}
        />
        {errors.name && <div>Name is required</div>}
        <label className="fieldset-label">Age</label>
        <input
          {...register("age", { required: true })}
          type="number"
          min={1}
          className="input"
          placeholder="Age"
          disabled={isPending}
        />
        {errors.age && <div>Age is required</div>}
        <label className="fieldset-label">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="input"
          placeholder="Email"
          disabled={isPending}
        />
        {errors.email && <div>Email is required</div>}
        <label className="fieldset-label">Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          className="input"
          placeholder="Password"
          disabled={isPending}
        />
        {errors.password && <div>Password is required</div>}
        <button
          className="btn btn-neutral mt-4"
          type="submit"
          disabled={isPending}
        >
          Submit
        </button>
        <div className="mt-2 text-md text-slate-500">
          <NavLink className="link" to={"/login"}>
            Already have an account?
          </NavLink>
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
