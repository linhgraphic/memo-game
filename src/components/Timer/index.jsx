import React from "react";
import "./Timer.css";
import { parseTime } from "../../utils";

const Timer = ({ time }) => {
  const [hh = 0, mm = 0, ss = 0] = parseTime(time);
  return (
    <div className="Timer">
      {hh}:{mm}:{ss}
    </div>
  );
};

export default Timer;
