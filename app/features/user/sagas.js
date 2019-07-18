/* eslint-disable no-console */
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { GlobalActionTypes } from '@app/core/store';
import { getUser, patchUser } from './api';

import { actionTypes, selectors, actionCreators } from './redux';

const STORAGE_KEY = 'app/user';

function* createSagas(modules) {
  function* userDataRequest({ userId } = {}) {
    try {
      const id = userId || (yield select(store => store.auth)).userId;
      const response = yield call(getUser, modules.userApi, id);
      if (!response.ok) {
        throw Error(response.problem || 'UNKNOWN_ERROR');
      }
      yield put(actionCreators.userDataSuccess({ data: response.data }));
      return response.data;
    } catch (error) {
      yield put(actionCreators.userDataFailure({ error }));
      console.warn(`User data error: ${error}`);
      return null;
    }
  }

  function* fetchUserData({ userId } = {}) {
    let id = userId;
    if (!id) {
      const authState = yield select(store => store.auth);
      id = authState.userId;
    }
    const response = yield call(getUser, modules.userApi, id);
    if (!response.ok) {
      throw Error(response.problem || 'UNKNOWN_ERROR');
    }
    return response.data;
  }

  function* increaseQuizStats({ score, quizCount }) {
    const recent = yield call(fetchUserData);
    const update = {
      score: (recent.score || 0) + score,
      quizCount: (recent.quizCount || 0) + quizCount,
    };
    const response = yield call(patchUser, modules.userApi, recent.id, update);
    if (!response.ok) {
      throw Error(response.problem || 'UNKNOWN_ERROR');
    }
    yield put(actionCreators.userDataSuccess({ data: response.data }));
    return update;
  }

  function* saveData() {
    try {
      const data = yield select(selectors.rehydration);
      yield call(modules.keyValueStorage.set, STORAGE_KEY, data);
    } catch (e) {
      console.warn(`Can't save user: ${e}`);
    }
  }

  function* loadData() {
    try {
      const data = yield call(modules.keyValueStorage.get, STORAGE_KEY) || {};
      yield put(actionCreators.rehydration({ data }));
    } catch (e) {
      console.warn(`Can't load user: ${e}`);
    }
  }

  function* reset() {
    try {
      yield call(modules.keyValueStorage.remove, STORAGE_KEY);
    } catch (e) {
      console.warn(`Can't reset user: ${e}`);
    }
  }

  yield call(loadData);
  function* main() {
    yield takeLatest(actionTypes.USER_DATA_REQUEST, userDataRequest);
    yield takeLatest(GlobalActionTypes.SAVE_DATA, saveData);
    yield takeLatest(GlobalActionTypes.RESET, reset);
  }
  return { main, userDataRequest, increaseQuizStats };
}

export default createSagas;
