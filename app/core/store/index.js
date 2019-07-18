import React from 'react';
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose as reduxCompose,
} from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import createRootSaga from './createRootSaga';
import createRootReducer from './createRootReducer';
import ActionTypes from './ActionTypes';

export const GlobalActionTypes = ActionTypes;

export function createStore(features, modules) {
  const middlewares = [];
  if (__DEV__ && window) {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  const reducer = createRootReducer(features);

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  // eslint-disable-next-line no-underscore-dangle
  const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;

  const reduxStore = createReduxStore(
    reducer,
    {},
    compose(applyMiddleware(...middlewares))
  );

  return {
    modules,
    reduxStore,
    runSagas: onDataLoaded => {
      const rootSaga = createRootSaga(features, modules, onDataLoaded);
      sagaMiddleware.run(rootSaga);
    },
  };
}

export function loadStoreData(store, handler) {
  store.runSagas(handler);
}

export function createProviderComponent(store) {
  return ({ children }) => {
    return <ReduxProvider store={store.reduxStore}>{children}</ReduxProvider>;
  };
}

export function saveStoreData(store) {
  store.reduxStore.dispatch({ type: ActionTypes.SAVE_DATA });
}

export default {
  GlobalActionTypes,
  createStore,
  createProviderComponent,
  loadStoreData,
  saveStoreData,
};
