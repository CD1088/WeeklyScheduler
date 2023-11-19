import React from "react";
import { useState } from "react";
import "./Modal.css";

function TimeSlots({ name }) {
  return (
    <select name={name}>
      {[...Array(25).keys()].map((item) => (
        <option key={item} value={`${item}`}>
          {`${item}` + ":00"}
        </option>
      ))}
    </select>
  );
}

function Modal({ closeModal, createEvent }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData.entries());
    let start = parseInt(formObject.start);
    let end = parseInt(formObject.end);
    if (end >= start) {
      createEvent([formObject.title, start, end, formObject.color]);
      closeModal();
    }
  };

  return (
    <div className="modalBG">
      <div className="modal">
        <button className="closeBtn" onClick={closeModal}>
          X
        </button>
        <div className="container">
          <div className="Title">
            <h1>Create a new event: </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Event Title:
              <input name="title" type="text" />
            </label>
            <label>
              Start Time:
              <TimeSlots name={"start"} />
            </label>
            <label>
              End Time:
              <TimeSlots name={"end"} />
            </label>
            <label>
              Pick a color:
              <input name="color" type="color" />
            </label>
            <button type="submit">add event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
