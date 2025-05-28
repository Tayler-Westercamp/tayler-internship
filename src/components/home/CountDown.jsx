import React, { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [workingTime, setWorkingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        const remaining = getTimeRemaining(expiryDate);
        setWorkingTime(remaining);

        if (remaining.total <= 0) {
            clearInterval(interval)
        }
    }, 1000);

     return () => clearInterval(interval);
  }, [expiryDate]);

  if (workingTime.total <= 0) {
    return <div></div>;
  }

  return (
    <div>
      {String(workingTime.hours).padStart(2, "0")}:
      {String(workingTime.minutes).padStart(2, "0")}:
      {String(workingTime.seconds).padStart(2, "0")}
    </div>
  );
};

  const getTimeRemaining = (target) => {
    const now = Date.now();
    const total = target - now;

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(total / (1000 * 60 * 60));

    return { total, hours, minutes, seconds };
  };

export default CountDown;
