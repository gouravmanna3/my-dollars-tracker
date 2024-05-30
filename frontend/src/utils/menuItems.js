import {
  faHouse,
  faCreditCard,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: faHouse,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: faCreditCard,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Incomes",
    icon: faMoneyBillTrendUp,
    link: "/incomes",
  },
  {
    id: 4,
    title: "Expenses",
    icon: faMoneyBillTransfer,
    link: "/dashboard",
  },
];

export const categoryList = [
  {
    title: "Salary",
    value: "salary",
  },
  {
    title: "Freelancing",
    value: "freelancing",
  },
  {
    title: "Investments",
    value: "investments",
  },
  {
    title: "Stocks",
    value: "stocks",
  },
  {
    title: "Bank Transfer",
    value: "bank",
  },
];
