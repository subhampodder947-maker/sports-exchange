const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const cricketRoutes = require("./routes/cricketRoutes");
const oddsRoutes = require("./routes/oddsRoutes");
const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    app: "VirtualOddsHub API",
    version: "1.0.0",
    status: "Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/matches", cricketRoutes);
app.use("/api/odds", oddsRoutes);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});