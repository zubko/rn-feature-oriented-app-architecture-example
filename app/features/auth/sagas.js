/* eslint-disable no-console */
import { takeLatest, call, select, put, spawn } from 'redux-saga/effects';
import { saveStoreData, GlobalActionTypes } from '@app/core/store';
import {
  login,
  signup,
  setToken,
  parseToken,
} from '@app/core/services/userApi';

import { actionTypes, selectors, actionCreators } from './redux';

const STORAGE_KEY = 'app/auth';

function* createSagas(modules) {
  function* loginRequest({ payload: { email, password } }) {
    try {
      const response = yield call(login, modules.userApi, email, password);
      if (response.ok) {
        yield call(commonSignupOrLogin, {
          response,
          successActionCreator: actionCreators.loginSuccess,
        });
      } else {
        yield put(
          actionCreators.loginFailure({
            error: response.data || response.problem || 'UNKNOWN_ERROR',
          })
        );
      }
    } catch (error) {
      yield put(actionCreators.loginFailure({ error }));
      console.warn(`Login error: ${error}`);
    }
  }

  function* signupRequest({ payload: { email, password } }) {
    try {
      const response = yield call(signup, modules.userApi, email, password);
      if (response.ok) {
        yield call(commonSignupOrLogin, {
          response,
          successActionCreator: actionCreators.signupSuccess,
        });
      } else {
        yield put(
          actionCreators.signupFailure({
            error: response.data || response.problem || 'UNKNOWN_ERROR',
          })
        );
      }
    } catch (error) {
      yield put(actionCreators.signupFailure({ error }));
      console.warn(`Signup error: ${error}`);
    }
  }

  function* commonSignupOrLogin({ response, successActionCreator }) {
    const token = response.data.accessToken;
    yield call(setToken, modules.userApi, token);
    const tokenData = yield call(parseToken, token);
    const userData = yield call(modules.sagas.user.userDataRequest, {
      userId: tokenData.userId,
    });
    if (userData) {
      yield put(successActionCreator({ token, ...tokenData }));
      modules.navigation.navigate('home');
      yield spawn(saveStoreData, modules.store);
    } else {
      throw Error('CANT_GET_USER_DATA');
    }
  }

  function* logout() {
    modules.navigation.navigate('auth');
    yield put({ type: GlobalActionTypes.RESET });
    yield spawn(saveStoreData, modules.store);
  }

  function* saveData() {
    try {
      const data = yield select(selectors.rehydration);
      yield call(modules.keyValueStorage.set, STORAGE_KEY, data);
    } catch (e) {
      console.warn(`Can't save auth: ${e}`);
    }
  }

  function* loadData() {
    try {
      const data = yield call(modules.keyValueStorage.get, STORAGE_KEY) || {};
      yield put(actionCreators.rehydration({ data }));
      if (data.token) {
        yield call(setToken, modules.userApi, data.token);
      }
    } catch (e) {
      console.warn(`Can't load auth: ${e}`);
    }
  }

  function* reset() {
    try {
      yield call(modules.keyValueStorage.remove, STORAGE_KEY);
    } catch (e) {
      console.warn(`Can't reset auth: ${e}`);
    }
  }

  yield call(loadData);
  function* main() {
    yield takeLatest(actionTypes.LOGIN_REQUEST, loginRequest);
    yield takeLatest(actionTypes.SIGNUP_REQUEST, signupRequest);
    yield takeLatest(actionTypes.LOGOUT, logout);
    yield takeLatest(GlobalActionTypes.LOGOUT, logout);
    yield takeLatest(GlobalActionTypes.SAVE_DATA, saveData);
    yield takeLatest(GlobalActionTypes.RESET, reset);
  }
  return { main };
}

export default createSagas;
