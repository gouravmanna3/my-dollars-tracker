import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../public/images/avatar.png";
import { menuItems } from "../../utils/menuItems";

import "./Navigation.scss";

const Navigation = ({ active, setActive }) => {
  return (
    <div className="nav-container">
      <div className="user">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>Mike</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="nav-menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              className={active === item.id ? "active" : ""}
              onClick={() => setActive(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li>
          <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
        </li>
      </div>
    </div>
  );
};

export default Navigation;
