const express = require("express");
const fs = require("fs");
const cors = require("cors");
const {
  calculateRevenueAndTotalCapacityOfUnreservedOffices,
} = require("./handlers/reservationHandler");

const app = express();
app.use(cors());
const PORT = 8080;
const filePath = "output.json";

app.use(express.json());

app.get("/reservation-data", (req, res) => {
  const year = req.query.year;
  const month = req.query.month;
  const date = `${year}-${month}`;

  if (!year || !month)
    return res.status(400).send("Year or month are not defined");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Error reading JSON file");
    }

    try {
      const reservations = JSON.parse(data);
      const reservationData =
        calculateRevenueAndTotalCapacityOfUnreservedOffices(reservations, date);

      res.send(reservationData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing JSON");
    }
  });
});

app.post("/reservation-data", function (req, res) {
  const csvAsJson = JSON.stringify(req.body, undefined, 2);

  // Write the JSON string to the file
  fs.writeFile(filePath, csvAsJson, "utf-8", (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
      return res.status(500).send("Error writing JSON to file");
    }

    console.log("JSON saved to file:", filePath);
    res.status(201).send("JSON saved to file");
  });
});

app.listen(PORT, () => {
  console.log("server listening on port 8080");
});
