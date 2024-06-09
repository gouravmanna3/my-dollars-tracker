import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchExpenseSuccess,
  fetchExpenseFailure,
  fetchExpenseRequest,
  createExpenseSuccess,
  createExpenseRequest,
  createExpenseFailure,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  deleteExpenseRequest,
} from "./expenseSlice";
import { BASE_URL } from "../utils/utils";

function* fetchExpense() {
  try {
    const response = yield call(axios.get, `${BASE_URL}get-expenses`);
    yield put(fetchExpenseSuccess(response.data));
  } catch (err) {
    yield put(fetchExpenseFailure(err.message));
  }
}

function* createExpense(action) {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}add-expense`,
      action.payload
    );
    yield put(createExpenseSuccess(response.data));
  } catch (error) {
    yield put(createExpenseFailure(error.message));
  }
}

function* deleteExpense(action) {
  try {
    yield call(axios.delete, `${BASE_URL}/delete-expense/${action.payload}`);
    yield put(deleteExpenseSuccess(action.payload));
  } catch (error) {
    yield put(deleteExpenseFailure(error.message));
  }
}

function* expenseSaga() {
  yield takeEvery(fetchExpenseRequest.type, fetchExpense);
  yield takeEvery(createExpenseRequest.type, createExpense);
  yield takeEvery(deleteExpenseRequest.type, deleteExpense);
}

export default expenseSaga;
