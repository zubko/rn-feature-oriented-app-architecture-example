import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Linking } from 'react-native';
import styled from '@emotion/native';

import Container from '@app/core/components/Container';
import { SecondaryText, NormalText } from '@app/core/components/Text';
import SecondaryButton from '@app/core/components/SecondaryButton';

import { actionCreators, MODES } from '../redux';
import Question from '../components/Question';
import QuizLoading from '../components/QuizLoading';
import QuizResult from '../components/QuizResult';

const QuizScreen = ({
  mode,
  isQuestionsRequestActive,
  isSendResultsActive,
  isSendResultsSuccess,
  questionsRequest,
  questionIndex,
  questions,
  questionAnswered,
  score,
  sendResultsRequest,
  stopQuiz,
}) => {
  useEffect(() => {
    if (mode === MODES.load && !isQuestionsRequestActive) {
      questionsRequest();
    } else if (
      mode === MODES.result &&
      !isSendResultsSuccess &&
      !isSendResultsActive
    ) {
      sendResultsRequest();
    }
  }, []);

  const [firstTry, setFirstTry] = useState(true);
  useEffect(() => {
    setFirstTry(true);
  }, [questionIndex]);

  const handleAnswerPress = index => {
    const question = questions[questionIndex];
    if (question.correctAnswerIndex === index) {
      setTimeout(() => {
        questionAnswered({ firstTry });
      }, 1000);
    } else {
      setFirstTry(false);
    }
  };

  const handleSourceLinkPress = () => {
    const url = 'https://opentdb.com';
    if (Linking.canOpenURL(url)) Linking.openURL(url);
  };

  return (
    <Container isSafeArea>
      <TopBar>
        <Score>{mode === MODES.quiz ? `Score: ${score}` : ''}</Score>
        <SecondaryButton onPress={stopQuiz} title="Exit" />
      </TopBar>
      {mode === MODES.load ? <QuizLoading /> : null}
      {mode === MODES.quiz ? (
        <>
          <Question
            key={questionIndex}
            data={questions[questionIndex]}
            onAnswerPress={handleAnswerPress}
          />
          <QuestionNumber>
            {questionIndex + 1} of {questions.length}
          </QuestionNumber>
        </>
      ) : null}
      {mode === MODES.result ? <QuizResult /> : null}
      <StyledQuestionSource onPress={handleSourceLinkPress}>
        Questions from: https://opentdb.com
      </StyledQuestionSource>
    </Container>
  );
};

export default connect(
  state => ({
    ...state.quiz,
  }),
  {
    questionsRequest: actionCreators.questionsRequest,
    questionAnswered: actionCreators.questionAnswered,
    stopQuiz: actionCreators.stopQuiz,
    sendResultsRequest: actionCreators.sendResultsRequest,
  }
)(QuizScreen);

const TopBar = styled(View)`
  padding: 8px 8px 0 16px;
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
`;
const QuestionNumber = styled(NormalText)`
  margin-bottom: 12px;
`;
const Score = styled(NormalText)`
  margin-top: 8px;
`;
const StyledQuestionSource = styled(SecondaryText)`
  margin-bottom: 4px;
`;
