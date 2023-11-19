const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/coords/:location", (req, res) => {
  console.log(
    `https://geocoding-api.open-meteo.com/v1/search?name=${req.params.location}&count=1&language=en&format=json`
  );
  fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${req.params.location}&count=1&language=en&format=json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("location reponse error");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "error getting location" });
    });
});

app.get("/:lat/:long/:start/:end", (req, res) => {
  console.log(
    `https://api.open-meteo.com/v1/forecast?latitude=${req.params.lat}&longitude=${req.params.long}&daily=weather_code&start_date=${req.params.start}&end_date=${req.params.end}`
  );
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${req.params.lat}&longitude=${req.params.long}&daily=weather_code&start_date=${req.params.start}&end_date=${req.params.end}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("weather reponse error");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "error getting forecast" });
    });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});

//https://geocoding-api.open-meteo.com/v1/search?name=${req.params.location}&count=1&language=en&format=json
//https://api.open-meteo.com/v1/forecast?latitude={req.params.lat}&longitude={req.params.long}&daily=weather_code&start_date={req.params.start}&end_date={req.params.end}
