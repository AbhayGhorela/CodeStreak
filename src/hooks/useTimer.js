import { useState, useEffect, useRef } from 'react';

/**
 * useTimer
 * Generic timer logic (Stopwatch or Countdown).
 * 
 * @param {number} initialSeconds 
 * @param {boolean} countUp - if true, counts up (Stopwatch). If false, counts down (Timer).
 */
export const useTimer = (initialSeconds = 0, countUp = true) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => countUp ? s + 1 : s - 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, countUp]);

  // Handle countdown finish
  useEffect(() => {
    if (!countUp && seconds <= 0 && isActive) {
        setIsActive(false);
        setSeconds(0);
    }
  }, [seconds, countUp, isActive]);

  const toggle = () => setIsActive(!isActive);
  const reset = (newVal = initialSeconds) => {
    setIsActive(false);
    setSeconds(newVal);
  };

  return { seconds, isActive, toggle, reset, setSeconds };
};
