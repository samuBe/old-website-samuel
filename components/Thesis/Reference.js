import { Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function Reference({ title, position }) {
  const [collapse, setCollapse] = useState(true);

  const toggleMenu = () => setCollapse(!collapse);

  const names = ["x", "y", "z"];
  const units = ["m", "m", "m"];
  return (
    <div>
      <Typography sx={{ cursor: "pointer" }} onClick={toggleMenu}>
        {title}
      </Typography>
      <Collapse in={collapse}>
        {position.map((element, index) => (
          <div key={`${title}_${index}`}>
            <InlineMath key={index}>
              {`${names[index]}: ${element.toFixed(2)} \\text{${units[index]}}`}
            </InlineMath>
          </div>
        ))}
      </Collapse>
    </div>
  );
}
