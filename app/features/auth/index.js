import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Navigator from './routes';
import createSagas from './sagas';
import redux from './redux';

export const key = 'auth';

export const screens = {
  main: Navigator,
  login: LoginScreen,
  signup: SignupScreen,
};

export default {
  redux,
  key,
  screens,
  createSagas,
};
