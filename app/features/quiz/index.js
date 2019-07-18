import QuizScreen from './screens/QuizScreen';
import createSagas from './sagas';
import redux from './redux';

export const key = 'quiz';

export const screens = {
  main: QuizScreen,
};

export default {
  key,
  screens,
  createSagas,
  redux,
};
