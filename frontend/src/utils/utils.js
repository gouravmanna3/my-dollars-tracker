export const BASE_URL = "http://localhost:5000/api/v1/";

export const totalIncome = (incomes) => {
  if (!incomes) return 0;
  return incomes.reduce((acc, curr) => {
    acc = acc + curr.amount;
    return acc;
  }, 0);
};

export const totalExpense = (expenses) => {
  if (!expenses) return 0;
  return expenses.reduce((acc, curr) => {
    acc = acc + curr.amount;
    return acc;
  }, 0);
};
