import React from "react";
import { FaPlay, FaPause, FaFastForward, FaBackward } from "react-icons/fa";

const MediaControl = ({ setSpeed, isPaused, setIsPaused }) => {
  const handlePause = () => {
    setIsPaused(!isPaused); // Toggle pause
    console.log(isPaused);
  };

  const handleFastForward = () => {
    setSpeed(2); // Set speed to 2
  };

  const handleBack = () => {
    setSpeed(-1); // Set speed to -1
  };

  return (
    <div>
      <button onClick={handleBack}>
        <FaBackward />
      </button>
      <button onClick={handlePause}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </button>
      <button onClick={handleFastForward}>
        <FaFastForward />
      </button>
    </div>
  );
};

export default MediaControl;
