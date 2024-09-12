import React, { useContext } from 'react';
import { QuizContext } from '../../ContextQuiz';
import styles from "./quizResult.module.css";

export default function QuizResult() {
  const { quiz, answers, resetQuiz } = useContext(QuizContext);

  const score = answers.reduce((total, answer, index) => (answer === quiz[index].correctAnswerNumber ? total + 1 : total), 0);

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.title}>Quiz Results</h2>
      <p className={styles.score}>Your score: <span className={styles.scoreValue}>{score}/{quiz.length}</span></p>
      {quiz.map((q, i) => (
        <div key={i} className={styles.questionContainer}>
          <p className={styles.questionText}>Q - {q.questionText}</p>
          <p className={styles.answer}><strong>Your answer:</strong> {q.answerOptions[answers[i]]}</p>
          <p className={styles.correctAnswer}><strong>Correct answer:</strong> {q.answerOptions[q.correctAnswerNumber]}</p>
        </div>
      ))}
      <button className={styles.newQuizButton} onClick={resetQuiz}>Create New Quiz</button>
    </div>
  );
}


