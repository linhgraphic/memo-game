import React, { useRef } from "react";
import "./card.css";

const noop = () => null;

const Card = ({ onClick, symbol, id, flipped, identical, cardNumber }) => {
  const cardRef = useRef({ offsetWidth: 0 });

  return (
    <div
      ref={cardRef}
      className={`card ${flipped || identical ? "flipped" : ""}`}
      onClick={flipped || identical ? noop : onClick}
      id={id}
      style={{
        width: `calc(60vmin/${cardNumber / 2})`,
        height: `calc(100vmin/${cardNumber / 2})`,
        fontSize: cardRef.current.offsetWidth * 0.6,
      }}
    >
      <div
        className={`display-symbol${flipped || identical ? " flipped" : ""}`}
      >
        {symbol}
      </div>
    </div>
  );
};
export default Card;
