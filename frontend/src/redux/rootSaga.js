import { all } from "redux-saga/effects";
import incomeSaga from "./incomeSaga";
import expenseSaga from "./expenseSaga";
import watchLogin from "./authSaga";

export default function* rootSaga() {
  yield all([incomeSaga(), expenseSaga(), watchLogin()]);
}
