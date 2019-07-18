import { createReducer, createActions } from 'reduxsauce';
import { mapAllToUndefined } from '@app/core/utils';
import { GlobalActionTypes } from '@app/core/store';

import { randomizedAnswers, scoreForQuestion } from './utils';

const { Types, Creators } = createActions(
  {
    rehydration: ['payload'],

    questionsRequest: ['payload'],
    questionsSuccess: ['payload'],
    questionsFailure: ['payload'],

    questionAnswered: ['payload'],

    sendResultsRequest: ['payload'],
    sendResultsSuccess: [],
    sendResultsFailure: ['payload'],

    stopQuiz: [],
    reset: [],
  },
  { prefix: 'APP/QUIZ/' }
);

export const actionTypes = Types;
export const actionCreators = Creators;

export const MODES = {
  load: 'MODE_LOAD',
  quiz: 'MODE_QUIZ',
  result: 'MODE_RESULT',
};

const INITIAL_STATE_PERSISTENT = {
  isActive: false,
  mode: MODES.load,
  questions: [],
  questionIndex: 0,
  score: 0,
  isSendResultsSuccess: false,
};

const INITIAL_STATE_TRANSIENT = {
  isQuestionsRequestActive: false,
  isSendResultsActive: false,
  questionsError: null,
  sendResultsError: null,
};

const INITIAL_STATE = {
  ...INITIAL_STATE_PERSISTENT,
  ...INITIAL_STATE_TRANSIENT,
};

export const selectors = {
  rehydration: state => ({
    ...state.quiz,
    ...mapAllToUndefined(INITIAL_STATE_TRANSIENT),
  }),
};

const rehydration = (state = INITIAL_STATE, { payload: { data } }) => ({
  ...state,
  ...data,
});

const questionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isActive: true,
    mode: MODES.load,
    questions: [],
    questionsError: null,
    isQuestionsRequestActive: true,
  };
};

const questionsSuccess = (
  state = INITIAL_STATE,
  { payload: { questions } }
) => {
  return {
    ...state,
    questions: questions.map(q => ({
      category: q.category,
      difficulty: q.difficulty,
      text: q.question,
      ...randomizedAnswers(q),
    })),
    mode: MODES.quiz,
    questionsError: null,
    isQuestionsRequestActive: false,
  };
};

const questionsFailure = (state = INITIAL_STATE, { payload: { error } }) => {
  return { ...state, questionsError: error, isQuestionsRequestActive: false };
};

const questionAnswered = (
  state = INITIAL_STATE,
  { payload: { firstTry } }
) => ({
  ...state,
  score:
    state.score +
    (firstTry ? scoreForQuestion(state.questions[state.questionIndex]) : 0),
  questionIndex: state.questionIndex + 1,
  mode:
    state.questionIndex < state.questions.length - 1
      ? MODES.quiz
      : MODES.result,
});

const sendResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    sendResultsError: null,
    isSendResultsActive: true,
  };
};

const sendResultsSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    sendResultsError: null,
    isSendResultsActive: false,
    isSendResultsSuccess: true,
  };
};

const sendResultsFailure = (state = INITIAL_STATE, { payload: { error } }) => {
  return { ...state, sendResultsError: error, isSendResultsActive: false };
};

const reset = () => {
  return INITIAL_STATE;
};

const HANDLERS = {
  [Types.REHYDRATION]: rehydration,
  [Types.QUESTIONS_REQUEST]: questionsRequest,
  [Types.QUESTIONS_SUCCESS]: questionsSuccess,
  [Types.QUESTIONS_FAILURE]: questionsFailure,
  [Types.QUESTION_ANSWERED]: questionAnswered,
  [Types.SEND_RESULTS_REQUEST]: sendResultsRequest,
  [Types.SEND_RESULTS_SUCCESS]: sendResultsSuccess,
  [Types.SEND_RESULTS_FAILURE]: sendResultsFailure,
  [Types.RESET]: reset,
  [GlobalActionTypes.RESET]: reset,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default { actionTypes, actionCreators, reducer, selectors, MODES };
