export const totalIncome = (incomes) => {
  if (!incomes) return 0;
  return incomes.reduce((acc, curr) => {
    acc = acc + curr.amount;
    return acc;
  }, 0);
};
