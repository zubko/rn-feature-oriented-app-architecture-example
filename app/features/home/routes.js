import { createStackNavigator } from 'react-navigation';

import dashboard from '@app/features/dashboard';
import user from '@app/features/user';
import quiz from '@app/features/quiz';

import { Colors } from '@app/core/constants/Theme';

const StackNavigator = createStackNavigator(
  {
    dashboard: {
      screen: dashboard.screens.main,
    },
    profile: {
      screen: user.screens.profile,
    },
  },
  {
    initialRouteName: 'dashboard',
    defaultNavigationOptions: {
      headerTintColor: Colors.main,
      headerTitleStyle: { color: 'black' },
    },
  }
);

const ModalNavigator = createStackNavigator(
  {
    main: {
      screen: StackNavigator,
    },
    quiz: {
      screen: quiz.screens.main,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'main',
  }
);

export default ModalNavigator;
