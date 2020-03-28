import React from "react";
import "./card.css";

const Card = ({ onClick, symbol, id, flipped }) => (
  <div class="card" onClick={onClick} id={id}>
    {flipped && symbol}
  </div>
);

export default Card;
