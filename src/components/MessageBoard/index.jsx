import React from "react";
import Modal from "../Modal";
import Timer from "../Timer";
import "./MessageBoard.css";

const MessageBoard = ({ onReset, result, isFinished, time }) => {
  return (
    <Modal onClick={onReset} open={isFinished}>
      <div className="message">
        <h1>{result}</h1>
        <h2>
          You finished the game in <Timer time={time} />
        </h2>
      </div>
    </Modal>
  );
};

export default MessageBoard;
