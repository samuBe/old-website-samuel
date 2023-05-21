// Telemetry.tsx
import React, { useState, useRef, useEffect } from "react";
import { Typography, Box, Collapse } from "@mui/material";
import MediaControl from "./MediaControl";

export default function Telemetry({
  current,
  isPaused,
  setSpeed,
  setIsPaused,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.8)",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={toggleMenu}>
        Telemetry
      </Typography>
      <Collapse in={isOpen}>
        <Typography variant="body1">{current.t}</Typography>
      </Collapse>
      <MediaControl
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setSpeed={setSpeed}
      />
    </Box>
  );
}
