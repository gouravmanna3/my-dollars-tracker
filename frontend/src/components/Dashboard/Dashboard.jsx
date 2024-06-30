import { useDispatch, useSelector } from "react-redux";
import { FaDollarSign } from "react-icons/fa";
import Chart from "../common/Chart/Chart";
import { totalIncome, totalExpense, totalBalance } from "../../utils/utils";
import { useEffect } from "react";
import { fetchIncomeRequest } from "../../redux/incomeSlice";
import { fetchExpenseRequest } from "../../redux/expenseSlice";
import History from "./History/History";

import "./Dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { incomes } = useSelector((state) => state.incomes);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchIncomeRequest(user.id));
    dispatch(fetchExpenseRequest(user.id));
  }, [dispatch]);

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <div className="inner-layout">
      <h1>All Transactions</h1>
      <div className="stats-con">
        <div className="chart-con">
          <Chart />
          <div className="amount-con">
            <div className="income">
              <h3>Total Income</h3>
              <p>
                <FaDollarSign /> {totalIncome(incomes)}
              </p>
            </div>
            <div className="expense">
              <h3>Total Expense</h3>
              <p>
                <FaDollarSign /> {totalExpense(expenses)}
              </p>
            </div>
            <div className="balance">
              <h3>Total Balance</h3>
              <p>
                <FaDollarSign /> {totalBalance(incomes, expenses)}
              </p>
            </div>
          </div>
        </div>
        <div className="history-con">
          <History transactionHistory={transactionHistory} />
          <h2 className="salary-title">
            Min <span>Income</span>Max
          </h2>
          <div className="salary-item">
            <p>
              $
              {incomes.length
                ? Math.min(...incomes.map((item) => item.amount))
                : 0}
            </p>
            <p>
              $
              {incomes.length
                ? Math.max(...incomes.map((item) => item.amount))
                : 0}
            </p>
          </div>
          <h2 className="salary-title">
            Min <span>Expense</span>Max
          </h2>
          <div className="salary-item">
            <p>
              $
              {expenses.length
                ? Math.min(...expenses.map((item) => item.amount))
                : 0}
            </p>
            <p>
              $
              {expenses.length
                ? Math.max(...expenses.map((item) => item.amount))
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
