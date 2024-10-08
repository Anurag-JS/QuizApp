import React, { useEffect, useState } from 'react';
import styles from './timer.module.css';

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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className={styles.timerContainer}>
      <span className={styles.timerLabel}>Time Left:</span>
      <span className={styles.timerValue}>{minutes}:{formattedSeconds}</span>
    </div>
  );
}
