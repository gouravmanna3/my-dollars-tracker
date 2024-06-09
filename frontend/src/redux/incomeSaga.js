import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchIncomeSuccess,
  fetchIncomeFailure,
  fetchIncomeRequest,
  createIncomeSuccess,
  createIncomeRequest,
  createIncomeFailure,
  deleteIncomeSuccess,
  deleteIncomeFailure,
  deleteIncomeRequest,
} from "./incomeSlice";
import { BASE_URL } from "../utils/utils";

function* fetchIncome() {
  try {
    const response = yield call(axios.get, `${BASE_URL}get-incomes`);
    yield put(fetchIncomeSuccess(response.data));
  } catch (err) {
    yield put(fetchIncomeFailure(err.message));
  }
}

function* createIncome(action) {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}add-income`,
      action.payload
    );
    console.log(response);
    yield put(createIncomeSuccess(response.data));
  } catch (error) {
    yield put(createIncomeFailure(error.message));
  }
}

function* deleteIncome(action) {
  try {
    yield call(axios.delete, `${BASE_URL}/delete-income/${action.payload}`);
    yield put(deleteIncomeSuccess(action.payload));
  } catch (error) {
    yield put(deleteIncomeFailure(error.message));
  }
}

function* incomeSaga() {
  yield takeEvery(fetchIncomeRequest.type, fetchIncome);
  yield takeEvery(createIncomeRequest.type, createIncome);
  yield takeEvery(deleteIncomeRequest.type, deleteIncome);
}

export default incomeSaga;