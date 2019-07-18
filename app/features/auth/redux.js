import { createReducer, createActions } from 'reduxsauce';
import { GlobalActionTypes } from '@app/core/store';

const { Types, Creators } = createActions(
  {
    rehydration: ['payload'],

    loginRequest: ['payload'],
    loginSuccess: ['payload'],
    loginFailure: ['payload'],

    signupRequest: ['payload'],
    signupSuccess: ['payload'],
    signupFailure: ['payload'],

    logout: [],
  },
  { prefix: 'APP/AUTH/' }
);

export const actionTypes = Types;
export const actionCreators = Creators;

const INITIAL_STATE = {
  token: '',
  userId: '',
  lastEmail: '',
  isLoginActive: false,
  isSignupActive: false,
  loginError: null,
  signupError: null,
};

export const selectors = {
  rehydration: state => ({
    ...state.auth,
    loginError: null,
    signupError: null,
    isLoginActive: false,
    isSignupActive: false,
  }),
};

const rehydration = (state = INITIAL_STATE, { payload: { data } }) => ({
  ...state,
  ...data,
});

const loginRequest = (state = INITIAL_STATE, { payload: { email } }) => {
  return { ...state, lastEmail: email, loginError: null, isLoginActive: true };
};

const loginSuccess = (
  state = INITIAL_STATE,
  { payload: { token, userId } }
) => {
  return {
    ...state,
    token,
    userId,
    loginError: null,
    isLoginActive: false,
  };
};

const loginFailure = (state = INITIAL_STATE, { payload: { error } }) => {
  return { ...state, loginError: error, isLoginActive: false };
};

const signupRequest = (state = INITIAL_STATE, { payload: { email } }) => {
  return {
    ...state,
    lastEmail: email,
    signupError: null,
    isSignupActive: true,
  };
};

const signupSuccess = (
  state = INITIAL_STATE,
  { payload: { token, userId } }
) => {
  return {
    ...state,
    token,
    userId,
    signupError: null,
    isSignupActive: false,
  };
};

const signupFailure = (state = INITIAL_STATE, { payload: { error } }) => {
  return { ...state, signupError: error, isSignupActive: false };
};

const logout = (state = INITIAL_STATE) => {
  return { ...INITIAL_STATE, lastEmail: state.lastEmail };
};

const reset = (state = INITIAL_STATE) => {
  return {
    ...INITIAL_STATE,
    lastEmail: state.lastEmail,
  };
};

const HANDLERS = {
  [Types.REHYDRATION]: rehydration,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.LOGOUT]: logout,
  [GlobalActionTypes.LOGOUT]: logout,
  [GlobalActionTypes.RESET]: reset,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default { actionTypes, actionCreators, reducer, selectors };
