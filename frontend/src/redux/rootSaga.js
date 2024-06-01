import { all } from "redux-saga/effects";
import incomeSaga from "./incomeSaga";
import expenseSaga from "./expenseSaga";

export default function* rootSaga() {
  yield all([incomeSaga(), expenseSaga()]);
}
