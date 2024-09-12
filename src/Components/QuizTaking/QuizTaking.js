import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../ContextQuiz';
import Timer from '../Timer/Timer';
import QuizResult from '../QuizResult/QuizResult';
import styles from './quizTaking.module.css'; // Import your CSS module

export default function QuizTaking() {
  const { quiz, handleAnswersSubmit, showResults, timeLeft, handleTimeUp } = useContext(QuizContext);
  const [answers, setAnswers] = useState(Array(quiz ? quiz.length : 0).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    await handleAnswersSubmit(answers);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (showResults) {
    return <QuizResult />;
  }

  if (timeLeft === 0) {
    handleTimeUp();
    return <div>Time's up! Please submit your answers.</div>;
  }

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizHeading}>Quiz Started</h2>
      {quiz && (
        <div className={styles.questionContainer}>
          <p className={styles.questionText}>{quiz[currentQuestionIndex].questionText}</p>
          <div className={styles.optionsContainer}>
            {quiz[currentQuestionIndex].answerOptions.map((option, i) => (
              <label key={i} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  onChange={() => handleAnswerChange(currentQuestionIndex, i)}
                />
                <span className={styles.optionText}>{option}</span>
              </label>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {currentQuestionIndex < quiz.length - 1 ? (
              <button className={styles.nextButton} onClick={goToNextQuestion}>
                Next
              </button>
            ) : (
              <button className={styles.submitButton} onClick={handleSubmit}>
                Submit Answers
              </button>
            )}
          </div>
        </div>
      )}
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
    </div>
  );
}
