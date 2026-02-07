const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Environment variable for Discord webhook
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

if (!DISCORD_WEBHOOK) {
  console.error("❌ DISCORD_WEBHOOK is not set in environment variables!");
  process.exit(1); // exit early if webhook missing
}

// Health check
app.get("/", (req, res) => {
  res.send("✈️ SunExpress Roblox API is online");
});

// Booking endpoint
app.post("/book-flight", async (req, res) => {
  const { username, flightNo, seatNo, checkInCode, bookingTime } = req.body;

  if (!username || !flightNo || !seatNo || !checkInCode || !bookingTime) {
    return res.status(400).json({ error: "Missing booking data" });
  }

  // Prepare Discord embed
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
    await axios.post(DISCORD_WEBHOOK, payload);
    console.log(`✅ Booking sent for ${username} | Flight ${flightNo}`);
    res.json({ status: "success" });
  } catch (err) {
    console.error("❌ Failed to send booking to Discord:", err.message);
    res.status(500).json({ error: "Discord webhook failed" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SunExpress Roblox API running on port ${PORT}`);
});
