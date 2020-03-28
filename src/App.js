import React, { useState, useCallback } from "react";
import "./App.css";
import { shuffle } from "./utils";
import { baseCards } from "./contants";
import Card from "./components/Card";

function App() {
  const initialiseDeck = useCallback(() => shuffle([].concat(baseCards)), [
    baseCards
  ]);
  const [cards, setCards] = useState(initialiseDeck);
  const [flippedCards, setFlippedCards] = useState({});
  // const cardArray = () => {
  //   for (let i = 0; i < cards.length - 1; i += 4) {
  //     return Array.from({ length: 4 }, ()=>(e => cards.slice(e, e + 4))(i));
  //   }
  // };
  const onReset = () => setCards(initialiseDeck());
  const onCardClick = event => {
    const numberOfFlippedCards = Object.keys(flippedCards).length;
    if (numberOfFlippedCards) {
      if (numberOfFlippedCards > 1) return;
      setTimeout(() => setFlippedCards({}), 5000);
    }
    setFlippedCards({ ...flippedCards, [event.target.id]: true });
  };

  return (
    <div className="app">
      <header className="deck-container">
        {cards.map((symbol, index) => (
          <Card
            symbol={symbol}
            id={index}
            onClick={onCardClick}
            flipped={flippedCards[index]}
          />
        ))}
        {/* <div>{cardArray()}</div> */}
      </header>
      <button onClick={onReset}>click</button>
    </div>
  );
}

export default App;
