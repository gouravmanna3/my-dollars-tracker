import React from "react";

const Income = () => {
  const { addIncome } = useGlobalContext();
  return (
    <div className="income-container">
      <div className="income-layout">
        <h1>Incomes</h1>
        <div className="income-content">
          <div className="form-container">
            <div className="incomes"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
