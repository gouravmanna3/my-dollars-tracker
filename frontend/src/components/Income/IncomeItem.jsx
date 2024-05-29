import React from "react";
import { dateFormat } from "../../utils/dateFormat";
import { money, grocery, dollar, calender, comment } from "../../utils/Icons";
import Button from "../common/Button/Button";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
}) {
  console.log("type", type);

  return (
    <div className="income-item-container">
      <div className="icon">{type === "expense" ? grocery : money}</div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              className="delete-btn"
              icon={trash}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;
