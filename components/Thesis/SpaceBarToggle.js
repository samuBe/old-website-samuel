import React, { useEffect } from "react";

const SpacebarTogglePause = ({ setIsPaused }) => {
  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      togglePause();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <></>;
};

export default SpacebarTogglePause;
