import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

export default createAnimatedSwitchNavigator(
  {
    login: {
      screen: LoginScreen,
    },
    signup: {
      screen: SignupScreen,
    },
  },
  {
    initialRouteName: 'login',
  }
);
