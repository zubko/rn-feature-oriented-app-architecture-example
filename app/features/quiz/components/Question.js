import React, { useState } from 'react';
import { AllHtmlEntities } from 'html-entities';
import { View, Dimensions } from 'react-native';
import styled, { css } from '@emotion/native';

import { Colors } from '@app/core/constants/Theme';
import SecondaryButton from '@app/core/components/SecondaryButton';
import { H1, H2, SecondaryText } from '@app/core/components/Text';
import { getAsset } from '@app/core/assets';

const entities = new AllHtmlEntities();

export default ({ data, onAnswerPress }) => {
  const [errorAnswer, setErrorAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const handleAnswerPress = index => {
    if (index !== data.correctAnswerIndex) {
      setErrorAnswers(errorAnswer.concat(index));
    } else {
      setCorrectAnswer(data.correctAnswerIndex);
    }
    onAnswerPress(index);
  };
  return (
    <Container>
      <Category>{data.category}</Category>
      <Difficulty>({data.difficulty})</Difficulty>
      <Line />
      <QuestionText>{entities.decode(data.text)}</QuestionText>
      {data.answers.map((a, i) => {
        const answer = entities.decode(a);
        const title = `${String.fromCharCode(
          'A'.charCodeAt(0) + i
        )}. ${answer}`;
        const isError = errorAnswer.includes(i);
        const isCorrect = correctAnswer === i;
        return isError ? (
          <ErrorAnswerButton key={answer} title={answer} />
        ) : isCorrect ? (
          <CorrectAnswerButton key={answer} title={answer} />
        ) : (
          <AnswerButton
            key={a}
            title={title}
            onPress={() => handleAnswerPress(i)}
          />
        );
      })}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-self: stretch;
  align-items: center;
  padding: 16px 20px 0;
`;
const Category = styled(H1)`
  text-align: center;
`;
const Difficulty = styled(SecondaryText)`
  margin-top: 4px;
`;
const { width: screenWidth } = Dimensions.get('window');
const Line = styled(View)`
  width: ${Math.round(screenWidth * 0.6).toString()};
  height: 2;
  background-color: ${Colors.main};
  margin: 24px 0;
`;

const QuestionText = styled(H2)`
  color: ${Colors.textSecondary};
  align-self: stretch;
  margin-bottom: 24px;
`;
const AnswerButton = styled(SecondaryButton)`
  align-self: flex-start;
  min-height: 46;
`;
const ErrorAnswerButton = styled(AnswerButton)``;
ErrorAnswerButton.defaultProps = {
  icon: getAsset('error'),
  iconStyle: css`
    tint-color: red;
    margin-right: 8px;
    width: 30;
    height: 30;
  `,
  labelStyle: css`
    color: red;
  `,
};
const CorrectAnswerButton = styled(AnswerButton)``;
CorrectAnswerButton.defaultProps = {
  icon: getAsset('check'),
  iconStyle: css`
    tint-color: green;
    margin-right: 8px;
    width: 30;
    height: 30;
  `,
  labelStyle: css`
    color: green;
  `,
};
