import React from "react";
import DayColumn from "./DayColumn";
import CellGrid from "./CellGrid";
import "./TimeGrid.css";

function TimeGrid({ weathercodes }) {
  const week = [];
  const hours = 24;

  //getting all the dates for the current week
  var date = new Date();
  date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
  week.push(new Date(date));
  for (let i = 0; i < 6; i++) {
    week.push(new Date(date.setDate(date.getDate() + 1)));
  }

  return (
    <>
      <div className="timeGrid">
        <div className="hourColumn">
          <div className="header"></div>
          <CellGrid numHrs={hours} isHrCl={true} />
        </div>
        {week.map((day, i) => (
          <DayColumn
            key={i}
            day={day}
            hours={hours}
            forecast={weathercodes[i]}
          />
        ))}
      </div>
    </>
  );
}

export default TimeGrid;
