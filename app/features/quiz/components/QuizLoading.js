import React from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

import { NormalText } from '@app/core/components/Text';
import Spacer from '@app/core/components/Spacer';
import SecondaryButton from '@app/core/components/SecondaryButton';
import ErrorMessage from '@app/core/components/ErrorMessage';

import { actionCreators } from '../redux';

const QuizLoading = ({ questionsError, questionsRequest }) => (
  <Container>
    <StyledSpacer>
      {questionsError ? (
        <>
          <NormalText>Error while downloading questions:</NormalText>
          <ErrorMessage error={questionsError} />
          <SecondaryButton title="Retry" onPress={questionsRequest} />
        </>
      ) : (
        <>
          <ActivityIndicator size="large" />
          <StyledText>Loading questions...</StyledText>
        </>
      )}
    </StyledSpacer>
  </Container>
);

export default connect(
  state => ({
    ...state.quiz,
  }),
  {
    questionsRequest: actionCreators.questionsRequest,
  }
)(QuizLoading);

const Container = styled(View)`
  flex: 1;
`;
const StyledSpacer = styled(Spacer)`
  align-items: center;
  justify-content: center;
`;
StyledSpacer.defaultProps = {
  ratioOfFreeSpaceAtTop: 0.66,
};
const StyledText = styled(NormalText)`
  margin-top: 8px;
`;
