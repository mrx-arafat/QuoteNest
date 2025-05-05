import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "../../hooks/useWindowSize";

const Confetti = ({ active = false, duration = 3000, onComplete }) => {
  const [isActive, setIsActive] = useState(active);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setIsActive(active);

    if (active) {
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={[
        "#6d4ce3",
        "#5a3dd1",
        "#f7d353",
        "#f67280",
        "#4caf50",
        "#2196f3",
      ]}
      tweenDuration={5000}
    />
  );
};

export default Confetti;
