import React from "react";
import Record from "../../components/Record";
import "./RecordPanel.css";

const removeRecord = (records, id) => {
  return records.filter((record) => !record.hasOwnProperty(id));
};

const RecordPanel = ({
  availableRecords,
  deleteAll,
  onClose,
  deleteRecord,
}) => {
  let element;
  const onDeleteRecord = (event) => {
    deleteRecord(
      removeRecord(availableRecords, event.currentTarget.dataset.record)
    );
  };
  if (availableRecords.length) {
    element = availableRecords.map((record, index) => {
      return (
        <Record
          onClick={onDeleteRecord}
          key={index}
          record={Object.keys(record)[0]}
          date={Object.values(record)[0].date}
          finishTime={Object.values(record)[0].finishTime}
          cardNumber={Object.values(record)[0].cardNumber}
        />
      );
    });
  } else
    element = <h4 style={{ width: "50vmin" }}>You don't have any record</h4>;
  return (
    <div>
      <div className="record-panel">{element}</div>{" "}
      <div className="record-panel-button">
        <button onClick={deleteAll}>Delete all</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecordPanel;
