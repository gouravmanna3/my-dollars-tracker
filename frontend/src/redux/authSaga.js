import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "./authSlice";

function* handleLogin(action) {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}login`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}register`,
      action.payload
    );
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* handleLogout() {
  try {
    yield call(axios.post, `${BASE_URL}logout`);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.response.data.message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(logoutRequest.type, handleLogout);
}

export default watchLogin;
