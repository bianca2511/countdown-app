import React, { useState, useEffect } from "react";
import './App.css';  // Import the CSS file

const calculateTimeLeft = () => {
  const difference = +new Date(`07/05/2026`) - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return {};
};

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];
  for (let interval of Object.keys(timeLeft)) {
    // if (!timeLeft[interval]) {
    //   continue;
    // }

    timerComponents.push(
      <span key={interval} className="timer">
        {timeLeft[interval]} <span className="label">{interval}</span>
      </span>
    );
  }

  return (
    <div className="timer-container">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default App;
