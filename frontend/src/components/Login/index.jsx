import SignupForm from "./SignupForm";
import Login from "./LoginForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { loginRequest } from "../../redux/authSlice";

const UserAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSignUpSubmit = (data) => {
    console.log("SignUp", data);
    // Handle login logic here
  };

  const onLoginSubmit = (data) => {
    dispatch(loginRequest(data));
    console.log("$$$$$$$$$user true", user);
    // if (user.email) {
    //   navigate("/");
    // }
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
