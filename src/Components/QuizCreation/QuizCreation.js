import React, { useState, useContext } from 'react';
import { QuizContext } from '../../ContextQuiz';
import styles from "./quizCreation.module.css";

export default function QuizCreationForm() {
  const { saveCreatedQuiz } = useContext(QuizContext);
  const [quizQuestions, setQuizQuestions] = useState([{ questionText: '', answerOptions: ['', '', '', ''], correctAnswerNumber: 1 }]);

  const updateQuestionField = (questionIndex, fieldName, newValue) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex][fieldName] = newValue;
    setQuizQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setQuizQuestions([...quizQuestions, { questionText: '', answerOptions: ['', '', '', ''], correctAnswerNumber: 1 }]);
  };

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    const formattedQuizQuestions = quizQuestions.map((question) => ({
      ...question,
      correctAnswerNumber: question.correctAnswerNumber - 1,
    }));
    saveCreatedQuiz(formattedQuizQuestions);
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleQuizSubmit}>
        {quizQuestions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`}><h3>Question {index + 1}</h3></label>
            <input
              className={styles.inputField}
              type="text"
              id={`question-${index}`}
              placeholder="Enter the question"
              value={question.questionText}
              onChange={(e) => updateQuestionField(index, 'questionText', e.target.value)}
              required
            />

            {question.answerOptions.map((option, optionIndex) => (
              <div className={styles.options} key={optionIndex}>
                <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <input
                  className={styles.inputOpt}
                  type="text"
                  id={`option-${index}-${optionIndex}`}
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...question.answerOptions];
                    updatedOptions[optionIndex] = e.target.value;
                    updateQuestionField(index, 'answerOptions', updatedOptions);
                  }}
                  required
                />
              </div>
            ))}
            <br /><br />
            <label htmlFor={`correct-answer-${index}`}>Correct Answer (1-4)</label>
            <input
              className={styles.inputField}
              type="number"
              id={`correct-answer-${index}`}
              min="1"
              max="4"
              value={question.correctAnswerNumber}
              onChange={(e) => updateQuestionField(index, 'correctAnswerNumber', e.target.value)}
              required
            />
          </div>
        ))}
        <br />
        <button className={styles.button} type="button" onClick={addNewQuestion}>
          Add Another Question
        </button>
        <button className={styles.button} type="submit">Save Quiz</button>
      </form>
    </div>
  );
}
