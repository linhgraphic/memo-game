import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { shuffle } from "./utils";
import { baseCards } from "./contants";
import Card from "./components/Card";
import MessageBoard from "./components/MessageBoard";
import { StartPanel } from "./components/StartPanel";
import Header from "./components/Header";
import Modal from "./components/Modal";
import RecordPanel from "./components/RecordPanel";
import {
  loadSavedValues,
  savedSetting,
  saveRecord,
} from "./utils/LocalStorageManager";

function App() {
  const initialCardNumber = loadSavedValues("initialCardNumber");
  const initialCardDisplayTime = loadSavedValues("initialCardDisplayTime");
  const [cardNumber, setCardNumber] = useState(initialCardNumber || 2);
  const [cardDisplayTime, setCardDisplayTime] = useState(
    initialCardDisplayTime || 1
  );
  const [title, setTitle] = useState("");
  const [records, setRecords] = useState(loadSavedValues("records") || []);

  const initialiseDeck = useCallback(() => {
    const deck = shuffle(baseCards).slice(0, cardNumber);
    return shuffle([].concat(deck).concat(deck));
  }, [cardNumber]);

  const onSetCardNumber = (event) => {
    setCardNumber(event.target.value);
  };
  const onSetCardDisplayTime = (event) =>
    setCardDisplayTime(event.target.value);
  const [cards, setCards] = useState(initialiseDeck);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [identicals, setIdenticals] = useState(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);
  const [result, setResult] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [isGameStarted, SetGameStarted] = useState(false);
  const [loadRecordPanel, SetLoadRecordPanel] = useState(false);
  const setRecordId = () => new Date().getTime();
  const onSetTitle = (event) => {
    setTitle(event.target.value);
  };

  const onSaveRecord = () => {
    let tempRecord = {};
    let date = new Date().toDateString();
    tempRecord[title] = {
      id: setRecordId(),
      date: date,
      finishTime: currentTime,
      cardNumber: cardNumber,
    };
    setRecords([...records, tempRecord]);
  };
  const onDeleteRecord = (record) => {
    setRecords(record);
    console.log(record);
  };
  const onDeleteAll = () => {
    setRecords([]);
  };
  const onLoadRecordPanel = () => SetLoadRecordPanel(true);
  useEffect(() => {
    const timeout = setTimeout(() => setCurrentTime(currentTime + 1), 1000);
    if (gameCompleted || !isGameStarted) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [currentTime, gameCompleted, isGameStarted]);

  useEffect(() => {
    savedSetting("initialCardNumber", cardNumber);
    savedSetting("initialCardDisplayTime", cardDisplayTime);
  }, [cardNumber, cardDisplayTime]);

  useEffect(() => saveRecord("records", records), [records]);
  const onGameStart = () => {
    setTitle("");
    SetGameStarted(true);
    SetLoadRecordPanel(false);
    setCards(initialiseDeck());
    setFlippedCards(new Set());
    setIdenticals(new Set());
    setGameCompleted(false);
    setCurrentTime(0);
  };

  const onReset = () => {
    setCards(initialiseDeck());
    setFlippedCards(new Set());
    setIdenticals(new Set());
    setGameCompleted(false);
    setCurrentTime(0);
    SetGameStarted(false);
  };
  const onCardClick = (event) => {
    const numberOfFlippedCards = flippedCards.size;
    const id = +event.currentTarget.id;

    if (numberOfFlippedCards) {
      if (numberOfFlippedCards > 1) {
        return;
      }
      if (cards[flippedCards.values().next().value] === cards[id]) {
        setIdenticals(identicals.add(flippedCards.values().next().value));
        setIdenticals(identicals.add(id));
      }
      if (identicals.size === cards.length) {
        setResult("You Win!!!");
        setGameCompleted(true);
        return;
      }
      setTimeout(() => {
        setFlippedCards(new Set());
      }, cardDisplayTime * 1000);
    }
    setFlippedCards(new Set(flippedCards.add(id)));
  };

  return (
    <div className="app">
      <Header
        onSaveCardNumber={onSetCardNumber}
        onSaveCardDisplayTime={onSetCardDisplayTime}
        {...{
          onLoadRecordPanel,
          currentTime,
          isGameStarted,
          onReset,
          cardNumber,
          cardDisplayTime,
        }}
      />
      <div className="deck-container">
        {cards.map((symbol, index) => (
          <Card
            key={index}
            symbol={symbol}
            id={index}
            onClick={onCardClick}
            flipped={flippedCards.has(index)}
            identical={identicals.has(index)}
            {...{ cardNumber: cards.length }}
          />
        ))}
        <Modal open={!isGameStarted}>
          <StartPanel
            onStart={onGameStart}
            cardNumber={cardNumber}
            setCardNumber={onSetCardNumber}
          />
        </Modal>
        <Modal open={gameCompleted}>
          <MessageBoard
            result={result}
            time={currentTime}
            title={title}
            saveRecord={onSaveRecord}
            setTitle={onSetTitle}
            onClose={onReset}
          />
        </Modal>
        <Modal open={loadRecordPanel}>
          <RecordPanel
            availableRecords={records}
            deleteRecord={onDeleteRecord}
            onClose={() => SetLoadRecordPanel(false)}
            deleteAll={onDeleteAll}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
