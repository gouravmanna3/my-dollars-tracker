import React from "react";

import "./History.scss";

const History = ({ transactionHistory }) => {
  const [...history] = transactionHistory();
  return (
    <div className="history-container">
      <h3>Recent History</h3>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === "expense" ? "red" : "#42AD00",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === "expense" ? "red" : "#42AD00",
              }}
            >
              {type === "expense"
                ? `-${amount <= 0 ? 0 : amount}`
                : `+${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default History;
