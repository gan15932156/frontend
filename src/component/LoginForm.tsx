import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import api from "../api";
import useAuth from "../hook/useAuth";
import { NavLink } from "react-router";
const LoginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.accessToken);
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mx-auto fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>
        <label className="fieldset-label">Email</label>
        <input
          {...register("email")}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email && <span>Email is required</span>}
        <label className="fieldset-label">Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          className="input"
          placeholder="Password"
        />
        {errors.password && <span>Password is required</span>}
        <button className="btn btn-neutral mt-4" type="submit">
          Login
        </button>
        <div className="mt-2 text-md text-slate-500">
          <NavLink className="link" to={"/register"}>
            Already have an account
          </NavLink>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
