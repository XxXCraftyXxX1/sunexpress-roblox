const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✈️ SunExpress Roblox API is online");
});

// Booking route
app.post("/book-flight", (req, res) => {
  const {
    username,
    flightNo,
    seatNo,
    bookingTime,
    checkInCode
  } = req.body;

  if (!username || !flightNo || !seatNo || !bookingTime || !checkInCode) {
    return res.status(400).json({ error: "Missing booking data" });
  }

  console.log(
    `${username} | ${flightNo} | ${seatNo} | ${bookingTime} | ${checkInCode}`
  );

  res.json({
    status: "success",
    airline: "SunExpress"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SunExpress Roblox API running on port ${PORT}`);
});
