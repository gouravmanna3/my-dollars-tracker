import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import Login from "./LoginForm";
import { loginRequest, registerRequest } from "../../redux/authSlice";

import "./styles.scss";

const UserAuth = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered]);

  const onSignUpSubmit = (data) => {
    console.log("SignUp", data);
    dispatch(registerRequest(data));
    setIsRegistered(true);
  };

  const onLoginSubmit = (data) => {
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
