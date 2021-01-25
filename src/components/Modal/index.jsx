import React from "react";
import "./Modal.css";

const Modal = ({ children, onClick = () => null, open }) => (
  <div onClick={onClick} className={`modal${open ? " open" : ""}`}>
    {children}
  </div>
);

export default Modal;
