import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../Income/Income.scss";
import {
  createExpenseRequest,
  deleteExpenseRequest,
  fetchExpenseRequest,
} from "../../redux/expenseSlice";
import { totalExpense } from "../../utils/utils";
import Form from "../Income/Form";
import IncomeItem from "../Income/IncomeItem";
import { TailSpin } from "react-loader-spinner";
import { expenseCategory } from "../../utils/menuItems";
import LoaderSpinner from "../common/LoaderSpinner/LoaderSpinner";

const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenseRequest());
  }, [dispatch]);

  const addExpense = (data) => {
    dispatch(createExpenseRequest(data));
  };

  const deleteExpense = (id) => {
    dispatch(deleteExpenseRequest(id));
  };
  return (
    <div className="income-container">
      {loading && <LoaderSpinner />}
      <div className="inner-layout">
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpense(expenses)}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form
              formSubmit={addExpense}
              btnName={"Add Expense"}
              categoryList={expenseCategory}
            />
          </div>
          <div className="incomes">
            {!expenses.length && <p>No expenses</p>}
            {expenses?.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
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
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
