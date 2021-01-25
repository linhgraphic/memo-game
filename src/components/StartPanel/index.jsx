import React from "react";
import Modal from "../Modal";
import "./StartPanel.css";

export const StartPanel = ({
  cardNumbers,
  isGameStarted,
  setCardNumbers,
  onStart,
}) => {
  return (
    <Modal open={!isGameStarted}>
      <div className="start-panel">
        <h2>Select numbers of cards</h2>
        <h5>maximum 16 cards</h5>
        <input type="number" min={1} max={16} onChange={setCardNumbers} />
        {(cardNumbers < 1 || cardNumbers > 16) && (
          <h5>you can't select out-of-range numbers. Please try again</h5>
        )}
        <br />
        <br />
        {cardNumbers >= 1 && cardNumbers <= 16 && (
          <button onClick={onStart}>Start</button>
        )}
      </div>
    </Modal>
  );
};
