import React, { useEffect } from 'react';

import Navigation from '@app/core/services/Navigation';
import {
  createStore,
  loadStoreData,
  createProviderComponent,
  GlobalActionTypes,
} from '@app/core/store';

import KeyValueStorage from '@app/core/store/KeyValueStorage';
import createUserApi from '@app/core/services/userApi';
import createQuestionsApi from '@app/core/services/questionsApi';

import auth from '@app/features/auth';
import dashboard from '@app/features/dashboard';
import main from '@app/features/main';
import home from '@app/features/home';
import user from '@app/features/user';
import quiz from '@app/features/quiz';
import AlertAsync from 'react-native-alert-async';

const allFeatures = [auth, dashboard, main, home, user, quiz];

const AppContainer = Navigation.createAppContainer(main.screens.main);

const moduleRegistry = {
  navigation: Navigation,
  keyValueStorage: KeyValueStorage,
  userApi: createUserApi(handleTokenExpired),
  questionsApi: createQuestionsApi(),
};

const store = createStore(allFeatures, moduleRegistry);
moduleRegistry.store = store;
const Provider = createProviderComponent(store);

function handleTokenExpired() {
  AlertAsync('Auth token expired', 'Sorry, login again please');
  moduleRegistry.store.reduxStore.dispatch({ type: GlobalActionTypes.LOGOUT });
}

export default () => {
  useEffect(() => {
    loadStoreData(store, sagasRegistry => {
      const state = store.reduxStore.getState();
      if (state.auth.token) {
        if (state.quiz.isActive) {
          Navigation.navigate('quiz');
        } else {
          Navigation.navigate('home');
        }
      } else if (state.auth.lastEmail) {
        Navigation.navigate('login');
      } else {
        Navigation.navigate('signup');
      }
      moduleRegistry.sagas = sagasRegistry;
    });
  }, []);
  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
};
