import "./App.css";
import { useId, useState, useEffect } from "react";
import TimeGrid from "./components/TimeGrid";

function App() {
  var date = new Date();
  date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); //given today's date, find this week's monday
  //getting the date in YYYY-MM-DD format for the api calls
  var startDate = new Date(date).toISOString().slice(0, 10);
  var endDate = new Date(date.setDate(date.getDate() + 6))
    .toISOString()
    .slice(0, 10);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  //whenever the location changes, update the longitude and langitude
  useEffect(() => {
    //check if location is valid
    if (locationData.hasOwnProperty("results")) {
      setLatitude(Math.round(locationData.results[0].latitude * 10000) / 10000); //rounding to 4 decimal places for the route
      setLongitude(
        Math.round(locationData.results[0].longitude * 10000) / 10000
      );
    } else {
      setLatitude("");
      setLongitude("");
    }
  }, [locationData]);

  //update the weather data whenever location changes
  useEffect(() => {
    if (locationData.hasOwnProperty("results")) {
      getWeatherData();
    } else {
      setWeatherData({});
    }
  }, [latitude] || [longitude]);

  const getWeatherData = () => {
    fetch(
      `http://localhost:5000/${latitude}/${longitude}/${startDate}/${endDate}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("forecast response error");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleFetch = () => {
    fetch(`http://localhost:5000/coords/${location}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to find location");
        }
        return response.json();
      })
      .then((data) => {
        setLocationData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  console.log(weatherData);

  return (
    <div className="App">
      <div className="wrapper">
        <label className="input-field">
          Enter a location:
          <input
            type="text"
            value={location}
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button onClick={handleFetch}>Enter</button>
      </div>
      <p>
        API used: <a href="https://open-meteo.com/">open-meteo</a>
      </p>
      <TimeGrid
        weathercodes={
          weatherData.hasOwnProperty("daily")
            ? weatherData.daily.weather_code
            : []
        }
      />
    </div>
  );
}

export default App;
