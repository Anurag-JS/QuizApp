import React, { useEffect, useState } from 'react';
import styles from './timer.module.css'; // Import your Timer-specific CSS module

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else if (onTimeUp) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className={styles.timerContainer}>
      <span className={styles.timerLabel}>Time Left:</span>
      <span className={styles.timerValue}>{timeLeft}s</span>
    </div>
  );
}
