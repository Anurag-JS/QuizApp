import React, { useEffect, useState } from 'react';

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else if (onTimeUp) { // Check if onTimeUp is provided
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return <div>Time Left: {timeLeft}s</div>;
}
