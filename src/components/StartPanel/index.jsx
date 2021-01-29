import React from "react";
import "./StartPanel.css";

export const StartPanel = ({ cardNumber, setCardNumber, onStart }) => {
  return (
    <div className="start-panel">
      <h2>Select Number of cards</h2>
      <h5>maximum 18 cards</h5>
      <input
        value={cardNumber}
        type="number"
        min={1}
        max={18}
        onChange={setCardNumber}
      />
      {cardNumber < 1 || cardNumber > 18 ? (
        <h5>You can't select out-of-range Number. Please try again</h5>
      ) : (
        <button onClick={onStart}>Start</button>
      )}
    </div>
  );
};
