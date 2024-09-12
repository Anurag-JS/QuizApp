import React from 'react';
import styles from './quizInstructions.module.css';

export default function QuizInstructions() {
  return (
    <div className={styles.instructionsContainer}>
      <h3 className={styles.title}>Quiz Instructions</h3>
      <ul className={styles.instructionsList}>
        <li>Read each question carefully before answering.</li>
        <li>You have 60 seconds for each questions to complete the quiz.</li>
        <li>Each question has four options; choose the correct one.</li>
        <li>No negative marking for incorrect answers.</li>
        <li>Once you submit the quiz, you cannot go back to change answers.</li>
        <li>You can only attempt the quiz once, so make sure you're prepared before starting.</li>
        <li>Your score will be displayed after completing the quiz.</li>
        <li>If you encounter any technical issues, please contact the support team immediately.</li>
      </ul>
    </div>
  );
}
