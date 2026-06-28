const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    selection: {
      type: String,
      required: true,
    },
    betType: {
      type: String,
      enum: ["BACK", "LAY"],
      required: true,
    },
    odds: {
      type: Number,
      required: true,
    },
    stake: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      default: 0,
    },
    exposure: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "OPEN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bet", betSchema);