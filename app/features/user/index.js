import ProfileScreen from './screens/ProfileScreen';
import createSagas from './sagas';
import redux from './redux';

export const key = 'user';

export const screens = {
  profile: ProfileScreen,
};

export default {
  key,
  screens,
  createSagas,
  redux,
};
