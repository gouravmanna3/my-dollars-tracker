import { useForm } from "react-hook-form";

const SignupForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input
          type="text"
          id="username"
          placeholder="User name"
          {...register("username", { required: "Username is required" })}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: "Email is requied" })}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignupForm;
