import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../ContextQuiz';
import Timer from '../Timer/Timer';
import QuizResult from '../QuizResult/QuizResult';

export default function QuizTaking() {
  
  const { quiz, handleAnswersSubmit, showResults, timeLeft, handleTimeUp } = useContext(QuizContext);
  const [answers, setAnswers] = useState(Array(quiz ? quiz.length : 0).fill(null));

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    //console.log("before handleAnswersSubmit");
    await handleAnswersSubmit(answers); 
    //console.log("After handleAnswersSubmit");
  };

  // useEffect(() => {
  //   if (showResults) {
  //     console.log("Results are ready to be shown");
  //   }
  // }, [showResults]);

  if (showResults) {
    return <QuizResult />;
  }

  if (timeLeft === 0) {
    handleTimeUp();
    return <div>Time's up! Please submit your answers.</div>;
  }

  return (
    <div>
      <h2>Take Quiz</h2>
      {quiz && quiz.map((q, index) => (
        <div key={index}>
          <p>{q.questionText}</p>
          {q.answerOptions.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                onChange={() => handleAnswerChange(index, i)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
    </div>
  );
}
