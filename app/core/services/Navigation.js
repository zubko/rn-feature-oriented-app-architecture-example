import React from 'react';

import {
  NavigationActions,
  createAppContainer as originalCreateAppContainer,
} from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function createAppContainer(screen) {
  const AppContainer = originalCreateAppContainer(screen);
  return () => (
    <AppContainer
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}

export default {
  createAppContainer,
  goBack,
  navigate,
  setTopLevelNavigator,
};
