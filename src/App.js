import React, { useContext, useState } from 'react';
import QuizCreationForm from "./Components/QuizCreation/QuizCreation";
import StartQuiz from './Components/StartQuiz/startQuiz';
import { QuizContext } from './ContextQuiz';
import styles from "./styles.module.css"
import QuizInstructions from './Components/quizInstruction/QuizInstruction';

export default function App() {
  const { createdQuizzes, quiz, startQuiz } = useContext(QuizContext);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(true);
  const [isQuizCreated, setIsQuizCreated] = useState(false); 

  const handleQuizCreationComplete = () => {
    if (createdQuizzes.length > 0) {
      setIsQuizCreated(true); 
      setIsCreatingQuiz(false);
    } else {
      alert("Please create and save a quiz before starting!"); 
    }
  };

  const handleStartQuiz = () => {
    if (createdQuizzes.length > 0) {
      const lastCreatedQuiz = createdQuizzes[createdQuizzes.length - 1];
      startQuiz(lastCreatedQuiz, 60 * createdQuizzes.length);
    }
  };

  return (
    <div>
      {isCreatingQuiz ? (
        <div>
          <QuizCreationForm />
          <button
            className={styles.completeBtn}
            onClick={handleQuizCreationComplete}
          >
            <strong>Start Quiz</strong>
          </button>
        </div>
      ) : (
        <div>
          {!quiz ? (
            <>
            <button className={styles.startBtn} onClick={handleStartQuiz}>
              Start Quiz
            </button>
            <br></br>
            <QuizInstructions />
            </>
          ) : (
            <StartQuiz />
          )}
        </div>
      )}
    </div>
  );
}