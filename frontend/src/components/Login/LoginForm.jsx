import { useForm } from "react-hook-form";

const Login = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="chk" aria-hidden="true">
        Login
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
