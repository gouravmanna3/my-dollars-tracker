import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { loginFailure, loginRequest, loginSuccess } from "./authSlice";

function* handleLogin(action) {
  try {
    const response = yield call(axios.post, `${BASE_URL}login`, action.payload);

    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default watchLogin;
