import React from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

import { NormalText, H1 } from '@app/core/components/Text';
import Spacer from '@app/core/components/Spacer';
import SecondaryButton from '@app/core/components/SecondaryButton';
import PrimaryButton from '@app/core/components/PrimaryButton';
import ErrorMessage from '@app/core/components/ErrorMessage';

import { Colors } from '@app/core/constants/Theme';
import { actionCreators } from '../redux';

const QuizResult = ({
  isSendResultsActive,
  quizCount,
  score,
  sendResultsError,
  sendResultsRequest,
  stopQuiz,
  totalScore,
}) => (
  <Container>
    <StyledSpacer>
      <Dialog>
        <Title>Quiz complete!</Title>
        {isSendResultsActive ? (
          <>
            <StyledIndicator />
            <StyledText>Sending results...</StyledText>
          </>
        ) : sendResultsError ? (
          <>
            <StyledText>Error while sending the result:</StyledText>
            <StyledErrorMessage error={sendResultsError} />
            <SecondaryButton title="Retry" onPress={sendResultsRequest} />
          </>
        ) : (
          <>
            <StyledFirstLine>Scored: {score}</StyledFirstLine>
            <StyledText>Your total score: {totalScore}</StyledText>
            <StyledText>Quizzes done: {quizCount}</StyledText>
            <StyledPrimaryButton title="Finish" onPress={stopQuiz} />
          </>
        )}
      </Dialog>
    </StyledSpacer>
  </Container>
);

export default connect(
  state => ({
    ...state.quiz,
    totalScore: state.user.score,
    quizCount: state.user.quizCount,
  }),
  {
    sendResultsRequest: actionCreators.sendResultsRequest,
    stopQuiz: actionCreators.stopQuiz,
  }
)(QuizResult);

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
const Title = styled(H1)``;
const StyledIndicator = styled(ActivityIndicator)`
  margin-top: 16px;
`;
StyledIndicator.defaultProps = {
  size: 'large',
};
const StyledText = styled(NormalText)`
  margin-top: 8px;
  color: ${Colors.textSecondary};
`;
const StyledFirstLine = styled(StyledText)`
  margin-top: 16px;
`;
const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 8px;
`;
const Dialog = styled(View)`
  padding: 24px;
  border-radius: 8px;
  align-items: center;
`;
const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 16px;
`;
