import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import incomeReducer from "./redux/incomeSlice";
import expenseReducer from "./redux/expenseSlice";
import authReducer from "./redux/authSlice";
import rootSaga from "./redux/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    incomes: incomeReducer,
    expenses: expenseReducer,
    auth: authReducer,
  },
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
