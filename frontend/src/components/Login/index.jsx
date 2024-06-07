import SignupForm from "./SignupForm";
import Login from "./LoginForm";
import { useDispatch } from "react-redux";

import "./styles.scss";
import { loginRequest } from "../../redux/authSlice";

const UserAuth = () => {
  const dispatch = useDispatch();
  const onSignUpSubmit = (data) => {
    console.log("SignUp", data);
    // Handle login logic here
  };

  const onLoginSubmit = (data) => {
    console.log("login", data);
    dispatch(loginRequest(data));
  };

  return (
    <div>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <Login onSubmit={onLoginSubmit} />
        </div>

        <div className="signup">
          <SignupForm onSubmit={onSignUpSubmit} />
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
