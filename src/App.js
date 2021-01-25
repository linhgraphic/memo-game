import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { shuffle } from "./utils";
import { baseCards } from "./contants";
import Card from "./components/Card";
import MessageBoard from "./components/MessageBoard";
import Timer from "./components/Timer";
import { StartPanel } from "./components/StartPanel";

function App() {
  const [cardNumbers, setCardNumbers] = useState(1);
  const initialiseDeck = useCallback(() => {
    const deck = shuffle(baseCards).slice(0, cardNumbers);
    return shuffle([].concat(deck).concat(deck));
  }, [cardNumbers]);
  const onStartInputChange = (event) => {
    setCardNumbers(event.target.value);
  };
  const [cards, setCards] = useState(initialiseDeck);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [identicals, setIdenticals] = useState(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);
  const [result, setResult] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [isGameStarted, SetGameStarted] = useState(false);

  useEffect(() => {
    console.log(cardNumbers, currentTime);
    const timeout = setTimeout(() => setCurrentTime(currentTime + 1), 1000);
    if (gameCompleted || !isGameStarted) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [currentTime, gameCompleted, isGameStarted]);

  useEffect(() => {}, [gameCompleted]);

  const onGameStart = () => {
    SetGameStarted(true);
    setCards(initialiseDeck());
    setFlippedCards(new Set());
    setIdenticals(new Set());
    setGameCompleted(false);
    setCurrentTime(0);
  };

  const onReset = () => {
    setCards(initialiseDeck());
    setCardNumbers(1);
    setFlippedCards(new Set());
    setIdenticals(new Set());
    setGameCompleted(false);
    setCurrentTime(0);
    SetGameStarted(false);
  };
  const onCardClick = (event) => {
    const numberOfFlippedCards = flippedCards.size;
    if (numberOfFlippedCards) {
      if (numberOfFlippedCards > 1) {
        return;
      }
      if (
        cards[flippedCards.values().next().value] === cards[+event.target.id]
      ) {
        setIdenticals(identicals.add(flippedCards.values().next().value));
        setIdenticals(identicals.add(+event.target.id));
      }
      if (identicals.size === cards.length) {
        setResult("You Win!!!");
        setGameCompleted(true);
        return;
      }
      setTimeout(() => {
        setFlippedCards(new Set());
      }, 2000);
    }
    setFlippedCards(new Set(flippedCards.add(+event.target.id)));
  };

  return (
    <div className="app">
      <header>
        <h1 className="timer">
          <p>⏳</p> <Timer time={currentTime} />
        </h1>
      </header>
      <div className="deck-container">
        {cards.map((symbol, index) => (
          <Card
            key={index}
            symbol={symbol}
            id={index}
            onClick={onCardClick}
            flipped={flippedCards.has(index)}
            identical={identicals.has(index)}
          />
        ))}
        <StartPanel
          cardNumbers={cardNumbers}
          setCardNumbers={onStartInputChange}
          isGameStarted={isGameStarted}
          onStart={onGameStart}
        />
        <MessageBoard
          onReset={onReset}
          isFinished={gameCompleted}
          result={result}
          time={currentTime}
        />
      </div>
      <button
        className={`reset-button${isGameStarted ? "" : " closed"}`}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
