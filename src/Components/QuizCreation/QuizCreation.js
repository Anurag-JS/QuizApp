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
    // Check if all inputs in the current questions are filled
    const allQuestionsFilled = quizQuestions.every(question =>
      question.questionText.trim() !== '' &&
      question.answerOptions.every(option => option.trim() !== '') &&
      question.correctAnswerNumber >= 1 &&
      question.correctAnswerNumber <= 4
    );

    if (!allQuestionsFilled) {
      alert("Please fill all fields for the current questions before adding a new one.");
      return;
    }

    setQuizQuestions([...quizQuestions, { questionText: '', answerOptions: ['', '', '', ''], correctAnswerNumber: 1 }]);
  };

  const handleQuestionDelete = (index) => {
    // Check if the form being deleted is not empty
    const isFormEmpty = quizQuestions[index].questionText.trim() === '' &&
      quizQuestions[index].answerOptions.every(option => option.trim() === '') &&
      (quizQuestions[index].correctAnswerNumber < 1 || quizQuestions[index].correctAnswerNumber > 4);

    if (isFormEmpty) {
      alert("Cannot delete an empty form. Please fill it out or cancel it.");
      return;
    }

    if (quizQuestions.length > 1) {
      const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
      setQuizQuestions(updatedQuestions);
      alert("Question deleted successfully.");
    } else {
      alert("You must have at least one question.");
    }
  };

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    const formattedQuizQuestions = quizQuestions.map((question) => ({
      ...question,
      correctAnswerNumber: question.correctAnswerNumber - 1,
    }));
    saveCreatedQuiz(formattedQuizQuestions);
    alert("Quiz saved successfully.");
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleQuizSubmit}>
        {quizQuestions.map((question, index) => (
          <div className={styles.questionContainer} key={index}>
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
            <label htmlFor={`correct-answer-${index}`} className={styles.correctAnswerLabel}><strong>Correct Answer (1-4)</strong></label>
            <input
              className={styles.correctAnswerInput}
              type="number"
              id={`correct-answer-${index}`}
              min="1"
              max="4"
              value={question.correctAnswerNumber}
              onChange={(e) => updateQuestionField(index, 'correctAnswerNumber', e.target.value)}
              required
            />
            <br></br>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleQuestionDelete(index)}
            >
              <strong>Delete Question</strong>
            </button>
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <button className={styles.button} type="button" onClick={addNewQuestion}>
            Add Another Question
          </button>
          <button className={styles.button} type="submit">Save Quiz</button>
        </div>
      </form>
    </div>
  );
}
