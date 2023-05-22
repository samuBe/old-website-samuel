import React, { useState } from "react";
import { FaPlay, FaPause, FaFastForward, FaBackward } from "react-icons/fa";

const MediaControl = ({ setSpeed, isPaused, setIsPaused }) => {
  const [isFastForward, setIsFastForward] = useState(false);
  const [isBackward, setIsBackward] = useState(false);

  const handlePause = () => {
    setIsPaused(!isPaused); // Toggle pause
    console.log(isPaused);
  };

  const handleFastForward = () => {
    setIsFastForward(!isFastForward);
    setIsBackward(false);
    setSpeed(isFastForward ? 1 : 2); // If isFastForward is true, set speed to normal, else set to 2
  };

  const handleBack = () => {
    setIsBackward(!isBackward);
    setIsFastForward(false);
    setSpeed(isBackward ? 1 : -1); // If isBackward is true, set speed to normal, else set to -1
  };

  return (
    <div>
      <button onClick={handleBack}>
        <FaBackward color={isBackward ? "blue" : "black"} />
      </button>
      <button onClick={handlePause}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </button>
      <button onClick={handleFastForward}>
        <FaFastForward color={isFastForward ? "blue" : "black"} />
      </button>
    </div>
  );
};

export default MediaControl;
