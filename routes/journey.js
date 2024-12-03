const express = require("express");
const Journey = require("../models/Journey");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/save", protect, async (req, res) => {
  const { startLocation, endLocation, distance, time } = req.body;

  try {
    // Create a new journey, associating the user with the journey
    const newJourney = new Journey({
      startLocation,
      endLocation,
      distanceTraveled: distance,
      journeyTime: time,
      user: req.user.id,
    });

    const savedJourney = await newJourney.save();
    res.status(201).json(savedJourney);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving journey data" });
  }
});

router.get("/history", protect, async (req, res) => {
  console.log(req);
  const { page = 1 } = req.query;
  const limit = 10; // Number of journeys per page
  const skip = (page - 1) * limit; // Skip journeys based on the page number

  try {
    const journeys = await Journey.find({ user: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Get the most recent journeys first
    res.status(200).json(journeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving journey history" });
  }
});

module.exports = router;
