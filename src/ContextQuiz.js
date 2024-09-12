import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const saveCreatedQuiz = (quizData) => {
    setCreatedQuizzes([...createdQuizzes, quizData]);
    console.log('Quiz saved:', quizData);
  };

  const handleQuizSubmit = (quizData) => setQuiz(quizData);

  const handleAnswersSubmit = (userAnswers) => {
    console.log('handleAnswersSubmit called');
    console.log('Answers submitted in context:', userAnswers);
    setAnswers(userAnswers);
    if (quiz && userAnswers.length === quiz.length) {
      setShowResults(true);
      //console.log("setShowResult setting true", showResults)
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuiz([]);
    setAnswers([]);
    window.location.reload();
    //alert("Quiz Reset, Please Refresh the page to start");
  };

  const startQuiz = (quizData, duration) => {
    setQuiz(quizData);
    setTimeLeft(duration);
    setTimeUp(false);
    setShowResults(false);
  };

  return (
    <QuizContext.Provider value={{
      quiz, answers, timeUp, createdQuizzes, timeLeft, showResults,
      handleQuizSubmit, handleAnswersSubmit, handleTimeUp,
      saveCreatedQuiz, startQuiz, resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};
