const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
    },
    teamA: {
      type: String,
      required: true,
    },
    teamB: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "upcoming",
    },
    odds: {
      teamA: {
        back: Number,
        lay: Number,
      },
      teamB: {
        back: Number,
        lay: Number,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);