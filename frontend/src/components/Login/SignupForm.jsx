import { useForm } from "react-hook-form";

const SignupForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegisterSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input
          type="text"
          id="fullName"
          placeholder="Full Name"
          {...register("fullName", { required: "Name is required" })}
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
