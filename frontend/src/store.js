import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import incomeReducer from "./redux/incomeSlice";
import incomeSaga from "./redux/incomeSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    incomes: incomeReducer,
  },
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(incomeSaga);

export default store;
