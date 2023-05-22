import { Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function DroneStates({ title, states }) {
  const [collapse, setCollapse] = useState(true);
  console.log(states);

  const toggleMenu = () => setCollapse(!collapse);

  const names = [
    "x",
    "y",
    "z",
    "v_x",
    "v_y",
    "v_z",
    "\\phi",
    "\\theta",
    "\\psi",
    "\\omega_x",
    "\\omega_y",
    "\\omega_z",
  ];
  const units = [
    "m",
    "m",
    "m",
    "m/s",
    "m/s",
    "m/s",
    "rad",
    "rad",
    "rad",
    "rad/s",
    "rad/s",
    "rad/s",
  ];
  return (
    <div>
      <Typography sx={{ cursor: "pointer" }} onClick={toggleMenu}>
        {title}
      </Typography>
      <Collapse in={collapse}>
        {states.map((element, index) => (
          <div key={index}>
            <InlineMath key={index}>
              {`${names[index]}: ${element.toFixed(2)} \\text{${units[index]}}`}
            </InlineMath>
          </div>
        ))}
      </Collapse>
    </div>
  );
}
