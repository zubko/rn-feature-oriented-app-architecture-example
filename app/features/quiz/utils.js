import R from 'ramda';

import { shuffled, randomRange } from '@app/core/utils';

export const randomizedAnswers = question => {
  let answers = shuffled(question.incorrect_answers);
  const correctAnswerIndex = randomRange(0, answers.length + 1);
  answers = R.insert(correctAnswerIndex, question.correct_answer, answers);
  return { answers, correctAnswerIndex };
};

export const scoreForQuestion = question =>
  question.difficulty === 'hard' ? 3 : question.difficulty === 'medium' ? 2 : 1;
