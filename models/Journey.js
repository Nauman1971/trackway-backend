const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
  startLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  endLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  distanceTraveled: { type: Number, required: true }, // in meters
  journeyTime: { type: Number, required: true }, // in seconds
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensure that every journey has an associated user
  },
});

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;
