import { takeLatest, call, put } from 'redux-saga/effects';
import { loginService, logoutService } from '@/services/authService';
import { loginRequest, loginSuccess, loginFailure,
         logoutRequest, logoutSuccess, logoutFailure } from '../slices/authSlice';

function* handleLogin({ payload }) {
  try {
    const data = yield call(loginService, payload);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

function* handleLogout() {
  try {
    yield call(logoutService);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure(err.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}
