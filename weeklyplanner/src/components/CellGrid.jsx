import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import EventItem from "./EventItem";

const CellColumn = ({ numHrs, isHrCl }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (form.length > 0) {
      setEvents([...events, form]);
    }
  }, [form]);

  return (
    <>
      {isHrCl ? (
        <div className="timeColumn">
          {[...Array(numHrs).keys()].map((item) => {
            let val = `${item}`;
            if (val == 0) {
              val = "12:00 AM";
            } else if (val < 12) {
              val += ":00 AM";
            } else if (val == 12) {
              val += ":00PM";
            } else {
              val = val - 12 + ":00 PM";
            }
            return (
              <div key={item} className="timeCell">
                {val}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="gridColumn">
          {[...Array(numHrs).keys()].map((item) => (
            <button
              key={item}
              className="gridCell"
              onClick={() => {
                setModal(true);
              }}
            ></button>
          ))}
          {events.length > 0 &&
            events.map((event, i) => (
              <EventItem
                description={event[0]}
                startTime={event[1]}
                endTime={event[2]}
                eventColor={event[3]}
              />
            ))}
          {modal && (
            <Modal closeModal={() => setModal()} createEvent={setForm} />
          )}
        </div>
      )}
    </>
  );
};
export default CellColumn;
