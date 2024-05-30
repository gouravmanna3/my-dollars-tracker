import React from "react";
import { dateFormat } from "../../utils/dateFormat";
import Button from "../common/Button/Button";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import "./IncomeItem.scss";

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
}) => {
  return (
    <div className="income-item-container">
      <div className="icon">
        {type === "expense" ? (
          <MdLocalGroceryStore />
        ) : (
          <FaMoneyBill size={40} />
        )}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              <FaDollarSign /> {amount}
            </p>
            <p>
              <FaCalendar /> {dateFormat(date)}
            </p>
            <p>
              <FaComment />
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              className="delete-btn"
              icon={<FaTrash fill="black" />}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeItem;
