import React, { useContext, useState } from 'react';
import { QuizContext } from '../../ContextQuiz';
import QuizTaking from '../QuizTaking/QuizTaking'; // Import QuizTaking
import QuizResult from '../QuizResult/QuizResult';
import styles from "./startQuiz.module.css";

export default function StartQuiz() {
  const { quiz, startQuiz, timeUp, quizCompleted, handleAnswersSubmit } = useContext(QuizContext);
  const [quizStarted, setQuizStarted] = useState(false); // State to track quiz start

  const handleStartQuiz = () => {
    setQuizStarted(true); 
    const selectedQuiz = quiz; 
    startQuiz(selectedQuiz, 60); 
  };

  if (quizCompleted) {
    return <QuizResult />;
  }

  if (timeUp) {
    return <div className={styles.resultDiv}>
             <h2 className={styles.warning}>Time's up! Here is Your Result.</h2>
             <QuizResult />
           </div>;
  }

  return (
    <div>
      {!quizStarted ? ( // Check if quiz has started
        <button className={styles.startBtn} onClick={handleStartQuiz}>Start New Quiz</button>
      ) : (
        <QuizTaking /> // Render QuizTaking component if quiz has started
      )}
    </div>
  );
}
