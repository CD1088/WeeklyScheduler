import React from "react";

const EventItem = ({ description, startTime, endTime, eventColor }) => {
  const duration = parseInt(endTime) - parseInt(startTime) + 1;
  return (
    <div
      className="event"
      style={{
        gridRow: `${parseInt(startTime) + 1} / span ${duration}`,
        backgroundColor: eventColor,
      }}
    >
      <p className="eventDescription">{description}</p>
    </div>
  );
};

export default EventItem;
