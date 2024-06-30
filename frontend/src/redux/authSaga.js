import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
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
  checkToken,
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
    toast.success("Login successful!");
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
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
    toast.success("Registration successful! Please login.");
  } catch (error) {
    yield put(registerFailure(error.message));
    toast.error("Registration failed. Please try again.");
  }
}

function* handleLogout() {
  try {
    yield call(axios.post, `${BASE_URL}logout`, { withCredentials: true });
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.response.data.message));
  }
}

function* handleCheckToken() {
  try {
    const response = yield call(axios.get, `${BASE_URL}verify-token`, {
      withCredentials: true,
    });
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkToken.type, handleCheckToken);
}

export default watchLogin;
