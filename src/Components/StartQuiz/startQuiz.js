import React, { useContext, useState } from 'react';
import { QuizContext } from '../../ContextQuiz';
import QuizTaking from '../QuizTaking/QuizTaking';
import QuizResult from '../QuizResult/QuizResult';
import styles from "./startQuiz.module.css";

export default function StartQuiz() {
  const { timeUp, quizCompleted,} = useContext(QuizContext);
 // const [quizStarted, setQuizStarted] = useState(false); 

  if (quizCompleted) {
    return <QuizResult />;
  }

  if (timeUp) {
    return <div className={styles.resultDiv}>
             <h2 className={styles.warning}>Time's up!</h2>
             <QuizResult />
            </div>    
  }

  return (
    <div>
      {/* {!quizStarted ? ( // Check if quiz has started
        <button className={styles.startBtn} onClick={handleStartQuiz}>Start Quiz final</button>
      ) : ( */}
        <QuizTaking /> 
      {/* )} */}
    </div>
  );
}