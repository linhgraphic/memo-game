import React from "react";
import Timer from "../Timer";
import "./MessageBoard.css";

const MessageBoard = ({
  result,
  time,
  title,
  setTitle,
  saveRecord,
  onClose,
}) => {
  return (
    <div>
      <button className="close" style={{ float: "right" }} onClick={onClose}>
        Close
      </button>
      <div className="message">
        <h1>{result}</h1>
        <h2>
          You finished the game in <Timer time={time} />
        </h2>
        <input
          type="text"
          name="recordTitle"
          id="recordTitle"
          placeholder="please type the title"
          required={true}
          value={title}
          maxLength={10}
          onChange={setTitle}
        />
        <button disabled={!title} onClick={saveRecord}>
          Save record
        </button>
      </div>
    </div>
  );
};

export default MessageBoard;
