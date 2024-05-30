import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import {
  fetchIncomeRequest,
  fetchIncomeSuccess,
  createIncomeRequest,
  deleteIncomeRequest,
} from "../../redux/incomeSlice";
import { totalIncome } from "../../utils/utils";
import IncomeItem from "./IncomeItem";

import "./Income.scss";

const Income = () => {
  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(fetchIncomeRequest());
  }, [dispatch]);

  const addIncome = (data) => {
    dispatch(createIncomeRequest(data));
  };

  const deleteIncome = (id) => {
    dispatch(deleteIncomeRequest(id));
  };

  return (
    <div className="income-container">
      <div className="inner-layout">
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome(incomes)}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form formSubmit={addIncome} />
          </div>
          <div className="incomes">
            {incomes?.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
