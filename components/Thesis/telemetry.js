// Telemetry.tsx
import React, { useState } from "react";
import { Typography, Box, Collapse } from "@mui/material";
import MediaControl from "./MediaControl";
import DroneStates from "./DroneStates";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Reference from "./Reference";

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

  const format = (key, val) => {
    switch (key) {
      case "status":
        // status
        return null;
      case "t":
        // time
        return (
          <InlineMath key={key}>{`t: ${val.toFixed(2)}\\text{s}`}</InlineMath>
        );
      case "undefined":
        return null;
      case "drone":
        return <DroneStates key={key} title={key} states={val.states} />;
      case "leader":
        return <DroneStates key={key} title={key} states={val.states} />;
      case "reflector":
        return <DroneStates key={key} title={key} states={val.states} />;
      case "reference":
        return <Reference key={key} title={key} position={val} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.8)",
        padding: "6px",
        borderRadius: "4px",
        width: "12em",
      }}
    >
      <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={toggleMenu}>
        Telemetry
      </Typography>
      <Collapse in={isOpen} style={{ maxHeight: "100%" }}>
        <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
          <div>
            {Object.keys(current).map((key) => format(key, current[key]))}
          </div>
        </Box>
      </Collapse>
      <MediaControl
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setSpeed={setSpeed}
      />
    </Box>
  );
}
