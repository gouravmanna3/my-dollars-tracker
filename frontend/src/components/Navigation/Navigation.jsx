import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../public/images/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { logoutRequest } from "../../redux/authSlice";

import "./Navigation.scss";

const Navigation = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <div className="user">
        <img src={avatar} alt="" />
        <div className="text">
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>
      <ul className="nav-menu-items">
        {menuItems.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className={`link ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <span onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
        </span>
      </div>
    </div>
  );
};

export default Navigation;
