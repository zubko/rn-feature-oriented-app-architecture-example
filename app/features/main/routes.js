import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import auth from '@app/features/auth';
import home from '@app/features/home';

import LoadingScreen from './screens/LoadingScreen';

const AppNavigator = createAnimatedSwitchNavigator(
  {
    loading: {
      screen: LoadingScreen,
    },
    auth: {
      screen: auth.screens.main,
    },
    home: {
      screen: home.screens.main,
    },
  },
  {
    initialRouteName: 'loading',
  }
);

export default createAppContainer(AppNavigator);
