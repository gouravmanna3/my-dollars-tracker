import { useForm } from "react-hook-form";

const Login = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLoginSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
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
