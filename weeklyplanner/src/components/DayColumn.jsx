import React from "react";
import CellGrid from "./CellGrid";

const daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const DayColumn = ({ day, hours, forecast }) => {
  const weekDay = daysOfTheWeek[day.getDay()];
  let weather = "";
  switch (forecast) {
    case 2:
    case 3:
      weather = "cloudy";
      break;
    case 51:
    case 53:
    case 55:
      weather = "drizzle";
      break;
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      weather = "rain";
      break;
    case 71:
    case 73:
    case 75:
    case 85:
    case 86:
      weather = "snow";
      break;
    case 95:
    case 96:
    case 99:
      weather = "thunderstorm";
      break;
    default:
      weather = "";
  }

  return (
    <div className={`${weekDay} ${weather}`}>
      <div className="header">
        <h4>{weekDay}</h4>
        <p>
          {day.getMonth() + 1 + "/" + day.getDate()}
          <br />
          {weather}
        </p>
      </div>
      <CellGrid numHrs={hours} isHrCl={false} />
    </div>
  );
};
export default DayColumn;
