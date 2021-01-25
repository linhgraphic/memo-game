import React from "react";
import "./Timer.css";

const parseTime = (time) => {
  const hh = Math.round(time / 3600);
  const mm = Math.round((time % 3600) / 60);
  const ss = Math.round((time % 3600) % 60);
  return [hh, mm, ss];
};

const Timer = ({ time }) => {
  const [hh = 0, mm = 0, ss = 0] = parseTime(time);
  return (
    <div className="Timer">
      {hh}:{mm}:{ss}
      {/* {parseTime(time).join(":")} */}
    </div>
  );
};

export default Timer;
