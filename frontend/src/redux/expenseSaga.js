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

function* fetchExpense(action) {
  const user_id = action.payload;

  try {
    const response = yield call(
      axios.get,
      `${BASE_URL}get-expenses/${user_id}`,
      {
        withCredentials: true,
      }
    );
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
      action.payload,
      {
        withCredentials: true,
      }
    );
    yield put(createExpenseSuccess(response.data));
    toast.success("Expense Added");
  } catch (error) {
    yield put(createExpenseFailure(error.message));
    toast.error("Failed to add Expense");
  }
}

function* deleteExpense(action) {
  try {
    yield call(axios.delete, `${BASE_URL}/delete-expense/${action.payload}`, {
      withCredentials: true,
    });
    yield put(deleteExpenseSuccess(action.payload));
    toast.success("Expense Deleted");
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
