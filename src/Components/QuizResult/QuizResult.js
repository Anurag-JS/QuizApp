import React, { useContext } from 'react';
import { QuizContext } from '../../ContextQuiz';

export default function QuizResult() {
  const { quiz, answers } = useContext(QuizContext);

  const score = answers.reduce((total, answer, index) => (answer === quiz[index].correctAnswerNumber ? total + 1 : total), 0);

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score: {score}/{quiz.length}</p>
      {quiz.map((q, i) => (
        <div key={i}>
          <p>{q.questionText}</p>
          <p>Your answer: {q.answerOptions[answers[i]]}</p>
          <p>Correct answer: {q.answerOptions[q.correctAnswerNumber]}</p>
        </div>
      ))}
    </div>
  );
}


