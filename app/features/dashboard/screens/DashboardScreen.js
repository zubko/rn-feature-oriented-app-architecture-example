import * as React from 'react';

import Container from '@app/core/components/Container';
import Navigation from '@app/core/services/Navigation';
import { getAsset } from '@app/core/assets';
import Spacer from '@app/core/components/Spacer';
import HeaderButton from '@app/core/components/HeaderButton';

import StartButton from '../components/StartButton';

const DashboardScreen = () => {
  const handleStartQuiz = () => {
    Navigation.navigate('quiz');
  };
  return (
    <Container isSafeArea>
      <Spacer ratioOfFreeSpaceAtTop={1.33}>
        <StartButton onPress={handleStartQuiz} title="Start" />
      </Spacer>
    </Container>
  );
};

const handleShowProfile = () => {
  Navigation.navigate('profile');
};

DashboardScreen.navigationOptions = {
  title: 'Welcome',
  headerRight: (
    <HeaderButton
      onPress={handleShowProfile}
      source={getAsset('user')}
      style={{ padding: 4 }}
    />
  ),
};

export default DashboardScreen;
