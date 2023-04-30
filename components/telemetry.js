// Telemetry.tsx
import React, { useState, useRef, useEffect } from "react";
import { Typography, Box, Collapse } from "@mui/material";

export default function Telemetry({ drone, camera, animationTime }) {
  const [isOpen, setIsOpen] = useState(true);
  const [dronePosition, setDronePosition] = useState({ x: 0, y: 0, z: 0 });
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    setDronePosition(drone.current.position);
    setCameraAngle(camera.current.rotation);
  }, [drone, camera, animationTime]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
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
        <Typography variant="body1">
          Position: x: {dronePosition.x.toFixed(2)}, y:{" "}
          {dronePosition.y.toFixed(2)}, z: {dronePosition.z.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          Camera Angle: x: {cameraAngle.x.toFixed(2)}, y:{" "}
          {cameraAngle.y.toFixed(2)}, z: {cameraAngle.z.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          Animation Time: {animationTime.toFixed(2)}s
        </Typography>
      </Collapse>
    </Box>
  );
}
