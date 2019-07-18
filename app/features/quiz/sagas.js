/* eslint-disable no-console */
import {
  takeLatest,
  call,
  select,
  put,
  spawn,
  delay,
} from 'redux-saga/effects';
import AlertAsync from 'react-native-alert-async';

import { saveStoreData, GlobalActionTypes } from '@app/core/store';
import { getQuestions } from '@app/core/services/questionsApi';

import { actionTypes, selectors, actionCreators, MODES } from './redux';
import { QUIZ_QUESTIONS_COUNT } from './constants';

const STORAGE_KEY = 'app/quiz';

function* createSagas(modules) {
  function* questionsRequest() {
    try {
      const response = yield call(
        getQuestions,
        modules.questionsApi,
        QUIZ_QUESTIONS_COUNT
      );
      const isQuizActive = yield select(store => store.quiz.isActive);
      if (!isQuizActive) {
        return;
      }
      if (response.ok && response.data) {
        const code = response.data.response_code;
        if (code === 0) {
          yield put(
            actionCreators.questionsSuccess({
              questions: response.data.results,
            })
          );
        } else {
          throw Error(`Unhandled API response code: ${code}`);
        }
        yield spawn(saveStoreData, modules.store);
      } else {
        throw Error(response.problem || 'UNKNOWN_ERROR');
      }
    } catch (error) {
      yield put(actionCreators.questionsFailure({ error }));
      console.warn(`Questions error: ${error}`);
    }
  }

  function* questionAnswered() {
    yield spawn(saveStoreData, modules.store);
    const state = yield select(store => store.quiz);
    if (state.questionIndex === state.questions.length) {
      yield put(actionCreators.sendResultsRequest());
    }
  }

  function* sendResultsRequest() {
    try {
      const state = yield select(store => store.quiz);
      yield call(modules.sagas.user.increaseQuizStats, {
        score: state.score,
        quizCount: 1,
      });
      const isQuizActive = yield select(store => store.quiz.isActive);
      if (!isQuizActive) {
        return;
      }
      yield put(actionCreators.sendResultsSuccess());
      yield spawn(saveStoreData, modules.store);
    } catch (error) {
      yield put(actionCreators.sendResultsFailure({ error }));
      console.warn('Send results error:', error);
    }
  }

  function* stopQuiz() {
    const state = yield select(store => store.quiz);
    let doStop = state.isSendResultsSuccess || state.mode === MODES.load;
    if (!doStop) {
      doStop = yield call(
        AlertAsync,
        'Are you sure?',
        'Your scores will be lost',
        [
          { text: 'Yes', onPress: () => true },
          { text: 'No', onPress: () => false },
        ],
        {
          cancelable: true,
          onDismiss: () => false,
        }
      );
    }
    if (doStop) {
      yield call(modules.navigation.goBack);
      yield delay(500); // to wait navigation animation
      yield put(actionCreators.reset());
      yield spawn(saveStoreData, modules.store);
    }
  }

  function* saveData() {
    try {
      const data = yield select(selectors.rehydration);
      yield call(modules.keyValueStorage.set, STORAGE_KEY, data);
    } catch (e) {
      console.warn(`Can't save quiz: ${e}`);
    }
  }

  function* loadData() {
    try {
      const data = yield call(modules.keyValueStorage.get, STORAGE_KEY) || {};
      yield put(actionCreators.rehydration({ data }));
    } catch (e) {
      console.warn(`Can't load quiz: ${e}`);
    }
  }

  function* reset() {
    try {
      yield call(modules.keyValueStorage.remove, STORAGE_KEY);
    } catch (e) {
      console.warn(`Can't reset quiz: ${e}`);
    }
  }

  yield call(loadData);
  function* main() {
    yield takeLatest(actionTypes.QUESTIONS_REQUEST, questionsRequest);
    yield takeLatest(actionTypes.QUESTION_ANSWERED, questionAnswered);
    yield takeLatest(actionTypes.SEND_RESULTS_REQUEST, sendResultsRequest);
    yield takeLatest(actionTypes.STOP_QUIZ, stopQuiz);
    yield takeLatest(GlobalActionTypes.SAVE_DATA, saveData);
    yield takeLatest(GlobalActionTypes.RESET, reset);
  }
  return { main };
}

export default createSagas;
