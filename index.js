const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✈️ SunExpress Roblox API is online");
});

app.post("/book-flight", async (req, res) => {
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

  const webhook = process.env.DISCORD_WEBHOOK;

  const payload = {
    embeds: [
      {
       title: `<:sunexpresswhite:1469031028327714856> Flight Booking : ${flightNo}`,
        color: 16753920,
        fields: [
          { name: "Username", value: username, inline: true },
          { name: "Flight No", value: flightNo, inline: true },
          { name: "Seat", value: seatNo, inline: true },
          { name: "Check-In Code", value: checkInCode, inline: true },
          { name: "Booked At", value: bookingTime }
        ],
        footer: { text: "SunExpress Roblox System" }
      }
    ]
  };

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Booking sent to Discord");
    res.json({ status: "success" });
  } catch (err) {
    console.error("Discord webhook error:", err);
    res.status(500).json({ error: "Discord failed" });
  }
});
