import React from "react";
import "./card.css";

const Card = ({ onClick, symbol, id, flipped, identical }) => (
  <div className="card" onClick={onClick} id={id}>
    {(identical || flipped) && symbol}
  </div>
);

export default Card;
