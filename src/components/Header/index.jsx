import React from "react";
import Timer from "../Timer";
import "./Header.css";

const Header = ({
  currentTime,
  onReset,
  cardNumber,
  cardDisplayTime,
  onLoadRecordPanel,
  onSaveCardNumber,
  onSaveCardDisplayTime,
}) => (
  <header>
    <h1 className="timer">
      <span role="img" aria-label="timer">
        ⏳
      </span>{" "}
      <Timer time={currentTime} />
    </h1>
    <button className={"reset-button"} onClick={onReset}>
      Reset
    </button>
    <div className="setting-button">
      <button className="gear-icon">
        <span role="img" aria-label="setting">
          ⚙️
        </span>
      </button>
      <div className="setting-panel">
        <div>
          Card display seconds:{" "}
          <input
            type="number"
            id="card-flash"
            min="1"
            max="10"
            value={cardDisplayTime}
            onChange={onSaveCardDisplayTime}
          />
        </div>
        <div>
          Number of cards:{" "}
          <input
            type="number"
            id="card-flash"
            min="1"
            max="18"
            value={cardNumber}
            onChange={onSaveCardNumber}
          />
        </div>
        <button className="load-records" onClick={onLoadRecordPanel}>
          Load records
        </button>
      </div>
    </div>
  </header>
);

export default Header;
