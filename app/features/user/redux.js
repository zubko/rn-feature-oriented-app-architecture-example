import { createReducer, createActions } from 'reduxsauce';
import { mapAllToUndefined } from '@app/core/utils';
import { GlobalActionTypes } from '@app/core/store';

const { Types, Creators } = createActions(
  {
    rehydration: ['payload'],

    userDataRequest: ['payload'],
    userDataSuccess: ['payload'],
    userDataFailure: ['payload'],
  },
  { prefix: 'APP/USER/' }
);

export const actionTypes = Types;
export const actionCreators = Creators;

const INITIAL_STATE_PERSISTENT = {
  score: 0,
  quizCount: 0,
  email: '',
};

const INITIAL_STATE_TRANSIENT = {
  isUserDataActive: false,
  userDataError: null,
};

const INITIAL_STATE = {
  ...INITIAL_STATE_PERSISTENT,
  ...INITIAL_STATE_TRANSIENT,
};

export const selectors = {
  rehydration: state => ({
    ...state.user,
    ...mapAllToUndefined(INITIAL_STATE_TRANSIENT),
  }),
};

const rehydration = (state = INITIAL_STATE, { payload: { data } }) => ({
  ...state,
  ...data,
});

// const questionsRequest = (state = INITIAL_STATE) => {
//   return {
//     ...state,
//     mode: MODES.load,
//     questions: [],
//     questionsError: null,
//     isQuestionsRequestActive: true,
//   };
// };

const userDataSuccess = (state = INITIAL_STATE, { payload: { data } }) => {
  return {
    ...state,
    score: data.score || 0,
    quizCount: data.quizCount || 0,
    email: data.email || '',
    userDataError: null,
    isUserDataActive: false,
  };
};

const reset = () => {
  return INITIAL_STATE;
};

const HANDLERS = {
  [Types.REHYDRATION]: rehydration,
  [Types.USER_DATA_SUCCESS]: userDataSuccess,
  [GlobalActionTypes.RESET]: reset,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default { actionTypes, actionCreators, reducer, selectors };
