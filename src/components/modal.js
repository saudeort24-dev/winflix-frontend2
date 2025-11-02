import React from "react";
import "./Modal.css";

function Modal({ show, onClose, title, message }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="modal-close-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;