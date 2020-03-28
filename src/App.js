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
  const [flippedCards, setFlippedCards] = useState(new Set());
  const onReset = () => setCards(initialiseDeck());
  const onCardClick = event => {
    const numberOfFlippedCards = flippedCards.size;
    if (numberOfFlippedCards) {
      if (numberOfFlippedCards > 1) return;
      setTimeout(() => setFlippedCards(new Set()), 5000);
    }
    setFlippedCards(new Set(flippedCards.add(+event.target.id)));
  };

  return (
    <div className="app">
      <header className="deck-container">
        {cards.map((symbol, index) => (
          <Card
            symbol={symbol}
            id={index}
            onClick={onCardClick}
            flipped={flippedCards.has(index)}
          />
        ))}
      </header>
      <button onClick={onReset}>click</button>
    </div>
  );
}

export default App;
