import React from "react";
import { parseTime } from "../../utils";
import "./Record.css";

const Record = ({ date, cardNumber, finishTime, onClick, record }) => {
  return (
    <div data-record={record} onClick={onClick} className="record-container">
      <ul>
        <li>date: {date}</li>
        <li>finish time: {parseTime(finishTime).join(":")}</li>
        <li>card number: {cardNumber}</li>
      </ul>
    </div>
  );
};

export default Record;
