import React, { useContext, useState } from 'react';
import { QuizContext } from '../../ContextQuiz';
import Timer from '../Timer/Timer';
import QuizTaking from '../QuizTaking/QuizTaking'; // Import QuizTaking
import QuizResult from '../QuizResult/QuizResult';

export default function StartQuiz() {
  const { quiz, timeLeft, startQuiz, timeUp, quizCompleted, handleAnswersSubmit } = useContext(QuizContext);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false); // State to track quiz start

  const handleStartQuiz = () => {
    setQuizStarted(true); // Set quiz as started
    const selectedQuiz = quiz; // Assuming we already have a quiz saved
    startQuiz(selectedQuiz, 60);  // Start quiz with a 60-second timer
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    handleAnswersSubmit(userAnswers);
  };

  if (quizCompleted) {
    return <QuizResult />;
  }

  if (timeUp) {
    return <h2>Time's up! Submit your quiz.</h2>;
  }

  return (
    <div>
      {!quizStarted ? ( // Check if quiz has started
        <button onClick={handleStartQuiz}>Start New Quiz</button>
      ) : (
        <QuizTaking /> // Render QuizTaking component if quiz has started
      )}
    </div>
  );
}
