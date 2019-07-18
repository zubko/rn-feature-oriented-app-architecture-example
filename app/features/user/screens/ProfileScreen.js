import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';

import auth from '@app/features/auth';

import Container from '@app/core/components/Container';
import SecondaryButton from '@app/core/components/SecondaryButton';
import Spacer from '@app/core/components/Spacer';
import { H2 } from '@app/core/components/Text';
import { Colors } from '@app/core/constants/Theme';

import ProfileImage from '../components/ProfileImage';
import { actionCreators } from '../redux';

const ProfileScreen = ({
  logout,
  score,
  quizCount,
  email,
  userDataRequest,
}) => {
  useEffect(() => {
    userDataRequest();
  }, []);
  return (
    <Container isSafeArea>
      <Spacer ratioOfFreeSpaceAtTop={0.3}>
        <ProfileImage />
        <FirstLine>{email}</FirstLine>
        <NextLine>Quizzes finished: {quizCount}</NextLine>
        <NextLine>Total score: {score}</NextLine>
        <LogoutButton onPress={logout} title="Logout" />
      </Spacer>
    </Container>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default connect(
  state => ({
    ...state.user,
  }),
  {
    logout: auth.redux.actionCreators.logout,
    userDataRequest: actionCreators.userDataRequest,
  }
)(ProfileScreen);

const FirstLine = styled(H2)`
  color: ${Colors.textSecondary};
  margin-top: 16px;
`;
const NextLine = styled(FirstLine)`
  margin-top: 8px;
`;
const LogoutButton = styled(SecondaryButton)`
  margin-top: 16px;
`;
