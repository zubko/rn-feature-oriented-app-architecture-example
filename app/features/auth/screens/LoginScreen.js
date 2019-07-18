import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';

import Container from '@app/core/components/Container';
import Spacer from '@app/core/components/Spacer';
import Navigation from '@app/core/services/Navigation';
import PrimaryButton from '@app/core/components/PrimaryButton';
import SecondaryButton from '@app/core/components/SecondaryButton';
import { H1 } from '@app/core/components/Text';
import ErrorMessage from '@app/core/components/ErrorMessage';

import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { actionCreators } from '../redux';

const LoginScreen = ({ lastEmail, loginRequest, isActive, error }) => {
  const [email, setEmail] = useState(lastEmail);
  const [password, setPassword] = useState('');

  const handleSwitchToSignupPress = () => {
    Navigation.navigate('signup');
  };
  const handleLoginPress = () => {
    loginRequest({ email, password });
  };
  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

  return (
    <Container isSafeArea>
      <Spacer ratioOfFreeSpaceAtTop={0.5}>
        <Title>Existing user</Title>
        <StyledErrorMessage error={error} />
        <EmailInput value={email} onChangeText={handleEmailChange} />
        <PasswordInput value={password} onChangeText={handlePasswordChange} />
        <SwitchScreenButton
          onPress={handleSwitchToSignupPress}
          title="Not registered yet?"
        />
        <LoginButton
          onPress={handleLoginPress}
          title="Login"
          disabled={isActive}
          isInProgress={isActive}
        />
      </Spacer>
    </Container>
  );
};

export default connect(
  state => ({
    lastEmail: state.auth.lastEmail || '',
    error: state.auth.loginError || '',
    isActive: state.auth.isLoginActive || false,
  }),
  {
    loginRequest: actionCreators.loginRequest,
  }
)(LoginScreen);

const Title = styled(H1)`
  margin-bottom: 32px;
`;
const StyledErrorMessage = styled(ErrorMessage)`
  margin-bottom: 4px;
`;
const SwitchScreenButton = styled(SecondaryButton)`
  margin-top: 16px;
`;
const LoginButton = styled(PrimaryButton)`
  margin-top: 16px;
`;
