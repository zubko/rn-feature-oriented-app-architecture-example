import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';

import Container from '@app/core/components/Container';
import Spacer from '@app/core/components/Spacer';
import PrimaryButton from '@app/core/components/PrimaryButton';
import SecondaryButton from '@app/core/components/SecondaryButton';
import Navigation from '@app/core/services/Navigation';
import { H1 } from '@app/core/components/Text';
import ErrorMessage from '@app/core/components/ErrorMessage';

import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { actionCreators } from '../redux';

const SignupScreen = ({ signupRequest, error, isActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleSignupPress = () => {
    signupRequest({ email, password });
  };
  const handleSwitchToLogin = () => {
    Navigation.navigate('login');
  };

  return (
    <Container isSafeArea>
      <Spacer ratioOfFreeSpaceAtTop={0.5}>
        <Title>Registration</Title>
        <StyledErrorMessage error={error} />
        <EmailInput value={email} onChangeText={handleEmailChange} />
        <PasswordInput value={password} onChangeText={handlePasswordChange} />
        <SwitchScreenButton
          onPress={handleSwitchToLogin}
          title="Already registered?"
        />
        <SignupButton
          onPress={handleSignupPress}
          title="Signup"
          disabled={false}
          isInProgress={isActive}
        />
      </Spacer>
    </Container>
  );
};

export default connect(
  state => ({
    error: state.auth.signupError || '',
    isActive: state.auth.isSignupActive || false,
  }),
  {
    signupRequest: actionCreators.signupRequest,
  }
)(SignupScreen);

const Title = styled(H1)`
  margin-bottom: 32px;
`;
const StyledErrorMessage = styled(ErrorMessage)`
  margin-bottom: 4px;
`;
const SwitchScreenButton = styled(SecondaryButton)`
  margin-top: 16px;
`;
const SignupButton = styled(PrimaryButton)`
  margin-top: 16px;
`;
